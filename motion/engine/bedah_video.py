"""Bedah video referensi YouTube publik dengan Gemini (riset ATM: struktur saja).
Pakai: GOOGLE_API_KEY tidak perlu (proxy menyisipkan kunci). python3 motion/engine/bedah_video.py <url_youtube> <out.md>
Model gemini-3.5-flash (kuota terpisah dari TTS). Kalau 500/502/503, coba lagi beberapa menit kemudian.
"""
import json, sys, urllib.request
url=sys.argv[1]; out=sys.argv[2]
P="""Kamu analis konten video pendek. Tonton video ini sampai habis lalu bedah dalam bahasa Indonesia, ringkas, berpoin:
1. Durasi total dan bahasa.
2. HOOK 0-3 detik: teks di layar (persis), kalimat narasi pertama (persis), apa yang terlihat di frame pertama, kenapa bikin berhenti scroll.
3. Struktur dengan timestamp (hook, konteks, isi, puncak, penutup).
4. Tempo: perkiraan jumlah ganti shot/cut per 10 detik, gerak kamera, transisi.
5. Gaya visual: animasi 2D/3D/live action/stok, tokoh, latar (berapa lokasi berbeda), warna.
6. Teks/caption di layar: gaya, kata per kata atau tidak, kata yang ditandai.
7. Suara: narator/dialog, musik, efek suara.
8. Penutup/ajakan (CTA) dan pemicu komentar/simpan/share.
9. Tiga alasan utama video ini berpotensi FYP.
10. Kelemahan yang terlihat.
11. Yang bisa ditiru STRUKTURNYA saja (bukan cerita/tokoh/aset) untuk akun animasi 3D low-poly faceless Indonesia.
Jangan mengarang: kalau tidak yakin, tulis 'tidak jelas'."""
body={"contents":[{"parts":[{"file_data":{"file_uri":url}},{"text":P}]}]}
req=urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",data=json.dumps(body).encode(),headers={"Content-Type":"application/json","x-goog-api-key":"dummy"})
try:
  r=json.load(urllib.request.urlopen(req,timeout=300))
  t="".join(p.get("text","") for p in r["candidates"][0]["content"]["parts"])
except urllib.error.HTTPError as e:
  t="ERROR "+str(e.code)+" "+e.read().decode()[:800]
open(out,"w").write(t); print(out, len(t))
