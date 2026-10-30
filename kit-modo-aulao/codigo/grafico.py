"""Destaques amarelos e a ênfase escurecida, animados como no FS02:
destaque = fade + zoom-out de 108% a 100% em 4 quadros, saída seca;
ênfase = fundo escurece em 3 quadros, palavras entram uma a uma, a caixa por último."""
import base64, json, pathlib, subprocess, tempfile, contextlib, io
from playwright.sync_api import sync_playwright
with contextlib.redirect_stdout(io.StringIO()):
    import timeline as tl
FONTS = open("poppins.css").read()
OURO, ESC = "#FBC25E", "#0F1120"
ev = json.load(open("ev.json")); M = tl.mapa; Q = 1 / 30
POPS = {"pop_revisao": "revisão 04/11 · 18h", "pop_segredo": "segredinho", "pop_direitos": "direitos civis",
        "pop_boicote": "batalha de Montgomery",
        "pop_altb": "alternativa B", "pop_data": "04/11 · 18h"}
ENT_POP = [(0.3, 1.08), (0.65, 1.05), (0.9, 1.02), (1.0, 1.0)]
ENF_INI, ENF_FIM = M(tl.ENFASE[0]), M(tl.ENFASE[1])
# palavras da ênfase pelo tempo em que ele fala cada uma
PAL = [("banheiro", 99.96), ("para", 100.18), ("negro,", 100.38)]
CAIXA = 100.74                                   # "banheiro para branco" entra junto, na caixa
FADE = [0.35, 0.7, 1.0]
CAIXA_ENT = [(0.3, 1.08), (0.65, 1.05), (0.9, 1.02), (1.0, 1.0)]

VERDE = (34, 197, 94); AMAR = (251, 194, 94)
CER = ev["certo"]
PULSO = [1.0, 1.04, 1.08, 1.07, 1.04, 1.02, 1.0]
CHECK = [0.0, 0.6, 1.25, 1.15, 1.0]
ONDA = 12                                        # quadros da onda verde em volta do card
def certo(t):
    """(opacidade, escala, mistura amarelo->verde 0..1, escala do ✓, raio da onda, alfa da onda)"""
    if not (CER["entra"] <= t < CER["sai"]): return None
    k = int((t - CER["entra"]) / Q + 1e-6)
    op, sc = ENT_POP[min(k, 3)]
    g = int((t - CER["verde"]) / Q + 1e-6) if t >= CER["verde"] else -1
    if g < 0: return (op, sc, 0.0, 0.0, 0, 0.0)
    mix = min(1.0, (g + 1) / 6)
    sc = PULSO[min(g, len(PULSO) - 1)]
    ck = CHECK[min(g, len(CHECK) - 1)]
    onda = (round(6 + g * 5), round(max(0.0, 0.55 * (1 - g / ONDA)), 3)) if g < ONDA else (0, 0.0)
    return (op, sc, round(mix, 3), ck, *onda)

ONIBUS = base64.b64encode(open("fotos/onibus_pb.jpg", "rb").read()).decode()
RETRATO = base64.b64encode(open("fotos/retrato_pb.jpg", "rb").read()).decode()
# fotos da Rosa Parks: (id do card, início, fim) em tempo original
FOTOS = [("ft1", 37.20, 42.94),                  # lendo "Rosa Parks, uma costureira negra... nos Estados Unidos": a cena do ônibus
         ("ft2", 88.56, 93.10),                  # "a atuação dessa mulher negra num regime segregacionista"
         ("ft2", 111.58, 113.94)]                # "o ato de Rosa Parks se traduz na alternativa B" (sai quando entra o card da B)
FT_INI = M(FOTOS[0][1])
def foto(t):
    for card, a, b in FOTOS:
        if M(a) <= t < M(b):
            k = int((t - M(a)) / Q + 1e-6); return (card, *ENT_POP[min(k, 3)])
    return None
PZ_INI, PZ_DUR = ev["pausa"]
def pausa(t):
    """(escurecimento, opacidade/escala da caixa, número da contagem, opacidade/escala do número)"""
    if not (PZ_INI <= t < PZ_INI + PZ_DUR): return None
    d = t - PZ_INI; k = int(d / Q + 1e-6)
    esc = [0.15, 0.28, 0.38][min(k, 2)]
    op, sc = ENT_POP[min(k, 3)]
    num = 3 - int(d)                              # 3, 2, 1
    kn = int((d - int(d)) / Q + 1e-6); nop, nsc = [(0.3, 1.35), (0.7, 1.18), (0.95, 1.06), (1.0, 1.0)][min(kn, 3)]
    return (esc, op, sc, num, nop, nsc)

