---
id: pergunta-que-faltava-fazer
titulo: A pergunta que faltava fazer
contexto: "Ambulatório de clínica geral, última consulta da manhã. Um homem de 34 anos volta para mostrar exames de rotina que estão todos normais. Ele veio há dois meses com insônia e cansaço, saiu com um ansiolítico e não voltou desde então. Hoje ele fala pouco, olha para o chão e responde com frases curtas."
tags: [psiquico, risco de suicidio, humor, entrevista]
topicosDeApoio:
  - exame-psiquico/exame-psiquico/fundamentos-do-exame-psiquico
  - exame-psiquico/exame-psiquico/funcoes-psiquicas-e-seus-disturbios
  - anamnese/entrevista-clinica/a-entrevista-clinica
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame psíquico"
  - "Semiologia Clínica, 1ª ed., capítulo de exame psíquico"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de avaliação do estado mental"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele entrega os exames sem comentar. A voz sai baixa e monótona, sem variação. Não sorri em nenhum momento, nem quando você comenta algo leve. Perdeu peso desde a última consulta, está com a barba por fazer e a camisa amassada. Quando você pergunta como ele está, responde: 'do mesmo jeito, doutor, ou pior'."
dados:
  - "Retorno após 2 meses, sem melhora"
  - "Discurso lentificado, voz monótona"
  - "Perda de peso, descuido com aparência"
  - "Insônia mantida, cansaço"
  - "Exames laboratoriais normais"
proximo: d-conducao
:::

::: no
tipo: decisao
id: d-conducao
pergunta: "Os exames estão normais e a consulta poderia terminar aqui. Como você conduz?"
opcoes:
  - texto: "Abrir espaço para o humor: perguntar sobre tristeza, perda de interesse pelas coisas de que ele gostava, e como ele tem visto o futuro."
    avaliacao: otima
    feedback: "Exame normal não é notícia tranquilizadora quando o sofrimento continua: às vezes ele apenas fecha uma porta e obriga a abrir outra. As duas perguntas que mais rendem são simples: nas últimas semanas, você tem se sentido para baixo, e você perdeu o interesse ou o prazer nas coisas? Elas cabem em qualquer consulta e mudam o rumo desta."
    proximo: c-entrevista
  - texto: "Informar que está tudo bem nos exames, renovar o ansiolítico e agendar retorno em três meses."
    avaliacao: erro
    feedback: "É a consulta que termina antes de começar. O paciente trouxe o corpo porque foi o que lhe pediram, mas o que mudou nele está no humor, no apetite, no sono e no cuidado consigo. Renovar o ansiolítico sem investigar o humor pode inclusive tratar o sintoma que servia de sinal."
    proximo: c-atraso
  - texto: "Aplicar uma escala de rastreio de depressão e decidir pela pontuação."
    avaliacao: aceitavel
    feedback: "A escala organiza e ajuda a acompanhar a evolução, e é bem-vinda. O cuidado é não deixar que o formulário substitua a conversa: quem responde a um questionário em silêncio raramente conta o que contaria a alguém que perguntou olhando nos olhos."
    proximo: c-entrevista
:::

::: no
tipo: cena
id: c-atraso
texto: "Ele agradece, guarda a receita e sai. Duas semanas depois, a irmã liga para a unidade pedindo ajuda: ele não sai mais do quarto e disse coisas que a assustaram. Você o atende no mesmo dia, e a conversa que não aconteceu antes começa agora."
proximo: c-entrevista
:::

::: no
tipo: cena
id: c-entrevista
texto: "Com espaço aberto, ele conta: perdeu o emprego há três meses e não contou a ninguém em casa. Não sente prazer em nada, nem no futebol de domingo. Acorda às quatro da manhã e não volta a dormir. Come pouco. Diz, olhando para o chão, que às vezes pensa que 'seria melhor não acordar', e que a família 'ficaria mais leve' sem ele."
dados:
  - "Anedonia, humor deprimido, insônia terminal"
  - "Perda de emprego há 3 meses, não compartilhada"
  - "Ideias de que seria melhor não acordar"
  - "Sensação de ser um peso para a família"
proximo: d-risco
:::

::: no
tipo: decisao
id: d-risco
pergunta: "Ele mencionou que seria melhor não acordar. O que você faz com essa frase?"
opcoes:
  - texto: "Perguntar de forma direta e calma sobre ideação, plano, método disponível e tentativas anteriores, deixando claro que é uma pergunta que você faz para poder ajudar."
    avaliacao: otima
    feedback: "Perguntar sobre suicídio não planta a ideia em ninguém: quem tem esses pensamentos costuma sentir alívio ao poder falar deles. A avaliação de risco tem itens concretos, e eles precisam ser ditos: pensou em se matar, pensou em como, tem acesso ao meio, já tentou antes, o que o segura. Cada resposta muda a conduta, e nenhuma delas se obtém por rodeio."
    proximo: c-avaliacao
  - texto: "Evitar o assunto para não reforçar a ideia, tratar a depressão e reavaliar no retorno."
    avaliacao: erro
    feedback: "Esse receio é comum e não se sustenta: falar sobre o tema não aumenta o risco, e o silêncio deixa o paciente sozinho com o que ele já pensava. Sem perguntar, não há como saber se existe plano, método ou data, e é isso que separa um acompanhamento ambulatorial de uma conduta imediata."
    proximo: fim-dano
  - texto: "Registrar a frase como ideação passiva, iniciar antidepressivo e marcar retorno em quatro semanas."
    avaliacao: aceitavel
    feedback: "Iniciar o tratamento está correto, e o intervalo é longo demais para quem acabou de dizer isso. Além disso, o risco pode aumentar nas primeiras semanas, quando a energia retorna antes do humor. Retornos curtos e alguém em casa avisado fazem parte da prescrição."
    proximo: c-retorno-longo
