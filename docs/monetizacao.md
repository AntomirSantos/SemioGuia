# Conta e pagamento do aluno

Como o estudante paga pelo SemioGuia e como o app decide o que ele pode
abrir. Escrito em 6 de setembro de 2026, atualizado em 7 de setembro com o
paywall já implementado e ligado.

**Decisões do autor:**

1. 2026-09-06: acesso por **assinatura anual**, com preço acessível.
2. 2026-09-07: a parte gratuita são **quatro sistemas completos**, Anamnese,
   Exame físico geral, Aparelho cardiovascular e Aparelho respiratório, com
   tudo o que existe neles. O app é publicado já com o paywall funcionando,
   para começar a recuperar o custo da conta de desenvolvedor do Google.

## 1. O que já está implementado

| Peça | Onde | Estado |
|---|---|---|
| Interruptor mestre | `src/config/paywall.ts`, `PAYWALL_ATIVO` | `true` |
| Corte grátis e pago | `SISTEMAS_GRATUITOS` | anamnese, exame físico geral, cardiovascular, respiratório |
| Assinatura com prazo | `src/entitlements/assinatura.ts` | validade, origem, confirmação e carência de 30 dias |
| Regra de acesso | `src/entitlements/entitlements.ts` | decide por sistema, já com prazo |
| Estado no app | `src/entitlements/EntitlementsContext.tsx` | `useAcesso()`, persistido no ProgressStore |
| Adaptador da loja | `src/entitlements/loja.ts` | interface `Loja`, `lojaIndisponivel` e `lojaDeTeste` |
| Tela de compra | `src/app/assinatura.tsx` | preço, o que abre, renovação, cancelamento e restaurar |
| Bloqueio | `src/entitlements/BloqueioPremium.tsx`, `LinhaTrancada.tsx` | tela cheia e linha trancada nas listas |
| Bloco "Seu acesso" | `src/entitlements/BlocoAcesso.tsx` | cinco estados, no Perfil |
| Conta | `src/conta/AuthContext.tsx` | email e senha, e entrada com Google, tudo pronto |
| Sincronização | `src/sync/` | pronta, mas a config do Firebase é `null` |

**O que falta, e só pode ser feito na máquina do autor:** ligar a cobrança de
verdade. O app inteiro fala com a interface `Loja` e nunca com o SDK nativo,
então a última milha é escrever um objeto que implemente `Loja` chamando a
biblioteca de compras escolhida e chamar `configurarLoja(...)` uma vez, no
início do app. Enquanto isso não acontece vale `lojaIndisponivel`: o app
mostra o preço, explica e não deixa comprar, que é exatamente o
comportamento correto no navegador.

## 2. O preço

Assinatura anual, renovação automática, com um primeiro ano promocional.

| | Valor | Por mês | Observação |
|---|---|---|---|
| Primeiro ano, lançamento | R$ 24,90 | R$ 2,08 | oferta de introdução, configurada na própria loja |
| Renovação e preço cheio | R$ 39,90 | R$ 3,33 | o valor que aparece a partir do segundo ano |

Por que nessa faixa: acessível de verdade para estudante brasileiro significa
caber no impulso, sem consulta ao orçamento. Abaixo de R$ 25 no ano o app
passa a valer menos do que custa manter; acima de R$ 60 o aluno adia a
decisão e nunca volta. Um compêndio de semiologia custa muitas vezes isso, e
é essa a comparação que ele faz.

Duas decisões que acompanham o preço:

- **Só anual, sem plano mensal.** Mensal parece acessível e é o contrário:
  cobra doze decisões por ano em vez de uma, e o cancelamento vem junto com a
  primeira semana de férias.
- **Preço só para o Brasil no começo.** Publicar com preço único em dólar
  torna o app caro lá fora e barato demais em outros lugares. Comece
  distribuindo para o Brasil e amplie depois.

Os textos `PRECO_LANCAMENTO` e `PRECO_RENOVACAO` em `paywall.ts` são só o que
aparece enquanto a loja não responde: quando a loja estiver ligada, o preço
mostrado vem dela, já na moeda do usuário.

## 3. O que a assinatura exige

