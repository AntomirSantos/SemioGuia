---
id: tosse-de-oito-semanas
titulo: A tosse que já dura oito semanas
contexto: "Ambulatório de clínica geral. Uma mulher de 57 anos vem pela terceira vez pela mesma tosse, que começou há dois meses. Já tomou dois antibióticos e um xarope. Fuma desde os dezenove anos, cerca de um maço por dia. Diz que a tosse é seca, pior de manhã, e que uma vez saiu 'um fiapo de sangue' no lenço."
tags: [respiratorio, tosse cronica, bandeira vermelha, tabagismo]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
  - aparelho-respiratorio/exame-do-torax/inspecao-do-torax
  - exame-fisico-geral/avaliacao-geral/linfonodos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho respiratório e de tosse"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame pulmonar"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia respiratória"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela tosse duas vezes durante a consulta, uma tosse seca e curta. Diz que perdeu 'uns três quilos, mas foi de propósito, comendo menos'. Nega febre. Trabalha como cozinheira e conta que precisou parar de subir a ladeira do trabalho sem descansar no meio, coisa que fazia até o ano passado."
dados:
  - "Tosse seca há 8 semanas, sem resposta a dois antibióticos"
  - "Um episódio de escarro com raia de sangue"
  - "Tabagismo de 38 anos-maço"
  - "Perda de peso de 3 kg, atribuída a dieta"
  - "Redução da tolerância ao esforço no último ano"
proximo: d-bandeiras
:::

::: no
tipo: decisao
id: d-bandeiras
pergunta: "O que nesta história muda a conduta em relação a uma tosse comum?"
opcoes:
  - texto: "A duração acima de oito semanas, a carga tabágica alta, o escarro com sangue e a perda de peso: cada um deles já pediria radiografia, e juntos pedem investigação sem mais provas terapêuticas."
    avaliacao: otima
    feedback: "Tosse crônica tem causas frequentes e benignas, e o que retira o paciente desse grupo são as bandeiras vermelhas. Aqui existem quatro ao mesmo tempo. Um único episódio de sangue no escarro em tabagista pesado já é indicação de imagem, e a ausência de resposta a dois antibióticos deveria ter mudado o rumo na segunda consulta."
    proximo: c-exame
  - texto: "Provável tosse por refluxo ou gotejamento pós-nasal, que respondem a tratamento específico: vale mais uma prova terapêutica antes da imagem."
    avaliacao: erro
    feedback: "Essas causas realmente respondem por boa parte da tosse crônica, e a prova terapêutica é adequada em quem não tem bandeira vermelha. Aqui há quatro delas. Insistir em prova terapêutica em tabagista com escarro sanguinolento e perda de peso é o padrão que produz diagnósticos tardios."
    proximo: c-atraso
  - texto: "Solicitar tomografia de tórax de imediato, porque a radiografia pode não mostrar lesões pequenas."
    avaliacao: aceitavel
    feedback: "A tomografia é mais sensível e costuma ser o passo seguinte. A radiografia continua tendo valor como primeiro exame, é acessível e frequentemente já mostra a lesão, e o exame físico completo precede as duas. Se a radiografia vier normal e a suspeita se mantiver, a tomografia é obrigatória."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela usa o tratamento para refluxo por seis semanas, sem mudança. Volta com mais dois quilos a menos e três novos episódios de sangue no escarro. A radiografia é finalmente pedida, quatro meses depois do início da tosse."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "No exame do tórax, a expansibilidade é discretamente menor à direita. A percussão é levemente submaciça na região infraescapular direita. À ausculta, o murmúrio está diminuído nesse mesmo local, sem ruídos adventícios. Você palpa as fossas supraclaviculares e encontra, à direita, um linfonodo endurecido de cerca de um centímetro e meio, aderido. As unhas mostram alargamento das falanges distais."
dados:
  - "Expansibilidade e murmúrio reduzidos em base direita"
  - "Submacicez infraescapular direita"
  - "Linfonodo supraclavicular direito endurecido e aderido"
  - "Baqueteamento digital"
proximo: d-supraclavicular
:::

