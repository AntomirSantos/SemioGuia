import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[2])
import capa_gen, capas_variantes, figura58
OURO = capa_gen.CORES["mat"]
SVG = figura58.svg(pergunta=True)
v = "master.mov"
capa_gen.quadro_rosto(v, 0.5, "fr/foto_q.jpg", w=1080, h=1920)
capa_gen.quadro_rosto(v, 3.0, "fr/foto_r.jpg", w=1080, h=1920)
# rodízio: 57 foi dividida -> rosto grande; aqui dividida -> rosto grande de novo, sem dois iguais
# seguidos (o "objeto central" punha o desenho em cima do rosto)
capas_variantes.dividida("fr/foto_q.jpg", "QUESTÃO DO DIA", "#58",
    "Quanto vale<br><em>a<sup>b</sup></em>?", OURO, "out/capa-58-questao.png", SVG)
capa_gen.reacao("fr/foto_r.jpg", "RESOLUÇÃO DO DIA", "#58",
    "Leia os pontos<br>do <em>gráfico</em>", OURO, "out/capa-58-resolucao.png", banda=240, h=1920)
open("out/figura58.svg", "w").write(SVG)
