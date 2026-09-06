---
id: bebe-que-nao-ganha-peso
titulo: O bebê que não ganha peso
contexto: "Consulta de puericultura. Uma mãe traz o filho de 7 meses para a consulta de rotina. Ela diz que ele mama bem e come tudo o que oferece. A caderneta mostra que o peso, que vinha subindo na mesma faixa desde o nascimento, cruzou duas linhas para baixo nos últimos três meses."
tags: [crianca, crescimento, curva de peso, puericultura]
topicosDeApoio:
  - semiologia-da-crianca/exame-da-crianca/crescimento-sinais-vitais-e-hidratacao
  - semiologia-da-crianca/exame-da-crianca/abordagem-e-anamnese-da-crianca
  - semiologia-da-crianca/exame-da-crianca/do-recem-nascido-ao-adolescente
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de semiologia pediátrica e crescimento"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia da criança"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame geral e antropometria"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "O bebê está alerta, sorri e pega os objetos que você oferece. Senta com apoio e leva as mãos à boca. A mãe diz que ele mama no peito e que começou a oferecer comida aos seis meses. Ele está magro, com as costelas visíveis e pouca gordura nas coxas. O comprimento está na mesma faixa de sempre."
dados:
  - "Peso cruzando duas linhas para baixo em 3 meses"
  - "Comprimento e perímetro cefálico preservados"
  - "Desenvolvimento neuropsicomotor adequado"
  - "Aleitamento materno e introdução alimentar aos 6 meses"
  - "Criança ativa e reativa"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Como você lê a curva de peso desta criança?"
opcoes:
  - texto: "O que importa é a trajetória, não o ponto: cruzar duas faixas para baixo em três meses é sinal de alerta, mesmo que o peso ainda esteja dentro da normalidade."
    avaliacao: otima
    feedback: "A curva de crescimento é uma linha, não um ponto. Uma criança pequena que cresce paralela à própria faixa costuma estar bem; uma criança de peso normal que atravessa faixas para baixo em poucos meses está perdendo velocidade de ganho, e é isso que preocupa. Por isso a caderneta preenchida vale mais que qualquer medida isolada."
    proximo: c-avaliacao
  - texto: "Como variação normal: o peso ainda está dentro da faixa de normalidade para a idade."
    avaliacao: erro
    feedback: "Ficar dentro da faixa esconde a informação mais importante. Uma criança que vinha em uma trajetória e mudou de rumo está sinalizando algo, mesmo antes de sair da normalidade. Esperar que ela saia da faixa é esperar a desnutrição se instalar para agir."
    proximo: c-atraso
  - texto: "Como provável erro de medida: repetir o peso em outra balança e reavaliar em dois meses."
    avaliacao: aceitavel
    feedback: "Conferir a medida é sempre razoável, e é rápido: pesar de novo, na mesma consulta, com a criança despida. O que não cabe é usar a dúvida como motivo para adiar dois meses, porque a trajetória já está registrada em três pontos consecutivos."
    proximo: c-avaliacao
:::

::: no
tipo: cena
id: c-atraso
texto: "Na consulta seguinte, dois meses depois, o peso cruzou mais uma faixa e a criança já não fica em pé com apoio, marco que ela deveria estar alcançando. A investigação começa agora, com atraso do desenvolvimento associado."
proximo: c-avaliacao
:::

::: no
tipo: cena
id: c-avaliacao
texto: "Você repete o peso, que se confirma. O exame físico não mostra sopros, o abdome é normal, não há visceromegalias nem edema, e não há sinais de doença crônica. Você pede que a mãe descreva um dia inteiro de alimentação, hora por hora. Ela conta que o bebê mama cinco vezes ao dia e recebe 'papinha' duas vezes, mas descreve as papas como caldos ralos, coados, oferecidos em mamadeira."
dados:
  - "Exame físico sem sinais de doença orgânica"
  - "Cinco mamadas ao dia"
  - "Duas refeições de consistência muito diluída"
  - "Alimentos oferecidos coados e em mamadeira"
  - "Sem vômitos, sem diarreia, sem febre"
proximo: d-causa
:::

