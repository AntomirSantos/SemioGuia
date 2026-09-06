---
id: crianca-que-babava-sentada
titulo: A criança que babava sentada na cadeira
contexto: "Pronto atendimento pediátrico, três da manhã. Uma menina de 4 anos chega no colo do pai, sentada bem ereta, com o queixo para a frente. Ela não fala, baba, e o pai diz que a febre começou há poucas horas e subiu rápido. Ele conta que ela 'não quis nem tomar água' desde a noite."
tags: [crianca, epiglotite, via aerea, emergencia]
topicosDeApoio:
  - semiologia-da-crianca/exame-da-crianca/do-recem-nascido-ao-adolescente
  - semiologia-da-crianca/exame-da-crianca/abordagem-e-anamnese-da-crianca
  - aparelho-respiratorio/exame-do-torax/inspecao-do-torax
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de semiologia pediátrica e das vias aéreas superiores"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame respiratório"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia da criança"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela mantém o tronco inclinado para a frente, apoiada nos braços, com o pescoço estendido e a boca entreaberta. A saliva escorre pelo canto da boca. A cada inspiração há um som áspero e agudo. Não há tosse. O pai diz que o cartão de vacinas ficou em casa e que ela 'atrasou algumas'."
dados:
  - "Febre alta de início há poucas horas"
  - "Posição de tripé com pescoço estendido, sialorreia"
  - "Estridor inspiratório, ausência de tosse"
  - "Recusa de líquidos, voz abafada"
  - "Vacinação possivelmente incompleta"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Qual é a sua primeira conduta com essa criança?"
opcoes:
  - texto: "Manter a criança no colo do pai, na posição que ela escolheu, sem examinar a garganta nem deitar, e acionar imediatamente a equipe capaz de manejar via aérea difícil."
    avaliacao: otima
    feedback: "Essa combinação tem nome e urgência próprias: posição de tripé, sialorreia, estridor e ausência de tosse apontam epiglotite. A epiglote inflamada ocupa espaço e a criança encontrou sozinha a única posição em que o ar passa. Deitar, chorar ou abrir a boca com abaixador podem fechar essa via aérea em segundos."
    proximo: c-preparo
  - texto: "Deitar a criança e examinar a orofaringe com abaixador de língua para visualizar a epiglote."
    avaliacao: erro
    feedback: "Esse é o gesto proibido nesta suspeita. A manipulação da orofaringe e o choro que ela provoca podem desencadear espasmo e obstrução completa, e não há tempo para resgatar a via aérea de uma criança que fecha nessa situação. O diagnóstico é feito pela cena, e a inspeção direta acontece na sala de cirurgia, com anestesista presente."
    proximo: c-piora
  - texto: "Iniciar nebulização com broncodilatador e corticoide, como se faz na crise de laringite."
    avaliacao: aceitavel
    feedback: "A laringite é o diagnóstico diferencial mais importante e a confusão é compreensível, porque as duas fazem estridor. O que separa está na cena: a laringite tem tosse rouca característica, evolução em dias e criança que aceita líquidos; a epiglotite tem febre alta de instalação rápida, sialorreia, ausência de tosse e posição de tripé. Nebulizar não resolve epiglotite e a agitação da máscara pode piorar."
    proximo: c-preparo
:::

::: no
tipo: cena
id: c-piora
texto: "Ao ser deitada, ela agita-se, o estridor aumenta e ela fica cianótica por alguns segundos. Você a devolve ao colo do pai e o quadro melhora um pouco. Foi um aviso de quanto essa via aérea está no limite."
proximo: c-preparo
:::

::: no
tipo: cena
id: c-preparo
texto: "A criança permanece no colo, sentada, com oxigênio ofertado de longe pelo pai, sem máscara encostada no rosto. A equipe de anestesia e o otorrinolaringologista foram acionados e chegam em vinte minutos. O centro cirúrgico está sendo preparado. Ela segue com estridor, mas mantém saturação de 94%."
dados:
  - "Criança mantida sentada, no colo, sem manipulação"
  - "Oxigênio ofertado a distância"
  - "Anestesia e otorrino acionados, sala em preparo"
  - "Saturação 94%, FC 156 bpm"
proximo: d-acesso
:::

