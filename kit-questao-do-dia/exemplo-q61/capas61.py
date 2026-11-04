import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[2])
import capa_gen, capas_variantes, figura61b
OURO = capa_gen.CORES["mat"]
SVG = figura61b.svg("limpo", pergunta=True)   # desenho refeito: maior, traço grosso
v = "master.mov"
capa_gen.quadro_rosto("fr/k3.75.mp4", 0, "fr/foto_q.jpg", w=1080, h=1920)
capa_gen.quadro_rosto("fr/k2.75.mp4", 0, "fr/foto_r.jpg", w=1080, h=1920)
# rodízio: 60 terminou em rosto grande -> dividida (questão) -> rosto grande (resolução)
capas_variantes.dividida("fr/foto_q.jpg", "QUESTÃO DO DIA", "#61",
    "Quantos caminhos<br>de <em>X a Z</em>?", OURO, "out/capa-61-questao.png", SVG, obj=(520, 540, 700))
capa_gen.reacao("fr/foto_r.jpg", "RESOLUÇÃO DO DIA", "#61",
    "Multiplique e<br><em>some</em>", OURO, "out/capa-61-resolucao.png", banda=240, h=1920)
open("out/figura61.svg", "w").write(SVG)
