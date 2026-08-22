---
id: febre-na-crianca
titulo: Febre em uma criança de 3 anos
contexto: "Você é o interno do pronto-atendimento de pediatria. A mãe entra com Helena, 3 anos, no colo: febre desde ontem à noite e, hoje, uma moleza que ela nunca tinha visto."
tags: [pediatria, emergencia, sinais vitais, temperatura, febre]
topicosDeApoio:
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
referencias:
  - "SBP — Documento Científico nº 206, 15/05/2025: Abordagem da Febre Aguda em Pediatria e Reflexões sobre a Febre nas Arboviroses"
  - "Porto — Semiologia Médica, 8ª ed., cap. 8 (Exame físico geral) e cap. 12 (Exame da pele — manchas hemorrágicas)"
  - "Porto — Exame Clínico, 8ª ed., cap. 21 (Sinais vitais)"
  - "McGee — Evidence-Based Physical Diagnosis, 4ª ed., cap. 18 (Temperature)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A mãe traz o número anotado no celular: 39 graus, medido em casa com um termômetro de testa. Helena está enrolada no cobertor, quieta demais para uma criança de 3 anos, e não estranha você quando você se aproxima."
dados:
  - "Temperatura frontal por infravermelho, referida pela mãe em casa: 39 °C"
  - "Febre iniciada há cerca de 26 horas"
  - "Aceitou pouco líquido hoje; última diurese há mais de 8 horas"
  - "Vacinas em dia, sem doença prévia conhecida"
proximo: d-medida
:::

::: no
tipo: decisao
id: d-medida
pergunta: "Como você registra a temperatura de Helena agora?"
opcoes:
  - texto: "Repetir com o termômetro de infravermelho do serviço, que é rápido e não incomoda a criança."
    avaliacao: aceitavel
    feedback: "Serve para uma triagem rápida, mas é o método de maior variabilidade entre todos. Antes de tomar decisão sobre uma criança prostrada, confirme na axila com termômetro digital."
    proximo: c-axilar
  - texto: "Aceitar os 39 °C da mãe, prescrever antitérmico e reavaliar a temperatura em uma hora."
    avaliacao: erro
    feedback: "Você tratou o número e adiou o exame. Em criança febril, o que decide a conduta é o estado geral — e ele só aparece com a criança despida e examinada, não no visor do termômetro."
    proximo: c-antitermico
  - texto: "Termômetro digital na axila seca, anotando valor, local e horário."
    avaliacao: otima
    feedback: "É a via recomendada para toda criança: bulbo no oco axilar, axila seca, braço apoiado sobre o tórax. Na criança, febre é temperatura axilar ≥ 37,5 °C, e o registro só serve à curva térmica se trouxer junto o local e o horário da aferição."
    proximo: c-axilar
:::

::: no
tipo: cena
id: c-axilar
texto: "A axila estava úmida de suor; você seca, posiciona o bulbo e apoia o bracinho sobre o tórax. Enquanto o minuto passa, você aproveita para contar a respiração e sentir o pulso radial, sem chamar a atenção dela para isso."
dados:
  - "Temperatura axilar (termômetro digital), 14h20: 38,9 °C"
  - "FC 168 bpm; pulso radial fino, de pequena amplitude"
  - "FR 44 irpm"
  - "Sonolenta; abre os olhos ao chamado e volta a fechá-los"
proximo: d-avaliacao
:::

::: no
tipo: decisao
id: d-avaliacao
pergunta: "38,9 °C na axila. O que pesa mais na sua decisão neste momento?"
opcoes:
  - texto: "A intensidade da febre: 38,9 °C é febre alta, então antitérmico agora e nova medida em uma hora."
    avaliacao: erro
    feedback: "Febre alta e febre grave não são a mesma coisa. Há criança com 40 °C brincando na sala de espera e criança com 38 °C em choque. O antitérmico trata o desconforto, não a doença, e a queda da temperatura não é prova de melhora."
    proximo: c-antitermico
  - texto: "Despir a criança por completo e avaliar estado geral, consciência, perfusão, hidratação e pele."
    avaliacao: otima
    feedback: "Esse é o exame que muda a conduta. O número isolado não gradua gravidade: estado geral, hidratação, perfusão e comportamento pesam mais que décimos de grau — e petéquias só aparecem para quem despe a criança."
    proximo: c-petequias
  - texto: "Colher hemograma, PCR, urina e hemocultura e aguardar os resultados para então decidir a conduta."
    avaliacao: erro
    feedback: "Diante de sinais de gravidade, a conduta corre junto com a investigação, nunca depois dela. Colher exames é correto; esperar por eles com a criança assim é o erro."
    proximo: c-espera-exames
:::

::: no
tipo: cena
id: c-petequias
texto: "Com a criança despida, o corpo conta o resto. Espalhadas pelo tronco e pelas pernas há manchas puntiformes, avermelhadas, que não desaparecem quando você comprime a pele. As mãos e os pés estão frios, e a coloração demora a voltar depois que você solta a polpa do dedo."
dados:
  - "Petéquias em tronco e membros inferiores, que não desaparecem à digitopressão"
  - "Extremidades frias, enchimento capilar lentificado"
  - "FR 44 irpm; FC 168 bpm, pulso fino"
  - "Sonolenta, pouco responsiva ao exame"
  - "Rigidez de nuca ausente"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Criança febril com petéquias, taquipneia, pulso fino e rebaixamento do nível de consciência. Qual a conduta?"
