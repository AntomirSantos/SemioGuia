---
id: dor-que-mudou-de-lugar
titulo: A dor que mudou de lugar
contexto: "Emergência de hospital geral, três da manhã. Um homem de 58 anos, hipertenso que 'toma o remédio quando lembra', chega andando, pálido, e conta que a dor começou no peito de uma vez só, forte desde o primeiro segundo, e que agora dói mais entre as escápulas do que na frente."
tags: [cardiovascular, disseccao de aorta, pulsos, emergencia]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/sopros-cardiacos
  - sistema-vascular-periferico/exame-vascular-periferico/pulsos-arteriais-perifericos
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de dor torácica aguda e exame arterial"
  - "Porto, Semiologia Médica, 8ª ed., seção de doenças da aorta e exame dos pulsos"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele descreve a dor com a mão fechada e a palavra 'rasgando'. Diz que estava assistindo televisão quando começou, e que era máxima já no início, sem crescer aos poucos. Em vinte minutos o peito melhorou um pouco e as costas pioraram. Está inquieto na maca, não encontra posição."
dados:
  - "Dor torácica súbita, máxima desde o início, migrando para o dorso"
  - "PA 190 x 110 mmHg no braço direito"
  - "FC 92 bpm, regular"
  - "Hipertensão de longa data, tratamento irregular"
  - "Sem sudorese fria, sem náusea"
proximo: d-primeiro-gesto
:::

::: no
tipo: decisao
id: d-primeiro-gesto
pergunta: "Dor torácica em hipertenso, com o eletrocardiograma ainda sendo montado. Qual é o seu primeiro gesto de exame?"
opcoes:
  - texto: "Medir a pressão nos dois braços e palpar, em sequência, carótidas, radiais, femorais e pediosos, comparando os dois lados."
    avaliacao: otima
    feedback: "A história já pediu isso: dor máxima desde o início e que migra é assinatura de dissecção, não de placa que rompeu. Antes de qualquer antitrombótico, o exame precisa procurar o que separa as duas doenças, e o que separa está nos pulsos e nas duas pressões. É um minuto de exame que muda toda a prescrição."
    proximo: c-exame
  - texto: "Acionar o protocolo de dor torácica: dupla antiagregação e anticoagulante enquanto o traçado não sai."
    avaliacao: erro
    feedback: "É a decisão que mais mata nesse cenário. O protocolo foi desenhado para a placa que rompeu, e a mesma droga que salva ali sangra aqui. Uma história de dor máxima desde o início e migratória obriga a excluir dissecção antes, e a exclusão começa com as mãos, não com o laboratório."
    proximo: c-atraso
  - texto: "Pedir o dímero D e aguardar: se vier normal, a suspeita de dissecção cai muito."
    avaliacao: aceitavel
    feedback: "O exame tem valor para afastar em suspeita baixa, mas aqui a suspeita não é baixa, e esperar resultado com a pressão em 190 x 110 é gastar o tempo em que a aorta continua se descolando. O exame à beira do leito é mais rápido e, neste caso, mais informativo."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "As drogas são administradas. Vinte minutos depois, o eletrocardiograma volta sem supradesnivelamento, ele fica mais pálido e refere a dor descendo para o abdome. Só então alguém mede a pressão no outro braço."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você mede com o mesmo aparelho, um braço depois do outro: 190 x 110 mmHg à direita e 142 x 84 mmHg à esquerda. O pulso radial esquerdo é nitidamente menos amplo. Na ausculta, com ele sentado e em expiração, um sopro diastólico aspirativo na borda esternal direita alta que a família jura nunca ter ouvido falar. Femorais presentes e simétricos. Sem déficit neurológico."
dados:
  - "Diferença de pressão entre os braços: cerca de 50 mmHg"
  - "Pulso radial esquerdo de menor amplitude"
  - "Sopro diastólico aspirativo em foco aórtico, novo"
  - "Pulsos femorais presentes e simétricos"
proximo: d-assimetria
:::

::: no
tipo: decisao
id: d-assimetria
pergunta: "Como você lê a diferença de pressão entre os braços?"
opcoes:
  - texto: "Como achado real e coerente: somada à dor migratória e ao sopro diastólico novo, ela constrói o diagnóstico de dissecção até que uma imagem diga o contrário."
    avaliacao: otima
    feedback: "Um achado isolado seria frágil; três achados que contam a mesma história não são. A diferença de pressão traduz fluxo comprometido em um dos troncos que saem do arco, e o sopro diastólico novo traduz a valva aórtica perdendo suporte porque a raiz se dilatou. A dor que migra desenha o caminho do descolamento."
    proximo: c-imagem
  - texto: "Como provável erro de técnica: manguito pequeno, braço mal apoiado, medida repetida em momentos diferentes."
    avaliacao: erro
    feedback: "A checagem de técnica é sempre bem-vinda, mas a explicação precisa competir com o resto do quadro. Aqui a assimetria vem acompanhada de pulso mais fraco do mesmo lado e de um sopro que não existia. Chamar de artefato um achado que se encaixa em dois outros é escolher a explicação mais confortável, não a mais provável."
    proximo: c-imagem
  - texto: "Como dado a confirmar: repetir as duas medidas e, se persistir, mudar o raciocínio."
    avaliacao: aceitavel
    feedback: "Confirmar é correto e leva um minuto. O risco é o que se faz durante esse minuto: nada de antitrombótico enquanto a dúvida existe, e a imagem já precisa estar sendo pedida. Confirmação e ação caminham juntas aqui."
    proximo: c-imagem
