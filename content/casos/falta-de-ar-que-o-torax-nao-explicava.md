---
id: falta-de-ar-que-o-torax-nao-explicava
titulo: A falta de ar que o tórax não explicava
contexto: "Pronto socorro de uma tarde de terça. Uma mulher de 38 anos, operada de fratura de tornozelo há doze dias e ainda com a bota imobilizadora, chega dizendo que ficou sem ar de repente enquanto assistia à novela. Ela mesma sugere que pode ser ansiedade, porque anda dormindo mal desde a cirurgia."
tags: [respiratorio, tromboembolismo, dispneia, emergencia]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
  - sistema-vascular-periferico/exame-vascular-periferico/doenca-venosa-cronica-e-trombose
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame pulmonar e de doença tromboembólica"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho respiratório"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia respiratória"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está sentada, respirando rápido, e completa as frases sem dificuldade. Diz que dói para respirar fundo do lado direito, uma dor que 'espeta' e some quando ela para de puxar o ar. Nega febre, nega tosse com secreção. A triagem anotou 'crise de ansiedade' como hipótese."
dados:
  - "FR 28 irpm, FC 118 bpm"
  - "Saturação 92% em ar ambiente"
  - "PA 118 x 74 mmHg, temperatura 37,2 graus"
  - "Dor pleurítica à direita, início súbito há 2 horas"
  - "Pós-operatório de tornozelo, imobilizada há 12 dias"
proximo: d-triagem
:::

::: no
tipo: decisao
id: d-triagem
pergunta: "A ausculta pulmonar é limpa nos dois hemitórax e a percussão é normal. O que fazer com esse tórax sem achados?"
opcoes:
  - texto: "Considerar que um tórax normal em quem está taquipneica, taquicárdica e hipoxêmica aumenta a suspeita de embolia, e ir procurar os achados fora do tórax."
    avaliacao: otima
    feedback: "É o raciocínio invertido que este diagnóstico exige. Pneumonia, derrame e pneumotórax deixam marca na percussão ou na ausculta; a embolia costuma não deixar. Um pulmão que examina normal diante de hipoxemia e taquipneia empurra a suspeita para cima, não para baixo, e manda o exame para as pernas, para o pescoço e para o foco pulmonar."
    proximo: c-exame
  - texto: "Concluir que, sem achados no tórax e com histórico de insônia, a hipótese de crise de ansiedade se sustenta, orientar respiração e liberar."
    avaliacao: erro
    feedback: "Ansiedade não costuma derrubar a saturação. Hipoxemia com pulmão limpo é um dos alertas mais úteis da emergência, e o contexto aqui é gritante: imobilização recente e cirurgia há doze dias. Atribuir a sintoma emocional o que tem explicação mecânica é o caminho mais frequente para o desfecho ruim nesta doença."
    proximo: c-atraso
  - texto: "Pedir a radiografia de tórax e decidir com ela na mão."
    avaliacao: aceitavel
    feedback: "A radiografia é útil sobretudo para afastar as outras causas, e costuma vir normal ou quase normal na embolia. Peça, mas não espere por ela para completar o exame: as pernas e o foco pulmonar respondem mais rápido."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela é liberada com orientação de respirar devagar. Três horas depois volta de ambulância, mais cansada, com a respiração ainda mais rápida e precisando de oxigênio para se manter confortável. O tempo perdido é o intervalo em que o trombo pôde crescer sem que nada o impedisse."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Você despe as duas pernas e compara. A panturrilha direita está mais grossa que a esquerda, mede três centímetros a mais na mesma altura, e a compressão suave da musculatura dói. A pele está discretamente mais quente. No foco pulmonar, o componente pulmonar da segunda bulha soa mais forte que o habitual. No pescoço, a coluna jugular está um pouco elevada."
dados:
  - "Panturrilha direita 3 cm maior que a esquerda, dolorosa e empastada"
  - "Segunda bulha com componente pulmonar acentuado"
  - "Pressão venosa jugular discretamente elevada"
  - "Ausculta pulmonar mantém-se limpa"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Como esses achados fora do tórax mudam o raciocínio?"
