"""Redução de reverberação tardia por subtração espectral (Lebart et al., 2001).
A potência da reverberação tardia num quadro é estimada como a potência de Tl segundos
atrás, atenuada pelo decaimento exponencial da sala (T60); o ganho é um Wiener suavizado
com piso, para não deixar a voz metálica."""
import sys, numpy as np, soundfile as sf
ent, sai = sys.argv[1], sys.argv[2]
T60 = float(sys.argv[3]) if len(sys.argv) > 3 else 0.9
PISO_DB = float(sys.argv[4]) if len(sys.argv) > 4 else -14
x, sr = sf.read(ent); x = x if x.ndim == 1 else x.mean(1)
N, H = 1024, 256
win = np.hanning(N)
pad = np.concatenate([np.zeros(N), x, np.zeros(N)])
nq = (len(pad) - N) // H + 1
X = np.stack([np.fft.rfft(pad[i*H:i*H+N] * win) for i in range(nq)])
P = np.abs(X) ** 2
# suavização temporal da potência
Ps = P.copy()
for n in range(1, nq): Ps[n] = 0.6 * Ps[n-1] + 0.4 * P[n]
delta = 3 * np.log(10) / T60
Tl = 0.05; d = int(round(Tl * sr / H))
Pr = np.zeros_like(Ps); Pr[d:] = np.exp(-2 * delta * Tl) * Ps[:-d]
G = np.maximum(1 - Pr / (Ps + 1e-12), 10 ** (PISO_DB / 10))
for n in range(1, nq): G[n] = 0.5 * G[n-1] + 0.5 * G[n]     # evita "musical noise"
G = np.sqrt(G)
Y = X * G
y = np.zeros(len(pad)); wsum = np.zeros(len(pad))
for i in range(nq):
    y[i*H:i*H+N] += np.fft.irfft(Y[i], N) * win; wsum[i*H:i*H+N] += win ** 2
y = (y / np.maximum(wsum, 1e-8))[N:N + len(x)]
sf.write(sai, y.astype(np.float32), sr)
