# duas versões do diagrama para a capa: "limpo" (todas as setas, traço grosso) e "contagem" (1 seta + nº de ligações)
import math
OURO = "#F2B233"; CORAL = "#F2685A"
N = {"X": (48, 200), "R": (205, 52), "Y": (330, 200), "S": (205, 348), "Z": (492, 200)}
RN = 30
AR = [("X", "R", 3), ("R", "Y", 3), ("X", "Y", 1), ("Y", "Z", 2), ("X", "S", 3), ("S", "Y", 2), ("S", "Z", 2), ("R", "Z", 1)]
CURVA = {("R", "Z"): 70, ("S", "Z"): -70}      # arcos por fora
def borda(p, q, d):
    dx, dy = q[0]-p[0], q[1]-p[1]; L = math.hypot(dx, dy); return p[0]+dx/L*d, p[1]+dy/L*d
def seta(s, c, e, w, ah):
    m = (0.25*s[0]+0.5*c[0]+0.25*e[0], 0.25*s[1]+0.5*c[1]+0.25*e[1])
    tx, ty = (e[0]-s[0]), (e[1]-s[1]); tl = math.hypot(tx, ty); tx, ty = tx/tl, ty/tl
    h = [(m[0]+tx*ah, m[1]+ty*ah), (m[0]-tx*ah*.8+ty*ah*.8, m[1]-ty*ah*.8-tx*ah*.8), (m[0]-tx*ah*.8-ty*ah*.8, m[1]-ty*ah*.8+tx*ah*.8)]
    return (f'<path d="M{s[0]:.1f},{s[1]:.1f} Q{c[0]:.1f},{c[1]:.1f} {e[0]:.1f},{e[1]:.1f}" fill="none" stroke="#fff" stroke-width="{w}" stroke-linecap="round"/>'
            f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in h)}" fill="#fff"/>'), m
def ligacoes(a, b, k, sep, w, ah, badge=False):
    p, q = N[a], N[b]; s, e = borda(p, q, RN+2), borda(q, p, RN+2)
    dx, dy = e[0]-s[0], e[1]-s[1]; L = math.hypot(dx, dy); nx, ny = -dy/L, dx/L
    base = CURVA.get((a, b), 0); out = ""
    ks = [0] if badge else [(i-(k-1)/2)*sep for i in range(k)]
    for o in ks:
        o2 = base*-1 + o*2
        c = ((s[0]+e[0])/2 + nx*o2, (s[1]+e[1])/2 + ny*o2)
        if base: s2, e2 = borda(p, c, RN+2), borda(q, c, RN+2); c = ((s2[0]+e2[0])/2+nx*o2*1.4, (s2[1]+e2[1])/2+ny*o2*1.4)
        else: s2, e2 = s, e
        g, m = seta(s2, c, e2, w, ah); out += g
    if badge:
        out += (f'<circle cx="{m[0]:.1f}" cy="{m[1]:.1f}" r="21" fill="#0A1728" stroke="{CORAL}" stroke-width="3"/>'
                f'<text x="{m[0]:.1f}" y="{m[1]+9:.1f}" font-size="26" text-anchor="middle" fill="#fff">{k}</text>')
    return out
def svg(versao="limpo", pergunta=True):
    badge = versao == "contagem"
    corpo = "".join(ligacoes(a, b, k, 30, 3.6 if not badge else 4.2, 13 if not badge else 15, badge) for a, b, k in AR)
    nos = "".join(f'<circle cx="{x}" cy="{y}" r="{RN}" fill="{OURO}" stroke="#fff" stroke-width="3"/>'
                  f'<text x="{x}" y="{y+11}" font-size="32" text-anchor="middle" fill="#14161f">{n}</text>' for n, (x, y) in N.items())
    q = (f'<rect x="85" y="430" width="370" height="100" rx="16" fill="rgba(0,0,0,.3)" stroke="{CORAL}" stroke-width="3.5" '
         f'stroke-dasharray="13 9"/><text x="270" y="497" font-size="46" text-anchor="middle">de X até Z: <tspan fill="{CORAL}">?</tspan></text>') if pergunta else ""
    return (f'<svg viewBox="0 -20 540 {560 if pergunta else 410}" xmlns="http://www.w3.org/2000/svg"><g font-family="MontserratBold" fill="#fff">'
            + corpo + nos + q + "</g></svg>")
