"""Cek potongan suara per adegan dengan Gemini (gemini-3.5-flash, kuota terpisah dari TTS).
Pakai: GOOGLE_API_KEY=dummy python3 motion/engine/cek_potongan.py <akun> <ep>
Tiap adegan dipotong dari out/<akun>-<ep>/narration.wav sesuai timeline, dikirim berlabel "POTONGAN s1" dst.,
Gemini menuliskan apa yang terdengar per id, lalu dibandingkan dengan naskah (awal dan akhir kalimat)."""
import base64, io, json, os, re, sys, urllib.request, wave, difflib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
acc, ep = sys.argv[1], sys.argv[2]
d = f"{ROOT}/out/{acc}-{ep}"; tl = json.load(open(f"{d}/timeline.json"))
w = wave.open(f"{d}/narration.wav"); sr = w.getframerate(); pcm = w.readframes(w.getnframes())
parts = []
for s in tl["scenes"]:
    a, b = int(s["start"] * sr) * 2, int((s["start"] + s["dur"]) * sr) * 2
    buf = io.BytesIO(); o = wave.open(buf, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes(pcm[a:b]); o.close()
    parts += [{"text": f"POTONGAN {s['id']}"}, {"inlineData": {"mimeType": "audio/wav", "data": base64.b64encode(buf.getvalue()).decode()}}]
ids = [s["id"] for s in tl["scenes"]]
parts.append({"text": "Tuliskan kata demi kata (bahasa Indonesia) apa yang terdengar di tiap POTONGAN. Jawab JSON object saja, kunci = id (" + ", ".join(ids) + "), nilai = transkrip. Tulis angka sebagai kata (mis. dua ratus ribu), jangan digit."})
body = {"contents": [{"parts": parts}], "generationConfig": {"responseMimeType": "application/json"}}
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", json.dumps(body).encode(),
                             {"Content-Type": "application/json", "x-goog-api-key": os.environ.get("GOOGLE_API_KEY", "dummy")})
r = json.load(urllib.request.urlopen(req, timeout=300))
txt = r["candidates"][0]["content"]["parts"][0]["text"]; got = json.loads(txt)
if isinstance(got, list): got = {k: v for x in got for k, v in x.items()} if all(isinstance(x, dict) for x in got) else dict(zip(ids, got))
if set(got) != set(ids): got = dict(zip(ids, got.values()))   # kunci kadang ditulis lain (mis. s100), cocokkan urutan
if "-v" in sys.argv: print(txt)
SAMA = {"gua": "gue", "lu": "lo", "enggak": "nggak", "gak": "nggak"}
norm = lambda x: [SAMA.get(w, w) for w in re.sub(r"[^a-z0-9 ]", " ", x.lower()).split()]
bad = 0
for s in tl["scenes"]:
    want, heard = norm(s["say"]), norm(got.get(s["id"], ""))
    ratio = difflib.SequenceMatcher(None, want, heard).ratio()
    ok = ratio > .8 and heard[:2] == want[:2] and heard[-2:] == want[-2:]
    bad += not ok
    print(f"{s['id']}: {'OK ' if ok else 'CEK'} kemiripan {ratio:.2f} | awal '{' '.join(heard[:3])}' akhir '{' '.join(heard[-3:])}'")
print("SEMUA OK" if not bad else f"{bad} adegan perlu dicek")
