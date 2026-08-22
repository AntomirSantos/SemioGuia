# Pendências para a revisão médica do autor

Atualizado em 22/08/2026, ao fim da Fase 5. Todo o conteúdo do app segue
`revisao: pendente` até o autor aprovar; esta lista concentra os pontos que
as revisões editoriais sinalizaram como decisão médica ou curricular do
autor — nenhum é defeito técnico.

## Casos clínicos (Fase 3)

1. **Crise hipertensiva está fora do currículo atual** — nenhum tópico
   aprovado cobre emergência/urgência hipertensiva, LOA, alvos de redução ou
   a proscrição da nifedipina; o caso se ancora direto na DBHA 2025
   (§11, Figura 11.1). Decidir: acrescentar uma seção de crise hipertensiva
   ao tópico de PA, ou aceitar o caso adiantado em relação ao conteúdo.
2. **Valores pediátricos sem âncora** — o caso da febre usa FC 168–174 bpm e
   FR 44–48 irpm numa criança de 3 anos; os tópicos aprovados só trazem
   faixas de adulto. PA pediátrica foi deliberadamente omitida. Se casos
   pediátricos continuarem, vale acrescentar faixas etárias ao conteúdo.
3. **Sem âncora nos tópicos, usados com parcimônia:** enchimento capilar
   (sem corte numérico), SpO2 (progressão 93→90→88 coerente, nenhum corte
   ensinado), petéquias/digitopressão (ancorado em Porto, cap. 12 —
   Sistema tegumentar), descrição eletrocardiográfica da FA (moldura, nunca
   decisão).
