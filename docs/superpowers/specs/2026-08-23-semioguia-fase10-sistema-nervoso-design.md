# SemioGuia Fase 10, Sistema nervoso: Design

Data: 23/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Sistema novo **Sistema nervoso** com o capítulo "Exame neurológico"
(6 tópicos), pagando as dívidas nomeadas nas fases anteriores: escala de
coma de Glasgow, exame neurológico das pupilas, sinais localizatórios e
marchas (prometidos na ectoscopia); pares cranianos completos (prometidos
em crânio e face); motricidade ocular detalhada, fundo de olho e manobra
da luz alternante (prometidos em olhos); hipoglosso (boca); rigidez de
nuca (tireoide e pescoço); reflexo aquileu (tireoide). Sem casos novos.

## 2. Decisões do autor

1. Capítulo neurológico aprovado em chat ("Pode prosseguir com capítulo
   neurológico").
2. Todo conteúdo nasce `revisao: pendente`; regras editoriais integrais
   (originalidade com varredura pré-commit, âncoras nas 4 obras,
   sem fármacos/doses, divergências atribuídas, quiz balanceado desde o
   rascunho, distratores plausíveis, checklists em nível básico).

## 3. Estrutura

### `sistemas.yaml` (append, sem reordenação)

```yaml
- id: sistema-nervoso        # NOVO, ordem 7 (fim da sequência do exame)
  titulo: Sistema nervoso
  cor: "#5B6ABF"             # índigo
  icone: brain               # → Brain do lucide; T1 verifica o export
  capitulos:
    - id: exame-neurologico  # "Exame neurológico", ordem 1
```

### Sistema nervoso · Exame neurológico (ordem 1 a 6)

1. `consciencia-e-estado-mental`: nível de consciência (o espectro e o
   vocabulário), escala de coma de Glasgow ensinada por inteiro (abertura
   ocular, resposta verbal, resposta motora, registro por componente: 
   paga a promessa da ectoscopia), o que são sinais localizatórios (o
   conceito e os exemplos que o guia já ensina, sem reensiná-los), padrão
   respiratório como dado neurológico (referência cruzada à inspeção do
   tórax), orientação/atenção/linguagem como triagem à beira do leito.
   Moldura nomeada: escalas cognitivas estruturadas (miniexame do estado
   mental e afins) e o exame psíquico formal. Avançado: armadilhas da
   Glasgow (componente verbal no intubado, registro "T"), rebaixamento
   × delirium.
2. `pares-cranianos-i-a-vi`: visão de conjunto dos 12 pares; I
   (olfato: triagem e quando importa); II (acuidade à beira do leito,
   campos por confrontação, fundo de olho: o que se procura, papiledema
   como alarme, com a técnica oftalmoscópica como moldura instrumental
   nomeada); pupilas: interpretação neurológica (aferente × eferente,
   manobra da luz alternante/DPAR: paga a promessa de olhos; a
   semiotécnica básica fica citada ao tópico de olhos, não reensinada);
   III/IV/VI (motricidade ocular extrínseca em detalhe: paga a
   promessa: diplopia, ptose do III × do simpático com cruzada ao
   Horner de olhos, nistagmo caracterizado); V (sensibilidade da face,
   motricidade mastigatória, reflexo córneo-palpebral). Avançado: LRs de
   McGee para campos visuais e paralisias oculomotoras onde houver;
   síndromes pupilares.
3. `pares-cranianos-vii-a-xii`, VII completo (agora o exame: mímica por
   andares, central × periférica retomada por referência cruzada a crânio
   e face sem duplicar, gustação como moldura); VIII (coclear: cruzada às
   provas de Weber/Rinne/sussurro já ensinadas em boca-nariz-e-ouvidos: 
   aqui só o enquadramento neurológico; vestibular: equilíbrio estático,
   desvios, nistagmo: provas calóricas e posicionais como moldura
   nomeada); IX/X (palato, úvula, reflexo do vômito, disfonia/disfagia);
   XI (trapézio e esternocleidomastóideo contra resistência); XII
   (inspeção e desvio da língua: paga a promessa de boca). Avançado:
   padrões topográficos (bulbar × pseudobulbar) se ancorados.
4. `forca-tonus-e-reflexos`: inspeção e trofismo, tônus (hipotonia,
   espasticidade × rigidez, roda denteada), força segmentar com a
   graduação 0 a 5 e manobras deficitárias (Mingazzini/braços estendidos),
   reflexos profundos (bicipital, tricipital, estilorradial, patelar,
   aquileu, fechando a cruzada do hipotireoidismo, a graduação e o
   registro), reflexos superficiais (cutâneo-plantar e o sinal de
   Babinski; cutâneo-abdominais como moldura), clônus. Síndromes do
   neurônio motor superior × inferior como quadro-síntese. Avançado: LRs
   de McGee para achados motores/reflexos; manobra de Jendrassik.
5. `sensibilidade-e-coordenacao`: sensibilidade superficial (tátil,
   dolorosa, térmica: técnica e mapa por dermátomos como referência, sem
   decorar), profunda (vibratória com diapasão: cruzada ao diapasão de
   ouvidos, aqui 128 Hz: posição segmentar), padrões de perda
   (polineuropatia em bota e luva, nível sensitivo, hemi-hipoestesia);
   coordenação (índex-nariz, calcanhar-joelho, diadococinesia),
   equilíbrio estático (Romberg: o que testa e o que não testa, 
   propriocepção × cerebelo, atribuído). Avançado: LRs de McGee para
   neuropatia periférica (monofilamento se ancorado, vibração).
6. `marcha-e-sinais-meningeos`: as marchas típicas ensinadas de fato
   (hemiparética/ceifante, parkinsoniana, atáxica sensitiva × cerebelar,
   escarvante, anserina: paga a promessa da ectoscopia), marcha em
   tandem; sinais meníngeos: rigidez de nuca (agora a semiotécnica, 
   fecha a moldura de tireoide e pescoço), Kernig, Brudzinski, com os
   LRs de McGee e a ressalva de sensibilidade; Lasègue como sinal
   radicular vizinho (atribuído). O caso "febre na criança" já registra
   "rigidez de nuca ausente", agora o leitor sabe examinar. Avançado:
   jolt accentuation se ancorado, LRs de meningite.

## 4. Padrão editorial

O consolidado (Fases 5 a 9): seções "O essencial" → técnica com
`manobra`+`checklist` → temáticas → "Armadilhas" → "Teste rápido";
1 checklist/tópico executável do nível básico; quiz 6/tópico (36 no
capítulo) com explicacao, gabarito balanceado no capítulo (nenhum índice
>~12/36), resposta-mais-longa ≈25%, distratores plausíveis, sem
referências posicionais; 3 a 6 avançados/tópico; ≥4 ilustrações no
capítulo (candidatas: campos por confrontação; pontos dos reflexos
profundos; manobras deficitárias; Kernig/Brudzinski; marchas em
silhueta), SVG padrão da casa nos dois temas; tags generosas; bloco
"Onde este tópico encontra os outros"; âncoras nas 4 obras por
capítulo/seção nomeada (páginas reais só no McGee).

Referências cruzadas obrigatórias (citar, nunca duplicar/contradizer):
Glasgow/marchas/sinais localizatórios → ectoscopia (que promete este
capítulo); pupilas semiotécnica → olhos; paralisia facial como achado →
crânio e face; Weber/Rinne/sussurro → boca-nariz-e-ouvidos; rigidez de
nuca prometida → tireoide e pescoço; reflexo aquileu lentificado →
tireoide; padrão respiratório → inspeção do tórax; Horner → olhos.
As molduras que as fases anteriores nomearam para "o capítulo
neurológico" devem ser TODAS pagas ou explicitamente re-adiadas com
destino novo (nenhuma promessa órfã).

## 5. Código (mínimo)

`sistemas.yaml` (append ordem 7, sem reordenação), `src/design/icones.ts`
(+1 ícone Brain), `content.json` regenerado, ajuste só de testes de
contagem se falharem (sistemas[0] segue Anamnese: inalterado).

## 6. Erros e testes

Gates de sempre; T2 e T3 de conteúdo cada uma com revisão médica
independente (opus) + re-revisão + micro-rounds; revisão final de fase
(fable) com auditoria de promessas pagas e caminhada visual; deploy
gh-pages via worktree novo com verificação (home com 7 sistemas; busca
"Glasgow"/"Babinski"; tópico novo em seções) e capturas ao autor.

## 7. Fora desta fase

Técnica oftalmoscópica e otoscópica (instrumentais), provas vestibulares
calóricas/posicionais, escalas cognitivas estruturadas (miniexame e
afins) e exame psíquico formal, NIHSS e escalas de AVC, eletrodiagnóstico,
exame neurológico pediátrico/do recém-nascido, casos novos, demais
capítulos, 4B.
