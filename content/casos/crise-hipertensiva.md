---
id: crise-hipertensiva
titulo: A pressão que chegou em 210 por 130
contexto: "Você é o interno de plantão na UPA. A enfermagem chama você à sala amarela: um homem de 58 anos acabou de chegar e a pressão da triagem assustou todo mundo."
tags: [emergencia, cardiovascular, sinais vitais, pressão arterial]
topicosDeApoio:
  - exame-fisico-geral/sinais-vitais/pressao-arterial
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
referencias:
  - "Diretriz Brasileira de Hipertensão Arterial, 2025 (SBC/SBH/SBN), cap. 11 (Crise hipertensiva), Figura 11.1 e Quadros 11.1 a 11.3"
  - "Porto, Semiologia Médica, 8ª ed., cap. 47 (Exame clínico do sistema cardiovascular)"
  - "Porto, Exame Clínico, 8ª ed., cap. 14 (Exame da pressão arterial) e cap. 21 (Sinais vitais)"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 17 (Blood Pressure)"
revisao: pendente
inicio: c-triagem
---

::: no
tipo: cena
id: c-triagem
texto: "Ele está sentado na maca, ainda de casaco, recém-chegado da rua. A técnica aferiu a pressão por cima da manga da camisa, assim que ele sentou. Conta que parou a losartana há duas semanas, quando a receita acabou, e que hoje 'o ar ficou curto'."
dados:
  - "PA 210 x 130 mmHg (triagem, por cima da manga, sem repouso)"
  - "FC 96 bpm"
  - "FR 24 irpm"
  - "Temperatura axilar 36,3 °C"
  - "SpO2 93% em ar ambiente"
proximo: d-medida
:::

::: no
tipo: decisao
id: d-medida
pergunta: "Antes de qualquer conduta, o que você faz com esse número?"
opcoes:
  - texto: "Reaferir com cuidado, mas só no braço direito e sem o método palpatório, para não perder tempo."
    avaliacao: aceitavel
    feedback: "Repetir a medida já é bem melhor do que aceitar a da triagem. Faltaram dois passos de dez segundos: a estimativa palpatória, que protege do hiato auscultatório, e o braço contralateral, cuja diferença pode ser a única pista de dissecção aguda de aorta."
    proximo: c-medida-um-braco
  - texto: "Reaferir você mesmo, com o paciente em repouso, manguito adequado ao braço e medida nos dois lados."
    avaliacao: otima
    feedback: "Medida por cima da roupa, sem repouso e com manguito qualquer não sustenta diagnóstico nenhum. Repouso de 3 a 5 minutos, braço exposto e apoiado na altura do coração, manguito escolhido pela circunferência, sistólica estimada pela palpação antes de auscultar, e os dois braços, porque a diferença entre eles pode ser a única pista de dissecção de aorta."
    proximo: c-medida-confirmada
  - texto: "O valor já é altíssimo: nifedipina sublingual de liberação rápida agora, enquanto você examina."
    avaliacao: erro
    feedback: "A nifedipina de liberação rápida é proscrita na crise hipertensiva. A queda é abrupta e não se interrompe, e o cérebro, o coração e o rim de um hipertenso crônico dependem de pressões mais altas para se perfundir."
    proximo: c-queda-abrupta
:::

::: no
tipo: cena
id: c-medida-confirmada
texto: "Com repouso e manguito adequado, a elevação se confirma nos dois braços, sem diferença relevante entre eles. Ele responde a tudo sem dificuldade, mas prefere ficar sentado e completa as frases com esforço."
dados:
  - "PA 196 x 124 mmHg (braço direito)"
  - "PA 192 x 120 mmHg (braço esquerdo)"
  - "FC 96 bpm, pulso regular e duro, simétrico nas duas radiais"
  - "FR 24 irpm"
  - "SpO2 93% em ar ambiente"
proximo: d-loa
:::

::: no
tipo: cena
id: c-medida-um-braco
texto: "Com repouso e manguito adequado, a elevação se confirma no braço direito. O esquerdo ficou sem medida, e no prontuário existe um lado só. Ele responde a tudo sem dificuldade, mas prefere ficar sentado e completa as frases com esforço."
dados:
  - "PA 196 x 124 mmHg (braço direito)"
  - "Braço esquerdo não aferido"
  - "FC 96 bpm, pulso regular e duro"
  - "FR 24 irpm"
  - "SpO2 93% em ar ambiente"
proximo: d-loa
:::

