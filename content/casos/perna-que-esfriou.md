---
id: perna-que-esfriou
titulo: A perna que esfriou às três da tarde
contexto: "Hospital secundário, sem serviço de cirurgia vascular na casa. Um homem de 71 anos, com claudicação antiga e fibrilação atrial de que 'tomava um comprimido que acabou', chega de cadeira de rodas: a perna direita esfriou de repente no começo da tarde."
tags: [vascular, isquemia aguda, pulsos, emergencia]
topicosDeApoio:
  - sistema-vascular-periferico/exame-vascular-periferico/isquemia-aguda-e-aneurismas
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., cap. 53 (Doenças das Artérias)"
  - "Porto, Exame Clínico, 8ª ed., cap. 13 (Exame dos Pulsos), Síndrome Isquêmica"
  - "Semiologia Clínica, 1ª ed., cap. 12 (Exame do sistema vascular periférico)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "São 18 horas. Ele conta que a perna 'formigou e adormeceu' por volta das 15h e que a dor veio depois, 'chata, mas dá para aguentar'. O pé direito está pálido e ele o descreve como 'gelado por dentro'. A triagem classificou como pouco urgente: 'dor moderada em membro, sinais vitais estáveis'."
dados:
  - "FC 104 bpm, ritmo irregular"
  - "PA 138 x 84 mmHg"
  - "Dor referida como 5 em 10"
  - "Início do formigamento por volta das 15h (3 horas atrás)"
proximo: d-triagem
:::

::: no
tipo: decisao
id: d-triagem
pergunta: "Dor apenas moderada e sinais vitais estáveis. A classificação de baixa urgência se sustenta?"
opcoes:
  - texto: "Não: em artéria já doente, com colaterais formadas, a dor da oclusão aguda vem fraca ou nem vem. Este exame não pode esperar."
    avaliacao: otima
    feedback: "É exatamente o paciente em quem o diagnóstico mais atrasa: o claudicante, com colaterais prévias que amortecem a dor. O formigamento antes da dor conta a fisiopatologia: o nervo periférico é o primeiro tecido a sofrer. O exame que decide cabe em três perguntas, sente o pé, mexe o pé, há pulso acima dele, e nenhuma precisa de aparelho."
    proximo: c-exame
  - texto: "Sustenta-se: isquemia aguda importante dói muito, e dor 5 em 10 fala contra oclusão."
    avaliacao: erro
    feedback: "A intensidade da dor não gradua a isquemia neste paciente. A artéria que já era doente formou colaterais, e são elas que abrandam a dor enquanto o relógio corre. Formigamento seguido de dormência é o nervo avisando primeiro; esperar a dor piorar é esperar o segundo tecido falhar."
    proximo: c-espera-triagem
  - texto: "Melhor pedir a angiotomografia primeiro: só a imagem diferencia embolia de trombose."
    avaliacao: aceitavel
    feedback: "A diferenciação tem valor para o planejamento, mas a isquemia aguda se diagnostica inteiramente à beira do leito, e a viabilidade do membro se gradua com as mãos: sensibilidade, motricidade, pulsos e temperatura. A imagem entra depois da decisão, não antes dela."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-espera-triagem
texto: "Ele espera na fila. Uma hora depois, chama a atenção da enfermagem: não consegue mais mexer os dedos do pé direito. Você o traz para a sala de emergência com o tempo já descontado do prognóstico."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Os dois membros expostos, você examina em comparação. O pé direito está pálido, com frialdade que o dorso dos seus dedos delimita até o terço médio da perna. Pulso femoral direito presente e amplo; poplíteo, ausente. O interno que examina junto anuncia: 'achei um pedioso fraquinho aqui'. À esquerda, todos os pulsos presentes."
dados:
  - "Palidez e frialdade até o terço médio da perna direita"
  - "Pulso femoral direito presente, poplíteo ausente"
  - "Suposto pulso pedioso fraco à direita (a confirmar)"
  - "Membro esquerdo com todos os pulsos presentes"
proximo: d-pulso
:::

::: no
tipo: decisao
id: d-pulso
pergunta: "O interno encontrou um pedioso fraco abaixo de um poplíteo ausente. Como você lê esse achado?"
opcoes:
  - texto: "Com desconfiança: pode ser onda de um vaso proximal transmitida pelos tecidos. Confirmar com calma antes de deixá-lo mudar o raciocínio."
    avaliacao: otima
    feedback: "Pulso distal presente abaixo de um segmento sem pulso é incoerência anatômica que exige confirmação: às vezes os dedos julgam ter encontrado um pulso, e o que chegou até eles foi a onda de um vaso proximal atravessando os tecidos. Na dúvida, o conjunto (palidez, frialdade delimitada, poplíteo ausente) pesa mais que um achado frágil."
    proximo: c-neuro
  - texto: "Com alívio: se há pedioso, há fluxo, e o quadro é menos grave do que parecia."
    avaliacao: erro
    feedback: "O alívio é falso. Um 'pulso' fraco abaixo de um poplíteo ausente contradiz a anatomia e tem explicação conhecida: onda transmitida. Reclassificar a gravidade por ele é trocar o conjunto coerente do exame por um artefato dos dedos."
    proximo: c-neuro
