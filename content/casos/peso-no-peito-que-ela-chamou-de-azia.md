---
id: peso-no-peito-que-ela-chamou-de-azia
titulo: O peso no peito que ela chamou de azia
contexto: "Pronto atendimento de bairro, domingo à noite. Uma mulher de 64 anos, diabética há quinze anos, senta e explica que 'comeu errado no almoço' e está com azia desde a tarde. Já tomou antiácido em casa e não melhorou. Ela não usa a palavra dor em nenhum momento."
tags: [cardiovascular, infarto, apresentacao atipica, emergencia]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca
  - aparelho-cardiovascular/exame-cardiaco/pulso-venoso-jugular-e-turgencia
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame cardíaco e de dor torácica aguda"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho cardiovascular"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "São 21h40. Ela está sentada na maca, um pouco curvada, e passa a mão aberta sobre o esterno enquanto fala. Diz que o desconforto começou por volta das 17h, 'como se o almoço tivesse entalado', e que anda cansada demais para subir a rampa da rua. A pele do rosto brilha de suor, mas o ar-condicionado está desligado."
dados:
  - "Desconforto epigástrico e retroesternal há cerca de 4 horas"
  - "FC 96 bpm, PA 148 x 88 mmHg, FR 22 irpm"
  - "Saturação 96% em ar ambiente"
  - "Diabetes há 15 anos, em uso irregular de metformina"
  - "Sudorese discreta em face e pescoço"
proximo: d-porta
:::

::: no
tipo: decisao
id: d-porta
pergunta: "A queixa que ela traz é azia, e ela já se automedicou sem melhora. Por onde você começa?"
opcoes:
  - texto: "Tratar como possível síndrome coronariana até prova em contrário: eletrocardiograma nos primeiros dez minutos e exame dirigido ao cardiovascular."
    avaliacao: otima
    feedback: "É a decisão que muda o desfecho. Na mulher e no diabético de longa data a apresentação sem dor típica é regra frequente, não exceção: a neuropatia autonômica embota a via da dor e sobra o que sobrou aqui, desconforto epigástrico, cansaço aos esforços e sudorese. A palavra que o paciente escolhe não classifica o risco; o contexto e o traçado classificam."
    proximo: c-exame
  - texto: "Prescrever antiácido e um procinético, observar por uma hora e reavaliar a queixa digestiva."
    avaliacao: erro
    feedback: "A prova terapêutica digestiva não exclui isquemia: muita dor coronariana melhora transitoriamente com qualquer coisa, inclusive com o repouso da observação. Sudorese sem calor externo, em quem tem quinze anos de diabetes e cansaço novo aos esforços, é sinal de alerta e não sintoma dispéptico."
    proximo: c-atraso
  - texto: "Colher exames gerais, incluindo enzimas, e aguardar o resultado antes de decidir a linha de cuidado."
    avaliacao: aceitavel
    feedback: "Os marcadores entram, mas eles chegam depois: nas primeiras horas podem ainda estar normais, e o tempo gasto esperando é tempo de músculo perdido. O eletrocardiograma custa dez minutos e o exame à beira do leito custa cinco; ambos precedem qualquer laboratório nessa suspeita."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Uma hora depois a enfermagem chama: ela vomitou, ficou mais pálida e agora o suor escorre pelo pescoço. O desconforto continua igual, e é justamente isso que assusta. O traçado é feito agora, com sessenta minutos a menos de miocárdio."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você examina com ela deitada a 45 graus. A pele está fria e úmida nas mãos e na fronte. O ictus não se desloca. Na ausculta, um som extra logo antes da primeira bulha, mais audível na ponta com a campânula, na expiração. Os campos pulmonares estão limpos até as bases. O pulso é regular e de amplitude reduzida."
dados:
  - "Sudorese fria, extremidades frias"
  - "Quarta bulha audível na ponta"
  - "Ausculta pulmonar sem estertores"
  - "Pulso regular, amplitude diminuída"
  - "Nova PA: 118 x 76 mmHg"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "A pressão que era 148 x 88 caiu para 118 x 76 e apareceu uma quarta bulha. O que isso acrescenta?"
opcoes:
  - texto: "Acrescenta gravidade: a queda da pressão em quem era hipertenso é sinal de bomba comprometida, e a quarta bulha traduz ventrículo rígido lutando para encher."
    avaliacao: otima
    feedback: "Pressão dentro da faixa normal não é pressão normal para quem vivia acima dela: a queda relativa em uma isquemia em curso fala de débito caindo. A quarta bulha nasce da contração atrial contra um ventrículo pouco complacente, e aparece cedo na isquemia aguda. Somada à sudorese fria, ela transforma um desconforto epigástrico em emergência."
    proximo: c-eletro
  - texto: "Acrescenta tranquilidade: a pressão normalizou e a quarta bulha é comum em idosos, sem valor aqui."
    avaliacao: erro
    feedback: "A quarta bulha é de fato frequente no coração envelhecido, mas o que importa é o conjunto e o movimento: uma pressão que cai durante a observação de uma suspeita isquêmica é piora, não melhora. Ler cada achado isolado, fora da linha do tempo, é o modo mais comum de perder um infarto."
    proximo: c-eletro
  - texto: "Acrescenta pouco: o que decide é a curva de marcadores, e é por ela que devemos esperar."
    avaliacao: aceitavel
    feedback: "A curva confirma, mas quem decide a pressa é o exame somado ao traçado. Enquanto a segunda dosagem não chega, o leito precisa estar monitorado e a reperfusão precisa estar sendo negociada. Esperar em silêncio é abrir mão do único tempo que ainda salva músculo."
    proximo: c-eletro
