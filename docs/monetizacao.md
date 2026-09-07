# Conta e pagamento do aluno

Plano de como o estudante cria conta e paga pelo SemioGuia. Escrito em
6 de setembro de 2026, com o app em 1.2.32 e 67 casos ainda pendentes de
endosso. Nada aqui está implementado: este documento existe para você decidir
três coisas, e depois eu construo.

## 1. O que já existe no código

O andaime do freemium foi feito no beta e está desligado.

| Peça | Onde | Estado |
|---|---|---|
| Interruptor mestre | `src/config/paywall.ts`, `PAYWALL_ATIVO` | `false`: ninguém vê bloqueio nenhum |
| Corte grátis e pago | `SISTEMAS_GRATUITOS` | hoje: cardiovascular e respiratório |
| Regra de acesso | `src/entitlements/entitlements.ts` | decide por sistema, com uma lista local `liberados` que ninguém preenche |
| Tela de bloqueio | `src/entitlements/BloqueioPremium.tsx` | placeholder, sem pagamento |
| Conta | `src/conta/AuthContext.tsx` | email e senha, e entrada com Google, tudo pronto |
| Sincronização | `src/sync/` | pronta, mas a config do Firebase é `null` |

Nenhuma cobrança está integrada. O que falta não é infraestrutura de conta: é
a decisão do modelo e a integração com a cobrança da loja.

## 2. As três decisões que só você toma

### Decisão 1: onde passa a linha entre grátis e pago

O corte atual entrega de graça justamente os dois sistemas mais desejados,
cardiovascular e respiratório, e cobra pelo resto. Isso é o contrário do que
costuma funcionar: o gratuito precisa provar valor sem entregar o prêmio.

**Minha recomendação: grátis é a fundação, pago é a especialidade.**

| Faixa | Sistemas | Tópicos |
|---|---|---|
| Grátis | Anamnese, Exame físico geral | 11 |
| Pago | os outros 10 sistemas | 44 |

O aluno de primeiro contato entra, aprende a entrevistar e a fazer o exame
geral, usa o app por semanas de graça, e esbarra no paywall exatamente quando
começa a estudar aparelho por aparelho, que é quando ele já sabe se o app
serve. Casos, questões, checklists e verbetes do plantão seguem o sistema a
que pertencem: dentro dos dois grátis, tudo liberado.

Uma alternativa que também funciona é cortar por recurso, deixando o Guia
inteiro grátis e cobrando pela prática (casos, questões, estações, revisão
espaçada). Ela rende menos aqui, porque o conteúdo escrito é a parte mais cara
de produzir e a mais fácil de copiar.

### Decisão 2: pagamento único ou assinatura, e o preço

**Minha recomendação: pagamento único, R$ 39,90, com R$ 24,90 de lançamento
nos primeiros noventa dias.**

Por quê:

- O conteúdo é finito e está completo. Assinatura é uma promessa de entrega
  contínua, e você não quer essa obrigação agora.
- Estudante brasileiro cancela assinatura na virada do semestre. Compra única
  não tem esse ralo, e o boca a boca em turma funciona melhor com preço fixo.
- A comparação que o aluno faz não é com outro app, é com o livro que ele não
  comprou. Um compêndio de semiologia custa muitas vezes isso.
- Preço baixo demais desvaloriza, e acima de R$ 60 o aluno adia. A faixa de
  R$ 30 a R$ 50 é a que ele decide no impulso.

Se em algum momento você quiser receita recorrente, o caminho natural é uma
assinatura opcional que cubra sincronização entre aparelhos e conteúdo novo,
sem tirar nada de quem já pagou.

### Decisão 3: o que acontece na versão web

Hoje o app roda em `antomirsantos.github.io/SemioGuia` e é o link do beta. A
cobrança do Google Play não existe na web, e integrar outro meio de pagamento
ali dobra o trabalho e cria um segundo caixa.

**Minha recomendação: a web fica sendo a versão gratuita, permanentemente.**
Ela vira a vitrine e o material de divulgação: o aluno experimenta os dois
sistemas grátis no navegador, sem instalar nada, e o acesso completo existe
no aplicativo. Quem já comprou e quiser usar a web entra com a conta, e aí a
conta passa a ter uma segunda função útil.

## 3. Conta: quando ela é necessária

Esta é a parte que mais gera atrito em apps de estudo, e a resposta aqui é
simples e boa.

**Comprar não exige conta nenhuma.** A compra fica registrada na conta Google
do aparelho, pela própria loja. Trocar de celular, formatar ou reinstalar não
perde o acesso: basta a mesma conta Google e o botão de restaurar compra.

**A conta no app serve para outra coisa**: sincronizar o progresso entre
aparelhos e liberar o acesso na web. Ela é opcional, e nunca deve ser pedida
antes do pagamento. O convite para criar conta aparece depois da compra, com
o motivo explícito, e nunca como pedágio.

Regra que eu proponho gravar no produto: **nenhuma tela do app pede login para
liberar conteúdo que já foi pago.**

## 4. O fluxo, tela a tela

**Gatilho.** O aluno toca num tópico de sistema pago, ou no cartão de acesso
dentro do Perfil. Nada de anúncio no meio da leitura.

