import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  type Firestore,
  type WriteBatch,
} from 'firebase/firestore';
import type { ItemRevisao } from '../revisao/sm2';
import type { ConclusaoCaso, RespostaRegistrada } from '../progress/types';
import { chaveConclusao, chaveResposta, type EstadoCarimbado, type PrefCarimbada, type SnapshotSync } from './merge';
import { obterAuth } from '../conta/firebaseApp';

// Única camada que toca o Firestore (Task 6 brief) — orquestrador.ts e
// BlocoConta.tsx nunca importam `firebase/firestore` diretamente.
//
// Contrato herdado das regras de segurança (Task 5, ver firestore.rules e
// task-5-report.md — "Contrato para a Task 6"):
//  1. Ids de tópico/item contêm '/': as chaves de documento de
//     estudados/favoritos/itensRevisao são `encodeURIComponent`; decodificamos
//     ao ler (decodeURIComponent é identidade em ids sem '%', então é seguro
//     aplicar sempre, inclusive a `prefs`, cuja chave nunca é codificada).
//  2. NUNCA gravar em `users/{uid}` — só subcoleções.
//  3. `perfil` tem id fixo `users/{uid}/perfil/dados`, campos EXATOS
//     {email, criadoEm}; `email` tem que ser o de `auth.currentUser` NO
//     MOMENTO da escrita (nunca cacheado) e `criadoEm` é imutável no update
//     — por isso só gravamos o perfil quando o doc ainda não existe.
//  4. `respostas`/`conclusoesCasos` são create-only: mandamos só as chaves
//     que já vêm como delta (só-faltantes) do `merge()`.
//  5. Leituras são sempre por coleção sob `users/{uid}/…`, nunca
//     `collectionGroup` (negado por construção pelas regras).
//  6. `writeBatch` em lotes de até 400 operações (folga sobre o limite real
//     de 500 do SDK) — um documento inválido derruba o lote inteiro.

const LIMITE_LOTE = 400;

const COLECOES_HISTORICO = ['respostas', 'conclusoesCasos'] as const;
const COLECOES_REGISTRO = ['estudados', 'favoritos', 'itensRevisao', 'prefs'] as const;

async function lerColecaoRegistro<T>(db: Firestore, uid: string, colecao: string): Promise<Record<string, T>> {
  const snap = await getDocs(collection(db, 'users', uid, colecao));
  const out: Record<string, T> = {};
  snap.forEach((d) => {
    out[decodeURIComponent(d.id)] = d.data() as T;
  });
  return out;
}

async function lerColecaoLista<T>(db: Firestore, uid: string, colecao: string): Promise<T[]> {
  const snap = await getDocs(collection(db, 'users', uid, colecao));
  return snap.docs.map((d) => d.data() as T);
}

export async function lerSnapshotRemoto(db: Firestore, uid: string): Promise<SnapshotSync> {
  const [estudados, favoritos, itensRevisao, prefs, respostas, conclusoesCasos] = await Promise.all([
    lerColecaoRegistro<EstadoCarimbado>(db, uid, 'estudados'),
    lerColecaoRegistro<EstadoCarimbado>(db, uid, 'favoritos'),
    lerColecaoRegistro<ItemRevisao>(db, uid, 'itensRevisao'),
    lerColecaoRegistro<PrefCarimbada>(db, uid, 'prefs'),
    lerColecaoLista<RespostaRegistrada>(db, uid, 'respostas'),
    lerColecaoLista<ConclusaoCaso>(db, uid, 'conclusoesCasos'),
  ]);
  return { estudados, favoritos, itensRevisao, respostas, conclusoesCasos, prefs };
}

async function commitEmLotes(db: Firestore, acoes: Array<(lote: WriteBatch) => void>): Promise<void> {
  for (let i = 0; i < acoes.length; i += LIMITE_LOTE) {
    const lote = writeBatch(db);
    for (const acao of acoes.slice(i, i + LIMITE_LOTE)) acao(lote);
    await lote.commit();
  }
}

export async function gravarDeltas(db: Firestore, uid: string, deltas: SnapshotSync): Promise<void> {
  const acoes: Array<(lote: WriteBatch) => void> = [];

  // Perfil: só na primeira sincronização (doc ausente) — ver contrato acima.
  // Sem e-mail vivo (auth.currentUser.email ausente) NÃO gravamos o perfil
  // agora: as regras exigem texto(email, ...) > 0 caracteres, então um
  // e-mail vazio derrubaria o writeBatch INTEIRO (achado do round de
  // revisão — reproduzido: 0 docs gravados). Adiar para uma sync futura é
  // seguro, é só um `create` que ainda não aconteceu.
  const perfilRef = doc(db, 'users', uid, 'perfil', 'dados');
  const perfilSnap = await getDoc(perfilRef);
  const email = obterAuth().currentUser?.email;
  if (!perfilSnap.exists() && email) {
    const criadoEm = Date.now();
    acoes.push((lote) => lote.set(perfilRef, { email, criadoEm }));
  }

  for (const [topicoId, estado] of Object.entries(deltas.estudados)) {
    const ref = doc(db, 'users', uid, 'estudados', encodeURIComponent(topicoId));
    acoes.push((lote) => lote.set(ref, estado));
  }
  for (const [topicoId, estado] of Object.entries(deltas.favoritos)) {
    const ref = doc(db, 'users', uid, 'favoritos', encodeURIComponent(topicoId));
    acoes.push((lote) => lote.set(ref, estado));
  }
  for (const [itemId, item] of Object.entries(deltas.itensRevisao)) {
    const ref = doc(db, 'users', uid, 'itensRevisao', encodeURIComponent(itemId));
    acoes.push((lote) => lote.set(ref, item));
  }
  for (const [chave, pref] of Object.entries(deltas.prefs)) {
    const ref = doc(db, 'users', uid, 'prefs', chave);
    acoes.push((lote) => lote.set(ref, pref));
  }
  for (const r of deltas.respostas) {
    const ref = doc(db, 'users', uid, 'respostas', encodeURIComponent(chaveResposta(r)));
    acoes.push((lote) => lote.set(ref, r));
  }
  for (const c of deltas.conclusoesCasos) {
    const ref = doc(db, 'users', uid, 'conclusoesCasos', encodeURIComponent(chaveConclusao(c)));
    acoes.push((lote) => lote.set(ref, c));
  }

  await commitEmLotes(db, acoes);
}

// Apaga as 7 subcoleções (LGPD, "excluir conta"). Idempotente por natureza:
// coleções vazias e docs já ausentes simplesmente não geram operação de
// delete (deletar um doc inexistente também não falha, mas evitamos o ruído
// de rede lendo antes) — contrato exigido pelo AuthProvider (Task 4/6):
// reentrar após reautenticação tem que tolerar dados já apagados.
export async function apagarDadosDoUsuario(db: Firestore, uid: string): Promise<void> {
  const acoes: Array<(lote: WriteBatch) => void> = [];

  acoes.push((lote) => lote.delete(doc(db, 'users', uid, 'perfil', 'dados')));

  const snaps = await Promise.all(
    [...COLECOES_HISTORICO, ...COLECOES_REGISTRO].map((nome) => getDocs(collection(db, 'users', uid, nome))),
  );
  for (const snap of snaps) {
    for (const d of snap.docs) {
      acoes.push((lote) => lote.delete(d.ref));
    }
  }

  await commitEmLotes(db, acoes);
}
