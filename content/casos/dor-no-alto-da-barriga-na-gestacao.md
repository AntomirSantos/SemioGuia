---
id: dor-no-alto-da-barriga-na-gestacao
titulo: A dor no alto da barriga que não era gastrite
contexto: "Unidade de pronto atendimento, sábado à tarde. Uma gestante de 31 anos, com 34 semanas, chega com dor no alto da barriga desde a manhã. Ela acha que é gastrite, porque comeu feijoada ontem. Diz também que enxergou 'umas luzinhas' quando levantou, e que os pés e as mãos incharam bastante essa semana."
tags: [geniturinario, pre-eclampsia, gestacao, emergencia]
topicosDeApoio:
  - mamas-e-geniturinario/exame-geniturinario-e-retal/exame-ginecologico
  - exame-fisico-geral/sinais-vitais/pressao-arterial
  - sistema-nervoso/exame-neurologico/forca-tonus-e-reflexos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da gestante e de hipertensão na gravidez"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de medida da pressão arterial e exame neurológico"
  - "Semiologia Clínica, 1ª ed., capítulos de exame geral e geniturinário"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está desconfortável, com a mão sobre a região epigástrica e um pouco à direita. A ficha da triagem diz 'dor epigástrica, provável dispepsia'. Ela conta que o pré-natal foi todo normal e que a última consulta foi há três semanas. Está com o rosto visivelmente inchado, o que ela atribui ao calor."
dados:
  - "Gestação de 34 semanas, dor epigástrica há 6 horas"
  - "Escotomas visuais ao levantar"
  - "Edema de face, mãos e pés, de instalação recente"
  - "Triagem registrou dispepsia"
  - "Última consulta de pré-natal há 3 semanas"
proximo: d-primeira-medida
:::

::: no
tipo: decisao
id: d-primeira-medida
pergunta: "Qual é a primeira coisa a fazer nesta paciente?"
opcoes:
  - texto: "Medir a pressão arterial com manguito adequado e a paciente sentada, e pesquisar proteinúria, antes de qualquer conduta para a dor."
    avaliacao: otima
    feedback: "Dor epigástrica na segunda metade da gestação é sinal de alarme até que a pressão diga o contrário: ela vem da distensão da cápsula do fígado. Somada a escotomas e edema de instalação rápida, o quadro pede pressão medida corretamente e pesquisa de proteína na urina, nessa ordem, antes de tratar qualquer sintoma."
    proximo: c-exame
  - texto: "Prescrever antiácido e orientar dieta leve, com retorno se não melhorar."
    avaliacao: erro
    feedback: "Rotular como dispepsia uma dor epigástrica em gestante de 34 semanas com edema recente e alterações visuais é o caminho mais direto para a convulsão em casa. A queixa digestiva aqui é a apresentação de uma doença hipertensiva, e ela se descarta em dois minutos com um manguito."
    proximo: c-atraso
  - texto: "Solicitar ultrassonografia obstétrica para avaliar o bem-estar fetal antes de qualquer outra coisa."
    avaliacao: aceitavel
    feedback: "A avaliação fetal é necessária e virá. O que precisa vir antes é a pressão da mãe: é ela que define se esta paciente pode esperar na fila do ultrassom ou se precisa de sulfato de magnésio e de transferência agora."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ela é liberada com antiácido. Três horas depois volta de ambulância, trazida pelo marido, após ter apresentado uma crise convulsiva em casa. A pressão medida na ambulância foi de 178 x 118 mmHg."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Sentada, com manguito de tamanho adequado, a pressão é de 172 x 114 mmHg, confirmada em nova medida após cinco minutos. A fita reagente na urina mostra proteína em grande quantidade. O edema é depressível em face, mãos e membros inferiores. À palpação, a dor se localiza no quadrante superior direito e no epigástrio. Os reflexos patelares estão exaltados e há esboço de clônus no tornozelo."
dados:
  - "PA 172 x 114 mmHg em duas medidas"
  - "Proteinúria de grande quantidade na fita"
  - "Edema de face e extremidades"
  - "Dor à palpação do quadrante superior direito"
  - "Reflexos exaltados com esboço de clônus"
proximo: d-diagnostico
:::

