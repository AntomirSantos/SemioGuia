#!/usr/bin/env python3
"""MELHORAR O ÁUDIO: tratamento "microfone de estúdio" aprovado por Antomir em 30/10/2026.

Uso:   python melhorar_audio.py ENTRADA(.mp4/.mov/.wav) SAIDA.wav [--ganho-db X]
Saída: voz mono 48 kHz, ~-14,5 LUFS, pico <= -2 dBFS, pronta para mixar
(efeitos por cima e só um limitador no fim; NÃO aplique loudnorm dinâmico depois).

Etapas (não mude sem pedido):
 1. WPE (nara_wpe): tira as reflexões da sala
 2. "estúdio seco" = WPE + Lebart (T60 1,2 / piso -15) + cadeia de filtros  -> usado só nos agudos
 3. Denoiser da Meta (Demucs DNS64): limpa ruído e eco sem trocar palavras (sai em 16 kHz)
 4. Híbrido: Denoiser abaixo de 7400 Hz + agudos do "estúdio seco" acima (ganho 0,55)
 5. Microfone de estúdio quente com brilho (EQ, de-esser, compressor, exciter, limitador)
 6. Ganho fixo até ~-14,5 LUFS + limitador (sem loudnorm dinâmico, que levanta o ruído)
Dependências: ffmpeg, numpy, soundfile, scipy, nara_wpe, torch, torchaudio,
              denoiser (pip --no-deps) + julius + hydra-core
"""
import json, subprocess, sys, pathlib, tempfile
AQUI = pathlib.Path(__file__).resolve().parent
ent, sai = sys.argv[1], sys.argv[2]
GANHO = None
if "--ganho-db" in sys.argv: GANHO = float(sys.argv[sys.argv.index("--ganho-db") + 1])
tmp = pathlib.Path(tempfile.mkdtemp())
py = sys.executable
def ff(*a): subprocess.run(["ffmpeg", "-v", "error", "-y", *a], check=True)

SECO = ("highpass=f=100,afftdn=nr=16:nf=-50:tn=1,equalizer=f=250:t=q:w=1.0:g=-3,equalizer=f=450:t=q:w=1.2:g=-3,"
        "equalizer=f=3300:t=q:w=1.0:g=3,equalizer=f=9500:t=q:w=1.2:g=2,deesser=i=0.45,"
        "agate=threshold=0.018:ratio=3:range=0.12:attack=3:release=110,"
        "acompressor=threshold=0.08:ratio=4:attack=5:release=130:makeup=2.4,lowpass=f=15000")
MIC = ("highpass=f=65,equalizer=f=105:t=q:w=0.8:g=3.5,equalizer=f=330:t=q:w=1.3:g=-3.5,"
       "equalizer=f=4500:t=q:w=1.1:g=3,equalizer=f=11000:t=h:w=0.7:g=3,deesser=i=0.5,"
       "acompressor=threshold=0.09:ratio=3.5:attack=15:release=220:makeup=2.2,"
       "aexciter=amount=0.75:drive=2.5:blend=0:freq=5000,alimiter=limit=0.9:attack=4:release=50")

ff("-i", ent, "-vn", "-ac", "1", "-ar", "48000", str(tmp / "bruto.wav"))
subprocess.run([py, str(AQUI / "wpe_dereverb.py"), str(tmp / "bruto.wav"), str(tmp / "wpe.wav"), "30"], check=True)
subprocess.run([py, str(AQUI / "dereverb.py"), str(tmp / "wpe.wav"), str(tmp / "lebart.wav"), "1.2", "-15"], check=True)
ff("-i", str(tmp / "lebart.wav"), "-af", SECO, "-ar", "48000", str(tmp / "seco.wav"))
subprocess.run([py, str(AQUI / "denoiser_meta.py"), str(tmp / "wpe.wav"), str(tmp / "dns16.wav")], check=True)
ff("-i", str(tmp / "dns16.wav"), "-i", str(tmp / "seco.wav"), "-filter_complex",
   "[0:a]aresample=48000:resampler=soxr,lowpass=f=7400:poles=2,lowpass=f=7400:poles=2[lo];"
   "[1:a]aresample=48000,highpass=f=7400:poles=2,highpass=f=7400:poles=2,volume=0.55[hi];"
   "[lo][hi]amix=inputs=2:normalize=0", "-ar", "48000", str(tmp / "hibrida.wav"))
ff("-i", str(tmp / "hibrida.wav"), "-af", MIC, "-ar", "48000", str(tmp / "mic.wav"))
if GANHO is None:   # mede o volume integrado e calcula o ganho até -14,5 LUFS
    r = subprocess.run(["ffmpeg", "-i", str(tmp / "mic.wav"), "-af", "loudnorm=print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    GANHO = -14.5 - float(json.loads(r[r.index("{"):r.rindex("}") + 1])["input_i"])
ff("-i", str(tmp / "mic.wav"), "-af", f"volume={GANHO:.2f}dB,alimiter=limit=0.79:attack=2:release=30:level=false",
   "-ar", "48000", sai)
print(f"ok: {sai} (ganho {GANHO:+.1f} dB). No vídeo: mixe os efeitos e finalize com "
      "aresample=192000,alimiter=limit=0.7:attack=5:release=50:level=false,aresample=48000 ; AAC 192k")
