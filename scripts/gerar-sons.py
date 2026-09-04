# Sintetizador dos sons de ausculta do SemioGuia.
#
# Todos os sons do app nascem DESTE script: nenhuma gravação de terceiros,
# nenhum direito autoral envolvido. São representações didáticas canônicas
# (fonocardiograma sintético), não gravações clínicas: o aviso no app diz
# isso ao estudante. Rodar: python3 scripts/gerar-sons.py  → assets/sons/*.wav
#
# Decisões de engenharia:
# - 16 kHz mono 16-bit: os fenômenos auscultatórios vivem abaixo de ~2 kHz;
#   16 kHz dá margem para os estalidos finos e mantém cada arquivo pequeno.
# - Bulhas como senoides amortecidas de baixa frequência (30-150 Hz);
#   sopros e murmúrio como ruído filtrado por FFT com envelope temporal;
#   sibilo como tom musical com vibrato sobre a expiração.
# - Cada arquivo fecha um número inteiro de ciclos, para o loop do player
#   não "pular".
import os
import wave

import numpy as np

SR = 16000
SAIDA = os.path.join(os.path.dirname(__file__), '..', 'assets', 'sons')


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def damped_sine(freq, dur, tau, atraso=0.0, ataque=0.008):
    """Senoide amortecida com ataque curto: o tijolo das bulhas."""
    t = t_axis(dur)
    y = np.sin(2 * np.pi * freq * t) * np.exp(-t / tau)
    n_ataque = max(1, int(ataque * SR))
    y[:n_ataque] *= np.linspace(0, 1, n_ataque)
    silencio = np.zeros(int(atraso * SR))
    return np.concatenate([silencio, y])


def bulha1():
    # B1: mais grave e um pouco mais longa, "lub".
    return 1.0 * damped_sine(42, 0.16, 0.050) + 0.6 * damped_sine(90, 0.16, 0.035)


def bulha2():
    # B2: mais curta e de timbre um pouco mais agudo, "dub".
    return 0.85 * damped_sine(65, 0.12, 0.032) + 0.55 * damped_sine(140, 0.12, 0.022)


def bulha3():
    # B3: muito grave, surda, mais fraca, o terceiro tempo do galope.
    return 0.6 * damped_sine(32, 0.14, 0.045) + 0.25 * damped_sine(60, 0.14, 0.035)


def ruido_banda(dur, f_lo, f_hi, semente, grave=False):
    """Ruído branco filtrado por FFT para a banda [f_lo, f_hi].

    `grave=True` aplica inclinação espectral de -6 dB/oitava acima de
    100 Hz: concentra a energia no grave, como o murmúrio vesicular que o
    texto descreve "em torno de 100 Hz" (auditoria numérica de 2026-09:
    sem a inclinação, a banda plana deixava o domínio em 200-500 Hz).
    """
    rng = np.random.default_rng(semente)
    n = int(dur * SR)
    ruido = rng.standard_normal(n)
    espectro = np.fft.rfft(ruido)
    freqs = np.fft.rfftfreq(n, 1 / SR)
    mascara = ((freqs >= f_lo) & (freqs <= f_hi)).astype(float)
    # Bordas suaves (janela de 40 Hz) para o filtro não "tocar" sozinho.
    for i, f in enumerate(freqs):
        if f_lo - 40 < f < f_lo:
            mascara[i] = (f - (f_lo - 40)) / 40
        elif f_hi < f < f_hi + 40:
            mascara[i] = ((f_hi + 40) - f) / 40
    if grave:
        mascara *= np.minimum(1.0, 100.0 / np.maximum(freqs, 1.0))
    y = np.fft.irfft(espectro * mascara, n)
    return y / (np.max(np.abs(y)) + 1e-9)


def env_diamante(n, pico=0.5):
    """Envelope crescendo-decrescendo (o 'diamante' do sopro ejetivo)."""
    x = np.linspace(0, 1, n)
    e = np.where(x < pico, x / pico, (1 - x) / (1 - pico))
    return np.clip(e, 0, 1) ** 1.2


def env_decrescendo(n):
    x = np.linspace(0, 1, n)
    return (1 - x) ** 1.6


