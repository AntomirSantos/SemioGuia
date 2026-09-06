---
id: jato-que-ficou-fraco
titulo: O jato que ficou fraco
contexto: "Ambulatório de clínica geral. Um homem de 66 anos vem à consulta acompanhado da esposa, que o convenceu a vir. Ele conta, sem jeito, que levanta três vezes por noite para urinar, que o jato ficou fraco e que às vezes precisa esperar um tempo para começar. Diz que 'é da idade, todo homem fica assim'."
tags: [geniturinario, prostata, toque retal, ambulatorial]
topicosDeApoio:
  - mamas-e-geniturinario/exame-geniturinario-e-retal/toque-retal
  - mamas-e-geniturinario/exame-geniturinario-e-retal/genitalia-masculina-e-hernias
  - abdome/exame-do-abdome/percussao-do-abdome
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame geniturinário e toque retal"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da próstata"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia geniturinária"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele descreve os sintomas com relutância e olha para a porta algumas vezes. Diz que o problema começou devagar, há uns dois anos, e piorou nos últimos meses. Nega dor ao urinar, sangue na urina e febre. Perdeu peso? Ele não sabe dizer. Nunca fez exame de próstata na vida, e diz que 'não gosta dessa história de toque'."
dados:
  - "Sintomas urinários obstrutivos há 2 anos, piora recente"
  - "Noctúria de três episódios"
  - "Sem dor, sem hematúria, sem febre"
  - "Nunca realizou avaliação prostática"
  - "Resistência declarada ao exame de toque retal"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Ele diz que não gosta da ideia do toque retal. Como você conduz?"
opcoes:
  - texto: "Explicar o que o exame procura, como é feito, quanto dura e por que ele não é substituído pelo exame de sangue, e então pedir o consentimento dele."
    avaliacao: otima
    feedback: "A recusa costuma vir do desconhecimento e do constrangimento, e a explicação resolve boa parte. O ponto que convence é a informação: o toque avalia consistência, superfície, presença de nódulo e limites, coisas que nenhum exame de sangue informa. Explicado e consentido, o exame deixa de ser uma imposição e passa a ser uma escolha compartilhada."
    proximo: c-exame
  - texto: "Respeitar a recusa e solicitar apenas o exame de sangue, que hoje é suficiente para rastrear a próstata."
    avaliacao: erro
    feedback: "O marcador sanguíneo e o toque avaliam coisas diferentes e não se substituem. Existem tumores com marcador normal e nódulo palpável, e existem próstatas grandes e benignas com marcador elevado. Aceitar a recusa sem explicar é abrir mão de metade da avaliação sem que o paciente sequer soubesse do que estava abrindo mão."
    proximo: c-atraso
  - texto: "Encaminhar direto ao urologista, que fará o exame de toque com mais experiência."
    avaliacao: aceitavel
    feedback: "O encaminhamento é adequado e não deve substituir o exame que você pode fazer hoje. A fila costuma ser longa, e um nódulo palpável hoje muda a prioridade desse encaminhamento. Fazer o exame agora e encaminhar com a informação em mãos é melhor para o paciente."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "O marcador sanguíneo volta discretamente elevado, dentro da faixa que costuma ser atribuída ao aumento benigno da próstata. Ele é orientado a repetir em seis meses. Um ano depois, retorna com dor lombar persistente que nenhum analgésico resolve."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com o consentimento e a explicação feita, você examina. O abdome não mostra globo vesical à percussão. Ao toque retal, o tônus do esfíncter é normal. A próstata está aumentada, e na face lateral direita há uma área endurecida, de cerca de um centímetro, com superfície irregular, diferente da consistência elástica do restante da glândula. Os limites da glândula estão preservados e o exame não dói."
dados:
  - "Sem globo vesical à percussão"
  - "Próstata aumentada de volume"
  - "Nódulo endurecido de 1 cm em lobo direito"
  - "Superfície irregular no local do nódulo"
  - "Limites da glândula preservados"
proximo: d-nodulo
:::

