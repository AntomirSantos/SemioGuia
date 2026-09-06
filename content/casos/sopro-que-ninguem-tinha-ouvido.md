---
id: sopro-que-ninguem-tinha-ouvido
titulo: O sopro que ninguém tinha ouvido antes
contexto: "Ambulatório, consulta para exame admissional de um novo emprego. Um homem de 44 anos, assintomático, corre cinco quilômetros três vezes por semana. Durante a ausculta de rotina, você encontra um sopro que ele diz que nunca ninguém mencionou. Ele pergunta se pode assinar o atestado."
tags: [cardiovascular, sopro, ausculta, ambulatorial]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/sopros-cardiacos
  - aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca
  - aparelho-cardiovascular/exame-cardiaco/inspecao-e-palpacao-do-precordio
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de sopros cardíacos"
  - "Porto, Semiologia Médica, 8ª ed., seção de ausculta cardíaca e sopros"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia cardiovascular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está tranquilo, sem queixas. Nunca teve desmaio, dor no peito nem falta de ar desproporcional ao esforço. Não conhece caso de morte súbita na família. Corre há oito anos e melhorou o tempo do último ano. A pressão é 124 x 76 mmHg e o pulso, regular, de 58 bpm."
dados:
  - "Assintomático, atividade física regular e intensa"
  - "Sem síncope, dor torácica ou dispneia"
  - "Sem história familiar de morte súbita"
  - "PA 124 x 76 mmHg, FC 58 bpm"
  - "Sopro percebido na ausculta de rotina"
proximo: d-caracterizacao
:::

::: no
tipo: decisao
id: d-caracterizacao
pergunta: "Qual é o próximo passo diante de um sopro assintomático?"
opcoes:
  - texto: "Caracterizar o sopro por completo: momento no ciclo, foco de maior intensidade, irradiação, intensidade, timbre, e como ele muda com manobras."
    avaliacao: otima
    feedback: "A caracterização é o que separa o sopro que exige investigação do que não exige, e ela é gratuita. Os elementos essenciais são poucos: se é sistólico ou diastólico, onde é mais forte, para onde irradia, quanto é intenso, e como responde a manobras que mudam o volume do ventrículo. Sem isso, todo sopro vira pedido de ecocardiograma."
    proximo: c-exame
  - texto: "Solicitar ecocardiograma para todo sopro encontrado, que é o exame que dá a resposta definitiva."
    avaliacao: aceitavel
    feedback: "O ecocardiograma responde bem e não é ilimitado, e boa parte dos sopros sistólicos suaves em pessoas assintomáticas é inocente. A caracterização define quem realmente precisa. Nesta consulta, ela custa três minutos e pode evitar um exame ou, ao contrário, torná-lo urgente."
    proximo: c-exame
  - texto: "Como ele é assintomático e atleta, assinar o atestado e registrar o sopro para acompanhamento futuro."
    avaliacao: erro
    feedback: "Boa parte dos casos de morte súbita em quem pratica esporte ocorre em pessoas que eram assintomáticas até o evento. Assinar o atestado sem caracterizar um sopro novo em quem faz esforço intenso é justamente o cenário em que o exame teria mais valor."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "O sopro é sistólico, de ejeção, mais audível na borda esternal esquerda média e baixa, sem irradiação para as carótidas, de intensidade moderada. O ictus é sustentado e discretamente deslocado. Ao pedir que ele fique de cócoras e depois se levante rapidamente, o sopro aumenta na posição em pé. Na manobra de esforço expiratório com a glote fechada, ele também aumenta."
dados:
  - "Sopro sistólico de ejeção, borda esternal esquerda"
  - "Sem irradiação para carótidas"
  - "Aumenta ao levantar da posição de cócoras"
  - "Aumenta com esforço expiratório contra a glote fechada"
  - "Ictus sustentado, discretamente deslocado"
proximo: d-manobras
:::

