"""Aulão prof. Renato Júnior (química, hexan-3-ona): cortes, mapa de tempo, legenda e janelas."""
import json, re
DUR = 50.32; P = 0.08
SIL = [(0.0, 1.147), (4.336, 4.861), (7.383, 8.154), (10.559, 10.983), (12.057, 12.396), (18.811, 19.280),
       (24.226, 24.612), (29.605, 29.927), (31.751, 32.168), (36.666, 37.029), (39.320, 39.801), (49.482, 50.324)]
fala, t = [], 0.0
for a, b in SIL:
    if a - t > 0.05: fala.append([t, a])
    t = b
keep = [[max(0, a - P), min(DUR, b + P)] for a, b in fala]
keep[0][0] = 1.07                                   # começa em "Fala galera"
keep[-1][1] = 49.56                                 # termina em "esperando você aí"
def mapa_base(t):
    acc = 0.0
    for a, b in keep:
        if t < a: return acc
        if t <= b: return acc + t - a
        acc += b - a
    return acc
PAUSA_ORIG, PAUSA = 7.46, 3.0                       # depois de "...aparecendo aqui pra você?"
def mapa(t): return mapa_base(t) + (PAUSA if t > PAUSA_ORIG + 1e-6 else 0.0)
TOTAL = mapa(DUR)
X = mapa_base(PAUSA_ORIG)
QUESTAO = (mapa(4.94), X + PAUSA)                   # print inteiro: de "Se você consegue resolver" ao fim da pausa
CERTO = {"entra": mapa(28.54), "verde": mapa(31.36), "sai": mapa(32.22) + 0.25}   # "a hidroxila... posição 3"
POPS = [("alcool", mapa(22.96), mapa(25.00), "álcool secundário"),
        ("data", mapa(42.22), mapa(48.56), "09/11 · 18h")]
SEM_LEG = [(4.94, 7.46), (28.38, 32.10)]            # tempo original: questão e card da C

seg = json.load(open("vid16.json"))
words = [dict(w=w["word"].strip(), s=w["start"], e=w["end"]) for s in seg for w in s["words"]]
r = []
for w in words:
    x = w["w"]
    if x == "Juni": x = "Júnior"
    if x.startswith("-") and r: r[-1]["w"] += x; r[-1]["e"] = w["e"]; continue
    r.append(dict(w, w=x))
words = r
STOP = set("a o as os um uma de do da dos das e é que para pra com no na nos nas em se por te você vocês eu "
           "meu minha nossa nosso aqui ser ter vai vou tem mais muito esse essa isso já como então tá bom "
           "quer está estou".split())
def chave(ch):
    c = [i for i, w in enumerate(ch) if re.sub(r"\W", "", w["w"].lower()) not in STOP and len(re.sub(r"\W", "", w["w"])) >= 4]
    return max(c, key=lambda i: len(ch[i]["w"])) if c else None
livres = [w for w in words if not any(a - 0.05 <= w["s"] < b for a, b in SEM_LEG)]
chunks, cur = [], []
for w in livres:
    if cur and (len(cur) == 3 or len(" ".join(x["w"] for x in cur + [w])) > 18 or w["s"] - cur[-1]["e"] > 0.45):
        chunks.append(cur); cur = []
    cur.append(w)
    if re.search(r"[.,?!]$", w["w"]): chunks.append(cur); cur = []
if cur: chunks.append(cur)
def ts(t): return f"{int(t//3600)}:{int(t%3600//60):02d}:{t%60:05.2f}"
ASS = ["[Script Info]", "ScriptType: v4.00+", "PlayResX: 1080", "PlayResY: 1920", "WrapStyle: 0", "", "[V4+ Styles]",
       "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
       "Style: Leg,Poppins Black,104,&H00FFFFFF,&H00FFFFFF,&H00000000,&HB4000000,0,0,0,0,100,100,0,0,1,4,8,5,60,60,0",
       "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
leg = []
for i, ch in enumerate(chunks):
    a = mapa(ch[0]["s"]); b = mapa(ch[-1]["e"])
    if i + 1 < len(chunks): b = max(b, min(mapa(chunks[i+1][0]["s"]), b + 0.6))
    for ja, jb in SEM_LEG:
        if ch[-1]["e"] <= ja + 0.05: b = min(b, mapa(ja))
    k = chave(ch)
    def fs(pal, alvo): return min(alvo, int(980 / (0.66 * max(len(pal), 1))))
    partes = []
    for j, w in enumerate(ch):
        pal = re.sub(r"[.,?!]$", "", w["w"]).upper()
        partes.append(f"{{\\c&H5EC2FB&\\fs{fs(pal, 118)}}}{pal}" if j == k else f"{{\\c&HFFFFFF&\\fs{fs(pal, 104)}}}{pal}")
    ASS.append(f"Dialogue: 0,{ts(a)},{ts(b)},Leg,,0,0,0,,{{\\pos(540,1230)\\fscx86\\fscy86\\t(0,100,\\fscx100\\fscy100)}}{' '.join(partes)}")
    leg.append([round(a, 2), round(b, 2), " ".join(w["w"] for w in ch)])
if __name__ == "__main__":
    open("leg.ass", "w").write("\n".join(ASS) + "\n")
    ev = dict(total=round(TOTAL, 3), keep=keep, pausa=[round(X, 3), PAUSA], questao=[round(x, 3) for x in QUESTAO],
              certo={k: round(v, 3) for k, v in CERTO.items()}, pops=[[n, round(a, 3), round(b, 3), t] for n, a, b, t in POPS])
    json.dump(ev, open("ev.json", "w"), indent=1)
    print("total", round(TOTAL, 2), "legendas", len(leg)); [print(l) for l in leg]
