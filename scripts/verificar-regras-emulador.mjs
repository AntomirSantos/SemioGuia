// Verificação das regras do Firestore contra o EMULADOR — opcional e LOCAL.
// NÃO faz parte da suíte do CI (o emulador precisa de Java e de download de
// binários). Rode isto sempre que mexer em `firestore.rules`, junto com a
// auditoria da skill `firebase-security-rules-auditor`.
//
//   npm install --no-save --no-package-lock firebase @firebase/rules-unit-testing firebase-tools
//   npx firebase-tools emulators:exec --only firestore --project demo-semioguia \
//     "node --experimental-strip-types scripts/verificar-regras-emulador.mjs"
//
// (o `emulators:exec` já exporta FIRESTORE_EMULATOR_HOST; sem ele, cai na
// porta 8087 do `firebase.json` do guia ou em FIRESTORE_EMULATOR_PORT.)
//
// O passo do SM-2 importa `src/revisao/sm2.ts` direto — daí o
// `--experimental-strip-types` (Node 22.18+ faz type stripping).
//
// Guia e registro da auditoria: docs/firebase-setup.md
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
// Importado direto do app: o fixture do SM-2 tem de exercitar o algoritmo
// REAL, não uma cópia (foi a cópia mental que deixou passar o F1).
import { criarItem, avaliar } from '../src/revisao/sm2.ts';
import {
  doc,
  collection,
  collectionGroup,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const regras = fs.readFileSync(path.join(raiz, 'firestore.rules'), 'utf8');
// `emulators:exec` exporta FIRESTORE_EMULATOR_HOST ("host:porta").
const [hostEnv, portaEnv] = (process.env.FIRESTORE_EMULATOR_HOST ?? '').split(':');
const host = hostEnv || '127.0.0.1';
const porta = Number(portaEnv || process.env.FIRESTORE_EMULATOR_PORT || 8087);

const env = await initializeTestEnvironment({
  projectId: 'demo-semioguia',
  firestore: { host, port: porta, rules: regras },
});

const UID = 'user-a';
const EMAIL = 'aluno@exemplo.com';
const dono = env.authenticatedContext(UID, { email: EMAIL, email_verified: false }).firestore();
const outro = env.authenticatedContext('user-b', { email: 'b@exemplo.com' }).firestore();
const anon = env.unauthenticatedContext().firestore();
const semClaimEmail = env.authenticatedContext(UID).firestore();

let ok = 0;
const falhas = [];
async function t(nome, fn) {
  try {
    await fn();
    ok++;
  } catch (e) {
    falhas.push(`${nome}: ${e.message ?? e}`);
  }
}

const p = (db, ...seg) => doc(db, 'users', UID, ...seg);
const ITEM = {
  id: 'pa-1',
  tipo: 'pergunta',
  topicoId: 'exame/sinais/pa',
  facilidade: 2.5,
  repeticoes: 0,
  intervaloDias: 0,
  proximaRevisao: '2026-08-23',
  atualizadoEm: '2026-08-22T10:00:00.000Z',
};
const RESP = { perguntaId: 'pa-1', topicoId: 'exame/sinais/pa', correta: true, respondidaEm: 1755859200000 };
const CONC = { casoId: 'crise-hipertensiva', classe: 'otimo', otimas: 5, aceitaveis: 1, erros: 0, concluidaEm: 1755859200000 };
const EST = { valor: true, atualizadoEm: 1755859200000 };
const PERFIL = { email: EMAIL, criadoEm: 1755859200000 };
const PREF = { valor: 'escuro', atualizadoEm: 1755859200000 };
const CHAVE_TOPICO = encodeURIComponent('exame/sinais/pa');

// ---- caminho feliz: exatamente o que a camada de sync grava --------------
await t('perfil create', () => assertSucceeds(setDoc(p(dono, 'perfil', 'dados'), PERFIL)));
await t('perfil read', () => assertSucceeds(getDoc(p(dono, 'perfil', 'dados'))));
await t('perfil update com mesmo criadoEm', () => assertSucceeds(setDoc(p(dono, 'perfil', 'dados'), { ...PERFIL })));
await t('perfil com token SEM claim email negado (não ative login anônimo)', () =>
  assertFails(setDoc(p(semClaimEmail, 'perfil', 'dados'), { email: 'x@y.com', criadoEm: 1 })));
await t('perfil com id diferente de "dados" negado', () =>
  assertFails(setDoc(p(dono, 'perfil', 'outro'), PERFIL)));
await t('estudados create (id codificado)', () => assertSucceeds(setDoc(p(dono, 'estudados', CHAVE_TOPICO), EST)));
await t('estudados update', () =>
  assertSucceeds(setDoc(p(dono, 'estudados', CHAVE_TOPICO), { valor: false, atualizadoEm: 1755859300000 })));
await t('favoritos create', () => assertSucceeds(setDoc(p(dono, 'favoritos', 'x'), EST)));
await t('itensRevisao create', () => assertSucceeds(setDoc(p(dono, 'itensRevisao', 'pa-1'), ITEM)));
await t('itensRevisao update', () =>
  assertSucceeds(setDoc(p(dono, 'itensRevisao', 'pa-1'), { ...ITEM, repeticoes: 1, intervaloDias: 1, facilidade: 2.6 })));
await t('facilidade inteira (3) aceita — SDK serializa como int', () =>
  assertSucceeds(setDoc(p(dono, 'itensRevisao', 'pa-2'), { ...ITEM, id: 'pa-2', facilidade: 3 })));
await t('item de checklist com id codificado', () =>
  assertSucceeds(
    setDoc(p(dono, 'itensRevisao', encodeURIComponent('exame/sinais/pa#checklist:Aferir PA')), {
      ...ITEM,
      id: 'exame/sinais/pa#checklist:Aferir PA',
      tipo: 'checklist',
    }),
  ));
// REDE DE PROTEÇÃO DO F1: a saída REAL de avaliar() tem de passar pelas
// regras a cada repetição. Foi um teto apertado (intervaloDias <= 36500) que
// negaria a 10ª repetição e mataria a sincronização em silêncio.
// `avaliar()` não tem teto de facilidade nem clamp de intervalo e quiz/estação
// reavaliam sem esperar o vencimento, então a sequência abaixo é alcançável
// por um usuário acertando a mesma pergunta várias vezes seguidas.
{
  let atual = criarItem('sm2-progressao', 'pergunta', 'exame/sinais/pa', '2026-08-22', '2026-08-22T00:00:00.000Z');
  await t('SM-2 passo 0 (item recém-criado) grava', () =>
    assertSucceeds(setDoc(p(dono, 'itensRevisao', 'sm2-progressao'), atual)));
  // Até o passo 13 o app ainda gera `proximaRevisao` bem-formado
  // (ano de 4 dígitos); daí em diante o próprio app corrompe a data.
  for (let passo = 1; passo <= 13; passo++) {
    atual = avaliar(atual, 5, '2026-08-22', '2026-08-22T00:00:00.000Z');
    const estado = { ...atual };
    await t(
      `SM-2 passo ${passo} grava (ef=${estado.facilidade.toFixed(1)}, ` +
        `rep=${estado.repeticoes}, dias=${estado.intervaloDias}, ${estado.proximaRevisao})`,
      () => assertSucceeds(setDoc(p(dono, 'itensRevisao', 'sm2-progressao'), estado)),
    );
  }
  // LIMITE CONHECIDO (bug de app, não das regras): no passo 14 `somarDias()`
  // estoura o ano de 4 dígitos e `proximaRevisao` sai como '+032994-12' —
  // dado corrompido, negado pela validação de data. O conserto é em
  // src/revisao/sm2.ts (teto de facilidade / clamp de intervalo), não aqui.
  const passo14 = avaliar(atual, 5, '2026-08-22', '2026-08-22T00:00:00.000Z');
  await t('SM-2 passo 14: app gera data corrompida e a regra nega (limite conhecido)', () => {
    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(passo14.proximaRevisao)) {
      throw new Error(
        `sm2.ts passou a gerar data bem-formada no passo 14 (${passo14.proximaRevisao}); ` +
          'reveja os tetos das regras',
      );
    }
    return assertFails(setDoc(p(dono, 'itensRevisao', 'sm2-p14'), { ...passo14, id: 'sm2-p14' }));
  });
}
await t('respostas create', () => assertSucceeds(setDoc(p(dono, 'respostas', 'pa-1_1755859200000'), RESP)));
await t('conclusoesCasos create', () =>
  assertSucceeds(setDoc(p(dono, 'conclusoesCasos', 'crise-hipertensiva_1755859200000'), CONC)));