def colocar(base, som, inicio_s, ganho=1.0):
    i = int(inicio_s * SR)
    fim = min(len(base), i + len(som))
    base[i:fim] += ganho * som[: fim - i]


def normalizar(y, alvo=0.55):
    return y / (np.max(np.abs(y)) + 1e-9) * alvo


def salvar(nome, y):
    os.makedirs(SAIDA, exist_ok=True)
    # Fades globais de 20 ms nas pontas, contra cliques no loop.
    n_fade = int(0.02 * SR)
    y = y.copy()
    y[:n_fade] *= np.linspace(0, 1, n_fade)
    y[-n_fade:] *= np.linspace(1, 0, n_fade)
    dados = (np.clip(y, -1, 1) * 32767).astype('<i2')
    caminho = os.path.join(SAIDA, nome)
    with wave.open(caminho, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(dados.tobytes())
    print(f'{nome}: {len(y) / SR:.2f}s, {os.path.getsize(caminho) // 1024} KB')


# ---------------------------------------------------------------- coração

CICLO = 0.8  # 75 bpm
SISTOLE = 0.30  # B1 → B2; a diástole (0,50 s) é mais longa, como no tópico


def ciclos_cardiacos(n_ciclos, com=None, bpm_ciclo=CICLO):
    dur = n_ciclos * bpm_ciclo
    y = np.zeros(int(dur * SR))
    for k in range(n_ciclos):
        t0 = k * bpm_ciclo
        colocar(y, bulha1(), t0)
        colocar(y, bulha2(), t0 + SISTOLE)
        if com is not None:
            com(y, t0)
    return y


def som_bulhas_normais():
    return normalizar(ciclos_cardiacos(8))


def som_sopro_sistolico():
    # Sopro mesossistólico em diamante: começa após B1, pico no meio da
    # sístole, termina antes de B2.
    dur_sopro = SISTOLE - 0.10

    def sopro(y, t0):
        n = int(dur_sopro * SR)
        ruido = ruido_banda(dur_sopro, 120, 480, semente=int(t0 * 1000) + 7)
        colocar(y, ruido * env_diamante(n), t0 + 0.05, ganho=0.55)

    return normalizar(ciclos_cardiacos(8, com=sopro))


def som_sopro_diastolico():
    # Sopro diastólico aspirativo: nasce logo após B2 e decresce.
    dur_sopro = 0.34

    def sopro(y, t0):
        n = int(dur_sopro * SR)
        ruido = ruido_banda(dur_sopro, 220, 800, semente=int(t0 * 1000) + 13)
        colocar(y, ruido * env_decrescendo(n), t0 + SISTOLE + 0.05, ganho=0.4)

    return normalizar(ciclos_cardiacos(8, com=sopro))


def som_galope_b3():
    # Ritmo tríplice por B3: PA-TA-TA, um pouco mais rápido (galope).
    ciclo = 0.62  # ~97 bpm
    sistole = 0.26

    def montar():
        n_ciclos = 10
        y = np.zeros(int(n_ciclos * ciclo * SR))
        for k in range(n_ciclos):
            t0 = k * ciclo
            colocar(y, bulha1(), t0)
            colocar(y, bulha2(), t0 + sistole)
            colocar(y, bulha3(), t0 + sistole + 0.15)
        return y

    return normalizar(montar())


# ----------------------------------------------------------------- pulmão

RESP = 4.0  # ciclo respiratório de 4 s (15 irpm)


def respiracao_base(n_ciclos, insp=1.5, exp_audivel=0.7, ganho_exp=0.45, semente=3):
    """Murmúrio vesicular: inspiração mais longa e mais alta; expiração
    audível só no começo, mais baixa: a assinatura do som normal."""
    dur = n_ciclos * RESP
    y = np.zeros(int(dur * SR))
    for k in range(n_ciclos):
        t0 = k * RESP
        n_i = int(insp * SR)
        ruido_i = ruido_banda(insp, 60, 500, semente=semente + k * 2, grave=True)
        env_i = np.sin(np.linspace(0, np.pi, n_i)) ** 1.3
        colocar(y, ruido_i * env_i, t0, ganho=0.9)
        n_e = int(exp_audivel * SR)
        ruido_e = ruido_banda(exp_audivel, 60, 400, semente=semente + k * 2 + 1, grave=True)
        env_e = np.sin(np.linspace(0, np.pi, n_e)) ** 1.6
        colocar(y, ruido_e * env_e, t0 + insp + 0.05, ganho=ganho_exp)
    return y


def som_murmurio_vesicular():
    return normalizar(respiracao_base(3))


def _fase_respiratoria(y, t0, dur, f_lo, f_hi, ganho, semente, grave=False):
    n = int(dur * SR)
    ruido = ruido_banda(dur, f_lo, f_hi, semente=semente, grave=grave)
    env = np.sin(np.linspace(0, np.pi, n)) ** 1.1
    colocar(y, ruido * env, t0, ganho=ganho)


def som_traqueal():
    # Som traqueal (tabela dos normais): inspiração forte; expiração MAIS
    # forte e mais longa, separada da inspiração por pausa nítida. Timbre
    # rude e agudo: é o som sem o filtro do pulmão.
    n_ciclos = 3
    y = np.zeros(int(n_ciclos * RESP * SR))
    for k in range(n_ciclos):
        t0 = k * RESP
        _fase_respiratoria(y, t0, 1.2, 150, 1200, 0.75, semente=201 + 2 * k)
        # pausa nítida de ~0,3 s entre as fases
        _fase_respiratoria(y, t0 + 1.5, 1.6, 150, 1200, 0.95, semente=202 + 2 * k)
    return normalizar(y)


def som_bronquico():
    # Som brônquico: agudo (300-400 Hz), rude, expiração mais longa que a
    # inspiração e um intervalo audível entre as fases: normal junto ao
    # esterno; fora do lugar, é o achado que o tópico chama de sopro.
    n_ciclos = 3
    y = np.zeros(int(n_ciclos * RESP * SR))
    for k in range(n_ciclos):
        t0 = k * RESP
        _fase_respiratoria(y, t0, 1.1, 220, 700, 0.7, semente=211 + 2 * k)
        # intervalo audível, mais curto que a pausa do traqueal
        _fase_respiratoria(y, t0 + 1.28, 1.4, 220, 700, 0.85, semente=212 + 2 * k)
    return normalizar(y)


def som_broncovesicular():
    # Som broncovesicular: intermediário, inspiração e expiração de igual
    # duração e intensidade, sem pausa entre elas.
    n_ciclos = 3
    y = np.zeros(int(n_ciclos * RESP * SR))
    for k in range(n_ciclos):
        t0 = k * RESP
        _fase_respiratoria(y, t0, 1.2, 100, 600, 0.75, semente=221 + 2 * k, grave=True)
        _fase_respiratoria(y, t0 + 1.22, 1.2, 100, 600, 0.75, semente=222 + 2 * k, grave=True)
    return normalizar(y)


def som_sibilos():
    # Sibilos: tons musicais contínuos na expiração (que se alonga), sobre
    # um murmúrio de fundo mais discreto.
    n_ciclos = 3
    y = respiracao_base(n_ciclos, insp=1.2, exp_audivel=2.0, ganho_exp=0.3, semente=11) * 0.7
    for k in range(n_ciclos):
        t0 = k * RESP + 1.25
        dur = 1.9
        t = t_axis(dur)
        env = np.sin(np.linspace(0, np.pi, len(t))) ** 0.8
        vibrato = 1 + 0.006 * np.sin(2 * np.pi * 5.0 * t)
        tom = 0.6 * np.sin(2 * np.pi * 420 * t * vibrato) + 0.3 * np.sin(2 * np.pi * 560 * t * vibrato)
        colocar(y, tom * env, t0, ganho=0.35)
    return normalizar(y)


def _chuva_de_estalidos(y, t0, quantos, f_lo, f_hi, dur_estalido, ganho, semente):
    rng = np.random.default_rng(semente)
    for j in range(quantos):
        atraso = float(rng.uniform(0, 0.45))
        estalo = ruido_banda(dur_estalido, f_lo, f_hi, semente=semente * 100 + j)
        n = len(estalo)
        estalo = estalo * np.exp(-np.linspace(0, 6, n))
        colocar(y, estalo, t0 + atraso, ganho=ganho * float(rng.uniform(0.6, 1.0)))


def som_estertores_finos():
    # Estertores finos: chuva de estalidos curtos e agudos no FIM da
    # inspiração; não mudam de um ciclo para outro (abertura alveolar).
    n_ciclos = 3
    y = respiracao_base(n_ciclos, semente=21) * 0.8
    for k in range(n_ciclos):
        fim_insp = k * RESP + 1.0  # último meio segundo da inspiração
        _chuva_de_estalidos(y, fim_insp, quantos=14, f_lo=500, f_hi=1800, dur_estalido=0.006, ganho=0.5, semente=31 + k)
    return normalizar(y)


def som_estertores_grossos():
    # Estertores grossos: estalidos mais graves, longos e esparsos, no
    # início da inspiração e também na expiração (secreção nas vias).
    n_ciclos = 3
    y = respiracao_base(n_ciclos, semente=41) * 0.8
    for k in range(n_ciclos):
        t0 = k * RESP
        _chuva_de_estalidos(y, t0 + 0.15, quantos=6, f_lo=140, f_hi=650, dur_estalido=0.018, ganho=0.7, semente=51 + k)
        _chuva_de_estalidos(y, t0 + 1.6, quantos=4, f_lo=140, f_hi=650, dur_estalido=0.018, ganho=0.55, semente=61 + k)
    return normalizar(y)


# ------------------------------------------------- segunda leva: coração


def som_galope_b4():
    # Galope atrial: B4 grave e apagada logo ANTES de B1 (TA-TUM-TA).
    ciclo = 0.66
    n_ciclos = 10

    def montar():
        y = np.zeros(int(n_ciclos * ciclo * SR))
        for k in range(n_ciclos):
            t0 = k * ciclo
            colocar(y, bulha1(), t0)
            colocar(y, bulha2(), t0 + 0.26)
            # B4 do PRÓXIMO ciclo, 100 ms antes da próxima B1.
            if k < n_ciclos - 1:
                b4 = 0.55 * damped_sine(36, 0.12, 0.040) + 0.2 * damped_sine(70, 0.12, 0.030)
                colocar(y, b4, t0 + ciclo - 0.10)
        return y

    return normalizar(montar())


def som_desdobramento_b2():
    # Desdobramento fisiológico de B2: na inspiração os dois componentes se
    # separam (TLA); na expiração B2 volta a ser única. A respiração ao
    # fundo, discreta, marca as fases para o ouvido.
    n_resp = 2
    dur = n_resp * RESP
    y = respiracao_base(n_resp, insp=1.5, exp_audivel=0.7, ganho_exp=0.4, semente=71) * 0.28
    n_batimentos = int(dur / CICLO)
    for k in range(n_batimentos):
        t0 = k * CICLO
        colocar(y, bulha1(), t0, ganho=0.9)
        fase = t0 % RESP
        inspirando = fase < 1.6
        if inspirando:
            # A2 e P2 separados por ~70 ms: o "TLA".
            colocar(y, bulha2(), t0 + SISTOLE, ganho=0.8)
            colocar(y, bulha2(), t0 + SISTOLE + 0.07, ganho=0.6)
        else:
            colocar(y, bulha2(), t0 + SISTOLE, ganho=0.85)
    return normalizar(y)


def som_sopro_regurgitacao():
    # Holossistólico "em barra": começa JUNTO com B1, recobrindo-a, e mantém
    # a intensidade até alcançar B2.
    dur_sopro = SISTOLE + 0.04

    def sopro(y, t0):
        n = int(dur_sopro * SR)
        ruido = ruido_banda(dur_sopro, 150, 550, semente=int(t0 * 1000) + 17)
        env = np.ones(n)
        borda = int(0.02 * SR)
        env[:borda] = np.linspace(0.4, 1, borda)
        env[-borda:] = np.linspace(1, 0.3, borda)
        colocar(y, ruido * env, t0, ganho=0.5)

    return normalizar(ciclos_cardiacos(8, com=sopro))


def som_ruflar_pre_sistolico():
    # Ruflar diastólico grave com reforço pré-sistólico: o rumor de baixa
    # frequência do meio da diástole que cresce até a próxima B1.
    inicio = SISTOLE + 0.12
    dur_ruflar = CICLO - inicio

    def sopro(y, t0):
        n = int(dur_ruflar * SR)
        ruido = ruido_banda(dur_ruflar, 35, 120, semente=int(t0 * 1000) + 23)
        x = np.linspace(0, 1, n)
        env = 0.45 + 0.0 * x
        env[x > 0.7] = 0.45 + 0.55 * ((x[x > 0.7] - 0.7) / 0.3) ** 1.3  # reforço
        colocar(y, ruido * env, t0 + inicio, ganho=0.75)

    return normalizar(ciclos_cardiacos(8, com=sopro))


def som_sopro_continuo():
    # Contínuo "em maquinaria": atravessa sístole e diástole sem silêncio,
    # com o máximo em torno de B2.
    def sopro(y, t0):
        n = int(CICLO * SR)
        ruido = ruido_banda(CICLO, 180, 700, semente=int(t0 * 1000) + 29)
        x = np.linspace(0, 1, n)
        pico = SISTOLE / CICLO
        env = np.where(x < pico, 0.4 + 0.6 * (x / pico), 1.0 - 0.6 * ((x - pico) / (1 - pico)))
        colocar(y, ruido * env, t0, ganho=0.45)

    return normalizar(ciclos_cardiacos(8, com=sopro))


def _raspado(dur, semente):
    """Ruído raspado de couro/lixa: banda média modulada por rugosidade."""
    n = int(dur * SR)
    ruido = ruido_banda(dur, 250, 1400, semente=semente)
    rugosidade = np.abs(ruido_banda(dur, 8, 45, semente=semente + 1))
    rugosidade = rugosidade / (np.max(rugosidade) + 1e-9)
    env = np.sin(np.linspace(0, np.pi, n)) ** 0.7
    return ruido * (0.35 + 0.65 * rugosidade) * env


def som_atrito_pericardico():
    # Atrito pericárdico com três componentes por ciclo: um sistólico e
    # dois diastólicos: recobrindo parcialmente as bulhas.
    n_ciclos = 8

    def montar():
        y = np.zeros(int(n_ciclos * CICLO * SR))
        for k in range(n_ciclos):
            t0 = k * CICLO
            colocar(y, bulha1(), t0, ganho=0.55)
            colocar(y, bulha2(), t0 + SISTOLE, ganho=0.55)
            base = int(t0 * 1000)
            colocar(y, _raspado(0.20, base + 31), t0 + 0.04, ganho=0.85)   # sistólico
            colocar(y, _raspado(0.14, base + 37), t0 + 0.42, ganho=0.6)    # diastólico precoce
            colocar(y, _raspado(0.13, base + 41), t0 + 0.65, ganho=0.65)   # pré-sistólico
        return y

    return normalizar(montar())


# -------------------------------------------------- segunda leva: pulmão


def som_roncos():
    # Roncos: contínuos graves, nas duas fases com predomínio expiratório,
    # fugazes: presentes num ciclo, mais apagados no seguinte.
    n_ciclos = 3
    y = respiracao_base(n_ciclos, insp=1.3, exp_audivel=1.8, ganho_exp=0.35, semente=81) * 0.6
    ganhos_por_ciclo = [1.0, 0.5, 0.9]
    for k in range(n_ciclos):
        t0 = k * RESP
        for inicio, dur, g_fase in ((0.15, 1.0, 0.5), (1.4, 1.7, 1.0)):
            t = t_axis(dur)
            rugoso = 0.7 + 0.3 * np.sin(2 * np.pi * 22 * t)
            tom = (np.sin(2 * np.pi * 140 * t) + 0.4 * np.sin(2 * np.pi * 280 * t)) * rugoso
            env = np.sin(np.linspace(0, np.pi, len(t))) ** 0.9
            colocar(y, tom * env, t0 + inicio, ganho=0.3 * g_fase * ganhos_por_ciclo[k])
    return normalizar(y)


def som_estridor():
    # Estridor: tom musical de altura constante (~400 Hz) na INSPIRAÇÃO, 
    # o espelho do sibilo, que predomina na expiração.
    n_ciclos = 3
    y = respiracao_base(n_ciclos, insp=1.5, exp_audivel=0.8, ganho_exp=0.35, semente=91) * 0.6
    for k in range(n_ciclos):
        t0 = k * RESP + 0.1
        dur = 1.3
        t = t_axis(dur)
        env = np.sin(np.linspace(0, np.pi, len(t))) ** 0.7
        tom = np.sin(2 * np.pi * 400 * t) + 0.25 * np.sin(2 * np.pi * 800 * t)
        colocar(y, tom * env, t0, ganho=0.4)
    return normalizar(y)


def som_atrito_pleural():
    # Atrito pleural: ruído irregular e descontínuo, grave, mais intenso na
    # inspiração: o ranger de couro.
    n_ciclos = 3
    y = respiracao_base(n_ciclos, semente=101) * 0.55
    rng = np.random.default_rng(107)
    for k in range(n_ciclos):
        t0 = k * RESP
        for _ in range(7):  # rajadas inspiratórias
            atraso = float(rng.uniform(0.1, 1.3))
            dur = float(rng.uniform(0.04, 0.09))
            n = int(dur * SR)
            rajada = ruido_banda(dur, 120, 700, semente=int(rng.integers(1, 9999)))
            colocar(y, rajada * np.sin(np.linspace(0, np.pi, n)), t0 + atraso, ganho=0.55 * float(rng.uniform(0.6, 1.0)))
        for _ in range(3):  # mais discreto na expiração
            atraso = float(rng.uniform(1.6, 2.1))
            dur = float(rng.uniform(0.04, 0.08))
            n = int(dur * SR)
            rajada = ruido_banda(dur, 120, 700, semente=int(rng.integers(1, 9999)))
            colocar(y, rajada * np.sin(np.linspace(0, np.pi, n)), t0 + atraso, ganho=0.3)
    return normalizar(y)


SONS = {
    'bulhas-normais.wav': som_bulhas_normais,
    'galope-b3.wav': som_galope_b3,
    'galope-b4.wav': som_galope_b4,
    'desdobramento-b2.wav': som_desdobramento_b2,
    'sopro-sistolico.wav': som_sopro_sistolico,
    'sopro-regurgitacao.wav': som_sopro_regurgitacao,
    'sopro-diastolico.wav': som_sopro_diastolico,
    'ruflar-pre-sistolico.wav': som_ruflar_pre_sistolico,
    'sopro-continuo.wav': som_sopro_continuo,
    'atrito-pericardico.wav': som_atrito_pericardico,
    'som-traqueal.wav': som_traqueal,
    'som-bronquico.wav': som_bronquico,
    'som-broncovesicular.wav': som_broncovesicular,
    'murmurio-vesicular.wav': som_murmurio_vesicular,
    'sibilos.wav': som_sibilos,
    'roncos.wav': som_roncos,
    'estridor.wav': som_estridor,
    'estertores-finos.wav': som_estertores_finos,
    'estertores-grossos.wav': som_estertores_grossos,
    'atrito-pleural.wav': som_atrito_pleural,
}

# Chaves cujo arquivo em assets/sons é uma GRAVAÇÃO REAL (ver
# assets/sons/LICENCAS.md e scripts/preparar-sons-reais.py). O gerador não
# as sobrescreve: rode com --force para regenerar as versões sintéticas.
GRAVACOES_REAIS = {'murmurio-vesicular.wav', 'sibilos.wav', 'roncos.wav'}

if __name__ == '__main__':
    import sys

    forcar = '--force' in sys.argv
    for nome, fabrica in SONS.items():
        if nome in GRAVACOES_REAIS and not forcar:
            print(f'{nome}: gravação real preservada (use --force para sobrescrever)')
            continue
        salvar(nome, fabrica())
