---
id: lista-de-nove-queixas
titulo: A lista de nove queixas
contexto: "Ambulatório de clínica geral, consulta de quinze minutos. Uma mulher de 52 anos senta, tira do bolso um papel dobrado e diz: 'anotei tudo para não esquecer'. São nove itens escritos à mão, de dor de cabeça a formigamento nos pés, passando por azia, cansaço e 'uma coisa estranha no peito'."
tags: [anamnese, polissintomatico, priorizacao, entrevista]
topicosDeApoio:
  - anamnese/entrevista-clinica/interrogatorio-sintomatologico
  - anamnese/entrevista-clinica/queixa-principal-e-hda
  - anamnese/entrevista-clinica/a-entrevista-clinica
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de anamnese e interrogatório sintomatológico"
  - "Semiologia Clínica, 1ª ed., capítulo de anamnese"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção sobre a história clínica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela lê a lista em voz alta, de cima para baixo, sem parar entre os itens. A leitura leva quase três minutos. Ao terminar, olha para você e pergunta: 'por onde a gente começa?'. O relógio marca doze minutos restantes."
dados:
  - "Nove queixas listadas por escrito"
  - "Consulta de 15 minutos, 12 restantes"
  - "Queixas variadas, de meses a anos de evolução"
  - "Uma delas descrita como coisa estranha no peito"
proximo: d-organizacao
:::

::: no
tipo: decisao
id: d-organizacao
pergunta: "Nove queixas e doze minutos. Como você organiza?"
opcoes:
  - texto: "Fazer uma triagem rápida de sinais de alarme em toda a lista, depois pactuar com ela quais duas ou três queixas serão tratadas hoje e quais ficam para o retorno."
    avaliacao: otima
    feedback: "A técnica tem duas etapas e as duas importam. Primeiro varrer a lista inteira à procura do que não pode esperar, porque a queixa perigosa pode estar no item sete. Depois negociar a agenda de forma explícita: dizer quantas cabem hoje e deixar a paciente escolher junto respeita o tempo real e evita que ela saia sentindo que não foi ouvida."
    proximo: c-triagem
  - texto: "Começar pelo primeiro item da lista e ir descendo até o tempo acabar."
    avaliacao: erro
    feedback: "A ordem da lista é a ordem em que ela lembrou, não a ordem de gravidade. Seguir de cima para baixo faz a consulta terminar no item quatro, e o que sobrou pode ser justamente o que importava. Uma varredura rápida antes de aprofundar custa dois minutos e evita esse desfecho."
    proximo: c-consequencia
  - texto: "Pedir que ela escolha a queixa que mais a incomoda e tratar apenas dessa hoje."
    avaliacao: aceitavel
    feedback: "Deixar a escolha com a paciente é respeitoso e resolve a agenda, e tem um risco: o que mais incomoda nem sempre é o que mais ameaça. Uma dor de cabeça diária incomoda mais que um desconforto torácico esporádico aos esforços. Peça a escolha dela depois da varredura, não antes."
    proximo: c-triagem
:::

::: no
tipo: cena
id: c-consequencia
texto: "A consulta avança pelos primeiros itens e o tempo acaba no quarto. O item sobre o peito fica para o retorno, marcado para dali a dois meses. Duas semanas depois ela procura o pronto socorro com o mesmo desconforto, agora mais intenso, e a investigação começa por lá."
proximo: c-triagem
:::

::: no
tipo: cena
id: c-triagem
texto: "Você percorre a lista com perguntas curtas, uma por item, procurando o que não pode esperar. Oito itens são crônicos, estáveis e sem sinal de alarme. No item sobre o peito, ela descreve um aperto no meio do peito que aparece quando sobe a ladeira de casa, dura poucos minutos e passa quando ela para. Começou há dois meses e está acontecendo em ladeiras cada vez menores."
dados:
  - "Oito queixas crônicas e estáveis"
  - "Desconforto torácico aos esforços, aliviado pelo repouso"
  - "Início há 2 meses, com limiar de esforço decrescente"
  - "Hipertensa, ex-tabagista, sem acompanhamento recente"
proximo: d-priorizacao
:::

