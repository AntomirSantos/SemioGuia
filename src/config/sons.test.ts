import { existsSync } from 'fs';
import { join } from 'path';
import { FONTES_DE_SOM } from './sons';
import { blocoSchema } from '../content/schema';

const CHAVES = Object.keys(FONTES_DE_SOM).sort();

test('todo arquivo do registro existe em assets/sons', () => {
  for (const chave of CHAVES) {
    expect(existsSync(join(__dirname, '..', '..', 'assets', 'sons', `${chave}.wav`))).toBe(true);
  }
});

test('o enum do schema espelha exatamente as chaves do registro', () => {
  // Um bloco som só valida se `arquivo` estiver no enum; validamos cada
  // chave do registro e uma chave inexistente.
  for (const chave of CHAVES) {
    const r = blocoSchema.safeParse({ tipo: 'som', titulo: 'T', arquivo: chave, descricao: 'D' });
    expect(r.success).toBe(true);
  }
  const invalido = blocoSchema.safeParse({ tipo: 'som', titulo: 'T', arquivo: 'nao-existe', descricao: 'D' });
  expect(invalido.success).toBe(false);
});

test('todos os blocos som do conteúdo apontam para sons do registro', () => {
  const conteudo = require('../../assets/generated/content.json');
  let blocos = 0;
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo === 'som') {
            blocos += 1;
            expect(CHAVES).toContain(bloco.arquivo);
          }
        }
      }
    }
  }
  expect(blocos).toBe(21);
});

test('toda chave do registro tem origem declarada', () => {
  const { ORIGEM_DE_SOM } = require('./sons');
  for (const chave of CHAVES) {
    expect(['sintetizado', 'gravacao']).toContain(ORIGEM_DE_SOM[chave]);
  }
  // As três gravações reais documentadas em assets/sons/LICENCAS.md.
  const reais = Object.entries(ORIGEM_DE_SOM)
    .filter(([, o]) => o === 'gravacao')
    .map(([c]) => c)
    .sort();
  expect(reais).toEqual(['murmurio-vesicular', 'roncos', 'sibilos']);
});
