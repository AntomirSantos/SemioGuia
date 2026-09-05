---
id: febre-e-nuca-dura
titulo: Febre, cefaleia e uma nuca que não dobra
contexto: "Plantão noturno de pronto-socorro. O colega da república traz um universitário de 19 anos que 'não está bem desde a tarde': febre alta, dor de cabeça que só piora e agora umas respostas fora de hora."
tags: [nervoso, meningite, sinais meningeos, febre, emergencia]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/marcha-e-sinais-meningeos
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 26 (Meninges)"
  - "Porto, Semiologia Médica, 8ª ed., cap. 174 (Doenças do Sistema Nervoso), Síndrome meníngea"
  - "Porto, Exame Clínico, 8ª ed., cap. 20 (Exame Neurológico)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está deitado na maca com o antebraço sobre os olhos, incomodado com a luz. Responde ao chamado, sabe onde está, mas demora e perde o fio de uma das respostas. O amigo conta que a dor de cabeça começou de manhã e virou 'a pior da vida' ao longo do dia, com febre e um vômito no caminho."
dados:
  - "Temperatura axilar 39,2 °C"
  - "FC 112 bpm"
  - "PA 116 x 70 mmHg"
  - "FR 20 irpm"
  - "SpO2 97% em ar ambiente"
  - "Fotofobia evidente; sonolento, desperta ao chamado"
proximo: d-primeiro
:::

::: no
tipo: decisao
id: d-primeiro
pergunta: "Febre, cefaleia intensa e sonolência. O que o seu exame busca primeiro?"
opcoes:
  - texto: "Sinais meníngeos com técnica explícita e a pele despida da cabeça aos pés, antes de qualquer exame complementar."
    avaliacao: otima
    feedback: "É o par que decide os próximos minutos. A pesquisa correta: decúbito dorsal sem travesseiro, mão na região occipital, flexão da cabeça buscando a resistência que impede o queixo de alcançar o esterno; depois Brudzinski (flexão da cabeça observando os membros inferiores) e Kernig. E a pele inteira, porque petéquias mudam a hipótese e a pressa."
    proximo: c-sinais
  - texto: "Colher os laboratórios, solicitar a tomografia e aguardar os resultados para decidir se examina a nuca."
    avaliacao: erro
    feedback: "A ordem está invertida. Os trinta segundos dos sinais meníngeos e a inspeção da pele vêm antes de qualquer fila: se a hipótese é meningite bacteriana, cada hora de espera custa prognóstico, e nenhum resultado de sangue pesquisa rigidez de nuca por você."
    proximo: c-atraso
  - texto: "Testar a nuca por cima do travesseiro, num movimento rápido, e seguir para o restante do exame neurológico completo."
    avaliacao: aceitavel
    feedback: "Pesquisar já é melhor que pular, mas a rigidez de nuca é dos achados menos concordantes entre examinadores justamente porque cada um a pesquisa de um jeito. Sem travesseiro, mão occipital, flexão lenta buscando resistência e a referência do queixo ao esterno: técnica explícita é o que torna o achado confiável."
    proximo: c-sinais
:::

::: no
tipo: cena
id: c-sinais
texto: "Sem travesseiro, sua mão na região occipital encontra uma resistência elástica: o queixo não chega nem perto do esterno, e ele geme na tentativa. Ao fletir a cabeça, os joelhos sobem discretamente. Kernig positivo à direita. Na inspeção da pele, três petéquias no tornozelo direito e duas no esquerdo, que não somem à digitopressão."
dados:
  - "Rigidez de nuca presente, com técnica adequada"
  - "Brudzinski positivo"
  - "Kernig positivo, assimétrico"
  - "Petéquias em tornozelos, não desaparecem à digitopressão"
  - "Sem déficit focal grosseiro; sonolência flutuante"
proximo: d-colega
:::

::: no
tipo: cena
id: c-atraso
texto: "Uma hora depois, a tomografia ainda não foi feita e o laboratório está na fila. O amigo chama: ele está mais sonolento, respondendo menos. Você volta à maca, agora com a sensação de ter deixado o relógio correr contra o paciente."
proximo: d-recuperar
:::

::: no
tipo: decisao
id: d-recuperar
pergunta: "O tempo passou e ele piorou. O que fazer agora?"
opcoes:
  - texto: "Examinar agora: sinais meníngeos com técnica, pele despida, e decidir com o que o exame mostrar."
    avaliacao: otima
    feedback: "O exame que você faz agora é o mesmo que estava disponível uma hora atrás. Ele ainda decide, só que com uma hora a menos de vantagem."
    proximo: c-sinais
  - texto: "Insistir na tomografia primeiro: sem imagem não se decide nada em cefaleia com febre."
    avaliacao: erro
    feedback: "A imagem tem seu papel na sequência da punção, mas não pesquisa rigidez de nuca, não vê petéquia e não prescreve a primeira dose. Esperar a fila com uma meningite bacteriana em evolução é o erro que os livros de plantão contam no capítulo das tragédias."
    proximo: fim-dano
