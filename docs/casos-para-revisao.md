# Casos clínicos à espera de revisão

Todos os 32 casos do app estão com `revisao: pendente` no frontmatter e
aparecem no app com o selo "Em revisão pelo autor" ao serem abertos. Este
documento é a fila de trabalho: o que cada caso ensina e o que precisa ser
conferido antes do endosso.

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

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A consulta dos dezoito segundos | 3 | anamnese, entrevista, cefaleia, tecnica de entrevista, agenda oculta | do lote anterior |

## Exame físico geral

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O adolescente que respirava fundo demais | 3 | geral, cetoacidose, desidratacao, respiracao | novo neste lote |
| A pressão que chegou em 210 por 130 | 5 | emergencia, cardiovascular, sinais vitais, pressão arterial | do lote anterior |
| O idoso que não teve febre | 3 | geral, sepse, delirium, idoso | novo neste lote |
| As placas que subiram em dez minutos | 3 | geral, anafilaxia, pele, emergencia | novo neste lote |

## Cabeça e pescoço

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O caroço que subiu com o gole | 3 | cabeca e pescoco, tireoide, nodulo cervical, linfonodos | do lote anterior |
| O olho vermelho que doía de verdade | 3 | cabeca e pescoco, olho vermelho, glaucoma agudo, emergencia | novo neste lote |

## Aparelho cardiovascular

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A dor que mudou de lugar | 3 | cardiovascular, disseccao de aorta, pulsos, emergencia | novo neste lote |
| A terceira noite sentado na cadeira | 3 | cardiovascular, insuficiencia cardiaca, congestao, jugular | novo neste lote |
| O peso no peito que ela chamou de azia | 3 | cardiovascular, infarto, apresentacao atipica, emergencia | novo neste lote |
| A síncope e o pulso que ninguém contou | 4 | cardiovascular, sinais vitais, pulso, arritmia, síncope | do lote anterior |

## Aparelho respiratório

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A base que parou de falar | 5 | respiratorio, dispneia, derrame pleural, percussao, ausculta | do lote anterior |
| A falta de ar que o tórax não explicava | 3 | respiratorio, tromboembolismo, dispneia, emergencia | novo neste lote |
| O pulmão que sumiu do lado direito | 3 | respiratorio, pneumotorax, percussao, emergencia | novo neste lote |
| O sibilo que parou de tocar | 3 | respiratorio, asma, sibilos, emergencia | novo neste lote |

## Abdome

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O atraso que ninguém perguntou | 3 | abdome, abdome agudo, gravidez ectopica, hemorragia | novo neste lote |
| A barriga que virou tábua | 3 | abdome, abdome agudo, perfuracao, peritonite | novo neste lote |
| A barriga que parou de trabalhar | 3 | abdome, abdome agudo, obstrucao intestinal, percussao | novo neste lote |
| A dor que o abdome não confirmava | 2 | abdome, abdome agudo, isquemia mesenterica, fibrilacao atrial | novo neste lote |
| A dor que caminhou até a fossa direita | 3 | abdome, dor abdominal, apendicite, peritonite, emergencia | do lote anterior |

## Sistema vascular periférico

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A panturrilha que inchou na viagem | 3 | vascular, trombose venosa, edema, membro inferior | novo neste lote |
| A perna que esfriou às três da tarde | 3 | vascular, isquemia aguda, pulsos, emergencia | do lote anterior |

## Sistema osteoarticular

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O joelho do futebol de sábado | 4 | osteoarticular, joelho, trauma, Ottawa, Lachman | do lote anterior |
| O ombro que não deixava ninguém tocar | 3 | osteoarticular, artrite septica, ombro, monoartrite | novo neste lote |

## Mamas e geniturinário

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A dor que acordou o menino às 3 da manhã | 3 | geniturinario, escroto agudo, torcao testicular, emergencia | do lote anterior |

## Sistema nervoso

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O braço que caiu às sete da manhã | 3 | neurologico, avc, janela terapeutica, forca | novo neste lote |
| Febre, cefaleia e uma nuca que não dobra | 4 | nervoso, meningite, sinais meningeos, febre, emergencia | do lote anterior |
| A pior dor de cabeça da vida dela | 3 | neurologico, cefaleia, hemorragia subaracnoide, sinais meningeos | novo neste lote |

## Exame psíquico

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| A pergunta que faltava fazer | 3 | psiquico, risco de suicidio, humor, entrevista | novo neste lote |
| Quieta demais no leito 8 | 3 | psiquico, delirium, idoso, CAM, avaliacao cognitiva | do lote anterior |

## Semiologia da criança

| Caso | Decisões | Situação | Estado |
|---|---|---|---|
| O bebê que parou de mamar | 3 | crianca, desidratacao, choque, hidratacao | novo neste lote |
| Febre em uma criança de 3 anos | 4 | pediatria, emergencia, sinais vitais, temperatura, febre | do lote anterior |

## Arquivos

Um arquivo por caso, em `content/casos/<id>.md`:

- `consulta-dos-dezoito-segundos.md`: A consulta dos dezoito segundos
- `adolescente-que-respirava-fundo.md`: O adolescente que respirava fundo demais
- `crise-hipertensiva.md`: A pressão que chegou em 210 por 130
- `idoso-que-nao-teve-febre.md`: O idoso que não teve febre
- `placas-que-subiram-em-dez-minutos.md`: As placas que subiram em dez minutos
- `caroco-no-pescoco.md`: O caroço que subiu com o gole
- `olho-vermelho-que-doia.md`: O olho vermelho que doía de verdade
- `dor-que-mudou-de-lugar.md`: A dor que mudou de lugar
- `noite-sentado-na-cadeira.md`: A terceira noite sentado na cadeira
- `peso-no-peito-que-ela-chamou-de-azia.md`: O peso no peito que ela chamou de azia
- `sincope-pulso-irregular.md`: A síncope e o pulso que ninguém contou
- `dispneia-e-base-muda.md`: A base que parou de falar
- `falta-de-ar-que-o-torax-nao-explicava.md`: A falta de ar que o tórax não explicava
- `pulmao-que-sumiu-do-lado-direito.md`: O pulmão que sumiu do lado direito
- `sibilo-que-parou-de-tocar.md`: O sibilo que parou de tocar
- `atraso-que-ninguem-perguntou.md`: O atraso que ninguém perguntou
- `barriga-de-tabua.md`: A barriga que virou tábua
- `barriga-que-parou.md`: A barriga que parou de trabalhar
- `dor-desproporcional-ao-exame.md`: A dor que o abdome não confirmava
- `dor-que-caminhou.md`: A dor que caminhou até a fossa direita
- `panturrilha-que-inchou-na-viagem.md`: A panturrilha que inchou na viagem
- `perna-que-esfriou.md`: A perna que esfriou às três da tarde
- `joelho-do-sabado.md`: O joelho do futebol de sábado
- `ombro-que-nao-deixa-tocar.md`: O ombro que não deixava ninguém tocar
- `dor-que-acordou-o-menino.md`: A dor que acordou o menino às 3 da manhã
- `braco-que-caiu-as-sete-da-manha.md`: O braço que caiu às sete da manhã
- `febre-e-nuca-dura.md`: Febre, cefaleia e uma nuca que não dobra
- `pior-dor-de-cabeca-da-vida.md`: A pior dor de cabeça da vida dela
- `pergunta-que-faltava-fazer.md`: A pergunta que faltava fazer
- `quieta-demais-no-leito-8.md`: Quieta demais no leito 8
- `bebe-que-parou-de-mamar.md`: O bebê que parou de mamar
- `febre-na-crianca.md`: Febre em uma criança de 3 anos

