import sys; sys.path.insert(0, sys.argv[1])
import card_escala
# frações empilhadas inline; a sombra vem por drop-shadow porque text-shadow não pega a barra
FR = ('<span style="display:inline-flex;flex-direction:column;align-items:stretch;text-align:center;'
      'vertical-align:middle;font-size:.82em;line-height:1.12;margin:0 .1em;'
      'filter:drop-shadow(0 3px 6px rgba(0,0,0,.9))">'
      '<span style="border-bottom:4px solid #fff;padding:0 .14em .06em">{}</span>'
      '<span style="padding:.06em .14em 0">{}</span></span>')
fr = lambda n, d: FR.format(n, d)
x2 = 'x<sup style="font-size:.6em">2</sup>'
enun = [f"(UFMG) Seja f(x) = {fr('1', x2 + ' + 1')}.",
        "Se x ≠ 0, uma expressão",
        f"para f({fr('1','x')}) é:"]
alts = [f"A) {x2} + 1",
        f"B) {fr(x2 + ' + 1', x2)}",
        f"C) {fr('1', x2 + ' + 1')}",
        f"D) {fr(x2, x2 + ' + 1')}"]
out, caixa = card_escala.card(enun, alts, "Marque sua resposta", sys.argv[2],
                              topo_bloco=600, topo_rodape=1600, espaco_alts=70)
print(caixa)
