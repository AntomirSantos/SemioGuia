# Casos clínicos à espera de revisão

Os 47 casos do app estão com `revisao: pendente` no frontmatter e
aparecem no app com o selo "Em revisão pelo autor" ao serem abertos. Este
documento é a fila de trabalho: o que cada caso treina e o que precisa ser
conferido antes do endosso.

Os lotes marcam quando cada caso entrou: lote 1 são os 12 primeiros, lote 2 os
20 quadros emblemáticos de cada especialidade, lote 3 os 15 seguintes.

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

## Anamnese

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A consulta dos dezoito segundos | 3 | anamnese, entrevista, cefaleia, tecnica de entrevista, agenda oculta | lote 1 |

## Exame físico geral

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| O adolescente que respirava fundo demais | 3 | geral, cetoacidose, desidratacao, respiracao | lote 2 |
| A pressão que chegou em 210 por 130 | 5 | emergencia, cardiovascular, sinais vitais, pressão arterial | lote 1 |
| A dor que não cabia na mancha | 3 | geral, fasciite necrosante, pele, emergencia | lote 3 |
| O idoso que não teve febre | 3 | geral, sepse, delirium, idoso | lote 2 |
| As placas que subiram em dez minutos | 3 | geral, anafilaxia, pele, emergencia | lote 2 |
| A pressão que não subia com nada | 3 | geral, insuficiencia adrenal, hipotensao, pele | lote 3 |

## Cabeça e pescoço

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| O caroço que subiu com o gole | 3 | cabeca e pescoco, tireoide, nodulo cervical, linfonodos | lote 1 |
| O coração disparado e o pescoço quente | 3 | cabeca e pescoco, tireotoxicose, tireoide, emergencia | lote 3 |
| O olho que não se mexia direito | 3 | cabeca e pescoco, celulite orbitaria, olhos, emergencia | lote 3 |
| O olho vermelho que doía de verdade | 3 | cabeca e pescoco, olho vermelho, glaucoma agudo, emergencia | lote 2 |

## Aparelho cardiovascular

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A dor que mudou de lugar | 3 | cardiovascular, disseccao de aorta, pulsos, emergencia | lote 2 |
| A febre arrastada e o sopro que não existia | 3 | cardiovascular, endocardite, sopro, febre de origem indeterminada | lote 3 |
| A terceira noite sentado na cadeira | 3 | cardiovascular, insuficiencia cardiaca, congestao, jugular | lote 2 |
| O peso no peito que ela chamou de azia | 3 | cardiovascular, infarto, apresentacao atipica, emergencia | lote 2 |
| A pressão que sumia na inspiração | 3 | cardiovascular, tamponamento, pulso paradoxal, jugular | lote 3 |
| A síncope e o pulso que ninguém contou | 4 | cardiovascular, sinais vitais, pulso, arritmia, síncope | lote 1 |

## Aparelho respiratório

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A base que parou de falar | 5 | respiratorio, dispneia, derrame pleural, percussao, ausculta | lote 1 |
| A falta de ar que o tórax não explicava | 3 | respiratorio, tromboembolismo, dispneia, emergencia | lote 2 |
| O pulmão que sumiu do lado direito | 3 | respiratorio, pneumotorax, percussao, emergencia | lote 2 |
| O sibilo que parou de tocar | 3 | respiratorio, asma, sibilos, emergencia | lote 2 |

## Abdome

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| O atraso que ninguém perguntou | 3 | abdome, abdome agudo, gravidez ectopica, hemorragia | lote 2 |
| A barriga que virou tábua | 3 | abdome, abdome agudo, perfuracao, peritonite | lote 2 |
| A barriga que parou de trabalhar | 3 | abdome, abdome agudo, obstrucao intestinal, percussao | lote 2 |
| A dor que o abdome não confirmava | 2 | abdome, abdome agudo, isquemia mesenterica, fibrilacao atrial | lote 2 |
| A dor que atravessou para as costas | 3 | abdome, pancreatite, dor epigastrica, gravidade | lote 3 |
| A dor que caminhou até a fossa direita | 3 | abdome, dor abdominal, apendicite, peritonite, emergencia | lote 1 |
| A febre que veio junto com a icterícia | 3 | abdome, colangite, ictericia, emergencia | lote 3 |
| O vômito que veio preto | 3 | abdome, hemorragia digestiva, hipovolemia, hepatopatia | lote 3 |

## Sistema vascular periférico

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A panturrilha que inchou na viagem | 3 | vascular, trombose venosa, edema, membro inferior | lote 2 |
| A perna que esfriou às três da tarde | 3 | vascular, isquemia aguda, pulsos, emergencia | lote 1 |

## Sistema osteoarticular

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A dor nas costas que molhou a cama | 3 | osteoarticular, cauda equina, coluna, emergencia | lote 3 |
| O joelho do futebol de sábado | 4 | osteoarticular, joelho, trauma, Ottawa, Lachman | lote 1 |
| O ombro que não deixava ninguém tocar | 3 | osteoarticular, artrite septica, ombro, monoartrite | lote 2 |
| A perna engessada que doía demais | 3 | osteoarticular, sindrome compartimental, dor desproporcional, emergencia | lote 3 |

## Mamas e geniturinário

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A dor no alto da barriga que não era gastrite | 3 | geniturinario, pre-eclampsia, gestacao, emergencia | lote 3 |
| A dor que acordou o menino às 3 da manhã | 3 | geniturinario, escroto agudo, torcao testicular, emergencia | lote 1 |

