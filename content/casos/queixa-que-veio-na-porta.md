---
id: queixa-que-veio-na-porta
titulo: A queixa que só apareceu na porta
contexto: "Ambulatório de clínica geral, consulta de rotina. Um homem de 41 anos veio 'renovar a receita da pressão'. A consulta correu tranquila, ele respondeu tudo de forma breve e você já estava imprimindo a receita. Ao se levantar, com a mão na maçaneta, ele diz: 'doutor, só uma coisinha rápida'."
tags: [anamnese, agenda oculta, entrevista, queixa principal]
topicosDeApoio:
  - anamnese/entrevista-clinica/a-entrevista-clinica
  - anamnese/entrevista-clinica/queixa-principal-e-hda
  - anamnese/entrevista-clinica/antecedentes-e-habitos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de anamnese e relação médico-paciente"
  - "Semiologia Clínica, 1ª ed., capítulo de anamnese"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção sobre a história clínica"
revisao: pendente
inicio: c-porta
---

::: no
tipo: cena
id: c-porta
texto: "São 11h40 e há mais quatro pacientes na sala de espera. Ele está de pé, com a receita na mão, olhando para o chão. A frase sai rápida: 'só uma coisinha rápida, doutor, é que eu ando meio sem ânimo'. Ele sorri, como quem já se arrependeu de ter falado."
dados:
  - "Consulta de renovação de receita, encerrando"
  - "Queixa nova trazida na despedida"
  - "Quatro pacientes aguardando"
  - "Postura hesitante, contato visual reduzido"
proximo: d-porta
:::

::: no
tipo: decisao
id: d-porta
pergunta: "A consulta acabou e a fila está cheia. O que você faz com essa frase?"
opcoes:
  - texto: "Convidá-lo a sentar de novo e abrir espaço com uma pergunta ampla, deixando claro que há tempo para ouvir."
    avaliacao: otima
    feedback: "A queixa dita na porta tem nome próprio na literatura da entrevista e um motivo conhecido: é o assunto que mais custou coragem. Quem sai dizendo é quem passou a consulta inteira decidindo se diria. Sentar de novo custa poucos minutos e frequentemente traz a razão real da visita, que não era a receita."
    proximo: c-abertura
  - texto: "Dizer que é importante e agendar um retorno específico para tratar disso com calma."
    avaliacao: aceitavel
    feedback: "É respeitoso e organiza a agenda, e cobra um preço: quem levou meses para dizer na porta pode não voltar. Se o retorno for a escolha, vale ao menos uma pergunta agora, para saber se existe risco que não pode esperar, e marcar o retorno para dias, não meses."
    proximo: c-retorno
  - texto: "Tranquilizar rapidamente, dizendo que falta de ânimo é comum e costuma passar, e entregar a receita."
    avaliacao: erro
    feedback: "Tranquilizar antes de saber sobre o que se está tranquilizando é fechar a porta que o paciente acabou de abrir. E 'sem ânimo' é uma palavra que cobre desde cansaço por anemia até ideação suicida. A frase de despedida é uma pergunta disfarçada, e responder com garantia genérica encerra o assunto para sempre."
    proximo: c-fechamento
:::

::: no
tipo: cena
id: c-retorno
texto: "Ele aceita o retorno, agradece e sai. Na semana marcada, não aparece. Duas semanas depois, procura o serviço de novo, dessa vez para renovar outra receita, e você reconhece a segunda chance."
proximo: c-abertura
:::

::: no
tipo: cena
id: c-fechamento
texto: "Ele responde que sim, que deve ser isso mesmo, e sai. Três meses depois retorna, encaminhado do pronto socorro após um episódio que ele descreve como 'uma crise'. Na nova consulta você retoma exatamente do ponto em que a porta se fechou."
proximo: c-abertura
:::

::: no
tipo: cena
id: c-abertura
texto: "Sentado de novo, ele leva alguns segundos em silêncio e então conta: dorme mal há uns quatro meses, acorda de madrugada e não volta a dormir, perdeu a vontade de sair, e discutiu com a esposa por causa disso. Diz que emagreceu 'uns cinco quilos' sem tentar, e que anda bebendo mais à noite 'para desligar'."
dados:
  - "Insônia terminal há 4 meses"
  - "Anedonia, isolamento social"
  - "Perda de peso não intencional de 5 kg"
  - "Aumento do consumo de álcool à noite"
proximo: d-conducao
:::

