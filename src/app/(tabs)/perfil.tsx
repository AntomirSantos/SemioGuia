import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Tela } from '../../design/Tela';
import { useTema, type EscalaFonte, type PreferenciaTema } from '../../design/ThemeContext';
import { Rotulo, RotuloDeSecao } from '../../design/Rotulo';
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
import { exportarEventos } from '../../analytics/analytics';
import { compartilharJson } from '../../analytics/compartilhar';
import { analisarDataProva, formatarDataProva } from '../../plano/plano';
import { FolhaFeedback } from '../../feedback/FolhaFeedback';
import { VERSAO_APP } from '../../config/versao';
import { IMAGENS_DO_GUIA } from '../../config/analogias';
import { router } from 'expo-router';

const AVISO_LEGAL = 'Material educacional. Não substitui o julgamento clínico.';

function RotuloSecao({ children }: { children: string }) {
  return <RotuloDeSecao texto={children} />;
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

  // Data da prova (beta §9.2): mesma preferência gravada pelo onboarding;
  // aqui ela é editável a qualquer momento. Entrada em DD/MM/AAAA; salvar
  // vazio limpa a data (o cartão do plano some da home).
  const carregarDataProva = useCallback(() => progresso.obterPreferencia('dataProva'), [progresso]);
  const dataProvaGravada = useDadosAoFocar(carregarDataProva);
  const [entradaProva, setEntradaProva] = useState('');
  const [editouProva, setEditouProva] = useState(false);
  const [erroProva, setErroProva] = useState(false);
  const [provaSalva, setProvaSalva] = useState(false);
  const [feedbackAberto, setFeedbackAberto] = useState(false);
  useEffect(() => {
    if (!editouProva && typeof dataProvaGravada === 'string' && dataProvaGravada) {
      setEntradaProva(formatarDataProva(dataProvaGravada));
    }
  }, [dataProvaGravada, editouProva]);

  function salvarDataProva() {
    const bruto = entradaProva.trim();
    const iso = bruto ? analisarDataProva(bruto) : '';
    if (iso === null) {
      setErroProva(true);
      setProvaSalva(false);
      return;
    }
    setErroProva(false);
    progresso
      .definirPreferencia('dataProva', iso)
      .then(() => setProvaSalva(true))
      .catch(() => {})
      .finally(() => notificarEscrita());
  }

  // Beta §4: os eventos de uso ficam no aparelho; este botão gera o JSON e
  // abre a folha de compartilhamento (ou baixa o arquivo, na web sem
  // Web Share API). Falhas, incluindo o cancelamento da folha, são
  // silenciosas: nada aqui pode quebrar o Perfil.
  async function exportarDadosDeUso() {
    try {
      const json = await exportarEventos();
      await compartilharJson(json);
    } catch {
      // silencioso, ver comentário acima
    }
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

      <RotuloSecao>Prova</RotuloSecao>
      <View style={{ marginBottom: espaco.l }}>
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: espaco.xs }}>
          Com a data da prova, a home mostra os dias restantes e o ritmo de estudo. Deixe vazio
          para remover.
        </Text>
        <View style={{ flexDirection: 'row', gap: espaco.s }}>
          <TextInput
            value={entradaProva}
            onChangeText={(t) => {
              setEntradaProva(t);
              setEditouProva(true);
              setErroProva(false);
              setProvaSalva(false);
            }}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={paleta.tinta2}
            accessibilityLabel="Data da prova"
            style={{
              flex: 1,
              minHeight: 44,
              borderRadius: raio.m,
              backgroundColor: paleta.superficie2,
              paddingHorizontal: espaco.m,
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
            }}
          />
          <Pressable
            accessibilityRole="button"
            onPress={salvarDataProva}
            style={{
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: espaco.l,
              borderRadius: raio.m,
              backgroundColor: paleta.superficie2,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
              Salvar
            </Text>
          </Pressable>
        </View>
        {erroProva ? (
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta, marginTop: espaco.xs }}>
            Data inválida: use o formato DD/MM/AAAA.
          </Text>
        ) : null}
        {provaSalva ? (
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginTop: espaco.xs }}>
            Data da prova salva.
          </Text>
        ) : null}
      </View>

      <BlocoConta />

      <RotuloSecao>Aparência</RotuloSecao>
      <View style={{ marginBottom: espaco.m }}>
        <SeletorSegmentado opcoes={OPCOES_TEMA} valorAtual={preferencia} onSelecionar={selecionarTema} />
      </View>
      <View style={{ marginBottom: espaco.l }}>
        <SeletorSegmentado opcoes={OPCOES_FONTE} valorAtual={escalaFonte} onSelecionar={selecionarFonte} />
      </View>

      <RotuloSecao>Dados</RotuloSecao>
      <View style={{ marginBottom: espaco.l }}>
        <Pressable
          accessibilityRole="button"
          onPress={exportarDadosDeUso}
          style={{
            minHeight: 44,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: espaco.l,
            borderRadius: raio.m,
            backgroundColor: paleta.superficie2,
            marginBottom: espaco.xs,
          }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
            Exportar dados de uso
          </Text>
        </Pressable>
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: espaco.m }}>
          Gera um arquivo JSON com os eventos de uso anônimos deste aparelho. Nada é enviado
          automaticamente.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setFeedbackAberto(true)}
          style={{
            minHeight: 44,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: espaco.l,
            borderRadius: raio.m,
            backgroundColor: paleta.superficie2,
          }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
            Dar feedback
          </Text>
        </Pressable>
      </View>
      <FolhaFeedback visivel={feedbackAberto} aoFechar={() => setFeedbackAberto(false)} />

      <RotuloSecao>Imagens do guia</RotuloSecao>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          color: paleta.tinta2,
          marginBottom: espaco.s,
        }}
      >
        As analogias que o guia usa e reusa, com nome próprio. Toque para
        reler a imagem no tópico em que ela nasce.
      </Text>
      <View style={{ marginBottom: espaco.l }}>
        {IMAGENS_DO_GUIA.map((img) => (
          <Pressable
            key={`${img.topicoId}-${img.nome}`}
            accessibilityRole="button"
            accessibilityLabel={`${img.nome}: abrir ${img.topicoTitulo}`}
            onPress={() => router.push(`/topico/${img.topicoId}`)}
            style={{ paddingVertical: espaco.s, borderBottomWidth: 1, borderBottomColor: paleta.linha }}
          >
            <Text
              style={{
                fontFamily: fonte.displayItalico,
                fontSize: Math.round(tipo.corpo * escala),
                color: paleta.tinta,
                marginBottom: 2,
              }}
            >
              {img.nome}
            </Text>
            <Text
              style={{
                fontFamily: fonte.corpo,
                fontSize: Math.round(tipo.small * escala),
                color: paleta.tinta2,
              }}
            >
              {img.descricao} · {img.topicoTitulo}
            </Text>
          </Pressable>
        ))}
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
        Versão do app: {VERSAO_APP}
      </Text>
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