::: no
tipo: decisao
id: d-priorizacao
pergunta: "O item sete mudou a consulta. O que você faz com os outros oito?"
opcoes:
  - texto: "Explicar com clareza por que hoje a consulta vai tratar deste item, registrar os demais no prontuário e marcar retorno próximo para eles."
    avaliacao: otima
    feedback: "Explicar a mudança de prioridade é o que separa priorizar de ignorar. A paciente precisa entender por que a queixa que ela colocou em sétimo lugar virou a primeira, e precisa sair com data para as outras. Registrar a lista completa também protege o próximo atendimento: as oito queixas continuam existindo."
    proximo: c-caracterizacao
  - texto: "Deixar os outros oito de lado sem mencioná-los e concentrar toda a consulta no desconforto torácico."
    avaliacao: aceitavel
    feedback: "A prioridade está correta, e o silêncio sobre o resto tem custo. A paciente que trouxe nove itens e saiu com um pode entender que os outros foram desprezados, e a próxima lista não virá. Bastam trinta segundos para nomear e agendar."
    proximo: c-caracterizacao
  - texto: "Prescrever alguma coisa para cada uma das nove queixas, para que ela não saia de mãos vazias."
    avaliacao: erro
    feedback: "Nove prescrições em uma consulta de quinze minutos produzem interações, efeitos adversos e nenhuma investigação. A sensação de resolutividade é falsa: a queixa que ameaçava a vida sai tratada com um comprimido para azia, e as outras oito continuam sem diagnóstico."
    proximo: c-caracterizacao
:::

::: no
tipo: cena
id: c-caracterizacao
texto: "Você caracteriza o desconforto com detalhe: aperto retroesternal, previsível pelo esforço, dura de dois a cinco minutos, alivia com repouso, sem relação com alimentação nem com posição. Ao exame, a pressão está em 152 x 94 mmHg, o pulso é regular, a ausculta cardíaca não mostra sopros e os pulmões estão limpos."
dados:
  - "Angina típica pela caracterização"
  - "Limiar de esforço em queda nos últimos 2 meses"
  - "PA 152 x 94 mmHg, ausculta cardíaca normal"
  - "Sem dispneia em repouso, sem edema"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Como você encerra a consulta?"
opcoes:
  - texto: "Tratar como angina estável de padrão progressivo: iniciar terapia antianginosa e antiagregante, orientar sinais de alarme por escrito e encaminhar com prioridade à cardiologia, com retorno próprio em uma semana."
    avaliacao: otima
    feedback: "O padrão descrito é característico, e o que muda o grau de urgência é ele estar progredindo: limiar de esforço que cai em semanas exige avaliação em dias, não em meses. A orientação escrita sobre quando procurar emergência é parte do tratamento, e o retorno próprio garante que a paciente não fique só na fila do especialista."
    proximo: fim-otimo
  - texto: "Solicitar exames laboratoriais e eletrocardiograma de repouso, e reavaliar com os resultados em trinta dias."
    avaliacao: erro
    feedback: "Um eletrocardiograma de repouso normal é o achado esperado em quem só tem sintoma no esforço, e não afasta nada. Trinta dias é tempo demais para um quadro cujo limiar vem caindo. O exame que ajuda é o de esforço ou o de imagem, e a decisão de tratar não espera por ele."
    proximo: fim-dano
  - texto: "Encaminhar à cardiologia e aguardar a avaliação especializada antes de iniciar qualquer medicação."
    avaliacao: aceitavel
    feedback: "O encaminhamento é necessário e a espera não precisa ser vazia. O tratamento inicial da angina estável pode ser começado por qualquer médico, e a orientação sobre sinais de alarme é o que protege a paciente enquanto a consulta não chega."
    proximo: c-fila
:::

::: no
tipo: cena
id: c-fila
texto: "A consulta especializada sai em sete semanas. Nesse intervalo ela tem dois episódios em repouso, que assustam mas passam, e nenhuma orientação sobre o que fazer. Chega ao cardiologista com o quadro mais avançado."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela sai com tratamento iniciado, orientação escrita e consulta de cardiologia em oito dias. O teste mostra isquemia importante, e ela é submetida a angioplastia eletiva, sem nunca ter tido infarto. Nas consultas seguintes, as outras oito queixas são tratadas uma a uma, com tempo."
ensino: "Diante de uma lista longa, a primeira tarefa não é aprofundar, é varrer: perguntas curtas em todos os itens à procura do que não pode esperar. Só depois se pactua a agenda do dia, de forma explícita. A ordem em que o paciente lista suas queixas é a ordem da memória dele, nunca a da gravidade, e a queixa perigosa costuma estar no meio."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela é avaliada sete semanas depois, já com angina em repouso, e precisa de internação para o procedimento em vez de fazê-lo de forma eletiva."
ensino: "O tratamento inicial da angina estável não depende do especialista. Enquanto a consulta não chega, medicação, orientação escrita de sinais de alarme e retorno próprio são o que sustenta o paciente."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "O eletrocardiograma de repouso vem normal, como esperado, e a reavaliação fica para dali a um mês. Vinte dias depois ela chega ao pronto socorro com infarto de parede anterior e sequela de função ventricular."
ensino: "Exame normal em repouso não afasta doença que só se manifesta no esforço. Quando o padrão da dor é típico e o limiar vem caindo, o prazo da reavaliação se mede em dias, e o tratamento começa antes do resultado."
:::
