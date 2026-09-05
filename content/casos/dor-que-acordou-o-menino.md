---
id: dor-que-acordou-o-menino
titulo: A dor que acordou o menino às 3 da manhã
contexto: "Pronto atendimento, madrugada. Um adolescente de 14 anos chega curvado, amparado pelo pai, pálido e com ânsia. A dor começou há pouco mais de uma hora, de repente, 'lá embaixo', e ele mal deixa alguém chegar perto."
tags: [geniturinario, escroto agudo, torcao testicular, emergencia]
topicosDeApoio:
  - mamas-e-geniturinario/exame-geniturinario-e-retal/genitalia-masculina-e-hernias
referencias:
  - "Porto, Semiologia Médica, 8ª ed., cap. 137 (Doenças do Sistema Genital Masculino)"
  - "Semiologia Clínica, 1ª ed., cap. 17 (Exame das vias urinárias e sistema reprodutor masculino)"
  - "Porto, Exame Clínico, 8ª ed., cap. 18 (Exame dos Órgãos Genitais)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "O pai conta que o filho acordou gritando às 3h e vomitou no caminho. O menino, envergonhado e com dor, diz que 'já doeu assim antes, mas passou sozinho'. A dor é no hemiescroto esquerdo, lancinante, irradiando para a virilha."
dados:
  - "Dor escrotal esquerda súbita, iniciada há ~1 hora"
  - "Náuseas e um episódio de vômito"
  - "Episódios prévios semelhantes, autolimitados"
  - "FC 108 bpm; afebril"
  - "14 anos"
proximo: d-abordagem
:::

::: no
tipo: decisao
id: d-abordagem
pergunta: "Adolescente com dor escrotal súbita e intensa. Como você conduz os primeiros minutos?"
opcoes:
  - texto: "Examinar agora, com privacidade e delicadeza: inspeção comparada dos dois hemiescrotos, posição e eixo do testículo, reflexo cremastérico e teste da elevação manual."
    avaliacao: otima
    feedback: "Escroto agudo nessa idade é torção até prova em contrário, e o exame que orienta a pressa cabe em minutos: a posição do testículo (elevado, sinal de Brunzel; horizontalizado, sinal de Angell), o reflexo cremastérico, e a resposta da dor à elevação manual (sinal de Prehn). A vergonha do adolescente se respeita com porta fechada e explicação, não com exame adiado."
    proximo: c-exame
  - texto: "Analgesia primeiro e exame quando a dor permitir, daqui a uma ou duas horas."
    avaliacao: erro
    feedback: "Analgesia sim, agora; exame adiado, jamais. A torção é acidente vascular com prazo, e as 'uma ou duas horas' de conforto podem ser exatamente as horas que decidem entre salvar e perder o testículo. Trate a dor e examine em seguida, na mesma cena."
    proximo: c-exame
  - texto: "Colher urina e iniciar antibiótico: na idade dele, orquiepididimite é o mais provável."
    avaliacao: erro
    feedback: "A epidemiologia diz o contrário: a torção intravaginal tem seu pico entre 10 e 15 anos, e o quadro (dor súbita lancinante, vômito, crises prévias autolimitadas sugerindo torção intermitente) aponta para ela. Antibiótico empírico aqui é o disfarce mais perigoso do atraso."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com a porta fechada e o pai do lado de fora a pedido do menino, você examina. O hemiescroto esquerdo está tumefato e avermelhado. O testículo esquerdo está visivelmente mais alto que o direito e deitado, com o maior eixo na horizontal. O toque na face interna da coxa esquerda não eleva o testículo; à direita, eleva. Você tenta a elevação manual delicada do testículo esquerdo: a dor não alivia. Não há nódulo azulado visível no polo superior."
dados:
  - "Testículo esquerdo elevado (sinal de Brunzel) e horizontalizado (sinal de Angell)"
  - "Reflexo cremastérico abolido à esquerda, presente à direita"
  - "Elevação manual sem alívio da dor (Prehn ausente)"
  - "Sem mancha azul no polo superior"
proximo: d-diferencial
:::

