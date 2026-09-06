---
id: olho-vermelho-que-doia
titulo: O olho vermelho que doía de verdade
contexto: "Unidade de pronto atendimento, nove da noite. Uma mulher de 62 anos chega com o olho direito vermelho e doendo desde o fim da tarde. Diz que a dor irradia para a testa, que enjoou e vomitou uma vez, e que está vendo halos coloridos ao redor das lâmpadas. Ela cobre o olho com a mão porque a luz incomoda."
tags: [cabeca e pescoco, olho vermelho, glaucoma agudo, emergencia]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/olhos
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/cranio-e-face
  - sistema-nervoso/exame-neurologico/pares-cranianos-i-a-vi
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame dos olhos"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame ocular e pupilas"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia de cabeça e pescoço"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A ficha da triagem diz 'conjuntivite'. Ela está sentada com a cabeça baixa, tentando evitar a luz do teto, e conta que a dor é forte, contínua, e que 'está enxergando embaçado desse olho, como se tivesse um vidro fosco'. Não houve trauma, não há secreção. Ela usa colírio de lágrima artificial e tomou um remédio para gripe hoje à tarde."
dados:
  - "Olho direito vermelho e doloroso há 5 horas"
  - "Visão embaçada, halos ao redor das luzes"
  - "Náusea e um episódio de vômito"
  - "Sem secreção, sem trauma, sem coceira"
  - "Uso de descongestionante sistêmico hoje"
proximo: d-triagem
:::

::: no
tipo: decisao
id: d-triagem
pergunta: "A triagem escreveu conjuntivite. O que na história já contradiz esse rótulo?"
opcoes:
  - texto: "Dor intensa, queda de visão, halos e vômito: nenhum deles pertence a uma conjuntivite, e todos apontam para uma causa que ameaça a visão."
    avaliacao: otima
    feedback: "Olho vermelho é sintoma, não diagnóstico, e a separação entre o banal e o grave se faz com três perguntas: dói de verdade, a visão caiu, existe fotofobia. Conjuntivite coça, lacrimeja, produz secreção e não derruba a visão. Dor forte com halos coloridos e vômito é um conjunto que exige avaliação urgente."
    proximo: c-exame
  - texto: "Nada de essencial: conjuntivites podem ser dolorosas e o embaçamento pode vir da secreção sobre a córnea."
    avaliacao: erro
    feedback: "Secreção realmente embaça e melhora ao piscar, mas aqui não há secreção nenhuma. E náusea com vômito não pertence a uma inflamação de conjuntiva. Aceitar o rótulo da triagem sem confrontá-lo com a história é o modo mais comum de perder as horas que decidem a visão deste olho."
    proximo: c-atraso
  - texto: "Talvez seja uveíte: pedir avaliação oftalmológica de rotina para a manhã seguinte."
    avaliacao: aceitavel
    feedback: "Uveíte entra no diagnóstico diferencial do olho vermelho doloroso com fotofobia e é uma boa lembrança. O que não cabe é a rotina de manhã: com queda de visão e vômito, a avaliação precisa ser hoje, qualquer que seja a causa entre as graves."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela recebe colírio antibiótico e orientação de compressas. Volta na manhã seguinte, com a dor pior e enxergando apenas vultos com o olho direito. Nesse intervalo, a pressão dentro do olho passou a noite inteira alta."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você examina com lanterna, em ambiente pouco iluminado. A vermelhidão é mais intensa em volta da íris e diminui na direção das pálpebras. A córnea perdeu o brilho e parece embaçada, como vidro fosco. A pupila direita está no meio do caminho entre contraída e dilatada, e mal reage à luz; a esquerda reage normalmente. Ao tocar delicadamente as pálpebras fechadas com as pontas dos dedos, o globo direito parece bem mais duro que o esquerdo. A acuidade do olho direito está muito reduzida."
dados:
  - "Hiperemia mais intensa ao redor da íris"
  - "Córnea sem brilho, aspecto de vidro fosco"
  - "Pupila direita em posição média, pouco reativa"
  - "Globo ocular direito endurecido à palpação bidigital"
  - "Acuidade visual muito reduzida à direita"
proximo: d-diagnostico
:::

