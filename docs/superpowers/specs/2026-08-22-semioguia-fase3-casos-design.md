# SemioGuia Fase 3 — Casos clínicos: Design

Data: 22/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat, aguardando revisão do texto

## 1. Objetivo

Vinhetas clínicas interativas **ramificadas**: o aluno toma decisões e o caso
evolui conforme elas, até um de vários desfechos. Ensino pelo erro com
segurança — a consequência aparece na história, não no paciente.

## 2. Decisões do autor (registradas em 22/08)

1. **Formato:** ramificado — as escolhas mudam o rumo do caso.
2. **Grau:** árvore completa com **múltiplos desfechos** (ótimo, aceitável,
   dano), não apenas desvios que reconvergem.
3. **Piloto:** 3 casos ancorados no conteúdo existente de sinais vitais:
   crise hipertensiva no pronto-socorro; febre na criança pequena; síncope
   com pulso irregular. Rascunhos das referências (nunca cópia), revisão do
   autor (`revisao: pendente`).
4. **Representação:** grafo declarativo no pipeline de conteúdo (aprovada a
   abordagem A sobre código-por-caso e ferramenta externa).

## 3. Formato do caso (`content/casos/*.md`)

Frontmatter: `id` (slug), `titulo`, `contexto` (uma linha: cenário e papel do
aluno, ex. "Você é o interno no pronto-socorro"), `tags`, `topicosDeApoio`
(ids de tópicos existentes — validados), `referencias` (≥1),
`revisao: pendente`, `inicio` (id do primeiro nó).

Corpo: lista de **nós**, cada um em bloco fenced YAML (mesma mecânica
`::: tipo` dos tópicos):

```yaml
# nó de história/apresentação de dados
{ tipo: 'cena', id: string, texto: string, dados?: string[], proximo: string }
# dados: linhas curtas de achados objetivos ("PA 210 × 130 mmHg", "FC 118 bpm")

# nó de decisão
{ tipo: 'decisao', id: string, pergunta: string,
  opcoes: [ { texto: string, avaliacao: 'otima'|'aceitavel'|'erro',
              feedback: string, proximo: string } ]  # 2-4 opções
}

# nó terminal
{ tipo: 'desfecho', id: string, classe: 'otimo'|'aceitavel'|'dano',
  texto: string, ensino: string }
# ensino: a mensagem-chave do caso, sempre presente no fechamento
```

### Validação de grafo (no build — erro de conteúdo não chega ao aluno)

- `inicio` existe; todo `proximo` aponta para nó existente.
- Todo nó é alcançável a partir de `inicio`.
- O grafo é acíclico; todo caminho termina em `desfecho`.
- Existe ao menos um caminho cujas decisões são todas `otima`, e ele termina
  em desfecho `otimo`.
- Cada `decisao` tem exatamente uma opção `otima`.
- `topicosDeApoio` referenciam tópicos existentes.
- Ids de nó únicos dentro do caso; ids de caso únicos no app.

## 4. Motor (`src/casos/`)

Puro, sem UI/store, no padrão do SM-2:

```ts
interface EstadoCaso {
  casoId: string;
  noAtual: string;
  trilha: { decisaoId: string; opcaoIndex: number; avaliacao: Avaliacao }[];
}
iniciar(caso) → EstadoCaso
avancar(caso, estado) → EstadoCaso            // segue 'proximo' de cena
decidir(caso, estado, opcaoIndex) → EstadoCaso // registra trilha e move
nota(estado) → { otimas: number; aceitaveis: number; erros: number }
concluido(caso, estado) → desfecho | null
```

## 5. Experiência

- **Aba Estudar** ganha a seção "Casos clínicos": lista dos casos com o
  melhor desfecho já alcançado (ou "não iniciado"). Toque abre o player.
- **Player:** mostra a cena (texto + dados objetivos em card), depois a
  decisão; ao escolher, exibe o **feedback** da opção antes de seguir o
  grafo. Progresso implícito (sem barra — o aluno não deve inferir o
  tamanho do caminho restante).
- **Desfecho:** classe com tratamento visual (ótimo `ok`, aceitável
  `perola`, dano `erro`), texto + **ensino**, a trilha das decisões do
  aluno com a opção ótima indicada em cada uma, e "Refazer o caso".
- **Progresso:** novo registro no store — conclusões de caso
  (`casoId`, `classe`, `otimas/aceitaveis/erros`, `concluidoEm`). O melhor
  desfecho por caso vem daí. **Não** alimenta o SM-2 nesta fase.
- Abandono no meio do caso: sem persistência de estado parcial na v1 —
  recomeça do início (casos são curtos por design).

## 6. Conteúdo piloto

3 casos (§2.3), cada um com 3-5 decisões e 3-4 desfechos, ancorados nos
tópicos de sinais vitais (linkados em `topicosDeApoio`). Fatos clínicos
consistentes com o conteúdo aprovado (DBHA 2025, cortes de febre, pulso).
Redação original a partir das referências da biblioteca. `revisao: pendente`
até o autor aprovar cada caminho.

## 7. Erros e testes

- TDD no motor (iniciar/avancar/decidir/nota/concluido; decisão inválida
  lança; trilha preservada).
- Testes do validador de grafo (cada regra do §3 com caso que falha).
- Testes de tela (lista, player com decisão + feedback, desfecho com trilha).
- Suíte de contrato do store estendida para o registro de conclusões
  (3 adaptadores; migração SQLite v3 versionada).
- Gates e deploy padrão (jest, tsc, contraste, build:content sync,
  gh-pages, verificação headless).

## 8. Fora desta fase

- Persistência de estado parcial do caso; casos alimentando o SM-2;
  cronômetro; casos fora de sinais vitais (virão com os próximos
  capítulos); imagens/ilustrações dentro dos casos (possível depois — o
  schema pode ganhar `ilustracao` em cena numa fase futura sem migração).
