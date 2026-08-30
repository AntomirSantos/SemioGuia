# SemioGuia Fase 15 — Semiologia da criança: Design

Data: 2026-08-30. A última fase de conteúdo antes da revisão única do
autor. Escopo HONESTO por decisão do roteiro: um capítulo curto sobre
as particularidades do exame da criança — não um tratado de
puericultura.

## 1. Objetivo e a auditoria de adiamentos

Sistema novo **Semiologia da criança** (ordem 12, último da home),
um capítulo, TRÊS tópicos. O coração da fase é dupla:

(a) **Pagar ou re-escopar honestamente os adiamentos nominais** que
apontam "fase da criança" (inventário do pré-voo, a T3 re-audita):
- mamas: telarca, estágios do desenvolvimento puberal, puberdade
  precoce, assimetria puberal, desenvolvimento mamário e nódulos
  próprios (exame-das-mamas ×2, nodulo-mamario ×1);
- genitália/ginecológico: genitália infantil, criptorquidia do
  lactente, puberdade e estágios de Tanner (×3);
- psíquico: exame psíquico da criança e do adolescente + entrevista
  com os pais (fundamentos-do-exame-psiquico:318);
- neurológico: exame motor do recém-nascido e da criança pequena e a
  marcha da criança — hoje "fora deste guia" SEM apontar fase; a T3
  decide por contingência (ensinar se o cap. 179 der em nível de
  exame clínico geral; senão, manter fora com o motivo re-escrito).
Cada adiamento pago vira costura nos DOIS sentidos na T4 (frase de
origem atualizada). Adiamento não pago é DECLARADO no próprio tópico
("o que esta fase não cobre e por quê").

(b) **Ancorar as notas pediátricas dispersas**: antropometria
(comprimento deitado, fontanelas, PC) e sinais vitais já trazem notas
na criança; o checklist C4 registra FC 168–174 e FR 44–48 do caso
"febre na criança" SEM âncora nos tópicos. Se o cap. 179 (ou EC) der
faixas de FC/FR/PA por idade, o tópico 2 as ensina COM atribuição —
pagando C4 sem editar o caso (o caso ganha âncora por referência).

## 2. Estrutura

```yaml
- id: semiologia-da-crianca      # NOVO — ordem 12, último
  titulo: Semiologia da criança
  capitulos:
    - id: exame-da-crianca       # capítulo único, ordem 1 (3 tópicos)
      titulo: O exame da criança
```

