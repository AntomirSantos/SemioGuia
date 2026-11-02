import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[2])
import capa_gen, capas_variantes, figura60
OURO = capa_gen.CORES["mat"]
SVG = figura60.svg(pergunta=True)
v = "master.mov"
capa_gen.quadro_rosto(v, 2.25, "fr/foto_q.jpg", w=1080, h=1920)
capa_gen.quadro_rosto(v, 1.75, "fr/foto_r.jpg", w=1080, h=1920)
# rodízio: 58 terminou em rosto grande -> dividida (questão) -> rosto grande (resolução)
capas_variantes.dividida("fr/foto_q.jpg", "QUESTÃO DO DIA", "#60",
    "Qual a área<br><em>mínima</em>?", OURO, "out/capa-60-questao.png", SVG)
capa_gen.reacao("fr/foto_r.jpg", "RESOLUÇÃO DO DIA", "#60",
    "É o <em>y</em> do<br>vértice", OURO, "out/capa-60-resolucao.png", banda=240, h=1920)
open("out/figura60.svg", "w").write(SVG)
