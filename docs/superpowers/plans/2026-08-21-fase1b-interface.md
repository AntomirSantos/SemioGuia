# SemioGuia Fase 1B, Interface: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a interface completa do SemioGuia sobre a fundação da Fase 1A: design system aprovado nos mockups, 4 abas (Guia, Busca, Estudar, Perfil), renderizadores dos 8 tipos de bloco, quiz jogável, progresso persistido em SQLite, um app utilizável de ponta a ponta no Expo Go.

**Architecture:** O app carrega `assets/generated/content.json` num provider React na inicialização e navega com expo-router (tabs + stack). Cada tipo de bloco tem um componente próprio que consome tokens do design system (claro/escuro). Progresso usa a interface `ProgressStore` da 1A com um novo adaptador SQLite; a suíte de testes da memória vira contrato compartilhado. A identidade visual segue os mockups aprovados (prévia HTML): fundo clínico, acento por sistema, Bricolage Grotesque para títulos e Atkinson Hyperlegible para texto.

**Tech Stack:** Expo + expo-router, TypeScript strict, expo-sqlite, @expo-google-fonts (Bricolage Grotesque, Atkinson Hyperlegible), lucide-react-native + react-native-svg, Jest (jest-expo) + @testing-library/react-native.

**Spec:** `docs/superpowers/specs/2026-08-21-semioguia-design.md` (mockups do §7 aprovados pelo autor em 21/08: a prévia HTML publicada é a referência visual)

## Global Constraints

- TypeScript `strict: true`; `npx tsc --noEmit` limpo em todo commit.
- 100% offline: nenhuma chamada de rede em runtime (fontes empacotadas no build).
- Zero coleta de dados pessoais; progresso só no aparelho.
- Todo texto de UI em pt-BR. Aviso legal exato: "Material educacional. Não substitui o julgamento clínico."
- Acessibilidade: contraste AA nos dois temas; alvos de toque ≥ 44pt; `accessibilityRole`/`accessibilityLabel` em controles.
- Tema claro E escuro desde já; nenhuma cor hardcoded em componente, sempre via tokens.
- Testes via `npx jest <path>`; componentes de bloco têm teste de renderização; commits convencionais em inglês.
- CI (typecheck + jest + build:content + sync do content.json) deve permanecer verde em todo push.
- Design de referência: mockup aprovado, cards com cantos 16px, respiro generoso, tag de tipo de bloco em uppercase pequeno, passos numerados com chip, fluxograma como stepper vertical, pérola em âmbar.

---

### Task 1: Limpeza do template e identidade do app

