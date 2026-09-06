---
id: tremor-que-aparecia-parado
titulo: O tremor que aparecia com a mão parada
contexto: "Ambulatório de clínica geral. Um homem de 69 anos vem porque a mão direita treme. Ele diz que percebeu há uns oito meses, e que o filho notou antes dele. Acha que é 'nervoso', porque tem passado por dificuldades. A esposa comenta que ele anda mais devagar e que a letra dele diminuiu de tamanho."
tags: [neurologico, tremor, parkinsonismo, marcha]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/forca-tonus-e-reflexos
  - sistema-nervoso/exame-neurologico/marcha-e-sinais-meningeos
  - sistema-nervoso/exame-neurologico/sensibilidade-e-coordenacao
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame neurológico e de distúrbios do movimento"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame neurológico"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia neurológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Sentado, com as mãos apoiadas nas coxas, a mão direita dele apresenta um movimento rítmico e lento dos dedos, como se rolasse alguma coisa entre o polegar e o indicador. Quando ele estende a mão para pegar o copo de água, o movimento diminui. A voz é baixa e o rosto tem pouca expressão."
dados:
  - "Tremor de mão direita há 8 meses"
  - "Presente em repouso, diminui ao movimento voluntário"
  - "Redução do tamanho da letra"
  - "Voz baixa, pouca expressão facial"
  - "Lentificação percebida pela família"
proximo: d-caracterizacao
:::

::: no
tipo: decisao
id: d-caracterizacao
pergunta: "Como você caracteriza esse tremor?"
opcoes:
  - texto: "Observando quando ele aparece: em repouso, ao manter uma postura ou durante o movimento em direção a um alvo, porque cada situação aponta para uma causa diferente."
    avaliacao: otima
    feedback: "A classificação do tremor é toda observacional e cabe em três testes. Em repouso, com as mãos apoiadas e o paciente distraído. Postural, com os braços estendidos à frente. E de ação, ao levar o dedo ao nariz. O tremor que aparece parado e melhora ao movimento tem uma explicação diferente do que aparece ao segurar um copo, e a conduta muda inteiramente."
    proximo: c-exame
  - texto: "Perguntando se piora com estresse e café, o que sugere tremor essencial."
    avaliacao: aceitavel
    feedback: "Praticamente todo tremor piora com estresse e cafeína, inclusive o parkinsoniano, e por isso essa pergunta discrimina pouco. O que separa é o momento em que ele aparece, e isso se observa, não se pergunta."
    proximo: c-exame
  - texto: "Solicitando ressonância de crânio, que é o exame que define a causa do tremor."
    avaliacao: erro
    feedback: "A ressonância serve para afastar causas secundárias em situações específicas e não faz o diagnóstico das síndromes parkinsonianas mais comuns, que é clínico. Começar pela imagem adia o exame que responde e costuma trazer achados inespecíficos."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com as mãos apoiadas e ele distraído contando de trás para frente, o tremor da mão direita fica evidente, com frequência baixa. Com os braços estendidos, o tremor quase some. No teste dedo nariz, não há tremor ao se aproximar do alvo. Ao mobilizar passivamente o punho direito, você sente uma resistência que cede em pequenos saltos. Os movimentos rápidos e repetidos dos dedos são lentos e perdem amplitude ao longo da série. Ele levanta da cadeira com dificuldade, dá passos curtos e não balança o braço direito ao caminhar."
dados:
  - "Tremor de repouso assimétrico, de baixa frequência"
  - "Rigidez com sensação de engrenagem no punho direito"
  - "Bradicinesia com decremento na sequência de movimentos"
  - "Passos curtos, redução do balanço do braço direito"
  - "Sem tremor de ação ou intenção"
proximo: d-sindrome
:::

::: no
tipo: decisao
id: d-sindrome
pergunta: "O que esses achados definem?"
opcoes:
  - texto: "Uma síndrome parkinsoniana: bradicinesia com decremento, associada a rigidez e tremor de repouso, de início assimétrico."
    avaliacao: otima
    feedback: "O elemento obrigatório é a bradicinesia, e ela tem uma característica que a distingue da simples lentidão: o movimento perde amplitude e velocidade ao longo da repetição. Somada à rigidez em engrenagem e ao tremor de repouso, com início de um lado só, o quadro é característico. A marcha confirma, com passos curtos e o braço que não balança."
    proximo: c-conduta
  - texto: "Tremor essencial, que é o tremor mais comum em idosos e responde a betabloqueador."
    avaliacao: erro
    feedback: "O tremor essencial é postural e de ação: aparece ao segurar um copo ou ao escrever, e melhora em repouso, exatamente o oposto do que se viu. Ele também costuma ser bilateral e não vem com rigidez, bradicinesia nem alteração da marcha. Confundir os dois leva a tratar com a droga errada por anos."
    proximo: c-atraso
  - texto: "Provável efeito de medicação, que precisa ser afastado antes de qualquer diagnóstico."
    avaliacao: aceitavel
    feedback: "Revisar a prescrição é obrigatório, porque algumas medicações produzem quadro muito semelhante, e essa causa é reversível quando identificada. A diferença costuma estar na simetria e no tempo: o quadro induzido por droga tende a ser mais simétrico e a se instalar após o início da medicação."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-atraso
