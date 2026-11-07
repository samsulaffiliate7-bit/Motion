# PROFIL 6 AKUN MOTION (versi 2)

Revisi dari profil fase 1, ditambah masukan yang sudah disetujui pemilik akun (riset tren short video, hook, serial, ATM). Bank topik ada di `docs/BANK-TOPIK.md`.

## Ringkasan

| No | Nama profil | Username | Tipe | Gaya visual | Mesin follow |
|----|-------------|----------|------|-------------|--------------|
| 1 | Dompet Gue Nangis | @dompetguenangis | Cerita + info keuangan | 3D hangat senja, dunia Nana/Raka | Format rotasi (mitos vs fakta, bongkar jebakan, mesin waktu, dll) |
| 2 | Kades Magang Juara | @kadesmagangjuara | Mix (cerita + tips) | Isometrik ala game, optimis | "Hari N" + penonton memilih keputusan |
| 3 | Hewan Berdasi Kotor | @hewanberdasikotor | Fabel satir | Malam, siluet, cahaya, tokoh bergerak | Tokoh tetap + kalimat moral yang bisa dikutip |
| 4 | Balai Desa Bocor | @balaidesabocor | Alegori/absurd | 3D liputan warga (mockumentary), lokasi berganti | Tokoh tetap + cerita berdiri sendiri (tanpa nomor episode/ember) |
| 5 | Denah Rumah Dunia | @denahrumahdunia | Simulasi interaktif + info arsitektur | 3D globe, kota, rumah dunia | "Hari N di Bumi", penonton menentukan lewat komentar/like |
| 6 | Meja Seberang Bos | @mejaseberangbos | Mix (cerita + tips karier) | 3D kantor, biru (staf) / oranye (bos) | POV bergantian (jenis bos, jenis staf, kamus HRD, split sesekali) |

## Aturan umum semua akun (keputusan pemilik)

**Jadwal dan durasi**
- 3 video per hari per akun (18 video/hari total; diubah pemilik 7 Nov 2026, dari 2).
- Durasi 60-120 detik. `build.py` memberi peringatan di luar rentang itu.
- Tiap video beda topik dari video sebelumnya di akun yang sama. Ambil dari bank topik, tandai yang sudah dipakai.

**Isi video**
- Vertikal 9:16, narasi suara + caption dengan kata kunci berwarna.
- Hook di 1-3 detik pertama, dan hook harus terbaca sebagai teks di frame pertama (banyak orang nonton tanpa suara). Hook harus ditepati isi video.
- Hook wajib dua hal (masukan pemilik): (1) bikin PENASARAN, berupa pertanyaan, kontras, atau "rahasianya...", bukan fakta datar tanpa konteks; (2) dalam ~5 detik pertama jelaskan video ini tentang APA dan apa yang akan didapat penonton. Contoh: "Rumah selebar 4 meter ini kok bisa tetap terang dan berangin? Rahasianya ada di tengah rumah. Kita bedah denahnya..."
- Struktur dasar: hook (0-3 dtk) → konteks (3-10 dtk) → isi → penutup yang memancing komentar (A/B, debat, "part berikutnya").
- Visual harus bercerita: tiap pengeluaran, tempat, atau kejadian punya adegan bergambar, bukan angka di latar polos. Adegan tidak harus sama tiap episode, susun sesuai alur topik.
- Tidak ada label "cerita fiksi" atau penjelasannya di video. Label fiksi cukup di bio akun.
- Tidak ada bar progres/durasi di atas video.
- Satu akun = satu tema (warna, font, tokoh) yang tetap. Tokoh konsisten, ekspresi dan pose boleh berubah.

**Batasan konten**
- Jangan menyebut orang, tokoh, partai, perusahaan, atau instansi nyata.
- Fakta dan angka nyata wajib dari sumber yang bisa dicek, simpan sumbernya di file episode. Angka cerita dihitung oleh kode.
- Tidak ada klaim sembuh, jaminan hasil, atau nasihat keuangan/hukum yang pasti. Penegas khusus hanya kalau topiknya investasi, utang, atau hukum kerja (tanya pemilik dulu).
- ATM (amati, tiru, modifikasi): dari video referensi ambil struktur hook, tempo, dan jenis visual. Jangan salin cerita, tokoh, nama, atau aset.

**Posting**
- Lewat Repliz ke TikTok, Instagram Reels, dan YouTube Shorts akun yang sama.
- Label AI platform aktif (`isAiGenerated: true`) untuk TikTok dan YouTube. YouTube publik. Instagram ikut tampil di feed.
- Caption: hook singkat + pertanyaan + 3-5 hashtag dasar akun. YouTube: judul pendek + `#shorts`.