opcoes:
  - texto: "Tratar como emergência: acesso venoso, volume, culturas e antimicrobiano precoce."
    avaliacao: otima
    feedback: "Petéquias, taquipneia, má perfusão e sonolência são sinais de gravidade. Nessa situação monitoriza-se, estabiliza-se, colhem-se culturas e o antimicrobiano entra cedo, sem esperar resultado de exame — a hora do antibiótico é parte do prognóstico."
    proximo: fim-otimo
  - texto: "Antitérmico e reavaliação em 24 a 72 horas, orientando a mãe sobre os sinais de alarme."
    avaliacao: erro
    feedback: "Reavaliar em 24 a 72 h é a conduta da criança febril sem sinais de gravidade e sem foco aparente. Aqui os sinais de gravidade já estão na sua frente."
    proximo: fim-dano-atraso
  - texto: "Aguardar hemograma e PCR: se vierem alterados, iniciar o antimicrobiano."
    avaliacao: erro
    feedback: "Exame normal na primeira hora não afasta doença grave, e cada hora de espera conta. A decisão aqui é clínica; o laboratório vem confirmar, não autorizar."
    proximo: fim-dano-atraso
:::

::: no
tipo: cena
id: c-antitermico
texto: "Uma hora depois, o termômetro traz boa notícia e o resto do exame não. A febre cedeu, mas Helena está mais sonolenta, o pulso continua fino e as mãos estão frias. Ao trocar a roupa suada, a mãe chama você: apareceram manchinhas nas pernas."
dados:
  - "Temperatura axilar 36,2 °C após o antitérmico"
  - "FC 172 bpm, pulso fino; extremidades frias"
  - "FR 48 irpm"
  - "Petéquias em membros inferiores e tronco"
  - "Responde apenas ao estímulo vigoroso"
proximo: d-resgate
:::

::: no
tipo: cena
id: c-espera-exames
texto: "Quarenta minutos na sala de espera dos resultados. Quando o hemograma sai, a criança já não interage; a mãe conta que ela ficou 'mole de repente'. Só então você a despe."
dados:
  - "Temperatura axilar 38,7 °C"
  - "Petéquias em tronco e membros inferiores"
  - "Extremidades frias, enchimento capilar lentificado"
  - "FR 48 irpm; FC 174 bpm, pulso fino"
proximo: d-resgate
:::

::: no
tipo: decisao
id: d-resgate
pergunta: "O tempo passou e a criança está pior. O que você faz agora?"
opcoes:
  - texto: "Sinais de gravidade: acesso venoso, volume, culturas e antimicrobiano imediato."
    avaliacao: otima
    feedback: "Certo, e ainda dá tempo de fazer diferença. Monitorize, expanda, colha as culturas e não espere o resultado. O que se perdeu foi tempo, e é justamente ele que não se recupera depois."
    proximo: fim-aceitavel
  - texto: "Nova dose de antitérmico e mais uma hora de observação antes de decidir."
    avaliacao: erro
    feedback: "A temperatura pode até cair de novo, e isso não significa nada. Criança que piora enquanto a febre cede é criança que está entrando em choque."
    proximo: fim-dano-atraso
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Helena é levada à sala de emergência ainda com você ao lado da maca. Acesso, volume, culturas colhidas e a primeira dose do antimicrobiano correndo em menos de uma hora desde a chegada. Na evolução, você registra a temperatura com local e horário, os sinais que motivaram a conduta e o tempo até o antibiótico."
ensino: "Na criança, febre é temperatura axilar ≥ 37,5 °C, aferida com termômetro digital — mas o número serve para caracterizar a febre, não para graduar a gravidade. Quem decide a conduta é a avaliação clínica integrada: estado geral, consciência, perfusão, hidratação e pele. Diante de sinais de gravidade, estabilizar, colher culturas e iniciar o antimicrobiano andam juntos."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O tratamento certo começa, com quase uma hora de atraso. Helena melhora na terapia intensiva, mas a passagem de plantão inclui a frase que ninguém gosta de dizer: 'os sinais estavam lá desde o começo'."
ensino: "Em criança febril, o exame completo com a criança despida é o passo que não pode ser pulado — nem pelo antitérmico, nem pela espera de exames. Perceber o próprio atraso e corrigir a rota ainda muda o desfecho."
:::

::: no
tipo: desfecho
id: fim-dano-atraso
classe: dano
texto: "As petéquias se ampliam e confluem enquanto a conduta espera. Helena chega à terapia intensiva já em choque, com necessidade de droga vasoativa, e o tempo até o antimicrobiano é a variável que a equipe vai discutir na revisão do caso."
ensino: "A febre que cede não é a criança que melhora — e reavaliar em 24 a 72 horas só vale para a criança sem sinais de gravidade. Petéquias, taquipneia, má perfusão, sonolência ou hipotermia paradoxal transformam o caso em emergência, e a espera por exames laboratoriais não é motivo para adiar o antimicrobiano."
:::
