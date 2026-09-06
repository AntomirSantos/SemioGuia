---
id: duas-cervejas-que-eram-oito
titulo: As duas cervejas que eram oito
contexto: "Ambulatório de clínica geral. Um homem de 45 anos vem por causa de exames alterados que trouxe do trabalho: enzimas hepáticas elevadas. Ele está bem, sem queixas. Quando perguntado sobre bebida, responde rápido: 'ah, socialmente, umas duas cervejas no fim de semana'."
tags: [psiquico, rastreio, uso de alcool, entrevista]
topicosDeApoio:
  - exame-psiquico/exame-psiquico/fundamentos-do-exame-psiquico
  - anamnese/entrevista-clinica/antecedentes-e-habitos
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de anamnese, hábitos e exame psíquico"
  - "Semiologia Clínica, 1ª ed., capítulo de exame psíquico"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do paciente com doença hepática"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está tranquilo e um pouco apressado, porque saiu do trabalho para vir. Diz que sempre foi saudável e que os exames alterados devem ser 'do remédio para dor nas costas'. Ao falar de bebida, responde antes de você terminar a pergunta, e muda de assunto em seguida, perguntando sobre o resultado dos outros exames."
dados:
  - "Enzimas hepáticas elevadas em exame de rotina"
  - "Assintomático"
  - "Relato inicial de consumo social de álcool"
  - "Resposta rápida e mudança de assunto"
  - "Uso ocasional de anti-inflamatório"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "A resposta sobre bebida foi vaga. Como você prossegue?"
opcoes:
  - texto: "Perguntar em unidades concretas: quantos dias por semana, quantas latas ou doses em cada dia, e qual foi o dia em que mais bebeu no último mês."
    avaliacao: otima
    feedback: "Perguntas vagas produzem respostas vagas, e beber socialmente não é uma quantidade. Perguntar por dias e por unidades no último mês, incluindo o dia de maior consumo, produz um número que pode ser conversado. A pergunta pelo pico é especialmente útil, porque ela costuma revelar o padrão real."
    proximo: c-quantificacao
  - texto: "Aceitar a resposta e atribuir as enzimas alteradas ao anti-inflamatório, orientando suspender e repetir os exames."
    avaliacao: erro
    feedback: "Existe uma explicação plausível à mão, e aceitá-la sem investigar a mais provável é o padrão que perde diagnósticos de uso problemático de álcool por anos. Relatos iniciais de consumo tendem a subestimar bastante o real, e a subestimação é maior justamente em quem tem consumo mais alto."
    proximo: c-atraso
  - texto: "Aplicar um questionário de rastreio de uso de álcool, entregue para ele preencher na sala de espera."
    avaliacao: aceitavel
    feedback: "Os instrumentos de rastreio são úteis e funcionam melhor quando aplicados na conversa, e não entregues como formulário. Preenchido sozinho e sem vínculo, o questionário tende a repetir a resposta socialmente aceitável que ele já deu."
    proximo: c-quantificacao
:::

::: no
tipo: cena
id: c-atraso
texto: "Ele suspende o anti-inflamatório e repete os exames em dois meses, com pequena melhora. A investigação para por aí. Dois anos depois, retorna com aumento do volume abdominal e é diagnosticado com doença hepática avançada."
proximo: c-quantificacao
:::

::: no
tipo: cena
id: c-quantificacao
texto: "Com perguntas concretas e sem julgamento na voz, o número muda. Ele bebe de quinta a domingo, cerca de seis a oito latas por dia, e conta que no último aniversário passou de doze. Depois, em resposta a perguntas específicas, admite que já tentou parar duas vezes, que se irrita quando comentam sobre isso, e que às vezes bebe pela manhã no fim de semana para 'melhorar o mal-estar'."
dados:
  - "Consumo de 24 a 32 doses por semana"
  - "Episódios de consumo pesado pontual"
  - "Tentativas prévias de reduzir, sem sucesso"
  - "Irritação quando o tema é levantado"
  - "Consumo matinal ocasional"
proximo: d-comunicacao
:::

::: no
tipo: decisao
id: d-comunicacao
pergunta: "Como você devolve essa informação para ele?"
opcoes:
  - texto: "Sem julgamento, ligando o consumo relatado ao exame alterado, perguntando o que ele pensa sobre isso e o que gostaria de fazer, antes de propor qualquer plano."
    avaliacao: otima
    feedback: "A abordagem que funciona começa por devolver o dado e devolver a decisão. Ligar o número ao exame alterado dá sentido concreto ao problema, e perguntar o que ele pensa evita a discussão em que o médico defende a mudança e o paciente defende o hábito. Quem argumenta a favor da mudança precisa ser ele."
    proximo: c-plano
  - texto: "Explicar com firmeza os riscos do consumo excessivo e instruí-lo a parar de beber imediatamente."
    avaliacao: erro
    feedback: "O confronto direto costuma produzir defesa em vez de mudança, sobretudo em quem já se irrita quando o tema aparece. Além disso, existe um risco concreto: parar de forma abrupta em quem tem consumo pesado e diário pode desencadear síndrome de abstinência, que precisa ser conduzida com cuidado."
    proximo: fim-dano
  - texto: "Registrar o consumo, solicitar exames complementares e abordar o assunto na próxima consulta, quando houver mais tempo."
    avaliacao: aceitavel
    feedback: "Registrar é importante e adiar a conversa desperdiça o momento em que ele acabou de falar. A janela em que alguém admite o consumo real é curta, e retomar o assunto meses depois costuma exigir recomeçar do zero, muitas vezes com a resposta social de novo."
    proximo: c-adiado
