---
id: dor-que-obriga-a-parar-na-esquina
titulo: A dor que obriga a parar na esquina
contexto: "Ambulatório de clínica geral. Um homem de 68 anos, diabético e hipertenso, conta que sente uma dor na panturrilha direita ao caminhar. Ele já sabe a distância exata: uma quadra e meia. Para, espera dois ou três minutos e a dor passa. Aí caminha de novo. Ele acha que é 'problema de coluna'."
tags: [vascular, claudicacao, pulsos, insuficiencia arterial]
topicosDeApoio:
  - sistema-vascular-periferico/exame-vascular-periferico/insuficiencia-arterial-cronica
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame arterial periférico"
  - "Porto, Semiologia Médica, 8ª ed., seção de doenças arteriais periféricas"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia do sistema vascular periférico"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele descreve a dor como um aperto na batata da perna, sempre no mesmo lugar, que aparece depois de uma distância previsível e some com o repouso em pé, sem precisar sentar. Piora quando ele anda mais rápido ou sobe ladeira. Fuma há cinquenta anos. Nunca teve dor em repouso nem ferida no pé."
dados:
  - "Dor em panturrilha direita após distância previsível"
  - "Alívio com repouso em pé, em 2 a 3 minutos"
  - "Piora com velocidade e com aclive"
  - "Diabetes, hipertensão, tabagismo de 50 anos"
  - "Sem dor em repouso, sem úlceras"
proximo: d-diferencial
:::

::: no
tipo: decisao
id: d-diferencial
pergunta: "Ele acha que é coluna. Como você separa as duas coisas pela história?"
opcoes:
  - texto: "Pela previsibilidade da distância, pelo alívio ao parar mesmo em pé e pela piora com o aclive: a dor vascular obedece ao consumo de oxigênio do músculo, a de origem na coluna obedece à postura."
    avaliacao: otima
    feedback: "A distinção é quase toda de história. A claudicação vascular aparece sempre na mesma distância, piora quando o músculo trabalha mais, e alivia parando, sem depender de sentar ou de curvar o tronco. A dor de origem lombar melhora ao sentar ou ao flexionar a coluna, varia de distância conforme o dia e às vezes piora só de ficar em pé parado."
    proximo: c-exame
  - texto: "Solicitar ressonância de coluna lombar, já que o paciente atribui à coluna e a doença degenerativa é frequente nessa idade."
    avaliacao: erro
    feedback: "Achados degenerativos aparecem em quase todo mundo nessa faixa etária, e encontrá-los não prova que sejam a causa. Começar pela imagem da coluna em quem descreve claudicação típica costuma produzir um diagnóstico falso e adiar o vascular, cujo exame é gratuito e leva cinco minutos."
    proximo: c-atraso
  - texto: "Pedir ultrassom com doppler arterial de imediato, que é o exame que confirma a doença arterial."
    avaliacao: aceitavel
    feedback: "O doppler será útil no planejamento. O primeiro passo continua sendo o exame físico com a medida do índice entre a pressão do tornozelo e a do braço, que é simples, barato, feito no consultório e responde à pergunta principal."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "A ressonância mostra alterações degenerativas compatíveis com a idade, e ele passa quatro meses em fisioterapia sem melhora. Volta com a mesma dor, agora após meia quadra."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com as duas pernas expostas e comparadas, a pele da perna direita é mais fina e brilhante, com rarefação de pelos, e as unhas dos pés são espessas. O pé direito é mais frio ao dorso da sua mão. O pulso femoral direito está presente, o poplíteo está diminuído e o pedioso e o tibial posterior não são palpáveis. À esquerda todos estão presentes. Ao elevar a perna direita, o pé empalidece; ao pendurá-la, demora a recorar e fica avermelhado."
dados:
  - "Rarefação de pelos, pele fina e brilhante, unhas espessas"
  - "Pé direito mais frio"
  - "Pediosos e tibial posterior direitos ausentes"
  - "Palidez à elevação e rubor pendente à direita"
proximo: d-indice
:::