::: no
tipo: decisao
id: d-loa
pergunta: "A elevação está confirmada. O que decide se isso é uma emergência hipertensiva?"
opcoes:
  - texto: "O próprio número: PAS ≥ 180 com PAD ≥ 110 mmHg fecha o diagnóstico de emergência hipertensiva. Pedir vaga na UTI."
    avaliacao: erro
    feedback: "Esses valores levantam a suspeita, mas não fecham nada, a maior parte dos pacientes nessa faixa não tem lesão aguda de órgão-alvo. E, se houver, é o órgão acometido que define o alvo de redução: sem saber qual é, você não sabe nem o que pedir para a UTI."
    proximo: c-atraso
  - texto: "Nada por enquanto: ele está lúcido e andando. Deixá-lo 30 minutos em sala calma e reaferir depois."
    avaliacao: erro
    feedback: "A observação de 30 minutos em ambiente tranquilo é a primeira medida quando os sintomas NÃO têm relação com lesão aguda de órgão-alvo. Só que isso você ainda não sabe: sem o exame dirigido, observar é adiar."
    proximo: c-atraso
  - texto: "Procurar lesão aguda de órgão-alvo: sintomas dirigidos e exame de consciência, tórax, jugulares e pulsos."
    avaliacao: otima
    feedback: "É a lesão aguda e progressiva de órgão-alvo, não o número, que separa a emergência hipertensiva da elevação importante da PA sem lesão. Pergunte por dor torácica, dispneia, alteração visual e déficit neurológico, e examine consciência, ausculta cardíaca e pulmonar, turgência jugular e pulsos. O órgão acometido é que define droga, via e alvo."
    proximo: c-edema-agudo
:::

::: no
tipo: cena
id: c-edema-agudo
texto: "Dirigido, o exame encontra o que a pressa esconderia. Há três horas ele não consegue deitar sem sufocar e dormiu sentado na poltrona. À ausculta, estertores subindo dos dois pulmões; terceira bulha no precórdio; jugulares túrgidas a 45 graus."
dados:
  - "Ortopneia há 3 horas"
  - "Estertores crepitantes até o terço médio de ambos os hemitórax"
  - "Terceira bulha e turgência jugular a 45 graus"
  - "PA 198 x 126 mmHg"
  - "SpO2 90% em ar ambiente"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Emergência hipertensiva com edema agudo de pulmão. Qual o alvo da primeira hora?"
opcoes:
  - texto: "Levar a PA até 120 x 80 mmHg na primeira hora: se o alvo é baixar depressa, baixar até o normal."
    avaliacao: erro
    feedback: "Depressa, sim; até o normal, não. O alvo desta primeira hora é PAS abaixo de 140 mmHg: valores normais são meta de 24 a 48 horas. No hipertenso crônico a autorregulação está deslocada para cima, e a queda excessiva troca congestão por isquemia."
    proximo: fim-dano-queda
  - texto: "Droga intravenosa titulável em paciente monitorizado, com alvo de PAS < 140 mmHg na primeira hora."
    avaliacao: otima
    feedback: "Monitorização, oxigênio e acesso venoso, e o alvo correto: o edema agudo de pulmão está no ramo de exceção do fluxograma da diretriz, ao lado das crises catecolaminérgicas e da dissecção de aorta. Aqui a redução é mais rápida, com PAS abaixo de 140 mmHg já na primeira hora, e é a titulação da droga intravenosa que torna essa velocidade segura."
    proximo: fim-otimo
  - texto: "Nifedipina sublingual de liberação rápida, que age em minutos, enquanto a bomba é preparada."
    avaliacao: erro
    feedback: "É exatamente o que não se faz. O alvo é alcançado com droga titulável, que se interrompe quando o paciente passa mal. A apresentação sublingual de liberação rápida é proscrita justamente porque a queda é veloz, imprevisível e sem freio."
    proximo: fim-dano-queda
:::

::: no
tipo: cena
id: c-queda-abrupta
texto: "Vinte minutos depois da nifedipina, a pressão despenca. Ele fica pálido, com sudorese fria, refere escurecimento visual e um aperto no peito que não existia na chegada. E continua sem conseguir deitar."
dados:
  - "PA 122 x 70 mmHg: queda de 88 mmHg na PAS em 20 minutos"
  - "FC 118 bpm"
  - "Sudorese fria, escurecimento visual e dor precordial nova"
  - "SpO2 90% em ar ambiente, estertores nas bases"
proximo: d-resgate-queda
:::