:::

::: no
tipo: cena
id: c-retorno-longo
texto: "Ele volta em quatro semanas, e conta que a segunda semana foi a pior de todas. Nada aconteceu, mas ele mesmo diz que 'chegou perto'. O tratamento é reorganizado com retornos semanais e com a irmã acompanhando."
proximo: fim-aceitavel
:::

::: no
tipo: cena
id: c-avaliacao
texto: "Ele responde: pensou em se matar, sim, várias vezes no último mês. Pensou em como, e mencionou os comprimidos que tem em casa. Nunca tentou antes. Quando perguntado sobre o que o segura, fala da filha de seis anos e chora pela primeira vez na consulta. Aceita que você converse com a irmã dele."
dados:
  - "Ideação suicida frequente no último mês"
  - "Método pensado, com acesso disponível em casa"
  - "Sem tentativas prévias"
  - "Fator de proteção presente: a filha"
  - "Aceita envolvimento da família"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Como você encerra essa consulta?"
opcoes:
  - texto: "Construir um plano de segurança com ele: retirar o acesso ao método com ajuda da irmã, iniciar tratamento, marcar retorno em poucos dias, deixar contatos de crise por escrito e encaminhar com prioridade à saúde mental."
    avaliacao: otima
    feedback: "Risco não se resolve com uma decisão só, e sim com um conjunto que reduz oportunidade e aumenta suporte. Restringir o acesso ao meio é uma das medidas mais eficazes que existem. Envolver alguém de confiança, encurtar o intervalo até o próximo contato e escrever o que fazer numa crise transformam uma intenção de cuidado em plano concreto."
    proximo: fim-otimo
  - texto: "Encaminhar ao serviço de saúde mental e aguardar a vaga, mantendo o acompanhamento habitual enquanto isso."
    avaliacao: aceitavel
    feedback: "O encaminhamento é necessário e costuma demorar, e o intervalo é justamente o período de risco. Enquanto a vaga não sai, o cuidado é seu: retorno curto, plano de segurança e contato com a família não dependem de nenhuma fila."
    proximo: c-fila
  - texto: "Indicar internação compulsória imediatamente, dada a presença de plano e de método disponível."
    avaliacao: erro
    feedback: "A internação tem lugar em risco iminente e sem suporte, e é uma medida séria. Aqui há vínculo, aceitação de ajuda, família disponível e fator de proteção claro. Impor internação a um paciente que acabou de confiar em você pode romper o vínculo que mais protege, e o vínculo é parte do tratamento."
    proximo: c-fila
:::

::: no
tipo: cena
id: c-fila
texto: "Sem plano de segurança combinado, ele passa dez dias sozinho até a primeira consulta especializada. Nada acontece, mas ele chega dizendo que teve dias em que não sabia a quem ligar."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A irmã recolhe os medicamentos no mesmo dia. Ele volta em três dias, depois toda semana. Começa o tratamento, é atendido pela equipe de saúde mental em duas semanas e, três meses depois, conta que voltou ao futebol de domingo. Diz que a consulta em que alguém perguntou foi o ponto em que virou."
ensino: "Exame normal não encerra a consulta quando o sofrimento continua: às vezes só muda a direção da investigação. Perguntar sobre humor, prazer e ideias de morte não planta nada, e é a única forma de saber o que existe. Diante do risco, a conduta é um conjunto: reduzir acesso ao método, envolver alguém de confiança, encurtar o retorno e deixar por escrito o que fazer em uma crise."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele sobrevive ao período de espera e chega ao serviço especializado, depois de semanas sem rede de apoio combinada. O tratamento funciona, com um percurso mais sofrido do que precisava ser."
ensino: "Encaminhar não é a mesma coisa que cuidar no intervalo. Enquanto a vaga não chega, o plano de segurança, o retorno curto e a família avisada são o tratamento disponível, e nenhum deles depende de fila."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem que o tema fosse abordado, ele sai da consulta com a receita renovada. Doze dias depois, é levado ao pronto socorro após ingerir os comprimidos que tinha em casa. Sobrevive, com internação prolongada e com a família descobrindo tudo da pior maneira."
ensino: "O silêncio sobre o tema não protege ninguém. Perguntar sobre ideação, plano e método é o que permite avaliar risco e agir sobre ele, e a pergunta costuma trazer alívio a quem esperava por ela. Renovar medicação sedativa sem avaliar risco pode ainda entregar o meio."
:::
