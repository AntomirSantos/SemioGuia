---
id: maos-que-amanhecem-duras
titulo: As mãos que amanhecem duras
contexto: "Ambulatório de clínica geral. Uma mulher de 46 anos vem por dor nas mãos há três meses. Diz que de manhã leva um tempo até conseguir abrir o vidro de café, e que melhora depois que 'se mexe um pouco'. Já usou anti-inflamatório por conta própria, com alívio parcial. Está preocupada porque a mãe teve artrite."
tags: [osteoarticular, poliartralgia, padrao inflamatorio, maos]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/principios-do-exame-osteoarticular
  - sistema-osteoarticular/exame-osteoarticular/punho-e-mao
  - sistema-osteoarticular/exame-osteoarticular/tornozelo-pe-e-padroes-articulares
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame musculoesquelético"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho locomotor e doenças reumáticas"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia osteoarticular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela mostra as mãos: os dedos parecem discretamente inchados nas articulações do meio e nas da base. Diz que o incômodo é nas duas mãos, mais ou menos igual, e que os punhos também doem. Nega dor nos joelhos e nos quadris. Acorda cansada e sente que 'perdeu a disposição' nos últimos meses."
dados:
  - "Dor em mãos e punhos há 3 meses, bilateral e simétrica"
  - "Rigidez matinal prolongada, com melhora ao movimento"
  - "Sensação de edema nas articulações dos dedos"
  - "Fadiga associada"
  - "História familiar de artrite"
proximo: d-padrao
:::

::: no
tipo: decisao
id: d-padrao
pergunta: "O que na história já separa dor inflamatória de dor mecânica?"
opcoes:
  - texto: "A rigidez matinal prolongada que melhora com o movimento, o caráter simétrico e a fadiga associada: o padrão inflamatório piora com o repouso e melhora com o uso, ao contrário do mecânico."
    avaliacao: otima
    feedback: "Essa é a divisão que organiza toda a reumatologia clínica, e ela é de história, não de exame de sangue. A dor inflamatória tem rigidez matinal longa, melhora ao longo do dia com o movimento, acorda o paciente de madrugada e vem com sintomas gerais. A mecânica faz o oposto: piora com o uso, alivia com o repouso e a rigidez, quando existe, dura poucos minutos."
    proximo: c-exame
  - texto: "A idade e a história familiar, que tornam a artrose de mãos a hipótese mais provável."
    avaliacao: erro
    feedback: "Artrose de mãos existe nessa faixa etária e produz o padrão oposto: piora ao usar, rigidez curta, sem fadiga. Além disso, ela acomete tipicamente outras articulações dos dedos, e não as da base. Ancorar na hipótese mais comum sem checar o padrão faz perder a janela de tratamento precoce da doença inflamatória."
    proximo: c-atraso
  - texto: "Nada de decisivo: só exames laboratoriais com marcadores de atividade e autoanticorpos podem separar."
    avaliacao: aceitavel
    feedback: "Os exames ajudam e não substituem o padrão clínico. Marcadores podem estar normais em doença inflamatória inicial e alterados em pessoas saudáveis. Quem decide se vale a pena investigar, e com que urgência, é a história somada ao exame das articulações."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela é orientada a usar analgésico e retorna em quatro meses, agora com deformidade inicial em duas articulações e dor também nos pés. A janela de tratamento precoce se estreitou."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Ao exame das mãos, há edema com consistência elástica nas articulações da base dos dedos e nas do meio, em ambas as mãos, e a compressão transversal dessas articulações provoca dor. As articulações da ponta dos dedos estão poupadas. Os punhos estão dolorosos e com mobilidade reduzida. Não há nódulos ósseos duros nas pontas dos dedos. Nos pés, a compressão transversal das articulações da base dos dedos também dói. A força de preensão está reduzida."
dados:
  - "Sinovite em articulações metacarpofalângicas e interfalângicas proximais"
  - "Articulações interfalângicas distais poupadas"
  - "Compressão transversal dolorosa em mãos e pés"
  - "Punhos com mobilidade reduzida"
  - "Ausência de nódulos ósseos distais"
proximo: d-topografia
:::

