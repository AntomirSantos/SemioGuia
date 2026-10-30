#!/usr/bin/env python3
"""Card da Questão do Dia: logo no topo, desenho opcional, enunciado
centralizado e alternativas alinhadas à esquerda do enunciado, texto branco
com sombra forte sobre o vídeo, e a chamada lá embaixo."""
import base64, pathlib, tempfile
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path("/home/claude/reels")
FONTS = (RAIZ / "fonts.css").read_text()
LOGO = RAIZ / "g07/logo_aeenem.png"
W, H = 1080, 1920

SOMBRA = ("0 3px 0 rgba(0,0,0,.6), 0 6px 26px rgba(0,0,0,.95), "
          "0 0 14px rgba(0,0,0,.85), 0 0 46px rgba(0,0,0,.6)")

# Preto neutro, não o azul da marca: sobre vídeo claro o navy virava uma
# vinheta azulada. Preto lê como sombra, não como filtro de cor.
VEU = ("linear-gradient(180deg, rgba(0,0,0,.50) 0%, rgba(0,0,0,.26) 13%,"
       "rgba(0,0,0,.06) 25%, rgba(0,0,0,.30) 40%,"
       "rgba(0,0,0,.48) 62%, rgba(0,0,0,.40) 80%,"
       "rgba(0,0,0,.14) 100%)")

def card(enunciado_linhas, alternativas, rodape, out,
         topo_bloco=560, topo_rodape=1630, tam_enun=50, tam_alt=56,
         espaco_alts=80, largura_logo=330,
         figura=None,    # (topo, largura, altura) de um retângulo vazio
         desenho=None,   # (topo, largura, altura, svg) — o desenho da questão
         veu=True):
    b64 = base64.b64encode(LOGO.read_bytes()).decode()
    fig = ("" if not figura else
           f'<div class="figura" style="top:{figura[0]}px;'
           f'width:{figura[1]}px;height:{figura[2]}px"></div>')
    if desenho:
        fig += (f'<div class="desenho" style="top:{desenho[0]}px;'
                f'width:{desenho[1]}px;height:{desenho[2]}px">{desenho[3]}</div>')
    enun = "".join(f'<div class="l">{x}</div>' for x in enunciado_linhas)
    alts = "".join(f'<div class="alt">{a}</div>' for a in alternativas)
    doc = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;background:transparent;overflow:hidden}}
body{{font-family:MontserratBold,'Noto Color Emoji',sans-serif;
     -webkit-font-smoothing:antialiased}}
.logo{{position:absolute;top:96px;left:50%;transform:translateX(-50%);width:{largura_logo}px;
      filter:drop-shadow(0 6px 22px rgba(0,0,0,.85))}}
/* o bloco encolhe até a largura da maior linha do enunciado; as alternativas
   herdam essa mesma margem esquerda */
.bloco{{position:absolute;top:{topo_bloco}px;left:50%;transform:translateX(-50%);
       display:flex;flex-direction:column;align-items:flex-start}}
.enun{{text-align:center;font:700 {tam_enun}px/1.36 MontserratBold;color:#fff;
      text-shadow:{SOMBRA}}}
.enun .l{{white-space:nowrap}}
.alts{{margin-top:{espaco_alts}px;display:flex;flex-direction:column;gap:18px;
      align-items:flex-start}}
.alt{{font:700 {tam_alt}px/1.18 MontserratBold;color:#fff;text-shadow:{SOMBRA};
     white-space:nowrap}}
.rodape{{position:absolute;top:{topo_rodape}px;left:0;right:0;text-align:center;
        font:900 58px/1.2 MontserratBlack;color:#fff;text-shadow:{SOMBRA}}}
.rodape span{{font-family:'Noto Color Emoji';font-size:54px;margin-left:10px}}
.figura{{position:absolute;left:50%;transform:translateX(-50%);
        border:5px solid #fff;border-radius:3px;
        box-shadow:0 4px 22px rgba(0,0,0,.9), 0 0 12px rgba(0,0,0,.7)}}
.veu{{position:absolute;inset:0;background:{VEU}}}
.desenho{{position:absolute;left:50%;transform:translateX(-50%);
         filter:drop-shadow(0 4px 18px rgba(0,0,0,.9))}}
.desenho svg{{width:100%;height:100%;display:block}}
</style>
{'<div class="veu"></div>' if veu else ''}
<img class="logo" src="data:image/png;base64,{b64}">{fig}
<div class="bloco"><div class="enun">{enun}</div><div class="alts">{alts}</div></div>
<div class="rodape">{rodape}<span>&#128071;</span></div>"""
    tmp = pathlib.Path(tempfile.mkdtemp()) / "c.html"
    tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(900)
        caixa = pg.evaluate("""() => {
            const b = document.querySelector('.bloco').getBoundingClientRect();
            const r = document.querySelector('.rodape').getBoundingClientRect();
            return {bloco:[b.left,b.top,b.right,b.bottom], rodape:[r.top,r.bottom]};
        }""")
        pg.screenshot(path=str(out), omit_background=True)
        b.close()
    return out, caixa
