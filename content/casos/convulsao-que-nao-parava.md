---
id: convulsao-que-nao-parava
titulo: A convulsão que não parava
contexto: "Emergência de hospital geral, dez da noite. Um homem de 26 anos, com epilepsia desde a adolescência, chega convulsionando dentro da ambulância. A namorada conta que a crise começou em casa, que ela achou que ia passar, e que já dura 'uns vinte minutos, talvez mais'. Ele parou o remédio faz duas semanas porque a receita venceu."
tags: [neurologico, estado de mal, convulsao, emergencia]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
  - sistema-nervoso/exame-neurologico/forca-tonus-e-reflexos
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame neurológico e de crises epilépticas"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de avaliação do estado mental"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia neurológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele tem movimentos tônico-clônicos generalizados, com desvio do olhar para a direita e sialorreia espumosa. Não responde a nenhum estímulo. Há sangue no canto da boca, provavelmente da língua mordida. A respiração é irregular e a saturação marca 88% com máscara."
dados:
  - "Crise generalizada em curso há pelo menos 20 minutos"
  - "Saturação 88% com máscara de oxigênio"
  - "FC 138 bpm, temperatura 37,9 graus"
  - "Suspensão de anticonvulsivante há 2 semanas"
  - "Glicemia capilar ainda não medida"
proximo: d-primeiros-passos
:::

::: no
tipo: decisao
id: d-primeiros-passos
pergunta: "O que você faz nos primeiros dois minutos?"
opcoes:
  - texto: "Proteger a via aérea com posicionamento e oxigênio, medir a glicemia capilar, obter acesso venoso e administrar benzodiazepínico em dose adequada, marcando o horário."
    avaliacao: otima
    feedback: "Crise que passa de cinco minutos já é estado de mal e o tratamento começa agora. Três coisas costumam falhar: a glicemia não é medida, o benzodiazepínico é dado em dose menor que a recomendada, e ninguém anota o horário. A dose insuficiente é a causa mais comum de crise que não cede, e o relógio orienta cada passo seguinte."
    proximo: c-segunda-dose
  - texto: "Aguardar mais alguns minutos, porque a maioria das crises cessa espontaneamente."
    avaliacao: erro
    feedback: "A maioria cessa em até dois minutos, e esta já passou de vinte. A partir dos cinco minutos, quanto mais tempo a crise dura, mais difícil ela se torna de tratar, porque os receptores em que o benzodiazepínico age vão sendo internalizados. Esperar aqui é reduzir a eficácia da própria droga que se vai usar."
    proximo: c-atraso
  - texto: "Solicitar tomografia de crânio de urgência antes de qualquer medicação, para excluir causa estrutural."
    avaliacao: aceitavel
    feedback: "A imagem entra na investigação e não durante a crise. Transportar um paciente convulsionando e sem via aérea protegida é arriscado, e a máquina não trata nada. Primeiro se interrompe a crise, depois se procura a causa."
    proximo: c-segunda-dose
:::

::: no
tipo: cena
id: c-atraso
texto: "Mais oito minutos se passam. A saturação cai para 82%, a temperatura sobe para 38,6 graus e a crise continua igual. O tratamento começa agora, com quase trinta minutos de atividade elétrica contínua no cérebro."
proximo: c-segunda-dose
:::

::: no
tipo: cena
id: c-segunda-dose
texto: "Após a primeira dose de benzodiazepínico, a crise diminui de intensidade mas não cessa: persistem abalos nos membros superiores e o desvio do olhar. Cinco minutos se passaram desde a administração. A glicemia capilar voltou normal."
dados:
  - "Crise persistente após a primeira dose"
  - "Glicemia capilar normal"
  - "5 minutos desde a primeira dose"
  - "Saturação 91% com máscara"
proximo: d-segunda-linha
:::

::: no
tipo: decisao
id: d-segunda-linha
pergunta: "A crise não cedeu por completo. Qual é o próximo passo?"
opcoes:
  - texto: "Repetir o benzodiazepínico em dose plena e iniciar já a droga de segunda linha, sem esperar mais uma rodada de observação."
    avaliacao: otima
    feedback: "A sequência é conhecida e o erro clássico é atrasá-la: uma segunda dose do benzodiazepínico e, em paralelo, a droga de segunda linha, que estabiliza o resultado e evita a recorrência. Cada minuto adicional de crise aumenta a chance de refratariedade e de lesão neuronal, e o tratamento em degraus precisa subir rápido."
    proximo: c-refrataria
  - texto: "Aumentar apenas o benzodiazepínico, repetindo doses sucessivas até a crise ceder."
    avaliacao: erro
    feedback: "Doses sucessivas sem passar à segunda linha acumulam sedação e depressão respiratória sem tratar a tendência à recorrência. Além disso, o efeito do benzodiazepínico é curto: mesmo que a crise pare, ela volta se a droga de manutenção não estiver a bordo."
    proximo: c-refrataria
  - texto: "Chamar o neurologista e aguardar a orientação dele antes de introduzir a segunda droga."
    avaliacao: aceitavel
    feedback: "Envolver o especialista é útil e não pode custar tempo. O protocolo de estado de mal é padronizado justamente para poder ser iniciado por qualquer médico. Ligue, e comece enquanto o telefone chama."
    proximo: c-refrataria