## Visual dan gerak per akun (WAJIB beda, jangan setipe)

Semua akun 3D (three.js low-poly). Bahasa visual per akun (dunia, cahaya, kamera, transisi) ada di tabel `docs/KONSEP-V2.md`; isi dan format rotasi di `docs/KONSEP-V3.md`.

## Logo / foto profil

Dibuat di ChatGPT, 1254x1254, kartun outline cokelat tua, nama kecil di bawah. File asli ada di `motion/assets/logos/` (akun 1-6), versi kecil 240px di `motion/assets/logos/small/` dipakai sebagai lencana di pojok kanan atas video.

| No | Isi gambar | Catatan revisi |
|----|------------|----------------|
| 1 | Dompet cokelat menangis, koin jatuh, latar krem | Siap pakai |
| 2 | Kepala kades pusing di pulau isometrik, latar hijau neon | Hijau terlalu menyala; kepala tanpa badan (cek) |
| 3 | Kucing oren sinis berdasi, latar biru tua | Unsur "kotor" belum terlihat |
| 4 | Balai desa isometrik, atap pecah, ember | Siap pakai |
| 5 | Rumah dua lantai potongan di atas bola dunia | Nama tanpa spasi, seragamkan "Denah Rumah Dunia" |
| 6 | Meja dua kursi oranye-biru, lampu ide | Nama tanpa spasi dan terlalu besar |

Cek akhir: nama tetap terbaca saat dipotong bulat.

---

## 1. Dompet Gue Nangis (@dompetguenangis)

**Bio pendek:** Cerita duit sehari-hari: keputusan, hitungan, akibatnya. Fiksi.
**Bio IG:** Cerita fiksi soal duit: tiap video satu keputusan, satu hitungan, satu akibat. Bukan nasihat keuangan.

**Makro:** keputusan uang anak muda Indonesia sehari-hari.
**Mikro (pilar):** gaya hidup naik (lifestyle creep), paylater dan checkout FOMO, tanggal tua, cicilan, utang-piutang teman, dana darurat, transportasi, kos vs rumah, acara sosial (kondangan, nongkrong), keluarga (generasi sandwich), penghasilan tambahan, tantangan hemat.

**Tokoh tetap:**
- Nana: cewek 20-an, rambut hitam dikuncir, hoodie oranye bata, celana abu. Narator dan pelaku.
- Si Dompet: dompet cokelat berwajah, ekspresi mengikuti saldo.
- Tokoh tambahan boleh (teman kantor, ibu, adik), desain flat sederhana.

**Format serial:** "Nana bulan ke-N". Saldo tabungan Nana disimpan di data dan terbawa antar episode; sesekali tampil penghitung saldo di awal atau akhir.

**Struktur episode:** hook angka yang bertabrakan → situasi → keputusan → hitungan di layar → adegan bergambar ke mana uangnya pergi → akibat → polling A/B.

**Formula hook:** "Gaji X, tanggal 20 udah habis. Ke mana?" / "Cuma Rp25 ribu sehari. Setahun jadi segini." / "Gue hampir checkout Rp1,2 juta jam 2 pagi."


**Visual:** krem `#FCEBD0`, oranye bata `#C8501E`, cokelat tua `#4A2410`, emas `#F2B41B`. Font Baloo 2. Latar berlapis per adegan, gerak kamera, transisi tirai.

**Narasi:** orang pertama, santai ("gue/lo"), kalimat 8-14 kata. Suara Gemini TTS "Kore".

**Hashtag dasar:** #ceritauang #keuangan #motiongraphic

---

## 2. Kades Magang Juara (@kadesmagangjuara)

**Bio pendek:** Bangun desa dari lahan kosong, satu keputusan tiap hari. Cerita fiksi.
**Bio IG:** Serial fiksi bangun desa dari lahan kosong. Tiap episode satu keputusan kades, plus tips tata ruang dan uang.

**Makro:** simulasi membangun desa dari nol, nada optimis dan strategis seperti game.
**Mikro (pilar):** infrastruktur (jalan, air, listrik), tata ruang, anggaran, bencana dan mitigasi, ekonomi warga (pasar, usaha), layanan (sekolah, puskesmas), lingkungan, acara desa.

**Tokoh tetap:** Kades Juara, peci hitam, kemeja krem, lencana kuning, ekspresi mudah berubah. Warga sebagai siluet atau ikon kecil. Desain harus jelas beda dari Pak Kades Janji (akun 4).

**Format serial:** penanda "Hari N", penghitung penduduk dan anggaran. Status desa disimpan di data supaya episode nyambung.

