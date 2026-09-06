---
id: atraso-que-ninguem-perguntou
titulo: O atraso que ninguém perguntou
contexto: "Pronto atendimento numa sexta-feira à noite. Uma mulher de 27 anos chega com dor no baixo ventre há seis horas, que começou de um lado e agora é difusa. A ficha da triagem diz 'cólica menstrual forte'. Ela está pálida e diz que sentiu tontura ao levantar da cama."
tags: [abdome, abdome agudo, gravidez ectopica, hemorragia]
topicosDeApoio:
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
  - mamas-e-geniturinario/exame-geniturinario-e-retal/exame-ginecologico
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome e de hipovolemia"
  - "Porto, Semiologia Médica, 8ª ed., seção de abdome agudo e exame ginecológico"
  - "Semiologia Clínica, 1ª ed., capítulos de semiologia abdominal e ginecológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está deitada de lado, com as pernas encolhidas. A pele do rosto está sem cor e as conjuntivas, descoradas. Diz que a dor começou à tarde, do lado direito, e que há uma hora se espalhou por toda a região baixa da barriga. Está com pressão de 108 x 62 mmHg deitada, e a frequência cardíaca é de 104 bpm."
dados:
  - "Dor pélvica há 6 horas, inicialmente à direita, agora difusa"
  - "Palidez cutâneo-mucosa"
  - "PA 108 x 62 mmHg deitada, FC 104 bpm"
  - "Tontura ao levantar"
  - "Triagem registrou cólica menstrual"
proximo: d-anamnese
:::

::: no
tipo: decisao
id: d-anamnese
pergunta: "Qual pergunta e qual medida você faz antes de qualquer exame complementar?"
opcoes:
  - texto: "Perguntar a data da última menstruação e a possibilidade de gravidez, e medir a pressão e o pulso deitada e sentada."
    avaliacao: otima
    feedback: "As duas coisas custam dois minutos e mudam tudo. Em mulher em idade fértil com dor pélvica, a possibilidade de gravidez orienta todo o raciocínio, e a pergunta precisa ser feita de forma direta e reservada. A variação da pressão e do pulso com a mudança de posição é o modo mais simples de detectar perda de volume antes de a pressão deitada cair."
    proximo: c-exame
  - texto: "Prescrever analgesia e antiespasmódico para cólica e reavaliar em uma hora."
    avaliacao: erro
    feedback: "Rotular a dor pélvica da mulher jovem como cólica sem perguntar sobre gravidez é o atalho que produz os desfechos mais graves desta apresentação. Palidez, taquicardia e tontura postural não pertencem a uma cólica menstrual, e a hora de reavaliação é comprada com o sangue que continua saindo."
    proximo: c-atraso
  - texto: "Solicitar ultrassonografia pélvica e aguardar o resultado para decidir."
    avaliacao: aceitavel
    feedback: "A imagem é essencial e será pedida, mas ela não substitui a pergunta nem a medida de pressão em duas posições. Além disso, a fila do exame pode custar mais do que a paciente tem de reserva. Investigue e estabilize em paralelo."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Uma hora depois ela chama, mais pálida, dizendo que a dor agora sobe para o ombro direito quando ela se deita. Alguém finalmente pergunta a data da última menstruação, e a resposta muda o plantão inteiro."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "A última menstruação foi há sete semanas e ela achou que estava atrasada 'por estresse'. Deitada, a pressão é 108 x 62 mmHg com pulso de 104 bpm; sentada, cai para 88 x 56 mmHg com pulso de 126 bpm. O abdome tem dor difusa com descompressão dolorosa em quadrante inferior direito, e a percussão sugere macicez móvel em flancos. Ela refere dor no ombro direito ao deitar."
dados:
  - "Última menstruação há 7 semanas"
  - "Queda de pressão e aumento de pulso ao sentar"
  - "Descompressão dolorosa em fossa ilíaca direita"
  - "Macicez móvel em flancos"
  - "Dor referida no ombro direito em decúbito"
proximo: d-leitura
:::

