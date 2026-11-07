"""Balai Desa Bocor (konsep v3, Siaran Pers Balai): peresmian sumur meriah, air ternyata dari mobil tangki sewaan; acara lebih mahal dari sumurnya.
Cerita fiksi: desa, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Siaran Pers Balai", "pilar": "seremonial dan pencitraan", "tokoh": ["Pak Kades", "perangkat desa", "pemuda", "ibu-ibu warga"],
        "lokasi": ["lapangan peresmian sumur", "balai (konferensi pers)", "lokasi peresmian dari atas (rincian biaya)", "belakang tenda (mobil tangki)", "sumur pagi berikutnya (antre jerigen)"],
        "hook": "kontras", "variasi": [2, 4, 5]}
ACARA = [["Tenda", 6], ["Konsumsi", 7], ["Sound system", 3], ["Plakat & pita", 2], ["Spanduk & dokumentasi", 3]]   # juta rupiah (rekaan)
SUMUR = 18


def compute():
    tot = sum(j for _, j in ACARA); assert tot == 21 and tot > SUMUR
    return dict(acara=ACARA, acara_tot=tot, sumur=SUMUR, tamu=12, foto=20,
                acara_cues=["Tenda", "konsumsi", "sound system", "plakat", "spanduk"],
                siaran=["Sumur desa telah diresmikan dengan SUKSES dan MERIAH.", "Air bersih kini hadir untuk seluruh warga."], siaran_cues=["Bunyinya", "air bersih"])


SCENES = [
    dict(id="s1", type="BL_SUMUR", kicker="SIARAN PERS BALAI", sub="peresmian sumur", say="Peresmian sumur desa. Tenda tiga, tamu undangan *{tamu|w}*. Pita digunting, keran dibuka, airnya *muncrat*. Semua tepuk tangan. Besok paginya, keran yang sama *kering kerontang*.", data=[]),
    dict(id="s2", type="BL_PRESS", kicker="SIARAN PERS", sub="balai desa", say="Sorenya, balai menerbitkan siaran pers. Bunyinya: sumur desa telah diresmikan dengan *sukses dan meriah*. Air bersih kini hadir untuk seluruh warga. Fotonya dua puluh. Foto airnya? *Tidak ada*.", data=[]),
    dict(id="s3", type="BL_SUMUR", variant="biaya", kicker="RINCIAN ACARA", sub="papan pengumuman", say="Rincian biaya ikut ditempel. Tenda enam juta, konsumsi tujuh juta, sound system tiga juta, plakat dan pita dua juta, spanduk dan dokumentasi tiga juta. Acaranya *dua puluh satu juta*. Sumurnya sendiri: *delapan belas juta*.", data=[]),
    dict(id="s4", type="BL_TANKER", kicker="DI BELAKANG TENDA", sub="rekaman warga", say="Lalu seorang pemuda memutar videonya dari belakang tenda. Keran itu ternyata disambung *selang* ke mobil tangki air sewaan. Pompanya sendiri belum dapat listrik. Yang diresmikan hari itu: *mobil tangkinya*.", data=[]),
    dict(id="s5", type="BL_SUMUR", variant="end", kicker="PAGI BERIKUTNYA", sub="antre jerigen", say="Pagi berikutnya, ibu-ibu antre membawa jerigen. Kerannya kering, tendanya sudah dibongkar. Tinggal plakatnya yang *masih mengkilap*. Di tempat lo, yang lebih meriah acaranya atau hasilnya? Tulis di komentar.", data=[]),
]
END_PAD = 2.5