**Files:**
- Delete: `app/(tabs)/explore.tsx` (demo Expo), `components/*` do template com branding Expo (HelloWave, ParallaxScrollView, ExternalLink, Collapsible, ThemedText, ThemedView, HapticTab, ui/*), `scripts/reset-project.js`, `assets/images/*` de logo Expo (manter ícones/splash genéricos)
- Modify: `app.json` (scheme), `app/(tabs)/index.tsx` e `app/(tabs)/_layout.tsx` (esvaziar para shells mínimos), `app/_layout.tsx` (root mínimo), `package.json` (remover script reset-project)

**Interfaces:**
- Consumes: scaffold da Fase 1A.
- Produces: árvore `app/` mínima que compila e roda; `app.json` com `"scheme": "semioguia"`. Nada do template Expo sobra para as próximas tasks.

- [ ] **Step 1: Corrigir o scheme**, em `app.json`: `"scheme": "semioguia"`.

- [ ] **Step 2: Remover o demo do template**, apagar os arquivos listados acima. Reescrever:

`app/_layout.tsx`:
```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

`app/(tabs)/_layout.tsx`:
```tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return <Tabs />;
}
```

`app/(tabs)/index.tsx`:
```tsx
import { Text, View } from 'react-native';

export default function Guia() {
  return (
    <View>
      <Text>SemioGuia</Text>
    </View>
  );
}
```

- [ ] **Step 3: Verificar** (`npx tsc --noEmit` limpo; `npx jest` verde (nenhum teste dependia do template) se algum quebrar, o teste era do template e sai junto); `npx expo export --platform ios --output-dir /tmp/expo-export-check 2>&1 | tail -5` conclui sem erro (prova que o bundle compila; apagar o diretório depois).

- [ ] **Step 4: Commit**, `git add -A && git commit -m "chore: strip Expo template demo and fix app scheme"`

---

### Task 2: Design tokens, tema claro/escuro e fontes

**Files:**
- Create: `src/design/tokens.ts`, `src/design/ThemeContext.tsx`
- Test: `src/design/tokens.test.ts`
- Modify: `app/_layout.tsx` (carregar fontes + prover tema)

**Interfaces:**
- Consumes: nada novo (instala `@expo-google-fonts/bricolage-grotesque`, `@expo-google-fonts/atkinson-hyperlegible`, `expo-font`, `expo-splash-screen` via `npx expo install`).
- Produces (TODAS as telas e blocos consomem exatamente isto):

```ts
// src/design/tokens.ts
export interface Paleta {
  fundo: string; superficie: string; superficie2: string;
  tinta: string; tinta2: string; linha: string;
  acento: string; acentoTinta: string;
  perolaFundo: string; perolaTexto: string; perolaBorda: string;
  ok: string; okFundo: string; erro: string; erroFundo: string;
}
export const paletaClara: Paleta;
export const paletaEscura: Paleta;
export const espaco = { xs: 4, s: 8, m: 12, l: 16, xl: 20, xxl: 28 } as const;
export const raio = { s: 8, m: 12, l: 16, pill: 999 } as const;
export const fonte = {
  display: 'BricolageGrotesque_700Bold',
  displaySemi: 'BricolageGrotesque_600SemiBold',
  corpo: 'AtkinsonHyperlegible_400Regular',
  corpoBold: 'AtkinsonHyperlegible_700Bold',
} as const;
export const tipo = { h1: 30, h2: 24, h3: 19, corpo: 16, small: 14, tag: 11.5 } as const;

// src/design/ThemeContext.tsx
export type PreferenciaTema = 'sistema' | 'claro' | 'escuro';
export type EscalaFonte = 'normal' | 'grande';   // grande multiplica tipo por 1.15
export function ThemeProvider(props: {
  children: ReactNode;
  temaInicial?: PreferenciaTema;   // o root injeta o valor persistido
  escalaInicial?: EscalaFonte;
}): JSX.Element; // lê useColorScheme()
export function useTema(): {
  paleta: Paleta; escuro: boolean; escala: number;              // 1 ou 1.15
  preferencia: PreferenciaTema; definirPreferencia(p: PreferenciaTema): void;
  escalaFonte: EscalaFonte; definirEscalaFonte(e: EscalaFonte): void;
};
```

Componentes usam `Math.round(tipo.corpo * escala)` para tamanhos de texto de leitura (títulos display podem ficar fixos).

- [ ] **Step 1: Escrever teste que falha**, `src/design/tokens.test.ts`:

```ts
import { paletaClara, paletaEscura, espaco, fonte } from './tokens';

test('paletas têm as mesmas chaves', () => {
  expect(Object.keys(paletaEscura).sort()).toEqual(Object.keys(paletaClara).sort());
});

test('todas as cores são hex válidos', () => {
  for (const p of [paletaClara, paletaEscura]) {
    for (const v of Object.values(p)) expect(v).toMatch(/^#[0-9A-Fa-f]{6}$/);
  }
});

test('tokens de layout existem', () => {
  expect(espaco.l).toBe(16);
  expect(fonte.display).toContain('Bricolage');
});
```

- [ ] **Step 2: Ver falhar**, `npx jest src/design/tokens.test.ts` → FAIL.

- [ ] **Step 3: Implementar `tokens.ts`** com os valores do mockup aprovado:

```ts
export const paletaClara: Paleta = {
  fundo: '#F7FAF9', superficie: '#FFFFFF', superficie2: '#E9F2F0',
  tinta: '#152220', tinta2: '#48605C', linha: '#D5E3E0',
  acento: '#0E7C76', acentoTinta: '#0A5B57',
  perolaFundo: '#F6EBDA', perolaTexto: '#7A4A15', perolaBorda: '#E4CFA9',
  ok: '#177245', okFundo: '#E2F1E7', erro: '#A33B2E', erroFundo: '#F7E6E2',
};
export const paletaEscura: Paleta = {
  fundo: '#0F1917', superficie: '#16211F', superficie2: '#1C2A27',
  tinta: '#E6EFEC', tinta2: '#9DB4AF', linha: '#2A3B38',
  acento: '#53C6BC', acentoTinta: '#7BD6CD',
  perolaFundo: '#2A2318', perolaTexto: '#E4B877', perolaBorda: '#4A3B22',
  ok: '#6BC98F', okFundo: '#1B2E22', erro: '#E29385', erroFundo: '#33211D',
};
```

(Interfaces/objetos restantes conforme o bloco Produces.)

- [ ] **Step 4: Implementar `ThemeContext.tsx`**:

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { paletaClara, paletaEscura, type Paleta } from './tokens';

export type PreferenciaTema = 'sistema' | 'claro' | 'escuro';

const Ctx = createContext<{
  paleta: Paleta; escuro: boolean;
  preferencia: PreferenciaTema; definirPreferencia: (p: PreferenciaTema) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const sistema = useColorScheme();
  const [preferencia, definirPreferencia] = useState<PreferenciaTema>('sistema');
  const escuro = preferencia === 'sistema' ? sistema === 'dark' : preferencia === 'escuro';
  const valor = useMemo(
    () => ({ paleta: escuro ? paletaEscura : paletaClara, escuro, preferencia, definirPreferencia }),
    [escuro, preferencia],
  );
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useTema() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTema requer ThemeProvider');
  return v;
}
```

- [ ] **Step 5: Fontes no root**, instalar (`npx expo install expo-font expo-splash-screen @expo-google-fonts/bricolage-grotesque @expo-google-fonts/atkinson-hyperlegible`; se `expo install` falhar no proxy, `npm install` com as versões compatíveis) e em `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';
import { useFonts, BricolageGrotesque_600SemiBold, BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque';
import { AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold } from '@expo-google-fonts/atkinson-hyperlegible';
import { ThemeProvider } from '../src/design/ThemeContext';

export default function RootLayout() {
  const [ok] = useFonts({
    BricolageGrotesque_600SemiBold, BricolageGrotesque_700Bold,
    AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold,
  });
  if (!ok) return null;
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
```

- [ ] **Step 6: Verificar**, `npx jest src/design/tokens.test.ts` PASS; suíte inteira + `npx tsc --noEmit` limpos.

- [ ] **Step 7: Commit**, `git commit -m "feat: design tokens, theme context and bundled fonts"`

---

### Task 3: Provider de conteúdo

**Files:**
- Create: `src/content/ContentContext.tsx`
- Test: `src/content/ContentContext.test.tsx`

**Interfaces:**
- Consumes: `carregarConteudo` (store da 1A); `assets/generated/content.json` via `require`.
- Produces:

```tsx
export function ContentProvider(props: { children: ReactNode }): JSX.Element;
export function useConteudo(): Conteudo;              // lança fora do provider
export function useSistema(sistemaId: string): Sistema | undefined;
export function useTopico(topicoId: string): Topico | undefined;
```

- [ ] **Step 1: Teste que falha**, `src/content/ContentContext.test.tsx` (usa @testing-library/react-native; instalar com `npm install -D @testing-library/react-native` se ausente):

```tsx
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { ContentProvider, useConteudo } from './ContentContext';

function Sonda() {
  const c = useConteudo();
  return <Text>{c.sistemas[0].titulo}</Text>;
}

test('provider carrega o conteúdo real do bundle', () => {
  render(<ContentProvider><Sonda /></ContentProvider>);
  expect(screen.getByText('Exame físico geral')).toBeTruthy();
});
```

- [ ] **Step 2: Ver falhar**, depois implementar:

```tsx
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { carregarConteudo, obterSistema, obterTopico } from './store';
import type { Conteudo, Sistema, Topico } from './schema';

const Ctx = createContext<Conteudo | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const conteudo = useMemo(() => carregarConteudo(require('../../assets/generated/content.json')), []);
  return <Ctx.Provider value={conteudo}>{children}</Ctx.Provider>;
}

export function useConteudo(): Conteudo {
  const c = useContext(Ctx);
  if (!c) throw new Error('useConteudo requer ContentProvider');
  return c;
}
export function useSistema(sistemaId: string): Sistema | undefined {
  return obterSistema(useConteudo(), sistemaId);
}
export function useTopico(topicoId: string): Topico | undefined {
  return obterTopico(useConteudo(), topicoId);
}
```

Envolver o `<Stack/>` do root com `<ContentProvider>` (dentro do ThemeProvider).

- [ ] **Step 3: Verificar** (teste PASS, suíte, typecheck) e **Commit**, `git commit -m "feat: content provider with bundled content"`

---

### Task 4: Preferências na interface de progresso + adaptador SQLite

**Files:**
- Modify: `src/progress/types.ts` (adicionar preferências), `src/progress/memoryStore.ts`
- Create: `src/progress/contract.ts` (suíte de contrato reutilizável), `src/progress/sqliteStore.ts`, `src/progress/ProgressContext.tsx`
- Test: `src/progress/contract.test.ts` (roda o contrato contra a memória)

**Interfaces:**
- Consumes: interface `ProgressStore` da 1A.
- Produces:

```ts
// adições em types.ts
export interface ProgressStore {
  /* ...métodos da 1A inalterados... */
  obterPreferencia(chave: string): Promise<string | null>;
  definirPreferencia(chave: string, valor: string): Promise<void>;
}

