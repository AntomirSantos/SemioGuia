---
titulo: Pressão arterial
ordem: 1
tags:
  - sinais vitais
  - pressão arterial
  - PA
  - PAS
  - PAD
  - pré-hipertensão
  - DBHA 2025
  - hipertensão arterial
  - HAS
  - hipotensão
  - Korotkoff
  - esfigmomanômetro
  - manguito
  - hiato auscultatório
  - MAPA
  - MRPA
  - pressão diferencial
  - hipotensão ortostática
  - sinal de Osler
  - pseudo-hipertensão
referencias:
  - "Diretriz Brasileira de Hipertensão Arterial — 2025 (SBC/SBH/SBN), Quadros 3.2 e 3.4"
  - "Porto — Semiologia Médica, 8ª ed., cap. 47 (Exame clínico do sistema cardiovascular), p. 574-584"
  - "Porto — Exame Clínico, 8ª ed., cap. 21 (Sinais vitais), p. 949-956"
  - "Porto — Exame Clínico, 8ª ed., cap. 14 (Exame da pressão arterial)"
  - "McGee — Evidence-Based Physical Diagnosis, 4ª ed., cap. 17 (Blood Pressure)"
  - "Semiologia Clínica, 1ª ed., cap. Semiologia cardiovascular (etapas de aferição da 7ª Diretriz Brasileira de Hipertensão Arterial)"
revisao: pendente
---

::: secao
titulo: O essencial
:::

::: conceito
titulo: O que a PA mede
texto: |
  Pressão arterial (PA) é a força do sangue contra a parede das artérias. Cada medida registra dois valores.

  - **Sistólica (PAS)**: o pico de pressão durante a ejeção ventricular.
  - **Diastólica (PAD)**: o menor valor, logo antes da sístole seguinte.

  A diferença entre elas é a **pressão diferencial**, ou amplitude de pulso. Ela fica habitualmente entre 30 e 60 mmHg.

  - **Convergente** (reduzida): hipovolemia, estenose aórtica, tamponamento, insuficiência cardíaca grave.
  - **Divergente** (aumentada): insuficiência aórtica, hipertireoidismo, fístula arteriovenosa, enrijecimento senil da aorta.

  Débito cardíaco e resistência periférica determinam a PA. Elasticidade dos grandes vasos, volemia e viscosidade do sangue modulam o resultado. Daí a queda na hemorragia e na desidratação, e a PAS isolada alta no idoso de aorta pouco complacente.
:::

::: conceito
titulo: A PA não é um número fixo
texto: |
  É uma variável fisiológica contínua. Muda com a hora do dia, a postura, a emoção, a dor, o esforço e a refeição. O ritmo circadiano derruba a PA cerca de 10% durante o sono.

  O método indireto também erra por natureza. Aceita-se margem em torno de 8 mmHg, e a PAS auscultada fica em média 3 a 4 mmHg abaixo da intra-arterial. Seu papel é não somar erro ao erro do método.

  A ideia popular de "12 por 8" como valor ideal não tem base científica. O que interessa é a curva pressórica, e ela só se aproxima do valor verdadeiro com medidas repetidas.
:::

::: secao
titulo: Como medir
:::