## Sistema nervoso

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| O braço que caiu às sete da manhã | 3 | neurologico, avc, janela terapeutica, forca | lote 2 |
| A convulsão que não parava | 3 | neurologico, estado de mal, convulsao, emergencia | lote 3 |
| Febre, cefaleia e uma nuca que não dobra | 4 | nervoso, meningite, sinais meningeos, febre, emergencia | lote 1 |
| Voltou da lavoura passando mal | 3 | neurologico, intoxicacao, organofosforado, pupilas | lote 3 |
| A pior dor de cabeça da vida dela | 3 | neurologico, cefaleia, hemorragia subaracnoide, sinais meningeos | lote 2 |

## Exame psíquico

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| A pergunta que faltava fazer | 3 | psiquico, risco de suicidio, humor, entrevista | lote 2 |
| Quieta demais no leito 8 | 3 | psiquico, delirium, idoso, CAM, avaliacao cognitiva | lote 1 |

## Semiologia da criança

| Caso | Decisões | Tema | Lote |
|---|---|---|---|
| O bebê que parou de mamar | 3 | crianca, desidratacao, choque, hidratacao | lote 2 |
| A criança que babava sentada na cadeira | 3 | crianca, epiglotite, via aerea, emergencia | lote 3 |
| Febre em uma criança de 3 anos | 4 | pediatria, emergencia, sinais vitais, temperatura, febre | lote 1 |

## Arquivos

Um arquivo por caso, em `content/casos/<id>.md`:

- `consulta-dos-dezoito-segundos.md`: A consulta dos dezoito segundos
- `adolescente-que-respirava-fundo.md`: O adolescente que respirava fundo demais
- `crise-hipertensiva.md`: A pressão que chegou em 210 por 130
- `dor-que-nao-cabia-na-mancha.md`: A dor que não cabia na mancha
- `idoso-que-nao-teve-febre.md`: O idoso que não teve febre
- `placas-que-subiram-em-dez-minutos.md`: As placas que subiram em dez minutos
- `pressao-que-nao-subia-com-nada.md`: A pressão que não subia com nada
- `caroco-no-pescoco.md`: O caroço que subiu com o gole
- `coracao-disparado-e-pescoco-quente.md`: O coração disparado e o pescoço quente
- `olho-que-nao-se-mexia-direito.md`: O olho que não se mexia direito
- `olho-vermelho-que-doia.md`: O olho vermelho que doía de verdade
- `dor-que-mudou-de-lugar.md`: A dor que mudou de lugar
- `febre-arrastada-e-sopro-novo.md`: A febre arrastada e o sopro que não existia
- `noite-sentado-na-cadeira.md`: A terceira noite sentado na cadeira
- `peso-no-peito-que-ela-chamou-de-azia.md`: O peso no peito que ela chamou de azia
- `pressao-que-sumia-na-inspiracao.md`: A pressão que sumia na inspiração
- `sincope-pulso-irregular.md`: A síncope e o pulso que ninguém contou
- `dispneia-e-base-muda.md`: A base que parou de falar
- `falta-de-ar-que-o-torax-nao-explicava.md`: A falta de ar que o tórax não explicava
- `pulmao-que-sumiu-do-lado-direito.md`: O pulmão que sumiu do lado direito
- `sibilo-que-parou-de-tocar.md`: O sibilo que parou de tocar
- `atraso-que-ninguem-perguntou.md`: O atraso que ninguém perguntou
- `barriga-de-tabua.md`: A barriga que virou tábua
- `barriga-que-parou.md`: A barriga que parou de trabalhar
- `dor-desproporcional-ao-exame.md`: A dor que o abdome não confirmava
- `dor-que-atravessou-para-as-costas.md`: A dor que atravessou para as costas
- `dor-que-caminhou.md`: A dor que caminhou até a fossa direita
- `febre-ictericia-e-calafrio.md`: A febre que veio junto com a icterícia
- `vomito-que-veio-preto.md`: O vômito que veio preto
- `panturrilha-que-inchou-na-viagem.md`: A panturrilha que inchou na viagem
- `perna-que-esfriou.md`: A perna que esfriou às três da tarde
- `dor-nas-costas-que-molhou-a-cama.md`: A dor nas costas que molhou a cama
- `joelho-do-sabado.md`: O joelho do futebol de sábado
- `ombro-que-nao-deixa-tocar.md`: O ombro que não deixava ninguém tocar
- `perna-engessada-que-doia-demais.md`: A perna engessada que doía demais
- `dor-no-alto-da-barriga-na-gestacao.md`: A dor no alto da barriga que não era gastrite
- `dor-que-acordou-o-menino.md`: A dor que acordou o menino às 3 da manhã
- `braco-que-caiu-as-sete-da-manha.md`: O braço que caiu às sete da manhã
- `convulsao-que-nao-parava.md`: A convulsão que não parava
- `febre-e-nuca-dura.md`: Febre, cefaleia e uma nuca que não dobra
- `lavoura-pupila-e-saliva.md`: Voltou da lavoura passando mal
- `pior-dor-de-cabeca-da-vida.md`: A pior dor de cabeça da vida dela
- `pergunta-que-faltava-fazer.md`: A pergunta que faltava fazer
- `quieta-demais-no-leito-8.md`: Quieta demais no leito 8
- `bebe-que-parou-de-mamar.md`: O bebê que parou de mamar
- `crianca-que-babava-sentada.md`: A criança que babava sentada na cadeira
- `febre-na-crianca.md`: Febre em uma criança de 3 anos

