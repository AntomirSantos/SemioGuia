import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Tela } from '../../design/Tela';
import { useTema, type EscalaFonte, type PreferenciaTema } from '../../design/ThemeContext';
import { Rotulo } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo } from '../../content/ContentContext';
import { listarSistemas, listarTodosTopicos } from '../../content/store';
import { useProgresso } from '../../progress/ProgressContext';
import { useSync } from '../../sync/orquestrador';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { montarFila } from '../../revisao/fila';
import { idsValidosDoConteudo } from '../../revisao/idsValidos';
import { hojeLocal } from '../../revisao/hoje';
import { BlocoConta } from '../../conta/BlocoConta';

const AVISO_LEGAL = 'Material educacional. Não substitui o julgamento clínico.';

function RotuloSecao({ children }: { children: string }) {
  return <Rotulo texto={children} style={{ marginBottom: espaco.s }} />;
}

function BarraProgresso({ estudados, total, titulo }: { estudados: number; total: number; titulo: string }) {
  const { paleta, escala } = useTema();
  const percentual = total > 0 ? Math.round((estudados / total) * 100) : 0;
  return (
    <View style={{ marginBottom: espaco.l }}>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta,
          marginBottom: espaco.xs,
        }}
      >
        {titulo}
      </Text>
      <View
        style={{
          height: 8,
          borderRadius: raio.pill,
          backgroundColor: paleta.superficie2,
          overflow: 'hidden',
          marginBottom: espaco.xs,
        }}
      >
        <View
          style={{
            width: `${percentual}%`,
            height: '100%',
            borderRadius: raio.pill,
            backgroundColor: paleta.acento,
          }}
        />
      </View>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
        {estudados} de {total} tópicos
      </Text>
    </View>
  );
}

function Segmento<T extends string>({
  valor,
  rotulo,
  selecionado,
  onSelecionar,
}: {
  valor: T;
  rotulo: string;
  selecionado: boolean;
  onSelecionar: (valor: T) => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: selecionado }}
      onPress={() => onSelecionar(valor)}
      style={{
        flex: 1,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: espaco.s,
        borderRadius: raio.m,
        backgroundColor: selecionado ? paleta.acento : 'transparent',
      }}
    >
      <Text
        style={{
          fontFamily: selecionado ? fonte.corpoBold : fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          color: selecionado ? paleta.superficie : paleta.tinta,
        }}
      >
        {rotulo}
      </Text>
    </Pressable>
  );
}

function SeletorSegmentado<T extends string>({
  opcoes,
  valorAtual,
  onSelecionar,
}: {
  opcoes: { valor: T; rotulo: string }[];
  valorAtual: T;
  onSelecionar: (valor: T) => void;
}) {
  const { paleta } = useTema();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: paleta.superficie2,
        borderRadius: raio.m,
        padding: espaco.xs,
        gap: espaco.xs,
      }}
    >
      {opcoes.map((opcao) => (
        <Segmento
          key={opcao.valor}
          valor={opcao.valor}
          rotulo={opcao.rotulo}
          selecionado={valorAtual === opcao.valor}
          onSelecionar={onSelecionar}
        />
      ))}
    </View>
  );
}

const OPCOES_TEMA: { valor: PreferenciaTema; rotulo: string }[] = [
  { valor: 'sistema', rotulo: 'Sistema' },
  { valor: 'claro', rotulo: 'Claro' },
  { valor: 'escuro', rotulo: 'Escuro' },
];

const OPCOES_FONTE: { valor: EscalaFonte; rotulo: string }[] = [
  { valor: 'normal', rotulo: 'Normal' },
  { valor: 'grande', rotulo: 'Grande' },
];

export function TelaPerfil() {
  const { paleta, escala, preferencia, definirPreferencia, escalaFonte, definirEscalaFonte } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();
  const carregarEstudados = useCallback(() => progresso.listarEstudados(), [progresso]);
  const estudados = useDadosAoFocar(carregarEstudados) ?? [];

  const carregarRevisao = useCallback(async () => {
    const hoje = hojeLocal();
    const idsValidos = idsValidosDoConteudo(conteudo);
    const itens = await progresso.listarItensRevisao();
    const validos = itens.filter((i) => idsValidos.has(i.id));
    const paraRevisarHoje = montarFila(itens, idsValidos, hoje).itens.length;
    const emDia = validos.filter((i) => i.proximaRevisao > hoje).length;
    return { paraRevisarHoje, emDia };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progresso, conteudo]);
  const revisao = useDadosAoFocar(carregarRevisao) ?? { paraRevisarHoje: 0, emDia: 0 };

  const sistemas = listarSistemas(conteudo);
  const estudadosSet = new Set(estudados);

  const referencias = Array.from(
    new Set(listarTodosTopicos(conteudo).flatMap((t) => t.referencias)),
  ).sort((a, b) => a.localeCompare(b));

  function selecionarTema(valor: PreferenciaTema) {
    definirPreferencia(valor);
    // Spec §3.2, 4º gatilho: notifica após a escrita de progresso, com debounce.
    progresso.definirPreferencia('tema', valor).catch(() => {}).finally(() => notificarEscrita());
  }

  function selecionarFonte(valor: EscalaFonte) {
    definirEscalaFonte(valor);
    progresso.definirPreferencia('fonte', valor).catch(() => {}).finally(() => notificarEscrita());
  }

  return (
    <Tela>
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h1 * escala),
          color: paleta.tinta,
          marginBottom: espaco.l,
        }}
      >
        Perfil
      </Text>

      <RotuloSecao>Progresso</RotuloSecao>
      <View style={{ marginBottom: espaco.l }}>
        {sistemas.map((s) => {
          const topicosDoSistema = s.capitulos.flatMap((k) => k.topicos);
          const total = topicosDoSistema.length;
          const estudadosCount = topicosDoSistema.filter((t) => estudadosSet.has(t.id)).length;
          return (
            <BarraProgresso key={s.id} titulo={s.titulo} estudados={estudadosCount} total={total} />
          );
        })}
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: espaco.xs }}>
          Para revisar hoje: {revisao.paraRevisarHoje}
        </Text>
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
          Itens em dia: {revisao.emDia}
        </Text>
      </View>

      <BlocoConta />

      <RotuloSecao>Aparência</RotuloSecao>
      <View style={{ marginBottom: espaco.m }}>
        <SeletorSegmentado opcoes={OPCOES_TEMA} valorAtual={preferencia} onSelecionar={selecionarTema} />
      </View>
      <View style={{ marginBottom: espaco.l }}>
        <SeletorSegmentado opcoes={OPCOES_FONTE} valorAtual={escalaFonte} onSelecionar={selecionarFonte} />
      </View>

      <RotuloSecao>Bibliografia</RotuloSecao>
      <View style={{ marginBottom: espaco.l }}>
        {referencias.map((ref) => (
          <Text
            key={ref}
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.small * escala),
              color: paleta.tinta2,
              marginBottom: espaco.xs,
            }}
          >
            {ref}
          </Text>
        ))}
      </View>

      <RotuloSecao>Sobre</RotuloSecao>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta,
          marginBottom: espaco.xs,
        }}
      >
        Versão do conteúdo: {conteudo.versao}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
        {AVISO_LEGAL}
      </Text>
    </Tela>
  );
}

export default function Perfil() {
  return <TelaPerfil />;
}
