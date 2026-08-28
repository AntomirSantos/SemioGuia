# SemioGuia Fase 13 — Mamas e aparelho geniturinário: Design

Data: 24/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat ("acrescente todo o conteúdo antes de eu revisar")

## 1. Objetivo

Sistema novo **Mamas e aparelho geniturinário**, com dois capítulos e
cinco tópicos, pagando a dívida nomeada do abdome agudo (*"a técnica do
toque retal pertence a um capítulo próprio e não é descrita aqui"*,
`abdome-agudo-e-sinais-peritoneais.md:260`). Segunda das quatro fases do
roteiro em `docs/roteiro-conteudo-restante.md`.

## 2. Decisões do autor

1. Completar todo o conteúdo antes da revisão médica única do autor.
2. Todo conteúdo nasce `revisao: pendente`; regras editoriais integrais.

## 3. Estrutura

### `sistemas.yaml` (inserção na ordem 9; só o nervoso se desloca, 9→10)

```yaml
- id: mamas-e-geniturinario     # NOVO — ordem 9, icone ribbon (export Ribbon verificado)
  titulo: Mamas e geniturinário
  capitulos:
    - id: exame-das-mamas            # "Exame das mamas", ordem 1 (2 tópicos)
    - id: exame-geniturinario-e-retal # "Exame geniturinário e retal", ordem 2 (3 tópicos)
- id: sistema-nervoso           # ordem 9 → 10
```

**Cor: escolhida por busca, não por palpite.** A T1 reutiliza o
procedimento da Fase 12 (script `busca_cor.py` + extensão de daltonismo,
no scratchpad): otimização em dois regimes (visão normal E
deuteranopia/protanopia), compondo o wash `${cor}24` sobre
**`paleta.fundo`** (o fundo real atrás do cartão — lição da revisão da
F12, não `superficie`), com S/L dentro da família da paleta. A T1
reporta a tabela e a cor vencedora entra no yaml; a revisão estrutural
refaz a medição.

### Capítulo 1 · Exame das mamas (ordem 1–2)

