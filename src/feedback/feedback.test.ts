import { montarContextoTexto, montarUrlFormulario } from './feedback';
import type { ConfigFeedback } from '../config/feedback';

const CONFIG: ConfigFeedback = {
  urlBase: 'https://docs.google.com/forms/d/e/ABC123/viewform',
  campos: { categoria: 'entry.11', texto: 'entry.22', contexto: 'entry.33' },
};

test('montarContextoTexto junta tópico, versão e plataforma', () => {
  expect(montarContextoTexto({ topicoId: 'a/b/c', versao: '1.1.0', plataforma: 'web' })).toBe(
    'tópico: a/b/c · versão: 1.1.0 · plataforma: web',
  );
  expect(montarContextoTexto({ topicoId: '', versao: '1.1.0', plataforma: 'ios' })).toBe(
    'fora de tópico · versão: 1.1.0 · plataforma: ios',
  );
});

test('montarUrlFormulario pré-preenche o Google Forms com os entry ids configurados', () => {
  const url = montarUrlFormulario(CONFIG, {
    categoria: 'Erro no conteúdo',
    texto: 'RV+ do sinal X parece trocada',
    contexto: { topicoId: 'a/b/c', versao: '1.1.0', plataforma: 'web' },
  });
  expect(url.startsWith('https://docs.google.com/forms/d/e/ABC123/viewform?usp=pp_url&')).toBe(true);
  expect(url).toContain(`entry.11=${encodeURIComponent('Erro no conteúdo')}`);
  expect(url).toContain(`entry.22=${encodeURIComponent('RV+ do sinal X parece trocada')}`);
  expect(url).toContain(`entry.33=${encodeURIComponent('tópico: a/b/c · versão: 1.1.0 · plataforma: web')}`);
});
