import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../../design/Tela';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { obterIcone } from '../../design/icones';
import { useConteudo } from '../../content/ContentContext';
import { listarSistemas } from '../../content/store';
import type { Sistema } from '../../content/schema';

function contarTopicos(sistema: Sistema): number {
  return sistema.capitulos.reduce((total, capitulo) => total + capitulo.topicos.length, 0);
}

function CartaoSistema({ sistema }: { sistema: Sistema }) {
  const { paleta, escala } = useTema();
  const Icone = obterIcone(sistema.icone);
  const totalTopicos = contarTopicos(sistema);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/sistema/${sistema.id}`)}
      style={{
        width: '48%',
        backgroundColor: `${sistema.cor}24`,
        borderRadius: raio.l,
        padding: espaco.l,
        marginBottom: espaco.m,
        minHeight: 132,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: raio.m,
          backgroundColor: paleta.superficie,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: espaco.m,
        }}
      >
        <Icone size={22} color={sistema.cor} />
      </View>
      <Text
        style={{ fontFamily: fonte.displaySemi, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.xs }}
        numberOfLines={2}
      >
        {sistema.titulo}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
        {totalTopicos} {totalTopicos === 1 ? 'tópico' : 'tópicos'}
      </Text>
    </Pressable>
  );
}

export default function Guia() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const sistemas = listarSistemas(conteudo);

  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h1 * escala), color: paleta.tinta, marginBottom: espaco.xl }}>
        SemioGuia
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {sistemas.map((sistema) => (
          <CartaoSistema key={sistema.id} sistema={sistema} />
        ))}
      </View>
    </Tela>
  );
}
