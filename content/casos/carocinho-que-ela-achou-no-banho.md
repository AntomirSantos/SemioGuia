---
id: carocinho-que-ela-achou-no-banho
titulo: O carocinho que ela achou no banho
contexto: "Ambulatório de clínica geral. Uma mulher de 48 anos vem porque encontrou um nódulo na mama esquerda durante o banho, há duas semanas. Ela está nitidamente ansiosa e diz que a mãe teve câncer de mama aos 60 anos. Fez a última mamografia há três anos, que veio normal."
tags: [mamas, nodulo mamario, exame das mamas, ambulatorial]
topicosDeApoio:
  - mamas-e-geniturinario/exame-das-mamas/nodulo-mamario-e-descarga-papilar
  - mamas-e-geniturinario/exame-das-mamas/exame-das-mamas
  - exame-fisico-geral/avaliacao-geral/linfonodos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame das mamas"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame das mamas"
  - "Semiologia Clínica, 1ª ed., capítulo de exame das mamas"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela pergunta, antes de qualquer coisa, se você acha que é câncer. Conta que percebeu o nódulo por acaso, que ele não dói, e que não notou mudança de tamanho nessas duas semanas. Ainda menstrua, com ciclos regulares. Não teve filhos. Nunca usou terapia hormonal."
dados:
  - "Nódulo mamário percebido pela paciente há 2 semanas"
  - "Indolor, sem mudança perceptível de tamanho"
  - "Mãe com câncer de mama aos 60 anos"
  - "Nuligesta, ciclos regulares"
  - "Última mamografia há 3 anos, normal"
proximo: d-conducao
:::

::: no
tipo: decisao
id: d-conducao
pergunta: "Ela pergunta se é câncer antes do exame. Como você conduz?"
opcoes:
  - texto: "Reconhecer o medo, explicar que a maioria dos nódulos não é câncer e que o exame de hoje mais os exames de imagem definirão isso, e então examinar com calma."
    avaliacao: otima
    feedback: "Nomear o medo desarma parte dele e permite que a paciente participe da consulta em vez de só esperar a sentença. A frase honesta serve aos dois: a maioria dos nódulos palpáveis não é câncer, e é justamente por isso que se investiga, para separar. Prometer que não é nada seria mentira, e evitar o assunto deixaria o medo comandar tudo."
    proximo: c-exame
  - texto: "Tranquilizá-la dizendo que na idade dela a maioria dos nódulos é benigna e que provavelmente não é nada."
    avaliacao: erro
    feedback: "A estatística está do lado da tranquilidade e não se aplica antes de examinar. Além disso, tranquilização precoce reduz a adesão aos exames que ainda serão feitos: quem sai achando que não é nada adia a mamografia. E se o resultado vier ruim, a confiança na sua palavra fica comprometida."
    proximo: c-exame
  - texto: "Responder que só a biópsia diz, e encaminhar imediatamente sem examinar."
    avaliacao: aceitavel
    feedback: "É tecnicamente verdadeiro e clinicamente insuficiente. O exame das mamas caracteriza o nódulo, verifica se há outros achados, avalia as cadeias linfáticas e frequentemente muda a urgência do encaminhamento. Pular o exame também comunica à paciente que você não quis olhar."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com ela sentada e depois deitada, você inspeciona as duas mamas em várias posições. Não há retração de pele nem alteração do mamilo. Sob palpação sistemática, encontra no quadrante superior externo esquerdo um nódulo de cerca de dois centímetros, de consistência endurecida, contornos irregulares, pouco móvel em relação aos planos profundos e indolor. A mama direita é normal. Na axila esquerda, um linfonodo de cerca de um centímetro, endurecido. Não há descarga papilar à expressão."
dados:
  - "Nódulo de 2 cm, endurecido, irregular, pouco móvel"
  - "Quadrante superior externo esquerdo"
  - "Linfonodo axilar esquerdo endurecido de 1 cm"
  - "Sem retração de pele, sem descarga papilar"
proximo: d-caracteristicas
:::

