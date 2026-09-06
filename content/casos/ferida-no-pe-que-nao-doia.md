---
id: ferida-no-pe-que-nao-doia
titulo: A ferida no pé que não doía
contexto: "Ambulatório de clínica geral. Um homem de 59 anos, diabético há dezoito anos, mostra uma ferida na planta do pé direito que ele descobriu há duas semanas, ao tirar a meia e ver sangue. Ele não sabe dizer quando começou. Diz que não dói nada, e por isso não achou que fosse importante."
tags: [vascular, pe diabetico, ulcera, neuropatia]
topicosDeApoio:
  - sistema-vascular-periferico/exame-vascular-periferico/doenca-venosa-cronica-e-trombose
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
  - sistema-nervoso/exame-neurologico/sensibilidade-e-coordenacao
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do pé diabético e exame vascular"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame vascular periférico e complicações do diabetes"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia do sistema vascular periférico"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A ferida fica na cabeça do primeiro metatarso, na área que apoia no chão. Tem cerca de dois centímetros, bordas grossas e esbranquiçadas, com um halo de pele espessa em volta. O fundo é rosado. Ele calça sapatos de bico fino no trabalho. A glicemia dele, segundo o cartão, tem estado alta há anos."
dados:
  - "Úlcera plantar sobre proeminência óssea, indolor"
  - "Bordas com hiperceratose ao redor"
  - "Duas semanas de evolução conhecida"
  - "Diabetes de 18 anos, controle irregular"
  - "Calçado inadequado"
proximo: d-classificacao
:::

::: no
tipo: decisao
id: d-classificacao
pergunta: "Antes de tratar a ferida, o que precisa ser respondido?"
opcoes:
  - texto: "Se o pé tem neuropatia, se tem doença arterial, e se há infecção: são três perguntas independentes, e a resposta de cada uma muda o tratamento."
    avaliacao: otima
    feedback: "O pé diabético não é um diagnóstico único. A neuropatia explica por que a ferida não dói e por que ela apareceu no ponto de maior pressão. A doença arterial define se há sangue suficiente para cicatrizar. E a infecção define urgência. Tratar a ferida sem responder às três é tratar a superfície de um problema que tem três camadas."
    proximo: c-exame
  - texto: "Que tipo de curativo usar, que é o que determina a cicatrização de úlceras crônicas."
    avaliacao: erro
    feedback: "O curativo importa muito menos do que as três perguntas acima. Uma úlcera neuropática não cicatriza com curativo nenhum enquanto o paciente continuar pisando nela, e uma úlcera isquêmica não cicatriza sem revascularização. Começar pelo curativo é começar pelo detalhe."
    proximo: c-exame
  - texto: "Se há osteomielite, solicitando ressonância antes de qualquer conduta."
    avaliacao: aceitavel
    feedback: "A pergunta é pertinente em úlcera profunda e persistente, e existe uma manobra de consultório que a antecede: sondar a ferida com instrumento estéril e verificar se ele toca osso, o que aumenta bastante a probabilidade de osteomielite. Exame primeiro, imagem depois."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com o paciente descalço e as duas pernas expostas, você testa a sensibilidade protetora com um filamento em vários pontos da planta: ele não sente em quatro dos dez pontos testados no pé direito. A sensibilidade vibratória está reduzida nos dois hálux. Os pulsos pedioso e tibial posterior estão presentes e simétricos, e os pés estão quentes. Ao sondar a ferida, o instrumento entra cerca de meio centímetro e não toca osso. Não há eritema além da borda, nem secreção, nem odor."
dados:
  - "Perda da sensibilidade protetora em 4 de 10 pontos"
  - "Sensibilidade vibratória reduzida"
  - "Pulsos distais presentes, pés quentes"
  - "Sondagem sem contato ósseo"
  - "Sem sinais locais de infecção"
proximo: d-mecanismo
:::

