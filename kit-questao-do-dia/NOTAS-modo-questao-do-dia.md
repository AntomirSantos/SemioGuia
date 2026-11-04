# Modo Questão do Dia: notas de uso (atualizado em 30/10/2026, peça 57)

O padrão é o `PROMPT.md` deste kit, que fica como está. Estas notas registram
o que foi preciso ajustar ao rodá-lo na nuvem na peça 57 (UFMG, f(1/x)).

## Ajustes de ambiente
- **Download do vídeo:** o Drive funcionou direto, sem a ponte com o Mac:
  `curl -L "https://drive.usercontent.google.com/download?id=ID&export=download&confirm=t"`.
  Se der 403, volte para a ponte (§1 do PROMPT).
- **Playwright do Python:** precisa da mesma versão do Chromium pré-instalado:
  `pip install playwright==1.63.0` e `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
- **Caminhos:** os scripts do kit leem de `/home/claude/reels`. Monte essa pasta
  com `fonts.css`, `g07/logo_aeenem.png` e `assets/aedu_branco.png`
  (a `aedu-logo-branca.png`).
- **Pacotes:** `opencv-python-headless==4.10.0.84` (haarcascades) e `sherpa-onnx`.
  O Whisper small em ONNX vem dos Releases do GitHub (`k2-fsa/sherpa-onnx`,
  tag `asr-models`). Transcrição: `codigo/transcreve_sherpa.py`.

## Peças que faltavam no kit
- **Selo "RESOLUÇÃO #NN":** o kit não tinha gerador. Foi criado
  `codigo/selo.py` (300x126, rótulo espaçado + coruja `owl_ref.png` + número em
  ouro `#F2B233` + régua), colado em x=740, y=215.

## O que a peça 57 confirmou
- **Espelhamento:** o vídeo veio espelhado e levou `hflip`. As capas saíram de
  quadros já corrigidos.
- **Janela de 15 s:** quando não há 15 s antes da primeira escrita, use 0–15 s
  se a primeira escrita for só o "f(" do enunciado (some no desfoque), e
  registre isso no LEIA-ME.
- **Alternativas:** de 5 para 4, saiu "N.D.A."; as letras e a ordem ficaram.
- **Frações no card:** use colunas `inline-flex` com `align-items:stretch`, para
  a barra da fração cobrir o numerador e o denominador.
- **Erro de fala:** uma gagueira dentro de uma palavra, sem pausa para emendar,
  fica e é registrada no LEIA-ME.
- **CTA:** "curta, comenta, compartilha" no fim do vídeo leva aos botões nos
  4 s finais, não à faixa do app.
- **Capas:** rodízio "dividida" (questão) e "rosto grande" (resolução). O
  objeto da dividida foi um SVG da curva f(x) com "f(1/x) = ?", sem entregar a
  resposta.

## Exemplo completo
`exemplo-q57/` traz os scripts da peça (card, capas, botões), o LEIA-ME
entregue, as capas, o card, o selo e a figura.

## O que a peça 58 acrescentou (Mackenzie, y = a + b/x)
- **Selo sobre conta já escrita:** a fórmula do enunciado estava no canto
  superior direito do quadro. O Antomir pediu o selo no canto superior
  ESQUERDO (x=30, y=180) "para não tapar a questão". Regra: se o canto direito
  tiver algo escrito, o selo vai para o esquerdo.
- **Fluidez (pedido do Antomir):** o corte do PROMPT (-34 dB / 0,32 s) deixa
  arrastado quem fala palavra por palavra escrevendo. Use o `cortes58.py`:
  envelope em banda cheia (passa-alta 100 Hz), toda pausa >= 0,14 s abaixo de
  -42 dB vira 0,10 s; respiros com ruído e muletas ("beleza") cortados à mão
  em vãos < -45 dB. NÃO use -30 dB em banda 150-4000 Hz: comeu "de", "de
  cima" e o "ços" de "terços". Corte o vídeo por número de quadro
  (`between(n,...)`), não por t, senão o vídeo perde ~1 s para o áudio.
  Sempre retranscreva o corte para conferir que nenhuma palavra sumiu.
- **Palavras repetidas (pedido do Antomir: "retire as palavras repetidas
  também"):** o Whisper esconde gaguejos e repetições ("o y, o y" vira "o y").
  Quebre a fala em trechos entre micro-pausas (< -36 dB), compare cada trecho
  com os dois seguintes por DTW de MFCC e retranscreva isolado os pares
  parecidos. Corte só em vãos < -40 dB e confira que a palavra seguinte não
  perdeu a primeira sílaba (o 1º corte da 58 deixou "coação").
- **Travadas ao escrever:** quando ele para no meio da frase para olhar o
  quadro (meia sílaba + mão indo até a fórmula), corte do fim da última
  palavra inteira até a retomada. Na 58: 27,10-28,44 s.
- **Repetição sem pausa entre as frases:** procure um vão de energia
  (< -40 dB por 50 ms) entre as duas falas e corte ali.
- **Capa "objeto central" com rosto atrás:** o desenho cobria o rosto. Ficou
  dividida (questão) + rosto grande (resolução).
- **Loudnorm em uma passada** ficou em -15,7 LUFS; use duas passadas
  (`linear=true`) para chegar em -14.
- Exemplo completo em `exemplo-q58/`.

## O que a peça 60 acrescentou (PUC-Campinas, quadrado inscrito)
- **"Melhore a qualidade da imagem":** aplique no master, antes de tudo:
  `hqdn3d=1.5:2.5:3:3, colorchannelmixer=rr=0.98:gg=0.99:bb=1.05,
  curves=all='0/0 0.15/0.12 0.5/0.53 0.85/0.89 1/1', eq=saturation=1.1,
  unsharp=5:5:0.7:5:5:0` (ver `exemplo-q60/qualidade-imagem.txt`). Meça a
  parede branca para acertar o balanço; não clareie o quadro (curva que
  levanta as sombras deixa o quadro cinza). Mostre antes/depois na prévia.
- **Numeração:** confirme o número com o Antomir quando houver peça parada
  no meio (a 60 veio depois de uma questão ainda sem número).
- **Repetições:** a transcrição de trechos curtos isolados dá lixo; o que
  funcionou foi Whisper com `word_timestamps` numa janela de 2-4 s e prompt
  "transcrição literal com repetições", mais teste de emenda (concatenar os
  trechos e retranscrever) para escolher qual das duas falas cortar.
- **CTA misto** ("curte, comenta, compartilha e acesse o aedu"): faixa do app
  a partir do "acesse".
- Exemplo completo em `exemplo-q60/`.

## PADRÃO desde a peça 61: melhorar a imagem sempre
O Antomir pediu: "coloque como padrão melhorar a imagem". Em TODA peça, sem
precisar pedir, o master sai com a correção (ver `exemplo-q61/qualidade.txt`):
`scale=1080:1920:flags=lanczos, hqdn3d=1.5:2.5:3:3,
colorchannelmixer=<balanço medido na parede>, curves=all='0/0 0.15/0.12
0.5/0.53 0.85/0.89 1/1', eq=saturation=1.1, unsharp=5:5:0.7:5:5:0`
(+ `hflip` antes, se vier espelhado).
- Meça a parede branca (RGB médio) e acerte rr/gg/bb para neutralizar.
- Capas: tire o quadro do 4K original com a mesma correção (sem o scale) e
  passe ao `quadro_rosto` (ex.: um mp4 de 1 quadro) — o rosto sai nítido.
- Mostre um antes/depois na prévia e no zip (`qualidade-antes-depois.jpg`).
