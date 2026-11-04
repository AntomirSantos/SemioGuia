# diagrama X, R, Y, S, Z com as ligações da questão (multiplicidade de cada seta); X->Z vira "?"
import math
OURO = "#F2B233"; CORAL = "#F2685A"
N = {"X": (60, 200), "R": (190, 70), "Y": (310, 200), "S": (190, 330), "Z": (450, 200)}
AR = [("X", "R", 3), ("R", "Y", 3), ("X", "Y", 1), ("Y", "Z", 2), ("X", "S", 3), ("S", "Y", 2), ("S", "Z", 2)]
RN = 26
def ponto(p, q, d):                      # sai da borda do nó
    dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy)
    return p[0] + dx / L * d, p[1] + dy / L * d
def setas(a, b, k, sep=26):
    p, q = N[a], N[b]; out = []
    dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy); nx, ny = -dy / L, dx / L
    for i in range(k):
        o = (i - (k - 1) / 2) * sep
        s = ponto(p, q, RN); e = ponto(q, p, RN)
        c = ((s[0] + e[0]) / 2 + nx * o * 2, (s[1] + e[1]) / 2 + ny * o * 2)
        m = (0.25 * s[0] + 0.5 * c[0] + 0.25 * e[0], 0.25 * s[1] + 0.5 * c[1] + 0.25 * e[1])
        tx, ty = e[0] - s[0], e[1] - s[1]; tl = math.hypot(tx, ty); tx, ty = tx / tl, ty / tl
        h = [(m[0] + tx * 9, m[1] + ty * 9), (m[0] - tx * 7 + ty * 7, m[1] - ty * 7 - tx * 7), (m[0] - tx * 7 - ty * 7, m[1] - ty * 7 + tx * 7)]
        out.append(f'<path d="M{s[0]:.1f},{s[1]:.1f} Q{c[0]:.1f},{c[1]:.1f} {e[0]:.1f},{e[1]:.1f}" fill="none" stroke="#fff" stroke-width="2.6"/>'
                   f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in h)}" fill="#fff"/>')
    return "".join(out)
def rz():                                 # R -> Z por cima, arco largo
    s = ponto(N["R"], (330, 10), RN); e = ponto(N["Z"], (400, 40), RN); c = (420, 0)
    m = (0.25 * s[0] + 0.5 * c[0] + 0.25 * e[0], 0.25 * s[1] + 0.5 * c[1] + 0.25 * e[1])
    tx, ty = c[0] - s[0], c[1] - s[1]; tl = math.hypot(tx, ty); tx, ty = (e[0]-s[0])/math.hypot(e[0]-s[0],e[1]-s[1]), (e[1]-s[1])/math.hypot(e[0]-s[0],e[1]-s[1])
    h = [(m[0] + tx * 9, m[1] + ty * 9), (m[0] - tx * 7 + ty * 7, m[1] - ty * 7 - tx * 7), (m[0] - tx * 7 - ty * 7, m[1] - ty * 7 + tx * 7)]
    return (f'<path d="M{s[0]:.1f},{s[1]:.1f} Q{c[0]},{c[1]} {e[0]:.1f},{e[1]:.1f}" fill="none" stroke="#fff" stroke-width="2.6"/>'
            f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in h)}" fill="#fff"/>')
def svg(pergunta=True):
    nos = "".join(f'<circle cx="{x}" cy="{y}" r="{RN}" fill="{OURO}" fill-opacity=".9" stroke="#fff" stroke-width="2.5"/>'
                  f'<text x="{x}" y="{y + 10}" font-size="28" text-anchor="middle" fill="#1b1b1b">{n}</text>' for n, (x, y) in N.items())
    q = (f'<rect x="100" y="388" width="320" height="96" rx="14" fill="rgba(0,0,0,.25)" stroke="{CORAL}" '
         f'stroke-width="3" stroke-dasharray="12 9"/><text x="260" y="452" font-size="40" text-anchor="middle">'
         f'X → Z = <tspan fill="{CORAL}">?</tspan></text>') if pergunta else ""
    vh = 500 if pergunta else 370
    return (f'<svg viewBox="0 -10 510 {vh}" xmlns="http://www.w3.org/2000/svg"><g font-family="MontserratBold" fill="#fff">'
            + "".join(setas(a, b, k) for a, b, k in AR) + rz() + nos + q + "</g></svg>")
