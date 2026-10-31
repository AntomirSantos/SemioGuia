# cortes v3: toda pausa entre palavras (>= 0,14 s abaixo de -42 dB) vira 0,10 s; repetição "3 meios" fica uma vez só
import numpy as np, json
e = np.load("env_full.npy"); H = 0.02; FPS = 30
quiet = e < -42          # banda cheia: silêncio fica em -50..-70; fala baixa e fricativas acima de -40
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
corte[0][0] = 0.0                               # silêncio de entrada inteiro
corte.append([103.00, 103.88])                  # silêncio final
corte += [[30.70, 31.58],                       # 2º "menos b" (repetido)
          [31.60, 32.14],                       # "beleza," (muleta)
          [10.45, 10.57], [23.25, 23.41], [87.29, 87.47],  # respiros com ruído acima de -42 dB
          # palavras repetidas / gaguejos (achados por DTW de MFCC entre trechos vizinhos)
          [27.10, 28.44],                       # TRAVADA ao escrever a 1ª equação: "a, so-" e a mão
                                                # indo até a fórmula e voltando -> "igual a a, b sobre menos 1"
          [33.88, 35.04],                       # "primeira e.. e.. equação" -> "primeira equação"
          [43.58, 43.93],                       # "o y, o y vai valer" -> "o y vai valer"
          [60.64, 60.95],                       # "en- então" -> "então"
          [81.84, 83.03],                       # "passando os, os, o- 3 meios" -> "passando os 3 meios"
          [85.48, 85.76],                       # "isso fi- fica" -> "isso fica"
          [93.40, 94.55],                       # "quer saber, é, a elevado" -> "quer saber, a elevado"
          [72.62, 74.84],                       # "3 meios," solto antes da frase
          [76.80, 80.72]]                       # 2ª vez de "3 meios de a igual a 3"
corte.sort(); m = []
for a, b in corte:
    if m and a <= m[-1][1]: m[-1][1] = max(m[-1][1], b)
    else: m.append([a, b])
D = 103.871667; keep, c = [], 0.0
for a, b in m:
    if a - c > 0.05: keep.append([c, a])
    c = b
q = lambda x: round(x * FPS) / FPS            # grade de quadros: áudio e vídeo cortam igual
keep = [[q(a), q(b)] for a, b in keep if q(b) - q(a) >= 2 / FPS]
json.dump({"keep": keep, "cortes": m}, open("cortes2.json", "w"), indent=1)
print(len(keep), "trechos;", round(sum(b - a for a, b in keep), 2), "s")
open("sel2.txt", "w").write("+".join(f"between(t,{a:.4f},{b - 0.0005:.4f})" for a, b in keep))
# vídeo por número de quadro: o timestamp do master não cai exato na grade
open("sel2v.txt", "w").write("+".join(f"between(n,{round(a*FPS)},{round(b*FPS)-1})" for a, b in keep))
