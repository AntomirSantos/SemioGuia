# hipérbole y = a + b/x fora de escala; assíntota tracejada sem valor, a^b vira "?"
OURO = "#F2B233"; CORAL = "#F2685A"
X0, Y0, UX, UY = 250, 300, 58, 52        # origem e unidades (fora de escala)
A, B = 2, 2
def ramo(x1, x2, n=60):
    p = []
    for i in range(n + 1):
        x = x1 + (x2 - x1) * i / n
        y = A + B / x
        p.append(f"{X0 + x * UX:.1f},{Y0 - y * UY:.1f}")
    return " ".join(p)
esq = ramo(-3.9, -0.62)   # termina abaixo do eixo x
dir_ = ramo(0.6, 3.9)
ya = Y0 - A * UY
def svg(pergunta=True):
    vh = 508 if pergunta else 372
    q = (f'<rect x="80" y="388" width="340" height="104" rx="14" fill="rgba(0,0,0,.25)" '
         f'stroke="{CORAL}" stroke-width="3" stroke-dasharray="12 9"/>'
         f'<text x="250" y="458" font-size="50" text-anchor="middle">a<tspan dy="-20" font-size="32">b</tspan>'
         f'<tspan dy="20"> = </tspan><tspan fill="{CORAL}">?</tspan></text>') if pergunta else ""
    return f"""<svg viewBox="0 0 500 {vh}" xmlns="http://www.w3.org/2000/svg">
<g font-family="MontserratBold" fill="#fff">
 <line x1="16" y1="{ya}" x2="484" y2="{ya}" stroke="{OURO}" stroke-width="2.5" stroke-dasharray="10 8"/>
 <line x1="{X0+2*UX}" y1="{Y0-3*UY}" x2="{X0+2*UX}" y2="{Y0}" stroke="{OURO}" stroke-width="2.5" stroke-dasharray="8 7"/>
 <line x1="{X0}" y1="{Y0-3*UY}" x2="{X0+2*UX}" y2="{Y0-3*UY}" stroke="{OURO}" stroke-width="2.5" stroke-dasharray="8 7"/>
 <line x1="16" y1="{Y0}" x2="482" y2="{Y0}" stroke="#fff" stroke-width="3"/>
 <polygon points="482,293 496,300 482,307"/>
 <line x1="{X0}" y1="352" x2="{X0}" y2="40" stroke="#fff" stroke-width="3"/>
 <polygon points="243,40 250,26 257,40"/>
 <polyline points="{esq}" fill="none" stroke="{CORAL}" stroke-width="4" stroke-linecap="round"/>
 <polyline points="{dir_}" fill="none" stroke="{CORAL}" stroke-width="4" stroke-linecap="round"/>
 <circle cx="{X0-UX}" cy="{Y0}" r="7" fill="#fff"/>
 <circle cx="{X0+2*UX}" cy="{Y0-3*UY}" r="7" fill="#fff"/>
 <text x="{X0-UX-14}" y="{Y0+36}" font-size="26" text-anchor="middle">−1</text>
 <text x="{X0+2*UX}" y="{Y0+36}" font-size="26" text-anchor="middle">2</text>
 <text x="{X0-12}" y="{Y0-3*UY+9}" font-size="26" text-anchor="end">3</text>
 <text x="{X0-12}" y="{Y0+30}" font-size="24" text-anchor="end">0</text>
 <text x="474" y="{Y0+36}" font-size="26">x</text>
 <text x="{X0+14}" y="46" font-size="26">y</text>
 {q}
</g></svg>"""
