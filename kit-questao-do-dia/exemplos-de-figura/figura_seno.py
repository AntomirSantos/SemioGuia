#!/usr/bin/env python3
"""Figura da questão 51 (FUVEST): parte do gráfico de uma senoide de
amplitude 2 que zera em 0, 2π e 4π."""
import math

CORAL, OURO = "#F2685A", "#F2B233"

OX, OY = 46.0, 112.0        # origem
EX, EY = 22.6, 36.0         # px por unidade em x e em y
X4PI = OX + 4 * math.pi * EX

def _curva(n=260):
    pts = []
    for i in range(n + 1):
        t = 4 * math.pi * i / n
        pts.append(f"{OX + t*EX:.2f},{OY - 2*math.sin(t/2)*EY:.2f}")
    return "M " + " L ".join(pts)

X2PI = OX + 2 * math.pi * EX

SVG = f"""<svg viewBox="0 0 364 224" xmlns="http://www.w3.org/2000/svg">
<defs>
  <marker id="pt" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5"
          orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#fff"/></marker>
</defs>
<g stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round">
  <line x1="24" y1="{OY}" x2="348" y2="{OY}" marker-end="url(#pt)"/>
  <line x1="{OX}" y1="206" x2="{OX}" y2="17" marker-end="url(#pt)"/>
  <line x1="{OX-7}" y1="{OY-2*EY}" x2="{OX+7}" y2="{OY-2*EY}"/>
  <line x1="{OX-7}" y1="{OY+2*EY}" x2="{OX+7}" y2="{OY+2*EY}"/>
</g>
<path d="{_curva()}" fill="none" stroke="{CORAL}" stroke-width="4.2"
      stroke-linecap="round" stroke-linejoin="round"/>
<g fill="#fff">
  <circle cx="{OX}" cy="{OY}" r="4"/>
  <circle cx="{X2PI:.2f}" cy="{OY}" r="4"/>
  <circle cx="{X4PI:.2f}" cy="{OY}" r="4"/>
</g>
<g font-family="MontserratBold" font-weight="700" font-size="17" fill="#fff">
  <text x="{OX-13}" y="{OY-2*EY+6}" text-anchor="end">2</text>
  <text x="{OX-13}" y="{OY+2*EY+6}" text-anchor="end">-2</text>
  <text x="{OX-11}" y="{OY+22}" text-anchor="end">O</text>
  <text x="{X2PI:.2f}" y="{OY-13}" text-anchor="middle">2&#960;</text>
  <text x="{X4PI:.2f}" y="{OY-13}" text-anchor="middle">4&#960;</text>
  <text x="344" y="{OY+26}" text-anchor="end">x</text>
  <text x="{OX-13}" y="27" text-anchor="end">y</text>
</g>
</svg>"""
