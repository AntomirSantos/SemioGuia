---
id: vomito-que-veio-preto
titulo: O vômito que veio preto
contexto: "Emergência de hospital geral, oito da noite. Um homem de 54 anos chega trazido pela esposa depois de vomitar duas vezes um material escuro, que ela descreve como 'borra de café'. Ele diz que está fraco desde ontem e que quase desmaiou ao levantar da cama hoje de manhã. Bebe diariamente há vinte anos."
tags: [abdome, hemorragia digestiva, hipovolemia, hepatopatia]
topicosDeApoio:
  - abdome/exame-do-abdome/palpacao-do-abdome
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome, hipovolemia e doença hepática"
  - "Porto, Semiologia Médica, 8ª ed., seção de hemorragia digestiva e hipertensão portal"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está pálido, com a pele fria e um pouco úmida. Fala normalmente e insiste que 'não é nada'. A esposa conta que as fezes de hoje estavam pretas e com cheiro muito forte, o que ela atribuiu ao remédio de estômago. A pressão medida deitado é 112 x 68 mmHg e a frequência cardíaca, 104 bpm."
dados:
  - "Dois episódios de vômito escuro em borra de café"
  - "Fezes escuras e malcheirosas hoje"
  - "Tontura ao levantar pela manhã"
  - "PA deitado 112 x 68 mmHg, FC 104 bpm"
  - "Etilismo diário de longa data"
proximo: d-primeira-medida
:::

::: no
tipo: decisao
id: d-primeira-medida
pergunta: "Qual é a primeira coisa a fazer, com a pressão ainda aparentemente normal?"
opcoes:
  - texto: "Medir pressão e pulso deitado e sentado, garantir dois acessos calibrosos, colher tipagem e reserva de sangue e iniciar volume."
    avaliacao: otima
    feedback: "A pressão deitada é o parâmetro que mais engana na hemorragia. A comparação com a posição sentada revela perda que ainda está compensada, e leva menos de dois minutos. Enquanto isso, os acessos e a reserva de sangue precisam estar prontos antes de serem necessários: quem espera precisar para providenciar, perde tempo com o paciente já instável."
    proximo: c-exame
  - texto: "Solicitar endoscopia digestiva alta de urgência e aguardar a equipe."
    avaliacao: aceitavel
    feedback: "A endoscopia é o tratamento e será feita, e ela vem depois da estabilização inicial. Um paciente sangrando e sem acesso venoso adequado corre risco durante o próprio exame. Prepare primeiro, examine depois."
    proximo: c-exame
  - texto: "Colher hemograma e decidir a conduta pelo valor da hemoglobina."
    avaliacao: erro
    feedback: "Na hemorragia aguda a hemoglobina demora horas a refletir a perda, porque sai sangue inteiro, plasma e células juntos. Um valor quase normal na primeira hora é esperado e não tranquiliza ninguém. Quem decide aqui é o exame: palidez, pele fria, pulso e a variação da pressão com a postura."
    proximo: c-atraso
:::

::: no
tipo: cena
id: c-atraso
texto: "O resultado demora quarenta minutos e vem com hemoglobina de 11 gramas por decilitro, quase normal, como acontece na perda aguda. Nesse intervalo ele vomita de novo, agora sangue vivo, e fica pálido e sudoreico. A preparação que não foi feita antes precisa ser feita agora, com pressa."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Deitado, a pressão é 112 x 68 mmHg com pulso de 104 bpm; sentado, cai para 92 x 58 mmHg com pulso de 124 bpm. As conjuntivas estão descoradas. No tórax e no abdome superior há vasos finos em forma de aranha, e as palmas das mãos estão avermelhadas. O abdome tem circulação colateral visível ao redor do umbigo e macicez móvel nos flancos. O baço é palpável. Não há sinais de encefalopatia."
dados:
  - "Queda de pressão e aumento de pulso ao sentar"
  - "Aranhas vasculares, eritema palmar"
  - "Circulação colateral abdominal, macicez móvel"
  - "Baço palpável"
  - "Sem flapping, sem desorientação"
proximo: d-estigmas
:::

