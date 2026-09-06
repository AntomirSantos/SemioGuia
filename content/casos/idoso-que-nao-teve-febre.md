---
id: idoso-que-nao-teve-febre
titulo: O idoso que não teve febre
contexto: "Enfermaria de clínica médica, visita da manhã. Um homem de 82 anos, internado há dois dias para investigação de anemia, amanheceu 'estranho' segundo a filha: não reconheceu a neta, tentou levantar sozinho de madrugada e voltou a dormir sem terminar as frases. Ontem ele conversava normalmente."
tags: [geral, sepse, delirium, idoso]
topicosDeApoio:
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
  - exame-psiquico/exame-psiquico/delirium-demencia-e-depressao
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de sinais vitais e avaliação do estado mental"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do idoso e de sinais vitais"
  - "Semiologia Clínica, 1ª ed., capítulos de exame geral e de exame psíquico"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele abre os olhos quando você chama, responde ao nome, mas erra o dia e o lugar e volta a fechar os olhos no meio da resposta. A atenção oscila: em um momento acompanha a conversa, no seguinte parece perdido. A filha insiste que 'em casa ele é lúcido, resolve tudo sozinho'."
dados:
  - "Alteração aguda do estado mental, flutuante, iniciada na madrugada"
  - "Temperatura 36,1 graus"
  - "FC 102 bpm, PA 104 x 58 mmHg"
  - "FR 26 irpm, saturação 94%"
  - "Estado mental prévio preservado, segundo a família"
proximo: d-primeira-leitura
:::

::: no
tipo: decisao
id: d-primeira-leitura
pergunta: "Sem febre e com pressão ainda dentro da faixa, como você interpreta essa confusão?"
opcoes:
  - texto: "Como delirium até prova em contrário, e delirium como sintoma de doença aguda: procurar infecção, com atenção ao fato de que idoso grave frequentemente não tem febre."
    avaliacao: otima
    feedback: "Confusão de instalação aguda e curso flutuante em quem era lúcido é delirium, e delirium quase sempre tem causa orgânica atrás. No idoso, a resposta térmica é pobre e a temperatura pode ser normal ou baixa mesmo em infecção grave, e temperatura baixa é sinal ruim. Aqui os outros sinais já falam: frequência respiratória alta, taquicardia e pressão que caiu para quem é hipertenso."
    proximo: c-busca-foco
  - texto: "Como confusão da idade agravada pela internação: reorientar, retirar estímulos e reavaliar amanhã."
    avaliacao: erro
    feedback: "Ambiente hostil e privação de sono realmente contribuem para o delirium, mas eles nunca são explicação suficiente. Chamar de senilidade uma mudança que aconteceu em uma noite é fechar a porta antes de procurar a causa. A família já disse que ontem ele resolvia tudo sozinho."
    proximo: c-atraso
  - texto: "Como possível efeito de medicação hospitalar: revisar a prescrição e suspender o que puder causar confusão."
    avaliacao: aceitavel
    feedback: "Revisar a prescrição é obrigatório e muitas vezes resolve, sobretudo com drogas anticolinérgicas e sedativos. Mas isso não pode ser feito no lugar da busca de infecção: a frequência respiratória em 26 e a pressão que caiu não se explicam por medicação."
    proximo: c-busca-foco
:::

::: no
tipo: cena
id: c-atraso
texto: "À tarde, ele responde ao nome com mais dificuldade e a enfermagem registra que a diurese caiu muito nas últimas horas. Só então a busca por foco infeccioso começa, com meio dia de atraso."
proximo: c-busca-foco
:::

::: no
tipo: cena
id: c-busca-foco
texto: "Você o despe e examina inteiro. A pele está quente no tronco e as extremidades, frias, com enchimento capilar de quase quatro segundos. Não há estertores nem sopros novos. O abdome é depressível, mas ele faz careta à percussão da loja renal esquerda. A sonda vesical, instalada na admissão, drena urina turva e de odor forte. As panturrilhas são simétricas."
dados:
  - "Extremidades frias, enchimento capilar prolongado"
  - "Dor à percussão da loja renal esquerda"
  - "Urina turva na sonda vesical"
  - "Ausculta pulmonar limpa, sem sopros novos"
  - "PA 98 x 56 mmHg, FC 110 bpm, FR 28 irpm"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "Qual sinal, entre os que você colheu, mais deveria acelerar a conduta?"
