---
id: febre-arrastada-e-sopro-novo
titulo: A febre arrastada e o sopro que não existia
contexto: "Ambulatório de clínica geral. Um homem de 39 anos vem pela terceira vez em cinco semanas com febre baixa, cansaço e falta de apetite. Já tomou dois antibióticos diferentes por 'infecção de garganta' e por 'infecção urinária', sem melhora. Perdeu seis quilos nesse período."
tags: [cardiovascular, endocardite, sopro, febre de origem indeterminada]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/sopros-cardiacos
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de sopros cardíacos e de febre"
  - "Porto, Semiologia Médica, 8ª ed., seção de endocardite infecciosa e ausculta cardíaca"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele parece cansado e emagrecido. Conta que a febre é quase diária, mais no fim da tarde, e que sua sempre à noite. Menciona, sem dar importância, que fez um tratamento de canal há dois meses. Tem antecedente de febre reumática na infância, que ele quase não lembra."
dados:
  - "Febre baixa quase diária há 5 semanas, sudorese noturna"
  - "Perda de 6 kg no período"
  - "Dois cursos de antibiótico sem melhora"
  - "Procedimento odontológico há 2 meses"
  - "Antecedente de febre reumática na infância"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Febre prolongada sem foco identificado. Como você conduz esta consulta?"
opcoes:
  - texto: "Fazer um exame físico completo e sem pressa, com o paciente despido, incluindo ausculta cardíaca em todos os focos e inspeção detalhada de pele, unhas, conjuntivas e fundo de olho."
    avaliacao: otima
    feedback: "Febre prolongada sem foco é a indicação clássica de exame completo e repetido: os achados que resolvem o caso costumam ser pequenos e periféricos. Na endocardite, o sopro novo é o achado central, e ao redor dele existem sinais discretos na pele, nas unhas e nas conjuntivas que só aparecem para quem procura com luz e paciência."
    proximo: c-exame
  - texto: "Prescrever um terceiro antibiótico de espectro mais amplo e reavaliar em uma semana."
    avaliacao: erro
    feedback: "Cada curso de antibiótico sem diagnóstico faz duas coisas ruins aqui: adia a investigação e reduz a chance de as hemoculturas identificarem o agente, que é justamente o que orienta semanas de tratamento na endocardite. Antibiótico às cegas em febre arrastada apaga a pista principal."
    proximo: c-atraso
  - texto: "Solicitar tomografia de tórax e abdome em busca do foco antes de qualquer exame físico detalhado."
    avaliacao: aceitavel
    feedback: "A imagem ampla tem lugar na investigação de febre prolongada, e ela vem depois do exame físico, não antes. Neste caso, o estetoscópio e uma lanterna encontrariam em dez minutos o que a tomografia não mostraria."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Três semanas depois ele retorna pior, com febre mantida e falta de ar aos esforços. As hemoculturas colhidas agora, já sob antibiótico, voltarão negativas, e o agente nunca será identificado. O exame que faltava é feito enfim."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Na ausculta, com ele sentado e em expiração, há um sopro diastólico aspirativo na borda esternal esquerda, que a esposa afirma nunca ter sido mencionado por nenhum médico antes. As conjuntivas mostram duas pequenas manchas hemorrágicas. Nas unhas das mãos há finas linhas avermelhadas longitudinais. Nas polpas dos dedos, dois nódulos pequenos e dolorosos. O baço é palpável a dois centímetros."
dados:
  - "Sopro diastólico aspirativo, novo"
  - "Hemorragias conjuntivais"
  - "Hemorragias subungueais lineares"
  - "Nódulos dolorosos nas polpas digitais"
  - "Baço palpável, temperatura 38,2 graus"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Como você interpreta esse conjunto?"
