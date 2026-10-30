#!/usr/bin/env python3
"""Curte / comenta / compartilha — faixa para o fim do vídeo de resolução."""
import pathlib, tempfile
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path("/home/claude/reels")
FONTS = (RAIZ / "fonts.css").read_text()
OURO = "#F2B233"

CORACAO = ('<path d="M32 56C14 44 6 34 6 23.5 6 14.9 12.9 8 21.5 8c5.2 0 9.1 2.5 '
           '10.5 5 1.4-2.5 5.3-5 10.5-5C51.1 8 58 14.9 58 23.5 58 34 50 44 32 56z"/>')
BALAO = ('<path d="M32 9C17.1 9 5 18.6 5 30.5c0 6.6 3.8 12.5 9.7 16.4-.5 4-2.3 7.6-5 '
         '10.1 4.9-.5 9.6-2.3 13.6-5.2 2.8.8 5.7 1.2 8.7 1.2C46.9 52 59 42.4 59 '
         '30.5S46.9 9 32 9z"/>')
AVIAO = '<path d="M58 7L5 29.5l19.5 6.8L50 15 29.8 39.6l-.3 17.4 9.5-11.3L52 51z"/>'

ITENS = [("CURTE", CORACAO), ("COMENTA", BALAO), ("COMPARTILHA", AVIAO)]

def botoes(out, w=1000, h=226, d=150, vao=150):
    cels = "".join(
        f'<div class="it"><div class="bt"><svg viewBox="0 0 64 64" fill="#fff">'
        f'{svg}</svg></div><div class="tx">{rot}</div></div>'
        for rot, svg in ITENS)
    doc = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{w}px;height:{h}px;background:transparent;overflow:hidden}}
body{{font-family:MontserratBlack,sans-serif;-webkit-font-smoothing:antialiased;
     display:flex;align-items:flex-start;justify-content:center;gap:{vao}px}}
.it{{display:flex;flex-direction:column;align-items:center}}
.bt{{width:{d}px;height:{d}px;border-radius:50%;background:rgba(10,20,36,.72);
    border:5px solid {OURO};display:flex;align-items:center;justify-content:center;
    box-shadow:0 10px 30px rgba(0,0,0,.75)}}
.bt svg{{width:{int(d*0.52)}px;height:{int(d*0.52)}px;
        filter:drop-shadow(0 3px 8px rgba(0,0,0,.8))}}
.tx{{margin-top:16px;font:900 30px/1 MontserratBlack;letter-spacing:.12em;color:#fff;
    text-shadow:0 3px 0 rgba(0,0,0,.6),0 6px 22px rgba(0,0,0,.95);white-space:nowrap}}
</style><div style="display:flex;gap:{vao}px">{cels}</div>"""
    tmp = pathlib.Path(tempfile.mkdtemp()) / "b.html"; tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(700)
        pg.screenshot(path=str(out), omit_background=True); b.close()
    return out
