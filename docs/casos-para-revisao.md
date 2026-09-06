# Casos clínicos à espera de revisão

Os 67 casos do app estão com `revisao: pendente` no frontmatter e
aparecem no app com o selo "Em revisão pelo autor" ao serem abertos. Este
documento é a fila de trabalho: o que cada caso treina e o que precisa ser
conferido antes do endosso.

## Lotes

| Lote | Casos | O que reúne |
|---|---|---|
| 1 | 12 | os primeiros casos, um por sistema |
| 2 | 20 | quadros emblemáticos de cada especialidade, em urgência |
| 3 | 15 | segunda leva de urgências, incluindo armadilhas de conduta |
| 4 | 20 | casos ambulatoriais de raciocínio, distribuídos para equilibrar os sistemas |

Os lotes 1 a 3 se passam quase todos em urgência; o lote 4 é ambulatorial.

## Como revisar

Para cada caso, confira nesta ordem:

1. **Verdade clínica**: a conduta marcada como `otima` é mesmo a melhor, e a
   marcada como `erro` é mesmo erro. Nenhum feedback deve afirmar mais do que
   a evidência sustenta.
2. **Semiologia no centro**: a decisão precisa ser resolvida por exame físico e
   raciocínio à beira do leito, não por exame complementar.
3. **Referências**: o campo `referencias` do frontmatter cita as obras por seção,
   sem número de capítulo. Ajuste para a citação exata quando quiser.
4. **Voz e ritmo**: é a parte que o Fable pode melhorar, sobretudo o parágrafo de
   `contexto` e os textos de `cena`, sem tocar na estrutura do grafo.
5. **Regra editorial**: nenhum travessão, nenhuma menção às obras no corpo.
   Os gates `checar:travessao` e `checar:fontes` vigiam isso.

Ao aprovar, troque `revisao: pendente` por `revisao: aprovada` no frontmatter do
arquivo em `content/casos/` e rode `npm run build:content`.

## Anamnese (4)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| A consulta dos dezoito segundos | 3 | urgência | anamnese, entrevista, cefaleia, tecnica de entrevista, agenda oculta | 1 |
| A filha que respondia por ele | 3 | ambulatório | anamnese, entrevista, acompanhante, autonomia | 4 |
| A lista de nove queixas | 3 | ambulatório | anamnese, polissintomatico, priorizacao, entrevista | 4 |
| A queixa que só apareceu na porta | 3 | ambulatório | anamnese, agenda oculta, entrevista, queixa principal | 4 |

## Exame físico geral (8)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O adolescente que respirava fundo demais | 3 | urgência | geral, cetoacidose, desidratacao, respiracao | 2 |
| O cansaço que a palidez explicava | 3 | ambulatório | geral, anemia, palidez, mucosas | 4 |
| A pressão que chegou em 210 por 130 | 5 | urgência | emergencia, cardiovascular, sinais vitais, pressão arterial | 1 |
| A dor que não cabia na mancha | 3 | urgência | geral, fasciite necrosante, pele, emergencia | 3 |
| O idoso que não teve febre | 3 | urgência | geral, sepse, delirium, idoso | 2 |
| As placas que subiram em dez minutos | 3 | urgência | geral, anafilaxia, pele, emergencia | 2 |
| A pressão que não subia com nada | 3 | urgência | geral, insuficiencia adrenal, hipotensao, pele | 3 |
| Os quilos que sumiram sem explicação | 3 | ambulatório | geral, emagrecimento, idoso, investigacao | 4 |

## Cabeça e pescoço (6)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O caroço que subiu com o gole | 3 | urgência | cabeca e pescoco, tireoide, nodulo cervical, linfonodos | 1 |
| O coração disparado e o pescoço quente | 3 | urgência | cabeca e pescoco, tireotoxicose, tireoide, emergencia | 3 |
| O olho que não se mexia direito | 3 | urgência | cabeca e pescoco, celulite orbitaria, olhos, emergencia | 3 |
| O olho vermelho que doía de verdade | 3 | urgência | cabeca e pescoco, olho vermelho, glaucoma agudo, emergencia | 2 |
| A tontura que vinha em crises | 3 | ambulatório | cabeca e pescoco, vertigem, tontura, manobras | 4 |
| A voz que não voltou | 3 | ambulatório | cabeca e pescoco, rouquidao, bandeira vermelha, tabagismo | 4 |

