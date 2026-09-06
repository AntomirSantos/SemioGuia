---
id: voz-que-nao-voltou
titulo: A voz que não voltou
contexto: "Ambulatório de clínica geral. Um homem de 63 anos vem porque a voz está rouca há dois meses e meio. Começou depois de uma gripe e nunca mais normalizou. Ele é churrasqueiro, fuma um maço por dia desde os vinte anos e bebe cerveja quase todos os dias. Diz que a rouquidão 'não atrapalha, só incomoda'."
tags: [cabeca e pescoco, rouquidao, bandeira vermelha, tabagismo]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/boca-nariz-e-ouvidos
  - exame-fisico-geral/avaliacao-geral/linfonodos
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/tireoide-e-pescoco
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame das vias aéreas superiores e do pescoço"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame de cabeça e pescoço e linfonodos"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia de cabeça e pescoço"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A voz sai áspera e soprosa, e ele precisa limpar a garganta várias vezes durante a conversa. Diz que a gripe passou em uma semana, mas a voz ficou. Nega dor de garganta, febre e dificuldade para engolir. Perdeu quatro quilos nos últimos meses, o que ele atribui a 'andar mais no serviço'."
dados:
  - "Rouquidão persistente há 10 semanas"
  - "Tabagismo de 40 anos-maço, etilismo diário"
  - "Perda de 4 kg não intencional"
  - "Sem disfagia, sem odinofagia, sem febre"
  - "Pigarro frequente"
proximo: d-limiar
:::

::: no
tipo: decisao
id: d-limiar
pergunta: "Rouquidão depois de uma gripe. A partir de quando ela deixa de ser esperada?"
opcoes:
  - texto: "Rouquidão que dura mais de três a quatro semanas, sobretudo em tabagista e etilista, é bandeira vermelha e exige visualização da laringe, não apenas tratamento clínico."
    avaliacao: otima
    feedback: "A laringite após infecção viral melhora em dias e resolve em duas a três semanas. O que transforma a queixa em investigação é o tempo, e o limiar prático é conhecido: passando de três a quatro semanas, a laringe precisa ser vista. Em tabagista e etilista, os dois fatores de risco que mais pesam para câncer de laringe, o limiar é ainda mais rígido."
    proximo: c-exame
  - texto: "Como ele não tem dor nem dificuldade para engolir, a rouquidão isolada pode ser tratada com repouso vocal e inibidor de bomba de prótons, reavaliando em dois meses."
    avaliacao: erro
    feedback: "Refluxo de fato causa rouquidão e a prova terapêutica é comum, e ela vira armadilha exatamente neste paciente. Dez semanas de rouquidão em tabagista pesado com perda de peso é câncer de laringe até que a laringe seja vista. Ausência de dor não tranquiliza: o tumor de prega vocal costuma doer tarde."
    proximo: c-atraso
  - texto: "Solicitar tomografia de pescoço para investigar a causa da rouquidão."
    avaliacao: aceitavel
    feedback: "A imagem tem papel no estadiamento, depois. O exame que responde à pergunta é a visualização direta da laringe, que mostra a mucosa e a mobilidade das pregas vocais. Pedir tomografia primeiro atrasa o exame que decide e pode vir normal em lesões pequenas."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ele usa o inibidor de bomba por oito semanas, sem mudança na voz. Retorna quatro meses depois da primeira consulta, agora com dor irradiando para o ouvido e com um nódulo no pescoço que ele percebeu ao se barbear."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você examina a boca e a orofaringe com boa iluminação: mucosa sem lesões visíveis, dentição em mau estado. Palpa o pescoço por trás, sistematicamente, cadeia por cadeia. Na cadeia cervical profunda à direita, há um linfonodo de cerca de dois centímetros, endurecido, aderido aos planos profundos e indolor. A tireoide é normal. A laringe não é visível ao exame de consultório."
dados:
  - "Linfonodo cervical direito de 2 cm, endurecido, aderido, indolor"
  - "Orofaringe sem lesões visíveis"
  - "Tireoide normal"
  - "Laringe não avaliável sem instrumento"
proximo: d-linfonodo
:::

