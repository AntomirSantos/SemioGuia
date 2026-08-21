import { useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import { BookOpen, GraduationCap, Menu, Search, User, type LucideIcon } from 'lucide-react-native';
import { useTema } from './ThemeContext';
import { espaco, fonte, raio, tipo, veu } from './tokens';

const TAMANHO_ICONE = 22;
const LARGURA_GAVETA = 260;

interface ItemNav {
  rota: '/' | '/busca' | '/estudar' | '/perfil';
  titulo: string;
  Icone: LucideIcon;
}

const ITENS: ItemNav[] = [
  { rota: '/', titulo: 'Guia', Icone: BookOpen },
  { rota: '/busca', titulo: 'Busca', Icone: Search },
  { rota: '/estudar', titulo: 'Estudar', Icone: GraduationCap },
  { rota: '/perfil', titulo: 'Perfil', Icone: User },
];

/**
 * Navegação da versão web: substitui a barra de abas inferior (pensada para
 * toque nativo) por uma barra de topo com título + botão hambúrguer, que
 * abre um menu em overlay listando os mesmos 4 destinos das abas. O nativo
 * mantém as abas inferiores de sempre (ver (tabs)/_layout.tsx) — este
 * componente só é montado quando Platform.OS === 'web'.
 *
 * Envolve `children` (o próprio Tabs) porque o overlay precisa de um
 * ancestral com a altura cheia da tela para se posicionar com
 * `position: 'absolute'` — um wrapper do tamanho só da barra de topo faria
 * o overlay ficar restrito à altura da barra.
 */
export function NavegacaoHamburguer({ children }: { children?: ReactNode }) {
  const { paleta, escala } = useTema();
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  function navegar(rota: ItemNav['rota']) {
    setAberto(false);
    router.push(rota);
  }

  return (
    <View style={{ flex: 1, backgroundColor: paleta.fundo }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 56,
          paddingHorizontal: espaco.l,
          backgroundColor: paleta.superficie,
          borderBottomWidth: 1,
          borderBottomColor: paleta.linha,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
          accessibilityState={{ expanded: aberto }}
          onPress={() => setAberto((v) => !v)}
          hitSlop={8}
          style={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: espaco.s,
          }}
        >
          <Menu size={TAMANHO_ICONE} color={paleta.tinta} />
        </Pressable>
        <Text
          style={{
            fontFamily: fonte.display,
            fontSize: Math.round(tipo.h3 * escala),
            color: paleta.tinta,
          }}
        >
          SemioGuia
        </Text>
      </View>

      <View style={{ flex: 1 }}>{children}</View>

      {aberto && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            zIndex: 20,
          }}
        >
          <View
            style={{
              width: LARGURA_GAVETA,
              backgroundColor: paleta.superficie,
              borderRightWidth: 1,
              borderRightColor: paleta.linha,
              paddingTop: espaco.m,
            }}
          >
            {ITENS.map(({ rota, titulo, Icone }) => {
              const ativo = pathname === rota;
              return (
                <Pressable
                  key={rota}
                  accessibilityRole="button"
                  accessibilityLabel={titulo}
                  accessibilityState={{ selected: ativo }}
                  onPress={() => navegar(rota)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: espaco.m,
                    paddingHorizontal: espaco.l,
                    borderRadius: raio.m,
                    marginHorizontal: espaco.s,
                    backgroundColor: ativo ? paleta.superficie2 : 'transparent',
                  }}
                >
                  <Icone size={TAMANHO_ICONE} color={ativo ? paleta.acento : paleta.tinta2} />
                  <Text
                    style={{
                      marginLeft: espaco.m,
                      fontFamily: ativo ? fonte.corpoBold : fonte.corpo,
                      fontSize: Math.round(tipo.corpo * escala),
                      color: ativo ? paleta.acento : paleta.tinta,
                    }}
                  >
                    {titulo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar menu"
            onPress={() => setAberto(false)}
            style={{ flex: 1, backgroundColor: veu }}
          />
        </View>
      )}
    </View>
  );
}
