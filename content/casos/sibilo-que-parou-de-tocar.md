---
id: sibilo-que-parou-de-tocar
titulo: O sibilo que parou de tocar
contexto: "Sala de emergência, meia-noite. Uma jovem de 19 anos com asma desde a infância chega trazida pelo irmão. Ela usou a bombinha de resgate seis vezes desde as dez da noite. Está sentada, curvada para a frente, com as mãos apoiadas na maca, e responde às perguntas com uma palavra de cada vez."
tags: [respiratorio, asma, sibilos, emergencia]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
  - aparelho-respiratorio/exame-do-torax/inspecao-do-torax
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de ausculta pulmonar e sinais de esforço respiratório"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho respiratório"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia respiratória"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela usa o pescoço para respirar: os escalenos e o esternocleidomastóideo saltam a cada inspiração. Os espaços entre as costelas afundam. Fala com uma palavra por vez e prefere não deitar. O irmão conta que a crise começou depois de uma faxina na casa da avó."
dados:
  - "FR 34 irpm, FC 132 bpm"
  - "Saturação 91% em ar ambiente"
  - "Fala monossilábica, uso de musculatura acessória"
  - "Sibilos difusos, audíveis à distância"
  - "Seis doses de resgate nas últimas 2 horas"
proximo: d-gravidade
:::

::: no
tipo: decisao
id: d-gravidade
pergunta: "Como você classifica a gravidade desta crise antes de qualquer exame complementar?"
opcoes:
  - texto: "Como crise grave: fala monossilábica, uso de musculatura acessória, posição sentada obrigatória e taquipneia marcada já definem a gravidade, sem precisar de gasometria."
    avaliacao: otima
    feedback: "A gravidade da asma se lê no corpo, não no aparelho. Quantas palavras cabem em uma frase, quais músculos foram recrutados, se o paciente aceita deitar: essas três observações separam a crise leve da grave em poucos segundos. A gasometria vem depois, e nas crises muito graves ela costuma confirmar tarde o que o olhar já sabia."
    proximo: c-tratamento
  - texto: "Como crise moderada: a saturação de 91% ainda é aceitável e há sibilos por todo o tórax, o que indica boa movimentação de ar."
    avaliacao: erro
    feedback: "A saturação é um dos últimos parâmetros a cair na asma, porque a paciente compensa às custas de um trabalho respiratório enorme. Enquanto ela mantém 91% com o pescoço inteiro trabalhando, a conta está sendo paga por músculo, e músculo cansa. Classificar por oximetria subestima a crise grave."
    proximo: c-tratamento
  - texto: "Aguardar o pico de fluxo expiratório para classificar objetivamente antes de tratar."
    avaliacao: aceitavel
    feedback: "A medida objetiva é útil quando o paciente consegue realizá-la, e quem fala uma palavra por vez raramente consegue. Além disso, o esforço da manobra pode piorar a crise. Trate primeiro; meça quando ela puder soprar."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você inicia oxigênio, broncodilatador inalatório em série com anticolinérgico e corticoide sistêmico. Quinze minutos depois volta ao leito. Ela parece menos agitada, mas o tórax mal se move e, ao auscultar, você encontra um silêncio quase completo nos dois hemitórax."
dados:
  - "FR 38 irpm, FC 138 bpm"
  - "Saturação 88% com oxigênio"
  - "Sibilos praticamente ausentes, murmúrio muito reduzido"
  - "Expansibilidade torácica mínima"
proximo: d-silencio
:::

::: no
tipo: decisao
id: d-silencio
pergunta: "Os sibilos sumiram depois do tratamento. Como você interpreta esse silêncio?"
opcoes:
  - texto: "Como piora grave: sem fluxo de ar não há como produzir sibilo, e o tórax silencioso em crise asmática é sinal de obstrução quase total."
    avaliacao: otima
    feedback: "O sibilo precisa de ar passando por uma via estreitada para existir. Quando o fluxo cai o suficiente, o som desaparece, e o silêncio significa o oposto de melhora. O contexto confirma: frequência subindo, saturação caindo, tórax que quase não expande. Este é o momento de preparar a via aérea, não de comemorar."
    proximo: c-decisao-final
  - texto: "Como resposta ao tratamento: o broncodilatador abriu as vias aéreas e por isso o sibilo cedeu."
    avaliacao: erro
    feedback: "Se o sibilo cedesse por melhora, tudo o mais melhoraria junto: a frequência cairia, a saturação subiria, ela voltaria a falar frases. Aqui aconteceu o contrário em todos os parâmetros. Interpretar o silêncio como sucesso é o erro que mais atrasa a intubação na asma quase fatal."
    proximo: c-decisao-final
  - texto: "Como achado ambíguo, a ser resolvido pela gasometria arterial."
    avaliacao: aceitavel
    feedback: "A gasometria vai ajudar, e o que ela costuma mostrar aqui é uma pressão de gás carbônico que subiu ou até normalizou, o que na asma grave é sinal de exaustão, não de equilíbrio. Enquanto o resultado não chega, o exame já indicou o caminho: o silêncio somado à piora clínica é obstrução."
    proximo: c-decisao-final
