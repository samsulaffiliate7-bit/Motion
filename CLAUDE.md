# Proyek Motion 6 Akun

Pipeline video pendek 9:16 (TikTok, Instagram Reels, YouTube Shorts) untuk 6 akun faceless. Pemilik bekerja dari HP, tanpa PC, dan ingin kerja seminimal mungkin. Komunikasi dengan pemilik dalam bahasa Indonesia santai.

## Alur repo
- **Sejak 9 Nov 2026 akun GitHub pemilik di-suspend: push dan clone repo tidak bisa. Kode disimpan di Artifact privat (lihat bagian SIMPAN KODE DI ARTIFACT). Poin GitHub/branch/PR di bawah hanya sejarah.**
- `main` = versi terbaru untuk semua akun. Tiap sesi kerja di branch sendiri, lalu digabung ke `main` lewat pull request. Pemisahan per akun memakai folder (`motion/accounts/<akun>`, `motion/episodes/<akun>/<ep>`), BUKAN branch per akun.
- Repo: `samsulaffiliate7-bit/Motion` (pindah dari `threadspoco-dev/Sandbox` 7 Nov 2026). Satu repo untuk 6 akun; kode mesin dipakai bersama, isi per akun dipisah folder.
- Tiga lingkungan cloud, masing-masing 2 akun (keputusan pemilik 7 Nov): "Motion - Kades Denah", "Motion - Dompet Meja", "Motion - Balai Hewan", semuanya repo `samsulaffiliate7-bit/Motion`. Satu sesi hanya mengerjakan akun milik lingkungan sesi itu; jangan kerjakan akun pasangan lain. Kuota TTS (10/hari per model per kunci) dibagi dua akun sepasang: Kades+Denah sama-sama flash-lite, Dompet+Meja sama-sama flash, Balai (flash-lite) + Hewan (flash) beda model. Lingkungan "Default"/"Tes" = umum, untuk kerja mesin/dokumen lintas akun (tanpa kunci TTS akun).
- Beberapa akun milik customer. Tiap lingkungan memakai kunci Gemini PEMILIK akun itu (network secret, diisi pemilik di pengaturan lingkungan, bukan di chat). Kunci customer hanya untuk akun customer itu; jangan dipakai untuk akun lain. Kuota TTS mengikuti proyek Google pemilik kunci.
- Cara menjalankan pipeline dan struktur folder: `motion/README.md`.

Baca dulu:
- `docs/PROFIL-AKUN.md`: profil 6 akun, aturan umum, ID akun Repliz.
- `docs/KONSEP-V2.md`: bahasa visual 3D per akun, aturan variasi shot, Balai v2, Denah "Bumi Kita", komentar jadi konten.
- `docs/KONSEP-V3.md`: makro, mikro, format rotasi isi untuk Dompet, Meja, Balai, Hewan. WAJIB dibaca sebelum bikin episode 4 akun itu.
- `docs/BANK-TOPIK.md`: topik + hook per akun (bagian v3 bertanda format). Tandai yang sudah dipakai.
- `docs/jadwal/`: daftar jadwal posting per tanggal.

## SIMPAN KODE DI ARTIFACT (sejak 9 Nov 2026)
- Lingkungan ini (`$MOTION_AKUN` = kades,denah) menyimpan kode di halaman Artifact privat "Arsip Kode Kades Denah": https://claude.ai/artifact/V2PgcJXscV4GWMGrUcrDcc . Kerjakan HANYA akun di `$MOTION_AKUN`.
- Isi halaman (file pendukung, teks base64):
  - `bundle-<tanggal>-partN.txt`: cadangan git lengkap semua akun (git bundle --all, base64, dipecah 15 MB). Pulih: `cat bundle-<tgl>-part0.txt ... partN.txt | base64 -d > full.bundle && git clone full.bundle Motion`.
  - `inti-<tanggal>.txt`: paket inti Kades + Denah (mesin, dunia 3D `desa3d.js`/`bumi.js`, config, logo JPG, data peta, aturan, CLAUDE.md, `pulihkan.sh`). Tanpa three.js, font, wav, folder out.
  - `ep-<akun>-<ep>.txt`: satu folder episode (tar.xz + base64, termasuk wav TTS).
