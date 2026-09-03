import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../design/Tela';
import { Rotulo } from '../design/Rotulo';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { listarSistemas, listarTodosTopicos } from '../content/store';
import { useProgresso } from '../progress/ProgressContext';
import { useSync } from '../sync/orquestrador';
import { analisarDataProva } from '../plano/plano';
import { track } from '../analytics/analytics';

// Onboarding do beta (§9.2): três passos curtos — o que é o guia, como
// estudar em ≤15 min/dia e a data da prova (opcional, editável no Perfil).
// A conclusão grava a preferência `onboarding` = 'concluido'; a home só
// abre esta tela enquanto ela não existe.

function Paragrafo({ children }: { children: string }) {
  const { paleta, escala } = useTema();
  return (
    <Text
      style={{
        fontFamily: fonte.leitura,
        fontSize: Math.round(tipo.corpo * escala),
        lineHeight: Math.round(tipo.corpo * escala * 1.62),
        color: paleta.tinta,
        marginBottom: espaco.m,
      }}
    >
      {children}
    </Text>
  );
}

function BotaoPrimario({ rotulo, onPress }: { rotulo: string; onPress: () => void }) {
  const { paleta, escala } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paleta.acento,
        borderRadius: raio.m,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.superficie }}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

export function TelaOnboarding() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();
  const [passo, setPasso] = useState(0);
  const [entradaData, setEntradaData] = useState('');
  const [erroData, setErroData] = useState(false);

  const totalSistemas = listarSistemas(conteudo).length;
  const totalTopicos = listarTodosTopicos(conteudo).length;

  async function concluir(dataIso: string | null) {
    try {
      await progresso.definirPreferencia('onboarding', 'concluido');
      if (dataIso) await progresso.definirPreferencia('dataProva', dataIso);
    } catch {
      // sem persistência, o onboarding reaparece na próxima abertura — melhor
      // que travar o primeiro uso.
    } finally {
      notificarEscrita();
    }
    track('onboarding_concluido', dataIso ? { dataProva: dataIso } : { dataProva: '' });
    router.replace('/');
  }

  function comecar() {
    const bruto = entradaData.trim();
    if (!bruto) {
      concluir(null);
      return;
    }
    const iso = analisarDataProva(bruto);
    if (!iso) {
      setErroData(true);
      return;
    }
    concluir(iso);
  }

  const passos = [
    {
      titulo: 'Semiologia no bolso',
      corpo: (
        <>
          <Paragrafo>
            {`O SemioGuia cobre o exame clínico inteiro — ${totalSistemas} sistemas e ${totalTopicos} tópicos, da anamnese à semiologia da criança — em prosa própria, ancorada nas obras de referência e funcionando offline.`}
          </Paragrafo>
          <Paragrafo>
            Cada tópico traz o essencial, a técnica passo a passo, as evidências (razões de
            verossimilhança) e as divergências entre os livros, lado a lado.
          </Paragrafo>
        </>
      ),
    },
    {
      titulo: '15 minutos por dia',
      corpo: (
        <>
          <Paragrafo>
            O plano de estudo cabe no intervalo do estágio: a revisão espaçada do dia, um tópico
            novo e o quiz dele.
          </Paragrafo>
          <Paragrafo>
            Marcar um tópico como estudado semeia a fila de revisão; as estações OSCE treinam a
            técnica com os mesmos checklists da prova prática.
          </Paragrafo>
        </>
      ),
    },
    {
      titulo: 'Quando é a sua prova?',
      corpo: (
        <>
          <Paragrafo>
            Com a data, a home mostra quantos dias faltam e o ritmo de tópicos por dia para chegar
            lá. Dá para mudar (ou definir) depois, no Perfil.
          </Paragrafo>
          <TextInput
            value={entradaData}
            onChangeText={(t) => {
              setEntradaData(t);
              setErroData(false);
            }}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={paleta.tinta2}
            keyboardType="numbers-and-punctuation"
            accessibilityLabel="Data da prova"
            style={{
              minHeight: 48,
              borderRadius: raio.m,
              backgroundColor: paleta.superficie2,
              paddingHorizontal: espaco.m,
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
              marginBottom: espaco.xs,
            }}
          />
          {erroData ? (
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta }}>
              Data inválida — use o formato DD/MM/AAAA.
            </Text>
          ) : null}
        </>
      ),
    },
  ];

  const ultimo = passo === passos.length - 1;
  const atual = passos[passo];

  return (
    <Tela>
      <Rotulo texto={`Passo ${passo + 1} de ${passos.length}`} cor={paleta.tinta2} style={{ marginBottom: espaco.xs + 2 }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h1 * escala),
          lineHeight: Math.round(tipo.h1 * escala * 1.2),
          color: paleta.tinta,
          marginBottom: espaco.l,
        }}
      >
        {atual.titulo}
      </Text>
      <View style={{ flex: 1 }}>{atual.corpo}</View>
      {ultimo ? (
        <>
          <BotaoPrimario rotulo="Começar" onPress={comecar} />
          <Pressable
            accessibilityRole="button"
            onPress={() => concluir(null)}
            style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
              Deixar para depois
            </Text>
          </Pressable>
        </>
      ) : (
        <BotaoPrimario rotulo="Próxima" onPress={() => setPasso((p) => p + 1)} />
      )}
    </Tela>
  );
}

export default function OnboardingRoute() {
  return <TelaOnboarding />;
}
