"""Som de acerto: arpejo curto e brilhante (dó-mi-sol-dó), senos com harmônico e decaimento."""
import numpy as np, soundfile as sf
SR = 48000
def nota(f, dur, t0, total):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(1, t / 0.006) * np.exp(-t * 7)
    x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)) * env
    total[int(t0 * SR):int(t0 * SR) + len(x)] += x
total = np.zeros(int(0.9 * SR))
for i, f in enumerate([1046.5, 1318.5, 1568.0, 2093.0]):
    nota(f, 0.6, i * 0.07, total)
total = total / np.abs(total).max() * 0.5
sf.write("acerto.wav", np.stack([total, total], 1), SR)
