# KONSEP V2 (masukan pemilik 6 Nov 2026)

Berlaku untuk semua video BARU. Video yang sudah tayang/terjadwal tidak diubah.
Semua visual baru dibuat 3D (three.js low-poly, cahaya dan bayangan), lihat `CLAUDE.md`.

## Masukan pemilik (ringkas)
1. Balai Desa Bocor: konsep berantakan. Ember dan tetesan tidak perlu terus ditunjukkan, layar tidak perlu goyang terus, penghitung "Ember ke-N"/nomor episode membingungkan penonton baru. Hapus nomor episode. Cerita jalan saja.
2. Denah Rumah Dunia: konsep lama (bedah satu rumah) kurang menarik. Ganti jadi interaktif seperti Kades Magang Juara: cerita + informasi, penonton ikut menentukan lewat komentar dan like.
3. Akun lain: cerita sudah oke, tapi visual monoton dan mirip antar akun. Meja jangan selalu layar terbelah. Variasikan sebanyak mungkin, kualitas premium.

## Komentar jadi konten (SEMUA akun)
- Tiap kali menyiapkan episode baru, cek komentar video-video terakhir akun itu lewat Repliz. Komentar yang menarik (pertanyaan bagus, cerita penonton, debat seru, ide topik) boleh dijadikan konten baru.
- Frekuensi: 2-5 video per minggu per akun, tidak tiap hari. Kades dan Denah sudah interaktif lewat voting, jadi frekuensinya menyesuaikan.
- Di video, kutip cuplikan komentar sebagai kartu komentar di layar. Nama pengguna disamarkan (misal "@an***"), tanpa foto profil, tanpa data pribadi. Teks boleh dipersingkat tanpa mengubah maksud.
- Jangan pakai komentar yang kasar, menyerang orang, menyebut orang/instansi nyata, atau berisi informasi pribadi.
- Catat di `episode.py` komentar mana yang dipakai (platform, tanggal, teks yang dikutip).

## Aturan variasi visual (SEMUA akun)
- Tiap akun punya pustaka shot 3D sendiri (minimal 10 jenis shot, lihat tabel per akun). Pustaka shot antar akun tidak boleh sama.
- Tiap episode memakai minimal 6 jenis shot berbeda. Jenis shot yang sama tidak boleh muncul dua kali berturut-turut.
- Lokasi mengikuti alur cerita: tiap kejadian/tempat baru = lokasi 3D baru (bukan latar yang sama dengan teks berganti).
- Gerak kamera bervariasi per shot: dolly, orbit, crane naik/turun, push-in, POV, tampak atas, close-up benda, kamera mengikuti tokoh.
- Tanda khas akun (misal layar terbelah Meja) maksimal SATU kali per episode, sebagai momen puncak, bukan format seluruh video.
- Episode berturut-turut di akun yang sama tidak boleh dibuka dengan shot yang sama.
- Sebelum render: daftar shot episode dicek terhadap 2 episode sebelumnya; kalau urutan shot lebih dari 50% sama, susun ulang.

## Bahasa visual 3D per akun (WAJIB beda)

| Akun | Dunia 3D | Cahaya/suasana | Kamera khas | Transisi khas | Contoh shot |
|---|---|---|---|---|---|
| Dompet | Dunia Nana: kamar kos, kafe, mall, ATM, dapur, jalan | Hangat senja, lampu kuning | Push-in pelan ke benda (struk, dompet, HP) | Koin raksasa jatuh menutup layar | struk keluar dari printer 3D, koin berhamburan, dompet "menangis", kalkulator raksasa, kalender berputar, tampak atas meja belanja |
| Kades | Diorama desa ala game (`w3d/desa3d.js`) | Siang cerah, siklus pagi-malam | Kamera terbang tinggi lalu menukik ke bangunan | Kilat putih + label kuning | bangunan tumbuh dari tanah, warga berjalan, HUD hari/penduduk/anggaran, tampak atas peta, kartu pilihan A/B |
| Hewan | Kantor/kos/pasar malam, tokoh hewan low-poly | Malam, lampu meja, bayangan panjang | Dolly menyamping pelan, rack focus | Gelap ke hitam | siluet di jendela, kucing di kursi bos, tikus di tumpukan berkas, lorong gelap, lift, parkiran |
| Balai | Desa rekaan: balai, pasar, sawah, posyandu, pos ronda, lapangan, grup WA warga | Siang terik/sore, cuaca berganti sesuai cerita (bukan hujan terus) | Gaya liputan warga (mockumentary): wawancara warga menghadap kamera, kamera "dokumenter" | Stempel/kertas surat edaran menyapu layar | wawancara warga dengan papan nama, Pak Kades Janji di podium, spanduk, proyek setengah jadi, rapat, papan pengumuman |
| Denah | Bola Bumi 3D lalu kota/negara; rumah dan bangunan dunia | Langit cerah, laut biru, malam bertabur lampu kota | Orbit globe, terbang antar negara, turun ke kavling | Globe berputar / pesawat kertas melintas | globe zoom ke Jakarta, pin lokasi, rumah tumbuh + potongan denah, peta jalur ekspansi, HUD penduduk/koin/negara |
| Meja | Kantor 3D: open space, ruang bos, pantry, lift, rapat, rumah staf malam, mobil bos | Biru dingin (staf) vs oranye hangat (bos) lewat cahaya | Over-the-shoulder, POV layar HP/laptop | Whip pan | chat di HP 3D, jam dinding, pintu ruang bos, timelapse lembur, split-screen SEKALI di puncak |

