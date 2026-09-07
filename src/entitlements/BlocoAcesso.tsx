import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { RotuloDeSecao } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { formatarDataProva } from '../plano/plano';
import { hojeLocal } from '../revisao/hoje';
import { useAcesso } from './EntitlementsContext';
import { diasRestantes } from './assinatura';

// Bloco "Seu acesso" do Perfil. É onde o aluno confere o que ele tem, quando
// vence e como mexer nisso, sem precisar entrar na tela de compra.

function textoDoEstado(
  estado: string,
  validaAte: string | null,
  dias: number | null,
): { titulo: string; corpo: string; acao: string | null } {
  const ate = validaAte ? formatarDataProva(validaAte) : '';
  switch (estado) {
    case 'ativa':
      return {
        titulo: 'Assinatura anual ativa',
        corpo: `Você tem os 12 sistemas abertos. Renova sozinha em ${ate}, e o cancelamento é feito na assinatura da loja, no seu aparelho.`,
        acao: null,
      };
    case 'cancelada':
      return {
        titulo: 'Assinatura cancelada',
        corpo: `A renovação foi desligada. O acesso completo continua valendo até ${ate}, ou seja, mais ${dias ?? 0} dias.`,
        acao: 'Assinar de novo',
      };
    case 'vencida':
      return {
        titulo: 'Assinatura vencida',
        corpo: `O acesso completo valeu até ${ate}. Os quatro sistemas gratuitos continuam abertos, e o seu progresso está guardado inteiro.`,
        acao: 'Renovar o acesso',
      };
    case 'sem_confirmacao':
      return {
        titulo: 'Assinatura por confirmar',
        corpo: 'Faz tempo que este aparelho não fala com a loja. Conecte à internet e toque abaixo para restaurar o acesso completo.',
        acao: 'Restaurar o acesso',
      };
    default:
      return {
        titulo: 'Acesso gratuito',
        corpo:
          'Você tem quatro sistemas completos: Anamnese, Exame físico geral, Aparelho cardiovascular e Aparelho respiratório, com tudo o que existe neles. A assinatura anual abre os outros oito.',
        acao: 'Ver o acesso completo',
      };
  }
}

export function BlocoAcesso() {
  const { paleta, escala } = useTema();
  const acesso = useAcesso();
  if (!acesso.paywallAtivo) return null;

  const dias = diasRestantes(acesso.assinatura, hojeLocal());
  const { titulo, corpo, acao } = textoDoEstado(acesso.estado, acesso.assinatura.validaAte, dias);

  return (
    <View>
      <RotuloDeSecao texto="Seu acesso" />
      <View
        style={{
          borderWidth: 1,
          borderColor: paleta.linha,
          borderRadius: raio.m,
          padding: espaco.l,
          marginBottom: espaco.l,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
          {acesso.estado === 'gratuito' ? <Lock size={14} color={paleta.tinta2} /> : null}
          <Text
            style={{
              marginLeft: acesso.estado === 'gratuito' ? espaco.xs : 0,
              fontFamily: fonte.corpoBold,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
            }}
          >
            {titulo}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.small * escala),
            lineHeight: Math.round(tipo.small * escala * 1.5),
            color: paleta.tinta2,
          }}
        >
          {corpo}
        </Text>
        {acao ? (
          <Pressionavel
            accessibilityRole="button"
            accessibilityLabel={acao}
            onPress={() => router.push('/assinatura')}
            style={{ minHeight: 44, justifyContent: 'center', marginTop: espaco.xs }}
          >
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.small * escala),
                color: paleta.acentoTinta,
              }}
            >
              {acao}
            </Text>
          </Pressionavel>
        ) : null}
      </View>
    </View>
  );
}
