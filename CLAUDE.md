# Proyek Motion 6 Akun

Pipeline video pendek 9:16 (TikTok, Instagram Reels, YouTube Shorts) untuk 6 akun faceless. Pemilik bekerja dari HP, tanpa PC, dan ingin kerja seminimal mungkin. Komunikasi dengan pemilik dalam bahasa Indonesia santai.

## Alur repo
- **9-14 Nov 2026 akun GitHub pemilik sempat di-suspend; sejak 14 Nov GitHub tersambung lagi (pemilik). Kode kembali disimpan di repo (branch per sesi -> PR ke `main`). Arsip Artifact tetap jadi cadangan (bagian SIMPAN KODE DI ARTIFACT).**
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

## SIMPAN KODE DI ARTIFACT (sejak 9 Nov 2026; bagian ini dan OTOMATIS = lingkungan Kades Denah)
- Lingkungan ini (`$MOTION_AKUN` = kades,denah) menyimpan kode di halaman Artifact privat "Arsip Kode Kades Denah": https://claude.ai/artifact/V2PgcJXscV4GWMGrUcrDcc . Kerjakan HANYA akun di `$MOTION_AKUN`.
- Isi halaman (file pendukung, teks base64):
  - `bundle-<tanggal>-partN.txt`: cadangan git lengkap semua akun (git bundle --all, base64, dipecah 15 MB). Pulih: `cat bundle-<tgl>-part0.txt ... partN.txt | base64 -d > full.bundle && git clone full.bundle Motion`.
  - `inti-<tanggal>.txt`: paket inti Kades + Denah (mesin, dunia 3D `desa3d.js`/`bumi.js`, config, logo JPG, data peta, aturan, CLAUDE.md, `pulihkan-kd.sh`). Tanpa three.js, font, wav, folder out.
  - `ep-<akun>-<ep>.txt`: satu folder episode (tar.xz + base64; sampai 9 Nov termasuk wav, sesudahnya tanpa wav).
  - `status-<tanggal>.txt`: hasil produksi harian untuk tanggal tayang itu (episode, posting terjadwal, % storage, galat).
- Pulih di sesi baru:
  1. Artifact action `read`, `url` halaman di atas, `paths` = [inti terbaru, semua `ep-*.txt`], `out_dir` = folder kosong (mis. `pulih/`).
  2. `mkdir Motion && cd Motion && base64 -d ../pulih/inti-<tgl>.txt | tar xJf -`
  3. `for f in ../pulih/ep-*.txt; do base64 -d "$f" | tar xJf -; done`
  4. `bash pulihkan-kd.sh` (npm pack three@0.170.0 + @fontsource baloo-2/nunito/fredoka/poppins 5.3.0, cek md5 three, git init lokal).
- Tiap episode baru WAJIB disimpan (TANPA wav sejak 9 Nov): `tar cf - --exclude='*.wav' motion/episodes/<akun>/<ep> | xz -9e | base64 -w0 > ep-<akun>-<ep>.txt`, lalu publish ke halaman yang SAMA (parameter `files`, tambahkan juga baris tabel di index.html halaman). Kalau mesin/dunia 3D berubah, simpan paket inti baru `inti-<tanggal>.txt` (nama baru, jangan timpa).
- Sesi baru yang belum punya file halaman: Artifact `read` url dulu (dapat index.html), edit tabel, lalu publish dengan `url` yang sama.
- Batas: 16 MB per file teks, 64 MB per publish (lebih dari itu bagi beberapa publish ke halaman yang sama).
- File lama di halaman TIDAK dihapus tanpa izin pemilik.

