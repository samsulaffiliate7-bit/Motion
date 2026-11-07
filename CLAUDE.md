# Proyek Motion 6 Akun

Pipeline video pendek 9:16 (TikTok, Instagram Reels, YouTube Shorts) untuk 6 akun faceless. Pemilik bekerja dari HP, tanpa PC, dan ingin kerja seminimal mungkin. Komunikasi dengan pemilik dalam bahasa Indonesia santai.

## Alur repo
- `main` = versi terbaru untuk semua akun. Tiap sesi kerja di branch sendiri, lalu digabung ke `main` lewat pull request. Pemisahan per akun memakai folder (`motion/accounts/<akun>`, `motion/episodes/<akun>/<ep>`), BUKAN branch per akun.
- Repo: `samsulaffiliate7-bit/Motion` (pindah dari `threadspoco-dev/Sandbox` 7 Nov 2026). Satu repo untuk 6 akun; kode mesin dipakai bersama, isi per akun dipisah folder.
- Tiga lingkungan cloud, masing-masing 2 akun (keputusan pemilik 7 Nov): "Motion - Kades Denah", "Motion - Dompet Meja", "Motion - Balai Hewan", semuanya repo `samsulaffiliate7-bit/Motion`. Satu sesi hanya mengerjakan akun milik lingkungan sesi itu; jangan kerjakan akun pasangan lain. Kuota TTS (10/hari per model per kunci) dibagi dua akun sepasang: Kades+Denah sama-sama flash-lite, Dompet+Meja sama-sama flash, Balai (flash-lite) + Hewan (flash) beda model. Lingkungan "Default"/"Tes" = umum, untuk kerja mesin/dokumen lintas akun (tanpa kunci TTS akun).
- AWAL TIAP SESI: cek akun sesi ini dengan `echo $MOTION_AKUN` (variabel lingkungan, mis. `kades,denah`). Kerjakan HANYA akun di situ, dan sebut ke pemilik di balasan pertama ("Sesi ini: Kades + Denah"). Kalau kosong (lingkungan Default/Tes), anggap sesi umum: boleh kerja mesin/dokumen, tapi tanya dulu sebelum TTS atau posting untuk akun mana pun. Isi variabel: "Motion - Kades Denah" = `kades,denah`; "Motion - Dompet Meja" = `dompet,meja`; "Motion - Balai Hewan" = `balai,hewan`.
- Beberapa akun milik customer. Tiap lingkungan memakai kunci Gemini PEMILIK akun itu (network secret, diisi pemilik di pengaturan lingkungan, bukan di chat). Kunci customer hanya untuk akun customer itu; jangan dipakai untuk akun lain. Kuota TTS mengikuti proyek Google pemilik kunci.
- Cara menjalankan pipeline dan struktur folder: `motion/README.md`.

Baca dulu:
- `docs/PROFIL-AKUN.md`: profil 6 akun, aturan umum, ID akun Repliz.
- `docs/KONSEP-V2.md`: bahasa visual 3D per akun, aturan variasi shot, Balai v2, Denah "Bumi Kita", komentar jadi konten.
- `docs/KONSEP-V3.md`: makro, mikro, format rotasi isi untuk Dompet, Meja, Balai, Hewan. WAJIB dibaca sebelum bikin episode 4 akun itu.
- `docs/BANK-TOPIK.md`: topik + hook per akun (bagian v3 bertanda format). Tandai yang sudah dipakai.
- `docs/jadwal/`: daftar jadwal posting per tanggal.

## Keputusan pemilik (jangan diubah tanpa tanya)
- 3 video per hari per akun (naik dari 2, keputusan pemilik 7 Nov, demi growth). Durasi 60-120 detik.
- Tidak ada label "cerita fiksi" di dalam video (cukup di bio). Tidak ada bar progres/durasi.
- Tanpa musik latar.
- Semua akun 3D (three.js low-poly). Visual dan gerak tiap akun WAJIB beda (latar, kamera, transisi, gerak). Tiap kejadian = lokasi 3D baru; variasikan shot, jangan template yang sama.
- Hewan: dunia malam tapi TERANG (banyak cahaya), bukan gelap pekat (masukan pemilik 6 Nov).
- Caption: emas, outline cokelat tua; kata kunci `*...*` di naskah jadi putih; muncul KATA PER KATA mengikuti suara.
- Label AI platform aktif di TikTok dan YouTube. YouTube publik. IG dibagikan ke feed.
- Video tidak dikompres.
- ATM dari referensi: ambil struktur hook, tempo, jenis visual. Jangan salin cerita, tokoh, atau aset.
- Jangan sebut orang, partai, perusahaan, atau instansi nyata. Fakta nyata wajib bersumber (simpan di `episode.py`).
- Model 3D dari luar hanya yang lisensinya bebas (cek dan catat dulu).