::: no
tipo: decisao
id: d-diagnostico
pergunta: "O que os reflexos exaltados e o clônus acrescentam?"
opcoes:
  - texto: "Acrescentam iminência de eclâmpsia: com hipertensão grave, proteinúria, dor no quadrante superior direito e alterações visuais, o quadro pede sulfato de magnésio imediatamente."
    avaliacao: otima
    feedback: "A hiperreflexia com clônus mostra o sistema nervoso já irritado, e é o sinal que aproxima a paciente da convulsão. O exame neurológico da gestante hipertensa não é detalhe: reflexos, nível de consciência e queixas visuais dizem quanto tempo resta. O sulfato de magnésio previne a crise e é a medida que mais reduz risco aqui."
    proximo: c-conduta
  - texto: "Acrescentam pouco: reflexos vivos são comuns na gestação e o clônus é achado inespecífico."
    avaliacao: erro
    feedback: "Reflexos vivos são de fato comuns; clônus somado a hipertensão grave, proteinúria e escotomas não é. Descontar o achado pelo contexto fisiológico da gravidez ignora o que ele significa quando aparece em companhia dessas outras coisas."
    proximo: c-conduta
  - texto: "Acrescentam indicação de exames laboratoriais completos antes de iniciar qualquer tratamento."
    avaliacao: aceitavel
    feedback: "Os exames vão avaliar plaquetas, função hepática e renal, e são necessários para caracterizar a gravidade. Eles correm em paralelo, nunca antes: com pressão de 172 x 114 mmHg e sinais de irritabilidade neurológica, o sulfato de magnésio e o anti-hipertensivo começam agora."
    proximo: c-conduta
:::

::: no
tipo: cena
id: c-conduta
texto: "O sulfato de magnésio é iniciado e o anti-hipertensivo endovenoso é preparado. A pressão permanece em 168 x 110 mmHg. O hospital de referência com obstetrícia e leito neonatal fica a quarenta minutos. O batimento cardíaco fetal está presente e regular."
dados:
  - "Sulfato de magnésio em curso"
  - "PA 168 x 110 mmHg"
  - "Referência obstétrica a 40 minutos"
  - "Batimento fetal presente e regular"
proximo: d-pressao
:::

::: no
tipo: decisao
id: d-pressao
pergunta: "Qual é a meta ao tratar essa pressão antes da transferência?"
opcoes:
  - texto: "Reduzir de forma controlada para uma faixa segura, sem normalizar, porque a queda abrupta compromete a perfusão da placenta."
    avaliacao: otima
    feedback: "O objetivo é afastar a paciente do risco de acidente vascular sem cortar o fluxo que chega ao feto. A placenta não autorregula o fluxo como os outros órgãos: ela depende diretamente da pressão materna. Por isso a redução é gradual e a meta é uma faixa de segurança, não o valor de uma pessoa não gestante."
    proximo: fim-otimo
  - texto: "Normalizar a pressão rapidamente, buscando valores próximos de 120 x 80 mmHg antes de transportar."
    avaliacao: erro
    feedback: "A queda rápida e profunda reduz a perfusão placentária e pode provocar sofrimento fetal agudo, além de isquemia em órgãos maternos já adaptados a pressões altas. O tratamento da hipertensão grave na gestação é controlado e tem alvo intermediário."
    proximo: fim-dano
  - texto: "Não tratar a pressão e apenas transportar rapidamente com o sulfato de magnésio correndo."
    avaliacao: aceitavel
    feedback: "O sulfato previne convulsão e não trata a pressão, e níveis nessa faixa expõem a mãe a acidente vascular durante o trajeto. Com quarenta minutos de estrada, o anti-hipertensivo precisa começar antes da saída."
    proximo: c-sem-anti
:::

::: no
tipo: cena
id: c-sem-anti
texto: "Durante o transporte a pressão chega a 186 x 120 mmHg e ela apresenta cefaleia intensa. O anti-hipertensivo é iniciado dentro da ambulância, sem monitorização adequada, e a chegada acontece com a paciente muito mais sintomática."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com sulfato de magnésio e a pressão reduzida de forma controlada, ela chega estável à referência. Os exames mostram plaquetas baixas e enzimas hepáticas elevadas, e o parto é resolvido no mesmo dia. Mãe e recém-nascido evoluem bem, e ele recebe alta da unidade neonatal em duas semanas."
ensino: "Dor epigástrica ou no quadrante superior direito na segunda metade da gestação é sinal de alarme, não dispepsia: vem da distensão da cápsula hepática. Escotomas, edema de instalação rápida e hiperreflexia com clônus completam o quadro. O sulfato de magnésio previne a convulsão, e a pressão se reduz de forma controlada, porque a placenta depende da pressão materna para perfundir."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela chega à referência com cefaleia intensa e pressão mais alta que na saída, precisando de manejo agressivo na chegada. O parto ocorre no mesmo dia e ambos evoluem bem, após uma transferência mais tensa do que precisava ser."
ensino: "O sulfato de magnésio previne a convulsão, e não trata a hipertensão. Na hipertensão grave da gestação, o anti-hipertensivo começa antes do transporte, porque o risco de acidente vascular materno acompanha a paciente durante todo o trajeto."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Com a queda rápida da pressão, o batimento fetal desacelera e não recupera. É necessária cesariana de emergência na chegada, e o recém-nascido precisa de reanimação e de terapia intensiva neonatal prolongada por sofrimento agudo."
ensino: "A placenta não autorregula seu fluxo: ela depende diretamente da pressão materna. Normalizar rapidamente a pressão de uma gestante gravemente hipertensa troca o risco materno pelo sofrimento fetal agudo. A redução é gradual e o alvo é uma faixa de segurança."
:::