:::

::: no
tipo: cena
id: c-decisao-final
texto: "Ela agora está sonolenta, com a cabeça pendendo, e para de responder ao irmão. A saturação marca 86% e a frequência respiratória caiu para 20 irpm, o que na primeira olhada parece melhora. A pele está úmida e as extremidades, frias."
dados:
  - "Sonolência, resposta verbal ausente"
  - "FR caiu de 38 para 20 irpm"
  - "Saturação 86%, FC 140 bpm"
  - "Tórax silencioso"
proximo: d-via-aerea
:::

::: no
tipo: decisao
id: d-via-aerea
pergunta: "A frequência respiratória caiu e ela ficou sonolenta. Qual é a sua leitura e a sua conduta?"
opcoes:
  - texto: "Exaustão respiratória iminente: preparar via aérea avançada agora, mantendo broncodilatador contínuo e chamando quem tem mais experiência na sala."
    avaliacao: otima
    feedback: "Queda de frequência com rebaixamento de consciência em crise grave não é melhora, é falência da bomba. A musculatura acessória trabalhou por horas e chegou ao fim. Antecipar a via aérea, com a equipe reunida e o broncodilatador correndo, é o que separa uma intubação controlada de uma parada respiratória."
    proximo: fim-otimo
  - texto: "Melhora do padrão respiratório: reduzir a oferta de oxigênio e observar por mais trinta minutos."
    avaliacao: erro
    feedback: "Cada elemento aqui contradiz a melhora: consciência rebaixada, saturação caindo, tórax silencioso, extremidades frias. A queda da frequência é o músculo desistindo. Observar por trinta minutos nessa fase é assistir à parada respiratória se organizar."
    proximo: fim-dano
  - texto: "Tentar ventilação não invasiva antes de considerar a intubação."
    avaliacao: aceitavel
    feedback: "A pressão positiva tem lugar em pacientes selecionados e colaborativos, e esta paciente já não está mais colaborativa. Com rebaixamento de consciência, o risco de aspiração e de atraso é alto. Se for tentada, precisa ser por poucos minutos e com o material de intubação aberto ao lado."
    proximo: c-vni
:::

::: no
tipo: cena
id: c-vni
texto: "Com a máscara, ela agita-se e não sincroniza. Em oito minutos a saturação cai para 82% e a equipe parte para a intubação, agora com menos margem e mais pressa do que teria se a decisão tivesse sido tomada antes."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A intubação é feita de forma controlada, com a equipe reunida e o broncodilatador mantido. A ventilação é ajustada com tempo expiratório longo, e ela é extubada em quarenta e oito horas. Na alta, o plano de ação da asma é reescrito, e a faxina da casa da avó entra na conversa sobre gatilhos."
ensino: "Na asma, gravidade se mede pelo corpo: número de palavras por frase, musculatura acessória, posição, e não pela oximetria, que cai tarde. Tórax silencioso não é melhora, é ausência de fluxo. E queda da frequência respiratória com sonolência marca exaustão: é hora de preparar a via aérea, não de observar."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela é intubada, mas depois de oito minutos de hipoxemia adicional e com a equipe correndo. A recuperação leva quatro dias em terapia intensiva, sem sequela permanente."
ensino: "A ventilação não invasiva exige colaboração e nível de consciência preservado. Quando o paciente já rebaixou, insistir custa minutos caros. Na asma quase fatal, o material de intubação deve estar aberto antes de qualquer tentativa intermediária."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Nove minutos depois ela apresenta parada respiratória seguida de parada cardíaca por hipóxia. Volta a circulação após seis minutos de reanimação, mas com lesão neurológica que ainda estará sendo avaliada semanas depois."
ensino: "Os três sinais de alarme desta crise apareceram na ordem clássica: tórax silencioso, rebaixamento de consciência e queda paradoxal da frequência respiratória. Cada um deles, sozinho, já indicava preparar a via aérea. Interpretados como melhora, eles se tornam o intervalo entre a crise e a parada."
:::