::: no
tipo: decisao
id: d-indice
pergunta: "Você tem um aparelho de pressão e um doppler portátil no consultório. Como completa o exame?"
opcoes:
  - texto: "Medir a pressão sistólica nos braços e nos tornozelos e calcular o índice entre elas, lembrando que valores muito altos, acima do normal, também são anormais em diabéticos por calcificação arterial."
    avaliacao: otima
    feedback: "Essa medida transforma a impressão do exame em número reprodutível, custa poucos minutos e pode ser repetida ao longo dos anos. A ressalva do diabético é importante: artérias calcificadas não se comprimem bem e produzem valores falsamente altos, o que exige interpretação cuidadosa e, às vezes, outra abordagem para medir."
    proximo: c-conduta
  - texto: "Considerar o exame suficiente: pulsos ausentes com palidez à elevação já bastam para o diagnóstico."
    avaliacao: aceitavel
    feedback: "O diagnóstico clínico está bem construído mesmo, e o número acrescenta três coisas: gradua a gravidade, orienta a urgência do encaminhamento e serve de linha de base para comparações futuras. É pouco esforço para bastante ganho."
    proximo: c-conduta
  - texto: "Medir apenas a pressão do tornozelo direito e comparar com o valor de referência da população."
    avaliacao: erro
    feedback: "O índice existe porque cada paciente é sua própria referência: a pressão do tornozelo só significa alguma coisa comparada à do braço do mesmo paciente, no mesmo momento. Comparar com valor populacional não informa nada de útil."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "O índice à direita está reduzido, compatível com doença arterial de grau moderado. Ele pergunta o que precisa fazer, e diz que ouviu falar de 'uma cirurgia que desentope'. Está motivado a resolver rápido, porque quer voltar a caminhar com a esposa."
dados:
  - "Índice tornozelo braquial reduzido à direita"
  - "Claudicação limitante, sem dor em repouso"
  - "Paciente pergunta sobre revascularização"
  - "Tabagismo ativo, diabetes em controle irregular"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Qual é o tratamento inicial da claudicação sem isquemia crítica?"
opcoes:
  - texto: "Programa de caminhada supervisionada, cessação do tabagismo e controle agressivo dos fatores de risco, com antiagregante e estatina, reservando a revascularização para quem não melhora ou piora."
    avaliacao: otima
    feedback: "O exercício é tratamento, e não conselho genérico: caminhar até quase o limite da dor, repetidas vezes, várias vezes por semana, aumenta a distância percorrida de forma comparável a procedimentos em muitos pacientes. Some a isso o controle dos fatores de risco, cujo objetivo maior nem é a perna: quem tem doença arterial periférica tem risco cardiovascular alto em todo o corpo."
    proximo: fim-otimo
  - texto: "Encaminhar diretamente para revascularização, já que existe obstrução documentada e ele está motivado."
    avaliacao: erro
    feedback: "Obstrução documentada não é, por si, indicação de procedimento. Na claudicação sem isquemia crítica, o tratamento clínico com exercício estruturado tem resultado comparável em muitos casos e sem os riscos e a necessidade de reintervenções. A revascularização entra quando o tratamento clínico falha ou quando há ameaça ao membro."
    proximo: fim-dano
  - texto: "Orientar que ele caminhe o quanto conseguir e prescrever antiagregante, com retorno em seis meses."
    avaliacao: aceitavel
    feedback: "A direção está certa e a dose está vaga. Caminhar sem estrutura rende pouco: o programa que funciona tem frequência, duração e a instrução de caminhar até quase o limite da dor, parar, e recomeçar. Sem isso, o paciente anda menos justamente para não sentir dor, e o efeito não acontece."
    proximo: c-vago
:::

::: no
tipo: cena
id: c-vago
texto: "Seis meses depois a distância continua a mesma. Ele conta que passou a evitar caminhar para não sentir dor, exatamente o oposto do que o tratamento pedia. O programa é então explicado em detalhe e a evolução muda."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com programa de caminhada estruturado, cessação do tabagismo e controle dos fatores de risco, em seis meses ele caminha quatro quadras sem parar. O índice melhora discretamente, e o que mais mudou foi a distância percorrida. Ele volta a caminhar com a esposa aos domingos."
ensino: "Claudicação se diagnostica pela história: distância previsível, alívio ao parar sem precisar sentar, piora no aclive. O exame confirma com pulsos, temperatura, pele e a manobra de elevação, e o índice entre tornozelo e braço transforma isso em número. E o tratamento inicial é exercício estruturado com controle de fatores de risco, não procedimento."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele perde seis meses caminhando menos do que deveria e só depois entra em um programa estruturado, com boa resposta a partir daí."
ensino: "Exercício na claudicação é prescrição, com frequência, duração e a instrução de chegar perto do limite da dor. Orientação vaga faz o paciente evitar a dor, e evitar a dor é evitar o tratamento."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ele é submetido a angioplastia sem tratamento clínico prévio. A artéria reobstrui em oito meses, porque o tabagismo continuou e os fatores de risco não foram controlados. Precisa de nova intervenção e, dois anos depois, apresenta um infarto."
ensino: "Na claudicação sem isquemia crítica, procedimento sem tratamento clínico costuma render alívio temporário e reobstrução. E o risco maior deste paciente não estava na perna: doença arterial periférica é marcador de doença aterosclerótica sistêmica, e é o coração que costuma cobrar a conta."
:::
