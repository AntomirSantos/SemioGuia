---
id: joelho-do-sabado
titulo: O joelho do futebol de sábado
contexto: "Pronto atendimento de sábado à tarde. Um homem de 26 anos entra amparado pelos amigos, com o joelho direito volumoso por baixo do shorts do futebol. Ele repete a frase clássica: 'travei o pé no chão, girei, ouvi um estalo'."
tags: [osteoarticular, joelho, trauma, Ottawa, Lachman]
topicosDeApoio:
  - sistema-osteoarticular/exame-osteoarticular/quadril-e-joelho
  - sistema-osteoarticular/exame-osteoarticular/principios-do-exame-osteoarticular
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., cap. 57 (Examination of the Musculoskeletal System)"
  - "Semiologia Clínica, 1ª ed., cap. 16 (Exame osteoarticular), seção Joelho"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele conta que a torção foi há pouco mais de uma hora e que o joelho 'encheu na hora': em minutos já estava tenso. Consegue ficar de pé e deu alguns passos mancando até a maca. A dor é forte, mas ele conversa e colabora. Os amigos perguntam, em coro, se vai precisar de raio X."
dados:
  - "Trauma torcional com pé plantado, há cerca de 1 hora"
  - "Estalo audível no momento da torção"
  - "Tumefação de instalação imediata (minutos)"
  - "Deambula com apoio, mancando"
  - "Sinais vitais sem alterações"
proximo: d-primeiro
:::

::: no
tipo: decisao
id: d-primeiro
pergunta: "Joelho agudo traumático. O que vem primeiro no seu roteiro?"
opcoes:
  - texto: "Aplicar a regra de Ottawa do joelho, item por item, antes de pensar em ligamento."
    avaliacao: otima
    feedback: "É a ordem correta: primeiro decidir sobre osso, depois sobre partes moles. A regra tem cinco itens com definição operacional explícita: idade de 55 anos ou mais, dor à palpação da patela, dor na cabeça da fíbula, incapacidade de fletir a 90 graus e incapacidade de sustentar o peso por quatro passos, na hora e na sala. É justamente essa definição explícita que a torna um dos conjuntos mais reprodutíveis do joelho."
    proximo: c-ottawa
  - texto: "Pedir a radiografia direto: joelho de trauma com derrame se radiografa sempre."
    avaliacao: erro
    feedback: "Entre os joelhos traumáticos do pronto-socorro, só 6% a 12% têm fratura significativa. Radiografar todos é o desperdício que a regra de Ottawa veio resolver: cinco itens de exame, e o negativo praticamente afasta a fratura (razão de verossimilhança 0,1, redução substancial da probabilidade)."
    proximo: c-ottawa
  - texto: "Testar o cruzado anterior imediatamente, aproveitando que o paciente acabou de chegar e a dor ainda vai piorar."
    avaliacao: aceitavel
    feedback: "O instinto de testar cedo tem fundamento (o joelho que 'trava' de dor depois perde sensibilidade nos testes), mas pular a triagem óssea inverte o roteiro: primeiro Ottawa, depois ligamento. Os trinta segundos da regra não custam a janela do exame ligamentar."
    proximo: c-ottawa
:::

::: no
tipo: cena
id: c-ottawa
texto: "Você aplica os cinco itens. Ele tem 26 anos. A patela dói pouco à palpação difusa do joelho inchado, mas a palpação precisa sobre a patela não desperta dor localizada, e a cabeça da fíbula é indolor. Flete a 95 graus com desconforto. Sustenta o peso pelos quatro passos, mancando. Regra negativa em todos os itens."
dados:
  - "Ottawa do joelho: nenhum dos cinco itens presente"
  - "Derrame volumoso, de instalação imediata"
  - "Flexão possível até cerca de 95 graus"
proximo: d-inchaco
:::

::: no
tipo: decisao
id: d-inchaco
pergunta: "Sem indicação de radiografia pela regra, o exame vira de partes moles. O inchaço que 'encheu na hora' aponta para onde?"
opcoes:
  - texto: "Para o cruzado anterior: tumefação imediata é hemartrose, e ligamento roto sangra rápido."
    avaliacao: otima
    feedback: "A pergunta do tempo do inchaço vale por uma manobra: a lesão do cruzado anterior produz tumefação imediata, porque o ligamento é vascularizado e sangra na articulação; a lesão meniscal incha só após algumas horas, porque os meniscos são relativamente avasculares. Uma hora e joelho tenso: a hipótese principal é o cruzado."
    proximo: d-teste
  - texto: "Para o menisco: foi torção com o pé plantado, e esse é o mecanismo clássico da lesão meniscal."
    avaliacao: erro
    feedback: "O mecanismo é o mesmo para os dois, e é por isso que ele não separa nada: quem separa é o relógio. Menisco relativamente avascular incha em horas; cruzado roto sangra e incha em minutos. O joelho que 'encheu na hora' fala de hemartrose, e hemartrose de torção fala de cruzado anterior."
    proximo: d-teste
:::

