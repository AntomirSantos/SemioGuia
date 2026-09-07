# Como o SemioGuia se sustenta

Escrito em 6 de setembro de 2026, reescrito em 7 de setembro quando o modelo
mudou. Este documento vale por cima de qualquer versão anterior dele.

## As decisões do autor

1. **2026-09-07: o conteúdo inteiro fica aberto.** Os doze sistemas, sem
   corte, sem cadastro e sem prazo. O raciocínio: cobrar por um app que ainda
   não tem reputação é pedir que o aluno confie antes de ter motivo. Primeiro
   ele vê o trabalho completo, e a credibilidade vem do conteúdo.
2. **2026-09-07: a conta é paga por anúncios.**
3. **2026-09-07: quem não quiser anúncios paga R$ 24,90 uma vez e não vê mais
   nenhum, para sempre.** Compra única, não assinatura.
4. **2026-09-07: o regime de anúncios.** Anamnese e Exame físico geral abrem
   sozinhos. Cada outro sistema abre com um anúncio premiado, **por aba**:
   liberar o cardiovascular no Guia não o libera no Plantão. A liberação vale
   até o aplicativo ser fechado. E **usar o app sem internet é da compra**.

A referência é um aplicativo básico de semiologia que já usa essa estratégia.

O que isso substitui: o corte de quatro sistemas gratuitos e a assinatura
anual, decididos no dia anterior e implementados por inteiro. A máquina
daquele desenho continua no código, desligada por uma constante, porque
desligar custou uma linha e voltar atrás custaria semanas.

## O que está implementado

| Peça | Onde | Estado |
|---|---|---|
| Conteúdo aberto | `src/config/paywall.ts`, `PAYWALL_ATIVO` | `false`: nada fica trancado |
| Corte por sistema | `src/entitlements/entitlements.ts` | dormente, com testes, para o caso de voltar |
| Compra única | `src/entitlements/compra.ts` | direito permanente, sem prazo e sem reconfirmação |
| Adaptador da loja | `src/entitlements/loja.ts` | interface `Loja`, `lojaIndisponivel` e `lojaDeTeste` |
| Estado no app | `src/entitlements/EntitlementsContext.tsx` | `useAcesso().mostrarAnuncios` é a pergunta que as telas fazem |
| Tela da compra | `src/app/sem-anuncios.tsx` | preço, o que já está aberto, a promessa de não renovar, restaurar |
| Bloco "Seu acesso" | `src/entitlements/BlocoAcesso.tsx` | quatro estados, no Perfil |
| Regime de anúncios | `src/anuncios/desbloqueio.ts` | regra pura, com testes |
| Estado das liberações | `src/anuncios/DesbloqueioContext.tsx` | só em memória: fechar o app zera |
| Adaptador de anúncios | `src/anuncios/anuncios.ts` | interface `Anuncios`, indisponível e de teste |
| Telas do regime | `src/anuncios/PecasDeAnuncio.tsx` | portão, barra na lista e parede de conexão |
| SDK de anúncios | ainda não | falta integrar na máquina do autor |

## A compra

**R$ 24,90, uma vez só.** Não renova, não vence, não é cobrado de novo, e vale
nas versões futuras. Na loja isso é um **produto avulso não consumível**, não
uma assinatura: o identificador é `sem_anuncios` (`PRODUTO_SEM_ANUNCIOS`) e é
estável, porque mudar quebra quem já pagou. O produto `acesso_anual` da
versão anterior não deve ser criado.

Três consequências que valem estar escritas:

- **Restaurar é obrigatório**, e funciona de verdade: trocar de aparelho ou
  reinstalar recupera a compra pela conta Google, sem conta no app.
- **Quem paga sai da conta dos anúncios para sempre.** Cada compra é receita
  única que substitui receita recorrente pequena. É o desenho pedido, e ele
  torna o número de instalações mais importante que o de compradores.
- **A compra não expira offline.** Uma assinatura precisa reconfirmar com a
  loja de tempos em tempos; uma compra única não tem o que reconfirmar. Exigir
  conexão de quem já pagou seria cobrar duas vezes pela mesma coisa.

## Os anúncios

**A regra.** Anamnese e Exame físico geral (`SISTEMAS_SEMPRE_ABERTOS`) abrem
sem anúncio nenhum. Qualquer outro sistema abre com um anúncio premiado, e
abre **por aba**: Guia, modo plantão, Checklists e Estudar contam separado. A
liberação mora só na memória, então fechar o aplicativo zera tudo e a próxima
abertura pede de novo.

**O uso offline é da compra** (`OFFLINE_EXIGE_COMPRA`). Sem internet e sem
compra, o app pede conexão em vez de mostrar conteúdo, inclusive nos dois
sistemas sempre abertos. Isso dá à compra um segundo valor, maior que o
primeiro: estudar no plantão, no ônibus e no hospital sem sinal.

Se um dia parecer duro demais, a alternativa natural está escrita no código:
deixar os dois sistemas abertos funcionarem offline e manter o resto exigindo
anúncio, que já exige rede por natureza. É trocar uma constante por falso.

**Quatro garantias que o código já dá, e que a integração não pode quebrar:**

1. **Sem anúncio na web.** A cobrança da loja não existe no navegador, e sem a
   possibilidade de remover não se deve exibir. Na web o app é gratuito, limpo
   e sem parede de conexão.
