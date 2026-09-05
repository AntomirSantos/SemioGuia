import { useEffect, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import {
  agruparPorSistema,
  filtrarChecklists,
  listarChecklists,
  type ChecklistDeExame,
} from '../checklists/listas';
import { track } from '../analytics/analytics';

// Tela de checklists (pedido do autor, 2026-09): todos os roteiros de exame
// do guia em um só lugar, organizados por sistema na ordem craniocaudal.
// O aluno abre um checklist, marca item a item o que fez e vê na hora o que
// esqueceu; as marcas valem para a sessão de treino (zeram ao sair da tela),
// porque cada passagem é uma simulação nova, não um progresso a guardar.

function chaveDaLista(lista: ChecklistDeExame): string {
  return `${lista.topicoId}:${lista.titulo}`;
}

function ItemMarcavel({ texto, marcado, onToggle }: { texto: string; marcado: boolean; onToggle: () => void }) {
  const { paleta, escala } = useTema();
  const small = Math.round(tipo.small * escala);
  return (
    <Pressionavel
      accessibilityRole="checkbox"
      accessibilityState={{ checked: marcado }}
      accessibilityLabel={texto}
      onPress={onToggle}
      style={{ flexDirection: 'row', alignItems: 'flex-start', minHeight: 44, paddingVertical: espaco.xs }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: raio.s,
          borderWidth: 1.5,
          borderColor: marcado ? paleta.acento : paleta.linha,
          backgroundColor: marcado ? paleta.acento : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: espaco.m,
          marginTop: 2,
        }}
      >
        {marcado ? <Check size={15} color={paleta.superficie} strokeWidth={3} /> : null}
      </View>
      <Text
        android_hyphenationFrequency="full"
        style={{
          flex: 1,
          fontFamily: fonte.corpo,
          fontSize: small,
          lineHeight: Math.round(small * 1.5),
          color: marcado ? paleta.tinta2 : paleta.tinta,
          textAlign: 'justify',
        }}
      >
        {texto}
      </Text>
    </Pressionavel>
  );
}

// O checklist aberto: itens marcáveis, o placar do que falta e o salto ao
// tópico. O placar é o coração da tela: "faltam N" diz na hora o que a
// simulação de exame ainda não cobriu.
function ChecklistAberto({
  lista,
  marcados,
  onToggleItem,
  onRefazer,
  onAbrirTopico,
}: {
  lista: ChecklistDeExame;
  marcados: Set<number>;
  onToggleItem: (indice: number) => void;
  onRefazer: () => void;
  onAbrirTopico: () => void;
}) {
  const { paleta, escala } = useTema();
  const total = lista.itens.length;
  const feitos = marcados.size;
  const completo = feitos === total;
  const faltam = total - feitos;
  return (
    <EntradaAnimada>
      <View
        style={{
          backgroundColor: paleta.superficie2,
          borderRadius: raio.m,
          padding: espaco.l,
          marginTop: espaco.xs,
          marginBottom: espaco.m,
        }}
      >
        <Rotulo
          texto={
            completo
              ? `Completo: ${total} de ${total}`
              : feitos === 0
                ? `${total} itens para conferir`
                : `${feitos} de ${total}, ${faltam === 1 ? 'falta 1 item' : `faltam ${faltam} itens`}`
          }
          cor={completo ? paleta.acentoTinta : paleta.tinta2}
        />
        <View style={{ marginTop: espaco.s }}>
          {lista.itens.map((item, indice) => (
            <ItemMarcavel
              key={`${indice}:${item}`}
              texto={item}
              marcado={marcados.has(indice)}
              onToggle={() => onToggleItem(indice)}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: espaco.l, marginTop: espaco.s }}>
          {feitos > 0 ? (
            <Pressionavel
              accessibilityRole="button"
              onPress={onRefazer}
              style={{ minHeight: 44, justifyContent: 'center' }}
            >
              <Text
                style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}
              >
                Refazer
              </Text>
            </Pressionavel>
          ) : null}
          <Pressionavel
            accessibilityRole="button"
            onPress={onAbrirTopico}
            style={{ minHeight: 44, justifyContent: 'center' }}
          >
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.corpo * escala),
                color: paleta.acentoTinta,
              }}
            >
              Ver em {lista.topicoTitulo}
            </Text>
          </Pressionavel>
        </View>
      </View>
    </EntradaAnimada>
  );
}

