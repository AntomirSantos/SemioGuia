---
id: braco-que-caiu-as-sete-da-manha
titulo: O braço que caiu às sete da manhã
contexto: "Emergência de hospital com tomógrafo e protocolo de trombólise. Uma mulher de 68 anos chega às 8h10 trazida pelo marido: às 7h em ponto, tomando café, o braço direito 'largou' a xícara e a fala embolou. Ele conta que ela estava bem quando acordaram, às 6h30, e que ontem à noite dormiram sem nenhuma queixa."
tags: [neurologico, avc, janela terapeutica, forca]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/forca-tonus-e-reflexos
  - sistema-nervoso/exame-neurologico/pares-cranianos-vii-a-xii
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame neurológico e de acidente vascular cerebral"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame neurológico"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia neurológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela está acordada, atenta, e tenta falar: as palavras saem arrastadas e trocadas, mas ela entende tudo o que você pergunta. O canto direito da boca cai. O braço direito não sustenta contra a gravidade. A perna direita mantém a posição por alguns segundos e depois desce devagar. São 8h20."
dados:
  - "Início dos sintomas às 7h00, com testemunha"
  - "Última vez vista bem: 6h30"
  - "Hemiparesia direita, predomínio braquial"
  - "Desvio de rima para a esquerda, poupando a testa"
  - "PA 178 x 96 mmHg, FC 88 bpm, glicemia capilar 96 mg/dL"
proximo: d-primeiro-passo
:::

::: no
tipo: decisao
id: d-primeiro-passo
pergunta: "Uma hora e vinte minutos desde o início. Qual é a prioridade agora?"
opcoes:
  - texto: "Acionar o protocolo de acidente vascular imediatamente, com tomografia de urgência, enquanto o exame neurológico é feito e cronometrado."
    avaliacao: otima
    feedback: "Tempo é a variável que mais pesa aqui, e ela já está correndo. O horário do início, o exame neurológico objetivo e a imagem precisam acontecer em paralelo, não em sequência. Cada minuto de atraso custa neurônio, e a janela para as terapias de reperfusão é estreita e conhecida."
    proximo: c-exame
  - texto: "Baixar a pressão de 178 x 96 mmHg antes de qualquer coisa, para proteger o cérebro."
    avaliacao: erro
    feedback: "É um reflexo compreensível e errado nesta fase. Na isquemia cerebral aguda, a pressão elevada mantém a perfusão da área que ainda pode ser salva, e derrubá-la aumenta a lesão. Existem limites acima dos quais se trata, e este valor não os atinge. Antes de mexer na pressão, é preciso saber se o quadro é isquêmico ou hemorrágico."
    proximo: c-atraso
  - texto: "Completar a anamnese detalhada com o marido, incluindo antecedentes e medicações, antes de acionar o protocolo."
    avaliacao: aceitavel
    feedback: "As informações são necessárias e serão colhidas, mas elas cabem dentro do protocolo, não antes dele. O horário do início já está estabelecido e a glicemia já foi medida. O resto se colhe enquanto a maca caminha para a tomografia."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Trinta e cinco minutos são gastos com medicação anti-hipertensiva e reavaliações, e a pressão volta a subir logo depois. São 8h55 quando alguém finalmente aciona o protocolo, com quase quarenta minutos de janela consumidos."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "No exame dirigido, a força do braço direito não vence a gravidade e a da perna direita está reduzida, porém presente. O rosto cai à direita, mas ela enruga a testa dos dois lados simetricamente. Ela entende ordens complexas e erra as palavras ao falar. Não há rigidez de nuca. Os reflexos estão vivos à direita e o reflexo cutâneo plantar é em extensão desse lado."
dados:
  - "Força reduzida em membros direitos, pior no braço"
  - "Paralisia facial poupando a musculatura frontal"
  - "Compreensão preservada, fala com trocas de palavras"
  - "Reflexo cutâneo plantar em extensão à direita"
  - "Sem rigidez de nuca"
proximo: d-topografia
:::

::: no
tipo: decisao
id: d-topografia
pergunta: "A testa enruga dos dois lados. O que esse detalhe informa?"
opcoes:
  - texto: "Que a lesão facial é central, não periférica: a musculatura da testa recebe inervação dos dois hemisférios e por isso é poupada nas lesões acima do núcleo do nervo."
    avaliacao: otima
    feedback: "É um dos detalhes mais úteis do exame neurológico e leva cinco segundos. Na lesão periférica do nervo facial, todo o hemiface é acometido e a testa não enruga do lado afetado. Na lesão central, a testa é poupada. Somado à fraqueza do braço e à alteração da fala do mesmo lado, o quadro deixa de ser 'paralisia facial' e passa a ser lesão encefálica."
    proximo: c-imagem
  - texto: "Que a paralisia é periférica e provavelmente benigna, do tipo que se recupera sozinha."
    avaliacao: erro
    feedback: "A leitura está invertida. Testa poupada aponta lesão central; testa acometida aponta lesão periférica. E mesmo que houvesse dúvida sobre a face, a fraqueza do braço direito e a alteração da fala não pertencem a nenhuma paralisia facial periférica."
    proximo: c-imagem
  - texto: "Que o detalhe é pouco confiável e o que importa é a imagem, que vai dizer tudo."
    avaliacao: aceitavel
    feedback: "A imagem é indispensável, sobretudo para separar isquemia de hemorragia, e ela está a caminho. Mas o exame é o que define a topografia, gradua a gravidade e permite comparar depois: sem um exame bem descrito na chegada, não há como perceber piora ou melhora nas horas seguintes."
    proximo: c-imagem
