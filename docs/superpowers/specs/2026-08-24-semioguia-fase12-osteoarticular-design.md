# SemioGuia Fase 12 — Sistema osteoarticular: Design

Data: 24/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat ("acrescente todo o conteúdo antes de eu revisar")

## 1. Objetivo

Sistema novo **Sistema osteoarticular** com o capítulo "Exame
osteoarticular" (6 tópicos), o maior capítulo de exame físico ainda
ausente. Sem casos novos. Primeira das quatro fases do roteiro em
`docs/roteiro-conteudo-restante.md`.

## 2. Decisões do autor

1. Completar todo o conteúdo antes da revisão médica, em uma passada
   única do autor ao final.
2. Todo conteúdo nasce `revisao: pendente`; regras editoriais integrais.

## 3. Estrutura

### `sistemas.yaml` (inserção na ordem 8; só o nervoso se desloca)

```yaml
- id: sistema-osteoarticular    # NOVO — ordem 8, cor "#A83399", icone bone
  titulo: Sistema osteoarticular
  capitulos:
    - id: exame-osteoarticular  # "Exame osteoarticular", ordem 1
- id: sistema-nervoso           # ordem 8 → 9
```

**Nota de paleta.** Com oito cores em uso (0°, 36°, 103°, 168°, 211°,
231°, 262°, 340°), o espaço de matiz está saturando. O #A83399 ocupa o
maior vão restante (~305°), mas a T1 deve medir **ΔE2000 contra as oito
existentes** nos dois temas e a revisão de fase deve conferir sob
simulação de deuteranopia e protanopia — a partir daqui a distinção
depende tanto de luminosidade e croma quanto de matiz, como a revisão da
Fase 11 demonstrou.

### Sistema osteoarticular · Exame osteoarticular (ordem 1–6)

1. `principios-do-exame-osteoarticular` — o vocabulário antes do gesto
   (artralgia × artrite; mono, oligo e poliarticular; aditiva,
   migratória e intermitente; axial × periférica); a sequência
   inspeção → palpação → mobilidade ativa → mobilidade passiva →
   manobras especiais; sinais inflamatórios locais; derrame e
   crepitação; amplitude de movimento e como registrá-la; deformidade
   × deformação. Avançado: o exame articular no paciente que não pode
   colaborar; padrões de acometimento como pista diagnóstica.
2. `coluna-vertebral` — inspeção das curvaturas (cifose, lordose,
   escoliose e o teste de inclinação anterior), atitude antálgica,
   palpação dos processos espinhosos e da musculatura paravertebral,
   mobilidade nos três planos, **teste de Schober**, manobras
   sacroilíacas, elevação da perna estendida e **Lasègue** — com
   referência cruzada ao tópico vascular, que já cita as razões de
   verossimilhança do McGee para a elevação da perna estendida, sem
   repetir os números. Avançado: bandeiras vermelhas da dor lombar;
   estenose × hérnia pela história e pelo exame.
3. `ombro-e-cotovelo` — inspeção e palpação dos reparos; amplitudes do
   ombro e o arco doloroso; testes do manguito rotador conforme as
   fontes ancorarem; ombro congelado; cotovelo: epicondilites medial e
   lateral, bursite olecraniana, nódulos. Avançado: o que cada teste
   ancorado separa.
4. `punho-e-mao` — deformidades características (desvio ulnar, dedos em
   pescoço de cisne e em botoeira, nódulos de Heberden e Bouchard, mão
   em garra), tenossinovites, **Tinel e Phalen** para o túnel do carpo,
   dedo em gatilho, força de preensão. Referência cruzada: baqueteamento
   digital e alterações ungueais ficam em pele, mucosas e fâneros e na
   ectoscopia. Avançado: artrite reumatoide × osteoartrite pelas mãos.
5. `quadril-e-joelho` — quadril: amplitudes, **manobra de Trendelenburg**
   e a **desambiguação obrigatória** (ver §4), teste de Patrick/FABERE,
   dismetria de membros; joelho: derrame e sinal da tecla, choque
   patelar, estabilidade em varo e valgo, gavetas anterior e posterior,
   testes meniscais conforme ancorados, cisto de Baker — com cruzada ao
   tópico venoso, que já o ensina como diferencial da trombose.
   Avançado: o joelho agudo e o que muda a conduta.
6. `tornozelo-pe-e-padroes-articulares` — tornozelo e pé: arco
   plantar (plano e cavo), hálux valgo, dedos em martelo, pontos
   dolorosos, fascite plantar, tendão calcâneo; e o quadro-síntese que
   fecha o capítulo: os **padrões articulares** que o exame permite
   separar (osteoartrite, artrite reumatoide, gota e espondiloartrites)
   pelo que se vê e se palpa, nunca por critério laboratorial.
   Referência cruzada: o pé em risco do diabético fica no tópico de
   insuficiência arterial e no de sensibilidade e coordenação.
   Avançado: monoartrite aguda como situação que não espera.

