# SemioGuia Fase 2, Fixação: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revisão espaçada SM-2 (nota automática) das perguntas de quiz + estações OSCE de recordação dos checklists, 100% offline, sobre o ProgressStore e o motor de quiz existentes.

**Architecture:** (1) motor SM-2 puro em `src/revisao/` (sem UI, sem store, datas passadas por parâmetro); (2) `ProgressStore` ganha upsert/list de `ItemRevisao` nos 3 adaptadores, com migração SQLite v2; (3) um serviço de fila (semeadura, limite diário, órfãos) liga motor+store+conteúdo; (4) UI: card "Revisão de hoje" na aba Estudar, rota `/revisao` reutilizando a UI de quiz, estação OSCE acessível da revisão e do bloco de checklist; Perfil ganha 2 números.

**Tech Stack:** o existente (Expo SDK 57, expo-router, TypeScript strict, jest-expo, @testing-library/react-native v14 com render assíncrono, zod v4). Nenhuma dependência nova.

**Spec:** docs/superpowers/specs/2026-08-21-semioguia-fase2-fixacao-design.md: o plano argumenta a partir dela; leia antes.

## Global Constraints

- Convenções da casa (1B/1C): tokens only (`src/design/tokens.ts` via `useTema()`), escala em texto de leitura, pt-BR na UI, a11y (roles/states/labels, alvos ≥44pt), dois temas, testes co-locados, commits convencionais em inglês, sem identificadores de modelo em nada commitado.
- Datas do agendador: dia como string `YYYY-MM-DD`; NUNCA `new Date()`/`Date.now()` dentro do motor puro: `hoje` entra por parâmetro (UI usa um helper único).
- SM-2 exato da spec: EF inicial 2.5, piso 1.3; `EF' = EF + (0.1 − (5−q)·(0.08 + (5−q)·0.02))`; q≥3: intervalos 1, 6, depois `round(anterior × EF')`; q<3: `repeticoes=0`, intervalo 1. Notas: pergunta certa=4, errada=2; estação 100%=5, ≥80%=4, <80%=2.
- Limite: no máximo 20 itens NOVOS (`repeticoes === 0` e nunca avaliados) por dia na fila; vencidos já revisados não têm limite.
- Id de item: pergunta = `pergunta.id`; checklist = `` `${topicoId}#checklist:${titulo}` `` (título renomeado ⇒ item órfão, ignorado sem crash).
- Item órfão (id sem correspondência no conteúdo atual) é filtrado ao montar a fila, nunca quebra.

---

### Task 1: Motor SM-2 puro

**Files:**
- Create: `src/revisao/sm2.ts`, Test: `src/revisao/sm2.test.ts`

**Interfaces (Produces, Tasks 2-5 dependem):**

```ts
export type TipoItem = 'pergunta' | 'checklist';
export interface ItemRevisao {
  id: string; tipo: TipoItem; topicoId: string;
  facilidade: number;      // EF, inicial 2.5, piso 1.3
  repeticoes: number;      // acertos consecutivos; 0 = novo ou reiniciado
  intervaloDias: number;   // 0 em item recém-criado
  proximaRevisao: string;  // 'YYYY-MM-DD'
  atualizadoEm: string;    // ISO datetime da última mudança
}
export type NotaSm2 = 2 | 4 | 5;
export function notaDePergunta(correta: boolean): NotaSm2;
export function notaDeEstacao(percentual: number): NotaSm2;
export function amanha(hoje: string): string;                 // hoje + 1 dia (UTC-safe)
export function criarItem(id: string, tipo: TipoItem, topicoId: string, hoje: string, agoraIso: string): ItemRevisao; // proximaRevisao = amanha(hoje)
export function avaliar(item: ItemRevisao, nota: NotaSm2, hoje: string, agoraIso: string): ItemRevisao;
export function vencidos(itens: ItemRevisao[], hoje: string): ItemRevisao[]; // proximaRevisao <= hoje, mais atrasados primeiro; empate: id asc
```

- [ ] **Step 1: testes que falham**, em `sm2.test.ts` (pt-BR, describe 'sm2'):

