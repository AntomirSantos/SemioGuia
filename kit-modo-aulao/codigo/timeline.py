"""Cortes, mapa de tempo original -> editado, legendas ASS e janelas dos elementos."""
import json, re
DUR = 135.945
P = 0.08
sil = json.load(open("sil.json"))
seg = json.load(open("vid16.wav.json"))
words = [dict(w=w["word"].strip(), s=w["start"], e=w["end"]) for s in seg for w in s["words"]]

# fala = complemento dos silêncios; respiros viram ~0,16 s
fala, t = [], 0.0
for a, b in sil:
    if a - t > 0.05: fala.append([t, a])
    t = b
if DUR - t > 0.05: fala.append([t, DUR])
keep = [[max(0, a - P), min(DUR, b + P)] for a, b in fala]
INICIO = 0.60   # antes disso ele ainda está virado para o computador
keep = [[max(a, INICIO), b] for a, b in keep if b > INICIO]
# corte da instrução ao editor: "sugestão de edição, coloque a questão enquanto eu vou falando"
CORTE = (29.20, 34.02)
out = []
for a, b in keep:
    if b <= CORTE[0] or a >= CORTE[1]: out.append([a, b])
    else:
        if a < CORTE[0]: out.append([a, CORTE[0]])
        if b > CORTE[1]: out.append([CORTE[1], b])
m = []
for k in out:
    if m and k[0] <= m[-1][1] + 1e-6: m[-1][1] = max(m[-1][1], k[1])
    else: m.append(k)
keep = m

def mapa_base(t):
    acc = 0.0
    for a, b in keep:
        if t < a: return acc
        if t <= b: return acc + t - a
        acc += b - a
    return acc
# "Pausa e responde": 3 s de quadro congelado logo depois que ele lê a alternativa E
PAUSA_ORIG, PAUSA = 85.30, 3.0
def mapa(t):
    return mapa_base(t) + (PAUSA if t > PAUSA_ORIG + 1e-6 else 0.0)
TOTAL = mapa(DUR)
# gancho: a frase da costureira, tirada da própria leitura dele, antes do "Um grande salve"
GANCHO = [(37.74, 42.28), (47.24, 48.66)]

# janelas (tempo original) em que a legenda some
PREVIA = (34.10, 34.10)     # o cabeçalho só entra quando ele começa a ler a questão
CARD_A = (34.10, 60.60)     # texto-base
CARD_B = (60.60, 85.30)     # comando + alternativas
ENFASE = (99.30, 101.80)    # banheiro para negro / branco
CERTO = (113.90, 118.10)    # card da alternativa B: entra em "B", vira verde, some antes de "Está vendo?"
SEM_LEG = [CARD_A, CARD_B, ENFASE, CORTE, CERTO]

FIX = {"Montovani,": "Mantovani,", "2": "20", ",24": "24", "NEI.": "ENEM.",
       "4,": "4/11", "do": "do", "11": "11"}
def limpa(ws):
    # correções de transcrição, aplicadas por palavra
    r = []
    for i, w in enumerate(ws):
        x = w["w"]
        if x == "Montovani,": x = "Mantovani,"
        if x == "NEI.": x = "ENEM."
        if x == "2" and i + 1 < len(ws) and ws[i+1]["w"] == ",24": x = "2024"; ws[i+1]["w"] = ""
        if x == "noção": x = "mostrar"
        if x.startswith("-") and r: r[-1]["w"] += x; r[-1]["e"] = w["e"]; continue
        r.append(dict(w, w=x))
    return [w for w in r if w["w"]]
words = limpa(words)

STOP = set("a o as os um uma de do da dos das e é que para pra com no na nos nas em se por "
           "te você eu meu minha nossa nosso aqui ser ter vai vou tem mais muito esse essa "
           "esses isso já como dá fica então".split())
def chave(ch):
    c = [i for i, w in enumerate(ch) if re.sub(r"\W", "", w["w"].lower()) not in STOP
         and len(re.sub(r"\W", "", w["w"])) >= 4]
    return max(c, key=lambda i: len(ch[i]["w"])) if c else None