## 4. Padrão editorial

O consolidado (Fases 5–11), com **uma correção registrada em pleno voo**:

> **ERRATA (24/08/2026).** Esta spec afirmava que o McGee não tem
> capítulo musculoesquelético. **É falso.** O McGee 4ª ed. tem o
> **cap. 57, "Examination of the Musculoskeletal System" (p. 481-510)**,
> com os boxes EBM 57.1 e 57.2 e as Tabelas 57.1 (amplitudes normais),
> 57.2 (achado → diagnóstico) e 57.3 (síndromes do ombro), além das
> linhas de ombro, quadril, joelho e tornozelo na Tabela 5.1. O erro veio
> do método de varredura da orquestração, que filtrou a linha
> "C H A P T E R nn" em busca do título — mas o título está na linha
> seguinte. O implementador da T2 detectou a falha, recusou-se a escrever
> a passagem falsa que a spec mandava escrever, e produziu a versão
> honesta. **A T3 deve minerar o cap. 57.**

A textura deste capítulo muda mesmo em relação aos anteriores, mas de
forma **desigual, não para zero**: o McGee concentra os números em
ombro, quadril, joelho e tornozelo, e apresenta o resto do exame
articular como tabela de achado e diagnóstico implicado, sem razão de
verossimilhança — porque em boa parte das doenças musculoesqueléticas o
achado de beira de leito **é** o padrão diagnóstico, e não há contra o
que medi-lo. Onde as fontes adotadas não trazem desempenho medido, o
guia ensina a técnica com atribuição e **diz que não há número**, em vez
de importar um de fora.

Demais regras inalteradas: seções "O essencial" → "Como examinar" com
`manobra`+`checklist` → temáticas → "Onde este tópico encontra os
outros" → "Armadilhas" → "Teste rápido"; 1 checklist de 10 itens por
tópico (vira estação OSCE); quiz 6/tópico (36 no capítulo) com gabarito
balanceado (nenhum índice >~12/36) e resposta-mais-longa ≈25%; 3–6
avançados/tópico; ≥4 ilustrações no capítulo; tags generosas; âncoras
por capítulo/seção nomeada, páginas reais só no McGee.

### Desambiguação obrigatória — Trendelenburg

O nome aparecerá em **três** lugares do guia:
1. **marcha de Trendelenburg** — já ensinada em marcha e sinais
   meníngeos (queda do quadril contralateral, o lado testado é o que
   suporta o peso);
2. **manobra de Brodie-Trendelenburg** — já ensinada em doença venosa
   crônica, em bloco avançado, com o desempenho medido;
3. **manobra de Trendelenburg do quadril** — que este capítulo ensina.

O tópico 5 deve nomear os três em voz alta e dizer qual é qual. Uma
colisão de epônimo não declarada é exatamente o tipo de armadilha que
este guia se propõe a desarmar.

### Referências cruzadas obrigatórias

Lasègue e elevação da perna estendida → doença venosa crônica e
trombose (que já traz os números do McGee); cisto de Baker → mesmo
tópico; marcha de Trendelenburg, marcha antálgica e demais marchas →
marcha e sinais meníngeos; força segmentar, tônus, reflexos e a
graduação 0–5 → força, tônus e reflexos; sensibilidade do pé e
monofilamento → sensibilidade e coordenação; pé em risco → insuficiência
arterial crônica; baqueteamento e unhas → pele, mucosas e fâneros;
fácies e atitude → ectoscopia; edema articular × edema sistêmico →
pulso venoso jugular e turgência.

## 5. Código (mínimo)

`sistemas.yaml` (+ sistema na ordem 8, sistema-nervoso 8→9),
`src/design/icones.ts` (+1 ícone), `content.json` regenerado, ajuste só
de testes de contagem/ordem se falharem.

## 6. Erros e testes

Gates de sempre; revisão médica independente (opus) + re-revisão +
micro-rounds; revisão final de fase com auditoria de costuras e
caminhada visual; deploy pelo checklist NOMINAL de
`docs/deploy-gh-pages.md` e capturas ao autor.

## 7. Fora desta fase

Testes ortopédicos sem âncora nas quatro obras; classificações
radiológicas e critérios classificatórios de sociedades; punção
articular e análise do líquido sinovial; reabilitação e tratamento;
traumatologia e fraturas; casos novos; demais capítulos do roteiro.
