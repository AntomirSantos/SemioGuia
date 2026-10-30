"""Remoção de reverberação por WPE (Weighted Prediction Error, Nakatani/Yoshioka), canal único.
Prevê a cauda de reverberação a partir dos quadros anteriores e a subtrai; mantém o som direto."""
import sys, numpy as np, soundfile as sf
from nara_wpe.wpe import wpe
from nara_wpe.utils import stft, istft
ent, sai = sys.argv[1], sys.argv[2]
taps = int(sys.argv[3]) if len(sys.argv) > 3 else 30
x, sr = sf.read(ent); x = x if x.ndim == 1 else x.mean(1)
S, H = 1024, 256
Y = stft(x[None], size=S, shift=H).transpose(2, 0, 1)          # (freq, canais, quadros)
Z = wpe(Y, taps=taps, delay=3, iterations=3, statistics_mode="full").transpose(1, 2, 0)
z = istft(Z, size=S, shift=H)[0][:len(x)]
z = z / (np.abs(z).max() + 1e-9) * min(0.98, np.abs(x).max() * 1.2)
sf.write(sai, z.astype(np.float32), sr)
print("ok", sai)
