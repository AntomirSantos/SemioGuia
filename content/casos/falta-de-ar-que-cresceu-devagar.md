---
id: falta-de-ar-que-cresceu-devagar
titulo: A falta de ar que cresceu devagar
contexto: "Ambulatório de clínica geral. Uma mulher de 66 anos vem porque 'está sem fôlego'. Ela conta que há uns dois anos parou de subir as escadas do prédio, há um ano passou a evitar caminhadas, e agora se cansa arrumando a casa. Ela atribui tudo à idade e ao peso. Fuma há quarenta anos."
tags: [respiratorio, dispneia, dpoc, ambulatorial]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/inspecao-do-torax
  - aparelho-respiratorio/exame-do-torax/percussao-do-torax
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho respiratório e de dispneia"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame pulmonar e de doença obstrutiva"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia respiratória"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela fala frases inteiras sem esforço aparente na sala. Diz que tosse todas as manhãs, com catarro claro, 'desde sempre', e que teve três 'gripes fortes' no inverno passado, duas delas tratadas com antibiótico. Não sabe dizer se acorda à noite com falta de ar. Não tem edema de pernas."
dados:
  - "Dispneia aos esforços progressiva em 2 anos"
  - "Tosse produtiva matinal crônica"
  - "Três exacerbações respiratórias no último ano"
  - "Tabagismo de 40 anos-maço"
  - "Sem ortopneia, sem edema"
proximo: d-diferencial
:::

::: no
tipo: decisao
id: d-diferencial
pergunta: "Dispneia crônica aos esforços. Como você organiza o diagnóstico diferencial?"
opcoes:
  - texto: "Pelos quatro grandes grupos, procurando os achados que separam cada um: pulmonar, cardíaco, anemia e descondicionamento, com o exame físico dirigido a cada hipótese."
    avaliacao: otima
    feedback: "A queixa é comum e a lista de causas é curta o suficiente para ser percorrida no exame. Cada grupo tem achados próprios: o pulmonar deixa marca na inspeção, percussão e ausculta; o cardíaco aparece na jugular, na terceira bulha e no edema; a anemia nas mucosas; o descondicionamento é diagnóstico de exclusão. Percorrer os quatro evita fechar no primeiro que vier à cabeça."
    proximo: c-exame
  - texto: "Atribuir ao tabagismo e iniciar broncodilatador de prova, reavaliando em um mês."
    avaliacao: erro
    feedback: "O tabagismo torna a doença obstrutiva provável e não dispensa nem o exame nem a confirmação funcional. Tratar sem espirometria é o padrão que produz tanto paciente rotulado sem ter a doença quanto paciente com insuficiência cardíaca tratado como se fosse pulmão."
    proximo: c-atraso
  - texto: "Solicitar ecocardiograma e espirometria de imediato, deixando o exame físico para quando os resultados chegarem."
    avaliacao: aceitavel
    feedback: "Os dois exames provavelmente serão pedidos. O exame físico feito antes muda quais e com que prioridade, e às vezes responde sozinho: jugular alta com terceira bulha aponta o coração, tórax hiperinsuflado com expiração prolongada aponta o pulmão."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Com o broncodilatador ela melhora pouco e continua se cansando. Volta em três meses, tendo passado por mais uma exacerbação, e agora aceita fazer a espirometria que não foi pedida antes."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "À inspeção, o tórax é mais arredondado que o habitual e ela usa discretamente a musculatura do pescoço em repouso. A expiração é prolongada e audível. A percussão é hipersonora nos dois hemitórax e as bases se movem pouco entre inspiração e expiração profundas. À ausculta, o murmúrio é difusamente diminuído, com poucos sibilos no fim da expiração. A jugular é normal, não há terceira bulha, as conjuntivas estão coradas e não há edema."
dados:
  - "Tórax arredondado, uso discreto de musculatura acessória"
  - "Expiração prolongada, hipersonoridade difusa"
  - "Mobilidade diafragmática reduzida à percussão"
  - "Murmúrio diminuído, sibilos expiratórios esparsos"
  - "Sem sinais de congestão cardíaca ou anemia"
proximo: d-interpretacao
:::

