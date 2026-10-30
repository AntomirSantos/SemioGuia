# MODO AULÃO — padrão de edição AssessoriaENEM

> Quando eu pedir **"edite no modo aulão"**, siga este documento à risca.
> Ele resume tudo o que foi aprovado na peça do aulão do prof. José Mantovani
> (Questão 84 · ENEM 2024 PPL · Rosa Parks, out/2026). Anexe este kit
> (`kit-modo-aulao.zip`) na primeira mensagem da conversa.
> Só proponha mudança com motivo concreto.

**O que é a peça:** o professor grava um vídeo vertical convidando para um
aulão ao vivo e resolve uma questão no meio. A edição transforma isso num
Reels/TikTok/Shorts com legenda, questão na tela, pausa para o público
responder, acerto em verde e CTA de venda no fim. Junto saem duas miniaturas.

---

## 0. Regra de ouro do fluxo — PRÉVIA ANTES DE RENDERIZAR

**Sempre mostre prévias e espere minha aprovação antes de renderizar.**

- **Capas:** mande a imagem e a comparação lado a lado.
- **Vídeo:** mande quadros-chave e tiras de quadros de cada elemento novo.
  No áudio, mande trechos de comparação de 10 a 15 s.
- **Só renderize o vídeo final depois de um "pode renderizar".**
- **Quando eu pedir "opções", dê de 2 a 4, numeradas e rotuladas na própria
  imagem.**

## 1. O que eu mando

1. O **vídeo do professor**, numa pasta do Drive. O nome do arquivo costuma
   começar com `VID-` (WhatsApp). O download direto
   `https://drive.usercontent.google.com/download?id=ID&export=download&confirm=t`
   funcionou na nuvem; se der 403, use a ponte com o Mac.
2. O **print da questão** (enunciado + alternativas) e a origem dela
   (ex.: "ENEM 2024 PPL, caderno azul, questão 84").
3. Às vezes, **fotos de contexto** (ex.: Rosa Parks). Se eu não mandar e a
   questão pedir, peça. Fontes públicas (Wikimedia/LoC) costumam bloquear
   daqui.
4. Data/hora do aulão, se não estiver dita no vídeo.

## 2. Entregas

| Arquivo | O que é |
|---|---|
| `VID-aulao-<tema>.mp4` | vídeo final, 1080x1920, 30 fps, H.264 High, AAC, `+faststart`, ≤ 30 MB |
| `miniatura-1-...jpg` | capa principal 1080x1920 |
| `miniatura-2-...jpg` | segunda opção de capa |

Limite de 30 MB: `maxrate = (29·8·1024)/duração − 128` kbps.

## 3. Cortes e tempo

- **Sem gancho.** O vídeo começa direto na primeira fala dele.
  Já testamos gancho com a fala dele e gancho de impacto; nenhum foi aprovado.
- **Início:** corte até ele estar **de frente para a câmera**. No VID da Q84
  ele estava virado para o computador até 0,6 s; confira quadro a quadro.
- **Respiros:** `silencedetect -34 dB / 0,32 s` com `highpass=120`. Cada pausa
  fica com ~0,16 s (pad de 0,08 s de cada lado). Tire inteiros os silêncios do
  começo e do fim.