::: no
tipo: decisao
id: d-teste
pergunta: "Hipótese: rotura do cruzado anterior, com hemartrose. Qual teste você escolhe agora?"
opcoes:
  - texto: "Teste de Lachman, a 20 graus, comparando com o joelho esquerdo."
    avaliacao: otima
    feedback: "É a escolha certa no agudo, por três razões mecânicas: a hemartrose impede a flexão a 90 graus que a gaveta exige; os isquiotibiais contraídos pela dor se opõem à translação a 90 graus, mas quase nada a 20; e a borda posterior do menisco medial faz calço a 90 graus. Os números acompanham: Lachman presente rende razão de verossimilhança 19,5 (eleva muito a probabilidade, quase confirma) e ausente, 0,2 (redução substancial); só a ausência do Lachman reduz a probabilidade de forma significativa."
    proximo: c-lachman
  - texto: "Gaveta anterior a 90 graus, que é o teste consagrado do cruzado."
    avaliacao: aceitavel
    feedback: "Positiva, a gaveta confirma bem (razão de verossimilhança 13,6, elevação substancial). O problema é o joelho agudo com hemartrose: ele não flete a 90 graus sem dor, os isquiotibiais atrapalham e o menisco faz calço, então a gaveta que não vem não afasta nada (0,4, redução apenas discreta). Quem exclui é o Lachman: o mesmo gesto a 20 graus."
    proximo: c-lachman
  - texto: "McMurray, para não deixar escapar o menisco que costuma acompanhar."
    avaliacao: erro
    feedback: "Forçar flexão e rotação num joelho agudo, tenso e dolorido rende pouco e machuca muito: o McMurray é dos achados menos reprodutíveis do joelho (concordância entre observadores de 0,16 a 0,35) e o joelho contraído de dor derruba a sensibilidade de qualquer teste. No agudo, prioridade ao Lachman; o menisco se reavalia quando o joelho desinflar."
    proximo: c-lachman
:::

::: no
tipo: cena
id: c-lachman
texto: "Com o joelho a 20 graus, uma mão fixando o fêmur e a outra puxando a tíbia para a frente, a translação à direita é visivelmente maior que à esquerda, e o movimento termina mole, sem o ponto final firme que o outro lado mostra. Você repete uma vez, com o mesmo resultado."
dados:
  - "Lachman positivo à direita: translação aumentada, ponto final mole"
  - "Joelho esquerdo com ponto final firme (referência do próprio paciente)"
proximo: d-fechamento
:::

::: no
tipo: decisao
id: d-fechamento
pergunta: "Ottawa negativa, Lachman positivo com ponto final mole. Como você fecha o atendimento?"
opcoes:
  - texto: "Sem radiografia de urgência; imobilização confortável, crioterapia, analgesia, e encaminhamento à ortopedia com o exame descrito, incluindo o reexame do menisco quando o joelho desinflar."
    avaliacao: otima
    feedback: "Fechamento completo. A regra negativa dispensa a imagem de urgência com segurança; o Lachman com ponto final mole documenta a rotura provável; e a honestidade sobre o que o joelho agudo não deixou examinar (menisco, colaterais sob estresse) transforma o reexame em plano, não em esquecimento."
    proximo: fim-otimo
  - texto: "Pedir a radiografia mesmo assim: com derrame desse tamanho, é melhor garantir."
    avaliacao: aceitavel
    feedback: "A imagem não é catástrofe, mas contraria o que a regra existe para fazer: o negativo dela reduz a probabilidade de fratura a quase nada (0,1), e 'garantir' custa fila, radiação e a falsa sensação de que o raio X normal encerra o caso, quando o problema é ligamentar e o raio X não o mostra."
    proximo: fim-otimo
  - texto: "Alta com analgésico e a orientação de voltar se não melhorar em duas semanas."
    avaliacao: erro
    feedback: "O joelho instável sem plano de seguimento volta pior: novos episódios de falseio, lesão meniscal secundária, derrames de repetição. O achado de hoje (Lachman positivo, ponto final mole) exige destino nomeado: ortopedia, com o exame descrito."
    proximo: fim-dano
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "A ressonância, dias depois, confirma a rotura do cruzado anterior. O ortopedista lê o seu encaminhamento e comenta que raramente recebe um Lachman descrito com ponto final e comparação contralateral. A decisão sobre cirurgia segue com fisioterapia e a vida esportiva dele no centro da conversa."
ensino: "No joelho agudo, a ordem é: Ottawa primeiro (o negativo dispensa a radiografia com razão de verossimilhança 0,1), tempo do inchaço como pista (imediato, cruzado; horas, menisco) e Lachman como teste de escolha no joelho que não flete. Descrever translação e ponto final vale mais que escrever 'teste positivo'."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Ele volta seis semanas depois, depois do segundo falseio descendo escada, agora com dor na interlinha medial e bloqueio ocasional: o menisco pagou pela instabilidade não conduzida. A cirurgia que vem é maior do que teria sido."
ensino: "Joelho com Lachman positivo não recebe alta sem destino. A instabilidade do cruzado cobra em prestações: falseios, menisco, derrames. O exame que diagnostica também obriga: achado documentado exige encaminhamento documentado."
:::
