---
id: dor-desproporcional-ao-exame
titulo: A dor que o abdome não confirmava
contexto: "Emergência, começo da manhã. Uma mulher de 74 anos, com fibrilação atrial e anticoagulação suspensa há duas semanas para uma extração dentária, chega com dor abdominal intensa e contínua que começou há quatro horas, de forma súbita. Ela grita de dor, e a barriga, quando você a examina, está quase normal."
tags: [abdome, abdome agudo, isquemia mesenterica, fibrilacao atrial]
topicosDeApoio:
  - abdome/exame-do-abdome/abdome-agudo-e-sinais-peritoneais
  - abdome/exame-do-abdome/inspecao-e-ausculta-do-abdome
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame do abdome e do pulso arterial"
  - "Porto, Semiologia Médica, 8ª ed., seção de abdome agudo vascular"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia abdominal"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela descreve a dor como 10 em 10, contínua, difusa, sem posição que alivie. Vomitou duas vezes e teve uma evacuação líquida logo no início. O pulso é irregular, sem qualquer padrão. Ao palpar, o abdome é depressível, discretamente doloroso, sem defesa e sem descompressão dolorosa."
dados:
  - "Dor abdominal súbita e contínua há 4 horas, intensidade máxima"
  - "Abdome depressível, sem defesa, sem descompressão dolorosa"
  - "Pulso irregularmente irregular, FC em torno de 118 bpm"
  - "Anticoagulante suspenso há 2 semanas"
  - "PA 138 x 84 mmHg, temperatura 36,9 graus"
proximo: d-discrepancia
:::

::: no
tipo: decisao
id: d-discrepancia
pergunta: "A dor é máxima e o exame do abdome é quase normal. Como você lê essa discrepância?"
opcoes:
  - texto: "Como o achado mais importante do caso: dor desproporcional ao exame, em portadora de fibrilação atrial sem anticoagulação, aponta isquemia mesentérica até prova em contrário."
    avaliacao: otima
    feedback: "Essa desproporção é a marca registrada da fase inicial da isquemia mesentérica. Nas primeiras horas, o intestino sofre por dentro e o peritônio ainda não foi atingido, então a parede não se defende e o exame engana. Quando o abdome finalmente ficar rígido, o intestino já terá necrosado. A fonte do êmbolo, aqui, está declarada no pulso."
    proximo: c-investigacao
  - texto: "Como sinal de que a dor é exagerada ou de origem funcional, já que o exame não a confirma."
    avaliacao: erro
    feedback: "É o erro que define o prognóstico desta doença. A ausência de sinais peritoneais nas primeiras horas não é ausência de doença, é a fisiologia da isquemia visceral. Em idosa com arritmia embolígena e anticoagulação suspensa, dor desproporcional é bandeira vermelha, e nunca comportamento."
    proximo: c-atraso
  - texto: "Como quadro inespecífico: iniciar analgesia, hidratação e observar a evolução dos sinais abdominais."
    avaliacao: aceitavel
    feedback: "Observar a evolução dos sinais é justamente esperar a necrose. O suporte está correto, mas ele precisa acontecer enquanto a investigação vascular corre, não no lugar dela. A janela terapêutica desta doença se fecha antes de o abdome ficar rígido."
    proximo: c-investigacao
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela recebe analgesia e fica em observação. Duas horas depois, a dor cedeu apenas em parte e o abdome continua enganosamente mole. O alívio parcial quase convence a equipe, até que o lactato colhido na admissão volta alterado e a investigação recomeça."
proximo: c-investigacao
:::

::: no
tipo: cena
id: c-investigacao
texto: "Você refaz o exame com atenção ao restante do sistema. O pulso segue irregular, sem pulso de déficit periférico evidente. A ausculta abdominal encontra ruídos ainda presentes, discretamente diminuídos. Os laboratórios iniciais mostram acidose metabólica com lactato elevado e contagem de leucócitos alta, sem outro foco aparente."
dados:
  - "Lactato elevado, acidose metabólica"
  - "Leucocitose sem foco identificado"
  - "Ruídos hidroaéreos ainda presentes"
  - "Abdome ainda sem defesa"