- **Instruções ao editor ditas no vídeo** (ex.: "sugestão de edição, coloque a
  questão enquanto eu vou falando"): corte a frase e **cumpra a instrução**.
- **Transcrição:** Whisper **medium** (`openai-whisper`, o modelo baixa do
  azureedge) com `word_timestamps=True`. Corrija só erros de transcrição,
  como o nome do professor, "2024" e "assessoria ENEM".
- **NÃO corrija o professor.** Se ele falou "Batalha de Montgomery", a legenda
  e os destaques dizem "batalha", não "boicote". Pode me avisar, mas não troque.

## 4. Identidade visual

**Fonte:** Poppins (`marca/poppins.css` em base64 para o Chromium; os TTF em
`marca/ttf/` para o libass).

**Cores:**
- azul-marinho `#131B2D` (fundo das capas `#07101C`);
- ouro `#FBC25E`;
- texto escuro `#0F1120`;
- azul do caderno `#2F6FDE`;
- verde do acerto `#22C55E`.

**Logo AssessoriaENEM:** `marca/logo_aeenem.png`, 210 px de largura, em
**x=810, y=130**, o **vídeo inteiro**. Fica fora do CTA final, que já tem a
própria logo.

**Tarja do professor:** "PROF. NOME SOBRENOME" numa pílula azul-marinho a 88%,
Poppins 700 31 px, centralizada, topo em **y=1530**. Ela **some** enquanto o
painel da questão ou o card da alternativa correta estão na tela.

### Legenda (estilo da marca, sem brigar com camiseta colorida)

- **Formato do bloco:** 2 a 3 palavras, no máximo 18 caracteres, quebrando na
  pontuação, em CAIXA ALTA.
- **Estilo ASS:** Poppins ExtraBold 66, texto branco, `BorderStyle=3`, caixa
  azul-marinho `&H182D1B13` com outline 14 e sombra 0. Posição `\pos(540,1180)`.
- **Palavra-chave:** a mais longa que não seja stopword, em ouro `#FBC25E`,
  dentro da caixa.
- **Entrada:** `\fscx86\fscy86\t(0,100,\fscx100\fscy100)`.
- **Quando some:** durante o painel da questão, a ênfase escurecida e o card de
  acerto.

### Destaques amarelos (estilo FS02)

- **Caixa:** ouro inclinada (`skewX(-8deg)`), texto escuro em Poppins 800
  itálico, minúsculo, 104 px (74 px se tiver mais de 16 caracteres).
  Centralizada, topo em **y=300**.
- **Entrada:** 4 quadros de fade + zoom-out
  (0,3/1,08 → 0,65/1,05 → 0,9/1,02 → 1/1).
- **Saída:** seca.
- **Som:** whoosh na entrada.
- **Exemplos da Q84:** "revisão 04/11 · 18h", "segredinho",
  "batalha de Montgomery", "direitos civis", "04/11 · 18h".

### Ênfase escurecida (estilo FS02)

- **Fundo:** preto a 62%, chega em 3 quadros.
- **Palavras:** entram uma a uma em fade, no tempo da fala.
- **Fecho:** a última frase vem numa caixa amarela, com a mesma entrada dos
  destaques.
- **Exemplo da Q84:** "banheiro para negro, / banheiro para branco".

## 5. A questão na tela

- **Quando entra:** o painel só aparece quando ele começa a **ler a questão**,
  nunca antes.
- **Cabeçalho:**
  - símbolo do ENEM num selinho branco (`marca/enem_logo.png`);
  - chip ouro "ENEM 2024 PPL · QUESTÃO 84";
  - chip azul "CADERNO AZUL".
- **Revelação:** o texto aparece **palavra por palavra no ritmo da leitura**,
  cada palavra num fade de 3 quadros. O painel cresce junto com o texto.
- **Painel:** entra com fade + escala de 5 quadros.
- **Alternativas:** cada uma só aparece quando ele começa a lê-la, e a que está
  sendo lida fica destacada em ouro.
- **Sem a linha "Disponível em…"** da fonte.
- **Layout seguro para todas as redes:** painel em x 40..990, topo em y=850,
  fundo **≤ 1520** (meça). Texto-base em Poppins 600 35 px; comando 32 px;
  alternativas 30 px.
- **Alternativas:** mantenha as 5 da prova (aqui não há enquete).

### Pausa e responde

Logo depois da última alternativa:
- **quadro congelado de 3 s**, com o fundo escurecido;
- caixa "pausa e responde!" com contagem 3-2-1 num círculo dourado;
- tique a cada segundo;
- painel com todas as alternativas e nenhuma destacada.

### Acerto

Quando ele diz a letra correta:
- entra embaixo o card com a **alternativa completa** (topo y=1290,
  x 50..980), em ouro;
- 0,7 s depois ele passa para **verde** em 6 quadros, com pulso de escala,
  onda verde em volta e um ✓ num círculo branco;
- som de acerto (`marca/acerto.wav`).

O card some antes da frase seguinte. Durante ele, a legenda e a tarja somem, e
não entra destaque repetindo a letra.

## 6. Fotos de contexto (ex.: Rosa Parks)

- **Como entram:** cards tipo polaroid (moldura branca, leve rotação), com a
  mesma entrada dos destaques e um whoosh.
- **Quando:** nos momentos em que a pessoa é nomeada ou descrita.
- **Formatos aprovados na Q84:**
  - a **foto da cena** grande no alto, enquanto ele lê o trecho que a descreve
    ("ROSA PARKS · no ônibus em Montgomery, 1956");
  - o **retrato** com nome, datas e uma linha de quem foi, no canto esquerdo,
    em "dessa mulher negra…" e em "o ato de Rosa Parks…".
- **Posição:** meça a área livre com `codigo/area_livre.py` (união das
  silhuetas do intervalo) antes de posicionar, e mostre a prévia de cada
  momento.
- **Nunca** jogue a foto solta, sem nome e sem contexto.

## 7. CTA final

- **Arquivo:** `marca/cta_aulao.mp4` (3,17 s, card "AULÕES ENEM · R$ 29,90" com
  o clique em "Quero ser aprovado"; os 0,85 s iniciais já vêm mudos).
- **Onde:** concatenado no fim.
- **Se mudar:** se o produto ou as datas forem outros, peça o card novo.

## 8. Áudio: padrão aprovado "microfone de estúdio" (A + brilho)

Aprovado em 30/10/2026, no lugar do "estúdio seco". A meta é soar como
microfone profissional de estúdio sem trocar nenhuma palavra.

1. **WPE** (`codigo/wpe_dereverb.py`): `nara_wpe`, STFT 1024/256 em 48 kHz,
   taps 30, delay 3, 3 iterações.
2. **Denoiser da Meta**, Demucs DNS64 (`codigo/denoiser_meta.py`;
   `pip install --no-deps denoiser julius hydra-core`; os pesos baixam de
   dl.fbaipublicfiles.com). Ele sai em **16 kHz**.
3. **Híbrido de faixas** (devolve o "ar" acima de 8 kHz):
   - **graves e médios:** a saída do Denoiser em 48 kHz, com passa-baixa
     7400 Hz (2 vezes, 2 polos);
   - **agudos:** a versão "estúdio seco" (WPE + Lebart T60 1,2/−15 + a cadeia
     antiga), com passa-alta 7400 Hz (2 vezes) e ganho 0,55;
   - as duas faixas somadas com `amix normalize=0`.
4. **Microfone de estúdio, quente com brilho:**
   ```
   highpass=f=65,equalizer=f=105:t=q:w=0.8:g=3.5,equalizer=f=330:t=q:w=1.3:g=-3.5,
   equalizer=f=4500:t=q:w=1.1:g=3,equalizer=f=11000:t=h:w=0.7:g=3,deesser=i=0.5,
   acompressor=threshold=0.09:ratio=3.5:attack=15:release=220:makeup=2.2,
   aexciter=amount=0.75:drive=2.5:blend=0:freq=5000,alimiter=limit=0.9:attack=4:release=50
   ```
5. **Nível:** ganho fixo até ~−14,5 LUFS (`volume=+X dB`) + `alimiter`. **NÃO**
   use `loudnorm` dinâmico no final: ele age como controle automático de
   volume e levanta o ruído das pausas.
6. **Saída:** `aresample=192000,alimiter=limit=0.7,aresample=48000`, que pega
   os picos entre amostras; AAC 192 kbps; pico real ≤ −2 dBFS.
   No `build3.py`: `VOZ=voz_A_final.wav VOZ_NORMALIZADA=1 BED=0`.
7. **Sem trilha.** Efeitos: whoosh 0,32; acerto 0,55; tique 0,5.

**Testado e descartado:**
- **VoiceFixer:** nota mais alta, mas **troca palavras** ("você vendo essa
  questão" virou "você vê nessa questão"; "norte-americano" virou "no
  Anglicano").
- **DeepFilterNet:** indisponível aqui.

**Como medir:**
- **Nota de qualidade:** DNSMOS P.835 (`codigo/dnsmos.py`; o modelo
  `sig_bak_ovr.onnx` vem de raw.githubusercontent.com/microsoft/DNS-Challenge),
  sempre com o **nível igualado** a −25 dBFS RMS, porque o DNSMOS muda com o
  volume. Referência da Q84, nota geral: bruto 1,98 → estúdio seco 2,59 →
  aprovado 3,34 na voz e 3,25 no vídeo final.
- **Palavras:** confira com o Whisper medium. Use `initial_prompt` com nomes
  próprios ("Assessoria ENEM") antes de culpar o tratamento.

## 9. Miniaturas (duas opções)

Siga este modelo:

**Conteúdo:**
- **só** "AULÃO AO VIVO", a **data grande** em ouro, "às 18H" e
  "Revisão com o prof. Nome";
- logo AssessoriaENEM **grande e nítida** (até ~300 px; o PNG tem 358 px) e
  `@ASSESSORIAENEM`;
- sem número de questão e sem frase de efeito.

**Composição aprovada ("ônibus"):**
- foto de contexto da questão de fora a fora no alto (y 240–800), em P&B,
  dissolvendo no azul-marinho;
- professor **recortado** (U²-Net human seg, `codigo/recorte.py`) embaixo à
  direita, com contorno e brilho dourados;
- texto à esquerda.

**As duas miniaturas da Q84:**
- **Miniatura 1:** professor maior, mostrando o rosto (`exemplo-q84/`).
- **Miniatura 2:** a mesma composição com o professor no tamanho original.

Variação em teste: professor **maior de corpo inteiro** (não zoom no rosto),
por cima da faixa escura, com brilho atrás.

**Quadro do professor:** sorrindo, olhando para a câmera, sem a resposta
visível. Na Q84 foi o quadro de 120 s.

**Sobreposição zero:** nenhum texto, logo ou foto pode tocar a silhueta do
professor ou um rosto. **Meça** (`codigo/capa_infra.py` imprime os pixels em
comum de cada texto) e só mostre quando der zero.

**Área segura:** todo o texto dentro de y 240–1680 (miolo 3:4 da grade).

## 10. Travas técnicas conhecidas

- **Playwright do Python:** precisa da **mesma versão** do Chromium
  pré-instalado (`pip install playwright==1.63.0`,
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`).
- **rembg:** trava no pip. Baixe `u2net_human_seg.onnx` dos Releases do GitHub
  (`danielgatis/rembg`, tag `v0.0.0`) e rode com `onnxruntime`.
- **Modelos:** Hugging Face bloqueado; o Whisper do `openai-whisper` baixa
  normalmente.
- **DeepFilterNet:** o binário foi bloqueado pela política da sessão e a lib não
  roda com o torchaudio atual. Use WPE + Lebart.
- **Wikimedia e LoC:** dão 429/403 daqui; peça as fotos ao usuário.
- **Concat do ffmpeg:** use uma faixa de gráficos com alfa (qtrle) por camada,
  em vez de dezenas de overlays com `enable`.
