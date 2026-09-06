# Fundo dos cards do Instagram: desenho a grafite sobre papel claro.
# Gera SVG procedural (traço a lápis com tremor, hachuras, linhas de
# construção). Uso: python3 fundo.py <cena: diapasao|manometro> <W> <H> <saida.svg>
import sys
import numpy as np

cena = sys.argv[1]
W, H = int(sys.argv[2]), int(sys.argv[3])
saida = sys.argv[4]
rng = np.random.default_rng(7)

GRAFITE = '#3a3a3a'
CONSTR = '#6b6b6b'
s = min(W, H) / 1080.0
partes = []
clips = []


def rot(pts, ang_deg, centro):
    a = np.deg2rad(ang_deg)
    R = np.array([[np.cos(a), -np.sin(a)], [np.sin(a), np.cos(a)]])
    return (np.asarray(pts, float) - centro) @ R.T + centro


def polyline(pts, fechado=False):
    d = 'M ' + ' L '.join(f'{x:.1f} {y:.1f}' for x, y in pts)
    return d + (' Z' if fechado else '')


def traco(d, w=1.4, op=0.8, cor=GRAFITE, extra=''):
    partes.append(f'<path d="{d}" fill="none" stroke="{cor}" stroke-width="{w*s:.2f}" stroke-opacity="{op}" stroke-linecap="round" stroke-linejoin="round" {extra}/>')


def contorno(pts, fechado=True, w=1.6, op=0.85):
    # dois passes: um firme e um rascunho leve deslocado (caderno de anatomia)
    traco(polyline(pts, fechado), w=w, op=op)
    jit = rng.normal(0, 1.6 * s, size=np.asarray(pts).shape)
    traco(polyline(np.asarray(pts) + jit, fechado), w=w * 0.5, op=op * 0.4)


def construcao(d, op=0.26, tracejado=True):
    extra = 'stroke-dasharray="4 7"' if tracejado else ''
    traco(d, w=0.7, op=op, cor=CONSTR, extra=extra)


def hachura_poligono(pts, ang_deg=-38, passo=6.5, op=0.32, w=0.85, densidade=1.0, nome=None):
    # hachuras paralelas recortadas pelo polígono (clipPath)
    nome = nome or f'c{len(clips)}'
    pts = np.asarray(pts)
    clips.append(f'<clipPath id="{nome}"><path d="{polyline(pts, True)}"/></clipPath>')
    cx, cy = pts.mean(axis=0)
    rmax = np.linalg.norm(pts - [cx, cy], axis=1).max() * 1.2
    a = np.deg2rad(ang_deg)
    u = np.array([np.cos(a), np.sin(a)])
    n = np.array([-u[1], u[0]])
    linhas = []
    k = -rmax
    while k < rmax:
        if rng.random() < densidade:
            c = np.array([cx, cy]) + n * k
            p0, p1 = c - u * rmax, c + u * rmax
            linhas.append(f'<path d="{polyline([p0, p1])}" stroke-width="{w*s*rng.uniform(0.8,1.15):.2f}" stroke-opacity="{op*rng.uniform(0.7,1.0):.2f}"/>')
        k += passo * s
    partes.append(f'<g clip-path="url(#{nome})" stroke="{GRAFITE}" fill="none" stroke-linecap="round">' + ''.join(linhas) + '</g>')


