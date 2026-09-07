# Conta e pagamento do aluno

Plano de como o estudante cria conta e paga pelo SemioGuia. Escrito em
6 de setembro de 2026, com o app em 1.2.32 e 67 casos ainda pendentes de
endosso. Nada aqui está implementado.

**Decisão do autor, 2026-09-06: acesso por assinatura anual, com preço
acessível.** O restante do documento parte disso.

## 1. O que já existe no código

O andaime do freemium foi feito no beta e está desligado.

| Peça | Onde | Estado |
|---|---|---|
| Interruptor mestre | `src/config/paywall.ts`, `PAYWALL_ATIVO` | `false`: ninguém vê bloqueio nenhum |
| Corte grátis e pago | `SISTEMAS_GRATUITOS` | hoje: cardiovascular e respiratório |
| Regra de acesso | `src/entitlements/entitlements.ts` | decide por sistema, sem noção de prazo |
| Tela de bloqueio | `src/entitlements/BloqueioPremium.tsx` | placeholder, sem pagamento |
| Conta | `src/conta/AuthContext.tsx` | email e senha, e entrada com Google, tudo pronto |
| Sincronização | `src/sync/` | pronta, mas a config do Firebase é `null` |

A regra de acesso hoje é binária: liberado ou não. Assinatura acrescenta uma
terceira dimensão, o **prazo**, e é aí que mora quase todo o trabalho novo.

## 2. O preço

Assinatura anual, renovação automática, com um período de teste ou um primeiro
ano promocional. Minha recomendação de números:

| | Valor | Por mês | Observação |
|---|---|---|---|
| Primeiro ano, lançamento | R$ 24,90 | R$ 2,08 | oferta de introdução, configurada na própria loja |
| Renovação e preço cheio | R$ 39,90 | R$ 3,33 | o valor que aparece a partir do segundo ano |

Por que nessa faixa: acessível de verdade para estudante brasileiro significa
caber no impulso, sem consulta ao orçamento. Abaixo de R$ 25 no ano o app
passa a valer menos do que custa manter; acima de R$ 60 o aluno adia a
decisão e nunca volta. Um compêndio de semiologia custa muitas vezes isso, e
é essa a comparação que ele faz.

Duas recomendações que acompanham o preço:

- **Só anual, sem plano mensal.** Mensal parece acessível e é o contrário:
  cobra doze decisões por ano em vez de uma, e o cancelamento vem junto com a
  primeira semana de férias.
- **Preço só para o Brasil no começo.** Publicar com preço único em dólar
  torna o app caro lá fora e barato demais em outros lugares. Comece
  distribuindo para o Brasil e amplie depois.

## 3. O que a assinatura exige e a compra única não exigiria

Esta é a parte que a decisão traz junto, e que precisa estar combinada antes
de a primeira cobrança acontecer.

**Entrega contínua.** Renovação anual só se sustenta se o segundo ano tiver
algo que o primeiro não tinha. Isso deixa de ser opcional e vira compromisso:
a fase do exame físico do idoso, casos novos, os sons que ainda faltam. É bom
que exista uma razão para o roteiro do projeto; é ruim descobrir isso no mês
da primeira renovação.

**Prazo, carência e vida offline.** O app é offline por princípio, e a
assinatura vence. A regra que eu proponho: o aparelho guarda a data de validade
e continua liberando o conteúdo por até trinta dias sem conseguir falar com a
loja. Passou disso sem confirmação, volta ao gratuito. E nunca fecha no meio
de um caso ou de uma sessão de revisão: o bloqueio só aparece na próxima
entrada em um conteúdo pago.

**Cancelamento e reembolso.** A loja cuida do cancelamento, e o app precisa
dizer onde ele é feito e o que acontece: quem cancela mantém o acesso até o
fim do período já pago. Isso precisa estar na tela de compra, antes do botão,
e não escondido nos termos.

**Cortesia para quem testou.** Com assinatura, "vitalício" não existe de
graça. O caminho é gerar códigos promocionais na loja e distribuí-los aos
testadores do beta, dando um ano ou mais de cortesia. Vale combinar desde já
quantos e por quanto tempo, porque isso vira promessa.