## OTOMATIS (keputusan pemilik 9 Nov, sama dengan sesi Dompet+Meja)
- AWAL TIAP SESI: `echo $MOTION_AKUN` (lingkungan ini = `kades,denah`). Kerjakan HANYA akun itu. Sejak 14 Nov GitHub dipakai lagi: commit di branch sesi, PR ke `main` (file bersama seperti CLAUDE.md/mesin: gabungkan, jangan timpa bagian sesi lain).
- Produksi dan penjadwalan berjalan OTOMATIS lewat tugas terjadwal di sesi ini, TANPA konfirmasi pemilik (pemilik mengecek sendiri di storage Repliz). Aturan "kirim ke pemilik sebelum dijadwalkan" dan "konfirmasi posting" TIDAK berlaku untuk tugas terjadwal.
- Produksi harian sesudah 15:00 WIB (reset kuota TTS) membuat 3 video per akun untuk tayang LUSA (hari ini + 2). Kades dulu, lalu Denah. Kuota flash-lite 10/hari dibagi berdua: 6 video + maks 4 ulang.
- Video dikompres CRF 23 (menggantikan "tidak dikompres"): kualitas nyaris sama, ukuran ~45% lebih kecil. Sudah di render.js.
- Storage Repliz: pemilik menghapus file lama MANUAL. Jangan hapus file. Kalau >= 85% terpakai, tulis peringatan di status (dilaporkan di notif malam).
- Notifikasi: hanya satu push malam 23:03 WIB dari tugas laporan malam. Tugas lain tanpa notifikasi; hasil/galat ditulis ke `status-<tanggal-target>.txt` di arsip Artifact.
- UJI JAM TAYANG: 6 blok WIB: A 07:00-08:59, B 09:00-11:59, C 12:00-13:59, D 14:00-16:59, E 17:00-19:59, F 20:00-22:15. Tiap hari per akun, 9 posting (3 video x 3 platform) dibagi ke blok yang paling SEDIKIT dipakai platform itu dalam 14 hari terakhir (docs/JAM-TAYANG-KD.md). Menit acak tidak bulat, satu video tidak tayang bersamaan di tiga platform. Untuk serial: episode utama Hari N tetap tayang sebelum Hari N+1 di platform yang sama. Catat tiap posting di docs/JAM-TAYANG-KD.md (tanggal, akun, ep, platform, jam, blok, id jadwal).
- Analisis mingguan (Senin): view 48 jam per platform per blok, dinormalkan ke median akun. Setelah tiap platform+blok punya >= 6 posting: 70% posting ke 2 blok terbaik per platform, 30% tetap eksplorasi. Hasil di docs/ANALITIK.md + motion/analytics/.
- Kalender musiman: docs/KALENDER-KD.md (kerangka s.d. 31 Des; topik detail hanya 2 minggu ke depan di BANK-TOPIK).
- Rotasi suara: kolam sampai 3 suara per akun, model TTS tetap, logat Indonesia wajib natural. `CONFIG_OVERRIDE = {"tts": {"voice": ...}}` di episode.py, catat di `META["suara"]`. Kolam: Kades = Achird (utama), Iapetus, Algieba; Denah = Sulafat (utama), Despina, Aoede. Suara selain utama dipakai setelah lolos uji (cek_potongan bersih + intonasi wajar); yang terdengar logat asing dicoret dari kolam di sini.
- SERIAL VOTING dengan produksi LUSA: sebelum menulis Hari N, WAJIB baca komentar (TikTok, IG, YouTube lewat Repliz) semua episode utama yang SUDAH tayang dan belum diumumkan hasilnya, hitung A/B (satu akun satu suara), like/follower bila jadi mekanik, catat angka di episode.py. Hasil voting diumumkan di episode utama pertama yang diproduksi sesudah episode itu tayang (biasanya 2 hari kemudian di dunia nyata). Di narasi bilang "hasilnya dua hari lagi", bukan nomor Hari tertentu. Kalau sepi/seri, kades / Kepala Bumi memutuskan sendiri dan menyebutnya di narasi.
- Shot 3D episode baru ditulis di `motion/episodes/<akun>/<ep>/shots.js` (impor helper dari `engine/w3d/desa3d.js` atau `engine/w3d/bumi.js`, yang mengekspor helpernya). Nama shot unik: awali kode episode, mis. `K_H005_HOOK`, `D_H005_HOOK`, `K_SQ03_...`, `D_LORE03_...`. `desa3d.js`/`bumi.js` tidak ditambah shot lagi kecuali helper umum.
- Cek potongan suara: `GOOGLE_API_KEY=dummy python3 motion/engine/cek_potongan.py <akun> <ep>` (cetak "SEMUA OK" atau adegan yang perlu dicek).
- Arsip: tiap episode baru disimpan sebagai `ep-<akun>-<ep>.txt` TANPA wav (`tar cf - --exclude='*.wav' motion/episodes/<akun>/<ep> | xz -9e | base64 -w0`). Satu halaman maks 511 file / 256 MB: tiap tanggal 1 pindah ke halaman arsip baru (tugas bulanan), halaman lama diberi baris "PINDAH: <link>". Paket inti baru: `bash pulihkan-kd.sh --paket`.
- Jangan bikin akun GitHub/hosting baru untuk menghindari suspend.