::: no
tipo: decisao
id: d-nodulo
pergunta: "O toque encontrou um nódulo endurecido. O que isso muda?"
opcoes:
  - texto: "Muda a prioridade: nódulo endurecido é indicação de investigação com urologia independentemente do valor do marcador sanguíneo, que pode estar normal."
    avaliacao: otima
    feedback: "Essa é a razão pela qual o toque não pode ser abandonado. Uma parcela dos tumores de próstata cursa com marcador dentro da faixa de referência, e nesses casos o nódulo palpável é o único achado disponível. Encontrado o nódulo, o encaminhamento é prioritário e o valor do marcador não o cancela."
    proximo: c-conduta
  - texto: "Muda pouco: o aumento da próstata explica os sintomas, e o nódulo pode ser apenas uma área de fibrose."
    avaliacao: erro
    feedback: "Áreas de fibrose e cálculos existem e por isso o achado precisa ser investigado, não descartado. O aumento benigno explica os sintomas obstrutivos e não explica nem elimina o nódulo. Encontrar uma explicação para uma parte do quadro e usá-la para ignorar o resto é a armadilha mais comum."
    proximo: c-atraso-nodulo
  - texto: "Muda a conduta apenas se o marcador sanguíneo vier alterado, o que deve ser verificado antes do encaminhamento."
    avaliacao: aceitavel
    feedback: "O marcador será colhido e ajuda a compor o quadro, e ele não é condição para o encaminhamento. Um nódulo palpável já justifica a avaliação especializada, e esperar o resultado apenas acrescenta dias que podem virar semanas."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-atraso-nodulo
texto: "Ele é tratado apenas para os sintomas obstrutivos, com melhora do jato. Volta oito meses depois, quando o nódulo já é maior e há acometimento do outro lobo."
proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Você colhe o marcador, que volta moderadamente elevado, e encaminha com prioridade. Enquanto isso, os sintomas urinários continuam atrapalhando o sono dele. A esposa pergunta se não há nada para melhorar as idas ao banheiro enquanto a consulta não sai."
dados:
  - "Marcador moderadamente elevado"
  - "Encaminhamento prioritário realizado"
  - "Sintomas obstrutivos mantidos"
  - "Sono fragmentado por noctúria"
proximo: d-sintomas
:::

::: no
tipo: decisao
id: d-sintomas
pergunta: "O que você faz pelos sintomas enquanto a investigação corre?"
opcoes:
  - texto: "Tratar os sintomas com medidas comportamentais e medicação adequada, deixando claro que isso alivia o incômodo e não interfere na investigação do nódulo."
    avaliacao: otima
    feedback: "Aliviar o sintoma enquanto se investiga é bom cuidado, e a explicação evita um mal-entendido perigoso: o paciente que melhora do jato pode achar que o problema foi resolvido e faltar à consulta com o especialista. Dizer isso de forma explícita mantém as duas coisas em curso."
    proximo: fim-otimo
  - texto: "Não tratar nada até o diagnóstico, para não mascarar a evolução."
    avaliacao: erro
    feedback: "Os sintomas obstrutivos não são o parâmetro de acompanhamento do nódulo, e deixá-lo sem alívio por semanas ou meses é sofrimento evitável. Não há nada a mascarar: a investigação segue pela imagem e pela biópsia, não pela intensidade do jato urinário."
    proximo: fim-dano
  - texto: "Prescrever a medicação e orientar retorno somente após a consulta com o urologista."
    avaliacao: aceitavel
    feedback: "A medicação é correta e o retorno amarrado à consulta especializada tem um risco: se a fila atrasar, ninguém acompanha esse paciente no intervalo. Um retorno próprio, com data, garante que o encaminhamento realmente aconteceu."
    proximo: c-sem-retorno
:::

::: no
tipo: cena
id: c-sem-retorno
texto: "A consulta especializada é remarcada duas vezes pelo serviço e ele não avisa ninguém, porque estava melhor dos sintomas. A avaliação acontece quatro meses depois do previsto."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele é avaliado em três semanas, faz a biópsia e recebe o diagnóstico de câncer de próstata localizado, tratável com intenção curativa. Escolhe o tratamento com a equipe e está bem no acompanhamento. Os sintomas urinários melhoraram desde a primeira consulta."
ensino: "O toque retal e o marcador sanguíneo avaliam coisas diferentes e não se substituem: existem tumores com marcador normal e nódulo palpável. Recusa ao exame costuma ser desconhecimento, e explicar o que se procura, como e por quê resolve a maior parte. Encontrado um nódulo endurecido, o encaminhamento é prioritário, qualquer que seja o valor do marcador."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico sai quatro meses depois do previsto, ainda em fase tratável, com necessidade de tratamento mais extenso do que teria sido."
ensino: "Melhorar o sintoma pode fazer o paciente achar que o problema acabou. Um retorno próprio e marcado, independente da consulta especializada, é o que garante que o encaminhamento tenha acontecido de fato."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ele passa cinco meses sem tratamento sintomático, dormindo mal e evitando sair de casa. Nesse período, desanimado com o serviço, deixa de comparecer às consultas. Retorna um ano depois com doença avançada e dor óssea."
ensino: "Deixar o paciente sem alívio enquanto se investiga não protege nada e afasta quem já vinha relutante. Cuidar do sintoma e investigar a causa são tarefas simultâneas, e o bom cuidado do incômodo é também o que mantém o paciente vinculado ao serviço."
:::
