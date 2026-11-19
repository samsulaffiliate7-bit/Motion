# KONSEP SEASON 1 (disetujui pemilik 19 Nov 2026) — WAJIB dibaca sebelum membuat episode akun mana pun

Semua 6 akun MULAI ULANG dari nol sebagai serial interaktif bergaya "game, new game". Nama akun tetap; isi lama 4 akun (Dompet, Meja, Balai, Hewan) tidak dipakai lagi. Kades dan Denah juga mulai ulang dari Season 1 Episode 0.
Contoh yang sudah jadi (acuan kualitas & struktur kode): Kades `motion/episodes/kades/s1e00` (Ep 0) + `s1aturan` (video Aturan), dunia bersama season di `motion/episodes/kades/_s1/dunia.js`.

## Aturan umum semua akun
- Season = 30 episode = 1 bulan, tanpa tamat (season ditutup cliffhanger). 5 babak x 6 episode (1 babak = 1 minggu): Ep1 buka masalah, Ep2-3 target kecil, Ep4-5 memuncak, Ep6 = PUNCAK BABAK di akhir pekan (bencana/ujian/perang/krisis sesuai akun).
- 1 video per hari per akun. Durasi 45-75 dtk. Pertama: video ATURAN MAIN + Episode 0 (keduanya nanti dipin di profil).
- Interaksi (tampil DI DALAM DUNIA, bukan kartu tempelan; rumusnya selalu terlihat): FOLLOW = anggota/uang, LIKE = koin/skill/XP, KOMEN = saran jalan cerita.
- Komen tidak boleh merusak alur: tujuan season, tujuan babak, dan puncak babak DIPAKU; episode 2-5 diisi pilihan penonton. Pertanyaan akhir video selalu TERARAH (2-3 pilihan dalam jalur babak). Pilihan apa pun menuju puncak yang sama, akibatnya beda. Komen melenceng lucu = lelucon/episode sampingan maks 1 per babak; melawan tujuan = jadi rintangan; kasar/nama nyata = dilewati. Sepi/seri = tokoh memutuskan sendiri dan menyebutnya.
- Tiap episode: alur MENGALIR (sebab-akibat dari episode sebelumnya), ada kejadian + masalah + lelucon + cliffhanger. Hook 3 dtk: frame pertama aksi + teks; kalimat pertama = premis/taruhan. Rekap episode lalu maks ±5 dtk, menyatu dengan hook.
- STORYBOARD dulu (STORYBOARD.md per episode: tabel shot detik/lokasi/kamera/aksi/teks/VO/SFX) sebelum render. Pemilik tidak perlu menyetujui episode rutin; Ep 0 + Aturan dikirim ke pemilik (SendUserFile).
- Visual: 3D tetap, `CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}`. Warna CERAH (langit biru, cahaya hangat), jangan gelap. Dunia LUAS dan detail (ratusan bangunan/benda, fasilitas yang dikenali dari udara, pakai THREE.InstancedMesh supaya ringan; contoh `desaBesar` di dunia Kades). Tiap akun dunia/kamera/warna BEDA. Tokoh utama selalu terlihat dan sering disorot dekat.
- Suara: tiap akun punya `tts.style` (catatan sutradara: profil, adegan, gaya, tempo, logat Jakarta/Indonesia natural) di `motion/accounts/<akun>/config.json`; build.py menaruhnya sebelum "#### TRANSCRIPT" sehingga hanya naskah yang dibacakan. Pilih suara dari kolam akun (CLAUDE.md), jenis kelamin ikut narator. Kades memakai Iapetus.
- Aset dunia yang dipakai ulang sepanjang season taruh di `motion/episodes/<akun>/_s1/dunia.js`; shot episode di `motion/episodes/<akun>/<ep>/shots.js` (nama shot unik berawalan kode akun+episode). Nama folder: `s1aturan`, `s1e00`, `s1e01`, ...
- Cek: build --draft -> render --stills (cek hook, kamera, teks terpotong, warna) -> perbaiki -> build TTS -> `cek_potongan.py` -> render penuh -> commit (wav ikut, mp4 tidak) -> kirim.
- Angka/harga nyata wajib bersumber (catat di episode.py). Tidak menyebut orang/instansi/merek nyata.
- Nanti (belum sekarang): cover seragam "EPISODE N", bio satu kalimat premis, foto profil wajah tokoh, website + pasar affiliate per akun.