**Entrega contínua.** Renovação anual só se sustenta se o segundo ano tiver
algo que o primeiro não tinha. Isso deixa de ser opcional e vira compromisso:
a fase do exame físico do idoso, casos novos, os sons que ainda faltam.

**Prazo, carência e vida offline.** O app é offline por princípio, e a
assinatura vence. O aparelho guarda a data de validade e continua liberando o
conteúdo por até trinta dias sem conseguir falar com a loja
(`DIAS_DE_CARENCIA_OFFLINE`). Passou disso sem confirmação, o estado vira
`sem_confirmacao` e o Perfil pede para reconectar. O bloqueio nunca fecha no
meio de um caso ou de uma sessão de revisão: ele aparece na próxima entrada
em um conteúdo pago.

**Cancelamento e reembolso.** A loja cuida do cancelamento, e o app diz onde
ele é feito e o que acontece: quem cancela mantém o acesso até o fim do
período já pago. Isso está na tela de compra, antes do botão.

**Cortesia para quem testou.** Com assinatura, "vitalício" não existe de
graça. O caminho é gerar códigos promocionais na loja e distribuí-los aos
testadores do beta. Para casos manuais, a origem `cortesia` da assinatura
libera o acesso sem depender de confirmação da loja.

**Exigências da ficha.** Preço, periodicidade, renovação automática e como
cancelar precisam estar visíveis antes da compra, na tela e na ficha da loja.
Confirme o texto exigido no console antes de publicar.

## 4. Onde passa a linha entre grátis e pago

| Faixa | Sistemas | Tópicos |
|---|---|---|
| Grátis | Anamnese, Exame físico geral, Aparelho cardiovascular, Aparelho respiratório | 19 |
| Pago | os outros 8 sistemas | 36 |

O corte é **por sistema e vale para tudo o que pertence a ele**: tópicos,
questões, casos, checklists, estações e verbetes do modo plantão. Um aluno
sem assinatura tem quatro sistemas inteiros, e não quatro amostras.

Por que esses quatro: o aluno de primeiro contato aprende a entrevistar, a
fazer o exame geral e os dois aparelhos que mais aparecem na prova, usa o app
por semanas de graça e esbarra na assinatura ao entrar na especialidade, que
é quando já sabe se o app serve.

**Como o bloqueio aparece.** O conteúdo pago não some das listas: aparece
como linha trancada, com o nome à vista e um cadeado, e o toque leva à tela
de acesso. Esconder faria o aluno achar que o acervo é menor do que é. Na
tela de um sistema pago, o índice inteiro continua visível, com uma faixa no
topo dizendo o que a assinatura abre.

**Duas exceções deliberadas.** O exame completo da cabeça aos pés percorre só
os checklists liberados, porque uma sequência com buracos trancados no meio
seria pior que uma sequência menor e inteira. E a fila de revisão espaçada
esconde os itens de sistema pago quando a assinatura vence: eles voltam
sozinhos quando a assinatura voltar, com o agendamento intacto.

## 5. O que acontece na versão web

A cobrança da loja não existe no navegador. **A web fica sendo a versão
gratuita, permanentemente**: vitrine e material de divulgação. A tela de
acesso, no navegador, diz isso com todas as letras. Assinante que quiser a
web entra com a conta, e aí a conta ganha uma segunda função útil.

## 6. Conta: quando ela é necessária

**Assinar não exige conta no app.** A assinatura fica registrada na conta
Google do aparelho, pela própria loja. Trocar de celular, formatar ou
reinstalar não perde nada: mesma conta Google e o botão de restaurar.

**A conta do app serve para outra coisa**: sincronizar o progresso entre
aparelhos e liberar o acesso na web. Ela é opcional e o convite aparece
depois do pagamento, com o motivo explícito.

Regra do produto: **nenhuma tela pede login para liberar o que já foi pago.**

## 7. O fluxo, tela a tela

**Gatilho.** O aluno toca num tópico, caso, checklist ou verbete de sistema
pago, ou no bloco "Seu acesso" dentro do Perfil. Nada de anúncio no meio da
leitura.

