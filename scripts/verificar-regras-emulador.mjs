// Verificação das regras do Firestore contra o EMULADOR — opcional e LOCAL.
// NÃO faz parte da suíte do CI (o emulador precisa de Java e de download de
// binários). Rode isto sempre que mexer em `firestore.rules`, junto com a
// auditoria da skill `firebase-security-rules-auditor`.
//
//   npm install --no-save --no-package-lock firebase @firebase/rules-unit-testing firebase-tools
//   npx firebase-tools emulators:exec --only firestore --project demo-semioguia \
//     "node scripts/verificar-regras-emulador.mjs"
//
// (o emulador precisa estar na porta 8087 — ver `firebase.json` do guia, ou
// exporte FIRESTORE_EMULATOR_PORT.)
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
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const regras = fs.readFileSync(path.join(raiz, 'firestore.rules'), 'utf8');
const porta = Number(process.env.FIRESTORE_EMULATOR_PORT ?? 8087);

const env = await initializeTestEnvironment({
  projectId: 'demo-semioguia',
  firestore: { host: '127.0.0.1', port: porta, rules: regras },
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
await t('perfil create com token sem claim email (fallback)', () =>
  assertSucceeds(setDoc(p(semClaimEmail, 'perfil', 'sem-claim'), { email: 'x@y.com', criadoEm: 1 })));
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
await t('limites do SM-2 aceitos', () =>
  assertSucceeds(
    setDoc(p(dono, 'itensRevisao', 'limite'), {
      ...ITEM, id: 'limite', facilidade: 1.3, repeticoes: 10000,
      intervaloDias: 36500, proximaRevisao: '2126-01-01',
    }),
  ));
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
  assertFails(setDoc(p(dono, 'perfil', 'outro'), { email: 'vitima@exemplo.com', criadoEm: 1 })));
await t('perfil e-mail > 320 negado', () =>
  assertFails(setDoc(p(dono, 'perfil', 'grande'), { email: 'a'.repeat(321), criadoEm: 1 })));
await t('perfil criadoEm imutável', () => assertFails(updateDoc(p(dono, 'perfil', 'dados'), { criadoEm: 2 })));
await t('campo role negado no perfil', () => assertFails(setDoc(p(dono, 'perfil', 'dados'), { ...PERFIL, role: 'admin' })));
await t('facilidade abaixo do piso negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i1'), { ...ITEM, id: 'i1', facilidade: 1.2 })));
await t('facilidade acima do teto negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i2'), { ...ITEM, id: 'i2', facilidade: 5.1 })));
await t('facilidade NaN negada', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i3'), { ...ITEM, id: 'i3', facilidade: NaN })));
await t('tipo fora do enum negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i4'), { ...ITEM, id: 'i4', tipo: 'outro' })));
await t('repetições negativas negadas', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i5'), { ...ITEM, id: 'i5', repeticoes: -1 })));
await t('intervaloDias absurdo negado', () =>
  assertFails(setDoc(p(dono, 'itensRevisao', 'i6'), { ...ITEM, id: 'i6', intervaloDias: 40000 })));
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
