---
id: pressao-que-sumia-na-inspiracao
titulo: A pressão que sumia na inspiração
contexto: "Emergência oncológica, começo da noite. Uma mulher de 58 anos, em tratamento de câncer de pulmão, chega com falta de ar que piorou nos últimos três dias e cansaço para qualquer esforço. Ela diz que só consegue ficar bem sentada e inclinada para a frente, e que o coração 'está disparado'."
tags: [cardiovascular, tamponamento, pulso paradoxal, jugular]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/pulso-venoso-jugular-e-turgencia
  - aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de pressão venosa, pulso paradoxal e derrame pericárdico"
  - "Porto, Semiologia Médica, 8ª ed., seção de doenças do pericárdio"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela respira rápido e superficial, e prefere ficar sentada. Está com as extremidades frias e o pulso é rápido e de pequena amplitude. As bulhas parecem distantes, como se o coração estivesse longe do estetoscópio. Os campos pulmonares, ao contrário do que a falta de ar sugeriria, estão limpos."
dados:
  - "Dispneia progressiva há 3 dias, ortopneia"
  - "FC 128 bpm, PA 96 x 74 mmHg, FR 28 irpm"
  - "Bulhas hipofonéticas"
  - "Ausculta pulmonar limpa"
  - "Extremidades frias, pulso de pequena amplitude"
proximo: d-primeira-leitura
:::

::: no
tipo: decisao
id: d-primeira-leitura
pergunta: "Dispneia com pulmão limpo, bulhas abafadas e má perfusão. Qual é a sua próxima manobra de exame?"
opcoes:
  - texto: "Examinar o pescoço em busca de pressão venosa elevada e medir o pulso paradoxal com o manguito, comparando a sistólica na inspiração e na expiração."
    avaliacao: otima
    feedback: "Essa dupla resolve o caso à beira do leito. Pressão venosa alta com pulmão limpo já aponta obstrução ao enchimento do coração. O pulso paradoxal traduz a mesma fisiologia: com o pericárdio cheio, o enchimento do ventrículo direito na inspiração empurra o septo e rouba espaço do esquerdo, e a pressão sistólica cai mais do que deveria a cada inspiração."
    proximo: c-exame
  - texto: "Solicitar radiografia de tórax e angiotomografia para investigar embolia pulmonar, que é frequente no paciente oncológico."
    avaliacao: aceitavel
    feedback: "A embolia é hipótese obrigatória neste contexto e será investigada. O que não pode faltar antes é o exame que separa as duas em três minutos: a bulha abafada, a jugular alta e o pulso paradoxal apontam para o pericárdio, e é uma condição que pode matar antes da tomografia ficar pronta."
    proximo: c-exame
  - texto: "Iniciar diurético, já que a paciente tem sinais de congestão com jugular provavelmente elevada."
    avaliacao: erro
    feedback: "É o erro que mais causa dano nesta doença. A jugular está alta porque o sangue não consegue entrar no coração, e não porque há volume demais. Tirar volume de quem depende de pressão de enchimento para vencer a compressão derruba o débito e pode levar à parada."
    proximo: c-diuretico
:::

::: no
tipo: cena
id: c-diuretico
texto: "Depois da primeira dose de diurético, a pressão cai para 82 x 66 mmHg e ela fica confusa. O medicamento é suspenso e a equipe recomeça a avaliação, agora pelo pescoço e pelo manguito."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A coluna venosa jugular está elevada, quase na altura da mandíbula com ela a 45 graus, e não desce durante a inspiração. Com o manguito manual e esvaziamento lento, o primeiro som de Korotkoff aparece em 96 mmHg apenas durante a expiração, e só passa a ser ouvido em todo o ciclo respiratório em 74 mmHg. O ictus não é palpável. As bulhas seguem distantes. A pele está fria e o enchimento capilar leva quatro segundos."
dados:
  - "Pressão venosa jugular muito elevada, sem queda inspiratória"
  - "Diferença de 22 mmHg entre expiração e inspiração"
  - "Ictus não palpável, bulhas hipofonéticas"
  - "Enchimento capilar de 4 segundos"
proximo: d-diagnostico
:::