## Isi v3 (Dompet, Meja, Balai, Hewan; detail di `docs/KONSEP-V3.md`)
- Rotasi format: format sama tidak dua kali berturut-turut, minimal 4 format beda per 7 hari. Kades dan Denah tetap serial harian.
- Dompet: tokoh Nana atau Raka (cowok). Boleh info investasi/sukses sebelum 30. Disclaimer gaya cerita: "Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu." + kalimat risiko singkat di video investasi, tanpa janji untung. Raka butuh suara cowok: tanya pemilik dulu, pakai `CONFIG_OVERRIDE = {"tts": {"voice": ...}}`.
- Meja: POV bergantian (full staf, full bos, jenis bos, jenis staf, kamus HRD); split staf vs bos maksimal 1-2x seminggu.
- Balai: satu sindiran halus per video, logis dan relate, semua rekaan tanpa nama.
- Hewan: setting wajib berganti (kantor maksimal 1 dari 4), tokoh tamu bebas (sudah ada Ular).
- 6 opsi variasi (hook angka, judul menetap, daftar bernomor, plot twist, momen "gue banget", tempo cepat) dipakai SESEKALI.
- Tiap episode punya `META` (format, pilar, tokoh, lokasi, hook, variasi). Statistik ditarik manual seminggu sekali lewat Repliz, simpan di `motion/analytics/` + `docs/ANALITIK.md`.
- Riset referensi: TikTok/IG tidak bisa dibuka dari container; bedah video YouTube publik dengan `motion/engine/bedah_video.py`. Referensi terbaik = link FYP dari pemilik.

## Mesin 3D
- `build.py` membuat timeline + narasi; `render.js` menyajikan folder `motion/` lewat http lokal dan menjalankan Chromium dengan SwiftShader (`--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`), ~4-5 frame/dtk dengan 4 worker. Render penuh jalankan di latar belakang.
- Dunia per akun di `motion/engine/w3d/<style>.js` (`SHOTS`, `chrome`, `frame`); perkakas bersama di `kit.js`. Shot baru ditambahkan di dunia akun itu, jangan dipakai lintas akun.
- Alur episode baru: tulis `episode.py` -> `build.py --draft` -> `render.js --stills` (cek frame, terutama hook, kamera, teks terpotong) -> perbaiki -> build dengan TTS -> cek potongan suara -> render penuh -> kirim ke pemilik (SendUserFile).
- Kamera 9:16 sempit: fov 40-44, jarak cukup jauh, cek still dulu. Label DOM yang menempel ke benda 3D memakai `ctx.proj`.
- Angka cerita dihitung di `episode.py` dengan assert; narasi memakai angka yang sama (`{var|w}` = terbilang otomatis).
- Penyetel di `episode.py`: `END_PAD` (tahan adegan terakhir, untuk durasi >= 60 dtk), `SPLIT_SHIFT` (geser batas potongan suara, mis. `{3: -1}` = batas adegan 4->5 mundur satu jeda).