opcoes:
  - texto: "Endocardite infecciosa: sopro novo com febre prolongada e fenômenos vasculares periféricos, e a prioridade agora é colher hemoculturas seriadas antes de qualquer antibiótico."
    avaliacao: otima
    feedback: "Sopro novo e febre são a dupla que obriga a pensar em endocardite, e os achados periféricos vêm de êmbolos e de depósitos imunes que saem da valva doente. A sequência importa muito: várias amostras de hemocultura, colhidas de locais diferentes e antes do antibiótico, decidem o tratamento das próximas semanas."
    proximo: c-conduta
  - texto: "Doença reumatológica sistêmica, dada a combinação de febre, esplenomegalia e lesões de pele."
    avaliacao: aceitavel
    feedback: "A hipótese merece estar na lista, e várias vasculites produzem quadro parecido. O que muda a ordem de prioridade é a valva: sopro novo somado a febre prolongada obriga a excluir infecção primeiro, porque começar imunossupressor numa endocardite é desastroso."
    proximo: c-conduta
  - texto: "Sopro funcional pela febre e pela anemia, e a investigação deve seguir procurando um foco infeccioso oculto."
    avaliacao: erro
    feedback: "Sopros funcionais são sistólicos e suaves, e nunca diastólicos. Todo sopro diastólico é orgânico e merece investigação, e neste contexto ele é o achado que fecha o raciocínio. Chamar de funcional é descartar a pista mais importante do caso."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Três amostras de hemocultura são colhidas em locais diferentes e o ecocardiograma é solicitado. O transtorácico mostra uma imagem sugestiva de vegetação na valva aórtica com regurgitação importante. Ele mantém febre, mas está estável, sem sinais de congestão, com pressão de 122 x 58 mmHg."
dados:
  - "Três hemoculturas colhidas antes do antibiótico"
  - "Vegetação em valva aórtica com regurgitação importante"
  - "Sem sinais de congestão pulmonar"
  - "PA 122 x 58 mmHg, com pressão de pulso ampla"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Como você conduz o tratamento a partir daqui?"
opcoes:
  - texto: "Internar, iniciar antibiótico endovenoso empírico após as culturas, envolver a cirurgia cardíaca desde já e vigiar sinais de insuficiência cardíaca e de embolia a cada dia."
    avaliacao: otima
    feedback: "O tratamento é longo e endovenoso, e a avaliação cirúrgica precoce faz parte dele: regurgitação importante, insuficiência cardíaca, vegetação grande ou infecção não controlada são situações em que a cirurgia entra, às vezes antes de completar o antibiótico. A vigilância diária é do exame: sopro que muda, congestão que aparece, novo déficit neurológico."
    proximo: fim-otimo
  - texto: "Tratar com antibiótico oral em casa, com retornos semanais, já que ele está estável e trabalha."
    avaliacao: erro
    feedback: "A endocardite exige concentração sustentada de antibiótico dentro da vegetação, e isso não se consegue com esquema oral comum nem com adesão domiciliar em semanas de tratamento. Além disso, a complicação mais temida, a insuficiência cardíaca aguda por destruição valvar, aparece em dias e precisa de vigilância diária."
    proximo: fim-dano
  - texto: "Internar e iniciar antibiótico, deixando a avaliação da cirurgia para o caso de piora clínica."
    avaliacao: aceitavel
    feedback: "Internar e tratar está correto, e adiar a conversa com o cirurgião não. Com regurgitação importante, a probabilidade de indicação cirúrgica é alta, e a equipe precisa conhecer o paciente antes de ele piorar. Avaliação precoce não significa operar cedo, significa não decidir às pressas."
    proximo: c-espera-cirurgia
:::

::: no
tipo: cena
id: c-espera-cirurgia
texto: "No sexto dia ele desenvolve dispneia e estertores nas bases. A avaliação cirúrgica é solicitada em caráter de urgência, com o paciente já congesto e com a valva mais destruída do que estava na admissão."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "As hemoculturas identificam o agente e o esquema é ajustado. A equipe cirúrgica acompanha desde o início e opera na terceira semana, de forma programada, com troca valvar. Ele completa o tratamento e volta ao trabalho em dois meses, com a profilaxia odontológica devidamente orientada."
ensino: "Febre prolongada sem foco pede exame físico completo e repetido, porque os achados que resolvem são pequenos. Sopro novo com febre obriga a pensar em endocardite. Todo sopro diastólico é orgânico. E a ordem importa: hemoculturas seriadas antes do antibiótico, porque é o agente identificado que orienta semanas de tratamento."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele é operado de urgência com insuficiência cardíaca instalada, exigindo terapia intensiva no pós-operatório. Recupera-se, com internação de cinco semanas."
ensino: "Na endocardite com regurgitação importante, a avaliação cirúrgica precoce é parte do tratamento clínico. Chamar o cirurgião apenas quando o paciente piora troca uma cirurgia programada por uma cirurgia de resgate."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Duas semanas depois ele retorna com dispneia intensa, sopro mais rude e insuficiência cardíaca aguda por perfuração valvar. Precisa de cirurgia de emergência e, no pós-operatório, apresenta um acidente vascular embólico com sequela motora."
ensino: "Tratamento oral e domiciliar não alcança a vegetação nem permite a vigilância que a doença exige. Na endocardite, a internação e a via endovenosa não são formalidade: são o que garante concentração adequada da droga e a detecção precoce da destruição valvar."
:::