::: no
tipo: decisao
id: d-diagnostico
pergunta: "Reunindo os achados, qual é o diagnóstico mais provável?"
opcoes:
  - texto: "Glaucoma agudo de ângulo fechado: hiperemia ao redor da íris, córnea embaçada, pupila média e pouco reativa e globo endurecido formam um conjunto característico."
    avaliacao: otima
    feedback: "Cada achado tem explicação direta. A pressão intraocular muito alta empurra líquido para dentro da córnea, que perde a transparência e produz os halos. A mesma pressão paralisa o esfíncter da íris, deixando a pupila em posição intermediária e preguiçosa. E o endurecimento do globo se percebe com as pontas dos dedos, comparando um olho com o outro."
    proximo: c-conduta
  - texto: "Conjuntivite bacteriana grave, dada a intensidade da hiperemia."
    avaliacao: erro
    feedback: "A intensidade não é o critério; a distribuição e os achados associados são. Na conjuntivite a vermelhidão predomina na periferia e diminui perto da íris, a córnea permanece brilhante, a pupila reage normalmente e a visão não cai. Aqui tudo isso está invertido."
    proximo: c-conduta
  - texto: "Ceratite por corpo estranho, que também produz dor intensa e fotofobia."
    avaliacao: aceitavel
    feedback: "A lembrança é boa, e a ceratite realmente dói muito e produz fotofobia. Mas ela costuma vir com sensação de corpo estranho e história compatível, não com náusea e vômito, e não endurece o globo. A palpação comparativa é o achado que separa as duas."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "São 21h40 e o oftalmologista de plantão está em outro hospital, com previsão de chegada em uma hora e meia. Você tem acesso a colírios e a medicações sistêmicas na unidade. Ela mantém a dor intensa e continua vomitando."
dados:
  - "Oftalmologista disponível em cerca de 90 minutos"
  - "Dor mantida, vômitos persistentes"
  - "Colírios e medicação sistêmica disponíveis na unidade"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "O que você faz enquanto o especialista não chega?"
opcoes:
  - texto: "Iniciar o tratamento para redução da pressão intraocular conforme protocolo, controlar dor e náusea, e manter contato direto com o oftalmologista para transferência imediata."
    avaliacao: otima
    feedback: "O nervo óptico sofre enquanto a pressão permanece alta, e cada hora conta. A conduta inicial não exige equipamento sofisticado: reduzir a produção e favorecer a saída do humor aquoso, tratar a dor e o vômito, e organizar a chegada ao especialista. Esperar de braços cruzados é a única opção que não protege nada."
    proximo: fim-otimo
  - texto: "Instilar colírio midriático para dilatar a pupila e facilitar o exame do fundo de olho."
    avaliacao: erro
    feedback: "É o erro mais grave possível aqui. Dilatar a pupila fecha ainda mais o ângulo por onde o líquido deveria escoar e faz a pressão subir. Em qualquer olho vermelho doloroso com pupila em posição média e globo endurecido, midriático está contraindicado até que o glaucoma agudo seja afastado."
    proximo: fim-dano
  - texto: "Apenas analgesia e antiemético, deixando o tratamento específico para o oftalmologista."
    avaliacao: aceitavel
    feedback: "Tratar dor e vômito é necessário e humano, e insuficiente. O que ameaça a visão é a pressão, e o tratamento inicial para reduzi-la pode e deve ser iniciado por qualquer médico enquanto o especialista se desloca."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "A dor melhora com a analgesia, mas a pressão permanece alta durante as duas horas de espera. Quando o oftalmologista chega, a visão do olho direito piorou em relação à chegada."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com o tratamento iniciado na unidade, a dor cede e o vômito para. O oftalmologista encontra a pressão já em queda, completa o tratamento e realiza o procedimento a laser na madrugada. A visão do olho direito retorna quase ao normal em uma semana, e o olho esquerdo recebe tratamento preventivo no mesmo mês."
ensino: "Olho vermelho é sintoma e não diagnóstico. Três perguntas separam o banal do grave: dor verdadeira, queda de visão e fotofobia. No glaucoma agudo, a hiperemia é maior ao redor da íris, a córnea perde o brilho, a pupila fica em posição média e pouco reativa e o globo endurece à palpação comparativa. E existe uma contraindicação absoluta a memorizar: nada de colírio que dilate a pupila."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O tratamento definitivo acontece com duas horas de atraso. A pressão normaliza, mas ela fica com uma redução permanente do campo visual periférico do olho direito."
ensino: "O tratamento inicial da hipertensão ocular aguda não é privativo do oftalmologista. Enquanto o especialista se desloca, reduzir a pressão é o que protege o nervo óptico, e analgesia isolada apenas torna a espera mais confortável."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Poucos minutos após o colírio dilatador, a dor se intensifica e ela passa a não distinguir mais que vultos. A pressão intraocular sobe ainda mais e permanece assim por horas. Apesar do tratamento posterior, o olho direito fica com perda visual definitiva e importante."
ensino: "Colírio midriático em olho vermelho doloroso com globo endurecido fecha o ângulo que já estava fechado e piora a doença que causou o quadro. Antes de dilatar qualquer pupila em olho vermelho, é obrigatório examinar a reatividade pupilar e comparar a consistência dos dois globos."
:::
