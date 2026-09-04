# SemioGuia Fase 9, Cabeça e pescoço: Design

Data: 23/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Sistema novo **Cabeça e pescoço** com o capítulo "Exame de cabeça e
pescoço" (4 tópicos), no padrão editorial consolidado das Fases 5 a 7 e já
na leitura por seções da Fase 8. Sem casos novos. Elo entre a avaliação
geral e os exames por sistema.

## 2. Decisões do autor

1. Pacote de conteúdo aprovado em chat; capítulo recomendado aceito.
2. Todo conteúdo nasce `revisao: pendente`; regras editoriais das fases
   anteriores valem integralmente (originalidade com varredura
   pré-commit, âncoras, sem fármacos/doses, divergências atribuídas,
   quiz balanceado desde o rascunho, distratores plausíveis, checklists
   em nível básico).

## 3. Estrutura

### `sistemas.yaml` (reordenação crânio-caudal)

```yaml
- anamnese                    # ordem 1 (inalterado)
- exame-fisico-geral          # ordem 2 (inalterado)
- id: cabeca-e-pescoco        # NOVO, ordem 3, cor "#C46B8F", icone scan-face
  titulo: Cabeça e pescoço
  capitulos:
    - id: exame-de-cabeca-e-pescoco   # "Exame de cabeça e pescoço", ordem 1
- aparelho-cardiovascular     # ordem 3 → 4
- aparelho-respiratorio       # ordem 4 → 5
- abdome                      # ordem 5 → 6
```

(Ícone: `scan-face` → `ScanFace` do lucide; T1 verifica o export exato e,
se ausente, escolhe equivalente e registra.)

### Cabeça e pescoço · Exame de cabeça e pescoço (ordem 1 a 4)

1. `cranio-e-face`: inspeção e palpação do crânio (forma, pontos
   dolorosos, couro cabeludo como moldura); face: simetria e mímica
   (paralisia facial central × periférica como achado: o exame dos
   pares cranianos completo fica para o capítulo neurológico, dizer
   isso), pontos sinusais e seios da face, articulação
   temporomandibular (palpação, crepitação, abertura). Referência
   cruzada: fácies típicas → ectoscopia (não reensinar). Avançado:
   sinais na face de doenças sistêmicas não cobertas pelas fácies,
   ATM detalhada.
2. `olhos` (inspeção externa (pálpebras: ptose, edema) cruzada ao
   edema; conjuntivas e escleras: cruzada a palidez/icterícia da
   avaliação geral, aqui só a semiotécnica ocular específica), pupilas
   (fotomotor direto e consensual, acomodação; anisocoria como alarme),
   alinhamento e motricidade ocular como moldura (detalhe no
   neurológico), exoftalmia/enoftalmia (medida como moldura), fundo de
   olho como moldura nomeada (não ensinado). Avançado: Horner como
   síndrome-alarme (com a ressalva de que a cadeia simpática vem no
   neuro), LRs de McGee para achados oculares onde houver.
3. `boca-nariz-e-ouvidos` (cavidade oral (lábios, mucosa) cruzada às
   mucosas da avaliação geral: dentes e gengivas, língua e suas
   alterações principais, assoalho), orofaringe com abaixador (técnica,
   amígdalas e graduação se ancorada, palato); nariz (inspeção externa,
   vestíbulo e septo à rinoscopia anterior como moldura); ouvidos
   (inspeção do pavilhão, palpação do tragus e da mastoide, otoscopia
   como moldura nomeada; teste do sussurro se ancorado em McGee).
   Avançado: lesões orais de alarme, halitose como dado.
4. `tireoide-e-pescoco`, contorno e simetria do pescoço; tireoide:
   inspeção com deglutição, palpação (abordagens anterior e posterior,
   reparos: cartilagens, istmo, lobos), o que descrever (volume,
   consistência, nódulos, mobilidade à deglutição, dor), ausculta de
   sopro; bócio e a correlação com o estado funcional (achados de
   hiper/hipo como referência cruzada a FC/pele/fácies). Linfonodos
   cervicais e jugulares/carótidas: referência cruzada aos tópicos que
   já os ensinam (linfonodos; pulso venoso jugular): aqui só o mapa de
   vizinhança. Rigidez de nuca: moldura nomeada (neuro futuro).
   Avançado: LRs de McGee para bócio/nódulo, manobra de Pemberton se
   ancorada.

## 4. Padrão editorial

O consolidado (Fases 5 a 8): seções "O essencial" → técnica com
`manobra`+`checklist` → temáticas → "Armadilhas" → "Teste rápido";
1 checklist/tópico executável do nível básico; quiz 4 a 6 com explicacao,
gabarito balanceado no capítulo (nenhum índice >~8/24), distratores
plausíveis, sem referências posicionais, resposta-mais-longa perto do
acaso; 3 a 6 avançados; ≥2 ilustrações no capítulo (candidatas: pontos
sinusais e ATM; reparos da palpação da tireoide; pupilas
fotomotor/consensual), SVG padrão da casa renderizado e inspecionado nos
dois temas; tags generosas; bloco "Onde este tópico encontra os outros";
âncoras nas 4 obras com citação por capítulo/seção nomeada (páginas
reais só no McGee); *itálico* e **negrito** disponíveis no TextoRico.

Referências cruzadas obrigatórias (citar, nunca duplicar/contradizer):
fácies → ectoscopia; palidez/icterícia/mucosas → pele-mucosas-e-fâneros;
edema → capítulo do coração; linfonodos (incl. cervicais e níveis) →
linfonodos; jugulares/carótidas → pulso venoso jugular; FC/pulso →
sinais vitais; pares cranianos/motricidade ocular/rigidez de nuca →
explicitamente adiados ao capítulo neurológico.

## 5. Código (mínimo)

`sistemas.yaml` (+ sistema, reordenação 3→4→5→6), `src/design/icones.ts`
(+1 ícone), `content.json` regenerado, ajuste só de testes de
contagem/ordem (o teste do ContentContext fixa `sistemas[0]` = Anamnese: 
inalterado; conferir os que fixam contagens).

## 6. Erros e testes

Gates de sempre; revisão médica independente (opus) + re-revisão +
micro-rounds; revisão final de fase (fable); deploy gh-pages via worktree
novo com verificação headless (home com 6 sistemas; tópico novo em
seções; busca por "tireoide"/"pupila") e capturas ao autor.

## 7. Fora desta fase

Pares cranianos, motricidade ocular, fundo de olho, otoscopia e
rinoscopia técnicas, rigidez de nuca (neuro futuro); casos novos; demais
capítulos; 4B.
