# Trazer o SemioGuia para o seu computador

Passo a passo para sair da nuvem e continuar no desktop, com o Claude tendo
acesso à sua máquina. Escrito em 7 de setembro de 2026, para a v1.2.37.

Isto é o que destrava tudo o que hoje está parado: instalar as bibliotecas de
anúncio e de compra, gerar o build de desenvolvimento, ligar o Firebase e
produzir o pacote assinado para a Play Store. Nada disso pode ser feito de
dentro da nuvem, porque a sessão da nuvem roda num computador da Anthropic que
não é o seu.

São 12 passos. Os oito primeiros são instalação, e você faz uma vez só na
vida. O passo 9 é o teleport, e leva menos de um minuto.

Ao lado de cada comando vem **o que você deve ver** quando ele termina. Se o
que aparecer for diferente, pule para a seção "Quando algo dá errado", no fim.

---

## Antes de começar

**Onde digitar os comandos.** No Windows, use o **PowerShell**: aperte a tecla
Windows, digite "powershell" e abra. No Mac, use o **Terminal**: aperte
Command e espaço, digite "terminal" e abra.

**Como funciona.** Você digita uma linha e aperta Enter. O programa responde
com texto. Não existe clique, e isso é tudo o que há para aprender.

**Copiar e colar.** No PowerShell, o clique com o botão direito cola. No
Terminal do Mac, Command mais V.

---

## Passo 1: instalar o Git

O Git é o programa que baixa o código e guarda o histórico dele.

**Windows.** Baixe em <https://git-scm.com/downloads/win>, abra o arquivo e
clique em "Next" até o fim, sem mudar nada. Ele instala junto o **Git Bash**,
um terminal que o Claude Code prefere no Windows.

**macOS.** No Terminal:

```
xcode-select --install
```

Abre uma janela pedindo para instalar as ferramentas de linha de comando.
Aceite. Se responder que já estão instaladas, ótimo, siga em frente.

## Passo 2: conferir o Git

Feche o terminal, abra de novo (isto é necessário: o terminal só enxerga
programas novos depois de reaberto) e digite:

```
git --version
```

**O que você deve ver:** algo como `git version 2.47.1`. O número não importa.

---

## Passo 3: instalar o Node.js

O Node é o que roda o aplicativo e os testes.

Nos dois sistemas: entre em <https://nodejs.org> e baixe a versão marcada
como **LTS** (é a estável, e fica à esquerda). Abra o arquivo e instale com as
opções que já vêm marcadas.

## Passo 4: conferir o Node

Feche e abra o terminal outra vez, e digite:

```
node --version
```

**O que você deve ver:** `v22.x.x` ou um número maior. Se aparecer v18 ou
menos, o site te deu a versão errada: volte ao Passo 3 e escolha a LTS.

---

## Passo 5: instalar o Claude Code