::: ilustracao
svg: |
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- chao -->
    <path d="M 14 190 L 306 190" stroke="currentColor" stroke-width="1.5" />
    <!-- cadeira -->
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <path d="M 50 154 L 124 154" />
      <path d="M 54 154 L 54 76" />
      <path d="M 56 154 L 56 190" />
    </g>
    <!-- mesa de apoio -->
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <path d="M 148 107 L 308 107" />
      <path d="M 148 112 L 308 112" />
      <path d="M 298 112 L 298 190" />
    </g>
    <!-- paciente sentado, de perfil -->
    <g stroke="currentColor" stroke-width="2" fill="none">
      <circle cx="72" cy="40" r="13" />
      <path d="M 67 51 L 66 62" />
      <path d="M 79 50 L 82 62" />
      <path d="M 82 62 C 89 64, 92 72, 92 88 C 93 108, 92 120, 92 132 C 106 129, 122 130, 134 133 C 139 137, 139 146, 134 150 L 74 152 C 64 152, 60 144, 62 134 C 60 104, 60 72, 66 62" />
      <path d="M 137 146 L 140 184" />
      <path d="M 128 152 L 131 184" />
      <path d="M 131 184 L 130 190 L 154 190 C 159 190, 159 183, 152 183 L 140 184" />
    </g>
    <!-- coracao: referencia de altura -->
    <path d="M 76 95 C 67 88, 67 81, 72 81 C 74.5 81, 76 83, 76 84.5 C 76 83, 77.5 81, 80 81 C 85 81, 85 88, 76 95 Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5" />
    <!-- braco apoiado na mesa, cotovelo levemente fletido; o contorno e interrompido sob o manguito -->
    <g stroke="currentColor" stroke-width="2" fill="none">
      <path d="M 89 71 L 105 77" />
      <path d="M 130 88 L 137 91" />
      <path d="M 92 85 L 100 88" />
      <path d="M 125 98 L 143 105" />
      <path d="M 137 91 L 234 91" />
      <path d="M 143 105 L 234 105" />
      <path d="M 234 91 L 248 91 A 7 7 0 0 1 248 105 L 234 105" />
    </g>
    <!-- manguito: faixa que envolve a circunferencia do braco -->
    <g stroke="currentColor" fill="none">
      <path d="M 108 74 L 130 83 Q 131 94 122 102 L 100 93 Q 99 82 108 74 Z" stroke-width="2" />
      <path d="M 112 76 L 114 70 L 125 75 L 123 80" stroke-width="1.5" />
      <path d="M 116 100 C 115 103, 113 106, 112 108" stroke-width="2" />
      <path d="M 112 108 C 104 110, 99 117, 102 122 C 105 127, 114 126, 116 119 C 117 114, 116 109, 112 108 Z" stroke-width="2" />
    </g>
    <!-- estetoscopio na fossa cubital -->
    <g stroke="currentColor" fill="none">
      <circle cx="154" cy="97" r="7" stroke-width="2" />
      <circle cx="154" cy="97" r="3" stroke-width="1.5" />
      <path d="M 159 91 C 152 68, 166 36, 190 0" stroke-width="2" />
    </g>
    <!-- linha da altura do coracao -->
    <path d="M 85 88 L 302 88" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" fill="none" />
    <text x="204" y="81" font-family="sans-serif" font-size="11" fill="currentColor" stroke="none">altura do coração</text>
  </svg>
legenda: "Paciente sentado, braço apoiado na altura do coração e estetoscópio na fossa cubital."
:::

::: manobra
titulo: Medida da PA pelo método auscultatório
passos:
  - "Preparo do paciente: repouso de 3 a 5 minutos, sentado, em ambiente tranquilo; bexiga vazia; sem café, tabaco, álcool ou exercício na última hora."
  - "Exponha o braço. Nunca meça por cima da roupa e não deixe a manga arregaçada apertando o braço."
  - "Apoie o braço em superfície firme, palma para cima, cotovelo levemente fletido, com a artéria braquial na altura do coração (4º espaço intercostal)."
  - "Meça a circunferência do braço na metade da distância entre acrômio e olécrano e escolha o manguito por ela: a bolsa inflável deve ter largura de cerca de 40% da circunferência e comprimento de cerca de 80% dela."
  - "Posicione o manguito 2 a 3 cm acima da fossa cubital, sem folgas e sem dobras, com o centro da bolsa sobre a artéria braquial."
  - "Estime a sistólica pela palpação: palpe o pulso radial, insufle até ele desaparecer, desinsufle devagar e anote o valor em que ele reaparece."
  - "Esvazie o manguito por completo e aguarde cerca de 1 minuto."
  - "Coloque o receptor do estetoscópio sobre a artéria braquial, sem pressão excessiva e nunca por baixo do manguito."
  - "Insufle rapidamente até 20 a 30 mmHg acima da sistólica estimada na palpação."
  - "Desinsufle de forma lenta e contínua, à razão de 2 a 3 mmHg por segundo."
  - "PAS = primeiro som audível (fase I de Korotkoff). PAD = desaparecimento dos sons (fase V)."
  - "Siga auscultando por mais 20 a 30 mmHg depois do último batimento, para ter certeza de que os sons cessaram; então esvazie o manguito rapidamente."
  - "Faça pelo menos duas medidas com cerca de 1 minuto de intervalo. Se forem muito diferentes, repita e considere a média."
  - "Na primeira avaliação, meça nos dois braços e adote como referência o braço de maior valor."
  - "Registre os valores exatos, sem arredondar para 0 ou 5, anotando o braço e a posição do paciente."
