import type { ReactNode } from 'react';
import { Text, type TextStyle } from 'react-native';
import { fonte } from '../design/tokens';

// Itálico dentro de um segmento sem negrito: `*a* b *c*` → nós de texto com
// `fontStyle: 'italic'` intercalados com texto plano. Só reconhece pares de
// asterisco único (o negrito já foi retirado por quem chama); marcador sem
// par fecha (ex.: "3*4" sem segundo `*`) permanece texto literal.
function renderizarItalico(texto: string, chavePrefixo: string): ReactNode[] {
  return texto.split(/(\*[^*]+\*)/).map((parte, k) =>
    parte.length > 2 && parte.startsWith('*') && parte.endsWith('*') ? (
      <Text key={`${chavePrefixo}-i${k}`} style={{ fontStyle: 'italic' }}>
        {parte.slice(1, -1)}
      </Text>
    ) : (
      parte
    ),
  );
}

// Negrito (`**a**`) primeiro, depois itálico (`*a*`) dentro de cada pedaço
// que sobra — cobre negrito sozinho, itálico sozinho, e os dois lado a lado
// no mesmo parágrafo ("**importante** mas *sutil*"). NÃO cobre aninhamento
// de verdade (um marcador inteiro dentro do outro, ex. "**a *b* c**"): o
// regex de negrito exige conteúdo sem nenhum asterisco solto no meio, então
// um asterisco de itálico ali dentro quebra o casamento do negrito e o
// resultado degrada. Escopo deliberado — checado via grep em `content/`: o
// itálico real do corpus é sempre uma palavra/frase isolada, nunca aninhada
// dentro de negrito.
function renderizarInline(texto: string, chavePrefixo: string): ReactNode[] {
  return texto.split(/(\*\*[^*]+\*\*)/).flatMap((seg, j) => {
    const chave = `${chavePrefixo}-${j}`;
    if (seg.length > 4 && seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <Text key={chave} style={{ fontFamily: fonte.leituraSemi }}>
          {renderizarItalico(seg.slice(2, -2), chave)}
        </Text>
      );
    }
    return renderizarItalico(seg, chave);
  });
}

// converte "a **b** c" / "a *b* c" em segmentos com negrito/itálico;
// parágrafos separados por \n\n.
//
// Voz de LEITURA da identidade editorial: Source Serif 4 (400 no corpo, 600
// no negrito) — a UI usa Public Sans, mas a prosa dos tópicos é serifada.
// Line-height de leitura confortável (DECISAO.md: 1.6–1.65): quando `style`
// traz um `fontSize` numérico e não define seu próprio `lineHeight`,
// aplicamos 1.62× por padrão — sem exigir que cada bloco repita a conta. Um
// `lineHeight` explícito em `style` continua vencendo (é o último item do
// array).
export function TextoRico({ children, style }: { children: string; style?: TextStyle }) {
  const paragrafos = children.trim().split(/\n{2,}/);
  const tamanho = typeof style?.fontSize === 'number' ? style.fontSize : undefined;
  const lineHeightPadrao = tamanho && style?.lineHeight === undefined ? Math.round(tamanho * 1.62) : undefined;
  return (
    <>
      {paragrafos.map((p, i) => (
        <Text key={i} style={[{ fontFamily: fonte.leitura, marginTop: i ? 8 : 0, lineHeight: lineHeightPadrao }, style]}>
          {renderizarInline(p, `${i}`)}
        </Text>
      ))}
    </>
  );
}
