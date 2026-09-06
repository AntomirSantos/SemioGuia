---
id: panturrilha-que-inchou-na-viagem
titulo: A panturrilha que inchou na viagem
contexto: "Ambulatório de clínica geral, segunda-feira. Uma mulher de 44 anos voltou ontem de uma viagem de ônibus de dezoito horas e acordou hoje com a perna esquerda inchada e dolorida. Ela usa anticoncepcional combinado e fuma cerca de dez cigarros por dia. Chegou andando, com dificuldade, apoiada no marido."
tags: [vascular, trombose venosa, edema, membro inferior]
topicosDeApoio:
  - sistema-vascular-periferico/exame-vascular-periferico/doenca-venosa-cronica-e-trombose
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame venoso dos membros inferiores"
  - "Porto, Semiologia Médica, 8ª ed., seção de doenças venosas"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia do sistema vascular periférico"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A perna esquerda está visivelmente maior que a direita, do joelho para baixo. A pele está avermelhada e quente ao toque, e ela reclama de dor ao apoiar o pé no chão. O marido comenta que a mãe dele teve 'trombose depois de uma cirurgia' e ficou internada semanas."
dados:
  - "Edema unilateral do membro inferior esquerdo há 1 dia"
  - "Viagem de ônibus de 18 horas há 2 dias"
  - "Uso de anticoncepcional combinado, tabagismo"
  - "Dor à deambulação, pele avermelhada e quente"
  - "FC 88 bpm, temperatura 37,3 graus, saturação 97%"
proximo: d-exame
:::

::: no
tipo: decisao
id: d-exame
pergunta: "Como você examina essa perna?"
opcoes:
  - texto: "Medir a circunferência das duas panturrilhas no mesmo ponto de referência, comparar temperatura e coloração, procurar edema depressível, veias superficiais dilatadas e dor à compressão da musculatura, e sempre palpar os pulsos arteriais."
    avaliacao: otima
    feedback: "A comparação com o lado oposto é o que dá sentido a cada achado, e a fita métrica transforma impressão em número reprodutível. Palpar os pulsos arteriais parece deslocado numa suspeita venosa, e não é: o edema muito volumoso pode comprometer a perfusão, e há formas graves de trombose que cursam com palidez e isquemia do membro."
    proximo: c-exame
  - texto: "Pesquisar imediatamente a dor à dorsiflexão do pé, que é o sinal clássico de trombose."
    avaliacao: aceitavel
    feedback: "Esse sinal é conhecido e pouco confiável: aparece em boa parte das pessoas sem trombose e falta em muitas que têm. Ele não sustenta nem afasta o diagnóstico sozinho. O que constrói a suspeita é o conjunto, com a assimetria medida e o contexto de risco."
    proximo: c-exame
  - texto: "Massagear a panturrilha para avaliar a consistência da musculatura e a mobilidade do edema."
    avaliacao: erro
    feedback: "Massagem vigorosa sobre uma panturrilha com suspeita de trombose é manobra a ser evitada. A palpação deve ser suave e com objetivo definido, e nenhuma informação obtida com pressão intensa vale o risco de mobilizar material trombótico."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A panturrilha esquerda mede três centímetros e meio a mais que a direita, medidas dez centímetros abaixo da tuberosidade tibial. O edema deixa marca do dedo até a altura do joelho. A pele está mais quente e avermelhada, sem borda nítida, sem porta de entrada visível, sem pus. As veias superficiais do dorso do pé estão mais salientes que à direita. Todos os pulsos arteriais estão presentes e simétricos, e o pé tem temperatura preservada."
dados:
  - "Diferença de 3,5 cm entre as panturrilhas"
  - "Edema depressível até o joelho"
  - "Eritema difuso, sem borda nítida, sem porta de entrada"
  - "Circulação colateral superficial visível"
  - "Pulsos arteriais presentes e simétricos"
proximo: d-diferencial
:::

