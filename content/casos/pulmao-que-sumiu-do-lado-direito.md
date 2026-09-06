---
id: pulmao-que-sumiu-do-lado-direito
titulo: O pulmão que sumiu do lado direito
contexto: "Unidade de pronto atendimento sem tomógrafo, sábado de manhã. Um rapaz de 24 anos, alto e magro, chega com dor súbita no lado direito do peito que começou enquanto ele arrumava a estante. Está falando normalmente, mas prefere ficar sentado."
tags: [respiratorio, pneumotorax, percussao, emergencia]
topicosDeApoio:
  - aparelho-respiratorio/exame-do-torax/percussao-do-torax
  - aparelho-respiratorio/exame-do-torax/inspecao-do-torax
  - aparelho-respiratorio/exame-do-torax/ausculta-pulmonar
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de inspeção, percussão e ausculta do tórax"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame do aparelho respiratório"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia respiratória"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele descreve uma pontada que veio de uma vez, do lado direito, e uma falta de ar que foi aumentando devagar nos últimos quarenta minutos. Não fuma, não tem doença conhecida. A caixa torácica é estreita e comprida, e ele mede um metro e noventa."
dados:
  - "Dor torácica direita súbita há 40 minutos"
  - "FR 24 irpm, FC 104 bpm"
  - "Saturação 94% em ar ambiente"
  - "PA 124 x 78 mmHg"
  - "Biotipo longilíneo, não fumante"
proximo: d-exame-inicial
:::

::: no
tipo: decisao
id: d-exame-inicial
pergunta: "Qual sequência de exame responde mais rápido nesse tórax?"
opcoes:
  - texto: "Inspeção comparativa, palpação do frêmito, percussão dos dois lados na mesma altura e só então ausculta, sempre comparando hemitórax com hemitórax."
    avaliacao: otima
    feedback: "A ordem existe porque cada etapa restringe a seguinte. No pneumotórax, a percussão é a que grita: hipertimpanismo de um lado só, com frêmito abolido e murmúrio ausente na mesma área. Nenhuma dessas etapas custa mais que trinta segundos e as três juntas fecham o diagnóstico sem imagem."
    proximo: c-exame
  - texto: "Ir direto à ausculta, que é o exame mais sensível do tórax, e complementar com radiografia."
    avaliacao: aceitavel
    feedback: "A ausculta vai encontrar o murmúrio diminuído, e ficará a dúvida entre ar, líquido e consolidação. Quem responde essa dúvida é a percussão: timpânico aponta ar, maciço aponta líquido. Pular a etapa transforma um diagnóstico de beira do leito em pedido de exame."
    proximo: c-exame
  - texto: "Prescrever analgesia e solicitar radiografia antes de examinar, já que a dor atrapalha a colaboração."
    avaliacao: erro
    feedback: "A analgesia é justa, mas não substitui o exame nem justifica adiá-lo. Este é um quadro que pode evoluir para instabilidade em minutos, e a radiografia que demora vinte pode chegar depois do problema. O exame é o que define a urgência do resto."
    proximo: c-atraso
:::

::: no
tipo: cena
id: c-atraso
texto: "Enquanto a analgesia é preparada e a radiografia é solicitada, ele fica mais agitado e pede para sentar mais reto. A frequência respiratória sobe para 32 irpm. Só então alguém encosta a mão no tórax."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "À inspeção, o hemitórax direito expande visivelmente menos. O frêmito toracovocal está abolido à direita, do ápice à base. A percussão devolve um som mais alto, mais longo e mais aberto que o do lado esquerdo, em toda a extensão. Na ausculta, silêncio à direita e murmúrio normal à esquerda. A traqueia parece centrada."
dados:
  - "Expansibilidade reduzida à direita"
  - "Frêmito toracovocal abolido à direita"
  - "Hipertimpanismo em todo o hemitórax direito"
  - "Murmúrio vesicular ausente à direita"
  - "Traqueia centrada, PA 120 x 76 mmHg"
proximo: d-diagnostico
:::