::: no
tipo: decisao
id: d-interpretacao
pergunta: "O exame apontou para o pulmão. O que fazer a seguir?"
opcoes:
  - texto: "Solicitar espirometria com prova broncodilatadora para confirmar e graduar a obstrução, porque o diagnóstico exige confirmação funcional."
    avaliacao: otima
    feedback: "Os achados são sugestivos e não fecham o diagnóstico: hiperinsuflação, expiração prolongada e murmúrio diminuído orientam, e a confirmação é funcional. A espirometria também gradua a gravidade, o que muda o tratamento, e serve de referência para comparar depois. Diagnosticar doença obstrutiva crônica sem espirometria é errar em algum grau em uma parte grande dos casos."
    proximo: c-tratamento
  - texto: "Iniciar tratamento com broncodilatador de longa duração e considerar o diagnóstico feito pelo quadro clínico."
    avaliacao: erro
    feedback: "O tratamento vai começar, e o diagnóstico sem confirmação funcional cria dois problemas: quem não tem a doença é tratado por anos sem necessidade, e quem tem não é graduado corretamente, o que erra a escolha do esquema. A espirometria não é formalidade, é o exame que define a doença."
    proximo: fim-dano
  - texto: "Pedir tomografia de tórax, mais detalhada que a espirometria para avaliar o parênquima."
    avaliacao: aceitavel
    feedback: "A tomografia mostra enfisema e outras alterações estruturais e não mede função, que é o que define e gradua a doença obstrutiva. Ela tem indicações próprias, incluindo o rastreio em tabagistas pesados, e não substitui a espirometria."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "A espirometria confirma obstrução ao fluxo aéreo que não normaliza após o broncodilatador, de grau moderado. Você inicia o tratamento inalatório adequado. Ela pergunta se agora que vai usar a bombinha pode continuar fumando 'só uns poucos por dia'."
dados:
  - "Obstrução confirmada, grau moderado"
  - "Tratamento inalatório iniciado"
  - "Três exacerbações no último ano"
  - "Paciente cogita reduzir o cigarro em vez de parar"
proximo: d-cessacao
:::

::: no
tipo: decisao
id: d-cessacao
pergunta: "Como você responde e o que mais precisa entrar no plano?"
opcoes:
  - texto: "Explicar que a cessação é a única medida que muda a progressão da doença, oferecer apoio concreto para parar, e completar o plano com vacinação, técnica inalatória verificada e reabilitação pulmonar."
    avaliacao: otima
    feedback: "Entre tudo o que existe para essa doença, parar de fumar é o que altera a curva de perda de função ao longo dos anos. Reduzir não tem o mesmo efeito. E o plano completo tem partes que costumam ser esquecidas: vacinar, verificar na frente do paciente se ele usa o dispositivo corretamente, e encaminhar à reabilitação, que melhora sintoma e capacidade de esforço."
    proximo: fim-otimo
  - texto: "Aceitar a redução como meta inicial, já que é mais realista, e revisar o assunto no retorno."
    avaliacao: aceitavel
    feedback: "A redução pode ser um degrau para quem não se sente pronto, e é importante que o paciente saiba que ela não confere o mesmo benefício. Deixar isso claro e manter a cessação como objetivo, com apoio oferecido a cada consulta, é o que evita transformar o degrau em ponto final."
    proximo: c-reducao
  - texto: "Focar no tratamento inalatório e evitar insistir no cigarro, para não prejudicar o vínculo."
    avaliacao: erro
    feedback: "A medicação alivia sintoma e não muda a velocidade da perda de função pulmonar. Abrir mão da conversa sobre cessação para preservar o vínculo troca o benefício maior pelo menor, e a oferta respeitosa de ajuda não costuma prejudicar vínculo nenhum."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-reducao
texto: "Ela reduz para meio maço e mantém assim por um ano, com melhora modesta dos sintomas. As exacerbações continuam. No retorno seguinte, aceita o apoio para parar de vez."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela para de fumar com apoio medicamentoso e acompanhamento, é vacinada, aprende a usar o dispositivo corretamente na frente da equipe e entra na reabilitação pulmonar. Um ano depois, sobe as escadas do prédio de novo e não teve nenhuma exacerbação."
ensino: "Dispneia crônica se organiza em quatro grupos, e o exame físico separa a maioria deles. Tórax hiperinsuflado com expiração prolongada e murmúrio diminuído sugere obstrução, e a confirmação é funcional: sem espirometria, não há diagnóstico nem graduação. E no plano de tratamento, a única medida que muda a progressão da doença é parar de fumar."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela melhora com o tratamento e mantém exacerbações no primeiro ano, até parar de fumar de vez. A função pulmonar perdida nesse intervalo não volta."
ensino: "Reduzir o cigarro alivia pouco e não altera a curva de perda de função. A redução pode ser um degrau, desde que o paciente saiba que não é equivalente e que a oferta de apoio para parar volte a cada consulta."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem confirmação funcional e sem abordar o tabagismo, ela é tratada por três anos com um esquema inadequado para o grau real da doença. Chega à consulta seguinte com obstrução grave, oxigenoterapia domiciliar e duas internações no último ano."
ensino: "Tratar sem espirometria erra o grau e, portanto, o esquema. E a medicação inalatória controla sintoma sem alterar a velocidade da perda de função: sem cessação do tabagismo, a doença segue avançando enquanto o paciente se sente tratado."
:::
