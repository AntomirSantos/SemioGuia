import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { PRECO_SEM_ANUNCIOS } from '../config/paywall';
import { useConteudo } from '../content/ContentContext';
import { useAcesso } from '../entitlements/EntitlementsContext';
import { obterLoja, type ResultadoDaCompra } from '../entitlements/loja';
import { track } from '../analytics/analytics';
import type { Conteudo } from '../content/schema';

// A tela da compra única. O que ela vende não é conteúdo, porque o conteúdo
// já está todo aberto: ela vende o silêncio, e diz isso sem rodeio. Tudo o
// que a loja exige aparece antes do botão, incluindo a frase que mais importa
// aqui: não é assinatura, não renova, não cobra de novo.

/** As contas saem do conteúdo compilado, nunca da memória de quem escreve. */
function oQueJaEstaAberto(conteudo: Conteudo): string[] {
  let topicos = 0;
  let checklists = 0;
  let verbetes = 0;
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        topicos += 1;
        for (const bloco of topico.blocos) {
          if (bloco.tipo === 'checklist') checklists += 1;
          else if (bloco.tipo === 'sinal') verbetes += 1;
        }
      }
    }
  }
  return [
    `os ${conteudo.sistemas.length} sistemas, com ${topicos} tópicos revisados`,
    `${conteudo.casos.length} casos clínicos com decisões e desfecho`,
    `os ${checklists} checklists e as estações de prática`,
    `os ${verbetes} verbetes do modo plantão`,
    'a revisão espaçada de tudo isso, e o que vier depois',
  ];
}

function mensagemDoResultado(r: ResultadoDaCompra): string | null {
  switch (r.tipo) {
    case 'ok':
    case 'cancelado_pelo_usuario':
      return null;
    case 'nada_a_restaurar':
      return 'Não encontramos nenhuma compra nesta conta da loja. Se você comprou com outra conta, entre com ela no aparelho e tente de novo.';
    case 'indisponivel':
      return 'A loja não está disponível neste aparelho. No navegador não há compra: baixe o aplicativo para remover os anúncios.';
    case 'erro':
      return r.mensagem;
  }
}

