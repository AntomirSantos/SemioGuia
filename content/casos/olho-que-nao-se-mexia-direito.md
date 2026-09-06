---
id: olho-que-nao-se-mexia-direito
titulo: O olho que não se mexia direito
contexto: "Pronto atendimento pediátrico e de adultos, terça-feira à noite. Uma mulher de 29 anos chega com a pálpebra do olho direito inchada e vermelha há dois dias. Ela conta que estava com sinusite havia uma semana e que hoje o olho começou a doer quando ela mexe. Já usou colírio antibiótico por conta própria."
tags: [cabeca e pescoco, celulite orbitaria, olhos, emergencia]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/olhos
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/boca-nariz-e-ouvidos
  - sistema-nervoso/exame-neurologico/pares-cranianos-i-a-vi
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame dos olhos e das vias aéreas superiores"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame ocular e dos movimentos extraoculares"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia de cabeça e pescoço"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A pálpebra superior direita está edemaciada e avermelhada, quase fechando o olho. Ela sente dor local e diz que hoje começou a incomodar 'quando olha para o lado'. Refere que ainda tem secreção nasal espessa e dor na face desde a semana passada. A temperatura é de 38,1 graus."
dados:
  - "Edema e eritema palpebral direito há 2 dias"
  - "Dor à movimentação ocular, iniciada hoje"
  - "Sinusite em curso há 1 semana"
  - "Temperatura 38,1 graus, FC 98 bpm"
  - "Uso de colírio antibiótico por conta própria"
proximo: d-separacao
:::

::: no
tipo: decisao
id: d-separacao
pergunta: "Como você separa a infecção que fica na pálpebra da que já entrou na órbita?"
opcoes:
  - texto: "Pelos quatro achados que só aparecem quando a órbita está envolvida: dor à movimentação ocular, limitação dos movimentos, protrusão do olho e queda de visão."
    avaliacao: otima
    feedback: "A pálpebra e a órbita estão separadas por um septo, e a diferença entre estar antes ou depois dele muda o tratamento por completo. A infecção que fica na frente do septo produz edema e vermelhidão, e só. Quando aparecem dor ao mover o olho, restrição de movimento, protrusão ou alteração visual, a infecção passou para dentro, e ali ela ameaça o nervo óptico e vizinha o cérebro."
    proximo: c-exame
  - texto: "Pela intensidade do edema e do eritema: quanto mais intensos, maior a chance de acometimento orbitário."
    avaliacao: erro
    feedback: "O edema pode ser dramático em infecções que ficam só na pálpebra e discreto em quadros orbitários iniciais. A aparência externa não informa sobre o que está atrás do septo. Quem informa são os movimentos do olho, a posição do globo e a visão."
    proximo: c-exame
  - texto: "Pela tomografia de órbita, que é o exame que define a extensão."
    avaliacao: aceitavel
    feedback: "A tomografia é necessária quando há suspeita de acometimento orbitário, e ela define abscesso e extensão. Antes dela, porém, o exame de quatro itens já separa os dois cenários em dois minutos e diz quem precisa da imagem com urgência."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você afasta com cuidado a pálpebra edemaciada. O olho direito parece mais projetado para a frente que o esquerdo, visto de cima. Ao pedir que ela siga o seu dedo, o olho direito não acompanha por completo o movimento para fora e ela reclama de dor ao tentar. A acuidade está reduzida à direita. A pupila direita reage um pouco menos que a esquerda quando você alterna a luz entre os olhos."
dados:
  - "Proptose do olho direito"
  - "Limitação e dor à abdução"
  - "Acuidade visual reduzida à direita"
  - "Resposta pupilar assimétrica ao teste da luz alternada"
  - "Sinusite etmoidal provável pela história"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "A pupila responde menos à direita quando você alterna a luz. O que isso significa?"
