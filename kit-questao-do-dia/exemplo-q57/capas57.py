import sys, math; sys.path.insert(0, sys.argv[1])
import capa_gen, capas_variantes
OURO = capa_gen.CORES["mat"]; CORAL = "#F2685A"
# curva de f(x) = 1/(x²+1), fora de escala de propósito; f(1/x) fica como "?"
pts = []
for i in range(161):
    x = -4 + 8 * i / 160
    pts.append(f"{250 + x * 56:.1f},{300 - 190 / (x * x + 1):.1f}")
curva = " ".join(pts)
SVG = f"""<svg viewBox="0 0 500 508" xmlns="http://www.w3.org/2000/svg">
<g font-family="MontserratBold" fill="#fff">
 <line x1="20" y1="300" x2="482" y2="300" stroke="#fff" stroke-width="3"/>
 <polygon points="482,293 496,300 482,307"/>
 <line x1="250" y1="330" x2="250" y2="62" stroke="#fff" stroke-width="3"/>
 <polygon points="243,62 250,48 257,62"/>
 <polygon points="20,300 {curva} 480,300" fill="{OURO}" fill-opacity=".22" stroke="none"/>
 <polyline points="{curva}" fill="none" stroke="#fff" stroke-width="3"/>
 <circle cx="250" cy="110" r="7" fill="{CORAL}"/>
 <text x="262" y="96" font-size="26">1</text>
 <text x="300" y="168" font-size="30">f(x) = <tspan font-size="30">1/(x²+1)</tspan></text>
 <rect x="70" y="372" width="360" height="104" rx="14" fill="rgba(0,0,0,.25)"
       stroke="{CORAL}" stroke-width="3" stroke-dasharray="12 9"/>
 <text x="250" y="442" font-size="48" text-anchor="middle">f(1/x) = <tspan fill="{CORAL}">?</tspan></text>
</g></svg>"""
v = "q57w.mkv"
capa_gen.quadro_rosto(v, 1.2, "fr/foto_q.jpg", w=1080, h=1920)
capa_gen.quadro_rosto(v, 0.2, "fr/foto_r.jpg", w=1080, h=1920)
capas_variantes.dividida("fr/foto_q.jpg", "QUESTÃO DO DIA", "#57",
    "Quanto vale<br><em>f(1/x)</em>?", OURO, "out/capa-57-questao.png", SVG)
capa_gen.reacao("fr/foto_r.jpg", "RESOLUÇÃO DO DIA", "#57",
    "Troque x<br>por <em>1/x</em>", OURO, "out/capa-57-resolucao.png", banda=240, h=1920)
open("out/figura57.svg", "w").write(SVG)
