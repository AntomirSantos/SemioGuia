---
id: febre-ictericia-e-calafrio
titulo: A febre que veio junto com a icterícia
contexto: "Emergência de hospital geral. Uma mulher de 67 anos chega com dor no quadrante superior direito do abdome há um dia, febre alta com calafrios desde a noite e, segundo a filha, 'os olhos amarelos desde ontem'. Ela tem cálculos biliares conhecidos e já recusou a cirurgia duas vezes."
tags: [abdome, colangite, ictericia, emergencia]
topicosDeApoio:
  - abdome/exame-do-abdome/palpacao-do-abdome
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome e de icterícia"
  - "Porto, Semiologia Médica, 8ª ed., seção de vias biliares e icterícia"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está prostrada, respondendo devagar, e a filha diz que ela 'não é assim'. A pele tem um tom amarelado que fica evidente na esclera quando você a leva para perto da janela. Teve dois episódios de tremor intenso com sensação de frio durante a madrugada. A urina, diz a filha, está 'da cor de chá'."
dados:
  - "Dor em quadrante superior direito há 1 dia"
  - "Febre com calafrios intensos"
  - "Icterícia de escleras, urina escura"
  - "Temperatura 38,9 graus, FC 116 bpm, PA 104 x 60 mmHg"
  - "Prostração e lentificação, segundo a família"
proximo: d-triade
:::

::: no
tipo: decisao
id: d-triade
pergunta: "Dor no quadrante superior direito, febre com calafrio e icterícia. O que esse conjunto significa?"
opcoes:
  - texto: "É a tríade da colangite: infecção da via biliar obstruída, que exige antibiótico e drenagem da via, não apenas tratamento clínico."
    avaliacao: otima
    feedback: "Os três achados juntos mudam o diagnóstico de lugar. Na colecistite a inflamação fica na vesícula e não costuma dar icterícia; quando a icterícia entra em cena com febre e calafrio, o problema passou para a via biliar principal, que está obstruída e infectada sob pressão. E via infectada sob pressão só se resolve drenando."
    proximo: c-exame
  - texto: "É colecistite aguda: o quadro clássico de dor no quadrante superior direito com febre."
    avaliacao: erro
    feedback: "A colecistite explica a dor e a febre, e não explica a icterícia nem os calafrios com tremor. Tratar como colecistite significa antibiótico e cirurgia da vesícula em tempo eletivo, enquanto a via biliar continua obstruída e a infecção sob pressão avança para a corrente sanguínea."
    proximo: c-exame
  - texto: "É hepatite aguda, dada a icterícia com febre e prostração."
    avaliacao: aceitavel
    feedback: "A hepatite entra no diagnóstico diferencial da icterícia febril, e será afastada pelo padrão laboratorial. O que fala contra desde já é o calafrio com tremor intenso, que sugere bacteremia, e a dor localizada no quadrante superior direito com antecedente de cálculos."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A palpação do quadrante superior direito é dolorosa, e a inspiração profunda durante a palpação sob o rebordo costal interrompe a respiração dela pela dor. Não há rigidez de parede. O fígado é palpável dois centímetros abaixo do rebordo, de borda lisa. A escleras estão claramente amareladas. A pressão agora marca 96 x 54 mmHg e ela está mais sonolenta do que na chegada."
dados:
  - "Dor à palpação do quadrante superior direito com interrupção da inspiração"
  - "Fígado palpável a 2 cm, borda lisa"
  - "Icterícia de escleras evidente"
  - "PA 96 x 54 mmHg, FC 124 bpm"
  - "Sonolência progressiva"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "A pressão caiu e ela ficou sonolenta. O que isso acrescenta ao quadro?"