export function TelaSemAnuncios() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const acesso = useAcesso();
  const aberto = useMemo(() => oQueJaEstaAberto(conteudo), [conteudo]);
  const [ocupado, setOcupado] = useState<'comprar' | 'restaurar' | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [precos, setPrecos] = useState({ remocao: PRECO_SEM_ANUNCIOS });

  useEffect(() => {
    track('sem_anuncios_aberto', { estado: acesso.estado });
    // Uma abertura por montagem da tela.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let vivo = true;
    obterLoja()
      .precos()
      .then((p) => {
        if (vivo) setPrecos(p);
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const executar = useCallback(
    async (qual: 'comprar' | 'restaurar') => {
      setErro(null);
      setOcupado(qual);
      try {
        const r = qual === 'comprar' ? await acesso.comprar() : await acesso.restaurar();
        setErro(mensagemDoResultado(r));
        if (r.tipo === 'ok') track('compra_concluida', { via: qual });
      } catch {
        setErro('Não foi possível falar com a loja agora. Tente de novo em alguns minutos.');
      } finally {
        setOcupado(null);
      }
    },
    [acesso],
  );

  const jaTem = acesso.semAnuncios;

  return (
    <Tela>
      <Cabecalho titulo="Sem anúncios, e offline" aoVoltar={() => router.back()} />

      {jaTem ? (
        <View style={{ marginBottom: espaco.l }}>
          <Rotulo
            texto={acesso.estado === 'permanente' ? 'Anúncios removidos' : 'Cortesia ativa'}
            cor={paleta.acentoTinta}
          />
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              lineHeight: Math.round(tipo.corpo * escala * 1.5),
              color: paleta.tinta,
              marginTop: espaco.xs,
            }}
          >
            {acesso.estado === 'permanente'
              ? 'Você não vê mais anúncios neste aplicativo, e usa tudo sem internet. Obrigado por sustentar o projeto: é isso que paga o tempo de escrever o que vem por aí.'
              : 'Você está sem anúncios por cortesia. Quando ela acabar, eles voltam, e a compra continua disponível aqui.'}
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              lineHeight: Math.round(tipo.corpo * escala * 1.5),
              color: paleta.tinta2,
              marginBottom: espaco.l,
            }}
          >
            O SemioGuia inteiro é seu, de graça e sem cadastro. Os anúncios são o que paga a conta de
            manter isso de pé: a Anamnese e o Exame físico geral abrem sozinhos, e cada outro sistema
            abre com um anúncio, até você fechar o aplicativo.
          </Text>

          <Rotulo texto="O que a compra muda" cor={paleta.tinta2} />
          <View style={{ marginTop: espaco.xs, marginBottom: espaco.l }}>
            {['nenhum anúncio, nunca mais', 'e o app inteiro funcionando sem internet, no plantão ou no ônibus'].map(
              (linha) => (
                <View key={linha} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: espaco.xs }}>
                  <Check size={16} color={paleta.acentoTinta} style={{ marginTop: 3, marginRight: espaco.s }} />
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: fonte.corpo,
                      fontSize: Math.round(tipo.corpo * escala),
                      lineHeight: Math.round(tipo.corpo * escala * 1.45),
                      color: paleta.tinta,
                    }}
                  >
                    {linha}
                  </Text>
                </View>
              ),
            )}
          </View>

          <Rotulo texto="O acervo, que já é seu" cor={paleta.tinta2} />
          <View style={{ marginTop: espaco.xs, marginBottom: espaco.l }}>
            {aberto.map((linha) => (
              <View key={linha} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: espaco.xs }}>
                <Check size={16} color={paleta.acentoTinta} style={{ marginTop: 3, marginRight: espaco.s }} />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: fonte.corpo,
                    fontSize: Math.round(tipo.corpo * escala),
                    lineHeight: Math.round(tipo.corpo * escala * 1.45),
                    color: paleta.tinta,
                  }}
                >
                  {linha}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              borderTopWidth: 2.5,
              borderTopColor: paleta.tinta,
              paddingTop: espaco.m,
              marginBottom: espaco.l,
            }}
          >
            <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta }}>
              {precos.remocao}, uma vez só
            </Text>
            <Text
              style={{
                fontFamily: fonte.corpo,
                fontSize: Math.round(tipo.small * escala),
                lineHeight: Math.round(tipo.small * escala * 1.5),
                color: paleta.tinta2,
                marginTop: espaco.xs,
              }}
            >
              Não é assinatura: não renova, não é cobrado de novo e não vence. Você paga uma vez, os
              anúncios somem para sempre e o app passa a funcionar offline, também nas versões que
              vierem. Trocou de aparelho, é só tocar em restaurar.
            </Text>
          </View>
        </>
      )}

      {erro ? (
        <View
          style={{
            backgroundColor: paleta.superficie2,
            borderRadius: raio.m,
            padding: espaco.m,
            marginBottom: espaco.m,
          }}
        >
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.small * escala),
              lineHeight: Math.round(tipo.small * escala * 1.5),
              color: paleta.tinta,
            }}
          >
            {erro}
          </Text>
        </View>
      ) : null}

      {!jaTem ? (
        <Pressionavel
          accessibilityRole="button"
          accessibilityLabel={`Comprar por ${precos.remocao}, uma vez só`}
          accessibilityState={{ disabled: ocupado !== null }}
          onPress={() => {
            if (!ocupado) executar('comprar');
          }}
          style={{
            minHeight: 52,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: raio.m,
            backgroundColor: paleta.acento,
            marginBottom: espaco.m,
          }}
        >
          {ocupado === 'comprar' ? (
            <ActivityIndicator color={paleta.superficie} />
          ) : (
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.corpo * escala),
                color: paleta.superficie,
              }}
            >
              Comprar por {precos.remocao}
            </Text>
          )}
        </Pressionavel>
      ) : null}

      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel="Já comprei, restaurar"
        onPress={() => {
          if (!ocupado) executar('restaurar');
        }}
        style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
      >
        <Text
          style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta }}
        >
          {ocupado === 'restaurar' ? 'Procurando na loja...' : 'Já comprei, restaurar'}
        </Text>
      </Pressionavel>

      {!acesso.lojaDisponivel ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.small * escala),
            lineHeight: Math.round(tipo.small * escala * 1.5),
            color: paleta.tinta2,
            marginTop: espaco.l,
          }}
        >
          No navegador o SemioGuia é gratuito e sem compra. A remoção dos anúncios se faz pelo
          aplicativo.
        </Text>
      ) : null}
    </Tela>
  );
}

export default function SemAnuncios() {
  return <TelaSemAnuncios />;
}