proximo: d-exame-decisivo
:::

::: no
tipo: decisao
id: d-exame-decisivo
pergunta: "Qual exame você pede agora, e com que urgência?"
opcoes:
  - texto: "Angiotomografia de abdome com fase arterial, imediatamente, e comunicação simultânea à cirurgia vascular ou geral."
    avaliacao: otima
    feedback: "A fase arterial é o detalhe que decide: uma tomografia comum, sem o protocolo vascular, pode não mostrar a oclusão. E o cirurgião precisa ser acionado junto com o pedido, não depois do laudo, porque o tratamento pode exigir revascularização em poucas horas. Lactato alto com abdome pobre é sinal tardio, e reforça a pressa."
    proximo: fim-otimo
  - texto: "Ultrassonografia de abdome à beira do leito, por ser rápida e não usar contraste em paciente idosa."
    avaliacao: aceitavel
    feedback: "A preocupação com a função renal é legítima, mas a ultrassonografia costuma ser pouco informativa aqui, sobretudo com alças distendidas e gás. O risco de perder o diagnóstico supera o risco do contraste nesta situação, e a demora somada de dois exames é o que mais custa."
    proximo: c-ultrassom
  - texto: "Radiografia de abdome em pé e seriamento clínico de seis em seis horas."
    avaliacao: erro
    feedback: "A radiografia costuma ser normal na fase em que ainda dá para salvar intestino, e só fica alterada quando aparece pneumatose ou gás no sistema porta, marcadores de necrose já instalada. Seriar de seis em seis horas é escolher olhar de novo depois que a janela fechou."
    proximo: fim-dano
:::

::: no
tipo: cena
id: c-ultrassom
texto: "A ultrassonografia mostra alças distendidas e não conclui sobre o fluxo mesentérico. Duas horas depois, a angiotomografia é finalmente solicitada e confirma oclusão embólica da artéria mesentérica superior."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A angiotomografia confirma oclusão embólica da artéria mesentérica superior, sem sinais de necrose transmural. Ela vai à sala em pouco mais de cinco horas do início da dor. A embolectomia restaura o fluxo, apenas quarenta centímetros de delgado precisam ser ressecados e não há necessidade de estoma. A anticoagulação é reintroduzida e a suspensão para procedimento dentário é revista com o dentista."
ensino: "Isquemia mesentérica aguda é a doença em que o exame do abdome mente nas primeiras horas: dor máxima com barriga mole é o padrão, não a exceção. O contexto fecha o raciocínio, e ele costuma estar no pulso, na arritmia embolígena ou na anticoagulação interrompida. Quando o abdome finalmente enrijece, o diagnóstico ficou fácil e o intestino, perdido."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico sai com duas horas de atraso. A revascularização acontece, mas é preciso ressecar um segmento maior de intestino e programar uma segunda inspeção cirúrgica em quarenta e oito horas. Ela sobrevive, com dezoito dias de internação."
ensino: "Na suspeita de isquemia mesentérica, o exame de imagem precisa ser o certo da primeira vez: angiotomografia com fase arterial. Exames intermediários que raramente confirmam apenas somam tempo em uma doença cuja janela é medida em horas."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Doze horas depois ela apresenta abdome rígido, hipotensão e acidose grave. A cirurgia encontra necrose extensa do delgado e do cólon direito. A ressecção é ampla, ela sai com estoma e síndrome do intestino curto, e permanece em terapia intensiva por duas semanas."
ensino: "A radiografia só fica alterada quando a necrose já está instalada, e seriar o exame clínico é aguardar o mesmo desenlace. Em idoso com dor abdominal intensa e exame pobre, a decisão precisa ser tomada com a informação incompleta que existe nas primeiras horas, porque a informação completa chega tarde demais."
:::
