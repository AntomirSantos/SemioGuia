#!/usr/bin/env python3
"""Figura da questão 54: triângulo retângulo com perímetro 6 m."""
OURO = "#F2B233"
A, B, C = (74.0, 44.0), (74.0, 184.0), (264.0, 184.0)   # ângulo reto em B

SVG = f"""<svg viewBox="0 0 338 232" xmlns="http://www.w3.org/2000/svg">
<polygon points="{A[0]},{A[1]} {C[0]},{C[1]} {B[0]},{B[1]}"
         fill="{OURO}" fill-opacity=".12" stroke="#fff" stroke-width="3"
         stroke-linejoin="round"/>
<path d="M {B[0]},{B[1]-18} L {B[0]+18},{B[1]-18} L {B[0]+18},{B[1]}"
      fill="none" stroke="#fff" stroke-width="2.2"/>
<circle cx="{B[0]+9}" cy="{B[1]-9}" r="2" fill="#fff"/>
<text x="169" y="218" text-anchor="middle" font-family="MontserratBlack"
      font-size="19" font-weight="900" fill="{OURO}">perímetro = 6 m</text>
</svg>"""
