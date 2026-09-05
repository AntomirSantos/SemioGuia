---
id: consulta-dos-dezoito-segundos
titulo: A consulta dos dezoito segundos
contexto: "Unidade básica, agenda cheia, 15 minutos por consulta. Entra uma mulher de 34 anos, professora, com a queixa anotada pela recepção: 'dor de cabeça há 3 meses'. Você tem a mão no teclado e a fila na porta."
tags: [anamnese, entrevista, cefaleia, tecnica de entrevista, agenda oculta]
topicosDeApoio:
  - anamnese/entrevista-clinica/a-entrevista-clinica
  - anamnese/entrevista-clinica/queixa-principal-e-hda
referencias:
  - "Porto, Semiologia Médica, 8ª ed., caps. de anamnese e entrevista"
  - "Porto, Exame Clínico, 8ª ed., caps. iniciais (entrevista e história clínica)"
  - "Semiologia Clínica, 1ª ed., capítulos de entrevista e anamnese"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela senta na beirada da cadeira, bolsa no colo. 'Doutor, é essa dor de cabeça que não passa.' Você tem duas dúzias de perguntas de cefaleia decoradas e 15 minutos no relógio."
dados:
  - "34 anos, professora"
  - "Queixa registrada: cefaleia há 3 meses"
  - "Sem registros anteriores relevantes no prontuário"
proximo: d-abertura
:::

::: no
tipo: decisao
id: d-abertura
pergunta: "Como você abre a entrevista?"
opcoes:
  - texto: "Com uma pergunta ampla ('me conte essa dor desde o começo') e o compromisso de não interromper a narrativa inicial."
    avaliacao: otima
    feedback: "É a abertura que rende. Quando se cronometrou por quanto tempo o médico deixa o paciente falar antes da primeira interrupção, a média foi de 18 segundos. A narrativa livre dos primeiros minutos costuma entregar de uma vez o que o interrogatório levaria vinte perguntas para reconstruir, e entrega algo que pergunta nenhuma alcança: o jeito como ela conta."
    proximo: c-narrativa
  - texto: "Direto ao interrogatório dirigido: localização, tipo, irradiação, intensidade, horário, fatores de melhora e piora."
    avaliacao: erro
    feedback: "O roteiro dirigido tem hora, e não é esta. Aberta cedo demais, a metralhadora de perguntas fechadas espreme a história para dentro das suas hipóteses, cala o que a paciente ia contar espontaneamente e transmite pressa. Os 18 segundos até a primeira interrupção viram a estatística que você acabou de confirmar."
    proximo: c-narrativa-pobre
  - texto: "Pelo formulário: profissão, moradia, hábitos, antecedentes, e só então a queixa."
    avaliacao: aceitavel
    feedback: "Nada disso deixará de ser colhido, mas começar pela burocracia gasta os minutos de maior rendimento da consulta. A ordem que funciona abre com a queixa na voz da paciente e encaixa a identificação e os antecedentes depois, quando a relação já está estabelecida."
    proximo: c-narrativa
:::

::: no
tipo: cena
id: c-narrativa
texto: "Você pergunta e cala. Ela fala por quase um minuto: a dor aperta 'como um capacete', pega a cabeça toda, piora no fim da tarde, começou 'junto com a época das provas'. Vai trabalhando mesmo com dor. Nas últimas semanas tem dormido mal. No meio da frase seguinte, a voz falha: 'e eu fico pensando se não é coisa pior...'. Ela para de falar e olha para a bolsa."
dados:
  - "Dor em aperto, holocraniana, vespertina, há 3 meses"
  - "Relação temporal com sobrecarga de trabalho"
  - "Sono ruim recente"
  - "Frase interrompida com emoção: 'coisa pior'"
proximo: d-silencio
:::

::: no
tipo: cena
id: c-narrativa-pobre
texto: "Vinte perguntas depois, você tem uma cefaleia 'em aperto, difusa, vespertina, sem náusea, sem fotofobia'. A paciente responde monossilábica, cada vez mais encolhida. Alguma coisa na consulta esfriou, e você percebe que ela desistiu de contar algo. Você larga o teclado e recomeça: 'me conte do seu jeito'."
proximo: c-narrativa
:::

::: no
tipo: decisao
id: d-silencio
pergunta: "Ela se emociona e silencia no meio da frase. O que você faz?"
opcoes:
  - texto: "Nada: sustentar o silêncio e esperar, mesmo que pareça longo."
    avaliacao: otima
    feedback: "É a única manobra da entrevista que se executa sem fazer nada, e é exatamente a indicada com o paciente emocionado: ele está organizando ideias ou contendo emoção, e a pausa respeitada costuma ser seguida do conteúdo mais importante da consulta. A ressalva fica para o paciente loquaz, com quem o silêncio vira brecha para trocar de assunto."
    proximo: c-medo
  - texto: "Tranquilizar de imediato: 'fique calma, isso não é nada grave, dor assim é muito comum'."
    avaliacao: erro
    feedback: "Apoio prematuro sobre diagnóstico é uma promessa que você ainda não pode fazer: a investigação mal começou. Pior: fecha a porta que ia se abrir. A frase que ela ia dizer ('coisa pior') era o motivo real da consulta, e acabou de ser arquivada com um carimbo de 'não é nada'."
    proximo: c-medo-tardio
  - texto: "Preencher a pausa retomando o interrogatório: 'e essa dor, melhora com o quê?'."
    avaliacao: erro
    feedback: "A pergunta técnica no momento errado é uma interrupção educada. A emoção que apareceu é dado clínico, não desvio do roteiro: o que ela ia dizer vale mais, agora, do que qualquer fator de melhora."
    proximo: c-medo-tardio
