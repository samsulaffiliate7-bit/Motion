"""Balai Desa Bocor (konsep v3, Jejak Anggaran): bantuan 1.000 bibit kopi, yang ditanam 500; foto penyerahan lengkap dengan polybag pinjaman.
Cerita fiksi: desa, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Jejak Anggaran", "pilar": "anggaran bocor halus", "tokoh": ["Pak Darto (ketua kelompok tani)", "Pak Kades", "petani"],
        "lokasi": ["kebun kopi desa", "jalan desa (truk bibit, 4 pos)", "halaman balai (foto penyerahan)", "gang (wawancara)", "kebun kopi bulan depan"],
        "hook": "kontras", "variasi": [1, 5], "suara": "Charon"}
POTONG = [["Demplot gudang", 100], ["Rusak di jalan", 80], ["Sampel pameran", 70], ["Jatah pengurus", 250]]


def compute():
    bibit = 1000; sampai = bibit - sum(j for _, j in POTONG); assert sampai == 500
    return dict(bibit=bibit, sampai=sampai, potong=POTONG, potong_cues=["demplot", "rusak di jalan", "sampel pameran", "jatah pengurus"], pinjam=30,
                iv=dict(who="bapak", name="Pak Darto", role="Ketua kelompok tani", q1="“Lubangnya seribu, Pak.”", q2="“Separuhnya nunggu tahap dua.”", q2cue="tahap dua"),
                board=["PROGRAM BIBIT", "Bantuan: 1.000", "Ditanam: 500", "Sisanya: tahap dua"])


SCENES = [
    dict(id="s1", type="BL_FIELDB", kicker="JEJAK ANGGARAN", sub="kebun kopi desa", say="Bibitnya *separuh*. Fotonya *lengkap*. Program bantuan seribu bibit kopi untuk kelompok tani Desa Bocor Indah. Yang akhirnya ditanam petani: *{sampai|w} batang*.", data=[]),
    dict(id="s2", type="BL_BIBIT_ROUTE", kicker="KAMI IKUTI TRUKNYA", sub="dari gudang ke kebun", say="Kami ikuti truknya. Di gudang, *seratus* batang disisihkan untuk demplot. Di kecamatan, *delapan puluh* rusak di jalan. Di balai, *tujuh puluh* untuk sampel pameran. Lalu *dua ratus lima puluh* jatah pengurus. Semua cuma sedikit-sedikit.", data=[]),
    dict(id="s3", type="BL_PHOTO", kicker="FOTO PENYERAHAN", sub="halaman balai", say="Tapi di foto penyerahan, semuanya terlihat lengkap. Papan besar bertuliskan seribu bibit, kades tersenyum, petani memegang polybag. Polybag-nya ternyata *pinjaman* dari kebun bibit sebelah, dikembalikan sore itu juga.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="ketua kelompok tani", say="Pak Darto, ketua kelompok tani, menunjukkan lahannya. Lubang tanam sudah digali seribu. Yang terisi separuh. Separuhnya lagi, katanya, *menunggu tahap dua*.", data=[]),
    dict(id="s5", type="BL_FIELDB", variant="end", kicker="BULAN DEPAN", sub="kebun kopi desa", say="Bulan depan, lubang-lubang kosong itu mulai ditumbuhi rumput. Di sebelahnya berdiri papan baru: *program seribu bibit, sukses*. Di tempat lo, bantuan datangnya utuh, atau tinggal fotonya? Tulis di komentar.", data=[]),
]
END_PAD = 2.5
