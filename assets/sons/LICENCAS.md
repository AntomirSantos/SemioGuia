# Licenças e proveniência dos sons de ausculta

## Gravações clínicas reais

Nove sons são gravações clínicas reais, vindas de dois datasets abertos.

### Sons respiratórios: HF_Lung_V1 (CC BY 4.0)

Cinco sons vêm do dataset **HF_Lung_V1**,
publicado por **Heroic-Faith Medical Science Co. Ltd.**, com parte das
gravações provida pela **Taiwan Society of Emergency and Critical Care
Medicine (TSECCM)** (datathon TSECC 2020). O dataset é licenciado sob
**Creative Commons Attribution 4.0 International (CC BY 4.0)**: a licença
consta do arquivo LICENSE do próprio repositório.

- Fonte: <https://gitlab.com/techsupportHF/HF_Lung_V1> (conjunto `test`)
- Publicação associada: Hsu F-S et al., PLOS ONE, 2021: 
  <https://doi.org/10.1371/journal.pone.0254134>

| Arquivo no app | Arquivo-fonte no dataset | Fenômeno rotulado |
|---|---|---|
| `murmurio-vesicular.wav` | `steth_20190815_10_00_37.wav` | Apenas I/E (respiração sem adventícios) |
| `sibilos.wav` | `trunc_2019-08-08-09-36-47-L1_3.wav` | Wheeze (11,5 s rotulados; pico tonal ~427 Hz) |
| `roncos.wav` | `steth_20190809_10_30_29.wav` | Rhonchi (8,2 s rotulados; pico tonal ~95 Hz) |
| `estertores-finos.wav` | `steth_20190801_10_55_11.wav` | D, descontínuos (8,2 s rotulados; centroide ~714 Hz; ~6,6 transientes/s) |
| `estertores-grossos.wav` | `steth_20190902_13_18_17.wav` | D, descontínuos (10,3 s rotulados; centroide ~294 Hz; ~2,1 transientes/s) |

**Modificações** (declaração exigida pelo CC BY para obras modificadas),
aplicadas por `scripts/preparar-sons-reais.py`: filtro passa-alta de 70 Hz
(remoção de ruído de rede elétrica), normalização de pico a 0,8 e fades de
30 ms nas extremidades. Duração e taxa de amostragem originais (15 s,
4 kHz) preservadas.

A seleção foi feita pelos rótulos do dataset somada a triagem numérica
(ausência de clipping, pouco ruído de rede, envelope respiratório vivo) e
verificação espectral do fenômeno dentro das janelas rotuladas.


### Sons cardíacos: CirCor DigiScope (ODC-BY 1.0)

Quatro sons são gravações clínicas reais do **CirCor DigiScope
Phonocardiogram Dataset** (versão 1.0.3, PhysioNet), gravadas em crianças e
adolescentes em campanhas de rastreio em Pernambuco e na Paraíba. Licença
**Open Data Commons Attribution 1.0 (ODC-BY 1.0)**.

- Fonte: <https://physionet.org/content/circor-heart-sound/>
- Publicação associada: Oliveira J et al., IEEE J Biomed Health Inform, 2022:
  <https://doi.org/10.1109/JBHI.2021.3137048>

| Arquivo no app | Gravação-fonte | Janela | Rótulos do dataset |
|---|---|---|---|
| `bulhas-normais.wav` | `50017_MV.wav` | 6,5 a 21,5 s | Sem sopro; desfecho normal; adolescente (~84 bpm) |
| `sopro-sistolico.wav` | `40840_PV.wav` | 4,0 a 19,0 s | Sopro mesossistólico em diamante, III/VI, agudo, rude; foco pulmonar |
| `sopro-regurgitacao.wav` | `50233_MV.wav` | 13,0 a 28,0 s | Sopro holossistólico em platô, III/VI, agudo, rude; foco mitral |
| `sopro-diastolico.wav` | `50238_MV.wav` | 0,0 a 15,0 s | Sopro protodiastólico em decrescendo, II/IV, aspirativo; foco mitral |

**Modificações** (declaradas por `scripts/preparar-sons-reais.py`, modo
`circor`): corte da janela de 15 s mais estável de cada gravação,
passa-alta de 25 Hz (preservando os graves reais de B1/B2, que vivem entre
25 e 150 Hz), filtros estreitos em 50/60/100/120 Hz contra ruído de rede,
normalização de pico a 0,8 e fades de 30 ms. Taxa original de 4 kHz
preservada.

**Notas de curadoria dos cardíacos:**

- A seleção partiu do `training_data.csv` do dataset (presença de sopro,
  tempo no ciclo, forma, grau, timbre, foco mais audível) e passou por
  triagem de sinal: periodicidade do envelope, ausência de clipping e
  ruído de rede baixo. Os quatro escolhidos venceram 15 candidatos.
- As gravações são **pediátricas** (o dataset não tem adultos): a
  frequência cardíaca é mais alta que a típica do adulto, e o aviso do
  player declara a origem. A bulha normal escolhida bate ~84 bpm, dentro
  da faixa adulta.
- O `sopro-diastolico.wav` traz também um sopro protossistólico discreto
  (II/VI) do mesmo paciente, comum na regurgitação aórtica real; foi
  preferido ao candidato de sopro diastólico mais intenso (III/IV),
  que vinha acompanhado de holossistólico III/VI e soaria como
  vai-e-vem contínuo sob o rótulo de sopro diastólico.
- **Permanecem sintetizados** por falta de rótulo no dataset: galope B3,
  galope B4, desdobramento de B2, ruflar pré-sistólico, sopro contínuo e
  atrito pericárdico.

## Sons sintetizados

Os demais 11 sons são **inteiramente sintetizados** por
`scripts/gerar-sons.py` (numpy → WAV). Não derivam de nenhuma gravação;
não há direitos de terceiros envolvidos.

## Notas de curadoria

- **Estridor**: o dataset contém 12 gravações rotuladas de estridor. Uma
  triagem tonal segmento a segmento achou picos entre 144 e 383 Hz nos
  melhores candidatos (as demais candidatas chegam a ~710 Hz), enquanto o
  texto do guia (seguindo as referências) o descreve "em torno de 400 Hz":
  mantivemos o sintetizado, fiel ao texto, e registramos a divergência aqui.
- **Estertores**: o rótulo do dataset é único (D, descontínuos), sem separar
  finos de grossos. A separação foi feita por triagem espectral dos 368
  arquivos rotulados: os dois escolhidos ficam nos extremos da distribuição
  de centroide (~714 Hz contra ~294 Hz) e da taxa de transientes (~6,6/s em
  chuva teleinspiratória contra ~2,1/s esparsos), reproduzindo com folga o
  contraste que os blocos ensinam. A classificação finos × grossos é
  curadoria nossa, não rótulo do dataset.
- **Sons cardíacos**: o PhysioNet é inalcançável do ambiente remoto, e a
  leva cardíaca só foi possível porque o autor baixou o CirCor DigiScope
  na própria máquina e disponibilizou os candidatos selecionados; a
  proveniência está na seção do CirCor acima.
