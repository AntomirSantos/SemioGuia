"""Painel da questão revelado palavra por palavra no ritmo da leitura do professor.
Gera um PNG por estado e um vídeo com alfa (qtrle) que cobre a linha do tempo editada inteira."""
import base64, json, math, pathlib, subprocess, tempfile, contextlib, io
from playwright.sync_api import sync_playwright
with contextlib.redirect_stdout(io.StringIO()):
    import timeline as tl                       # mapa(), palavras e janelas
FONTS = open("poppins.css").read()
OURO, ESC, AZUL = "#FBC25E", "#0F1120", "#2F6FDE"
ENEM = base64.b64encode(open("enemlogo/enem.png", "rb").read()).decode()

FRASES = ["Primeiro de dezembro de 1955.",
 "Rosa Parks, uma costureira negra norte-americana, se recusa a ceder o lugar a um homem branco nos Estados Unidos.",
 "Foi durante uma viagem de ônibus no estado do Alabama, região sudeste do país.",
 "Ela acabou presa.",
 "As primeiras filas de assentos nos ônibus eram reservadas para os passageiros brancos.",
 "Por lei, os negros tinham que ocupar os lugares de trás nos transportes coletivos."]
JAN_A = [(34.10, 36.80), (37.20, 42.94), (43.36, 47.14), (47.32, 48.58), (48.74, 53.00), (53.00, 57.92)]
CMD = "Esse ato individual ganhou repercussão nacional e colaborou decisivamente para"
ALTS = [("A)", "reacender a disputa militar entre estados da união."),
        ("B)", "estimular o ativismo político entre grupos oprimidos."),
        ("C)", "aprofundar o fosso econômico entre as classes sociais."),
        ("D)", "demonstrar o resultado insatisfatório de táticas pacifistas."),
        ("E)", "promover a emigração forçada de contingentes populacionais.")]
JAN_CMD = (60.72, 64.88)
JAN_ALT = [(64.88, 69.10), (69.10, 73.42), (73.42, 76.56), (76.56, 81.04), (81.04, 85.30)]

def tempos(texto, a, b):
    """Hora (original) em que cada palavra do texto aparece: casa a j-ésima palavra do
    texto com a palavra proporcional da transcrição dentro da janela."""
    q = texto.split(); tw = [w for w in tl.words if a - 0.05 <= w["s"] < b]
    return [tw[min(len(tw) - 1, math.floor(j * len(tw) / len(q)))]["s"] if tw else a for j in range(len(q))]

ev = []                                     # (tempo original, ação)
for k, (f, (a, b)) in enumerate(zip(FRASES, JAN_A)):
    for j, t in enumerate(tempos(f, a, b)): ev.append((t, ("a", k, j)))
for j, t in enumerate(tempos(CMD, *JAN_CMD)): ev.append((t, ("c", j)))
for k, ((l, x), (a, b)) in enumerate(zip(ALTS, JAN_ALT)):
    ev.append((a, ("L", k)))
    for j, t in enumerate(tempos(x, a + 0.4, b)): ev.append((max(t, a), ("x", k, j)))
ev.sort(key=lambda e: e[0])

span = lambda txt, cls: " ".join(f'<span class="w {cls}" data-i="{i}">{w}</span>' for i, w in enumerate(txt.split()))
CAB = (f'<div class="cab"><div class="selo"><img src="data:image/png;base64,{ENEM}"></div>'
       f'<div class="chip"><span>ENEM 2024 PPL · QUESTÃO 84</span></div>'
       f'<div class="chip az"><span>CADERNO AZUL</span></div></div>')
A = "".join(f'<span class="fr" data-k="{k}">{span(f, f"a{k}")}</span> ' for k, f in enumerate(FRASES))
B = (f'<div class="cmd">{span(CMD, "c")}</div>' +
     "".join(f'<div class="alt" data-k="{k}"><span class="l">{l}</span><span>{span(x, f"x{k}")}</span></div>'
             for k, (l, x) in enumerate(ALTS)))
DOC = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;background:transparent;overflow:hidden;font-family:Poppins,sans-serif;
  -webkit-font-smoothing:antialiased}}
#p{{position:absolute;left:40px;right:90px;top:850px;min-height:150px;border-radius:30px;
  background:rgba(19,27,45,.93);padding:78px 38px 28px;box-shadow:0 18px 50px rgba(0,0,0,.45);transform-origin:50% 0}}
