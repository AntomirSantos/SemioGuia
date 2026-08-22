import { mapearErroAuth } from './errosAuth';

test.each([
  ['auth/email-already-in-use', 'Este e-mail já está cadastrado.'],
  ['auth/weak-password', 'A senha precisa ter pelo menos 6 caracteres.'],
  ['auth/invalid-credential', 'E-mail ou senha incorretos.'],
  ['auth/invalid-email', 'E-mail inválido.'],
  ['auth/network-request-failed', 'Falha de conexão. Verifique sua internet e tente de novo.'],
  ['auth/requires-recent-login', 'Por segurança, entre novamente para concluir esta ação.'],
  ['auth/too-many-requests', 'Muitas tentativas seguidas. Aguarde um pouco e tente de novo.'],
])('mapearErroAuth(%s) retorna a mensagem pt-BR correspondente', (codigo, esperado) => {
  expect(mapearErroAuth(codigo)).toBe(esperado);
});

test('mapearErroAuth com código desconhecido retorna a mensagem genérica', () => {
  expect(mapearErroAuth('auth/algo-nao-mapeado')).toBe('Não foi possível completar a ação. Tente de novo.');
});

test('mapearErroAuth com string vazia retorna a mensagem genérica', () => {
  expect(mapearErroAuth('')).toBe('Não foi possível completar a ação. Tente de novo.');
});