- Pulih di sesi baru:
  1. Artifact action `read`, `url` halaman di atas, `paths` = [inti terbaru, semua `ep-*.txt`], `out_dir` = folder kosong (mis. `pulih/`).
  2. `mkdir Motion && cd Motion && base64 -d ../pulih/inti-<tgl>.txt | tar xJf -`
  3. `for f in ../pulih/ep-*.txt; do base64 -d "$f" | tar xJf -; done`
  4. `bash pulihkan.sh` (npm pack three@0.170.0 + @fontsource baloo-2/nunito/fredoka/poppins 5.3.0, cek md5 three, git init lokal).
- Tiap episode baru WAJIB disimpan: `tar cf - motion/episodes/<akun>/<ep> | xz -9e | base64 -w0 > ep-<akun>-<ep>.txt`, lalu publish ke halaman yang SAMA (parameter `files`, tambahkan juga baris tabel di index.html halaman). Kalau mesin/dunia 3D berubah, simpan paket inti baru `inti-<tanggal>.txt` (nama baru, jangan timpa).
- Sesi baru yang belum punya file halaman: Artifact `read` url dulu (dapat index.html), edit tabel, lalu publish dengan `url` yang sama.
- Batas: 16 MB per file teks, 64 MB per publish (lebih dari itu bagi beberapa publish ke halaman yang sama).
- File lama di halaman TIDAK dihapus tanpa izin pemilik.

## Keputusan pemilik (jangan diubah tanpa tanya)
- 3 video per hari per akun mulai 10 Nov 2026 (sebelumnya 2; keputusan pemilik 7 Nov). Durasi 60-120 detik.
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
- Mulai 10 Nov (berlaku juga untuk Denah): 3 konten sehari = 2 episode utama (Hari N pagi/siang, Hari N+1 sore/malam; 1 video = 1 hari cerita) + 1 sampingan tanpa voting utama: label "SIDE QUEST" (Kades) dan "LORE BUMI" (Denah), keputusan pemilik 7 Nov. Isi/format sampingan bebas dan divariasikan, tiap video ditutup SATU ajakan interaksi yang jelas (tebak, kasih nama, skor, pilih aturan, dll), hasilnya disebut di video berikutnya.
- Keputusan episode utama diambil dari interaksi penonton episode utama sebelumnya (TikTok, IG, YouTube, lewat Repliz): voting A/B, isi komentar, like, follower/subscriber. Jangan selalu voting + komentar; variasikan mekanismenya (mis. like menentukan penduduk, follower membuka fasilitas, komentar terbaik jadi kejadian). Catat angka di data episode.
- Interaksi sepi/seri/belum ada (mis. episode sebelumnya baru tayang beberapa jam): Claude bebas menentukan sendiri biar serial tetap jalan, dan disebut di narasi ("kades memutuskan sendiri").

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
- Sampingan TERJADWAL di Repliz (8 Nov, atas perintah pemilik; daftar di `docs/jadwal/`): Kades `sq01` "kenapa nggak tanya warga" (9 Nov; mekanik komentar WARGA = +1 penduduk, hitung di Hari 3), `sq02` "desa belum punya nama" (10 Nov; usulan nama, like komentar terbanyak menang); Denah `lore01` tebak negara (9 Nov; skor + negara tujuan), `lore02` rumah vs pajak (10 Nov; komentar A/B/C aturan pajak kota).
- Sinkron hari cerita (dijalankan 9 Nov, pemilik minta lanjut 9-10 Nov): 9 Nov Kades hanya sampingan, Denah Hari 2 terjadwal 17:46/19:23/20:51 WIB; mulai 10 Nov keduanya Hari 3 (pagi) + Hari 4 (malam). Kades `hari003` siap visual, TTS menunggu hitungan WARGA (pengingat otomatis 10 Nov 05:10 dan 15:10 WIB). Di Repliz ada 1 file `denah-hari002.mp4` berstatus pending ukuran 1 byte (salah init), tidak dipakai; hapus hanya dengan izin pemilik.
- Belum ada: efek suara, jadwal otomatis harian, analisis mingguan pertama.