::: no
tipo: decisao
id: d-linfonodo
pergunta: "Como você caracteriza esse linfonodo e o que ele muda?"
opcoes:
  - texto: "Endurecido, aderido, indolor e maior que dois centímetros em adulto tabagista: são as características que apontam malignidade, e o encaminhamento passa a ser urgente."
    avaliacao: otima
    feedback: "As características importam mais que o tamanho isolado. Linfonodo reacional costuma ser móvel, elástico, doloroso e de crescimento rápido com regressão. O que preocupa é o oposto: consistência pétrea, aderência aos planos, ausência de dor e persistência. Somado à rouquidão prolongada, ele praticamente define o caminho da investigação."
    proximo: c-conduta
  - texto: "Provável linfonodo reacional pela infecção dentária evidente, que merece tratamento odontológico e reavaliação em um mês."
    avaliacao: erro
    feedback: "A boca em mau estado oferece uma explicação conveniente, e as características do linfonodo não combinam com ela. Reacional dói e é móvel. Atribuir a um foco dentário um linfonodo pétreo e aderido em tabagista com rouquidão de dez semanas é o erro que custa o estágio da doença."
    proximo: c-atraso-linfonodo
  - texto: "Solicitar punção do linfonodo antes de qualquer outra avaliação."
    avaliacao: aceitavel
    feedback: "A punção tem seu lugar e, na suspeita de tumor de via aérea superior, a prioridade é examinar a laringe: encontrar o tumor primário orienta biópsia, estadiamento e tratamento de uma vez. Biópsia aberta de linfonodo cervical antes de procurar o primário é conduta a ser evitada."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-atraso-linfonodo
texto: "Ele trata os dentes e retorna em cinco semanas com o linfonodo maior e a voz pior. O tempo perdido é o intervalo em que o tumor ainda poderia estar restrito à prega vocal."
proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Você encaminha com prioridade ao otorrinolaringologista, com um resumo escrevendo tempo de rouquidão, carga tabágica, perda de peso e as características exatas do linfonodo. A laringoscopia mostra lesão vegetante em prega vocal direita, com mobilidade reduzida da prega."
dados:
  - "Lesão vegetante em prega vocal direita"
  - "Mobilidade da prega reduzida"
  - "Encaminhamento com resumo detalhado"
  - "Biópsia programada"
proximo: d-comunicacao
:::

::: no
tipo: decisao
id: d-comunicacao
pergunta: "Ele volta e pergunta o que foi encontrado. Como você comunica?"
opcoes:
  - texto: "Dizer com clareza o que foi visto e o que ainda não se sabe, checar o que ele já entendeu, e combinar os próximos passos com data, sem prometer o que a biópsia ainda não disse."
    avaliacao: otima
    feedback: "Comunicar má notícia começa por descobrir o que a pessoa já sabe e quanto quer saber, e continua com informação clara e sem eufemismo. Dizer que existe uma lesão que precisa ser biopsiada é honesto; dizer que é câncer antes do resultado é antecipar o que não se sabe; dizer que provavelmente não é nada é mentir para aliviar o próprio desconforto."
    proximo: fim-otimo
  - texto: "Tranquilizar dizendo que provavelmente não é nada grave, para que ele não se desespere até a biópsia."
    avaliacao: erro
    feedback: "A tranquilização falsa custa duas coisas: a confiança, quando o resultado vier, e o senso de urgência, que é o que faz o paciente comparecer aos exames. Quem sai achando que não é nada falta à consulta seguinte com mais facilidade."
    proximo: fim-dano
  - texto: "Explicar em termos técnicos o achado da laringoscopia e entregar o encaminhamento, deixando as explicações mais detalhadas para o especialista."
    avaliacao: aceitavel
    feedback: "Encaminhar é correto e a linguagem técnica sem tradução deixa o paciente sem entender o que aconteceu com ele. Bastam duas ou três frases em linguagem comum, e a checagem do que ele entendeu, para que ele chegue ao especialista sabendo por que está lá."
    proximo: c-tecnico
:::

::: no
tipo: cena
id: c-tecnico
texto: "Ele sai com o papel e sem entender bem o que tem. Falta à primeira consulta marcada, porque não percebeu a urgência, e comparece três semanas depois, quando a secretária liga para ele."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A biópsia confirma carcinoma de laringe. Como o encaminhamento foi rápido e ele compareceu a tudo, o tratamento começa em três semanas e preserva a laringe. A voz não volta ao que era, e ele volta a trabalhar. Para de fumar durante o tratamento, com apoio do serviço."
ensino: "Rouquidão que passa de três a quatro semanas em adulto, sobretudo em tabagista e etilista, é indicação de ver a laringe, e nenhuma prova terapêutica substitui isso. No pescoço, o que caracteriza malignidade é a consistência pétrea, a aderência aos planos e a ausência de dor, e não apenas o tamanho. E comunicar o achado com clareza é parte do tratamento: quem não entende a urgência falta à consulta."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele chega ao serviço especializado três semanas depois do previsto, e o tratamento é mais extenso do que teria sido, com impacto maior na voz."
ensino: "Encaminhar não garante que o paciente chegue. Duas ou três frases em linguagem comum e a checagem do que ele entendeu são o que transforma um papel em comparecimento."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Tranquilizado, ele adia a biópsia por dois meses. Quando o diagnóstico sai, o tumor já invade estruturas vizinhas e o tratamento exige laringectomia total. Ele perde a voz e passa a se comunicar por outros meios."
ensino: "Tranquilização sem base custa a urgência e a confiança. Diante de uma lesão que ainda não tem diagnóstico, o correto é dizer o que se viu, o que não se sabe e quando se saberá, e garantir que a data do próximo passo esteja marcada."
:::
