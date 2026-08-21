# Roteiro de verificação manual — Fase 1B

Este roteiro serve para conferir, num aparelho de verdade, que o app funciona
bem de ponta a ponta. Os testes automáticos (Jest) já cobrem a lógica interna,
mas não conseguem abrir o app num celular real — então esta é a forma de
confirmar visualmente que tudo está encaixado, e principalmente de confirmar
que os dados **persistem** quando o app é fechado e reaberto.

Não é preciso saber programar para seguir os passos abaixo. Leva uns 10
minutos.

## 1. Preparar

1. No celular (Android ou iPhone), instale o aplicativo **Expo Go** na loja
   de aplicativos (Play Store ou App Store) — é gratuito.
2. No computador, dentro da pasta do projeto, rode:

   ```
   npx expo start --tunnel
   ```

3. Vai aparecer um QR code no terminal. Abra o Expo Go no celular e escaneie
   esse QR code (no Android, o próprio Expo Go tem um botão "Scan QR code";
   no iPhone, pode usar a câmera nativa e tocar na notificação que aparece).
4. Aguarde o app carregar. A tela inicial é o **Guia**, com os sistemas do
   corpo em cartões.

Se o QR code não abrir ou ficar carregando muito tempo, veja a seção
"Se algo der errado" no fim deste documento.

## 2. Roteiro de navegação

Siga os passos na ordem. Em cada um, confira se o que está descrito realmente
acontece.

1. **Abrir o Guia.** Na aba "Guia" (a primeira embaixo), toque no sistema
   que contém sinais vitais.
2. **Entrar no tópico "Pressão arterial".** Dentro do sistema, toque no
   capítulo correspondente e depois no tópico **Pressão arterial**.
3. **Favoritar o tópico.** No topo da tela do tópico, toque no botão
   "Favoritar" (ícone de coração). O botão deve mudar visualmente para
   indicar que ficou favoritado ("Favoritado").
4. **Marcar como estudado.** Ao lado, toque em "Marcar estudado". O botão
   deve indicar "Estudado".
5. **Buscar "Osler".** Volte para as abas e toque em "Busca". Digite
   **Osler** no campo de busca. Deve aparecer um resultado na lista.
6. **Abrir pelo resultado da busca.** Toque no resultado encontrado — deve
   abrir o tópico correspondente normalmente.
7. **Jogar o quiz de Pressão arterial.** Volte ao tópico "Pressão arterial"
   (aba Guia ou aba Estudar) e toque em "Praticar" no bloco de quiz. Responda
   as perguntas até chegar na tela de **resultado** (percentual de acertos).
8. **Alternar tema escuro.** Vá para a aba "Perfil" e ative o tema escuro
   nas opções de aparência. As telas do app devem trocar de cores
   imediatamente (fundo escuro, texto claro).
9. **Alternar fonte grande.** Ainda no Perfil, ative a opção de fonte grande.
   Os textos do app devem ficar visivelmente maiores.
10. **Conferir o progresso.** No Perfil, deve aparecer um indicador de
    progresso no formato **"X de 3"** (ou número equivalente) refletindo
    quantos tópicos já foram estudados.

## 3. Teste de persistência (o mais importante)

Este é o único passo que testa de verdade o banco de dados do aparelho
(SQLite) — o Jest não consegue rodar essa parte porque ela depende do
celular, então esta verificação manual é a única garantia que temos.

1. **Feche o app completamente.** Não basta minimizar: no Android, abra a
   lista de apps recentes e deslize o SemioGuia para fora; no iPhone,
   deslize para cima a partir da barra inferior e depois deslize o card do
   app para cima até ele sumir. O objetivo é "matar" o processo, não só
   colocar em segundo plano.
2. **Reabra o app** (de novo pelo Expo Go, escaneando o QR code se precisar).
3. Confira, nesta ordem:
   - O tópico "Pressão arterial" continua marcado como **favorito**.
   - O tópico "Pressão arterial" continua marcado como **estudado**.
   - O **tema escuro** continua ativo.
   - A **fonte grande** continua ativa.

Se todos os quatro itens continuarem como você deixou antes de fechar o
app, a persistência está funcionando corretamente.

## 4. Se algo der errado

Ao relatar um problema, inclua:

- Em qual passo do roteiro (número da lista acima) o problema apareceu.
- O que você esperava ver e o que apareceu de fato (uma foto de tela ajuda
  bastante).
- Modelo do aparelho e sistema (ex.: "iPhone 13, iOS 18" ou "Moto G, Android
  14").
- Se o problema foi no passo 3 (persistência): diga exatamente quais dos
  quatro itens (favorito, estudado, tema, fonte) não voltaram como esperado
  — isso ajuda a isolar se o problema é geral ou só de um tipo de dado.
- Se o `npx expo start --tunnel` mostrou alguma mensagem de erro no
  terminal, copie e cole o texto.
