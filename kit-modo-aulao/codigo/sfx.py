"""Efeitos: whoosh (ruído filtrado com varredura) e tique da contagem."""
import numpy as np, soundfile as sf
SR = 48000; rng = np.random.default_rng(7)
def whoosh(dur=0.42):
    n = int(dur * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    # varredura de passa-banda por FFT em blocos: centro sobe de 400 Hz a 3,5 kHz
    out = np.zeros(n); B = 1024
    for i in range(0, n, B // 2):
        seg = x[i:i+B] * np.hanning(len(x[i:i+B]))
        f = np.fft.rfftfreq(len(seg), 1 / SR); fc = 400 * (3500 / 400) ** (i / n)
        S = np.fft.rfft(seg) * np.exp(-((np.log(f + 1) - np.log(fc)) ** 2) / 0.35)
        out[i:i+len(seg)] += np.fft.irfft(S, len(seg))
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.6
    y = out * env; return y / np.abs(y).max() * 0.5
def tique():
    t = np.arange(int(0.12 * SR)) / SR
    y = (np.sin(2 * np.pi * 1800 * t) * 0.6 + np.sin(2 * np.pi * 2600 * t) * 0.3) * np.exp(-t * 55)
    return y / np.abs(y).max() * 0.45
for nome, y in [("whoosh.wav", whoosh()), ("tique.wav", tique())]:
    sf.write(nome, np.stack([y, y], 1).astype(np.float32), SR)
print("ok")