**Penonton memilih:** tiap episode ditutup pilihan A/B. Episode berikutnya mengikuti suara terbanyak di komentar (dibaca lewat Repliz). Kalau komentar sepi, pilih opsi yang paling masuk akal dan sebut "kades memutuskan sendiri".

**Struktur episode:** Hari N + krisis → dua pilihan → hasil keputusan sebelumnya (dari komentar) → bangunan muncul bertahap → tips yang bisa ditiru di dunia nyata → pilihan untuk episode berikut.

**Formula hook:** "Hari 30. Desa kebanjiran. Anggaran tinggal 12 juta." / "Warga baru datang 40 orang. Rumahnya di mana?"


**Visual:** hijau `#8BC34A`, hijau muda `#DCEDC8`, kuning `#FFC93C`, krem `#FFF6D6`, teks `#23411F`. Font Fredoka/Baloo 2. Isometrik cerah, label judul kuning.

**Narasi:** orang ketiga, seperti narator game, hangat. **Aturan:** tips harus masuk akal dan bisa dicek.

**Hashtag dasar:** #bangundesa #tataruang #isometrik #simulasi

---

## 3. Hewan Berdasi Kotor (@hewanberdasikotor)

**Bio pendek:** Fabel hewan di kos, kantor, pasar. Pesan moralnya nyelekit. Fiksi.
**Bio IG:** Fabel hewan modern di kos, kantor, dan pasar. Cerita fiksi dengan pesan moral yang nyelekit. Semua tokoh rekaan.

**Makro:** fabel modern yang menyindir perilaku umum.
**Mikro (pilar):** kantor, kos dan kontrakan, pasar dan dagang, pertemanan, organisasi dan panitia, keluarga, media sosial.

**Tokoh tetap:**
- Kucing Berdasi: licin, berdasi, selalu punya alasan. Punya kalimat khas yang berulang.
- Tikus Kecil: pekerja kecil, sering jadi korban.
- Kerbau: jujur dan keras kepala.
- Tokoh tambahan boleh, desain dasar tidak berubah.

**Pembeda dari referensi (ATM):** referensi kucing-tikus di lumbung hanya diambil tempo dan cara bercerita. Setting kita modern (kantor, kos, pasar), nama dan desain tokoh sendiri, lumbung tidak dipakai sebagai setting utama.

**Struktur episode:** hook dari akibat → situasi → ulah Kucing Berdasi → dampak ke yang kecil → pembalikan → satu kalimat moral yang bisa dikutip.

**Formula hook:** "Tikus ini lembur 3 bulan. Bonusnya? Diambil kucing." / "Rapatnya soal penghematan. Makan siangnya prasmanan."


**Visual:** malam `#0B1026`, panel `#1B2347`, oranye `#F28C28`, kuning bulan `#F5D76E`, teks putih. Font Lilita One/Baloo 2. Siklus gerak dipakai ulang.

**Narasi:** narator ketiga, tenang, sedikit sinis. Dialog lewat gelembung teks.

**Aturan ketat:** sindir PERILAKU UMUM, bukan orang, partai, instansi, atau kejadian tertentu. Tidak ada klaim fakta yang tidak bisa dibuktikan. Topik tidak sama persis dengan akun lain.

**Hashtag dasar:** #fabel #cerita #sindiran #animasi

---

## 4. Balai Desa Bocor (@balaidesabocor)

**Konsep v2:** liputan warga (mockumentary) dari desa rekaan "Desa Bocor Indah", tanpa nomor episode dan tanpa penghitung ember. Detail di `docs/KONSEP-V2.md` (bagian Akun 4) dan `docs/KONSEP-V3.md` (pilar sindiran dan format).

**Bio pendek:** Desa rekaan, balai selalu bocor, janji selalu nambal. Fiksi.
**Tokoh tetap:** Pak Kades Janji (peci, kumis tipis), Bu Ketua PKK, Pak RT, pemuda karang taruna, warga. Semua fiktif.
**Narasi:** narator ketiga, datar dan ironis seperti pembawa berita lokal. Suara Charon (3.8-lite).
**Aturan ketat:** semua tokoh, desa, dan angka rekaan. Sindir pola umum, bukan partai, tokoh, instansi, atau kejadian tertentu.
**Hashtag dasar:** #desa #komedi #sindiran #liputanwarga

---

## 5. Denah Rumah Dunia (@denahrumahdunia)

**Konsep v2:** serial simulasi "Bumi Kita" (tata ruang kota/negara, penonton menentukan lewat komentar dan like). Detail di `docs/KONSEP-V2.md` (bagian Akun 5).