:::

::: no
tipo: cena
id: c-adiado
texto: "Na consulta seguinte, três meses depois, ele volta a dizer que bebe socialmente e desconversa. A conversa precisa ser reconstruída, e ele demora mais um ano até aceitar ajuda."
proximo: c-plano
:::

::: no
tipo: cena
id: c-plano
texto: "Ele fica em silêncio por alguns segundos e diz que já tinha percebido que estava bebendo demais, mas que nunca ninguém tinha perguntado direito. Diz que quer reduzir, e pergunta se pode simplesmente parar de uma vez, porque acha que assim é mais fácil."
dados:
  - "Paciente reconhece o problema"
  - "Manifesta intenção de mudar"
  - "Consumo pesado quase diário, com sintoma matinal"
  - "Sem rede de apoio organizada"
proximo: d-abstinencia
:::

::: no
tipo: decisao
id: d-abstinencia
pergunta: "Ele quer parar de uma vez. O que você orienta?"
opcoes:
  - texto: "Explicar o risco de abstinência em quem bebe pesado quase todos os dias, organizar a redução ou a cessação com acompanhamento próximo, e orientar sinais de alarme que exigem procurar emergência."
    avaliacao: otima
    feedback: "A vontade de parar precisa ser aproveitada e conduzida com segurança. Quem tem consumo pesado quase diário e já bebe pela manhã para aliviar sintomas corre risco real de abstinência grave, que pode incluir convulsão e quadro confusional. A cessação acontece com acompanhamento, orientação e, quando indicado, medicação e vitaminas."
    proximo: fim-otimo
  - texto: "Incentivar a parada imediata e total, aproveitando a motivação, com retorno em um mês."
    avaliacao: erro
    feedback: "A motivação é preciosa e a parada abrupta sem avaliação é perigosa nesse padrão de consumo. O sintoma matinal indica dependência física, e é justamente esse paciente que pode desenvolver abstinência grave em casa, sozinho, entre a consulta e o retorno."
    proximo: fim-dano
  - texto: "Encaminhar ao serviço especializado e aguardar a avaliação antes de qualquer orientação sobre reduzir."
    avaliacao: aceitavel
    feedback: "O encaminhamento é adequado e a espera não pode ser vazia. Enquanto a vaga não sai, cabe orientar sobre segurança, sobre sinais de abstinência e sobre um plano inicial de redução, além de manter retornos curtos para não perder o momento de motivação."
    proximo: c-fila
:::

::: no
tipo: cena
id: c-fila
texto: "A vaga no serviço especializado sai em dois meses. Sem orientação nesse intervalo, ele tenta parar sozinho, passa mal, volta a beber e chega à consulta desanimado, dizendo que tentou e não conseguiu."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com plano de redução acompanhada, reposição vitamínica, retornos quinzenais e encaminhamento ao serviço especializado, ele reduz de forma segura e, em quatro meses, está abstinente. As enzimas hepáticas normalizam em seis meses. Ele conta que o que mudou tudo foi ter sido perguntado sem julgamento."
ensino: "Beber socialmente não é uma quantidade. O rastreio funciona quando as perguntas são concretas: dias por semana, doses por dia, e qual foi o dia de maior consumo no último mês. A devolutiva sem julgamento, ligando o dado ao exame alterado, produz mais mudança que o confronto. E em consumo pesado quase diário, a cessação abrupta e sem acompanhamento traz risco de abstinência grave."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele passa por uma tentativa frustrada de parar sozinho antes de conseguir acompanhamento adequado, e alcança a abstinência quase um ano depois da primeira conversa."
ensino: "A motivação para mudar tem prazo curto. Enquanto o serviço especializado não atende, orientação sobre segurança, plano inicial e retornos curtos são o que evita que a tentativa frustrada vire desistência."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ele para de beber de uma vez, sozinho em casa. Na terceira noite apresenta tremores intensos, agitação e uma crise convulsiva, e é levado à emergência com quadro confusional. Fica internado por seis dias e sai da experiência com muito medo de tentar de novo."
ensino: "Consumo pesado quase diário com sintoma matinal indica dependência física, e nesse cenário a cessação abrupta sem suporte pode causar abstinência grave, com convulsão e quadro confusional. A intenção de parar é ótima notícia e precisa ser conduzida com avaliação, acompanhamento próximo e, quando indicado, medicação."
:::
