# SemioGuia Fase 5 — Aparelhos cardiovascular e respiratório: Design

Data: 22/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Dois capítulos novos no guia — **exame do coração** e **exame do tórax** —
no mesmo padrão editorial dos sinais vitais: texto original ancorado nas
referências da biblioteca, aprofundamentos (`nivel: avancado`), quiz por
tópico ("Teste rápido"), checklist de manobra (que vira estação OSCE
automaticamente) e ilustrações SVG no estilo existente. Sem mudanças de
arquitetura: o pipeline de conteúdo atual absorve tudo.

## 2. Decisões do autor (registradas em 22/08)

1. **Escopo:** os dois capítulos nesta fase; o restante do exame físico vem
   em fases seguintes.
2. **Cardiovascular — 4 tópicos:** precórdio (inspeção e palpação),
   ausculta cardíaca, sopros, pulso venoso jugular e turgência. Com
   aprofundamentos ("sopros, edema etc. igual como anteriormente") —
   edema e perfusão periférica entram como aprofundamento do tópico
   venoso. Pulsos arteriais permanecem em sinais vitais (referência
   cruzada, sem duplicação).
3. **Respiratório — 4 tópicos:** inspeção do tórax, palpação, percussão,
   ausculta pulmonar. Com aprofundamentos; as síndromes pleuropulmonares
   (consolidação, derrame, pneumotórax, atelectasia) entram como tabela
   integradora no aprofundamento da ausculta. Frequência respiratória
   permanece em sinais vitais.
4. **Sem casos clínicos novos nesta fase** — os 3 existentes aguardam a
   revisão médica do autor antes de crescer o acervo.
5. Todo conteúdo nasce `revisao: pendente`, redação original a partir das
   referências (nunca cópia), citações precisas por tópico.

## 3. Estrutura (`content/` + `sistemas.yaml`)

```yaml
- id: aparelho-cardiovascular   # ordem 2, cor "#D95757", icone heart-pulse
  capitulos:
    - id: exame-cardiaco         # "Exame do coração", ordem 1
- id: aparelho-respiratorio      # ordem 3, cor "#3BA48D", icone wind
  capitulos:
    - id: exame-do-torax         # "Exame do tórax", ordem 1
```

Tópicos (ids finais no padrão `sistema/capitulo/topico`):

### Aparelho cardiovascular · Exame do coração

1. `inspecao-e-palpacao-do-precordio` — ictus cordis (localização,
   extensão, decúbito lateral esquerdo), abaulamentos e retrações,
   levantamento paraesternal, frêmitos, pulsações epigástricas e de
   fúrcula. Aprofundamento: ictus propulsivo/globoso, hipercinético ×
   hipocinético, situações que deslocam o ictus.
2. `ausculta-cardiaca` — focos clássicos + aórtico acessório, técnica
   (diafragma × campânula, posições), B1 e B2 (gênese e intensidade),
   desdobramentos (fisiológico, fixo, paradoxal), B3 e B4.
   Aprofundamento: estalidos, atrito pericárdico, efeito da respiração.
3. `sopros-cardiacos` — mecanismo, classificação (sistólicos ×
   diastólicos × contínuos; ejeção × regurgitação), intensidade
   (Levine 1–6), irradiação, manobras dinâmicas (Rivero-Carvallo,
   Valsalva, handgrip, posições), sopro inocente. Aprofundamento:
   correlação com as 4 valvopatias principais (EAo, IAo, EM, IM).
4. `pulso-venoso-jugular-e-turgencia` — técnica a 45°, diferenças veia ×
   carótida, turgência patológica, refluxo hepatojugular.
   Aprofundamentos: ondas do pulso venoso (a, c, x, v, y), sinal de
   Kussmaul, **edema** (cacifo e graduação, edema cardíaco × outros) e
   perfusão periférica (tempo de enchimento capilar como moldura, sem
   corte numérico — coerente com a decisão da Fase 3).

### Aparelho respiratório · Exame do tórax

1. `inspecao-do-torax` — linhas e regiões torácicas, formas do tórax
   (tonel, infundibuliforme, cariniforme, cifoescoliótico), tipo
   respiratório, tiragem e musculatura acessória, cianose e baqueteamento
   como sinais de moldura. Aprofundamento: respiração paradoxal,
   assimetrias localizadas.
2. `palpacao-do-torax` — expansibilidade (ápices e bases), frêmito
   toracovocal ("trinta e três"), enfisema subcutâneo, dor parietal.
   Aprofundamento: interpretação do FTV aumentado/abolido por síndrome.
3. `percussao-do-torax` — técnica dígito-digital, sons (claro pulmonar,
   submacicez, macicez, timpanismo, hipersonoridade), sequência
   comparativa. Aprofundamento: espaço de Traube, limites e mobilidade
   das bases.
4. `ausculta-pulmonar` — técnica, sons normais (murmúrio vesicular, som
   traqueal, broncovesicular), adventícios (estertores finos e grossos,
   sibilos, roncos, estridor, atrito pleural), ressonância vocal
   (broncofonia, egofonia, pectorilóquia). Aprofundamento: **tabela
   integradora das síndromes pleuropulmonares** (consolidação, derrame,
   pneumotórax, atelectasia × inspeção/palpação/percussão/ausculta).

## 4. Padrão editorial (idêntico aos sinais vitais)

- Seções: "O essencial" → seção de técnica ("Como examinar"/equivalente,
  com blocos `manobra` e `checklist`) → seção temática do tópico →
  "Armadilhas do exame" → "Teste rápido" (bloco `quiz`).
- Cada tópico: 1 `checklist` (vira estação OSCE), quiz com 4–6 perguntas
  (alimenta o SM-2), 3–6 blocos `nivel: avancado`, `perola` onde couber.
- Ilustrações: ao menos 2 por capítulo, SVG inline no estilo atual
  (`viewBox 320×200`, `stroke="currentColor"`, sem cores fixas).
  Candidatas: focos de ausculta no precórdio; ondas do pulso venoso;
  linhas torácicas; mapa comparativo da percussão.
- Âncoras clínicas: Porto — Semiologia Médica 8ª ed. (Partes 9 e 10),
  Porto — Exame Clínico 8ª ed., McGee 4ª ed. (caps. de tórax e coração),
  Semiologia Clínica 1ª ed. Citações com capítulo/página por tópico.
  Valores e epônimos só com âncora nas referências; sem fármacos.
- Consistência interna: nada pode contradizer os tópicos aprovados de
  sinais vitais (cortes da DBHA 2025, técnica de aferir PA, pulso).

## 5. Código (mínimo)

- `src/design/icones.ts`: registrar `heart-pulse` → `HeartPulse` e
  `wind` → `Wind` (lucide). Nenhuma outra mudança de código.
- `assets/generated/content.json` regenerado (`npm run build:content`);
  testes que fixam contagens de sistemas/tópicos atualizados.

## 6. Erros e testes

- Gates de sempre: `npm run build:content` (validação zod + sync),
  `npx jest`, `npx tsc --noEmit`, `npm run checar:contraste`.
- Revisão médica editorial independente de cada capítulo (modelo opus),
  com os achados tratados antes do deploy — mesmo processo da Fase 3.
- Deploy gh-pages + verificação headless dos capítulos novos.

## 7. Fora desta fase

- Casos clínicos novos; demais capítulos do exame físico; qualquer
  mudança no motor de revisão, sync ou monetização (4B). Ilustrações
  animadas/imagens bitmap.
