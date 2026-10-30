#!/usr/bin/env python3
"""Tratamentos novos de capa, para a grade não ficar igual todo dia.

A regra do sistema continua: 1080x1920, texto dentro do miolo 3:4, série
numerada, frase de até 5 palavras. O que muda é a composição — aqui entra
um objeto 2D/3D da própria questão, em vez de só o quadro do vídeo.
"""
import base64, pathlib, tempfile
import capa_gen
from capa_gen import _foto, CORES

FONTS = capa_gen.FONTS
W, H = 1080, 1920
BANDA = 240                      # miolo 3:4 = y 240..1680

GRADE = """<svg class="grade" viewBox="0 0 1080 620" preserveAspectRatio="none"
 xmlns="http://www.w3.org/2000/svg">
<g stroke="%(c)s" stroke-opacity=".38" stroke-width="2" fill="none">
  <line x1="-380" y1="620" x2="470" y2="0"/><line x1="-120" y1="620" x2="505" y2="0"/>
  <line x1="130"  y1="620" x2="540" y2="0"/><line x1="390"  y1="620" x2="575" y2="0"/>
  <line x1="690"  y1="620" x2="610" y2="0"/><line x1="950"  y1="620" x2="645" y2="0"/>
  <line x1="1200" y1="620" x2="680" y2="0"/><line x1="1460" y1="620" x2="715" y2="0"/>
  <line x1="0" y1="78"  x2="1080" y2="78"/><line x1="0" y1="170" x2="1080" y2="170"/>
  <line x1="0" y1="290" x2="1080" y2="290"/><line x1="0" y1="448" x2="1080" y2="448"/>
  <line x1="0" y1="620" x2="1080" y2="620"/>
</g></svg>"""

BASE = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#07101C}
body{font-family:MontserratBlack,sans-serif;-webkit-font-smoothing:antialiased}
.foto{position:absolute;inset:0;background-size:cover}
.veu{position:absolute;inset:0}
.owl{position:absolute;right:38px;top:274px;width:92px;aspect-ratio:1.22;
     background:var(--owl) center/contain no-repeat;
     filter:drop-shadow(0 4px 14px rgba(0,0,0,.8))}
.serie{position:absolute;left:56px;top:310px;font:900 34px/1 MontserratBlack;
       letter-spacing:.2em;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.9)}
.num{position:absolute;left:48px;top:346px;font:900 210px/.8 MontserratBlack;
     letter-spacing:-.05em;color:var(--ac);
     text-shadow:0 6px 26px rgba(0,0,0,.75)}
.regua{position:absolute;left:56px;height:12px;border-radius:8px;
       background:var(--ac);box-shadow:0 4px 18px rgba(0,0,0,.6);width:150px}
.frase{position:absolute;left:56px;right:70px;bottom:372px;
       font:900 78px/1.04 MontserratBlack;letter-spacing:-.025em;color:#fff;
       text-shadow:0 3px 0 rgba(0,0,0,.55),0 6px 26px rgba(0,0,0,.95)}
.frase em{font-style:normal;color:var(--ac)}
.marca{position:absolute;left:56px;bottom:302px;font:900 26px/1 MontserratBlack;
       letter-spacing:.24em;color:rgba(255,255,255,.8);
       text-shadow:0 2px 10px rgba(0,0,0,.9)}
.obj{position:absolute}
.grade{position:absolute;left:0;bottom:240px;width:1080px;height:620px}
"""

def _pagina(corpo, css, cor, out):
    owl = "data:image/png;base64," + base64.b64encode(
        capa_gen.CORUJA.read_bytes()).decode()
    doc = (f"<!doctype html><meta charset=utf-8><style>{FONTS}\n"
           f":root{{--owl:url({owl});--ac:{cor}}}\n" + BASE + css + "</style>" + corpo)
    tmp = pathlib.Path(tempfile.mkdtemp()) / "c.html"
    tmp.write_text(doc)
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(800)
        pg.screenshot(path=str(out)); b.close()
    return out

def _dim(css, obj):
    for k, v in zip(("OBJW", "OBJH", "OBJT"), obj):
        css = css.replace(k, str(v))
    return css

# ------------------------------------------------------- A · objeto central
def objeto(foto, serie, numero, frase, cor, out, svg, obj=(560, 568, 760)):
    css = _dim("""
