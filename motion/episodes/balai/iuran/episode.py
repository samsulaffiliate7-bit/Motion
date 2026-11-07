"""Balai Desa Bocor (konsep v3, Kalkulator Warga): semua iuran setahun dijumlah, layanan tidak berubah.
Cerita fiksi: desa, gang, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Kalkulator Warga", "pilar": "iuran dan pungutan", "tokoh": ["Bu Sari (warga)", "petugas iuran", "warga"],
        "lokasi": ["teras senja (kuitansi)", "gang siang (pintu ke pintu)", "dapur malam (kalkulator)", "tempat sampah gang + pos ronda", "gang (wawancara)"],
        "hook": "kontras", "variasi": [1, 3, 5]}
# iuran per tahun dalam ribu rupiah (rekaan); True = iuran baru/naik tahun ini
IURAN = [["Sampah", 2 * 20 + 10 * 35, True], ["Keamanan", 6 * 25 + 6 * 40, True], ["Kas RT", 12 * 10, False], ["Tujuh belasan", 50, False],
         ["Gapura baru", 150, True], ["Lomba desa", 50, True], ["Tenda peresmian", 40, True]]


def compute():
    total = sum(j for _, j, _ in IURAN); naik = sum(1 for *_, n in IURAN if n)
    assert total == 1190 and naik == 5
    return dict(total=total, naik=naik, total_rp=total * 1000,
                rinci=[[n, j] for n, j, _ in IURAN], rinci_cues=["sampah", "keamanan", "kas RT", "tujuh belasan", "gapura,", "lomba,", "tenda\\."],
                tagih=[["MAR", "sampah naik", "35rb/bln"], ["JUN", "gapura baru", "150rb"], ["JUL", "keamanan naik", "40rb/bln"], ["AGU", "lomba desa", "50rb"], ["SEP", "tenda peresmian", "40rb"]],
                tagih_cues=["Maret", "gapura baru", "keamanan naik", "lomba desa", "tenda peresmian"],
                iv=dict(who="pkk", name="Bu Sari", role="Warga Gang Kenari", q1="“Saya cuma jumlahin kuitansi.”", q2="“Uangnya ke mana?”", q2cue="uangnya ke mana",
                        qend="Iuran apa di tempat lo yang naik,<br><span style=\"color:#B5452B\">tapi layanannya sama aja?</span>", qend_cue="Di tempat lo"),
                board=["HITUNGAN WARGA", "Iuran setahun / rumah", "Rp1.190.000", "Uangnya ke mana?"])


SCENES = [
    dict(id="s1", type="BL_RECEIPTS", kicker="KALKULATOR WARGA", sub="Gang Kenari", say="Gaji Bu Sari tahun ini tidak naik. Tapi iurannya naik *{naik|w} kali*. Malam ini, semua kuitansi setahun ia kumpulkan di satu meja, lalu dijumlah. Hasilnya bikin satu gang *diam*.", data=[]),
    dict(id="s2", type="BL_DOORBELL", kicker="SETAHUN TERAKHIR", sub="pintu ke pintu", say="Maret, iuran sampah naik jadi tiga puluh lima ribu. Juni, ada iuran *gapura baru*. Juli, iuran keamanan naik. Agustus, iuran lomba desa bersih. September, iuran *tenda peresmian*, untuk gapura tadi. Semuanya ditagih dari pintu ke pintu, dengan senyum.", data=[]),
    dict(id="s3", type="BL_CALC", kicker="DIJUMLAH", sub="meja dapur Bu Sari", say="Bu Sari menekan kalkulator satu per satu. Iuran sampah, keamanan, kas RT, tujuh belasan, gapura, lomba, tenda. Totalnya setahun: *{total_rp|w} rupiah*. Untuk satu rumah.", data=[]),
    dict(id="s4", type="BL_TRASH", kicker="LAYANANNYA?", sub="tempat sampah gang", say="Lalu warga mengecek layanannya. Sampah tetap diangkut *seminggu sekali*, sama seperti tahun lalu. Pos ronda tetap kosong. Iurannya naik lima kali. Layanannya naik *nol kali*.", data=[]),
    dict(id="s5", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Bu Sari, Gang Kenari", say="Bu Sari tidak marah. Ia cuma menempel hasil hitungannya di papan gang, dengan satu pertanyaan: *uangnya ke mana?* Di tempat lo, iuran apa yang naik tapi layanannya sama aja? Tulis di komentar.", data=[]),
]
END_PAD = 2.5