::: no
tipo: decisao
id: d-estigmas
pergunta: "O que os achados de pele e abdome acrescentam ao manejo?"
opcoes:
  - texto: "Apontam hipertensão portal por doença hepática crônica, o que torna a variz esofágica a causa mais provável e muda o tratamento farmacológico inicial."
    avaliacao: otima
    feedback: "Aranhas vasculares, eritema palmar, circulação colateral, ascite e baço palpável desenham hipertensão portal, e nesse contexto o sangramento por varizes muda a conduta: entra droga vasoativa esplâncnica e entra antibiótico profilático, que reduz mortalidade nesse grupo específico. O exame da pele, aqui, muda a prescrição."
    proximo: c-conduta
  - texto: "Acrescentam pouco ao momento agudo: são achados crônicos e a conduta da hemorragia é a mesma para qualquer causa."
    avaliacao: erro
    feedback: "A conduta não é a mesma. Em sangramento varicoso, além do volume e da endoscopia, a droga vasoativa e o antibiótico profilático fazem diferença de mortalidade. Ignorar os estigmas é tratar um sangramento genérico e perder duas medidas específicas que estavam disponíveis."
    proximo: c-conduta
  - texto: "Indicam cirrose, o que contraindica a transfusão pelo risco de aumentar a pressão portal."
    avaliacao: aceitavel
    feedback: "A observação tem um fundo verdadeiro: transfundir em excesso eleva a pressão portal e pode piorar o sangramento, e por isso a estratégia é restritiva, com alvo mais baixo de hemoglobina. Isso não é contraindicação, é moderação: o paciente com sinais de má perfusão continua precisando de sangue."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Volume iniciado, droga vasoativa esplâncnica e antibiótico profilático prescritos, reserva de sangue liberada. A endoscopia sai em uma hora. Ele vomita novamente sangue vivo, fica sonolento e a saturação cai para 90%. A equipe pergunta se leva assim mesmo para o exame."
dados:
  - "Novo episódio de hematêmese volumosa"
  - "Sonolência, saturação 90%"
  - "PA 88 x 52 mmHg, FC 130 bpm"
  - "Endoscopia disponível em 1 hora"
proximo: d-via-aerea
:::

::: no
tipo: decisao
id: d-via-aerea
pergunta: "Ele está sonolento e vomitando sangue. Como conduzir até a endoscopia?"
opcoes:
  - texto: "Proteger a via aérea antes do exame, com intubação orotraqueal, mantendo volume e hemocomponentes, porque o risco de aspiração de sangue é alto."
    avaliacao: otima
    feedback: "Sangramento volumoso com rebaixamento de consciência é a combinação que produz aspiração maciça, e a aspiração transforma uma hemorragia tratável em pneumonia grave e insuficiência respiratória. Proteger a via aérea antes do exame também dá ao endoscopista condição de trabalhar."
    proximo: fim-otimo
  - texto: "Levar imediatamente para a endoscopia sem intubar, porque parar o sangramento é a prioridade."
    avaliacao: erro
    feedback: "A prioridade está certa, a sequência não. Um paciente sonolento vomitando sangue aspira durante o exame, e o endoscopista trabalha em um campo cheio de sangue e sem proteção. Aqui, a via aérea vem primeiro justamente para que a endoscopia possa acontecer bem."
    proximo: fim-dano
  - texto: "Manter oxigênio por máscara, posicionar em decúbito lateral e observar de perto até o exame."
    avaliacao: aceitavel
    feedback: "O decúbito lateral reduz o risco e é uma medida sensata enquanto o material é preparado. Mas com sonolência progressiva e hematêmese volumosa, ele é uma ponte curta, não um plano. Se o nível de consciência não melhorar rápido com o volume, a intubação está indicada."
    proximo: c-lateral
:::

::: no
tipo: cena
id: c-lateral
texto: "Em quinze minutos ele apresenta novo vômito e episódio de tosse com esforço, e a saturação cai para 86%. A intubação é feita às pressas, com material menos preparado, e há aspiração de pequena quantidade de sangue."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Intubado e estabilizado, ele vai à endoscopia, que identifica varizes esofágicas com sangramento ativo e realiza a ligadura elástica. Recebe três unidades de concentrado de hemácias com estratégia restritiva. É extubado no dia seguinte e sai do hospital no sétimo dia, encaminhado ao programa de tratamento do alcoolismo."
ensino: "Na hemorragia aguda, a hemoglobina inicial é um número atrasado, e quem informa é o exame: palidez, perfusão e a variação da pressão e do pulso com a postura. Os estigmas de hepatopatia mudam a prescrição, porque acrescentam droga vasoativa esplâncnica e antibiótico profilático. E sangramento volumoso com rebaixamento de consciência exige via aérea protegida antes do exame."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O sangramento é controlado por ligadura, mas ele desenvolve pneumonia aspirativa e passa quatro dias em ventilação mecânica, com internação de duas semanas."
ensino: "Decúbito lateral e oxigênio são ponte, não plano. Quando o rebaixamento de consciência acompanha a hematêmese volumosa, a intubação eletiva e preparada é mais segura que a intubação de resgate durante um episódio de vômito."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Durante a endoscopia ele aspira grande quantidade de sangue, dessatura e apresenta parada respiratória na sala. É reanimado e intubado no local, evolui com pneumonia grave e permanece dez dias em ventilação mecânica."
ensino: "A pressa em parar o sangramento não pode passar por cima da via aérea. Em hematêmese volumosa com consciência rebaixada, o exame só é seguro depois da proteção da via aérea, e essa ordem também melhora as condições técnicas de quem vai tratar o vaso."
:::
