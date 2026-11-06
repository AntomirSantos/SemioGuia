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
corte.append([0.0, 2.38])                       # entrada em silêncio, antes do "Atenção"
# sem silêncio final: a gravação termina logo depois de "...de questões"
corte += [[16.90, 22.45],                       # começo falso: "O A que tem a abscissa... vou começar com o B na verdade"
          [27.08, 29.10]]                       # "portanto zero, zero mais um" -> "portanto zero mais um"
corte.sort(); m = []
for a, b in corte:
    if m and a <= m[-1][1]: m[-1][1] = max(m[-1][1], b)
    else: m.append([a, b])
D = 139.79; keep, c = [], 0.0
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
print("aedu ->", round(mapa(137.24), 2))
