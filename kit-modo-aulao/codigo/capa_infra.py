"""Capas sem sobreposição: imagem em cima, frase numa faixa própria embaixo.
Depois de renderizar, mede o cruzamento de cada texto com a silhueta do professor e com os rostos."""
import sys, base64, pathlib, tempfile, json
import numpy as np, cv2
from PIL import Image
sys.path.insert(0, sys.argv[1]); import capa_gen
from playwright.sync_api import sync_playwright
F = capa_gen.FONTS
b64 = lambda p, m="png": f"data:image/{m};base64," + base64.b64encode(open(p, "rb").read()).decode()
LOGO = b64("../kit/marca/logo_aeenem.png")
FUNDO_Y = 1250                     # a imagem se dissolve no azul até aqui; abaixo, só texto
BASE = """*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#07101C;font-family:MontserratBlack,sans-serif;-webkit-font-smoothing:antialiased}
.fade{position:absolute;left:0;right:0;top:1060px;height:260px;background:linear-gradient(180deg,rgba(7,16,28,0),#07101C 75%)}
.baixo{position:absolute;left:0;right:0;top:1300px;bottom:0;background:#07101C}
.serie{position:absolute;left:56px;top:300px;font:900 34px/1 MontserratBlack;letter-spacing:.2em;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.9)}
.num{position:absolute;left:48px;top:340px;font:900 VAR_NUMpx/.8 MontserratBlack;letter-spacing:-.05em;color:var(--ac);text-shadow:0 6px 26px rgba(0,0,0,.75)}
.regua{position:absolute;left:56px;top:1318px;width:150px;height:12px;border-radius:8px;background:var(--ac)}
.frase{position:absolute;left:56px;right:56px;top:1356px;font:900 78px/1.04 MontserratBlack;letter-spacing:-.025em;color:#fff}
.frase em{font-style:normal;color:var(--ac)}
.marca{position:absolute;left:56px;top:1560px;font:900 26px/1 MontserratBlack;letter-spacing:.24em;color:rgba(255,255,255,.8)}
.logo{position:absolute;right:56px;top:1520px;width:120px}
.tag{position:absolute;left:58px;font:800 26px/1 MontserratBold;letter-spacing:.16em;color:rgba(255,255,255,.8);text-shadow:0 2px 8px rgba(0,0,0,.9)}
"""
def render(nome, corpo, css, prof, cor, num_px):
    """prof = (left, top, escala) do recorte; usado para a silhueta da checagem."""
    doc = (f"<!doctype html><meta charset=utf-8><style>{F}\n:root{{--ac:{cor}}}\n" + BASE.replace("VAR_NUM", str(num_px))
           + css + "</style>" + corpo)
    tmp = pathlib.Path(tempfile.mkdtemp()) / "c.html"; tmp.write_text(doc)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
        pg.goto("file://" + str(tmp)); pg.wait_for_timeout(900)
        caixas = pg.evaluate("""() => Object.fromEntries([...document.querySelectorAll('.serie,.num,.frase,.marca,.tag,.regua,.logo,.hora,.cap')]
            .map(e => { const r = e.getBoundingClientRect(); return [e.className, [r.left, r.top, r.right, r.bottom]]; }))""")
        pg.screenshot(path=f"capa/{nome}.png"); b.close()
    # silhueta do professor na página (zerada abaixo do ponto em que a imagem some)
    a = np.asarray(Image.open("capa/prof_recorte.png"))[:, :, 3]
    l, t, s = prof
    a = cv2.resize(a, (int(a.shape[1] * s), int(a.shape[0] * s)))
    sil = np.zeros((1920, 1080), bool)
    y0, x0 = int(t), int(l)
    ys, xs = slice(max(0, y0), min(1920, y0 + a.shape[0])), slice(max(0, x0), min(1080, x0 + a.shape[1]))
    sil[ys, xs] = a[ys.start - y0:ys.stop - y0, xs.start - x0:xs.stop - x0] > 100
    sil[FUNDO_Y:] = False
    img = cv2.imread(f"capa/{nome}.png")
    rostos = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml") \
        .detectMultiScale(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), 1.1, 5, minSize=(60, 60))
    rel = {}
    for k, (x1, y1, x2, y2) in caixas.items():
        x1, y1, x2, y2 = map(int, (x1, y1, x2, y2))
        n_sil = int(sil[max(0, y1):y2, max(0, x1):x2].sum())
        n_rosto = sum(max(0, min(x2, fx + fw) - max(x1, fx)) * max(0, min(y2, fy + fh) - max(y1, fy)) for fx, fy, fw, fh in rostos)
        rel[k] = (n_sil, int(n_rosto))
    Image.open(f"capa/{nome}.png").convert("RGB").save(f"capa/{nome}.jpg", quality=92)
    print(nome, "rostos:", [tuple(map(int, r)) for r in rostos])
    for k, v in rel.items(): print(f"   {k:8s} silhueta={v[0]:6d}  rosto={v[1]:6d}")



OURO = capa_gen.CORES["mat"]; PROF = b64("capa/prof_recorte.png")
RET = b64("fotos/retrato_pb.jpg", "jpeg"); BUS = b64("fotos/onibus_pb.jpg", "jpeg"); BUSC = b64("fotos/onibus.jpg", "jpeg")
EXTRA = """
.rot{position:absolute;left:56px;font:900 40px/1 MontserratBlack;letter-spacing:.18em;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.9)}
.data{position:absolute;left:46px;font:900 230px/.82 MontserratBlack;letter-spacing:-.05em;color:var(--ac);text-shadow:0 8px 30px rgba(0,0,0,.7)}
.hora{position:absolute;left:56px;font:900 64px/1 MontserratBlack;color:#fff}
.hora b{color:var(--ac)}
.prof{position:absolute;filter:drop-shadow(0 0 2px #FBC25E) drop-shadow(0 0 16px rgba(251,194,94,.45))}
.cap{position:absolute;font:800 22px/1.2 MontserratBold;letter-spacing:.14em;color:rgba(255,255,255,.75)}
/* logo em destaque: tamanho próximo do original (358 px), com halo dourado discreto */
.logo.gr{width:300px;filter:drop-shadow(0 0 22px rgba(251,194,94,.28)) drop-shadow(0 10px 26px rgba(0,0,0,.6))}
"""
def medir(nome, corpo, prof):
    return render(nome, corpo, EXTRA, prof, OURO, 150)
