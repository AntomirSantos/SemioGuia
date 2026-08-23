# Deploy gh-pages — procedimento e lições

Passos (endurecidos nas Fases 5 e 9):

1. `app.json` temporário com `experiments.baseUrl: "/SemioGuia"` →
   `npx expo export --platform web` → restaurar `app.json`.
2. Worktree NOVO e destacado (`git worktree prune` + `git worktree add
   --detach`); guarda `[ -e ghp/.git ]` (o .git de worktree é ARQUIVO,
   `-d` falha). Nunca rodar `checkout --orphan` no repositório principal
   (incidente da Fase 5: árvore inteira com node_modules foi ao ar).
3. No worktree: `checkout --orphan gh-pages`, limpar, copiar o `dist/`,
   e **acrescentar os dois arquivos que o export NÃO gera**:
   - `.nojekyll` (vazio) — sem ele o GitHub Pages roda Jekyll, que
     descarta diretórios com underscore: o `_expo/` inteiro (bundle JS)
     some e o app abre sem interatividade nenhuma (incidente da Fase 9:
     "não consigo clicar nos tópicos").
   - `404.html` = cópia do `index.html` — deep links e refresh em rotas
     internas reiniciam o app em vez de caírem no 404 do GitHub.
4. Verificar ANTES do push: `git ls-tree -r HEAD | wc -l` = **50**
   (48 do dist + os 2 acima; o único "node_modules" legítimo são as
   fontes do Expo sob `assets/node_modules/@expo-google-fonts/`);
   `.nojekyll` e `404.html` presentes; zero `src/`/`package.json`.
5. `git push -f origin gh-pages` — força SÓ neste branch (autorizado
   pelo autor para gh-pages exclusivamente).
6. Remover o worktree e o branch local.

A contagem "≈50" era frouxa demais: a Fase 9 subiu com 48 e os dois
ausentes eram exatamente os críticos. A checagem agora é nominal.
