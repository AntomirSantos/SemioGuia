import sys, json, soundfile as sf, sherpa_onnx
M="models/sherpa-onnx-whisper-small/"
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M+"small-encoder.int8.onnx",decoder=M+"small-decoder.int8.onnx",tokens=M+"small-tokens.txt",language="pt",task="transcribe",num_threads=4)
a,sr=sf.read(sys.argv[1],dtype="float32")
sil=json.load(open(sys.argv[2])); dur=len(a)/sr
fala=[];t=0
for s,e in sil:
    if s-t>0.05: fala.append([t,s])
    t=e
if dur-t>0.05: fala.append([t,dur])
out=[]
for s,e in fala:
    st=rec.create_stream(); st.accept_waveform(sr,a[int(s*sr):int(e*sr)]); rec.decode_stream(st)
    out.append([round(s,2),round(e,2),st.result.text.strip()]); print(f"{s:6.2f}-{e:6.2f} {st.result.text.strip()}",flush=True)
json.dump(out,open(sys.argv[3],"w"),ensure_ascii=False,indent=1)
