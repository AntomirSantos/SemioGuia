import { ScrollView, Text, View } from 'react-native';
import { Table2 } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';

type TabelaBlocoTipo = Extract<Bloco, { tipo: 'tabela' }>;

const LARGURA_COLUNA = 130;

export function TabelaBloco({ bloco }: { bloco: TabelaBlocoTipo }) {
  const { paleta, escala } = useTema();
  const corpo = Math.round(tipo.corpo * escala);
  return (
    <View style={{ marginVertical: espaco.xl }}>
      <IdentidadeBloco Icone={Table2} rotulo="Tabela" />
      {bloco.titulo ? (
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
          {bloco.titulo}
        </Text>
      ) : null}
      <ScrollView horizontal style={{ borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, backgroundColor: paleta.superficie, ...sombra }}>
        <View>
          <View style={{ flexDirection: 'row', backgroundColor: paleta.superficie2 }}>
            {bloco.colunas.map((col, i) => (
              <Text
                key={i}
                style={{ width: LARGURA_COLUNA, padding: espaco.s + 2, fontFamily: fonte.corpoBold, fontSize: tipo.small, textTransform: 'uppercase', letterSpacing: 0.5, color: paleta.acentoTinta }}
              >
                {col}
              </Text>
            ))}
          </View>
          {bloco.linhas.map((linha, li) => (
            <View
              key={li}
              style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: paleta.linha,
                // Zebra sutil: linhas ímpares (li par, 0-indexado) recebem o
                // fundo da página em vez do fundo do cartão, para orientar a
                // leitura horizontal sem depender de cor nova (tokens Fase 8 §3.2).
                backgroundColor: li % 2 === 0 ? paleta.superficie : paleta.fundo,
              }}
            >
              {linha.map((celula, ci) => (
                <Text
                  key={ci}
                  style={{ width: LARGURA_COLUNA, padding: espaco.s, fontFamily: fonte.corpo, fontSize: corpo, color: paleta.tinta, fontVariant: ['tabular-nums'] }}
                >
                  {celula}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