4. **Fármacos e doses omitidos de propósito** ("anti-hipertensivo parenteral
   titulável"); o diagnóstico etiológico da criança nunca é nomeado.
   Reverter é decisão editorial do autor.
5. **Ajustes menores sugeridos pela revisão médica** (não aplicados para não
   reeditar texto médico sem novo ciclo de revisão): FC ausente na cena do
   edema agudo (~110–120 seria mais típico); menção a UTI/VNI no desfecho
   ótimo da crise; título da citação do cap. 12 do Porto; condição de
   segurança no texto da opção de ortostase ("com apoio, pronto para
   sentá-la"); o `ensino` do desfecho de dano da crise ficou longo
   (98 palavras — considerar mover os alvos não-EAP para o tópico de PA
   quando o item 1 se resolver).

## Tópicos de sinais vitais (Fases 1C/2)

6. **Faixa 37,6–37,8 °C ambígua** — a tabela de intensidade mantém
   "febrícula até 37,5 °C" convivendo com o corte de febre do adulto em
   >37,8 °C, e 37,5 °C aparece em três categorias (febrícula, febre na
   criança SBP ≥37,5, estado febril 37,3–37,5). Harmonizar na revisão.
7. **Fluxograma de febre é síntese didática própria** — conferir se o autor
   endossa cada etapa.
8. **SBP 2025 (DC nº 206)** — valores vieram de fontes secundárias
   concordantes; subir o PDF primário ao repositório de referências para
   verificação final.

## Observações de produto (não médicas)

9. Revisão espaçada: refazer o mesmo quiz no mesmo dia acelera os intervalos
   (3 acertos seguidos ≈ 15 dias) — comportamento autorizado pela spec, mas
   candidato a ajuste (ignorar re-graduação no mesmo dia) numa fase futura.
10. Contadores do Perfil não mostram o backlog de itens novos represados pelo
    limite de 20/dia (aparecem nos dias seguintes).

## Pendências técnicas da Fase 4A (contas e sync — não médicas)

11. **`avaliar()` do SM-2 sem teto** (`src/revisao/sm2.ts`): a facilidade e o
    intervalo crescem sem clamp; a partir de ~14 repetições corretas seguidas
    a data de revisão estoura o ano de 4 dígitos. As regras do Firestore já
    acomodam qualquer saída com ano de 4 dígitos (faixas provadas na
    auditoria), então nada quebra hoje — mas vale limitar o intervalo (por
    exemplo, teto de 10 anos) numa fase futura.
12. **Persistência de sessão nativa ausente**: no React Native o `getAuth`
    do Firebase guarda a sessão só em memória — o gatilho de sync "ao abrir
    o app" funciona apenas na web hoje. Antes de qualquer distribuição
    nativa (lojas), é obrigatório trocar para `initializeAuth` com
    persistência em AsyncStorage. Não afeta o site publicado.
13. **Passos do autor para ativar a sincronização**: criar o projeto no
    console do Firebase e preencher `src/conta/config.ts` — roteiro completo
    em `docs/firebase-setup.md` (inclui o deploy das regras auditadas, que é
    passo de máquina do autor, nunca de CI).

## Capítulos da Fase 5 — Exame do coração e Exame do tórax

Os 8 tópicos novos estão `revisao: pendente` e precisam da leitura completa
do autor (texto, aprofundamentos, 48 perguntas de quiz, 8 checklists/estações,
8 ilustrações). Cada capítulo passou por revisão médica editorial
independente em duas rodadas; zero erros factuais restantes segundo os
revisores. Os itens abaixo são **decisões editoriais/curriculares** que as
revisões deferiram ao autor — nenhum é defeito.

### Decisões de padronização do app

14. **Escala de intensidade de sopros** — Levine 1–6 (McGee/Semiologia
    Clínica) e cruzes + a ++++ (Porto) convivem no app, sempre rotuladas no
    ponto de uso e com aviso de não-intercambialidade. Decidir se o app
    padroniza numa delas.
15. **Política para divergências entre as próprias referências** — hoje o
    texto silencia a divergência e segue a fonte citada. Exemplos mapeados:
    palpabilidade do ictus (Porto ~70% × McGee 25–40% supino), ictus do
    longilíneo (5º × 6º EIC entre as duas obras de Porto), frêmito na
    congestão passiva (normal × normal-ou-aumentado). Alternativa: nota
    curta atribuída nos pontos de conflito.
16. **Páginas de Porto nos tópicos de sinais vitais** (ex. "p. 565-570") —
    não são verificáveis nas extrações digitais; os capítulos citados estão
    corretos. Conferir no impresso ou rebaixar para capítulo/seção, como
    fazem os capítulos novos.

### Capítulo cardiovascular

17. **Taxonomia da impulsão apical** — a spec pedia "hipercinético ×
    hipocinético"; o tópico adotou a taxonomia com evidência de McGee
    (normal / hipercinético / sustentado / retrátil). Confirmar a troca.
18. **Oclusão arterial transitória** (McGee, Tabela 43.3) — manobra sem
    fármaco com a maior razão de verossimilhança da caixa (LR 48,7 para
    IM/CIV, contra 5,8 do handgrip). Candidata a entrar na tabela de
    manobras dos sopros, recuperando o poder diagnóstico perdido com a
    omissão do nitrito de amila.
19. **Checklist de "Descrição completa de um sopro"** — é lista de itens de
    registro, não de gestos observáveis como as demais; conferir se a
    estação OSCE derivada fica avaliável no formato atual.

### Capítulo respiratório

20. **Limiar de cianose** — o app ensina 2,38 g/dL de desoxi-hemoglobina
    (McGee, medido); o clássico 5 g/dL (que aparece em Porto, onde o "5%"
    do cap. 36 é typo comprovado) foi omitido. Considerar restaurá-lo como
    nota rotulada ("o ensino clássico cita 5 g/dL; medidas diretas…"), já
    que é o número que o aluno encontrará em provas.
21. **Ângulo de Charpy** — descrito qualitativamente; Porto traz os números
    (≈90° mediolíneo, <90° longilíneo, >90° brevilíneo) sem ambiguidade em
    duas obras. Considerar restaurar os cortes numéricos.
22. **Menores**: desvio de traqueia listado na atelectasia obstrutiva
    (Semiologia Clínica o põe na fibroatelectasia; Porto apoia o uso geral);
    glosa "MV diminuído bilateral → DPOC / unilateral → derrame" (LRs
    exatos, mas McGee estratifica por contexto clínico, não lateralidade);
    percussão comparativa atribuída a Auenbrugger (ele descreveu a
    percussão direta em 1761; a dígito-digital comparativa é posterior).
