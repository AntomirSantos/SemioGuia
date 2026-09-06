---
id: adolescente-que-respirava-fundo
titulo: O adolescente que respirava fundo demais
contexto: "Pronto atendimento, domingo à tarde. Um rapaz de 16 anos chega levado pela mãe por vômitos e dor abdominal há um dia. Ela conta que ele emagreceu bastante nos últimos dois meses, bebe água o tempo todo e levanta várias vezes à noite para urinar. Ninguém na família tem diabetes."
tags: [geral, cetoacidose, desidratacao, respiracao]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/antropometria-e-hidratacao
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
  - abdome/exame-do-abdome/palpacao-do-abdome
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de sinais vitais, hidratação e padrões respiratórios"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame geral e de distúrbios metabólicos"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está deitado, quieto, e respira de um jeito que chama atenção: movimentos amplos, profundos, regulares, sem parecer ofegante. Não usa musculatura acessória. Quando você se aproxima, sente um cheiro adocicado no hálito. A mãe pergunta se pode ser 'virose com desidratação'."
dados:
  - "Vômitos e dor abdominal há 24 horas"
  - "Perda de peso, sede intensa e urina abundante há 2 meses"
  - "FR 30 irpm, respiração ampla e profunda"
  - "FC 124 bpm, PA 102 x 60 mmHg"
  - "Mucosas secas, turgor cutâneo reduzido"
proximo: d-respiracao
:::

::: no
tipo: decisao
id: d-respiracao
pergunta: "A respiração é ampla, profunda e regular, sem esforço aparente. O que ela indica?"
opcoes:
  - texto: "Compensação respiratória de uma acidose metabólica: junto com a perda de peso, a sede e a poliúria, o quadro aponta cetoacidose diabética."
    avaliacao: otima
    feedback: "Esse padrão respiratório tem nome próprio e significado preciso: o organismo elimina gás carbônico para compensar a acidose. Ele não vem com esforço, o que confunde quem procura dispneia, e por isso é frequentemente descrito como ansiedade. Somado à história de emagrecimento, sede e urina abundante em adolescente, o diagnóstico está montado antes de qualquer exame."
    proximo: c-exame
  - texto: "Ansiedade e hiperventilação pela dor abdominal: acalmar o paciente e reavaliar."
    avaliacao: erro
    feedback: "A hiperventilação ansiosa costuma ser irregular, superficial e acompanhada de formigamento nas mãos e ao redor da boca. Aqui a respiração é ampla, profunda e regular, e vem com desidratação, taquicardia e uma história de dois meses que ninguém quis explicar. Chamar de ansiedade é o desvio mais perigoso deste caso."
    proximo: c-atraso
  - texto: "Compensação de um quadro pulmonar ainda não identificado: solicitar radiografia de tórax."
    avaliacao: aceitavel
    feedback: "Não há tosse, febre, dor pleurítica nem achado no exame do tórax. A radiografia pode entrar depois, e a glicemia capilar responde a pergunta agora, em menos de um minuto e ao lado do paciente."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Uma hora depois ele está mais sonolento e a mãe diz que ele 'não está prestando atenção'. A glicemia capilar é finalmente medida e o aparelho mostra apenas a indicação de valor acima do limite de leitura."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A glicemia capilar ultrapassa o limite de leitura do aparelho. As mucosas estão secas, o turgor da pele demora a retornar, os olhos parecem encovados e ele não urina desde a manhã. O abdome está difusamente doloroso à palpação, sem defesa e sem descompressão dolorosa. Ele responde às perguntas, mas com lentidão."
dados:
  - "Glicemia capilar acima do limite do aparelho"
  - "Sinais de desidratação importante"
  - "Dor abdominal difusa sem sinais peritoneais"
  - "Lentificação, mas ainda orientado"
  - "FC 128 bpm, PA 98 x 58 mmHg"
proximo: d-abdome
:::

::: no
tipo: decisao
id: d-abdome
pergunta: "Ele tem dor abdominal importante e vômitos. Vale investigar abdome agudo cirúrgico agora?"
opcoes:
  - texto: "Tratar primeiro a cetoacidose e reavaliar o abdome depois das primeiras horas: a dor costuma ser manifestação da própria acidose e cede com o tratamento."
    avaliacao: otima
    feedback: "Dor abdominal é queixa comum na cetoacidose, sobretudo quando a acidose é intensa, e desaparece à medida que ela se corrige. Como não há defesa nem descompressão dolorosa, e existe explicação metabólica suficiente, o caminho é tratar e reexaminar. Se a dor persistir depois de corrigida a acidose, aí sim ela precisa de outra explicação."
    proximo: c-tratamento
  - texto: "Solicitar tomografia de abdome antes de iniciar o tratamento, para não perder uma causa cirúrgica."
    avaliacao: erro
    feedback: "A tomografia antes do tratamento adia a hidratação e a insulina em um paciente que está perdendo volume e acidificando a cada hora. E o risco de contraste em quem está desidratado é real. Aqui a sequência correta é tratar, reavaliar e só investigar se a dor não acompanhar a melhora metabólica."
    proximo: c-atraso-tc
  - texto: "Chamar o cirurgião para avaliação conjunta antes de qualquer conduta."
    avaliacao: aceitavel
    feedback: "Pedir ajuda nunca é errado, e o cirurgião provavelmente dirá o mesmo: sem sinais peritoneais e com acidose grave, trate primeiro. O cuidado é não deixar a interconsulta atrasar a hidratação, que precisa começar já."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-atraso-tc
