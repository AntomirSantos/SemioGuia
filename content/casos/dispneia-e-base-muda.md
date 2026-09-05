---
id: dispneia-e-base-muda
titulo: A base que parou de falar
contexto: "Enfermaria de clínica médica, início da tarde. O paciente do leito 12, internado ontem à noite pela emergência com 'pneumonia a esclarecer', chama porque o ar 'está ficando mais curto'. O plantonista da noite deixou anotado: ausculta com murmúrio diminuído à direita."
tags: [respiratorio, dispneia, derrame pleural, percussao, ausculta]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/palpacao-do-torax
  - aparelho-respiratorio/exame-do-torax/percussao-do-torax
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
referencias:
  - "Porto, Semiologia Médica, 8ª ed., cap. 36 (Exame Clínico do sistema respiratório)"
  - "Porto, Exame Clínico, 8ª ed., cap. 16 (Exame do Tórax)"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., caps. 28 a 30 (tórax) e 32 (pneumonia)"
  - "Semiologia Clínica, 1ª ed., cap. 10 (O exame do tórax e do sistema respiratório), Tabela 8 (síndromes pleuropulmonares)"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Homem de 62 anos, tabagista, uma semana de tosse, febre baixa e cansaço que foi virando falta de ar. Sentado na beira do leito, fala frases completas, mas encurtadas. A radiografia de ontem ainda não foi feita: a fila do setor está longa."
dados:
  - "FC 98 bpm"
  - "FR 26 irpm"
  - "Temperatura axilar 37,8 °C"
  - "SpO2 91% em ar ambiente"
  - "PA 128 x 82 mmHg"
proximo: d-roteiro
:::

::: no
tipo: decisao
id: d-roteiro
pergunta: "O murmúrio diminuído à direita já está anotado. Qual é o seu próximo movimento?"
opcoes:
  - texto: "Confirmar a ausculta você mesmo e, se o murmúrio estiver mesmo diminuído, aguardar a radiografia para definir a causa."
    avaliacao: aceitavel
    feedback: "Repetir a ausculta é correto, mas parar nela desperdiça o que o exame físico tem de melhor aqui. Murmúrio diminuído unilateral é uma porta, não um diagnóstico: quem separa as causas é a comparação dos quatro tempos, com a palpação e a percussão comparando pontos homólogos."
    proximo: c-so-ausculta
  - texto: "Examinar o tórax por inteiro: inspeção, expansibilidade, frêmito toracovocal, percussão e ausculta, sempre comparando pontos homólogos dos dois lados."
    avaliacao: otima
    feedback: "É o roteiro que resolve. Cada tempo responde a uma pergunta diferente (como a parede se move, como a voz chega à mão, quanto ar existe sob o dedo, como o ar entra), e a comparação homóloga transforma cada achado em um contraste com o lado são."
    proximo: c-quatro-tempos
  - texto: "Pedir para priorizarem a radiografia e antecipar uma dose de antibiótico de largo espectro enquanto a imagem não sai."
    avaliacao: erro
    feedback: "Você acabou de trocar cinco minutos de exame físico por horas de fila de radiografia, e prescreveu para uma hipótese que ninguém examinou. A base muda tem diagnóstico sindrômico à beira do leito: mãos e dedos chegam antes do raio X."
    proximo: c-sem-exame
:::

::: no
tipo: cena
id: c-quatro-tempos
texto: "Você expõe o tórax e examina com calma, ponto a ponto, sempre direita contra esquerda. A metade inferior do hemitórax direito se move menos. A voz, que vibra na sua mão em todo o lado esquerdo, simplesmente desaparece na base direita. A percussão, clara à esquerda, encontra ali uma nota abafada, quase pétrea, com o dedo sentindo mais resistência. O murmúrio está abolido na mesma área, e a voz auscultada chega fraca, distante."
dados:
  - "Expansibilidade reduzida na base direita"
  - "Frêmito toracovocal abolido na base direita"
  - "Macicez à percussão da base direita, com resistência aumentada ao dedo"
  - "Murmúrio vesicular abolido na base direita; normal à esquerda"
  - "Ressonância vocal diminuída na base direita"
