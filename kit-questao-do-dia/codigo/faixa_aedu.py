#!/usr/bin/env python3
"""CTA do app aedu para entrar sobre o vídeo enquanto ele fala do app.
Logo oficial em branco (fundo transparente) + os números do banco."""
import base64, pathlib, tempfile
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path("/home/claude/reels")
FONTS = (RAIZ / "fonts.css").read_text()
AEDU = RAIZ / "assets/aedu_branco.png"
OURO = "#F2B233"

def faixa(out, w=1020, h=250, largura_logo=430, opacidade=0.94,
          linhas=(("+200.000", "questões"), ("+400", "simulados"))):
    b64 = base64.b64encode(AEDU.read_bytes()).decode()
    its = "".join(f'<div class="ln"><b>{n}</b> {p}</div>' for n, p in linhas)
    doc = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{w}px;height:{h}px;background:transparent;overflow:hidden}}
body{{font-family:MontserratBlack,sans-serif;-webkit-font-smoothing:antialiased}}
.cta{{position:absolute;inset:12px;opacity:{opacidade};
     display:flex;align-items:center;justify-content:center;gap:38px;
     filter:drop-shadow(0 4px 10px rgba(0,0,0,.95))
            drop-shadow(0 12px 38px rgba(0,0,0,.9))}}
.cta img{{width:{largura_logo}px}}
.barra{{width:7px;align-self:stretch;margin:14px 0;border-radius:5px;
       background:{OURO};flex:0 0 auto}}
.txt{{display:flex;flex-direction:column;gap:12px}}
.ln{{font:900 46px/1 MontserratBlack;color:#fff;white-space:nowrap;
    text-shadow:0 3px 0 rgba(0,0,0,.5)}}
.ln b{{color:{OURO}}}
</style>
<div class="cta">
  <img src="data:image/png;base64,{b64}">
  <div class="barra"></div>
  <div class="txt">{its}</div>
</div>"""
    tmp = pathlib.Path(tempfile.mkdtemp()) / "f.html"; tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(700)
        pg.screenshot(path=str(out), omit_background=True); b.close()
    return out
