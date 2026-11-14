"""Balai Desa Bocor (konsep v3, Wawancara Jalanan): surat keterangan 14 hari, atau 2 jam lewat "uang kopi"; jalur jujur malah lebih mahal.
Cerita fiksi: desa, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Wawancara Jalanan", "pilar": "pelayanan", "tokoh": ["Bu Ratna (pedagang)", "Dimas (pemuda)", "Pak Darto (warga)", "petugas loket"],
        "lokasi": ["loket kantor desa", "pasar (wawancara)", "warung (wawancara)", "pos ronda malam (wawancara)", "loket (besoknya)"],
        "hook": "kontras", "variasi": [1, 4, 5], "suara": "Achird"}
PARAMS = dict(hari=14, bolak=5, ojek=10, kopi=50)   # ribu rupiah (rekaan)


def compute(p=PARAMS):
    ongkos = p["bolak"] * 2 * p["ojek"]; assert ongkos == 100 and ongkos == 2 * p["kopi"]
    return dict(hari=p["hari"], bolak=p["bolak"], ongkos=ongkos, kopi=p["kopi"],
                ivs={"pasar": dict(who="pkk", name="Bu Ratna", role="Pedagang sayur", q="“Lima kali bolak-balik. Ojeknya seratus ribu.”", num="🛵 5x PP = Rp100.000", num_cue="Ongkosnya"),
                     "warung": dict(who="pemuda", name="Dimas", role="Karang Taruna", q="“Titip amplop pagi, siang suratnya jadi.”", num="☕ “uang kopi” Rp50.000", num_cue="lima puluh ribu", side=.3),
                     "ronda": dict(who="bapak", name="Pak Darto", role="Warga, pos ronda", q="“Yang jujur bayar dua kali lipat.”", num="jujur Rp100rb vs kopi Rp50rb", num_cue="Jalur kopi", point=True)})


SCENES = [
    dict(id="s1", type="BL_LOKET", kicker="WAWANCARA JALANAN", sub="loket kantor desa", say="Di kantor desa, papan pengumumannya jelas: surat keterangan selesai *{hari|w} hari kerja*. Tapi di antrean, warga punya rumus sendiri. Dua minggu, atau *dua jam*, tergantung ada *kopinya* atau tidak.", data=[]),
    dict(id="s2", type="BL_STREETIV", variant="pasar", kicker="KATA WARGA", sub="pasar desa", say="Bu Ratna, pedagang sayur, butuh surat untuk pinjaman modal. Ia bolak-balik *{bolak|w} kali*, naik ojek pulang pergi. Ongkosnya *{ongkos|w} ribu*. Suratnya baru jadi di hari keempat belas.", data=[]),
    dict(id="s3", type="BL_STREETIV", variant="warung", kicker="KATA WARGA", sub="warung kopi", say="Dimas, pemuda karang taruna, mengurus surat yang sama minggu lalu. Datang pagi, titip amplop *{kopi|w} ribu*, katanya untuk uang kopi. Siangnya, surat sudah di tangan.", data=[]),
    dict(id="s4", type="BL_STREETIV", variant="ronda", kicker="KATA WARGA", sub="pos ronda, malam", say="Pak Darto menghitung di pos ronda. Jalur jujur: *seratus ribu* ongkos ojek, ditambah empat belas hari. Jalur kopi: lima puluh ribu, dua jam. Yang jujur ternyata bayar *dua kali lipat*.", data=[]),
    dict(id="s5", type="BL_LOKET", variant="end", kicker="BESOKNYA", sub="loket kantor desa", say="Besoknya, di loket ditempel satu kertas kecil: *pelayanan gratis*. Di bawahnya, ada gelas kopi kosong. Di tempat lo, jalur cepatnya lewat mana? Tulis di komentar.", data=[]),
]
END_PAD = 2.5
