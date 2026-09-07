import type { Conteudo } from '../content/schema';
import { entitlementDoSistema, sistemaDoTopicoId } from './entitlements';

// Quanto de acervo está de cada lado da linha. A tela de assinatura precisa
// dizer números honestos, e números escritos à mão envelhecem a cada tópico
// novo: aqui eles saem do conteúdo compilado, sempre certos.

export interface ContagemDoAcervo {
  sistemas: number;
  topicos: number;
  casos: number;
  checklists: number;
  verbetes: number;
}

const VAZIO: ContagemDoAcervo = { sistemas: 0, topicos: 0, casos: 0, checklists: 0, verbetes: 0 };

function contar(conteudo: Conteudo, querido: 'gratuito' | 'premium'): ContagemDoAcervo {
  const c = { ...VAZIO };
  const sistemaDoTopico = new Map<string, string>();
  for (const sistema of conteudo.sistemas) {
    const desteLado = entitlementDoSistema(sistema.id) === querido;
    if (desteLado) c.sistemas += 1;
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        sistemaDoTopico.set(topico.id, sistema.id);
        if (!desteLado) continue;
        c.topicos += 1;
        for (const bloco of topico.blocos) {
          if (bloco.tipo === 'checklist') c.checklists += 1;
          else if (bloco.tipo === 'sinal') c.verbetes += 1;
        }
      }
    }
  }
  for (const caso of conteudo.casos) {
    const sistemaId = sistemaDoTopico.get(caso.topicosDeApoio[0] ?? '') ?? '';
    // Caso órfão conta como gratuito, a mesma regra de `acessoLiberado`.
    const lado = sistemaId === '' ? 'gratuito' : entitlementDoSistema(sistemaId);
    if (lado === querido) c.casos += 1;
  }
  return c;
}

/** O que qualquer pessoa abre sem pagar nada. */
export function acervoGratuito(conteudo: Conteudo): ContagemDoAcervo {
  return contar(conteudo, 'gratuito');
}

/** O que a assinatura anual acrescenta ao gratuito. */
export function acervoDaAssinatura(conteudo: Conteudo): ContagemDoAcervo {
  return contar(conteudo, 'premium');
}
