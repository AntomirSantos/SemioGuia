# SemioGuia Fase 1A, Fundação: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a fundação do app SemioGuia: projeto Expo, schema/pipeline de conteúdo com validação, conteúdo piloto, busca offline, motor de quiz, armazenamento de progresso e CI, tudo testável sem interface.

**Architecture:** Conteúdo médico em arquivos Markdown (frontmatter + blocos YAML cercados) compilados por um script Node em um JSON validado e embutido no app. O app (React Native + Expo, TypeScript) apenas consome esse JSON via módulos puros (store, busca, quiz, progresso), todos testados com Jest. A UI chega na Fase 1B, após mockups aprovados.

**Tech Stack:** Expo (create-expo-app template default, expo-router), TypeScript strict, zod, gray-matter, js-yaml, MiniSearch, tsx, Jest (jest-expo).

**Spec:** `docs/superpowers/specs/2026-08-21-semioguia-design.md`

## Global Constraints

- TypeScript `strict: true`; sem `any` não justificado.
- 100% offline: nenhuma chamada de rede em runtime.
- Zero coleta de dados pessoais.
- Todo texto de UI e conteúdo em pt-BR.
- Erro de conteúdo falha o build (`npm run build:content` retorna exit code ≠ 0), nunca chega ao usuário.
- Conteúdo médico gerado neste plano é rascunho: frontmatter `revisao: pendente` até o autor aprovar. Nunca copiar texto verbatim dos livros de referência (em `/home/user/semioguia-referencias/`); redigir original e citar referência.
- Aviso legal exato do app: "Material educacional. Não substitui o julgamento clínico."
- Commits frequentes; mensagens em inglês convencional (`feat:`, `test:`, `chore:`).
- Node ≥ 20. Todos os testes via `npx jest <path>`.

---

### Task 1: Scaffold do projeto Expo

**Files:**
- Create: projeto Expo na raiz do repo (`app/`, `package.json`, `tsconfig.json`, `app.json`, …)
- Modify: `.gitignore` (garantir `node_modules/`, `.expo/`)
- Create: `jest.config.js`

**Interfaces:**
- Consumes: nada (primeiro task).
- Produces: projeto compilável com `npx tsc --noEmit`; runner de testes `npx jest` funcionando (preset `jest-expo`); scripts npm `test`, `typecheck`.

- [ ] **Step 1: Scaffold em diretório temporário e mover para a raiz**

```bash
cd /home/user/SemioGuia
npx create-expo-app@latest semioguia-tmp --template default --no-install
# mover conteúdo (repo não tem README nem arquivos conflitantes)
rsync -a semioguia-tmp/ ./ && rm -rf semioguia-tmp
npm install
```

- [ ] **Step 2: Ativar TypeScript strict**

Em `tsconfig.json`, dentro de `compilerOptions`, garantir:

```json
{ "strict": true }
```

Rodar: `npx tsc --noEmit` → Expected: sem erros.

- [ ] **Step 3: Instalar e configurar Jest**

```bash
npx expo install jest-expo jest @types/jest -- --save-dev
```

Criar `jest.config.js`:

```js
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};
```

Em `package.json`, adicionar scripts:

```json
{
  "test": "jest",
  "typecheck": "tsc --noEmit",
  "build:content": "tsx scripts/build-content.ts"
}
```

- [ ] **Step 4: Teste-fumaça do runner**

Criar `src/smoke.test.ts`:

```ts
test('jest funciona', () => {
  expect(1 + 1).toBe(2);
});
```

Rodar: `npx jest src/smoke.test.ts` → Expected: PASS. Depois `rm src/smoke.test.ts`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Expo app with strict TS and Jest"
```

---

### Task 2: Schema de conteúdo (zod)

**Files:**
- Create: `src/content/schema.ts`
- Test: `src/content/schema.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces (usados por Tasks 3, 4, 6, 7, 8):

```ts
// Blocos
export type Bloco =
  | { tipo: 'conceito'; titulo?: string; texto: string }
  | { tipo: 'manobra'; titulo: string; passos: string[]; observar?: string }
  | { tipo: 'sinal'; nome: string; descricao: string; significado: string; causas: string[] }
  | { tipo: 'checklist'; titulo: string; itens: string[] }
  | { tipo: 'tabela'; titulo?: string; colunas: string[]; linhas: string[][] }
  | { tipo: 'fluxograma'; titulo?: string; etapas: { texto: string; formato: 'inicio' | 'decisao' | 'acao' | 'fim' }[] }
  | { tipo: 'perola'; texto: string }
  | { tipo: 'quiz'; perguntas: QuizPergunta[] };

export interface QuizPergunta {
  id: string;
  enunciado: string;
  alternativas: string[]; // 2 a 5
  corretaIndex: number;   // índice válido em alternativas
  explicacao: string;
}

export interface Topico {
  id: string;          // "<sistemaId>/<capituloId>/<slug>"
  titulo: string;
  sistemaId: string;
  capituloId: string;
  ordem: number;
  tags: string[];
  referencias: string[]; // não-vazio
  revisao: 'pendente' | 'aprovada';
  blocos: Bloco[];       // não-vazio
}

export interface Capitulo { id: string; titulo: string; ordem: number; topicos: Topico[] }
export interface Sistema { id: string; titulo: string; cor: string; icone: string; ordem: number; capitulos: Capitulo[] }
export interface Conteudo { versao: string; sistemas: Sistema[] }

// Schemas zod exportados: blocoSchema, quizPerguntaSchema, topicoSchema, conteudoSchema
```

