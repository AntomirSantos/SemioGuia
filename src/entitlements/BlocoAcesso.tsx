import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { RotuloDeSecao } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { formatarDataProva } from '../plano/plano';
import { hojeLocal } from '../revisao/hoje';
import { useAcesso } from './EntitlementsContext';
import { diasRestantes } from './compra';

// Bloco "Seu acesso" do Perfil. É onde o aluno confere o que ele tem e como
// mexer nisso, sem precisar entrar na tela de compra.

function textoDoEstado(
  estado: string,
  validaAte: string | null,
  dias: number | null,
  comAnuncios: boolean,
): { titulo: string; corpo: string; acao: string | null } {
  const ate = validaAte ? formatarDataProva(validaAte) : '';
  // Sem anúncios neste aparelho e sem compra: é a web, onde o app é gratuito
  // e limpo. Prometer remoção de algo que não existe ali seria mentira.
  if (estado === 'nenhuma' && !comAnuncios) {
    return {
      titulo: 'Tudo aberto',
      corpo:
        'Os doze sistemas são seus, sem cadastro e sem prazo: tópicos, casos, questões, checklists e o modo plantão. No navegador não há anúncio nem compra.',
      acao: null,
    };
  }
  switch (estado) {
    case 'permanente':
      return {
        titulo: 'Sem anúncios, para sempre',
        corpo:
          'Você comprou a remoção dos anúncios. Foi uma vez só: não renova, não vence e vale também nas versões que vierem. Obrigado por sustentar o projeto.',
        acao: null,
      };
    case 'cortesia':
      return {
        titulo: 'Sem anúncios, por cortesia',
        corpo: validaAte
          ? `A cortesia vale até ${ate}, ou seja, mais ${dias ?? 0} dias. Depois disso os anúncios voltam, e a compra fica disponível no Perfil.`
          : 'Você está sem anúncios por cortesia, sem prazo para acabar.',
        acao: null,
      };
    case 'vencida':
      return {
        titulo: 'A cortesia acabou',
        corpo: `Ela valeu até ${ate}, e os anúncios voltaram. O conteúdo continua inteiro e aberto, como sempre esteve.`,
        acao: 'Remover os anúncios',
      };
    default:
      return {
        titulo: 'Tudo aberto, com anúncios',
        corpo:
          'Os doze sistemas são seus, sem cadastro e sem prazo: tópicos, casos, questões, checklists e o modo plantão. Os anúncios são o que paga a conta disso. Se eles atrapalham, dá para tirá-los de uma vez por todas.',
        acao: 'Remover os anúncios',
      };
  }
}

export function BlocoAcesso() {
  const { paleta, escala } = useTema();
  const acesso = useAcesso();

  const dias = diasRestantes(acesso.compra, hojeLocal());
  const { titulo, corpo, acao } = textoDoEstado(
    acesso.estado,
    acesso.compra.validaAte,
    dias,
    acesso.mostrarAnuncios,
  );

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
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta,
            marginBottom: espaco.xs,
          }}
        >
          {titulo}
        </Text>
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
            onPress={() => router.push('/sem-anuncios')}
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