def estado(t):
    pop = None
    for nome, a, b in ev["pops"]:
        if a <= t < b:
            k = int((t - a) / Q + 1e-6); op, sc = ENT_POP[min(k, 3)]; pop = (nome, op, sc)
    enf = None
    if ENF_INI <= t < ENF_FIM:
        k = int((t - ENF_INI) / Q + 1e-6); escuro = [0.25, 0.45, 0.62][min(k, 2)]
        pals = []
        for w, to in PAL:
            d = t - M(to)
            pals.append(0 if d < 0 else FADE[min(int(d / Q + 1e-6), 2)])
        d = t - M(CAIXA)
        cx = (0, 1.08) if d < 0 else CAIXA_ENT[min(int(d / Q + 1e-6), 3)]
        enf = (escuro, pals, cx)
    return (pop, enf, certo(t), pausa(t), foto(t))

DOC = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;background:transparent;overflow:hidden;font-family:Poppins,sans-serif;
  -webkit-font-smoothing:antialiased}}
.pop{{position:absolute;top:330px;left:50%;display:none;transform-origin:50% 50%}}
.pop .bx{{transform:skewX(-8deg);background:{OURO};padding:6px 46px 14px;white-space:nowrap;
  box-shadow:0 10px 30px rgba(0,0,0,.35)}}
