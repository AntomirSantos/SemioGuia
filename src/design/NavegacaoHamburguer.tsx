import { useEffect, useRef, useState, type ReactNode } from 'react';
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

// react-native não tipa `.focus()` em View/Pressable (é uma capacidade só do
// DOM, via react-native-web): este tipo mínimo isola o cast necessário para
// devolver/mover o foco de teclado ao abrir/fechar o menu, sem introduzir
// `any` solto pelo componente.
interface ElementoFocavel {
  focus?: () => void;
}

function focar(ref: React.RefObject<unknown>) {
  (ref.current as ElementoFocavel | null)?.focus?.();
}

/**
 * Navegação da versão web: substitui a barra de abas inferior (pensada para
 * toque nativo) por uma barra de topo com título + botão hambúrguer, que
 * abre um menu em overlay listando os mesmos 4 destinos das abas. O nativo
 * mantém as abas inferiores de sempre (ver (tabs)/_layout.tsx): este
 * componente só é montado quando Platform.OS === 'web'.
 *
 * Envolve `children` (o próprio Tabs) porque o overlay precisa de um
 * ancestral com a altura cheia da tela para se posicionar com
 * `position: 'absolute'`, um wrapper do tamanho só da barra de topo faria
 * o overlay ficar restrito à altura da barra.
 */
export function NavegacaoHamburguer({ children }: { children?: ReactNode }) {
  const { paleta, escala } = useTema();
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  const botaoMenuRef = useRef<View>(null);
  const primeiroItemRef = useRef<View>(null);
  const primeiraRenderizacao = useRef(true);

  // Move o foco de teclado para dentro do menu ao abrir e devolve ao botão
  // hambúrguer ao fechar, sem isso, Tab continuaria seguindo a ordem do
  // documento (conteúdo por trás do overlay) em vez de entrar no menu.
  // Ignorado na primeira renderização (menu começa fechado).
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    if (aberto) {
      focar(primeiroItemRef);
    } else {
      focar(botaoMenuRef);
    }
  }, [aberto]);

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
          // Regra editorial de 2.5px em tinta sob a barra de navegação
          // (identidade R2): mesma linguagem da tab bar nativa.
          borderBottomWidth: 2.5,
          borderBottomColor: paleta.tinta,
        }}
      >
        <Pressable
          ref={botaoMenuRef}
          testID="botaoHamburguer"
          accessibilityRole="button"
          accessibilityLabel={aberto ? 'Fechar menu' : 'Abrir menu'}
          accessibilityState={{ expanded: aberto }}
          aria-expanded={aberto}
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

      {/* `inert` não existe no tipo de View do react-native, mas o
          react-native-web encaminha a prop para o elemento DOM: impede que o
          conteúdo por trás do menu receba foco de teclado enquanto o overlay
          está aberto (aria-hidden sozinho não garante isso). Sem efeito no
          nativo: prop desconhecida, ignorada. */}
      <View
        testID="conteudoWeb"
        style={{ flex: 1 }}
        importantForAccessibility={aberto ? 'no-hide-descendants' : 'auto'}
        aria-hidden={aberto}
        {...({ inert: aberto || undefined } as { inert?: boolean })}
      >
        {children}
      </View>

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
            {ITENS.map(({ rota, titulo, Icone }, indice) => {
              const ativo = pathname === rota;
              return (
                <Pressable
                  key={rota}
                  ref={indice === 0 ? primeiroItemRef : undefined}
                  accessibilityRole="button"
                  accessibilityLabel={titulo}
                  accessibilityState={{ selected: ativo }}
                  aria-selected={ativo}
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
            accessibilityLabel="Fechar sobreposição"
            onPress={() => setAberto(false)}
            style={{ flex: 1, backgroundColor: veu }}
          />
        </View>
      )}
    </View>
  );
}