def elipse(cx, cy, rx, ry, ang=0, w=1.4, op=0.8, cor=GRAFITE, extra=''):
    partes.append(f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" transform="rotate({ang} {cx:.1f} {cy:.1f})" fill="none" stroke="{cor}" stroke-width="{w*s:.2f}" stroke-opacity="{op}" {extra}/>')


def retangulo_arredondado(x, y, w, h, r, n=8):
    # polígono com cantos arredondados (coordenadas locais)
    pts = []
    cantos = [(x + w - r, y + r, -90, 0), (x + w - r, y + h - r, 0, 90), (x + r, y + h - r, 90, 180), (x + r, y + r, 180, 270)]
    for cx, cy, a0, a1 in cantos:
        for a in np.linspace(np.deg2rad(a0), np.deg2rad(a1), n):
            pts.append((cx + r * np.cos(a), cy + r * np.sin(a)))
    return np.array(pts)


# origem do desenho: terço inferior direito, muito vazio em cima
ox, oy = W * 0.56, H * 0.60


def P(x, y):
    return np.array([ox + x * s, oy + y * s])


def PP(lista):
    return np.array([P(x, y) for x, y in lista])


if cena == 'diapasao':
    # ---------- martelo de reflexos (Taylor), atrás, na diagonal ----------
    # referencial próprio: ápice da cabeça na origem local, base larga para
    # cima, cabo descendo a partir do colar; tudo girado em torno da origem.
    ang_m = -34
    om = P(-60, 150)

    def M(x, y):
        return rot(np.array([P(-60 + x, 150 + y)]), ang_m, om)[0]

    def MM(lista):
        return np.array([M(x, y) for x, y in lista])

    cabeca = MM([(-78, -150), (78, -150), (62, -132), (10, -22), (-10, -22), (-62, -132)])
    colar = MM([(-13, -22), (13, -22), (13, 6), (-13, 6)])
    cabo = retangulo_arredondado(-8, 6, 16, 290, 6)
    cabo = MM([(x, y) for x, y in cabo])
    construcao(polyline(MM([(0, -190), (0, 330)])), op=0.3)          # eixo
    construcao(polyline(MM([(-105, -150), (105, -150)])), op=0.26)     # base da cabeça
    construcao(polyline(MM([(-78, -150), (0, -22)])), op=0.2)          # geratrizes
    construcao(polyline(MM([(78, -150), (0, -22)])), op=0.2)
    hachura_poligono(cabeca, ang_deg=-38 + ang_m, passo=5.5, op=0.30)
    contorno(cabeca)
    contorno(colar, w=1.2, op=0.8)
    hachura_poligono(cabo, ang_deg=62 + ang_m, passo=7, op=0.22, densidade=0.9)
    contorno(cabo, w=1.4)

    # ---------- diapasão (à frente, quase vertical) ----------
    ang_d = 12
    cd = P(150, 40)
    haste = retangulo_arredondado(-7, 120, 14, 150, 5)
    haste = rot(np.array([P(x, y) for x, y in haste]), ang_d, cd)
    bola = rot(PP([(0, 280)]), ang_d, cd)[0]
    # jugo em U e hastes vibrantes
    esq = retangulo_arredondado(-30, -220, 13, 320, 4)
    dir_ = retangulo_arredondado(17, -220, 13, 320, 4)
    esq = rot(np.array([P(x, y) for x, y in esq]), ang_d, cd)
    dir_ = rot(np.array([P(x, y) for x, y in dir_]), ang_d, cd)
    jugo = rot(PP([(-30, 100), (30, 100), (30, 124), (-30, 124)]), ang_d, cd)
    # construção: eixo central, retas das pontas, círculo do jugo
    construcao(polyline(rot(PP([(0, -260), (0, 300)]), ang_d, cd)), op=0.3)
    construcao(polyline(rot(PP([(-80, -220), (80, -220)]), ang_d, cd)), op=0.26)
    c_j = rot(PP([(0, 112)]), ang_d, cd)[0]
    partes.append(f'<circle cx="{c_j[0]:.1f}" cy="{c_j[1]:.1f}" r="{44*s:.1f}" fill="none" stroke="{CONSTR}" stroke-width="{0.7*s:.2f}" stroke-opacity="0.26" stroke-dasharray="4 7"/>')
    # hachuras metálicas: leves, num lado só
    for poly in (esq, dir_, haste):
        hachura_poligono(poly, ang_deg=70 + ang_d, passo=6.5, op=0.20, densidade=0.85)
    contorno(esq, w=1.5)
    contorno(dir_, w=1.5)
    contorno(jugo, w=1.5)
    contorno(haste, w=1.4)
    partes.append(f'<circle cx="{bola[0]:.1f}" cy="{bola[1]:.1f}" r="{16*s:.1f}" fill="none" stroke="{GRAFITE}" stroke-width="{1.5*s:.2f}" stroke-opacity="0.85"/>')
    partes.append(f'<circle cx="{bola[0]+3*s:.1f}" cy="{bola[1]+3*s:.1f}" r="{15*s:.1f}" fill="none" stroke="{GRAFITE}" stroke-width="{0.7*s:.2f}" stroke-opacity="0.35"/>')
    # ondas de vibração nas pontas (arcos finos, o toque de semiologia)
    for lado, x0 in ((-1, -38), (1, 38)):
        for k in range(3):
            r_ = (22 + k * 12) * s
            c = rot(PP([(x0, -190)]), ang_d, cd)[0]
            a0 = 150 if lado < 0 else -30
            pts = [(c[0] + r_ * np.cos(np.deg2rad(a)), c[1] + r_ * np.sin(np.deg2rad(a))) for a in np.linspace(a0 - 28, a0 + 28, 14)]
            traco(polyline(pts), w=0.8, op=0.42 - k * 0.1)

elif cena == 'manometro':
    # ---------- manômetro aneroide ----------
    c = P(80, -40)
    R = 150 * s
    partes.append(f'<circle cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="{R*1.18:.1f}" fill="none" stroke="{CONSTR}" stroke-width="{0.7*s:.2f}" stroke-opacity="0.26" stroke-dasharray="4 7"/>')
    construcao(polyline([c - [R * 1.35, 0], c + [R * 1.35, 0]]), op=0.28, tracejado=False)
    construcao(polyline([c - [0, R * 1.35], c + [0, R * 1.35]]), op=0.28, tracejado=False)
    # aro duplo (caixa metálica)
    for rr, ww, oo in ((R, 1.9, 0.88), (R * 0.985, 0.8, 0.45), (R * 0.90, 1.2, 0.7), (R * 0.86, 0.7, 0.4)):
        partes.append(f'<circle cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="{rr:.1f}" fill="none" stroke="{GRAFITE}" stroke-width="{ww*s:.2f}" stroke-opacity="{oo}"/>')
    # sombra do aro (hachura em coroa, lado inferior esquerdo)
    for k in range(26):
        ang = np.deg2rad(95 + k * 4.2)
        ri, ro = R * 0.905, R * 0.995
        traco(polyline([(c[0] + np.cos(ang) * ri, c[1] + np.sin(ang) * ri), (c[0] + np.cos(ang) * ro, c[1] + np.sin(ang) * ro)]), w=0.9, op=0.38 * rng.uniform(0.7, 1))
    # escala: 300 graus, ticks sem números (a cada 10 mmHg, maiores a cada 50)
    a_ini, a_fim = 120, 420  # graus, sentido horário a partir de 3h
    for i in range(0, 31):
        ang = np.deg2rad(a_ini + i * 10)
        grande = (i % 5 == 0)
        ri = R * (0.70 if grande else 0.76)
        ro = R * 0.82
        traco(polyline([(c[0] + np.cos(ang) * ri, c[1] + np.sin(ang) * ri), (c[0] + np.cos(ang) * ro, c[1] + np.sin(ang) * ro)]), w=1.3 if grande else 0.8, op=0.8 if grande else 0.55)
    # arco da escala
    arco = [(c[0] + R * 0.82 * np.cos(np.deg2rad(a)), c[1] + R * 0.82 * np.sin(np.deg2rad(a))) for a in np.linspace(a_ini, a_fim, 90)]
    traco(polyline(arco), w=1.0, op=0.7)
    # agulha apontando ~ 120 mmHg (posição 12 de 30) e eixo
    ang_ag = np.deg2rad(a_ini + 12 * 10)
    ponta = np.array([c[0] + np.cos(ang_ag) * R * 0.74, c[1] + np.sin(ang_ag) * R * 0.74])
    cauda = np.array([c[0] - np.cos(ang_ag) * R * 0.16, c[1] - np.sin(ang_ag) * R * 0.16])
    nrm = np.array([-np.sin(ang_ag), np.cos(ang_ag)])
    agulha = np.array([ponta, cauda + nrm * 5 * s, cauda - nrm * 5 * s])
    hachura_poligono(agulha, ang_deg=-38, passo=3.5, op=0.45, w=0.7)
    contorno(agulha, w=1.3)
    partes.append(f'<circle cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="{9*s:.1f}" fill="none" stroke="{GRAFITE}" stroke-width="{1.4*s:.2f}" stroke-opacity="0.85"/>')
    # sombreamento suave do vidro: hachura diagonal rala, numa lua do quadrante inferior direito
    lua = [(c[0] + R * 0.85 * np.cos(np.deg2rad(a)), c[1] + R * 0.85 * np.sin(np.deg2rad(a))) for a in np.linspace(10, 100, 30)]
    lua += [(c[0] + R * 0.55 * np.cos(np.deg2rad(a)), c[1] + R * 0.55 * np.sin(np.deg2rad(a))) for a in np.linspace(100, 10, 30)]
    hachura_poligono(np.array(lua), ang_deg=-38, passo=8, op=0.16, w=0.7)
    # bocal inferior e tubo até a pera (embaixo, à esquerda)
    bocal = PP([(66, 112), (94, 112), (90, 150), (70, 150)])
    contorno(bocal, w=1.4)
    t = np.linspace(0, 1, 140)[:, None]
    p0, p1, p2, p3 = P(80, 150), P(80, 300), P(-60, 260), P(-150, 380)
    tubo = ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3
    d = np.gradient(tubo, axis=0); n = np.stack([-d[:, 1], d[:, 0]], 1); n /= np.linalg.norm(n, axis=1, keepdims=True)
    wt = 7 * s
    construcao(polyline(tubo[::3]), op=0.22)
    traco(polyline(tubo + n * wt), w=1.6, op=0.85)
    traco(polyline(tubo - n * wt), w=1.1, op=0.65)
    for i in range(0, len(tubo), 6):
        p = tubo[i]; nn = n[i]
        traco(polyline([p + nn * wt * 0.3, p + nn * wt * 0.95]), w=0.8, op=0.35 * rng.uniform(0.7, 1))
    # pera (bulbo) com válvula
    cp = P(-190, 420)
    elipse(cp[0], cp[1], 46 * s, 62 * s, ang=-40, w=1.7, op=0.85)
    elipse(cp[0] + 2 * s, cp[1] + 2 * s, 45 * s, 61 * s, ang=-40, w=0.7, op=0.35)
    # hachura da pera: polígono aproximado da elipse (metade sombreada)
    ell = np.array([(cp[0] + 46 * s * np.cos(a), cp[1] + 62 * s * np.sin(a)) for a in np.linspace(0, 2 * np.pi, 60)])
    ell = rot(ell, -40, cp)
    hachura_poligono(ell, ang_deg=-38, passo=6, op=0.26)
    valv = rot(PP([(-236, 392), (-262, 372), (-256, 364), (-230, 384)]), 0, cp)
    contorno(valv, w=1.2)
    construcao(polyline([P(-150, 380), P(-230, 460)]), op=0.24)  # eixo da pera
else:
    raise SystemExit('cena desconhecida')

# marcas de caderno: régua de medida sem números, canto inferior esquerdo
tk = P(-420, 470)
traco(polyline([tk, tk + np.array([150 * s, 0])]), w=0.7, op=0.3, cor=CONSTR)
for i in range(0, 151, 30):
    q = tk + np.array([i * s, 0])
    traco(polyline([q + np.array([0, -5 * s]), q + np.array([0, 5 * s])]), w=0.7, op=0.3, cor=CONSTR)

desenho = '\n'.join(partes)
defs_clips = '\n'.join(clips)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <defs>
    {defs_clips}
    <filter id="papel" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.96  0 0 0 0 0.95  0 0 0 0 0.93  0 0 0 0.11 0" result="grao"/>
      <feBlend in="SourceGraphic" in2="grao" mode="multiply"/>
    </filter>
    <filter id="lapis" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="11" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="{2.2*s:.2f}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="5" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0.45" result="ga"/>
      <feComposite in="d" in2="ga" operator="in"/>
    </filter>
    <radialGradient id="vinheta" cx="50%" cy="45%" r="75%">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="1" stop-color="#D9D4CB" stop-opacity="0.35"/>
    </radialGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="#F4F2EE"/>
  <rect width="{W}" height="{H}" fill="#F4F2EE" filter="url(#papel)"/>
  <rect width="{W}" height="{H}" fill="url(#vinheta)"/>
  <g filter="url(#lapis)">
{desenho}
  </g>
</svg>'''
open(saida, 'w').write(svg)
print('svg', cena, W, H, '->', saida)