## Keputusan pemilik (jangan diubah tanpa tanya)
- 3 video per hari per akun mulai 10 Nov 2026 (naik dari 2, keputusan pemilik 7 Nov, demi growth). Durasi 60-120 detik.
- Tidak ada label "cerita fiksi" di dalam video (cukup di bio). Tidak ada bar progres/durasi.
- Tanpa musik latar.
- Semua akun 3D (three.js low-poly). Visual dan gerak tiap akun WAJIB beda (latar, kamera, transisi, gerak). Tiap kejadian = lokasi 3D baru; variasikan shot, jangan template yang sama.
- Hewan: dunia malam tapi TERANG (banyak cahaya), bukan gelap pekat (masukan pemilik 6 Nov).
- Caption: emas, outline cokelat tua; kata kunci `*...*` di naskah jadi putih; muncul KATA PER KATA mengikuti suara.
- Label AI platform aktif di TikTok dan YouTube. YouTube publik. IG dibagikan ke feed.
- Video dikompres CRF 23 (keputusan pemilik 9 Nov).
- ATM dari referensi: ambil struktur hook, tempo, jenis visual. Jangan salin cerita, tokoh, atau aset.
- Jangan sebut orang, partai, perusahaan, atau instansi nyata. Fakta nyata wajib bersumber (simpan di `episode.py`).
- Model 3D dari luar hanya yang lisensinya bebas (cek dan catat dulu).

## Isi v3 (Dompet, Meja, Balai, Hewan; detail di `docs/KONSEP-V3.md`)
- Rotasi format: format sama tidak dua kali berturut-turut, minimal 4 format beda per 7 hari. Kades dan Denah tetap serial harian.
- Dompet: tokoh Nana atau Raka (cowok). Boleh info investasi/sukses sebelum 30. Disclaimer gaya cerita: "Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu." + kalimat risiko singkat di video investasi, tanpa janji untung. Raka pakai suara cowok dari kolam suara Dompet (lihat bagian TTS), mis. `CONFIG_OVERRIDE = {"tts": {"voice": "Fenrir"}}`.
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
- Model per akun (disetujui pemilik): `gemini-3.8-flash-tts` untuk Dompet (Kore), Meja (Puck), Hewan (Algenib); `gemini-3.8-flash-lite-tts` untuk Denah (Sulafat), Kades (Achird), Balai (Charon). Jangan ganti MODEL tanpa izin (kuota dibagi per model).
- Suara boleh dirotasi (keputusan pemilik 8 Nov): tiap akun punya kolam sampai 3 suara, pilih yang terbaik, supaya tidak itu-itu terus. Suara boleh sama antar akun (umum di luar sana). Ganti suara TIDAK menambah kuota (tetap 1 panggilan per video). Pakai `CONFIG_OVERRIDE = {"tts": {"voice": ...}}` di `episode.py`, catat di `META["suara"]`. Jenis kelamin suara ikut narator/tokoh utama. Syarat wajib: logat dan intonasi bahasa Indonesia harus natural (pemilik, 8 Nov). Gemini tidak punya suara khusus Indonesia; semua suara bisa bahasa Indonesia dan bahasanya ikut naskah, tapi logat tiap suara beda. Suara yang terdengar logat asing atau intonasinya janggal dicoret dari kolam.
- Kolam suara: Dompet = Nana: Kore, Leda, Zephyr; Raka: Fenrir, Sadachbia, Zubenelgenubi. Meja = Puck, Sadachbia, Laomedeia. Kades = Achird (utama), Iapetus, Algieba; Denah = Sulafat (utama), Despina, Aoede (dua terakhir dipakai setelah lolos uji). Akun lain: suara awal di atas, sesi pasangannya boleh menambah 2 suara dan mencatatnya di sini.
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

