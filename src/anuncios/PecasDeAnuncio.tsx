import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CloudOff, Play } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { PRECO_SEM_ANUNCIOS } from '../config/paywall';
import { useDesbloqueio } from './DesbloqueioContext';
import { NOME_DA_ABA, type AbaDeConteudo } from './desbloqueio';
import type { ResultadoDoAnuncio } from './anuncios';

// As peças que o aluno vê quando o regime de anúncios está ligado: a parede de
// conexão, o portão de um conteúdo que abre com anúncio e a barra que faz a
// mesma coisa dentro de uma lista. Todas dizem a mesma coisa com o mesmo tom:
// o que abre, o que custa e qual é a saída definitiva.

function mensagemDoResultado(r: ResultadoDoAnuncio): string | null {
  switch (r.tipo) {
    case 'assistido':
    case 'sem_anuncio':
      return null;
    case 'desistiu':
      return 'O anúncio precisa terminar para abrir o conteúdo. Dá para tentar de novo.';
    case 'erro':
      return 'Não foi possível carregar o anúncio agora. Verifique a conexão e tente de novo.';
  }
}

/** O convite à compra, no mesmo tom em toda peça de bloqueio. */
function SaidaDefinitiva({ compacta = false }: { compacta?: boolean }) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      accessibilityLabel={`Remover os anúncios por ${PRECO_SEM_ANUNCIOS}, uma vez só`}
      onPress={() => router.push('/sem-anuncios')}
      style={{ minHeight: 44, justifyContent: 'center', marginTop: compacta ? 0 : espaco.s }}
    >
      <Text
        style={{
          fontFamily: fonte.corpoBold,
          fontSize: Math.round(tipo.small * escala),
          color: paleta.acentoTinta,
        }}
      >
        Ou tire os anúncios de vez, por {PRECO_SEM_ANUNCIOS}
      </Text>
    </Pressionavel>
  );
}

/**
 * Botão que roda o anúncio premiado. Cuida do estado ocupado e da mensagem de
 * erro, para que nenhuma tela precise repetir isso.
 */
export function BotaoAssistir({
  aba,
  sistemaId,
  sistemaTitulo,
  principal = true,
}: {
  aba: AbaDeConteudo;
  sistemaId: string;
  sistemaTitulo: string;
  principal?: boolean;
}) {
  const { paleta, escala } = useTema();
  const desbloqueio = useDesbloqueio();
  const [erro, setErro] = useState<string | null>(null);
  const ocupado = desbloqueio.rodando === `${aba}:${sistemaId}`;

  async function assistir() {
    if (desbloqueio.rodando) return;
    setErro(null);
    setErro(mensagemDoResultado(await desbloqueio.assistirPara(aba, sistemaId)));
  }

  return (
    <View>
      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel={`Assistir a um anúncio para abrir ${sistemaTitulo} ${NOME_DA_ABA[aba]}`}
        accessibilityState={{ disabled: ocupado }}
        onPress={assistir}
        style={{
          minHeight: principal ? 52 : 44,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: raio.m,
          backgroundColor: principal ? paleta.acento : 'transparent',
          borderWidth: principal ? 0 : 1,
          borderColor: paleta.linha,
          paddingHorizontal: espaco.m,
        }}
      >
        {ocupado ? (
          <ActivityIndicator color={principal ? paleta.superficie : paleta.tinta2} />
        ) : (
          <>
            <Play size={16} color={principal ? paleta.superficie : paleta.tinta} style={{ marginRight: espaco.s }} />
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.corpo * escala),
                color: principal ? paleta.superficie : paleta.tinta,
              }}
            >
              Assistir para abrir
            </Text>
          </>
        )}
      </Pressionavel>
      {erro ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.small * escala),
            lineHeight: Math.round(tipo.small * escala * 1.5),
            color: paleta.tinta2,
            marginTop: espaco.s,
          }}
        >
          {erro}
        </Text>
      ) : null}
    </View>
  );
}

/** Tela cheia: o conteúdo pedido abre com um anúncio. */
export function PortaoDeAnuncio({
  aba,
  sistemaId,
  sistemaTitulo,
  oQue,
}: {
  aba: AbaDeConteudo;
  sistemaId: string;
  sistemaTitulo: string;
  oQue: string;
}) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <Rotulo texto={`Abre com um anúncio`} cor={paleta.tinta2} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h2 * escala),
          lineHeight: Math.round(tipo.h2 * escala * 1.2),
          color: paleta.tinta,
          marginTop: espaco.xs,
          marginBottom: espaco.m,
        }}
      >
        {sistemaTitulo}
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
        Um anúncio abre {sistemaTitulo} {NOME_DA_ABA[aba]}, com {oQue} e tudo o mais que há ali, até
        você fechar o aplicativo. Anamnese e Exame físico geral seguem abertos sem anúncio nenhum.
      </Text>
      <BotaoAssistir aba={aba} sistemaId={sistemaId} sistemaTitulo={sistemaTitulo} />
      <SaidaDefinitiva />
    </Tela>
  );
}

/** Dentro de uma lista: a mesma oferta, do tamanho de um grupo. */
export function BarraDeLiberacao({
  aba,
  sistemaId,
  sistemaTitulo,
  quantos,
}: {
  aba: AbaDeConteudo;
  sistemaId: string;
  sistemaTitulo: string;
  quantos: string;
}) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: paleta.linha,
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
          color: paleta.tinta2,
          marginBottom: espaco.s,
        }}
      >
        {quantos} de {sistemaTitulo}. Um anúncio abre tudo isto {NOME_DA_ABA[aba]} até você fechar o
        aplicativo.
      </Text>
      <BotaoAssistir aba={aba} sistemaId={sistemaId} sistemaTitulo={sistemaTitulo} principal={false} />
      <SaidaDefinitiva compacta />
    </View>
  );
}

/** Sem internet e sem compra: o app pede conexão em vez de mostrar conteúdo. */
export function ParedeOffline({ comCabecalho = false }: { comCabecalho?: boolean }) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      {comCabecalho ? <Cabecalho titulo="" aoVoltar={() => router.back()} /> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.m }}>
        <CloudOff size={18} color={paleta.tinta2} />
        <Rotulo texto="Sem conexão" cor={paleta.tinta2} style={{ marginLeft: espaco.xs }} />
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
        Este aparelho está sem internet
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
        O SemioGuia gratuito precisa de conexão, porque é o anúncio que paga a conta. Estudar sem
        sinal, no plantão ou no ônibus, faz parte da compra: {PRECO_SEM_ANUNCIOS} uma vez, e o app
        funciona offline e sem anúncio para sempre.
      </Text>
      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel={`Ver a compra por ${PRECO_SEM_ANUNCIOS}`}
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
          style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.superficie }}
        >
          Usar offline por {PRECO_SEM_ANUNCIOS}
        </Text>
      </Pressionavel>
    </Tela>
  );
}
