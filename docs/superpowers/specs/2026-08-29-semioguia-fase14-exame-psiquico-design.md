# SemioGuia Fase 14 — Exame psíquico: Design

Data: 2026-08-29. Autor: orquestração da sessão, sob a diretriz do
autor de completar todo o conteúdo antes da revisão única.

## 1. Objetivo

Sistema novo **Exame psíquico**, com um capítulo e quatro tópicos,
pagando as dívidas nomeadas do capítulo neurológico (Fase 10):

- `consciencia-e-estado-mental.md:94-95` e `:486` — "o miniexame do
  estado mental, as escalas de sedação e o exame psíquico formal são
  nomeados aqui e ficam fora deste guia por enquanto";
- `forca-tonus-e-reflexos.md:96` — reflexos primitivos (palmomentual,
  glabelar, preensão) cuja "interpretação em doença frontal e em
  demências pertence à avaliação cognitiva estruturada, que a spec
  deste guia deixa fora desta fase".

A T4 atualiza essas frases para apontar os destinos reais (costura nos
dois sentidos, como a dívida do toque retal na F13).

## 2. Estrutura

```yaml
- id: exame-psiquico            # NOVO — ordem 11, após sistema-nervoso (10)
  titulo: Exame psíquico
  capitulos:
    - id: exame-psiquico        # capítulo único, ordem 1 (4 tópicos)
      titulo: Exame psíquico
```

Inserção PURA: nervoso permanece 10; nada é deslocado (a criança, F15,
entrará como 12). Ícone: candidatos em ordem de preferência
`message-circle`, `lightbulb`, `puzzle` — a T1 verifica o export real
no lucide-react-native instalado e usa o primeiro disponível. Cor: T1
roda a busca dual-regime consolidada (wash `${cor}24` sobre
`paleta.fundo`, Machado severidade 1.0, banda de família S∈[33,68],
L∈[40,60], agora contra 10 cores existentes; baselines re-derivados,
não assumidos).

## 3. Tópicos (capítulo único, ordem 1–4)

1. `fundamentos-do-exame-psiquico` — o que o exame psíquico é e o que
   não é: a distinção que Porto faz entre o exame psíquico formal e a
   avaliação do estado mental do exame neurológico (o guia já carrega a
   segunda; remeter nominalmente a "Consciência e estado mental", dono
   do nível de consciência, da escala de Glasgow e da atenção como
   função de base — NÃO re-ensinar); quando o exame acontece (ao longo
   da entrevista, não como interrogatório à parte — SC); condições do
   ambiente e postura do examinador; o contrato de respeito (estigma,
   linguagem, privacidade — profissionalismo como conteúdo, padrão
   F13); roteiro geral: aparência, atitude, consciência, atenção,
   orientação. Avançado: a relação com a entrevista da anamnese
   (cruzada ao sistema Anamnese); simulação e dissimulação se ancoradas.
2. `funcoes-psiquicas-e-seus-disturbios` — as funções sucessivas e a
   nomenclatura dos seus distúrbios, pelas fontes: memória (fixação ×
   evocação), sensopercepção (ilusão × alucinação × alucinose, se
   ancorado), pensamento (curso, forma, conteúdo; delírio), linguagem
   (cruzada às afasias, que moram no neurológico), humor e afeto,
   juízo crítico e insight, psicomotricidade. Divergências de
   nomenclatura entre Porto EC/SM e SC lado a lado. Avançado:
   síndromes ansiosa e depressiva pelos achados do exame, sem escala
   importada sem âncora.
3. `escalas-cognitivas-a-beira-do-leito` — PAGA A DÍVIDA: miniexame do
   estado mental como Porto o reproduz (pontos de corte POR
   ESCOLARIDADE — citar exatamente como a obra os dá), teste do
   relógio, Mini-Cog e método de avaliação de confusão (CAM) com os
   desempenhos do McGee cap. 6 (Mental Status Examination — minerar
   EBM boxes; páginas reais SÓ conferidas pelo cabeçalho corrente);
   escalas de sedação que SC indica (nomeá-las como a obra as nomeia);
   reflexos primitivos na doença frontal/demência (pagando
   forca-tonus:96) com o que o McGee der; o kappa 0,28–0,80 do MEEM já
   ensinado no neurológico é REMETIDO, não repetido. Avançado:
   escolaridade e cultura como confundidores; o que a triagem não
   diagnostica.