## Aparelho cardiovascular (7)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| A dor que mudou de lugar | 3 | urgência | cardiovascular, disseccao de aorta, pulsos, emergencia | 2 |
| A febre arrastada e o sopro que não existia | 3 | urgência | cardiovascular, endocardite, sopro, febre de origem indeterminada | 3 |
| A terceira noite sentado na cadeira | 3 | urgência | cardiovascular, insuficiencia cardiaca, congestao, jugular | 2 |
| O peso no peito que ela chamou de azia | 3 | urgência | cardiovascular, infarto, apresentacao atipica, emergencia | 2 |
| A pressão que sumia na inspiração | 3 | urgência | cardiovascular, tamponamento, pulso paradoxal, jugular | 3 |
| A síncope e o pulso que ninguém contou | 4 | urgência | cardiovascular, sinais vitais, pulso, arritmia, síncope | 1 |
| O sopro que ninguém tinha ouvido antes | 3 | ambulatório | cardiovascular, sopro, ausculta, ambulatorial | 4 |

## Aparelho respiratório (6)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| A base que parou de falar | 5 | urgência | respiratorio, dispneia, derrame pleural, percussao, ausculta | 1 |
| A falta de ar que cresceu devagar | 3 | ambulatório | respiratorio, dispneia, dpoc, ambulatorial | 4 |
| A falta de ar que o tórax não explicava | 3 | urgência | respiratorio, tromboembolismo, dispneia, emergencia | 2 |
| O pulmão que sumiu do lado direito | 3 | urgência | respiratorio, pneumotorax, percussao, emergencia | 2 |
| O sibilo que parou de tocar | 3 | urgência | respiratorio, asma, sibilos, emergencia | 2 |
| A tosse que já dura oito semanas | 3 | ambulatório | respiratorio, tosse cronica, bandeira vermelha, tabagismo | 4 |

## Abdome (8)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O atraso que ninguém perguntou | 3 | urgência | abdome, abdome agudo, gravidez ectopica, hemorragia | 2 |
| A barriga que virou tábua | 3 | urgência | abdome, abdome agudo, perfuracao, peritonite | 2 |
| A barriga que parou de trabalhar | 3 | urgência | abdome, abdome agudo, obstrucao intestinal, percussao | 2 |
| A dor que o abdome não confirmava | 2 | urgência | abdome, abdome agudo, isquemia mesenterica, fibrilacao atrial | 2 |
| A dor que atravessou para as costas | 3 | urgência | abdome, pancreatite, dor epigastrica, gravidade | 3 |
| A dor que caminhou até a fossa direita | 3 | urgência | abdome, dor abdominal, apendicite, peritonite, emergencia | 1 |
| A febre que veio junto com a icterícia | 3 | urgência | abdome, colangite, ictericia, emergencia | 3 |
| O vômito que veio preto | 3 | urgência | abdome, hemorragia digestiva, hipovolemia, hepatopatia | 3 |

## Sistema vascular periférico (4)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| A dor que obriga a parar na esquina | 3 | ambulatório | vascular, claudicacao, pulsos, insuficiencia arterial | 4 |
| A ferida no pé que não doía | 3 | ambulatório | vascular, pe diabetico, ulcera, neuropatia | 4 |
| A panturrilha que inchou na viagem | 3 | urgência | vascular, trombose venosa, edema, membro inferior | 2 |
| A perna que esfriou às três da tarde | 3 | urgência | vascular, isquemia aguda, pulsos, emergencia | 1 |

## Sistema osteoarticular (6)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O braço que não alcança mais o varal | 3 | ambulatório | osteoarticular, ombro, manguito rotador, manobras | 4 |
| A dor nas costas que molhou a cama | 3 | urgência | osteoarticular, cauda equina, coluna, emergencia | 3 |
| O joelho do futebol de sábado | 4 | urgência | osteoarticular, joelho, trauma, Ottawa, Lachman | 1 |
| As mãos que amanhecem duras | 3 | ambulatório | osteoarticular, poliartralgia, padrao inflamatorio, maos | 4 |
| O ombro que não deixava ninguém tocar | 3 | urgência | osteoarticular, artrite septica, ombro, monoartrite | 2 |
| A perna engessada que doía demais | 3 | urgência | osteoarticular, sindrome compartimental, dor desproporcional, emergencia | 3 |

