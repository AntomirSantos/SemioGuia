---
id: tontura-que-vinha-em-crises
titulo: A tontura que vinha em crises
contexto: "Ambulatório de clínica geral. Uma mulher de 58 anos vem por tontura há três semanas. Ela usa a palavra tontura para várias coisas diferentes ao longo da conversa: às vezes descreve o mundo girando, às vezes uma sensação de desmaio ao levantar. Já tomou dois remédios diferentes indicados na farmácia."
tags: [cabeca e pescoco, vertigem, tontura, manobras]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/boca-nariz-e-ouvidos
  - sistema-nervoso/exame-neurologico/marcha-e-sinais-meningeos
  - sistema-nervoso/exame-neurologico/pares-cranianos-i-a-vi
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame dos ouvidos e de vertigem"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame vestibular e do equilíbrio"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia de cabeça e pescoço"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela descreve as crises: acontecem ao virar na cama para a direita e ao levantar a cabeça para pegar algo no armário. Duram menos de um minuto, o mundo gira e ela precisa se segurar. Entre as crises fica bem, com uma sensação de insegurança que dura algumas horas. Nega perda auditiva e zumbido."
dados:
  - "Tontura rotatória em crises de menos de 1 minuto"
  - "Desencadeada por mudanças de posição da cabeça"
  - "Sem perda auditiva, sem zumbido"
  - "Assintomática entre as crises"
  - "PA 128 x 78 mmHg deitada e em pé, sem variação relevante"
proximo: d-caracterizacao
:::

::: no
tipo: decisao
id: d-caracterizacao
pergunta: "Ela usa a palavra tontura para coisas diferentes. Como você organiza a queixa?"
opcoes:
  - texto: "Pedir que descreva sem usar a palavra tontura, e classificar pelo tempo de duração e pelos gatilhos, que informam mais do que pedir para escolher entre vertigem e desequilíbrio."
    avaliacao: otima
    feedback: "Pedir ao paciente que rotule a própria tontura costuma render pouco, porque a palavra cobre sensações muito diferentes. O que discrimina bem é a estrutura temporal: quanto dura cada episódio, o que dispara, o que acontece entre eles. Segundos com gatilho posicional apontam um caminho; horas espontâneas apontam outro; contínua e progressiva, outro ainda."
    proximo: c-exame
  - texto: "Perguntar diretamente se é vertigem rotatória, pré-síncope ou desequilíbrio, e seguir a resposta dela."
    avaliacao: aceitavel
    feedback: "A classificação clássica em três tipos é útil como organização mental do médico, e é frágil quando entregue ao paciente para escolher. Boa parte das pessoas marca mais de uma opção ou muda de resposta durante a consulta. Use o tempo e os gatilhos como eixo, e a classificação como consequência."
    proximo: c-exame
  - texto: "Solicitar tomografia de crânio, já que tontura em pessoa acima dos cinquenta pode ser vascular."
    avaliacao: erro
    feedback: "A imagem antes do exame é o caminho mais caro e menos eficaz nesta queixa. A tomografia é ruim justamente para ver a fossa posterior, que é onde estaria a causa central, e vem normal na maioria dos casos periféricos. O que separa central de periférico é o exame à beira do leito."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Ao exame, os movimentos oculares estão normais e não há nistagmo espontâneo. A força e a sensibilidade estão preservadas, a coordenação está normal e ela caminha sem desvio, inclusive com os olhos fechados. A audição parece simétrica à conversa. Você realiza a manobra que provoca a crise: ao deitar a paciente com a cabeça rodada para a direita e levemente pendente, surge após alguns segundos um nistagmo com componente rotatório, acompanhado da tontura que ela reconhece, e que se esgota em menos de um minuto."
dados:
  - "Sem nistagmo espontâneo"
  - "Exame neurológico e marcha normais"
  - "Manobra posicional positiva à direita, com latência e esgotamento"
  - "Nistagmo com componente rotatório, fatigável"
proximo: d-interpretacao
:::

::: no
tipo: decisao
id: d-interpretacao
pergunta: "A manobra reproduziu a crise. O que os detalhes do nistagmo informam?"
opcoes:
  - texto: "Latência de alguns segundos, componente rotatório, duração curta e esgotamento com a repetição apontam causa periférica, e o tratamento é uma manobra de reposicionamento na própria consulta."
    avaliacao: otima
    feedback: "Esses quatro detalhes formam a assinatura periférica. O nistagmo central costuma aparecer sem latência, mudar de direção conforme o olhar, ser puramente vertical e não se esgotar com a repetição. Reconhecer o padrão periférico permite tratar ali mesmo, com uma manobra que resolve a maioria dos casos sem remédio nenhum."
    proximo: c-tratamento
  - texto: "Confirmam a origem vestibular, e o tratamento é sintomático com supressor vestibular por algumas semanas."
    avaliacao: erro
    feedback: "Supressores vestibulares usados de forma prolongada atrapalham a compensação central, prolongam os sintomas e, no idoso, aumentam risco de queda e de confusão. Eles têm papel curto em crises intensas e não são tratamento desta condição, que se resolve mecanicamente."
    proximo: c-supressor
  - texto: "São compatíveis com causa periférica, e o encaminhamento ao otorrinolaringologista resolve."
    avaliacao: aceitavel
    feedback: "O encaminhamento é razoável quando a manobra de tratamento não é dominada, e vale lembrar que ela pode ser feita na consulta por qualquer médico treinado, com alívio na mesma sessão. Encaminhar sem tratar deixa a paciente semanas sintomática por uma condição que resolve em minutos."
    proximo: c-encaminhamento