opcoes:
  - texto: "A frequência respiratória elevada somada às extremidades frias e à confusão: são marcadores precoces de disfunção, e aparecem antes da queda franca da pressão."
    avaliacao: otima
    feedback: "A frequência respiratória é o sinal vital mais negligenciado e o que mais cedo se altera na sepse, porque a acidose metabólica cobra compensação. Somada à alteração do estado mental e à má perfusão periférica, ela identifica o paciente grave antes de a pressão desabar. No idoso, esperar pela febre ou pela hipotensão é chegar tarde."
    proximo: c-tratamento
  - texto: "A temperatura de 36,1 graus, que afasta processo infeccioso relevante."
    avaliacao: erro
    feedback: "É exatamente o contrário. No idoso a febre pode faltar em uma parte importante das infecções graves, e temperatura baixa em sepse associa-se a pior prognóstico. Usar a ausência de febre para descartar infecção é o erro mais custoso desta apresentação."
    proximo: c-tratamento
  - texto: "A dor na loja renal, que identifica o foco e permite direcionar o antibiótico."
    avaliacao: aceitavel
    feedback: "Achar o foco é importante e você o achou, e a sonda vesical explica a porta de entrada. Mas identificar o foco não gradua a gravidade, e é a gravidade que define a pressa. Os sinais que apressam são a respiração, a perfusão e a consciência."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você colhe culturas, inicia antibiótico de amplo espectro na primeira hora e começa a reposição volêmica. Trinta minutos depois, a pressão permanece em 86 x 50 mmHg apesar de um litro de cristaloide, e o lactato inicial voltou elevado. As extremidades seguem frias e a diurese, ausente."
dados:
  - "PA 86 x 50 mmHg após 1 litro de cristaloide"
  - "Lactato elevado"
  - "Diurese ausente nas últimas horas"
  - "Extremidades frias, enchimento capilar prolongado"
proximo: d-choque
:::

::: no
tipo: decisao
id: d-choque
pergunta: "A pressão não respondeu ao volume inicial. Qual é o próximo passo?"
opcoes:
  - texto: "Completar a reposição guiada por reavaliação frequente e iniciar vasopressor precocemente, transferindo para leito monitorado."
    avaliacao: otima
    feedback: "Choque séptico que não responde ao volume inicial precisa de vasopressor cedo, e não de mais litros indefinidamente. A reavaliação à beira do leito continua sendo o guia: perfusão periférica, estado mental, diurese e enchimento capilar dizem mais que qualquer número isolado. O leito monitorado é parte do tratamento, não uma formalidade."
    proximo: fim-otimo
  - texto: "Manter apenas volume, em grandes quantidades, até a pressão normalizar, evitando vasopressor em paciente idoso."
    avaliacao: erro
    feedback: "Idade não contraindica vasopressor, e o excesso de volume no idoso encontra um coração menos complacente: o resultado é congestão pulmonar sem correção da perfusão. Insistir apenas em cristaloide troca um problema por dois."
    proximo: fim-dano
  - texto: "Aguardar o resultado da urocultura para ajustar o antibiótico antes de escalonar o suporte."
    avaliacao: aceitavel
    feedback: "A cultura vai orientar o descalonamento em dois ou três dias, e não tem nenhuma utilidade para a decisão de agora. O suporte hemodinâmico se ajusta pela clínica em minutos, não por um resultado que chega em dias."
    proximo: c-espera-cultura
:::

::: no
tipo: cena
id: c-espera-cultura
texto: "Duas horas depois, sem vasopressor, a pressão média segue baixa e ele desenvolve lesão renal aguda com necessidade de diálise nos dias seguintes. O vasopressor acaba sendo iniciado, com o rim já comprometido."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com antibiótico na primeira hora, volume adequado e vasopressor precoce, a pressão se estabiliza em duas horas e a diurese retorna na madrugada. A urocultura confirma infecção associada à sonda, que é retirada. Ele volta a conversar no segundo dia e recebe alta na semana seguinte, com o estado mental de sempre."
ensino: "No idoso, a sepse costuma se apresentar sem febre e com delirium. Confusão aguda e flutuante em quem era lúcido é doença orgânica até prova em contrário. Os sinais que identificam a gravidade cedo são a frequência respiratória, a perfusão periférica e o estado mental, todos anteriores à queda da pressão. E toda sonda instalada é uma porta de entrada a ser lembrada."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele sobrevive, mas evolui com lesão renal aguda que exige diálise por dez dias e uma internação de quatro semanas, com perda funcional importante ao receber alta."
ensino: "Choque séptico que não responde ao volume inicial pede vasopressor precoce. Esperar resultado de cultura para escalonar suporte confunde dois relógios diferentes: o do antibiótico definitivo, que é de dias, e o da perfusão, que é de minutos."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Depois de quatro litros de cristaloide sem vasopressor, ele desenvolve congestão pulmonar, precisa de ventilação mecânica e evolui com disfunção de múltiplos órgãos. Morre no quinto dia de internação."
ensino: "Volume tem teto, sobretudo no idoso, cujo coração é menos complacente. Quando a perfusão não responde à reposição inicial, a droga vasoativa é o próximo passo, e adiá-la por receio da idade acrescenta congestão a um paciente que já estava em choque."
:::
