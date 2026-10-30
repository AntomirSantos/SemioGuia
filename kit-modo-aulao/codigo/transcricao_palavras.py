"""Transcrição com tempo por palavra (Whisper medium). Uso: python transcricao_palavras.py audio16k.wav saida.json"""
import sys, json, whisper
m = whisper.load_model("medium")
r = m.transcribe(sys.argv[1], language="pt", word_timestamps=True, condition_on_previous_text=False, fp16=False)
json.dump(r["segments"], open(sys.argv[2], "w"), ensure_ascii=False)
for s in r["segments"]: print(f"{s['start']:6.2f}-{s['end']:6.2f} {s['text']}")
