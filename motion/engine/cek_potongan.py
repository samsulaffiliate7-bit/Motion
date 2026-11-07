#!/usr/bin/env python3
"""Cek potongan suara per adegan dengan gemini-3.5-flash (kuota terpisah dari TTS).

Pakai: GOOGLE_API_KEY=dummy python3 engine/cek_potongan.py <akun> <ep>
Membaca out/<akun>-<ep>/timeline.json + narration.wav, mengirim tiap potongan berlabel ("POTONGAN s1") beserta naskahnya,
lalu mencetak JSON per id: apakah awal/akhir potongan cocok dengan naskah (tidak terpotong / tidak kemasukan kalimat adegan lain).
"""
import base64, io, json, os, sys, urllib.request, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
acc, ep = sys.argv[1], sys.argv[2]
out = f"{ROOT}/out/{acc}-{ep}"
tl = json.load(open(f"{out}/timeline.json"))
w = wave.open(f"{out}/narration.wav"); sr = w.getframerate(); pcm = w.readframes(w.getnframes()); w.close()
parts = [{"text": "Berikut potongan audio narasi per adegan. Untuk tiap potongan, dengarkan dan bandingkan dengan naskahnya. "
          "Jawab HANYA JSON object: kunci = id potongan, nilai = {\"ok\": true/false, \"awal\": kata pertama yang terdengar, \"akhir\": kata terakhir yang terdengar, "
          "\"masalah\": \"\" atau penjelasan singkat (terpotong di awal/akhir, ada kata dari adegan lain, salah baca angka)}."}]
for s in tl["scenes"]:
    a, b = int(s["start"] * sr) * 2, int((s["start"] + s["dur"]) * sr) * 2
    buf = io.BytesIO(); x = wave.open(buf, "wb"); x.setnchannels(1); x.setsampwidth(2); x.setframerate(sr); x.writeframes(pcm[a:b]); x.close()
    parts += [{"text": f"POTONGAN {s['id']} | naskah: {s['say']}"}, {"inlineData": {"mimeType": "audio/wav", "data": base64.b64encode(buf.getvalue()).decode()}}]
body = json.dumps({"contents": [{"parts": parts}], "generationConfig": {"responseMimeType": "application/json"}}).encode()
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", data=body,
                             headers={"Content-Type": "application/json", "x-goog-api-key": os.environ.get("GOOGLE_API_KEY", "dummy")})
r = json.load(urllib.request.urlopen(req, timeout=300))
txt = r["candidates"][0]["content"]["parts"][0]["text"]
res = json.loads(txt); print(json.dumps(res, ensure_ascii=False, indent=1))
bad = [k for k, v in res.items() if not v.get("ok")]
print("SEMUA OK" if not bad else f"BERMASALAH: {', '.join(bad)}")