- [ ] **Step 1: Escrever testes que falham**

`src/content/schema.test.ts`:

```ts
import { blocoSchema, quizPerguntaSchema, topicoSchema } from './schema';

test('aceita bloco conceito válido', () => {
  expect(blocoSchema.parse({ tipo: 'conceito', texto: 'A pressão arterial...' }))
    .toMatchObject({ tipo: 'conceito' });
});

test('rejeita manobra sem passos', () => {
  expect(() => blocoSchema.parse({ tipo: 'manobra', titulo: 'X', passos: [] })).toThrow();
});

test('rejeita quiz com corretaIndex fora do intervalo', () => {
  expect(() =>
    quizPerguntaSchema.parse({
      id: 'q1', enunciado: 'E?', alternativas: ['a', 'b'], corretaIndex: 2, explicacao: 'x',
    }),
  ).toThrow();
});

test('rejeita topico sem referencias', () => {
  expect(() =>
    topicoSchema.parse({
      id: 's/c/t', titulo: 'T', sistemaId: 's', capituloId: 'c', ordem: 1,
      tags: [], referencias: [], revisao: 'pendente',
      blocos: [{ tipo: 'conceito', texto: 'x' }],
    }),
  ).toThrow();
});
```

- [ ] **Step 2: Rodar e ver falhar**

`npx jest src/content/schema.test.ts` → Expected: FAIL (module não existe).

- [ ] **Step 3: Implementar `src/content/schema.ts`**

```bash
npm install zod
```

```ts
import { z } from 'zod';

export const quizPerguntaSchema = z
  .object({
    id: z.string().min(1),
    enunciado: z.string().min(1),
    alternativas: z.array(z.string().min(1)).min(2).max(5),
    corretaIndex: z.number().int().nonnegative(),
    explicacao: z.string().min(1),
  })
  .refine((p) => p.corretaIndex < p.alternativas.length, {
    message: 'corretaIndex fora do intervalo de alternativas',
  });

const etapaFluxo = z.object({
  texto: z.string().min(1),
  formato: z.enum(['inicio', 'decisao', 'acao', 'fim']),
});

export const blocoSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('conceito'), titulo: z.string().optional(), texto: z.string().min(1) }),
  z.object({ tipo: z.literal('manobra'), titulo: z.string().min(1), passos: z.array(z.string().min(1)).min(1), observar: z.string().optional() }),
  z.object({ tipo: z.literal('sinal'), nome: z.string().min(1), descricao: z.string().min(1), significado: z.string().min(1), causas: z.array(z.string().min(1)).min(1) }),
  z.object({ tipo: z.literal('checklist'), titulo: z.string().min(1), itens: z.array(z.string().min(1)).min(1) }),
  z.object({ tipo: z.literal('tabela'), titulo: z.string().optional(), colunas: z.array(z.string().min(1)).min(2), linhas: z.array(z.array(z.string())).min(1) }),
  z.object({ tipo: z.literal('fluxograma'), titulo: z.string().optional(), etapas: z.array(etapaFluxo).min(2) }),
  z.object({ tipo: z.literal('perola'), texto: z.string().min(1) }),
  z.object({ tipo: z.literal('quiz'), perguntas: z.array(quizPerguntaSchema).min(1) }),
]);

export const topicoSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/),
  titulo: z.string().min(1),
  sistemaId: z.string().min(1),
  capituloId: z.string().min(1),
  ordem: z.number().int().positive(),
  tags: z.array(z.string()),
  referencias: z.array(z.string().min(1)).min(1),
  revisao: z.enum(['pendente', 'aprovada']),
  blocos: z.array(blocoSchema).min(1),
});

export const capituloSchema = z.object({
  id: z.string().min(1), titulo: z.string().min(1), ordem: z.number().int().positive(),
  topicos: z.array(topicoSchema),
});

export const sistemaSchema = z.object({
  id: z.string().min(1), titulo: z.string().min(1),
  cor: z.string().regex(/^#[0-9a-fA-F]{6}$/), icone: z.string().min(1),
  ordem: z.number().int().positive(), capitulos: z.array(capituloSchema),
});

export const conteudoSchema = z.object({ versao: z.string().min(1), sistemas: z.array(sistemaSchema) });

export type QuizPergunta = z.infer<typeof quizPerguntaSchema>;
export type Bloco = z.infer<typeof blocoSchema>;
export type Topico = z.infer<typeof topicoSchema>;
export type Capitulo = z.infer<typeof capituloSchema>;
export type Sistema = z.infer<typeof sistemaSchema>;
export type Conteudo = z.infer<typeof conteudoSchema>;
```

- [ ] **Step 4: Rodar testes**