:::

::: no
tipo: cena
id: c-imagem
texto: "A tomografia sem contraste não mostra sangramento nem sinais precoces extensos de isquemia. São 8h55. Ela não usa anticoagulante, não teve cirurgia recente, não tem sangramento ativo e a glicemia está normal. A pressão agora marca 172 x 94 mmHg."
dados:
  - "Tomografia sem hemorragia"
  - "Tempo desde o início: 1 hora e 55 minutos"
  - "Sem contraindicação evidente à trombólise"
  - "PA 172 x 94 mmHg"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Com a imagem em mãos e dentro da janela, qual é a conduta?"
opcoes:
  - texto: "Indicar a terapia de reperfusão agora, com a pressão controlada dentro dos limites exigidos pelo protocolo, e acionar a equipe de neurologia para avaliar tratamento endovascular."
    avaliacao: otima
    feedback: "Dentro da janela, com imagem sem hemorragia e sem contraindicação, o benefício depende de minutos. O controle pressórico entra aqui com outro objetivo: agora ele é pré-requisito de segurança para a trombólise, e não mais uma tentativa de proteger o cérebro. Avaliar em paralelo a possibilidade de tratamento endovascular amplia as chances quando há oclusão de grande vaso."
    proximo: fim-otimo
  - texto: "Aguardar a ressonância para confirmar a extensão da área isquêmica antes de decidir."
    avaliacao: erro
    feedback: "A tomografia sem hemorragia já autoriza a decisão dentro da janela. Esperar por outro exame é gastar o recurso mais escasso do caso. Em muitos serviços a ressonância levaria mais tempo do que a paciente tem, e a janela se fecharia enquanto o laudo é digitado."
    proximo: fim-dano
  - texto: "Iniciar antiagregante plaquetário e internar para observação, evitando o risco de sangramento da trombólise."
    avaliacao: aceitavel
    feedback: "O antiagregante faz parte do tratamento, mas depois, e não no lugar da reperfusão em paciente elegível. Evitar o risco da trombólise em quem tem indicação é aceitar o risco maior, o da sequela definitiva. O antiagregante é a conduta correta apenas para quem está fora da janela ou tem contraindicação."
    proximo: c-antiagregante
:::

::: no
tipo: cena
id: c-antiagregante
texto: "Ela é internada com antiagregante e mantida em observação. Na manhã seguinte o déficit persiste inalterado, e a equipe de reabilitação inicia o trabalho com uma paciente que, doze horas antes, era elegível para reperfusão."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A trombólise começa às 9h10, duas horas e dez minutos após o início dos sintomas. A angiotomografia identifica oclusão de grande vaso e ela segue para trombectomia. Em vinte e quatro horas a força do braço volta quase por completo e a fala se organiza. Recebe alta no quinto dia, andando, com a fibrilação atrial recém-diagnosticada e a anticoagulação iniciada."
ensino: "No acidente vascular agudo, o exame e a imagem correm em paralelo, nunca em sequência. Dois detalhes do exame valem muito: a testa que enruga dos dois lados indica lesão central, e a compreensão preservada com fala trocada localiza o déficit. E a pressão elevada, na fase isquêmica aguda, sustenta a perfusão da área ainda salvável: ela só é reduzida quando ultrapassa limites definidos ou quando a trombólise exige."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela sobrevive sem complicação hemorrágica, mas mantém hemiparesia braquial importante e dificuldade de fala. Recebe alta para reabilitação em programa prolongado, sem voltar a escrever com a mão direita."
ensino: "Antiagregante é a conduta de quem está fora da janela ou tem contraindicação. Em paciente elegível, ele não substitui a reperfusão: evitar o risco do tratamento significa aceitar a certeza da sequela."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "A ressonância só fica pronta às 11h40. A janela para a trombólise já se fechou e a área infartada aumentou. Ela evolui com hemiplegia completa à direita, afasia importante e dependência para todas as atividades da vida diária."
ensino: "O exame que autoriza a decisão na fase aguda é a tomografia sem contraste, cuja função é excluir hemorragia. Buscar mais informação do que a necessária custa exatamente o que não pode ser reposto. Em acidente vascular, o tempo gasto para ter certeza costuma valer menos que a decisão tomada a tempo."
:::
