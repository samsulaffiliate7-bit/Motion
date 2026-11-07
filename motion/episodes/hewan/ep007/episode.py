"""Hewan Berdasi Kotor ep007 (3D, konsep v3): pasar subuh, timbangan curang Kucing; format Fabel klasik dengan ending memuaskan.
Fabel fiksi; menyindir perilaku umum, bukan pedagang/pasar/kejadian nyata. Angka rekaan."""
META = {"format": "Fabel klasik", "pilar": "pasar dan dagang", "tokoh": ["Kucing (pedagang)", "Kerbau", "Tikus (pedagang)", "Burung Hantu (petugas pasar)"],
        "lokasi": ["pasar subuh", "dapur Kerbau", "bawah meja kios (close-up)", "meja tera pasar", "pasar subuh seminggu kemudian"], "hook": "angka spesifik", "variasi": [1, 4, 5]}
PARAMS = dict(beli_g=1000, dapat_g=800)


def compute(p=PARAMS):
    kurang = p["beli_g"] - p["dapat_g"]; assert kurang == 200
    return dict(kurang_g=kurang)


SCENES = [
    dict(id="s1", type="H_MARKET", kicker="PASAR SUBUH", sub="kios beras", say="Di pasar subuh, kios beras Kucing paling ramai. Harganya paling murah, timbangannya paling cepat. Kerbau beli *sekilo*, seperti biasa, dua kali seminggu.", data=[]),
    dict(id="s2", type="H_HOME", kicker="SAMPAI RUMAH", sub="dapur Kerbau", say="Sampai rumah, Kerbau iseng menimbang ulang. Delapan ons. Ditimbang lagi, tetap delapan ons. Kurang *dua ons*, tiap kali belanja.", data=[]),
    dict(id="s3", type="H_SCALE", kicker="RAHASIANYA", sub="di bawah meja", say="Rahasianya ada di bawah meja: *magnet kecil* di kaki timbangan. Jarumnya selalu lebih berat dua ons. Murahnya ternyata bukan di harga. Murahnya di *timbangan*.", data=[]),
    dict(id="s4", type="H_TERA", kicker="KERBAU MELAPOR", sub="petugas pasar", say="Kerbau tidak teriak. Ia lapor ke Burung Hantu, petugas pasar. Besok subuhnya, semua timbangan *ditera ulang*. Timbangan Kucing ketahuan, lalu disegel.", data=[]),
    dict(id="s5", type="H_MARKET", variant="end", kicker="SEMINGGU KEMUDIAN", sub="pasar subuh", say="Seminggu kemudian, antrean pindah ke kios Tikus. Harganya sedikit lebih mahal, tapi tulisannya jelas: *timbangan jujur*. Yang dikurangi Kucing cuma dua ons. Yang hilang: *semua pelanggannya*. Pernah ketemu timbangan begini? Cerita di komentar.", data=[]),
]
END_PAD = 2.5
