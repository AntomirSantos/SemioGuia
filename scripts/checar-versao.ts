// Gate de release: a versão do app vive em src/config/versao.ts (usada no
// Perfil e no cartão "O que mudou") e precisa ser a mesma de app.json, que é
// o que a loja lê. As duas já divergiram uma vez (app.json ficou em 1.0.0
// enquanto o app estava em 1.2.31), e esta checagem impede que aconteça de
// novo. Roda junto dos demais gates antes de publicar.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { VERSAO_APP } from '../src/config/versao';

export interface EstadoDaVersao {
  versaoApp: string;
  versaoAppJson: string;
  versionCode: number | undefined;
  pacoteAndroid: string | undefined;
}

export function lerEstado(raiz = join(__dirname, '..')): EstadoDaVersao {
  const config = JSON.parse(readFileSync(join(raiz, 'app.json'), 'utf-8')) as {
    expo: { version?: string; android?: { versionCode?: number; package?: string } };
  };
  return {
    versaoApp: VERSAO_APP,
    versaoAppJson: config.expo.version ?? '',
    versionCode: config.expo.android?.versionCode,
    pacoteAndroid: config.expo.android?.package,
  };
}

export function checarVersao(estado = lerEstado()): string[] {
  const problemas: string[] = [];
  if (estado.versaoAppJson !== estado.versaoApp) {
    problemas.push(
      `app.json diz version "${estado.versaoAppJson}" e src/config/versao.ts diz "${estado.versaoApp}"`,
    );
  }
  if (!estado.pacoteAndroid) {
    problemas.push('app.json sem expo.android.package: a loja exige um identificador de pacote');
  }
  if (typeof estado.versionCode !== 'number' || !Number.isInteger(estado.versionCode) || estado.versionCode < 1) {
    problemas.push('app.json sem expo.android.versionCode inteiro positivo');
  }
  return problemas;
}

if (require.main === module) {
  const problemas = checarVersao();
  if (problemas.length > 0) {
    console.error('ERRO: configuração de versão inconsistente:');
    for (const p of problemas) console.error('  ' + p);
    process.exit(1);
  }
  const e = lerEstado();
  console.log(`OK: versão ${e.versaoApp} em app.json e em versao.ts, pacote ${e.pacoteAndroid}, versionCode ${e.versionCode}.`);
}