2. **Sem anúncio enquanto a compra carrega do banco.** Quem pagou não pode ver
   um piscar de propaganda a cada abertura.
3. **Falta de anúncio não tranca ninguém.** Se a rede de anúncios não tiver
   inventário, o resultado é `sem_anuncio` e o conteúdo abre assim mesmo. Um
   aluno não pode ficar sem estudar porque outra empresa não tinha o que
   vender naquele minuto.
4. **Enquanto o SDK não estiver ligado, o regime inteiro fica invisível**, e o
   app se comporta como hoje: tudo aberto, sem anúncio e sem parede. Publicar
   antes da integração é seguro.

**O que ainda não existe:** o SDK. O app fala com a interface `Anuncios`
(`src/anuncios/anuncios.ts`), nunca com a biblioteca nativa, e ligar de
verdade é implementar essa interface e chamar `configurarAnuncios(...)`.

**Três limites que eu recomendo manter**, porque são o que protege o produto:
nunca anúncio dentro de um caso clínico ou de uma sessão de revisão; nunca
intersticial em cima de um erro do aluno; e sempre com o espaço reservado,
para o anúncio não empurrar o conteúdo quando não carregar.

**Dois riscos que valem ser verificados no console antes de publicar.** O
primeiro é de política: exigir anúncio para acessar conteúdo é permitido como
troca voluntária (anúncio premiado), mas a fronteira com "anúncio disruptivo"
é definida pelo Google e muda; confirme o texto vigente. O segundo é de
avaliação: repetir a exigência a cada abertura do app é o ponto do plano que
mais tende a aparecer nas notas da loja, e é também o mais fácil de afrouxar
depois, se aparecer.

**Consentimento** continua sendo trabalho pendente: identificador de
publicidade, política de privacidade (`public/privacidade.html`, que hoje diz
que a coleta é só local), declaração de segurança de dados, classificação
etária e o SDK de consentimento para a LGPD.

## A web

**A web fica gratuita, limpa e permanente**: vitrine e material de
divulgação, sem anúncio e sem compra. Quem quiser o app com ou sem anúncio
usa o aplicativo.

## A conta do aluno

**Comprar não exige conta no app.** A compra fica registrada na conta Google
do aparelho, pela própria loja. A conta do SemioGuia serve para sincronizar o
progresso entre aparelhos, é opcional e continua desligada por flag.

Regra do produto: **nenhuma tela pede login para liberar o que já foi pago.**

## Como se liga a cobrança

O aplicativo precisa falar com a cobrança do Google Play, e o app inteiro fala
com a interface `Loja`, nunca com o SDK nativo. Na máquina do autor:

1. gerar um build de desenvolvimento (já necessário para publicar);
2. instalar a biblioteca de compras escolhida, confirmando a compatibilidade
   com a versão do Expo na hora, porque esse ecossistema muda rápido;
3. escrever um objeto que implemente `Loja` (`src/entitlements/loja.ts`);
4. chamar `configurarLoja(...)` uma vez, no início do app;
5. na loja, criar o produto avulso `sem_anuncios` a R$ 24,90.

Telas, direito, restauração e persistência já existem e são testados com a
`lojaDeTeste`.

## Obrigações da loja e do fisco

- Conteúdo digital vendido dentro do app **precisa** usar a cobrança do Google
  Play. Link externo de pagamento derruba o app.
- Restaurar compra é obrigatório e precisa funcionar.
- Preço e o que ele compra precisam estar claros **antes** do toque no botão,
  e aqui isso inclui dizer que não é assinatura.
- A ficha passa a declarar "contém anúncios", e a política de privacidade
  precisa refletir o SDK de anúncios.
- Para receber, é preciso um perfil de pagamentos com dados fiscais e conta
  bancária. Vale conversar com um contador sobre pessoa física ou CNPJ.
- A loja retém uma taxa de serviço sobre cada cobrança, com percentual
  reduzido para quem fatura pouco no ano.

## Uma conta de ordem de grandeza

Não é projeção, é escala.

**Compra.** Cada R$ 24,90 deixa em torno de vinte reais depois da taxa. A
conta de desenvolvedor do Google custa uma taxa única de vinte e cinco
dólares: **duas compras já a cobrem**.

**Anúncios.** A conta é sempre `impressões × eCPM ÷ 1000`. Com um eCPM de
R$ 5, um aluno que use o app 20 dias por mês e veja 15 anúncios por dia gera
R$ 1,50 por mês. O eCPM real só aparece no console depois de haver tráfego, e
varia muito com o formato: banner rende pouco, intersticial várias vezes mais,
premiado mais ainda.

O número que move os dois lados é o mesmo: **quanta gente instala**. Por isso
o beta e a divulgação continuam sendo o trabalho principal.

## O que ainda depende de você

1. Ligar o SDK de anúncios e o de compras, e criar o produto `sem_anuncios`
   na conta de desenvolvedor.
2. Refazer a política de privacidade e a declaração da ficha por causa dos
   anúncios, e ligar o SDK de consentimento.
3. Endossar os 67 casos que estão com `revisao: pendente`.
4. Decidir se haverá cortesia para os testadores do beta, e por quanto tempo
   (o código já suporta cortesia com prazo e vitalícia).
