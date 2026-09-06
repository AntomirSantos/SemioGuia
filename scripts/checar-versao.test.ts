import { checarVersao, lerEstado } from './checar-versao';

test('o repositório está com a versão e a configuração de loja consistentes', () => {
  expect(checarVersao()).toEqual([]);
});

test('acusa divergência entre app.json e versao.ts', () => {
  const problemas = checarVersao({
    versaoApp: '1.2.31',
    versaoAppJson: '1.0.0',
    versionCode: 1,
    pacoteAndroid: 'br.com.semioguia.app',
  });
  expect(problemas).toHaveLength(1);
  expect(problemas[0]).toContain('1.0.0');
});

test('acusa pacote ausente e versionCode inválido', () => {
  const problemas = checarVersao({
    versaoApp: '1.2.31',
    versaoAppJson: '1.2.31',
    versionCode: 0,
    pacoteAndroid: undefined,
  });
  expect(problemas).toHaveLength(2);
});

test('o estado lido do repositório traz pacote e versionCode', () => {
  const e = lerEstado();
  expect(e.pacoteAndroid).toBe('br.com.semioguia.app');
  expect(typeof e.versionCode).toBe('number');
});
