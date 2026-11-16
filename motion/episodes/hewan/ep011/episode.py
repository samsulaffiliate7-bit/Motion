"""Hewan Berdasi Kotor ep011 (3D, konsep v3): 3 tipe hewan saat promo tanggal kembar 11.11; format Hewan di Sekitarmu (daftar bernomor + harga coret).
Fabel fiksi; promo disebut generik, tanpa nama toko/aplikasi. Angka rekaan."""
META = {"format": "Hewan di Sekitarmu", "pilar": "media sosial dan belanja", "tokoh": ["Merak (tamu)", "Beo (tamu)", "Kerbau"],
        "lokasi": ["alun-alun rimba (layar hitung mundur)", "kamar Merak (menara kardus)", "warung kopi malam", "ruang tengah Kerbau", "alun-alun (label coret)"],
        "hook": "pertanyaan", "variasi": [3, 4, 5], "suara": "Puck"}
PARAMS = dict(harga=200, coret=400, diskon=50, paket=14)


def compute(p=PARAMS):
    akhir = p["coret"] * (100 - p["diskon"]) // 100; assert akhir == p["harga"]
    return dict(harga=p["harga"], coret=p["coret"], akhir=akhir, paket=p["paket"])


SCENES = [
    dict(id="s1", type="H_PROMO", kicker="HEWAN DI SEKITARMU", sub="promo 11.11", say="Jam sebelas lewat lima puluh sembilan, malam sebelas sebelas. Seisi rimba menatap layar yang sama. Begitu angkanya jadi *nol nol*, muncul tiga tipe hewan. Lo pasti salah satunya.", data=[]),
    dict(id="s2", type="H_MERAK", kicker="NOMOR SATU", sub="Si Merak", say="Nomor satu: *Si Merak*. Checkout tepat jam dua belas, *empat belas paket* sekaligus. Besoknya, kardusnya difoto, disusun jadi menara. Isinya? Belum tentu dipakai. Yang penting *kelihatan*.", data=[]),
    dict(id="s3", type="H_BEOWARUNG", kicker="NOMOR DUA", sub="Si Beo", say="Nomor dua: *Si Beo*. Tidak butuh apa-apa, tapi semua temannya beli blender. Jadi dia ikut beli. Sampai rumah, ternyata di dapurnya sudah ada *dua blender*, dari promo tahun lalu.", data=[]),
    dict(id="s4", type="H_KERBAU11", kicker="NOMOR TIGA", sub="Si Kerbau", say="Nomor tiga: *Si Kerbau*, paling teliti. Ia cek harga seminggu sebelumnya: dua ratus ribu. Malam promo, harganya dicoret jadi empat ratus, lalu *diskon lima puluh persen*. Hasilnya: tetap dua ratus ribu.", data=[]),
    dict(id="s5", type="H_PROMO", variant="end", kicker="JADI...", sub="siapa yang untung", say="Jadi yang paling untung malam itu bukan pembeli. Tapi angka *coretannya*. Lo tipe yang mana: Merak, Beo, atau Kerbau? Tulis nomornya di komentar.", data=[]),
]
END_PAD = 3
