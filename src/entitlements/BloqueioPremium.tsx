import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { track } from '../analytics/analytics';

// O que aparece no lugar de um conteúdo trancado pelo corte por sistema.
//
// DORMENTE desde 2026-09-07: com `PAYWALL_ATIVO` desligado, nada fica
// trancado e esta tela não é alcançável. Fica de pé, com o resto da máquina
// de entitlements, para o caso de o corte por sistema voltar a valer.

export function BloqueioPremium({ sistemaTitulo, oQue = 'tópico' }: { sistemaTitulo: string; oQue?: string }) {
  const { paleta, escala } = useTema();

  useEffect(() => {
    track('bloqueio_visto', { sistema: sistemaTitulo, oQue });
    // Um registro por abertura do bloqueio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: raio.l,
          borderWidth: 1,
          borderColor: paleta.linha,
          paddingHorizontal: espaco.m,
          paddingVertical: espaco.xs,
          marginBottom: espaco.m,
        }}
      >
        <Lock size={14} color={paleta.tinta2} />
        <Rotulo texto="Acesso completo" cor={paleta.tinta2} style={{ marginLeft: espaco.xs }} />
      </View>

      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h2 * escala),
          lineHeight: Math.round(tipo.h2 * escala * 1.2),
          color: paleta.tinta,
          marginBottom: espaco.m,
        }}
      >
        Este {oQue} faz parte de {sistemaTitulo}
      </Text>

      <Text
        style={{
          fontFamily: fonte.leitura,
          fontSize: Math.round(tipo.corpo * escala),
          lineHeight: Math.round(tipo.corpo * escala * 1.62),
          color: paleta.tinta2,
          marginBottom: espaco.xl,
        }}
      >
        A parte aberta do SemioGuia tem quatro sistemas completos: Anamnese, Exame físico geral,
        Aparelho cardiovascular e Aparelho respiratório, com todos os casos, checklists e verbetes
        deles. Os outros oito ficam neste acesso.
      </Text>

      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel="Ver o acesso completo"
        onPress={() => router.push('/sem-anuncios')}
        style={{
          minHeight: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: raio.m,
          backgroundColor: paleta.acento,
        }}
      >
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.superficie,
          }}
        >
          Ver o acesso completo
        </Text>
      </Pressionavel>
    </Tela>
  );
}