:::

::: no
tipo: decisao
id: d-colega
pergunta: "O interno do lado comenta: 'mas o Kernig é fraquinho e num estudo a rigidez de nuca teve sensibilidade de 20%; se os sinais fossem negativos a gente nem precisaria pensar em meningite, né?'. Você responde que..."
opcoes:
  - texto: "A ausência dos três sinais meníngeos não afasta meningite: a decisão de puncionar não se apoia neles."
    avaliacao: otima
    feedback: "Exato. As razões de verossimilhança negativas dos três sinais não alcançaram significância: negativos, eles não reduzem a probabilidade de forma útil. As sensibilidades baixas vêm de estudos em que a maioria das meningites era asséptica; no paciente com meningite bacteriana instalada, os sinais são mais frequentes. Aqui, positivos e acompanhados de febre, rebaixamento e petéquias, eles só aumentam a pressa."
    proximo: d-conduta
  - texto: "Ele tem razão em parte: com sinais negativos daria para observar e repetir o exame em algumas horas."
    avaliacao: erro
    feedback: "Não neste quadro. Febre alta, cefaleia intensa, sonolência flutuante e petéquias compõem probabilidade demais para qualquer espera, com ou sem sinais meníngeos. O que os números dizem é o contrário do que o colega concluiu: sinais negativos não devolvem segurança nenhuma."
    proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Síndrome meníngea febril com petéquias e rebaixamento flutuante. Qual é a sequência?"
opcoes:
  - texto: "Coletar culturas, iniciar antibiótico já, com precaução de gotículas, e organizar a punção lombar na sequência que o serviço define."
    avaliacao: otima
    feedback: "É a ordem que salva. Na suspeita de meningite bacteriana, a primeira dose não espera a punção quando a punção vai demorar; culturas colhidas, o tratamento precoce muda mortalidade e sequela. O isolamento protege a equipe e a enfermaria na hipótese de doença meningocócica."
    proximo: fim-otimo
  - texto: "Aguardar o resultado da punção lombar para escolher o antibiótico certo desde a primeira dose."
    avaliacao: erro
    feedback: "A elegância microbiológica custa horas que este paciente não tem. O esquema empírico existe exatamente para este momento; a punção e as culturas ajustam depois."
    proximo: fim-dano
  - texto: "Iniciar o antibiótico e considerar o caso resolvido: a punção fica para o dia seguinte, se ainda for necessária."
    avaliacao: aceitavel
    feedback: "A primeira metade está certa e é a que mais pesa. Mas abrir mão da punção é abrir mão da confirmação, do ajuste do esquema e da informação epidemiológica: ela segue na sequência, o quanto antes for seguro."
    proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A primeira dose corre em menos de uma hora da chegada. A punção confirma meningite bacteriana; a cultura, dias depois, fecha o agente. Ele deixa a UTI no terceiro dia, sem sequela aparente, e o registro do caso vira aula: a técnica da rigidez de nuca descrita passo a passo no prontuário."
ensino: "Na síndrome meníngea febril, o exame físico decide a pressa: rigidez de nuca com técnica explícita, Brudzinski, Kernig e a pele inteira atrás de petéquias. Sinais meníngeos ausentes não afastam meningite (as razões de verossimilhança negativas não alcançam significância), e a primeira dose de antibiótico não espera fila de exame."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele melhora com o esquema empírico, mas a ausência da punção deixa o caso sem agente, o esquema sem ajuste e a vigilância sem notificação precisa. A discussão matinal aprova a primeira dose e cobra a segunda metade da conduta."
ensino: "Antibiótico precoce é a decisão que muda o desfecho, mas a punção lombar continua sendo a confirmação que organiza todo o resto: ajuste do esquema, duração, isolamento e epidemiologia. Uma conduta certa pela metade cobra juros depois."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Quando a imagem finalmente sai, ele já não desperta ao chamado. A primeira dose entra com horas de atraso e a internação termina em UTI prolongada, com sequela auditiva. Na revisão do caso, a linha do tempo mostra o intervalo em branco entre a chegada e a primeira decisão."
ensino: "Meningite bacteriana é diagnóstico de minutos, não de fila. Os trinta segundos dos sinais meníngeos e a inspeção da pele valem mais que qualquer espera, e a primeira dose empírica, com culturas colhidas, não aguarda punção que vai demorar. O tempo é o insumo que nenhum resultado devolve."
:::
