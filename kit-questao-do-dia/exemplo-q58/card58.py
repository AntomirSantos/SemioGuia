import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[3])
import card_escala, figura58
FR = ('<span style="display:inline-flex;flex-direction:column;align-items:stretch;text-align:center;'
      'vertical-align:middle;font-size:.82em;line-height:1.12;margin:0 .1em;'
      'filter:drop-shadow(0 3px 6px rgba(0,0,0,.9))">'
      '<span style="border-bottom:4px solid #fff;padding:0 .14em .06em">{}</span>'
      '<span style="padding:.06em .14em 0">{}</span></span>')
fr = lambda n, d: FR.format(n, d)
ab = 'a<sup style="font-size:.6em">b</sup>'
r = lambda n: f'√<span style="display:inline-block;border-top:4px solid #fff;line-height:1;padding:3px 2px 0;margin-left:-2px">{n}</span>'
enun = ["(Mackenzie-SP) Se a curva dada é",
        f"o gráfico da função y = a + {fr('b','x')},",
        f"então o valor de {ab} é:"]
alts = [f"A) {fr('1','4')}", f"B) {r('3')}", "C) 2", "D) 4"]
svg = figura58.svg(pergunta=False)
out, caixa = card_escala.card(enun, alts, "Marque sua resposta", sys.argv[2],
                              topo_bloco=880, topo_rodape=1640, espaco_alts=44,
                              tam_enun=46, tam_alt=52,
                              desenho=(410, 540, 402, svg))
print(caixa)
