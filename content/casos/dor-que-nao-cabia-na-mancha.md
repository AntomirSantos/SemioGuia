---
id: dor-que-nao-cabia-na-mancha
titulo: A dor que não cabia na mancha
contexto: "Emergência de hospital geral, sábado à noite. Um homem de 61 anos, diabético, chega com dor na coxa esquerda há um dia e uma mancha vermelha que a esposa diz ter aparecido de manhã e crescido durante a tarde. Ele diz que a dor é muito forte, e a mancha, quando você olha, parece pequena para o tamanho da queixa."
tags: [geral, fasciite necrosante, pele, emergencia]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
  - exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da pele e de infecções de partes moles"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da pele e infecções de tecidos moles"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral e da pele"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele está prostrado, com o rosto contraído, e não deixa ninguém encostar na coxa. A área avermelhada tem cerca de dez centímetros na face medial, sem borda bem definida. A dor que ele descreve é de 10 em 10 e se estende bem além do vermelho. A temperatura é de 38,6 graus e o pulso, de 122 bpm."
dados:
  - "Dor intensa na coxa há 24 horas, progressiva"
  - "Área eritematosa de bordas mal definidas, crescendo em horas"
  - "Dor que ultrapassa os limites da lesão visível"
  - "Temperatura 38,6 graus, FC 122 bpm, PA 104 x 62 mmHg"
  - "Diabetes de longa data"
proximo: d-primeira-leitura
:::

::: no
tipo: decisao
id: d-primeira-leitura
pergunta: "Como você lê a desproporção entre a dor e o tamanho da mancha?"
opcoes:
  - texto: "Como bandeira vermelha: dor que excede muito os limites da lesão visível, em quadro que evolui em horas, sugere infecção necrosante de partes moles."
    avaliacao: otima
    feedback: "Essa desproporção é o sinal precoce mais valioso. A infecção necrosante caminha pelo plano da fáscia, abaixo da pele, e destrói terminações nervosas e vasos antes de a pele mudar de aspecto. Por isso o paciente dói muito e a superfície ainda mostra pouco, e por isso a velocidade da evolução conta tanto quanto a aparência."
    proximo: c-exame
  - texto: "Como baixa tolerância à dor, comum em diabéticos com neuropatia e ansiedade: iniciar antibiótico oral para celulite e reavaliar em quarenta e oito horas."
    avaliacao: erro
    feedback: "A neuropatia do diabético costuma reduzir a dor, não aumentá-la, o que torna esta queixa ainda mais preocupante. Celulite comum não avança em horas nem produz taquicardia e febre com prostração desse grau. Quarenta e oito horas nesta doença é um intervalo em que o desfecho já terá sido decidido."
    proximo: c-atraso
  - texto: "Como possível trombose venosa profunda com dor intensa: solicitar doppler antes de decidir."
    avaliacao: aceitavel
    feedback: "A trombose entra no diagnóstico diferencial da perna dolorosa e edemaciada, e a doppler será útil. O que não combina é a febre alta com prostração e uma lesão de pele que cresce durante a tarde. Peça o exame sem deixar que ele adie a avaliação cirúrgica."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Na manhã seguinte a área dobrou de tamanho, a pele mudou para um tom acinzentado em partes e ele está hipotenso. As horas gastas com antibiótico oral foram as horas em que a fáscia continuou sendo destruída."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com a perna despida e boa iluminação, você percebe que a área eritematosa tem limites imprecisos, que se perdem na pele normal. Há uma zona central mais escura, quase acinzentada, e a pele ali está tensa e brilhante. Ao palpar, você sente uma crepitação fina sob os dedos em um ponto. O edema ultrapassa muito a área avermelhada. Ele não sente o toque leve no centro da lesão, embora sinta ao redor."
dados:
  - "Bordas imprecisas, com zona central acinzentada"
  - "Pele tensa e brilhante, edema além do eritema"
  - "Crepitação à palpação"
  - "Anestesia cutânea no centro da lesão"
  - "PA 96 x 56 mmHg, FC 130 bpm"
proximo: d-achados
:::

