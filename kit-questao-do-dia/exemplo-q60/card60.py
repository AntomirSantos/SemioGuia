import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[3])
import card_escala, figura60
cm2 = 'cm<sup style="font-size:.6em">2</sup>'
enun = ["(PUC-Campinas-SP) Na figura, tem-se um",
        "quadrado inscrito em outro quadrado.",
        "Subtraindo-se da área do quadrado",
        "externo as áreas dos 4 triângulos,",
        "verifica-se que a área A do interno",
        "é função de x. O valor mínimo de A é"]
alts = [f"A) 16 {cm2}", f"B) 24 {cm2}", f"C) 28 {cm2}", f"D) 32 {cm2}"]
out, caixa = card_escala.card(enun, alts, "Marque sua resposta", sys.argv[2],
                              topo_bloco=790, topo_rodape=1650, espaco_alts=36,
                              tam_enun=44, tam_alt=50,
                              desenho=(394, 500, 388, figura60.svg(pergunta=False)))
print(caixa)