await t('prefs create', () => assertSucceeds(setDoc(p(dono, 'prefs', 'tema'), PREF)));
await t('prefs valor vazio', () => assertSucceeds(setDoc(p(dono, 'prefs', 'busca'), { valor: '', atualizadoEm: 1 })));
await t('list da própria coleção', () => assertSucceeds(getDocs(collection(dono, 'users', UID, 'estudados'))));
await t('writeBatch misto do dono', () => {
  const b = writeBatch(dono);
  b.set(p(dono, 'estudados', 'lote'), { valor: true, atualizadoEm: 2 });
  b.set(p(dono, 'respostas', 'q_2'), { perguntaId: 'q', topicoId: 't', correta: false, respondidaEm: 2 });
  b.set(p(dono, 'prefs', 'fonte'), { valor: 'grande', atualizadoEm: 2 });
  return assertSucceeds(b.commit());
});

// ---- isolamento entre contas -------------------------------------------
await t('outro usuário não lê', () => assertFails(getDoc(doc(outro, 'users', UID, 'perfil', 'dados'))));
await t('outro usuário não escreve', () => assertFails(setDoc(doc(outro, 'users', UID, 'estudados', 'x'), EST)));
await t('outro usuário não lista', () => assertFails(getDocs(collection(outro, 'users', UID, 'respostas'))));
await t('outro usuário não apaga', () => assertFails(deleteDoc(doc(outro, 'users', UID, 'respostas', 'pa-1_1755859200000'))));
await t('anônimo não lê', () => assertFails(getDoc(doc(anon, 'users', UID, 'perfil', 'dados'))));
await t('anônimo não escreve', () => assertFails(setDoc(doc(anon, 'users', UID, 'prefs', 'tema'), PREF)));
await t('documento pai users/{uid} negado', () => assertFails(setDoc(doc(dono, 'users', UID), { x: 1 })));
// collectionGroup varre TODAS as contas: como não há `match` que case com um
// grupo de coleção (só caminhos completos sob users/{uid}), é negado por
// construção — para o atacante E para o próprio dono.
await t('collectionGroup(respostas) negado ao atacante', () =>
  assertFails(getDocs(collectionGroup(outro, 'respostas'))));