::: no
tipo: decisao
id: d-diferencial
pergunta: "A perna está vermelha e quente. Trombose ou erisipela?"
opcoes:
  - texto: "Trombose é a hipótese principal: o eritema é difuso e sem borda nítida, não há porta de entrada nem febre alta, e há edema com colaterais superficiais em contexto de risco."
    avaliacao: otima
    feedback: "A trombose inflama e por isso também esquenta e avermelha, o que confunde. O que separa as duas é o desenho: a infecção de pele costuma ter borda elevada e bem delimitada, com porta de entrada e febre mais alta, enquanto a trombose produz eritema difuso, edema que marca o dedo e às vezes veias superficiais mais salientes. O contexto aqui pesa muito: imobilidade prolongada, anticoncepcional e tabagismo."
    proximo: c-conduta
  - texto: "Erisipela: pele quente e vermelha com dor é infecção até prova em contrário, e o antibiótico deve começar hoje."
    avaliacao: erro
    feedback: "Sem porta de entrada, sem borda nítida e sem febre significativa, a infecção perde força. E o custo do engano é alto: tratar como erisipela adia a anticoagulação de alguém que pode embolizar nos próximos dias. Quando as duas hipóteses competem, é a trombose que precisa ser afastada primeiro."
    proximo: c-atraso
  - texto: "As duas hipóteses são igualmente prováveis: iniciar antibiótico e anticoagulante ao mesmo tempo."
    avaliacao: aceitavel
    feedback: "Cobrir tudo parece seguro e traz custos: o antibiótico desnecessário tem efeitos adversos e mascara a evolução. Aqui os achados já favorecem uma das hipóteses, e o exame de imagem confirma em poucas horas. Escolher com base no exame é melhor do que não escolher."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela recebe antibiótico oral e volta em três dias com a perna ainda maior, a dor igual e nenhuma melhora do eritema. A infecção que não existia não respondeu ao tratamento, e a investigação recomeça com três dias perdidos."
proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "O ultrassom com doppler venoso está disponível para hoje à tarde, em quatro horas. Ela nega dor torácica e falta de ar. Não há sangramento ativo, não usa outro anticoagulante e não teve cirurgia recente."
dados:
  - "Ultrassom com doppler agendado para daqui a 4 horas"
  - "Sem sintomas respiratórios"
  - "Sem contraindicação à anticoagulação"
proximo: d-anticoagulacao
:::

::: no
tipo: decisao
id: d-anticoagulacao
pergunta: "O exame confirmatório sai em quatro horas. Você espera ou anticoagula agora?"
opcoes:
  - texto: "Anticoagular já, dada a alta probabilidade clínica e a ausência de contraindicação, mantendo o exame agendado para confirmar."
    avaliacao: otima
    feedback: "Com probabilidade alta e risco de sangramento baixo, a primeira dose não espera o laudo. O risco que se corre ao adiar não é o de a perna piorar, é o de um trombo migrar para o pulmão nas próximas horas. Se o exame afastar, suspende-se sem prejuízo."
    proximo: fim-otimo
  - texto: "Esperar o resultado: anticoagular sem confirmação expõe a paciente a sangramento desnecessário."
    avaliacao: erro
    feedback: "A cautela seria correta em probabilidade baixa. Aqui o quadro é típico e o contexto de risco é claro, e o intervalo de espera é justamente quando a embolia acontece. Cautela mal calibrada também produz dano, e neste caso ele é grave."
    proximo: fim-dano
  - texto: "Solicitar o dímero D para reforçar a decisão antes de iniciar o anticoagulante."
    avaliacao: aceitavel
    feedback: "Esse exame serve para afastar em quem tem probabilidade baixa, e não é o caso. Com quadro típico, o resultado alterado não acrescenta e o normal não convenceria ninguém a parar. Pedir apenas adia."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "O resultado sai em duas horas e vem alterado, como esperado. A anticoagulação começa com esse atraso e o doppler confirma trombose femoropoplítea à esquerda."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A primeira dose é aplicada no consultório. O doppler da tarde confirma trombose venosa profunda femoropoplítea esquerda. Ela segue o tratamento ambulatorial, sem embolia, e o anticoncepcional combinado é substituído na mesma consulta, com a orientação sobre risco na próxima viagem longa."
ensino: "Trombose venosa profunda também inflama, e por isso avermelha e esquenta como uma infecção de pele. O desenho separa as duas: eritema difuso sem borda nítida e sem porta de entrada, com edema que marca o dedo, favorece a trombose; borda elevada e bem delimitada com porta de entrada favorece a infecção. Com probabilidade alta e sem contraindicação, a anticoagulação começa antes do exame confirmatório."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O tratamento correto começa com duas horas de atraso, gastas em um exame que não mudaria a conduta. A evolução é boa, sem complicações."
ensino: "Cada exame tem uma função. Testes desenhados para afastar em probabilidade baixa não acrescentam nada quando o quadro já é típico, e pedi-los nessas condições transforma investigação em espera."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Duas horas depois, ainda aguardando o doppler, ela apresenta falta de ar súbita, dor torácica e saturação de 86%. A angiotomografia confirma embolia pulmonar bilateral. Ela é internada, precisa de oxigênio em alto fluxo por dois dias e recebe alta após uma semana."
ensino: "O risco de adiar a anticoagulação não está na perna, está no pulmão. Em paciente com quadro típico e sem contraindicação, o laudo confirma o que a clínica já decidiu, e o intervalo entre a suspeita e a primeira dose é a janela em que a embolia acontece."
:::
