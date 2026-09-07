import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Check, Lock } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { PRECO_LANCAMENTO, PRECO_RENOVACAO } from '../config/paywall';
import { useConteudo } from '../content/ContentContext';
import { useAcesso } from '../entitlements/EntitlementsContext';
import { acervoDaAssinatura, acervoGratuito, type ContagemDoAcervo } from '../entitlements/acervo';
import { diasRestantes } from '../entitlements/assinatura';
import { obterLoja, type ResultadoDaAssinatura } from '../entitlements/loja';
import { hojeLocal } from '../revisao/hoje';
import { track } from '../analytics/analytics';

// Tela de assinatura. Tudo o que a loja exige aparece antes do botão:
// preço, periodicidade, renovação automática e como cancelar.

// As contas saem do conteúdo compilado, não da memória de quem escreve a
// tela: assim elas continuam certas a cada tópico ou caso novo.
function listaDoQueAbre(pago: ContagemDoAcervo): string[] {
  return [
    `os ${pago.sistemas} sistemas que faltam, com ${pago.topicos} tópicos revisados`,
    `mais ${pago.casos} casos clínicos com decisões e desfecho`,
    `mais ${pago.checklists} checklists e as estações de prática deles`,
    `mais ${pago.verbetes} verbetes no modo plantão`,
    'a revisão espaçada de tudo isso',
    'e o que for publicado durante o ano',
  ];
}

function mensagemDoResultado(r: ResultadoDaAssinatura): string | null {
  switch (r.tipo) {
    case 'ok':
      return null;
    case 'cancelado_pelo_usuario':
      return null;
    case 'nada_a_restaurar':
      return 'Não encontramos nenhuma assinatura nesta conta da loja. Se você assinou com outra conta, entre com ela no aparelho e tente de novo.';
    case 'indisponivel':
      return 'A loja não está disponível neste aparelho. No navegador, o acesso completo não pode ser comprado: baixe o aplicativo para assinar.';
    case 'erro':
      return r.mensagem;
  }
}

export function TelaAssinatura() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const acesso = useAcesso();
  const gratuito = useMemo(() => acervoGratuito(conteudo), [conteudo]);
  const incluido = useMemo(() => listaDoQueAbre(acervoDaAssinatura(conteudo)), [conteudo]);
  const [ocupado, setOcupado] = useState<'assinar' | 'restaurar' | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [precos, setPrecos] = useState({ lancamento: PRECO_LANCAMENTO, renovacao: PRECO_RENOVACAO });

  useEffect(() => {
    track('assinatura_aberta', { estado: acesso.estado });
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
    async (qual: 'assinar' | 'restaurar') => {
      setErro(null);
      setOcupado(qual);
      try {
        const r = qual === 'assinar' ? await acesso.assinar() : await acesso.restaurar();
        setErro(mensagemDoResultado(r));
        if (r.tipo === 'ok') track('assinatura_concluida', { via: qual });
      } catch {
        setErro('Não foi possível falar com a loja agora. Tente de novo em alguns minutos.');
      } finally {
        setOcupado(null);
      }
    },
    [acesso],
  );

  const dias = diasRestantes(acesso.assinatura, hojeLocal());
  const jaTem = acesso.estado === 'ativa' || acesso.estado === 'cancelada';

  return (
    <Tela>
      <Cabecalho titulo="Acesso completo" aoVoltar={() => router.back()} />

      {jaTem ? (
        <View style={{ marginBottom: espaco.l }}>
          <Rotulo texto={acesso.estado === 'ativa' ? 'Assinatura ativa' : 'Assinatura cancelada'} cor={paleta.acentoTinta} />
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              lineHeight: Math.round(tipo.corpo * escala * 1.5),
              color: paleta.tinta,
              marginTop: espaco.xs,
            }}
          >
            {acesso.estado === 'ativa'
              ? `Você tem acesso a tudo. Renova em ${dias} dias.`
              : `A renovação foi cancelada. Seu acesso continua por mais ${dias} dias.`}
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
            Você está usando a parte gratuita: Anamnese, Exame físico geral, Aparelho cardiovascular e
            Aparelho respiratório, quatro sistemas inteiros, com {gratuito.topicos} tópicos,{' '}
            {gratuito.casos} casos, {gratuito.checklists} checklists e {gratuito.verbetes} verbetes do plantão.
          </Text>

          <Rotulo texto="A assinatura abre" cor={paleta.tinta2} />
          <View style={{ marginTop: espaco.xs, marginBottom: espaco.l }}>
            {incluido.map((linha) => (
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
            <Text
              style={{
                fontFamily: fonte.display,
                fontSize: Math.round(tipo.h2 * escala),
                color: paleta.tinta,
              }}
            >
              {precos.lancamento} no primeiro ano
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
              Depois {precos.renovacao} por ano, com renovação automática. Cancele quando quiser, direto na
              loja: o acesso vale até o fim do período já pago.
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
          accessibilityLabel={`Assinar por ${precos.lancamento} no primeiro ano`}
          accessibilityState={{ disabled: ocupado !== null }}
          onPress={() => {
            if (!ocupado) executar('assinar');
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
          {ocupado === 'assinar' ? (
            <ActivityIndicator color={paleta.superficie} />
          ) : (
            <>
              <Lock size={16} color={paleta.superficie} style={{ marginRight: espaco.s }} />
              <Text
                style={{
                  fontFamily: fonte.corpoBold,
                  fontSize: Math.round(tipo.corpo * escala),
                  color: paleta.superficie,
                }}
              >
                Assinar por {precos.lancamento}
              </Text>
            </>
          )}
        </Pressionavel>
      ) : null}

      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel="Já assinei, restaurar acesso"
        onPress={() => {
          if (!ocupado) executar('restaurar');
        }}
        style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
      >
        <Text
          style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.acentoTinta }}
        >
          {ocupado === 'restaurar' ? 'Procurando na loja...' : 'Já assinei, restaurar acesso'}
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
          No navegador o SemioGuia mostra a parte gratuita. O acesso completo se assina pelo aplicativo.
        </Text>
      ) : null}
    </Tela>
  );
}

export default function Assinatura() {
  return <TelaAssinatura />;
}
