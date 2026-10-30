"""DNSMOS P.835 (Microsoft): notas 1-5 para voz (SIG), fundo (BAK) e geral (OVRL)."""
import sys, numpy as np, onnxruntime as ort, librosa
s = ort.InferenceSession("../models/sig_bak_ovr.onnx", providers=["CPUExecutionProvider"])
P_SIG = np.poly1d([-0.08397278, 1.22083953, 0.0052439]); P_BAK = np.poly1d([-0.13166888, 1.60915514, -0.39604546])
P_OVR = np.poly1d([-0.06766283, 1.11546468, 0.04602535])
L = int(9.01 * 16000)
for f in sys.argv[1:]:
    a, _ = librosa.load(f, sr=16000)
    a = a * (10 ** (-25 / 20) / (np.sqrt(np.mean(a ** 2)) + 1e-9))   # mesmo nível (-25 dBFS RMS) para comparar com justiça
    while len(a) < L: a = np.concatenate([a, a])
    r = []
    for i in range(0, max(1, len(a) - L + 1), 16000):
        o = s.run(None, {"input_1": a[i:i + L][None].astype(np.float32)})[0][0]
        r.append([P_SIG(o[0]), P_BAK(o[1]), P_OVR(o[2])])
    m = np.mean(r, 0); print(f"{f:26s} voz {m[0]:.2f}  fundo {m[1]:.2f}  GERAL {m[2]:.2f}")