#p.cabo{{background:transparent;box-shadow:none}} #p.cabo .corpo{{display:none}}
.cab{{position:absolute;top:-40px;left:30px;display:flex;align-items:center;gap:14px}}
.selo{{background:#fff;border-radius:14px;padding:6px 10px;box-shadow:0 6px 18px rgba(0,0,0,.35);display:flex}}
.selo img{{height:58px;display:block}}
.chip{{transform:skewX(-8deg);background:{OURO};padding:6px 20px 8px;box-shadow:0 6px 18px rgba(0,0,0,.35)}}
.chip span{{display:block;transform:skewX(8deg);font:800 italic 31px/1.1 Poppins;color:{ESC};white-space:nowrap}}
.chip.az{{background:{AZUL}}} .chip.az span{{color:#fff}}
.txt{{font:600 35px/1.46 Poppins;color:#fff}}
.w{{display:none}} .w.v{{display:inline}}
.cmd{{font:700 32px/1.36 Poppins;color:#fff;margin-bottom:16px}}
.alt{{display:flex;gap:18px;align-items:flex-start;font:600 30px/1.3 Poppins;color:#fff;
  padding:8px 12px;border-radius:12px;margin-bottom:6px;display:none}}
.alt.v{{display:flex}} .alt .l{{font-weight:800;flex:0 0 auto}}
.alt.on{{background:{OURO};color:{ESC}}}
</style><div id="p"><div class="corpo"></div>{CAB}</div>"""
JS = """([modo, html, vis, alts, on, novos, f, pf]) => {
  const p = document.getElementById('p'), c = p.querySelector('.corpo');
  p.style.opacity = pf; p.style.transform = 'scale(' + (1 + (1 - pf) * 0.06) + ')';
  if (c.dataset.m !== modo) { c.innerHTML = html; c.dataset.m = modo; }
  c.querySelectorAll('.w').forEach(e => { const id = e.classList[1] + ':' + e.dataset.i;
      e.classList.toggle('v', vis.includes(id)); e.style.opacity = novos.includes(id) ? f : 1; });
  c.querySelectorAll('.alt').forEach(e => { const k = +e.dataset.k;
      e.classList.toggle('v', alts.includes(k)); e.classList.toggle('on', k === on);
      e.style.opacity = novos.includes('alt:' + k) ? f : 1; });
}"""
M = tl.mapa
ini_A, fim_A = M(tl.CARD_A[0]), M(tl.CARD_A[1])
PAUSA_INI = M(tl.PAUSA_ORIG); fim_B = PAUSA_INI + tl.PAUSA
QUADRO = 1 / 30
FADE = (0.35, 0.7, 1.0)                     # 3 quadros de entrada de cada palavra
ENTRADA = (0.25, 0.55, 0.8, 0.95, 1.0)      # 5 quadros de entrada do painel
estados = [(0.0, None)]
vis, alts, on = [], [], -1
for t, e in ev:
    novo = []
    if e[0] == "a": vis.append(f"a{e[1]}:{e[2]}"); novo = [vis[-1]]; est = ["A", f'<div class="txt">{A}</div>', list(vis), [], -1]
    else:
        if e[0] == "c" and not any(v.startswith("c:") for v in vis): vis = []
        if e[0] == "c": vis.append(f"c:{e[1]}"); novo = [vis[-1]]
        if e[0] == "L": alts.append(e[1]); on = e[1]; novo = [f"alt:{e[1]}"]
        if e[0] == "x": vis.append(f"x{e[1]}:{e[2]}"); novo = [vis[-1]]
        est = ["B", B, list(vis), list(alts), on]
    tt = max(M(t), ini_A)
    if est[0] == "B" and tt < fim_A: tt = fim_A          # o comando só entra quando o texto-base sai
    if estados and estados[-1][1] and abs(estados[-1][0] - tt) < 1e-3:
        novo = estados[-1][2] + novo                       # palavras que caem no mesmo instante entram juntas
        estados[-1] = (tt, est, novo)
    else: estados.append((tt, est, novo))
# durante a pausa: todas as alternativas na tela, nenhuma destacada
estados.append((PAUSA_INI, ["B", B, list(vis), [0, 1, 2, 3, 4], -1], []))
estados.append((fim_B, None))
# expande cada estado nos quadros de fade
quadros = []
for n, item in enumerate(estados):
    t, est = item[0], item[1]
    prox = estados[n + 1][0] if n + 1 < len(estados) else tl.TOTAL + 0.5
    if est is None: quadros.append((t, None)); continue
    for k, f in enumerate(FADE):
        tk = t + k * QUADRO
        if tk >= prox - 1e-4: break
        pf = ENTRADA[min(len(ENTRADA) - 1, round((tk - ini_A) / QUADRO))] if tk - ini_A < len(ENTRADA) * QUADRO else 1.0
        quadros.append((tk, est + [item[2], f, pf]))
    # o painel ainda está entrando depois do fade das palavras
    tk = t + len(FADE) * QUADRO
    while tk - ini_A < len(ENTRADA) * QUADRO and tk < prox - 1e-4:
        quadros.append((tk, est + [[], 1.0, ENTRADA[round((tk - ini_A) / QUADRO)]])); tk += QUADRO
lim = quadros
d = pathlib.Path("rev"); d.mkdir(exist_ok=True)
for f in d.glob("*.png"): f.unlink()
lista = []
with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--force-color-profile=srgb"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    tmp = pathlib.Path(tempfile.mkdtemp()) / "r.html"; tmp.write_text(DOC)
    pg.goto("file://" + str(tmp)); pg.wait_for_timeout(500)
    vazio = d / "vazio.png"
    pg.evaluate("()=>document.getElementById('p').style.display='none'"); pg.screenshot(path=str(vazio), omit_background=True)
    pg.evaluate("()=>document.getElementById('p').style.display=''")
    for n, (t, e) in enumerate(lim):
        if e is None: arq = vazio
        else:
            pg.evaluate(JS, e); arq = d / f"s{n:04d}.png"; pg.screenshot(path=str(arq), omit_background=True)
        if e is not None:
            fundo = pg.evaluate("()=>document.getElementById('p').getBoundingClientRect().bottom")
            maxfundo = max(globals().get('maxfundo', 0), fundo); globals()['maxfundo'] = maxfundo
        dur = (lim[n + 1][0] if n + 1 < len(lim) else tl.TOTAL + 0.5) - t
        if dur > 0: lista.append(f"file '{arq.resolve()}'\nduration {dur:.4f}")
    b.close()
lista.append(f"file '{vazio.resolve()}'")
open("rev/lista.txt", "w").write("\n".join(lista) + "\n")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "rev/lista.txt",
                "-vf", "fps=30,format=argb", "-c:v", "qtrle", "rev/painel.mov"], check=True)
print("fundo máx do painel", round(globals().get("maxfundo",0)), "quadros", len(lim), "A de", round(ini_A, 2), "A até", round(fim_A, 2), "B até", round(fim_B, 2))
