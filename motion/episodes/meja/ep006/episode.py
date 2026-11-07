"""Meja Seberang Bos ep006 (3D, konsep v3): Seri Jenis Bos, "bos killer yang nggak pernah teriak". Cerita fiksi, tokoh rekaan."""
META = {"format": "Seri Jenis Bos", "pilar": "performa dan promosi", "tokoh": ["Si Staf", "Si Bos (tipe killer pendiam)", "rekan kerja"],
        "lokasi": ["lobi absen pagi", "close-up buku hitam", "open space + ruang kaca bos", "ruang evaluasi", "close-up buku (catatan baik)", "tangga darurat"],
        "hook": "kontras", "variasi": [3, 4, 5]}


def compute():
    bad = [["Tgl 3", "telat 3 menit"], ["Tgl 9", "salah angka di laporan"], ["Tgl 12", "rapat molor 10 menit"]]
    good = bad + [["Tgl 14", "bantu tim lain ✓"], ["Tgl 20", "idenya dipakai klien ✓"]]
    return dict(bad=bad, bad_cues=["telat", "Salah", "molor"], good=good, good_from=3, good_cues=["xxtidak", "xxtidak", "xxtidak", "bantu tim", "dipakai klien"],
                tips3=["Catat kerjaan lo sendiri", "Tanya ukuran berhasilnya dari awal", "Minta masukan rutin, jangan nunggu akhir bulan"],
                tips_cues=["Satu", "Dua", "Tiga"])


SCENES = [
    dict(id="s1", type="M_LOBBY", kicker="JENIS BOS #1", sub="si killer pendiam", say="Bos paling serem itu bukan yang teriak. Bos gue *nggak pernah marah*, nggak pernah naikin suara. Tapi satu kantor takut sama dia. Gara-gara satu benda: *buku hitam* kecilnya.", data=[]),
    dict(id="s2", type="M_NOTEBOOK", kicker="BUKU HITAM", sub="isinya?", say="Telat tiga menit? Dia nggak negur, cuma lihat jam, terus *nulis*. Salah angka di laporan? *Nulis* lagi. Rapat molor? Nulis. Nggak ada yang pernah tahu isinya.", data=["bad", "bad_cues"]),
    dict(id="s3", type="M_GLASSROOM", kicker="SEMINGGU KEMUDIAN", sub="satu tim", say="Seminggu, satu tim jadi *super rapi*. Tapi juga tegang. Tiap pintu ruangannya kebuka, semua langsung *pura-pura sibuk*.", data=[]),
    dict(id="s4", type="M_REVIEW", kicker="AKHIR BULAN", sub="evaluasi", say="Akhir bulan, giliran gue evaluasi. Dia buka buku itu. Tanggal tiga, *telat tiga menit*. Tanggal sembilan, *salah angka*. Gue udah siap kena.", data=[]),
    dict(id="s5", type="M_NOTEBOOK", variant="good", kicker="TERNYATA…", sub="halaman berikutnya", say="Terus dia lanjut baca. Tanggal empat belas, *bantu tim lain* sampai beres. Tanggal dua puluh, *idenya dipakai klien*. Ternyata dia nyatet semuanya. Yang jelek, dan yang *bagus*.", data=["good", "good_from", "good_cues"]),
    dict(id="s6", type="M_STAIRS", kicker="KALAU BOS LO BEGINI", sub="3 cara", say="Jadi kalau ketemu bos tipe begini: Satu, *catat kerjaan lo sendiri*. Dua, tanya *ukuran berhasilnya* dari awal. Tiga, minta masukan rutin, jangan nunggu akhir bulan. Bos lo tipe yang mana? Tulis di komentar.", data=["tips3", "tips_cues"]),
]
END_PAD = 1.5