## Akun 4 Balai Desa Bocor (v2)
- Tidak ada nomor episode, tidak ada penghitung ember. Tiap video berdiri sendiri, bisa dipahami penonton baru.
- Format: "liputan warga" (mockumentary) dari desa rekaan. Narator datar seperti pembawa berita lokal; warga diwawancara menghadap kamera.
- Tokoh tetap: Pak Kades Janji (peci, kumis tipis), Bu Ketua PKK, Pak RT, pemuda karang taruna, anak-anak. Semua fiktif.
- Balai bocor cukup jadi easter egg sesekali (maksimal satu shot singkat), bukan inti tiap episode. Kalimat "minggu depan beres" boleh jadi penutup khas tapi tidak wajib.
- Struktur: hook absurd (1 kalimat + visual) → kejadian → wawancara warga → janji pejabat desa → proses berbelit → warga bertindak sendiri → penutup ironis + pertanyaan ke penonton.
- Kamera tidak goyang terus. Goyang ringan hanya di shot wawancara.

## Akun 5 Denah Rumah Dunia (v2): serial "Bumi Kita"
Nama akun TETAP @denahrumahdunia / Denah Rumah Dunia (keputusan pemilik). "Bumi Kita" hanya nama serialnya.

**Premis:** Bumi masih kosong. Penduduk awal cuma 2: **Juragan Modal** (yang punya uang) dan **Kepala Bumi** (yang mengatur dan bercerita). Mulai dari satu kavling di **Jakarta**, lalu membangun rumah dan kota, dan merambah ke negara lain sesuai komentar dan like penonton.

**Format serial:** "Hari N di Bumi". HUD tetap: Hari, Penduduk, Koin (mata uang rekaan, supaya tidak ada klaim harga nyata), Negara terbuka.

**Aturan interaksi (dihitung dari episode utama sebelumnya, tiga platform digabung, lewat Repliz):**
- Komentar A/B: menentukan keputusan bangunan hari itu.
- Komentar nama negara: negara dengan sebutan terbanyak jadi tujuan ekspansi berikutnya saat "paspor" terbuka.
- Like → penduduk baru: +1 penduduk per 10 like (minimal +1, maksimal +100 per hari).
- Follower → paspor: tiap +50 follower gabungan dibanding hari pertama = 1 negara baru terbuka.
- Komentar sepi/seri: Kepala Bumi memutuskan sendiri dan disebut di narasi.
- Angka dicatat di data episode (`state` per hari), dihitung kode dengan assert.

**Fokus (revisi pemilik 6 Nov 2026): TATA RUANG skala kota/negara, BUKAN bangun satu rumah.** Tiap keputusan = mau dibangun kawasan/fasilitas apa dan di mana: perumahan, pasar/toko swalayan/mall, perkantoran, kawasan industri, ruang terbuka hijau, jalan, transportasi umum (bus, kereta, pelabuhan), bandara, sekolah, rumah sakit, energi, air bersih, dll. Kota tumbuh sesuai pilihan penonton, mengikuti pola kota/negara aslinya (iklim, geografi, kebiasaan). Dekor 3D menyesuaikan kota/negara yang sedang dibangun (pohon, warna bangunan, gaya atap, kendaraan). Arsitektur rumah boleh muncul sebagai detail, bukan inti.

**Isi informasi:** tiap keputusan bangunan diambil dari arsitektur nyata negara/kota itu (rumah adat, rumah modern khas, solusi iklim). Fakta wajib bersumber dan sumbernya di `episode.py`. Tetap ada kalimat "inspirasi, konsultasikan ke arsitek" kalau membahas denah untuk dibangun.

**Slot harian:** slot 1 = episode utama "Hari N" (butuh voting 24 jam). Slot 2 = "Info Rumah Dunia": FYI singkat tentang rumah/bangunan dari negara yang sedang atau akan dikunjungi, ditutup ajakan komentar negara tujuan. Tidak butuh voting. Slot 3 (mulai 10 Nov 2026, 3 video/hari) = sampingan tambahan tanpa voting, bentuk menyusul (tanya pemilik).

**Beda dengan Kades (wajib):** Kades = satu desa kecil, keputusan sehari-hari desa (sumur, balai, pos ronda), kamera dekat ala game isometrik. Denah = skala kota besar dan negara (zona kota, gedung tinggi, transportasi, bandara), kamera drone tinggi, orbit globe, dan terbang antar negara. Tokoh, palet, HUD, dan transisi berbeda.

**Narasi:** Kepala Bumi bercerita (orang pertama jamak "kita"), hangat dan penasaran. Juragan Modal muncul sebagai tokoh visual dengan koper koin, kadang "protes" soal biaya.

**Rencana awal (bisa berubah sesuai komentar):**
- Hari 1: Bumi kosong, 2 penduduk, lahan kota pertama di Jakarta. Kenalan dengan zona tata ruang (hunian, usaha, industri, ruang hijau). Pilihan zona pertama: A kawasan perumahan (jauh dari pesisir rawan banjir), atau B kawasan usaha (pasar, toko swalayan, kantor kecil). Ajak komentar negara tujuan pertama.
- Hari berikutnya: kebutuhan muncul bertahap sesuai pertumbuhan penduduk: jalan dan transportasi umum, air bersih, sekolah, rumah sakit, kawasan industri, pelabuhan, bandara, lalu kota kedua/negara baru.
- Hari 2 dan seterusnya: hasil voting dibangun, penduduk bertambah dari like, kebutuhan baru muncul (air, jalan, tetangga), paspor pertama terbuka saat follower cukup.

## Hashtag (baru)
- Denah: #rumahdunia #desainrumah #simulasi #arsitektur
- Balai: #desa #komedi #sindiran #liputanwarga
