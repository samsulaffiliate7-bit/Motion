"""Kades Magang Juara Hari 6 (tayang 11 Nov 2026 malam): kejadian hujan pertama, tenda kebanjiran, gotong royong, pelajaran selokan.

Tema musiman: awal musim hujan (docs/KALENDER-KD.md). Pelajaran selokan + jalan cembung menyambung Side Quest lama (sela03, sumber di sana:
kemiringan melintang jalan dan selokan agar air tidak menggenang). Tidak ada angka fakta baru.
Interaksi (variasi: komentar jadi konten): penonton bercerita pengalaman jalan/rumah kebanjiran, cerita terbaik dikutip di episode berikutnya
(nama disamarkan, tanpa data pribadi)."""

META = dict(format="serial Hari N (kejadian)", pilar="bangun desa", tokoh="Kades Juara, warga, kucing oyen", lokasi="langit badai, aliran air ke tenda, gotong royong pindah tenda, potongan jalan + selokan, rumah kades (oyen), desa sesudah hujan",
            hook="hujan pertama, tenda kebanjiran", variasi="plot kejadian + komentar cerita", interaksi="cerita banjir di komentar, terbaik masuk video", suara="Achird")


def compute():
    return dict(hud=dict(hari=6, penduduk=20, anggaran=65))


SCENES = [
    dict(id="s1", type="K_H006_STORM", kicker="HARI 6", sub="hujan pertama",
         say="Hari keenam. Malam ini *hujan pertama* turun deras banget. Dan desa kita langsung ketahuan *kelemahannya*.", data=["hud"]),
    dict(id="s2", type="K_H006_FLOW", kicker="AIRNYA KE MANA?", sub="ke tenda warga",
         say="Air mengalir ke tempat paling *rendah*: perkemahan tenda warga baru. Jalan tanah berubah jadi *lumpur*, dan desa ini belum punya *selokan* sama sekali. Beberapa warga terbangun karena kasurnya *basah*.", data=["hud"]),
    dict(id="s3", type="K_H006_HELP", kicker="GOTONG ROYONG", sub="tengah malam",
         say="Tengah malam, warga *gotong royong*. Tenda dipindah ke tanah yang lebih tinggi, dan kades membuka *rumahnya* buat anak-anak dan orang tua.", data=["hud"]),
    dict(id="s4", type="K_H006_LESSON", kicker="PELAJARAN", sub="sebelum musim hujan",
         say="Pelajarannya: sebelum musim hujan, bikin *selokan* di kiri kanan jalan, jalannya dibuat sedikit *cembung*, dan jangan dirikan tenda atau rumah di tanah paling rendah.", data=["hud"]),
    dict(id="s5", type="K_H006_OYEN", kicker="OYEN?", sub="aman",
         say="Terus kucing oyen? Aman. Dia sudah tidur di atas *lemari* rumah kades sejak sore. Sesekali dia buka mata, lihat warga sibuk, terus tidur lagi. Paling *santai* satu desa.", data=["hud"]),
    dict(id="s6", type="K_H006_ASK", kicker="CERITA KALIAN", sub="komentar jadi konten",
         say="Lo pernah ngalamin jalan depan rumah *banjir*? Ceritain di komentar. Cerita paling seru bakal *muncul* di video berikutnya, tanpa nama asli.", data=["hud"]),
]
END_PAD = 3.0

