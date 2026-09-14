# O baralho do Anki

O SemioGuia gera um baralho do Anki a partir do próprio conteúdo compilado.
Nenhuma carta é escrita à mão: cada uma sai de um bloco já revisado, então o
baralho herda a revisão do autor e se regenera inteiro quando o conteúdo muda.

```
npm run anki
```

Sai um `SemioGuia.apkg` na raiz do repositório. Ele fica fora do Git, como os
PDFs: o conteúdo é a fonte, o baralho é uma saída.

## Como os baralhos estão organizados

Do mesmo jeito que o app: um baralho por sistema, na ordem craniocaudal, e
dentro dele um subbaralho por modo de estudo. O número na frente do nome
existe porque o Anki ordena baralhos em ordem alfabética, e sem ele o
Abdome viria antes da Anamnese.

```
SemioGuia
├── 01 Anamnese
│   ├── Questões
│   ├── Recuperação ativa
│   ├── Em três linhas
│   ├── Roteiros e manobras
│   └── Casos relâmpago
├── 02 Exame físico geral
│   ├── Plantão (sinais)
│   └── ...
└── ... até 12 Semiologia da criança
```

Um sistema só ganha o subbaralho do que ele tem. A Anamnese não tem verbetes
de plantão, então não aparece "Plantão (sinais)" nela, e só o cardiovascular
e o respiratório têm "Ausculta".

## O que vira carta

| Subbaralho | De onde vem | Frente | Verso |
|---|---|---|---|
| Plantão (sinais) | blocos `sinal` | o nome do achado | o achado, o que significa e as causas a considerar |
| Questões | blocos `quiz` | enunciado e alternativas | a correta e o porquê |
| Recuperação ativa | blocos `pense` | a pergunta do tópico | a resposta |
| Em três linhas | blocos `resumo` | o nome do tópico | as três frases de saída |
| Roteiros e manobras | blocos `checklist` e `manobra` | o nome do roteiro | os passos, na ordem |
| Casos relâmpago | blocos `relampago` | a cena e a decisão | a conduta e o desfecho |
| Ausculta | blocos `som` | o áudio, sem o nome | o achado e a descrição |

São cerca de 817 cartas, incluindo uma carta de rosto no baralho raiz que diz
de onde o material veio e o que ele não cobre.

## O que não vira carta, e por quê

**Os 67 casos clínicos ramificados.** São decisões encadeadas, com feedback a
cada escolha e desfecho no fim. Cartão de memória não faz isso, e transformar
um grafo numa carta destruiria justamente o que ele treina. Eles continuam no
app. Os casos relâmpago, que são de decisão única, viram carta sem perda.

**As ilustrações.** São SVG animados, que dependem do renderizador do app.

**Conceito, pérola, tabela e cena.** São texto de leitura, não recuperação. O
que eles ensinam chega às cartas pelo caminho certo, que são as questões, os
resumos e as perguntas de recuperação ativa escritas para isso.

## Reimportar não duplica

Cada carta carrega um identificador estável derivado do conteúdo que a
originou (o id do tópico mais o tipo do bloco). Quando você gerar o baralho de
novo depois de mudar o conteúdo e importar por cima, o Anki **atualiza** as
cartas existentes e preserva o seu histórico de revisão, em vez de criar
cópias. Os baralhos também têm id fixo, pelo mesmo motivo.

Isso vale enquanto o identificador não mudar. Renomear um sinal ou mudar o id
de um tópico cria uma carta nova e aposenta a antiga, o que é o comportamento
correto: o conteúdo mudou de identidade.

## Etiquetas

Cada carta vem com etiquetas hierárquicas, que o Anki mostra em árvore e
aceita na busca:

```
SemioGuia::sistema::aparelho-cardiovascular
SemioGuia::topico::ausculta-cardiaca
SemioGuia::tipo::sinal
SemioGuia::nivel::basico
```

Assim dá para montar um filtro por sistema, por tipo de carta ou só do que o
app marca como nível básico, sem depender da estrutura de baralhos.

## Aparência

Três modelos de nota (Básico, Múltipla escolha e Ausculta), todos na
identidade editorial do app: papel e tinta, serifada na leitura, a regra de
2,5px em tinta separando pergunta de resposta, o acento vinho nos links e uma
variante para o modo escuro do Anki. O rodapé de cada carta traz as obras de
referência do tópico e um link que abre o tópico correspondente na versão web.

## Sobre os sons

As 21 cartas de ausculta levam os arquivos de áudio dentro do pacote. Dez são
sintetizados por `scripts/gerar-sons.py` e dez são gravações clínicas reais,
de datasets abertos que exigem atribuição: HF_Lung_V1 (CC BY 4.0) e CirCor
DigiScope (ODC-BY 1.0), ambas com as modificações declaradas. Cada carta de
ausculta carrega essa atribuição no rodapé, e a procedência completa está em
`assets/sons/LICENCAS.md`. Se um dia você distribuir o baralho, a atribuição
precisa ir junto, e ela já vai.

## Antes de distribuir

O baralho carrega o conteúdo inteiro do app fora do app, sem anúncio e sem
compra. Enquanto ele for só seu, ou de um grupo de estudo, isso é um ganho.
Publicá-lo aberto é, na prática, publicar o produto: vale ser uma decisão, e
não um acidente.
