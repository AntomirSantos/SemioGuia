import { Text, View, type TextStyle } from 'react-native';
import { useTema } from './ThemeContext';
import { fonte, tipo, espaco } from './tokens';
import { RegraAnimada } from './movimento';

// Eyebrow/rótulo compartilhado: uppercase, Public Sans forte, letterSpacing
// largo: a voz de UI da identidade editorial. Usado em títulos de seção e
// badges de contexto (sistema · capítulo, "Referências", progresso do quiz
// etc.). Não escala com a preferência de fonte: é rótulo, não texto de
// leitura. Cor padrão: tinta (regras/rotulagem em tinta; o acento vinho fica
// para estados e marca, nunca vira a cor "de tudo").
export function Rotulo({ texto, cor, style }: { texto: string; cor?: string; style?: TextStyle }) {
  const { paleta } = useTema();
  return (
    <Text
      style={[
        {
          fontFamily: fonte.corpoForte,
          fontSize: tipo.tag,
          letterSpacing: 1.3,
          textTransform: 'uppercase',
          color: cor ?? paleta.tinta,
        },
        style,
      ]}
    >
      {texto}
    </Text>
  );
}

// Rótulo de seção com a regra editorial de 2.5px em tinta acima: a
// assinatura visual da identidade R2 ("separação por regras, não por
// sombras"). A regra se desenha na montagem (300ms, scaleX da esquerda);
// com movimento reduzido, já aparece pronta.
export function RotuloDeSecao({ texto, style }: { texto: string; style?: TextStyle }) {
  const { paleta } = useTema();
  return (
    <View style={{ marginBottom: espaco.s }}>
      <RegraAnimada cor={paleta.tinta} />
      <Rotulo texto={texto} style={{ paddingTop: espaco.s, ...style }} />
    </View>
  );
}
