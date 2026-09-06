---
id: barriga-de-tabua
titulo: A barriga que virou tábua
contexto: "Pronto socorro, seis da tarde. Um homem de 52 anos, que toma anti-inflamatório há três semanas por dor na coluna, chega curvado, andando devagar e com passos curtos. Diz que a dor começou de repente, há duas horas, 'como uma facada' no alto da barriga, e que agora dói o abdome inteiro."
tags: [abdome, abdome agudo, perfuracao, peritonite]
topicosDeApoio:
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
  - abdome/exame-do-abdome/percussao-do-abdome
  - abdome/exame-do-abdome/palpacao-do-abdome
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome e sinais peritoneais"
  - "Porto, Semiologia Médica, 8ª ed., seção de abdome agudo"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele evita qualquer movimento. Sobe na maca com dificuldade, ajeita-se de lado com os joelhos dobrados e pede para não ser mexido. Fala baixo, respira de forma superficial e rápida, como quem tenta não usar o diafragma. A esposa conta que ele 'vive tomando remédio para dor' desde uma crise na coluna."
dados:
  - "Dor epigástrica súbita há 2 horas, agora difusa"
  - "Uso diário de anti-inflamatório há 3 semanas"
  - "FC 108 bpm, PA 128 x 80 mmHg, temperatura 37,4 graus"
  - "Respiração superficial, imobilidade voluntária"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Ele pede para não ser tocado. Como você conduz o exame?"
opcoes:
  - texto: "Começar longe da dor, com a mão espalmada e aquecida, observando a respiração e a reação facial, e deixar a região epigástrica por último."
    avaliacao: otima
    feedback: "Em abdome agudo, a técnica é parte do diagnóstico. Começar pela área mais distante da queixa permite comparar tônus, e a mão aquecida evita contração reflexa que imita defesa. O rosto do paciente informa tanto quanto a parede: é ali que se lê a diferença entre incômodo e dor verdadeira."
    proximo: c-exame
  - texto: "Pesquisar imediatamente a descompressão brusca em todos os quadrantes, que é o sinal que define peritonite."
    avaliacao: erro
    feedback: "A descompressão brusca provoca dor intensa e frequentemente desnecessária, e depois dela o paciente não colabora mais com nenhuma etapa. Além disso, ela não é o achado mais confiável: a rigidez involuntária, percebida pela mão que apenas repousa, informa mais e não machuca."
    proximo: c-exame
  - texto: "Prescrever analgesia potente antes de examinar, porque a dor impede qualquer avaliação confiável."
    avaliacao: aceitavel
    feedback: "Analgesiar é humano e não apaga os sinais peritoneais, ao contrário do que se ensinava. O cuidado é outro: não deixar a analgesia adiar o exame nem a cirurgia. Faça as duas coisas juntas, com o exame documentado antes e depois."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A parede abdominal está dura, contraída de maneira uniforme, e não relaxa quando você distrai a conversa nem quando ele expira. A percussão sobre a área hepática, onde deveria haver macicez, devolve som timpânico. Os ruídos hidroaéreos são raros e fracos. Qualquer movimento da maca provoca dor."
dados:
  - "Rigidez abdominal involuntária, difusa"
  - "Timpanismo sobre a área hepática"
  - "Ruídos hidroaéreos diminuídos"
  - "Dor à percussão leve em todos os quadrantes"
proximo: d-macicez
:::

::: no
tipo: decisao
id: d-macicez
pergunta: "A macicez hepática desapareceu à percussão. O que isso significa aqui?"
opcoes:
  - texto: "Significa ar livre entre o fígado e a parede: somado à rigidez involuntária, aponta perfuração de víscera oca."
    avaliacao: otima
    feedback: "O fígado é maciço porque é sólido e está encostado na parede. Quando o gás escapa de uma víscera perfurada, ele sobe e se aloja exatamente ali, e o som muda de maciço para timpânico. É um achado simples e específico, que só faz sentido interpretado junto com a rigidez: peritônio irritado por conteúdo digestivo."
    proximo: c-conduta
  - texto: "Significa distensão de alças sobre o fígado, achado comum em qualquer abdome doloroso."
    avaliacao: erro
    feedback: "A interposição de cólon sobre o fígado existe e é uma armadilha conhecida, mas ela costuma ser localizada e não acompanha rigidez involuntária difusa. Diante da história de dor súbita em usuário crônico de anti-inflamatório, a explicação simples e perigosa é a que precisa ser afastada primeiro."
    proximo: c-conduta
  - texto: "Significa pouco isoladamente: a decisão depende da radiografia com cúpulas diafragmáticas."
    avaliacao: aceitavel
    feedback: "A imagem confirma e é bem-vinda, e ela precisa ser feita com o paciente sentado ou em pé por alguns minutos para o ar subir. Mas o exame já construiu a hipótese, e a conduta cirúrgica não depende de ver o crescente de ar: abdome rígido com essa história já é indicação de avaliação cirúrgica imediata."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "A radiografia de tórax feita com ele sentado mostra um crescente de ar abaixo da cúpula diafragmática direita. A pressão agora é 108 x 68 mmHg, a frequência cardíaca 118 bpm e a temperatura 38,0 graus. O cirurgião de plantão está em outra cirurgia e retorna em quarenta minutos."
