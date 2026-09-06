---
id: filha-que-respondia-por-ele
titulo: A filha que respondia por ele
contexto: "Ambulatório de clínica geral. Um homem de 74 anos entra acompanhado da filha, que puxa a cadeira, senta primeiro e começa a falar antes que você pergunte qualquer coisa. Ele senta ao lado, quieto, e olha para ela sempre que você dirige uma pergunta a ele."
tags: [anamnese, entrevista, acompanhante, autonomia]
topicosDeApoio:
  - anamnese/entrevista-clinica/a-entrevista-clinica
  - anamnese/entrevista-clinica/antecedentes-e-habitos
  - exame-psiquico/exame-psiquico/fundamentos-do-exame-psiquico
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de anamnese e relação médico-paciente"
  - "Semiologia Clínica, 1ª ed., capítulo de anamnese"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção sobre a história clínica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "A filha diz que ele 'anda esquecido, comendo mal e cheio de manias'. Cada vez que você olha para ele e pergunta algo, ela responde antes. Ele acena com a cabeça, concordando. Quando você insiste e ele começa a falar, ela completa a frase. Em vinte minutos, ele disse quatro palavras."
dados:
  - "Queixas relatadas exclusivamente pela acompanhante"
  - "Paciente lúcido, orientado no tempo e no espaço"
  - "Paciente não completa frases sem interrupção"
  - "Olha para a filha antes de responder"
proximo: d-conducao
:::

::: no
tipo: decisao
id: d-conducao
pergunta: "Como você conduz esta consulta?"
opcoes:
  - texto: "Dirigir-se a ele, esperar a resposta dele mesmo com a pausa, e combinar com a filha, de forma cordial, que ela complementará depois."
    avaliacao: otima
    feedback: "A consulta é dele, e a informação mais importante costuma ser a que ele daria se tivesse espaço. Pedir à acompanhante que aguarde não é falta de educação: é técnica, e funciona melhor quando anunciada de forma explícita e gentil. A pausa que se abre ao esperar a resposta dele é justamente onde a queixa real aparece."
    proximo: c-a-sos
  - texto: "Aceitar a narrativa da filha, que conhece a rotina dele e traz informação mais organizada."
    avaliacao: erro
    feedback: "A informação da acompanhante é valiosa e não substitui a do paciente. Aceitar a narrativa dela como a única faz três coisas ruins: perde sintomas que só ele sabe, retira a autonomia dele na frente dele mesmo, e impede detectar tanto um declínio cognitivo real quanto uma dinâmica de superproteção ou de conflito."
    proximo: c-consequencia
  - texto: "Pedir que a filha aguarde na sala de espera desde o início, para conversar apenas com ele."
    avaliacao: aceitavel
    feedback: "O momento a sós é fundamental e costuma render mais depois, não antes. Começar mandando a acompanhante sair pode ser lido como hostilidade, encerrar a colaboração dela e constranger o paciente. A sequência que funciona é ouvir os dois juntos, e depois criar o momento reservado."
    proximo: c-a-sos
:::

::: no
tipo: cena
id: c-consequencia
texto: "A consulta termina com a versão dela. Duas semanas depois ele volta sozinho, de ônibus, e conta em cinco minutos o que não pôde dizer: está urinando com dificuldade há meses e tem medo de contar para a família. A consulta recomeça daí."
proximo: c-a-sos
:::

::: no
tipo: cena
id: c-a-sos
texto: "Na hora do exame físico, você pede que a filha aguarde do lado de fora e fica a sós com ele. A mudança é imediata: ele fala em frases inteiras, com raciocínio organizado. Conta que está urinando com dificuldade há meses, que evita beber água por causa disso, e que come menos porque a filha 'briga com tudo o que ele escolhe'."
dados:
  - "Discurso organizado quando a sós"
  - "Sintomas urinários obstrutivos há meses, não relatados"
  - "Restrição hídrica voluntária"
  - "Conflito com a acompanhante sobre alimentação"
proximo: d-cognicao
:::

::: no
tipo: decisao
id: d-cognicao
pergunta: "A filha diz que ele está esquecido. Como você avalia isso?"
opcoes:
  - texto: "Aplicar uma avaliação cognitiva objetiva com ele a sós, e não decidir pela impressão da acompanhante nem pela sua."
    avaliacao: otima
    feedback: "Queixa de esquecimento trazida por terceiro precisa ser medida, e não aceita nem descartada. Uma avaliação estruturada aplicada com o paciente a sós separa o declínio real do que é apenas a impressão de quem convive, e evita rotular de demência quem está deprimido, com déficit auditivo ou simplesmente sem espaço para falar."
    proximo: c-desfecho-consulta
  - texto: "Registrar o relato de esquecimento e solicitar tomografia de crânio para investigar demência."
    avaliacao: erro
    feedback: "A imagem entra depois de caracterizar o déficit, não antes. Pedir tomografia por relato de terceiro, sem avaliação cognitiva, produz um exame que raramente responde à pergunta e um rótulo que costuma grudar no prontuário para sempre."
    proximo: c-desfecho-consulta
  - texto: "Confiar na impressão desta consulta: ele conversou bem a sós, então não há declínio cognitivo."
    avaliacao: aceitavel
    feedback: "A observação é ótima e insuficiente. Um paciente pode conversar bem e ainda ter déficit em memória recente ou em funções executivas. A conversa fluente afasta a hipótese grosseira, e é a avaliação objetiva que documenta o estado atual e serve de referência para comparar daqui a um ano."
    proximo: c-desfecho-consulta
