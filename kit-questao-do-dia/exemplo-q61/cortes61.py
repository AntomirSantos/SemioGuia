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
corte.append([0.0, 2.70])                       # entrada em silêncio, antes do "Atenção"
corte.append([116.45, 118.01])                 # silêncio final
corte += [[57.56, 58.76],                       # "do X pro R, do X pro R é 3" -> sai o 1º
          [73.30, 73.74],                       # "2, 18, 18 possibilidades" -> "2, 18 possibilidades"
          [75.40, 77.62],                       # "do X pro Y. Do X pro Y é 1" -> sai o 1º
          [92.78, 93.22]]                       # "6 vezes 2, 12, 12 aqui" -> "12 aqui"
corte.sort(); m = []
for a, b in corte:
    if m and a <= m[-1][1]: m[-1][1] = max(m[-1][1], b)
    else: m.append([a, b])
D = 118.01; keep, c = [], 0.0
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
print("aedu ->", round(mapa(112.18), 2))