dados:
  - "Pneumoperitônio confirmado na radiografia"
  - "PA 108 x 68 mmHg, FC 118 bpm"
  - "Temperatura 38,0 graus"
proximo: d-tempo
:::

::: no
tipo: decisao
id: d-tempo
pergunta: "O cirurgião só chega em quarenta minutos. O que você faz nesse intervalo?"
opcoes:
  - texto: "Preparar o paciente para a cirurgia: jejum, sonda nasogástrica, hidratação, antibiótico de amplo espectro precoce, analgesia e comunicação imediata do caso ao centro cirúrgico."
    avaliacao: otima
    feedback: "O intervalo não é de espera, é de preparo. Antibiótico precoce na peritonite reduz complicação infecciosa, a sonda descomprime e reduz o que continua vazando, o volume corrige a perda para o terceiro espaço. Avisar o centro cirúrgico agora encurta o tempo entre a chegada do cirurgião e a incisão."
    proximo: fim-otimo
  - texto: "Aguardar a avaliação do cirurgião antes de iniciar antibiótico, para não mascarar a evolução."
    avaliacao: erro
    feedback: "Antibiótico não mascara peritonite estabelecida com pneumoperitônio: o diagnóstico já está feito. Adiar apenas dá vantagem à contaminação que já está na cavidade. Este é um daqueles casos em que esperar não protege ninguém."
    proximo: fim-dano
  - texto: "Iniciar hidratação e analgesia, deixando antibiótico e sonda para a decisão do cirurgião."
    avaliacao: aceitavel
    feedback: "Metade do preparo está feita. O antibiótico precoce e a descompressão gástrica, porém, são medidas cujo benefício depende do minuto em que começam, e o cirurgião não vai discordar de nenhuma delas."
    proximo: c-atraso-antibiotico
:::

::: no
tipo: cena
id: c-atraso-antibiotico
texto: "O antibiótico entra apenas depois da avaliação, cinquenta minutos depois da chegada dele. A cirurgia confirma úlcera pré-pilórica perfurada com contaminação difusa da cavidade."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele entra em sala três horas depois do início da dor. A cirurgia encontra uma úlcera pré-pilórica perfurada, com contaminação ainda localizada ao andar superior. Rafia com epiploplastia, lavagem da cavidade e alta no sexto dia, com o anti-inflamatório suspenso e o tratamento da coluna reorganizado."
ensino: "A rigidez involuntária difusa é o achado mais confiável de peritonite, e ela se percebe com a mão pousada, sem manobras dolorosas. O desaparecimento da macicez hepática à percussão aponta ar livre na cavidade. Em usuário crônico de anti-inflamatório com dor súbita em punhalada, esses dois achados juntos já indicam cirurgia, e o intervalo até ela é de preparo, não de espera."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A cirurgia é bem-sucedida, mas ele desenvolve um abscesso residual que exige drenagem percutânea no oitavo dia. A internação vai a doze dias."
ensino: "Na peritonite por perfuração, o benefício do antibiótico depende de quando ele começa. Medidas de preparo não precisam da assinatura do cirurgião: jejum, sonda, volume e antibiótico são parte do cuidado assim que o diagnóstico é construído."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ele chega à sala com cinco horas de peritonite e já hipotenso. A cirurgia encontra contaminação difusa dos quatro quadrantes. Evolui com choque séptico, três dias de vasopressor e vinte e um dias de internação, oito deles em terapia intensiva."
ensino: "Mascarar o diagnóstico só é risco quando o diagnóstico ainda não existe. Com abdome rígido e pneumoperitônio, não há o que mascarar: cada hora sem antibiótico e sem sala é vantagem para a contaminação. Esperar por hierarquia, e não por informação, é o atraso mais caro de todos."
:::
