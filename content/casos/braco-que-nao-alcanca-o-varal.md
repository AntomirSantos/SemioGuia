---
id: braco-que-nao-alcanca-o-varal
titulo: O braço que não alcança mais o varal
contexto: "Ambulatório de clínica geral. Uma mulher de 54 anos, costureira, vem por dor no ombro direito há quatro meses. Ela diz que dói quando levanta o braço para pendurar roupa e para pentear o cabelo, e que à noite dói ao deitar sobre esse lado. Já fez dez sessões de fisioterapia sem melhora clara."
tags: [osteoarticular, ombro, manguito rotador, manobras]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/ombro-e-cotovelo
  - sistema-osteoarticular/exame-osteoarticular/principios-do-exame-osteoarticular
  - sistema-osteoarticular/exame-osteoarticular/coluna-vertebral
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do ombro"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho locomotor"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia osteoarticular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela aponta a face lateral do ombro, um pouco abaixo do acrômio, e diz que a dor às vezes desce pela lateral do braço até o cotovelo, nunca até a mão. Não houve trauma. Trabalha oito horas por dia com os braços elevados, costurando. Nega formigamento e nega dor no pescoço."
dados:
  - "Dor lateral do ombro há 4 meses, sem trauma"
  - "Piora ao elevar o braço e ao deitar do lado afetado"
  - "Irradiação até o cotovelo, sem parestesia"
  - "Trabalho com braços elevados"
  - "Fisioterapia prévia sem melhora clara"
proximo: d-origem
:::

::: no
tipo: decisao
id: d-origem
pergunta: "Antes de examinar o ombro, o que precisa ser afastado?"
opcoes:
  - texto: "Que a dor venha do pescoço: examinar a mobilidade cervical e procurar sinais de radiculopatia, porque dor referida da coluna é a grande imitadora do ombro."
    avaliacao: otima
    feedback: "Uma parte importante das dores de ombro não vem do ombro. A pista mais útil é a irradiação: dor que passa do cotovelo e vai para a mão, com formigamento, aponta o pescoço. Testar a mobilidade cervical e procurar déficit sensitivo ou motor leva dois minutos e evita meses de tratamento no lugar errado."
    proximo: c-exame
  - texto: "Que exista fratura oculta: solicitar radiografia antes das manobras."
    avaliacao: aceitavel
    feedback: "A radiografia tem indicação quando houve trauma, quando há suspeita de artrose importante ou quando o quadro não responde ao tratamento. Sem trauma e com quatro meses de dor típica ao elevar o braço, ela raramente muda a conduta inicial, e o exame com manobras rende mais."
    proximo: c-exame
  - texto: "Que seja uma dor de origem cardíaca irradiada para o ombro."
    avaliacao: erro
    feedback: "A hipótese existe para dor no ombro esquerdo com relação ao esforço, e aqui nada aponta nessa direção: dor à direita, desencadeada por movimento específico, com quatro meses de evolução e piora ao deitar sobre o lado. Investigar coração aqui adia o exame que responde."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A mobilidade cervical é livre e indolor, e não há déficit neurológico. No ombro, a elevação ativa do braço vai até cerca de cento e vinte graus e dói entre setenta e cento e vinte, com alívio depois. A elevação passiva vai mais longe e dói menos. A força de abdução com o braço a noventa graus está reduzida e dolorosa. A rotação externa contra resistência é dolorosa, e a rotação interna, normal. Não há atrofia visível."
dados:
  - "Exame cervical normal"
  - "Arco doloroso entre 70 e 120 graus"
  - "Movimento passivo maior e menos doloroso que o ativo"
  - "Abdução resistida e rotação externa resistida dolorosas"
  - "Sem atrofia muscular"
proximo: d-manobras
:::

