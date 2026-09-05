---
id: dor-que-caminhou
titulo: A dor que caminhou até a fossa direita
contexto: "Pronto atendimento, fim de manhã. Uma mulher de 24 anos chega andando devagar, meio curvada, com a mão espalmada sobre o lado direito do baixo ventre. A acompanhante conta que ontem a dor era 'no meio da barriga' e hoje mudou de endereço."
tags: [abdome, dor abdominal, apendicite, peritonite, emergencia]
topicosDeApoio:
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
  - abdome/exame-do-abdome/palpacao-do-abdome
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 52 (Abdominal Pain and Tenderness)"
  - "Porto, Semiologia Médica, 8ª ed., Parte 10 (Sistema digestivo)"
  - "Semiologia Clínica, 1ª ed., cap. 11 (O exame do abdome)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela conta que a dor começou ontem à tarde ao redor do umbigo, vaga, e que hoje de manhã 'desceu e encostou' na fossa ilíaca direita, agora contínua e pior ao andar. Não quis almoçar, teve náusea e um episódio de vômito. Dor 8 em 10. Pergunta se pode tomar algo, porque 'está demais'."
dados:
  - "FC 92 bpm"
  - "PA 118 x 76 mmHg"
  - "FR 18 irpm"
  - "Temperatura axilar 37,6 °C"
  - "Último ciclo menstrual há duas semanas, regular"
proximo: d-analgesia
:::

::: no
tipo: decisao
id: d-analgesia
pergunta: "Ela pede analgesia antes mesmo de você examinar. O que você faz?"
opcoes:
  - texto: "Prescrever a analgesia agora e examinar em seguida, sem esperar a dor passar."
    avaliacao: otima
    feedback: "A evidência derrubou o ensinamento antigo: a analgesia oferecida ao paciente com dor abdominal aguda não reduz a acurácia dos sinais individuais nem a acurácia diagnóstica global do examinador. Deixar o paciente sofrer 'para não mascarar o exame' não se sustenta nos dados, e um exame com o paciente colaborativo costuma render mais."
    proximo: c-exame
  - texto: "Segurar a analgesia até o fim do exame e da avaliação do cirurgião: dor mascarada é diagnóstico perdido."
    avaliacao: erro
    feedback: "Esse é o mito. Os estudos que compararam examinadores com e sem analgesia prévia não encontraram perda de acurácia nos sinais nem no diagnóstico global. O que a espera garante não é um exame melhor: é uma paciente exausta, tensa e com menos confiança em você."
    proximo: c-exame-tensa
  - texto: "Oferecer só um antiespasmódico fraco, guardando o opioide para depois da decisão cirúrgica."
    avaliacao: aceitavel
    feedback: "Tratar a dor de forma insuficiente por precaução diagnóstica é meio caminho entre o mito e a evidência. A analgesia plena não rouba sinais do examinador; titule pela dor, não pelo medo de mascarar."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com a dor mais tolerável, ela deita com os joelhos semifletidos e aponta com um dedo o ponto que mais dói, na fossa ilíaca direita. Você começa a palpação longe da dor, superficial antes de profunda. Há dor localizada à palpação do quadrante inferior direito, com defesa que diminui quando você a distrai conversando, mas não desaparece. A percussão leve sobre a área desperta dor. Quando tosse, ela se encolhe e leva a mão ao mesmo ponto."
dados:
  - "Dor máxima à palpação do quadrante inferior direito"
  - "Defesa localizada, que persiste parcialmente sob distração"
  - "Percussão leve dolorosa no quadrante inferior direito"
  - "Teste da tosse positivo, dor apontada no mesmo ponto"
  - "Ruídos hidroaéreos presentes, sem alteração chamativa"
proximo: d-manobras
:::

::: no
tipo: cena
id: c-exame-tensa
texto: "Você examina com ela ainda com dor 8 em 10. A parede inteira parece reagir à sua mão, e é difícil dizer o que é defesa localizada e o que é contração voluntária de quem só quer que o exame acabe. Mesmo assim, o quadrante inferior direito dói mais que o resto, a percussão leve ali desperta dor e a tosse a faz encolher. Ao final, você reconhece o atraso e prescreve a analgesia."
dados:
  - "Dor máxima à palpação do quadrante inferior direito"
  - "Contração difusa de difícil interpretação durante o exame"
  - "Percussão leve dolorosa no quadrante inferior direito"
  - "Teste da tosse positivo"
proximo: d-manobras
:::