**Tela de acesso completo** (`/assinatura`): o que ele já tem de graça, o que
a assinatura abre, preço em destaque com a periodicidade grudada nele,
renovação automática e cancelamento, e só então o botão. Abaixo, "Já assinei,
restaurar acesso", que é obrigatório e funciona de verdade.

**No Perfil**, o bloco "Seu acesso" com cinco estados: gratuito, assinatura
ativa com a data de renovação, cancelada e ainda válida até certa data,
vencida, e por confirmar (carência offline estourada).

**Erros**, todos com texto próprio: compra cancelada pelo usuário, nada a
restaurar, loja indisponível e falha de comunicação.

## 8. Como se liga a cobrança

O aplicativo precisa falar com a cobrança do Google Play. Duas rotas:

| Rota | A favor | Contra |
|---|---|---|
| Serviço intermediário de assinaturas | Cuida do recibo, da renovação, da carência e do estado do direito; painel pronto; camada gratuita até um teto de faturamento | Mais uma dependência e mais um cadastro |
| Biblioteca de compras direto na loja | Sem intermediário e sem custo extra | Você fica responsável por validar recibo, renovação, cancelamento e todos os casos de borda |

Com assinatura o intermediário vale mais a pena do que valeria com compra
única: renovação, carência, cancelamento e reembolso são estados que alguém
precisa acompanhar. A escolha exata da biblioteca precisa ser confirmada
contra a versão do Expo na hora de implementar, porque esse ecossistema muda
rápido.

Na prática, na máquina do autor:

1. gerar um build de desenvolvimento (já necessário para publicar);
2. instalar a biblioteca escolhida;
3. escrever um objeto que implemente `Loja` (`src/entitlements/loja.ts`);
4. chamar `configurarLoja(...)` uma vez, no início do app;
5. na loja, criar uma assinatura com plano base anual e uma oferta de
   introdução para o primeiro ano, com o identificador `acesso_anual`
   (`PRODUTO_ASSINATURA`), que é estável: mudar quebra quem já assinou.

Nada além disso precisa mudar no app: telas, prazo, bloqueio e restaurar já
existem e são testados com a `lojaDeTeste`.

## 9. Obrigações da loja e do fisco

- Conteúdo digital vendido dentro do app **precisa** usar a cobrança do
  Google Play. Link externo de pagamento para desbloquear conteúdo derruba o
  app.
- Restaurar acesso é obrigatório e precisa funcionar de verdade.
- Preço, periodicidade, renovação automática e forma de cancelar precisam
  estar claros **antes** do toque no botão.
- Para receber, é preciso um perfil de pagamentos com dados fiscais e conta
  bancária. Vale conversar com um contador sobre receber como pessoa física
  ou abrir um CNPJ, porque isso muda tributação e limites, e receita
  recorrente torna a conversa mais relevante do que seria com venda avulsa.
- A loja retém uma taxa de serviço sobre cada cobrança, com percentual
  reduzido para quem fatura pouco no ano. Confirme o valor vigente no console
  antes de fechar o preço.

## 10. Uma conta de ordem de grandeza

Não é projeção, é escala. Com o preço de lançamento e a taxa da loja, cada
assinatura deixa em torno de vinte reais no primeiro ano e trinta e poucos a
partir do segundo, se renovar. A conta de desenvolvedor do Google custa uma
taxa única de vinte e cinco dólares: **duas assinaturas já a cobrem**. Cem
assinantes cobrem o custo do ano do projeto; mil é outra conversa. O que move
esse número não é o preço, é quanta gente entra.

Com assinatura existe um segundo número que importa e que a venda única não
tem: **quantos renovam**. Ele só aparece doze meses depois, e é o que diz se
o compromisso de entrega contínua da seção 3 está sendo cumprido.

## 11. O que ainda depende de você

1. Confirmar R$ 24,90 no primeiro ano e R$ 39,90 na renovação, ou dizer outro
   par de valores.
2. Criar a conta de desenvolvedor, o produto `acesso_anual` na loja e ligar a
   biblioteca de compras (seção 8).
3. Decidir quantos códigos de cortesia para os testadores do beta, e por
   quanto tempo.
4. Endossar os 67 casos que estão com `revisao: pendente`.