::: no
tipo: decisao
id: d-leitura
pergunta: "Atraso menstrual, hipotensão postural, dor à descompressão e dor no ombro. O que está acontecendo?"
opcoes:
  - texto: "Hemoperitônio, muito provavelmente por gravidez ectópica rota: acionar a cirurgia e a reserva de sangue enquanto o teste de gravidez e a imagem correm."
    avaliacao: otima
    feedback: "Cada peça encaixa. A dor no ombro nasce da irritação do diafragma pelo sangue livre, que compartilha inervação com essa região. A macicez móvel indica líquido na cavidade. E a variação da pressão com a postura mostra que o volume perdido já é significativo. Nesse conjunto, a paciente precisa de sala e de sangue, e não de fila de exame."
    proximo: c-sala
  - texto: "Apendicite aguda, pela dor que começou difusa e localizou em fossa ilíaca direita."
    avaliacao: erro
    feedback: "A localização engana, mas o resto não acompanha: apendicite não produz palidez com queda postural de pressão em seis horas, nem macicez móvel, nem dor referida no ombro. E ignora o dado que mudou o caso, o atraso menstrual de sete semanas. Quando a hipótese não explica todos os achados, é a hipótese que precisa mudar."
    proximo: c-sala
  - texto: "Provável cisto ovariano roto: conduta expectante com analgesia e controle seriado do hematócrito."
    avaliacao: aceitavel
    feedback: "Cisto roto entra no diagnóstico diferencial e às vezes é conduzido sem cirurgia, mas apenas na paciente estável. Esta não está: a pressão cai ao sentar. Instabilidade retira a conduta expectante da mesa, qualquer que seja a causa do sangramento."
    proximo: c-sala
:::

::: no
tipo: cena
id: c-sala
texto: "O teste de gravidez é positivo. A ultrassonografia à beira do leito mostra líquido livre abundante e útero vazio. Você tem dois acessos calibrosos instalados e a reserva de sangue foi solicitada. A pressão agora marca 92 x 58 mmHg deitada."
dados:
  - "Teste de gravidez positivo"
  - "Líquido livre abundante, útero vazio"
  - "PA 92 x 58 mmHg deitada, FC 128 bpm"
  - "Dois acessos periféricos calibrosos"
proximo: d-reanimacao
:::

::: no
tipo: decisao
id: d-reanimacao
pergunta: "Enquanto o centro cirúrgico é preparado, como você a mantém?"
opcoes:
  - texto: "Volume inicial com cristaloide, transfusão precoce de concentrado de hemácias e transporte imediato ao centro cirúrgico, sem aguardar normalização da pressão."
    avaliacao: otima
    feedback: "O sangramento que só para com a cirurgia não se corrige na sala de emergência. O papel do volume e da transfusão aqui é comprar o trajeto até a sala, não normalizar a pressão. Perseguir números antes da hemostasia costuma diluir o que ainda coagula e atrasar o único tratamento que resolve."
    proximo: fim-otimo
  - texto: "Infundir grandes volumes de cristaloide até a pressão normalizar e só então transportar."
    avaliacao: erro
    feedback: "Volume em excesso sem controle da fonte dilui fatores de coagulação, esfria a paciente e pode aumentar o próprio sangramento ao elevar a pressão contra um vaso roto. E o tempo gasto perseguindo a meta é o tempo que a cirurgia não teve."
    proximo: fim-dano
  - texto: "Aguardar a chegada do resultado de hemoglobina para decidir sobre transfusão."
    avaliacao: aceitavel
    feedback: "Na hemorragia aguda a hemoglobina demora a refletir a perda, porque o sangue que sai leva plasma e células na mesma proporção. Decidir transfusão por esse número, nesta fase, é decidir por um dado atrasado. A clínica já indicou."
    proximo: c-espera-hb
:::

::: no
tipo: cena
id: c-espera-hb
texto: "O resultado demora vinte e cinco minutos e vem quase normal, como era esperado numa perda aguda. Nesse intervalo a pressão cai para 82 x 50 mmHg, e a transfusão começa já com a paciente sonolenta, a caminho da sala."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Ela entra em sala setenta minutos após a chegada. A cirurgia encontra gravidez tubária rota à direita, com cerca de um litro e meio de sangue na cavidade. A trompa é preservada parcialmente. Ela recebe duas unidades de concentrado de hemácias e recebe alta no terceiro dia."
ensino: "Em toda mulher em idade fértil com dor pélvica, a pergunta sobre gravidez faz parte do exame. Três achados de beira do leito montam o hemoperitônio: queda de pressão com aumento de pulso ao mudar de posição, macicez móvel e dor referida no ombro pela irritação diafragmática. Diante deles, o caminho é a sala, e o volume serve apenas para chegar até ela."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A cirurgia acontece com atraso, exige salpingectomia total e quatro unidades de concentrado de hemácias. A recuperação é boa, com internação de seis dias."
ensino: "Na hemorragia aguda, a hemoglobina inicial é um número atrasado: o sangue perdido leva plasma e células juntos. Quem decide transfusão nessa fase é a clínica, e esperar o laboratório custa o volume que ainda estava saindo."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Depois de três litros de cristaloide, ela chega à sala hipotérmica, com coagulopatia e pressão de 70 x 40 mmHg. A cirurgia precisa de compressão prolongada, ela recebe seis unidades de concentrado de hemácias e passa quatro dias em terapia intensiva."
ensino: "Enquanto o vaso está aberto, volume não substitui hemostasia: em excesso, dilui a coagulação, esfria e pode aumentar o sangramento. A meta antes da cirurgia não é a pressão normal, é chegar à sala com perfusão suficiente e coagulação preservada."
:::
