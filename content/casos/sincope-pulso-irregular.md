---
id: sincope-pulso-irregular
titulo: A síncope e o pulso que ninguém contou
contexto: "Você é o interno da enfermaria de clínica médica. A técnica chama você ao leito 12: dona Neusa, 74 anos, internada há dois dias para ajuste de diuréticos, desmaiou ao levantar-se da poltrona."
tags: [cardiovascular, sinais vitais, pulso, arritmia, síncope]
topicosDeApoio:
  - aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca
  - exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso
  - exame-fisico-geral/sinais-vitais/pressao-arterial
referencias:
  - "Porto, Exame Clínico, 8ª ed., cap. 13 (Exame dos pulsos radial, periféricos e venoso) e cap. 21 (Sinais vitais)"
  - "Porto, Semiologia Médica, 8ª ed., cap. 47 (Exame clínico do sistema cardiovascular)"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 15 (Pulse Rate and Contour)"
  - "Diretriz Brasileira de Hipertensão Arterial, 2025 (SBC/SBH/SBN), aferição da PA e hipotensão ortostática no idoso"
revisao: pendente
inicio: c-chamado
---

::: no
tipo: cena
id: c-chamado
texto: "Ela já está de volta ao leito, consciente e orientada, um pouco constrangida. Conta que se levantou para pegar o copo, escureceu tudo e acordou no chão. A acompanhante viu: ficou mole, sem tremores, e voltou a si em poucos segundos. No monitor do posto, alguém já anotou a frequência."
dados:
  - "Mulher de 74 anos, hipertensa, em uso de hidroclorotiazida e furosemida"
  - "Perda de consciência de cerca de 30 segundos ao levantar-se, sem abalos e sem liberação esfincteriana"
  - "Sem dor torácica, sem palpitação percebida"
  - "Frequência exibida no monitor do posto: 138 bpm"
proximo: d-exame
:::

::: no
tipo: decisao
id: d-exame
pergunta: "Qual é o seu primeiro exame à beira do leito?"
opcoes:
  - texto: "Contar o pulso por 15 segundos e multiplicar por quatro, para não perder tempo."
    avaliacao: erro
    feedback: "Quinze segundos multiplicados por quatro amplificam o erro da contagem e, pior, perdem a irregularidade: é justamente o ritmo que este caso precisa que você descreva."
    proximo: c-pulso-perdido
  - texto: "Palpar a radial por 60 segundos completos, com o estetoscópio no precórdio no mesmo minuto."
    avaliacao: otima
    feedback: "O pulso entrega sete informações (parede, frequência, ritmo, amplitude, tensão, tipo de onda e comparação entre os lados) e nenhuma delas cabe num número de monitor. Palpar e auscultar ao mesmo tempo, no mesmo minuto, é o que revela o déficit de pulso: contagens feitas em minutos diferentes não são comparáveis quando o ritmo é irregular."
    proximo: c-pulso
  - texto: "Anotar a frequência que o monitor do posto já mostra; a palpação não acrescentaria nada."
    avaliacao: erro
    feedback: "O monitor conta batimentos elétricos; a radial conta os que geraram onda de pulso. A diferença entre os dois é um achado, não um detalhe, e é ela que aponta a arritmia."
    proximo: c-pulso-perdido
:::

::: no
tipo: cena
id: c-pulso
texto: "Sob as suas polpas, a radial não guarda compasso nenhum: os intervalos mudam a cada batimento e a força das ondas também, algumas quase somem. Você mantém os dedos no punho e encaixa o estetoscópio no precórdio ao mesmo tempo, contando no mesmo minuto o que ouve e o que sente. Os dois números não batem."
dados:
  - "FC 116 bpm à palpação da radial, contada em 60 segundos"
  - "Ritmo completamente irregular, sem padrão; amplitude variável a cada onda"
  - "Ausculta precordial no mesmo minuto: 138 bpm, déficit de pulso de 22 batimentos"
  - "Radiais simétricas; parede arterial lisa e depressível"
  - "PA 104 x 62 mmHg em decúbito"