1. `exame-das-mamas` — inspeção estática (simetria, contorno, pele —
   retração, peau d'orange, abaulamento — mamilo e aréola) e dinâmica
   (elevação dos braços, contração dos peitorais, inclinação);
   palpação por quadrantes ou em faixas conforme as fontes, com a
   paciente sentada e deitada; expressão mamilar; os linfonodos
   axilares e supraclaviculares **citados ao tópico de linfonodos**
   (dono das cadeias e níveis), aqui só a integração à rotina do exame
   mamário. Ginecomastia no homem. Avançado: autoexame — o que as
   fontes dizem sobre seu papel; mamas acessórias e politelia.
2. `nodulo-mamario-e-descarga-papilar` — como descrever um nódulo
   (localização em quadrante/raio hora, tamanho, consistência,
   contornos, mobilidade, dor, pele suprajacente); o perfil que
   preocupa × o que tranquiliza, pelas fontes, sem critério
   radiológico; descarga papilar (unilateral × bilateral, uniductal ×
   multiductal, espontânea × provocada, aspecto — a sanguinolenta e a
   água de rocha como alarmes); retração e Paget do mamilo como
   alarmes de pele. Avançado: correlação achado-idade; o fibroadenoma,
   o cisto e o câncer como padrões.

### Capítulo 2 · Exame geniturinário e retal (ordem 1–3)

1. `genitalia-masculina-e-hernias` — inspeção do pênis (prepúcio,
   glande, meato, fimose/parafimose, lesões), palpação dos testículos
   e epidídimos (tamanho, consistência, nódulo — o nódulo testicular
   como alarme no jovem), varicocele e hidrocele com a
   **transiluminação**, criptorquidia; hérnias inguinais e
   inguinoescrotais: inspeção em pé, manobra de Valsalva, palpação do
   canal inguinal, redutibilidade; a hérnia encarcerada/estrangulada
   como emergência — cruzada ao abdome agudo. Avançado: escroto agudo
   (torção × epididimite pelos achados, reflexo cremastérico), sinal
   de Prehn se ancorado.
2. `exame-ginecologico` — posicionamento e o que muda no conforto;
   inspeção vulvar (lesões, distopias, trofismo); exame especular —
   a T2 audita as quatro obras: se a técnica estiver ancorada em nível
   de exame clínico geral, ensina com atribuição; se as fontes a
   tratarem como ato especializado, nomeia como moldura (padrão
   Trendelenburg/Perthes: a contingência decide, com justificativa, e
   a revisão ratifica); toque vaginal bimanual (útero: posição,
   volume, mobilidade, dor; anexos; fundo de saco); dor à mobilização
   do colo como alarme. Avançado: sangramento pós-menopausa e
   prolapsos pelos achados.
3. `toque-retal` — **paga a dívida do abdome agudo**: técnica completa
   (posições, lubrificação, comunicação), inspeção anal e perianal
   (fissura, hemorroidas, fístula, abscesso), o canal e a ampola
   (tônus, massas, fecaloma, sangue e melena no dedo de luva), a
   próstata (tamanho, consistência, sulco mediano, nódulo, dor — a
   prostatite aguda e a ressalva da massagem), e a integração com o
   abdome agudo (sensibilidade pélvica e massa retal — remeter aos
   números que o abdome já traz, sem repeti-los). Avançado: o que o
   toque diz e o que não diz sobre a próstata, conforme as fontes.

## 4. Padrão editorial

O consolidado (Fases 5–12). Notas específicas desta fase:

- **Profissionalismo nos exames íntimos é conteúdo, não rodapé.** Cada
  tópico do capítulo 2 (e o de mamas) abre a técnica com o que as
  fontes prescrevem sobre consentimento verbal, explicação prévia,
  presença de acompanhante, privacidade, exposição mínima e luvas.
  Ancorar no que Porto e Semiologia Clínica dizem; onde as obras
  calarem, dizer que calam e registrar a prática consolidada como
  convenção, atribuída como tal.
- **Evidência quantificada: esperar pouco e não forçar.** A varredura
  corrigida confirmou que o McGee não tem capítulo de mamas nem de
  exame genital/retal (menções incidentais apenas). Este é um capítulo
  de técnica e padrão, como a metade não medida do osteoarticular — e
  o texto diz isso ao leitor, reutilizando o precedente da passagem de
  textura da Fase 12. Qualquer número que o implementador encontre
  (ex.: linhas de Tabela 5.1) entra com página conferida pelo
  cabeçalho corrente, **lembrando que o offset PDF↔impresso do McGee
  varia por capítulo** — mapear antes de citar.
- **Método de extração:** `pdftotext -layout` sobre a biblioteca
  privada (nunca copiar conteúdo para o repositório, nunca commitar
  PDF), que preserva colunas de tabela. As extrações planas do
  scratchpad ficam como apoio.
- Quiz 6/tópico. Balanço por capítulo: mamas 12 questões (~3 por
  índice), GU 18 (4–5 por índice); mais-longa ≈25% em cada capítulo.
  1 checklist de 10 itens por tópico; 3–6 avançados; ≥3 ilustrações no
  conjunto (candidatas: quadrantes e raios da mama; canal inguinal e
  trajeto da hérnia; posições e ângulo do toque retal — todas
  esquemáticas, sem realismo anatômico desnecessário); tags generosas;
  âncoras por capítulo/seção nomeada, páginas reais só no McGee.

Referências cruzadas obrigatórias: linfonodos axilares e
supraclaviculares → linfonodos; abdome agudo e os números do toque →
abdome-agudo-e-sinais-peritoneais (que fica com os números; a técnica
vem para cá — fechar a dívida nos dois sentidos, atualizando a frase
"pertence a um capítulo próprio" para apontar o destino real); hérnias
e abaulamentos da parede → inspeção do abdome (conferir o que ela já
diz); Valsalva → onde o guia já a usa; puberdade e desenvolvimento →
adiados à fase da criança, por nome.

## 5. Código (mínimo)

`sistemas.yaml` (+ sistema na ordem 9, nervoso 9→10),
`src/design/icones.ts` (+Ribbon), `content.json`, testes só se
falharem. **Costura reversa permitida e obrigatória**: a frase da
dívida em `abdome-agudo-e-sinais-peritoneais.md:260` é atualizada na
fase (T3), com re-verificação da revisão.

## 6. Erros e testes

Gates de sempre; revisão médica independente + re-revisão +
micro-rounds por task de conteúdo; revisão final de fase com auditoria
de costuras (incluindo a dívida paga nos dois sentidos) e caminhada
visual; deploy pelo checklist NOMINAL; capturas ao autor.

## 7. Fora desta fase

Papanicolau e colposcopia; PSA e rastreamentos laboratoriais;
classificações BI-RADS e qualquer critério de imagem; exame obstétrico
(sem obra âncora na biblioteca — ver roteiro); puberdade e Tanner
(fase da criança); técnica cirúrgica de redução de hérnias; casos
novos; 4B.
