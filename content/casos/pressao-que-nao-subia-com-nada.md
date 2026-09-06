---
id: pressao-que-nao-subia-com-nada
titulo: A pressão que não subia com nada
contexto: "Emergência de hospital geral. Um homem de 44 anos chega com vômitos, dor abdominal difusa e fraqueza extrema há três dias. Ele emagreceu bastante no último ano e conta, quando perguntado, que se sente tonto ao levantar há meses. A esposa comenta que ele 'ficou moreno mesmo sem ir à praia'."
tags: [geral, insuficiencia adrenal, hipotensao, pele]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/pressao-arterial
  - exame-fisico-geral/avaliacao-geral/antropometria-e-hidratacao
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da pele e de doenças das suprarrenais"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da pele e de hipovolemia"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral e da pele"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está prostrado e responde devagar. A pressão deitado é 84 x 52 mmHg e a frequência cardíaca, 118 bpm. Recebeu um litro de soro na sala de triagem e a pressão praticamente não mudou. A dor abdominal é difusa, sem defesa, e ele vomitou três vezes hoje."
dados:
  - "Vômitos e dor abdominal difusa há 3 dias"
  - "Fraqueza intensa e perda de peso no último ano"
  - "PA 84 x 52 mmHg após 1 litro de cristaloide"
  - "FC 118 bpm, temperatura 37,6 graus"
  - "Tontura postural há meses"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "A pressão não respondeu ao primeiro litro. O que você faz enquanto continua a reposição?"
opcoes:
  - texto: "Despir o paciente e examinar a pele por inteiro, comparando áreas expostas com áreas cobertas, além de procurar as mucosas e as dobras das mãos."
    avaliacao: otima
    feedback: "É o exame que ninguém faz na sala de emergência e que resolve este caso. A hiperpigmentação da insuficiência adrenal aparece justamente onde não deveria: em cicatrizes, nas dobras palmares, nas gengivas e nas áreas cobertas pela roupa. Sem despir o paciente, esses achados não existem."
    proximo: c-exame
  - texto: "Iniciar vasopressor imediatamente, já que a hipotensão não respondeu ao volume."
    avaliacao: aceitavel
    feedback: "A droga vasoativa vai ser necessária e é adequada em choque que não responde a volume. O cuidado aqui é não parar de procurar a causa: existe um subgrupo em que a hipotensão é refratária justamente porque falta cortisol, e sem ele o vasopressor rende pouco."
    proximo: c-exame
  - texto: "Investigar abdome agudo com tomografia urgente, dada a dor difusa com vômitos."
    avaliacao: erro
    feedback: "O abdome merece atenção e não explica sozinho a hipotensão refratária, a perda de peso de um ano e a tontura postural crônica. Levar um paciente hipotenso e não investigado para a tomografia troca a busca da causa pela busca de imagem, e a causa aqui está na pele e nos eletrólitos."
    proximo: c-atraso
:::

::: no
tipo: cena
id: c-atraso
texto: "A tomografia não mostra causa cirúrgica. Ao retornar, ele está mais hipotenso e sonolento, e a equipe recomeça a avaliação. Agora alguém finalmente pede que ele tire a camisa."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com o paciente despido, a pele do tronco, coberta pela roupa, está claramente mais escura que o normal para ele, segundo a esposa. As dobras das palmas das mãos estão acentuadas e escurecidas. Há manchas acinzentadas na mucosa da bochecha e nas gengivas. Uma cicatriz antiga de apendicectomia está bem mais escura que a pele ao redor. As mucosas estão secas."
dados:
  - "Hiperpigmentação difusa, inclusive em áreas cobertas"
  - "Dobras palmares acentuadas e escurecidas"
  - "Manchas na mucosa oral"
  - "Cicatriz antiga hiperpigmentada"
  - "PA 82 x 50 mmHg após 2 litros"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Como esses achados de pele mudam o raciocínio?"
opcoes:
  - texto: "Apontam insuficiência adrenal primária crônica em crise: hipotensão refratária a volume com hiperpigmentação exige corticoide agora, sem esperar dosagem hormonal."
    avaliacao: otima
    feedback: "A hiperpigmentação nasce do excesso do hormônio que estimula a suprarrenal, e por isso ela só aparece na forma primária. Ela conta uma história de meses, e a crise atual é o desfecho agudo dessa história. O tratamento não espera confirmação: colhe-se a amostra para dosagem e administra-se o corticoide imediatamente."
    proximo: c-conduta
  - texto: "Sugerem hemocromatose ou doença hepática crônica, que também escurecem a pele."
    avaliacao: aceitavel
    feedback: "As duas escurecem a pele e entram na lista. O que aponta para a suprarrenal é o desenho: dobras palmares, mucosa oral e cicatrizes antigas, com hipotensão refratária a volume e distúrbio de eletrólitos. É o conjunto, não a cor isolada."
    proximo: c-conduta
  - texto: "Provavelmente são achados constitucionais dele, e o foco deve seguir na reposição volêmica agressiva."
    avaliacao: erro
    feedback: "Pigmentação constitucional não escurece cicatriz antiga nem mucosa oral, e não aparece de forma nova em áreas cobertas. Insistir apenas em volume em uma crise adrenal é repetir a medida que já falhou duas vezes: sem cortisol, o vaso não responde."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-conduta