`npx jest src/content/schema.test.ts` → Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/ package.json package-lock.json
git commit -m "feat: content schema with zod validation"
```

---

### Task 3: Parser de arquivos de tópico

**Files:**
- Create: `scripts/parse-topico.ts`
- Test: `scripts/parse-topico.test.ts`

**Interfaces:**
- Consumes: `blocoSchema`, `topicoSchema` de `src/content/schema.ts` (Task 2).
- Produces (usado pela Task 4):

```ts
// scripts/parse-topico.ts
export interface TopicoParseado { frontmatter: Record<string, unknown>; blocos: unknown[] }
export function parseTopico(markdown: string, caminho: string): TopicoParseado; // lança Error com caminho+motivo
```

**Formato de arquivo de tópico** (contrato do repositório de conteúdo):

```markdown
---
titulo: Pressão arterial
ordem: 1
tags: [PA, hipertensão]
referencias: ["Porto, Semiologia Médica, 8ª ed., cap. X"]
revisao: pendente
---

::: conceito
texto: |
  A medida da pressão arterial é...
:::

::: manobra
titulo: Medida da PA no braço
passos:
  - Posicionar o paciente sentado, braço apoiado
  - Insuflar o manguito 20-30 mmHg acima do desaparecimento do pulso radial
observar: Diferenças entre os braços > 10 mmHg
:::
```

Cada bloco é `::: <tipo>` + corpo YAML + `:::`.

- [ ] **Step 1: Escrever testes que falham**

`scripts/parse-topico.test.ts`:

```ts
import { parseTopico } from './parse-topico';

const doc = `---
titulo: Teste
ordem: 1
tags: [a]
referencias: ["Ref"]
revisao: pendente
---

::: conceito
texto: |
  Um conceito.
:::

::: perola
texto: Uma pérola.
:::
`;

test('extrai frontmatter e blocos na ordem', () => {
  const r = parseTopico(doc, 'x/y/z.md');
  expect(r.frontmatter.titulo).toBe('Teste');
  expect(r.blocos).toHaveLength(2);
  expect(r.blocos[0]).toMatchObject({ tipo: 'conceito', texto: 'Um conceito.\n' });
  expect(r.blocos[1]).toMatchObject({ tipo: 'perola' });
});

test('erro em bloco sem fechamento cita o caminho', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\n::: conceito\ntexto: x\n', 'a/b/c.md'))
    .toThrow(/a\/b\/c\.md/);
});

test('erro em YAML inválido dentro do bloco', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\n::: conceito\n: :\n:::\n', 'a/b/c.md'))
    .toThrow();
});
```

- [ ] **Step 2: Rodar e ver falhar**

`npx jest scripts/parse-topico.test.ts` → Expected: FAIL.

- [ ] **Step 3: Implementar**

```bash
npm install gray-matter js-yaml tsx
npm install -D @types/js-yaml
```

`scripts/parse-topico.ts`:

```ts
import matter from 'gray-matter';
import { load } from 'js-yaml';

export interface TopicoParseado {
  frontmatter: Record<string, unknown>;
  blocos: unknown[];
}

export function parseTopico(markdown: string, caminho: string): TopicoParseado {
  const { data, content } = matter(markdown);
  const linhas = content.split('\n');
  const blocos: unknown[] = [];
  let dentro: string | null = null;
  let corpo: string[] = [];

  for (const linha of linhas) {
    const abre = linha.match(/^:::\s+([a-z]+)\s*$/);
    if (abre && dentro === null) {
      dentro = abre[1];
      corpo = [];
    } else if (linha.trim() === ':::' && dentro !== null) {
      let dados: unknown;
      try {
        dados = load(corpo.join('\n'));
      } catch (e) {
        throw new Error(`${caminho}: YAML inválido no bloco "${dentro}": ${(e as Error).message}`);
      }
      if (typeof dados !== 'object' || dados === null) {
        throw new Error(`${caminho}: bloco "${dentro}" não contém um mapa YAML`);
      }
      blocos.push({ tipo: dentro, ...(dados as Record<string, unknown>) });
      dentro = null;
    } else if (dentro !== null) {
      corpo.push(linha);
    } else if (linha.trim() !== '') {
      throw new Error(`${caminho}: texto fora de bloco: "${linha.trim().slice(0, 40)}"`);
    }
  }
  if (dentro !== null) throw new Error(`${caminho}: bloco "${dentro}" sem fechamento ":::"`);
  return { frontmatter: data, blocos };
}
```

- [ ] **Step 4: Rodar testes**

`npx jest scripts/parse-topico.test.ts` → Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/ package.json package-lock.json
git commit -m "feat: topic file parser (frontmatter + fenced YAML blocks)"
```

---

### Task 4: Pipeline de build do conteúdo

**Files:**
- Create: `scripts/build-content.ts`
- Create: `content/sistemas.yaml`
- Test: `scripts/build-content.test.ts` (usa fixtures em `scripts/__fixtures__/content-ok/` e `content-ruim/`)

**Interfaces:**
- Consumes: `parseTopico` (Task 3); schemas (Task 2).
- Produces:
  - `export function compilarConteudo(contentDir: string): Conteudo`, lança `Error` agregando todos os problemas encontrados.
  - CLI: `npm run build:content` lê `content/`, escreve `assets/generated/content.json` e imprime resumo (nº sistemas/tópicos, nº com `revisao: pendente`). Exit ≠ 0 em erro.
  - Formato de `content/sistemas.yaml`:

