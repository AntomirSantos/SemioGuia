import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checarRVs } from './checar-rv';

function criarConteudo(md: string): string {
  const raiz = mkdtempSync(join(tmpdir(), 'rv-'));
  const dir = join(raiz, 'sistema', 'capitulo');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'topico.md'), md);
  return raiz;
}

test('RV numérica sem tradução no parágrafo é flagrada', () => {
  const raiz = criarConteudo(
    '::: conceito\ntexto: |\n  O achado tem razão de verossimilhança 4,5 nesse estudo.\n:::\n',
  );
  const problemas = checarRVs(raiz);
  expect(problemas).toHaveLength(1);
  expect(problemas[0].arquivo).toContain('topico.md');
});

test('RV com tradução interpretativa passa', () => {
  const raiz = criarConteudo(
    '::: conceito\ntexto: |\n  Razão de verossimilhança 4,5; a probabilidade sobe de forma moderada.\n:::\n',
  );
  expect(checarRVs(raiz)).toHaveLength(0);
});

test('RVs dentro de blocos de tabela não são cobradas', () => {
  const raiz = criarConteudo(
    '::: tabela\ncolunas:\n  - "Achado"\n  - "Razão de verossimilhança quando presente"\nlinhas:\n  - - "Sinal X"\n    - "10,9"\n:::\n',
  );
  expect(checarRVs(raiz)).toHaveLength(0);
});

test('"RV" dentro de palavra (intervalo, observação) não dispara', () => {
  const raiz = criarConteudo(
    '::: conceito\ntexto: |\n  O intervalo de 30 mmHg foi observado em 1930.\n:::\n',
  );
  expect(checarRVs(raiz)).toHaveLength(0);
});

test('o conteúdo real do guia está limpo', () => {
  expect(checarRVs()).toHaveLength(0);
});
