"""Recorta a pessoa do quadro com o U²-Net (human seg) e salva PNG com alfa, cortado na pessoa."""
import sys, numpy as np, onnxruntime as ort
from PIL import Image, ImageFilter
im = Image.open(sys.argv[1]).convert("RGB"); W, H = im.size
s = ort.InferenceSession(sys.argv[3], providers=["CPUExecutionProvider"])
x = np.asarray(im.resize((320, 320), Image.LANCZOS)).astype(np.float32) / 255
x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
x = x.transpose(2, 0, 1)[None].astype(np.float32)
m = s.run(None, {s.get_inputs()[0].name: x})[0][0, 0]
m = (m - m.min()) / (m.max() - m.min() + 1e-8)
mask = Image.fromarray((m * 255).astype(np.uint8)).resize((W, H), Image.LANCZOS)
mask = mask.filter(ImageFilter.GaussianBlur(1.2))
a = np.asarray(mask).astype(float) / 255
a = np.clip((a - 0.15) / 0.7, 0, 1)                   # borda mais firme, sem halo
out = np.dstack([np.asarray(im), (a * 255).astype(np.uint8)])
img = Image.fromarray(out, "RGBA"); bb = img.getbbox(); img.crop(bb).save(sys.argv[2])
print("bbox", bb)
