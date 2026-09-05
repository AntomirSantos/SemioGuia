# Licenças e proveniência dos sons de ausculta

## Gravações clínicas reais (CC BY 4.0)

Cinco sons são gravações clínicas reais extraídas do dataset **HF_Lung_V1**,
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

## Sons sintetizados

Os demais 15 sons são **inteiramente sintetizados** por
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
- **Sons cardíacos**: nenhuma fonte cardíaca com licença aberta e áudio
  acessível foi alcançável nesta sessão (PhysioNet bloqueado pelo proxy;
  espelhos verificados continham apenas código/features). Os candidatos
  naturais para uma futura leva são o PhysioNet/CinC Challenge 2016 e o
  CirCor DigiScope (ambos ODC-BY 1.0), baixados da fonte primária.
