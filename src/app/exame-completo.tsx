import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { listarChecklists, type ChecklistDeExame } from '../checklists/listas';
import { ItemMarcavel } from '../checklists/ItemMarcavel';
import { track } from '../analytics/analytics';

// Exame completo (pedido do autor, 2026-09): os checklists do guia
// costurados num único roteiro da cabeça aos pés. O aluno percorre um
// checklist por vez, na ordem craniocaudal, marcando o que fez; ao
// encerrar, o relatório mostra exatamente o que ficou de fora. As marcas
// valem para a passagem: cada exame completo começa limpo.

function chaveDaLista(lista: ChecklistDeExame): string {
  return `${lista.topicoId}:${lista.titulo}`;
}

function BarraProgresso({ fracao, cor }: { fracao: number; cor: string }) {
  const { paleta } = useTema();
  return (
    <View style={{ height: 3, backgroundColor: paleta.superficie2, overflow: 'hidden', marginTop: espaco.s }}>
      <View style={{ width: `${Math.round(fracao * 100)}%`, height: '100%', backgroundColor: cor }} />
    </View>
  );
}

function BotaoNavegacao({
  rotulo,
  direcao,
  destaque,
  onPress,
}: {
  rotulo: string;
  direcao: 'anterior' | 'proximo';
  destaque?: boolean;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  const cor = destaque ? paleta.superficie : paleta.acentoTinta;
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        paddingHorizontal: espaco.l,
        borderRadius: raio.m,
        backgroundColor: destaque ? paleta.acento : paleta.superficie2,
      }}
    >
      {direcao === 'anterior' ? <ChevronLeft size={18} color={cor} /> : null}
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: cor }}>
        {rotulo}
      </Text>
      {direcao === 'proximo' ? <ChevronRight size={18} color={cor} /> : null}
    </Pressionavel>
  );
}

interface ItemFaltante {
  lista: ChecklistDeExame;
  itens: string[];
}

