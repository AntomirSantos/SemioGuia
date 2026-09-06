---
id: coracao-disparado-e-pescoco-quente
titulo: O coração disparado e o pescoço quente
contexto: "Emergência de hospital geral, segunda-feira. Uma mulher de 42 anos chega agitada, suando muito, dizendo que o coração está disparado desde ontem. A irmã conta que ela emagreceu bastante nos últimos meses, anda irritada e insone, e que parou o remédio da tireoide há dois meses porque 'estava se sentindo bem'. Ela teve uma infecção urinária tratada na semana passada."
tags: [cabeca e pescoco, tireotoxicose, tireoide, emergencia]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/tireoide-e-pescoco
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da tireoide e de tireotoxicose"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da tireoide"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia de cabeça e pescoço"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela não para quieta na maca, fala rápido e se confunde com as datas. A pele está quente e úmida em todo o corpo, e ela pede que desliguem o ventilador porque 'está com calor mesmo assim'. As mãos tremem visivelmente quando ela estende os braços. A irmã diz que ela 'não está sendo ela mesma' desde ontem."
dados:
  - "Palpitações há 24 horas, agitação e confusão leve"
  - "Temperatura 39,2 graus, FC 148 bpm irregular"
  - "PA 148 x 62 mmHg, FR 26 irpm"
  - "Pele quente e úmida, tremor fino de extremidades"
  - "Suspensão de medicação tireoidiana há 2 meses, infecção recente"
proximo: d-reconhecimento
:::

::: no
tipo: decisao
id: d-reconhecimento
pergunta: "Febre alta, taquicardia importante e agitação. Qual hipótese organiza melhor esses achados?"
opcoes:
  - texto: "Crise tireotóxica: a combinação de febre, taquiarritmia, agitação com confusão e pele quente e úmida, em quem parou a medicação e teve um gatilho infeccioso recente."
    avaliacao: otima
    feedback: "O diagnóstico é clínico e depende de reconhecer o padrão: hipertermia, taquicardia desproporcional, alteração do estado mental e sinais adrenérgicos difusos, quase sempre com um gatilho, como infecção, cirurgia ou abandono do tratamento. Nenhum exame de sangue chega a tempo de confirmar: o tratamento começa pela suspeita."
    proximo: c-exame
  - texto: "Sepse de foco urinário, dada a febre alta com taquicardia e a infecção recente."
    avaliacao: aceitavel
    feedback: "A hipótese é obrigatória e, na prática, as duas coisas convivem: a infecção é justamente o gatilho mais comum da crise. O que não se pode é tratar só a infecção, porque a tempestade hormonal segue seu curso independentemente do antibiótico."
    proximo: c-exame
  - texto: "Crise de ansiedade com síndrome do pânico, agravada por febre de outra causa."
    avaliacao: erro
    feedback: "A ansiedade não produz temperatura de 39,2 graus nem fibrilação atrial. E a leitura desse quadro como emocional em mulher de meia-idade é um viés conhecido e caro: a crise tireotóxica tem mortalidade alta e o tratamento depende de reconhecer o padrão nas primeiras horas."
    proximo: c-atraso
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela recebe ansiolítico e antitérmico. Duas horas depois está mais confusa, com temperatura de 39,6 graus, e o monitor mostra fibrilação atrial de alta resposta. A equipe recomeça a avaliação, agora pelo pescoço."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você examina o pescoço por trás, com ela sentada, pedindo que engula um gole de água. A tireoide está aumentada de forma difusa, com consistência elástica, e move-se com a deglutição. Ao apoiar o estetoscópio sobre os lobos, ouve-se um sopro contínuo suave. As pálpebras estão retraídas e há atraso da descida da pálpebra quando ela acompanha o dedo para baixo. O pulso é irregularmente irregular."
dados:
  - "Bócio difuso, elástico, móvel à deglutição"
  - "Sopro audível sobre a tireoide"
  - "Retração palpebral e atraso palpebral"
  - "Pulso irregularmente irregular, FC 152 bpm"
  - "Temperatura 39,4 graus"
proximo: d-sopro
:::