```yaml
versao: "0.1.0"
sistemas:
  - id: exame-fisico-geral
    titulo: Exame físico geral
    cor: "#0EA5A4"
    icone: stethoscope
    ordem: 1
    capitulos:
      - id: sinais-vitais
        titulo: Sinais vitais
        ordem: 1
```

- [ ] **Step 1: Criar fixtures**

`scripts/__fixtures__/content-ok/sistemas.yaml`: como o exemplo acima.
`scripts/__fixtures__/content-ok/exame-fisico-geral/sinais-vitais/pressao-arterial.md`: tópico mínimo válido (conceito + referencia).
`scripts/__fixtures__/content-ruim/` : igual, mas com `corretaIndex: 9` num quiz e um tópico em capítulo inexistente `capitulo-fantasma/`.

- [ ] **Step 2: Escrever testes que falham**

`scripts/build-content.test.ts`:

```ts
import * as path from 'path';
import { compilarConteudo } from './build-content';

const ok = path.join(__dirname, '__fixtures__', 'content-ok');
const ruim = path.join(__dirname, '__fixtures__', 'content-ruim');

test('compila diretório válido', () => {
  const c = compilarConteudo(ok);
  expect(c.sistemas).toHaveLength(1);
  const t = c.sistemas[0].capitulos[0].topicos[0];
  expect(t.id).toBe('exame-fisico-geral/sinais-vitais/pressao-arterial');
});

test('agrega erros de diretório inválido', () => {
  expect(() => compilarConteudo(ruim)).toThrow(/corretaIndex/);
  expect(() => compilarConteudo(ruim)).toThrow(/capitulo-fantasma/);
});
```

- [ ] **Step 3: Rodar e ver falhar**, `npx jest scripts/build-content.test.ts` → FAIL.

- [ ] **Step 4: Implementar `scripts/build-content.ts`**

```ts
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';
import { parseTopico } from './parse-topico';
import { conteudoSchema, topicoSchema, type Conteudo, type Topico } from '../src/content/schema';

interface TaxCapitulo { id: string; titulo: string; ordem: number }
interface TaxSistema { id: string; titulo: string; cor: string; icone: string; ordem: number; capitulos: TaxCapitulo[] }
interface Taxonomia { versao: string; sistemas: TaxSistema[] }

export function compilarConteudo(contentDir: string): Conteudo {
  const erros: string[] = [];
  const tax = load(fs.readFileSync(path.join(contentDir, 'sistemas.yaml'), 'utf8')) as Taxonomia;

  const sistemas = tax.sistemas.map((s) => ({
    ...s,
    capitulos: s.capitulos.map((c) => ({ ...c, topicos: [] as Topico[] })),
  }));

  for (const s of sistemas) {
    const dirSistema = path.join(contentDir, s.id);
    if (!fs.existsSync(dirSistema)) continue;
    for (const capDir of fs.readdirSync(dirSistema)) {
      const cap = s.capitulos.find((c) => c.id === capDir);
      if (!cap) {
        erros.push(`${s.id}/${capDir}: capítulo não declarado em sistemas.yaml`);
        continue;
      }
      for (const arq of fs.readdirSync(path.join(dirSistema, capDir)).filter((f) => f.endsWith('.md')).sort()) {
        const caminho = path.join(dirSistema, capDir, arq);
        const slug = arq.replace(/\.md$/, '');
        try {
          const { frontmatter, blocos } = parseTopico(fs.readFileSync(caminho, 'utf8'), caminho);
          const topico = topicoSchema.parse({
            ...frontmatter,
            id: `${s.id}/${cap.id}/${slug}`,
            sistemaId: s.id,
            capituloId: cap.id,
            tags: frontmatter.tags ?? [],
            blocos,
          });
          cap.topicos.push(topico);
        } catch (e) {
          erros.push(`${caminho}: ${(e as Error).message}`);
        }
      }
      cap.topicos.sort((a, b) => a.ordem - b.ordem);
    }
  }

  if (erros.length > 0) throw new Error(`Conteúdo inválido (${erros.length} erro(s)):\n` + erros.join('\n'));
  return conteudoSchema.parse({ versao: tax.versao, sistemas });
}

// CLI
if (require.main === module) {
  const contentDir = path.join(__dirname, '..', 'content');
  const destino = path.join(__dirname, '..', 'assets', 'generated', 'content.json');
  const c = compilarConteudo(contentDir);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, JSON.stringify(c, null, 1));
  const topicos = c.sistemas.flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
  const pendentes = topicos.filter((t) => t.revisao === 'pendente').length;
  console.log(`OK: ${c.sistemas.length} sistemas, ${topicos.length} tópicos (${pendentes} com revisão pendente) → ${destino}`);
}
```

Ajustar o teste da Task 4 Step 2 para casar com essa mensagem: trocar
`.toThrow(/capitulo-fantasma/)` por
`.toThrow(/capítulo não declarado/)`.

- [ ] **Step 5: Rodar testes**, `npx jest scripts/build-content.test.ts` → PASS.

