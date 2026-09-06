---
id: bebe-que-parou-de-mamar
titulo: O bebê que parou de mamar
contexto: "Unidade de pronto atendimento, oito da manhã. Uma mãe chega com o filho de sete meses no colo. Ele tem diarreia e vômitos há dois dias e, desde a madrugada, recusa o peito e a mamadeira. Ela conta que trocou uma fralda molhada ontem à tarde e nenhuma desde então."
tags: [crianca, desidratacao, choque, hidratacao]
topicosDeApoio:
  - semiologia-da-crianca/exame-da-crianca/crescimento-sinais-vitais-e-hidratacao
  - semiologia-da-crianca/exame-da-crianca/abordagem-e-anamnese-da-crianca
  - exame-fisico-geral/avaliacao-geral/antropometria-e-hidratacao
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de avaliação de hipovolemia"
  - "Porto, Semiologia Médica, 8ª ed., seção de semiologia pediátrica e hidratação"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia da criança"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "O bebê está no colo, quieto demais para a idade. Não sorri, não acompanha o seu rosto com os olhos por muito tempo e chora sem lágrimas quando você o descobre. Os olhos parecem encovados. A mãe diz que ele 'está dormindo bastante hoje', e o alívio na voz dela mostra que ela interpretou isso como melhora."
dados:
  - "Diarreia e vômitos há 2 dias"
  - "Sem diurese há cerca de 16 horas"
  - "Letargia, choro sem lágrimas, olhos encovados"
  - "FC 178 bpm, FR 48 irpm"
  - "Temperatura 37,4 graus"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "Como você classifica o estado de hidratação e a gravidade?"
opcoes:
  - texto: "Desidratação grave com sinais de choque: letargia, ausência de lágrimas, olhos encovados, oligúria prolongada e taquicardia acentuada exigem avaliação imediata da perfusão."
    avaliacao: otima
    feedback: "Na criança, os sinais que mais informam sobre hidratação são o estado geral, a presença de lágrimas, a fontanela quando ainda aberta, a elasticidade da pele, a umidade das mucosas e a diurese. Quietude não é melhora nesta idade: um bebê que deveria estar irritado e está apático já cruzou a linha da gravidade. Falta apenas medir a perfusão para completar o quadro."
    proximo: c-exame
  - texto: "Desidratação leve a moderada: ele está calmo, não tem febre alta e a mãe relata que a diarreia diminuiu."
    avaliacao: erro
    feedback: "A calma aqui é o achado mais preocupante de todos. A criança desidratada passa por uma fase de irritabilidade e sede antes de ficar apática, e a apatia marca a piora. Diarreia que diminui em quem parou de urinar pode significar apenas que não há mais o que perder."
    proximo: c-atraso
  - texto: "Impossível classificar sem o peso atual comparado ao peso anterior, que é o padrão de referência."
    avaliacao: aceitavel
    feedback: "A variação de peso é de fato o melhor parâmetro quando existe um peso recente confiável, e vale procurar na caderneta. Mas ele raramente está disponível na urgência, e a classificação clínica não pode esperar por ele. Pese, registre e classifique pelo exame."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Duas horas na sala de espera com soro de reidratação oral que ele não aceita. Quando é chamado, está mais pálido, com respiração rápida e superficial, e não reage ao exame. O tempo perdido é o intervalo entre choque compensado e choque descompensado."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você o despe por completo sobre a maca. A fontanela anterior está deprimida. A prega cutânea no abdome desfaz-se lentamente, em mais de dois segundos. As mucosas estão secas e a saliva, filante. As extremidades estão frias até os joelhos e cotovelos, e o enchimento capilar leva quatro segundos. O pulso radial é fino e difícil de sentir; o femoral é palpável. A pressão arterial medida com manguito adequado é 78 x 46 mmHg."
dados:
  - "Fontanela deprimida, prega cutânea lenta"
  - "Mucosas secas, sem lágrimas"
  - "Extremidades frias, enchimento capilar de 4 segundos"
  - "Pulso radial fino, femoral presente"
  - "PA 78 x 46 mmHg, FC 182 bpm"
proximo: d-perfusao
:::

::: no
tipo: decisao
id: d-perfusao
pergunta: "A pressão arterial ainda está próxima do limite inferior para a idade. Isso tranquiliza?"
opcoes:
  - texto: "Não: na criança a pressão é o último parâmetro a cair, e enchimento capilar prolongado com extremidades frias e pulso fino já define choque."
    avaliacao: otima
    feedback: "A criança compensa a perda de volume com vasoconstrição e taquicardia durante muito tempo, e sustenta a pressão até quase o fim. Por isso os sinais de perfusão valem mais que o número: enchimento capilar, temperatura das extremidades, amplitude dos pulsos e nível de consciência. Quando a pressão cai na criança, a parada está próxima."
    proximo: c-tratamento
  - texto: "Sim: com pressão preservada, a reidratação oral supervisionada ainda pode ser tentada por mais uma hora."
    avaliacao: erro
    feedback: "A via oral é excelente na desidratação leve e moderada e está contraindicada aqui, por dois motivos: ele está letárgico, com risco de aspiração, e o choque exige correção rápida de volume. Insistir por mais uma hora é apostar contra a fisiologia que já se manifestou nas extremidades frias."
    proximo: fim-dano
  - texto: "Parcialmente: obter acesso venoso e, se não conseguir em poucas tentativas, encaminhar para um serviço com mais recursos."
    avaliacao: aceitavel
    feedback: "A dificuldade de acesso é real na criança em choque, e é justamente por isso que existe a via intraóssea, disponível e rápida. Transferir sem volume é transportar o choque. Se o acesso venoso falhar, o próximo passo é a agulha intraóssea, não a ambulância."
    proximo: c-acesso