texto: "Ele usa betabloqueador por seis meses sem qualquer mudança no tremor, e nesse período piora a marcha e passa a ter dificuldade para se virar na cama. A avaliação recomeça, agora com o quadro mais evidente."
proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "A revisão da prescrição não mostra medicação que explique o quadro. Ele pergunta o que tem, e a esposa pergunta se é a doença 'que o pai dela teve', e se ele vai ficar dependente. Ele ainda dirige e trabalha meio período."
dados:
  - "Nenhuma medicação causadora identificada"
  - "Paciente ativo, dirige e trabalha"
  - "Família pergunta sobre prognóstico"
  - "Quadro com menos de 1 ano de evolução"
proximo: d-comunicacao
:::

::: no
tipo: decisao
id: d-comunicacao
pergunta: "Como você conduz o diagnóstico e o encaminhamento?"
opcoes:
  - texto: "Nomear a síndrome de forma clara, explicar que o tratamento melhora bastante os sintomas, encaminhar à neurologia e abordar de forma prática os temas que preocupam, incluindo direção e trabalho."
    avaliacao: otima
    feedback: "Nomear evita que a família preencha o silêncio com o pior cenário que conhece. Também é importante dizer o que muda na prática: o tratamento sintomático costuma trazer melhora significativa por anos, e a evolução varia muito entre pessoas. Direção e trabalho precisam ser tratados de forma concreta, e não deixados para depois."
    proximo: fim-otimo
  - texto: "Encaminhar à neurologia sem nomear o diagnóstico, deixando a comunicação para o especialista."
    avaliacao: aceitavel
    feedback: "Evitar o diagnóstico por prudência costuma sair caro: a família busca a informação por conta própria e chega ao especialista já com o pior cenário na cabeça. Você pode nomear a síndrome e deixar a confirmação e o detalhamento para o especialista, sem prometer o que não sabe."
    proximo: c-silencio
  - texto: "Iniciar imediatamente o tratamento específico, para não perder tempo até a consulta."
    avaliacao: erro
    feedback: "A resposta ao tratamento é parte da avaliação diagnóstica, e iniciar antes da avaliação especializada pode dificultar a caracterização. Além disso, existem quadros parecidos que respondem mal ao tratamento e mudam o prognóstico. Quando a consulta está próxima, esperar é melhor."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-silencio
texto: "A família procura informação por conta própria e chega à consulta especializada convencida de que ele ficará acamado em poucos meses. A primeira consulta é gasta desfazendo esse medo, e ele passa semanas sem dirigir por decisão da família."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele é avaliado pela neurologia em um mês, o diagnóstico é confirmado e o tratamento sintomático traz melhora importante da lentidão e da rigidez. Continua trabalhando e dirigindo, com reavaliação periódica da direção. Dois anos depois, mantém independência completa."
ensino: "Tremor se classifica pelo momento em que aparece: repouso, postura ou ação. O tremor de repouso assimétrico que melhora com o movimento, somado a rigidez em engrenagem e bradicinesia com decremento, define a síndrome parkinsoniana, e a marcha confirma. Antes de fechar o diagnóstico, revise a prescrição, porque a forma induzida por medicação é reversível."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico e o tratamento acontecem no tempo certo, depois de semanas em que a família viveu um prognóstico muito pior do que o real, e ele perdeu a autonomia da direção sem necessidade."
ensino: "O silêncio diagnóstico não protege ninguém: a família preenche o vazio com o pior caso que conhece. Nomear a síndrome, dizer o que se sabe e o que ainda será confirmado, e tratar temas práticos como direção e trabalho evitam perdas de autonomia desnecessárias."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com o tratamento iniciado antes da avaliação, a caracterização fica prejudicada e a resposta parcial é interpretada como confirmação. Dois anos depois, a evolução atípica revela outro diagnóstico, com prognóstico diferente, e o tempo de acompanhamento adequado foi perdido."
ensino: "A resposta ao tratamento faz parte da avaliação diagnóstica nas síndromes parkinsonianas. Antecipá-lo sem necessidade embaralha a informação que o especialista usaria, e quadros semelhantes com evolução e prognóstico distintos podem passar despercebidos por anos."
:::
