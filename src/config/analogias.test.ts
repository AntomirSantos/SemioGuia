import { IMAGENS_DO_GUIA } from './analogias';
import conteudo from '../../assets/generated/content.json';

// O glossário é curadoria manual: este teste garante que ele não aponte
// para tópicos que não existem (ou que mudaram de id) no conteúdo compilado.
test('toda imagem do guia aponta para um tópico existente', () => {
  const ids = new Set<string>();
  for (const sistema of (conteudo as { sistemas: { capitulos: { topicos: { id: string }[] }[] }[] }).sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) ids.add(topico.id);
    }
  }
  for (const img of IMAGENS_DO_GUIA) {
    expect(ids.has(img.topicoId)).toBe(true);
  }
});

test('nomes e descrições não ficam vazios nem repetidos', () => {
  const nomes = IMAGENS_DO_GUIA.map((i) => i.nome);
  expect(new Set(nomes).size).toBe(nomes.length);
  for (const img of IMAGENS_DO_GUIA) {
    expect(img.nome.length).toBeGreaterThan(3);
    expect(img.descricao.length).toBeGreaterThan(20);
  }
});