Inserção pura (nada desloca). Ícone: candidatos `baby` (Baby),
`blocks` (Blocks), `sprout` (Sprout) — T1 verifica exports e usa o
primeiro disponível. Cor: busca dual-regime consolidada COM piso de
legibilidade do glifo (lição da F14): score = min(normal, cvd) sujeito
a contraste ≥2,0:1 vs paleta.superficie clara E escura; reporte
também o contraste vs superficie2 (Cabeçalho); banda de família
relaxada se os dados mandarem (precedente #BDBD05), com justificativa.

## 3. Tópicos (ordem 1–3)

1. `abordagem-e-anamnese-da-crianca` — o encontro clínico diferente:
   a mãe/acompanhante como parte integrante do exame (Porto SM l.5379;
   a citação de Marcondes em l.4185 é candidata a citação curta
   atribuída); anamnese feita por interposta pessoa e suas armadilhas;
   os segmentos próprios da anamnese pediátrica COMO AS FONTES DERE M
   (gestação/parto/neonatal, vacinação, desenvolvimento
   neuropsicomotor — marcos só se ancorados, sem tabela importada);
   exame oportunista (auscultar quando dorme, orofaringe por último),
   choro como dado; contenção respeitosa. Profissionalismo: o
   consentimento do responsável E o assentimento da criança conforme
   as fontes; o adolescente e a privacidade (cap. 180 + o que o guia
   já carrega do psíquico/SM 119). Avançado: o exame psíquico da
   criança — DECISÃO POR CONTINGÊNCIA: o SM l.64828+ traz seção
   própria; se em nível geral, ensinar resumido com remessa ao sistema
   Exame psíquico; senão moldura. Paga (ou re-escopa) o adiamento de
   fundamentos:318.
2. `crescimento-sinais-vitais-e-hidratacao` — antropometria da criança
   (peso, comprimento deitado ×  estatura, perímetro cefálico com o
   corte de microcefalia <33 cm do EC l.19987 SE confirmado no
   contexto; curvas de crescimento como MOLDURA nomeada — OMS/MS
   citadas só se as fontes as invocarem); faixas de FC/FR (e PA se
   houver) por idade com atribuição exata — PAGA C4 se as fontes
   derem; febre na criança REMETIDA ao tópico de temperatura (dono do
   SBP 2025 — não duplicar); desidratação/fontanelas REMETIDAS à
   antropometria (dona); o que muda na técnica (manguito pediátrico
   se ancorado). Avançado: baixa estatura e puberdade como janelas de
   alarme, pelas fontes.
3. `do-recem-nascido-ao-adolescente` — o exame por fases etárias como
   o cap. 179 estruturar: recém-nascido (fontanelas, coto umbilical,
   quadril — Ortolani/Barlow SE ancorados; reflexos próprios do RN por
   contingência, ver §1a); lactente e pré-escolar (o que muda);
   escolar; adolescente: PUBERDADE E ESTÁGIOS DE TANNER como cap.
   179/180 os derem — paga os adiamentos de mamas (telarca, puberdade
   precoce) e genitália (Tanner, criptorquidia do lactente — a
   genitália adulta já ensinou a criptorquidia geral; aqui o
   seguimento do lactente); ginecomastia puberal REMETIDA a mamas
   (dona). Divergências lado a lado; sem tabela de marcos não
   ancorada. Avançado: sinais de alarme do desenvolvimento pelas
   fontes; puberdade precoce/tardia pelos achados.

## 4. Padrão editorial

O consolidado (Fases 5–14). Notas:
- **Fontes**: Porto SM Parte 20 — cap. 179 Semiologia da Infância
  (âncora principal; mapear estrutura interna antes de escrever) e
  cap. 180 Semiologia da Adolescência; Porto EC menções dispersas
  (PC/microcefalia l.19987/25789; 2ª bulha l.30040; dislalia
  fisiológica l.13479); SC disperso (75 hits, muitos de adolescência);
  McGee SEM material sistemático (10 menções incidentais — confirmado
  2×; o texto diz isso ao leitor, precedente das fases 12–14).
  Números com página real: só McGee (se surgir algo). Demais:
  capítulo/seção nomeada.
- Sem fármacos/doses; sem calendário vacinal (moldura nomeada); sem
  tabelas de marcos/percentis importadas de fora das 4 obras; escalas
  (Denver etc.) só como moldura se as fontes citarem; recomendação
  datada com data.
- Quiz 6/tópico = 18, corretaIndex 4–5 por índice (~18/4), mais-longa
  ≈25% (4–5/18) espalhada; checklist 10 itens ×3; avançados 3–6;
  ≥2 ilustrações (candidatas: fontanelas do RN vistas de cima;
  estágios puberais ESQUEMÁTICOS se ancorados — sem realismo
  desnecessário; curva peso-idade como esquema conceitual).
- Profissionalismo é conteúdo (consentimento do responsável,
  assentimento, adolescente sozinho na consulta conforme as fontes).

## 5. Cruzadas obrigatórias

- Febre na criança → "Temperatura e frequência respiratória" (dono do
  SBP 2025 datado). Desidratação/fontanela deprimida → "Antropometria
  e hidratação". Ginecomastia → "Exame das mamas". Criptorquidia
  (semiotécnica geral) → "Genitália masculina e hérnias". Entrevista
  com os pais → "Fundamentos do exame psíquico" (que adiou para cá).
  Caso "Febre na criança" (content/casos/) — o tópico 2 dá a âncora
  das faixas; NÃO editar o caso (fora de escopo; C4 é resolvido por
  referência, registrado no checklist como pago-parcial ou pago).
- T4: costuras reversas em TODOS os arquivos cujos adiamentos forem
  pagos (mamas ×2, nodulo ×1, genitalia ×2, ginecologico ×1,
  fundamentos ×1, e forca-tonus/marcha SE a contingência ensinar o
  RN) + re-verificação.

## 6. Riscos

1. Escopo honesto sob fontes rasas — regra: não forçar; dizer ao
   leitor o que não há.
2. Tanner tem carga visual — ilustração só esquemática e só se
   ancorada; senão descrição textual atribuída.
3. Muitas costuras reversas (até 8 arquivos) — confinadas à T4 com
   lista fechada pela T3 e re-verificadas pela revisão final.
4. Paleta com 11 cores + piso de legibilidade — busca da T1 com o
   método da F14.

## 7. Fora deste plano

Puericultura (calendário vacinal, aleitamento como conduta,
suplementações); tabelas de percentis; escalas de desenvolvimento
completas; reanimação neonatal; adolescente ginecológico além do que
as fontes derem; os 3 casos clínicos (âncora do C4 vem por
referência, sem editar caso).