opcoes:
  - texto: "Fecham a linha do raciocínio: a perna assimétrica dá a origem, a segunda bulha acentuada e a jugular elevada mostram o coração direito sob pressão."
    avaliacao: otima
    feedback: "É a doença contada em três estações. A trombose fornece o material, o pulmão fornece a obstrução e o ventrículo direito paga a conta. Um componente pulmonar mais forte da segunda bulha traduz hipertensão na artéria pulmonar aguda, e a jugular elevada mostra que a câmara direita começou a sofrer. Esses achados também definem gravidade, não só diagnóstico."
    proximo: c-gravidade
  - texto: "Explicam a perna, não o pulmão: o mais provável é dor muscular pelo repouso e uma bulha de difícil interpretação."
    avaliacao: erro
    feedback: "Panturrilha três centímetros maior, dolorosa e mais quente em membro imobilizado é o contrário de um achado banal. E a segunda bulha acentuada não precisa ser difícil: compare o foco pulmonar com o aórtico no mesmo paciente. Separar os achados em compartimentos independentes desfaz um diagnóstico que já estava montado."
    proximo: c-gravidade
  - texto: "Confirmam a trombose, e por isso o próximo passo é o ultrassom de membros antes de qualquer decisão."
    avaliacao: aceitavel
    feedback: "O ultrassom confirma a origem e é bem-vindo, mas ele não define o que está acontecendo no pulmão agora, e é o pulmão que está consumindo a reserva dela. Peça o exame sem transformá-lo em condição para tratar."
    proximo: c-gravidade
:::

::: no
tipo: cena
id: c-gravidade
texto: "Enquanto a angiotomografia é agendada, a saturação cai para 90% com oxigênio por cateter e a frequência sobe para 126 bpm. A pressão se mantém em 110 x 70 mmHg. Não há sangramento ativo, cirurgia recente de grande porte nem antecedente de hemorragia."
dados:
  - "Saturação 90% com cateter nasal"
  - "FC 126 bpm, PA 110 x 70 mmHg"
  - "Sem contraindicação evidente à anticoagulação"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "A tomografia só sai daqui a duas horas. O que você faz nesse intervalo?"
opcoes:
  - texto: "Anticoagular já, com base na alta suspeita clínica, mantendo oxigênio e monitorização enquanto a imagem não chega."
    avaliacao: otima
    feedback: "Com suspeita alta e sem contraindicação, o tratamento precede a confirmação: cada hora sem anticoagulante é uma hora em que o trombo pode crescer e novos êmbolos podem sair da mesma perna. Se a imagem afastar, suspende-se. A ordem inversa custa mais do que corrige."
    proximo: fim-otimo
  - texto: "Aguardar a angiotomografia: anticoagular sem confirmação expõe a paciente a sangramento sem necessidade."
    avaliacao: erro
    feedback: "O receio é legítimo em suspeita baixa e mal calibrado aqui. Nesta paciente a probabilidade é alta e o risco de sangramento é baixo. Nas duas horas de espera o quadro pode deixar de ser uma embolia que responde bem e passar a ser uma que compromete a circulação."
    proximo: fim-dano
  - texto: "Solicitar o dímero D para reforçar a indicação antes de anticoagular."
    avaliacao: aceitavel
    feedback: "Este exame serve para afastar quando a suspeita é baixa, e aqui ela é alta: um resultado normal não mudaria a conduta e um alterado não acrescenta nada. Pedir não causa dano direto, mas consome o tempo e a atenção que deveriam ir para o tratamento."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "O resultado sai em quarenta minutos, bastante alterado, como era esperado. A anticoagulação começa com esse atraso, e a tomografia confirma embolia em ramos lobares bilaterais."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A anticoagulação começa duas horas antes da imagem. A tomografia confirma embolia bilateral com sinais de sobrecarga do ventrículo direito. Ela melhora nas primeiras vinte e quatro horas, não precisa de trombólise e recebe alta no quinto dia, com a profilaxia que faltou no pós-operatório finalmente explicada."
ensino: "Na embolia pulmonar o tórax costuma examinar normal, e é justamente isso que deveria aumentar a suspeita quando há hipoxemia e taquipneia. Os achados que sustentam o diagnóstico moram fora do tórax: a perna assimétrica, o componente pulmonar acentuado da segunda bulha e a jugular elevada. Com alta suspeita e sem contraindicação, anticoagula-se antes da imagem."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela recebe o tratamento correto, com quarenta minutos de atraso gastos em um exame que não mudaria a conduta. A evolução é boa, com internação um dia mais longa."
ensino: "Testes que servem para afastar perdem a função quando a probabilidade já é alta. Reconhecer para que serve cada exame evita transformar propedêutica em espera."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Durante a espera pela tomografia ela apresenta síncope, hipotensão e precisa de vasopressor. A embolia agora compromete a circulação e o tratamento passa a ser trombólise, com todos os riscos que ela carrega. Sobrevive, mas com quinze dias de internação e sequela de capacidade funcional."
ensino: "A janela terapêutica da embolia se fecha enquanto a imagem é agendada. Em paciente com alta probabilidade clínica e sem risco relevante de sangramento, esperar a confirmação para começar o anticoagulante é escolher o risco maior."
:::