::: no
tipo: decisao
id: d-mecanismo
pergunta: "Pulsos presentes e sensibilidade perdida. Que tipo de úlcera é esta e o que ela exige?"
opcoes:
  - texto: "Úlcera neuropática por pressão: a medida mais importante é retirar a carga do local, com dispositivo adequado, além do desbridamento da hiperceratose e do controle glicêmico."
    avaliacao: otima
    feedback: "A localização conta a história: ela nasceu no ponto que recebe mais pressão em um pé que não sente. Enquanto o paciente pisar ali, nenhum tratamento local funciona. Retirar a carga é a intervenção que mais influencia a cicatrização, e a hiperceratose ao redor precisa ser removida porque funciona como uma pedra sobre a ferida."
    proximo: c-tratamento
  - texto: "Úlcera isquêmica, dada a cronicidade e o diabetes de longa data: encaminhar para avaliação vascular urgente."
    avaliacao: erro
    feedback: "Os pulsos estão presentes e os pés, quentes, o que fala contra isquemia significativa. A úlcera isquêmica costuma doer, aparecer em pontas dos dedos ou calcanhar, com pele fria e pulsos ausentes. Trocar o mecanismo troca também o tratamento, e o alívio de carga, que é o essencial aqui, não seria feito."
    proximo: c-tratamento
  - texto: "Úlcera de origem mista, exigindo tanto alívio de carga quanto avaliação arterial complementar."
    avaliacao: aceitavel
    feedback: "A cautela é razoável, e vale registrar que a calcificação arterial do diabético pode mascarar a avaliação. Ainda assim, pulsos palpáveis, pé quente e ausência de dor tornam o componente neuropático dominante, e o tratamento pode começar por ele enquanto a avaliação vascular corre, se indicada."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você desbrida a hiperceratose, orienta o curativo e encaminha para confecção do dispositivo de alívio de carga. Ele pergunta se pode continuar trabalhando normalmente, porque é vendedor e passa o dia em pé. Também pergunta se precisa mesmo trocar o sapato."
dados:
  - "Hiperceratose desbridada"
  - "Dispositivo de alívio de carga em confecção"
  - "Trabalho exige permanecer em pé"
  - "Uso de calçado de bico fino"
proximo: d-adesao
:::

::: no
tipo: decisao
id: d-adesao
pergunta: "Como você conduz a orientação sobre carga e calçado?"
opcoes:
  - texto: "Explicar que o alívio de carga é o tratamento, negociar uma adaptação viável da rotina de trabalho e orientar a troca do calçado, com exame dos pés a cada consulta e inspeção diária em casa com espelho."
    avaliacao: otima
    feedback: "A orientação que não considera a vida do paciente não é cumprida. Negociar a adaptação é o que faz o alívio de carga acontecer de fato. E a prevenção tem dois pilares simples: calçado adequado e inspeção diária dos pés, que em quem perdeu a sensibilidade protetora substitui o alarme que a dor daria."
    proximo: fim-otimo
  - texto: "Liberar o trabalho normal e reforçar apenas o curativo diário, que é o que ele consegue cumprir."
    avaliacao: erro
    feedback: "Curativo diário com carga mantida é tratar a superfície enquanto a causa continua atuando dez horas por dia. A úlcera não fecha, aprofunda, e o próximo capítulo costuma ser infecção óssea. Se a adaptação do trabalho for difícil, ela precisa ser negociada, e não abandonada."
    proximo: fim-dano
  - texto: "Prescrever repouso absoluto com o pé elevado até a cicatrização completa."
    avaliacao: aceitavel
    feedback: "O repouso absoluto seria ideal em teoria e quase nunca é cumprido por alguém que precisa trabalhar. Prescrições que o paciente não pode seguir produzem abandono do tratamento inteiro. O dispositivo de alívio de carga existe justamente para permitir andar sem carregar a ferida."
    proximo: c-repouso
:::

::: no
tipo: cena
id: c-repouso
texto: "Ele tenta o repouso por cinco dias, não consegue manter e volta ao trabalho sem nenhum dispositivo. A ferida piora um pouco antes de o alívio de carga ser finalmente providenciado."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com o dispositivo de alívio de carga, desbridamentos periódicos e calçado adequado, a úlcera fecha em dez semanas. Ele passa a inspecionar os pés diariamente com um espelho e, no ano seguinte, traz uma nova área de pressão avermelhada antes que ela virasse ferida."
ensino: "Toda úlcera de pé em diabético pede três perguntas separadas: há neuropatia, há doença arterial, há infecção. A localização sobre ponto de pressão em pé insensível define a úlcera neuropática, e nela a medida mais importante é retirar a carga, não o curativo. Quem perdeu a sensibilidade protetora perdeu o alarme, e a inspeção diária é o alarme substituto."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A úlcera fecha em quatro meses, depois de uma piora inicial durante o período em que nenhum alívio de carga foi usado."
ensino: "Prescrição que o paciente não pode cumprir é prescrição perdida. Repouso absoluto costuma ser abandonado inteiro; o dispositivo de alívio de carga permite andar sem carregar a ferida, e por isso é o que funciona na vida real."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com a carga mantida, a úlcera aprofunda e infecta. Quatro meses depois ele tem osteomielite do primeiro metatarso, precisa de internação, antibiótico prolongado e amputação do hálux e da cabeça do metatarso."
ensino: "Curativo com carga mantida não fecha úlcera plantar. Enquanto o paciente pisa na ferida, o mecanismo que a criou continua atuando, e o desfecho previsível é infecção profunda e perda de tecido em um pé que nunca doeu."
:::
