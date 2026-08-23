# SemioGuia Fase 11 — Sistema vascular periférico: Design

Data: 23/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Sistema novo **Sistema vascular periférico** com o capítulo "Exame
vascular periférico" (4 tópicos), fechando o circuito que o capítulo do
coração abriu (pulsos, edema, jugulares) e apoiando-se no que o capítulo
neurológico acabou de ensinar (sensibilidade do pé, monofilamento,
reflexo aquileu). Sem casos novos.

## 2. Decisões do autor

1. Prosseguir com o próximo capítulo de exame aprovado em chat.
2. Todo conteúdo nasce `revisao: pendente`; regras editoriais integrais
   (originalidade com varredura pré-commit em N=10 e passada hostil em
   N=7, âncoras nas 4 obras, sem fármacos/doses, divergências atribuídas
   lado a lado, lacunas das fontes declaradas em vez de preenchidas,
   quiz balanceado desde o rascunho, checklists em nível básico).

## 3. Estrutura

### `sistemas.yaml` (inserção na ordem 7; só o neuro se desloca)

```yaml
- id: sistema-vascular-periferico   # NOVO — ordem 7, cor "#66A04F", icone git-fork
  titulo: Sistema vascular periférico
  capitulos:
    - id: exame-vascular-periferico # "Exame vascular periférico", ordem 1
- id: sistema-nervoso               # ordem 7 → 8
```

Ordem crânio-caudal do exame: cabeça e pescoço (3) → cardiovascular (4)
→ respiratório (5) → abdome (6) → **vascular periférico (7)** →
nervoso (8). A cor #66A04F preenche o vão de matiz entre o âmbar do
abdome (36°) e o verde-azulado do respiratório (168°). O ícone
`git-fork` (ramificação) é verificado pela T1; se ausente, equivalente
registrado.

### Sistema vascular periférico · Exame vascular periférico (ordem 1–4)

1. `pulsos-arteriais-perifericos` — a sequência completa dos pulsos
   (carotídeo, braquial, radial e ulnar, aórtico abdominal, ilíaco,
   femoral, poplíteo, tibial posterior e pedioso) com a técnica de cada
   um e os reparos anatômicos; amplitude, simetria e a comparação
   simultânea; o retardo radiofemoral; ausculta de sopros arteriais e
   frêmitos. Referências cruzadas: a técnica do **pulso radial** e o
   vocabulário de ritmo/amplitude ficam em sinais vitais (não
   reensinar); carótida e jugular, no pulso venoso jugular; os sopros
   sobre aorta, renais e ilíacas, na ausculta do abdome; a ausculta
   cardíaca e a irradiação, nos sopros cardíacos. Avançado: ausência
   de pulsos pediosos como achado isolado e sua frequência em pessoas
   sem doença; LRs de McGee onde houver.
2. `insuficiencia-arterial-cronica` — claudicação intermitente (o
   interrogatório sintomatológico já pergunta por ela: citar) e dor de
   repouso; inspeção do membro (trofismo, pelos, unhas, temperatura,
   coloração); palidez à elevação e rubor pendente com o tempo de
   enchimento venoso; a úlcera arterial e sua distinção da venosa;
   o pé em risco — referência cruzada ao monofilamento e à
   sensibilidade do capítulo neurológico, e ao reflexo aquileu no
   diabetes, sem reensinar nenhum dos dois. O **índice tornozelo-braço**
   entra como conceito que fecha o raciocínio, com o instrumento
   (Doppler portátil) nomeado como moldura. Avançado: LRs de McGee
   para doença arterial periférica.
3. `doenca-venosa-cronica-e-trombose` — varizes e insuficiência venosa
   crônica (desenho venoso, coroa flebectásica, dermatite ocre ou de
   estase, lipodermatoesclerose, úlcera venosa); o edema varicoso —
   citando a descrição do edema já ensinada no capítulo do coração, sem
   repetir a graduação; trombose venosa profunda (assimetria de
   perímetro medida, empastamento, calor e dor; o sinal de Homans com
   a ressalva explícita do seu desempenho e com atribuição por obra);
   tromboflebite superficial. **Linfedema e sinal de Stemmer não se
   reensinam**: pertencem ao tópico de linfonodos, e aqui entram apenas
   como o diferencial vizinho, citado. Molduras nomeadas: as manobras
   venosas clássicas (Trendelenburg, Perthes) — a T2/T3 deve auditar as
   quatro obras e, não havendo âncora, nomeá-las como não ensinadas,
   dizendo por quê; escores clínicos (Wells) nomeados como escores, não
   como exame físico. Avançado: LRs de TVP onde existirem, com a
   ressalva de que a literatura os trata sobretudo dentro da suspeita
   de embolia pulmonar.