```ts
import { amanha, avaliar, criarItem, notaDeEstacao, notaDePergunta, vencidos } from './sm2';

const HOJE = '2026-08-21'; const AGORA = '2026-08-21T12:00:00.000Z';

test('notas automáticas', () => {
  expect(notaDePergunta(true)).toBe(4);
  expect(notaDePergunta(false)).toBe(2);
  expect(notaDeEstacao(100)).toBe(5);
  expect(notaDeEstacao(80)).toBe(4);
  expect(notaDeEstacao(79)).toBe(2);
});
test('amanha atravessa fim de mês e ano', () => {
  expect(amanha('2026-08-31')).toBe('2026-09-01');
  expect(amanha('2026-12-31')).toBe('2027-01-01');
});
test('item novo revisa amanhã com EF 2.5', () => {
  const i = criarItem('pa-1', 'pergunta', 'a/b/c', HOJE, AGORA);
  expect(i).toMatchObject({ facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22' });
});
test('sequência de acertos: 1, 6, round(6×EF)', () => {
  let i = criarItem('pa-1', 'pergunta', 'a/b/c', HOJE, AGORA);
  i = avaliar(i, 4, '2026-08-22', AGORA);          // q=4 mantém EF
  expect(i).toMatchObject({ repeticoes: 1, intervaloDias: 1, proximaRevisao: '2026-08-23', facilidade: 2.5 });
  i = avaliar(i, 4, '2026-08-23', AGORA);
  expect(i).toMatchObject({ repeticoes: 2, intervaloDias: 6, proximaRevisao: '2026-08-29' });
  i = avaliar(i, 4, '2026-08-29', AGORA);
  expect(i.intervaloDias).toBe(15);                 // round(6 × 2.5)
});
test('q=5 soma 0.1 ao EF; q=2 subtrai 0.32 com piso 1.3 e reinicia', () => {
  let i = criarItem('x', 'pergunta', 't', HOJE, AGORA);
  i = avaliar(i, 5, HOJE, AGORA);
  expect(i.facilidade).toBeCloseTo(2.6);
  i = { ...i, facilidade: 1.4, repeticoes: 5, intervaloDias: 40 };
  i = avaliar(i, 2, HOJE, AGORA);
  expect(i).toMatchObject({ repeticoes: 0, intervaloDias: 1, proximaRevisao: amanha(HOJE) });
  expect(i.facilidade).toBe(1.3);                   // 1.4 − 0.32 < piso
});
test('vencidos: <= hoje, mais atrasado primeiro, empate por id', () => {
  const a = { ...criarItem('a', 'pergunta', 't', HOJE, AGORA), proximaRevisao: '2026-08-19' };
  const b = { ...criarItem('b', 'checklist', 't', HOJE, AGORA), proximaRevisao: '2026-08-21' };
  const c = { ...criarItem('c', 'pergunta', 't', HOJE, AGORA), proximaRevisao: '2026-08-22' };
  const d = { ...criarItem('d', 'pergunta', 't', HOJE, AGORA), proximaRevisao: '2026-08-19' };
  expect(vencidos([c, b, d, a], '2026-08-21').map((i) => i.id)).toEqual(['a', 'd', 'b']);
});
```

- [ ] **Step 2:** `npx jest src/revisao/sm2.test.ts`: FALHA (módulo não existe).
- [ ] **Step 3: implementação mínima**, `sm2.ts`:

```ts
export type TipoItem = 'pergunta' | 'checklist';
export interface ItemRevisao { id: string; tipo: TipoItem; topicoId: string; facilidade: number; repeticoes: number; intervaloDias: number; proximaRevisao: string; atualizadoEm: string }
export type NotaSm2 = 2 | 4 | 5;
const EF_INICIAL = 2.5; const EF_PISO = 1.3;

export function notaDePergunta(correta: boolean): NotaSm2 { return correta ? 4 : 2; }
export function notaDeEstacao(percentual: number): NotaSm2 {
  if (percentual >= 100) return 5;
  return percentual >= 80 ? 4 : 2;
}
export function amanha(hoje: string): string { return somarDias(hoje, 1); }
function somarDias(dia: string, n: number): string {
  const d = new Date(`${dia}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function criarItem(id: string, tipo: TipoItem, topicoId: string, hoje: string, agoraIso: string): ItemRevisao {
  return { id, tipo, topicoId, facilidade: EF_INICIAL, repeticoes: 0, intervaloDias: 0, proximaRevisao: amanha(hoje), atualizadoEm: agoraIso };
}
export function avaliar(item: ItemRevisao, nota: NotaSm2, hoje: string, agoraIso: string): ItemRevisao {
  const q = nota;
  const ef = Math.max(EF_PISO, item.facilidade + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  if (q < 3) {
    return { ...item, facilidade: ef, repeticoes: 0, intervaloDias: 1, proximaRevisao: amanha(hoje), atualizadoEm: agoraIso };
  }
  const repeticoes = item.repeticoes + 1;
  const intervaloDias = repeticoes === 1 ? 1 : repeticoes === 2 ? 6 : Math.round(item.intervaloDias * ef);
  return { ...item, facilidade: ef, repeticoes, intervaloDias, proximaRevisao: somarDias(hoje, intervaloDias), atualizadoEm: agoraIso };
}
export function vencidos(itens: ItemRevisao[], hoje: string): ItemRevisao[] {
  return itens
    .filter((i) => i.proximaRevisao <= hoje)
    .sort((a, b) => a.proximaRevisao.localeCompare(b.proximaRevisao) || a.id.localeCompare(b.id));
}
```

- [ ] **Step 4:** suíte inteira + `npx tsc --noEmit`, verde/limpo.
- [ ] **Step 5:** `git add src/revisao && git commit -m "feat: pure SM-2 review scheduler with automatic grading"`

---

### Task 2: ProgressStore v2, itens de revisão nos 3 adaptadores

**Files:**
- Modify: `src/progress/types.ts`, `src/progress/memoryStore.ts`, `src/progress/localStorageStore.ts`, `src/progress/sqliteStore.ts`, `src/progress/contract.ts`
- Test: `src/progress/contract.test.ts` (a suíte compartilhada roda os casos novos nos adaptadores testáveis)

**Interfaces:**
- Consumes: `ItemRevisao` de `src/revisao/sm2.ts` (Task 1).
- Produces (Tasks 3-5 dependem):

```ts
// acrescentar em ProgressStore:
salvarItemRevisao(item: ItemRevisao): Promise<void>;   // upsert por item.id
listarItensRevisao(): Promise<ItemRevisao[]>;          // ordem livre; quem consome ordena
```

- [ ] **Step 1: contrato primeiro (TDD)**, em `contract.ts`, dentro de `testarContratoProgressStore`, acrescentar bloco:

```ts
test('salvarItemRevisao faz upsert por id e listarItensRevisao devolve todos', async () => {
  const store = criarStore();
  const base: ItemRevisao = { id: 'pa-1', tipo: 'pergunta', topicoId: 'a/b/c', facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22', atualizadoEm: '2026-08-21T12:00:00.000Z' };
  await store.salvarItemRevisao(base);
  await store.salvarItemRevisao({ ...base, id: 'a/b/c#checklist:Medida da PA', tipo: 'checklist' });
  await store.salvarItemRevisao({ ...base, repeticoes: 3, intervaloDias: 15, proximaRevisao: '2026-09-06' }); // upsert do pa-1
  const itens = await store.listarItensRevisao();
  expect(itens).toHaveLength(2);
  const pa1 = itens.find((i) => i.id === 'pa-1');
  expect(pa1).toMatchObject({ repeticoes: 3, intervaloDias: 15, proximaRevisao: '2026-09-06', facilidade: 2.5 });
});
```

(Seguir o padrão de import/uso já existente no arquivo; `ItemRevisao` importado de `../revisao/sm2`.)

- [ ] **Step 2:** `npx jest src/progress/contract.test.ts`: FALHA (métodos ausentes) nos adaptadores exercitados (memory e localStorage; o SQLite não roda no jest, como já documentado no arquivo).
- [ ] **Step 3: implementar.** `types.ts`: as 2 assinaturas na interface (import type de `../revisao/sm2`). `memoryStore`: `Map<string, ItemRevisao>`. `localStorageStore`: seguir o padrão do arquivo (chave nova, ex. `semioguia.itensRevisao`, objeto `{ [id]: ItemRevisao }`, JSON.parse tolerante como as demais chaves). `sqliteStore`: migração v2, 

```ts
const ESQUEMA_V2 = `
CREATE TABLE IF NOT EXISTS itens_revisao (
  id TEXT PRIMARY KEY, tipo TEXT, topico_id TEXT,
  facilidade REAL, repeticoes INTEGER, intervalo_dias INTEGER,
  proxima_revisao TEXT, atualizado_em TEXT
);`;
const VERSAO_ESQUEMA = '2';
private migrar(): void {
  this.db.execSync(ESQUEMA_V1);   // idempotente (IF NOT EXISTS): banco v1 abre e evolui sem perder dados
  this.db.execSync(ESQUEMA_V2);
  this.db.runSync('INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)', ['versao_esquema', VERSAO_ESQUEMA]);
}
```

`salvarItemRevisao` = `INSERT OR REPLACE`; `listarItensRevisao` = `SELECT` com mapeamento snake_case→camelCase (espelhar `listarRespostas`).

- [ ] **Step 4:** suíte inteira + typecheck, verdes.
- [ ] **Step 5:** `git add src/progress src/revisao && git commit -m "feat: review-item persistence in all progress store adapters with sqlite v2 migration"`

---

### Task 3: Serviço de fila, semeadura, limite diário, órfãos

**Files:**
- Create: `src/revisao/fila.ts`, Test: `src/revisao/fila.test.ts`

**Interfaces:**
- Consumes: Task 1 (`ItemRevisao`, `criarItem`, `vencidos`); tipos de conteúdo de `src/content/schema.ts` (`Topico` com `blocos` e `quiz`: conferir os nomes exatos exportados no arquivo antes de usar).
- Produces (Tasks 4-5 dependem):

```ts
export function idDeChecklist(topicoId: string, titulo: string): string; // `${topicoId}#checklist:${titulo}`
export function semearTopico(topico: Topico, existentes: ItemRevisao[], hoje: string, agoraIso: string): ItemRevisao[];
// devolve APENAS os itens novos (perguntas do quiz + checklists ainda sem item); vazio se tudo já existe (idempotente)
export interface FilaDeHoje { itens: ItemRevisao[]; totalPerguntas: number; totalChecklists: number }
export function montarFila(itens: ItemRevisao[], idsValidos: Set<string>, hoje: string, limiteNovos?: number): FilaDeHoje;
// vencidos ∩ idsValidos; novos (repeticoes===0 e intervaloDias===0) limitados a limiteNovos (default 20), demais sem limite
```

- [ ] **Step 1: testes que falham**, casos obrigatórios em `fila.test.ts` (montar um `Topico` mínimo inline com 2 perguntas de quiz e 1 bloco checklist):
  - `semearTopico` cria 1 item por pergunta + 1 por checklist, todos com `proximaRevisao = amanha(hoje)`;
  - idempotência: semear de novo com os itens existentes devolve `[]`;
  - `idDeChecklist('a/b/c', 'Medida da PA')` === `'a/b/c#checklist:Medida da PA'`;
  - `montarFila` exclui item órfão (id fora de `idsValidos`) sem lançar;
  - limite: com 25 itens novos vencidos e 3 revisados vencidos, a fila tem 20 novos + 3 revisados; os novos escolhidos são os de `proximaRevisao` mais antiga (ordem de `vencidos`);
  - contadores `totalPerguntas`/`totalChecklists` refletem a fila final.
- [ ] **Step 2:** rodar, FALHA.
- [ ] **Step 3: implementar.** `semearTopico`: percorre `topico.quiz` (perguntas) e blocos `tipo === 'checklist'`; cria com `criarItem` apenas ids ausentes em `existentes`. `montarFila`: `vencidos(...)` → filtra `idsValidos.has(id)` → separa novos (`repeticoes === 0 && intervaloDias === 0`) e aplica `slice(0, limiteNovos)` preservando a ordem, junta com os demais e reordena com `vencidos` de novo (para intercalar por data).
- [ ] **Step 4:** suíte + typecheck, verdes.
- [ ] **Step 5:** `git add src/revisao && git commit -m "feat: review queue service with seeding, daily cap and orphan filtering"`

---

### Task 4: Estação OSCE (recordação de checklist)

**Files:**
- Create: `src/revisao/EstacaoOsce.tsx`, Test: `src/revisao/EstacaoOsce.test.tsx`
- Modify: `src/blocos/Checklist.tsx` (entrada "Praticar como estação"), `src/app/topico/` (tela do tópico: navegação para a estação, conferir o arquivo exato da rota), Create: `src/app/estacao/[...caminho].tsx` (rota da estação avulsa)

**Interfaces:**
- Consumes: `notaDeEstacao` (Task 1), quem embute a estação decide o que fazer com o resultado.
- Produces (Task 5 usa embutido na sessão de revisão):

```tsx
// Componente controlado, sem acesso a store: devolve o resultado ao pai.
export interface ResultadoEstacao { lembrados: number; total: number; percentual: number }
export function EstacaoOsce(props: {
  titulo: string;
  passos: string[];
  aoConcluir: (r: ResultadoEstacao) => void;
}): JSX.Element;
```

Comportamento: cabeçalho com o título e contador "passo X de N"; o passo atual começa OCULTO (card com "Tente recordar o próximo passo"); botão **Revelar passo** (≥44pt) mostra o texto; então dois botões **Lembrei** / **Esqueci** (≥44pt, `accessibilityRole="button"`); ao responder o último, tela de resumo com % e lista dos esquecidos, e `aoConcluir({lembrados, total, percentual})`. Percentual = `Math.round(lembrados/total*100)`. Tokens/escala/dois temas como todo componente da casa; textos pt-BR.

- [ ] **Step 1: testes que falham**, `EstacaoOsce.test.tsx` (render assíncrono, padrão dos vizinhos): passo oculto por padrão (texto do passo NÃO está na tela); "Revelar passo" mostra o texto e os botões Lembrei/Esqueci; fluxo completo com 3 passos (2 lembrei + 1 esqueci) chama `aoConcluir` com `{lembrados: 2, total: 3, percentual: 67}` e mostra "67%" no resumo; passo esquecido aparece listado no resumo.
- [ ] **Step 2:** rodar, FALHA.
- [ ] **Step 3:** implementar o componente.
- [ ] **Step 4:** integrar: em `Checklist.tsx`, botão discreto "Praticar como estação" (visível só quando o bloco tem `titulo`; navega com `router.push` para `/estacao/<topicoId>?titulo=<titulo>`); rota `src/app/estacao/[...caminho].tsx` resolve o tópico no ContentContext, acha o bloco checklist pelo título, renderiza `EstacaoOsce` e, em `aoConcluir`, atualiza o agendador: carrega itens do store, `criarItem` se não existe, `avaliar(item, notaDeEstacao(percentual), hoje, agora)`, `salvarItemRevisao`. Helper de data local único (ex. `src/revisao/hoje.ts` com `hojeLocal(): string` e `agoraIso(): string`), criar aqui, Task 5 reutiliza.
- [ ] **Step 5:** suíte + typecheck; conferência visual rápida (web export não é necessário, basta jest/render). `git add src/revisao src/blocos src/app && git commit -m "feat: OSCE recall station for checklists"`

---

### Task 5: Revisão de hoje, card, sessão e Perfil

**Files:**
- Modify: `src/app/(tabs)/estudar.tsx` (card no topo), `src/app/(tabs)/perfil.tsx` (2 números), pontos de integração: tela do tópico (`src/app/topico/…`, semeadura ao marcar estudado) e fluxo de quiz (`src/app/quiz/…`, avaliar item ao responder fora da revisão)
- Create: `src/app/revisao.tsx` (rota da sessão), Test: co-locado seguindo o padrão das telas (ex.: `src/app/(tabs)/estudar.test.tsx` já existente: estender)

**Interfaces:**
- Consumes: Tasks 1-4 (`montarFila`, `semearTopico`, `avaliar`, `notaDePergunta`, `EstacaoOsce`, store v2, `hojeLocal/agoraIso`).
- Produces: nada novo para tasks futuras.

Comportamento:
1. **Card "Revisão de hoje"** (topo da aba Estudar, acima do quiz por tópico existente, com `useDadosAoFocar` para atualizar ao voltar): mostra "N perguntas · M estações" a partir de `montarFila` (ids válidos = perguntas e checklists do conteúdo atual via ContentContext); toque → `router.push('/revisao')`. Fila vazia → card em estado vazio: "Nada para revisar hoje" + subtítulo "Estude um tópico no Guia para semear a revisão" (sem navegação).
2. **Sessão `/revisao`:** percorre `FilaDeHoje.itens` em ordem; item `pergunta` renderiza a pergunta com a MESMA UI do quiz existente (reutilizar o componente que o fluxo `/quiz/[...]` usa: extrair para componente compartilhado se hoje estiver inline; extração mínima, sem redesenho); item `checklist` renderiza `EstacaoOsce`. Após cada item: `avaliar` com a nota automática e `salvarItemRevisao` imediatamente (progresso não se perde se abandonar no meio). Tela final: acertos/erros da sessão e botão voltar.
3. **Semeadura:** na ação existente de "marcar como estudado" da tela do tópico, quando `estudado === true`: `semearTopico` + `salvarItemRevisao` de cada novo (fire-and-forget com catch silencioso, sem bloquear a UI).
4. **Quiz avulso:** onde o fluxo de quiz registra `registrarResposta`, também criar/avaliar o item da pergunta (`criarItem` se ausente + `avaliar` com `notaDePergunta`).
5. **Perfil:** na seção de progresso, duas linhas novas: "Para revisar hoje: N" e "Itens em dia: M" (M = itens não vencidos), com `useDadosAoFocar`.

- [ ] **Step 1: testes que falham**, estender os testes das telas (padrão existente com providers mockados/memory store): card mostra contagem com itens vencidos semeados; card vazio mostra "Nada para revisar hoje"; sessão com 1 pergunta certa salva item com `repeticoes: 1` no store de memória; marcar estudado semeia itens (store de memória passa a listar N itens); Perfil mostra os 2 números.
- [ ] **Step 2:** rodar, FALHA.
- [ ] **Step 3:** implementar (respeitando escala/tokens/a11y; strings pt-BR acima).
- [ ] **Step 4:** suíte inteira + typecheck + `npm run checar:contraste`, verdes.
- [ ] **Step 5:** `git add src/app src/quiz src/revisao && git commit -m "feat: daily review card, review session and profile counters"`

---

### Task 6: Gates finais + deploy

**Files:** branch `gh-pages` regenerada (procedimento padrão, autorizado); `docs/verificacao-fase1b.md` ganha "Adendo Fase 2".

- [ ] Suíte inteira + `npx tsc --noEmit` + `npm run checar:contraste` + `npm run build:content` com `git diff --exit-code assets/generated/content.json`: tudo verde.
- [ ] Export web com baseUrl `/SemioGuia` (editar `app.json` temporariamente, exportar, reverter), regenerar `gh-pages` órfã via worktree com `.nojekyll` + `404.html`, force-push SÓ para `gh-pages`.
- [ ] Teste headless no caminho `/SemioGuia/` (390×844, claro e escuro): aba Estudar mostra o card; marcar um tópico como estudado no fluxo real → card passa a contar itens no dia seguinte (simular: verificar que a semeadura gravou itens com `proximaRevisao` = amanhã via localStorage); abrir uma estação OSCE pelo bloco de checklist e completá-la; screenshots para o autor.
- [ ] "Adendo Fase 2" no doc de verificação (pt-BR, curto): o que entrou + resultados do headless.
- [ ] Commit dos ajustes + push da branch principal.

## Fora deste plano
- Cronômetro/modo treino da estação; botões Difícil/Bom/Fácil; notificações; configuração do limite diário (spec §7).

## Self-review (do plano)
- Cobertura da spec: §3 motor → T1; §3.3 semeadura/limite → T3 e T5.3-4; §4 persistência/migração → T2; §5.1-5.2 → T5; §5.3 estação → T4; §5.4 Perfil → T5.5; §6 testes → distribuídos; §7 fora de escopo respeitado.
- Tipos consistentes entre tasks (ItemRevisao/NotaSm2/FilaDeHoje/ResultadoEstacao): conferidos.
- Sem placeholders; código real nos passos de motor, contrato e migração; UI com contratos e comportamento exaustivos.
