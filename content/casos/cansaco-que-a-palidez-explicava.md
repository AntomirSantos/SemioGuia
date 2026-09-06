---
id: cansaco-que-a-palidez-explicava
titulo: O cansaço que a palidez explicava
contexto: "Ambulatório de clínica geral. Uma mulher de 34 anos vem por cansaço há uns seis meses, que ela atribui à rotina de dois empregos. Diz que sobe um lance de escada e precisa parar, e que tem sentido o coração acelerar sem motivo. A colega de trabalho comentou que ela está 'meio amarela'."
tags: [geral, anemia, palidez, mucosas]
topicosDeApoio:
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
  - exame-fisico-geral/avaliacao-geral/ectoscopia
  - anamnese/entrevista-clinica/interrogatorio-sintomatologico
referencias:
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame da pele e das mucosas e de anemia"
  - "Porto, Semiologia Médica, 8ª ed., seção de exame geral e das síndromes anêmicas"
  - "Semiologia Clínica, 1ª ed., capítulo de exame geral e da pele"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ela fala normalmente e não parece doente à primeira vista. A pele do rosto tem tom claro, difícil de julgar sob a luz fria da sala. Quando questionada, conta que os ciclos menstruais duram sete a oito dias e são muito volumosos desde a adolescência, mas que 'sempre foi assim'."
dados:
  - "Cansaço progressivo há 6 meses"
  - "Dispneia aos esforços e palpitações"
  - "Menstruação prolongada e volumosa de longa data"
  - "FC 96 bpm, PA 108 x 64 mmHg"
  - "Sem sangramento digestivo referido"
proximo: d-exame
:::

::: no
tipo: decisao
id: d-exame
pergunta: "Como você procura palidez de forma confiável?"
opcoes:
  - texto: "Examinar conjuntiva palpebral inferior, mucosa oral, leito ungueal e palmas, de preferência com luz natural, comparando com a sua própria mão como referência."
    avaliacao: otima
    feedback: "A cor da pele do rosto depende de pigmentação, de iluminação e de vasoconstrição, e engana com frequência. As mucosas e o leito ungueal enganam menos, porque não têm melanina. A conjuntiva palpebral, avaliada com luz adequada, é o ponto que mais rende, e a comparação com uma referência ao lado ajuda a calibrar o olho."
    proximo: c-exame
  - texto: "Julgar pela coloração geral da pele do rosto e dos braços, que reflete a perfusão global."
    avaliacao: erro
    feedback: "A pele é o pior lugar para procurar anemia. Tom de pele, bronzeamento, temperatura ambiente e ansiedade mudam a cor sem que a hemoglobina mude, e pacientes de pele mais escura são especialmente mal avaliados assim. O exame precisa ir para onde não há pigmento."
    proximo: c-exame
  - texto: "Pular o exame e solicitar diretamente o hemograma, que dá o número exato."
    avaliacao: aceitavel
    feedback: "O hemograma será pedido de qualquer forma. O que o exame acrescenta é o resto: além de estimar a palidez, ele procura as pistas da causa, como coiloníquia, queilite angular, glossite, esplenomegalia e sinais de sangramento. Um número sem exame não diz de onde o ferro está saindo."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Sob a luz da janela, a conjuntiva palpebral está claramente descorada, assim como o leito ungueal e as pregas palmares. As unhas das mãos estão finas, quebradiças, e duas delas têm a superfície côncava, em forma de colher. Há fissuras nos cantos da boca. A língua está lisa e avermelhada. O baço não é palpável, e não há linfonodomegalias."
dados:
  - "Palidez de conjuntivas, leito ungueal e pregas palmares"
  - "Unhas em colher, frágeis"
  - "Queilite angular, glossite atrófica"
  - "Sem esplenomegalia, sem linfonodomegalia"
  - "Sopro sistólico suave em foco pulmonar"
proximo: d-sopro
:::

