import { useState } from 'react';
import { Linking, Modal, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { FEEDBACK } from '../config/feedback';
import { VERSAO_APP } from '../config/versao';
import { track } from '../analytics/analytics';
import {
  CATEGORIAS_FEEDBACK,
  montarUrlFormulario,
  type CategoriaFeedback,
  type ContextoFeedback,
} from './feedback';

// Folha de feedback (beta §9.5): três chips + texto livre. O envio sempre
// registra o evento feedback_enviado (com tópico, versão e plataforma);
// quando o formulário configurável (src/config/feedback.ts) existe, abre a
// URL pré-preenchida por cima.
export function FolhaFeedback({
  visivel,
  aoFechar,
  topicoId = '',
}: {
  visivel: boolean;
  aoFechar: () => void;
  topicoId?: string;
}) {
  const { paleta, escala } = useTema();
  const [categoria, setCategoria] = useState<CategoriaFeedback>('Sugestão');
  const [texto, setTexto] = useState('');
  const [enviado, setEnviado] = useState(false);

  const contexto: ContextoFeedback = { topicoId, versao: VERSAO_APP, plataforma: Platform.OS };

  function enviar() {
    track('feedback_enviado', {
      categoria,
      texto: texto.trim(),
      topicoId,
      versao: VERSAO_APP,
      plataforma: Platform.OS,
    });
    if (FEEDBACK) {
      Linking.openURL(montarUrlFormulario(FEEDBACK, { categoria, texto: texto.trim(), contexto })).catch(() => {});
    }
    setEnviado(true);
  }

  function fechar() {
    setEnviado(false);
    setTexto('');
    aoFechar();
  }

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={fechar}>
      <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: paleta.superficie,
            borderTopWidth: 2.5,
            borderTopColor: paleta.tinta,
            padding: espaco.xl,
            paddingBottom: espaco.xl + espaco.l,
          }}
        >
          {enviado ? (
            <>
              <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
                Obrigado!
              </Text>
              <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2, marginBottom: espaco.l }}>
                Seu feedback ajuda a melhorar o guia durante o beta.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={fechar}
                style={{ minHeight: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: paleta.acento, borderRadius: raio.m }}
              >
                <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.superficie }}>
                  Fechar
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
                Dar feedback
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: espaco.xs, marginBottom: espaco.m }}>
                {CATEGORIAS_FEEDBACK.map((c) => {
                  const ativa = categoria === c;
                  return (
                    <Pressable
                      key={c}
                      accessibilityRole="button"
                      accessibilityState={{ selected: ativa }}
                      onPress={() => setCategoria(c)}
                      style={{
                        minHeight: 36,
                        justifyContent: 'center',
                        paddingHorizontal: espaco.m,
                        borderRadius: raio.pill,
                        backgroundColor: ativa ? paleta.acento : paleta.superficie2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: ativa ? fonte.corpoBold : fonte.corpo,
                          fontSize: Math.round(tipo.small * escala),
                          color: ativa ? paleta.superficie : paleta.tinta,
                        }}
                      >
                        {c}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <TextInput
                value={texto}
                onChangeText={setTexto}
                placeholder="Conte o que encontrou ou o que sugere…"
                placeholderTextColor={paleta.tinta2}
                accessibilityLabel="Texto do feedback"
                multiline
                style={{
                  minHeight: 96,
                  borderRadius: raio.m,
                  backgroundColor: paleta.superficie2,
                  padding: espaco.m,
                  fontFamily: fonte.corpo,
                  fontSize: Math.round(tipo.corpo * escala),
                  color: paleta.tinta,
                  textAlignVertical: 'top',
                  marginBottom: espaco.xs,
                }}
              />
              <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.tag * escala), color: paleta.tinta2, marginBottom: espaco.m }}>
                {topicoId ? `Inclui automaticamente: ${topicoId}, ` : 'Inclui automaticamente: '}
                v{VERSAO_APP} · {Platform.OS}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={enviar}
                style={{ minHeight: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: paleta.acento, borderRadius: raio.m, marginBottom: espaco.s }}
              >
                <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.superficie }}>
                  Enviar
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={fechar}
                style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
                  Cancelar
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