await t('collectionGroup(estudados) negado ao atacante', () =>
  assertFails(getDocs(collectionGroup(outro, 'estudados'))));
await t('collectionGroup(respostas) negado ao dono', () =>
  assertFails(getDocs(collectionGroup(dono, 'respostas'))));
await t('collectionGroup(estudados) negado ao dono', () =>
  assertFails(getDocs(collectionGroup(dono, 'estudados'))));
await t('collectionGroup(perfil) negado ao anônimo', () =>
  assertFails(getDocs(collectionGroup(anon, 'perfil'))));
await t('coleção fora de users negada', () => assertFails(setDoc(doc(dono, 'publico', 'x'), { x: 1 })));
await t('subcoleção desconhecida negada', () => assertFails(setDoc(doc(dono, 'users', UID, 'buscas', 'x'), EST)));

// ---- validação de campos ------------------------------------------------
await t('campo extra negado', () => assertFails(setDoc(p(dono, 'estudados', 'y'), { ...EST, admin: true })));
await t('campo faltando negado (hasAll)', () => assertFails(setDoc(p(dono, 'estudados', 'z'), { valor: true })));
await t('documento vazio negado', () => assertFails(setDoc(p(dono, 'estudados', 'w'), {})));
await t('tipo errado negado', () => assertFails(setDoc(p(dono, 'estudados', 'v'), { valor: 'sim', atualizadoEm: 1 })));
await t('carimbo zero negado', () => assertFails(setDoc(p(dono, 'estudados', 'u'), { valor: true, atualizadoEm: 0 })));
await t('carimbo negativo negado', () => assertFails(setDoc(p(dono, 'estudados', 't'), { valor: true, atualizadoEm: -1 })));
await t('carimbo absurdo negado', () => assertFails(setDoc(p(dono, 'estudados', 's'), { valor: true, atualizadoEm: 99999999999999 })));
await t('carimbo float negado', () => assertFails(setDoc(p(dono, 'estudados', 'r'), { valor: true, atualizadoEm: 1.5 })));
await t('prefs.valor > 100 negado', () =>
  assertFails(setDoc(p(dono, 'prefs', 'grande'), { valor: 'x'.repeat(101), atualizadoEm: 1 })));
await t('id de documento gigante negado', () => assertFails(setDoc(p(dono, 'prefs', 'k'.repeat(301)), PREF)));
await t('perfil com e-mail de outra pessoa negado', () =>
  assertFails(setDoc(p(dono, 'perfil', 'dados'), { email: 'vitima@exemplo.com', criadoEm: 1 })));
await t('perfil e-mail > 320 negado', () =>
  assertFails(setDoc(p(dono, 'perfil', 'dados'), { email: 'a'.repeat(321), criadoEm: 1 })));