::: no
tipo: decisao
id: d-conducao
pergunta: "Ele abriu. Como você conduz daqui?"
opcoes:
  - texto: "Ouvir sem interromper por um ou dois minutos, e só depois começar a organizar em perguntas, deixando o silêncio trabalhar quando ele parar."
    avaliacao: otima
    feedback: "A narrativa livre no início rende mais informação por minuto do que qualquer lista de perguntas, e a interrupção precoce é o erro mais comum da entrevista. O silêncio depois que o paciente para de falar é uma técnica, não uma pausa constrangida: com frequência é ali que vem a informação mais difícil."
    proximo: c-exploracao
  - texto: "Passar imediatamente a um roteiro estruturado de perguntas sobre humor, sono, apetite e ideação, para não perder tempo."
    avaliacao: aceitavel
    feedback: "O roteiro é necessário e virá, e ele funciona melhor depois da narrativa. Perguntas fechadas logo de saída fazem o paciente responder o que foi perguntado e calar o resto. Ouça primeiro, estruture depois."
    proximo: c-exploracao
  - texto: "Solicitar exames laboratoriais amplos para descartar causa orgânica antes de qualquer conversa mais profunda."
    avaliacao: erro
    feedback: "Investigar causa orgânica faz parte e não substitui a conversa. Pedir exames neste momento comunica ao paciente que o assunto que ele custou a trazer será tratado por papel, e a próxima frase difícil não virá. Os exames podem ser pedidos ao final, sem interromper a abertura."
    proximo: c-exploracao
:::

::: no
tipo: cena
id: c-exploracao
texto: "Depois de ouvir, você organiza. Ele confirma humor deprimido na maior parte dos dias, perda de interesse por tudo, e diz que às vezes pensa que 'não faria falta'. Nega plano. Sobre a bebida, diz que aumentou de duas para seis ou sete doses nas noites em que não dorme, e que já tentou reduzir sem conseguir."
dados:
  - "Humor deprimido e anedonia na maior parte dos dias"
  - "Ideação passiva, sem plano"
  - "Aumento do consumo de álcool, tentativas frustradas de reduzir"
  - "Sem histórico psiquiátrico prévio"
proximo: d-encerramento
:::

::: no
tipo: decisao
id: d-encerramento
pergunta: "Como você encerra esta consulta, que era para durar dez minutos?"
opcoes:
  - texto: "Nomear o que foi encontrado, combinar um plano concreto com retorno curto, iniciar o tratamento e registrar tudo, inclusive o rastreio de uso de álcool e a ideação passiva."
    avaliacao: otima
    feedback: "Nomear o problema é parte do cuidado: o paciente precisa sair sabendo o que ele tem e o que vai acontecer. O plano concreto com data próxima transforma uma conversa em tratamento, e o registro garante que o próximo profissional não recomece do zero. E o consumo de álcool não é detalhe aqui: ele é ao mesmo tempo sintoma e fator de risco."
    proximo: fim-otimo
  - texto: "Prescrever um indutor do sono para a queixa que ele trouxe e reavaliar em um mês."
    avaliacao: erro
    feedback: "Tratar a insônia isolada de um quadro depressivo com ideação passiva e uso crescente de álcool é atender ao sintoma mais visível e ignorar o resto. Pior: sedativos combinados com álcool aumentam risco, inclusive de intoxicação. A queixa da porta pedia mais que uma receita."
    proximo: fim-dano
  - texto: "Encaminhar à saúde mental e aguardar a vaga, sem iniciar nada agora."
    avaliacao: aceitavel
    feedback: "O encaminhamento é adequado e costuma demorar. No intervalo, o cuidado é seu: iniciar tratamento, marcar retorno curto e deixar orientação escrita não dependem de fila, e são o que sustenta o paciente até a primeira consulta especializada."
    proximo: c-fila
:::

::: no
tipo: cena
id: c-fila
texto: "Ele sai com o encaminhamento e sem tratamento. A vaga sai em cinco semanas, e nesse intervalo ele falta ao trabalho várias vezes e aumenta a bebida. Chega à consulta especializada pior do que estava."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A consulta durou vinte e cinco minutos a mais. Ele sai com diagnóstico nomeado, tratamento iniciado, retorno em dez dias e a conversa sobre álcool começada. Três meses depois, conta que voltou a dormir e que a esposa notou a diferença antes dele. E diz que quase não falou nada naquele dia."
ensino: "A queixa dita na despedida costuma ser a mais importante da consulta, porque é a que exigiu mais coragem. Sentar de novo custa minutos e muda o que a consulta descobre. Depois disso, a ordem que rende mais é narrativa livre primeiro, perguntas estruturadas depois, e o silêncio como ferramenta. Tranquilizar antes de saber sobre o que se tranquiliza fecha a porta que o paciente abriu."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele chega à saúde mental cinco semanas depois, com o quadro agravado e o consumo de álcool maior. O tratamento funciona, com um percurso mais longo do que precisava."
ensino: "Encaminhar não é a mesma coisa que cuidar no intervalo. Iniciar o tratamento, marcar retorno curto e abordar o uso de álcool são medidas que não dependem de fila nenhuma."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com o indutor do sono e sem abordagem do quadro de base, ele passa a associar a medicação ao álcool. Dois meses depois é levado ao pronto socorro após uma intoxicação medicamentosa, que ele descreve como impulsiva. Sobrevive, e só então o quadro depressivo é diagnosticado."
ensino: "Tratar o sintoma mais confortável de um quadro depressivo é adiar o diagnóstico e, com sedativos somados a álcool, também acrescentar risco. Quando aparecem anedonia, ideação passiva e aumento do consumo de álcool, a receita isolada é a pior das respostas possíveis."
:::
