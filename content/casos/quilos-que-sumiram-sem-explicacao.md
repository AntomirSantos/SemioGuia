---
id: quilos-que-sumiram-sem-explicacao
titulo: Os quilos que sumiram sem explicação
contexto: "Ambulatório de clínica geral. Um homem de 71 anos vem à consulta de rotina e menciona, quase de passagem, que 'as calças estão largas'. Ele não pesava havia mais de um ano. A balança de hoje mostra oito quilos a menos que o registro de dezoito meses atrás, e ele nega dieta ou exercício novo."
tags: [geral, emagrecimento, idoso, investigacao]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/antropometria-e-hidratacao
  - exame-fisico-geral/avaliacao-geral/linfonodos
  - exame-fisico-geral/avaliacao-geral/ectoscopia
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame geral e de emagrecimento"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame geral e de linfonodos"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele parece bem, anda sem ajuda e conversa normalmente. Diz que a comida 'perdeu o gosto' e que come menos porque não sente vontade. Nega dor, febre e alteração do hábito intestinal. Mora sozinho desde que a esposa morreu, há dois anos. Fuma desde os dezoito anos."
dados:
  - "Perda de 8 kg em 18 meses, não intencional"
  - "Redução do apetite, sem dor"
  - "Viúvo há 2 anos, mora sozinho"
  - "Tabagista de longa data"
  - "Sem febre, sem alteração de hábito intestinal"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Perda de peso involuntária no idoso. Por onde começar?"
opcoes:
  - texto: "Confirmar a perda com pesos documentados, quantificar em porcentagem do peso anterior, e fazer um exame físico completo com o paciente despido, incluindo todas as cadeias de linfonodos, boca, tireoide, mamas, abdome e toque retal."
    avaliacao: otima
    feedback: "Duas coisas evitam investigação inútil aqui. A primeira é confirmar a perda com números e não com a impressão da roupa, porque muito relato não se confirma. A segunda é o exame completo e sem pressa: nesta queixa, o achado que direciona tudo costuma estar em um lugar que só se encontra despindo o paciente, como um linfonodo, uma lesão de boca ou uma massa abdominal."
    proximo: c-exame
  - texto: "Solicitar de imediato uma bateria ampla de exames e tomografias de tórax, abdome e pelve."
    avaliacao: erro
    feedback: "Investigação em bloco sem hipótese produz achados incidentais que geram novos exames, ansiedade e procedimentos, e frequentemente não encontra a causa. A rota que funciona é exame completo somado a exames básicos dirigidos, com a imagem entrando onde o exame apontou."
    proximo: c-exame
  - texto: "Atribuir ao luto e ao isolamento, orientar suplemento alimentar e reavaliar em três meses."
    avaliacao: aceitavel
    feedback: "Depressão e isolamento são causas frequentes de emagrecimento no idoso e precisam ser avaliadas de verdade, com instrumento e com perguntas diretas. O que não cabe é assumir essa explicação sem antes excluir causas orgânicas, sobretudo em tabagista de longa data com perda de peso significativa."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você o despe por completo. A pele está seca, com turgor reduzido. Na boca, encontra próteses mal adaptadas e uma úlcera dolorosa na gengiva, que ele diz ter 'faz tempo'. Não há linfonodos palpáveis no pescoço, nas axilas nem nas regiões inguinais. A tireoide é normal. O abdome é depressível, sem massas nem visceromegalias. O toque retal é normal, sem sangue na luva."
dados:
  - "Prótese dentária mal adaptada com úlcera gengival dolorosa"
  - "Sem linfonodomegalias em nenhuma cadeia"
  - "Abdome sem massas, sem visceromegalias"
  - "Toque retal normal"
  - "Turgor cutâneo reduzido"
proximo: d-achado
:::

::: no
tipo: decisao
id: d-achado
pergunta: "A boca revelou uma prótese mal adaptada com úlcera. O que fazer com isso?"
opcoes:
  - texto: "Tratar a causa mecânica encaminhando ao dentista e, ao mesmo tempo, encaminhar a úlcera para avaliação, porque lesão de boca que não cicatriza em tabagista precisa ser biopsiada."
    avaliacao: otima
    feedback: "As duas coisas caminham juntas e nenhuma substitui a outra. A prótese mal adaptada é causa comum e tratável de perda de peso, porque simplesmente dói mastigar. Mas úlcera oral persistente em tabagista de longa data é lesão que exige biópsia: a explicação mecânica não pode servir de desculpa para não olhar a lesão com seriedade."
    proximo: c-investigacao
  - texto: "Concluir que a causa é mecânica, encaminhar ao dentista e reavaliar o peso em dois meses."
    avaliacao: erro
    feedback: "Encontrar uma explicação plausível é o momento de maior risco na investigação de emagrecimento: a busca para e a causa real fica escondida atrás dela. Em tabagista, úlcera oral que dura semanas é câncer de boca até que a biópsia diga o contrário."
    proximo: c-atraso
  - texto: "Encaminhar ao dentista e solicitar tomografia de tórax pelo tabagismo, deixando a boca com o especialista."
    avaliacao: aceitavel
    feedback: "A avaliação do pulmão em tabagista com perda de peso é razoável. O cuidado é não terceirizar a lesão que você já viu: garantir que a biópsia aconteça, e não apenas encaminhar, faz parte da responsabilidade de quem encontrou o achado."
    proximo: c-investigacao
