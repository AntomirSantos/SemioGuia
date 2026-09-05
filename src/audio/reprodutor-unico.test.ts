import {
  DURACAO_MAX_DE_SOM_MS,
  assumirReproducao,
  detentorAtual,
  encerrarReproducao,
} from './reprodutor-unico';

// O coordenador garante as duas regras da ausculta: um som por vez em todo
// o app, e nenhum detentor fantasma depois de pausar ou desmontar.

test('assumir a reprodução para o detentor anterior', () => {
  const pararA = jest.fn();
  const pararB = jest.fn();
  const a = { current: pararA };
  const b = { current: pararB };

  assumirReproducao(a);
  expect(pararA).not.toHaveBeenCalled();

  assumirReproducao(b);
  expect(pararA).toHaveBeenCalledTimes(1);
  expect(pararB).not.toHaveBeenCalled();
  expect(detentorAtual()).toBe(b);

  encerrarReproducao(b);
});

test('reassumir sendo o mesmo detentor não para nada', () => {
  const parar = jest.fn();
  const a = { current: parar };
  assumirReproducao(a);
  assumirReproducao(a);
  expect(parar).not.toHaveBeenCalled();
  encerrarReproducao(a);
});

test('encerrar libera a vez apenas do próprio detentor', () => {
  const a = { current: jest.fn() };
  const b = { current: jest.fn() };
  assumirReproducao(a);
  encerrarReproducao(b);
  expect(detentorAtual()).toBe(a);
  encerrarReproducao(a);
  expect(detentorAtual()).toBeNull();
});

test('o limite por clique fica em torno de 10 segundos', () => {
  expect(DURACAO_MAX_DE_SOM_MS).toBe(10_000);
});
