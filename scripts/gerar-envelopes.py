# Gera src/config/envelopes.ts com o envelope de pico (96 barras, normalizado)
# de cada assets/sons/*.wav: o traçado do fonocardiograma que o bloco de
# ausculta desenha sincronizado ao som. Pico por janela, e não RMS, porque os
# transientes (B1/B2, estalidos) são o que se quer ver no traçado.
import wave, struct, glob, os

N_BARRAS = 96

def envelope(caminho):
    with wave.open(caminho, 'rb') as w:
        n = w.getnframes(); ch = w.getnchannels(); sw = w.getsampwidth()
        dados = w.readframes(n)
    if sw != 2:
        raise SystemExit(f'sampwidth {sw} nao tratado em {caminho}')
    amostras = struct.unpack('<' + 'h' * (len(dados) // 2), dados)
    if ch > 1:
        amostras = amostras[::ch]
    tam = max(1, len(amostras) // N_BARRAS)
    env = []
    for i in range(N_BARRAS):
        janela = amostras[i * tam:(i + 1) * tam]
        env.append(max(abs(min(janela)), abs(max(janela))) / 32768.0 if janela else 0.0)
    pico = max(env) or 1.0
    return [round(v / pico, 3) for v in env]

envs = {os.path.splitext(os.path.basename(a))[0]: envelope(a) for a in sorted(glob.glob('assets/sons/*.wav'))}
linhas = [
    '// GERADO por scripts/gerar-envelopes.py a partir de assets/sons/*.wav:',
    '// edite o script, nunca este arquivo. Envelope de pico normalizado',
    '// (96 barras por som) para o fonocardiograma do bloco de ausculta.',
    '',
    'export const ENVELOPES_DE_SOM: Record<string, number[]> = {',
]
for chave, env in envs.items():
    linhas.append(f"  '{chave}': [{', '.join(str(v) for v in env)}],")
linhas.append('};')
open('src/config/envelopes.ts', 'w').write('\n'.join(linhas) + '\n')
print('envelopes gerados:', len(envs))