::: no
tipo: decisao
id: d-sopro
pergunta: "Apareceu um sopro sistólico suave. Como interpretá-lo?"
opcoes:
  - texto: "Como sopro funcional da anemia: o sangue mais fluido e o débito aumentado produzem turbulência em valvas normais, e ele tende a desaparecer com a correção."
    avaliacao: otima
    feedback: "Anemia importante aumenta o débito cardíaco e reduz a viscosidade do sangue, e as duas coisas geram turbulência sem que exista doença valvar. É um sopro sistólico suave, de ejeção, sem irradiação nem frêmito. Reconhecê-lo evita um ecocardiograma desnecessário, e o teste real é ele sumir quando a hemoglobina subir."
    proximo: c-causa
  - texto: "Como provável valvopatia, indicando ecocardiograma antes de qualquer outra investigação."
    avaliacao: aceitavel
    feedback: "Nem todo sopro é funcional, e a cautela tem lugar. O que orienta aqui é o conjunto: sopro suave, sistólico, de ejeção, em paciente com sinais claros de anemia importante. Se ele persistir depois de corrigida a anemia, aí o ecocardiograma passa a ser obrigatório."
    proximo: c-causa
  - texto: "Como achado sem valor, que não precisa ser registrado."
    avaliacao: erro
    feedback: "Registrar importa justamente porque ele deve desaparecer: sem o registro de hoje, ninguém saberá amanhã se o sopro é novo ou antigo. Achado funcional continua sendo achado, e a documentação é o que permite compará-lo depois."
    proximo: c-causa
:::

::: no
tipo: cena
id: c-causa
texto: "O hemograma confirma anemia importante, com hemácias pequenas e pálidas, e a ferritina está muito baixa. Ela pergunta se pode só tomar o ferro e voltar em seis meses. Você retoma a história menstrual: são sete a oito dias, com troca de absorvente a cada duas horas nos três primeiros, e coágulos."
dados:
  - "Anemia microcítica e hipocrômica, ferritina muito baixa"
  - "Sangramento menstrual volumoso e prolongado"
  - "Sem outras fontes de perda identificadas"
  - "Dieta variada, sem restrições"
proximo: d-conduta
:::

::: no
tipo: decisao
id: d-conduta
pergunta: "Qual é a conduta completa?"
opcoes:
  - texto: "Repor ferro e ao mesmo tempo tratar a causa da perda, encaminhando para avaliação ginecológica do sangramento uterino aumentado."
    avaliacao: otima
    feedback: "Anemia por falta de ferro é sempre um sintoma, e a pergunta que importa é por onde o ferro está saindo. Repor sem tratar a perda garante que a anemia volte assim que o tratamento acabar. Neste caso a fonte está identificada e é tratável, e a reposição deve continuar por meses depois da hemoglobina normalizar, para reconstituir o estoque."
    proximo: fim-otimo
  - texto: "Repor ferro por três meses e reavaliar o hemograma, sem investigar a causa por enquanto."
    avaliacao: erro
    feedback: "A hemoglobina vai subir e a causa continuará drenando ferro. O padrão de sangramento que ela descreveu é claramente aumentado, embora ela o considere normal por ser assim desde sempre. Tratar apenas o resultado do exame é garantir a recidiva."
    proximo: fim-dano
  - texto: "Encaminhar à ginecologia e aguardar a avaliação antes de iniciar a reposição de ferro."
    avaliacao: aceitavel
    feedback: "As duas coisas não competem: a reposição começa hoje e a avaliação da causa corre em paralelo. Esperar a consulta especializada para iniciar o ferro deixa a paciente sintomática por semanas sem necessidade."
    proximo: c-espera
:::

::: no
tipo: cena
id: c-espera
texto: "A consulta ginecológica sai em oito semanas. Nesse período ela continua cansada, falta ao trabalho três vezes e chega à avaliação com a mesma hemoglobina da primeira consulta."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com ferro oral bem orientado e o tratamento do sangramento uterino, a hemoglobina normaliza em três meses e a ferritina, em seis. O cansaço desaparece, o sopro funcional some no retorno e ela volta a subir a escada do trabalho sem parar."
ensino: "Palidez se procura onde não há pigmento: conjuntiva palpebral, mucosa oral, leito ungueal e pregas palmares, com boa luz. Unhas em colher, queilite angular e glossite apontam falta de ferro. O sopro sistólico suave da anemia é funcional e deve sumir com a correção. E anemia ferropriva é sempre sintoma: sem tratar a fonte da perda, a reposição apenas adia a recidiva."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ela recebe o tratamento correto, com dois meses a mais de sintomas e faltas ao trabalho que poderiam ter sido evitados."
ensino: "Reposição de ferro e investigação da causa correm em paralelo. Nenhuma das duas precisa esperar pela outra, e a espera custa semanas de cansaço evitável."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "A hemoglobina normaliza com o ferro e, encerrada a reposição, cai de novo em oito meses. Ela retorna com anemia grave, precisa de transfusão e só então o sangramento uterino é investigado, revelando um mioma submucoso que exigiu cirurgia."
ensino: "Corrigir o número sem tratar a causa é garantir a recidiva. Em anemia por falta de ferro, a pergunta central é por onde o ferro está saindo, e sangramento que a paciente considera normal por ser antigo merece ser quantificado, e não aceito."
:::