function LinhaChecklist({
  lista,
  aberto,
  feitos,
  onToggle,
  children,
}: {
  lista: ChecklistDeExame;
  aberto: boolean;
  feitos: number;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const { paleta, escala } = useTema();
  const Chevron = aberto ? ChevronUp : ChevronDown;
  const total = lista.itens.length;
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: paleta.linha }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        accessibilityLabel={`${lista.titulo}, ${aberto ? 'recolher' : 'abrir'}`}
        onPress={onToggle}
        style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: espaco.s }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonte.leituraSemi,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
            }}
          >
            {lista.titulo}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(12 * escala),
              color: paleta.tinta2,
              marginTop: 1,
            }}
          >
            {feitos > 0 ? `${lista.topicoTitulo} · ${feitos} de ${total}` : `${lista.topicoTitulo} · ${total} itens`}
          </Text>
        </View>
        <Chevron size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
      {aberto ? children : null}
    </View>
  );
}

export default function Checklists() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const listas = useMemo(() => listarChecklists(conteudo), [conteudo]);
  const [termo, setTermo] = useState('');
  const [abertos, setAbertos] = useState<Set<string>>(new Set());
  const [marcasPorLista, setMarcasPorLista] = useState<Map<string, Set<number>>>(new Map());

  const resultados = useMemo(() => filtrarChecklists(listas, termo), [listas, termo]);
  const grupos = useMemo(() => agruparPorSistema(resultados), [resultados]);
  const buscando = termo.trim().length > 0;

  useEffect(() => {
    track('checklists_aberto', { checklists: listas.length });
    // Uma abertura por montagem da tela, como no modo plantão.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alternar(lista: ChecklistDeExame) {
    const chave = chaveDaLista(lista);
    setAbertos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(chave)) proximo.delete(chave);
      else proximo.add(chave);
      return proximo;
    });
  }

  function alternarItem(lista: ChecklistDeExame, indice: number) {
    const chave = chaveDaLista(lista);
    setMarcasPorLista((atual) => {
      const proximo = new Map(atual);
      const marcas = new Set(proximo.get(chave) ?? []);
      if (marcas.has(indice)) marcas.delete(indice);
      else marcas.add(indice);
      proximo.set(chave, marcas);
      if (marcas.size === lista.itens.length) {
        track('checklist_concluido', { checklist: lista.titulo, topicoId: lista.topicoId, itens: lista.itens.length });
      }
      return proximo;
    });
  }

  function refazer(lista: ChecklistDeExame) {
    const chave = chaveDaLista(lista);
    setMarcasPorLista((atual) => {
      const proximo = new Map(atual);
      proximo.delete(chave);
      return proximo;
    });
  }

  function abrirTopico(lista: ChecklistDeExame) {
    router.push(`/topico/${lista.topicoId}`);
  }

  return (
    <Tela>
      <Cabecalho titulo="Checklists de exame" aoVoltar={() => router.back()} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Todos os roteiros do guia em um só lugar. Abra um checklist, marque o que você fez e veja na hora o que
        esqueceu; as marcas zeram ao sair da tela, cada treino começa limpo.
      </Text>
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
          onChangeText={setTermo}
          placeholder="Checklist ou região: tireoide, joelho, precórdio…"
          placeholderTextColor={paleta.tinta2}
          autoFocus={false}
          accessibilityLabel="Buscar checklist de exame"
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
      <Rotulo
        texto={
          buscando
            ? `${resultados.length} ${resultados.length === 1 ? 'checklist' : 'checklists'}`
            : `${listas.length} checklists na ordem do exame`
        }
        cor={paleta.tinta2}
        style={{ marginBottom: espaco.m }}
      />

      {grupos.map((grupo) => (
        <View key={grupo.sistemaTitulo} style={{ marginBottom: espaco.l }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
            <View style={{ width: 8, height: 18, backgroundColor: grupo.sistemaCor, marginRight: espaco.m }} />
            <Rotulo texto={grupo.sistemaTitulo} cor={paleta.tinta2} />
          </View>
          {grupo.checklists.map((lista) => {
            const chave = chaveDaLista(lista);
            const marcas = marcasPorLista.get(chave) ?? new Set<number>();
            return (
              <LinhaChecklist
                key={chave}
                lista={lista}
                aberto={abertos.has(chave)}
                feitos={marcas.size}
                onToggle={() => alternar(lista)}
              >
                <ChecklistAberto
                  lista={lista}
                  marcados={marcas}
                  onToggleItem={(indice) => alternarItem(lista, indice)}
                  onRefazer={() => refazer(lista)}
                  onAbrirTopico={() => abrirTopico(lista)}
                />
              </LinhaChecklist>
            );
          })}
        </View>
      ))}

      {grupos.length === 0 ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginTop: espaco.m,
          }}
        >
          Nenhum checklist com esse nome. A busca geral do app cobre também sinais, manobras e tópicos.
        </Text>
      ) : null}
    </Tela>
  );
}
