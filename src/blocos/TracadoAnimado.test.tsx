import { analisarSvgAnimado, comprimentoDoPath } from './TracadoAnimado';

const SVG_MARCADO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" fill="none" stroke="currentColor">
  <path d="M 0 0 L 100 0" stroke-width="1.5" />
  <path id="anima-2" d="M 0 10 L 30 10" stroke-width="2" />
  <path id="anima-1" d="M 0 0 L 3 4" stroke-width="2" />
</svg>`;

test('comprimentoDoPath mede segmentos retos com exatidão', () => {
  expect(comprimentoDoPath('M 0 0 L 3 4')).toBeCloseTo(5, 5);
  expect(comprimentoDoPath('M 0 0 L 10 0 L 10 10')).toBeCloseTo(20, 5);
});

test('comprimentoDoPath amostra curvas Q acima da corda reta', () => {
  const curva = comprimentoDoPath('M 0 0 Q 5 10 10 0');
  expect(curva).toBeGreaterThan(10); // maior que a distância em linha reta
  expect(curva).toBeLessThan(20); // e menor que o polígono de controle
});

test('analisarSvgAnimado extrai os traçados na ordem numérica e esconde a base', () => {
  const dados = analisarSvgAnimado(SVG_MARCADO);
  expect(dados).not.toBeNull();
  expect(dados!.viewBox).toBe('0 0 320 200');
  expect(dados!.aspectRatio).toBeCloseTo(1.6, 5);
  expect(dados!.tracados.map((t) => t.d)).toEqual(['M 0 0 L 3 4', 'M 0 10 L 30 10']);
  // Frações do ciclo: 5 unidades e depois 30 → 5/35 na fronteira.
  expect(dados!.tracados[0].inicio).toBe(0);
  expect(dados!.tracados[0].fim).toBeCloseTo(5 / 35, 5);
  expect(dados!.tracados[1].fim).toBeCloseTo(1, 5);
  // A base mantém os paths no lugar, mas invisíveis.
  expect(dados!.svgBase.match(/opacity="0"/g)).toHaveLength(2);
  // O path sem marcador fica intocado.
  expect(dados!.svgBase).toContain('<path d="M 0 0 L 100 0" stroke-width="1.5" />');
});

test('analisarSvgAnimado devolve null sem marcadores', () => {
  expect(analisarSvgAnimado('<svg viewBox="0 0 10 10"><path d="M 0 0 L 1 1" /></svg>')).toBeNull();
});

test('as ilustrações temporais do conteúdo real analisam com traçados válidos', () => {
  const conteudo = require('../../assets/generated/content.json');
  let marcadas = 0;
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo === 'ilustracao' && bloco.svg.includes('id="anima-')) {
            marcadas += 1;
            const dados = analisarSvgAnimado(bloco.svg);
            expect(dados).not.toBeNull();
            for (const t of dados!.tracados) {
              expect(t.comprimento).toBeGreaterThan(10);
            }
          }
        }
      }
    }
  }
  expect(marcadas).toBe(4);
});