## Mamas e geniturinário (4)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O carocinho que ela achou no banho | 3 | ambulatório | mamas, nodulo mamario, exame das mamas, ambulatorial | 4 |
| A dor no alto da barriga que não era gastrite | 3 | urgência | geniturinario, pre-eclampsia, gestacao, emergencia | 3 |
| A dor que acordou o menino às 3 da manhã | 3 | urgência | geniturinario, escroto agudo, torcao testicular, emergencia | 1 |
| O jato que ficou fraco | 3 | ambulatório | geniturinario, prostata, toque retal, ambulatorial | 4 |

## Sistema nervoso (6)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O braço que caiu às sete da manhã | 3 | urgência | neurologico, avc, janela terapeutica, forca | 2 |
| A convulsão que não parava | 3 | urgência | neurologico, estado de mal, convulsao, emergencia | 3 |
| Febre, cefaleia e uma nuca que não dobra | 4 | urgência | nervoso, meningite, sinais meningeos, febre, emergencia | 1 |
| Voltou da lavoura passando mal | 3 | urgência | neurologico, intoxicacao, organofosforado, pupilas | 3 |
| A pior dor de cabeça da vida dela | 3 | urgência | neurologico, cefaleia, hemorragia subaracnoide, sinais meningeos | 2 |
| O tremor que aparecia com a mão parada | 3 | ambulatório | neurologico, tremor, parkinsonismo, marcha | 4 |

## Exame psíquico (4)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| As duas cervejas que eram oito | 3 | ambulatório | psiquico, rastreio, uso de alcool, entrevista | 4 |
| A memória que a família notou primeiro | 3 | ambulatório | psiquico, memoria, demencia, depressao | 4 |
| A pergunta que faltava fazer | 3 | urgência | psiquico, risco de suicidio, humor, entrevista | 2 |
| Quieta demais no leito 8 | 3 | urgência | psiquico, delirium, idoso, CAM, avaliacao cognitiva | 1 |

## Semiologia da criança (4)

| Caso | Decisões | Cenário | Tema | Lote |
|---|---|---|---|---|
| O bebê que não ganha peso | 3 | ambulatório | crianca, crescimento, curva de peso, puericultura | 4 |
| O bebê que parou de mamar | 3 | urgência | crianca, desidratacao, choque, hidratacao | 2 |
| A criança que babava sentada na cadeira | 3 | urgência | crianca, epiglotite, via aerea, emergencia | 3 |
| Febre em uma criança de 3 anos | 4 | urgência | pediatria, emergencia, sinais vitais, temperatura, febre | 1 |

## Arquivos

Um arquivo por caso, em `content/casos/<id>.md`:

- `consulta-dos-dezoito-segundos.md`: A consulta dos dezoito segundos
- `filha-que-respondia-por-ele.md`: A filha que respondia por ele
- `lista-de-nove-queixas.md`: A lista de nove queixas
- `queixa-que-veio-na-porta.md`: A queixa que só apareceu na porta
- `adolescente-que-respirava-fundo.md`: O adolescente que respirava fundo demais
- `cansaco-que-a-palidez-explicava.md`: O cansaço que a palidez explicava
- `crise-hipertensiva.md`: A pressão que chegou em 210 por 130
- `dor-que-nao-cabia-na-mancha.md`: A dor que não cabia na mancha
- `idoso-que-nao-teve-febre.md`: O idoso que não teve febre
- `placas-que-subiram-em-dez-minutos.md`: As placas que subiram em dez minutos
- `pressao-que-nao-subia-com-nada.md`: A pressão que não subia com nada
- `quilos-que-sumiram-sem-explicacao.md`: Os quilos que sumiram sem explicação
- `caroco-no-pescoco.md`: O caroço que subiu com o gole
- `coracao-disparado-e-pescoco-quente.md`: O coração disparado e o pescoço quente
- `olho-que-nao-se-mexia-direito.md`: O olho que não se mexia direito
- `olho-vermelho-que-doia.md`: O olho vermelho que doía de verdade
- `tontura-que-vinha-em-crises.md`: A tontura que vinha em crises
- `voz-que-nao-voltou.md`: A voz que não voltou
- `dor-que-mudou-de-lugar.md`: A dor que mudou de lugar
- `febre-arrastada-e-sopro-novo.md`: A febre arrastada e o sopro que não existia
- `noite-sentado-na-cadeira.md`: A terceira noite sentado na cadeira
- `peso-no-peito-que-ela-chamou-de-azia.md`: O peso no peito que ela chamou de azia
- `pressao-que-sumia-na-inspiracao.md`: A pressão que sumia na inspiração
- `sincope-pulso-irregular.md`: A síncope e o pulso que ninguém contou
- `sopro-que-ninguem-tinha-ouvido.md`: O sopro que ninguém tinha ouvido antes
- `dispneia-e-base-muda.md`: A base que parou de falar
- `falta-de-ar-que-cresceu-devagar.md`: A falta de ar que cresceu devagar
- `falta-de-ar-que-o-torax-nao-explicava.md`: A falta de ar que o tórax não explicava
- `pulmao-que-sumiu-do-lado-direito.md`: O pulmão que sumiu do lado direito
- `sibilo-que-parou-de-tocar.md`: O sibilo que parou de tocar
- `tosse-de-oito-semanas.md`: A tosse que já dura oito semanas
- `atraso-que-ninguem-perguntou.md`: O atraso que ninguém perguntou
- `barriga-de-tabua.md`: A barriga que virou tábua
- `barriga-que-parou.md`: A barriga que parou de trabalhar
- `dor-desproporcional-ao-exame.md`: A dor que o abdome não confirmava
- `dor-que-atravessou-para-as-costas.md`: A dor que atravessou para as costas
- `dor-que-caminhou.md`: A dor que caminhou até a fossa direita
- `febre-ictericia-e-calafrio.md`: A febre que veio junto com a icterícia
- `vomito-que-veio-preto.md`: O vômito que veio preto
- `dor-que-obriga-a-parar-na-esquina.md`: A dor que obriga a parar na esquina
- `ferida-no-pe-que-nao-doia.md`: A ferida no pé que não doía
- `panturrilha-que-inchou-na-viagem.md`: A panturrilha que inchou na viagem
- `perna-que-esfriou.md`: A perna que esfriou às três da tarde
- `braco-que-nao-alcanca-o-varal.md`: O braço que não alcança mais o varal
- `dor-nas-costas-que-molhou-a-cama.md`: A dor nas costas que molhou a cama
- `joelho-do-sabado.md`: O joelho do futebol de sábado
- `maos-que-amanhecem-duras.md`: As mãos que amanhecem duras
- `ombro-que-nao-deixa-tocar.md`: O ombro que não deixava ninguém tocar
- `perna-engessada-que-doia-demais.md`: A perna engessada que doía demais
- `carocinho-que-ela-achou-no-banho.md`: O carocinho que ela achou no banho
- `dor-no-alto-da-barriga-na-gestacao.md`: A dor no alto da barriga que não era gastrite
- `dor-que-acordou-o-menino.md`: A dor que acordou o menino às 3 da manhã
- `jato-que-ficou-fraco.md`: O jato que ficou fraco
- `braco-que-caiu-as-sete-da-manha.md`: O braço que caiu às sete da manhã
- `convulsao-que-nao-parava.md`: A convulsão que não parava
- `febre-e-nuca-dura.md`: Febre, cefaleia e uma nuca que não dobra
- `lavoura-pupila-e-saliva.md`: Voltou da lavoura passando mal
- `pior-dor-de-cabeca-da-vida.md`: A pior dor de cabeça da vida dela
- `tremor-que-aparecia-parado.md`: O tremor que aparecia com a mão parada
- `duas-cervejas-que-eram-oito.md`: As duas cervejas que eram oito
- `memoria-que-a-familia-notou.md`: A memória que a família notou primeiro
- `pergunta-que-faltava-fazer.md`: A pergunta que faltava fazer
- `quieta-demais-no-leito-8.md`: Quieta demais no leito 8
- `bebe-que-nao-ganha-peso.md`: O bebê que não ganha peso
- `bebe-que-parou-de-mamar.md`: O bebê que parou de mamar
- `crianca-que-babava-sentada.md`: A criança que babava sentada na cadeira
- `febre-na-crianca.md`: Febre em uma criança de 3 anos