opcoes:
  - texto: "Sinaliza sofrimento do nervo óptico: é um sinal de gravidade que, somado à proptose e à restrição de movimento, exige internação, antibiótico endovenoso e imagem imediata."
    avaliacao: otima
    feedback: "O teste da luz alternada compara os dois nervos ópticos entre si, e a resposta menor de um lado indica que a via aferente daquele olho está comprometida. Na celulite orbitária, isso significa que a pressão e a inflamação já ameaçam a visão. Junto com proptose e restrição de movimento, define o quadro que não pode ir para casa."
    proximo: c-conduta
  - texto: "É esperado pelo edema palpebral, que reduz a quantidade de luz que chega ao olho."
    avaliacao: erro
    feedback: "O edema reduz a abertura, e não a resposta relativa entre os dois nervos: o teste é feito iluminando cada olho alternadamente e comparando a contração. Atribuir a assimetria ao edema é descartar o achado que mais informa sobre risco de perda visual."
    proximo: c-conduta
  - texto: "Indica provável neurite óptica associada, que precisa de corticoide antes do antibiótico."
    avaliacao: aceitavel
    feedback: "A hipótese existe em outros contextos, mas aqui a explicação simples e urgente é a compressão inflamatória dentro da órbita, com foco em uma sinusite adjacente. Corticoide sem controle da infecção não é o primeiro passo: antibiótico endovenoso, imagem e avaliação especializada vêm antes."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "A tomografia mostra sinusite etmoidal com coleção subperiosteal na parede medial da órbita direita. Ela foi internada e o antibiótico endovenoso começou. Doze horas depois, a proptose aumentou, a acuidade piorou e a dor à movimentação está maior."
dados:
  - "Coleção subperiosteal medial à órbita direita"
  - "Antibiótico endovenoso há 12 horas"
  - "Proptose e acuidade piores que na admissão"
  - "Temperatura 38,4 graus"
proximo: d-drenagem
:::

::: no
tipo: decisao
id: d-drenagem
pergunta: "O quadro piorou apesar do antibiótico. Qual é a conduta?"
opcoes:
  - texto: "Acionar a cirurgia para drenagem da coleção e do seio comprometido, sem esperar mais tempo de antibiótico."
    avaliacao: otima
    feedback: "Coleção que não responde ao antibiótico em algumas horas, com piora visual, é indicação cirúrgica. O critério não é o tempo de tratamento e sim a trajetória: acuidade caindo, proptose aumentando e dor maior significam que a pressão dentro da órbita está vencendo o antibiótico."
    proximo: fim-otimo
  - texto: "Manter o antibiótico por mais quarenta e oito horas antes de considerar a cirurgia, já que a maioria dessas coleções responde ao tratamento clínico."
    avaliacao: erro
    feedback: "Muitas coleções pequenas de fato respondem, e o que decide não é a estatística, é a evolução deste olho. Com acuidade piorando, quarenta e oito horas podem significar perda visual definitiva. Piora do nervo óptico é o critério que encurta qualquer prazo."
    proximo: fim-dano
  - texto: "Associar corticoide sistêmico para reduzir a inflamação e reavaliar em vinte e quatro horas."
    avaliacao: aceitavel
    feedback: "O corticoide tem papel discutido como adjuvante e pode reduzir o edema, sempre com o antibiótico correndo. O problema é usá-lo como alternativa à drenagem em um olho que está perdendo visão: ele não esvazia a coleção nem descomprime a órbita."
    proximo: c-corticoide
:::

::: no
tipo: cena
id: c-corticoide
texto: "Com o corticoide o edema diminui um pouco, mas a acuidade continua caindo nas horas seguintes. A drenagem acaba sendo feita no dia seguinte, com a visão já pior do que na internação."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A drenagem cirúrgica esvazia a coleção e trata o seio etmoidal. A dor cede na mesma noite, a proptose regride em dois dias e a acuidade volta ao normal em uma semana. Ela recebe alta com antibiótico oral e retorno programado."
ensino: "O septo orbitário separa duas doenças com o mesmo aspecto externo. Quatro achados dizem que a infecção passou para dentro: dor à movimentação ocular, limitação dos movimentos, proptose e queda de visão. A resposta pupilar assimétrica ao teste da luz alternada indica sofrimento do nervo óptico. Quando a visão piora apesar do antibiótico, a conduta é drenar."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A coleção é drenada com um dia de atraso e ela fica com redução permanente e leve da acuidade do olho direito."
ensino: "Adjuvantes não substituem a drenagem quando o nervo óptico está sofrendo. O critério para operar é a trajetória do olho, não o tempo decorrido de antibiótico."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Nas quarenta e oito horas de espera ela perde a visão do olho direito e desenvolve trombose do seio cavernoso, com acometimento do olho contralateral. Sobrevive após internação prolongada, com perda visual definitiva à direita."
ensino: "A órbita é vizinha do seio cavernoso e do cérebro, e é por isso que a infecção que passou do septo tem urgência própria. Nenhum prazo padrão de antibiótico se sobrepõe a um olho cuja acuidade está caindo hora a hora."
:::
