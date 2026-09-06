---
id: dor-nas-costas-que-molhou-a-cama
titulo: A dor nas costas que molhou a cama
contexto: "Pronto atendimento, domingo de manhã. Um homem de 47 anos chega com dor lombar há duas semanas, que piorou muito nos últimos dois dias e agora desce pelas duas pernas. Ele conta, constrangido, que hoje de madrugada urinou na cama sem perceber, coisa que nunca aconteceu na vida dele."
tags: [osteoarticular, cauda equina, coluna, emergencia]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/coluna-vertebral
  - sistema-nervoso/exame-neurologico/sensibilidade-e-coordenacao
  - sistema-nervoso/exame-neurologico/forca-tonus-e-reflexos
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame da coluna vertebral e exame neurológico"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da coluna lombar"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia osteoarticular"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele anda com dificuldade, apoiado na parede. Diz que a dor lombar começou depois de carregar caixas na mudança e que vinha melhorando, até anteontem. Agora ela desce pela parte de trás das duas coxas. Menciona o episódio da noite com vergonha, e acrescenta que 'está meio dormente para sentar'."
dados:
  - "Lombalgia há 2 semanas, com piora nos últimos 2 dias"
  - "Dor irradiada para as duas pernas"
  - "Episódio de perda involuntária de urina"
  - "Dormência na região que apoia ao sentar"
  - "Sem febre, sem perda de peso"
proximo: d-bandeiras
:::

::: no
tipo: decisao
id: d-bandeiras
pergunta: "Lombalgia com irradiação. O que muda o rumo desta consulta?"
opcoes:
  - texto: "A perda de urina somada à dormência em sela e à irradiação bilateral: essa combinação é sinal de alarme e exige exame neurológico completo, incluindo toque retal, agora."
    avaliacao: otima
    feedback: "A maioria absoluta das lombalgias é benigna e não pede exame nenhum. O que retira o paciente desse grupo são os sinais de alarme, e três deles estão aqui: irradiação para as duas pernas, alteração de esfíncter e dormência na região que encosta na sela da bicicleta. Essa tríade é a síndrome da cauda equina até prova em contrário."
    proximo: c-exame
  - texto: "Nada de essencial: dor lombar com irradiação é comum, e a incontinência provavelmente foi efeito do relaxante muscular que ele tomou."
    avaliacao: erro
    feedback: "Atribuir o episódio à medicação é a explicação confortável, e ela não cobre a dormência em sela nem a irradiação bilateral. A cauda equina tem janela cirúrgica curta, e a alteração de esfíncter costuma ser o último sinal a aparecer e o primeiro a se tornar permanente."
    proximo: c-atraso
  - texto: "Solicitar radiografia de coluna lombar para investigar a causa da piora."
    avaliacao: aceitavel
    feedback: "A radiografia não mostra o que importa aqui: ela vê osso e não vê nervo comprimido. Se houver suspeita de compressão da cauda equina, o exame é a ressonância, e ela é urgente. Pedir a radiografia primeiro consome o tempo do paciente sem responder à pergunta."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Ele é liberado com analgésico e orientação de repouso. Volta na terça-feira sem conseguir urinar espontaneamente, com a bexiga distendida e a dormência agora estendida à face interna das duas coxas."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "No exame, a força de dorsiflexão dos pés está reduzida dos dois lados. O reflexo aquileu está ausente bilateralmente. A sensibilidade está diminuída na face posterior das coxas, na região perineal e ao redor do ânus, de forma simétrica. Ao toque retal, o tônus do esfíncter está claramente reduzido e ele não consegue contrair voluntariamente quando você pede. A percussão da bexiga revela macicez acima da sínfise."
dados:
  - "Fraqueza bilateral de dorsiflexão"
  - "Reflexos aquileus ausentes nos dois lados"
  - "Anestesia em sela simétrica"
  - "Tônus esfincteriano reduzido, sem contração voluntária"
  - "Bexiga palpável e maciça à percussão"
proximo: d-toque
:::

