---
id: quieta-demais-no-leito-8
titulo: Quieta demais no leito 8
contexto: "Enfermaria de clínica médica, visita da manhã. Dona Cecília, 81 anos, internada há três dias por pielonefrite, 'está ótima' segundo a passagem de plantão: 'calma, sem queixas, dormiu bem'. A filha, na cadeira ao lado, discorda com o olhar."
tags: [psiquico, delirium, idoso, CAM, avaliacao cognitiva]
topicosDeApoio:
  - exame-psiquico/exame-psiquico/delirium-demencia-e-depressao
  - exame-psiquico/exame-psiquico/escalas-cognitivas-a-beira-do-leito
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 6 (Mental Status Examination)"
  - "Semiologia Clínica, 1ª ed., cap. 23 (Alterações da consciência)"
  - "Porto, Semiologia Médica, 8ª ed., cap. 174 (Doenças do Sistema Nervoso)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Dona Cecília está de olhos abertos, quieta, olhando a parede. Responde ao cumprimento com um sorriso vago e volta a olhar o nada. A filha puxa você de lado: 'doutor, minha mãe não é assim. Anteontem ela discutia futebol com o neto pelo telefone. Hoje de manhã me chamou pelo nome da minha tia que já morreu, depois ficou normal de novo'."
dados:
  - "81 anos, terceiro dia de internação por pielonefrite"
  - "Sonolenta e 'tranquila' segundo a equipe"
  - "Relato da filha: mudança aguda em relação à linha de base, com períodos de melhora e piora"
  - "Afebril hoje; FC 84 bpm; PA 132 x 78 mmHg"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "A equipe descreve uma paciente 'calma e sem queixas'. Como você lê esse quadro?"
opcoes:
  - texto: "Como possível delirium hipoativo: quietude nova, flutuação relatada pela família e internação por infecção compõem a suspeita, não a tranquilidade."
    avaliacao: otima
    feedback: "É a leitura que salva o diagnóstico mais perdido da enfermaria. O delirium acomete 10 a 20% dos idosos hospitalizados, e o subtipo que domina a estatística do esquecimento é justamente o hipoativo: o paciente que não incomoda ninguém. A informação da filha vale ouro: sem a linha de base, a mudança aguda não pode sequer ser afirmada."
    proximo: d-instrumento
  - texto: "Como recuperação em curso: afebril, estável, dormindo bem. O quadro confuso da manhã foi um episódio isolado de sono ruim."
    avaliacao: erro
    feedback: "'Calma' em idoso internado não é sinônimo de bem. A troca de nome pela manhã, a flutuação ao longo do dia e a apatia nova são exatamente o retrato do delirium hipoativo, o subtipo que a equipe não vê porque ele não dá trabalho. Sono ruim não rebatiza filha de irmã falecida."
    proximo: d-instrumento
  - texto: "Como provável demência que a família só percebeu agora, com o estresse da internação."
    avaliacao: erro
    feedback: "A ordem do raciocínio está invertida, e a regra é explícita: antes de diagnosticar demência, é obrigatório excluir delirium, porque no paciente em delirium os testes de demência positivam falsamente. E o curso conta contra a demência: ela se instala em meses a anos; isto aqui mudou em dias e flutua em horas."
    proximo: d-instrumento
:::

::: no
tipo: decisao
id: d-instrumento
pergunta: "Suspeita levantada. Que instrumento você aplica à beira do leito?"
opcoes:
  - texto: "O CAM: início agudo com flutuação, desatenção, e pensamento desorganizado ou alteração do nível de consciência."
    avaliacao: otima
    feedback: "É o instrumento certo para a pergunta certa. O CAM organiza o diagnóstico em quatro características: (1) mudança aguda e flutuante em relação à linha de base, que a filha acabou de documentar; (2) dificuldade de focar a atenção; (3) pensamento desorganizado; (4) alteração do nível de consciência. Positivo com 1 e 2 mais 3 ou 4. Positivo, argumenta fortemente a favor do delirium (razão de verossimilhança 12,7, elevação substancial); negativo, argumenta contra (0,2)."
    proximo: c-cam
  - texto: "O miniexame do estado mental, para quantificar o déficit cognitivo."
    avaliacao: erro
    feedback: "É o instrumento certo para outra pergunta. No paciente com suspeita de delirium, os testes de demência perdem a validade: positivam falsamente. Primeiro o CAM decide se há confusão aguda; a cognição se mede depois, com o quadro tratado e a paciente na sua linha de base."
    proximo: c-cam
