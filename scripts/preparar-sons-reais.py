# Prepara as gravações REAIS de ausculta pulmonar a partir do dataset
# HF_Lung_V1 (Heroic-Faith Medical Science Co. Ltd. + TSECCM, CC BY 4.0,
# https://gitlab.com/techsupportHF/HF_Lung_V1): ver assets/sons/LICENCAS.md.
#
# Uso: python3 scripts/preparar-sons-reais.py <dir-com-wavs-do-dataset>
# Os arquivos-fonte (15 s, 4 kHz, rotulados) foram selecionados por rótulo
# e por métricas de sinal; o processamento é declarado (exigência do CC BY
# para obras modificadas): passa-alta de 70 Hz (remove ruído de rede),
# normalização de pico a 0,8 e fades de 30 ms.
import sys
import wave

import numpy as np
import soundfile as sf

# chave do registro → arquivo-fonte no dataset (test set)
ESCOLHAS = {
    'murmurio-vesicular': 'steth_20190815_10_00_37',
    'sibilos': 'trunc_2019-08-08-09-36-47-L1_3',
    'roncos': 'steth_20190809_10_30_29',
}


def highpass(y, sr, corte=70.0):
    esp = np.fft.rfft(y)
    freqs = np.fft.rfftfreq(len(y), 1 / sr)
    ganho = np.ones_like(freqs)
    ganho[freqs < corte] = (freqs[freqs < corte] / corte) ** 2
    return np.fft.irfft(esp * ganho, len(y))


def main(origem):
    for chave, nome in ESCOLHAS.items():
        y, sr = sf.read(f'{origem}/{nome}.wav')
        if y.ndim > 1:
            y = y.mean(axis=1)
        y = highpass(y, sr)
        y = y / (np.max(np.abs(y)) + 1e-9) * 0.8
        n_fade = int(0.03 * sr)
        y[:n_fade] *= np.linspace(0, 1, n_fade)
        y[-n_fade:] *= np.linspace(1, 0, n_fade)
        dados = (np.clip(y, -1, 1) * 32767).astype('<i2')
        destino = f'assets/sons/{chave}.wav'
        with wave.open(destino, 'wb') as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(sr)
            w.writeframes(dados.tobytes())
        print(f'{chave}.wav <- {nome} ({len(y) / sr:.1f}s @ {sr} Hz)')


if __name__ == '__main__':
    main(sys.argv[1])