::: no
tipo: decisao
id: d-manobras
pergunta: "Os achados apontam para o quadrante inferior direito. Que manobra acrescentar para fechar o raciocínio?"
opcoes:
  - texto: "Pesquisar o sinal do psoas e somar os achados em um escore estruturado, sem insistir na descompressão brusca."
    avaliacao: otima
    feedback: "Boa escolha dupla. O sinal do psoas eleva modestamente a probabilidade de apendicite (razão de verossimilhança 2,0, uma elevação pequena), e a percussão dolorosa que você já tem rende números melhores que a descompressão brusca, com uma manobra que a paciente tolera. Somar os achados em um escore transforma impressões em probabilidade."
    proximo: c-escore
  - texto: "Repetir a descompressão brusca com força, mais de uma vez, até ter certeza do rebote."
    avaliacao: erro
    feedback: "Muitos cirurgiões experientes desencorajam essa manobra, qualificando-a de desnecessária e cruel quando a palpação suave já deixou o quadro óbvio. Os números explicam a crítica: razão de verossimilhança 2,0 quando presente e 0,4 quando ausente, movendo a probabilidade menos que a rigidez e a percussão dolorosa. Repetir com força só acrescenta sofrimento."
    proximo: c-escore
  - texto: "Pesquisar o sinal do obturador, que é específico da pelve."
    avaliacao: aceitavel
    feedback: "A intenção anatômica é boa, mas os estudos disponíveis não mostraram utilidade do sinal do obturador, e a ausência dele não reduz a probabilidade. Se for escolher um sinal de vizinhança, o psoas ao menos eleva modestamente a probabilidade quando presente."
    proximo: c-escore
:::

::: no
tipo: cena
id: c-escore
texto: "Você soma o que tem na mão: a dor migrou da região periumbilical para o quadrante inferior direito, há anorexia, náusea com vômito, dor localizada no quadrante inferior direito, dor à descompressão referida no ponto e temperatura de 37,6 °C. O hemograma chega: 13.400 leucócitos, com 78% de neutrófilos. No escore de Alvarado, isso dá 9 pontos de 10."
dados:
  - "Escore de Alvarado: 9 pontos (migração 1, anorexia 1, náusea 1, dor no QID 2, descompressão 1, temperatura 1, leucocitose 2, desvio 0 ou 1 conforme o corte)"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Alvarado 9, exame convergente. Qual é o próximo passo?"
opcoes:
  - texto: "Acionar a cirurgia agora, com a paciente em jejum, hidratada e analgesiada, apresentando os achados e o escore."
    avaliacao: otima
    feedback: "Escore de 7 ou mais eleva a probabilidade de apendicite (razão de verossimilhança 3,1, uma elevação moderada sobre uma probabilidade que já era alta), e o conjunto do quadro é clássico. A decisão sobre imagem pré-operatória é do time cirúrgico; o seu trabalho, exame rigoroso e probabilidade explícita, está pronto e bem registrado."
    proximo: fim-otimo
  - texto: "Prescrever sintomáticos e reavaliar em casa amanhã: pode ser uma gastroenterite começando."
    avaliacao: erro
    feedback: "Com migração da dor, defesa, percussão dolorosa e Alvarado 9, mandar para casa é entregar a evolução natural à sorte: a perfuração. Gastroenterite não escolhe um ponto fixo na fossa direita nem produz defesa que resiste à distração."
    proximo: fim-dano
  - texto: "Internar para observação com reexame abdominal seriado a cada poucas horas, sem acionar ninguém ainda."
    avaliacao: aceitavel
    feedback: "O reexame seriado é a manobra mais subestimada do abdome agudo, e seria a escolha certa num quadro indeterminado. Aqui, com probabilidade alta e convergente, ele só adia a avaliação de quem opera. Observe enquanto a cirurgia não chega, não em vez de chamá-la."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "Três horas depois, no reexame, a defesa localizada virou contratura que não cede sob distração, e a dor à percussão leve se espalhou para além do ponto inicial. Você aciona a cirurgia com urgência, agora com achados de peritonite em progressão."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A cirurgia avalia, a imagem confirma e ela vai ao centro cirúrgico no início da tarde: apendicite aguda, sem perfuração. No prontuário, a história da migração, os sinais com seus nomes, o escore calculado e a hora de cada reavaliação."
ensino: "A apendicite se constrói por convergência: a migração da dor, a dor localizada no quadrante inferior direito, a defesa que resiste à distração, a percussão leve dolorosa e o escore que soma tudo. Analgesia não rouba sinais do examinador, e a descompressão brusca acrescenta pouco ao que a palpação cuidadosa já disse."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela é operada à noite, com o apêndice já em sofrimento avançado, sem perfuração por pouco. A recuperação é boa, mas a discussão do caso gira em torno das três horas entre o Alvarado 9 e o chamado."
ensino: "O reexame seriado é ferramenta poderosa para o quadro indeterminado, não para o quadro convergente. Quando a probabilidade já é alta, observar sem acionar quem decide é confundir prudência com atraso. A contratura que não cede sob distração é a parede avisando que o tempo acabou."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ela volta de madrugada em ambulância, pálida, taquicárdica, com o abdome em tábua e dor à percussão em todos os quadrantes. A tomografia mostra apendicite perfurada com líquido livre. A cirurgia é maior, a internação é longa e a conversa com a família começa com um pedido de desculpas."
ensino: "Alta na dor abdominal aguda exige probabilidade baixa, e o exame desta paciente dizia o contrário em todas as linhas. Os sinais de peritonite localizada (defesa que persiste sob distração, percussão leve dolorosa, tosse positiva) pesam mais que a aparência estável dos sinais vitais: a fisiologia jovem compensa até deixar de compensar."
:::
