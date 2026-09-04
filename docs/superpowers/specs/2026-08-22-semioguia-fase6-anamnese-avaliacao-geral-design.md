# SemioGuia Fase 6, Anamnese e Avaliação geral: Design

Data: 22/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Dois acréscimos ao guia, no mesmo padrão editorial das Fases 1C/5:

1. **Anamnese**: sistema novo, o primeiro do guia (a entrevista vem antes
   do exame): capítulo "A entrevista clínica" com 4 tópicos.
2. **Avaliação geral**: capítulo novo dentro do sistema "Exame físico
   geral" (que hoje só tem sinais vitais): ectoscopia, antropometria,
   pele/mucosas e linfonodos, 4 tópicos.

Sem mudanças de arquitetura; pipeline de conteúdo atual absorve tudo.

## 2. Decisões do autor (registradas em 22/08)

1. Fazer os itens 1 e 2 da lista de lacunas do currículo nesta fase.
2. Sem casos clínicos novos (mantida a decisão da Fase 5).
3. Todo conteúdo nasce `revisao: pendente`; redação original com citações
   precisas; sem fármacos/doses.

## 3. Estrutura

### `sistemas.yaml` (reordenação + sistema novo)

```yaml
- id: anamnese                  # NOVO, ordem 1, cor "#8E6BC8", icone clipboard-list
  titulo: Anamnese
  capitulos:
    - id: entrevista-clinica    # "A entrevista clínica", ordem 1
- id: exame-fisico-geral        # ordem 1 → 2; ganha 2º capítulo
  capitulos:
    - sinais-vitais             # ordem 1 (inalterado)
    - id: avaliacao-geral       # NOVO, "Avaliação geral", ordem 2
- aparelho-cardiovascular       # ordem 2 → 3
- aparelho-respiratorio         # ordem 3 → 4
```

### Anamnese · A entrevista clínica (ordem 1 a 4)

1. `a-entrevista-clinica`, estrutura e clima da entrevista: apresentação
   e identificação, perguntas abertas × fechadas, escuta ativa, silêncios,
   facilitação, resumo de checagem; relação médico-paciente; registro
   fiel × interpretação. Avançado: entrevista em situações difíceis
   (paciente prolixo, lacônico, acompanhante que responde), sinais de
   alerta para informações não confiáveis.
2. `queixa-principal-e-hda`: queixa principal nas palavras do paciente;
   HDA como narrativa cronológica; caracterização completa do sintoma
   (início, localização, qualidade, intensidade, duração e evolução,
   fatores de melhora/piora, sintomas associados). Avançado: sintomas
   múltiplos e concomitantes, HDA no paciente crônico agudizado.
3. `interrogatorio-sintomatologico`: ISDA por sistemas (geral, pele,
   cabeça e pescoço, cardiorrespiratório, digestório, genitourinário,
   locomotor, neurológico/psíquico), com o propósito (rastrear o que a
   HDA não contou) e o uso dirigido. Avançado: ISDA orientado por
   hipótese, armadilha do interrogatório mecânico.
4. `antecedentes-e-habitos`: antecedentes pessoais fisiológicos e
   patológicos, medicamentos em uso (classes NÃO são prescrição: apenas
   registro anamnésico, sem doses), alergias, antecedentes familiares,
   hábitos (tabagismo em anos-maço, álcool, atividade física), história
   social e ocupacional. Avançado: quantificação do tabagismo e do
   álcool, história ocupacional dirigida.

### Exame físico geral · Avaliação geral (ordem 1 a 4)

1. `ectoscopia`: avaliação do estado geral, nível de consciência como
   moldura (Glasgow fica para o capítulo neurológico futuro), fácies
   típicas, atitude e decúbito preferido, biotipo (referência cruzada ao
   ângulo de Charpy já ensinado na inspeção do tórax), marcha como
   moldura. Avançado: fácies raras, atitudes involuntárias.
2. `antropometria-e-hidratacao`: peso, altura, IMC com cortes, 
   circunferência abdominal, sinais de desnutrição e sarcopenia como
   moldura; avaliação do estado de hidratação (turgor, mucosas, olhos,
   diurese referida). Avançado: limitações do IMC, avaliação no idoso.
3. `pele-mucosas-e-faneros`: lesões elementares (resumo operacional),
   palidez (onde procurar), icterícia (progressão craniocaudal, onde
   procurar), cianose (referência cruzada ao limiar já ensinado no
   tórax), petéquias e digitopressão (âncora Porto cap. 12, já citada
   pelos casos), unhas e baqueteamento (referência cruzada ao tórax).
   Avançado: icterícia × carotenodermia, discromias comuns.
4. `linfonodos`: cadeias acessíveis (cervicais, supraclaviculares,
   axilares, epitrocleares, inguinais), semiotécnica por cadeia,
   caracterização (tamanho, consistência, mobilidade, sensibilidade,
   coalescência), o que sugere benignidade × alarme (supraclavicular,
   endurecido, aderido). Avançado: Virchow, generalizações
   (linfonodomegalia localizada × generalizada).

## 4. Padrão editorial (idêntico às Fases 1C/5)

- Seções: "O essencial" → técnica ("Como conduzir"/"Como examinar", com
  `manobra` + `checklist`) → temáticas → "Armadilhas" → "Teste rápido".
- Por tópico: 1 `checklist` (vira estação OSCE, na anamnese, o roteiro da
  entrevista/HDA é a estação), quiz 4 a 6 perguntas com `explicacao`, 3 a 6
  blocos `nivel: avancado`, `perola` onde couber, tags generosas.
- Ilustrações: ≥2 por capítulo, SVG inline no estilo da casa (candidatas:
  mapa da caracterização do sintoma; cadeias linfonodais; fácies em
  esquema; sítios de avaliação de icterícia/palidez).
- Âncoras: Porto, Semiologia Médica 8ª (Partes 1 a 3 e caps. de anamnese,
  exame físico geral, pele/cap. 12, linfonodos), Porto: Exame Clínico 8ª,
  Semiologia Clínica 1ª (caps. iniciais), McGee 4ª (caps. de estado
  geral/nutrição/linfonodos onde houver). Citações por capítulo/seção
  nomeada; páginas só quando verificáveis (padrão da Fase 5).
- Consistência: nada contradiz os 11 tópicos existentes; referências
  cruzadas em vez de duplicação (Charpy, cianose, baqueteamento, edema);
  "aferir" a PA; enchimento capilar sem corte; sem fármacos/doses (na
  anamnese, classes de medicamento aparecem só como item de REGISTRO).

## 5. Código (mínimo)

- `src/design/icones.ts`: registrar `clipboard-list` → `ClipboardList`.
- `sistemas.yaml`: reordenação (anamnese 1, exame físico geral 2,
  cardiovascular 3, respiratório 4) + capítulo `avaliacao-geral`.
- `content.json` regenerado; testes que fixem ordem/contagens ajustados.

## 6. Erros e testes

- Gates de sempre; revisão médica editorial independente por capítulo
  (opus) com re-revisão, no processo da Fase 5 (varredura n-grama desde o
  rascunho); revisão final de fase; deploy gh-pages + verificação
  headless.

## 7. Fora desta fase

- Casos novos; cabeça e pescoço; abdome; neurológico; comunicação de más
  notícias (decisão do autor pendente); Glasgow (vai com o neurológico).
