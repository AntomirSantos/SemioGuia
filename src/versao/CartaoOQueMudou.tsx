import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { useProgresso } from '../progress/ProgressContext';
import { useDadosAoFocar } from '../progress/useDadosAoFocar';
import { VERSAO_APP } from '../config/versao';
import { CHANGELOG, linhasMaisRecentes } from './changelog';

// Cartão "O que mudou" (beta §9.8): aparece UMA vez após uma atualização —
// quando a preferência `versaoVista` difere da versão corrente — com as 3
// linhas mais recentes do changelog; ao aparecer, grava a versão corrente,
// então a próxima abertura já não o mostra.
export function CartaoOQueMudou() {
  const { paleta, escala } = useTema();
  const progresso = useProgresso();
  const carregar = useCallback(() => progresso.obterPreferencia('versaoVista'), [progresso]);
  const versaoVista = useDadosAoFocar(carregar);
  const [dispensado, setDispensado] = useState(false);
  const marcadoRef = useRef(false);

  // `undefined` = carregando; null = primeira abertura de todas — aí só
  // gravamos a versão, sem cartão (não há "atualização" para anunciar).
  const primeiraAbertura = versaoVista === null;
  const visivel = !dispensado && typeof versaoVista === 'string' && versaoVista !== VERSAO_APP;

  useEffect(() => {
    if ((visivel || primeiraAbertura) && !marcadoRef.current) {
      marcadoRef.current = true;
      progresso.definirPreferencia('versaoVista', VERSAO_APP).catch(() => {});
    }
  }, [visivel, primeiraAbertura, progresso]);

  if (!visivel) return null;

  return (
    <View
      style={{
        backgroundColor: paleta.superficie2,
        borderLeftWidth: 3,
        borderLeftColor: paleta.acento,
        padding: espaco.m,
        marginBottom: espaco.l,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.tinta, marginBottom: espaco.xs }}>
        O que mudou na versão {VERSAO_APP}
      </Text>
      {linhasMaisRecentes(CHANGELOG).map((linha) => (
        <Text
          key={linha}
          style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: 2 }}
        >
          · {linha}
        </Text>
      ))}
      <Pressable
        accessibilityRole="button"
        onPress={() => setDispensado(true)}
        style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta }}>
          Entendi
        </Text>
      </Pressable>
    </View>
  );
}
