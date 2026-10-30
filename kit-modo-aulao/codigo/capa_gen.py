#!/usr/bin/env python3
"""
Gerador de capas de Reels da AssessoriaENEM.

Regra que manda em tudo: a capa é sempre um quadro real do vídeo — rosto,
mão no giz, o desenho no quadro-negro. Nunca um cartão chapado. O que varia
é o recorte, o número da série e o tratamento do texto.

A capa sai em 1080x1920 (9:16), que é o que o Instagram mostra inteiro na aba
Cover do Reels, com todo o texto dentro do miolo 3:4 (y 240..1680), que é o
que a grade do perfil mostra. É o que o parâmetro `banda` faz.
"""
import base64, pathlib, subprocess, tempfile
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path("/home/claude/reels")
FONTS = (RAIZ / "fonts.css").read_text()
CORUJA = RAIZ / "g07/logo_aeenem.png"
W, H = 1080, 1440          # 3:4 é o que o grid do perfil mostra

CORES = {"mat": "#F2B233", "fis": "#4FA8F5", "bio": "#4FC98A",
         "qui": "#A47BF5", "red": "#F2685A", "hum": "#E0854F"}

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:%(W)spx;height:%(H)spx;overflow:hidden;background:#0A1424}
body{font-family:MontserratBlack,sans-serif;-webkit-font-smoothing:antialiased}
.foto{position:absolute;inset:0;background-size:cover;background-position:50%% 42%%;
      filter:contrast(1.14) saturate(1.1) brightness(1.04)}
/* escurece só onde entra texto, em degradê — a imagem continua viva */
.veu{position:absolute;inset:0}
.owl{position:absolute;right:38px;top:34px;width:92px;aspect-ratio:1.22;
     background:var(--owl) center/contain no-repeat;
     filter:drop-shadow(0 4px 14px rgba(0,0,0,.8))}
/* o número é o gancho: a série numerada é o que domina o nicho */
.serie{position:absolute;font:900 34px/1 MontserratBlack;letter-spacing:.2em;
       color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.9)}
.num{position:absolute;font:900 210px/.8 MontserratBlack;letter-spacing:-.05em;
     color:var(--ac);-webkit-text-stroke:0;
     text-shadow:0 6px 26px rgba(0,0,0,.75),0 2px 0 rgba(0,0,0,.35)}
.frase{position:absolute;font:900 78px/1.04 MontserratBlack;letter-spacing:-.025em;
       color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.55),0 6px 26px rgba(0,0,0,.95)}
.frase em{font-style:normal;color:var(--ac)}
.regua{position:absolute;height:12px;border-radius:8px;background:var(--ac);
       box-shadow:0 4px 18px rgba(0,0,0,.6)}
.marca{position:absolute;font:900 26px/1 MontserratBlack;letter-spacing:.24em;
       color:rgba(255,255,255,.8);text-shadow:0 2px 10px rgba(0,0,0,.9)}
"""

def _render(corpo, extra, out, w=W, h=H):
    owl = "data:image/png;base64," + base64.b64encode(CORUJA.read_bytes()).decode()
    doc = (f"<!doctype html><meta charset=utf-8><style>{FONTS}\n"
           f":root{{--owl:url({owl})}}\n" + CSS % {"W": w, "H": h} + extra +
           "</style>" + corpo)
    tmp = pathlib.Path(tempfile.mkdtemp()) / "c.html"
    tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(700)
        pg.screenshot(path=str(out)); b.close()
    return out

def _foto(caminho):
    return ("data:image/jpeg;base64," +
            base64.b64encode(pathlib.Path(caminho).read_bytes()).decode())

# ---------------------------------------------------------------- A · reação
def reacao(foto, serie, numero, frase, cor, out, regua_bottom=None, banda=0, h=H):
    """banda = folga vertical (px) em cima e embaixo. Com banda=240 e h=1920 a
    peça sai em 9:16 e todo o texto cabe dentro do miolo 3:4."""
    if regua_bottom is None:
        regua_bottom = 132 + 82 * (frase.count("<br>") + 1) + 34
    css = """
.veu{background:linear-gradient(0deg,rgba(10,20,36,.96) BAIXOpx,rgba(10,20,36,.55) MEIOpx,
     rgba(10,20,36,0) ALTOpx),linear-gradient(90deg,rgba(10,20,36,.7) 0%,transparent 42%)}
.owl{top:OWLpx}
.serie{left:56px;top:SERIEpx}
.num{left:48px;top:NUMpx}
.regua{left:56px;bottom:REGUApx;width:150px}
.frase{left:56px;right:70px;bottom:FRASEpx}
.marca{left:56px;bottom:MARCApx}
"""
    for k, v in [("REGUA", regua_bottom + banda), ("FRASE", 132 + banda),
                 ("MARCA", 62 + banda), ("SERIE", 70 + banda), ("NUM", 106 + banda),
                 ("OWL", 34 + banda),
                 ("BAIXO", round(h * 0.04) + banda // 2),
                 ("MEIO", round(h * 0.26) + banda // 2),
                 ("ALTO", round(h * 0.52) + banda // 2)]:
        css = css.replace(k, str(v))
    corpo = (f'<div class="foto" style="background-image:url({_foto(foto)})"></div>'
             f'<div class="veu"></div><div class="owl"></div>'
             f'<div class="serie">{serie}</div><div class="num">{numero}</div>'
             f'<div class="regua"></div><div class="frase">{frase}</div>'
             f'<div class="marca">@ASSESSORIAENEM</div>')
    return _render(corpo, css.replace("var(--ac)", cor) + f":root{{--ac:{cor}}}",
                   out, w=W, h=h)

# ---------------------------------------------------------------- enquadramento
def quadro_rosto(video, t, destino, w=W, h=H, altura_rosto=0.26, y_rosto=0.40):
    """Recorta colocando o rosto sempre na mesma altura e no mesmo tamanho.
    É o que faz capas diferentes parecerem a mesma série."""
    import cv2
    cap = cv2.VideoCapture(str(video)); cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
    ok, fr = cap.read(); cap.release()
    if not ok: raise RuntimeError("quadro não lido")
    H0, W0 = fr.shape[:2]
    cas = cv2.CascadeClassifier(cv2.data.haarcascades +
                                "haarcascade_frontalface_default.xml")
    f = cas.detectMultiScale(cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY), 1.1, 6,
                             minSize=(60, 60))
    if len(f):
        x, y, fw, fh = max(f, key=lambda r: r[2] * r[3])
        cx, cy, face = x + fw / 2, y + fh / 2, fh
    else:
        cx, cy, face = W0 / 2, H0 * 0.42, H0 * 0.22
    # Pode recortar menor que a saída (amplia um pouco) — é o que mantém o rosto
    # do mesmo tamanho em todas as capas da série, mesmo gravando mais longe.
    ch = min(H0, face / altura_rosto)
    ch = max(ch, h / 1.6)          # teto de ampliação, para não borrar
    cw = ch * w / h
    if cw > W0: cw = W0; ch = cw * h / w
    x0 = int(round(cx - cw / 2)); y0 = int(round(cy - ch * y_rosto))
    x0 = max(0, min(W0 - int(cw), x0)); y0 = max(0, min(H0 - int(ch), y0))
    rec = fr[y0:y0 + int(ch), x0:x0 + int(cw)]
    rec = cv2.resize(rec, (w, h), interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(str(destino), rec, [cv2.IMWRITE_JPEG_QUALITY, 94])
    return destino
