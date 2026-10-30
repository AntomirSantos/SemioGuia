#!/usr/bin/env python3
"""Figura da questão 52 (FUVEST): energia potencial elétrica U = 9/r."""
CORAL, GRADE = "#F2685A", "#5E86B8"

X0, X1 = 74.0, 334.0      # r = 0 .. 12
Y0, Y1 = 34.0, 234.0      # U = 6 .. 0
SX = (X1 - X0) / 12.0
SY = (Y1 - Y0) / 6.0

def px(r): return X0 + r * SX
def py(u): return Y1 - u * SY

def _curva(n=200):
    r0, r1 = 9.0 / 6.0, 12.0          # começa onde U = 6
    pts = [f"{px(r0 + (r1-r0)*i/n):.2f},{py(9.0/(r0 + (r1-r0)*i/n)):.2f}"
           for i in range(n + 1)]
    return "M " + " L ".join(pts)

_vgrid = "".join(f'<line x1="{px(r):.1f}" y1="{Y0}" x2="{px(r):.1f}" y2="{Y1}"/>'
                 for r in (2, 4, 6, 8, 10))
_hgrid = "".join(f'<line x1="{X0}" y1="{py(u):.1f}" x2="{X1}" y2="{py(u):.1f}"/>'
                 for u in (1, 2, 3, 4, 5))
_xlab = "".join(f'<text x="{px(r):.1f}" y="{Y1+22}" text-anchor="middle">{r}</text>'
                for r in (0, 2, 4, 6, 8, 10, 12))
_ylab = "".join(f'<text x="{X0-12}" y="{py(u)+6:.1f}" text-anchor="end">{u}</text>'
                for u in (0, 2, 4, 6))

SVG = f"""<svg viewBox="0 0 364 290" xmlns="http://www.w3.org/2000/svg">
<g stroke="{GRADE}" stroke-width="1.4" opacity=".75">{_vgrid}{_hgrid}</g>
<rect x="{X0}" y="{Y0}" width="{X1-X0}" height="{Y1-Y0}" fill="none"
      stroke="#fff" stroke-width="2.6"/>
<path d="{_curva()}" fill="none" stroke="{CORAL}" stroke-width="4"
      stroke-linecap="round" stroke-linejoin="round"/>
<g font-family="MontserratBold" font-weight="700" font-size="16" fill="#fff">
  {_xlab}{_ylab}
  <text x="{(X0+X1)/2:.1f}" y="{Y1+56}" text-anchor="middle">r (10<tspan
      baseline-shift="super" font-size="11">-10</tspan> m)</text>
  <text x="26" y="{(Y0+Y1)/2:.1f}" text-anchor="middle"
        transform="rotate(-90 26 {(Y0+Y1)/2:.1f})">U (10<tspan
      baseline-shift="super" font-size="11">-18</tspan> J)</text>
</g>
</svg>"""