:::

::: no
tipo: cena
id: c-eletro
texto: "O eletrocardiograma mostra supradesnivelamento do segmento ST nas derivações da parede inferior. Você volta ao leito antes de prescrever. A jugular está túrgida com ela a 45 graus, o pulso venoso sobe até a mandíbula, e os pulmões seguem limpos. A pressão agora marca 96 x 60 mmHg."
dados:
  - "Supradesnivelamento de ST em parede inferior"
  - "Turgência jugular a 45 graus"
  - "Ausculta pulmonar limpa"
  - "PA 96 x 60 mmHg, FC 58 bpm"
proximo: d-nitrato
:::

::: no
tipo: decisao
id: d-nitrato
pergunta: "Ela mantém o desconforto. O nitrato sublingual está na bandeja. Você prescreve?"
opcoes:
  - texto: "Não. Hipotensão com jugular túrgida e pulmão limpo em infarto inferior aponta comprometimento do ventrículo direito: registrar derivações direitas, oferecer volume e acionar a reperfusão."
    avaliacao: otima
    feedback: "Essa tríade é uma das mais úteis da beira do leito: pressão baixa, pressão venosa alta e campos pulmonares limpos. O ventrículo direito isquêmico depende de pré-carga para ejetar, e o nitrato tira exatamente isso. O mesmo raciocínio vale para diuréticos e morfina em dose generosa. Reconhecer aqui vale mais que qualquer droga da bandeja."
    proximo: fim-otimo
  - texto: "Sim. Nitrato é rotina na dor isquêmica e alivia enquanto a reperfusão se organiza."
    avaliacao: erro
    feedback: "É a rotina que, neste subgrupo, derruba o paciente. Sem pré-carga o ventrículo direito isquêmico não ejeta, e a pressão que já estava em 96 desaba. A pergunta que evita o dano leva quinze segundos: como está a jugular e como está o pulmão?"
    proximo: fim-dano
  - texto: "Não dar nitrato, mas usar morfina para o desconforto e seguir para a reperfusão."
    avaliacao: aceitavel
    feedback: "Evitar o nitrato já protege o paciente, e a analgesia tem lugar. Mas a morfina também reduz o retorno venoso e pode repetir o problema em menor escala, e nenhuma delas trata a causa. Nessa fisiologia, o que devolve pressão é volume, e o que devolve músculo é abrir a artéria."
    proximo: c-morfina
:::

::: no
tipo: cena
id: c-morfina
texto: "Depois da morfina a pressão cai para 84 x 52 mmHg e ela fica sonolenta. Você suspende o restante da analgesia, inicia soro em bolus e aciona a hemodinâmica, agora com trinta minutos a mais no relógio."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "As derivações direitas confirmam o acometimento do ventrículo direito. Ela recebe volume, a pressão sobe para 108 x 68 mmHg e segue para a hemodinâmica com pouco mais de cinco horas de sintoma. A artéria é aberta, a função ventricular volta quase por inteiro, e na alta ela conta à filha que 'a azia era o coração'."
ensino: "Em diabético de longa data e em mulheres, o infarto costuma se apresentar sem a dor do compêndio: desconforto epigástrico, cansaço novo, sudorese sem calor. Uma vez feito o diagnóstico, o exame ainda decide a prescrição: hipotensão com jugular túrgida e pulmão limpo no infarto inferior aponta ventrículo direito, e ali o nitrato faz mal. O exame não termina quando o traçado chega."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A reperfusão acontece, mas com o paciente hipotenso e sonolento durante boa parte do trajeto. A artéria abre; a fração de ejeção fica pior do que teria ficado, e a internação se estende por uma semana."
ensino: "Reconhecer o que não fazer é metade da conduta, mas só metade. No infarto de ventrículo direito, além de evitar o que reduz pré-carga, é preciso repor volume e correr para a reperfusão. Analgesia generosa em quem já está com pressão limítrofe repete, em menor escala, o mesmo erro do nitrato."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Dois minutos depois do nitrato ela fica pálida, sem resposta verbal, com pressão de 62 x 40 mmHg. São necessários volume em bolus, vasopressor e uma parada de dez minutos no protocolo até a pressão voltar. A reperfusão sai com quase duas horas de atraso e ela sai da internação com insuficiência cardíaca instalada."
ensino: "A prescrição automática ignora a fisiologia do caso. No infarto inferior, procure sempre o ventrículo direito antes de qualquer droga que reduza pré-carga: pressão baixa, jugular túrgida e pulmão limpo formam o alerta. É um exame de quinze segundos que separa o alívio do colapso."
:::