**Windows**, no PowerShell (o prompt começa com `PS C:\`):

```
irm https://claude.ai/install.ps1 | iex
```

Se der o erro `'irm' is not recognized`, você está no Prompt de Comando e não
no PowerShell. Feche e abra o PowerShell.

**macOS**, no Terminal:

```
curl -fsSL https://claude.ai/install.sh | bash
```

## Passo 6: conferir o Claude Code

Feche e abra o terminal, e digite:

```
claude --version
```

**O que você deve ver:** um número seguido de `(Claude Code)`.

## Passo 7: entrar na sua conta

Digite:

```
claude
```

Ele abre o navegador pedindo login. **Use a mesma conta claude.ai que você usa
na nuvem.** Se entrar com outra, o teleport não vai achar a conversa.

Terminado o login, saia digitando:

```
/exit
```

**Atenção:** se você já usava o Claude Code com uma chave de API, ele não vai
pedir login. Nesse caso, rode `claude`, digite `/login` dentro dele e entre
pela conta.

---

## Passo 8: baixar o SemioGuia

Escolha onde a pasta vai ficar. No exemplo, dentro de Documentos. Digite as
três linhas, uma de cada vez:

```
cd ~/Documents
git clone https://github.com/AntomirSantos/SemioGuia.git
cd SemioGuia
```

**O que você deve ver:** várias linhas de `Receiving objects`, terminando sem
a palavra `error`. Depois disso, o prompt passa a mostrar que você está dentro
da pasta SemioGuia.

Se o GitHub pedir usuário e senha, saiba que ele não quer a sua senha, e sim
um token. O caminho mais simples é instalar o **GitHub CLI**
(<https://cli.github.com>) e rodar, uma vez:

```
gh auth login
```

Escolha GitHub.com, HTTPS, e autentique pelo navegador. Depois repita as três
linhas acima.

Para confirmar que está no lugar certo:

```
git branch --show-current
```

**O que você deve ver:** `claude/claude-code-mobile-8l8cdb`. É onde o projeto
inteiro vive.

---

## Passo 9: o teleport

Ainda dentro da pasta SemioGuia, digite:

```
claude --teleport session_01St6id4X8pTyYktyDryAgTm
```

**O que acontece:** ele confere que você está no repositório certo, busca o
branch da sessão, carrega **a conversa inteira** e abre o Claude Code já com
todo o histórico. A partir daí é só continuar falando, e agora ele tem acesso
ao seu computador.

Dois atalhos, se preferir não digitar o identificador:

- `claude --teleport`, sem mais nada, abre uma lista das suas sessões.
- Na interface web, no menu da sessão, **Open in > Terminal** copia o comando
  pronto para colar.

### O que muda depois do teleport

O terminal ganha **a sua própria cópia** da conversa. O que acontecer lá não
aparece mais na web nem no celular, e o contrário também. É uma bifurcação,
não um espelho.

Se quiser continuar mandando recado do celular para a sessão que agora vive no
computador, ligue nela o `/remote-control`.

---

## Passo 10: instalar as dependências do projeto

Dentro da pasta, uma vez só:

```
npm install
```

**O que você deve ver:** alguns minutos de texto passando e, no fim, uma linha
dizendo quantos pacotes foram adicionados. Avisos em amarelo (`warn`) são
normais e podem ser ignorados.

## Passo 11: ver o aplicativo rodando

```
npm run build:content
npx expo start
```

O terminal mostra um menu. Aperte **`w`** para abrir no navegador.

Para ver no celular: instale o aplicativo **Expo Go**, deixe o celular na
mesma rede do computador e aponte a câmera para o QR code que apareceu no
terminal.

Para parar, aperte Ctrl e C ao mesmo tempo.

## Passo 12: conferir que está tudo são

Os mesmos portões que rodam na nuvem antes de cada publicação:

```
npm test
npx tsc --noEmit
npm run checar:contraste
npm run checar:rv
npm run checar:travessao
npm run checar:fontes
npm run checar:versao
```

**O que você deve ver:** no `npm test`, `72 passed` nas suítes e `504 passed`
nos testes. Nos demais, uma linha começando com `OK:`. O `npx tsc --noEmit`
não responde nada quando está tudo certo, e silêncio ali é boa notícia.

---

## O que fazer assim que chegar lá

Em ordem, e todos com o passo a passo já escrito no repositório:

1. **Ligar o SDK de anúncios e o de compras**: implementar as interfaces
   `Anuncios` (`src/anuncios/anuncios.ts`) e `Loja`
   (`src/entitlements/loja.ts`) e chamar `configurarAnuncios(...)` e
   `configurarLoja(...)`. Ver `docs/monetizacao.md`, seção "Como se liga a
   cobrança".
2. **Criar a conta de desenvolvedor do Google Play** e o produto avulso
   `sem_anuncios` a R$ 24,90. Ver `docs/publicar-na-loja.md`.
3. **Gerar o build de desenvolvimento** com EAS, necessário para testar os
   dois SDKs num celular de verdade.
4. **Refazer a política de privacidade** por causa dos anúncios, e ligar o SDK
   de consentimento da LGPD.
5. **Ligar o Firebase**, se quiser sincronizar o progresso entre aparelhos.
   Ver `docs/firebase-setup.md`.
6. **Endossar os 67 casos clínicos**, a única tarefa que ninguém além de você
   pode fazer. Fila por sistema em `docs/casos-para-revisao.md`.

É só pedir cada uma delas ao Claude depois do teleport. Ele já conhece o
projeto inteiro, porque a conversa vai junto.

---

## Quando algo dá errado

**"claude não é reconhecido como comando"** (ou `command not found`). Feche e
abra o terminal. Se persistir, refaça o Passo 5 e confira com
`claude --version`.

**O teleport reclama de alterações não salvas.** Algum arquivo da pasta foi
modificado. Ele oferece guardar as mudanças num stash; aceite. Ou rode
`git stash` antes e tente de novo.

**O teleport diz que o repositório está errado.** Você não está dentro da
pasta SemioGuia. Digite `cd ~/Documents/SemioGuia` e repita.

**"Unable to get organization UUID".** Você está autenticado por chave de API
em vez da conta claude.ai. Rode `claude`, digite `/login`, entre pela conta, e
tente o teleport de novo.

**`npm install` falha com erros vermelhos.** Quase sempre é versão velha do
Node. Confira com `node --version` e refaça o Passo 3 com a versão LTS.

**O QR code do Expo não conecta no celular.** Celular e computador precisam
estar na mesma rede. Rede de hospital e rede de faculdade costumam bloquear
isso: use os dados móveis do celular como roteador, ou apenas o navegador do
computador, com a tecla `w`.

---

## Uma nota sobre o Android Studio

Você não precisa dele para nada do que está acima, e provavelmente não vai
precisar dele nem para publicar: o SemioGuia é React Native com Expo, e o
pacote assinado sai pelo EAS Build, compilado na nuvem do Expo.

Se um dia quiser abrir o projeto nativo no Android Studio, o comando que gera
a pasta `android/` a partir do que já existe é `npx expo prebuild -p android`.
Ele não reescreve nada: o código continua todo em TypeScript, e o Android
Studio vira só a casca em volta. A recomendação é deixar essa pasta fora do
Git e regenerar quando precisar, para que o `app.json` continue sendo a fonte
da verdade do ícone, do nome do pacote e das permissões.