::: no
tipo: decisao
id: d-achados
pergunta: "Anestesia da pele no centro da lesão e crepitação. O que esses achados indicam?"
opcoes:
  - texto: "Indicam necrose já instalada: os nervos cutâneos foram destruídos e há gás nos tecidos, o que torna a exploração cirúrgica imediata a prioridade absoluta."
    avaliacao: otima
    feedback: "A anestesia cutânea sobre uma área que dói ao redor é um achado quase específico: significa que os pequenos nervos que passavam ali já morreram. A crepitação indica gás produzido por bactérias no tecido. Nenhum dos dois é achado de celulite, e ambos apontam para a sala de cirurgia, não para mais uma dose de antibiótico."
    proximo: c-conduta
  - texto: "Indicam apenas infecção mais extensa: aumentar o espectro do antibiótico e observar de perto por seis horas."
    avaliacao: erro
    feedback: "Antibiótico não alcança tecido morto, e é tecido morto que está alimentando essa infecção. A doença avança pela fáscia em velocidade que se mede em centímetros por hora, e a única intervenção que interrompe é o desbridamento cirúrgico. Seis horas de observação é o intervalo que decide entre membro e amputação."
    proximo: fim-dano
  - texto: "Indicam necessidade de tomografia para avaliar extensão do gás antes da decisão cirúrgica."
    avaliacao: aceitavel
    feedback: "A imagem mostra o gás e ajuda a planejar, e é dispensável quando o quadro clínico já é característico. Com hipotensão, anestesia cutânea e crepitação, a exploração cirúrgica não deve esperar pelo exame. A tomografia só cabe quando ainda existe dúvida real."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "Culturas colhidas, antibiótico de amplo espectro iniciado e volume correndo. A cirurgia foi acionada e a sala fica pronta em trinta minutos. A pressão respondeu parcialmente e está em 100 x 58 mmHg. A área acinzentada aumentou visivelmente desde a chegada dele."
dados:
  - "Antibiótico de amplo espectro iniciado"
  - "Sala cirúrgica em 30 minutos"
  - "Lesão com progressão visível em poucas horas"
  - "PA 100 x 58 mmHg após volume"
proximo: d-marcacao
:::

::: no
tipo: decisao
id: d-marcacao
pergunta: "O que você faz nesses trinta minutos de espera?"
opcoes:
  - texto: "Marcar a borda do eritema com caneta e a hora ao lado, manter volume e antibiótico, e comunicar à equipe cirúrgica a velocidade de progressão observada."
    avaliacao: otima
    feedback: "Marcar a borda com a hora transforma impressão em dado: quem receber o paciente vê exatamente quanto a lesão avançou e em quanto tempo. É um gesto de dez segundos, custo zero, que muda a percepção de urgência de toda a equipe. Vale em qualquer infecção de pele que esteja em dúvida."
    proximo: fim-otimo
  - texto: "Aguardar sem intervenções adicionais, para não atrasar a ida ao centro cirúrgico."
    avaliacao: aceitavel
    feedback: "Não atrasar é correto, e nada do que foi sugerido atrasa: marcar a borda e manter volume acontecem enquanto a maca se desloca. O risco de não registrar é a equipe seguinte subestimar a velocidade da doença."
    proximo: c-sem-marcacao
  - texto: "Aplicar compressas frias sobre a lesão para aliviar a dor durante a espera."
    avaliacao: erro
    feedback: "O frio provoca vasoconstrição em um tecido que já está isquêmico e piora a perfusão da área ameaçada, além de mascarar a evolução da temperatura local. A analgesia aqui é sistêmica, e a única medida que trata é a cirurgia."
    proximo: c-sem-marcacao
:::

::: no
tipo: cena
id: c-sem-marcacao
texto: "Sem registro da borda, a equipe cirúrgica avalia o caso como uma celulite grave e a exploração começa com o desbridamento mais conservador do que deveria, exigindo uma segunda cirurgia no dia seguinte."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A exploração cirúrgica confirma necrose da fáscia, que se descola com facilidade ao toque. O desbridamento é amplo, guiado pela extensão real da doença, e ele passa por mais duas revisões cirúrgicas programadas. Sobrevive, mantém o membro e recebe enxerto de pele na quarta semana."
ensino: "Dor desproporcional ao aspecto da pele, evolução em horas, bordas imprecisas, anestesia cutânea sobre a lesão e crepitação apontam infecção necrosante de partes moles. Nenhum antibiótico alcança tecido morto: o tratamento é cirúrgico e a janela é de horas. Marcar a borda do eritema com a hora ao lado é um gesto simples que documenta a velocidade da doença."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele sobrevive e mantém o membro, com duas cirurgias a mais do que seria necessário e uma internação de seis semanas."
ensino: "A velocidade de progressão é parte do diagnóstico e precisa ser comunicada de forma objetiva. Marcar a borda com a hora é a maneira mais simples de transmitir urgência a quem chega depois de você."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Nas seis horas de observação a infecção sobe para a região inguinal e ele evolui com choque séptico. A cirurgia precisa desbridar da coxa até o abdome, e depois de três semanas em terapia intensiva ele acaba amputado no quadril."
ensino: "Antibiótico não penetra em tecido necrosado, e a infecção necrosante avança enquanto se observa. Anestesia cutânea e crepitação já são achados tardios: quando aparecem, a decisão cirúrgica não pode esperar nem por imagem nem por reavaliação."
:::
