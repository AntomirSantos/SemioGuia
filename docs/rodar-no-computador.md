# Trazer o SemioGuia para o seu computador

Passo a passo para sair da nuvem e continuar no desktop, com o Claude tendo
acesso à sua máquina. Escrito em 7 de setembro de 2026.

Isto é o que destrava tudo o que hoje está parado: instalar as bibliotecas de
anúncio e de compra, gerar o build de desenvolvimento, ligar o Firebase e
produzir o pacote assinado para a Play Store. Nada disso pode ser feito de
dentro da nuvem.

O caminho tem quatro partes. As três primeiras são de instalação e você faz
uma vez só na vida. A quarta é o teleport, e leva menos de um minuto.

---

## Parte 1: instalar o Git

O Git é o programa que baixa e versiona o código.

**Windows.** Baixe em <https://git-scm.com/downloads/win> e instale clicando
em "Next" até o fim. Ele traz junto o **Git Bash**, um terminal que o Claude
Code prefere no Windows.

**macOS.** Abra o Terminal (Command + espaço, digite "Terminal") e rode:

```bash
xcode-select --install
```

Se disser que já está instalado, ótimo, pule.

Para conferir, em qualquer um dos dois:

```bash
git --version
```

Tem que aparecer um número de versão.

---

## Parte 2: instalar o Node.js

O Node é o que roda o aplicativo e os testes.

Nos dois sistemas: baixe a versão **LTS** em <https://nodejs.org> e instale
com as opções padrão. Feche e abra o terminal depois de instalar, senão ele
não enxerga o programa novo.

Para conferir:

```bash
node --version
```

Precisa aparecer algo como `v22.x.x` ou maior.

---

## Parte 3: instalar o Claude Code

**Windows**, no PowerShell (o prompt começa com `PS C:\`):

```powershell
irm https://claude.ai/install.ps1 | iex
```

**macOS**, no Terminal:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Para conferir:

```bash
claude --version
```

Depois, entre na sua conta. Rode `claude`, e ele abre o navegador pedindo
login: **use a mesma conta claude.ai que você usa aqui na nuvem**, senão o
teleport não acha esta conversa. Se já estiver logado com outra, digite
`/login` dentro do Claude Code para trocar. Saia com `/exit`.

---

## Parte 4: baixar o SemioGuia

Escolha onde a pasta vai ficar. No exemplo, dentro de Documentos:

**Windows** (no Git Bash ou no PowerShell):

```bash
cd ~/Documents
git clone https://github.com/AntomirSantos/SemioGuia.git
cd SemioGuia
```

**macOS**:

```bash
cd ~/Documents
git clone https://github.com/AntomirSantos/SemioGuia.git
cd SemioGuia
```

Se o GitHub pedir usuário e senha, ele quer na verdade um token de acesso, e
não a sua senha. O caminho mais simples é instalar o **GitHub CLI**
(<https://cli.github.com>) e rodar `gh auth login` uma vez.

O projeto vive no branch `claude/claude-code-mobile-8l8cdb`, e é ele que o
clone traz. Para conferir onde você está:

```bash
git branch --show-current
```

---

## Parte 5: o teleport

Dentro da pasta `SemioGuia`, rode:

```bash
claude --teleport session_01St6id4X8pTyYktyDryAgTm
```

Ele confere que você está no repositório certo, busca o branch da sessão e
carrega **esta conversa inteira** no seu terminal. A partir daí é continuar
falando normalmente, e agora o Claude tem acesso à sua máquina.

Dois atalhos, se preferir não digitar o identificador:

- `claude --teleport` sem nada abre uma lista das suas sessões para escolher.
- Na interface web, no menu da sessão, **Open in > Terminal** copia o comando
  pronto.

**O que muda depois disso.** O terminal ganha a sua própria cópia da conversa.
O que acontecer lá não aparece mais na web nem no celular, e o contrário
também. É uma bifurcação, não um espelho. Se quiser continuar mandando recado
do celular para a sessão local, ligue o `/remote-control` nela.

---

## Parte 6: rodar o aplicativo na sua máquina

Isto é opcional para o teleport, mas você vai querer ver o app rodando.
Dentro da pasta, uma vez:

```bash
npm install
```

Demora alguns minutos e baixa muita coisa. É normal.

Depois, sempre que quiser abrir:

```bash
npm run build:content
npx expo start
```

O terminal mostra um menu: aperte `w` para abrir no navegador. Para ver no
celular, instale o **Expo Go** e aponte a câmera para o QR code que aparece,
com o celular na mesma rede do computador.

Para conferir que está tudo são, os mesmos portões que rodam aqui:

```bash
npm test
npx tsc --noEmit
npm run checar:contraste
npm run checar:rv
npm run checar:travessao
npm run checar:fontes
npm run checar:versao
```

---

## Parte 7: o que fazer assim que chegar lá

Em ordem de importância, e todos com o passo a passo já escrito:

1. **Ligar o SDK de anúncios e o de compras**: implementar as interfaces
   `Anuncios` (`src/anuncios/anuncios.ts`) e `Loja`
   (`src/entitlements/loja.ts`) e chamar `configurarAnuncios(...)` e
   `configurarLoja(...)`. Ver `docs/monetizacao.md`.
2. **Criar a conta de desenvolvedor e o produto `sem_anuncios`** no console
   do Google Play. Ver `docs/publicar-na-loja.md`.
3. **Gerar o build de desenvolvimento** com EAS, necessário para testar os
   dois SDKs acima.
4. **Ligar o Firebase**, se quiser a sincronização de progresso entre
   aparelhos. Ver `docs/firebase-setup.md`.
5. **Endossar os 67 casos clínicos**, que é a única tarefa que ninguém além
   de você pode fazer. Fila por sistema em `docs/casos-para-revisao.md`.

---

## Se algo der errado

**"claude não é reconhecido como comando"**: feche e abra o terminal. Se
persistir, reinstale pela Parte 3 e confira com `claude --version`.

**O teleport reclama de alterações não salvas**: você mexeu em algum arquivo
da pasta. Ele oferece guardar num stash; aceite, ou rode `git stash` antes.

**O teleport diz que o repositório está errado**: você não está dentro da
pasta `SemioGuia`. Rode `pwd` (ou `cd`, no PowerShell) para ver onde está.

**"Unable to get organization UUID"**: você está logado por chave de API em
vez da conta claude.ai. Rode `claude`, depois `/login`, e entre pela conta.

**`npm install` falha**: quase sempre é versão velha do Node. Confira com
`node --version` e reinstale a LTS pela Parte 2.
