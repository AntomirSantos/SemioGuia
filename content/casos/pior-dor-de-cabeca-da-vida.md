---
id: pior-dor-de-cabeca-da-vida
titulo: A pior dor de cabeça da vida dela
contexto: "Pronto atendimento numa quarta à tarde. Uma mulher de 45 anos, que se descreve como enxaquecosa desde a adolescência, chega dizendo que a dor de hoje é diferente: veio de uma vez, na nuca, enquanto ela levantava uma caixa, e chegou ao máximo em poucos segundos. Ela já tomou o analgésico de sempre e não melhorou."
tags: [neurologico, cefaleia, hemorragia subaracnoide, sinais meningeos]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/marcha-e-sinais-meningeos
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
  - sistema-nervoso/exame-neurologico/pares-cranianos-i-a-vi
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame neurológico e sinais meníngeos"
  - "Porto, Semiologia Médica, 8ª ed., seção de cefaleias e exame neurológico"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia neurológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está sentada com a mão na nuca e o cenho franzido, incomodada com a luz do consultório. Descreve a dor como 'a pior da minha vida' e repete que as crises antigas cresciam devagar, ao longo de horas, e esta já nasceu no máximo. Vomitou uma vez no caminho. Está lúcida e orientada."
dados:
  - "Cefaleia súbita, máxima em segundos, há 2 horas"
  - "Padrão diferente das crises habituais"
  - "Vômito, fotofobia"
  - "PA 168 x 92 mmHg, FC 82 bpm, temperatura 36,6 graus"
  - "Sem déficit motor, lúcida"
proximo: d-caracterizacao
:::

::: no
tipo: decisao
id: d-caracterizacao
pergunta: "Ela tem enxaqueca conhecida. O que o modo de instalação acrescenta?"
opcoes:
  - texto: "Acrescenta tudo: dor que atinge o máximo em segundos e é descrita como diferente de todas as anteriores exige excluir hemorragia subaracnóidea, mesmo em quem tem enxaqueca."
    avaliacao: otima
    feedback: "O tempo até o pico é a pergunta mais valiosa da avaliação de cefaleia, e ela quase não custa nada. A enxaqueca cresce em minutos a horas; o sangramento subaracnóideo nasce pronto. Ter diagnóstico prévio de cefaleia primária não protege ninguém: parte importante dos casos perdidos acontece justamente em quem já tinha uma explicação pronta no prontuário."
    proximo: c-exame
  - texto: "Acrescenta pouco: crises de enxaqueca variam de intensidade e esta é mais forte, o que justifica analgesia potente e observação."
    avaliacao: erro
    feedback: "Intensidade varia mesmo; modo de instalação, não. Uma paciente que sempre teve dores que crescem ao longo de horas e hoje teve uma que nasceu no máximo está descrevendo outra doença. Tratar a dor sem investigar é o caminho para a alta que precede a hemorragia fatal."
    proximo: c-atraso
  - texto: "Acrescenta motivo para exame neurológico completo, e a conduta dependerá dele: se estiver normal, a origem primária fica mais provável."
    avaliacao: aceitavel
    feedback: "O exame completo é obrigatório e você vai fazê-lo. O cuidado é com a conclusão: nesta doença, boa parte dos pacientes tem exame neurológico normal na chegada, sobretudo os que sangraram pouco. Exame normal não afasta, e é justamente esse grupo que mais se beneficia do diagnóstico precoce."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela recebe analgesia venosa, melhora parcialmente e é liberada com orientação de repouso. Volta na manhã seguinte, com a mesma dor e agora incomodada também pelo barulho. O exame que não foi feito ontem começa agora, com quase um dia de atraso."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você examina com cuidado. A flexão passiva do pescoço encontra resistência discreta e provoca dor. As pupilas são simétricas e reagem bem. Não há déficit de força nem assimetria de reflexos. A marcha é normal. O fundo de olho, feito na sala escurecida, não mostra alterações evidentes. Ela permanece lúcida, orientada, incomodada com a luz."
dados:
  - "Rigidez de nuca discreta, dolorosa"
  - "Pupilas simétricas e reativas"
  - "Sem déficit motor, sem assimetria de reflexos"
  - "Marcha normal, consciência preservada"
proximo: d-investigacao
:::

::: no
tipo: decisao
id: d-investigacao
pergunta: "Qual é o próximo passo da investigação?"
opcoes:
  - texto: "Tomografia de crânio sem contraste com urgência e, se ela vier normal, prosseguir com punção lombar para procurar sangue no líquor."
    avaliacao: otima
    feedback: "Essa dupla é a espinha dorsal da investigação. A tomografia tem sensibilidade alta nas primeiras horas e vai caindo com o passar do tempo, e é por isso que uma imagem normal em paciente com história típica não encerra o caso. A punção procura o que a tomografia deixou passar, e a diferenciação entre sangramento e acidente de punção se faz com a comparação entre os tubos e com a análise do sobrenadante."
    proximo: c-resultado
  - texto: "Ressonância magnética como primeiro exame, por ser mais sensível que a tomografia."
    avaliacao: aceitavel
    feedback: "A ressonância tem papel em fases mais tardias e em situações específicas, mas costuma demorar mais e nem sempre está disponível na urgência. Para a fase aguda, a tomografia sem contraste é o exame de escolha, e a punção completa o que ela não vê."
    proximo: c-resultado
  - texto: "Iniciar tratamento para crise de enxaqueca refratária e reservar imagem apenas se não houver resposta em algumas horas."
    avaliacao: erro
    feedback: "A resposta ao analgésico não separa cefaleia primária de hemorragia: sangramentos pequenos frequentemente melhoram com analgesia comum, e é exatamente essa melhora que produz a alta equivocada. Nenhuma prova terapêutica substitui a imagem quando a instalação foi em segundos."
    proximo: c-atraso-tratamento
