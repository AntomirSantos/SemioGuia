---
id: memoria-que-a-familia-notou
titulo: A memória que a família notou primeiro
contexto: "Ambulatório de clínica geral. Uma mulher de 76 anos vem trazida pelo filho, que diz que ela 'está esquecida'. Ela discorda, e afirma que está bem. O filho conta que ela repete as mesmas perguntas, deixou de pagar contas que sempre pagou e se perdeu voltando de um endereço conhecido."
tags: [psiquico, memoria, demencia, depressao]
topicosDeApoio:
  - exame-psiquico/exame-psiquico/delirium-demencia-e-depressao
  - exame-psiquico/exame-psiquico/escalas-cognitivas-a-beira-do-leito
  - exame-psiquico/exame-psiquico/funcoes-psiquicas-e-seus-disturbios
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame psíquico e do idoso"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de avaliação do estado mental"
  - "Semiologia Clínica, 1ª ed., capítulo de exame psíquico"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está bem vestida, cordial, e responde às perguntas sociais com naturalidade. Quando você pergunta sobre a memória, diz que 'todo mundo esquece coisas'. O filho insiste que a mudança é dos últimos dois anos, gradual, e que piorou desde a morte do marido dela, há dez meses. Ela mora sozinha desde então."
dados:
  - "Queixa de esquecimento trazida pelo familiar, negada pela paciente"
  - "Evolução gradual em 2 anos"
  - "Perda de autonomia em atividades antes preservadas"
  - "Viuvez há 10 meses, mora sozinha"
  - "Comportamento social preservado na consulta"
proximo: d-fonte
:::

::: no
tipo: decisao
id: d-fonte
pergunta: "Ela nega e o filho afirma. Como você começa?"
opcoes:
  - texto: "Valorizar as duas fontes: colher a história funcional com o filho, com exemplos concretos do dia a dia, e avaliar a paciente com instrumento objetivo, a sós."
    avaliacao: otima
    feedback: "Nesta queixa, quem informa melhor sobre o declínio costuma ser quem convive, porque o próprio paciente pode não perceber a mudança. O que importa não é a impressão do familiar, e sim os exemplos: parou de fazer o quê, desde quando, com que frequência. E a avaliação da paciente precisa acontecer a sós, para que ela não seja corrigida nem constrangida."
    proximo: c-avaliacao
  - texto: "Confiar na avaliação direta: se ela conversa bem e está orientada, não há declínio relevante."
    avaliacao: erro
    feedback: "O comportamento social costuma ser das últimas coisas a se perder, e muitos pacientes conversam com naturalidade enquanto já não conseguem administrar a própria vida. É justamente por isso que a história funcional do familiar vale tanto: ela mede o que a conversa não mede."
    proximo: c-atraso
  - texto: "Aceitar o relato do filho e iniciar tratamento para demência, dada a clareza dos exemplos."
    avaliacao: aceitavel
    feedback: "Os exemplos são realmente sugestivos e não dispensam a avaliação objetiva nem a investigação de causas reversíveis. Rotular sem medir também prejudica o acompanhamento, porque não haverá referência para comparar daqui a um ano."
    proximo: c-avaliacao
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela é liberada sem investigação, com a orientação de retornar se piorar. Cinco meses depois, o filho a encontra com o fogão ligado e a panela queimada, e a consulta recomeça de onde deveria ter começado."
proximo: c-avaliacao
:::

::: no
tipo: cena
id: c-avaliacao
texto: "A sós, ela aceita ser avaliada. No instrumento cognitivo aplicado, tem desempenho abaixo do esperado para a escolaridade, com maior comprometimento em memória de evocação e em funções executivas: não consegue lembrar de duas de três palavras após alguns minutos, nem mesmo com pistas, e erra o desenho do relógio. A orientação temporal está prejudicada. O humor, questionado com escala apropriada, não mostra sinais de depressão, e ela nega tristeza persistente e anedonia."
dados:
  - "Desempenho cognitivo abaixo do esperado para a escolaridade"
  - "Evocação prejudicada mesmo com pistas"
  - "Desenho do relógio alterado"
  - "Rastreio de depressão negativo"
  - "Orientação temporal comprometida"
proximo: d-diferencial
:::