proximo: d-interpretacao
:::

::: no
tipo: decisao
id: d-interpretacao
pergunta: "Como você interpreta esse pulso?"
opcoes:
  - texto: "Pulso alternante, uma onda forte seguida de outra fraca, sinal de insuficiência ventricular esquerda."
    avaliacao: erro
    feedback: "No pulso alternante a alternância de amplitude é regular: os intervalos entre as ondas continuam iguais. Aqui os intervalos não se repetem, e é isso que separa um achado do outro."
    proximo: c-conduta-errada
  - texto: "Extrassístoles isoladas, achado comum na idade dela; tranquilizar e manter a observação de rotina."
    avaliacao: erro
    feedback: "Extrassístoles isoladas produzem pausas dentro de um ritmo de base regular. Irregularidade total, com déficit de pulso de 22 batimentos, é outra coisa."
    proximo: c-conduta-errada
  - texto: "Fibrilação atrial até prova em contrário; pedir eletrocardiograma de 12 derivações."
    avaliacao: otima
    feedback: "Essa é a leitura correta. Pulso rápido, completamente irregular, de amplitude variável a cada batimento e com déficit de pulso é fibrilação atrial até que o eletrocardiograma diga o contrário."
    proximo: c-ecg
:::

::: no
tipo: cena
id: c-ecg
texto: "O eletrocardiograma sai em dez minutos e confirma o que os seus dedos já tinham dito. Você aproveita para revisar as prescrições: dois diuréticos em uso e um dia de aceitação alimentar ruim."
dados:
  - "ECG de 12 derivações: ausência de onda P e intervalos RR irregularmente irregulares, fibrilação atrial"
  - "Frequência ventricular 138 bpm"
  - "Sem supradesnivelamento do segmento ST"
  - "PA 104 x 62 mmHg em decúbito"
proximo: d-ortostase
:::

::: no
tipo: decisao
id: d-ortostase
pergunta: "A fibrilação atrial está confirmada. Mas a síncope aconteceu no exato momento em que ela se levantou. O que ainda falta no seu exame?"
opcoes:
  - texto: "Aferir a PA em decúbito, sentada e em pé, esperando 3 minutos completos na ortostase."
    avaliacao: otima
    feedback: "Idosa, dois diuréticos e síncope ao levantar-se: a ortostase precisa ser medida, não presumida. Queda maior que 20 mmHg na PAS ou 10 mmHg na PAD após 3 minutos em pé caracteriza hipotensão postural."
    proximo: c-ortostatica
  - texto: "Nada mais: a fibrilação atrial de alta resposta explica a síncope. Controlar a frequência."
    avaliacao: erro
    feedback: "A arritmia explica parte da história, e parar nela é confortável demais. O gatilho postural, com dois diuréticos na prescrição, aponta uma segunda causa que se mede com o manguito em três posições."
    proximo: fim-dano-recorrencia
  - texto: "Nada mais por ora: ela está lúcida. Liberar para ir ao banheiro acompanhada."
    avaliacao: erro
    feedback: "Quem desmaiou ao levantar-se uma vez desmaia de novo ao levantar-se. Antes de liberar a ortostase, é preciso saber o que a pressão faz quando ela fica de pé."
    proximo: fim-dano-recorrencia
:::

::: no
tipo: cena
id: c-ortostatica
texto: "Você mede deitada, depois sentada e, por fim, com ela de pé, contando os três minutos no relógio. No segundo minuto ela avisa: 'está escurecendo de novo'. Você a senta antes que caia e completa o registro."
dados:
  - "PA em decúbito: 104 x 62 mmHg"
  - "PA sentada: 96 x 58 mmHg"
  - "PA em pé, após 3 minutos: 78 x 50 mmHg"
  - "Queda de 26 mmHg na PAS e de 12 mmHg na PAD"
  - "Tontura e escurecimento visual reproduzidos na ortostase"