::: no
tipo: decisao
id: d-caracteristicas
pergunta: "Como essas características mudam a conduta?"
opcoes:
  - texto: "Aumentam bastante a suspeita: endurecido, irregular, aderido e indolor, com linfonodo axilar palpável, é o conjunto que exige investigação rápida com imagem e biópsia, mesmo que a mamografia venha normal."
    avaliacao: otima
    feedback: "As características descritas são as que mais se associam a malignidade, e o linfonodo axilar endurecido acrescenta preocupação. Existe um ponto que precisa ficar claro: nódulo palpável com essas características exige biópsia mesmo se a mamografia for normal, porque a mamografia pode não mostrar lesões em mama densa. Imagem normal não cancela um achado de exame."
    proximo: c-conduta
  - texto: "Como ela ainda menstrua, o mais provável é alteração fibrocística: reavaliar após a próxima menstruação."
    avaliacao: erro
    feedback: "Alterações relacionadas ao ciclo costumam ser dolorosas, bilaterais, com nódulos móveis e de contornos regulares que mudam ao longo do mês. Nada disso está presente. Esperar mais um ciclo é perder semanas em um achado com características de alerta."
    proximo: c-atraso
  - texto: "Solicitar mamografia e, se vier normal, tranquilizar a paciente e manter acompanhamento anual."
    avaliacao: aceitavel
    feedback: "Pedir a mamografia está correto, e o erro estaria em deixá-la decidir sozinha. Um nódulo palpável com características suspeitas exige investigação até o diagnóstico, e mamografia normal não afasta, sobretudo em mama densa. Nesse caso, ultrassonografia e biópsia seguem indicadas."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela retorna seis semanas depois, com o nódulo palpavelmente maior e agora com uma discreta retração da pele acima dele. O intervalo de espera não trouxe nenhuma informação nova, apenas atraso."
proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Você solicita mamografia e ultrassonografia com prioridade e encaminha à mastologia. A paciente pergunta o que ela deve fazer nesse meio tempo, e se deve contar para a família. A mamografia é agendada para dali a dez dias."
dados:
  - "Mamografia e ultrassonografia solicitadas com prioridade"
  - "Encaminhamento à mastologia realizado"
  - "Exames agendados em 10 dias"
  - "Paciente pergunta sobre como conduzir a espera"
proximo: d-espera
:::

::: no
tipo: decisao
id: d-espera
pergunta: "Como você conduz a espera até o resultado?"
opcoes:
  - texto: "Explicar com clareza qual é a hipótese, o que cada exame vai responder e em quanto tempo, oferecer um canal de contato e marcar um retorno já com data, mesmo antes do resultado."
    avaliacao: otima
    feedback: "A incerteza é a parte mais difícil para a paciente, e o que a torna suportável é o plano ser concreto: o que vem, quando, e com quem falar se algo mudar. Marcar retorno antes mesmo do resultado comunica que ela não vai ficar sozinha nesse intervalo, e reduz a chance de ela sumir do acompanhamento."
    proximo: fim-otimo
  - texto: "Pedir que ela aguarde os exames e retorne apenas quando tiver os resultados em mãos."
    avaliacao: aceitavel
    feedback: "É a conduta habitual e funciona para muita gente. O risco é a paciente que se perde no caminho, seja por medo, seja por dificuldade de agendamento. Um retorno já marcado e um canal de contato custam pouco e evitam desaparecimentos."
    proximo: c-sem-plano
  - texto: "Dizer que ela não deve se preocupar até que os exames fiquem prontos, para poupá-la de sofrimento."
    avaliacao: erro
    feedback: "Não se preocupar não é uma instrução que alguém consiga cumprir, e ela costuma ser lida como desvalorização do achado. O efeito prático é o oposto do pretendido: a paciente fica ansiosa e sem informação, e a chance de adiar os exames aumenta."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-sem-plano
texto: "Ela faz a mamografia, que é laudada como densa e sem alterações evidentes. Sem retorno marcado e com o laudo normal, ela adia o restante da investigação por dois meses, até um novo encontro casual na unidade."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A mamografia mostra mama densa sem lesão evidente, e a ultrassonografia identifica o nódulo com características suspeitas. A biópsia confirma carcinoma em estágio inicial, com linfonodo comprometido. Ela é operada em três semanas, faz o tratamento completo e está bem no acompanhamento de dois anos."
ensino: "Nódulo palpável se caracteriza pelo exame: consistência, contornos, mobilidade, dor e as cadeias linfáticas. Endurecido, irregular, aderido e indolor é o conjunto de alerta. E existe uma regra que evita muitos diagnósticos perdidos: mamografia normal não afasta nódulo palpável suspeito, sobretudo em mama densa, e a investigação continua com ultrassonografia e biópsia."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico sai dois meses depois, com o tumor um pouco maior, e o tratamento exige quimioterapia que talvez pudesse ter sido evitada. Ela evolui bem."
ensino: "Laudo normal em um exame não encerra a investigação de um achado de exame físico. Retorno marcado antes do resultado é o que impede que a paciente decida sozinha, com base em um exame isolado, que está tudo bem."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem entender a gravidade e orientada a não se preocupar, ela adia os exames por sete meses. Retorna com o nódulo maior, retração de pele e vários linfonodos axilares palpáveis. O tratamento passa a ser mais agressivo e o prognóstico, pior."
ensino: "Tranquilização sem base custa o senso de urgência do paciente. Diante de um achado suspeito, o caminho é explicar a hipótese com honestidade, dizer o que cada exame responde e garantir que exista retorno marcado, porque é isso que mantém a pessoa dentro do cuidado."
:::
