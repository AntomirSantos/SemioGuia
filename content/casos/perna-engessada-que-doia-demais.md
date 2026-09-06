---
id: perna-engessada-que-doia-demais
titulo: A perna engessada que doía demais
contexto: "Pronto socorro ortopédico, madrugada. Um rapaz de 22 anos voltou hoje à tarde com a perna imobilizada após redução de uma fratura de tíbia sofrida num acidente de moto. Ele retorna dizendo que a dor está insuportável, muito pior do que era quando saiu, e que já tomou dois analgésicos em casa sem nenhum efeito."
tags: [osteoarticular, sindrome compartimental, dor desproporcional, emergencia]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/principios-do-exame-osteoarticular
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
  - sistema-nervoso/exame-neurologico/sensibilidade-e-coordenacao
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame musculoesquelético e vascular"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho locomotor"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia osteoarticular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está inquieto na maca, mudando de posição o tempo todo, e chora de dor. Diz que a dor não é no lugar da fratura, é 'na batata da perna toda', e que parece que a perna vai estourar. Os dedos do pé estão levemente inchados e ele reclama de formigamento entre o primeiro e o segundo dedo."
dados:
  - "Fratura de tíbia reduzida e imobilizada há 9 horas"
  - "Dor progressiva, desproporcional, sem resposta a analgesia comum"
  - "Sensação de tensão em toda a panturrilha"
  - "Formigamento no dorso do pé"
  - "FC 108 bpm, temperatura 36,8 graus"
proximo: d-triagem
:::

::: no
tipo: decisao
id: d-triagem
pergunta: "Dor intensa em pós-operatório recente. Qual é a sua primeira leitura?"
opcoes:
  - texto: "Dor desproporcional e progressiva, que não responde à analgesia, é sinal de alarme: abrir o gesso imediatamente e examinar o compartimento."
    avaliacao: otima
    feedback: "Este é o achado mais precoce e mais importante da síndrome compartimental: dor fora de proporção com a lesão e que piora apesar da analgesia. Abrir a imobilização é gesto diagnóstico e terapêutico ao mesmo tempo, e nada se perde ao fazê-lo. O erro mais comum é justamente atribuir a dor à fratura e aumentar a dose."
    proximo: c-exame
  - texto: "Dor esperada de fratura recente: aumentar a analgesia, associando opioide, e reavaliar em duas horas."
    avaliacao: erro
    feedback: "Aumentar a analgesia sem examinar apaga o único sinal precoce disponível e compra duas horas ao preço de músculo e nervo. Fratura reduzida e imobilizada dói, mas a dor melhora com repouso e analgesia. Dor que piora contra a analgesia é outra coisa."
    proximo: c-atraso
  - texto: "Provável trombose venosa profunda pós-traumática: solicitar ultrassom com doppler."
    avaliacao: aceitavel
    feedback: "A trombose é frequente após trauma e imobilização e merece ficar na lista. O tempo é que não fecha: nove horas de imobilização com dor explosiva e formigamento apontam para pressão dentro do compartimento, e essa hipótese precisa ser afastada primeiro, porque o relógio dela é de horas."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Duas horas depois ele está pior, agora com dificuldade para mexer os dedos e com dor mesmo em repouso. A imobilização é finalmente aberta e a perna aparece tensa, brilhante e endurecida."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com o gesso aberto e a perna livre, a panturrilha está tensa, endurecida, e dói mesmo ao toque leve. A extensão passiva dos dedos do pé provoca dor intensa na musculatura da perna. A sensibilidade entre o primeiro e o segundo dedo está diminuída em comparação ao lado oposto. Os pulsos pedioso e tibial posterior estão presentes, e o pé tem temperatura preservada."
dados:
  - "Compartimento tenso e endurecido à palpação"
  - "Dor intensa ao estiramento passivo dos dedos"
  - "Hipoestesia no primeiro espaço interdigital"
  - "Pulsos distais presentes, pé quente"
proximo: d-pulso
:::

