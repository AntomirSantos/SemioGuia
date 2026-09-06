---
id: noite-sentado-na-cadeira
titulo: A terceira noite sentado na cadeira
contexto: "Visita domiciliar de rotina que vira urgência. Um homem de 72 anos, com insuficiência cardíaca conhecida, conta que parou o diurético faz duas semanas 'porque dava muito xixi e ele não conseguia dormir'. Há três noites ele dorme sentado na poltrona da sala, e nesta madrugada não conseguiu nem isso."
tags: [cardiovascular, insuficiencia cardiaca, congestao, jugular]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/pulso-venoso-jugular-e-turgencia
  - aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de pressão venosa e insuficiência cardíaca"
  - "Porto, Semiologia Médica, 8ª ed., seção de insuficiência cardíaca e exame do precórdio"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está sentado na beira da cama, com as mãos apoiadas nos joelhos e o tronco inclinado para a frente. Fala em frases curtas, quatro ou cinco palavras por vez. A esposa diz que 'o peito chia', e mostra a bombinha de um vizinho que ela deu de madrugada, sem melhora."
dados:
  - "FR 30 irpm, saturação 88% em ar ambiente"
  - "FC 108 bpm, PA 156 x 92 mmHg"
  - "Ortopneia há 3 noites, piora nas últimas horas"
  - "Diurético suspenso há 2 semanas por conta própria"
  - "Sibilos audíveis à distância"
proximo: d-chiado
:::

::: no
tipo: decisao
id: d-chiado
pergunta: "O peito chia e a família já tentou broncodilatador. Como você conduz?"
opcoes:
  - texto: "Examinar antes de rotular o chiado: procurar pressão venosa jugular, terceira bulha e edema, porque asma cardíaca sibila igual e se trata pelo lado oposto."
    avaliacao: otima
    feedback: "Sibilo é um som, não um diagnóstico: ele aparece sempre que a via aérea estreita, e o edema da parede brônquica na congestão faz exatamente isso. O que separa a asma cardíaca da asma brônquica não está no estetoscópio pousado no tórax, está no pescoço, na ponta do coração e nos tornozelos. Trocar essa ordem custa horas."
    proximo: c-exame
  - texto: "Tratar como crise de broncoespasmo: broncodilatador em série e corticoide, reavaliando em uma hora."
    avaliacao: erro
    feedback: "É o erro clássico do sibilo. Beta agonista em dose alta acelera um coração que já está taquicárdico e sobrecarregado, e o corticoide retém sódio e água em quem já está congesto. A hora de reavaliação é comprada com o que resta de reserva do paciente."
    proximo: c-atraso
  - texto: "Solicitar a radiografia de tórax antes de qualquer conduta, para saber se é pulmão ou coração."
    avaliacao: aceitavel
    feedback: "A imagem ajuda, e a espera custa. Neste paciente o exame do pescoço responde a mesma pergunta em trinta segundos e ainda gradua a congestão. Peça a radiografia, mas não deixe que ela ocupe o lugar do exame que pode ser feito agora."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Depois de duas nebulizações, a frequência cardíaca sobe para 126 bpm, ele fica mais agitado e a saturação cai para 84%. A esposa pergunta se é normal piorar assim. Você recomeça, agora pelo exame."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você o acomoda a 45 graus e ilumina o pescoço de lado. A coluna de sangue na jugular interna direita pulsa alto, perto do ângulo da mandíbula, com duas ondulações por batimento. A compressão firme e sustentada do quadrante superior direito do abdome eleva ainda mais essa coluna, e ela não retorna enquanto você comprime. Na ponta, com a campânula e ele em decúbito lateral esquerdo, há um som grave logo depois da segunda bulha. Estertores finos sobem até a metade dos campos, e os tornozelos guardam a marca do dedo."
dados:
  - "Pressão venosa jugular claramente elevada a 45 graus"
  - "Refluxo hepatojugular sustentado positivo"
  - "Terceira bulha na ponta"
  - "Estertores finos até a metade dos campos"
  - "Edema depressível em ambos os tornozelos"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Reunindo o pescoço, a ponta e os tornozelos, o que o exame já decidiu?"