:::

::: no
tipo: cena
id: c-medo
texto: "O silêncio dura o que precisa durar. Ela respira e conta: a mãe morreu há um ano, de tumor cerebral, e a dor de cabeça dela 'começou igualzinha'. Desde então, cada dor é uma sentença. Ela chora. Você oferece o lenço e espera de novo."
dados:
  - "Agenda revelada: medo de tumor cerebral (mãe falecida há 1 ano com a doença)"
  - "Luto recente; sono ruim; hipervigilância aos sintomas"
proximo: d-fechamento
:::

::: no
tipo: cena
id: c-medo-tardio
texto: "A consulta segue tecnicamente correta e emocionalmente vazia. Na hora de imprimir a receita, com a mão na maçaneta, ela solta: 'doutor... minha mãe morreu de tumor na cabeça. Não é isso que eu tenho, é?'. O motivo real da consulta chegou no último minuto, do jeito que os conteúdos adiados costumam chegar."
proximo: d-fechamento
:::

::: no
tipo: decisao
id: d-fechamento
pergunta: "O medo está na mesa: tumor cerebral, como o da mãe. Como você fecha a consulta?"
opcoes:
  - texto: "Nomear o medo, examinar dirigido ao que o medo pede, explicar o que os achados significam e pactuar o plano e os sinais de retorno."
    avaliacao: otima
    feedback: "É o fechamento que trata a doença e o medo, sem sacrificar nenhum. O exame neurológico dirigido e o fundo de olho respondem à pergunta que ela realmente fez; a explicação do padrão da dor (em aperto, vespertina, ligada à sobrecarga e ao luto, sem sinais de alarme no exame) devolve um raciocínio, não um carimbo; e os sinais de retorno pactuados transformam a incerteza em plano."
    proximo: fim-otimo
  - texto: "Pedir ressonância magnética hoje: só a imagem normal vai tirar esse medo."
    avaliacao: aceitavel
    feedback: "Às vezes a imagem terá lugar, mas como decisão raciocinada, não como resposta reflexa à angústia. Sem exame físico e sem conversa, a ressonância vira o atalho que ensina a paciente que todo medo se trata com aparelho: e o laudo normal, sem a explicação que faltou, alivia por poucas semanas."
    proximo: fim-aceitavel
  - texto: "Encerrar com a receita de analgésico: a dor é tensional e o resto é assunto para outro dia."
    avaliacao: erro
    feedback: "O 'traga na próxima' é onde os conteúdos difíceis morrem: sexualidade, saúde mental, medo de morrer raramente sobrevivem ao adiamento. Ela levou três meses para trazer esse medo; despachá-lo agora custa a confiança que a consulta tinha acabado de construir."
    proximo: fim-dano
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O exame neurológico dirigido é normal e você explica, ponto a ponto, por que o padrão dela não é o padrão que ela teme. Pactuam analgesia racional, higiene do sono, acompanhamento do luto e os sinais que justificariam voltar antes. Na consulta de retorno, um mês depois, a dor diminuiu de frequência, e ela conta que dormiu 'sem medo' pela primeira vez no ano."
ensino: "A entrevista rende quando o médico cala nos primeiros minutos (a média até a primeira interrupção é de 18 segundos), sustenta o silêncio do paciente emocionado e trata a agenda oculta como parte do diagnóstico. O motivo real da consulta muitas vezes não é o sintoma: é o que o sintoma significa. Quem só trata a dor de cabeça perde a consulta; quem nomeia o medo, ganha a paciente."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A ressonância sai em três semanas: normal. O alívio dura pouco: sem a conversa que explicasse a dor, cada crise vespertina reabre a dúvida ('e se o exame não pegou?'). Ela volta duas vezes no semestre, e a consulta que faltou acaba acontecendo, mais tarde e mais cara."
ensino: "Exame complementar não substitui explicação. O laudo normal responde à pergunta do médico, não à do paciente: sem o raciocínio partilhado (por que este padrão de dor não é o padrão temido), a imagem tranquiliza por semanas e a incerteza volta inteira. A conversa é o tratamento do medo; o exame é, quando indicado, o coadjuvante."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ela não volta. Oito meses depois, você a encontra no prontuário do pronto atendimento: três passagens por cefaleia, duas tomografias normais, um ansiolítico iniciado por outro colega. O medo que pediu passagem na sua consulta seguiu sem tratamento, colecionando exames."
ensino: "Conteúdo difícil adiado é conteúdo perdido: o paciente que reuniu coragem uma vez raramente a reúne de novo com o mesmo médico. A agenda oculta (saúde mental, luto, medo de morrer) costuma aparecer tarde na consulta e exige resposta na hora. Os quinze minutos que faltaram custaram oito meses de peregrinação."
:::