- [ ] **Step 6: Criar `content/sistemas.yaml` real** (uma entrada: `exame-fisico-geral` com capítulo `sinais-vitais`, como no exemplo de interface acima).

- [ ] **Step 7: Commit**

```bash
git add scripts/ content/
git commit -m "feat: content build pipeline with aggregate validation"
```

---

### Task 5: Conteúdo piloto, Sinais vitais

**Files:**
- Create: `content/exame-fisico-geral/sinais-vitais/pressao-arterial.md`
- Create: `content/exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso.md`
- Create: `content/exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria.md`
- Create: `assets/generated/content.json` (gerado)

**Interfaces:**
- Consumes: formato de tópico (Task 3), pipeline (Task 4), livros em `/home/user/semioguia-referencias/` (`porto-semiologia-medica-8ed.pdf`, `porto-exame-clinico-8ed.pdf`, `mcgee-evidence-based-physical-diagnosis-4ed.pdf`).
- Produces: os 8 tipos de bloco exercitados com conteúdo real (rascunho `revisao: pendente`); `content.json` commitado.

- [ ] **Step 1: Localizar os capítulos de sinais vitais nos livros**, usar o sumário dos PDFs (`pdftotext -f 1 -l 30 <pdf> -`) para achar as páginas de pressão arterial, pulso, temperatura e FR; ler as páginas com a ferramenta de leitura de PDF por intervalo.

- [ ] **Step 2: Redigir os 3 tópicos**, redação própria (nunca verbatim), em pt-BR, com: `pressao-arterial.md` contendo blocos `conceito`, `manobra` (técnica de medida), `tabela` (classificação da PA), `perola`, `quiz` (≥3 perguntas); `frequencia-cardiaca-e-pulso.md` contendo `conceito`, `manobra`, `sinal` (ex.: pulso paradoxal), `checklist`, `quiz`; `temperatura-e-frequencia-respiratoria.md` contendo `conceito`, `tabela`, `fluxograma` (abordagem da febre), `perola`, `quiz`. Todos com `revisao: pendente` e `referencias` citando livro/capítulo.

- [ ] **Step 3: Rodar o build**, `npm run build:content` → Expected: `OK: 1 sistemas, 3 tópicos (3 com revisão pendente)`.

- [ ] **Step 4: Rodar a suíte inteira**, `npx jest` → Expected: PASS (nenhuma regressão).

- [ ] **Step 5: Commit**

```bash
git add content/ assets/generated/content.json
git commit -m "feat: pilot content - vital signs chapter (pending author review)"
```

---

### Task 6: Store de conteúdo do app

**Files:**
- Create: `src/content/store.ts`
- Test: `src/content/store.test.ts`

**Interfaces:**
- Consumes: tipos de `src/content/schema.ts`; `assets/generated/content.json`.
- Produces (usados pela UI na Fase 1B e Tasks 7-8):

```ts
export function carregarConteudo(dados: unknown): Conteudo;          // valida com conteudoSchema
export function listarSistemas(c: Conteudo): Sistema[];              // ordenado por .ordem
export function obterSistema(c: Conteudo, sistemaId: string): Sistema | undefined;
export function obterTopico(c: Conteudo, topicoId: string): Topico | undefined;
export function listarTodosTopicos(c: Conteudo): Topico[];
```

- [ ] **Step 1: Escrever testes que falham**, `src/content/store.test.ts` monta um `Conteudo` mínimo inline (2 sistemas com `ordem` invertida; 1 tópico) e verifica: `listarSistemas` ordena; `obterTopico('exame-fisico-geral/sinais-vitais/pressao-arterial')` acha; id inexistente → `undefined`; `carregarConteudo({})` lança.

```ts
import { carregarConteudo, listarSistemas, obterTopico } from './store';

const dados = {
  versao: '0.1.0',
  sistemas: [
    { id: 'b', titulo: 'B', cor: '#111111', icone: 'x', ordem: 2, capitulos: [] },
    {
      id: 'a', titulo: 'A', cor: '#222222', icone: 'y', ordem: 1,
      capitulos: [{
        id: 'c1', titulo: 'C1', ordem: 1,
        topicos: [{
          id: 'a/c1/t1', titulo: 'T1', sistemaId: 'a', capituloId: 'c1', ordem: 1,
          tags: [], referencias: ['R'], revisao: 'pendente',
          blocos: [{ tipo: 'conceito', texto: 'x' }],
        }],
      }],
    },
  ],
};

test('valida e ordena sistemas', () => {
  const c = carregarConteudo(dados);
  expect(listarSistemas(c).map((s) => s.id)).toEqual(['a', 'b']);
});

test('acha tópico por id; inexistente é undefined', () => {
  const c = carregarConteudo(dados);
  expect(obterTopico(c, 'a/c1/t1')?.titulo).toBe('T1');
  expect(obterTopico(c, 'nao/existe/x')).toBeUndefined();
});

test('dados inválidos lançam', () => {
  expect(() => carregarConteudo({})).toThrow();
});
```

- [ ] **Step 2: Rodar e ver falhar**, `npx jest src/content/store.test.ts` → FAIL.