:::

::: no
tipo: cena
id: c-acesso
texto: "Duas tentativas de acesso periférico falham. A equipe hesita por alguns minutos até alguém trazer o material intraósseo. O volume começa a correr quinze minutos depois do que deveria, com a criança ainda mais fria."
proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Com o acesso garantido, você inicia a expansão volêmica com cristaloide isotônico e reavalia. Depois do primeiro volume, a frequência cardíaca cai para 168 bpm, o enchimento capilar melhora para três segundos e ele abre os olhos, ainda sem chorar. A glicemia capilar é de 42 mg/dL."
dados:
  - "Frequência cardíaca 168 bpm após primeira expansão"
  - "Enchimento capilar 3 segundos"
  - "Glicemia capilar 42 mg/dL"
  - "Ainda letárgico"
proximo: d-glicemia
:::

::: no
tipo: decisao
id: d-glicemia
pergunta: "A glicemia é de 42 mg/dL. O que isso muda?"
opcoes:
  - texto: "Muda a conduta imediata: corrigir a hipoglicemia agora com glicose endovenosa, porque ela contribui para a letargia e é rapidamente reversível."
    avaliacao: otima
    feedback: "Lactente com jejum prolongado e vômitos esgota rápido a reserva de glicogênio, e a hipoglicemia é frequente e facilmente esquecida. Ela explica parte do rebaixamento e corrige em minutos. Medir glicemia capilar em toda criança letárgica é regra, e não refinamento."
    proximo: fim-otimo
  - texto: "Muda pouco: a letargia é da desidratação e vai melhorar com a expansão volêmica."
    avaliacao: erro
    feedback: "A expansão melhora a perfusão, mas não fabrica glicose. Hipoglicemia prolongada em lactente pode deixar sequela neurológica, e a correção é simples e rápida. Atribuir todo o rebaixamento a uma única causa quando existe outra, mensurada e tratável, é perder o que era fácil de resolver."
    proximo: fim-dano
  - texto: "Muda a monitorização: repetir a glicemia após a segunda expansão e corrigir se permanecer baixa."
    avaliacao: aceitavel
    feedback: "Repetir é bom, adiar não. Com valor nesse patamar e criança letárgica, a correção é imediata e a repetição vem depois, para confirmar que o valor se manteve."
    proximo: c-atraso-glicemia
:::

::: no
tipo: cena
id: c-atraso-glicemia
texto: "A segunda medida, quarenta minutos depois, mostra 38 mg/dL, e a criança segue apática. A glicose é finalmente administrada e ele melhora em minutos, com um intervalo de hipoglicemia que poderia ter sido evitado."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com a expansão completa e a glicemia corrigida, ele volta a chorar com lágrimas, urina duas horas depois e aceita o peito à tarde. Recebe alta no dia seguinte, com orientação sobre soro de reidratação oral em casa e sobre os sinais que exigem retorno imediato, escritos em uma folha que a mãe leva."
ensino: "Na criança, a pressão arterial é o último parâmetro a cair: quem gradua o choque são o estado de consciência, o enchimento capilar, a temperatura das extremidades e a amplitude dos pulsos. Quietude em lactente doente é sinal de alarme, não de melhora. E toda criança letárgica merece uma glicemia capilar: a hipoglicemia é comum, corrige em minutos e explica parte do quadro."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera bem, depois de um período adicional de hipoglicemia e de um atraso no acesso vascular. A internação dura três dias, sem sequela aparente."
ensino: "Quando o acesso periférico falha na criança em choque, a via intraóssea é o próximo passo, e não a transferência. E hipoglicemia documentada em criança letárgica se corrige na hora: repetir a medida antes de tratar apenas prolonga o dano potencial."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem correção adequada, ele evolui com rebaixamento progressivo, uma convulsão e parada respiratória, exigindo reanimação e ventilação mecânica. Sobrevive após seis dias em terapia intensiva, com necessidade de acompanhamento neurológico prolongado."
ensino: "Duas armadilhas aparecem juntas neste caso: confundir apatia com melhora e confiar na pressão arterial da criança. A compensação pediátrica esconde o choque até quase o fim, e a hipoglicemia associada acrescenta um dano neurológico que era simples de evitar."
:::