**Exigências da ficha.** Assinatura tem regras próprias de divulgação: preço,
periodicidade, renovação automática e como cancelar precisam estar visíveis
antes da compra, na tela e na ficha da loja. Confirme o texto exigido no
console antes de publicar.

## 4. Duas decisões que continuam abertas

### Onde passa a linha entre grátis e pago

O corte atual entrega de graça justamente os dois sistemas mais desejados,
cardiovascular e respiratório, e cobra pelo resto. Com assinatura isso pesa
ainda mais: o gratuito é o que segura quem não paga por perto até decidir.

**Minha recomendação: grátis é a fundação, pago é a especialidade.**

| Faixa | Sistemas | Tópicos |
|---|---|---|
| Grátis | Anamnese, Exame físico geral | 11 |
| Pago | os outros 10 sistemas | 44 |

O aluno de primeiro contato aprende a entrevistar e a fazer o exame geral, usa
o app por semanas de graça, e esbarra no paywall quando começa a estudar
aparelho por aparelho, que é quando já sabe se o app serve. Casos, questões,
checklists e verbetes do plantão seguem o sistema a que pertencem.

### O que acontece na versão web

A cobrança da loja não existe no navegador, e montar um segundo meio de
pagamento ali dobra o trabalho e cria um segundo caixa.

**Minha recomendação: a web fica sendo a versão gratuita, permanentemente.**
Ela vira vitrine e material de divulgação, e quem assina usa o aplicativo.
Assinante que quiser a web entra com a conta, e aí a conta ganha uma segunda
função útil.

## 5. Conta: quando ela é necessária

**Assinar não exige conta no app.** A assinatura fica registrada na conta
Google do aparelho, pela própria loja. Trocar de celular, formatar ou
reinstalar não perde nada: mesma conta Google e o botão de restaurar.

**A conta do app serve para outra coisa**: sincronizar o progresso entre
aparelhos e liberar o acesso na web. Ela é opcional e o convite aparece depois
do pagamento, com o motivo explícito.

Regra do produto: **nenhuma tela pede login para liberar o que já foi pago.**

## 6. O fluxo, tela a tela

**Gatilho.** O aluno toca num tópico de sistema pago, ou no cartão de acesso
dentro do Perfil. Nada de anúncio no meio da leitura.

**Tela de acesso completo.** Título curto, o que entra, preço em destaque com
a periodicidade grudada nele, o botão, e as informações obrigatórias visíveis
sem rolar.

```
Acesso completo

Você está usando a parte gratuita: Anamnese e Exame físico geral,
com todos os casos, checklists e verbetes desses dois sistemas.

A assinatura abre:
  os 12 sistemas, com 55 tópicos revisados
  67 casos clínicos com decisões e desfecho
  os 53 checklists e as estações de prática
  os 186 verbetes do modo plantão
  a revisão espaçada de tudo isso
  e o que for publicado durante o ano

R$ 24,90 no primeiro ano
Depois R$ 39,90 por ano, renovação automática.
Cancele quando quiser, direto na loja: o acesso vale até o fim
do período já pago.

[ Assinar por R$ 24,90 ]

Já assinei, restaurar acesso
O que está incluído e o que não está
```

**Depois de assinar.** Confirmação sóbria com a data em que renova, e só então
o convite: "Quer usar o SemioGuia em mais de um aparelho? Criar uma conta
sincroniza seu progresso. É opcional."

**No Perfil**, um bloco "Seu acesso" com quatro estados: gratuito, assinatura
ativa com a data de renovação, assinatura cancelada e ainda válida até certa
data, e assinatura vencida.

**Erros**, todos com texto próprio: pagamento recusado, sem internet,
assinatura já ativa em outra conta Google, loja indisponível, e o caso da
carência vencida por falta de conexão.

## 7. Como se implementa

O aplicativo precisa falar com a cobrança do Google Play. Duas rotas:

| Rota | A favor | Contra |
|---|---|---|
| Serviço intermediário de assinaturas | Cuida do recibo, da renovação, da carência e do estado do direito; painel pronto; camada gratuita até um teto de faturamento | Mais uma dependência e mais um cadastro |
| Biblioteca de compras direto na loja | Sem intermediário e sem custo extra | Você fica responsável por validar recibo, renovação, cancelamento e todos os casos de borda |

Com assinatura, o intermediário passa a valer mais a pena do que valeria com
compra única: renovação, carência, cancelamento e reembolso são estados que
alguém precisa acompanhar, e não é você. A escolha exata da biblioteca precisa
ser confirmada contra a versão do Expo na hora de implementar, porque esse
ecossistema muda rápido.

O que muda no código, em ordem:

1. `entitlements.ts` ganha prazo: em vez de liberado ou não, passa a guardar
   validade, origem e data da última confirmação, com a carência de trinta
   dias offline.
2. `PAYWALL_ATIVO` continua sendo o interruptor, agora de verdade.
3. `SISTEMAS_GRATUITOS` recebe o corte decidido na seção 4.
4. Entram a tela de acesso, os quatro estados do bloco no Perfil, os erros e o
   restaurar.
5. O bloqueio deixa de valer só para tópicos e passa a valer também para
   casos, questões, checklists e verbetes dos sistemas pagos.
6. Na loja, uma assinatura com plano base anual e uma oferta de introdução
   para o primeiro ano, com identificador estável.

Tudo isso exige um build de desenvolvimento, que já vamos gerar de qualquer
forma para a publicação.

## 8. Obrigações da loja e do fisco

- Conteúdo digital vendido dentro do app **precisa** usar a cobrança do Google
  Play. Link externo de pagamento para desbloquear conteúdo derruba o app.
- Restaurar acesso é obrigatório e precisa funcionar de verdade.
- Preço, periodicidade, renovação automática e forma de cancelar precisam
  estar claros **antes** do toque no botão.
- Para receber, é preciso um perfil de pagamentos com dados fiscais e conta
  bancária. Vale conversar com um contador sobre receber como pessoa física ou
  abrir um CNPJ, porque isso muda tributação e limites, e receita recorrente
  torna a conversa mais relevante do que seria com venda avulsa.
- A loja retém uma taxa de serviço sobre cada cobrança, com percentual
  reduzido para quem fatura pouco no ano. Confirme o valor vigente no console
  antes de fechar o preço.

## 9. Quando ligar

Ligar o paywall cedo demais mata o beta, que é onde você descobre se o app
presta. A ordem:

1. **Agora**: beta aberto, tudo grátis, com os 67 casos ainda pendentes de
   endosso.
2. **Depois do endosso e do app publicado**: continua tudo grátis, agora com
   público de verdade e dados de uso.
3. **Com uso constante de algumas dezenas de alunos**: liga o paywall com o
   corte da seção 4, e distribui códigos promocionais de cortesia para todos
   os testadores do beta.

## 10. Uma conta de ordem de grandeza

Não é projeção, é escala. Com o preço de lançamento e a taxa da loja, cada
assinatura deixa em torno de vinte reais no primeiro ano e trinta e poucos a
partir do segundo, se renovar. Cem assinantes cobrem o custo do ano do
projeto; mil é outra conversa. O que move esse número não é o preço, é quanta
gente entra, e é por isso que o beta e a divulgação vêm antes da cobrança.

Com assinatura existe um segundo número que importa e que a venda única não
tem: **quantos renovam**. Ele só aparece doze meses depois, e é o que diz se o
compromisso de entrega contínua da seção 3 está sendo cumprido.

## 11. O que eu preciso de você

1. Confirma R$ 24,90 no primeiro ano e R$ 39,90 na renovação? Se preferir
   outro par de valores, me diga os dois.
2. O corte da seção 4: aceita Anamnese e Exame físico geral como a parte
   gratuita, ou prefere outro recorte?
3. A web fica gratuita para sempre como vitrine?
4. Quantos códigos de cortesia para os testadores do beta, e por quanto tempo?

Com essas respostas eu implemento as telas, o prazo nos entitlements, o
bloqueio completo e o restaurar, tudo atrás do interruptor, para você ver
funcionando antes de qualquer cobrança existir.
