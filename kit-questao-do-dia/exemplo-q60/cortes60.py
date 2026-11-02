# cortes: toda pausa entre palavras (>= 0,14 s abaixo de -42 dB) vira 0,10 s; repetições à mão
import numpy as np, json
e = np.load("env_full.npy"); H = 0.02; FPS = 30
quiet = e < -42
runs, i = [], 0
while i < len(quiet):
    if quiet[i]:
        j = i
        while j < len(quiet) and quiet[j]: j += 1
        if (j - i) * H >= 0.14: runs.append([i * H, j * H])
        i = j
    else: i += 1
PAD = 0.05
corte = [[s + PAD, t - PAD] for s, t in runs]
corte.append([0.0, 1.50])                       # entrada: ele chegando perto da câmera, antes do "Se liga"
corte.append([109.70, 111.31])                  # silêncio final
corte += [          [44.96, 46.33],                       # "vai ter 8 menos x, 8 menos x, altura" -> "vai ter 8 menos x, altura"
          [56.60, 56.88],                       # "fi- fica" -> "fica"
          [57.86, 59.42],                       # "64, 64, esse menos": sai o 1º "64" -> "64, esse menos"
          [63.97, 65.12]]                       # "mais x², mais 2x²" (ele se corrige) -> "mais 2x²"
corte.sort(); m = []
for a, b in corte:
    if m and a <= m[-1][1]: m[-1][1] = max(m[-1][1], b)
    else: m.append([a, b])
D = 111.31; keep, c = [], 0.0
for a, b in m:
    if a - c > 0.05: keep.append([c, a])
    c = b
q = lambda x: round(x * FPS) / FPS
keep = [[q(a), q(b)] for a, b in keep if q(b) - q(a) >= 2 / FPS]
json.dump({"keep": keep, "cortes": m}, open("cortes.json", "w"), indent=1)
print(len(keep), "trechos;", round(sum(b - a for a, b in keep), 2), "s")
open("sel.txt", "w").write("+".join(f"between(t,{a:.4f},{b - 0.0005:.4f})" for a, b in keep))
open("selv.txt", "w").write("+".join(f"between(n,{round(a*FPS)},{round(b*FPS)-1})" for a, b in keep))
def mapa(t):
    acc = 0.0
    for a, b in keep:
        if t < a: return acc
        if t <= b: return acc + t - a
        acc += b - a
    return acc
print("acesse ->", round(mapa(105.74), 2))
