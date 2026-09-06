---
id: placas-que-subiram-em-dez-minutos
titulo: As placas que subiram em dez minutos
contexto: "Sala de observação de uma unidade básica. Um homem de 31 anos recebeu a primeira dose de um antibiótico injetável há quinze minutos e agora coça o corpo inteiro. A técnica de enfermagem chama você porque ele 'ficou vermelho e está diferente'. Ele está de pé, andando pela sala, inquieto."
tags: [geral, anafilaxia, pele, emergencia]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/pressao-arterial
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da pele e de choque"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da pele e de reações de hipersensibilidade"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral e da pele"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "O tronco e os braços estão tomados por placas elevadas, avermelhadas, de bordas irregulares, que mudam de lugar enquanto você observa. Ele coça o pescoço e diz que sente a garganta 'apertada' e a língua grossa. A voz saiu mais rouca na última frase. Está ansioso e pergunta se vai passar."
dados:
  - "Urticária generalizada, surgida há cerca de 10 minutos"
  - "Sensação de aperto na garganta, voz rouca"
  - "FC 118 bpm, PA 106 x 62 mmHg"
  - "FR 24 irpm, saturação 96%"
  - "Antibiótico injetável administrado há 15 minutos"
proximo: d-reconhecimento
:::

::: no
tipo: decisao
id: d-reconhecimento
pergunta: "Qual é a sua primeira conduta?"
opcoes:
  - texto: "Adrenalina intramuscular na face lateral da coxa, imediatamente, e só depois o restante das medidas."
    avaliacao: otima
    feedback: "Urticária de instalação rápida somada a sintoma de outro sistema, aqui a via aérea, já define anafilaxia, e a única droga que altera o desfecho é a adrenalina intramuscular. Ela não espera a pressão cair: quando a pressão cai, a absorção piora e o quadro já avançou. A coxa é escolhida porque a musculatura é volumosa e bem perfundida."
    proximo: c-pos-adrenalina
  - texto: "Anti-histamínico endovenoso e corticoide, observando a resposta antes de escalonar."
    avaliacao: erro
    feedback: "Os dois têm papel coadjuvante e nenhum deles reverte o que ameaça a vida. O anti-histamínico melhora o prurido e a placa, e o corticoide age em horas, tarde demais para o edema de via aérea que está se formando agora. Usar apenas essas drogas é tratar o sintoma visível e ignorar o processo."
    proximo: c-piora-via-aerea
  - texto: "Aguardar cinco minutos observando, porque a pressão ainda está normal e o quadro pode ser apenas urticária."
    avaliacao: aceitavel
    feedback: "Pressão normal não exclui anafilaxia, e a espera aqui é a decisão mais arriscada disponível. Sensação de aperto na garganta e mudança do timbre da voz são sinais precoces de edema laríngeo, o achado que mais mata nesta reação. Observar é adequado depois da adrenalina, não antes."
    proximo: c-piora-via-aerea
:::

::: no
tipo: cena
id: c-piora-via-aerea
texto: "Em cinco minutos ele fica mais rouco, começa a apresentar um som agudo na inspiração, audível sem estetoscópio, e a pressão cai para 84 x 50 mmHg. A adrenalina é finalmente aplicada, agora com a via aérea estreitando e a perfusão pior."
proximo: c-pos-adrenalina
:::

::: no
tipo: cena
id: c-pos-adrenalina
texto: "Você deita o paciente com as pernas elevadas, instala acesso venoso, oferece oxigênio e prepara a segunda dose. Cinco minutos depois da primeira aplicação, ele ainda refere aperto na garganta, a rouquidão persiste e a pressão marca 88 x 54 mmHg."
dados:
  - "PA 88 x 54 mmHg, FC 126 bpm"
  - "Rouquidão persistente"
  - "Urticária ainda difusa"
  - "5 minutos desde a primeira dose de adrenalina"
proximo: d-segunda-dose
:::

::: no
tipo: decisao
id: d-segunda-dose
pergunta: "A resposta à primeira dose foi parcial. O que fazer?"
opcoes:
  - texto: "Repetir a adrenalina intramuscular, manter as pernas elevadas e correr volume, chamando apoio para eventual via aérea avançada."
    avaliacao: otima
    feedback: "A anafilaxia refratária à primeira dose é comum e a conduta é simples: repetir. O intervalo de cinco a quinze minutos existe justamente para isso. Enquanto a droga age, o volume corrige a vasodilatação e o extravasamento, e a posição deitada com pernas elevadas devolve pré-carga sem custo. Chamar apoio antes de precisar é parte do cuidado."
    proximo: c-evolucao
  - texto: "Trocar para adrenalina endovenosa em bolus, já que a via intramuscular não resolveu."
    avaliacao: erro
    feedback: "O bolus endovenoso fora de ambiente monitorado e sem diluição adequada é uma das principais causas de complicação grave nesta doença, com arritmia e isquemia miocárdica. A via intramuscular repetida é segura e eficaz, e a via endovenosa, quando indicada, é em infusão controlada e com monitorização."
    proximo: fim-dano-ev
  - texto: "Manter apenas o volume e observar por mais dez minutos antes de repetir a adrenalina."
    avaliacao: aceitavel
    feedback: "Volume ajuda, e a espera não. Com rouquidão persistente e pressão ainda baixa, a segunda dose está indicada agora. Dez minutos a mais de edema de laringe podem transformar uma via aérea difícil em impossível."
    proximo: c-espera-segunda