## Status (9 Nov 2026)
- Terjadwal di Repliz: 7 Nov (36 posting), 8 Nov (33), 9 Nov (24: dompet ep006/ep007, meja ep006/ep007, balai jalan/viral, hewan ep006/ep007). Daftar di `docs/jadwal/`.
- Berikutnya untuk Dompet/Meja/Balai/Hewan: video 10 Nov dengan format yang belum dipakai (lihat KONSEP-V3 dan BANK-TOPIK v3).
- Repo pindah ke `samsulaffiliate7-bit/Motion` (7 Nov). 3 lingkungan pasangan dibuat manual oleh pemilik; kunci Gemini tiap lingkungan diisi pemilik akunnya (network secret).
- Branch lama `claude/tes-jhfxih` sudah boleh dihapus (jadwal 6 Nov sudah tayang); penghapusan dari sesi ditolak izin, pemilik bisa menghapus lewat GitHub.
- Kades: Hari 3 menunggu voting Hari 2 (A rumah deret / B rumah berjarak, anggaran 75 jt) setelah tayang 8 Nov.
- Denah: Hari 2 menunggu voting Hari 1 (A perumahan / B kawasan usaha) setelah tayang 8 Nov.
- Data awal performa (ep001, < 2 hari): Denah paling kuat (TikTok 59% bertahan di detik 3, IG 34 simpan); akun cerita banyak kehilangan penonton di 1-3 detik pertama.
- Sampingan TERJADWAL di Repliz (8 Nov, atas perintah pemilik; daftar di `docs/jadwal/`): Kades `sq01` "kenapa nggak tanya warga" (9 Nov; mekanik komentar WARGA = +1 penduduk, hitung di Hari 3), `sq02` "desa belum punya nama" (10 Nov; usulan nama, like komentar terbanyak menang); Denah `lore01` tebak negara (9 Nov; skor + negara tujuan), `lore02` rumah vs pajak (10 Nov; komentar A/B/C aturan pajak kota).
- 10 Nov TERJADWAL lengkap (dibuat 9 Nov dari komentar yang ada, atas perintah pemilik): Kades hari003 (pagi) + sq02 (siang) + hari004 (malam); Denah hari003 (pagi) + lore02 (siang) + hari004 (malam). Pola baru: voting episode N diumumkan di episode N+2 (Hari 5 = hasil voting Hari 3, WARGA, follower/lampu, nama desa; Denah: bus/kereta, usulan bangunan Hari 2, like, komentar kejadian, pajak A/B/C). Tanpa git commit (pemilik). Narasi Hari 3/4 diubah 9 Nov 14:40 jadi "hasil dua hari lagi" (render ulang CRF 23, jadwal sama). Mulai 9 Nov produksi OTOMATIS lewat tugas terjadwal (lihat bagian OTOMATIS): produksi harian 15:31 WIB (tayang lusa; run pertama 9 Nov = konten 11 Nov, Hari 5-6), laporan malam 23:03, analisis Senin 08:47, ganti arsip tanggal 1 10:41.
- 14 Nov: tugas terjadwal Kades/Denah (dan Dompet/Meja, Balai/Hewan) NONAKTIF sejak 10 Nov malam; pemilik minta tetap mati. Produksi 11-13 Nov tidak jalan.
- Kades Hari 5 viral di TikTok (32 rb view, 1.386 komentar, +934 follower). Hari 7 (tayang 14 Nov): semua ±1.200 pendaftar WARGA langsung jadi warga (keputusan pemilik), penduduk 1.227, nama desa Banyusegara (pemilik), 94 lampu surya, anggaran 43 jt, voting baru A rumah susun / B perumahan timur. Belum diumumkan: nama jalan (SQ#3, hitung like via repliz_list_tiktok_comments), Hari 6 cerita banjir.
- Denah Hari 7 (tayang 14 Nov): bus menang 2:1, penduduk 47, koin 150, klinik menang (kurang 30 koin), voting rute bus. TikTok Denah sepi (Hari 5 14 view), kemungkinan efek unggahan ganda Hari 3.
- Stok siap render (naskah + TTS ada, belum render/unggah): kades sq04, kades hari008, denah lore04, denah hari008 (Denah Hari 8 = pajak lebar, klinik, target 200 like stadion).
- Komentar banyak: pakai repliz_list_tiktok_comments (50/halaman + like per komentar); 1.000+ komentar dihitung dari sampel, catat metodenya di episode.py.
- Di storage Repliz ada file uji pemilik (tes gpt, kades-hari007-sensus-warga, -v2-cepat, tes-gpt-denah-hari007-*): bukan dari sesi ini, jangan dipakai tanpa tanya.
- Belum ada: efek suara, analisis mingguan pertama.