:::

::: no
tipo: cena
id: c-atraso
texto: "Dois meses depois ele retorna com mais três quilos a menos e a úlcera maior, agora com bordas endurecidas. A biópsia, feita enfim, mostra carcinoma. O tempo perdido foi o intervalo em que a lesão ainda era pequena."
proximo: c-investigacao
:::

::: no
tipo: cena
id: c-investigacao
texto: "Os exames básicos mostram anemia leve e albumina reduzida, sem outras alterações relevantes. Você aplicou também uma escala de rastreio para depressão, que veio negativa. A biópsia da lesão oral foi agendada para a próxima semana."
dados:
  - "Anemia leve, hipoalbuminemia"
  - "Rastreio de depressão negativo"
  - "Biópsia oral agendada"
  - "Sem outros achados nos exames básicos"
proximo: d-suporte
:::

::: no
tipo: decisao
id: d-suporte
pergunta: "Enquanto a investigação corre, o que você faz pelo estado nutricional dele?"
opcoes:
  - texto: "Intervir agora: adequar a consistência da dieta enquanto a boca dói, orientar refeições fracionadas e mais calóricas, e reavaliar o peso a cada duas semanas."
    avaliacao: otima
    feedback: "Investigar e nutrir são tarefas simultâneas. Um idoso que perdeu peso chega mais frágil a qualquer tratamento que venha a precisar, e a desnutrição piora cicatrização, imunidade e tolerância a qualquer terapia. O acompanhamento seriado do peso também informa se a intervenção funcionou."
    proximo: fim-otimo
  - texto: "Aguardar o diagnóstico antes de qualquer intervenção nutricional, para não mascarar a evolução do peso."
    avaliacao: erro
    feedback: "O peso não é um exame que precisa ser preservado: ele é um parâmetro clínico que se deseja melhorar. Esperar o diagnóstico para começar a nutrir entrega ao tratamento futuro um paciente mais frágil, com pior resposta e mais complicações."
    proximo: fim-dano
  - texto: "Prescrever suplemento hipercalórico industrializado e reavaliar em um mês."
    avaliacao: aceitavel
    feedback: "O suplemento ajuda e sozinho rende pouco quando a barreira é mecânica: dói mastigar. Ajustar a consistência da comida de verdade e fracionar as refeições costuma render mais, e o suplemento entra como complemento, não como plano principal."
    proximo: c-suplemento
:::

::: no
tipo: cena
id: c-suplemento
texto: "Com o suplemento isolado, ele recupera meio quilo no mês. Quando a orientação alimentar é ajustada à dor na boca e a prótese é corrigida, o ganho acelera."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A biópsia confirma carcinoma de boca em estágio inicial, tratável com cirurgia limitada. Ele chega ao tratamento com o peso estabilizado e a prótese corrigida. Um ano depois, está livre de doença e recuperou seis dos oito quilos."
ensino: "Perda de peso involuntária começa por confirmar a perda com números e por um exame físico completo com o paciente despido, porque o achado que resolve costuma estar em boca, linfonodos, abdome ou toque retal. E existe uma armadilha específica: achar uma explicação plausível e parar de procurar. Em tabagista, lesão oral que não cicatriza é biópsia, mesmo quando há uma prótese mal adaptada para culpar."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico é feito e ele chega ao tratamento com peso ainda baixo, precisando de suporte nutricional mais intensivo no pós-operatório e de internação mais longa."
ensino: "Suplemento sozinho não vence uma barreira mecânica. Quando dói mastigar, ajustar a consistência da comida e corrigir a causa da dor rendem mais que qualquer fórmula, e as duas coisas correm junto com a investigação."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem intervenção nutricional durante a investigação, ele perde mais quatro quilos. Chega à cirurgia desnutrido, evolui com deiscência da ferida e infecção, e precisa de sonda de alimentação por dois meses."
ensino: "O estado nutricional não é um dado a ser preservado para observação, é um problema a ser tratado desde o primeiro dia. Investigar e nutrir acontecem ao mesmo tempo, porque a fragilidade acumulada durante a investigação cobra o preço no tratamento."
:::