::: no
tipo: decisao
id: d-sopro
pergunta: "O que significa ouvir um sopro sobre a tireoide?"
opcoes:
  - texto: "Significa fluxo aumentado na glândula hipervascularizada, achado típico da tireotoxicose por doença autoimune e reforço importante para o diagnóstico à beira do leito."
    avaliacao: otima
    feedback: "A glândula hiperfuncionante recebe muito mais sangue, e esse fluxo aumentado produz um sopro contínuo audível sobre os lobos. É um achado que a maioria dos estudantes nunca procura porque não pensa em auscultar o pescoço. Junto com bócio difuso e sinais oculares, ele fecha o quadro sem precisar de exame algum."
    proximo: c-tratamento
  - texto: "Significa transmissão do sopro carotídeo, sem valor próprio."
    avaliacao: erro
    feedback: "O sopro carotídeo é sistólico e se ouve sobre o trajeto do vaso, não sobre os lobos da glândula. O sopro tireoidiano é contínuo e mais audível sobre o próprio tecido. Confundir os dois faz perder um achado que praticamente confirma a hipótese."
    proximo: c-tratamento
  - texto: "Significa provável nódulo vascularizado, e a conduta é solicitar ultrassonografia com doppler."
    avaliacao: aceitavel
    feedback: "A ultrassonografia entra na investigação depois, para caracterizar a glândula. Neste momento ela não muda nada: a glândula é difusamente aumentada, o sopro é difuso e a paciente está em crise. O exame de imagem não é urgência aqui."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você inicia medidas de suporte, resfriamento externo, hidratação e antitérmico, e prepara o tratamento específico. Estão disponíveis o betabloqueador, a droga antitireoidiana, o iodo e o corticoide. A frequência cardíaca permanece em torno de 150 bpm e a temperatura, em 39,4 graus."
dados:
  - "Suporte iniciado: hidratação, resfriamento, antitérmico"
  - "Drogas disponíveis: betabloqueador, antitireoidiano, iodo, corticoide"
  - "FC 150 bpm, temperatura 39,4 graus"
proximo: d-sequencia
:::

::: no
tipo: decisao
id: d-sequencia
pergunta: "Em que ordem você usa as drogas específicas?"
opcoes:
  - texto: "Betabloqueador para controlar a resposta adrenérgica, droga antitireoidiana para bloquear a síntese e, somente pelo menos uma hora depois dela, o iodo; corticoide para reduzir a conversão periférica."
    avaliacao: otima
    feedback: "A ordem tem uma razão específica: o iodo administrado antes do bloqueio da síntese fornece matéria-prima e pode agravar a tireotoxicose. Por isso ele vem sempre depois da droga antitireoidiana, com pelo menos uma hora de intervalo. O betabloqueador trata o que está matando a paciente agora, que é a resposta adrenérgica, e o corticoide reduz a conversão do hormônio na periferia."
    proximo: fim-otimo
  - texto: "Iodo primeiro, por ser o que mais rapidamente bloqueia a liberação hormonal, seguido do antitireoidiano."
    avaliacao: erro
    feedback: "O iodo de fato bloqueia a liberação, e se dado antes do bloqueio da síntese ele também alimenta a produção de hormônio novo. Essa inversão pode piorar a crise justamente na paciente mais grave. A regra é simples e vale a pena memorizar: antitireoidiano antes, iodo depois."
    proximo: fim-dano
  - texto: "Apenas betabloqueador e suporte, deixando o tratamento específico para o endocrinologista pela manhã."
    avaliacao: aceitavel
    feedback: "O betabloqueador trata a manifestação mais perigosa e é o passo mais urgente, e ele sozinho não interrompe a produção hormonal. A crise tireotóxica tem mortalidade alta, e adiar o bloqueio da síntese até a manhã seguinte deixa a fonte do problema aberta durante toda a noite."
    proximo: c-parcial
:::

::: no
tipo: cena
id: c-parcial
texto: "Com betabloqueador e suporte a frequência cai para 118 bpm, mas a febre persiste e ela segue confusa durante a noite. O tratamento específico começa apenas pela manhã, com quase doze horas de tempestade hormonal a mais."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com a sequência correta, a frequência cai para 96 bpm em quatro horas e a temperatura normaliza na madrugada. A infecção urinária residual é tratada, o estado mental volta ao normal em vinte e quatro horas, e ela recebe alta no quinto dia com acompanhamento endocrinológico e a conversa sobre por que o remédio não pode ser interrompido quando se sente bem."
ensino: "A crise tireotóxica é diagnóstico clínico: hipertermia, taquiarritmia, agitação com confusão e sinais adrenérgicos, quase sempre com um gatilho. O pescoço fecha o raciocínio: bócio difuso, sinais oculares e o sopro contínuo sobre a glândula, que quase ninguém procura. E há uma ordem que precisa ser respeitada: droga antitireoidiana antes do iodo, nunca o contrário."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela se recupera, com uma noite de febre alta e confusão que poderia ter sido evitada, e internação de oito dias."
ensino: "O betabloqueador controla a manifestação, não a fonte. Na crise tireotóxica, o bloqueio da síntese hormonal faz parte do tratamento da mesma noite: adiar deixa a tempestade correndo enquanto se trata apenas o sintoma."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Após o iodo administrado antes do bloqueio da síntese, a febre sobe para 40,1 graus e a fibrilação atrial evolui com instabilidade, exigindo cardioversão e vasopressor. Ela precisa de terapia intensiva por seis dias."
ensino: "Iodo antes do bloqueio da síntese fornece substrato para a glândula produzir mais hormônio, e pode agravar a crise que se pretendia tratar. A sequência é droga antitireoidiana primeiro e iodo pelo menos uma hora depois, e essa ordem é uma das poucas em que o intervalo entre duas prescrições muda o desfecho."
:::
