"""Camada de gráficos (qtrle com alfa) na linha do tempo editada: tarja do professor, destaques,
questão inteira (texto do print, redigitado para ler no celular) com "pausa e responde", card da alternativa C virando verde."""
import base64, json, pathlib, subprocess, tempfile
from playwright.sync_api import sync_playwright
ev = json.load(open("ev.json")); T = ev["total"]; Q = 1 / 30
FONTS = open("poppins.css").read()
OURO, ESC, AZUL, NAVY = "#FBC25E", "#0F1120", "#2F6FDE", "#131B2D"
ENEM = base64.b64encode(open("print/enem.png", "rb").read()).decode()
PRINT = base64.b64encode(open("print/q_x2.png", "rb").read()).decode()
ENT_POP = [(0.3, 1.08), (0.65, 1.05), (0.9, 1.02), (1.0, 1.0)]
QA, QB = ev["questao"]; X, PZ = ev["pausa"]; C = ev["certo"]
def estado(t):
    pop = None
    for n, a, b, _ in ev["pops"]:
        if a <= t < b: k = int((t - a) / Q + 1e-6); pop = (n, *ENT_POP[min(k, 3)])
    q = None
    if QA <= t < QB:
        k = int((t - QA) / Q + 1e-6); ks = int((QB - t) / Q + 1e-6)
        op = min(1.0, (k + 1) / 5, (ks + 1) / 6); q = (round(op, 3), round(1 + 0.05 * (1 - min(1, (k + 1) / 5)), 3))
    pz = None
    if X <= t < X + PZ:
        d = t - X; k = int(d / Q + 1e-6); esc = [0.15, 0.28, 0.38][min(k, 2)]; op, sc = ENT_POP[min(k, 3)]
        kn = int((d - int(d)) / Q + 1e-6); nop, nsc = [(0.3, 1.35), (0.7, 1.18), (0.95, 1.06), (1.0, 1.0)][min(kn, 3)]
        pz = (esc, op, sc, 3 - int(d), nop, nsc)
    cer = None
    if C["entra"] <= t < C["sai"]:
        k = int((t - C["entra"]) / Q + 1e-6); op, sc = ENT_POP[min(k, 3)]
        g = t - C["verde"]
        if g < 0: m, ck, r, ra = 0, 0, 0, 0
        else:
            kg = int(g / Q + 1e-6); m = min(1, (kg + 1) / 6)
            sc = [1.0, 1.04, 1.07, 1.05, 1.02, 1.0][min(kg, 5)]
            ck = [0, 0.5, 1.15, 1.0][min(kg // 2, 3)]
            r = min(40, kg * 4); ra = max(0, 0.55 - kg * 0.04)
        if C["sai"] - t < 6 * Q: op = max(0, (C["sai"] - t) / (6 * Q))
        cer = (round(op, 3), sc, m, ck, r, round(ra, 3))
    tag = not (q or cer)
    return (pop, q, pz, cer, tag)
DOC = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;background:transparent;overflow:hidden;font-family:Poppins,sans-serif;-webkit-font-smoothing:antialiased}}
.pop{{position:absolute;top:330px;left:50%;display:none;transform-origin:50% 50%}}
.pop .bx{{transform:skewX(-8deg);background:{OURO};padding:6px 46px 14px;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.35)}}
.pop span{{display:block;transform:skewX(8deg);font:800 italic 96px/1.12 Poppins;color:{ESC}}}
.pz{{position:absolute;inset:0;background:#000;display:none}}
.pzb{{position:absolute;top:330px;left:50%;display:none;transform-origin:50% 50%}}
.pzb .bx{{transform:skewX(-8deg);background:{OURO};padding:6px 46px 14px;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.35)}}
.pzb span{{display:block;transform:skewX(8deg);font:800 italic 80px/1.12 Poppins;color:{ESC}}}
.cnt{{position:absolute;top:452px;left:50%;width:120px;height:120px;margin-left:-60px;border-radius:50%;border:9px solid {OURO};
  background:rgba(19,27,45,.9);display:none;align-items:center;justify-content:center;font:900 74px/1 Poppins;color:#fff;box-shadow:0 12px 34px rgba(0,0,0,.5)}}
#p{{position:absolute;left:54px;right:54px;top:625px;border-radius:30px;background:rgba(19,27,45,.94);padding:78px 38px 30px;
  box-shadow:0 18px 50px rgba(0,0,0,.45);transform-origin:50% 0;display:none;color:#fff}}
#p .txt{{font:600 33px/1.42 Poppins}}
#p .cmd{{font:700 32px/1.36 Poppins;margin:18px 0 14px}}
#p .alt{{display:flex;gap:16px;font:600 32px/1.3 Poppins;padding:5px 10px}}
#p .alt b{{font-weight:800;color:{OURO}}}
.cab{{position:absolute;top:-40px;left:30px;display:flex;align-items:center;gap:14px}}
.selo{{background:#fff;border-radius:14px;padding:6px 10px;box-shadow:0 6px 18px rgba(0,0,0,.35);display:flex}}
.selo img{{height:58px;display:block}}
.chip{{transform:skewX(-8deg);background:{OURO};padding:6px 20px 8px;box-shadow:0 6px 18px rgba(0,0,0,.35)}}
.chip span{{display:block;transform:skewX(8deg);font:800 italic 31px/1.1 Poppins;color:{ESC};white-space:nowrap}}
.chip.az{{background:{AZUL}}} .chip.az span{{color:#fff}}
.cer{{position:absolute;left:50px;right:100px;top:1290px;display:none;transform-origin:50% 50%;border-radius:22px;padding:24px 34px;
  align-items:center;gap:20px;font:700 52px/1.3 Poppins}}
.cer .l{{font-weight:900}}
.cer .ck{{position:absolute;right:-22px;top:-40px;width:96px;height:96px;border-radius:50%;background:#fff;display:flex;align-items:center;
  justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.35)}}
.cer .ck svg{{width:58px;height:58px}}
.tag{{position:absolute;top:1530px;left:50%;transform:translateX(-50%);background:rgba(19,27,45,.88);border-radius:40px;
  padding:10px 30px 12px;font:700 31px/1.2 Poppins;color:#fff;letter-spacing:.02em;white-space:nowrap}}
</style>""" + "".join(f'<div class="pop" id="{n}"><div class="bx"><span>{t}</span></div></div>' for n, a, b, t in ev["pops"]) + \
 f'<div id="p"><div class="txt">As cetonas fazem parte de famílias olfativas encontradas em muitos alimentos. A molécula de hexan-3-ona é um exemplo desses compostos voláteis responsáveis pelo aroma, podendo ser obtida por processos energéticos realizados em meio ácido, na presença de oxidantes como o permanganato de potássio.</div>' \
 '<div class="cmd">Para se produzir esse composto volátil em laboratório, deve-se oxidar a molécula de</div>' + \
 ''.join(f'<div class="alt"><b>{l})</b><span>{x}</span></div>' for l, x in [('A','hexanal.'),('B','hexan-1-ol.'),('C','hexan-3-ol.'),('D','hex-1-en-1-ol.'),('E','ácido hexanoico.')]) + \
 f'<div class="cab"><div class="selo"><img src="data:image/png;base64,{ENEM}"></div>' \
 '<div class="chip"><span>QUÍMICA · QUESTÃO DO AULÃO</span></div></div></div>' + \
 '<div class="pz"></div><div class="pzb"><div class="bx"><span>pausa e responde!</span></div></div><div class="cnt">3</div>' + \
 '<div class="cer"><span class="l">C)</span><span>hexan-3-ol.</span><div class="ck"><svg viewBox="0 0 24 24"><path d="M4.5 12.5l5 5L19.5 7" fill="none" ' \
 'stroke="#22C55E" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>' + \
 '<div class="tag">PROF. RENATO JÚNIOR</div>'
JS = """([pop, q, pz, cer, tag]) => {
  document.querySelectorAll('.pop').forEach(e => { const on = pop && pop[0] === e.id; e.style.display = on ? 'block' : 'none';
    if (on) { e.style.opacity = pop[1]; e.style.transform = 'translateX(-50%) scale(' + pop[2] + ')'; } });
  const p = document.getElementById('p'); p.style.display = q ? 'block' : 'none';
  if (q) { p.style.opacity = q[0]; p.style.transform = 'scale(' + q[1] + ')'; }
  const z = document.querySelector('.pz'), zb = document.querySelector('.pzb'), cn = document.querySelector('.cnt');
  z.style.display = zb.style.display = pz ? 'block' : 'none'; cn.style.display = pz ? 'flex' : 'none';
  if (pz) { z.style.opacity = pz[0]; zb.style.opacity = pz[1]; zb.style.transform = 'translateX(-50%) scale(' + pz[2] + ')';
    cn.textContent = pz[3]; cn.style.opacity = pz[4]; cn.style.transform = 'scale(' + pz[5] + ')'; }
  const c = document.querySelector('.cer'); c.style.display = cer ? 'flex' : 'none';
  if (cer) { const [op, sc, m, ck, r, ra] = cer; const mix = (a, b) => Math.round(a + (b - a) * m);
    c.style.opacity = op; c.style.transform = 'scale(' + sc + ')';
    c.style.background = `rgb(${mix(251,34)},${mix(194,197)},${mix(94,94)})`; c.style.color = m > 0.5 ? '#fff' : '#0F1120';
    c.style.boxShadow = `0 14px 36px rgba(0,0,0,.45), 0 0 0 ${r}px rgba(34,197,94,${ra})`;
    const k = c.querySelector('.ck'); k.style.display = ck > 0 ? 'flex' : 'none'; k.style.transform = 'scale(' + ck + ')'; }
  document.querySelector('.tag').style.display = tag ? 'block' : 'none';
}"""
d = pathlib.Path("graf"); d.mkdir(exist_ok=True); [f.unlink() for f in d.glob("*.png")]
quadros, ant, n = [], object(), 0
while n * Q < T + 0.5:
    e = estado(n * Q)
    if e != ant: quadros.append((n * Q, e)); ant = e
    n += 1
lista = []
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    tmp = pathlib.Path(tempfile.mkdtemp()) / "g.html"; tmp.write_text(DOC); pg.goto("file://" + str(tmp)); pg.wait_for_timeout(500)
    for i, (t, e) in enumerate(quadros):
        pg.evaluate(JS, [list(x) if isinstance(x, tuple) else x for x in e])
        arq = d / f"g{i:04d}.png"; pg.screenshot(path=str(arq), omit_background=True)
        dur = (quadros[i + 1][0] if i + 1 < len(quadros) else T + 0.5) - t
        lista.append(f"file '{arq.resolve()}'\nduration {dur:.4f}")
    b.close()
lista.append(f"file '{arq.resolve()}'")
open("graf/lista.txt", "w").write("\n".join(lista) + "\n")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "graf/lista.txt", "-vf", "fps=30,format=argb",
                "-c:v", "qtrle", "graf/graf.mov"], check=True)
wh = sorted(set(round(x, 3) for x in [a for _, a, _, _ in ev["pops"]] + [QA, X, C["entra"]]))
json.dump(wh, open("whoosh.json", "w")); print("quadros", len(quadros), "whooshes", wh)