proximo: d-sindrome
:::

::: no
tipo: cena
id: c-so-ausculta
texto: "Você confirma: murmúrio muito diminuído na base direita, normal à esquerda. Anota e fica olhando a prescrição. O achado, sozinho, continua ambíguo: tanto o líquido na pleura quanto o pulmão condensado, e até um enfisema avançado, diminuem o murmúrio."
proximo: d-faltando
:::

::: no
tipo: decisao
id: d-faltando
pergunta: "Murmúrio diminuído unilateral, e nada mais examinado. O que decide o diagnóstico sindrômico?"
opcoes:
  - texto: "Voltar ao leito e completar o exame: frêmito toracovocal, percussão e ressonância vocal, comparando os dois lados."
    avaliacao: otima
    feedback: "Exato. A ausculta achou o lado doente; palpação e percussão dizem o que ele tem. Frêmito e macicez são justamente os tempos que separam líquido de condensação."
    proximo: c-quatro-tempos
  - texto: "Concluir que é a pneumonia da internação e apenas escalonar o antibiótico, já que ele piorou."
    avaliacao: erro
    feedback: "A conclusão pulou o exame. Se a piora for um derrame volumoso, antibiótico nenhum drena líquido, e a dispneia vai continuar crescendo enquanto a prescrição engorda."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-sem-exame
texto: "Duas horas depois, a radiografia ainda não saiu e a enfermagem chama de novo: a frequência respiratória subiu para 30 e a saturação caiu para 88%. O antibiótico corre na bomba, sem alvo definido."
proximo: d-recuar
:::

::: no
tipo: decisao
id: d-recuar
pergunta: "A imagem não veio e o paciente piora. E agora?"
opcoes:
  - texto: "Reconhecer o atalho errado, voltar ao leito e fazer agora o exame completo do tórax, comparando os dois lados."
    avaliacao: otima
    feedback: "Melhor tarde do que nunca: o exame que você faz agora é o mesmo que estava disponível duas horas atrás, e ainda muda a conduta."
    proximo: c-quatro-tempos
  - texto: "Manter a conduta e insistir com o setor de imagem: sem radiografia não há o que decidir."
    avaliacao: erro
    feedback: "Há, e muito. A percussão detecta os grandes derrames com folga: confrontada com a radiografia, encontrou 100% deles. Esperar a fila enquanto o paciente afunda é abrir mão do instrumento que está nas suas mãos."
    proximo: fim-dano
:::

::: no
tipo: decisao
id: d-sindrome
pergunta: "Expansibilidade reduzida, frêmito abolido, macicez pétrea, murmúrio abolido e voz distante, tudo na base direita. Qual é a síndrome?"
opcoes:
  - texto: "Derrame pleural: líquido entre o pulmão e a parede, afastando o pulmão da sua mão."
    avaliacao: otima
    feedback: "É a assinatura completa. O líquido bloqueia a vibração da voz (frêmito e ressonância vocal somem), tira o ar de sob o dedo (macicez pétrea) e afasta o murmúrio. Murmúrio diminuído unilateral aponta derrame com razão de verossimilhança 5,2, e a ressonância vocal diminuída, com 6,5: elevações moderadas a substanciais da probabilidade, e aqui elas se somam no mesmo lugar."
    proximo: c-confirmacao
  - texto: "Consolidação pneumônica: o lobo inteiro hepatizado pela infecção."
    avaliacao: erro
    feedback: "A consolidação também abafa a percussão, mas trai a diferença nos tempos da voz: o tecido condensado transmite a vibração MELHOR que o ar, então o frêmito aumenta, a voz auscultada fica anasalada e clara (egofonia, broncofonia) e costuma haver som brônquico onde deveria haver murmúrio. Aqui a voz sumiu da mão e do estetoscópio: algo está bloqueando a transmissão, não facilitando."
    proximo: c-correcao
  - texto: "Pneumotórax: o pulmão colabado por ar na cavidade pleural."
    avaliacao: erro
    feedback: "O pneumotórax também abole frêmito e murmúrio, mas a percussão vai para o outro extremo: hipersonoridade ou timpanismo, ar demais sob o dedo. A nota pétrea que você encontrou diz líquido ou tecido, nunca ar livre."
    proximo: c-correcao