:::

::: no
tipo: cena
id: c-desfecho-consulta
texto: "A avaliação cognitiva vem dentro da normalidade para a escolaridade dele. O exame físico revela globo vesical palpável e o toque retal mostra próstata aumentada, de superfície lisa. Ele está com a bexiga cheia e não urina bem há meses. A filha é chamada de volta."
dados:
  - "Avaliação cognitiva normal para a escolaridade"
  - "Globo vesical palpável"
  - "Próstata aumentada, superfície lisa, sem nódulos"
  - "Ingestão hídrica reduzida por conta própria"
proximo: d-devolutiva
:::

::: no
tipo: decisao
id: d-devolutiva
pergunta: "Como você faz a devolutiva com os dois na sala?"
opcoes:
  - texto: "Falar com ele em primeiro lugar, explicando o achado e o plano, e só então incluir a filha como parceira do cuidado, com o consentimento dele sobre o que compartilhar."
    avaliacao: otima
    feedback: "A ordem comunica quem é o dono da consulta. Incluir a família é desejável e costuma melhorar a adesão, e isso se faz com o paciente, não por cima dele. Perguntar antes o que ele autoriza compartilhar preserva o vínculo que acabou de se abrir e evita transformar a informação em munição de um conflito familiar."
    proximo: fim-otimo
  - texto: "Explicar tudo à filha, que é quem vai administrar os remédios e marcar os exames."
    avaliacao: erro
    feedback: "Explicar por cima do paciente reforça exatamente a dinâmica que já o silenciava, e ele volta a ser assunto em vez de interlocutor. Além disso, é ele quem decide sobre o próprio tratamento: transferir essa conversa para a filha, sem necessidade clínica, retira uma autonomia que o exame acabou de mostrar preservada."
    proximo: fim-dano
  - texto: "Explicar aos dois ao mesmo tempo, de forma neutra, sem tratar o assunto do conflito alimentar."
    avaliacao: aceitavel
    feedback: "A explicação conjunta é correta e deixa de lado uma parte do problema. O conflito sobre a comida está reduzindo a ingestão dele e vai atrapalhar o tratamento. Nomear isso com cuidado, sem tomar partido, faz parte do cuidado nesta consulta."
    proximo: c-neutro
:::

::: no
tipo: cena
id: c-neutro
texto: "Os dois saem com o plano do problema urinário, e a tensão sobre a alimentação continua igual. No retorno, ele conta que segue comendo pouco e que agora evita as refeições em casa."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ele é encaminhado à urologia, inicia tratamento e volta a urinar bem em algumas semanas, com a ingestão de líquidos normalizada. A filha entende que o esquecimento tinha relação com a restrição de água e com o desconforto constante. Na consulta seguinte, ele fala sem que ninguém complete suas frases."
ensino: "Quando há acompanhante que responde por tudo, a informação mais importante costuma ser a que o paciente não disse. A sequência que funciona é ouvir os dois, criar um momento a sós no exame físico e devolver falando primeiro com o paciente. Queixa de esquecimento trazida por terceiro se mede com avaliação objetiva, nunca se aceita nem se descarta pela impressão de quem convive."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O problema urinário é resolvido, mas ele continua comendo mal e perde mais dois quilos até o retorno, quando o assunto finalmente é abordado."
ensino: "Conflitos familiares que afetam diretamente o cuidado fazem parte da consulta. Nomeá-los com cuidado, sem tomar partido, é diferente de opinar sobre a vida da família: é tratar o que está atrapalhando o tratamento."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "A conversa acontece toda com a filha. Ele deixa de tomar a medicação, porque não entendeu para que servia e não se sentiu parte da decisão. Três meses depois chega ao pronto socorro com retenção urinária aguda e lesão renal por obstrução, exigindo sondagem e internação."
ensino: "Explicar por cima do paciente reduz a adesão e a autonomia ao mesmo tempo. Quem não participa da decisão raramente cumpre o tratamento, e capacidade preservada, uma vez documentada, torna essa conversa obrigatória com ele."
:::