::: no
tipo: decisao
id: d-acesso
pergunta: "A enfermagem pergunta se já pega o acesso venoso e colhe exames. O que você orienta?"
opcoes:
  - texto: "Adiar o acesso e a coleta até a via aérea estar garantida, porque a dor e o choro podem precipitar a obstrução completa."
    avaliacao: otima
    feedback: "Tudo o que faz a criança chorar é risco nesta situação, e um acesso venoso em criança de 4 anos raramente é conseguido sem choro. Exames de sangue não mudam a conduta imediata, e a via aérea garantida é o que permite fazer todo o resto com segurança. A ordem correta é sala primeiro, procedimentos depois."
    proximo: c-sala
  - texto: "Pegar o acesso agora, porque a criança pode precisar de medicação de emergência a qualquer momento."
    avaliacao: erro
    feedback: "O raciocínio é sensato em quase todas as emergências e falha nesta. O choro provocado pela punção é justamente o gatilho que pode fechar a via aérea, e aí o acesso não salvaria nada, porque o problema não se resolve com droga. Nesta doença, o acesso vem depois da via aérea assegurada."
    proximo: c-obstrucao
  - texto: "Pegar o acesso apenas se conseguir sem que ela chore, com o pai segurando e distraindo."
    avaliacao: aceitavel
    feedback: "A intenção é boa e o risco é real: raramente se prevê se a criança vai chorar ou não. Se houver qualquer sinal de agitação, a tentativa precisa ser interrompida imediatamente. Na dúvida, esperar a sala é mais seguro."
    proximo: c-sala
:::

::: no
tipo: cena
id: c-obstrucao
texto: "Na segunda tentativa de punção ela chora forte, o estridor aumenta e a saturação cai para 82%. A equipe interrompe tudo, devolve a criança ao colo e a leva imediatamente para a sala, com a via aérea muito mais próxima do fechamento do que estava."
proximo: c-sala
:::

::: no
tipo: cena
id: c-sala
texto: "No centro cirúrgico, com anestesista e otorrinolaringologista presentes e material de traqueostomia aberto, a laringoscopia mostra uma epiglote muito edemaciada e avermelhada. A intubação é realizada com cânula menor que a prevista para a idade."
dados:
  - "Epiglote edemaciada e vermelha à laringoscopia"
  - "Intubação realizada com cânula de menor calibre"
  - "Material de traqueostomia disponível durante o procedimento"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Com a via aérea garantida, qual é a continuação do tratamento?"
opcoes:
  - texto: "Antibiótico endovenoso, culturas, suporte em terapia intensiva e avaliação da situação vacinal da criança e dos contatos domiciliares."
    avaliacao: otima
    feedback: "A epiglotite é infecção bacteriana e o tratamento é antibiótico endovenoso, com a criança intubada até o edema ceder. A parte que costuma ser esquecida é a saúde pública: verificar a vacinação, notificar quando for o caso e avaliar a necessidade de profilaxia para contatos próximos. Uma criança com esse quadro é também um alerta sobre cobertura vacinal."
    proximo: fim-otimo
  - texto: "Corticoide isolado e observação, extubando assim que possível, sem antibiótico até o resultado das culturas."
    avaliacao: erro
    feedback: "O corticoide pode ajudar no edema e não trata a infecção. Aguardar culturas para iniciar antibiótico em uma infecção que ameaça a via aérea inverte a prioridade: colhe-se e trata-se, ajustando depois pelo resultado."
    proximo: fim-dano
  - texto: "Antibiótico endovenoso e extubação ainda na sala, já que a via aérea foi assegurada e a criança está estável."
    avaliacao: aceitavel
    feedback: "O antibiótico está certo e a extubação precoce é arriscada: o edema leva um a dois dias para ceder, e uma reintubação de urgência em epiglote inflamada é bem mais difícil que a intubação eletiva feita em condições ideais. A extubação acontece quando houver escape de ar ao redor da cânula."
    proximo: c-extubacao
:::

::: no
tipo: cena
id: c-extubacao
texto: "Extubada ainda na sala, ela apresenta estridor progressivo em duas horas e precisa ser reintubada, agora em condições piores. O procedimento é bem-sucedido, com um susto que poderia ter sido evitado."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com antibiótico e suporte, o edema cede em quarenta e oito horas e ela é extubada sem intercorrências. Recebe alta no quinto dia. A situação vacinal da família é regularizada na unidade básica e os contatos recebem a orientação adequada."
ensino: "A cena diagnostica a epiglotite: criança sentada em posição de tripé, babando, com estridor, febre alta de instalação rápida e sem tosse. A laringite, que é o diferencial, tem tosse rouca e evolução em dias. Nada de deitar, de abaixador de língua ou de procedimentos que provoquem choro antes da via aérea garantida: a sala vem primeiro, o resto depois."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela evolui bem, após uma reintubação de urgência e um dia a mais em terapia intensiva."
ensino: "O edema da epiglote leva um a dois dias para ceder. Extubar antes de haver escape de ar ao redor da cânula troca um procedimento eletivo por uma reintubação de urgência em via aérea ainda inflamada."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Sem antibiótico nas primeiras horas, a infecção progride e ela desenvolve bacteremia com choque séptico, exigindo vasopressor e uma semana em terapia intensiva."
ensino: "Corticoide trata edema, não bactéria. Em infecção que ameaça a via aérea, o antibiótico começa logo após a coleta das culturas, e o ajuste vem depois com o resultado."
:::