await t('perfil criadoEm imutável', () => assertFails(updateDoc(p(dono, 'perfil', 'dados'), { criadoEm: 2 })));
await t('campo role negado no perfil', () => assertFails(setDoc(p(dono, 'perfil', 'dados'), { ...PERFIL, role: 'admin' })));
await t('facilidade abaixo do piso negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i1'), { ...ITEM, id: 'i1', facilidade: 1.2 })));
await t('facilidade acima do teto de sanidade (1000) negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i2'), { ...ITEM, id: 'i2', facilidade: 1000.5 })));
await t('facilidade no teto (1000) aceita', () =>
  assertSucceeds(setDoc(p(dono, 'itensRevisao', 'i2b'), { ...ITEM, id: 'i2b', facilidade: 1000 })));
await t('facilidade NaN negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i3'), { ...ITEM, id: 'i3', facilidade: NaN })));
await t('tipo fora do enum negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i4'), { ...ITEM, id: 'i4', tipo: 'outro' })));
await t('repetições negativas negadas', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i5'), { ...ITEM, id: 'i5', repeticoes: -1 })));
await t('repetições acima do teto de sanidade negadas', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i5b'), { ...ITEM, id: 'i5b', repeticoes: 100001 })));
await t('intervaloDias acima do teto de sanidade negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i6'), { ...ITEM, id: 'i6', intervaloDias: 3650001 })));
await t('intervaloDias no teto (3650000) aceito', () =>
  assertSucceeds(setDoc(p(dono, 'itensRevisao', 'i6b'), { ...ITEM, id: 'i6b', intervaloDias: 3650000 })));
await t('proximaRevisao fora do formato negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i7'), { ...ITEM, id: 'i7', proximaRevisao: '23/08/2026' })));
await t('atualizadoEm ISO inválido negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i8'), { ...ITEM, id: 'i8', atualizadoEm: 'ontem' })));
await t('topicoId > 200 negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i9'), { ...ITEM, id: 'i9', topicoId: 'x'.repeat(201) })));
await t('id do item imutável no update', () => assertFails(updateDoc(p(dono, 'itensRevisao', 'pa-1'), { id: 'outro' })));
await t('classe fora do enum negada', () =>
  assertFails(setDoc(p(dono, 'conclusoesCasos', 'c1'), { ...CONC, classe: 'perfeito' })));
await t('contagem > 100 negada', () => assertFails(setDoc(p(dono, 'conclusoesCasos', 'c2'), { ...CONC, otimas: 101 })));
await t('contagem negativa negada', () => assertFails(setDoc(p(dono, 'conclusoesCasos', 'c3'), { ...CONC, erros: -1 })));
await t('lote inteiro falha se um documento é inválido', () => {
  const b = writeBatch(dono);
  b.set(p(dono, 'estudados', 'lote-ok'), { valor: true, atualizadoEm: 3 });
  b.set(p(dono, 'estudados', 'lote-ruim'), { valor: true, atualizadoEm: 3, extra: 1 });
  return assertFails(b.commit());
});

// ---- históricos imutáveis + exclusão de conta ---------------------------
await t('respostas update negado', () =>
  assertFails(updateDoc(p(dono, 'respostas', 'pa-1_1755859200000'), { correta: false })));
await t('respostas sobrescrita negada', () =>
  assertFails(setDoc(p(dono, 'respostas', 'pa-1_1755859200000'), { ...RESP, correta: false })));
await t('conclusoesCasos update negado', () =>
  assertFails(updateDoc(p(dono, 'conclusoesCasos', 'crise-hipertensiva_1755859200000'), { classe: 'dano' })));
await t('dono apaga resposta (excluir conta)', () =>
  assertSucceeds(deleteDoc(p(dono, 'respostas', 'pa-1_1755859200000'))));
await t('dono apaga conclusão (excluir conta)', () =>
  assertSucceeds(deleteDoc(p(dono, 'conclusoesCasos', 'crise-hipertensiva_1755859200000'))));
await t('dono apaga estado', () => assertSucceeds(deleteDoc(p(dono, 'estudados', CHAVE_TOPICO))));
await t('dono apaga preferência', () => assertSucceeds(deleteDoc(p(dono, 'prefs', 'tema'))));
await t('dono apaga item de revisão', () => assertSucceeds(deleteDoc(p(dono, 'itensRevisao', 'pa-1'))));
await t('dono apaga perfil', () => assertSucceeds(deleteDoc(p(dono, 'perfil', 'dados'))));

await env.cleanup();
console.log(`\nPASSOU: ${ok}   FALHOU: ${falhas.length}`);
for (const f of falhas) console.log(' - ' + f);
process.exit(falhas.length ? 1 : 0);
