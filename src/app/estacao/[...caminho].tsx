import { Pressable, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useSync } from '../../sync/orquestrador';
import { EstacaoOsce, type ResultadoEstacao } from '../../revisao/EstacaoOsce';
import { avaliar, criarItem, notaDeEstacao } from '../../revisao/sm2';
import { idDeChecklist } from '../../revisao/fila';
import { agoraIso, hojeLocal } from '../../revisao/hoje';
import { track } from '../../analytics/analytics';
import type { Bloco } from '../../content/schema';

function TelaVazia({ mensagem }: { mensagem: string }) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        {mensagem}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={{
          alignSelf: 'flex-start',
          minHeight: 44,
          justifyContent: 'center',
          paddingHorizontal: espaco.l,
          borderRadius: raio.m,
          backgroundColor: paleta.superficie2,
        }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.acentoTinta }}>Voltar</Text>
      </Pressable>
    </Tela>
  );
}

// Estação avulsa: prática de um checklist específico fora da sessão de
// revisão (Task 5 embute EstacaoOsce diretamente na fila do dia). Ao
// concluir, atualiza o agendador SM-2 para esse checklist.
export function TelaEstacao({ topicoId, titulo }: { topicoId: string; titulo: string }) {
  const topico = useTopico(topicoId);
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();

  if (!topico) {
    return <TelaVazia mensagem="Tópico não encontrado" />;
  }

  const checklist = topico.blocos.find(
    (b): b is Extract<Bloco, { tipo: 'checklist' }> => b.tipo === 'checklist' && b.titulo === titulo,
  );
  if (!checklist) {
    return <TelaVazia mensagem="Checklist não encontrado" />;
  }

  async function concluir(resultado: ResultadoEstacao) {
    const id = idDeChecklist(topicoId, checklist!.titulo);
    const hoje = hojeLocal();
    const agora = agoraIso();
    const itens = await progresso.listarItensRevisao();
    const existente = itens.find((i) => i.id === id);
    const item = existente ?? criarItem(id, 'checklist', topicoId, hoje, agora);
    const atualizado = avaliar(item, notaDeEstacao(resultado.percentual), hoje, agora);
    // Instrumentação do beta (§4): estação avulsa concluída (a estação dentro
    // da fila de revisão conta no `revisao_concluida`, não aqui).
    track('osce_concluida', { topicoId, checklist: checklist!.titulo, percentual: resultado.percentual });
    await progresso.salvarItemRevisao(atualizado);
    // Spec §3.2, 4º gatilho: notifica após a conclusão da estação, com debounce.
    notificarEscrita();
  }

  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <EstacaoOsce titulo={checklist.titulo} passos={checklist.itens} aoConcluir={concluir} />
    </Tela>
  );
}

export default function EstacaoRoute() {
  const { caminho, titulo } = useLocalSearchParams<{ caminho: string | string[]; titulo?: string | string[] }>();
  const topicoId = Array.isArray(caminho) ? caminho.join('/') : (caminho ?? '');
  const tituloChecklist = Array.isArray(titulo) ? (titulo[0] ?? '') : (titulo ?? '');
  return <TelaEstacao topicoId={topicoId} titulo={tituloChecklist} />;
}
