---
id: lavoura-pupila-e-saliva
titulo: Voltou da lavoura passando mal
contexto: "Unidade de pronto atendimento rural, fim de tarde. Um homem de 35 anos é trazido por colegas depois de passar mal enquanto pulverizava a plantação. Ele está sonolento, salivando muito e com a roupa encharcada de suor e do produto que usava. Os colegas dizem que ele 'começou a passar mal uma hora depois de começar o serviço'."
tags: [neurologico, intoxicacao, organofosforado, pupilas]
topicosDeApoio:
  - sistema-nervoso/exame-neurologico/consciencia-e-estado-mental
  - sistema-nervoso/exame-neurologico/pares-cranianos-i-a-vi
  - exame-fisico-geral/avaliacao-geral/pele-mucosas-e-faneros
referencias:
  - "Porto, Semiologia Médica, 8ª ed., seção de exame neurológico e de intoxicações"
  - "McGee, Evidence-Based Physical Diagnosis, 4ª ed., seção de exame pupilar e do estado mental"
  - "Semiologia Clínica, 1ª ed., capítulo de semiologia neurológica"
revisao: pendente
inicio: c-chegada
---

::: no
tipo: cena
id: c-chegada
texto: "Ele responde ao chamado, mas volta a fechar os olhos. A saliva escorre pela boca e há secreção abundante nas narinas. A roupa está molhada e tem um cheiro forte e adocicado. Ele vomitou duas vezes no caminho e teve diarreia. Os colegas seguram nele para trocar de posição, sem luvas."
dados:
  - "Exposição a agrotóxico durante pulverização há cerca de 2 horas"
  - "Sonolência, sialorreia, rinorreia"
  - "Vômitos e diarreia"
  - "FC 48 bpm, PA 96 x 58 mmHg, FR 26 irpm"
  - "Roupa encharcada com o produto"
proximo: d-primeira-medida
:::

::: no
tipo: decisao
id: d-primeira-medida
pergunta: "Qual é a primeira coisa a fazer?"
opcoes:
  - texto: "Retirar toda a roupa contaminada e lavar a pele do paciente com água e sabão, com a equipe usando luvas e avental, antes de qualquer outra medida."
    avaliacao: otima
    feedback: "A descontaminação é ao mesmo tempo tratamento e proteção. Enquanto a roupa encharcada permanece no corpo, o veneno continua sendo absorvido pela pele e o paciente segue se intoxicando dentro da sala. E sem equipamento de proteção a equipe se contamina junto, o que já produziu casos de intoxicação de profissionais de saúde."
    proximo: c-exame
  - texto: "Obter acesso venoso e iniciar imediatamente o antídoto, deixando a roupa para depois."
    avaliacao: erro
    feedback: "O antídoto é essencial e não compete com a descontaminação: ele age enquanto o veneno continua entrando pela pele, o que torna o tratamento uma corrida perdida. Além disso, manipular o paciente encharcado sem proteção expõe a equipe. Descontaminar leva poucos minutos e muda a curva inteira."
    proximo: c-atraso
  - texto: "Intubar imediatamente, dada a sonolência com secreção abundante em via aérea."
    avaliacao: aceitavel
    feedback: "A via aérea é uma preocupação legítima e pode se tornar necessária. Mas a secreção aqui é produzida pelo veneno, e o antídoto a reduz rapidamente. Intubar antes de descontaminar significa manipular um paciente coberto de agrotóxico e expor toda a equipe."
    proximo: c-exame
:::

::: no
tipo: cena
id: c-atraso
texto: "Durante a punção venosa, dois profissionais que manipularam a roupa sem luvas começam a referir náusea, salivação e visão embaçada. Eles precisam ser afastados e avaliados, e a equipe fica reduzida no momento em que mais precisava de gente."
proximo: c-exame
:::

::: no
tipo: cena
id: c-exame
texto: "Com o paciente descontaminado, você examina. As pupilas estão muito pequenas, quase puntiformes, e reagem pouco à luz. Os campos pulmonares têm estertores difusos, sem sinal de congestão cardíaca. A pele está fria e úmida, com sudorese profusa. Há fasciculações visíveis na musculatura do tórax e das coxas. A frequência cardíaca segue em 46 bpm."
dados:
  - "Pupilas puntiformes"
  - "Estertores difusos por secreção brônquica"
  - "Sudorese profusa, sialorreia mantida"
  - "Fasciculações musculares"
  - "Bradicardia de 46 bpm"
proximo: d-sindrome
:::