:::

::: no
tipo: cena
id: c-atraso-tratamento
texto: "A dor cede quase completamente com o tratamento e a equipe considera alta. Antes disso, você reexamina, encontra a rigidez de nuca ainda presente e sustenta o pedido de imagem. A tomografia é feita com quatro horas de atraso."
proximo: c-resultado
:::

::: no
tipo: cena
id: c-resultado
texto: "A tomografia mostra sangue nas cisternas da base. A pressão continua em 172 x 94 mmHg e ela mantém a dor intensa, apesar da analgesia. A neurocirurgia foi comunicada e o serviço de referência está a quarenta minutos."
dados:
  - "Hemorragia subaracnóidea confirmada"
  - "PA 172 x 94 mmHg"
  - "Consciência preservada, sem déficit"
  - "Transferência para serviço de referência em organização"
proximo: d-manejo
:::

::: no
tipo: decisao
id: d-manejo
pergunta: "Enquanto a transferência se organiza, o que você faz?"
opcoes:
  - texto: "Repouso em ambiente calmo, analgesia eficaz, controle pressórico com meta definida, monitorização neurológica frequente e transferência imediata para serviço com neurocirurgia."
    avaliacao: otima
    feedback: "O maior risco nas primeiras horas é o ressangramento, e ele é favorecido por picos de pressão, dor e agitação. Por isso analgesia adequada e controle pressórico são tratamento, não conforto. E o exame neurológico repetido é o monitor mais sensível que existe à beira do leito: qualquer queda no nível de consciência precisa ser percebida no minuto em que acontece."
    proximo: fim-otimo
  - texto: "Manter a pressão elevada para garantir a perfusão cerebral, como se faz no acidente vascular isquêmico."
    avaliacao: erro
    feedback: "As duas doenças pedem manejos opostos nesta variável. Na isquemia, a pressão alta sustenta a área de penumbra. Na hemorragia por aneurisma roto, ela empurra contra um vaso que já se rompeu e favorece o ressangramento, que é a complicação mais letal das primeiras vinte e quatro horas."
    proximo: fim-dano
  - texto: "Iniciar antibiótico e aguardar o resultado do líquor, dada a rigidez de nuca."
    avaliacao: aceitavel
    feedback: "Rigidez de nuca aparece tanto na irritação meníngea por sangue quanto por infecção, e a dúvida é legítima quando há febre. Aqui, porém, a tomografia já mostrou sangue e não há febre. O antibiótico desnecessário não causa dano imediato, mas o tempo e a atenção gastos com ele fazem falta na prioridade real, que é evitar o ressangramento."
    proximo: c-desvio
:::

::: no
tipo: cena
id: c-desvio
texto: "A atenção da equipe se divide e o controle pressórico fica em segundo plano por uma hora. A pressão oscila até 190 x 100 mmHg antes de ser tratada. A transferência acontece, e ela chega ao serviço de referência ainda lúcida, mas com o intervalo de maior risco mal aproveitado."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela chega ao serviço de referência com pressão controlada, sem dor e sem alteração do nível de consciência. A arteriografia identifica um aneurisma de artéria comunicante anterior, tratado por via endovascular no mesmo dia. Recebe alta em duas semanas, sem déficit."
ensino: "A pergunta que separa a cefaleia perigosa das demais é quanto tempo levou até o máximo. Segundos apontam sangramento, mesmo em quem tem enxaqueca conhecida. Exame neurológico normal não afasta, e tomografia normal em história típica pede punção lombar. Uma vez confirmado o sangramento, o inimigo das primeiras horas é o ressangramento: pressão e dor controladas são tratamento."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O aneurisma é tratado no dia seguinte e ela evolui bem, com uma internação mais longa e um episódio de vasoespasmo que exigiu terapia intensiva por quatro dias."
ensino: "Na hemorragia subaracnóidea confirmada, prioridade tem ordem: analgesia, controle pressórico e vigilância neurológica vêm antes de qualquer investigação adicional. Dividir a atenção com hipóteses já afastadas custa o intervalo de maior risco."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Duas horas depois, com a pressão mantida alta de propósito, ela apresenta piora súbita da dor, vômitos e rebaixamento rápido do nível de consciência. A tomografia de controle mostra ressangramento volumoso. Ela sobrevive com sequela neurológica grave e dependência permanente."
ensino: "Isquemia e hemorragia pedem condutas opostas quanto à pressão arterial. Aplicar a regra de uma na outra é dos erros mais graves da neurologia de urgência: manter a pressão alta em aneurisma roto favorece exatamente o ressangramento, que é a principal causa de morte nas primeiras horas."
:::
