#!/usr/bin/env python3
"""Figura da questão 50 (FUVEST): triângulo retângulo cortado por duas retas
paralelas t e s, com os ângulos 140°, 120° e x marcados."""
import math

OURO, CORAL = "#F2B233", "#F2685A"

B = (72.0, 42.0)      # vértice do ângulo x
A = (72.0, 168.0)     # ângulo reto
C = (238.0, 168.0)    # onde passa a reta s
D = (138.0, 168.0)    # onde a reta t corta a base
ANG = 40.0            # inclinação das paralelas (180 - 140)

def _pt(c, r, a):
    return (c[0] + r * math.cos(math.radians(a)), c[1] - r * math.sin(math.radians(a)))

def _arco(c, r, a1, a2, cor, larg=2.6):
    p1, p2 = _pt(c, r, a1), _pt(c, r, a2)
    grande = 1 if abs(a2 - a1) > 180 else 0
    return (f'<path d="M {p1[0]:.1f},{p1[1]:.1f} A {r},{r} 0 {grande} 0 '
            f'{p2[0]:.1f},{p2[1]:.1f}" fill="none" stroke="{cor}" '
            f'stroke-width="{larg}" stroke-linecap="round"/>')

def _reta(ponto, atras, frente):
    d = (math.cos(math.radians(ANG)), -math.sin(math.radians(ANG)))
    p1 = (ponto[0] - atras * d[0], ponto[1] - atras * d[1])
    p2 = (ponto[0] + frente * d[0], ponto[1] + frente * d[1])
    return (f'<line x1="{p1[0]:.1f}" y1="{p1[1]:.1f}" x2="{p2[0]:.1f}" '
            f'y2="{p2[1]:.1f}" stroke="{OURO}" stroke-width="2.6" '
            f'stroke-linecap="round"/>')

# ângulos dos raios, em graus matemáticos (y para cima)
A_BC = math.degrees(math.atan2(B[1] - C[1], C[0] - B[0]))        # B->C, descendo
A_CB = 180 + A_BC                                                 # C->B, subindo

SVG = f"""<svg viewBox="0 0 342 264" xmlns="http://www.w3.org/2000/svg">
  {_reta(D, 100, 120)}
  {_reta(C, 100, 92)}
  <g fill="none" stroke="#fff" stroke-width="2.9" stroke-linejoin="round"
     stroke-linecap="round">
    <polygon points="{B[0]},{B[1]} {C[0]},{C[1]} {A[0]},{A[1]}"/>
  </g>
  <path d="M {A[0]},{A[1]-16} L {A[0]+16},{A[1]-16} L {A[0]+16},{A[1]}"
        fill="none" stroke="#fff" stroke-width="2.2"/>
  <circle cx="{A[0]+8}" cy="{A[1]-8}" r="1.8" fill="#fff"/>
  {_arco(B, 30, 270, 270 + (90 + A_BC), CORAL)}
  {_arco(D, 30, ANG, 180, CORAL)}
  {_arco(C, 35, ANG, A_CB, CORAL)}
  <g font-family="MontserratBold" font-weight="700" fill="#fff">
    <text x="96" y="90" font-size="19">x</text>
    <text x="128" y="212" text-anchor="middle" font-size="18">140°</text>
    <text x="249" y="120" text-anchor="middle" font-size="18">120°</text>
  </g>
  <g font-family="MontserratBold" font-weight="700" fill="{OURO}" font-size="19">
    <text x="52" y="252">t</text>
    <text x="152" y="252">s</text>
  </g>
</svg>"""