:::

::: no
tipo: cena
id: c-refrataria
texto: "Com a segunda dose e a droga de segunda linha, os movimentos cessam. Vinte minutos depois, porém, ele continua sem responder a estímulos, com os olhos abertos e desvio persistente do olhar para a direita, além de discretos abalos na pálpebra. A respiração está regular e a saturação normal."
dados:
  - "Movimentos generalizados cessaram"
  - "Ausência de resposta 20 minutos após o fim dos abalos"
  - "Desvio persistente do olhar, abalos palpebrais"
  - "Sinais vitais estáveis"
proximo: d-nao-convulsivo
:::

::: no
tipo: decisao
id: d-nao-convulsivo
pergunta: "Ele parou de convulsionar mas não acorda. Como você interpreta?"
opcoes:
  - texto: "Suspeitar de estado de mal não convulsivo: o desvio persistente do olhar e os abalos palpebrais sugerem atividade elétrica em curso, e é preciso eletroencefalograma urgente."
    avaliacao: otima
    feedback: "O período pós-crítico existe e costuma melhorar progressivamente em minutos. Quando o paciente não acorda e mantém sinais sutis, como desvio ocular fixo, abalos palpebrais ou automatismos, a atividade elétrica pode estar continuando sem manifestação motora evidente. Sem eletroencefalograma, esse diagnóstico não se faz, e ele é frequentemente perdido."
    proximo: fim-otimo
  - texto: "Considerar período pós-crítico prolongado e observar por algumas horas antes de investigar."
    avaliacao: erro
    feedback: "É a interpretação mais comum e a que mais atrasa o diagnóstico. O pós-crítico melhora de forma progressiva, e este paciente mantém sinais focais sutis vinte minutos depois. Horas de atividade elétrica não reconhecida causam lesão que se poderia evitar."
    proximo: fim-dano
  - texto: "Atribuir à sedação das drogas administradas e aguardar a eliminação."
    avaliacao: aceitavel
    feedback: "A sedação contribui e explica sonolência, e não explica desvio ocular fixo nem abalos palpebrais. Quando existe um sinal focal, ele precisa ser investigado, e não creditado à medicação."
    proximo: c-sedacao
:::

::: no
tipo: cena
id: c-sedacao
texto: "Duas horas depois ele continua sem responder, com o mesmo desvio ocular. O eletroencefalograma, finalmente solicitado, mostra atividade epileptiforme contínua, e o tratamento é escalonado com atraso."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O eletroencefalograma confirma estado de mal não convulsivo. O tratamento é escalonado, ele é intubado e sedado em terapia intensiva, e a atividade cessa em poucas horas. Acorda no dia seguinte, sem déficit. A receita do anticonvulsivante é renovada antes da alta, com um plano para que ela não vença de novo."
ensino: "Crise que passa de cinco minutos é estado de mal e o tratamento não espera. Três falhas se repetem: não medir a glicemia, subdosar o benzodiazepínico e não anotar o horário. E quando os movimentos cessam mas o paciente não acorda, sinais sutis como desvio ocular fixo e abalos palpebrais sugerem que a crise continua sem se mostrar, e isso só o eletroencefalograma revela."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera após três dias em terapia intensiva, com déficit de memória recente que melhora ao longo de semanas."
ensino: "A sedação explica sonolência, não sinais focais. Desvio ocular persistente e abalos palpebrais depois do fim dos movimentos pedem eletroencefalograma, e não observação."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ao longo de seis horas de observação sem investigação, a atividade elétrica se mantém. Quando o eletroencefalograma é finalmente feito, o quadro já é refratário. Ele acorda uma semana depois com déficit cognitivo importante e não retorna ao trabalho."
ensino: "O período pós-crítico melhora progressivamente; a ausência de melhora é o alerta. Estado de mal não convulsivo é uma crise que continua sem aparecer, e cada hora não reconhecida se traduz em lesão neuronal que não se recupera."
:::
