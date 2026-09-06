import type { ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import type { GrupoDeEstudo } from './listas';

// Peças de tela compartilhadas por Questões e Casos, na mesma gramática do
// modo plantão: campo de busca, contador, grupos por sistema com a barra de
// cor e linhas que abrem no lugar. Ficam aqui para que as duas telas não
// divirjam com o tempo.

export function CampoDeBusca({
  termo,
  onChange,
  placeholder,
  rotulo,
}: {
  termo: string;
  onChange: (t: string) => void;
  placeholder: string;
  rotulo: string;
}) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        borderRadius: raio.l,
        backgroundColor: paleta.superficie2,
        paddingHorizontal: espaco.m,
        marginBottom: espaco.s,
      }}
    >
      <Search size={18} color={paleta.tinta2} />
      <TextInput
        value={termo}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={paleta.tinta2}
        autoFocus={false}
        accessibilityLabel={rotulo}
        style={{
          flex: 1,
          marginLeft: espaco.s,
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta,
          paddingVertical: espaco.s,
        }}
      />
    </View>
  );
}

export function LinhaExpansivel({
  titulo,
  subtitulo,
  aberto,
  onToggle,
  children,
}: {
  titulo: string;
  subtitulo: string;
  aberto: boolean;
  onToggle: () => void;
  children?: ReactNode;
}) {
  const { paleta, escala } = useTema();
  const Chevron = aberto ? ChevronUp : ChevronDown;
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: paleta.linha }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        accessibilityLabel={`${titulo}, ${aberto ? 'recolher' : 'abrir'}`}
        onPress={onToggle}
        style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: espaco.s }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonte.leituraSemi, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
            {titulo}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 1 }}
          >
            {subtitulo}
          </Text>
        </View>
        <Chevron size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
      {aberto ? children : null}
    </View>
  );
}

/** Botão de texto do verbete aberto (a mesma affordance do plantão). */
export function AcaoDoVerbete({ texto, onPress, principal = false }: { texto: string; onPress: () => void; principal?: boolean }) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={onPress}
      style={{ minHeight: 44, justifyContent: 'center', marginTop: espaco.s }}
    >
      <Text
        style={{
          fontFamily: principal ? fonte.corpoBold : fonte.corpoBold,
          fontSize: Math.round(tipo.small * escala),
          color: principal ? paleta.acento : paleta.tinta,
        }}
      >
        {texto}
      </Text>
    </Pressionavel>
  );
}

export function GruposPorSistema<T>({
  grupos,
  chave,
  renderItem,
}: {
  grupos: GrupoDeEstudo<T>[];
  chave: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}) {
  const { paleta } = useTema();
  return (
    <>
      {grupos.map((grupo) => (
        <View key={grupo.sistemaTitulo} style={{ marginBottom: espaco.l }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
            <View style={{ width: 8, height: 18, backgroundColor: grupo.sistemaCor, marginRight: espaco.m }} />
            <Rotulo texto={grupo.sistemaTitulo} cor={paleta.tinta2} />
          </View>
          {grupo.itens.map((item) => (
            <View key={chave(item)}>{renderItem(item)}</View>
          ))}
        </View>
      ))}
    </>
  );
}
