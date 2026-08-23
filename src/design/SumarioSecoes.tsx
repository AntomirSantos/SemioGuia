import { Pressable, ScrollView, Text } from 'react-native';
import { useTema } from './ThemeContext';
import { espaco, fonte, raio, tipo } from './tokens';

export interface ResumoSecao {
  titulo: string;
}

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
  const acento = cor ?? paleta.acento;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      style={{ marginBottom: espaco.m }}
      contentContainerStyle={{ paddingRight: espaco.l }}
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
