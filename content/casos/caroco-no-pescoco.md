---
id: caroco-no-pescoco
titulo: O caroço que subiu com o gole
contexto: "Ambulatório de clínica geral. Uma mulher de 52 anos senta e vai direto ao ponto: 'apareceu um caroço no meu pescoço faz umas cinco semanas'. Não dói, não cresceu a olho, e a filha insistiu para ela vir."
tags: [cabeca e pescoco, tireoide, nodulo cervical, linfonodos]
topicosDeApoio:
  - cabeca-e-pescoco/exame-de-cabeca-e-pescoco/tireoide-e-pescoco
  - exame-fisico-geral/avaliacao-geral/linfonodos
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 25 (Thyroid and Its Disorders) e cap. 27 (Peripheral Lymphadenopathy)"
  - "Porto, Semiologia Médica, 8ª ed., cap. 103 (Exame Clínico da tireoide)"
  - "Semiologia Clínica, 1ª ed., cap. 8 (Semiologia de cabeça e pescoço)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela aponta a base do pescoço, à direita da linha média. Você vê, contra a luz, uma discreta assimetria no contorno. Sem dor, sem febre, sem emagrecimento referido, voz normal na conversa. Fuma meio maço por dia há trinta anos."
dados:
  - "Massa cervical anterior direita, cerca de 2 cm, há 5 semanas"
  - "Indolor, sem sinais flogísticos na pele"
  - "Sem rouquidão espontânea na conversa"
  - "Tabagista, 15 anos-maço"
proximo: d-primeiro-gesto
:::

::: no
tipo: decisao
id: d-primeiro-gesto
pergunta: "Um caroço no pescoço pode ser linfonodo, cisto, glândula salivar, vaso ou tireoide. Qual é o seu primeiro gesto?"
opcoes:
  - texto: "Entregar um copo de água e observar o pescoço contra a luz enquanto ela engole."
    avaliacao: otima
    feedback: "A manobra que custa um copo de água responde a primeira pergunta do caso: o que sobe com a laringe na deglutição é tireoide (ou está preso a ela); o que fica parado, não é. É a triagem topográfica mais barata da semiologia cervical."
    proximo: c-deglute
  - texto: "Solicitar a ultrassonografia cervical: ela é quem separa as estruturas com precisão."
    avaliacao: aceitavel
    feedback: "A ultrassonografia virá, e provavelmente com papel central. Mas pedir imagem antes de uma manobra de dez segundos inverte a ordem: a deglutição observada já classifica a massa e muda o que você escreve no pedido e a pressa com que o pede."
    proximo: c-deglute
  - texto: "Palpar imediatamente a massa, antes de qualquer outra coisa."
    avaliacao: aceitavel
    feedback: "A palpação vem já em seguida, mas começa melhor quem olha primeiro: a inspeção com o pescoço discretamente estendido e a deglutição observada dizem de onde a massa é, e a palpação diz como ela é. Cada tempo com a sua pergunta."
    proximo: c-deglute
:::

::: no
tipo: cena
id: c-deglute
texto: "Ela engole e o nódulo sobe junto com a cartilagem tireóidea, descendo em seguida. É tireoidiano. Você palpa: nódulo único no lobo direito, cerca de 2 cm, consistência firme, superfície lisa, que acompanha a deglutição também sob os seus dedos. A pele sobre ele é normal."
dados:
  - "Nódulo móvel à deglutição: tireoidiano"
  - "Lobo direito, único, ~2 cm, firme, superfície lisa"
  - "Acompanha a deglutição à palpação (não aderido)"
proximo: d-caracterizar
:::

::: no
tipo: decisao
id: d-caracterizar
pergunta: "Nódulo tireoidiano definido. O que o restante do SEU exame precisa buscar antes de qualquer pedido?"
opcoes:
  - texto: "As cadeias linfonodais cervicais e supraclaviculares, a voz, e se o nódulo é fixo aos planos vizinhos."
    avaliacao: otima
    feedback: "São exatamente os três achados que mais elevam a probabilidade de carcinoma no nódulo tireoidiano: adenopatia cervical, paralisia de prega vocal (que a rouquidão persistente denuncia) e fixação aos tecidos vizinhos, com razões de verossimilhança entre 7 e 18, elevações substanciais. A fossa supraclavicular se palpa por trás da clavícula, com uma manobra de Valsalva para tornar os linfonodos salientes."
    proximo: c-achados
  - texto: "Sinais de hiper ou hipofunção: tremor, taquicardia, pele, reflexos. Nódulo é problema hormonal antes de tudo."
    avaliacao: aceitavel
    feedback: "O estado funcional entra no exame, e o TSH virá de qualquer forma. Mas a pergunta que este nódulo faz primeiro não é hormonal, é estrutural: há sinais de malignidade ao redor dele? Linfonodos, voz e fixação vêm antes do repertório funcional."
    proximo: c-achados
  - texto: "Nada: com a topografia definida, o caso agora é da ultrassonografia e da punção."
    avaliacao: erro
    feedback: "O exame que falta custa dois minutos e muda a prioridade de tudo o que vem depois: um linfonodo endurecido na cadeia cervical, uma rouquidão que a paciente 'achou que era da idade' ou um nódulo que não desliza transformam o encaminhamento comum em encaminhamento urgente."
    proximo: c-achados