:::

::: no
tipo: cena
id: c-correcao
texto: "A ultrassonografia à beira do leito desfaz a dúvida: uma coluna anecoica de líquido separa o pulmão da parede, com o parênquima flutuando dentro dela. Era derrame. Os seus próprios achados já diziam isso: a voz que some, da mão e do ouvido, aponta bloqueio da transmissão; a que aumenta e fica anasalada aponta condensação. A toracocentese sai no fim da tarde."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O paciente é puncionado e melhora, mas o diagnóstico sindrômico veio da máquina, não do seu raciocínio. Na discussão do caso, o preceptor recoloca a pergunta: com frêmito abolido, macicez pétrea e voz distante, o que mais poderia ser?"
ensino: "Derrame e consolidação dividem a macicez, mas se separam pela voz: no derrame o frêmito e a ressonância vocal somem; na consolidação aumentam, com egofonia e som brônquico. O pneumotórax abole a voz com hipersonoridade. Gravar esses três perfis é carregar o diagnóstico diferencial da base muda no bolso."
:::

::: no
tipo: cena
id: c-confirmacao
texto: "Você delimita a macicez, que sobe até o terço médio do hemitórax, e marca a pele. A equipe prioriza a imagem com a sua descrição sindrômica no pedido; a ultrassonografia à beira do leito confirma derrame volumoso à direita e a toracocentese diagnóstica e de alívio sai ainda no fim da tarde."
proximo: d-apos-puncao
:::

::: no
tipo: decisao
id: d-apos-puncao
pergunta: "Saem 1.200 mL de líquido citrino. Meia hora depois, como você verifica o resultado no exame físico?"
opcoes:
  - texto: "Repetir os tempos alterados: percussão, frêmito e ausculta da base direita, comparando com o registro de antes."
    avaliacao: otima
    feedback: "O exame físico serve para acompanhar, não só para diagnosticar. A nota da percussão subindo de pétrea para clara, o frêmito voltando à mão e o murmúrio reaparecendo são a prova, à beira do leito, de que o pulmão voltou a se expandir."
    proximo: fim-otimo
  - texto: "Aguardar a radiografia de controle: só a imagem diz se o derrame saiu."
    avaliacao: aceitavel
    feedback: "A radiografia de controle tem seu lugar, mas o mesmo exame que diagnosticou o derrame mostra a resposta em minutos, de graça, quantas vezes você quiser. Quem examinou antes e depois carrega o próprio controle nas mãos."
    proximo: fim-otimo
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com o derrame esvaziado, a frequência respiratória cai para 18 e a saturação sobe para 96%. No prontuário ficam as duas fotografias semiológicas, a de antes e a de depois, lado a lado: expansibilidade, frêmito, percussão e ausculta, cada tempo com seu achado."
ensino: "A base muda se resolve com os quatro tempos comparados em pontos homólogos. O derrame bloqueia a transmissão (frêmito e voz somem, macicez pétrea); a consolidação a facilita (frêmito aumenta, egofonia, som brônquico); o pneumotórax abole a transmissão com hipersonoridade. A ausculta acha o lado; palpação e percussão dizem o que ele tem."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "No fim do plantão a radiografia finalmente sai: opacidade homogênea ocupando metade do hemitórax direito, com a parábola de líquido subindo pela parede. O paciente vai à toracocentese de urgência, horas depois do que precisava, já com desconforto importante e saturando 86%."
ensino: "Murmúrio diminuído unilateral não é diagnóstico, é convite ao exame completo. A percussão detecta os grandes derrames com desempenho que nenhum outro tempo do exame iguala, e frêmito abolido com macicez pétrea fecha a síndrome à beira do leito. Antibiótico não trata dispneia de causa não examinada, e fila de radiografia não substitui as mãos."
:::