function Relatorio({
  faltantes,
  totalItens,
  feitos,
  onRefazer,
}: {
  faltantes: ItemFaltante[];
  totalItens: number;
  feitos: number;
  onRefazer: () => void;
}) {
  const { paleta, escala } = useTema();
  const small = Math.round(tipo.small * escala);
  const completo = faltantes.length === 0;
  return (
    <EntradaAnimada>
      <Rotulo
        texto={completo ? `Exame completo: ${totalItens} de ${totalItens} itens` : `${feitos} de ${totalItens} itens conferidos`}
        cor={completo ? paleta.acentoTinta : paleta.tinta2}
        style={{ marginBottom: espaco.m }}
      />
      {completo ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            lineHeight: Math.round(tipo.corpo * escala * 1.5),
            color: paleta.tinta,
            marginBottom: espaco.l,
          }}
        >
          Nada ficou de fora: você percorreu o exame da cabeça aos pés sem pular um item. Refaça quando quiser, a
          rotina é que forma o olho.
        </Text>
      ) : (
        <>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              lineHeight: Math.round(tipo.corpo * escala * 1.5),
              color: paleta.tinta,
              marginBottom: espaco.l,
            }}
          >
            O que ficou de fora nesta passagem, para revisar antes da próxima:
          </Text>
          {faltantes.map(({ lista, itens }) => (
            <View key={chaveDaLista(lista)} style={{ marginBottom: espaco.l }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
                <View style={{ width: 8, height: 18, backgroundColor: lista.sistemaCor, marginRight: espaco.m }} />
                <Rotulo texto={lista.titulo} cor={paleta.tinta2} />
              </View>
              {itens.map((item) => (
                <View key={item} style={{ flexDirection: 'row', marginBottom: 2 }}>
                  <Text style={{ fontFamily: fonte.corpo, fontSize: small, color: paleta.tinta2 }}>{'•'} </Text>
                  <Text
                    android_hyphenationFrequency="full"
                    style={{
                      flex: 1,
                      fontFamily: fonte.corpo,
                      fontSize: small,
                      lineHeight: Math.round(small * 1.5),
                      color: paleta.tinta,
                      textAlign: 'justify',
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
              <Pressionavel
                accessibilityRole="button"
                onPress={() => router.push(`/topico/${lista.topicoId}?ancora=${encodeURIComponent(`checklist:${lista.titulo}`)}`)}
                style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
              >
                <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
                  Ver em {lista.topicoTitulo}
                </Text>
              </Pressionavel>
            </View>
          ))}
        </>
      )}
      <Pressionavel
        accessibilityRole="button"
        onPress={onRefazer}
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
          Refazer o exame
        </Text>
      </Pressionavel>
    </EntradaAnimada>
  );
}

export default function ExameCompleto() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const listas = useMemo(() => listarChecklists(conteudo), [conteudo]);
  const [indice, setIndice] = useState(0);
  const [encerrado, setEncerrado] = useState(false);
  const [marcasPorLista, setMarcasPorLista] = useState<Map<string, Set<number>>>(new Map());

  const totalItens = useMemo(() => listas.reduce((soma, l) => soma + l.itens.length, 0), [listas]);
  const feitos = useMemo(() => {
    let soma = 0;
    for (const marcas of marcasPorLista.values()) soma += marcas.size;
    return soma;
  }, [marcasPorLista]);

  useEffect(() => {
    track('exame_completo_aberto', { checklists: listas.length, itens: totalItens });
    // Uma abertura por montagem, como nas demais telas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const atual = listas[indice];
  const marcasAtuais = atual ? (marcasPorLista.get(chaveDaLista(atual)) ?? new Set<number>()) : new Set<number>();
  const ultimo = indice === listas.length - 1;

  function alternarItem(indiceItem: number) {
    if (!atual) return;
    const chave = chaveDaLista(atual);
    setMarcasPorLista((mapa) => {
      const proximo = new Map(mapa);
      const marcas = new Set(proximo.get(chave) ?? []);
      if (marcas.has(indiceItem)) marcas.delete(indiceItem);
      else marcas.add(indiceItem);
      proximo.set(chave, marcas);
      return proximo;
    });
  }

  const faltantes: ItemFaltante[] = useMemo(() => {
    if (!encerrado) return [];
    const resultado: ItemFaltante[] = [];
    for (const lista of listas) {
      const marcas = marcasPorLista.get(chaveDaLista(lista)) ?? new Set<number>();
      const itens = lista.itens.filter((_, i) => !marcas.has(i));
      if (itens.length > 0) resultado.push({ lista, itens });
    }
    return resultado;
  }, [encerrado, listas, marcasPorLista]);

  function encerrar() {
    setEncerrado(true);
    track('exame_completo_encerrado', { itens: totalItens, feitos });
  }

  function refazer() {
    setMarcasPorLista(new Map());
    setIndice(0);
    setEncerrado(false);
  }

  return (
    <Tela>
      <Cabecalho titulo="Exame completo" aoVoltar={() => router.back()} />
      {encerrado || !atual ? (
        <Relatorio faltantes={faltantes} totalItens={totalItens} feitos={feitos} onRefazer={refazer} />
      ) : (
        <>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.small * escala),
              lineHeight: Math.round(tipo.small * escala * 1.5),
              color: paleta.tinta2,
              marginBottom: espaco.m,
            }}
          >
            O exame da cabeça aos pés, checklist a checklist, na ordem do guia. Marque o que fez; ao encerrar, o
            relatório mostra o que ficou de fora.
          </Text>
          <Rotulo
            texto={`Checklist ${indice + 1} de ${listas.length} · ${feitos} de ${totalItens} itens`}
            cor={paleta.tinta2}
          />
          <BarraProgresso fracao={(indice + 1) / listas.length} cor={atual.sistemaCor} />

          <EntradaAnimada key={chaveDaLista(atual)}>
            <View style={{ marginTop: espaco.l, marginBottom: espaco.l }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
                <View style={{ width: 8, height: 18, backgroundColor: atual.sistemaCor, marginRight: espaco.m }} />
                <Rotulo texto={`${atual.sistemaTitulo} · ${atual.topicoTitulo}`} cor={paleta.tinta2} />
              </View>
              <Text
                style={{
                  fontFamily: fonte.display,
                  fontSize: Math.round(tipo.h3 * escala),
                  lineHeight: Math.round(tipo.h3 * escala * 1.25),
                  color: paleta.tinta,
                  marginBottom: espaco.s,
                }}
              >
                {atual.titulo}
              </Text>
              {atual.itens.map((item, i) => (
                <ItemMarcavel key={`${i}:${item}`} texto={item} marcado={marcasAtuais.has(i)} onToggle={() => alternarItem(i)} />
              ))}
            </View>
          </EntradaAnimada>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: espaco.m }}>
            {indice > 0 ? (
              <BotaoNavegacao rotulo="Anterior" direcao="anterior" onPress={() => setIndice((i) => Math.max(0, i - 1))} />
            ) : (
              <View />
            )}
            {ultimo ? (
              <BotaoNavegacao rotulo="Encerrar exame" direcao="proximo" destaque onPress={encerrar} />
            ) : (
              <BotaoNavegacao rotulo="Próximo" direcao="proximo" destaque onPress={() => setIndice((i) => i + 1)} />
            )}
          </View>
          <Pressionavel
            accessibilityRole="button"
            onPress={encerrar}
            style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'center', marginTop: espaco.s }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
              Encerrar agora e ver o relatório
            </Text>
          </Pressionavel>
        </>
      )}
    </Tela>
  );
}
