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
| Anúncios | ainda não | falta decidir os formatos e os lugares |

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

O que está decidido: eles existem, e a compra os remove. **Falta decidir os
formatos e os lugares**, e essa decisão não é detalhe: ela define quanto o app
arrecada e quantas avaliações de uma estrela ele coleciona.

O que já está resolvido no código, independente da escolha:

- **Nada de anúncio na web.** A cobrança da loja não existe no navegador, e
  sem a possibilidade de remover não se deve exibir. Na web o app é gratuito e
  limpo, e os textos dizem isso.
- **Nada de anúncio enquanto a compra carrega do banco.** Quem pagou não pode
  ver um piscar de propaganda a cada abertura.

Três limites que eu recomendo fixar antes de escolher os lugares, porque são
os que protegem o produto:

1. **Nunca dentro de um caso clínico nem de uma sessão de revisão.**
   Interromper o raciocínio para vender qualquer coisa estraga exatamente o
   que o app faz de melhor.
2. **Nunca intersticial em cima de um erro do aluno.** Anúncio de tela cheia
   depois de errar uma questão é a receita da avaliação de uma estrela.
3. **Sempre offline-safe.** O app funciona sem sinal; o espaço do anúncio não
   pode empurrar o conteúdo nem deixar buraco quando ele não carregar.

Uma coisa que a integração vai exigir e não existe hoje: **consentimento**.
Anúncio implica identificador de publicidade, o que muda a política de
privacidade (`public/privacidade.html`), a declaração de segurança de dados na
ficha da loja, a classificação etária e a necessidade do SDK de consentimento
para atender à LGPD. Isso é trabalho de conformidade, não de interface.

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

1. Escolher os formatos e os lugares dos anúncios (seção "Os anúncios").
2. Criar a conta de desenvolvedor, o produto `sem_anuncios` e ligar a
   biblioteca de compras e a de anúncios.
3. Endossar os 67 casos que estão com `revisao: pendente`.
4. Decidir se haverá cortesia para os testadores do beta, e por quanto tempo
   (o código já suporta cortesia com prazo e vitalícia).