::: no
tipo: decisao
id: d-diagnostico
pergunta: "A sistólica cai 22 mmHg na inspiração. O que isso significa aqui?"
opcoes:
  - texto: "Pulso paradoxal importante: somado à jugular alta, bulhas abafadas e má perfusão, define tamponamento cardíaco e indica drenagem urgente."
    avaliacao: otima
    feedback: "O nome engana: não é um paradoxo, é o exagero de um fenômeno normal. Todos nós temos alguma queda da sistólica na inspiração, e no coração comprimido essa queda passa a ser grande, porque as duas câmaras disputam um espaço que o líquido do pericárdio não deixa crescer. Com bulhas abafadas e jugular alta, o diagnóstico está feito e o tratamento é esvaziar o pericárdio."
    proximo: c-conduta
  - texto: "Achado inespecífico: também ocorre em asma e em doença pulmonar obstrutiva, então precisa de mais investigação."
    avaliacao: aceitavel
    feedback: "É verdade que essas doenças também produzem queda inspiratória exagerada, pelo esforço respiratório intenso. O contexto é que decide: aqui não há sibilo, o pulmão está limpo, e a jugular está alta com bulhas abafadas. Nesse cenário, o achado aponta o pericárdio."
    proximo: c-conduta
  - texto: "Provável erro de técnica na medida, que deve ser repetida com aparelho automático."
    avaliacao: erro
    feedback: "O aparelho automático é justamente o que não mede este achado: ele precisa de manguito manual e de esvaziamento lento, ouvindo em que ponto os sons aparecem só na expiração e em que ponto aparecem em todo o ciclo. Descartar o achado pelo método é abrir mão da manobra que fecha o diagnóstico."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "O ecocardiograma à beira do leito confirma derrame pericárdico volumoso com colapso das câmaras direitas. A pressão está em 88 x 68 mmHg e ela segue confusa. A equipe de hemodinâmica pode fazer a punção guiada em quarenta minutos."
dados:
  - "Derrame pericárdico volumoso com colapso de câmaras direitas"
  - "PA 88 x 68 mmHg, FC 134 bpm"
  - "Confusão mental"
  - "Punção guiada disponível em 40 minutos"
proximo: d-suporte
:::

::: no
tipo: decisao
id: d-suporte
pergunta: "Enquanto a punção é preparada, qual suporte você oferece?"
opcoes:
  - texto: "Volume endovenoso para sustentar a pressão de enchimento, evitar sedação profunda e não iniciar ventilação com pressão positiva se puder aguardar a drenagem."
    avaliacao: otima
    feedback: "Neste quadro a fisiologia manda: o coração comprimido só enche se houver pressão venosa suficiente, e por isso volume ajuda enquanto o líquido não sai. Pela mesma razão, sedação profunda e ventilação com pressão positiva são perigosas, porque reduzem o retorno venoso e podem provocar parada logo após a indução."
    proximo: fim-otimo
  - texto: "Intubar e ventilar com pressão positiva para corrigir a confusão e a taquipneia antes da punção."
    avaliacao: erro
    feedback: "A confusão vem do baixo débito, não da via aérea, e a pressão positiva reduz ainda mais o retorno venoso ao coração comprimido. Este é um dos cenários clássicos de parada após a indução anestésica. Se a intubação for inevitável, ela acontece depois da drenagem, ou com a agulha já preparada."
    proximo: fim-dano
  - texto: "Iniciar droga vasoativa e aguardar a punção, sem oferecer volume."
    avaliacao: aceitavel
    feedback: "A droga vasoativa ajuda a sustentar a pressão e é uma ponte razoável. Mas ela não corrige o problema mecânico e, sem volume, o enchimento continua limitado. As duas medidas juntas seguram melhor o paciente até a agulha."
    proximo: c-ponte
:::

::: no
tipo: cena
id: c-ponte
texto: "Com vasopressor isolado a pressão melhora pouco e ela permanece confusa até a drenagem. O procedimento acontece com a paciente mais instável do que precisaria, embora sem intercorrência."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A punção retira setecentos mililitros de líquido e a mudança é imediata: a pressão sobe para 118 x 76 mmHg, a frequência cai e ela volta a conversar dentro da sala. Um cateter é deixado para drenagem contínua, e a investigação do líquido orienta o ajuste do tratamento oncológico."
ensino: "Bulhas abafadas, pressão venosa jugular alta e hipotensão, com pulmão limpo, formam o tripé do tamponamento. O pulso paradoxal se mede com manguito manual e esvaziamento lento, e traduz a disputa entre as câmaras por um espaço que não pode crescer. Duas coisas fazem mal aqui: diurético e pressão positiva na via aérea. O tratamento é esvaziar o pericárdio."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A drenagem é realizada com sucesso, depois de um período de baixo débito mais prolongado do que o necessário. Ela se recupera em vinte e quatro horas."
ensino: "No coração comprimido, volume é ponte tão importante quanto a droga vasoativa: sem pressão de enchimento suficiente, o ventrículo não se enche, por mais que a resistência periférica aumente."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Logo após a indução anestésica ela apresenta parada cardíaca sem pulso. A punção pericárdica é feita durante a reanimação e restaura a circulação após seis minutos. Ela sobrevive, com passagem prolongada pela terapia intensiva."
ensino: "Sedação e ventilação com pressão positiva reduzem o retorno venoso, e o coração comprimido depende exatamente dele. No tamponamento, a agulha vem antes do tubo, e quando a intubação for inevitável, o material de punção precisa estar aberto ao lado."
:::