livres = [w for w in words if not any(a - 0.05 <= w["s"] < b for a, b in SEM_LEG)]
chunks, cur = [], []
for w in livres:
    if cur and (len(cur) == 3 or len(" ".join(x["w"] for x in cur + [w])) > 18
                or w["s"] - cur[-1]["e"] > 0.45):
        chunks.append(cur); cur = []
    cur.append(w)
    if re.search(r"[.,?!]$", w["w"]): chunks.append(cur); cur = []
if cur: chunks.append(cur)

def ts(t):
    h = int(t // 3600); mi = int(t % 3600 // 60); s = t % 60
    return f"{h}:{mi:02d}:{s:05.2f}"
ASS = ["[Script Info]", "ScriptType: v4.00+", "PlayResX: 1080", "PlayResY: 1920", "WrapStyle: 2", "",
       "[V4+ Styles]",
       "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
       # branco, contorno azul-marinho #131B2D (BGR em ASS), sombra leve
       "Style: Leg,Poppins ExtraBold,66,&H00FFFFFF,&H00FFFFFF,&H182D1B13,&H00000000,0,0,0,0,100,100,0,0,3,14,0,5,40,40,0",
       "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
leg = []
for i, ch in enumerate(chunks):
    a = mapa(ch[0]["s"]); b = mapa(ch[-1]["e"])
    if i + 1 < len(chunks): b = max(b, min(mapa(chunks[i+1][0]["s"]), b + 0.6))
    for ja, jb in SEM_LEG:   # a legenda não invade o painel nem a ênfase
        if ch[-1]["e"] <= ja + 0.05: b = min(b, mapa(ja))
    k = chave(ch)
    txt = " ".join(("{\\c&H5EC2FB&}" + re.sub(r"[.,]$", "", w["w"]).upper() + "{\\c&HFFFFFF&}") if j == k
                   else re.sub(r"[.,]$", "", w["w"]).upper() for j, w in enumerate(ch))
    y = 1180
    ASS.append(f"Dialogue: 0,{ts(a)},{ts(b)},Leg,,0,0,0,,{{\\pos(540,{y})\\fscx86\\fscy86\\t(0,100,\\fscx100\\fscy100)}}{txt}")
    leg.append([round(a, 2), round(b, 2), " ".join(w["w"] for w in ch)])
open("leg.ass", "w").write("\n".join(ASS) + "\n")

def win(a, b): return [round(mapa(a), 3), round(mapa(b), 3)]
def sent(ini_word_time):  # janela de cada frase pelo tempo original
    return mapa(ini_word_time)
ev = {
  "total": round(TOTAL, 3),
  "keep": keep,
  "cardA": {"win": [round(mapa(PREVIA[0]), 3), round(mapa(CARD_A[1]), 3)], "estados": [[mapa(t), i] for t, i in
            [(PREVIA[0], 6), (34.10, 0), (37.20, 1), (43.36, 2), (47.32, 3), (48.74, 4), (53.00, 5), (58.10, 6)]]},
  "cardB": {"win": win(*CARD_B), "estados": [[mapa(t), i] for t, i in
            [(60.60, 0), (64.88, 1), (69.10, 2), (73.42, 3), (76.56, 4), (81.04, 5)]]},
  "enfase": win(*ENFASE),
  "pops": [["pop_revisao", *win(5.66, 9.30)], ["pop_segredo", *win(20.84, 22.40)],
           ["pop_boicote", *win(103.46, 105.90)], ["pop_direitos", *win(106.30, 110.40)], 
           ["pop_data", *win(128.62, 134.55)]],
}
ev["previa"] = win(*PREVIA)
ev["pausa"] = [round(mapa_base(PAUSA_ORIG), 3), PAUSA]
ev["gancho"] = GANCHO
ev["painel"] = [round(mapa(CARD_A[0]), 3), round(mapa(CARD_B[1]) + PAUSA, 3)]
ev["certo"] = {"entra": round(mapa(113.96), 3), "verde": round(mapa(114.66), 3), "sai": round(mapa(118.10), 3)}
json.dump(ev, open("ev.json", "w"), indent=1)
print("total", round(TOTAL, 2), "trechos", len(keep), "legendas", len(chunks))
for l in leg[:200]: print(l)