::: no
tipo: decisao
id: d-sindrome
pergunta: "Como esses achados se organizam em uma síndrome?"
opcoes:
  - texto: "Síndrome colinérgica: pupilas puntiformes, secreções abundantes, bradicardia, sudorese e fasciculações formam o quadro do excesso de acetilcolina."
    avaliacao: otima
    feedback: "O exame conta a farmacologia inteira. O veneno impede a degradação da acetilcolina, e ela se acumula: nas glândulas produz saliva, lágrima, suor e secreção brônquica; no coração produz bradicardia; na pupila produz miose; na junção com o músculo produz fasciculação e depois fraqueza. Reconhecer a síndrome é o que permite tratar sem esperar exame nenhum."
    proximo: c-tratamento
  - texto: "Intoxicação por opioide, dadas as pupilas puntiformes com rebaixamento de consciência."
    avaliacao: erro
    feedback: "A miose é comum às duas, e o resto não é: opioide não produz sudorese profusa, secreção abundante, fasciculação nem diarreia, e costuma reduzir a frequência respiratória sem encher o pulmão de secreção. O contexto da exposição também aponta a direção."
    proximo: c-tratamento
  - texto: "Edema agudo de pulmão, dados os estertores difusos com sudorese e hipotensão."
    avaliacao: aceitavel
    feedback: "Os estertores realmente enganam. O que separa é o resto: aqui não há turgência jugular nem terceira bulha, e existem miose, fasciculação e bradicardia. A água nos pulmões vem das glândulas brônquicas hiperestimuladas, não do coração, e o tratamento é oposto ao do edema cardiogênico."
    proximo: c-tratamento
:::

::: no
tipo: cena
id: c-tratamento
texto: "Você inicia atropina endovenosa e prepara também a droga que reativa a enzima bloqueada. Após as primeiras doses, a frequência cardíaca sobe para 68 bpm e a salivação diminui um pouco, mas os estertores continuam abundantes e a saturação está em 90%."
dados:
  - "Atropina iniciada, FC 68 bpm"
  - "Secreção brônquica ainda abundante"
  - "Saturação 90%"
  - "Pupilas ainda mióticas"
proximo: d-atropina
:::

::: no
tipo: decisao
id: d-atropina
pergunta: "Qual parâmetro você usa para guiar a dose de atropina?"
opcoes:
  - texto: "O secamento das secreções brônquicas e a melhora da ausculta pulmonar, repetindo e dobrando a dose até o pulmão limpar."
    avaliacao: otima
    feedback: "O alvo do tratamento não é a pupila nem a frequência cardíaca: é o pulmão. O que mata nessa intoxicação é o afogamento pelas próprias secreções, e a dose adequada de atropina é aquela que seca a árvore brônquica. As doses necessárias costumam ser muito maiores que as usadas em outras situações, e por isso o guia precisa ser a ausculta."
    proximo: fim-otimo
  - texto: "O diâmetro pupilar: aumentar a dose até as pupilas dilatarem."
    avaliacao: erro
    feedback: "A pupila responde de forma lenta e imprevisível, sobretudo quando houve contato direto do produto com os olhos, e usá-la como alvo leva a subdosar ou a superdosar. Enquanto se olha para a pupila, o paciente continua se afogando nas próprias secreções."
    proximo: fim-dano
  - texto: "A frequência cardíaca: manter acima de 80 bpm e interromper aí."
    avaliacao: aceitavel
    feedback: "A frequência é um parâmetro útil e insuficiente. Ela costuma responder antes das secreções, e parar nela deixa o paciente com o pulmão ainda cheio. O critério de suficiência é a ausculta limpa, com a frequência acompanhando."
    proximo: c-subdose
:::

::: no
tipo: cena
id: c-subdose
texto: "Com a atropina interrompida cedo, a secreção volta a aumentar em uma hora e a saturação cai para 86%. A dose é retomada e escalonada, e o paciente precisa de ventilação não invasiva por algumas horas até o pulmão secar."
proximo: fim-aceitavel
:::

::: no
tipo: desfecho
id: fim-otimo
classe: otimo
texto: "Com doses crescentes de atropina guiadas pela ausculta, o pulmão limpa em quarenta minutos e a saturação sobe para 97%. A droga reativadora da enzima é mantida e ele é monitorado por vários dias, inclusive para a fraqueza muscular tardia que pode aparecer depois da fase aguda. Recebe alta no sétimo dia, com orientação sobre equipamento de proteção no trabalho."
ensino: "A intoxicação por inibidor da colinesterase se reconhece pela síndrome: miose, secreções abundantes, bradicardia, sudorese e fasciculações. A primeira medida é descontaminar, com a equipe protegida, porque a pele continua absorvendo e a equipe se intoxica junto. E a atropina se titula pela ausculta pulmonar, nunca pela pupila: o alvo é secar as secreções, e as doses necessárias costumam surpreender."
:::

::: no
tipo: desfecho
id: fim-aceitavel
classe: aceitavel
texto: "Ele se recupera, após um período de hipoxemia e necessidade de suporte ventilatório não invasivo que poderia ter sido evitado com a titulação correta."
ensino: "A frequência cardíaca responde antes das secreções. Interromper a atropina quando o pulso normaliza deixa o pulmão ainda cheio, e a secreção retorna em pouco tempo."
:::

::: no
tipo: desfecho
id: fim-dano
classe: dano
texto: "Enquanto a dose era guiada pela pupila, a secreção brônquica aumentou até o afogamento. Ele precisou de intubação de urgência, evoluiu com pneumonia aspirativa e ficou nove dias em ventilação mecânica."
ensino: "A pupila responde de forma lenta e enganosa nesta intoxicação, sobretudo com contato ocular direto do produto. O parâmetro que guia a atropina é o pulmão, porque é ele que mata: enquanto a ausculta não limpar, a dose ainda não foi suficiente."
:::