::: no
tipo: decisao
id: d-resgate-queda
pergunta: "A pressão caiu longe demais e sem controle, e agora há dor precordial. O que você faz?"
opcoes:
  - texto: "A pressão baixou, o objetivo foi cumprido: liberar com receita e retorno ambulatorial."
    avaliacao: erro
    feedback: "O número melhorou e o paciente piorou. Dor precordial nova depois de uma queda abrupta de pressão é isquemia até prova em contrário."
    proximo: fim-dano-alta
  - texto: "Nenhuma droga nova: monitorizar, oxigênio, acesso venoso, ECG imediato e examinar o tórax."
    avaliacao: otima
    feedback: "Boa recuperação. A prioridade agora é conter o estrago: nada de nova dose, monitor, ECG à procura de isquemia e o exame dirigido que deveria ter vindo primeiro, o tórax dele ainda não foi auscultado."
    proximo: fim-aceitavel
:::

::: no
tipo: cena
id: c-atraso
texto: "Passam-se quarenta minutos antes que alguém encoste o estetoscópio naquele tórax. Quando você volta, ele está sentado na beirada da maca, apoiado nos braços, falando por palavras soltas."
dados:
  - "PA 194 x 122 mmHg"
  - "FR 32 irpm, ortopneia"
  - "Estertores crepitantes até os ápices, terceira bulha"
  - "SpO2 88% em ar ambiente"
proximo: d-resgate-atraso
:::

::: no
tipo: decisao
id: d-resgate-atraso
pergunta: "O edema agudo de pulmão estava ali desde a chegada. E agora?"
opcoes:
  - texto: "Assumir a emergência: droga titulável, com alvo de PAS < 140 mmHg nesta primeira hora."
    avaliacao: otima
    feedback: "É a conduta certa, atrasada. Monitorização, oxigênio e droga intravenosa titulável, com o alvo correto para o edema agudo de pulmão, mas ele passou quarenta minutos congesto e hipoxêmico, e esse tempo cobra o preço em órgão."
    proximo: fim-aceitavel
  - texto: "Correr atrás do tempo perdido: doses sucessivas até a pressão chegar a 120 x 80 mmHg."
    avaliacao: erro
    feedback: "Tempo perdido não se compensa passando do alvo. Abaixo de 140 mmHg de PAS já resolve a primeira hora; empurrar até o normal soma isquemia à congestão que já existe."
    proximo: fim-dano-queda
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Na sala de emergência, com monitor e oxigênio, a PAS entra abaixo de 140 mmHg ainda na primeira hora, de forma titulada. A dispneia diminui, a saturação sobe e ele consegue deitar. No prontuário ficam registrados o valor de entrada, a técnica usada, os achados que caracterizaram a lesão de órgão-alvo e o alvo pactuado."
ensino: "Crise hipertensiva não se diagnostica pelo número. O que separa a emergência hipertensiva da elevação importante da PA sem lesão é a lesão aguda e progressiva de órgão-alvo. Antes de tratar, confirme a medida com técnica correta e procure o órgão que está sofrendo: é ele que dita a droga, a via e o alvo da redução."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O paciente acaba recebendo o tratamento certo, depois de um susto evitável. Ele melhora, mas parte da conversa com a família passa a ser sobre o que quase aconteceu."
ensino: "Os dois caminhos que chegam aqui têm a mesma raiz: agir sobre o número antes de examinar o paciente. Tratar sem saber qual órgão está sofrendo expõe a uma queda sem alvo e sem freio; esperar sem examinar deixa a lesão progredir. Reconhecer o próprio erro e voltar ao exame dirigido ainda salva o desfecho: insistir na conduta errada, não."
:::

::: no
tipo: desfecho
id: fim-dano-queda
classe: dano
texto: "A pressão cai muito além do alvo. Ele fica sonolento, com sudorese fria e novo desconforto precordial; o ECG mostra alterações isquêmicas que não existiam na chegada. A congestão pulmonar foi trocada por isquemia."
ensino: "No hipertenso crônico a autorregulação está deslocada para cima: a pressão 'normal' pode ser isquêmica para ele. O alvo depende da emergência: edema agudo de pulmão e crise catecolaminérgica pedem PAS abaixo de 140 mmHg na primeira hora, e a dissecção aguda de aorta, abaixo de 120 mmHg; nas demais emergências hipertensivas, reduz-se cerca de 25% na primeira hora, chega-se a 160/100 a 110 mmHg em 2 a 6 horas e a valores normais só em 24 a 48 horas. Em nenhuma delas se usa nifedipina sublingual de liberação rápida, proscrita por produzir queda veloz e incontrolável."
:::

::: no
tipo: desfecho
id: fim-dano-alta
classe: dano
texto: "Ele vai para casa com a pressão 'controlada' e volta de ambulância na mesma madrugada, com dor precordial e edema agudo de pulmão. A curva de troponina confirma o infarto."
ensino: "Número que melhora não é paciente que melhora. A alta se decide pelo exame do paciente, não pelo valor do manguito, e dor precordial nova depois de uma queda abrupta de pressão é isquemia até prova em contrário."
:::