::: no
tipo: decisao
id: d-pulso
pergunta: "Os pulsos estão presentes e o pé está quente. Isso afasta o diagnóstico?"
opcoes:
  - texto: "Não afasta nada: o pulso costuma estar presente na síndrome compartimental, porque a pressão que fecha os capilares é bem menor que a necessária para abolir o pulso arterial."
    avaliacao: otima
    feedback: "É a armadilha mais perigosa deste diagnóstico. A pressão dentro do compartimento sufoca a microcirculação muito antes de comprimir a artéria principal, e por isso o pulso segue palpável enquanto o músculo já está morrendo. Esperar o pulso desaparecer é esperar a perda do membro."
    proximo: c-conduta
  - texto: "Afasta em grande parte: com pulso presente e pé quente, a perfusão está garantida e o quadro pode ser observado."
    avaliacao: erro
    feedback: "Perfusão de pele e de músculo não são a mesma coisa. O pé pode estar quente e rosado enquanto o compartimento sofre isquemia, e é exatamente por isso que a ausência de pulso é sinal tardio. Observar com base nesse raciocínio custa a função da perna."
    proximo: c-conduta
  - texto: "Não afasta, mas convém medir a pressão do compartimento antes de qualquer decisão cirúrgica."
    avaliacao: aceitavel
    feedback: "A medida é útil sobretudo em paciente inconsciente ou com exame duvidoso. Neste rapaz, o quadro clínico já é típico: dor desproporcional, compartimento tenso, dor ao estiramento passivo e déficit sensitivo. Quando o exame é claro, a medida não deve atrasar a cirurgia."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "O ortopedista de plantão está terminando outra cirurgia e chega em vinte minutos. A perna segue tensa, e o rapaz agora tem dificuldade para mover ativamente os dedos. A pressão do compartimento, medida à beira do leito, está bastante elevada."
dados:
  - "Movimento ativo dos dedos reduzido"
  - "Pressão de compartimento elevada"
  - "Cerca de 11 horas desde a imobilização"
  - "Pulsos ainda presentes"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Qual é o tratamento e com que urgência?"
opcoes:
  - texto: "Fasciotomia de urgência, com a perna mantida no nível do coração, sem elevar o membro e sem aplicar gelo."
    avaliacao: otima
    feedback: "A única coisa que resolve é abrir a fáscia, e a janela é de poucas horas: depois disso a necrose muscular e a lesão nervosa se tornam irreversíveis. Dois detalhes fazem diferença enquanto se espera: elevar o membro reduz a pressão de perfusão e piora a isquemia, e o gelo provoca vasoconstrição. O membro fica no nível do coração."
    proximo: fim-otimo
  - texto: "Elevar o membro acima do nível do coração para reduzir o edema e reavaliar em uma hora."
    avaliacao: erro
    feedback: "A elevação parece lógica e é contraindicada aqui. Ao elevar, a pressão arterial que chega ao compartimento diminui, enquanto a pressão dentro dele permanece a mesma, e a diferença entre as duas é justamente o que perfunde o músculo. A medida bem-intencionada acelera a necrose."
    proximo: fim-dano
  - texto: "Manter analgesia potente e observar por mais uma hora, para ver se a dor cede após a retirada completa da imobilização."
    avaliacao: aceitavel
    feedback: "Retirar a imobilização de fato reduz um pouco a pressão e pode aliviar quadros iniciais. Mas com déficit sensitivo instalado e pressão medida elevada, o processo já passou desse ponto. Observar mais uma hora é apostar contra o relógio que já está correndo há onze."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "Na reavaliação a dor persiste, o déficit sensitivo aumentou e ele já não consegue mexer os dedos. A fasciotomia é realizada com uma hora a mais de isquemia, e parte da musculatura anterior aparece pálida."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A fasciotomia é feita menos de uma hora depois do diagnóstico. Os músculos herniam para fora ao abrir a fáscia, todos com cor e contratilidade preservadas. As feridas são fechadas em dois tempos, e ele recupera a força e a sensibilidade por completo ao longo de três meses de reabilitação."
ensino: "O sinal precoce da síndrome compartimental é dor desproporcional que piora contra a analgesia, e o achado mais específico é dor ao estiramento passivo dos músculos do compartimento. O pulso permanece presente até tarde, porque a microcirculação fecha muito antes da artéria. Enquanto se aguarda a cirurgia, o membro fica no nível do coração: elevar reduz a perfusão e piora tudo."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A fasciotomia salva o membro, com perda parcial da força de dorsiflexão do pé, que exige órtese durante a marcha por tempo prolongado."
ensino: "Quando o déficit sensitivo já se instalou, o tempo de observação acabou. Cada hora adicional com o compartimento sob pressão troca músculo viável por fibrose, e o resultado aparece como perda de função meses depois."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com o membro elevado e mais duas horas de espera, a fasciotomia encontra musculatura já necrosada no compartimento anterior. Ele evolui com pé caído definitivo, retração dos flexores e necessidade de várias cirurgias reconstrutivas."
ensino: "Elevar o membro reduz a pressão de perfusão sem reduzir a pressão dentro do compartimento, e é justamente a diferença entre elas que mantém o músculo vivo. Na síndrome compartimental, a medida intuitiva é a errada, e a única conduta que resolve é abrir a fáscia a tempo."
:::
