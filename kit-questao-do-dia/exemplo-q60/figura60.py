# quadrado inscrito em outro (lado 8), fora de escala; a área A mínima vira "?"
OURO = "#F2B233"; CORAL = "#F2685A"
L, T, S, X = 150, 64, 300, 92            # canto sup. esq., lado e o "x" desenhado (fora de escala)
R, B = L + S, T + S
def cota(x1, y1, x2, y2, txt, tx, ty, anc="middle"):
    h = x1 == x2
    tk = (f'<line x1="{x1-8}" y1="{y1}" x2="{x1+8}" y2="{y1}"/><line x1="{x2-8}" y1="{y2}" x2="{x2+8}" y2="{y2}"/>' if h
          else f'<line x1="{x1}" y1="{y1-8}" x2="{x1}" y2="{y1+8}"/><line x1="{x2}" y1="{y2-8}" x2="{x2}" y2="{y2+8}"/>')
    return (f'<g stroke="#fff" stroke-width="2.5"><line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"/>{tk}</g>'
            f'<text x="{tx}" y="{ty}" font-size="28" text-anchor="{anc}">{txt}</text>')
def svg(pergunta=True):
    q = (f'<rect x="130" y="444" width="340" height="96" rx="14" fill="rgba(0,0,0,.25)" stroke="{CORAL}" '
         f'stroke-width="3" stroke-dasharray="12 9"/><text x="300" y="508" font-size="44" text-anchor="middle">'
         f'A<tspan font-size="28" dy="8">mín</tspan><tspan dy="-8"> = </tspan><tspan fill="{CORAL}">?</tspan></text>') if pergunta else ""
    vh = 560 if pergunta else 434
    ins = f"{R-X},{T} {R},{B-X} {L+X},{B} {L},{T+X}"
    return f"""<svg viewBox="0 0 560 {vh}" xmlns="http://www.w3.org/2000/svg">
<g font-family="MontserratBold" fill="#fff">
 <rect x="{L}" y="{T}" width="{S}" height="{S}" fill="none" stroke="#fff" stroke-width="3"/>
 <polygon points="{ins}" fill="{OURO}" fill-opacity=".28" stroke="{CORAL}" stroke-width="3.5" stroke-linejoin="round"/>
 <text x="{L+S/2}" y="{T+S/2+16}" font-size="46" text-anchor="middle">A</text>
 {cota(L-36, T, L-36, T+X, "x", L-50, T+X/2+10, "end")}
 {cota(L-36, T+X, L-36, B, "8 − x", L-50, (T+X+B)/2+10, "end")}
 {cota(R-X, T-22, R, T-22, "x", R-X/2, T-32)}
 {cota(R+30, B-X, R+30, B, "x", R+46, B-X/2+10, "start")}
 {cota(L, B+28, L+X, B+28, "x", L+X/2, B+64)}
 {q}
</g></svg>"""