## TTS (Gemini, tier gratis)
- Model per akun (disetujui pemilik): `gemini-3.8-flash-tts` untuk Dompet (Kore), Meja (Puck), Hewan (Algenib); `gemini-3.8-flash-lite-tts` untuk Denah (Sulafat), Kades (Achird), Balai (Charon). Jangan ganti model/suara tanpa izin.
- Kunci terpasang sebagai Network secret di lingkungan akun (host generativelanguage.googleapis.com, header x-goog-api-key): jalankan build dengan `GOOGLE_API_KEY=dummy`. Kalau TTS gagal 401/403, kunci lingkungan itu belum diisi: minta pemilik mengisinya di pengaturan lingkungan. Jangan tulis kunci asli ke file/log, jangan minta pemilik menempel kunci di chat.
- Kuota 10 permintaan/hari PER MODEL (reset ~08:00 UTC = 15:00 WIB). Satu panggilan TTS per video (`full.wav`), dipotong per adegan otomatis. Kalau build mencetak PERINGATAN potongan, buat ulang dengan `--calls 2`. Jangan bikin akun/proyek Google tambahan untuk menambah kuota akun yang sama (melanggar ToS); kunci berbeda hanya karena pemilik akunnya berbeda.
- Cek potongan suara: kirim tiap potongan berlabel ("POTONGAN s1") ke gemini-3.5-flash, minta JSON object per id. Kalau kuota pemeriksa habis (429), bandingkan rasio durasi/huruf antar adegan.
- Tempo: jeda antar adegan ~0,7 dtk (LEAD 0,22 / TAIL 0,28 / GAP 0,10 di `build.py`), disetujui pemilik.
- Hook: bikin penasaran + jelaskan isi video dalam ~5 detik pertama; frame pertama langsung "aksi".

## Akun 2 Kades: penonton memilih
- Sebelum episode utama "Hari N" berikutnya, WAJIB baca komentar episode utama sebelumnya (TikTok, IG, YouTube) lewat Repliz, hitung A/B, catat di data episode. Komentar sepi/seri: kades memutuskan sendiri dan disebut di narasi.
- Slot 1 = episode utama Hari N; slot 2 = episode sampingan tanpa voting.

## Posting (Repliz)
- ID akun di `docs/PROFIL-AKUN.md`. Akun lain di workspace (kidblirezky, azzlaffaa, my.ootd.kalcer) bukan bagian proyek, jangan diposting.
- Video di-host di storage Repliz (10 GB). Unggah: `repliz_init_file` -> `curl -X PUT -T <file>.mp4 -H "Content-Type: video/mp4" "<upload>"` (URL berlaku 10 menit) -> `repliz_complete_file` -> cek `repliz_list_files` (status success, ukuran sama). Catat id + url di `motion/media/repliz-files.json`. `storage.repliz.com` diblokir proxy sesi.
- JANGAN hapus file Repliz otomatis. Cek `repliz_get_storage_statistic` tiap unggah; kalau >= 85% terpakai, peringatkan pemilik dan tunggu keputusannya.
- File `.mp4` tidak di-commit. Kirim video ke pemilik untuk dicek sebelum dijadwalkan.
- Jadwal: jangan bersamaan di tiga platform; beri jeda, acak urutan, menit tidak bulat. Caption: hook + pertanyaan + 3-5 hashtag akun; YouTube pakai judul pendek + `#shorts`.
- Posting ke akun publik = tindakan keluar: konfirmasi ke pemilik dulu kecuali dia sudah menyuruh untuk episode itu.

## Status (7 Nov 2026)
- Terjadwal di Repliz: 7 Nov (36 posting), 8 Nov (33), 9 Nov (24: dompet ep006/ep007, meja ep006/ep007, balai jalan/viral, hewan ep006/ep007). Daftar di `docs/jadwal/`.
- Berikutnya untuk Dompet/Meja/Balai/Hewan: video 10 Nov dengan format yang belum dipakai (lihat KONSEP-V3 dan BANK-TOPIK v3).
- Repo pindah ke `samsulaffiliate7-bit/Motion` (7 Nov). 3 lingkungan pasangan dibuat manual oleh pemilik; kunci Gemini tiap lingkungan diisi pemilik akunnya (network secret).
- Branch lama `claude/tes-jhfxih` sudah boleh dihapus (jadwal 6 Nov sudah tayang); penghapusan dari sesi ditolak izin, pemilik bisa menghapus lewat GitHub.
- Kades: Hari 3 menunggu voting Hari 2 (A rumah deret / B rumah berjarak, anggaran 75 jt) setelah tayang 8 Nov.
- Denah: Hari 2 menunggu voting Hari 1 (A perumahan / B kawasan usaha) setelah tayang 8 Nov.
- Data awal performa (ep001, < 2 hari): Denah paling kuat (TikTok 59% bertahan di detik 3, IG 34 simpan); akun cerita banyak kehilangan penonton di 1-3 detik pertama.
- Belum ada: efek suara, jadwal otomatis harian, analisis mingguan pertama.