## 1. KADES MAGANG JUARA — "30 Hari Masa Percobaan" (sudah jadi Ep 0 + Aturan)
Juara (23, kades magang, semangat & sok tahu) punya 30 hari menyelamatkan desa yang DITINGGAL warganya; gagal = dipecat. Mbah Darmo (sesepuh sinis), Bu Wati (pengawas kecamatan fiksi, rapor), Bejo (kambing).
Follow = 1 perantau pulang (papan stasiun "PULANG KAMPUNG"), Like = dana desa Rp10.000/like, Komen = aduan warga jadi misi.
Babak: 1 Desa Hantu (air, sinyal; puncak rapor pertama) · 2 Pulang Kampung (puncak ribut tanah warisan) · 3 Musim Hujan (puncak banjir) · 4 Bangkit (pasar; puncak pasar tandingan desa sebelah) · 5 Penilaian Akhir (festival; diangkat jadi kades tetap?).

## 2. DENAH RUMAH DUNIA — "Planet Denah"
Bumi penuh; arsitek muda Dena (perfeksionis, panik kalau ukuran meleset) + robot PENGGARIS (polos, salah paham perintah) mendarat di planet kosong (tanah ungu-oranye, dua bulan, malam 30 jam). Tiap episode membangun & membedah SATU rumah asli dari satu negara (fakta nyata bersumber) — kamera khas: tampak atas seperti denah lalu menukik masuk rumah.
Follow = 1 pendatang turun dari kapsul (papan "PENDUDUK"), Like = 10 bata/like (tumpukan bata), Komen = negara berikutnya (pertanyaan terarah, mis. "rumah negara mana paling kuat lawan badai?").
Babak: 1 Pendaratan (rumah pertama sebelum malam 30 jam; puncak badai pasir) · 2 Distrik Dunia (6 rumah 6 negara; puncak bata kurang, satu dibongkar) · 3 Musim Air (puncak banjir planet) · 4 Kota Pertama (jalan, balai kota; puncak gempa) · 5 Sinyal (kapsul raksasa ribuan pendatang = cliffhanger).
Ep 0: kapsul jatuh miring, PENGGARIS membangun pintu saja di tengah padang, malam 30 jam tinggal 2 hari.

## 3. DOMPET GUE NANGIS — "Rp100 Ribu di Jakarta"
Nana (22, dari kota kecil fiksi, polos-ulet, menertawakan nasib) pindah ke Jakarta cuma bawa Rp100 ribu. Si Dompet (dompet cokelat berwajah, ekspresi ikut saldo, maskot), Bu Ratna (ibu kos galak tapi baik, "bayar Sabtu"), Raka (tetangga kos, ojol, sok hemat tapi tekor). Dunia: Jakarta kartun senja-cerah, KRL, gang kos, warteg, gedung tinggi; luas & padat.
Follow = uang Rp1.000/follow (notif di HP Nana, rezeki tambahan; penghasilan utama dari kerja di cerita), Like = skill (10 like = +1 XP; skill jualan/komputer/masak/ngomong naik level membuka kerja lebih baik), Komen = keputusan Nana (terarah). Rumus selalu di pojok layar (HP Nana). Harga Jakarta nyata & bersumber (KRL ±Rp3-5 rb, warteg ±Rp15-25 rb, kos sempit ±Rp800 rb-1,5 jt/bln).
Babak: 1 Rp100 Ribu (tempat tidur & makan; puncak bayar kos Sabtu) · 2 Kerja Serabutan (puncak lowongan palsu) · 3 Lamar Kerja (puncak interview) · 4 Masa Training (puncak tanggal tua + sakit) · 5 Gajian Pertama (keluarga minta kiriman = cliffhanger).
Ep 0: turun KRL, "ini Rp100 ribu terakhir gue", biaya hari pertama dihitung, malam belum punya tempat tidur.