**Narasi:** Kepala Bumi bercerita, hangat dan penasaran. Suara Sulafat (3.8-lite).
**Aturan:** fakta arsitektur, iklim, material wajib bersumber (di `episode.py`). Kalimat "inspirasi, konsultasikan ke arsitek" kalau membahas denah untuk dibangun. Koin = mata uang rekaan.
**Hashtag dasar:** #rumahdunia #desainrumah #simulasi #arsitektur

---

## 6. Meja Seberang Bos (@mejaseberangbos)

**Catatan v2:** layar terbelah maksimal sekali per episode (momen puncak). Shot lain bervariasi, lihat `docs/KONSEP-V2.md`.

**Bio pendek:** Satu masalah kerja, dua sudut pandang: staf dan atasan.
**Bio IG:** Satu masalah kerja dilihat dari dua sisi: staf dan bos. Cerita fiksi plus tips karier: lamar kerja, interview, negosiasi.

**Makro:** satu masalah kerja dari dua sisi.
**Mikro (pilar):** gaji dan negosiasi, cari kerja dan interview, komunikasi kerja (chat, rapat, email), jam kerja dan lembur, resign dan pindah kerja, hubungan tim, fresh graduate dan Gen Z, WFH/WFO, performa dan promosi.

**Tokoh tetap:**
- Si Staf: kemeja biru muda, lanyard, tas kecil.
- Si Bos: jas abu, dasi oranye. Tidak jahat, punya alasan sendiri.

**Struktur episode:** dua isi pikiran bertentangan di detik pertama → situasi → pikiran staf (kiri) → pikiran bos (kanan) → salah paham → cara menyelesaikan → tips → "Lo tim staf atau tim bos?".

**Formula hook:** "Staf: 'Gue layak naik gaji.' Bos: 'Dia belum siap.' Siapa yang bener?" / "Chat jam 9 malam: 'Besok pagi ya.'"


**Visual:** abu biru `#4A5D73`, biru staf `#6C8CB0`, oranye bos `#F28C28`, putih `#F5F7FA`, teks `#1E2A38`. Font Poppins.

**Narasi:** santai, satu narator dengan penanda sisi (atau dua suara). **Aturan:** tokoh fiktif, bos manusiawi. Hukum kerja (kontrak, lembur, pesangon, cuti) wajib cek aturan terbaru dan simpan sumbernya. Tidak menjanjikan hasil.

**Hashtag dasar:** #karier #duniakerja #tipskerja #kantor

---

## Posting via Repliz

**Akun Repliz (accountId):**

| Akun | TikTok | Instagram | YouTube |
|------|--------|-----------|---------|
| Dompet Gue Nangis | 6ae843effc43f81b784d663d | 6ae83ee0fc43f81b784d3cf8 | 6ae841f7fc43f81b784d424a |
| Kades Magang Juara | 6ae8a1b5fc43f81b784fa711 | 6ae87c6efc43f81b784e4d29 | 6ae8a21dfc43f81b784fa7b6 |
| Hewan Berdasi Kotor | 6aec821efc43f81b785b16fb | 6ae9edd8fc43f81b78523d38 | 6ae9fe5efc43f81b7852858f |
| Balai Desa Bocor | 6aebc94cfc43f81b7857c4c3 | 6aea07a9fc43f81b78528e62 | 6aea083bfc43f81b78528ec7 |
| Denah Rumah Dunia | 6aec0369fc43f81b78593c49 | 6ae98b17fc43f81b7850dd1f | 6ae993f7fc43f81b785154d6 |
| Meja Seberang Bos | 6aec0751fc43f81b785949cf | 6aeb42d4fc43f81b785686f4 | 6aeb436afc43f81b7856888d (handle YouTube: @mejaseberangboss, dua "s") |

Akun lain di workspace Repliz yang sama (threads kidblirezky, tiktok azzlaffaa, tiktok my.ootd.kalcer) BUKAN bagian proyek ini. Jangan posting ke sana.

**Media:**
- Aturan storage (diubah 6 Nov 2026): storage aktif 10 GB, file TIDAK dihapus otomatis; beri peringatan ke pemilik saat terpakai >= 85%. Pemakaian ±190 MB/hari (12 video), naik jadi ±285 MB/hari dengan 18 video/hari (mulai 10 Nov 2026), jadi 85% (±8,5 GB) tercapai sekitar 30 hari. Video tidak dikompres (keputusan pemilik).

**Komentar:** Repliz bisa membaca komentar konten. Dipakai untuk akun 2 (penonton memilih keputusan) dan bahan topik.