.foto{background-size:116%;background-position:52% 18%;
      filter:blur(2.5px) saturate(.8) brightness(.84)}
.veu{background:radial-gradient(120% 80% at 50% 46%,rgba(7,16,28,0) 0%,
     rgba(7,16,28,.55) 58%,rgba(7,16,28,.9) 100%),
     linear-gradient(180deg,rgba(7,16,28,.85) 0%,rgba(7,16,28,.25) 22%,
     rgba(7,16,28,.25) 62%,rgba(7,16,28,.92) 88%)}
.obj{left:50%;top:OBJTpx;transform:translateX(-50%);width:OBJWpx;height:OBJHpx;
     filter:drop-shadow(0 28px 44px rgba(0,0,0,.8))}
.regua{bottom:600px}
""", obj)
    corpo = (f'<div class="foto" style="background-image:url({_foto(foto)})"></div>'
             f'<div class="veu"></div>{GRADE % {"c": cor}}'
             f'<div class="obj">{svg}</div><div class="owl"></div>'
             f'<div class="serie">{serie}</div><div class="num">{numero}</div>'
             f'<div class="regua"></div><div class="frase">{frase}</div>'
             f'<div class="marca">@ASSESSORIAENEM</div>')
    return _pagina(corpo, css, cor, out)

# ------------------------------------------------------------- B · dividida
def dividida(foto, serie, numero, frase, cor, out, svg, obj=(500, 508, 760)):
    css = _dim("""
.foto{inset:0 0 0 44%;background-position:52% 34%}
.veu{background:linear-gradient(90deg,#0A1728 0%,#0A1728 44%,
     rgba(10,23,40,.55) 54%,rgba(10,23,40,0) 68%),
     linear-gradient(180deg,rgba(7,16,28,.8) 0%,rgba(7,16,28,0) 20%,
     rgba(7,16,28,0) 70%,rgba(7,16,28,.85) 92%)}
.obj{left:24px;top:OBJTpx;width:OBJWpx;height:OBJHpx;
     filter:drop-shadow(0 24px 40px rgba(0,0,0,.7))}
.grade{width:560px;left:0}
.regua{bottom:600px}
.frase{right:420px;font-size:70px}
""", obj)
    corpo = (f'<div class="foto" style="background-image:url({_foto(foto)})"></div>'
             f'<div class="veu"></div>{GRADE % {"c": cor}}'
             f'<div class="obj">{svg}</div><div class="owl"></div>'
             f'<div class="serie">{serie}</div><div class="num">{numero}</div>'
             f'<div class="regua"></div><div class="frase">{frase}</div>'
             f'<div class="marca">@ASSESSORIAENEM</div>')
    return _pagina(corpo, css, cor, out)

# ------------------------------------------------------ C · holofote (cena)
def holofote(serie, numero, frase, cor, out, svg, pergunta="?",
             obj=(620, 629, 700)):
    css = _dim("""
.foto{display:none}
.veu{background:radial-gradient(70% 42% at 50% 44%,rgba(255,255,255,.11) 0%,
     rgba(255,255,255,0) 70%),
     linear-gradient(180deg,#0B1524 0%,#101E33 44%,#0A1220 100%)}
.obj{left:70px;top:OBJTpx;width:OBJWpx;height:OBJHpx;
     filter:drop-shadow(0 30px 50px rgba(0,0,0,.8))}
.regua{bottom:600px}
.perg{position:absolute;right:72px;top:900px;font:900 138px/.9 MontserratBlack;
      color:var(--ac);opacity:.92;letter-spacing:-.04em;
      text-shadow:0 8px 30px rgba(0,0,0,.8)}
""", obj)
    corpo = (f'<div class="veu"></div>{GRADE % {"c": cor}}'
             f'<div class="obj">{svg}</div><div class="perg">{pergunta}</div>'
             f'<div class="owl"></div>'
             f'<div class="serie">{serie}</div><div class="num">{numero}</div>'
             f'<div class="regua"></div><div class="frase">{frase}</div>'
             f'<div class="marca">@ASSESSORIAENEM</div>')
    return _pagina(corpo, css, cor, out)
