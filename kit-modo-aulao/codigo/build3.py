"""Monta a peça final, sem gancho: VID editado (com a pausa de 3 s) + CTA do FS02.
Trilha bed.wav por baixo com ducking pela voz, whooshes nas entradas, tique na contagem e ding no acerto."""
import json, os, subprocess, sys
ev = json.load(open("ev.json")); T = ev["total"]; gj = json.load(open("gancho2.json"))
WH = json.load(open("whoosh.json"))
CTA_INI, CTA_FIM, CTA_VOZ = 49.033, 52.204, 0.85
X, PZ = ev["pausa"]                                  # início do congelamento (linha do tempo editada) e duração
HD = gj["dur"]
FOTO = "fotos/onibus.jpg"                            # Rosa Parks no ônibus: fundo do gancho
sel = "+".join(f"between(t,{a:.3f},{b:.3f})" for a, b in ev["keep"])
I = {}
ins = []
def inp(nome, *args):
    ins.extend(args); I[nome] = sum(1 for a in ins if a == "-i") - 1
inp("vid", "-i", "dl/vid.mp4"); inp("fs", "-i", "dl/fs02.mp4")
VOZ = os.environ.get("VOZ", "vid_clean.wav"); BED = float(os.environ.get("BED", "0.16"))
# voz já normalizada (loudnorm linear em 2 passagens): no fim só um limitador de pico, sem AGC que levante o ruído
FINAL = "aresample=192000,alimiter=limit=0.7:attack=5:release=50:level=false,aresample=48000" if os.environ.get("VOZ_NORMALIZADA") else "loudnorm=I=-14:TP=-1.5:LRA=11"
inp("voz", "-i", VOZ); 
inp("tag", "-i", "ov/tag.png"); inp("painel", "-i", "rev/painel.mov"); inp("graf", "-i", "graf/graf.mov")
inp("logo", "-i", "../kit/marca/logo_aeenem.png")
inp("acerto", "-i", "acerto.wav"); inp("whoosh", "-i", "whoosh.wav"); inp("tique", "-i", "tique.wav")
inp("bed", "-stream_loop", "-1", "-i", "../kit/marca/bed.wav")

f = []
f.append(f"[{I['logo']}:v]scale=210:-1:flags=lanczos[lg2]")
# ---------- vídeo principal, com o quadro congelado da pausa
f.append(f"[{I['vid']}:v]fps=30,scale=1080:1920:flags=lanczos,setsar=1,select='{sel}',setpts=N/30/TB,split=2[p1][p2]")
f.append(f"[p1]trim=0:{X},setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration={PZ}[q1]")
f.append(f"[p2]trim=start={X},setpts=PTS-STARTPTS[q2]")
f.append(f"[q1][q2]concat=n=2:v=1:a=0,subtitles=leg.ass:fontsdir=ttf[v0]")
f.append(f"[{I['voz']}:a]aselect='{sel}',asetpts=N/SR/TB,aresample=48000,asplit=2[m1][m2]")
f.append(f"[m1]atrim=0:{X},asetpts=PTS-STARTPTS,apad=pad_dur={PZ}[n1]")
f.append(f"[m2]atrim=start={X},asetpts=PTS-STARTPTS[n2]")
f.append(f"[n1][n2]concat=n=2:v=0:a=1[mvoz]")
pa, pb = ev["painel"]; ca, cb = ev["certo"]["entra"], ev["certo"]["sai"]
f.append(f"[v0][{I['tag']}:v]overlay=0:0:enable='not(between(t,{pa},{pb}))*not(between(t,{ca},{cb}))'[v1]")
f.append(f"[{I['graf']}:v]setpts=PTS-STARTPTS[gf]")
f.append(f"[{I['painel']}:v]setpts=PTS-STARTPTS[pn]")
f.append(f"[v1][gf]overlay=0:0:eof_action=pass[v2]")
f.append(f"[v2][pn]overlay=0:0:eof_action=pass[v3]")
f.append(f"[v3][lg2]overlay=810:130,trim=0:{T},setpts=PTS-STARTPTS,format=yuv420p[vm]")
# efeitos da parte principal (tempos na linha do tempo editada)
fx = [(I["acerto"], ev["certo"]["verde"], 0.55)] + [(I["whoosh"], t - 0.08, 0.32) for t in WH] + \
     [(I["tique"], X + k, 0.5) for k in range(int(PZ))]
cont = {}
for idx, _, _ in fx: cont[idx] = cont.get(idx, 0) + 1
usados = {}
for idx, n in cont.items():
    f.append(f"[{idx}:a]aresample=48000,asplit={n}" + "".join(f"[s{idx}_{k}]" for k in range(n)))
lab = []
for j, (idx, t, vol) in enumerate(fx):
    k = usados.get(idx, 0); usados[idx] = k + 1
    f.append(f"[s{idx}_{k}]volume={vol},adelay={max(0, int(t * 1000))}:all=1[e{j}]"); lab.append(f"[e{j}]")
hfx = []
hl = []
for j, (idx, t, vol) in enumerate(hfx):
    k = usados.get(idx, 0); usados[idx] = k + 1
    f.append(f"[s{idx}_{k}]volume={vol},adelay={max(0, int(t * 1000))}:all=1[g{j}]"); hl.append(f"[g{j}]")
f.append("[mvoz]" + "".join(lab) + f"amix=inputs={len(lab) + 1}:duration=first:normalize=0[amain]")
# ---------- CTA
f.append(f"[{I['fs']}:v]trim={CTA_INI}:{CTA_FIM},setpts=PTS-STARTPTS,fps=30,scale=1080:1920,setsar=1,format=yuv420p[vc]")
f.append(f"[{I['fs']}:a]atrim={CTA_INI}:{CTA_FIM},asetpts=PTS-STARTPTS,aresample=48000,volume=0:enable='lt(t,{CTA_VOZ})'[ac]")
# ---------- junta tudo, trilha com ducking
f.append("[vm][amain][vc][ac]concat=n=2:v=1:a=1[v][voz]")
TOT = T + (CTA_FIM - CTA_INI)
f.append(f"[voz]asplit=2[vz1][vz2]")
f.append(f"[{I['bed']}:a]atrim=0:{TOT},asetpts=PTS-STARTPTS,aresample=48000,volume={BED},"
         f"afade=t=in:d=0.6,afade=t=out:st={TOT - 1.5}:d=1.5[bd]")
f.append("[bd][vz1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=450:makeup=1[bdk]")
f.append(f"[vz2][bdk]amix=inputs=2:duration=first:normalize=0,{FINAL},aresample=48000[a]")
vk = int((29 * 8 * 1024) / TOT) - 200   # 192 kbps de áudio + folga do contêiner
cmd = ["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(f), "-map", "[v]", "-map", "[a]",
       "-r", "30", "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "21",
       "-maxrate", f"{vk}k", "-bufsize", f"{2*vk}k", "-pix_fmt", "yuv420p",
       "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", sys.argv[1]]
print("duração prevista", round(TOT, 2), "maxrate", vk)
subprocess.run(cmd, check=True)