::: no
tipo: decisao
id: d-manobras
pergunta: "O movimento passivo é maior e menos doloroso que o ativo. O que isso indica?"
opcoes:
  - texto: "Indica problema nos tendões e músculos ao redor da articulação, e não dentro dela: o padrão aponta lesão do manguito rotador, não capsulite nem artrite."
    avaliacao: otima
    feedback: "Essa comparação é o eixo do exame articular em qualquer lugar do corpo. Quando o passivo é claramente melhor que o ativo, o problema está nas estruturas que movem a articulação. Quando ativo e passivo estão igualmente limitados em todas as direções, o problema está dentro da articulação ou na cápsula, e aí a hipótese vira artrite ou capsulite adesiva."
    proximo: c-conduta
  - texto: "Indica capsulite adesiva, que é a causa mais comum de dor crônica de ombro nessa faixa etária."
    avaliacao: erro
    feedback: "A capsulite limita o movimento passivo tanto quanto o ativo, sobretudo a rotação externa, que aqui está preservada em amplitude. Confundir as duas muda o tratamento: a capsulite pede um programa próprio de ganho de amplitude, e a lesão do manguito pede fortalecimento e correção de sobrecarga."
    proximo: c-conduta
  - texto: "Indica pouco isoladamente, e o diagnóstico depende de ressonância do ombro."
    avaliacao: aceitavel
    feedback: "A ressonância mostra bem os tendões, e ela encontra alterações em muitos ombros assintomáticos nessa idade, o que gera achados que confundem. O exame define a síndrome e a imagem entra quando o tratamento falha ou quando se cogita cirurgia."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Você explica o achado e propõe um plano. Ela conta que a fisioterapia anterior consistiu em aplicações de calor e ultrassom, sem exercícios. Pergunta se não seria melhor uma infiltração, que uma colega fez e 'resolveu na hora'."
dados:
  - "Fisioterapia prévia sem componente de exercício"
  - "Trabalho mantém a sobrecarga diária"
  - "Paciente pergunta sobre infiltração"
proximo: d-tratamento
:::

::: no
tipo: decisao
id: d-tratamento
pergunta: "Qual é o tratamento inicial e o que ele precisa incluir?"
opcoes:
  - texto: "Programa de exercícios com fortalecimento progressivo do manguito e dos estabilizadores da escápula, ajuste da postura de trabalho, analgesia conforme a necessidade, e reavaliação em algumas semanas."
    avaliacao: otima
    feedback: "O tratamento que funciona é ativo: exercício progressivo, feito com regularidade, por semanas. Calor e ultrassom isolados não mudam o desfecho. E existe uma parte que quase sempre falta: se a sobrecarga do trabalho continuar igual, o tendão continua sendo agredido oito horas por dia, e nenhum exercício vence isso."
    proximo: fim-otimo
  - texto: "Indicar infiltração com corticoide como primeira medida, pelo alívio rápido."
    avaliacao: erro
    feedback: "A infiltração alivia e não trata a causa, e o alívio costuma fazer o paciente voltar à mesma carga que produziu a lesão, agora sem a dor que servia de freio. Infiltrações repetidas em tendão trazem risco próprio. Ela tem lugar como adjuvante quando a dor impede o exercício, e não como tratamento inicial isolado."
    proximo: fim-dano
  - texto: "Solicitar ressonância e definir a conduta pelo resultado do exame."
    avaliacao: aceitavel
    feedback: "A imagem pode ser necessária mais adiante e, feita agora, tende a mostrar alterações degenerativas que existem em muitos ombros sem dor. O risco é o achado guiar a conduta para uma cirurgia que o tratamento conservador poderia ter evitado."
    proximo: c-imagem
:::

::: no
tipo: cena
id: c-imagem
texto: "A ressonância mostra tendinopatia com uma lesão parcial. Ela fica assustada com a palavra lesão e passa a evitar movimentos, o que piora a rigidez. O tratamento com exercício começa dois meses depois, com mais medo e menos amplitude."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com exercício progressivo por doze semanas e ajuste da altura da mesa de trabalho, a dor noturna desaparece no segundo mês e a elevação volta ao normal no terceiro. Ela volta a pendurar roupa no varal sem dor e mantém os exercícios duas vezes por semana."
ensino: "Boa parte da dor de ombro não vem do ombro, e a irradiação além do cotovelo com formigamento aponta o pescoço. No ombro, a comparação entre movimento ativo e passivo separa o que está fora da articulação do que está dentro dela. E o tratamento da lesão do manguito é ativo: exercício progressivo somado à correção da sobrecarga que causou o problema."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela melhora com o tratamento, dois meses mais tarde, depois de um período de medo do movimento provocado pelo laudo da ressonância."
ensino: "Imagem pedida cedo demais em dor musculoesquelética encontra achados degenerativos comuns e assusta. O laudo precisa ser interpretado junto do exame, e o paciente precisa entender que alteração de imagem não é sinônimo de dano que impede o movimento."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Depois da infiltração, ela volta a trabalhar na mesma altura e com o mesmo ritmo, sem dor. Em seis meses recebe uma terceira infiltração e evolui com ruptura completa do tendão, que exige cirurgia e seis meses de reabilitação."
ensino: "Infiltração isolada retira a dor que limitava a carga, e a carga é o que estava lesando o tendão. Como tratamento único, ela troca alívio imediato por risco de lesão maior, sobretudo quando a sobrecarga do trabalho permanece inalterada."
:::