observar: |
  Se os sons persistirem até zero, use a fase IV (abafamento) como diastólica e registre os três valores.
:::

::: ilustracao
svg: |
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- eixo de pressao, descendo -->
    <g stroke="currentColor" stroke-width="2" fill="none">
      <path d="M 46 22 L 46 190" />
      <path d="M 39 181 L 46 190 L 53 181" />
    </g>
    <text transform="rotate(-90 20 106)" x="20" y="106" text-anchor="middle" font-family="sans-serif" font-size="11" fill="currentColor" stroke="none">pressão do manguito</text>
    <text x="169" y="17" text-anchor="middle" font-family="sans-serif" font-size="10" fill="currentColor" stroke="none">sons de Korotkoff</text>
    <!-- quadro das fases -->
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <path d="M 68 24 L 246 24" />
      <path d="M 68 186 L 246 186" />
      <path d="M 68 24 L 68 186" />
      <path d="M 246 24 L 246 186" />
      <path d="M 68 74 L 246 74" />
      <path d="M 68 102 L 246 102" />
      <path d="M 68 130 L 246 130" />
    </g>
    <!-- numerais das fases -->
    <g font-family="sans-serif" font-size="12" fill="currentColor" stroke="none" text-anchor="middle">
      <text x="84" y="64">I</text>
      <text x="84" y="92">II</text>
      <text x="84" y="120">III</text>
      <text x="84" y="148">IV</text>
      <text x="84" y="176">V</text>
    </g>
    <!-- traçado dos sons -->
    <g stroke="currentColor" stroke-width="2" fill="none">
      <path d="M 100 35 L 238 35" />
      <path d="M 100 60 L 114 60 L 118 51 L 122 60 L 142 60 L 146 51 L 150 60 L 170 60 L 174 51 L 178 60 L 198 60 L 202 51 L 206 60 L 226 60 L 230 51 L 234 60 L 238 60" />
      <path d="M 100 88 L 112 88 L 116 80 L 120 88 l 4 -3 l 4 3 l 4 -3 l 4 3 L 144 88 L 148 80 L 152 88 l 4 -3 l 4 3 l 4 -3 l 4 3 L 176 88 L 180 80 L 184 88 l 4 -3 l 4 3 l 4 -3 l 4 3 L 208 88 L 212 80 L 216 88 l 4 -3 l 4 3 l 4 -3 l 4 3 L 238 88" />
      <path d="M 100 116 L 114 116 L 118 103 L 122 116 L 142 116 L 146 103 L 150 116 L 170 116 L 174 103 L 178 116 L 198 116 L 202 103 L 206 116 L 226 116 L 230 103 L 234 116 L 238 116" />
      <path d="M 100 144 L 112 144 Q 118 136 124 144 L 140 144 Q 146 136 152 144 L 168 144 Q 174 136 180 144 L 196 144 Q 202 136 208 144 L 224 144 Q 230 136 236 144 L 238 144" />
      <path d="M 100 172 L 238 172" />
    </g>
    <!-- leituras -->
    <g stroke="currentColor" fill="none">
      <path d="M 46 46 L 286 46" stroke-width="1.5" stroke-dasharray="5 4" />
      <path d="M 46 158 L 286 158" stroke-width="1.5" stroke-dasharray="5 4" />
      <path d="M 40 46 L 52 46" stroke-width="2" />
      <path d="M 40 158 L 52 158" stroke-width="2" />
    </g>
    <g font-family="sans-serif" font-size="12" fill="currentColor" stroke="none">
      <text x="290" y="50">PAS</text>
      <text x="290" y="162">PAD</text>
    </g>
  </svg>
legenda: "As cinco fases de Korotkoff. A PAS é lida na fase I e a PAD, na fase V."
:::

