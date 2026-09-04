# Licenças e proveniência dos sons de ausculta

## Gravações clínicas reais (CC BY 4.0)

Três sons são gravações clínicas reais extraídas do dataset **HF_Lung_V1**,
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

**Modificações** (declaração exigida pelo CC BY para obras modificadas),
aplicadas por `scripts/preparar-sons-reais.py`: filtro passa-alta de 70 Hz
(remoção de ruído de rede elétrica), normalização de pico a 0,8 e fades de
30 ms nas extremidades. Duração e taxa de amostragem originais (15 s,
4 kHz) preservadas.

A seleção foi feita pelos rótulos do dataset somada a triagem numérica
(ausência de clipping, pouco ruído de rede, envelope respiratório vivo) e
verificação espectral do fenômeno dentro das janelas rotuladas.

## Sons sintetizados

Os demais 14 sons são **inteiramente sintetizados** por
`scripts/gerar-sons.py` (numpy → WAV). Não derivam de nenhuma gravação;
não há direitos de terceiros envolvidos.

## Notas de curadoria

- **Estridor**: o dataset contém gravações reais rotuladas de estridor,
  mas as candidatas têm pico tonal ~710 Hz, enquanto o texto do guia
  (seguindo as fontes) o descreve "em torno de 400 Hz": mantivemos o
  sintetizado, fiel ao texto, e registramos a divergência aqui.
- **Estertores**: as gravações reais rotuladas (D) não permitem separar
  com segurança finos × grossos (rótulo único no dataset; cronologia
  inspiratória mista nos candidatos): os dois permanecem sintetizados
  para não desmentir o contraste que os blocos ensinam.
- **Sons cardíacos**: nenhuma fonte cardíaca com licença aberta e áudio
  acessível foi alcançável nesta sessão (PhysioNet bloqueado pelo proxy;
  espelhos verificados continham apenas código/features). Os candidatos
  naturais para uma futura leva são o PhysioNet/CinC Challenge 2016 e o
  CirCor DigiScope (ambos ODC-BY 1.0), baixados da fonte primária.
