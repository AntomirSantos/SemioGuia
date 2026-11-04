import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[3])
import card_escala, figura61b
enun = ["(UFMG) Observe o diagrama.",
        "O número de ligações distintas",
        "entre <b>X</b> e <b>Z</b> é"]
alts = ["A) 41", "B) 45", "C) 35", "D) 39"]
out, caixa = card_escala.card(enun, alts, "Marque sua resposta", sys.argv[2],
                              topo_bloco=930, topo_rodape=1640, espaco_alts=44,
                              desenho=(416, 600, 456, figura61b.svg("limpo", pergunta=False)))
print(caixa)
