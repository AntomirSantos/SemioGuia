import { Platform, Share } from 'react-native';

/**
 * Entrega um JSON ao aluno ("Exportar dados de uso" no Perfil):
 * - nativo: folha de compartilhamento do sistema (Share.share);
 * - web com Web Share API (PWA no celular): navigator.share;
 * - web sem ela (desktop): download direto de um arquivo .json.
 */
export async function compartilharJson(conteudo: string, nomeArquivo = 'semioguia-eventos.json'): Promise<void> {
  if (Platform.OS === 'web') {
    const nav = (globalThis as { navigator?: { share?: (dados: { title: string; text: string }) => Promise<void> } })
      .navigator;
    if (nav?.share) {
      await nav.share({ title: nomeArquivo, text: conteudo });
      return;
    }
    const doc = (globalThis as { document?: Document }).document;
    const URLGlobal = (globalThis as { URL?: typeof URL }).URL;
    if (!doc || !URLGlobal?.createObjectURL) return;
    const url = URLGlobal.createObjectURL(new Blob([conteudo], { type: 'application/json' }));
    const ancora = doc.createElement('a');
    ancora.href = url;
    ancora.download = nomeArquivo;
    ancora.click();
    URLGlobal.revokeObjectURL(url);
    return;
  }
  await Share.share({ title: nomeArquivo, message: conteudo });
}
