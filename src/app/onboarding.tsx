import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../design/Tela';
import { Rotulo } from '../design/Rotulo';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { listarSistemas } from '../content/store';
import { useProgresso } from '../progress/ProgressContext';
import { useSync } from '../sync/orquestrador';
import { analisarDataProva } from '../plano/plano';
import { track } from '../analytics/analytics';

// Onboarding do beta (§9.2): três telas no primeiro acesso — período do
// curso, faculdade e a data da próxima prova prática com o sistema
// correspondente. Tudo opcional (dá para "Deixar para depois"); a data é
// editável no Perfil. A conclusão grava `onboarding` = 'concluido'; a home
// só abre esta tela enquanto essa preferência não existe.

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

function Campo({
  valor,
  aoMudar,
  rotulo,
  placeholder,
}: {
  valor: string;
  aoMudar: (t: string) => void;
  rotulo: string;
  placeholder: string;
}) {
  const { paleta, escala } = useTema();
  return (
    <TextInput
      value={valor}
      onChangeText={aoMudar}
      placeholder={placeholder}
      placeholderTextColor={paleta.tinta2}
      accessibilityLabel={rotulo}
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
  const [periodo, setPeriodo] = useState('');
  const [faculdade, setFaculdade] = useState('');
  const [entradaData, setEntradaData] = useState('');
  const [sistemaProva, setSistemaProva] = useState<string | null>(null);
  const [erroData, setErroData] = useState(false);

  const sistemas = listarSistemas(conteudo);

  async function concluir(dataIso: string | null) {
    try {
      await progresso.definirPreferencia('onboarding', 'concluido');
      if (periodo.trim()) await progresso.definirPreferencia('periodo', periodo.trim());
      if (faculdade.trim()) await progresso.definirPreferencia('faculdade', faculdade.trim());
      if (dataIso) await progresso.definirPreferencia('dataProva', dataIso);
      if (dataIso && sistemaProva) await progresso.definirPreferencia('sistemaProva', sistemaProva);
    } catch {
      // sem persistência, o onboarding reaparece na próxima abertura — melhor
      // que travar o primeiro uso.
    } finally {
      notificarEscrita();
    }
    // §4: onboarding_concluido carrega período, faculdade e data da prova.
    track('onboarding_concluido', {
      periodo: periodo.trim(),
      faculdade: faculdade.trim(),
      dataProva: dataIso ?? '',
      sistemaProva: (dataIso && sistemaProva) || '',
    });
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
      titulo: 'Em que período você está?',
      corpo: (
        <>
          <Paragrafo>
            O SemioGuia é um guia de semiologia de bolso — offline, com revisão espaçada, estações
            OSCE e quiz. Três perguntas rápidas ajustam o plano de estudo a você.
          </Paragrafo>
          <Campo valor={periodo} aoMudar={setPeriodo} rotulo="Período do curso" placeholder="Ex.: 4º período" />
        </>
      ),
    },
    {
      titulo: 'De qual faculdade?',
      corpo: (
        <Campo valor={faculdade} aoMudar={setFaculdade} rotulo="Faculdade" placeholder="Ex.: UFPB" />
      ),
    },
    {
      titulo: 'Quando é a próxima prova prática?',
      corpo: (
        <>
          <Paragrafo>
            Com a data (e o sistema da prova), a home mostra os dias restantes e o treino do dia.
            Dá para mudar depois, no Perfil.
          </Paragrafo>
          <Campo
            valor={entradaData}
            aoMudar={(t) => {
              setEntradaData(t);
              setErroData(false);
            }}
            rotulo="Data da prova"
            placeholder="DD/MM/AAAA"
          />
          {erroData ? (
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta, marginBottom: espaco.xs }}>
              Data inválida — use o formato DD/MM/AAAA.
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: espaco.xs, marginTop: espaco.s }}>
            {sistemas.map((s) => {
              const ativo = sistemaProva === s.id;
              return (
                <Pressable
                  key={s.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: ativo }}
                  onPress={() => setSistemaProva(ativo ? null : s.id)}
                  style={{
                    minHeight: 36,
                    justifyContent: 'center',
                    paddingHorizontal: espaco.m,
                    borderRadius: raio.pill,
                    backgroundColor: ativo ? paleta.acento : paleta.superficie2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: ativo ? fonte.corpoBold : fonte.corpo,
                      fontSize: Math.round(tipo.small * escala),
                      color: ativo ? paleta.superficie : paleta.tinta,
                    }}
                  >
                    {s.titulo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
