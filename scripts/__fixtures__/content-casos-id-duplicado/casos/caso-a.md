---
id: caso-dup
titulo: Caso um
contexto: Você é o interno de plantão.
tags: [emergencia]
topicosDeApoio: [exame-fisico-geral/sinais-vitais/pressao-arterial]
referencias: ["Referência de teste"]
revisao: pendente
inicio: c1
---

::: no
tipo: cena
id: c1
texto: Chega o paciente.
proximo: d1
:::

::: no
tipo: decisao
id: d1
pergunta: O que fazer?
opcoes:
  - texto: A conduta certa
    avaliacao: otima
    feedback: Isso.
    proximo: fim-otimo
  - texto: A conduta errada
    avaliacao: erro
    feedback: Não.
    proximo: fim-dano
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: Melhora.
ensino: Lição.
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: Piora.
ensino: Lição.
:::
