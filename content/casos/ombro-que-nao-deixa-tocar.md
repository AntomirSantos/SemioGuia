---
id: ombro-que-nao-deixa-tocar
titulo: O ombro que não deixava ninguém tocar
contexto: "Pronto atendimento de fim de semana. Um homem de 58 anos, diabético, chega com dor intensa no ombro direito há dois dias, que começou sem trauma e piorou rápido. Ele sustenta o braço junto ao corpo com a outra mão e não deixa ninguém encostar. Diz que sentiu 'um calafrio' na noite anterior."
tags: [osteoarticular, artrite septica, ombro, monoartrite]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/ombro-e-cotovelo
  - sistema-osteoarticular/exame-osteoarticular/principios-do-exame-osteoarticular
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame musculoesquelético"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho locomotor"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia osteoarticular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está sentado, inclinado para o lado direito, com o braço colado ao tronco e o cotovelo dobrado. A dor é contínua, piora ao mínimo movimento e não deixa dormir. Nega queda, esforço ou repetição de movimento. Faz hemodiálise há quatro anos por doença renal do diabetes, e usa cateter de longa permanência."
dados:
  - "Dor intensa no ombro direito há 2 dias, sem trauma"
  - "Calafrio na noite anterior"
  - "Temperatura 38,3 graus, FC 106 bpm"
  - "Diabetes, doença renal em hemodiálise, cateter de longa permanência"
  - "Braço mantido imóvel junto ao corpo"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Como você conduz o exame deste ombro?"
opcoes:
  - texto: "Inspeção comparativa, palpação suave procurando calor, derrame e ponto de maior dor, e sobretudo comparar movimento ativo com movimento passivo."
    avaliacao: otima
    feedback: "A comparação entre ativo e passivo é a chave do exame articular. Quando só o movimento ativo dói, o problema costuma estar nos tendões e músculos ao redor. Quando o passivo também dói e é igualmente limitado em todas as direções, o problema está dentro da articulação, e é ali que mora a artrite séptica."
    proximo: c-exame
  - texto: "Aplicar imediatamente as manobras específicas do manguito rotador, que é a causa mais frequente de dor no ombro."
    avaliacao: aceitavel
    feedback: "A frequência favorece o manguito, e por isso essas manobras seriam adequadas em outro contexto. Aqui há febre, calafrio e um paciente com cateter de longa permanência: antes de testar tendões, é preciso saber se a articulação está infectada. Frequência sem contexto conduz ao diagnóstico errado."
    proximo: c-exame
  - texto: "Prescrever anti-inflamatório e imobilização, com reavaliação ambulatorial em uma semana."
    avaliacao: erro
    feedback: "Anti-inflamatório em monoartrite febril mascara justamente o que precisa ser vigiado, e uma semana é muito tempo para uma articulação que pode estar sendo destruída em horas. Além disso, em quem faz diálise, anti-inflamatório traz riscos próprios."
    proximo: c-atraso
:::

::: no
tipo: cena
id: c-atraso
texto: "Cinco dias depois ele retorna pior: febre persistente, ombro com aumento de volume visível e movimento praticamente abolido. A articulação passou quase uma semana com pus dentro e sem drenagem."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "O ombro direito está discretamente aumentado de volume e mais quente que o esquerdo. A pele não tem borda de eritema definida. Ele não consegue realizar nenhum movimento ativo, e quando você tenta mover passivamente, mesmo alguns graus, ele grita e o braço resiste em todas as direções. Não há outras articulações acometidas. O local do cateter está limpo, sem secreção."
dados:
  - "Aumento de volume e calor local"
  - "Movimento ativo e passivo abolidos e dolorosos em todas as direções"
  - "Monoartrite, sem outras articulações envolvidas"
  - "Cateter sem sinais locais de infecção"
proximo: d-hipotese
:::

