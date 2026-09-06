# Publicar o SemioGuia no Google Play

O que já está pronto no repositório, o que ainda depende do autor e o texto da
ficha, escrito e pronto para copiar. Estado em 6 de setembro de 2026.

## 1. O que já está configurado

| Item | Onde | Valor |
|---|---|---|
| Identificador do pacote | `app.json` | `br.com.semioguia.app` |
| Código da versão | `app.json` | `versionCode: 1` |
| Versão visível | `app.json` e `src/config/versao.ts` | mesma, vigiada por `npm run checar:versao` |
| Identificador iOS | `app.json` | `br.com.semioguia.app` |
| Perfis de build | `eas.json` | `development`, `preview`, `production` |
| Envio | `eas.json` | trilha `internal`, como rascunho |
| Política de privacidade | `public/privacidade.html` | publicada junto do app web |
| Aviso de finalidade | Perfil, dentro do app | "Material educacional. Não substitui o julgamento clínico." |
| Ícone da ficha | `assets/loja/icone-512.png` | 512 por 512 |
| Gráfico de destaque | `assets/loja/destaque-1024x500.png` | 1024 por 500 |
| Capturas de tela | `assets/loja/captura-*.png` | seis, 1080 por 1920 |

O identificador do pacote **não pode ser alterado depois do primeiro envio**.
`br.com.semioguia.app` é uma escolha razoável e ainda é hora de mudar: basta
editar `app.json` antes de gerar o primeiro pacote.

## 2. O que depende de você

1. Criar a conta de desenvolvedor no Google Play, que tem taxa única e exige
   verificação de identidade. O processo leva alguns dias.
2. Instalar o EAS na sua máquina e entrar na sua conta Expo:
   `npm install -g eas-cli` e depois `eas login`.
3. Rodar `eas build --platform android --profile production` na sua máquina.
   A assinatura do app usa uma credencial sua, e por isso este passo não pode
   ser feito daqui.
4. Conferir e aprovar o texto da política de privacidade em
   `public/privacidade.html`, sobretudo o endereço de contato.
5. Preencher no console os dois formulários que só o titular da conta responde:
   segurança dos dados e classificação de conteúdo. As respostas sugeridas
   estão na seção 5.

## 3. Ficha da loja, texto pronto

**Nome do app**

```
SemioGuia
```

**Descrição curta**, limite de 80 caracteres

```
Semiologia médica: exame físico, casos clínicos e revisão espaçada, offline.
```

**Descrição completa**

```
O SemioGuia é um guia de semiologia médica em português, feito para estudar o
exame físico do jeito que ele acontece na prática: da anamnese à criança, na
ordem craniocaudal.

O que você encontra:

Guia completo dos 12 sistemas, com 55 tópicos organizados em camadas, do
essencial à técnica e ao avançado, com manobras passo a passo, tabelas de
evidência, pérolas e armadilhas.

Modo plantão, para quando você achou um sinal e não sabe o que fazer com ele:
186 verbetes que respondem o que aquele achado significa e qual é o próximo
passo, com busca instantânea.

Casos clínicos interativos, com decisões ramificadas e feedback a cada escolha.
São 67 casos, de urgência e de ambulatório, cobrindo todos os sistemas.

Checklists de exame, os 53 roteiros do guia, que podem ser marcados item a item
ou praticados como estação, com o tempo correndo.

Revisão espaçada, que agenda sozinha o que você errou e o que você precisa
rever, incluindo flashcards dos sinais e das estações.

Sons de ausculta, com gravações clínicas reais de conjuntos de dados abertos e
o desenho do som acompanhando o que você ouve.

Tudo funciona sem internet e sem conta. Nada do que você estuda sai do seu
aparelho.

Material educacional. Não substitui o julgamento clínico nem a avaliação de um
profissional de saúde.
```

**Categoria**: Educação. **Público**: maiores de 13 anos.
**Contato**: psantosant@gmail.com.
**Política de privacidade**: https://antomirsantos.github.io/SemioGuia/privacidade.html

## 4. Capturas de tela e legendas

| Arquivo | Tela | Legenda sugerida |
|---|---|---|
| `captura-1-guia.png` | Guia | Os 12 sistemas, na ordem do exame |
| `captura-2-plantao.png` | Plantão | Achei um sinal, e agora? |
| `captura-3-casos.png` | Casos | 67 casos com decisões e desfecho |
| `captura-4-casos-ambulatorio.png` | Casos, filtro | Urgência ou ambulatório, você escolhe |
| `captura-5-checklists.png` | Checklists | Roteiros que viram estação de prática |
| `captura-6-questoes.png` | Questões | Quiz por tópico, com revisão espaçada |

## 5. Formulários do console

**Segurança dos dados**, considerando a sincronização com conta desligada, que
é o estado atual do app publicado:

- O app coleta dados de usuário? Não.
- O app compartilha dados com terceiros? Não.
- Existe criptografia em trânsito? Não se aplica, porque nada é transmitido.
- O usuário pode pedir a exclusão dos dados? Sim, desinstalando o app, e a
  exportação está disponível no Perfil.

Se a sincronização com conta for ligada em alguma versão futura, este formulário
precisa ser refeito, declarando email e progresso de estudo como dados coletados
para funcionalidade do app.

**Classificação de conteúdo**, respostas honestas ao questionário:

- Violência, sexo, linguagem imprópria, drogas recreativas: não.
- Conteúdo educacional de saúde com descrição de anatomia humana, incluindo
  exame das mamas e exame geniturinário: sim, em contexto médico e didático.
- Menção a medicamentos em contexto clínico e educacional: sim.
- Conteúdo gerado por usuários, compras no app, anúncios: não.

## 6. Sequência recomendada

1. Conferir a política de privacidade e o endereço de contato.
2. Rodar os gates: `npm run build:content`, `checar:travessao`, `checar:fontes`,
   `checar:rv`, `checar:contraste`, `checar:versao`, `npx tsc --noEmit`, `npx jest`.
3. Gerar o pacote com `eas build --platform android --profile production`.
4. Criar o app no console, subir o pacote na trilha de teste interno e completar
   a ficha com os textos acima.
5. Preencher os dois formulários da seção 5.
6. Testar pelo teste interno, com você e alguns alunos, antes de promover para
   produção.

## 7. A cada nova versão

1. Bump em `src/config/versao.ts` e a entrada correspondente em
   `src/versao/changelog.ts`, depois `npm run changelog`.
2. Igualar `expo.version` em `app.json` e incrementar `expo.android.versionCode`.
3. `npm run checar:versao` para confirmar que as duas não divergiram.
4. Gerar e enviar o novo pacote.
