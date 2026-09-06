---
id: barriga-que-parou
titulo: A barriga que parou de trabalhar
contexto: "Emergência de hospital geral. Um homem de 66 anos, operado de apendicite na juventude e de hérnia há dez anos, chega com dor abdominal em cólica há doze horas, distensão progressiva e vômitos que começaram amarelos e agora têm cheiro forte. Não elimina gases desde a noite anterior."
tags: [abdome, abdome agudo, obstrucao intestinal, percussao]
topicosDeApoio:
  - abdome/exame-do-abdome/inspecao-e-ausculta-do-abdome
  - abdome/exame-do-abdome/percussao-do-abdome
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do abdome e abdome agudo"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele descreve a dor como ondas que vêm e vão, com intervalos de alívio quase completo entre elas. Durante uma dessas ondas, ele se contorce; entre elas, conversa normalmente. A barriga está visivelmente maior que o normal, segundo ele mesmo, e a roupa marca."
dados:
  - "Dor em cólica há 12 horas, com intervalos de alívio"
  - "Distensão abdominal progressiva"
  - "Vômitos, os últimos de odor fecaloide"
  - "Parada de eliminação de gases há 14 horas"
  - "FC 96 bpm, PA 132 x 80 mmHg, temperatura 36,8 graus"
proximo: d-sequencia
:::

::: no
tipo: decisao
id: d-sequencia
pergunta: "Como você organiza o exame deste abdome distendido?"
opcoes:
  - texto: "Inspeção primeiro, ausculta antes de tocar, depois percussão e por último palpação, superficial antes de profunda, terminando pelas regiões de hérnia e pelo toque retal."
    avaliacao: otima
    feedback: "No abdome a ordem é diferente da do tórax por um motivo prático: a palpação altera o que a ausculta vai encontrar. Além disso, na suspeita de obstrução, dois exames costumam ser esquecidos e resolvem o caso: as regiões inguinais, onde pode estar a hérnia encarcerada, e a cicatriz cirúrgica, que anuncia aderências."
    proximo: c-exame
  - texto: "Palpar profundamente desde o início para localizar a massa ou a alça distendida e ganhar tempo."
    avaliacao: erro
    feedback: "A palpação profunda de entrada faz duas coisas ruins: provoca defesa voluntária, que atrapalha todo o resto do exame, e altera os ruídos que você ainda não ouviu. Em um abdome distendido e doloroso, a mão pesada apaga informação em vez de colher."
    proximo: c-exame
  - texto: "Solicitar radiografia de abdome em pé antes do exame, para saber onde procurar."
    avaliacao: aceitavel
    feedback: "A imagem confirma níveis hidroaéreos e ajuda a localizar o nível da obstrução, mas ela não vai palpar a região inguinal por você, e é ali que mora a causa cirúrgica mais frequentemente esquecida. Examine e peça a imagem em paralelo."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "À inspeção, o abdome está distendido de forma simétrica e, durante uma das cólicas, você vê o relevo de uma alça se movendo sob a parede. A ausculta encontra ruídos aumentados, metálicos, em salvas que coincidem com a dor. A percussão é timpânica em quase toda a extensão. A palpação superficial revela dor difusa sem defesa involuntária. Nas regiões inguinais, à direita, há um abaulamento firme, doloroso, que não reduz."
dados:
  - "Peristalse visível durante as cólicas"
  - "Ruídos hidroaéreos aumentados e metálicos"
  - "Timpanismo difuso à percussão"
  - "Abaulamento inguinal direito firme, doloroso, irredutível"
  - "Sem defesa involuntária, sem descompressão dolorosa"
proximo: d-hernia
:::

::: no
tipo: decisao
id: d-hernia
pergunta: "O abaulamento inguinal direito é firme, doloroso e não reduz. O que isso significa e o que você faz?"
opcoes:
  - texto: "Significa hérnia encarcerada como causa da obstrução: acionar a cirurgia imediatamente, sem tentar reduzir à força."
    avaliacao: otima
    feedback: "A hérnia encarcerada é a causa de obstrução que o exame diagnostica sozinho, e é por isso que a região inguinal faz parte do exame do abdome. Irredutível e dolorosa significa alça presa; se o suprimento sanguíneo já estiver comprometido, a alça está estrangulando. Reduzir à força pode empurrar de volta para dentro um segmento já sofrido."
    proximo: c-avaliacao-alca
  - texto: "Tentar a redução manual sob analgesia: se voltar, resolve a obstrução sem cirurgia."
    avaliacao: erro
    feedback: "A manobra tem lugar em hérnia recentemente encarcerada e sem sinais de sofrimento, sempre com muito cuidado. Aqui já são doze horas de obstrução com vômito fecaloide, e a redução forçada corre o risco de devolver ao abdome uma alça isquêmica que continuará morrendo sem ser vista."
    proximo: c-avaliacao-alca
  - texto: "Registrar o achado, iniciar sonda nasogástrica e hidratação, e reavaliar pela manhã com o cirurgião de plantão do dia."
    avaliacao: aceitavel
    feedback: "As medidas de suporte estão certas e são necessárias, mas a espera não. Hérnia encarcerada com obstrução instalada é indicação cirúrgica no mesmo plantão, porque a diferença entre alça viável e alça necrosada se mede em horas."
    proximo: c-avaliacao-alca