::: no
tipo: decisao
id: d-supraclavicular
pergunta: "O que o linfonodo supraclavicular acrescenta ao caso?"
opcoes:
  - texto: "Muito: linfonodo supraclavicular em adulto é quase sempre patológico e frequentemente indica doença de tórax ou abdome, e ele é também o local mais acessível para a biópsia que fará o diagnóstico."
    avaliacao: otima
    feedback: "Essa cadeia raramente aumenta por causa benigna em adultos, e por isso ela é a mais valiosa do exame nesta suspeita. Além do valor diagnóstico, ela é a mais prática: um linfonodo palpável no pescoço permite biópsia simples e ambulatorial, evitando procedimentos mais invasivos no tórax. Palpar as fossas supraclaviculares deveria ser rotina em toda tosse crônica de tabagista."
    proximo: c-conduta
  - texto: "Pouco: linfonodos pequenos são comuns e este pode ser reacional a uma infecção respiratória recente."
    avaliacao: erro
    feedback: "Em outras cadeias esse raciocínio teria lugar. Na supraclavicular, não: mesmo linfonodos pequenos ali merecem investigação em adultos, e as características descritas, endurecido e aderido, reforçam a preocupação. Chamar de reacional é descartar o achado que mais encurtaria o caminho até o diagnóstico."
    proximo: c-conduta
  - texto: "Confirma disseminação e torna o caso irreversível, cabendo apenas cuidado paliativo."
    avaliacao: aceitavel
    feedback: "A conclusão antecipa demais. Linfonodo supraclavicular indica doença mais avançada e não define, sozinho, nem o diagnóstico nem o que é possível oferecer. Muitos pacientes nessa situação têm tratamento com objetivo de controle e ganho real de tempo e de qualidade de vida. O passo agora é biopsiar e estadiar."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "A radiografia mostra uma massa no lobo inferior direito, com alargamento do hilo. Você encaminha para investigação com prioridade. Ela pergunta se ainda vale a pena parar de fumar, já que 'o estrago está feito'."
dados:
  - "Massa em lobo inferior direito, alargamento hilar"
  - "Encaminhamento com prioridade para estadiamento e biópsia"
  - "Paciente questiona utilidade de cessar o tabagismo"
proximo: d-tabagismo
:::

::: no
tipo: decisao
id: d-tabagismo
pergunta: "O que você responde sobre parar de fumar agora?"
opcoes:
  - texto: "Que vale a pena mesmo agora: parar melhora a resposta ao tratamento, reduz complicações cirúrgicas e infecciosas, e ajuda nos sintomas respiratórios, e oferecer apoio concreto para isso."
    avaliacao: otima
    feedback: "Cessar o tabagismo depois do diagnóstico continua trazendo benefício mensurável: cicatrização melhor, menos complicação pulmonar em cirurgia, melhor tolerância a tratamentos e menos sintomas. Além disso, a oferta de apoio comunica que ainda há o que fazer, o que importa para alguém que acabou de ouvir uma notícia difícil."
    proximo: fim-otimo
  - texto: "Que neste momento o foco deve ser a investigação, e o tabagismo pode ser abordado depois do diagnóstico definitivo."
    avaliacao: aceitavel
    feedback: "Adiar é compreensível diante do volume de informação da consulta, e costuma significar nunca. O momento do diagnóstico é justamente quando a motivação para parar é maior, e uma oferta breve de apoio leva dois minutos."
    proximo: c-adiado
  - texto: "Concordar que o mais importante agora é o conforto dela, e que exigir a cessação seria acrescentar sofrimento."
    avaliacao: erro
    feedback: "Oferecer apoio não é exigir nem culpar, e a diferença está no tom, não na abstenção. Deixar de mencionar o assunto priva a paciente de um benefício real e comunica, sem querer, que não há mais nada a ganhar."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-adiado
texto: "O assunto não volta nas consultas seguintes, ocupadas pelo estadiamento e pelo tratamento. Ela continua fumando durante a quimioterapia e apresenta duas infecções respiratórias que atrasam ciclos."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A biópsia do linfonodo supraclavicular, feita em regime ambulatorial, confirma o diagnóstico e permite o estadiamento sem procedimento torácico. Ela inicia tratamento em duas semanas, para de fumar com apoio do serviço e completa os ciclos sem interrupções por infecção."
ensino: "Tosse com mais de oito semanas em tabagista pesado, com escarro sanguinolento e perda de peso, é investigação e não prova terapêutica. No exame, palpar as fossas supraclaviculares muda o caso: linfonodo ali é quase sempre patológico em adultos e costuma ser a via mais simples para a biópsia. E a cessação do tabagismo continua valendo a pena depois do diagnóstico."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O tratamento acontece, com dois atrasos por infecção respiratória e uma internação a mais, em parte porque o tabagismo seguiu sem ser abordado."
ensino: "O momento do diagnóstico é quando a motivação para parar de fumar é maior. Adiar essa conversa para depois costuma significar que ela nunca acontece, e o custo aparece como complicação durante o tratamento."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem qualquer abordagem sobre o tabagismo, ela continua fumando um maço por dia. Desenvolve pneumonia grave no segundo ciclo de tratamento, precisa de internação prolongada e o tratamento oncológico é suspenso por seis semanas."
ensino: "Não mencionar a cessação por receio de acrescentar sofrimento retira do paciente um benefício concreto. O que causa dano é o julgamento, não a oferta de ajuda, e as duas coisas se distinguem pelo tom com que a conversa é feita."
:::