::: no
tipo: decisao
id: d-topografia
pergunta: "As articulações da ponta dos dedos estão poupadas. Por que isso importa?"
opcoes:
  - texto: "Porque a distribuição separa as doenças: a poliartrite inflamatória simétrica poupa as articulações distais, enquanto a artrose e a artrite associada à psoríase costumam acometê-las."
    avaliacao: otima
    feedback: "A topografia é quase um diagnóstico. Acometimento simétrico das articulações da base e do meio dos dedos, com punhos e pés, e poupando as pontas, desenha o padrão da poliartrite inflamatória. Já os nódulos duros nas pontas dos dedos são da artrose, e o envolvimento distal com lesão de unha aponta para a forma associada à psoríase."
    proximo: c-conduta
  - texto: "Não importa muito: o que decide é a positividade dos autoanticorpos."
    avaliacao: erro
    feedback: "Uma parte relevante dos pacientes com essa doença tem anticorpos negativos, sobretudo no início, e pessoas saudáveis podem tê-los positivos. Se o anticorpo passar a decidir, tanto o falso negativo quanto o falso positivo levam a erro. A topografia articular continua sendo o eixo."
    proximo: c-conduta
  - texto: "Importa pouco agora, e o essencial é a radiografia das mãos para procurar erosões."
    avaliacao: aceitavel
    feedback: "A radiografia serve de referência inicial e costuma ser normal na doença precoce, porque as erosões demoram a aparecer. Esperar erosão para diagnosticar é esperar o dano que se quer evitar."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Você solicita exames iniciais e explica a hipótese. Ela pergunta se pode continuar com o anti-inflamatório, que alivia bastante, e se o encaminhamento ao reumatologista é mesmo necessário, já que 'está controlando com o remédio'."
dados:
  - "Hipótese de poliartrite inflamatória inicial"
  - "Exames iniciais solicitados"
  - "Alívio parcial com anti-inflamatório"
  - "Paciente questiona necessidade de especialista"
proximo: d-encaminhamento
:::

::: no
tipo: decisao
id: d-encaminhamento
pergunta: "Como você conduz o encaminhamento?"
opcoes:
  - texto: "Encaminhar com prioridade, explicando que o anti-inflamatório alivia o sintoma sem impedir o dano articular, e que existe uma janela inicial em que o tratamento específico muda o curso da doença."
    avaliacao: otima
    feedback: "A explicação é o que garante a adesão. O anti-inflamatório trata a dor e não interfere na destruição articular, que segue silenciosa enquanto o paciente se sente melhor. Existe um período inicial em que iniciar o tratamento específico altera de forma importante o desfecho a longo prazo, e por isso o encaminhamento é prioritário."
    proximo: fim-otimo
  - texto: "Manter o anti-inflamatório e reavaliar em três meses, encaminhando apenas se houver piora."
    avaliacao: erro
    feedback: "Três meses de anti-inflamatório em poliartrite inflamatória inicial é justamente o tempo que se está tentando salvar. A ausência de piora sintomática não significa ausência de progressão: a destruição articular avança sob o alívio da medicação."
    proximo: fim-dano
  - texto: "Encaminhar sem prioridade e prescrever corticoide em dose baixa enquanto a consulta não sai."
    avaliacao: aceitavel
    feedback: "O corticoide em dose baixa é uma ponte razoável e alivia melhor que o anti-inflamatório. O problema é a prioridade do encaminhamento: sem ela, a consulta pode sair em muitos meses, e o corticoide isolado também não impede o dano articular."
    proximo: c-ponte
:::

::: no
tipo: cena
id: c-ponte
texto: "Com o corticoide ela melhora bastante e a consulta especializada sai em sete meses. Nesse período, duas articulações desenvolvem limitação que não regride."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela é avaliada em três semanas, inicia tratamento específico e alcança remissão em seis meses. Dois anos depois, mantém as mãos sem deformidade, trabalha normalmente e faz acompanhamento regular."
ensino: "A divisão entre dor inflamatória e mecânica é de história: rigidez matinal longa que melhora com o movimento aponta inflamação; piora com o uso e alívio com repouso apontam causa mecânica. A topografia fecha o raciocínio, e poupar as articulações da ponta dos dedos é característico. E o anti-inflamatório alivia sem impedir o dano: nessa doença, o tempo até o tratamento específico define o resultado de anos."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela inicia o tratamento específico sete meses depois, com boa resposta, e fica com limitação permanente em duas articulações dos dedos."
ensino: "Corticoide em dose baixa é uma boa ponte e não é tratamento de fundo. O que decide o resultado é a prioridade do encaminhamento, porque a janela inicial se mede em semanas a poucos meses."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Depois de um ano de anti-inflamatório, ela retorna com deformidades estabelecidas nas duas mãos, perda de força de preensão e dificuldade para trabalhar. Também desenvolveu doença renal relacionada ao uso prolongado da medicação."
ensino: "Alívio de sintoma sem controle da doença é uma armadilha silenciosa: o paciente melhora enquanto a articulação se destrói. Em poliartrite inflamatória, o anti-inflamatório é sintomático e o uso prolongado traz risco próprio, renal e digestivo, sem alterar o curso da doença."
:::
