"""PNGs da peça no estilo do FS02: tarja do professor, painel da questão, destaques e ênfase."""
import json, pathlib, tempfile
from playwright.sync_api import sync_playwright
FONTS = open("poppins.css").read()
OURO, NAVY, ESC = "#FBC25E", "#131B2D", "#0F1120"
BASE = f"""<!doctype html><meta charset=utf-8><style>{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;background:transparent;overflow:hidden;
  font-family:Poppins,sans-serif;-webkit-font-smoothing:antialiased}}
.tag{{position:absolute;top:1530px;left:50%;transform:translateX(-50%);padding:10px 26px 9px;
  border-radius:16px;background:rgba(19,27,45,.88);color:#fff;font:700 31px/1.2 Poppins;
  white-space:nowrap;letter-spacing:.005em}}
.pop{{position:absolute;top:300px;left:50%;transform:translateX(-50%) skewX(-8deg);
  background:{OURO};padding:6px 46px 14px;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.35)}}
.pop span{{display:block;transform:skewX(8deg);font:800 italic 104px/1.12 Poppins;color:{ESC};letter-spacing:-.01em}}
.painel{{position:absolute;left:36px;right:36px;top:905px;height:815px;border-radius:30px;
  background:rgba(19,27,45,.93);padding:92px 46px 36px;box-shadow:0 18px 50px rgba(0,0,0,.45)}}
.chip{{position:absolute;top:-30px;left:40px;transform:skewX(-8deg);background:{OURO};padding:6px 26px 8px}}
.chip span{{display:block;transform:skewX(8deg);font:800 italic 40px/1.1 Poppins;color:{ESC}}}
.txt{{font:600 40px/1.5 Poppins;color:rgba(255,255,255,.42)}}
.txt b{{font-weight:600;color:#fff}}
.cmd{{font:700 37px/1.42 Poppins;color:rgba(255,255,255,.42);margin-bottom:26px}}
.cmd.on{{color:#fff}}
.alt{{display:flex;gap:18px;align-items:flex-start;font:600 34px/1.36 Poppins;color:rgba(255,255,255,.42);
  padding:10px 14px;border-radius:14px;margin-bottom:8px}}
.alt .l{{font-weight:800;flex:0 0 auto}}
.alt.on{{background:{OURO};color:{ESC}}}
.fonte{{margin-top:22px;font:600 22px/1.3 Poppins;color:rgba(255,255,255,.38)}}
.enf{{position:absolute;inset:0;background:rgba(0,0,0,.62)}}
.enft{{position:absolute;top:760px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:18px}}
.enft .a{{font:800 italic 76px/1.08 Poppins;color:#fff;white-space:nowrap;text-shadow:0 6px 24px rgba(0,0,0,.6)}}
.enft .b{{transform:skewX(-8deg);background:{OURO};padding:2px 34px 10px}}
.enft .b span{{display:block;transform:skewX(8deg);font:800 italic 76px/1.1 Poppins;color:{ESC};white-space:nowrap}}
</style>"""
FRASES = ["Primeiro de dezembro de 1955.",
 "Rosa Parks, uma costureira negra norte-americana, se recusa a ceder o lugar a um homem branco nos Estados Unidos.",
 "Foi durante uma viagem de ônibus no estado do Alabama, região sudeste do país.",
 "Ela acabou presa.",
 "As primeiras filas de assentos nos ônibus eram reservadas para os passageiros brancos.",
 "Por lei, os negros tinham que ocupar os lugares de trás nos transportes coletivos."]
CMD = "Esse ato individual ganhou repercussão nacional e colaborou decisivamente para"
ALTS = [("A)", "reacender a disputa militar entre estados da união."),
        ("B)", "estimular o ativismo político entre grupos oprimidos."),
        ("C)", "aprofundar o fosso econômico entre as classes sociais."),
        ("D)", "demonstrar o resultado insatisfatório de táticas pacifistas."),
        ("E)", "promover a emigração forçada de contingentes populacionais.")]
CHIP = '<div class="chip"><span>ENEM 2024 · QUESTÃO 84</span></div>'
def cardA(i):  # i = frase em leitura; 6 = tudo aceso
    t = " ".join(f"<b>{f}</b>" if (j == i or i == 6) else f for j, f in enumerate(FRASES))
    return (f'<div class="painel">{CHIP}<div class="txt">{t}</div>'
            '<div class="fonte">Disponível em: radioagencianacional.ebc.com.br</div></div>')
def cardB(i):  # 0 = comando; 1..5 = alternativa em leitura
    a = "".join(f'<div class="alt{" on" if k + 1 == i else ""}"><span class="l">{l}</span><span>{x}</span></div>'
                for k, (l, x) in enumerate(ALTS))
    return f'<div class="painel" style="padding-top:78px">{CHIP}<div class="cmd{" on" if i == 0 else ""}">{CMD}</div>{a}</div>'
pop = lambda s: f'<div class="pop"><span>{s}</span></div>'
PECAS = {"tag": '<div class="tag">PROF. JOSÉ MANTOVANI</div>',
         "pop_revisao": pop("revisão 04/11 · 18h"), "pop_segredo": pop("segredinho"),
         "pop_direitos": pop("direitos civis"), "pop_altb": pop("alternativa B"),
         "pop_data": pop("04/11 · 18h"),
         "enfase": '<div class="enf"></div><div class="enft"><div class="a">banheiro para negro,</div>'
                   '<div class="b"><span>banheiro para branco</span></div></div>'}
for i in range(7): PECAS[f"cardA{i}"] = cardA(i)
for i in range(6): PECAS[f"cardB{i}"] = cardB(i)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--force-color-profile=srgb"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    for nome, corpo in PECAS.items():
        f = pathlib.Path(tempfile.mkdtemp()) / "p.html"; f.write_text(BASE + corpo)
        pg.goto("file://" + str(f)); pg.wait_for_timeout(250)
        if nome.startswith("card"):
            h = pg.evaluate("()=>{const p=document.querySelector('.painel');return p.scrollHeight>p.clientHeight?p.scrollHeight:0}")
            if h: print("ESTOURO", nome, h)
        pg.screenshot(path=f"ov/{nome}.png", omit_background=True)
    b.close()
print("ok", len(PECAS))