texto: "Os eletrólitos voltam com sódio baixo e potássio alto, e a glicemia está em 58 mg/dL. Uma amostra de sangue foi guardada para dosagem hormonal. O corticoide endovenoso está disponível na unidade, tanto a hidrocortisona quanto a dexametasona."
dados:
  - "Sódio baixo, potássio alto"
  - "Glicemia 58 mg/dL"
  - "Amostra para dosagem hormonal já colhida"
  - "PA 84 x 52 mmHg, FC 122 bpm"
proximo: d-corticoide
:::

::: no
tipo: decisao
id: d-corticoide
pergunta: "Qual corticoide e com que urgência?"
opcoes:
  - texto: "Hidrocortisona endovenosa imediatamente, junto com correção da glicemia e reposição de volume com solução contendo sódio e glicose."
    avaliacao: otima
    feedback: "Na crise adrenal, a hidrocortisona é a escolha porque tem também efeito mineralocorticoide, que é o que segura sódio e água e permite à pressão responder. E a tríade que se corrige junto é característica: hipotensão, hiponatremia com hipercalemia e hipoglicemia. O tratamento precede qualquer resultado hormonal."
    proximo: fim-otimo
  - texto: "Aguardar o resultado da dosagem de cortisol antes de administrar qualquer corticoide, para não prejudicar o diagnóstico."
    avaliacao: erro
    feedback: "A amostra já foi guardada, que era a única razão para esperar. A partir daí, adiar o corticoide em uma crise adrenal é adiar a única droga que faz a pressão responder. Esse resultado costuma levar horas ou dias, e o paciente não tem esse tempo."
    proximo: fim-dano
  - texto: "Dexametasona endovenosa, que não interfere na dosagem de cortisol e permite completar a investigação depois."
    avaliacao: aceitavel
    feedback: "A dexametasona é uma escolha razoável quando o teste diagnóstico ainda será feito e a amostra não foi colhida, porque não cruza com a dosagem. Aqui a amostra já está guardada, e a hidrocortisona é superior porque acrescenta o efeito mineralocorticoide que este paciente precisa agora."
    proximo: c-dexa
:::

::: no
tipo: cena
id: c-dexa
texto: "Com a dexametasona a pressão melhora parcialmente, mas o sódio permanece baixo e ele segue precisando de volume durante a noite. A troca para hidrocortisona é feita pela manhã, e a partir daí a recuperação acelera."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Uma hora depois da hidrocortisona a pressão sobe para 106 x 68 mmHg, algo que dois litros de soro não conseguiram. O sódio e a glicemia se corrigem ao longo do dia. A investigação confirma insuficiência adrenal primária, e ele recebe alta com corticoide oral, cartão de identificação e a orientação sobre como dobrar a dose em dias de doença."
ensino: "Hipotensão que não responde a volume pede procurar causas fora do compartimento vascular, e uma delas se vê na pele. A hiperpigmentação em dobras palmares, mucosa oral, cicatrizes antigas e áreas cobertas aponta insuficiência adrenal primária. A tríade laboratorial é sódio baixo, potássio alto e glicemia baixa. Guarda-se a amostra e trata-se imediatamente com hidrocortisona."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera bem, após uma noite com resposta incompleta e necessidade de volume adicional, com internação de cinco dias."
ensino: "A dexametasona resolve a parte glicocorticoide e não repõe o efeito mineralocorticoide, que é o que retém sódio e sustenta a pressão. Quando a amostra diagnóstica já foi colhida, a hidrocortisona é a escolha na crise."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem corticoide, e apesar de mais três litros de volume e de vasopressor em dose crescente, ele evolui com choque refratário, arritmia por hipercalemia e parada cardíaca. É reanimado, recebe o corticoide durante a reanimação e sobrevive, com internação prolongada em terapia intensiva."
ensino: "Sem cortisol, o vaso não responde nem ao volume nem à droga vasoativa. Na suspeita de crise adrenal, o corticoide entra imediatamente após a coleta da amostra, porque nenhuma outra medida corrige o problema e o resultado laboratorial chega tarde demais para ajudar."
:::