:::

::: no
tipo: cena
id: c-neuro
texto: "Confirmado: o suposto pedioso não se sustenta à palpação cuidadosa. Você testa o que decide. Toque leve nos dedos do pé direito: ele sente menos que à esquerda, 'como através de uma meia'. Movimento ativo dos dedos: presente, mais lento que o contralateral. Panturrilha dolorosa à compressão, sem endurecimento. Cianose não há; a pele comprimida empalidece e recora, lentamente."
dados:
  - "Hipoestesia tátil nos dedos do pé direito"
  - "Motricidade ativa presente, diminuída"
  - "Panturrilha dolorosa à compressão, sem contratura"
  - "Sem cianose fixa"
  - "Tempo estimado de isquemia: cerca de 3 a 4 horas"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Membro isquêmico com sensibilidade já comprometida e motricidade ainda presente, cerca de 3 a 4 horas de evolução, e a referência vascular fica a uma hora dali. O que você faz?"
opcoes:
  - texto: "Acionar a cirurgia vascular AGORA, com o exame descrito por extenso (horário, nível, sensibilidade, motricidade), e organizar a transferência imediata, sem condicionar nada à angiotomografia local."
    avaliacao: otima
    feedback: "É a conduta que salva membro. A isquemia grave produz lesões irreversíveis a partir de 4 a 6 horas, e este relógio já marca 3 a 4. O membro com déficit sensitivo e motricidade preservada é o que mais se beneficia da pressa: ainda é salvável, e não será por muito tempo. Descrever as três variáveis (sensibilidade, motricidade, tempo) vale mais que qualquer rótulo de classificação."
    proximo: fim-otimo
  - texto: "Fazer a angiotomografia aqui primeiro: o cirurgião vai pedir de qualquer jeito, e chegar com a imagem pronta adianta o processo."
    avaliacao: erro
    feedback: "A imagem local custa o que o membro não tem: tempo. A conduta cirúrgica na isquemia com déficit neurológico se decide pelo exame, e o serviço de referência refaz ou dispensa a imagem conforme a estratégia. Chegar mais cedo sem tomografia vale mais que chegar tarde com ela."
    proximo: fim-dano
  - texto: "Iniciar analgesia e proteção térmica do membro, reavaliar a cada 30 minutos e transferir se piorar."
    avaliacao: aceitavel
    feedback: "Cuidados de suporte são bem-vindos, mas 'transferir se piorar' inverte a lógica: a piora esperada é a perda da motricidade, e ela marca justamente a passagem para o território das sequelas. A transferência se decide pelo que o exame já mostra, não pelo que ele ainda vai mostrar."
    proximo: c-piora
:::

::: no
tipo: cena
id: c-piora
texto: "Na segunda reavaliação, os dedos não se mexem mais e surge uma placa de cianose no antepé, que ainda some à compressão. A transferência sai agora, com o quadro pior e a janela quase fechada."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele chega à referência com pouco mais de 4 horas de isquemia e vai direto ao centro cirúrgico: embolectomia com reperfusão. Sai andando na alta, com a anticoagulação da fibrilação atrial finalmente organizada. No encaminhamento que você escreveu, o vascular elogia uma frase: 'hipoestesia tátil em dedos desde ~17h30, motricidade ativa presente e lentificada, frialdade até terço médio, poplíteo ausente'."
ensino: "A isquemia aguda se diagnostica e se gradua à beira do leito: sente o pé, mexe o pé, onde se perde o pulso. Dor fraca não tranquiliza no claudicante com colaterais; pulso distal 'fraco' abaixo de um segmento sem pulso pode ser onda transmitida; e a janela de 4 a 6 horas transforma cada decisão logística em decisão clínica."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A reperfusão acontece, mas tardia: ele perde parte da função dos flexores e ganha uma fasciotomia no caminho. O membro fica, a marcha não volta a ser a mesma."
ensino: "Reavaliar não é conduta quando o exame já decidiu. Déficit sensitivo instalado em membro agudamente isquêmico é indicação de acionar o tratamento definitivo, e a perda da motricidade que se 'aguardava' é o marco da lesão que não volta. O nervo falha primeiro, o músculo em seguida: quem espera o segundo, perde os dois."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Entre o protocolo da tomografia, o laudo e o contato, a transferência sai com quase 7 horas de isquemia. Na referência, o membro já tem cianose fixa em placas e contratura da panturrilha. A cirurgia que acontece não é a embolectomia: é a amputação transtibial."
ensino: "Depois de 4 a 6 horas de isquemia grave as lesões são irreversíveis, e nenhuma imagem devolve tecido. Cianose fixa, bolhas e contratura muscular são os marcos do membro perdido. Na isquemia aguda com déficit neurológico, o exame físico é o laudo que autoriza a viagem: a angiotomografia que atrasa a transferência trabalha contra o paciente."
:::
