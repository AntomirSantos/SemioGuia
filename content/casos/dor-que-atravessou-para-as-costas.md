---
id: dor-que-atravessou-para-as-costas
titulo: A dor que atravessou para as costas
contexto: "Pronto socorro, madrugada de domingo. Um homem de 46 anos chega curvado para a frente, segurando a barriga. Diz que a dor começou há oito horas no alto do abdome, forte e contínua, e que atravessa para as costas. Vomitou várias vezes sem alívio nenhum. Bebeu bastante na festa de sábado."
tags: [abdome, pancreatite, dor epigastrica, gravidade]
topicosDeApoio:
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
  - abdome/exame-do-abdome/palpacao-do-abdome
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome"
  - "Porto, Semiologia Médica, 8ª ed., seção de doenças do pâncreas e abdome agudo"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele encontra alívio parcial sentado e inclinado para a frente, com os joelhos dobrados, e piora ao deitar. A dor não vem em ondas: é contínua desde o início, sem intervalos. Os vômitos foram cinco ou seis, e nenhum deles melhorou nada. Ele conta que já teve 'crise de pedra na vesícula' há dois anos."
dados:
  - "Dor epigástrica contínua há 8 horas, irradiando para o dorso"
  - "Alívio parcial em posição fetal ou inclinado para a frente"
  - "Vômitos repetidos sem alívio"
  - "FC 112 bpm, PA 118 x 72 mmHg, FR 24 irpm"
  - "Ingestão alcoólica intensa na véspera, cálculo biliar conhecido"
proximo: d-caracterizacao
:::

::: no
tipo: decisao
id: d-caracterizacao
pergunta: "O que a posição de alívio e o padrão da dor sugerem?"
opcoes:
  - texto: "Dor de origem retroperitoneal: contínua, transfixante para o dorso e aliviada ao inclinar o tronco para a frente, o padrão que a pancreatite costuma desenhar."
    avaliacao: otima
    feedback: "A posição que alivia é informação semiológica de verdade. Ao inclinar o tronco para a frente, o peso das vísceras deixa de comprimir o retroperitônio, e por isso a dor cede um pouco. Some a isso o caráter contínuo, sem as ondas da obstrução, e a irradiação em faixa para o dorso: o quadro aponta para o pâncreas antes de qualquer exame de sangue."
    proximo: c-exame
  - texto: "Dor de origem obstrutiva: os vômitos repetidos indicam obstrução intestinal alta."
    avaliacao: erro
    feedback: "Vômito acompanha as duas coisas, mas o resto não combina: a dor obstrutiva vem em cólicas com alívio entre elas, e aqui ela é contínua desde o começo. Além disso, a obstrução alta não costuma irradiar em faixa para o dorso nem melhorar com o tronco inclinado."
    proximo: c-exame
  - texto: "Provável úlcera péptica complicada, dada a dor epigástrica intensa em quem bebeu muito."
    avaliacao: aceitavel
    feedback: "A hipótese é razoável e precisa ser considerada, sobretudo a perfuração. O que fala contra é a ausência de rigidez de parede e o modo como a dor irradia. O exame do abdome, feito com atenção à defesa e à percussão hepática, separa as duas em poucos minutos."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "O abdome está distendido no andar superior e doloroso à palpação do epigástrio, com defesa voluntária que cede quando você conversa com ele. Não há rigidez involuntária nem descompressão dolorosa evidente. A macicez hepática está preservada à percussão. Os ruídos hidroaéreos estão diminuídos. Não há icterícia visível na esclera com luz natural. As extremidades estão discretamente frias."
dados:
  - "Dor epigástrica à palpação, sem rigidez involuntária"
  - "Macicez hepática preservada"
  - "Ruídos hidroaéreos diminuídos"
  - "Sem icterícia perceptível"
  - "FC 118 bpm, extremidades discretamente frias"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "Que achados do exame você usa para estimar a gravidade agora?"
