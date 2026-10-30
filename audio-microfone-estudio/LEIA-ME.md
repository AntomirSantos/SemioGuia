# Melhorar o áudio: tratamento "microfone de estúdio"

Padrão definido por Antomir em 30/10/2026: **quando ele pedir para "melhorar o
áudio", em qualquer vídeo, use exatamente este tratamento.** Ele foi aprovado
no vídeo do aulão da Questão 84 (Rosa Parks).

```bash
pip install numpy soundfile scipy nara_wpe torch torchaudio librosa onnxruntime
pip install --no-deps denoiser && pip install julius hydra-core
python melhorar_audio.py video_bruto.mp4 voz_tratada.wav
```

Na montagem do vídeo:
- **Voz:** use `voz_tratada.wav`.
- **Efeitos:** mixe por cima.
- **Final:** só `aresample=192000,alimiter=limit=0.7:attack=5:release=50:level=false,aresample=48000`.
- **Codificação:** AAC 192 kbps.
- **Não** use `loudnorm` dinâmico depois, porque ele levanta o ruído das pausas.

## Conferências obrigatórias
- **Qualidade:** `python dnsmos.py antes.wav depois.wav` (nota DNSMOS P.835).
  O modelo `sig_bak_ovr.onnx` vem de `raw.githubusercontent.com/microsoft/DNS-Challenge/master/DNSMOS/DNSMOS/`.
  O script já iguala o nível. Na Q84, a nota geral foi de 1,98 (bruto) para
  3,34.
- **Palavras:** Whisper medium antes e depois. Nenhuma palavra pode mudar; use
  `initial_prompt` com os nomes próprios.
- **Pico e volume:** pico real ≤ −2 dBFS e volume ~−14,5 LUFS.

## Não use
- **VoiceFixer:** troca palavras.
- **`loudnorm` dinâmico no final:** levanta o ruído das pausas.