:::

::: no
tipo: cena
id: c-achados
texto: "Você percorre as cadeias: nada palpável nas cervicais; fossas supraclaviculares vazias, mesmo sob Valsalva. Pede que ela sustente uma vogal e conte até trinta: a voz é limpa, sem rouquidão. O nódulo desliza com a deglutição, sem fixação. Ficam, na coluna dos alarmes, a idade acima de 40, a duração acima de duas semanas e o nódulo indolor."
dados:
  - "Sem adenopatia cervical ou supraclavicular"
  - "Voz sem rouquidão sustentada"
  - "Nódulo não aderido"
  - "Alarmes presentes: idade > 40 anos, duração > 2 semanas, nódulo indolor"
proximo: d-interpretar
:::

::: no
tipo: decisao
id: d-interpretar
pergunta: "Nenhum dos três grandes achados de malignidade está presente. Como você fecha o raciocínio com a paciente?"
opcoes:
  - texto: "Explicar que o exame não mostrou os sinais de maior peso, mas que a ausência deles não afasta carcinoma: a investigação segue, com ultrassonografia e, conforme o achado, punção aspirativa."
    avaliacao: otima
    feedback: "É a leitura honesta dos números. Adenopatia, paralisia de prega e fixação elevam muito a probabilidade quando presentes, mas são pouco sensíveis: menos de um em cada três nódulos carcinomatosos mostra qualquer um deles. Quem define o diagnóstico do nódulo tireoidiano é o exame citológico. E o contexto acalma sem mentir: os carcinomas papilares e foliculares, de crescimento lento e bem diferenciados, respondem por 80% a 90% das neoplasias da glândula."
    proximo: fim-otimo
  - texto: "Tranquilizar: nódulo móvel, sem linfonodo e sem rouquidão é benigno; basta observar e voltar em um ano."
    avaliacao: erro
    feedback: "A conclusão usa os achados ao contrário. Eles quase confirmam quando presentes, mas não afastam quando ausentes, porque a maioria dos carcinomas não os exibe. 'Observar um ano' é o tempo de que um nódulo maligno precisa para produzir exatamente os sinais cuja ausência tranquilizou."
    proximo: fim-dano
  - texto: "Pedir apenas o TSH: se estiver normal, não há nódulo que preocupe."
    avaliacao: erro
    feedback: "O TSH faz parte da investigação, mas responde outra pergunta (função, e se cabe cintilografia), não a pergunta deste nódulo. A maioria dos nódulos malignos cursa com função normal: um TSH limpo não dispensa a imagem nem a citologia."
    proximo: fim-dano
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A ultrassonografia descreve um nódulo sólido e hipoecogênico de 2,1 cm, e a punção aspirativa vem em seguida: carcinoma papilar. A cirurgia acontece dentro do mês, com linfonodos livres. No retorno, ela conta que a filha quis saber 'como o médico descobriu com um copo de água'."
ensino: "No caroço cervical, a deglutição observada faz a triagem topográfica; no nódulo tireoidiano, os três achados que quase confirmam malignidade (adenopatia, rouquidão por paralisia de prega, fixação) são pouco sensíveis, e a ausência deles não encerra nada. O exame físico ordena a pressa; a citologia dá o nome."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ela volta catorze meses depois, agora com a voz rouca e um linfonodo endurecido na cadeia cervical direita. A punção confirma carcinoma papilar, agora com metástase linfonodal: a cirurgia é maior e vem acompanhada de esvaziamento cervical."
ensino: "Os sinais de malignidade do nódulo tireoidiano chegam tarde por definição: quando a rouquidão e o linfonodo aparecem, a probabilidade sobe com razões de verossimilhança de 7 a 18 porque a doença avançou. Investigar o nódulo indolor de mais de duas semanas em maior de 40 anos é usar a lista de alarmes para o que ela existe: antecipar o diagnóstico, não confirmá-lo."
:::
