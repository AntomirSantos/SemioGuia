# SemioGuia — Design do Produto e Arquitetura

**Data:** 2026-08-21
**Status:** Aprovado pelo autor (Antomir Santos)
**Nome provisório:** SemioGuia

## 1. Visão

Aplicativo iOS + Android: guia de bolso de semiologia médica completa, para
**aprender** (estudantes do ciclo clínico) e **relembrar** (internos e
residentes à beira do leito). Referência de mercado a superar: Semi-On, cujos
problemas identificados são visual datado, texto corrido demais e ausência de
recursos de fixação.

**Diferenciais do SemioGuia:**
1. Design moderno e convidativo (padrão de agência, não "app de faculdade")
2. Conteúdo visual e escaneável — cards, checklists, tabelas, fluxogramas
3. Aprendizado ativo — quiz, revisão espaçada, casos clínicos, checklists
   praticáveis

## 2. Decisões de produto

| Decisão | Escolha |
|---|---|
| Público | Estudantes E internos/residentes, igualmente |
| Escopo de conteúdo v1 | Semiologia completa (todos os sistemas) |
| Fonte do conteúdo | Livros enviados pelo autor como referência; Claude redige conteúdo original; autor revisa e aprova tudo antes de entrar no app |
| Contas | Sem login na v1; arquitetura preparada para contas/assinatura futura |
| Conectividade | 100% offline |
| Contas de desenvolvedor | Nenhuma ainda; desenvolvimento primeiro, publicação depois (Apple US$99/ano, Google US$25 único) |

**Direitos autorais:** os livros são referência bibliográfica, nunca copiados
verbatim. Todo conteúdo do app é redação original, com os livros citados na
bibliografia.

## 3. Stack técnica

**React Native + Expo (TypeScript).** Um código para iOS e Android; EAS para
build e publicação; updates over-the-air para atualizar conteúdo sem passar
pela revisão das lojas; teste no aparelho via Expo Go sem conta de
desenvolvedor.

Alternativas descartadas: Flutter (sem OTA equivalente, teste em aparelho mais
difícil sem conta), nativo duplo (dobro do trabalho sem ganho para app de
conteúdo).

## 4. Arquitetura geral

Duas metades independentes:

1. **Conteúdo** — arquivos Markdown com metadados, em `content/<sistema>/`,
   revisáveis pelo autor sem conhecimento técnico. Um script de build valida e
   converte tudo num pacote de dados embutido no app.
2. **App** — apenas renderiza o pacote: navegação, busca, quiz, progresso.
   Corrigir/adicionar conteúdo não altera código.

**Progresso do usuário** em SQLite local, separado do conteúdo. Essa separação
viabiliza a Fase 4 (sincronização e paywall) sem re-arquitetura.

## 5. Modelo de conteúdo

Hierarquia: **Sistema → Capítulo → Tópico**. Sistemas previstos na v1:
Anamnese, Exame físico geral, Cardiovascular, Respiratório, Abdome,
Neurológico, Cabeça e pescoço, Osteoarticular, Vascular periférico, Pele e
anexos. *A taxonomia final segue a organização dos livros de referência do
autor quando enviados.*

Cada tópico é composto de **blocos**:

- **Conceito** — texto curto e direto
- **Manobra** — passo a passo numerado (posição, técnica, o que observar)
- **Sinal/Achado** — card: achado, significado, causas
- **Checklist** — sequência de exame em itens marcáveis
- **Tabela comparativa**
- **Fluxograma** — raciocínio semiológico
- **Pérola clínica** — dica/pegadinha em destaque
- **Quiz** — múltipla escolha vinculada ao tópico

Cada tópico tem tags de busca (epônimos incluídos, ex.: "Sinal de Blumberg") e
referências bibliográficas. Os blocos são reutilizados pelas fases seguintes:
quiz alimenta a revisão espaçada; checklist vira o modo praticável.

## 6. Navegação e telas

Quatro abas:

1. **Guia** — grade de cards por sistema (ícone + cor própria) → capítulos →
   tela de tópico (blocos). Caminho do estudo sequencial.
2. **Busca** — busca instantânea offline por tópico, manobra, sinal ou tag;
   recentes e favoritos. Caminho beira-de-leito: tudo em ≤2 toques.
3. **Estudar** — hub de aprendizado ativo. Fase 1: quiz por tópico +
   histórico. Fases seguintes acrescentam revisão espaçada, checklists
   praticáveis (modo OSCE) e casos clínicos na mesma aba.
4. **Perfil** — progresso por sistema, ajustes (tema, fonte), bibliografia e
   aviso legal ("material educacional, não substitui julgamento clínico").

Tela de tópico tem **favoritar** e **marcar como estudado**.

## 7. Identidade visual

- Direção: limpo, clínico e moderno (referências: Headway, Notion)
- Fundo neutro; **uma cor de destaque por sistema** (cardio coral,
  respiratório azul, neuro violeta, abdome âmbar…)
- Uma família tipográfica, hierarquia forte, fonte ajustável
- Cards com cantos arredondados, sombras sutis, bastante respiro
- **Modo escuro completo desde a v1** (plantão noturno)
- Ícones de linha por sistema; contraste AA; alvos de toque generosos
- Skills a usar na implementação: `sleek-design-mobile-apps` +
  `high-end-visual-design`
- **Mockups das telas principais serão aprovados pelo autor antes da
  implementação das telas**

## 8. Dados locais e progresso

SQLite no aparelho: tópicos estudados, favoritos, resultados de quiz por
pergunta (insumo da revisão espaçada), buscas recentes, preferências. Nada sai
do aparelho na v1 — zero coleta de dados pessoais (simplifica LGPD e revisão
das lojas). Migrações de esquema versionadas desde o início.

## 9. Erros e testes

- Conteúdo **validado no build**: estrutura dos arquivos, links internos,
  quiz sem resposta correta — erro de conteúdo não chega ao usuário
- Estados vazios amigáveis nas telas; crash reporting (Sentry)
- Testes: unitários na lógica pura (busca, pontuação de quiz, agendador de
  revisão espaçada), renderização dos componentes de bloco, e validador de
  conteúdo em CI a cada commit

## 10. Faseamento

| Fase | Entrega |
|---|---|
| **1 — O Guia** | App completo de consulta/estudo: todo o conteúdo, navegação, busca, design novo, quiz por tópico |
| **2 — Fixação** | Revisão espaçada + checklists praticáveis (modo OSCE) |
| **3 — Casos clínicos** | Vinhetas interativas passo a passo |
| **4 — Monetização** | Contas, assinatura, sincronização. Backend auditado com as skills `firebase-security-rules-auditor` e `better-auth-security-best-practices` antes de ir ao ar |

Revisão de arquitetura com a skill `improve-codebase-architecture` ao fim de
cada fase.

## 11. Fluxo de produção de conteúdo

1. Autor envia livros de referência (links de nuvem — Google Drive/Dropbox)
2. Claude redige conteúdo original em Markdown, seção por seção
3. Autor revisa e aprova cada seção
4. Conteúdo aprovado entra no pacote do app

Os PDFs nunca entram no repositório (copyright + tamanho); apenas o conteúdo
original derivado.