.pop span{{display:block;transform:skewX(8deg);font:800 italic 104px/1.12 Poppins;color:{ESC};letter-spacing:-.01em}}
.enf{{position:absolute;inset:0;background:#000;display:none}}
.enft{{position:absolute;top:760px;left:0;right:0;display:none;flex-direction:column;align-items:center;gap:18px}}
.enft .a{{font:800 italic 76px/1.08 Poppins;color:#fff;white-space:nowrap;text-shadow:0 6px 24px rgba(0,0,0,.6)}}
.enft .b{{background:{OURO};padding:2px 34px 10px;transform-origin:50% 50%}}
.enft .b span{{display:block;transform:skewX(8deg);font:800 italic 76px/1.1 Poppins;color:{ESC};white-space:nowrap}}
.cer{{position:absolute;left:50px;right:100px;top:1290px;display:none;transform-origin:50% 50%;
  border-radius:22px;padding:24px 34px;align-items:flex-start;gap:20px;font:700 40px/1.3 Poppins}}
.cer .l{{font-weight:900;flex:0 0 auto}}
.cer .ck{{position:absolute;right:-22px;top:-40px;width:96px;height:96px;border-radius:50%;background:#fff;
  display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.35)}}
.cer .ck svg{{width:58px;height:58px}}
.pz{{position:absolute;inset:0;background:#000;display:none}}
.ft{{position:absolute;background:#fff;padding:12px 12px 0;display:none;
  box-shadow:0 18px 44px rgba(0,0,0,.55);transform-origin:50% 50%}}
.ft img{{display:block;width:100%;filter:contrast(1.05)}}
.ft .nm{{font:900 30px/1 Poppins;letter-spacing:.06em;color:{ESC};text-align:center;padding:14px 0 4px}}
.ft .dt{{font:700 21px/1 Poppins;color:#555;text-align:center;letter-spacing:.1em}}
.ft .ds{{margin:8px 0 14px;font:700 italic 21px/1.25 Poppins;color:#444;text-align:center}}
.pzb{{position:absolute;top:330px;left:50%;display:none;transform-origin:50% 50%}}
.pzb .bx{{transform:skewX(-8deg);background:{OURO};padding:6px 46px 14px;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.35)}}
.pzb span{{display:block;transform:skewX(8deg);font:800 italic 92px/1.12 Poppins;color:{ESC}}}
.cnt{{position:absolute;top:520px;left:50%;width:180px;height:180px;margin-left:-90px;border-radius:50%;
  border:9px solid {OURO};background:rgba(19,27,45,.9);display:none;align-items:center;justify-content:center;
  font:900 110px/1 Poppins;color:#fff;box-shadow:0 12px 34px rgba(0,0,0,.5)}}
</style>""" + "".join(f'<div class="pop" id="{n}"><div class="bx"><span style="font-size:{104 if len(t) <= 16 else 74}px">{t}</span></div></div>' for n, t in POPS.items()) + \
 '<div class="enf"></div><div class="enft"><div class="a">' + \
 " ".join(f'<span class="pw">{w}</span>' for w, _ in PAL) + \
 '</div><div class="b"><span>banheiro para branco</span></div></div>' + \
 '<div class="cer"><span class="l">B)</span><span>estimular o ativismo político entre grupos oprimidos.</span>' + \
 '<div class="ck"><svg viewBox="0 0 24 24"><path d="M4.5 12.5l5 5L19.5 7" fill="none" stroke="#22C55E" ' + \
 'stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>' + \
 f'<div class="ft" id="ft1" data-r="-2" style="left:478px;top:350px;width:560px"><img src="data:image/jpeg;base64,{ONIBUS}">' \
 f'<div class="nm">ROSA PARKS</div><div class="ds">no ônibus em Montgomery, 1956</div></div>' + \
 f'<div class="ft" id="ft2" data-r="-4" style="left:24px;top:330px;width:290px"><img src="data:image/jpeg;base64,{RETRATO}">' \
 f'<div class="nm">ROSA PARKS</div><div class="dt">1913 – 2005</div><div class="ds">costureira e ativista<br>dos direitos civis</div></div>' + \
 '<div class="pz"></div><div class="pzb"><div class="bx"><span>pausa e responde!</span></div></div><div class="cnt">3</div>'
JS = """([pop, enf, cer, pz, ft]) => {
  document.querySelectorAll('.ft').forEach(fe => { const on = ft && ft[0] === fe.id; fe.style.display = on ? 'block' : 'none';
    if (on) { fe.style.opacity = ft[1]; fe.style.transform = 'rotate(' + fe.dataset.r + 'deg) scale(' + ft[2] + ')'; } });
  const z = document.querySelector('.pz'), zb = document.querySelector('.pzb'), cn = document.querySelector('.cnt');
  z.style.display = zb.style.display = pz ? 'block' : 'none'; cn.style.display = pz ? 'flex' : 'none';
  if (pz) { z.style.opacity = pz[0]; zb.style.opacity = pz[1]; zb.style.transform = 'translateX(-50%) scale(' + pz[2] + ')';
    cn.textContent = pz[3]; cn.style.opacity = pz[4]; cn.style.transform = 'scale(' + pz[5] + ')'; }
  const c = document.querySelector('.cer'); c.style.display = cer ? 'flex' : 'none';
  if (cer) { const [op, sc, m, ck, r, ra] = cer;
    const mix = (a, b) => Math.round(a + (b - a) * m);
    c.style.opacity = op; c.style.transform = 'scale(' + sc + ')';
    c.style.background = `rgb(${mix(251,34)},${mix(194,197)},${mix(94,94)})`;
    c.style.color = m > 0.5 ? '#fff' : '#0F1120';
    c.style.boxShadow = `0 14px 36px rgba(0,0,0,.45), 0 0 0 ${r}px rgba(34,197,94,${ra})`;
    const k = c.querySelector('.ck'); k.style.display = ck > 0 ? 'flex' : 'none'; k.style.transform = 'scale(' + ck + ')'; }
  document.querySelectorAll('.pop').forEach(e => {
    const on = pop && pop[0] === e.id; e.style.display = on ? 'block' : 'none';
    if (on) { e.style.opacity = pop[1]; e.style.transform = 'translateX(-50%) scale(' + pop[2] + ')'; } });
  const d = document.querySelector('.enf'), t = document.querySelector('.enft');
  d.style.display = enf ? 'block' : 'none'; t.style.display = enf ? 'flex' : 'none';
  if (enf) { d.style.opacity = enf[0];
    document.querySelectorAll('.pw').forEach((e, i) => e.style.opacity = enf[1][i]);
    const b = document.querySelector('.enft .b'); b.style.opacity = enf[2][0];
    b.style.transform = 'skewX(-8deg) scale(' + enf[2][1] + ')'; }
}"""
d = pathlib.Path("graf"); d.mkdir(exist_ok=True)
for f in d.glob("*.png"): f.unlink()
quadros, ant = [], object()
n = 0
while n * Q < tl.TOTAL + 0.5:
    t = n * Q; e = estado(t)
    if e != ant: quadros.append((t, e)); ant = e
    n += 1
lista = []
with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--force-color-profile=srgb"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    tmp = pathlib.Path(tempfile.mkdtemp()) / "g.html"; tmp.write_text(DOC)
    pg.goto("file://" + str(tmp)); pg.wait_for_timeout(500)
    for i, (t, e) in enumerate(quadros):
        pg.evaluate(JS, [list(e[0]) if e[0] else None, [e[1][0], e[1][1], list(e[1][2])] if e[1] else None, list(e[2]) if e[2] else None, list(e[3]) if e[3] else None, list(e[4]) if e[4] else None])
        arq = d / f"g{i:04d}.png"; pg.screenshot(path=str(arq), omit_background=True)
        dur = (quadros[i + 1][0] if i + 1 < len(quadros) else tl.TOTAL + 0.5) - t
        lista.append(f"file '{arq.resolve()}'\nduration {dur:.4f}")
    b.close()
lista.append(f"file '{arq.resolve()}'")
open("graf/lista.txt", "w").write("\n".join(lista) + "\n")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "graf/lista.txt",
                "-vf", "fps=30,format=argb", "-c:v", "qtrle", "graf/graf.mov"], check=True)
wh = [a for _, a, _ in ev["pops"]] + [ENF_INI, M(CAIXA), CER["entra"], PZ_INI, M(tl.CARD_A[0])] + [M(a) for _, a, _ in FOTOS]
json.dump(sorted(round(x, 3) for x in wh), open("whoosh.json", "w"))
print("quadros", len(quadros), "whooshes", len(wh))
