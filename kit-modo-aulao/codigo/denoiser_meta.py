import sys, torch, torchaudio, soundfile as sf, numpy as np
from denoiser import pretrained
from denoiser.dsp import convert_audio
m = pretrained.dns64().eval()
for ent, sai in zip(sys.argv[1::2], sys.argv[2::2]):
    x, sr = sf.read(ent, dtype="float32"); x = torch.from_numpy(x if x.ndim == 1 else x.mean(1))[None]
    x = convert_audio(x, sr, m.sample_rate, m.chin)
    with torch.no_grad(): y = m(x[None])[0]
    sf.write(sai, y[0].numpy(), m.sample_rate); print("ok", sai)
