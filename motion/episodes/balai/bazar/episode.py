"""Balai Desa Bocor (konsep v3, Kalkulator Warga): bazar UMKM desa "diskon 11.11", biaya lapak + diskon wajib bikin pedagang rugi.
Cerita fiksi: desa, tokoh, dan angka rekaan. Promo disebut generik. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Kalkulator Warga", "pilar": "iuran dan pungutan", "tokoh": ["Bu Ratna (pedagang keripik)", "panitia bazar", "pengunjung"],
        "lokasi": ["bazar UMKM desa siang", "lapak Bu Ratna (label biaya)", "teras Bu Ratna malam (nota)", "gang (wawancara)", "bazar sore (penutupan)"],
        "hook": "kontras", "variasi": [1, 4], "suara": "Algenib"}
BIAYA = [["Sewa lapak", 75], ["Tenda", 30], ["Listrik", 25], ["Kebersihan", 15], ["Spanduk & dokumentasi", 20]]   # ribu rupiah (rekaan)


def compute():
    biaya = sum(j for _, j in BIAYA); laku, untung, harga, diskon = 100, 2, 5, 11
    laba = laku * untung; potong = laku * harga * diskon // 100; hasil = laba - potong - biaya
    assert biaya == 165 and laba == 200 and potong == 55 and hasil == -20
    return dict(biaya=BIAYA, biaya_tot=biaya, rugi=-hasil, biaya_cues=["Sewa lapak", "Tenda", "Listrik", "Kebersihan", "spanduk dan"],
                nota=[["Laku 100 x untung 2rb", "+200rb", "#2E7D5B"], ["Diskon wajib 11%", "-55rb", "#B5452B"], ["Biaya lapak", "-165rb", "#B5452B"], ["HASIL", "-20rb", "#B5452B"]],
                nota_cues=["seratus bungkus", "sebelas persen", "Biayanya", "rugi dua puluh"],
                iv=dict(who="pkk", name="Bu Ratna", role="Pedagang keripik", q1="“Saya nggak kapok jualan.”", q2="“Besok jualan depan rumah aja.”", q2cue="depan rumah"),
                board=["BAZAR UMKM DESA", "Biaya lapak: 165rb", "Diskon wajib: 11%", "Hasil: rugi 20rb"])


SCENES = [
    dict(id="s1", type="BL_BAZAR", kicker="KALKULATOR WARGA", sub="bazar UMKM desa", say="Bazar UMKM desa, spanduknya besar: *diskon sebelas sebelas*. Pengunjung ramai, foto-foto, harga dicoret. Tapi Bu Ratna, pedagang keripik, pulang membawa hitungan yang bikin *pusing*.", data=[]),
    dict(id="s2", type="BL_BAZAR", variant="biaya", kicker="BIAYA LAPAK", sub="lapak Bu Ratna", say="Ikut bazar ternyata tidak gratis. Sewa lapak tujuh puluh lima ribu. Tenda tiga puluh ribu. Listrik dua puluh lima ribu. Kebersihan lima belas ribu. Lalu iuran spanduk dan dokumentasi, dua puluh ribu. Totalnya *seratus enam puluh lima ribu*, sehari.", data=[]),
    dict(id="s3", type="BL_NOTA", kicker="DIHITUNG", sub="teras Bu Ratna", say="Malamnya, Bu Ratna menghitung. Laku seratus bungkus, untung dua ribu per bungkus: dua ratus ribu. Tapi panitia mewajibkan diskon sebelas persen, potongannya lima puluh lima ribu. Biayanya seratus enam puluh lima. Hasilnya: *rugi dua puluh ribu*.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Bu Ratna", say="Bu Ratna tidak kapok jualan. Tapi bazar berikutnya, katanya, ia jualan di depan rumah saja. *Tanpa spanduk*, tanpa diskon, tanpa rugi.", data=[]),
    dict(id="s5", type="BL_BAZAR", variant="end", kicker="PENUTUPAN", sub="bazar UMKM desa", say="Bazar ditutup dengan foto bersama di depan spanduk diskon. Yang paling untung malam itu bukan pedagang, bukan pembeli, tapi *spanduknya*. Di tempat lo, siapa yang nanggung diskonnya? Tulis di komentar.", data=[]),
]
END_PAD = 3