::: no
tipo: decisao
id: d-hipotese
pergunta: "Dor ao movimento passivo em todas as direções, com febre e monoartrite. Qual é a hipótese e o que ela exige?"
opcoes:
  - texto: "Artrite séptica até prova em contrário: a articulação precisa ser puncionada com urgência, e o líquido, enviado para análise e cultura, antes do antibiótico sempre que possível."
    avaliacao: otima
    feedback: "Monoartrite aguda com febre é artrite séptica até que a punção diga o contrário. A urgência tem motivo estrutural: o pus destrói a cartilagem em poucos dias, e o dano é irreversível. Colher antes do antibiótico aumenta muito a chance de identificar o agente, o que orienta semanas de tratamento. Em paciente com cateter permanente, a via de disseminação está declarada."
    proximo: c-puncao
  - texto: "Provável crise de gota ou pseudogota, dada a monoartrite aguda: iniciar anti-inflamatório e observar a resposta."
    avaliacao: erro
    feedback: "As duas doenças de fato produzem monoartrite aguda e podem cursar com febre baixa, e é por isso que a punção é obrigatória: cristais e infecção se distinguem no líquido, não pela impressão clínica. Tratar como gota sem puncionar, em paciente com porta de entrada vascular, é apostar contra o diagnóstico mais grave."
    proximo: c-puncao
  - texto: "Solicitar ressonância magnética do ombro para definir a estrutura acometida antes de qualquer procedimento."
    avaliacao: aceitavel
    feedback: "A imagem mostra derrame e ajuda a avaliar estruturas vizinhas, mas não diz se o líquido é infectado, e é isso que decide tudo. Ela pode ser feita depois, e nunca no lugar da punção quando a suspeita de infecção é alta."
    proximo: c-puncao
:::

::: no
tipo: cena
id: c-puncao
texto: "A punção guiada retira líquido turvo, amarelado e espesso. O material é enviado para contagem celular, pesquisa de cristais, coloração de Gram e cultura. As hemoculturas também são colhidas. A contagem celular volta muito elevada, com predomínio de neutrófilos, e não há cristais."
dados:
  - "Líquido sinovial turvo e espesso"
  - "Contagem celular muito elevada, predomínio neutrofílico"
  - "Sem cristais"
  - "Culturas de líquido e de sangue colhidas"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Com esse líquido, qual é o tratamento?"
opcoes:
  - texto: "Antibiótico endovenoso imediato e drenagem cirúrgica ou lavagem articular, acionando a ortopedia agora."
    avaliacao: otima
    feedback: "Artrite séptica se trata com as duas coisas juntas: antibiótico e esvaziamento do pus. O antibiótico sozinho penetra mal em uma cavidade cheia de material purulento sob pressão, e a cartilagem continua sendo digerida enquanto isso. Em articulações profundas como o ombro e o quadril, a drenagem costuma ser cirúrgica."
    proximo: fim-otimo
  - texto: "Antibiótico endovenoso isolado, reservando a drenagem para o caso de má resposta em quarenta e oito horas."
    avaliacao: aceitavel
    feedback: "Existem situações em que punções repetidas substituem a cirurgia, mas quarenta e oito horas de espera com pus sob pressão custam cartilagem que não se recupera. Se a opção for conservadora, ela exige drenagens repetidas e reavaliação em poucas horas, não em dois dias."
    proximo: c-espera
  - texto: "Aguardar o resultado da cultura para escolher o antibiótico mais adequado antes de iniciar."
    avaliacao: erro
    feedback: "A cultura leva dias e a cartilagem, horas. O material já foi colhido, que era a única razão para adiar. A partir daí o tratamento empírico começa imediatamente e se ajusta quando o resultado chegar."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-espera
texto: "Em quarenta e oito horas ele permanece febril e o ombro continua imóvel. A drenagem cirúrgica acaba sendo feita, com material purulento espesso e sinais iniciais de erosão da cartilagem."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O antibiótico começa na mesma hora e a lavagem cirúrgica acontece na madrugada. A cultura identifica um estafilococo, e o cateter de longa permanência é trocado. Ele completa o tratamento endovenoso e recupera quase toda a amplitude do ombro após a reabilitação."
ensino: "Monoartrite aguda com febre é artrite séptica até que a punção prove o contrário. O exame que separa articulação de estrutura periarticular é a comparação entre movimento ativo e passivo: dor e limitação em todas as direções, inclusive passivas, apontam para dentro da articulação. E o tratamento tem duas pernas, antibiótico e drenagem, porque pus sob pressão destrói cartilagem em dias."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera da infecção, mas fica com limitação permanente da elevação do braço acima da linha dos ombros e dor residual aos esforços."
ensino: "Antibiótico sozinho penetra mal em uma articulação cheia de pus sob pressão. Quando a opção inicial não é cirúrgica, a reavaliação é em horas e com drenagens repetidas, nunca em dois dias."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "A cultura fica pronta em três dias. Nesse intervalo a infecção evolui para destruição da cabeça umeral e para bacteremia persistente, com necessidade de retirada do cateter e de cirurgia extensa. Ele fica com o ombro praticamente sem movimento e dependente do braço esquerdo."
ensino: "Colher culturas antes do antibiótico é boa prática; esperar o resultado para começar não é. Em infecção articular, a diferença entre iniciar agora e iniciar em três dias é a diferença entre articulação preservada e articulação destruída."
:::