::: no
tipo: decisao
id: d-manobras
pergunta: "O sopro aumenta nas manobras que reduzem o volume do ventrículo. O que isso significa?"
opcoes:
  - texto: "Aponta obstrução dinâmica na saída do ventrículo esquerdo: quando o ventrículo tem menos volume, a obstrução piora e o sopro aumenta, comportamento oposto ao da maioria dos sopros."
    avaliacao: otima
    feedback: "A regra geral é simples e vale a pena guardar: quase todos os sopros diminuem quando o volume do ventrículo cai, porque passa menos sangue. O sopro da obstrução dinâmica faz o contrário, porque o ventrículo mais vazio aproxima as estruturas que obstruem. É um dos poucos lugares da semiologia em que uma manobra de dez segundos aponta o diagnóstico."
    proximo: c-conduta
  - texto: "Confirma sopro inocente, já que sopros funcionais também variam com a posição."
    avaliacao: erro
    feedback: "Sopros inocentes variam com a posição, e no sentido oposto: eles diminuem quando o retorno venoso cai, porque dependem do fluxo. Aumentar de pé e com a manobra de esforço expiratório é o comportamento característico da obstrução dinâmica, e ele retira o sopro da categoria de inocente."
    proximo: c-conduta
  - texto: "Indica estenose aórtica, que é a causa mais comum de sopro sistólico de ejeção nessa faixa etária."
    avaliacao: aceitavel
    feedback: "A estenose aórtica é hipótese obrigatória em sopro sistólico de ejeção, e o padrão aqui não combina: ela irradia para as carótidas e diminui quando o volume ventricular cai. A ausência de irradiação carotídea e o aumento nas manobras apontam para outro mecanismo."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Ele pergunta de novo sobre o atestado, dizendo que começa no emprego novo na segunda-feira e que corre há oito anos sem problema nenhum. O ecocardiograma disponível pelo convênio dele sai em três semanas."
dados:
  - "Paciente assintomático, deseja liberação imediata"
  - "Ecocardiograma disponível em 3 semanas"
  - "Sopro com comportamento de obstrução dinâmica"
proximo: d-liberacao
:::

::: no
tipo: decisao
id: d-liberacao
pergunta: "O que você decide sobre o atestado e sobre a corrida?"
opcoes:
  - texto: "Não liberar para esforço intenso até a investigação, explicar o motivo com clareza, encaminhar à cardiologia com prioridade e antecipar o ecocardiograma se possível."
    avaliacao: otima
    feedback: "A restrição temporária de esforço intenso é justamente a medida que protege enquanto a hipótese não é afastada, porque a arritmia grave nessa condição costuma aparecer durante ou logo após o exercício vigoroso. Explicar o porquê é o que garante adesão: um atleta que não entende a restrição não a cumpre."
    proximo: fim-otimo
  - texto: "Liberar para o trabalho e para a corrida, com a recomendação de fazer o ecocardiograma nas próximas semanas."
    avaliacao: erro
    feedback: "A liberação transmite que não há risco relevante, e é justamente durante o esforço intenso que o risco se materializa nessa condição. Três semanas de corrida com uma obstrução dinâmica não investigada é a aposta que não vale a pena, sobretudo porque adiar a corrida não custa nada ao paciente."
    proximo: fim-dano
  - texto: "Liberar para o trabalho administrativo e apenas orientar reduzir a intensidade da corrida até o exame."
    avaliacao: aceitavel
    feedback: "Separar o trabalho do esporte está correto, e a orientação de reduzir a intensidade é vaga demais: cada pessoa entende uma coisa por reduzir. A instrução precisa ser específica, com exemplos do que pode e do que não pode, até o resultado sair."
    proximo: c-vago
:::

::: no
tipo: cena
id: c-vago
texto: "Ele interpreta reduzir como correr o mesmo percurso mais devagar. Duas semanas depois tem um episódio de tontura intensa no fim da corrida, com quase perda de consciência, que o assusta o suficiente para procurar a emergência."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O ecocardiograma, antecipado para a semana seguinte, mostra hipertrofia septal assimétrica com obstrução na via de saída. Ele é acompanhado pela cardiologia, recebe orientação sobre atividade física adequada e sobre rastreio dos familiares. Continua ativo, com um plano de exercício seguro, e nunca teve evento."
ensino: "Todo sopro merece caracterização antes de virar pedido de exame: momento, foco, irradiação, intensidade e resposta a manobras. E existe uma regra que resolve muito: quase todos os sopros diminuem quando o volume do ventrículo cai, e o da obstrução dinâmica aumenta. Diante desse padrão em quem faz esforço intenso, a restrição temporária vale mais que o atestado assinado."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele investiga após um episódio de quase síncope no esforço, que poderia ter sido evitado com orientação mais específica. O diagnóstico é o mesmo e o acompanhamento começa bem."
ensino: "Orientação vaga vira interpretação livre. Restringir esforço exige instrução concreta, com exemplos do que está liberado e do que não está, e um prazo definido até o resultado do exame."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "No décimo dia após a consulta, ele apresenta parada cardíaca no fim de um treino. É socorrido por um colega que iniciou reanimação e sobrevive com desfibrilação no local, com lesão neurológica leve e um desfibrilador implantável."
ensino: "A obstrução dinâmica na via de saída do ventrículo esquerdo é das causas mais conhecidas de morte súbita em jovens e atletas, e o evento acontece tipicamente durante ou logo após o esforço vigoroso. Enquanto a hipótese não é afastada, restringir o esforço intenso é uma medida barata contra um risco muito caro."
:::
