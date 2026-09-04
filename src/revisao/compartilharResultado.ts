import { Platform, Share } from 'react-native';

// Compartilhar o resultado de uma estação OSCE (beta §9.3). A imagem é
// desenhada no próprio aparelho, em canvas, na identidade Editorial clara
// (papel/tinta/vinho): nenhum dado sai do aparelho além do que o aluno
// decide compartilhar. Na web usa a Web Share API (arquivos) com fallback
// de download; no nativo compartilha o texto (gerar bitmap de views exigiria
// dependência nova, fora do escopo do beta em PWA).

export interface DadosResultadoOsce {
  titulo: string;
  lembrados: number;
  total: number;
  percentual: number;
}

export type MeioCompartilhado = 'imagem' | 'download' | 'texto' | 'nenhum';

export const LARGURA_IMAGEM = 1080;
export const ALTURA_IMAGEM = 1350;

// Paleta Editorial clara fixa (tokens de src/design/tokens.ts): a imagem é
// um artefato externo, não segue o tema do aparelho.
const PAPEL = '#FFFFFF';
const TINTA = '#111111';
const TINTA2 = '#6B6B6B';
const LINHA = '#DDDDDD';
const VINHO = '#8E1F2F';

export function montarTextoResultado(d: DadosResultadoOsce): string {
  return [
    `Estação OSCE: ${d.titulo}`,
    `${d.lembrados} de ${d.total} passos lembrados (${d.percentual}%)`,
    'SemioGuia · semiologia no bolso',
  ].join('\n');
}

// Subconjunto do CanvasRenderingContext2D que o desenho usa: permite testar
// o layout com um contexto falso, sem canvas real no Jest.
export interface Ctx2dMinimo {
  fillStyle: string;
  font: string;
  fillRect(x: number, y: number, w: number, h: number): void;
  fillText(texto: string, x: number, y: number): void;
  measureText(texto: string): { width: number };
}

function quebrarLinhas(ctx: Ctx2dMinimo, texto: string, larguraMax: number): string[] {
  const palavras = texto.split(' ');
  const linhas: string[] = [];
  let atual = '';
  for (const palavra of palavras) {
    const tentativa = atual ? `${atual} ${palavra}` : palavra;
    if (atual && ctx.measureText(tentativa).width > larguraMax) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = tentativa;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

const SERIF = '"Libre Bodoni", Georgia, serif';
const SANS = '"Public Sans", system-ui, sans-serif';

/** Desenha o cartão 1080×1350 (4:5). Determinístico dado (dados, dataIso). */
export function desenharResultado(ctx: Ctx2dMinimo, d: DadosResultadoOsce, dataIso: string): void {
  const M = 96; // margem
  const larguraUtil = LARGURA_IMAGEM - 2 * M;

  ctx.fillStyle = PAPEL;
  ctx.fillRect(0, 0, LARGURA_IMAGEM, ALTURA_IMAGEM);

  // masthead + regra editorial de 2.5px (escala ×3 do app → 8px)
  ctx.fillStyle = TINTA;
  ctx.font = `700 64px ${SERIF}`;
  ctx.fillText('SemioGuia', M, M + 64);
  ctx.fillStyle = TINTA2;
  ctx.font = `700 28px ${SANS}`;
  ctx.fillText('ESTAÇÃO OSCE', M, M + 128);
  ctx.fillStyle = TINTA;
  ctx.fillRect(M, M + 160, larguraUtil, 8);

  // título do checklist (quebra em até 3 linhas)
  ctx.font = `700 72px ${SERIF}`;
  let y = M + 160 + 120;
  for (const linha of quebrarLinhas(ctx, d.titulo, larguraUtil).slice(0, 3)) {
    ctx.fillText(linha, M, y);
    y += 88;
  }

  // percentual gigante em vinho + placar
  ctx.fillStyle = VINHO;
  ctx.font = `700 280px ${SERIF}`;
  ctx.fillText(`${d.percentual}%`, M, y + 300);
  ctx.fillStyle = TINTA;
  ctx.font = `600 44px ${SANS}`;
  ctx.fillText(`${d.lembrados} de ${d.total} passos lembrados`, M, y + 390);

  // rodapé: hairline + data + endereço
  ctx.fillStyle = LINHA;
  ctx.fillRect(M, ALTURA_IMAGEM - M - 96, larguraUtil, 2);
  ctx.fillStyle = TINTA2;
  ctx.font = `400 32px ${SANS}`;
  const [ano, mes, dia] = dataIso.split('-');
  ctx.fillText(`${dia}/${mes}/${ano} · antomirsantos.github.io/SemioGuia`, M, ALTURA_IMAGEM - M - 32);
}

interface NavegadorComShare {
  share?: (dados: { files?: File[]; title?: string; text?: string }) => Promise<void>;
  canShare?: (dados: { files?: File[] }) => boolean;
}

/**
 * Compartilha o resultado; devolve o meio efetivamente usado. Cancelar a
 * folha de compartilhamento rejeita (AbortError): o chamador decide se
 * conta como compartilhado (não conta).
 */
export async function compartilharResultadoOsce(d: DadosResultadoOsce): Promise<MeioCompartilhado> {
  if (Platform.OS !== 'web') {
    await Share.share({ title: 'Resultado OSCE', message: montarTextoResultado(d) });
    return 'texto';
  }

  const doc = (globalThis as { document?: Document }).document;
  const nav = (globalThis as { navigator?: NavegadorComShare }).navigator;
  const canvas = doc?.createElement('canvas');
  const ctx = canvas?.getContext?.('2d') ?? null;

  if (!canvas || !ctx) {
    // Sem canvas (raro): ao menos o texto pela Web Share API.
    if (nav?.share) {
      await nav.share({ title: 'Resultado OSCE', text: montarTextoResultado(d) });
      return 'texto';
    }
    return 'nenhum';
  }

  canvas.width = LARGURA_IMAGEM;
  canvas.height = ALTURA_IMAGEM;
  desenharResultado(ctx as unknown as Ctx2dMinimo, d, new Date().toISOString().slice(0, 10));
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) return 'nenhum';

  const arquivo = new File([blob], 'semioguia-osce.png', { type: 'image/png' });
  if (nav?.share && nav.canShare?.({ files: [arquivo] })) {
    await nav.share({ files: [arquivo], title: 'Resultado OSCE', text: montarTextoResultado(d) });
    return 'imagem';
  }

  // Desktop sem Web Share API: baixa o PNG.
  const URLGlobal = (globalThis as { URL?: typeof URL }).URL;
  if (!doc || !URLGlobal?.createObjectURL) return 'nenhum';
  const url = URLGlobal.createObjectURL(blob);
  const ancora = doc.createElement('a');
  ancora.href = url;
  ancora.download = 'semioguia-osce.png';
  ancora.click();
  URLGlobal.revokeObjectURL(url);
  return 'download';
}