texto: "A tomografia leva noventa minutos e não mostra causa cirúrgica. Nesse intervalo ele fica mais sonolento, e o tratamento começa com o paciente pior do que estava na chegada."
proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você inicia a reposição de volume e providencia a insulina. O laboratório confirma acidose metabólica com cetonemia e informa um potássio sérico de 3,2 miliequivalentes por litro, valor baixo. A insulina já está preparada."
dados:
  - "Acidose metabólica com cetonemia confirmada"
  - "Potássio sérico 3,2 mEq/L"
  - "Reposição volêmica em curso"
proximo: d-potassio
:::

::: no
tipo: decisao
id: d-potassio
pergunta: "O potássio está baixo e a insulina está pronta. O que você faz?"
opcoes:
  - texto: "Adiar a insulina e repor potássio primeiro, iniciando a insulina apenas quando o valor estiver em faixa segura."
    avaliacao: otima
    feedback: "A insulina empurra potássio para dentro da célula e derruba ainda mais o valor sérico. Em paciente que já começa hipocalêmico, essa queda pode produzir arritmia grave e fraqueza muscular respiratória. É uma das poucas situações em que a droga central do tratamento precisa esperar por outra."
    proximo: fim-otimo
  - texto: "Iniciar a insulina imediatamente, porque a acidose é o problema principal, e repor potássio em paralelo."
    avaliacao: erro
    feedback: "A reposição em paralelo não acompanha a velocidade da queda provocada pela insulina. Com potássio já baixo antes de começar, o risco de arritmia é imediato. A ordem correta é conhecida e simples: corrigir o potássio primeiro, insulina depois."
    proximo: fim-dano
  - texto: "Iniciar insulina em dose reduzida enquanto repõe potássio, para não perder tempo na correção da acidose."
    avaliacao: aceitavel
    feedback: "A dose menor reduz, mas não elimina, o deslocamento de potássio para dentro da célula. Com valor de 3,2 a recomendação é esperar. A pressa aqui rende pouco: a hidratação isolada já melhora a glicemia e a perfusão enquanto o potássio sobe."
    proximo: c-insulina-precoce
:::

::: no
tipo: cena
id: c-insulina-precoce
texto: "Com a insulina em dose reduzida, o potássio cai para 2,8 e ele apresenta extrassístoles frequentes no monitor. A insulina é suspensa, a reposição de potássio é intensificada e o tratamento recomeça duas horas depois, sem consequências permanentes."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O potássio sobe para 4,0 com a reposição, a insulina começa em seguida e a acidose se corrige ao longo da noite. A dor abdominal desaparece junto com ela, sem que nenhuma imagem tenha sido necessária. Ele recebe o diagnóstico de diabetes tipo 1, e a mãe sai do hospital sabendo aplicar insulina e reconhecer os sinais de descompensação."
ensino: "Respiração ampla, profunda e regular, sem esforço, é compensação de acidose metabólica, e não ansiedade. Em adolescente com emagrecimento, sede e urina abundante, ela aponta cetoacidose. Dor abdominal faz parte do quadro e costuma ceder com o tratamento. E antes da insulina, olhe o potássio: a droga que trata a doença também derruba o íon que mantém o ritmo cardíaco."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera bem, depois de um episódio de arritmia que exigiu suspensão temporária da insulina e monitorização contínua. A internação dura quatro dias."
ensino: "Reduzir a dose de insulina não protege da queda do potássio, apenas a torna mais lenta. Com valor abaixo da faixa segura, a conduta é repor primeiro e só então iniciar a insulina."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Quarenta minutos após o início da insulina, o potássio cai para 2,4 e ele apresenta taquicardia ventricular com instabilidade. É necessário desfibrilar e transferir para terapia intensiva, com intubação por fraqueza muscular respiratória. Ele sobrevive, com dez dias de internação."
ensino: "A insulina desloca potássio para dentro da célula, e esse efeito é imediato. Em cetoacidose com potássio baixo à admissão, iniciar a insulina antes da reposição é uma das causas evitáveis de arritmia grave. Olhar o potássio antes de pendurar a insulina é regra, não cautela excessiva."
:::
