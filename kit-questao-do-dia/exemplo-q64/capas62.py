import sys; sys.path.insert(0, sys.argv[1]); sys.path.insert(0, sys.argv[2])
import capa_gen, capas_variantes, figura62
OURO = capa_gen.CORES["mat"]
SVG = figura62.svg(pergunta=True)
# quadros do 4K original, com a mesma correção de imagem (rosto nítido)
capa_gen.quadro_rosto("fr/k2.8.mp4", 0, "fr/foto_q.jpg", w=1080, h=1920)
capa_gen.quadro_rosto("fr/k3.75.mp4", 0, "fr/foto_r.jpg", w=1080, h=1920)
# rodízio: 61 terminou em rosto grande -> dividida (questão) -> rosto grande (resolução)
capas_variantes.dividida("fr/foto_q.jpg", "QUESTÃO DO DIA", "#64",
    "Quanto vale<br><em>f(4)</em>?", OURO, "out/capa-64-questao.png", SVG, obj=(520, 520, 700))
capa_gen.reacao("fr/foto_r.jpg", "RESOLUÇÃO DO DIA", "#64",
    "Ache a e b<br>pelos <em>pontos</em>", OURO, "out/capa-64-resolucao.png", banda=240, h=1920)
open("out/figura64.svg", "w").write(SVG)