::: no
tipo: decisao
id: d-diagnostico
pergunta: "Com esse conjunto, qual é o diagnóstico e o que ele exige agora?"
opcoes:
  - texto: "Pneumotórax à direita: com o paciente estável, oxigênio, analgesia, radiografia para dimensionar e drenagem conforme o tamanho e a clínica."
    avaliacao: otima
    feedback: "A tríade é característica: percussão hipertimpânica, frêmito abolido e murmúrio ausente do mesmo lado. O que separa a conduta é o estado hemodinâmico. Estável, há tempo para dimensionar com a imagem. Instável, não há: a agulha vem antes de qualquer filme."
    proximo: c-piora-subita
  - texto: "Derrame pleural à direita, e o próximo passo é a toracocentese diagnóstica."
    avaliacao: erro
    feedback: "A percussão diz o contrário. Líquido no espaço pleural devolve som maciço, submaciço, curto e abafado. O som que você obteve foi mais alto e mais longo que o do outro lado, e isso é ar. Puncionar com essa hipótese invertida é procurar líquido onde só existe pressão."
    proximo: c-piora-subita
  - texto: "Provável crise de dor musculoesquelética com hipoventilação antálgica, a confirmar com radiografia."
    avaliacao: aceitavel
    feedback: "Dor de parede não abole frêmito nem torna o som percutido timpânico em todo um hemitórax. Achados desse tamanho não vêm de contratura muscular. Pedir a imagem está certo; explicar o exame por uma causa menor está errado."
    proximo: c-piora-subita
:::

::: no
tipo: cena
id: c-piora-subita
texto: "Antes que a radiografia seja feita, ele fica agitado e diz que não consegue puxar o ar. A saturação cai para 84%, a pressão vai a 82 x 50 mmHg e a frequência cardíaca sobe para 136 bpm. A traqueia agora está desviada para a esquerda e a jugular está túrgida."
dados:
  - "PA 82 x 50 mmHg, FC 136 bpm"
  - "Saturação 84% com oxigênio"
  - "Traqueia desviada para a esquerda"
  - "Turgência jugular"
proximo: d-tensao
:::

::: no
tipo: decisao
id: d-tensao
pergunta: "O quadro virou. Qual é a conduta agora?"
opcoes:
  - texto: "Descompressão imediata com agulha no hemitórax direito, sem esperar radiografia, seguida de drenagem torácica."
    avaliacao: otima
    feedback: "Hipotensão, desvio de traqueia e turgência jugular em um tórax hipertimpânico definem pneumotórax hipertensivo, e este é um diagnóstico clínico por definição: o ar aprisionado comprime o mediastino e impede o retorno venoso. A radiografia neste momento apenas documenta o que já deveria ter sido tratado."
    proximo: fim-otimo
  - texto: "Levar imediatamente à radiografia para confirmar antes de qualquer punção."
    avaliacao: erro
    feedback: "É o atraso que mata neste quadro. O paciente hipotenso com traqueia desviada não tem minutos para o transporte e para o filme. Aqui a punção é diagnóstica e terapêutica ao mesmo tempo, e a demora se paga em parada cardiorrespiratória."
    proximo: fim-dano
  - texto: "Intubar primeiro para garantir a via aérea e depois puncionar."
    avaliacao: aceitavel
    feedback: "A via aérea parece a prioridade automática, mas aqui o problema não é ventilação, é compressão. Pior: a pressão positiva da ventilação empurra mais ar para o espaço pleural e agrava a hipotensão. Se a intubação for necessária, ela vem depois da descompressão."
    proximo: c-intubacao
:::

::: no
tipo: cena
id: c-intubacao
texto: "Logo após a indução, a pressão cai para 60 x 38 mmHg e o pulso quase desaparece. A equipe puncina o hemitórax direito, ouve o jato de ar e a pressão volta a 96 x 60 mmHg. O susto durou três minutos que não precisavam existir."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A agulha é introduzida e o ar sai com sibilo audível. A pressão sobe para 108 x 70 mmHg em menos de um minuto e a saturação volta a 96%. O dreno é colocado em seguida, o pulmão reexpande em vinte e quatro horas e ele recebe alta no terceiro dia, orientado sobre o risco de recorrência."
ensino: "A percussão é o exame que separa ar de líquido, e por isso decide o pneumotórax à beira do leito. Quando ao quadro se somam hipotensão, desvio de traqueia e turgência jugular, o pneumotórax passa a ser hipertensivo, e aí o diagnóstico é clínico: a descompressão vem antes da radiografia."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele é descomprimido e drenado, com um intervalo de hipotensão grave logo após a indução anestésica. Recupera-se sem sequela, depois de um dia a mais em observação."
ensino: "No pneumotórax hipertensivo a pressão positiva da ventilação piora a compressão. Quando a fisiologia do problema é obstrução ao retorno venoso, descomprimir vem antes de qualquer manejo de via aérea."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "No caminho para a radiografia ele perde o pulso. A reanimação é iniciada no corredor e a descompressão acontece durante as compressões. Ele volta, mas com quatro minutos de baixo fluxo e uma internação em terapia intensiva que se prolonga."
ensino: "Existem poucos diagnósticos em que a imagem é contraindicada pela pressa, e este é um deles. Diante de tórax hipertimpânico com hipotensão e desvio de traqueia, a agulha precede o filme. A radiografia normal nunca vale o risco de fazê-la em quem não tem tempo."
:::