- [ ] **Step 3: Implementar `src/content/store.ts`**

```ts
import { conteudoSchema, type Conteudo, type Sistema, type Topico } from './schema';

export function carregarConteudo(dados: unknown): Conteudo {
  return conteudoSchema.parse(dados);
}

export function listarSistemas(c: Conteudo): Sistema[] {
  return [...c.sistemas].sort((a, b) => a.ordem - b.ordem);
}

export function obterSistema(c: Conteudo, sistemaId: string): Sistema | undefined {
  return c.sistemas.find((s) => s.id === sistemaId);
}

export function listarTodosTopicos(c: Conteudo): Topico[] {
  return c.sistemas.flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
}

export function obterTopico(c: Conteudo, topicoId: string): Topico | undefined {
  return listarTodosTopicos(c).find((t) => t.id === topicoId);
}
```

- [ ] **Step 4: Rodar testes**, PASS.

- [ ] **Step 5: Commit**, `git add src/content/ && git commit -m "feat: content store with typed accessors"`

---

### Task 7: Índice de busca offline

**Files:**
- Create: `src/search/index.ts`
- Test: `src/search/index.test.ts`

**Interfaces:**
- Consumes: `Conteudo`, `listarTodosTopicos` (Task 6), `obterSistema` (Task 6).
- Produces (usados pela tela Busca na Fase 1B):

```ts
export interface ResultadoBusca { topicoId: string; titulo: string; sistemaId: string; sistemaTitulo: string }
export function criarIndice(c: Conteudo): MiniSearch;   // campos: titulo, tags, sistemaTitulo
export function buscar(indice: MiniSearch, termo: string): ResultadoBusca[]; // prefixo + fuzzy 0.2
```

- [ ] **Step 1: Escrever testes que falham**, `src/search/index.test.ts` usando o mesmo `Conteudo` inline da Task 6 estendido com um tópico com tag `Sinal de Murphy`:

```ts
import { criarIndice, buscar } from './index';
import { carregarConteudo } from '../content/store';

const dados = {
  versao: '0.1.0',
  sistemas: [{
    id: 'abdome', titulo: 'Abdome', cor: '#F59E0B', icone: 'abdomen', ordem: 1,
    capitulos: [{
      id: 'vesicula', titulo: 'Vesícula biliar', ordem: 1,
      topicos: [{
        id: 'abdome/vesicula/colecistite', titulo: 'Colecistite aguda',
        sistemaId: 'abdome', capituloId: 'vesicula', ordem: 1,
        tags: ['Sinal de Murphy'], referencias: ['Porto, Semiologia Médica, 8ª ed.'],
        revisao: 'pendente',
        blocos: [{ tipo: 'conceito', texto: 'Inflamação aguda da vesícula biliar.' }],
      }],
    }],
  }],
};

test('acha tópico por epônimo na tag', () => {
  const c = carregarConteudo(dados);
  const r = buscar(criarIndice(c), 'murphy');
  expect(r[0]?.topicoId).toBe('abdome/vesicula/colecistite');
});

test('busca com erro de digitação leve (fuzzy)', () => {
  const c = carregarConteudo(dados);
  expect(buscar(criarIndice(c), 'colecistit').length).toBeGreaterThan(0);
});

test('termo sem correspondência retorna vazio', () => {
  const c = carregarConteudo(dados);
  expect(buscar(criarIndice(c), 'zzzz')).toEqual([]);
});
```

- [ ] **Step 2: Rodar e ver falhar**, FAIL.

- [ ] **Step 3: Implementar**

```bash
npm install minisearch
```

`src/search/index.ts`:

```ts
import MiniSearch from 'minisearch';
import { listarTodosTopicos, obterSistema } from '../content/store';
import type { Conteudo } from '../content/schema';

export interface ResultadoBusca {
  topicoId: string; titulo: string; sistemaId: string; sistemaTitulo: string;
}

interface DocBusca { id: string; titulo: string; tags: string; sistemaId: string; sistemaTitulo: string }

export function criarIndice(c: Conteudo): MiniSearch<DocBusca> {
  const indice = new MiniSearch<DocBusca>({
    fields: ['titulo', 'tags', 'sistemaTitulo'],
    storeFields: ['titulo', 'sistemaId', 'sistemaTitulo'],
    searchOptions: { prefix: true, fuzzy: 0.2 },
  });
  indice.addAll(
    listarTodosTopicos(c).map((t) => ({
      id: t.id,
      titulo: t.titulo,
      tags: t.tags.join(' '),
      sistemaId: t.sistemaId,
      sistemaTitulo: obterSistema(c, t.sistemaId)?.titulo ?? t.sistemaId,
    })),
  );
  return indice;
}

export function buscar(indice: MiniSearch<DocBusca>, termo: string): ResultadoBusca[] {
  if (termo.trim() === '') return [];
  return indice.search(termo).map((r) => ({
    topicoId: String(r.id),
    titulo: r.titulo as string,
    sistemaId: r.sistemaId as string,
    sistemaTitulo: r.sistemaTitulo as string,
  }));
}
```

- [ ] **Step 4: Rodar testes**, PASS.