:::

::: no
tipo: cena
id: c-espera-segunda
texto: "Nos dez minutos de espera a rouquidão piora e ele passa a preferir ficar sentado. A segunda dose é aplicada e faz efeito, mas o transporte segue com a via aérea em risco e com a equipe preparada para intubar no caminho."
proximo: fim-aceitavel
:::

::: no
tipo: cena
id: c-evolucao
texto: "Depois da segunda dose e de meio litro de cristaloide, a pressão sobe para 112 x 70 mmHg, a rouquidão cede e as placas começam a empalidecer. Ele pergunta se já pode ir embora, porque precisa buscar a filha na escola."
proximo: d-alta
:::

::: no
tipo: decisao
id: d-alta
pergunta: "Ele melhorou por completo e quer ir embora. O que você decide?"
opcoes:
  - texto: "Manter em observação por algumas horas pelo risco de reação bifásica, registrar o agente no prontuário, prescrever autoinjetor quando disponível e orientar por escrito o que evitar."
    avaliacao: otima
    feedback: "A melhora não encerra o episódio: parte dos pacientes apresenta uma segunda onda horas depois da primeira, sem novo contato com o agente. Além disso, o cuidado que evita a próxima anafilaxia é documental: nome do medicamento em destaque no prontuário, orientação por escrito e, quando possível, autoinjetor com treino de uso."
    proximo: fim-otimo
  - texto: "Liberar com receita de anti-histamínico, já que ele está assintomático e a causa foi identificada."
    avaliacao: erro
    feedback: "A alta precoce é a falha mais comum depois de uma anafilaxia bem tratada. O anti-histamínico não previne a reação bifásica, e o paciente vai para casa sem saber reconhecer o retorno dos sintomas nem o que fazer. O episódio termina na orientação, não na melhora."
    proximo: fim-dano-alta
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele permanece em observação por seis horas, sem recorrência. Sai com o agente registrado em letras destacadas no prontuário e no cartão que carrega na carteira, com orientação escrita e com o encaminhamento para avaliação especializada. Dois meses depois, em outra unidade, o registro evita que o mesmo antibiótico seja prescrito."
ensino: "Anafilaxia é diagnóstico clínico e imediato: instalação rápida com envolvimento de pele somado a outro sistema já basta. A droga que muda o desfecho é a adrenalina intramuscular na coxa, e ela não espera a pressão cair. Rouquidão e aperto na garganta são sinais precoces de edema de laringe. Depois da melhora, restam duas tarefas: observar pelo risco de segunda onda e documentar o agente."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele estabiliza depois da segunda dose, mas com um período de edema laríngeo que exigiu preparo para via aérea avançada durante o transporte. Fica internado por vinte e quatro horas e recebe alta bem."
ensino: "Resposta parcial à primeira dose de adrenalina indica repetir, não esperar. O intervalo entre doses é de minutos, e o edema de laringe é a estrutura que menos tolera espera."
:::

::: no
tipo: desfecho
id: fim-dano-ev
classe: dano
texto: "Logo após o bolus endovenoso ele apresenta dor torácica intensa, palidez e taquicardia ventricular não sustentada. O eletrocardiograma mostra alterações isquêmicas transitórias e ele passa vinte e quatro horas em unidade coronariana. A anafilaxia cede; o susto foi produzido pelo tratamento."
ensino: "A adrenalina se aplica na musculatura da coxa, e é assim que ela é segura e eficaz. O bolus endovenoso fora de ambiente monitorado e sem diluição adequada é uma das causas mais conhecidas de arritmia e isquemia miocárdica no tratamento da anafilaxia. Quando a via endovenosa é necessária, ela é em infusão controlada, com monitorização e por quem tem experiência."
:::

::: no
tipo: desfecho
id: fim-dano-alta
classe: dano
texto: "Quatro horas depois, em casa, ele volta a apresentar rouquidão e falta de ar, agora sem ninguém por perto que reconhecesse o quadro. Chega ao pronto socorro com edema de glote e precisa de via aérea cirúrgica de urgência. Sobrevive, com três dias de internação e uma cicatriz cervical."
ensino: "O episódio de anafilaxia não termina na melhora. Parte dos pacientes apresenta uma segunda onda horas depois, sem novo contato com o agente, e o anti-histamínico não previne isso. Observação por algumas horas, registro do agente em destaque no prontuário e orientação escrita são o que impede a próxima reação de ser pior que esta."
:::