:::

::: no
tipo: cena
id: c-imagem
texto: "A radiografia de tórax mostra alargamento do mediastino. Ele continua com a pressão alta e agora a frequência subiu para 104 bpm com a dor. A angiotomografia foi solicitada e a equipe de cirurgia cardiovascular ainda não foi avisada."
dados:
  - "Mediastino alargado na radiografia"
  - "PA 186 x 106 mmHg, FC 104 bpm"
  - "Dor persistente, escala 8 em 10"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Enquanto a angiotomografia não acontece, o que você prescreve?"
opcoes:
  - texto: "Acionar a cirurgia cardiovascular agora e reduzir primeiro a frequência com betabloqueador, só depois associando vasodilatador, com meta de pressão baixa e analgesia adequada."
    avaliacao: otima
    feedback: "O que rasga a parede não é só a pressão de pico, é a velocidade com que a onda de pulso bate na íntima. Por isso a ordem importa: reduzir a frequência e a força de ejeção antes de vasodilatar. E o cirurgião precisa ser chamado com a suspeita, não com o laudo: nas dissecções proximais, o tempo até a sala vale sobrevida."
    proximo: fim-otimo
  - texto: "Iniciar dupla antiagregação e anticoagulação plena, porque a hipótese de infarto ainda não foi excluída."
    avaliacao: erro
    feedback: "A hipótese que já está construída pelo exame é a que precisa guiar a prescrição. Anticoagular uma aorta que se descola transforma um hematoma contido em hemorragia livre. Diante de dor migratória, assimetria de pulsos e sopro diastólico novo, o antitrombótico espera a imagem."
    proximo: fim-dano
  - texto: "Iniciar nitroprussiato isolado em infusão, para derrubar rápido a pressão de 186 x 106 mmHg."
    avaliacao: aceitavel
    feedback: "A meta de pressão está certa e o caminho está pela metade. Vasodilatador sem betabloqueio prévio provoca taquicardia reflexa, e a aorta passa a receber mais batidas fortes por minuto. A sequência correta é frequência primeiro, pressão em seguida."
    proximo: c-taquicardia
:::

::: no
tipo: cena
id: c-taquicardia
texto: "A pressão cai, mas a frequência sobe para 124 bpm e a dor se intensifica. Você associa o betabloqueador, a frequência volta para 68 bpm e a dor cede. A tomografia confirma dissecção com acometimento da aorta ascendente, e a cirurgia é acionada com quarenta minutos de atraso."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A tomografia confirma dissecção com envolvimento da aorta ascendente. Ele entra em sala com a frequência controlada, a pressão em 110 x 70 mmHg e sem nenhuma droga antitrombótica no organismo. Sai da cirurgia com a raiz substituída e a valva preservada. No relatório, o cirurgião destaca que o diagnóstico foi feito antes da imagem."
ensino: "Dor torácica máxima desde o primeiro instante e que migra pede exame de aorta, não protocolo de placa. A tríade que se procura com as mãos e o estetoscópio é diferença de pressão entre os braços, pulsos assimétricos e sopro diastólico novo. Uma vez suspeitada, o tratamento inicial reduz primeiro a frequência e depois a pressão, e nenhum antitrombótico entra antes da imagem."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele chega à cirurgia com o quadro controlado, mas depois de um período de taquicardia e dor que aumentou a extensão do descolamento. A operação é maior do que seria, e a recuperação leva três semanas."
ensino: "Na dissecção, controlar a pressão sem controlar a frequência trabalha contra o paciente: o vasodilatador isolado provoca taquicardia reflexa e cada batimento adicional bate na íntima descolada. Betabloqueio primeiro, vasodilatador depois."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Uma hora depois das drogas antitrombóticas, ele fica hipotenso, com abafamento das bulhas e turgência jugular. O hematoma rompeu para o pericárdio. A drenagem de emergência é feita no corredor da tomografia, e ele não chega à sala de cirurgia."
ensino: "Anticoagulante e antiagregante são salvadores na placa que rompeu e catastróficos na aorta que se descola. É por isso que o exame antecede o protocolo: dois minutos medindo pressão nos dois braços e palpando pulsos separam duas doenças cujo tratamento é oposto."
:::