- [ ] **Step 5: Commit**, `git add src/search/ package.json package-lock.json && git commit -m "feat: offline search index (MiniSearch)"`

---

### Task 8: Motor de quiz

**Files:**
- Create: `src/quiz/engine.ts`
- Test: `src/quiz/engine.test.ts`

**Interfaces:**
- Consumes: `QuizPergunta` (Task 2).
- Produces (usados pelas telas de quiz na Fase 1B e pela revisão espaçada na Fase 2):

```ts
export interface SessaoQuiz {
  perguntas: QuizPergunta[];
  respostas: { perguntaId: string; escolhidaIndex: number; correta: boolean }[];
}
export function criarSessao(perguntas: QuizPergunta[]): SessaoQuiz;           // lança se vazio
export function responder(s: SessaoQuiz, perguntaId: string, escolhidaIndex: number): SessaoQuiz; // imutável; lança se id desconhecido ou já respondida
export function proximaPergunta(s: SessaoQuiz): QuizPergunta | undefined;      // primeira não respondida
export function resultado(s: SessaoQuiz): { total: number; acertos: number; percentual: number };
```

- [ ] **Step 1: Escrever testes que falham**, `src/quiz/engine.test.ts`:

```ts
import { criarSessao, responder, proximaPergunta, resultado } from './engine';
import type { QuizPergunta } from '../content/schema';

const p = (id: string, corretaIndex = 0): QuizPergunta => ({
  id, enunciado: `E${id}`, alternativas: ['certa', 'errada'], corretaIndex, explicacao: 'porque sim',
});

test('fluxo completo: responder tudo e calcular resultado', () => {
  let s = criarSessao([p('q1'), p('q2', 1)]);
  s = responder(s, 'q1', 0);            // acerto
  s = responder(s, 'q2', 0);            // erro
  expect(proximaPergunta(s)).toBeUndefined();
  expect(resultado(s)).toEqual({ total: 2, acertos: 1, percentual: 50 });
});

test('responder é imutável e marca correta', () => {
  const s0 = criarSessao([p('q1')]);
  const s1 = responder(s0, 'q1', 0);
  expect(s0.respostas).toHaveLength(0);
  expect(s1.respostas[0]).toMatchObject({ perguntaId: 'q1', correta: true });
});

test('lanca em sessão vazia, id desconhecido e resposta dupla', () => {
  expect(() => criarSessao([])).toThrow();
  const s = responder(criarSessao([p('q1')]), 'q1', 1);
  expect(() => responder(s, 'q1', 0)).toThrow(/já respondida/);
  expect(() => responder(s, 'qx', 0)).toThrow(/desconhecida/);
});
```

- [ ] **Step 2: Rodar e ver falhar**, FAIL.

- [ ] **Step 3: Implementar `src/quiz/engine.ts`**

```ts
import type { QuizPergunta } from '../content/schema';

export interface SessaoQuiz {
  perguntas: QuizPergunta[];
  respostas: { perguntaId: string; escolhidaIndex: number; correta: boolean }[];
}

export function criarSessao(perguntas: QuizPergunta[]): SessaoQuiz {
  if (perguntas.length === 0) throw new Error('Sessão de quiz requer ao menos 1 pergunta');
  return { perguntas, respostas: [] };
}

export function responder(s: SessaoQuiz, perguntaId: string, escolhidaIndex: number): SessaoQuiz {
  const pergunta = s.perguntas.find((q) => q.id === perguntaId);
  if (!pergunta) throw new Error(`Pergunta desconhecida: ${perguntaId}`);
  if (s.respostas.some((r) => r.perguntaId === perguntaId)) {
    throw new Error(`Pergunta já respondida: ${perguntaId}`);
  }
  return {
    ...s,
    respostas: [
      ...s.respostas,
      { perguntaId, escolhidaIndex, correta: escolhidaIndex === pergunta.corretaIndex },
    ],
  };
}

export function proximaPergunta(s: SessaoQuiz): QuizPergunta | undefined {
  return s.perguntas.find((q) => !s.respostas.some((r) => r.perguntaId === q.id));
}

export function resultado(s: SessaoQuiz): { total: number; acertos: number; percentual: number } {
  const total = s.perguntas.length;
  const acertos = s.respostas.filter((r) => r.correta).length;
  return { total, acertos, percentual: Math.round((acertos / total) * 100) };
}
```

- [ ] **Step 4: Rodar testes**, PASS.

- [ ] **Step 5: Commit**, `git add src/quiz/ && git commit -m "feat: quiz engine (pure, immutable)"`

---

### Task 9: Armazenamento de progresso (interface + memória)

**Files:**
- Create: `src/progress/types.ts`
- Create: `src/progress/memoryStore.ts`
- Test: `src/progress/memoryStore.test.ts`

**Interfaces:**
- Consumes: nada novo.
- Produces (o adaptador SQLite da Fase 1B implementa esta MESMA interface):