proximo: fim-otimo
:::

::: no
tipo: cena
id: c-pulso-perdido
texto: "No prontuário fica escrito só um número, sem uma palavra sobre ritmo ou amplitude. A irregularidade não aparece em lugar nenhum e ninguém pede o eletrocardiograma. No fim da tarde, a caminho do banheiro, ela cai outra vez: desta vez com laceração no supercílio."
dados:
  - "Segundo episódio de perda de consciência, agora com trauma de face"
  - "Laceração no supercílio direito, com necessidade de sutura"
  - "Ao reexame: pulso radial completamente irregular, de amplitude variável"
  - "PA 96 x 58 mmHg em decúbito"
proximo: d-resgate
:::

::: no
tipo: cena
id: c-conduta-errada
texto: "A conclusão errada carrega junto a conduta errada: ninguém pede o eletrocardiograma, ninguém revê os diuréticos. Duas horas depois, ao se levantar do vaso sanitário, ela perde a consciência de novo e cai sentada no chão do banheiro."
dados:
  - "Segundo episódio de síncope, novamente ao assumir a ortostase"
  - "Dor em quadril direito, sem deformidade evidente"
  - "Ao reexame: pulso rápido, irregular, com déficit de pulso mantido"
  - "PA 94 x 56 mmHg em decúbito"
proximo: d-resgate
:::

::: no
tipo: decisao
id: d-resgate
pergunta: "Segundo episódio, agora com trauma. O que você faz?"
opcoes:
  - texto: "Prescrever repouso no leito com grades elevadas e reavaliar na visita de amanhã."
    avaliacao: erro
    feedback: "Grade elevada previne queda, não previne síncope, e não diagnostica nada. A causa continua na prescrição e no ritmo cardíaco."
    proximo: fim-dano-recorrencia
  - texto: "Refazer o exame do zero: pulso e ausculta no mesmo minuto, PA nas três posições e ECG."
    avaliacao: otima
    feedback: "É o exame que deveria ter aberto o caso. Feito agora, ele ainda identifica as duas causas, a arritmia e a hipotensão postural, e evita o terceiro episódio. Reveja também os dois diuréticos."
    proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Você fecha o caso com duas causas somadas, não uma: fibrilação atrial de alta resposta ventricular e hipotensão ortostática em uso de dois diuréticos. A discussão com a equipe passa a ser sobre controle de frequência, avaliação de risco tromboembólico e revisão da prescrição, e dona Neusa é orientada a se levantar em etapas."
ensino: "Pulso rápido, totalmente irregular, de amplitude variável e com déficit de pulso é fibrilação atrial até prova em contrário, e nada disso aparece em uma contagem de 15 segundos ou no número do monitor. Achar a arritmia, porém, não encerra a investigação da síncope: quando o gatilho é a ortostase, a PA precisa ser medida deitada, sentada e em pé, com 3 minutos completos."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "O diagnóstico sai correto e completo, mas depois de um segundo episódio e de um trauma que era evitável. Na passagem de plantão, o exame que faltou no primeiro atendimento é o que ocupa a discussão."
ensino: "Sessenta segundos de palpação do pulso e três medidas de pressão custam menos que uma queda com trauma no idoso. Rever o próprio exame depois do erro ainda muda o desfecho, mas o preço já foi pago."
:::

::: no
tipo: desfecho
id: fim-dano-recorrencia
classe: dano
texto: "A causa continua na prescrição e no ritmo cardíaco, e a terceira síncope acontece à noite, no banheiro. Desta vez a queda resulta em fratura do colo do fêmur, com cirurgia e todas as complicações que ela costuma trazer para uma paciente de 74 anos."
ensino: "Síncope no idoso costuma ter mais de uma causa somada, e parar na primeira explicação plausível é o modo mais comum de deixar a segunda intacta. Enquanto a arritmia e a hipotensão postural não forem ambas medidas e tratadas, o episódio se repete, e no idoso a queda é o desfecho que muda a vida, não a arritmia."
:::