::: no
tipo: decisao
id: d-causa
pergunta: "O que a descrição da alimentação sugere?"
opcoes:
  - texto: "Oferta calórica insuficiente por erro de consistência e de técnica: caldos ralos e coados têm pouca energia, e a mamadeira substitui a refeição em vez de complementá-la."
    avaliacao: otima
    feedback: "A causa mais comum de ganho insuficiente de peso nessa idade não é doença orgânica, é oferta inadequada, e o detalhe está na consistência. A comida amassada tem muito mais energia por colherada que o caldo coado, e a criança tem capacidade gástrica pequena. Perguntar sobre a alimentação hora a hora, e não em geral, é o que revela isso."
    proximo: c-orientacao
  - texto: "Provável doença orgânica ainda não identificada: solicitar investigação laboratorial ampla e encaminhar à gastroenterologia pediátrica."
    avaliacao: erro
    feedback: "A investigação ampla tem lugar quando há sinais de doença ou quando a correção da oferta não funciona. Com exame normal, desenvolvimento adequado e um erro alimentar identificado, começar pela bateria de exames expõe a criança a coletas e gera ansiedade sem responder à pergunta que já foi respondida."
    proximo: c-investigacao
  - texto: "Insuficiência de leite materno: orientar a introdução de fórmula para complementar."
    avaliacao: aceitavel
    feedback: "A produção de leite pode ser um fator e não é o que a história aponta. Antes de introduzir fórmula, vale corrigir o que está claramente errado, que é a consistência e o modo de oferta da alimentação complementar, e reavaliar em intervalo curto."
    proximo: c-orientacao
:::

::: no
tipo: cena
id: c-investigacao
texto: "Os exames voltam todos normais, depois de duas coletas de sangue e de uma espera de três semanas por consulta especializada. O especialista faz exatamente a pergunta que faltava sobre a consistência da comida, e o diagnóstico é o mesmo."
proximo: c-orientacao
:::

::: no
tipo: cena
id: c-orientacao
texto: "Você explica a mudança necessária: comida amassada com garfo, e não coada nem batida, oferecida na colher, com fontes de energia e de ferro, mantendo o peito. A mãe escuta e diz, com culpa evidente, que fez tudo o que a avó ensinou e que 'não sabia que estava fazendo errado'."
dados:
  - "Orientação de consistência e de técnica dada"
  - "Mãe demonstra culpa"
  - "Rede de apoio orienta práticas antigas"
  - "Peito mantido"
proximo: d-vinculo
:::

::: no
tipo: decisao
id: d-vinculo
pergunta: "Como você conduz a devolutiva diante da culpa dela?"
opcoes:
  - texto: "Retirar a culpa de forma explícita, valorizar o que ela faz bem, deixar a orientação por escrito e marcar retorno em duas semanas para pesar de novo."
    avaliacao: otima
    feedback: "Culpa atrapalha a adesão e afasta a família do serviço. Dizer com todas as letras que a informação faltou, e não o cuidado, muda a relação. E o retorno curto tem duas funções: confirma se a correção funcionou e, se não funcionar, indica que a investigação orgânica passa a ser necessária."
    proximo: fim-otimo
  - texto: "Reforçar a importância de seguir a orientação corretamente, para que o erro não se repita."
    avaliacao: erro
    feedback: "O reforço na forma de advertência aumenta a culpa e reduz a chance de a mãe voltar e contar a verdade sobre o que conseguiu fazer. Famílias que se sentem julgadas passam a relatar o que acham que o profissional quer ouvir, e a próxima consulta perde valor."
    proximo: fim-dano
  - texto: "Dar a orientação e marcar o retorno para a próxima consulta de rotina, dali a dois meses."
    avaliacao: aceitavel
    feedback: "A orientação está correta e o intervalo é longo demais. Duas semanas permitem verificar se a curva mudou de direção, e é esse dado que separa erro alimentar corrigido de doença que ainda precisa ser investigada."
    proximo: c-intervalo
:::

::: no
tipo: cena
id: c-intervalo
texto: "Dois meses depois o peso melhorou pouco, e só então descobre-se que a mãe manteve a mamadeira porque achou que o bebê recusava a colher. A técnica é finalmente ajustada com apoio prático."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Em duas semanas o peso já mostra ganho, e em três meses a curva volta à faixa anterior. O desenvolvimento segue adequado. A mãe conta que a avó também mudou o jeito de preparar a comida depois da explicação, e traz o bebê para todas as consultas seguintes."
ensino: "A curva de crescimento é uma trajetória: cruzar faixas para baixo é sinal de alerta mesmo com peso dentro da normalidade. Antes de investigar doença, é preciso investigar a oferta, e isso se faz perguntando um dia inteiro de alimentação, hora por hora, porque o erro costuma estar na consistência. E a devolutiva sem culpa é o que garante que a família volte."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O ganho de peso demora dois meses a mais do que precisaria, até que a dificuldade prática com a colher fosse identificada e resolvida."
ensino: "Retorno curto depois de uma orientação alimentar não é excesso de zelo: é o que verifica se a correção funcionou e, quando não funciona, o que indica que a investigação orgânica passou a ser necessária."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sentindo-se julgada, a mãe deixa de trazer o bebê às consultas seguintes. Ele retorna aos onze meses, agora com desnutrição estabelecida, anemia e atraso do desenvolvimento motor, exigindo acompanhamento intensivo por meses."
ensino: "Culpa afasta a família do serviço, e uma criança que não volta é uma criança sem acompanhamento. Nomear que faltou informação, e não cuidado, é o que preserva o vínculo, e o vínculo é o que permite corrigir o rumo nas consultas seguintes."
:::