:::

::: no
tipo: cena
id: c-supressor
texto: "Com o supressor vestibular, ela fica sonolenta, as crises continuam ao virar na cama e ela quase cai duas vezes ao levantar de madrugada. Volta em duas semanas pior, e o tratamento correto é finalmente feito."
proximo: c-tratamento
:::

::: no
tipo: cena
id: c-encaminhamento
texto: "A consulta especializada sai em seis semanas, e ela passa esse período evitando virar a cabeça e dormindo sentada. A manobra é feita na primeira consulta com o especialista e resolve o quadro em uma sessão."
proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você realiza a manobra de reposicionamento na própria consulta. Ao final da sequência, ela relata que a sensação passou. Repetida a manobra diagnóstica, o nistagmo não reaparece. Ela pergunta se pode voltar a dormir normalmente e se isso volta."
dados:
  - "Manobra de reposicionamento realizada em consulta"
  - "Manobra diagnóstica negativa após o tratamento"
  - "Paciente assintomática ao fim da sessão"
proximo: d-orientacao
:::

::: no
tipo: decisao
id: d-orientacao
pergunta: "Como você orienta a alta desta consulta?"
opcoes:
  - texto: "Explicar que a condição é benigna e pode recorrer, ensinar a reconhecer a crise, orientar retorno se surgirem sinais diferentes e listar por escrito o que seriam sinais de alarme."
    avaliacao: otima
    feedback: "Recorrência é comum e a paciente precisa saber disso para não interpretar como falha do tratamento. Mais importante ainda é ensinar o que não é essa doença: tontura contínua, associada a fala arrastada, visão dupla, fraqueza, perda auditiva nova ou desequilíbrio para andar pede avaliação imediata, porque aí a origem pode ser central."
    proximo: fim-otimo
  - texto: "Dar alta dizendo que está resolvido, sem necessidade de retorno."
    avaliacao: erro
    feedback: "A alta sem orientação deixa a paciente sem referência para o futuro. Se a tontura voltar com outras características, ela pode assumir que é a mesma coisa e demorar a procurar ajuda, e é justamente esse cenário que atrasa o diagnóstico de causas centrais."
    proximo: fim-dano
  - texto: "Prescrever exercícios de reabilitação vestibular para casa e reavaliar em um mês."
    avaliacao: aceitavel
    feedback: "Os exercícios têm papel, sobretudo quando persiste insegurança postural depois da resolução das crises. O que não pode faltar é a orientação sobre recorrência e sobre sinais de alarme, que é o que protege a paciente no intervalo."
    proximo: c-exercicios
:::

::: no
tipo: cena
id: c-exercicios
texto: "Ela faz os exercícios, melhora e não retorna. Meses depois procura o serviço com um episódio de tontura diferente, contínua, que ela demorou dez dias a valorizar por achar que era 'aquela mesma coisa'."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela sai da consulta sem tontura, com a explicação do que aconteceu e uma lista escrita de sinais que exigiriam nova avaliação. Sete meses depois tem uma recorrência, reconhece o padrão, procura a unidade e resolve em uma sessão."
ensino: "Nesta queixa, o que discrimina é a estrutura temporal: quanto dura, o que dispara, como fica entre as crises. O nistagmo periférico tem latência, componente rotatório, dura pouco e se esgota; o central não se esgota e muda de direção. A forma posicional benigna se trata com manobra de reposicionamento na própria consulta, e supressor vestibular prolongado atrapalha a compensação."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O quadro se resolve, e meses depois ela demora dez dias para procurar ajuda diante de uma tontura de características diferentes, por não saber distinguir uma da outra."
ensino: "Orientar sobre recorrência é bom; orientar sobre o que não é essa doença é melhor. Uma lista curta e escrita de sinais de alarme é o que permite ao paciente distinguir a recidiva benigna de um quadro novo e grave."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Cinco meses depois ela apresenta tontura contínua com desequilíbrio para andar e visão dupla intermitente. Assume ser a mesma coisa e espera duas semanas. A avaliação revela um acidente vascular de fossa posterior já instalado, com sequela de equilíbrio."
ensino: "Alta sem orientação transfere ao paciente uma decisão que ele não tem como tomar. Quem sai com o rótulo de tontura benigna precisa levar por escrito o que faria a próxima tontura ser diferente: sintoma contínuo, alteração de fala, visão dupla, fraqueza ou desequilíbrio ao andar."
:::
