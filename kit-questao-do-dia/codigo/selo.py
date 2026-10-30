#!/usr/bin/env python3
"""Selo RESOLUÇÃO #NN, 300x126, para o canto superior direito (x=740, y=215)."""
import base64, pathlib, sys, tempfile
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path("/home/claude/reels")
FONTS = (RAIZ / "fonts.css").read_text()
OURO = "#F2B233"
def selo(numero, owl, out, w=300, h=126):
    b64 = base64.b64encode(pathlib.Path(owl).read_bytes()).decode()
    doc = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{w}px;height:{h}px;background:transparent;overflow:hidden}}
.s{{position:absolute;inset:8px 10px;display:flex;flex-direction:column;align-items:flex-end;
   filter:drop-shadow(0 3px 6px rgba(0,0,0,.9)) drop-shadow(0 8px 22px rgba(0,0,0,.7))}}
.rot{{font:900 19px/1 MontserratBlack;letter-spacing:.26em;margin-right:-.26em;color:#fff}}
.lin{{display:flex;align-items:center;gap:12px;margin-top:6px}}
.lin img{{height:58px}}
.num{{font:900 70px/.9 MontserratBlack;letter-spacing:-.03em;color:{OURO}}}
.num small{{font-size:.62em;vertical-align:.38em;margin-right:2px}}
.regua{{width:170px;height:7px;border-radius:5px;background:{OURO};margin-top:8px}}
</style><div class="s"><div class="rot">RESOLUÇÃO</div>
<div class="lin"><img src="data:image/png;base64,{b64}"><div class="num"><small>#</small>{numero}</div></div>
<div class="regua"></div></div>"""
    tmp = pathlib.Path(tempfile.mkdtemp()) / "s.html"; tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(600)
        pg.screenshot(path=str(out), omit_background=True); b.close()
if __name__ == "__main__":
    selo(sys.argv[1], sys.argv[2], sys.argv[3])