4. `isquemia-aguda-e-aneurismas` — a isquemia arterial aguda como
   emergência: os achados clássicos (a lista dos "P" atribuída por
   obra, já que a numeração varia), o que muda a conduta e o tempo
   como variável; a diferença entre o membro ameaçado e o membro
   irreversível descrita pelos achados, não por classificação
   instrumental. Aneurismas: a palpação da aorta abdominal — o abdome
   já ensina a inspeção das pulsações epigástricas e a ausculta de
   sopros, então aqui entra só a leitura vascular e os números de
   McGee, com a cruzada explícita; aneurisma poplíteo como achado
   palpável. Avançado: LRs de McGee para aneurisma de aorta abdominal
   e o efeito do perímetro abdominal sobre eles.

## 4. Padrão editorial

O consolidado (Fases 5–10): seções "O essencial" → "Como examinar" com
`manobra`+`checklist` → temáticas → "Onde este tópico encontra os
outros" → "Armadilhas" → "Teste rápido"; 1 checklist/tópico de 10 itens
executável do nível básico (vira estação OSCE); quiz 6/tópico (24 no
capítulo) com explicacao, gabarito balanceado (nenhum índice >~8/24),
resposta-mais-longa ≈25%, distratores plausíveis e excludáveis do texto
base, sem referências posicionais; 3–6 avançados/tópico; ≥3 ilustrações
no capítulo (candidatas: mapa dos pontos de palpação dos pulsos;
palidez à elevação e rubor pendente; úlcera arterial × venosa por
localização), SVG padrão da casa (`viewBox="0 0 320 200"`,
`stroke="currentColor"`, sem cor fixa, arquivo byte-idêntico ao bloco
inline, conferido nos dois temas); tags generosas; âncoras nas 4 obras
por capítulo/seção nomeada, páginas reais só no McGee (conferidas pelos
cabeçalhos correntes).

Referências cruzadas obrigatórias (citar, nunca duplicar/contradizer):
pulso radial e vocabulário do pulso → frequência cardíaca e pulso;
carótidas e jugulares → pulso venoso jugular e turgência; descrição e
graduação do edema → pulso venoso jugular e turgência; sopros
abdominais e pulsações epigástricas → inspeção e ausculta do abdome;
palpação profunda do abdome → palpação do abdome; linfedema e sinal de
Stemmer → linfonodos; monofilamento, sensibilidade do pé e reflexo
aquileu no diabetes → sensibilidade e coordenação / força, tônus e
reflexos; claudicação como sintoma → interrogatório sintomatológico;
úlceras e alterações da pele → pele, mucosas e fâneros.

## 5. Código (mínimo)

`sistemas.yaml` (+ sistema na ordem 7, sistema-nervoso 7→8),
`src/design/icones.ts` (+1 ícone), `content.json` regenerado, ajuste só
de testes de contagem/ordem se falharem (o teste do ContentContext fixa
`sistemas[0]` = Anamnese — inalterado).

## 6. Erros e testes

Gates de sempre; revisão médica independente (opus) + re-revisão +
micro-rounds; revisão final de fase (fable) com auditoria de costuras e
caminhada visual medida; deploy gh-pages pelo checklist NOMINAL de
`docs/deploy-gh-pages.md` (50 arquivos, `.nojekyll` e `404.html`
conferidos por nome) e capturas claro/escuro ao autor.

## 7. Fora desta fase

Doppler e índice tornozelo-braço como técnica instrumental; ultrassom
vascular; manobras venosas sem âncora nas quatro obras; escores
clínicos como instrumento de decisão; exame vascular do
politraumatizado; casos novos; capítulo osteoarticular; 4B.