```ts
// src/progress/types.ts
export interface RespostaRegistrada { perguntaId: string; topicoId: string; correta: boolean; respondidaEm: number }
export interface ProgressStore {
  marcarEstudado(topicoId: string, estudado: boolean): Promise<void>;
  listarEstudados(): Promise<string[]>;
  favoritar(topicoId: string, favorito: boolean): Promise<void>;
  listarFavoritos(): Promise<string[]>;
  registrarResposta(r: RespostaRegistrada): Promise<void>;
  listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]>;
  registrarBusca(termo: string): Promise<void>;
  listarBuscasRecentes(limite?: number): Promise<string[]>; // mais recente primeiro, sem duplicatas, default 10
}
export class MemoryProgressStore implements ProgressStore { /* Task */ }
```

- [ ] **Step 1: Escrever testes que falham**, `src/progress/memoryStore.test.ts`:

```ts
import { MemoryProgressStore } from './memoryStore';

test('estudado é idempotente e reversível', async () => {
  const s = new MemoryProgressStore();
  await s.marcarEstudado('t1', true);
  await s.marcarEstudado('t1', true);
  expect(await s.listarEstudados()).toEqual(['t1']);
  await s.marcarEstudado('t1', false);
  expect(await s.listarEstudados()).toEqual([]);
});

test('favoritos independem de estudados', async () => {
  const s = new MemoryProgressStore();
  await s.favoritar('t1', true);
  expect(await s.listarFavoritos()).toEqual(['t1']);
  expect(await s.listarEstudados()).toEqual([]);
});

test('respostas filtram por tópico', async () => {
  const s = new MemoryProgressStore();
  await s.registrarResposta({ perguntaId: 'q1', topicoId: 't1', correta: true, respondidaEm: 1 });
  await s.registrarResposta({ perguntaId: 'q2', topicoId: 't2', correta: false, respondidaEm: 2 });
  expect(await s.listarRespostas('t1')).toHaveLength(1);
  expect(await s.listarRespostas()).toHaveLength(2);
});

test('buscas recentes: sem duplicatas, mais recente primeiro, com limite', async () => {
  const s = new MemoryProgressStore();
  for (const termo of ['pa', 'murphy', 'pa']) await s.registrarBusca(termo);
  expect(await s.listarBuscasRecentes()).toEqual(['pa', 'murphy']);
  expect(await s.listarBuscasRecentes(1)).toEqual(['pa']);
});
```

- [ ] **Step 2: Rodar e ver falhar**, FAIL.

- [ ] **Step 3: Implementar `src/progress/memoryStore.ts`**

```ts
import type { ProgressStore, RespostaRegistrada } from './types';

export class MemoryProgressStore implements ProgressStore {
  private estudados = new Set<string>();
  private favoritos = new Set<string>();
  private respostas: RespostaRegistrada[] = [];
  private buscas: string[] = [];

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    estudado ? this.estudados.add(topicoId) : this.estudados.delete(topicoId);
  }
  async listarEstudados(): Promise<string[]> { return [...this.estudados]; }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    favorito ? this.favoritos.add(topicoId) : this.favoritos.delete(topicoId);
  }
  async listarFavoritos(): Promise<string[]> { return [...this.favoritos]; }

  async registrarResposta(r: RespostaRegistrada): Promise<void> { this.respostas.push(r); }
  async listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]> {
    return topicoId ? this.respostas.filter((r) => r.topicoId === topicoId) : [...this.respostas];
  }

  async registrarBusca(termo: string): Promise<void> {
    this.buscas = [termo, ...this.buscas.filter((t) => t !== termo)];
  }
  async listarBuscasRecentes(limite = 10): Promise<string[]> {
    return this.buscas.slice(0, limite);
  }
}
```

(`types.ts` conforme o bloco de Interfaces.)

- [ ] **Step 4: Rodar testes**, PASS.

- [ ] **Step 5: Commit**, `git add src/progress/ && git commit -m "feat: progress store interface + in-memory adapter"`

---

### Task 10: CI no GitHub Actions

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: scripts npm `typecheck`, `test`, `build:content` (Tasks 1 e 4).
- Produces: CI verde obrigatório em push/PR; garante `content.json` commitado em sincronia com `content/`.

- [ ] **Step 1: Criar `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
  pull_request:
jobs:
  verificar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build:content
      - name: content.json em sincronia
        run: git diff --exit-code assets/generated/content.json
```

- [ ] **Step 2: Validar localmente o que o CI roda**

```bash
npm run typecheck && npm test && npm run build:content && git diff --exit-code assets/generated/content.json
```

Expected: tudo verde, diff vazio.

- [ ] **Step 3: Commit e push**

```bash
git add .github/
git commit -m "ci: typecheck, tests and content validation"
git push -u origin claude/claude-code-mobile-8l8cdb
```

- [ ] **Step 4: Confirmar CI verde no GitHub** (via MCP `actions_list`/`get_check_run` ou na aba Actions).

---

## Fora deste plano (próximos)

- **Mockups das telas** (portão do spec §7): produzidos e aprovados pelo autor entre 1A e 1B.
- **Fase 1B, Interface**: design system final, tabs, telas Guia/Busca/Estudar/Perfil, renderizadores de bloco, adaptador SQLite do `ProgressStore`, Sentry.
- **Produção de conteúdo em escala**: workstream editorial próprio (livro → rascunho → revisão do autor), seção por seção, usando o pipeline deste plano.