::: conceito
titulo: As cinco fases, uma a uma
nivel: avancado
texto: |
  - **I**: surgimento de som claro, em pancada. É a PAS.
  - **II**: batimentos com murmúrio.
  - **III**: o murmúrio desaparece e os batimentos ficam mais nítidos.
  - **IV**: abafamento súbito.
  - **V**: silêncio. É a PAD.

  Se os sons persistirem até zero, use a fase IV como diastólica e registre os três números — por exemplo, 150 × 70 × 0 mmHg. Isso é comum em gestantes, anemia grave e estados hipercinéticos.
:::

::: conceito
titulo: O que a intensidade dos sons revela
nivel: avancado
texto: |
  Durante a fase I, atente também à intensidade dos batimentos.

  - Alternância de um som forte e um fraco: sugere pulso alternante, de disfunção ventricular esquerda.
  - Desaparecimento dos sons na inspiração: sugere pulso paradoxal.
:::

::: secao
titulo: Classificação
:::

::: tabela
titulo: Classificação da PA no consultório em adultos — DBHA 2025 (a partir de 18 anos)
colunas: ["Classificação", "PAS (mmHg)", "Relação", "PAD (mmHg)"]
linhas:
  - ["PA normal", "< 120", "e", "< 80"]
  - ["Pré-hipertensão", "120 a 139", "e/ou", "80 a 89"]
  - ["Hipertensão estágio 1", "140 a 159", "e/ou", "90 a 99"]
  - ["Hipertensão estágio 2", "160 a 179", "e/ou", "100 a 109"]
  - ["Hipertensão estágio 3", "≥ 180", "e/ou", "≥ 110"]
:::

::: conceito
titulo: Como ler a tabela
texto: |
  Quando PAS e PAD caem em faixas diferentes, vale sempre a categoria mais alta.

  A Diretriz Brasileira de Hipertensão Arterial de 2025 mudou três pontos:

  - **A categoria "PA ótima" saiu.** PAS abaixo de 120 mmHg com PAD abaixo de 80 mmHg agora é apenas **PA normal**.
  - **A pré-hipertensão ficou mais ampla.** Ela absorveu a faixa antes chamada de normal: PAS de 120 a 139 e/ou PAD de 80 a 89 mmHg. A intenção é identificar risco mais cedo e agir antes da progressão para hipertensão.
  - **A hipertensão sistólica isolada** (PAS ≥ 140 mmHg com PAD < 90 mmHg) deixou de ser categoria à parte. Ela é classificada em estágio 1, 2 ou 3 conforme o valor da PAS.
:::

::: tabela
titulo: Definição de hipertensão conforme o método de medida — DBHA 2025
colunas: ["Método", "PAS (mmHg)", "Relação", "PAD (mmHg)"]
linhas:
  - ["Consultório", "≥ 140", "e/ou", "≥ 90"]
  - ["MAPA — média de 24 h", "≥ 130", "e/ou", "≥ 80"]
  - ["MAPA — vigília", "≥ 135", "e/ou", "≥ 85"]
  - ["MAPA — sono", "≥ 120", "e/ou", "≥ 70"]
  - ["MRPA (monitoramento residencial)", "≥ 130", "e/ou", "≥ 80"]
:::

::: entendimento
titulo: Uma medida alta ainda não é hipertensão
texto: |
  Classificar não é diagnosticar. Para validar o diagnóstico são necessárias medidas repetidas em duas ou mais visitas — ou MAPA/MRPA.

  A exceção pesa na conduta: em pacientes com lesão de órgão-alvo ou doença cardiovascular estabelecida, esses achados bastam para confirmar o diagnóstico.
:::

::: secao
titulo: Armadilhas do exame
:::

::: perola
texto: |
  Nunca pule o método palpatório. Quem insufla só até "parar de ouvir" pode cair dentro do **hiato auscultatório** e registrar uma sistólica falsamente baixa. O pulso distal persiste durante o hiato, e é por isso que estimar a PAS pela palpação antes de auscultar resolve o problema em dez segundos.

  O outro erro campeão é o manguito estreito demais para o braço. Ele transmite mal a pressão aos tecidos, exige pressões maiores para colabar a artéria e **superestima** a PA — transformando um obeso normotenso em "hipertenso".
:::