opcoes:
  - texto: "Os sinais de perfusão e de terceiro espaço: frequência cardíaca, temperatura das extremidades, frequência respiratória e diurese, porque a pancreatite grave perde grandes volumes para dentro do abdome."
    avaliacao: otima
    feedback: "A pancreatite não mata pela dor, mata pela perda de volume para o retroperitônio e pela resposta inflamatória sistêmica. Por isso a gravidade se acompanha à beira do leito com os mesmos parâmetros do choque: pulso, perfusão, respiração e diurese. Nas primeiras horas, esses sinais valem mais que o valor da amilase."
    proximo: c-tratamento
  - texto: "O valor da amilase e da lipase: quanto mais altos, mais grave o quadro."
    avaliacao: erro
    feedback: "As enzimas confirmam o diagnóstico e não graduam a gravidade: pancreatites leves podem cursar com valores altíssimos e formas graves, com elevações modestas. Usar o número como termômetro de gravidade leva a subestimar justamente o paciente que mais precisa de volume e de vigilância."
    proximo: c-tratamento
  - texto: "A presença de manchas na pele dos flancos ou ao redor do umbigo, que indicam gravidade."
    avaliacao: aceitavel
    feedback: "Esses sinais existem, apontam sangramento retroperitoneal e valem a inspeção completa do abdome despido. O problema é o tempo: eles costumam aparecer dias depois, quando a gravidade já se manifestou por outros caminhos. Procure, mas não espere por eles."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você inicia hidratação venosa vigorosa, analgesia e jejum, e solicita os exames. A lipase volta muito elevada. A ultrassonografia mostra cálculos na vesícula, sem dilatação evidente das vias biliares. Duas horas depois, com dois litros infundidos, a frequência cardíaca caiu para 96 bpm e ele urinou."
dados:
  - "Lipase muito elevada"
  - "Colelitíase à ultrassonografia, sem dilatação de vias biliares"
  - "FC 96 bpm após 2 litros, diurese presente"
  - "Sem febre, sem icterícia"
proximo: d-antibiotico
:::

::: no
tipo: decisao
id: d-antibiotico
pergunta: "Um colega sugere iniciar antibiótico profilático. O que você decide?"
opcoes:
  - texto: "Não iniciar antibiótico: sem sinal de infecção, ele não previne complicação e seleciona germes resistentes. O tratamento nesta fase é volume, analgesia e vigilância."
    avaliacao: otima
    feedback: "O reflexo de cobrir é forte e aqui não se sustenta. Na pancreatite aguda sem sinal de infecção, o antibiótico profilático não melhora desfecho e cobra o preço da resistência e da candidíase. O que muda o prognóstico nas primeiras horas é hidratação adequada e reavaliação frequente, sempre com o exame à beira do leito."
    proximo: fim-otimo
  - texto: "Iniciar antibiótico de amplo espectro, já que a pancreatite é um quadro inflamatório grave com risco de infecção."
    avaliacao: erro
    feedback: "Inflamação não é infecção. A febre e a leucocitose da pancreatite vêm da própria resposta inflamatória, e tratá-las com antibiótico não reduz complicação. Pior: quando a infecção realmente aparecer, dias depois, o paciente já terá selecionado germes mais difíceis."
    proximo: fim-dano
  - texto: "Não iniciar agora, mas manter observação e reavaliar em vinte e quatro horas apenas se houver piora clínica."
    avaliacao: aceitavel
    feedback: "A decisão de não iniciar está correta. O intervalo é que é longo demais: nas primeiras vinte e quatro horas a hidratação precisa ser reavaliada em intervalos de poucas horas, porque é justamente aí que a perda para o terceiro espaço acontece."
    proximo: c-reavaliacao-tardia
:::

::: no
tipo: cena
id: c-reavaliacao-tardia
texto: "Na manhã seguinte ele está taquicárdico de novo, com pouca diurese e mais dor. A reposição foi insuficiente durante a noite e ele precisa de correção agressiva, agora com função renal já alterada."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com hidratação bem conduzida e reavaliações a cada poucas horas, ele melhora ao longo de dois dias, volta a se alimentar no terceiro e é operado da vesícula na mesma internação, antes da alta, para evitar uma segunda crise."
ensino: "A dor contínua, transfixante para o dorso e aliviada com o tronco inclinado para a frente, desenha a origem retroperitoneal. A gravidade da pancreatite se acompanha pelos sinais de perfusão, não pelo valor da enzima. E antibiótico profilático não faz parte do tratamento na ausência de infecção. Na pancreatite de origem biliar, a vesícula sai antes da alta."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera, com lesão renal aguda transitória e uma internação de nove dias em vez de quatro."
ensino: "Na pancreatite, a hidratação das primeiras horas é o tratamento principal, e ela se ajusta por reavaliações frequentes de pulso, perfusão e diurese. Intervalos longos entre as avaliações permitem que a perda para o terceiro espaço aconteça sem ninguém ver."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Duas semanas depois ele desenvolve uma coleção infectada com germe resistente e candidemia associada. A internação passa por terapia intensiva, drenagem percutânea e cinco semanas de hospital."
ensino: "Antibiótico não previne a infecção da necrose pancreática e favorece a seleção de germes difíceis, exatamente os que aparecerão se a infecção vier. A febre e a leucocitose iniciais pertencem à inflamação, e o tratamento delas é volume e tempo, não cobertura antimicrobiana."
:::
