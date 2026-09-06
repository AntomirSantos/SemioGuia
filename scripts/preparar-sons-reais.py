# Prepara as gravações REAIS de ausculta a partir de datasets abertos:
# ver assets/sons/LICENCAS.md para proveniência, licenças e curadoria.
#
# - hf_lung: HF_Lung_V1 (Heroic-Faith + TSECCM, CC BY 4.0,
#   https://gitlab.com/techsupportHF/HF_Lung_V1), sons respiratórios.
# - circor: CirCor DigiScope (PhysioNet, ODC-BY 1.0,
#   https://physionet.org/content/circor-heart-sound/), sons cardíacos
#   pediátricos; de cada gravação corta-se a janela de 15 s mais estável.
#
# Uso: python3 scripts/preparar-sons-reais.py <hf_lung|circor> <dir-com-wavs>
# Os arquivos-fonte foram selecionados por rótulo e por métricas de sinal;
# o processamento é declarado (exigência das licenças para obras
# modificadas): passa-alta de 70 Hz (remove ruído de rede), normalização
# de pico a 0,8 e fades de 30 ms. Saída sempre em 15 s a 4 kHz.
import sys
import wave

import numpy as np
import soundfile as sf

# chave do registro → (arquivo-fonte no dataset, início da janela em s)
ESCOLHAS = {
    'hf_lung': {
        'murmurio-vesicular': ('steth_20190815_10_00_37', 0.0),
        'sibilos': ('trunc_2019-08-08-09-36-47-L1_3', 0.0),
        'roncos': ('steth_20190809_10_30_29', 0.0),
        # Estertores: rótulo único (D) no dataset, mas a triagem espectral
        # separa com folga: centroide ~714 Hz e ~6,6 transientes/s (finos,
        # em chuva teleinspiratória) contra ~294 Hz e ~2,1 transientes/s
        # (grossos, esparsos e graves).
        'estertores-finos': ('steth_20190801_10_55_11', 0.0),
        'estertores-grossos': ('steth_20190902_13_18_17', 0.0),
        # Estridor: ciclos inspiratórios rotulados, picos tonais de ~144 a
        # 383 Hz (abaixo dos ~400 Hz clássicos; divergência registrada no
        # tópico e em LICENCAS.md).
        'estridor': ('steth_20190811_10_09_06', 0.0),
    },
    # CirCor: seleção pelo training_data.csv (sopro, tempo, forma, grau,
    # foco mais audível) + triagem de sinal (ritmo, clipping, ruído de
    # rede); janela de 15 s escolhida por estabilidade do envelope.
    'circor': {
        'bulhas-normais': ('50017_MV', 6.5),
        'sopro-sistolico': ('40840_PV', 4.0),
        'sopro-regurgitacao': ('50233_MV', 13.0),
        'sopro-diastolico': ('50238_MV', 0.0),
    },
}
DURACAO_S = 15.0


def highpass(y, sr, corte=70.0):
    esp = np.fft.rfft(y)
    freqs = np.fft.rfftfreq(len(y), 1 / sr)
    ganho = np.ones_like(freqs)
    ganho[freqs < corte] = (freqs[freqs < corte] / corte) ** 2
    return np.fft.irfft(esp * ganho, len(y))


# Cardíaco: B1/B2 têm energia real entre ~25 e 150 Hz, então o passa-alta
# de 70 Hz do pulmonar as mutilaria. Aqui o corte é 25 Hz e o ruído de
# rede sai por filtros estreitos em 50/60 Hz e seus primeiros harmônicos.
def limpar_cardiaco(y, sr):
    esp = np.fft.rfft(y)
    freqs = np.fft.rfftfreq(len(y), 1 / sr)
    ganho = np.ones_like(freqs)
    corte = 25.0
    ganho[freqs < corte] = (freqs[freqs < corte] / corte) ** 2
    for f0 in (50.0, 60.0, 100.0, 120.0):
        ganho[np.abs(freqs - f0) < 1.0] = 0.05
    return np.fft.irfft(esp * ganho, len(y))


def main(dataset, origem):
    for chave, (nome, inicio) in ESCOLHAS[dataset].items():
        y, sr = sf.read(f'{origem}/{nome}.wav')
        if y.ndim > 1:
            y = y.mean(axis=1)
        a = int(inicio * sr)
        y = y[a:a + int(DURACAO_S * sr)]
        y = limpar_cardiaco(y, sr) if dataset == 'circor' else highpass(y, sr)
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
    main(sys.argv[1], sys.argv[2])
