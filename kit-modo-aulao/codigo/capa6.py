import sys; sys.argv = sys.argv[:2]
exec(open("scripts/capa_infra.py").read())
FUNDO_Y = 1700        # aqui o professor vai até o pé da área 3:4; a checagem considera o corpo inteiro
# miniatura 2: professor maior (corpo, não zoom no rosto), por cima da faixa escura, em destaque
PW = 780; PS = PW / 720; PL, PT = 520, 720
medir("onibus-A-prof-destaque", f"""
<div style="position:absolute;left:0;right:0;top:240px;height:560px;background:url({BUS}) center 30%/cover;filter:contrast(1.1) brightness(.85)"></div>
<div style="position:absolute;left:0;right:0;top:640px;height:160px;background:linear-gradient(180deg,rgba(7,16,28,0),#07101C)"></div>
<div class="baixo" style="top:800px"></div>
<div style="position:absolute;left:{PL - 120}px;top:{PT + 80}px;width:{PW + 200}px;height:1000px;
 background:radial-gradient(50% 45% at 55% 40%,rgba(251,194,94,.22),rgba(251,194,94,0) 70%)"></div>
<img class="prof" src="{PROF}" style="left:{PL}px;top:{PT}px;width:{PW}px;
 -webkit-mask-image:linear-gradient(180deg,#000 82%,transparent 97%)">
<div class="rot serie" style="top:860px">AULÃO AO VIVO</div>
<div class="data num" style="top:930px;font-size:160px">04/11</div>
<div class="hora" style="top:1085px">às <b>18H</b></div>
<div class="frase" style="top:1285px;font-size:44px;right:auto;width:440px;white-space:nowrap">Revisão com o<br>prof. Mantovani</div>
<img class="logo gr" src="{LOGO}" style="left:46px;right:auto;top:1420px;width:150px">
<div class="marca" style="left:56px;top:1590px;font-size:22px">@ASSESSORIAENEM</div>""", (PL, PT, PS))
