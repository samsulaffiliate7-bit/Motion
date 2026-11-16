"""Dompet Gue Nangis ep008 (3D, konsep v3): Ini yang Gue Lakuin "isi dana darurat mulai dari 200 ribu".
Cerita fiksi. Hitungan murni penjumlahan (tanpa bunga, tanpa imbal hasil), tidak butuh sumber luar.
Patokan dana darurat 6x pengeluaran bulanan untuk lajang adalah patokan umum perencanaan keuangan, disebut "patokan gue", bukan aturan.
Tidak menyebut produk, aplikasi, bank, atau lembaga nyata."""
META = {"format": "Ini yang Gue Lakuin", "pilar": "target umur", "tokoh": ["Nana", "montir"],
        "lokasi": ["bengkel motor malam", "meja kamar kos (tangki target)", "lobi kantor tanggal gajian", "tangga taman sore", "ruang tamu ibu saat Lebaran", "rooftop kos malam"],
        "hook": "kejadian", "variasi": [1, 3, 5]}
PARAMS = dict(keluar=3_000_000, kali=6, awal=200_000, naik=100_000, tiap=3, sisa=150_000, thr=4_500_000, thr_bulan=10)


def rp(x):
    return "Rp" + f"{int(x):,}".replace(",", ".")


def compute(p=PARAMS):
    tgt = p["keluar"] * p["kali"]; c, m, hist = 0, 0, []
    while c < tgt:
        m += 1; base = p["awal"] + p["naik"] * ((m - 1) // p["tiap"])
        c += base + p["sisa"] + (p["thr"] // 2 if m == p["thr_bulan"] else 0); hist.append(c)
    assert tgt == 18_000_000 and m == 23 and c == 18_000_000 and base == 900_000
    return dict(target_rp=rp(tgt), target_jt=tgt // 10**6, bulan=m, akhir_rp=rp(base), hist=[round(h / tgt, 4) for h in hist],
                thr_half=rp(p["thr"] // 2), servis="Rp1.500.000",
                steps=[["Otomatis", "200 ribu, pas gajian"], ["Naik pelan", "+100 ribu tiap 3 bulan"], ["Sisa bulan", "sisa belanja masuk"], ["Uang kaget", "separuh THR masuk"]])


SCENES = [
    dict(id="s1", type="D3_BENGKEL", kicker="MOTOR MOGOK", sub="bengkel, jam 9 malam", say="Motor gue mogok, servisnya *satu setengah juta*. Tabungan gue? *Nol*. Dari situ gue mulai ngisi dana darurat, dari *dua ratus ribu*. Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=["servis"]),
    dict(id="s2", type="D3_TANK", kicker="TARGET GUE", sub="6 kali pengeluaran", say="Pengeluaran gue sebulan tiga juta. Patokan gue, dana darurat itu *enam kali* pengeluaran, jadi targetnya *{target_jt|w} juta*. Kelihatannya jauh banget. Makanya gue pecah jadi empat langkah kecil.", data=["target_rp", "target_jt"]),
    dict(id="s3", type="D3_PAYDAY", kicker="LANGKAH 1", sub="tanggal gajian", say="Langkah satu, *otomatis*. Begitu gaji masuk, dua ratus ribu langsung pindah ke rekening terpisah, sebelum gue sempat jajan. Uang yang nggak kelihatan, nggak kepakai.", data=[]),
    dict(id="s4", type="D3_STAIRS", kicker="LANGKAH 2 & 3", sub="naik pelan-pelan", say="Langkah dua, *naik pelan*. Tiap tiga bulan, setorannya gue tambah seratus ribu, sampai akhirnya jadi sembilan ratus ribu. Langkah tiga, sisa uang belanja akhir bulan, rata-rata seratus lima puluh ribu, ikut masuk.", data=[]),
    dict(id="s5", type="D3_LEBARAN", kicker="LANGKAH 4", sub="uang kaget", say="Langkah empat, *uang kaget*. Pas dapat THR, separuhnya langsung masuk dana darurat. Sisanya baru buat Lebaran. Ibu gue malah bangga.", data=["thr_half"]),
    dict(id="s6", type="D3_ROOFTOP", kicker="HASILNYA", sub="bulan ke-23", say="Hasilnya, di bulan ke *dua puluh tiga*, dana darurat gue penuh, *{target_jt|w} juta*. Bulan lalu motor mogok lagi, dan gue cuma bilang, oke. Dana darurat lo udah berapa bulan pengeluaran? Tulis di komentar.", data=["hist", "bulan", "target_rp"]),
]
END_PAD = 1.2
