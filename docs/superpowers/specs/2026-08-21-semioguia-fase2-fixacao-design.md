# SemioGuia Fase 2 — Fixação: Design

Data: 21/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat, aguardando revisão do texto

## 1. Objetivo

Transformar o estudo passivo em fixação ativa: revisão espaçada das perguntas
de quiz e prática de recordação dos checklists (estações OSCE), tudo offline e
local, sobre a infraestrutura existente (motor de quiz, `ProgressStore` com
respostas por pergunta, blocos de conteúdo).

## 2. Decisões do autor (registradas em 21/08)

1. **Escopo:** as duas entregas da spec original nesta fase — revisão espaçada
   E checklists praticáveis.
2. **Fonte da revisão:** perguntas já respondidas no quiz entram com intervalo
   guiado pelo desempenho; marcar um tópico como **estudado** semeia as
   perguntas dele como itens novos.
3. **Modo OSCE:** prova de recordação — passos ocultos, revelados um a um com
   "lembrei/esqueci", nota final em %. Sem cronômetro nesta fase.
4. **Algoritmo:** **SM-2** (Anki clássico), com **nota automática binária** —
   sem botões de autoavaliação.

## 3. Motor de revisão (`src/revisao/`)

Módulo puro, sem dependência de UI ou de store.

### 3.1 Estado por item

```ts
interface ItemRevisao {
  id: string;                 // id da pergunta ou do checklist no conteúdo
  tipo: 'pergunta' | 'checklist';
  topicoId: string;
  facilidade: number;         // EF do SM-2, piso 1.3, inicial 2.5
  repeticoes: number;         // acertos consecutivos
  intervaloDias: number;
  proximaRevisao: string;     // data ISO (dia, sem hora)
  atualizadoEm: string;       // ISO datetime
}
```

### 3.2 SM-2 com nota automática

Nota de qualidade derivada, nunca perguntada ao aluno:

| Evento | Nota q |
|---|---|
| Pergunta certa | 4 |
| Pergunta errada | 2 |
| Estação OSCE com 100% dos passos lembrados | 5 |
| Estação OSCE ≥ 80% | 4 |
| Estação OSCE < 80% | 2 |

Regras SM-2 padrão:

- q ≥ 3 (acerto): `repeticoes+1`; intervalo 1 dia na 1ª repetição, 6 dias na
  2ª, depois `round(intervaloAnterior × EF)`.
- q < 3 (erro): `repeticoes = 0`, intervalo 1 dia (reaparece amanhã).
- `EF' = EF + (0.1 − (5−q)·(0.08 + (5−q)·0.02))`, com piso 1.3.
  (q=4 mantém o EF; q=5 soma 0.1; q=2 subtrai 0.32.)

Funções puras: `avaliar(item, nota, hoje) → ItemRevisao` e
`vencidos(itens, hoje) → ItemRevisao[]` (ordenados: mais atrasados primeiro,
perguntas e checklists intercalados pela data).

### 3.3 Semeadura e limite

- Marcar tópico como **estudado** → cada pergunta e cada checklist do tópico
  vira item novo (`proximaRevisao` = amanhã), se ainda não existir.
- Responder quiz avulso (fora da revisão) → cria o item se não existir e o
  avalia com a nota do resultado.
- Desmarcar "estudado" **não** remove itens já criados (histórico de estudo é
  preservado; sem surpresa de baralho esvaziado).
- **Limite de 20 itens novos por dia** entram na fila; o excedente aguarda os
  próximos dias (ordem de criação). Itens vencidos (já revisados antes) não têm
  limite.

## 4. Persistência

`ProgressStore` ganha:

```ts
salvarItemRevisao(item: ItemRevisao): Promise<void>;   // upsert por id
listarItensRevisao(): Promise<ItemRevisao[]>;
```

- Implementado nos 3 adaptadores: SQLite (nativo), localStorage (web),
  memória (testes).
- SQLite: tabela nova `itens_revisao` via **migração versionada** (o banco da
  v1 abre e ganha a tabela sem perder dados).
- Suíte de contrato compartilhada estendida — os 3 adaptadores passam pelos
  mesmos testes.

## 5. Experiência

### 5.1 Aba Estudar

- Card **"Revisão de hoje"** no topo: contador de itens vencidos
  (ex.: "8 perguntas · 1 estação"). Toque inicia a sessão de revisão.
- Estado vazio amigável quando não há vencidos ("Nada para revisar hoje"),
  com atalho para os tópicos do Guia.
- O quiz por tópico existente permanece como está.

### 5.2 Sessão de revisão

- Percorre os vencidos em ordem; perguntas reutilizam a UI atual do quiz
  (alternativas, explicação após responder).
- Checklist vencido abre a **estação OSCE** (5.3).
- Ao final: resumo simples (acertos/erros, próxima leva).

### 5.3 Estação OSCE

- Título do checklist e contexto; passos **ocultos**.
- O aluno tenta recordar e revela passo a passo, marcando **Lembrei** ou
  **Esqueci** em cada um (botões ≥44pt, acessíveis).
- Nota final em % de passos lembrados; ≥80% conta como acerto para o
  agendador (tabela 3.2). O resultado atualiza o item no agendador — não
  reutiliza o registro de respostas de quiz.
- Disponível também fora da revisão, a partir do bloco de checklist no tópico
  ("Praticar como estação").

### 5.4 Perfil

- Dois números na seção de progresso: **itens em dia** e **para revisar hoje**.

## 6. Erros e testes

- TDD no motor: item novo, sequência de acertos (1 → 6 → EF), erro reinicia,
  piso do EF, mapeamento das notas OSCE, limite diário, ordenação de vencidos,
  idempotência da semeadura.
- Contrato dos stores nos 3 adaptadores; teste da migração SQLite.
- Render das telas novas (card, sessão, estação OSCE) com os padrões da casa
  (tokens, escala, a11y, pt-BR, dois temas).
- Conteúdo continua validado no build; pergunta/checklist removido do conteúdo
  simplesmente deixa de aparecer na fila (item órfão é ignorado ao montar a
  sessão, sem crash).

## 7. Fora desta fase

- Cronômetro na estação OSCE; modo treino com lista visível.
- Botões de autoavaliação (Difícil/Bom/Fácil) — o EF já fica armazenado,
  então dá para adicionar depois sem migração.
- Notificações/push de lembrete diário.
- FSRS ou parâmetros configuráveis do algoritmo; configuração do limite diário.
- Casos clínicos (Fase 3) e qualquer sincronização (Fase 4).