::: conceito
titulo: Hiato auscultatório
nivel: avancado
texto: |
  Até 20% dos idosos hipertensos têm hiato auscultatório. Os sons somem no fim da fase I e reaparecem depois, num intervalo que pode chegar a 30 a 40 mmHg.

  Quem não o ultrapassa registra sistólica falsamente baixa ou diastólica falsamente alta.
:::

::: conceito
titulo: Hipotensão ortostática no idoso
texto: |
  No idoso, meça em decúbito, sentado e em pé, pela frequência de hipotensão ortostática. Queda maior que 20 mmHg na PAS ou 10 mmHg na PAD após 3 minutos em pé caracteriza hipotensão postural.
:::

::: conceito
titulo: Sinal de Osler e pseudo-hipertensão
nivel: avancado
texto: |
  Insufle o manguito acima da sistólica e procure a radial. Se ela continuar palpável — sinal ou manobra de Osler —, considere pseudo-hipertensão.

  Lembre que a sensibilidade e a especificidade dessa manobra são baixas.
:::

::: secao
titulo: Teste rápido
:::

::: quiz
perguntas:
  - id: pa-1
    enunciado: Em que velocidade o manguito deve ser desinsuflado durante a medida auscultatória da PA?
    alternativas:
      - "2 a 3 mmHg por segundo"
      - "10 mmHg por segundo"
      - "20 a 30 mmHg por segundo"
      - "O mais rápido possível, para poupar tempo do paciente"
    corretaIndex: 0
    explicacao: A deflação deve ser lenta e contínua, de 2 a 3 mmHg por segundo. Deflação rápida faz perder a fase I e superestimar ou subestimar os valores.
  - id: pa-2
    enunciado: Usar um manguito estreito demais para a circunferência do braço produz qual efeito sobre a leitura da PA?
    alternativas:
      - "Superestima a PA"
      - "Subestima a PA"
      - "Não interfere, desde que o estetoscópio esteja bem posicionado"
      - "Altera apenas a diastólica"
    corretaIndex: 0
    explicacao: O manguito estreito transmite mal a pressão aos tecidos, exigindo pressões maiores para colabar a artéria; o resultado é um valor falsamente elevado. O erro oposto, com manguito grande demais, subestima a PA, mas em magnitude bem menor.
  - id: pa-3
    enunciado: Qual conduta evita o erro causado pelo hiato auscultatório?
    alternativas:
      - "Estimar a sistólica pelo método palpatório antes de auscultar"
      - "Insuflar o manguito até 300 mmHg em todos os pacientes"
      - "Usar sempre a fase IV de Korotkoff como diastólica"
      - "Medir a PA apenas no braço esquerdo"
    corretaIndex: 0
    explicacao: Durante o hiato os sons desaparecem, mas o pulso distal persiste. Estimando a sistólica pela palpação e insuflando 20 a 30 mmHg acima dela, o examinador ultrapassa o hiato e não subestima a PAS.
  - id: pa-4
    enunciado: Um adulto de 62 anos, após duas medidas adequadas no consultório, apresenta PA de 150 × 92 mmHg. Como se classifica esse valor?
    alternativas:
      - "Pré-hipertensão"
      - "Hipertensão estágio 1"
      - "Hipertensão estágio 2"
      - "Hipertensão sistólica isolada"
    corretaIndex: 1
    explicacao: "PAS entre 140 e 159 mmHg e PAD entre 90 e 99 mmHg correspondem a hipertensão estágio 1. Não é hipertensão sistólica isolada porque a diastólica também está elevada (≥ 90 mmHg)."
  - id: pa-5
    enunciado: Durante a medida da PA, os sons de Korotkoff persistem até o manguito esvaziar por completo. Como registrar o resultado?
    alternativas:
      - "Considerar a diastólica igual a zero"
      - "Repetir a medida no outro braço e ignorar o achado"
      - "Usar a fase IV (abafamento) como diastólica e anotar os três valores, por exemplo 150 × 70 × 0 mmHg"
      - "Usar a fase III como diastólica"
    corretaIndex: 2
    explicacao: Quando os sons não desaparecem, adota-se a fase IV de Korotkoff como diastólica e registram-se os três números, deixando explícito o que foi observado. Isso é frequente em gestantes e em estados hipercinéticos.
:::
