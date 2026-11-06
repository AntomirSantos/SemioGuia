import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[3])
import card_escala, figura62
c3 = 'x<sup style="font-size:.6em">3</sup>'
enun = ["(UFMG) Na figura estão o ponto <b>A</b>, cuja",
        "abscissa é 1, e o ponto <b>B</b>, cuja ordenada",
        "é 5. Esses pontos pertencem ao gráfico",
        f"de f(x) = (x + 1)({c3} + ax + b), em que",
        "a e b são reais. Assim, o valor de f(4) é:"]
alts = ["A) 65", "B) 115", "C) 170", "D) 225"]
out, caixa = card_escala.card(enun, alts, "Marque sua resposta", sys.argv[2],
                              topo_bloco=800, topo_rodape=1650, espaco_alts=40, tam_enun=42, tam_alt=52,
                              desenho=(400, 500, 345, figura62.svg(pergunta=False)))
print(caixa)