:::

::: no
tipo: cena
id: c-avaliacao-alca
texto: "Enquanto a cirurgia é acionada, você reexamina. A pele sobre o abaulamento está mais avermelhada e mais quente que a do lado oposto. A dor local aumentou e agora ele reclama mesmo com o toque leve. A frequência cardíaca subiu para 112 bpm e a temperatura chegou a 38,1 graus."
dados:
  - "Pele sobre a hérnia avermelhada e quente"
  - "Dor local intensa ao toque leve"
  - "FC 112 bpm, temperatura 38,1 graus"
  - "Abdome ainda sem defesa generalizada"
proximo: d-estrangulamento
:::

::: no
tipo: decisao
id: d-estrangulamento
pergunta: "O que esses novos achados acrescentam à urgência?"
opcoes:
  - texto: "Acrescentam sofrimento de alça: eritema local, dor desproporcional ao toque, febre e taquicardia sugerem estrangulamento, e a cirurgia passa a ser imediata."
    avaliacao: otima
    feedback: "A passagem de encarcerada para estrangulada é o que define o prognóstico, e ela se anuncia no exame antes de qualquer exame de sangue: a pele sobre o saco herniário muda de cor e temperatura, a dor local aumenta, aparecem febre e taquicardia. Quando a alça necrosa, o que era uma correção eletiva vira ressecção intestinal."
    proximo: fim-otimo
  - texto: "Acrescentam pouco: febre baixa e taquicardia são esperadas em quem vomitou muito e está desidratado."
    avaliacao: erro
    feedback: "Desidratação explica taquicardia, mas não explica pele avermelhada e quente sobre a hérnia nem dor que piora ao toque leve. Atribuir sinais locais a uma causa sistêmica genérica é o modo mais comum de perder o momento em que a alça ainda era recuperável."
    proximo: fim-dano
  - texto: "Acrescentam urgência: manter hidratação vigorosa e antibiótico, reavaliando em duas horas antes de decidir."
    avaliacao: aceitavel
    feedback: "Hidratação e antibiótico são parte do preparo, não substitutos da sala. Reavaliar em duas horas quando os sinais de estrangulamento já apareceram significa reavaliar uma alça que provavelmente já não será viável."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "Na reavaliação, o abdome está mais distendido, os ruídos sumiram e ele apresenta defesa involuntária difusa. A cirurgia acontece com duas horas a mais, e a alça encontrada não tem mais brilho nem peristalse."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele vai à sala com pouco mais de treze horas de obstrução. A alça presa está congesta, mas recupera cor e peristalse depois de liberada, e a hérnia é corrigida no mesmo tempo cirúrgico. Sem ressecção intestinal, sem estoma. Alta no quarto dia."
ensino: "Obstrução intestinal se anuncia por quatro achados que o exame colhe em minutos: dor em cólica com intervalos, distensão, vômitos que mudam de aspecto e parada de eliminação de gases. E toda obstrução obriga a examinar as regiões inguinais e as cicatrizes: hérnia encarcerada e brida são as duas causas mais frequentes, e a primeira se diagnostica com a mão. Pele quente e avermelhada sobre a hérnia anuncia estrangulamento."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A cirurgia acontece com atraso e exige ressecção de um segmento de intestino delgado com anastomose primária. Ele se recupera, com internação de nove dias e um cateter central pelo caminho."
ensino: "Sinais locais de sofrimento sobre uma hérnia encarcerada não pedem reavaliação, pedem sala. Cada hora de espera após o eritema aumenta a chance de trocar liberação simples por ressecção intestinal."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Seis horas depois ele evolui com peritonite difusa e choque. A cirurgia encontra alça necrosada com perfuração, exige ressecção ampla e estoma. A internação passa por terapia intensiva e dura três semanas."
ensino: "Febre e taquicardia em quem vomitou podem ser desidratação; pele avermelhada e quente sobre um saco herniário doloroso não são. Sinais locais falam da alça, e é a alça que define o relógio. Quando o exame mostra sofrimento local, o intervalo entre a decisão e a sala é o que separa liberar de ressecar."
:::