:::

::: no
tipo: cena
id: c-cam
texto: "Você senta ao lado da cama e conversa. Pede que ela diga os meses de trás para a frente: ela começa, perde-se em setembro, recomeça, distrai-se com o barulho do corredor. No meio de uma resposta sobre o café da manhã, desvia para a colheita de café da fazenda da infância e não volta. A filha confirma cada item da linha de base. CAM: mudança aguda e flutuante presente, desatenção presente, pensamento desorganizado presente. Positivo."
dados:
  - "CAM positivo (características 1, 2 e 3)"
  - "Sonolência leve, despertável: nível de consciência levemente alterado"
proximo: d-causa
:::

::: no
tipo: decisao
id: d-causa
pergunta: "Delirium diagnosticado. O que o seu exame procura agora?"
opcoes:
  - texto: "A causa: revisão completa da prescrição, hidratação, retenção urinária e fecaloma, sinais de infecção não controlada, oximetria e glicemia."
    avaliacao: otima
    feedback: "Delirium é sintoma, não doença: o diagnóstico dispara a caça ao precipitante. No idoso internado, os suspeitos de sempre são os medicamentos (em especial os com ação anticolinérgica e os sedativos), a infecção em atividade, o distúrbio metabólico, a desidratação, a retenção urinária e o fecaloma, e o exame físico encontra a maioria deles à beira do leito."
    proximo: fim-otimo
  - texto: "Nada a procurar: prescrever um antipsicótico à noite para garantir que ela durma e não atrapalhe o plantão."
    avaliacao: erro
    feedback: "Sedar o delirium hipoativo sem procurar a causa é aprofundar o problema duas vezes: o precipitante continua ativo e a sedação soma mais um fator confusional. O tratamento do delirium começa pela causa; a contenção química é exceção justificada, não rotina de conveniência."
    proximo: fim-dano
  - texto: "Solicitar tomografia de crânio urgente: confusão nova em idoso é AVC até prova em contrário."
    avaliacao: aceitavel
    feedback: "A imagem tem seu lugar quando há déficit focal, trauma ou quando a investigação inicial não explica o quadro. Mas o caminho mais curto e mais rentável passa primeiro pela prescrição, pela bexiga, pelo reto, pela oximetria e pela glicemia: as causas comuns do delirium são clínicas e reversíveis, e estão ao alcance das mãos."
    proximo: fim-otimo
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A revisão encontra dois achados: um anticolinérgico para 'chiado na bexiga' iniciado na admissão e um globo vesical palpável e maciço à percussão. Sonda de alívio, suspensão da droga, hidratação ajustada. Em 48 horas, dona Cecília volta a discutir futebol pelo telefone. No prontuário, o CAM da manhã e a linha de base da filha, documentados."
ensino: "O delirium hipoativo é o mais perdido porque não incomoda: a suspeita nasce da mudança aguda e flutuante em relação à linha de base, que só quem convive pode contar. O CAM organiza o diagnóstico (positivo eleva muito a probabilidade, com razão de verossimilhança 12,7) e a regra de ordem protege do erro clássico: primeiro se trata a confusão, depois se mede a cognição."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sedada, dona Cecília 'dorme bem' por mais duas noites, entre as quais aspira a dieta. A pneumonia aspirativa prolonga a internação em duas semanas, e a filha pergunta, com razão, por que ninguém investigou a confusão quando ela avisou."
ensino: "Sedar a confusão sem procurar a causa é tratar o incômodo da equipe, não a doença do paciente. O delirium exige caça ativa ao precipitante (medicamentos, infecção, metabólico, retenção, fecaloma) e a família é instrumento diagnóstico: a linha de base que ela fornece é a primeira característica do CAM. O idoso quieto pode ser o paciente mais grave da enfermaria."
:::
