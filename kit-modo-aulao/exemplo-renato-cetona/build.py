"""Monta o aulão: vídeo editado (pausa de 3 s congelada) + gráficos + logo central + legenda + CTA do Renato.
Voz "microfone de estúdio" (voz_estudio.wav); efeitos por cima; no fim só limitador de pico."""
import json, subprocess, sys
S = "/tmp/claude-0/-home-user-SemioGuia/d84dfcba-ed7d-592e-99d9-2412b7bcf44f/scratchpad"
ev = json.load(open("ev.json")); T = ev["total"]; X, PZ = ev["pausa"]; QA, QB = ev["questao"]
WH = json.load(open("whoosh.json")); C = ev["certo"]
sel = "+".join(f"between(t,{a:.3f},{b:.3f})" for a, b in ev["keep"])
GRADE = "hqdn3d=1.5:2.5:3:3,curves=all='0/0 0.15/0.12 0.5/0.53 0.85/0.89 1/1',eq=saturation=1.05,unsharp=5:5:0.6:5:5:0"
ins = ["-i", "dl/vid.mov", "-i", "voz_estudio.wav", "-i", "graf/graf.mov", "-i", f"{S}/kit/marca/logo_aeenem.png", "-i", "dl/cta.mp4",
       "-i", f"{S}/p2/whoosh.wav", "-i", f"{S}/p2/tique.wav", "-i", f"{S}/p2/acerto.wav"]
K = f"(clip((T-{QA})/0.3,0,1)*clip(({QB}-T)/0.3,0,1))"
f = [f"[3:v]scale=210:-1:flags=lanczos[lg]",
     f"[0:v]fps=30,scale=1080:1920:flags=lanczos,setsar=1,{GRADE},select='{sel}',setpts=N/30/TB,split=2[p1][p2]",
     f"[p1]trim=0:{X},setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration={PZ}[q1]",
     f"[p2]trim=start={X},setpts=PTS-STARTPTS[q2]",
     f"[q1][q2]concat=n=2:v=1:a=0,subtitles=leg.ass:fontsdir=ttf[v0]",
     f"[v0]split=2[vs1][vs2];[vs2]gblur=sigma=22,eq=brightness=-0.06[vsb];[vs1][vsb]blend=all_expr='A*(1-{K})+B*{K}'[v0b]",
     f"[2:v]setpts=PTS-STARTPTS[gf]",
     f"[v0b][gf]overlay=0:0:eof_action=pass[v2]",
     f"[v2][lg]overlay=435:130,trim=0:{T},setpts=PTS-STARTPTS,format=yuv420p[vm]",
     f"[1:a]aselect='{sel}',asetpts=N/SR/TB,aresample=48000,asplit=2[m1][m2]",
     f"[m1]atrim=0:{X},asetpts=PTS-STARTPTS,apad=pad_dur={PZ}[n1]",
     f"[m2]atrim=start={X},asetpts=PTS-STARTPTS[n2]",
     f"[n1][n2]concat=n=2:v=0:a=1[mvoz]"]
fx = [(5, t - 0.08, 0.32) for t in WH] + [(6, X + k, 0.5) for k in range(int(PZ))] + [(7, C["verde"], 0.55)]
cont = {}
for i, _, _ in fx: cont[i] = cont.get(i, 0) + 1
for i, n in cont.items(): f.append(f"[{i}:a]aresample=48000,asplit={n}" + "".join(f"[s{i}_{k}]" for k in range(n)))
lab, used = [], {}
for i, t, g in fx:
    k = used.get(i, 0); used[i] = k + 1
    f.append(f"[s{i}_{k}]volume={g},adelay={int(max(0, t) * 1000)}:all=1[e{len(lab)}]"); lab.append(f"[e{len(lab)}]")
f.append(f"[mvoz]{''.join(lab)}amix=inputs={len(lab) + 1}:normalize=0:duration=first,atrim=0:{T}[am]")
f.append("[4:v]fps=30,scale=1080:1920,setsar=1,format=yuv420p[cv]")
f.append("[4:a]aresample=48000,volume=6dB[ca]")
f.append("[vm][am][cv][ca]concat=n=2:v=1:a=1[vf][af0]")
f.append("[af0]aresample=192000,alimiter=limit=0.7:attack=5:release=50:level=false,aresample=48000[af]")
dur = T + 3.0; mr = int(29 * 8 * 1024 / dur - 200)
cmd = ["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(f), "-map", "[vf]", "-map", "[af]",
       "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-b:v", f"{mr}k", "-maxrate", f"{mr}k", "-bufsize", f"{2*mr}k",
       "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", sys.argv[1]]
subprocess.run(cmd, check=True); print("ok", sys.argv[1], round(dur, 2), "s", mr, "kbps")