opcoes:
  - texto: "Acrescenta gravidade máxima: hipotensão e confusão somadas à tríade caracterizam a forma grave, e a drenagem passa a ser urgente, não eletiva."
    avaliacao: otima
    feedback: "Quando a hipotensão e a alteração do estado mental se somam à dor, à febre e à icterícia, o quadro deixa de ser uma infecção biliar tratável com antibiótico e observação. A pressão dentro da via biliar empurra bactéria direto para a circulação, e a única forma de interromper isso é descomprimir a via. Antibiótico sozinho não vence pressão."
    proximo: c-conduta
  - texto: "Acrescenta pouco: idosa febril costuma ficar hipotensa e sonolenta, e isso melhora com hidratação."
    avaliacao: erro
    feedback: "Hidratação faz parte e não resolve a causa. A hipotensão aqui não é apenas desidratação: é o efeito de bactérias sendo empurradas para a corrente sanguínea por uma via sob pressão. Interpretar como quadro banal do idoso adia a única medida que interrompe o processo."
    proximo: c-conduta
  - texto: "Acrescenta indicação de terapia intensiva, e a decisão sobre a via biliar pode esperar a estabilização."
    avaliacao: aceitavel
    feedback: "O leito monitorado é necessário. O que não cabe é adiar a drenagem até a estabilização completa: nesta doença, a estabilização frequentemente só acontece depois de descomprimir a via. Estabilizar e drenar caminham juntos."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Culturas colhidas, antibiótico de amplo espectro iniciado e volume correndo. A ultrassonografia mostra vias biliares dilatadas com cálculo no colédoco. O serviço de endoscopia tem equipe disponível em duas horas. A pressão respondeu parcialmente ao volume e está em 104 x 62 mmHg."
dados:
  - "Vias biliares dilatadas, cálculo no colédoco"
  - "Antibiótico e volume iniciados"
  - "Equipe de endoscopia disponível em 2 horas"
  - "PA 104 x 62 mmHg após volume"
proximo: d-drenagem
:::

::: no
tipo: decisao
id: d-drenagem
pergunta: "Qual é a conduta em relação à via biliar?"
opcoes:
  - texto: "Drenagem endoscópica nas próximas horas, mantendo antibiótico e suporte, sem esperar melhora completa do quadro infeccioso."
    avaliacao: otima
    feedback: "Na colangite grave, a descompressão precoce da via é o que interrompe a passagem de bactérias para o sangue, e ela é feita idealmente por via endoscópica. O antibiótico protege o organismo enquanto a via está sob pressão, mas não substitui a drenagem. Aqui, a janela é de horas."
    proximo: fim-otimo
  - texto: "Manter apenas antibiótico e suporte por quarenta e oito horas, drenando só se não houver melhora."
    avaliacao: erro
    feedback: "Essa espera é a decisão que transforma colangite em choque refratário. Enquanto a via permanece obstruída, o antibiótico chega mal ao foco e a pressão continua empurrando bactéria para a circulação. Nas formas graves, quarenta e oito horas costumam ser mais do que a paciente tem."
    proximo: fim-dano
  - texto: "Encaminhar para cirurgia aberta de exploração da via biliar, já que existe cálculo no colédoco."
    avaliacao: aceitavel
    feedback: "A cirurgia resolve a obstrução e é uma opção quando a via endoscópica não está disponível. Em paciente idosa, séptica e instável, porém, ela carrega risco bem maior que a drenagem endoscópica. Com equipe disponível em duas horas, a escolha menos agressiva é a melhor."
    proximo: c-cirurgia
:::

::: no
tipo: cena
id: c-cirurgia
texto: "A cirurgia é realizada e resolve a obstrução, mas exige anestesia prolongada em paciente séptica. Ela evolui bem, com passagem pela terapia intensiva e recuperação mais lenta do que teria sido com a drenagem endoscópica."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A drenagem endoscópica acontece três horas após a chegada. A pressão normaliza na mesma noite e a febre cede em vinte e quatro horas. A vesícula é retirada na mesma internação, e ela recebe alta no sexto dia."
ensino: "Dor no quadrante superior direito, febre com calafrio e icterícia formam a tríade da colangite, e a icterícia é o que tira o problema da vesícula e o coloca na via biliar principal. Quando se somam hipotensão e confusão, o quadro é grave e a drenagem passa a ser urgente. Antibiótico protege, mas quem resolve a via sob pressão é a descompressão."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A obstrução é resolvida por cirurgia aberta, com três dias em terapia intensiva e recuperação mais longa, sem sequela permanente."
ensino: "Quando a drenagem endoscópica está disponível em tempo hábil, ela é preferível na paciente séptica e frágil. A cirurgia aberta resolve o mesmo problema com risco anestésico e cirúrgico maiores em quem já está instável."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Nas primeiras vinte e quatro horas de espera ela evolui para choque refratário, com necessidade de vasopressor em dose alta, ventilação mecânica e diálise. A drenagem acaba sendo feita em condições muito piores, e a internação dura cinco semanas."
ensino: "Antibiótico não vence uma via biliar obstruída sob pressão. Na colangite grave, adiar a drenagem para ver se o paciente melhora inverte a ordem: é a drenagem que permite a melhora, e não o contrário."
:::