**Tela de acesso completo.** Um título curto, a lista do que entra, o preço em
destaque, um botão principal, e dois links discretos.

```
Acesso completo

Você está usando a parte gratuita: Anamnese e Exame físico geral,
com todos os casos, checklists e verbetes desses dois sistemas.

O acesso completo abre:
  os 12 sistemas, com 55 tópicos revisados
  67 casos clínicos com decisões e desfecho
  os 53 checklists e as estações de prática
  os 186 verbetes do modo plantão
  a revisão espaçada de tudo isso

Pagamento único. Sem assinatura, sem mensalidade.

[ Liberar por R$ 24,90 ]

Já comprei, restaurar acesso
O que está incluído e o que não está
```

**Depois da compra.** Uma confirmação sóbria, e só então o convite:
"Quer usar o SemioGuia em mais de um aparelho? Criar uma conta sincroniza seu
progresso. É opcional."

**No Perfil**, um bloco novo, "Seu acesso", com três estados possíveis:
gratuito com o botão de liberar, completo com a data da compra, e completo
mais conta conectada.

**Erros**, todos com texto próprio: pagamento recusado, sem internet, compra
já feita em outra conta Google, e loja indisponível.

## 5. Como se implementa

O aplicativo precisa falar com a cobrança do Google Play. Duas rotas:

| Rota | A favor | Contra |
|---|---|---|
| Serviço intermediário de assinaturas e compras | Cuida da validação do recibo, do restaurar e do estado do direito; painel pronto; camada gratuita até um teto de faturamento | Mais uma dependência e mais um cadastro |
| Biblioteca de compras direto na loja | Sem intermediário e sem custo extra | Você fica responsável por validar recibo e por tratar todos os casos de borda |

Para um projeto de uma pessoa só, eu recomendaria o intermediário: o que ele
resolve é justamente a parte chata e silenciosa, que é garantir que o aluno
que pagou não perca o acesso. A escolha exata da biblioteca precisa ser
confirmada contra a versão do Expo no momento de implementar, porque esse
ecossistema muda rápido.

O que muda no código, em ordem:

1. `entitlements.ts` deixa de ler uma lista local e passa a ler o estado real
   da compra, guardado no aparelho e revalidado quando há internet.
2. `PAYWALL_ATIVO` continua sendo o interruptor, agora de verdade.
3. `SISTEMAS_GRATUITOS` recebe o corte decidido na Decisão 1.
4. Entram a tela de acesso, os estados de erro, o restaurar compra e o bloco
   no Perfil.
5. O bloqueio deixa de valer só para tópicos e passa a valer também para
   casos, questões, checklists e verbetes dos sistemas pagos.
6. Um produto de compra única é criado no console da loja, com identificador
   estável, algo como `acesso_completo`.

Tudo isso exige um build de desenvolvimento, que já vamos gerar de qualquer
forma para a publicação.

## 6. Obrigações da loja e do fisco

- Conteúdo digital vendido dentro do app **precisa** usar a cobrança do Google
  Play. Link externo de pagamento para desbloquear conteúdo derruba o app.
- O botão de restaurar compra é obrigatório e precisa funcionar de verdade.
- O que está incluído e o preço final precisam estar claros **antes** do toque
  no botão.
- Para receber, é preciso um perfil de pagamentos com dados fiscais e conta
  bancária. Vale conversar com um contador sobre receber como pessoa física ou
  abrir um CNPJ, porque isso muda tributação e limites.
- A loja retém uma taxa de serviço sobre cada venda, com percentual reduzido
  para quem fatura pouco no ano. Confirme o valor vigente no console antes de
  fechar o preço.

## 7. Quando ligar

Ligar o paywall cedo demais mata o beta, que é justamente onde você descobre
se o app presta. A ordem que eu proponho:

1. **Agora**: beta aberto, tudo grátis, com os 67 casos ainda pendentes de
   endosso. Nada de cobrança.
2. **Depois do endosso dos casos e do app publicado na loja**: continua tudo
   grátis, agora com público de verdade e com dados de uso.
3. **Quando houver uso constante de pelo menos algumas dezenas de alunos**:
   liga o paywall com o corte da Decisão 1, mantendo acesso completo e
   permanente para todos os testadores do beta, como cortesia. Isso é fácil
   de fazer e compra muita boa vontade.

## 8. Uma conta de ordem de grandeza

Não é projeção, é escala. Com o preço de lançamento e a taxa da loja, cada
venda deixa em torno de vinte reais. Cem alunos pagantes é um valor que cobre
o custo do ano do projeto; mil é outra conversa. O que move esse número não é
o preço, é quanta gente entra, e é por isso que o beta e a divulgação vêm
antes da cobrança.

## 9. O que eu preciso de você

1. O corte da Decisão 1: aceita Anamnese e Exame físico geral como a parte
   gratuita, ou prefere outro recorte?
2. O modelo e o preço da Decisão 2: pagamento único de R$ 39,90 com lançamento
   a R$ 24,90?
3. A web da Decisão 3: fica gratuita para sempre como vitrine?

Com essas três respostas eu implemento as telas, o bloqueio completo e o
restaurar compra, tudo atrás do interruptor, para você ver funcionando antes
de qualquer cobrança existir de verdade.
