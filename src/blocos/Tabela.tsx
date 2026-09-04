import { ScrollView, Text, View } from 'react-native';
import { Table2 } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';

type TabelaBlocoTipo = Extract<Bloco, { tipo: 'tabela' }>;

// Revisão de fase P3a: 130 (valor original, pré-Fase 8) já não bastava para
// a palavra isolada mais longa que aparece de verdade em cabeçalhos de
// coluna no conteúdo: medido na época no font então vigente (bold de UI,
// 14px, uppercase, letterSpacing 0.5): "Classificação" precisa de ~119px,
// "verossimilhança" de ~142px, "Características" de ~138px. 170 (menos os
// 16px de padding = 154px úteis) cobre o pior caso real com folga, sem
// reverter o padding das células (que já é igual ao das linhas de dado).
const LARGURA_COLUNA = 170;

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
              // Padding igual ao das células de dados (`espaco.s`, sem o
              // `+2` que uma rodada anterior chegou a testar): ver
              // LARGURA_COLUNA acima para a conta completa do fix P3a.
              <Text
                key={i}
                style={{ width: LARGURA_COLUNA, padding: espaco.s, fontFamily: fonte.corpoBold, fontSize: tipo.small, textTransform: 'uppercase', letterSpacing: 0.5, color: paleta.acentoTinta }}
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