::: no
tipo: decisao
id: d-diferencial
pergunta: "Como você separa demência de depressão neste caso?"
opcoes:
  - texto: "Pelo conjunto: evolução gradual de anos, evocação que não melhora com pistas, alteração de funções executivas, humor sem sinais de depressão e a própria paciente minimizando o problema."
    avaliacao: otima
    feedback: "Existem diferenças úteis. Na depressão o paciente costuma se queixar muito da memória e ter desempenho que melhora com pistas e com estímulo, além de humor claramente rebaixado e início mais delimitado no tempo. Na demência é o contrário: quem se queixa é a família, a pista não recupera a informação e a evolução é lenta. Aqui todos os elementos apontam para o mesmo lado."
    proximo: c-investigacao
  - texto: "Atribuir ao luto recente, já que a piora foi notada após a morte do marido."
    avaliacao: erro
    feedback: "O luto pode agravar o quadro e não explica o início gradual dois anos antes nem a alteração das funções executivas. Atribuir tudo à perda recente é a explicação mais confortável e a que mais atrasa o diagnóstico, além de deixar de investigar causas potencialmente reversíveis."
    proximo: c-investigacao
  - texto: "Iniciar antidepressivo por prova terapêutica e reavaliar a cognição em três meses."
    avaliacao: aceitavel
    feedback: "A prova terapêutica tem lugar quando o rastreio de depressão é positivo ou duvidoso, e aqui ele foi negativo. Antes disso, a investigação de causas reversíveis é obrigatória, e ela é simples: exames laboratoriais básicos e imagem quando indicada."
    proximo: c-investigacao
:::

::: no
tipo: cena
id: c-investigacao
texto: "Você solicita a investigação de causas reversíveis, incluindo função tireoidiana, vitaminas, função renal e hepática, e imagem de crânio. Tudo volta sem alterações que expliquem o quadro. O filho pergunta o que fazer e diz que ela mora sozinha e continua dirigindo até o mercado."
dados:
  - "Investigação de causas reversíveis sem alterações"
  - "Paciente mora sozinha"
  - "Continua dirigindo"
  - "Administra a própria medicação"
proximo: d-seguranca
:::

::: no
tipo: decisao
id: d-seguranca
pergunta: "O que precisa entrar no plano além do diagnóstico?"
opcoes:
  - texto: "Avaliar segurança de forma concreta: direção, fogão, medicações, finanças e risco de se perder, e construir um plano com a família e com ela, preservando o máximo de autonomia possível."
    avaliacao: otima
    feedback: "O diagnóstico muda pouco a vida se a segurança não for tratada. Cada domínio tem solução própria: caixa organizadora e supervisão para medicação, ajuda com as contas, avaliação formal da direção, adaptações na cozinha, identificação com contato no bolso. E a decisão precisa incluir a paciente, porque autonomia se perde por partes, não de uma vez."
    proximo: fim-otimo
  - texto: "Encaminhar à neurologia e deixar as questões práticas para a avaliação especializada."
    avaliacao: aceitavel
    feedback: "O encaminhamento é adequado e a segurança não pode esperar por ele. As perguntas sobre fogão, medicação e direção são de quem está com a família na frente, hoje, e as respostas não dependem de especialista."
    proximo: c-espera
  - texto: "Orientar o filho a assumir todas as decisões e retirar imediatamente a autonomia dela."
    avaliacao: erro
    feedback: "Retirar tudo de uma vez acelera a perda funcional e costuma gerar conflito e resistência. A autonomia se ajusta por domínios, mantendo o que ela ainda faz com segurança. Além disso, decisões sobre a vida dela precisam incluí-la enquanto houver capacidade para participar."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-espera
texto: "A consulta com a neurologia sai em três meses. Nesse intervalo, ela se perde uma vez voltando do mercado e é trazida por um vizinho. Nada de grave acontece, e a família se assusta o suficiente para procurar ajuda antes da data marcada."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com o plano de segurança organizado e apoio domiciliar duas vezes por semana, ela mantém a rotina com supervisão. A direção é reavaliada formalmente e ela aceita parar depois de dirigir mais alguns meses acompanhada. O diagnóstico é confirmado e o tratamento, iniciado. Ela segue morando na própria casa por mais dois anos."
ensino: "Na queixa de memória, quem melhor informa sobre o declínio é quem convive, e o que importa são os exemplos funcionais concretos. A avaliação objetiva precisa ser feita a sós e com instrumento. Depressão e demência se separam por evolução, resposta a pistas, humor e por quem se queixa. E o plano não termina no diagnóstico: segurança é parte do tratamento."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O plano de segurança é organizado três meses depois, após um episódio em que ela se perdeu voltando para casa, sem consequências."
ensino: "As questões de segurança não dependem do especialista: fogão, medicação, finanças, direção e risco de se perder são conversas para a consulta em que a família está presente. Adiar por encaminhamento é deixar meses de risco sem cobertura."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com todas as decisões transferidas ao filho de uma vez, ela reage com irritação e desconfiança, passa a esconder informações e recusa as consultas seguintes. Em quatro meses, perde funcionalidade de forma acelerada e o conflito familiar se instala."
ensino: "Autonomia se perde por domínios e o cuidado deve seguir o mesmo ritmo. Retirar tudo de uma vez acelera o declínio funcional, gera conflito e afasta o paciente do acompanhamento, justamente quando ele mais precisa de vínculo."
:::