::: no
tipo: decisao
id: d-toque
pergunta: "O tônus do esfíncter está reduzido e a bexiga está cheia. O que isso define?"
opcoes:
  - texto: "Define síndrome da cauda equina instalada: é emergência cirúrgica, e a ressonância precisa ser feita agora, com o neurocirurgião já acionado."
    avaliacao: otima
    feedback: "O toque retal é o exame que quase ninguém faz na lombalgia e que aqui define tudo: perda do tônus e da contração voluntária confirma o acometimento das raízes sacrais. Com anestesia em sela e retenção urinária, o diagnóstico está feito clinicamente. A descompressão precoce é o que determina se a função de esfíncter volta."
    proximo: c-conduta
  - texto: "Define bexiga neurogênica isolada: passar sonda vesical de alívio e encaminhar ao urologista."
    avaliacao: erro
    feedback: "A sonda alivia a bexiga e não trata nada: a bexiga está cheia porque as raízes que a controlam estão comprimidas. Encaminhar ao ambulatório de urologia troca uma emergência cirúrgica da coluna por uma consulta que acontecerá semanas depois, com a lesão já definitiva."
    proximo: fim-dano
  - texto: "Define compressão radicular importante, que merece ressonância na próxima semana e corticoide agora."
    avaliacao: aceitavel
    feedback: "A urgência está subestimada. Corticoide pode reduzir edema e não descomprime nada, e uma semana é muito além da janela em que a recuperação esfincteriana ainda é provável. Nesta síndrome, a ressonância é hoje e a cirurgia costuma ser no mesmo dia."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "Com corticoide e analgesia, a dor melhora um pouco, e a ressonância acaba sendo feita apenas no dia seguinte. Ela mostra hérnia discal volumosa comprimindo o saco dural, e a cirurgia acontece com quase trinta horas de compressão."
proximo: fim-aceitavel
:::

::: no
tipo: cena
id: c-conduta
texto: "A ressonância de urgência mostra hérnia discal volumosa em L4 e L5, com compressão importante do saco dural e das raízes da cauda equina. O neurocirurgião avaliou e o centro cirúrgico está disponível. Ele mantém a retenção urinária e a anestesia em sela."
dados:
  - "Hérnia discal com compressão do saco dural"
  - "Neurocirurgião presente, centro cirúrgico disponível"
  - "Retenção urinária e anestesia em sela mantidas"
  - "Cerca de 10 horas desde o início dos sintomas esfincterianos"
proximo: d-tempo
:::

::: no
tipo: decisao
id: d-tempo
pergunta: "A cirurgia pode ser programada para amanhã de manhã, com a equipe descansada?"
opcoes:
  - texto: "Não: a descompressão deve ser feita o quanto antes, porque a chance de recuperar a função esfincteriana cai com as horas de compressão."
    avaliacao: otima
    feedback: "Esta é uma das poucas emergências verdadeiras da coluna. Quanto mais tempo as raízes sacrais permanecem comprimidas, menor a chance de a bexiga e o esfíncter voltarem a funcionar, e essa perda costuma ser definitiva. A pressa aqui não é sobre a dor, é sobre a função."
    proximo: fim-otimo
  - texto: "Sim: o quadro já está instalado e algumas horas a mais não mudam o resultado."
    avaliacao: erro
    feedback: "A ideia de que o dano já aconteceu e nada mais muda é o raciocínio que produz sequela permanente. Mesmo com sintomas instalados, a recuperação depende do tempo total de compressão, e cada bloco de horas conta contra a função esfincteriana e sexual."
    proximo: fim-dano
  - texto: "Sim, desde que sejam mantidos corticoide e sondagem, e a cirurgia aconteça nas primeiras horas da manhã."
    avaliacao: aceitavel
    feedback: "As medidas de suporte são adequadas e não param o relógio. Se houver alguma razão logística real para adiar, ela precisa ser pesada contra a probabilidade de o paciente ficar com bexiga neurogênica pelo resto da vida."
    proximo: c-espera
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A descompressão é realizada na mesma madrugada. Ele volta a urinar espontaneamente em quarenta e oito horas e a sensibilidade perineal retorna ao longo de três semanas. Sai do hospital andando, com reabilitação programada, e recupera a função esfincteriana por completo."
ensino: "Lombalgia é quase sempre benigna, e o que muda tudo são os sinais de alarme: irradiação bilateral, anestesia em sela e alteração de esfíncter. O toque retal é o exame que confirma o acometimento sacral e quase nunca é feito. A síndrome da cauda equina é emergência cirúrgica, e a chance de recuperar bexiga e esfíncter diminui a cada hora de compressão."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "A cirurgia acontece com atraso e ele recupera parcialmente a função: volta a urinar, com jato fraco e necessidade de manobras, e mantém área de dormência perineal."
ensino: "Corticoide reduz edema e não descomprime raiz. Na cauda equina, o tempo entre o diagnóstico e a sala é a variável que determina se a bexiga volta a funcionar."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "A descompressão acaba acontecendo dias depois. Ele fica com bexiga neurogênica permanente, dependente de cateterismo intermitente, anestesia em sela definitiva e disfunção sexual."
ensino: "A perda de esfíncter é o sinal mais tardio da compressão e o mais frequentemente irreversível. Tratar a bexiga cheia com uma sonda e encaminhar para consulta ambulatorial é a maneira mais comum de transformar uma emergência cirúrgica em uma sequela para a vida inteira."
:::