opcoes:
  - texto: "Decidiu que o sibilo é congestão: pressão venosa alta, refluxo hepatojugular positivo e terceira bulha formam um conjunto de congestão, e o tratamento é oposto ao da crise asmática."
    avaliacao: otima
    feedback: "Essa combinação é das mais confiáveis da beira do leito. A terceira bulha é o enchimento rápido batendo em um ventrículo que já está cheio, e a coluna jugular alta que sobe mais com a compressão abdominal mostra um coração direito que não aceita mais volume. Com isso, o chiado passa a ser sintoma de água, não de brônquio."
    proximo: c-conduta
  - texto: "Decidiu pouco: idoso tem jugular difícil de avaliar e estertor de base é comum, então é mais seguro tratar as duas hipóteses ao mesmo tempo."
    avaliacao: erro
    feedback: "Tratar as duas hipóteses parece prudente e não é: as condutas se anulam. Beta agonista em dose alta e corticoide pioram exatamente o que o diurético tenta corrigir. E a jugular deste paciente não é duvidosa: ela pulsa alta, com refluxo sustentado, ao lado de terceira bulha e edema."
    proximo: c-conduta
  - texto: "Decidiu a congestão, mas ainda é preciso o peptídeo natriurético para confirmar antes de tratar."
    avaliacao: aceitavel
    feedback: "O marcador ajuda em casos duvidosos, e este não é duvidoso. Com hipoxemia e esforço respiratório, o tratamento começa enquanto o exame de sangue caminha. Confirmação laboratorial não é pré-requisito para tratar congestão evidente."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "A ambulância chega em dez minutos. Ele mantém saturação de 88%, pressão de 152 x 90 mmHg e continua falando em frases curtas. O material disponível inclui oxigênio, máscara de ventilação não invasiva, diurético de alça e nitrato."
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Com pressão de 152 x 90 mmHg e saturação de 88%, qual é a sua conduta imediata?"
opcoes:
  - texto: "Manter o paciente sentado com as pernas pendentes, ofertar oxigênio e iniciar ventilação não invasiva, com diurético de alça endovenoso e vasodilatador, já que a pressão permite."
    avaliacao: otima
    feedback: "A posição é tratamento e é gratuita: sentado, com as pernas para baixo, parte do volume fica na periferia e o pulmão respira melhor. A ventilação com pressão positiva reduz o retorno venoso e melhora a troca em minutos. Com pressão preservada, o vasodilatador tira carga do ventrículo mais rápido que o diurético, que trata o volume acumulado."
    proximo: fim-otimo
  - texto: "Deitar o paciente para melhorar a oxigenação, correr soro fisiológico e transportar."
    avaliacao: erro
    feedback: "Deitar quem tem ortopneia devolve ao tórax o sangue que a gravidade estava segurando, e o volume adicional entra em um sistema que já transborda. Nesse cenário a hipoxemia piora em poucos minutos. A posição sentada não é conforto, é conduta."
    proximo: fim-dano
  - texto: "Ofertar oxigênio por cateter e dar apenas uma dose baixa de diurético, deixando o resto para o hospital."
    avaliacao: aceitavel
    feedback: "É seguro e insuficiente. Com saturação de 88% e esforço respiratório, o cateter nasal não dá conta, e a dose tímida em quem usava diurético cronicamente costuma não produzir resposta. O paciente chega vivo, porém mais cansado do que precisaria."
    proximo: c-transporte
:::

::: no
tipo: cena
id: c-transporte
texto: "Durante o trajeto ele continua com saturação em torno de 87% e chega ao hospital exausto, precisando de ventilação não invasiva na porta e de duas horas na sala vermelha antes de estabilizar."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Em vinte minutos a saturação sobe para 95% e ele volta a falar frases inteiras. Chega ao hospital acordado, com diurese já iniciada. Na alta, a equipe reorganiza o horário do diurético para a manhã, e o motivo real da suspensão, as idas noturnas ao banheiro, é finalmente resolvido."
ensino: "Nem todo sibilo é brônquio: a congestão estreita a via aérea e imita a crise asmática. O que separa as duas está no pescoço, na ponta e nos tornozelos, e não custa nada. E vale procurar sempre o motivo da descompensação, porque aqui ele não era a doença, era o horário do comprimido."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele estabiliza no hospital, sem intubação, mas passa duas horas em esforço respiratório que poderiam ter sido evitadas."
ensino: "No edema agudo com pressão preservada, medidas simples e imediatas valem mais que o transporte rápido: sentar, pressão positiva e vasodilatador. Dose tímida em quem já usava diurético cronicamente costuma não produzir resposta."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Deitado e com volume infundido, ele fica agitado, a saturação cai para 78% e ele precisa de intubação ainda dentro da ambulância. A internação vai para a terapia intensiva e dura doze dias."
ensino: "Ortopneia é informação sobre fisiologia: quem só respira sentado está dizendo que não aceita mais volume no tórax. Deitar e hidratar nesse contexto acelera o colapso. Quando a jugular está alta e há terceira bulha, o caminho é tirar carga, nunca acrescentar."
:::
