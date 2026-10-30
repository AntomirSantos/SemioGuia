import sys; sys.argv = sys.argv[:2]
exec(open("scripts/capa_infra.py").read())
# capa 2 (ônibus A) com o professor maior: rosto em evidência, logo de cima do ônibus até a faixa da frase
PS = 1.12; PL, PT = 430, 770
medir("onibus-A-prof-maior", f"""
<div style="position:absolute;left:0;right:0;top:240px;height:560px;background:url({BUS}) center 30%/cover;filter:contrast(1.1) brightness(.85)"></div>
<div style="position:absolute;left:0;right:0;top:640px;height:160px;background:linear-gradient(180deg,rgba(7,16,28,0),#07101C)"></div>
<img class="prof" src="{PROF}" style="left:{PL}px;top:{PT}px;width:{720*PS}px">
<div class="fade" style="top:1110px;height:210px"></div><div class="baixo"></div>
<div class="rot serie" style="top:860px">AULÃO AO VIVO</div>
<div class="data num" style="top:930px;font-size:170px">04/11</div>
<div class="hora" style="top:1092px">às <b>18H</b></div>
<div class="frase" style="top:1350px;font-size:62px;right:300px">Revisão com o<br>prof. Mantovani</div>
<div class="marca">@ASSESSORIAENEM</div>
<img class="logo gr" src="{LOGO}" style="width:210px;right:48px;top:1420px">""", (PL, PT, PS))
