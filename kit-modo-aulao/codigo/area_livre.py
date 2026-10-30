"""União das silhuetas do professor num intervalo (tempo original) -> colunas livres na faixa de y pedida."""
import sys, numpy as np, onnxruntime as ort, cv2, subprocess
a, b, y0, y1 = map(float, sys.argv[1:5])
s = ort.InferenceSession("../models/u2net_human_seg.onnx", providers=["CPUExecutionProvider"])
uni = np.zeros((1920, 1080), bool)
t = a
while t <= b:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(t), "-i", "dl/vid.mp4", "-frames:v", "1", "-vf", "scale=1080:1920",
                          "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
    im = np.frombuffer(raw, np.uint8).reshape(1920, 1080, 3)
    x = cv2.resize(im, (320, 320)).astype(np.float32) / 255
    x = ((x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]).transpose(2, 0, 1)[None].astype(np.float32)
    m = s.run(None, {s.get_inputs()[0].name: x})[0][0, 0]; m = (m - m.min()) / (m.max() - m.min() + 1e-8)
    uni |= cv2.resize(m, (1080, 1920)) > 0.3
    t += 0.5
faixa = uni[int(y0):int(y1)]
col = faixa.any(0); livres = np.where(~col)[0]
# maior trecho contínuo de colunas livres
runs, ini = [], None
for x in range(1081):
    livre = x < 1080 and not col[x]
    if livre and ini is None: ini = x
    if not livre and ini is not None: runs.append((ini, x - 1)); ini = None
print("trechos livres em x (faixa y %d-%d):" % (y0, y1), [r for r in runs if r[1] - r[0] > 40])
cv2.imwrite("fr/uniao.png", (uni * 255).astype(np.uint8)[::4, ::4])