## 4. MEJA SEBERANG BOS — "Dari Warung Lipat"
Bima (27, mantan staf kantor kena PHK, masih bergaya korporat: "kita rapat dulu" padahal sendirian) membuka warung kelontong di teras kontrakan; target jangka panjang ratusan cabang. Mak Ijah (pelanggan pertama, suka ngutang, sumber gosip), Tono (sales grosir maksa), Bang Rudi (pemilik toko besar di ujung gang, rival). Dunia: gang padat yang tumbuh jadi kota; kamera makin tinggi tiap babak sampai peta kota dengan pin cabang.
Follow = pelanggan tetap (papan dinding "PELANGGAN TETAP"), Like = modal Rp5.000/like (buku kas di meja kasir), Komen = keputusan bisnis (terarah). Harga grosir vs jual masuk akal.
Babak: 1 Warung Lipat (puncak hari pertama sepi) · 2 Pelanggan Pertama (puncak utang menumpuk, kas minus) · 3 Perang Gang (puncak Bang Rudi banting harga) · 4 Karyawan Pertama (puncak blunder) · 5 Cabang Kedua (masalah sewa = cliffhanger).
Ep 0: "Kemarin gue di-PHK. Hari ini gue jadi bos." meja lipat, stok 1 kardus mi, papan "STRUKTUR ORGANISASI: Bima (semua jabatan)", pembeli pertama Mak Ijah: "ngutang dulu ya".

## 5. BALAI DESA BOCOR — "Desa Terakhir" (zombie)
Wabah zombie; satu desa di kaki bukit jadi tempat bertahan terakhir. Gilang (24, PEMUDA PEMIMPIN DESA, ketua karang taruna jago bengkel; kades kabur duluan pakai motor dinas), Bu Yati (bidan, tenang), Pak Kardi (pensiunan hansip penakut tapi ngaku berani), Sinta (adik Gilang 12 th, paling cerdik). Dunia: desa luas di kaki bukit, pagar bambu, obor, kentongan, kabut; SIANG persiapan/misi, MALAM bertahan (tetap cukup terang, jangan gelap pekat). Zombie kartun hijau, tidak sadis. Cover "DESA TERAKHIR · HARI KE-N". Sindiran halus boleh (bantuan kota cuma spanduk, rapat lebih lama dari serangan).
Follow = penyintas baru di gerbang (papan posko "PENYINTAS"), Like = persediaan (10 like = 1 karung beras / 1 ikat bambu, gudang), Komen = rencana bertahan (terarah). Struktur boleh mirip referensi serial zombie lain, tapi cerita/tokoh/tempat beda (bertahan berkelompok + membangun benteng desa).
Babak: 1 Gerbang Ditutup (puncak malam pertama serangan) · 2 Persediaan (puncak terjebak di pasar kecamatan) · 3 Demam Aneh (puncak keputusan karantina) · 4 Desa Sebelah (puncak penyelamatan malam) · 5 Gelombang Besar (kabar obat ada di kota = cliffhanger).
Ep 0 (Hari ke-0): kentongan dipukul, siluet zombie di ujung sawah, gerbang tak bisa ditutup karena engsel berkarat.

## 6. HEWAN BERDASI KOTOR — "Kerajaan Berdasi" (MMORPG)
Belang (kucing oren prajurit level 1, satu-satunya yang menolak pakai dasi; nekat, setia kawan, selalu kalah duluan). Prof. Burhan (burung hantu penjual peta/item, pelit), Raja Kucing Berdasi (gendut, dasi kotor, "pajak ikan" = sindiran halus), rival kerajaan Serigala Utara. Dunia fantasi game 4 kerajaan: Kucing (Kota Pura), Burung (Pulau Langit), Reptil (Rawa Hijau), Serigala (Utara Bersalju); UI game (level, HP, gold), peta dunia terbuka sedikit demi sedikit; musuh antar kerajaan.
Follow = anggota "Guild Netizen" (daftar party), Like = gold (1 like = 1 gold) + XP (10 like = +1 XP), Komen = pilih kerajaan (KUCING/BURUNG/REPTIL/SERIGALA, spanduk populasi di peta) + keputusan quest (terarah).
Babak: 1 Level 1 (puncak bos tikus raksasa penjaga lumbung) · 2 Guild (puncak dungeon pertama) · 3 Pajak Ikan (puncak Belang dituduh pengkhianat & dibuang) · 4 Perang Utara (puncak perang perbatasan) · 5 Takhta (duel Raja Berdasi; cliffhanger tiga kerajaan bersatu).
Ep 0: "NEW GAME. Level 1. Senjata: sendok." Belang menolak dasi di upacara, dihukum jaga lumbung; lumbung kosong, ikan rakyat hilang.