::: no
tipo: decisao
id: d-diferencial
pergunta: "Elevado, horizontalizado, cremastérico abolido, sem alívio à elevação. Qual é a sua leitura?"
opcoes:
  - texto: "Torção do cordão espermático, com alta probabilidade: cada achado aponta para ela e nenhum para as alternativas."
    avaliacao: otima
    feedback: "É o retrato completo. O encurtamento do cordão torcido eleva e horizontaliza o testículo; o cremastérico abolido acompanha a torção (e está presente na orquiepididimite e na torção do apêndice); o alívio à elevação, que só acontece na orquiepididimite, não veio; e não há a mancha azul que marcaria o apêndice torcido. Com a idade e a história de crises prévias, a probabilidade é altíssima."
    proximo: d-conduta
  - texto: "Orquiepididimite: o escroto vermelho e edemaciado fala por inflamação."
    avaliacao: erro
    feedback: "Vermelhidão e edema pertencem ao escroto agudo em geral, não a uma causa. O que separa as causas é o que você já colheu: cremastérico abolido e dor sem alívio à elevação falam contra orquiepididimite; testículo elevado e horizontal falam por torção. E vale a ressalva honesta: quando o exame é ambíguo, torção e epididimite podem ser indistinguíveis, e a ambiguidade se resolve com pressa, não com antibiótico."
    proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Suspeita alta de torção, cerca de 1 hora e meia de evolução. O ultrassom com Doppler só estará disponível quando o técnico chegar, em duas a três horas. O que você faz?"
opcoes:
  - texto: "Acionar o urologista AGORA com os achados descritos: suspeita alta não espera imagem indisponível; a exploração cirúrgica é o destino, e o Doppler entra só se não atrasar nada."
    avaliacao: otima
    feedback: "É a hierarquia correta. A ultrassonografia com Doppler é fundamental para a comprovação quando está à mão; nenhum sinal isolado autoriza esperar, e nenhum exame indisponível autoriza atrasar. Com este conjunto de achados, nesta idade e neste relógio, o caminho é o centro cirúrgico, e quanto mais cedo a distorção, maior a chance de salvar o testículo."
    proximo: fim-otimo
  - texto: "Aguardar o Doppler das 7h: sem comprovação de fluxo ausente, nenhum cirurgião vai operar."
    avaliacao: erro
    feedback: "A frase inverte a lógica da emergência. A comprovação por imagem serve ao caso duvidoso com aparelho disponível; o caso típico com aparelho indisponível se resolve no centro cirúrgico. Esperar três horas com uma torção instalada é assistir à isquemia consumir o prazo do órgão."
    proximo: fim-dano
  - texto: "Tentar a distorção manual do testículo enquanto o urologista não chega."
    avaliacao: aceitavel
    feedback: "A manobra existe e pode ganhar tempo em mãos treinadas, mas não substitui nada: mesmo quando alivia, a exploração cirúrgica continua indicada, porque a distorção pode ser incompleta e a recidiva é a regra. Se tentar, que seja sem atrasar um minuto do acionamento."
    proximo: fim-otimo
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "O urologista atende ao telefone, lê os achados e manda preparar a sala. A exploração confirma a torção; o testículo, distorcido dentro da janela, recobra a cor. A orquidopexia é bilateral, e o menino recebe alta no dia seguinte, com o pai repetindo para quem quiser ouvir que 'foi tudo muito rápido'."
ensino: "Escroto agudo na puberdade é torção até prova em contrário. O exame que decide cabe em minutos: testículo elevado e horizontalizado, cremastérico abolido, dor sem alívio à elevação. O Doppler comprova quando está disponível; quando não está, a suspeita alta vai ao centro cirúrgico, porque a isquemia tem prazo e o prazo custa o órgão."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "O Doppler das 7h20 mostra ausência de fluxo no testículo esquerdo. Na cirurgia, mais de seis horas depois do início da dor, o órgão está escuro e não responde: orquiectomia. A conversa com o pai, na saída do centro cirúrgico, é sobre o que três horas de espera significaram."
ensino: "A imagem que não está disponível não pode ser critério de conduta. Na torção, as horas de evolução são a variável que nenhum tratamento recupera: o exame físico típico, na idade típica, autoriza e exige o acionamento imediato. O antibiótico errado atrasa; o exame adiado atrasa; a espera pela comprovação, quando ela não está à mão, é o atraso com aparência de rigor."
:::
