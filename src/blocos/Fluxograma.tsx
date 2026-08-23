import { Text, View } from 'react-native';
import { Workflow } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type FluxogramaBloco = Extract<Bloco, { tipo: 'fluxograma' }>;

const ROTULOS: Record<string, string> = { inicio: 'Início', decisao: 'Decisão', acao: 'Ação', fim: 'Fim' };

export function Fluxograma({ bloco }: { bloco: FluxogramaBloco }) {
  const { paleta, escala } = useTema();
  const corpo = Math.round(tipo.corpo * escala);
  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.xl, ...sombra }}>
      <IdentidadeBloco Icone={Workflow} rotulo="Fluxograma" />
      {bloco.titulo ? (
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
          {bloco.titulo}
        </Text>
      ) : null}
      {bloco.etapas.map((etapa, i) => {
        const ultima = i === bloco.etapas.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row', paddingBottom: ultima ? 0 : espaco.m }}>
            <View style={{ width: 20, alignItems: 'center' }}>
              <View
                style={
                  etapa.formato === 'decisao'
                    ? { width: 12, height: 12, borderRadius: 3, backgroundColor: paleta.acento, transform: [{ rotate: '45deg' }], marginTop: 4 }
                    : { width: 12, height: 12, borderRadius: 6, backgroundColor: paleta.acento, marginTop: 4 }
                }
              />
              {!ultima ? <View style={{ flex: 1, width: 2, backgroundColor: paleta.linha, marginTop: 4 }} /> : null}
            </View>
            <View style={{ flex: 1, marginLeft: espaco.s }}>
              <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag - 0.5, letterSpacing: 0.8, textTransform: 'uppercase', color: paleta.tinta2 }}>
                {ROTULOS[etapa.formato]}
              </Text>
              <TextoRico style={{ fontSize: corpo, color: paleta.tinta }}>{etapa.texto}</TextoRico>
            </View>
          </View>
        );
      })}
    </View>
  );
}