// contract.ts: suíte compartilhada
export function testarContratoProgressStore(nome: string, criar: () => Promise<ProgressStore>): void;

// sqliteStore.ts
export class SqliteProgressStore implements ProgressStore {
  constructor(nomeBanco?: string); // default 'semioguia.db'; cria tabelas (migração v1) no primeiro uso
}

// ProgressContext.tsx
export function ProgressProvider(props: {
  children: ReactNode;
  store?: ProgressStore;   // testes injetam MemoryProgressStore; default SqliteProgressStore
}): JSX.Element;
export function useProgresso(): ProgressStore;
```

- [ ] **Step 1: Extrair o contrato**, mover os 4 testes existentes de `memoryStore.test.ts` para `contract.ts` como `testarContratoProgressStore(nome, criar)` (mesmos casos, parametrizados por factory), acrescentando:

```ts
test('preferências: ausente é null, gravar e ler', async () => {
  const s = await criar();
  expect(await s.obterPreferencia('tema')).toBeNull();
  await s.definirPreferencia('tema', 'escuro');
  expect(await s.obterPreferencia('tema')).toBe('escuro');
  await s.definirPreferencia('tema', 'claro');
  expect(await s.obterPreferencia('tema')).toBe('claro');
});
```

`contract.test.ts` roda `testarContratoProgressStore('memória', async () => new MemoryProgressStore())`. Apagar `memoryStore.test.ts` (substituído pelo contrato, sem perda de casos).

- [ ] **Step 2: Ver falhar** (métodos de preferência não existem) → implementar na `MemoryProgressStore` (um `Map<string,string>`); PASS.

- [ ] **Step 3: Adaptador SQLite**, `npx expo install expo-sqlite`; implementar `SqliteProgressStore` com `openDatabaseSync` e migração v1:

```sql
CREATE TABLE IF NOT EXISTS estudados (topico_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS favoritos (topico_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS respostas (pergunta_id TEXT, topico_id TEXT, correta INTEGER, respondida_em INTEGER);
CREATE TABLE IF NOT EXISTS buscas (termo TEXT PRIMARY KEY, usada_em INTEGER);
CREATE TABLE IF NOT EXISTS preferencias (chave TEXT PRIMARY KEY, valor TEXT);
CREATE TABLE IF NOT EXISTS meta (chave TEXT PRIMARY KEY, valor TEXT); -- versão do esquema
```

Semântica idêntica à memória: `listarBuscasRecentes` ordena por `usada_em` DESC com dedup por PRIMARY KEY (upsert), limite default 10. **Nota de teste:** o runtime nativo do expo-sqlite não existe no Jest; o contrato NÃO roda contra o SQLite em CI. A verificação do adaptador é manual no app (Task 10 exercita) + o typecheck. Deixar isso registrado no report.

- [ ] **Step 4: `ProgressContext.tsx`**: provider fino que instancia `SqliteProgressStore` uma vez (useMemo) e expõe via `useProgresso()`; lança fora do provider. Envolver no root layout (dentro do ContentProvider). Conectar a preferência de tema: no `ThemeProvider`, aceitar prop opcional `inicial?: PreferenciaTema`, o root lê `obterPreferencia('tema')` uma vez ao montar (estado + useEffect) e o Perfil grava via `definirPreferencia`.

- [ ] **Step 5: Verificar**, suíte + typecheck limpos. **Commit**, `git commit -m "feat: progress prefs, shared contract suite and SQLite adapter"`

---

### Task 5: Shell de navegação, 4 abas

**Files:**
- Modify: `app/(tabs)/_layout.tsx`
- Create: `app/(tabs)/busca.tsx`, `app/(tabs)/estudar.tsx`, `app/(tabs)/perfil.tsx` (placeholders estilizados)
- Create: `src/design/Tela.tsx` (container padrão de tela)

**Interfaces:**
- Consumes: `useTema` (Task 2). Instala `lucide-react-native react-native-svg` (`npx expo install react-native-svg` + `npm install lucide-react-native`).
- Produces: `Tela` (SafeArea + fundo de token + padding padrão) usada por todas as telas; tab bar com 4 abas e ícones de linha (BookOpen, Search, GraduationCap, User).

- [ ] **Step 1: `src/design/Tela.tsx`**:

```tsx
import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTema } from './ThemeContext';
import { espaco } from './tokens';

export function Tela({ children, rolavel = true }: { children: ReactNode; rolavel?: boolean }) {
  const { paleta } = useTema();
  const insets = useSafeAreaInsets();
  const estilo = {
    flex: 1, backgroundColor: paleta.fundo,
    paddingTop: insets.top + espaco.m, paddingHorizontal: espaco.xl,
  } as const;
  return rolavel
    ? <ScrollView style={estilo} contentContainerStyle={{ paddingBottom: 96 }}>{children}</ScrollView>
    : <View style={estilo}>{children}</View>;
}
```

- [ ] **Step 2: Tab layout**, `app/(tabs)/_layout.tsx` com `Tabs` do expo-router: cores da tab bar via tokens (`tabBarActiveTintColor: paleta.acento`, fundo `paleta.superficie`, borda `paleta.linha`), 4 telas com título pt-BR e ícone lucide (tamanho 22). Placeholders de busca/estudar/perfil: `<Tela><Text style={{ fontFamily: fonte.display, fontSize: tipo.h1, color: paleta.tinta }}>Busca</Text></Tela>` etc.

- [ ] **Step 3: Teste de renderização**, `app/(tabs)/__tests__/layout.test.tsx`: renderizar `<ThemeProvider><Tela><Text>x</Text></Tela></ThemeProvider>` e asserir que o texto aparece (fumaça do design system em teste; SafeArea: mockar `useSafeAreaInsets` retornando zeros via `jest.mock`).

- [ ] **Step 4: Verificar + Commit**, `git commit -m "feat: four-tab navigation shell with themed screen container"`

---

### Task 6: Componentes de bloco (8 tipos)

**Files:**
- Create: `src/blocos/Bloco.tsx` (dispatcher), `src/blocos/Conceito.tsx`, `Manobra.tsx`, `Sinal.tsx`, `Checklist.tsx`, `Tabela.tsx`, `Fluxograma.tsx`, `Perola.tsx`, `QuizBloco.tsx`, `src/blocos/texto.tsx` (helper de markdown leve: **negrito** e parágrafos)
- Test: `src/blocos/Bloco.test.tsx`

**Interfaces:**
- Consumes: tipos `Bloco` do schema; tokens/`useTema`.
- Produces: `export function BlocoView({ bloco }: { bloco: Bloco }): JSX.Element`: dispatcher que as telas usam; `QuizBloco` recebe também `onIniciarQuiz?: (perguntas: QuizPergunta[]) => void` (o tópico navega para a sessão de quiz; dentro do tópico o bloco mostra só um card-resumo "N perguntas · Praticar").

**Referência visual concreta:** além da especificação abaixo, o gerador do mockup aprovado está em `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/gerar-preview.mjs`: o CSS e a estrutura de cada bloco lá são a tradução fiel do que o autor aprovou; leia-o antes de estilizar e replique hierarquia, espaçamentos e tratamento de cada tipo (se o arquivo não existir mais, a especificação abaixo basta).

**Especificação visual (do mockup):** cada bloco num card `superficie` com borda `linha`, raio 16, padding 20; tag do tipo em uppercase 11.5 `acentoTinta`; título 19 display. Manobra: passos numerados com chip 28×28 `superficie2`; "O que observar" em caixa `superficie2`. Sinal: descrição, "Significado" com label, causas em lista. Checklist: itens com checkbox (Pressable com quadrado 19pt, check via lucide `Check`), riscado quando marcado (estado local). Tabela: primeira linha como header em `superficie2`, scroll horizontal quando larga (`ScrollView horizontal`), números com `fontVariant: ['tabular-nums']`. Fluxograma: stepper vertical, ponto redondo para ação/início/fim, losango (quadrado rotacionado) para decisão, linha vertical `linha` conectando; chip do formato em uppercase. Pérola: card âmbar (`perolaFundo/Borda/Texto`). Quiz: card com contagem de perguntas e botão "Praticar".

- [ ] **Step 1: Helper de texto**, `src/blocos/texto.tsx`:

```tsx
import { Text, type TextStyle } from 'react-native';
import { fonte } from '../design/tokens';

// converte "a **b** c" em segmentos com bold; parágrafos separados por \n\n
export function TextoRico({ children, style }: { children: string; style?: TextStyle }) {
  const paragrafos = children.trim().split(/\n{2,}/);
  return (
    <>
      {paragrafos.map((p, i) => (
        <Text key={i} style={[{ fontFamily: fonte.corpo, marginTop: i ? 8 : 0 }, style]}>
          {p.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
            seg.startsWith('**')
              ? <Text key={j} style={{ fontFamily: fonte.corpoBold }}>{seg.slice(2, -2)}</Text>
              : seg,
          )}
        </Text>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Teste que falha**, `src/blocos/Bloco.test.tsx`: para cada um dos 8 tipos, montar um bloco mínimo válido, renderizar `<ThemeProvider><BlocoView bloco={b}/></ThemeProvider>` e asserir um texto característico (ex.: manobra mostra o primeiro passo; tabela mostra célula; fluxograma mostra etapa; quiz mostra "5 perguntas"). Incluir caso de interação: checklist marca item ao toque (fireEvent.press → texto ganha strikethrough via prop de estilo testável ou accessibilityState checked).

- [ ] **Step 3: Implementar os 8 componentes + dispatcher** seguindo a especificação visual acima. Dispatcher:

```tsx
export function BlocoView({ bloco, onIniciarQuiz }: { bloco: Bloco; onIniciarQuiz?: (p: QuizPergunta[]) => void }) {
  switch (bloco.tipo) {
    case 'conceito': return <Conceito bloco={bloco} />;
    case 'manobra': return <Manobra bloco={bloco} />;
    case 'sinal': return <Sinal bloco={bloco} />;
    case 'checklist': return <ChecklistBloco bloco={bloco} />;
    case 'tabela': return <TabelaBloco bloco={bloco} />;
    case 'fluxograma': return <Fluxograma bloco={bloco} />;
    case 'perola': return <Perola bloco={bloco} />;
    case 'quiz': return <QuizBloco bloco={bloco} onIniciar={onIniciarQuiz} />;
  }
}
```

Cada componente ~30-60 linhas, todo estilo via tokens, zero cor literal.

- [ ] **Step 4: Verificar** (testes de bloco PASS (8+ casos), suíte, typecheck. **Commit**) `git commit -m "feat: block renderer components for all eight content block types"`

---

### Task 7: Aba Guia, sistemas → capítulos → tópico

**Files:**
- Modify: `app/(tabs)/index.tsx` (grade de sistemas)
- Create: `app/sistema/[sistemaId].tsx` (capítulos), `app/topico/[...caminho].tsx` (tela de tópico), `src/design/Cabecalho.tsx` (voltar + título)
- Test: `src/telas/guia.test.tsx`

**Interfaces:**
- Consumes: `useConteudo`/`useSistema`/`useTopico`, `BlocoView`, `useProgresso`, `useTema`, expo-router (`Link`, `useLocalSearchParams`, `router`).
- Produces: navegação Guia completa. Convenção de rota do tópico: id `a/b/c` vira `/topico/a/b/c` via catch-all `[...caminho]` (join com '/').

- [ ] **Step 1: Grade de sistemas**, `index.tsx`: título "SemioGuia" (display, h1) + grade 2 colunas de cards de sistema: cor de fundo `sistema.cor` a 14% sobre `superficie` (usar cor com alpha: `sistema.cor + '24'`), nome do sistema, contagem de tópicos; toque → `/sistema/{id}`. Ícone: mapa `icone → componente lucide` em `src/design/icones.ts` com fallback `Stethoscope` (o campo `icone` do YAML nomeia chaves desse mapa).

- [ ] **Step 2: Capítulos**, `app/sistema/[sistemaId].tsx`: Cabecalho com voltar (`router.back()`), acento da tela = `sistema.cor`; lista de capítulos, cada um com seus tópicos como linhas (título + chip "estudado" quando `listarEstudados()` contém o id: carregar via useEffect/useState). Toque → `/topico/{topicoId}`.

- [ ] **Step 3: Tela de tópico**, `app/topico/[...caminho].tsx`: monta `topicoId = caminho.join('/')`; usa `useTopico`. Header: eyebrow "Sistema · Capítulo", título display, ações **favoritar** (Heart) e **marcar estudado** (CheckCircle), Pressables 44pt que alternam via `useProgresso()` com estado local otimista e `accessibilityState`. Corpo: `topico.blocos.map(b => <BlocoView …/>)` + rodapé de referências (`tinta2`, small). `onIniciarQuiz` navega para `/quiz/{topicoId}` (Task 9). Tópico inexistente → tela vazia amigável "Tópico não encontrado" + voltar.

- [ ] **Step 4: Teste**, `src/telas/guia.test.tsx`: renderizar a tela de tópico diretamente (mockar `useLocalSearchParams` para o id `exame-fisico-geral/sinais-vitais/pressao-arterial` e envolver em ThemeProvider+ContentProvider+ProgressProvider com um `MemoryProgressStore` injetável, para isso, `ProgressProvider` aceita prop opcional `store?: ProgressStore`); asserir que o título "Pressão arterial" e um bloco (ex.: tag "MANOBRA") aparecem; press em "marcar estudado" chama o store (espionar `marcarEstudado`).

- [ ] **Step 5: Verificar + Commit**, `git commit -m "feat: guide tab with system grid, chapter list and topic screen"`

---

### Task 8: Aba Busca

**Files:**
- Modify: `app/(tabs)/busca.tsx`
- Test: `src/telas/busca.test.tsx`

**Interfaces:**
- Consumes: `criarIndice`/`buscar` (1A), `useConteudo`, `useProgresso` (buscas recentes, favoritos), `useTema`.
- Produces: busca instantânea com recentes e favoritos, o caminho beira-de-leito (≤ 2 toques).

- [ ] **Step 1: Implementar**, TextInput no topo (autoFocus off, placeholder "Sinal, manobra, tópico…", `accessibilityLabel`), índice via `useMemo(() => criarIndice(conteudo), [conteudo])`. Digitou ≥ 2 chars → lista de `ResultadoBusca` (título + sistemaTitulo como eyebrow); toque → registra `registrarBusca(termo)` e navega ao tópico. Campo vazio → duas seções: "Recentes" (`listarBuscasRecentes()`, toque re-executa a busca) e "Favoritos" (`listarFavoritos()` resolvidos via `obterTopico`, toque abre o tópico). Sem resultado → estado vazio amigável ("Nada com esse nome. Tente o epônimo ou uma sigla.").

- [ ] **Step 2: Teste**, renderizar com providers (store de memória com um favorito e uma busca recente pré-gravados); digitar "murphy" não acha (conteúdo real não tem) mas digitar "PA" acha "Pressão arterial"; campo vazio mostra o favorito.

- [ ] **Step 3: Verificar + Commit**, `git commit -m "feat: search tab with instant offline search, recents and favorites"`

---

### Task 9: Aba Estudar + sessão de quiz

**Files:**
- Modify: `app/(tabs)/estudar.tsx`
- Create: `app/quiz/[...caminho].tsx` (sessão), `src/quiz/useSessao.ts` (hook fino sobre o engine)
- Test: `src/telas/quiz.test.tsx`

**Interfaces:**
- Consumes: engine da 1A (`criarSessao`, `responder`, `proximaPergunta`, `resultado`), `useProgresso` (`registrarResposta` com `respondidaEm: Date.now()`), `useTopico`, `BlocoView` visual do quiz.
- Produces: fluxo de quiz completo: Estudar lista tópicos com quiz e o desempenho; sessão pergunta-a-pergunta com feedback imediato e explicação; resultado final com percentual; respostas persistidas.

- [ ] **Step 1: Hook `useSessao`**:

```ts
export function useSessao(perguntas: QuizPergunta[]) {
  const [sessao, setSessao] = useState(() => criarSessao(perguntas));
  const atual = proximaPergunta(sessao);
  const responderAtual = (escolhidaIndex: number) => {
    if (!atual) return;
    setSessao((s) => responder(s, atual.id, escolhidaIndex));
  };
  return { sessao, atual, responderAtual, resultado: atual ? null : resultado(sessao) };
}
```

- [ ] **Step 2: Tela Estudar**, lista todos os tópicos que têm bloco quiz (derivar de `listarTodosTopicos` filtrando `blocos.some(b => b.tipo === 'quiz')`), com: título, sistema, nº de perguntas e, se houver respostas registradas (`listarRespostas(topicoId)`), o percentual da última rodada (calcular das últimas N respostas onde N = nº de perguntas). Toque → `/quiz/{topicoId}`.

- [ ] **Step 3: Tela de sessão**, `/quiz/[...caminho]`: pergunta atual (contador "2 de 5"), alternativas como cards; ao tocar: pinta certa (`ok`/`okFundo`) e errada (`erro`/`erroFundo`), mostra explicação, registra `registrarResposta({ perguntaId, topicoId, correta, respondidaEm: Date.now() })`, botão "Próxima" (ou "Ver resultado" na última). Resultado: percentual grande (display), acertos/total, botões "Repetir" (recria sessão) e "Voltar ao tópico". Respeitar reduced motion (sem animação obrigatória).

- [ ] **Step 4: Teste**, `src/telas/quiz.test.tsx` com providers e store de memória: responder as 5 perguntas do quiz de PA tocando sempre a alternativa 0; asserir que o resultado aparece e que `listarRespostas('exame-fisico-geral/sinais-vitais/pressao-arterial')` tem 5 itens com `respondidaEm > 0`.

- [ ] **Step 5: Verificar + Commit**, `git commit -m "feat: study tab with playable quiz sessions and persisted answers"`

---

### Task 10: Aba Perfil

**Files:**
- Modify: `app/(tabs)/perfil.tsx`
- Test: `src/telas/perfil.test.tsx`

**Interfaces:**
- Consumes: `useConteudo`, `useProgresso`, `useTema` (definirPreferencia + persistência via `definirPreferencia('tema', …)`).
- Produces: tela com progresso por sistema, ajuste de tema, bibliografia e aviso legal.

- [ ] **Step 1: Implementar**, seções:
  1. **Progresso**: para cada sistema, barra (View com largura %) de tópicos estudados/total + rótulo "3 de 3 tópicos";
  2. **Aparência**: seletor segmentado Sistema/Claro/Escuro → `definirPreferencia` do tema + grava `definirPreferencia('tema', valor)` no ProgressStore; seletor de tamanho de fonte Normal/Grande → `definirEscalaFonte` + grava `definirPreferencia('fonte', valor)` (spec §7: fonte ajustável);
  3. **Bibliografia**: lista única de todas as `referencias` distintas do conteúdo (Set), em `small/tinta2`;
  4. **Sobre**: versão do conteúdo (`conteudo.versao`) e o aviso legal exato: "Material educacional. Não substitui o julgamento clínico."

- [ ] **Step 2: Teste**, com store de memória contendo 1 tópico estudado: barra mostra "1 de 3"; o aviso legal exato está presente; tocar "Escuro" chama `definirPreferencia('tema','escuro')` no store.

- [ ] **Step 3: Verificar + Commit**, `git commit -m "feat: profile tab with progress, appearance settings and bibliography"`

---

### Task 11: Passe de acessibilidade e revisão visual + CI

**Files:**
- Modify: pontuais nos componentes/telas conforme achados
- Create: `docs/verificacao-fase1b.md` (roteiro de teste manual no Expo Go)

**Interfaces:**
- Consumes: tudo anterior.
- Produces: app auditado; roteiro de verificação manual para o autor.

- [ ] **Step 1: Auditoria automatizável**, grep por cores hardcoded fora de `tokens.ts` (`grep -rn "#[0-9A-Fa-f]\{6\}" src/ app/ --include="*.tsx" | grep -v tokens.ts` → deve retornar vazio); conferir `accessibilityRole` em todos os Pressable; conferir alvos ≥ 44pt nos controles de topo de tópico e tab bar.

- [ ] **Step 2: Contraste AA**, verificar programaticamente (script rápido de razão de contraste WCAG entre pares tinta/fundo, acento/fundo, perolaTexto/perolaFundo nos dois temas, razão ≥ 4.5 para texto normal; ajustar tokens se algum par falhar e re-rodar o teste de tokens).

- [ ] **Step 3: Roteiro manual**, `docs/verificacao-fase1b.md`: passos para o autor abrir no Expo Go (npx expo start --tunnel), navegar Guia→tópico, favoritar, buscar "Osler", jogar um quiz, alternar tema, matar e reabrir o app confirmando persistência (valida o adaptador SQLite em aparelho real, a única verificação dele, já que Jest não roda o nativo).

- [ ] **Step 4: Suíte inteira + typecheck + build:content**; conferir CI verde após push. **Commit**, `git commit -m "chore: accessibility pass and manual verification guide"`

---

## Fora deste plano

- **Fase 2**: revisão espaçada e checklists praticáveis (modo OSCE), consomem `listarRespostas`/`checklist` já prontos.
- **Sentry**: adiado para quando houver conta/DSN (decisão: não bloquear a 1B com serviço externo; app segue 100% offline).
- **Produção de conteúdo em escala**: workstream editorial contínuo.
- **Publicação nas lojas**: requer contas de desenvolvedor (Fase de release).
