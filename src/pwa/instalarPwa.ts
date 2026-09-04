// Aviso de instalação da PWA (beta §9.7): lógica pura, testável fora do
// navegador. O componente (AvisoInstalarPwa) só liga os fios.

export const DISPENSA_MS = 7 * 24 * 60 * 60 * 1000; // fechamento vale 7 dias
export const CHAVE_DISPENSA = 'semioguia.pwa.dispensadoEm';

export type PlataformaWeb = 'ios' | 'android' | 'outra';

export function detectarPlataformaWeb(userAgent: string): PlataformaWeb {
  const ua = userAgent.toLowerCase();
  // iPadOS 13+ se anuncia como Macintosh; o toque é o discriminador usual,
  // mas sem o navigator aqui, ficamos no sinal clássico de iPhone/iPad.
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'outra';
}

export function estaInstalada(args: { displayModeStandalone: boolean; navigatorStandalone: boolean }): boolean {
  // Chrome/Android expõe display-mode: standalone; o Safari iOS expõe
  // navigator.standalone: qualquer um dos dois significa "já instalada".
  return args.displayModeStandalone || args.navigatorStandalone;
}

export function deveMostrarAviso(args: {
  ehWeb: boolean;
  instalada: boolean;
  dispensadoEm: number | null;
  agora: number;
}): boolean {
  if (!args.ehWeb || args.instalada) return false;
  if (args.dispensadoEm !== null && args.agora - args.dispensadoEm < DISPENSA_MS) return false;
  return true;
}

export function instrucaoDeInstalacao(plataforma: PlataformaWeb): string {
  switch (plataforma) {
    case 'ios':
      return 'No Safari: toque em Compartilhar e depois em "Adicionar à Tela de Início".';
    case 'android':
      return 'No Chrome: abra o menu ⋮ e toque em "Instalar app".';
    default:
      return 'No menu do navegador, procure "Instalar app" (ou "Adicionar à tela inicial").';
  }
}
