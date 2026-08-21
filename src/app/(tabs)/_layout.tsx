import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { BookOpen, GraduationCap, Search, User } from 'lucide-react-native';
import { useTema } from '../../design/ThemeContext';
import { fonte, tipo } from '../../design/tokens';
import { NavegacaoHamburguer } from '../../design/NavegacaoHamburguer';

const TAMANHO_ICONE = 22;
const NA_WEB = Platform.OS === 'web';

export default function TabsLayout() {
  const { paleta } = useTema();

  const abas = (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: paleta.acento,
        tabBarInactiveTintColor: paleta.tinta2,
        // Na web a navegação vira barra de topo + hambúrguer (ver
        // NavegacaoHamburguer); a barra de abas nativa some sem afetar o
        // roteamento, que continua o mesmo Tabs de sempre.
        tabBarStyle: NA_WEB
          ? { display: 'none' }
          : {
              backgroundColor: paleta.superficie,
              borderTopColor: paleta.linha,
            },
        tabBarLabelStyle: {
          fontFamily: fonte.corpoBold,
          fontSize: tipo.tag + 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Guia',
          tabBarIcon: ({ color }) => <BookOpen size={TAMANHO_ICONE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="busca"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <Search size={TAMANHO_ICONE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="estudar"
        options={{
          title: 'Estudar',
          tabBarIcon: ({ color }) => <GraduationCap size={TAMANHO_ICONE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User size={TAMANHO_ICONE} color={color} />,
        }}
      />
    </Tabs>
  );

  if (!NA_WEB) return abas;

  return <NavegacaoHamburguer>{abas}</NavegacaoHamburguer>;
}