4. `delirium-demencia-e-depressao` — as três grandes síndromes do
   estado mental pelos achados: delirium (agudo, flutuante, atenção —
   hipoativo × hiperativo; CAM remetido ao tópico 3), demência
   (crônica, memória; subtipos só se ancorados), depressão como
   imitadora (pseudodemência, se as fontes a nomearem); o contraste
   com a afasia (cruzada dupla: consciência e sensibilidade já
   registram a distinção). Diferenciais em tabela atribuída. Avançado:
   delirium hipoativo como o mais perdido; fatores precipitantes pelo
   exame físico (cruzadas aos sistemas que os carregam).

## 4. Padrão editorial

O consolidado (Fases 5–13). Notas específicas:

- **Fontes confirmadas no pré-voo** (inventário por conteúdo, método
  pós-K1): Porto EC cap. 7 "Exame Psíquico e Avaliação das Condições
  Emocionais" (sumário l.892; roteiro pedagógico l.896); Porto SM
  "EXAME PSÍQUICO" (l.64797+, parte psiquiátrica); SC "Exame psíquico"
  (l.11670, corpo l.12321+ — funções sucessivas, triagem, Glasgow
  citado); McGee **cap. 6 "Mental Status Examination"** (~l.3354:
  clock-drawing, Mini-Cog, MEEM, CAM, "well-validated bedside tests").
  Este é o capítulo restante MAIS quantificado — minerar os EBM boxes
  do cap. 6 inteiros; não forçar número onde não há.
- **Sem fármacos/doses**; síndromes psiquiátricas nosológicas (DSM/CID)
  só como moldura nomeada se as fontes as invocarem; nenhuma escala ou
  critério importado de fora das quatro obras.
- **Profissionalismo é conteúdo** (padrão F13): estigma, linguagem
  respeitosa, privacidade, consentimento — ancorado; silêncios
  declarados.
- Quiz 6/tópico = 24 no capítulo, corretaIndex 6/6/6/6, mais-longa
  correta ≈25% (6/24) espalhada por índices. 1 checklist de 10 itens
  por tópico; 3–6 avançados; ≥2 ilustrações (candidatas: mapa das
  funções psíquicas do roteiro; o relógio do clock-drawing com um
  exemplo normal × anormal — esquemáticos); tags generosas; âncoras
  por capítulo/seção nomeada, páginas reais só no McGee.

## 5. Cruzadas obrigatórias

- Nível de consciência, Glasgow, atenção como função de base, kappas
  da Tabela 5.1 → tópico "Consciência e estado mental" (dono; remeter,
  não repetir).
- Afasias e disartria → "Consciência e estado mental" e
  "Sensibilidade e coordenação" (a distinção afasia×confusão já está
  registrada lá).
- Reflexos primitivos → "Força, tônus e reflexos" nomeia; a
  interpretação vem para cá (costura nos dois sentidos na T4).
- Entrevista e rapport → sistema Anamnese (conferir o que já diz).
- Ectoscopia/aparência → "Ectoscopia" (avaliação geral) — integrar sem
  duplicar.
- T4: atualizar consciencia-e-estado-mental.md:94-95 e :486 e
  forca-tonus-e-reflexos.md:96 para apontar os tópicos reais.

## 6. Riscos

1. Nomenclatura psiquiátrica divergente entre as obras — lado a lado,
   nunca fundida.
2. Tentação de importar critérios DSM — proibido sem âncora nas quatro
   obras; moldura nomeada quando as fontes citarem.
3. A costura reversa toca dois tópicos aprovados do neurológico —
   confinada à T4 e re-verificada.
4. Paleta no limite (10 cores) — busca dual-regime na T1, medição
   refeita na revisão estrutural.

## 7. Fora deste plano

Psiquiatria nosológica (transtornos, critérios diagnósticos,
tratamento); escalas de depressão/ansiedade não ancoradas; exame
psíquico da criança (F15 se couber, senão adiado nominalmente);
capacidade civil e perícia; os 3 casos clínicos.
