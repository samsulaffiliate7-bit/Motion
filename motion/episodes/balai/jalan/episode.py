"""Balai Desa Bocor (konsep v3, Jejak Anggaran): dana jalan desa turun lewat banyak meja, yang sampai tinggal sedikit.
Cerita fiksi: desa, tokoh, angka, dan pos potongan semuanya rekaan. Tidak menyebut orang, partai, instansi, atau daerah nyata."""
META = {"format": "Jejak Anggaran", "pilar": "anggaran bocor halus", "tokoh": ["Pak Darto (warga)", "Pak Kades Janji", "Pak RT"],
        "lokasi": ["jalan desa", "lorong meja-meja", "papan tulis balai", "gang warga (wawancara)", "panggung sosialisasi", "jalan desa dari atas"],
        "hook": "angka spesifik", "variasi": [1, 2, 5]}
PARAMS = dict(dana=500, rencana_m=1000,
              potong=[["Administrasi", 25], ["Koordinasi", 40], ["Sosialisasi di hotel", 60], ["Konsumsi rapat", 35], ["Spanduk & dokumentasi", 30], ["Jasa konsultan", 90]])


def compute(p=PARAMS):
    total = sum(j for _, j in p["potong"]); sisa = p["dana"] - total; jalan_m = p["rencana_m"] * sisa // p["dana"]
    assert total == 280 and sisa == 220 and jalan_m == 440 and all(j / p["dana"] < .2 for _, j in p["potong"])   # tiap meja "cuma sedikit"
    return dict(dana=p["dana"], potong=p["potong"], total_potong=total, sisa=sisa, jalan_m=jalan_m, aspal_unit=40 * jalan_m / p["rencana_m"],
                potong_cues=["administrasi", "koordinasi", "sosialisasi", "konsumsi", "spanduk", "konsultan"],
                board=["PAPAN PROYEK", "Pengaspalan Jalan Desa", "Panjang: 1 km", "Anggaran: Rp500 juta"],
                iv=dict(who="bapak", name="Pak Darto", role="Warga RT 03", q1="“Aspalnya mulus sekali… sampai depan baliho.”", q2="“Habis itu, tanah lagi.”", q2cue="kembali ke tanah"),
                janji="“TAHUN DEPAN DILANJUT”", janji_cue="tahun depan")


SCENES = [
    dict(id="s1", type="BL_ROAD", variant="hook", kicker="LIPUTAN WARGA", sub="jalan desa", say="Warga Desa Bocor Indah dapat kabar baik: jalan desa sepanjang *satu kilometer* akan diaspal. Dananya *{dana|w} juta*. Yang jadi, *{jalan_m|w} meter*. Kami telusuri, ke mana sisanya.", data=[]),
    dict(id="s2", type="BL_RELAY", kicker="JEJAK ANGGARAN", sub="dari meja ke meja", say="Dana berangkat utuh, {dana|w} juta. Meja pertama, biaya *administrasi*. Meja kedua, *koordinasi*. Meja ketiga, *sosialisasi*, di hotel. Lalu *konsumsi* rapat, *spanduk* dan dokumentasi, dan terakhir, jasa *konsultan*.", data=[]),
    dict(id="s3", type="BL_TALLY", kicker="DIHITUNG WARGA", sub="papan balai", say="Kalau dijumlah, potongannya *{total_potong|w} juta*. Yang sampai ke jalan, *{sisa|w} juta*. Tidak ada satu meja pun yang mengambil banyak. Semuanya cuma *sedikit-sedikit*.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Pak Darto", say="Menurut Pak Darto, warga RT tiga, aspalnya mulus sekali. Mulus sampai depan *baliho peresmian*. Setelah itu, kembali ke tanah. Kalau hujan, kembali ke *lumpur*.", data=[]),
    dict(id="s5", type="BL_PODIUM", kicker="PENJELASAN", sub="Pak Kades Janji", say="Pak Kades Janji menyampaikan, sisa jalan akan dilanjutkan *tahun depan*. Lewat jalur yang sama. Dan meja-meja yang sama.", data=[]),
    dict(id="s6", type="BL_ROAD", variant="end", kicker="DARI ATAS", sub="jalan desa", say="Dari atas, garis aspalnya terlihat jelas: berhenti tepat di depan baliho. Di daerah lo, jalan mulusnya berhenti di mana? Tulis di komentar.", data=[]),
]
END_PAD = 1.5
