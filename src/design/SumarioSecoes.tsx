import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { useTema } from './ThemeContext';
import { useReducedMotion } from './useReducedMotion';
import { espaco, fonte, raio, tipo } from './tokens';

export interface ResumoSecao {
  titulo: string;
}

// Colchão (px) para considerar a chip "visível o bastante" — evita recentrar
// por causa de 1-2px colados na borda.
const MARGEM_VISIVEL = espaco.s;

// Sumário horizontal fixo sob o título do tópico (spec Fase 8 §3.1): uma
// chip por seção, papel de aba (`tab`) com `selected` no estado ativo —
// leitores de tela anunciam "aba, selecionada" ao focar a seção corrente.
// A cor do sistema tinge fundo/borda da chip ativa; o texto permanece em
// `paleta.tinta` (já verificado no gate de contraste) em vez da cor do
// sistema, que é arbitrária por conteúdo e não tem contraste garantido em
// todos os tons — mesma escolha já usada nos cartões de sistema da home.
export function SumarioSecoes({
  secoes,
  ativa,
  cor,
  onSelecionar,
}: {
  secoes: ResumoSecao[];
  ativa: number;
  cor?: string;
  onSelecionar: (indice: number) => void;
}) {
  const { paleta } = useTema();
  const reduzido = useReducedMotion();
  const acento = cor ?? paleta.acento;

  const scrollRef = useRef<ScrollView>(null);
  const layoutsRef = useRef<Array<{ x: number; width: number } | undefined>>([]);
  const scrollXRef = useRef(0);
  const [larguraVisivel, setLarguraVisivel] = useState(0);

  // T1 review (P1): rola a chip ativa para dentro da área visível quando a
  // troca vem de "Anterior/Próxima seção" (chip pode estar fora da tela).
  // Fica passivo — não mexe no scroll — quando a chip já está visível, o
  // que cobre automaticamente o toque direto numa chip (só dá para tocar no
  // que já está visível). Instantâneo com movimento reduzido.
  useEffect(() => {
    const layout = layoutsRef.current[ativa];
    if (!layout || !larguraVisivel) return;
    const inicioVisivel = scrollXRef.current;
    const fimVisivel = scrollXRef.current + larguraVisivel;
    const jaVisivel = layout.x >= inicioVisivel + MARGEM_VISIVEL && layout.x + layout.width <= fimVisivel - MARGEM_VISIVEL;
    if (jaVisivel) return;
    const alvo = Math.max(0, layout.x - larguraVisivel / 2 + layout.width / 2);
    // `reduzido` é `boolean | null` (spec A7): só anima quando já sabemos
    // que NÃO foi pedido movimento reduzido — `null` (ainda resolvendo) e
    // `true` caem no mesmo lado seguro, instantâneo.
    scrollRef.current?.scrollTo({ x: alvo, animated: reduzido === false });
  }, [ativa, larguraVisivel, reduzido]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      style={{ marginBottom: espaco.m }}
      contentContainerStyle={{ paddingRight: espaco.l }}
      onLayout={(e: LayoutChangeEvent) => setLarguraVisivel(e.nativeEvent.layout.width)}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollXRef.current = e.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={32}
    >
      {secoes.map((secao, i) => {
        const selecionada = i === ativa;
        return (
          <Pressable
            key={`${secao.titulo}-${i}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionada }}
            accessibilityLabel={secao.titulo}
            onPress={() => onSelecionar(i)}
            onLayout={(e: LayoutChangeEvent) => {
              layoutsRef.current[i] = { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width };
            }}
            style={{
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: espaco.l,
              marginRight: espaco.s,
              borderRadius: raio.pill,
              borderWidth: 1.5,
              borderColor: selecionada ? acento : paleta.linha,
              backgroundColor: selecionada ? `${acento}1f` : paleta.superficie2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: tipo.small,
                color: selecionada ? paleta.tinta : paleta.tinta2,
              }}
            >
              {secao.titulo}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
