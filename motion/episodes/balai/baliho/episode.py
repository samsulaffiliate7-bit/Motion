"""Balai Desa Bocor (konsep v3, Dulu vs Menjelang Pemilihan): permintaan timbangan bayi 4 tahun tak dikabulkan, sebulan sebelum pemilihan datang beras 5 kg + baliho 5 m.
Cerita fiksi: desa, tokoh, calon, dan angka rekaan. Tidak menyebut orang, partai, instansi, atau daerah nyata."""
META = {"format": "Dulu vs Menjelang Pemilihan", "pilar": "gercep menjelang pemilihan", "tokoh": ["Bu Ketua PKK (kader posyandu)", "warga", "pemuda"],
        "lokasi": ["gang pagi (truk + baliho)", "posyandu bawah pohon mangga (dulu)", "lapangan sore (neraca raksasa)", "gang (wawancara)", "posyandu (bulan berikutnya)"],
        "hook": "kontras", "variasi": [1, 4, 5], "suara": "Charon"}
PARAMS = dict(rumah=120, beras_kg=5, harga_beras=14, titik=12, harga_baliho=1200, harga_timbangan=600, baliho_m=5, tahun=4)   # harga dalam ribu rupiah (rekaan)


def compute(p=PARAMS):
    beras = p["rumah"] * p["beras_kg"] * p["harga_beras"]; bal = p["titik"] * p["harga_baliho"]
    assert beras == 8400 and bal == 14400 and bal > beras and p["harga_baliho"] // p["harga_timbangan"] == 2
    return dict(rumah=p["rumah"], beras_kg=p["beras_kg"], baliho_m=p["baliho_m"], titik=p["titik"], beras_txt="Rp8,4 jt", baliho_txt="Rp14,4 jt",
                dulu=[["Tahun 1", "anggaran belum ada"], ["Tahun 2", "masih diusulkan"], ["Tahun 3", "sabar ya"], ["Tahun 4", "sabar ya"]],
                dulu_cues=["Tahun pertama", "Tahun kedua", "Tahun ketiga", "keempat"],
                iv=dict(who="pkk", name="Bu Ketua PKK", role="Kader Posyandu", q1="“Kami cuma minta timbangan bayi.”", q2="“Satu baliho = dua timbangan.”", q2cue="dua timbangan"),
                board=["BANTUAN WARGA", "Beras 5 kg / rumah", "Baliho: 12 titik", "Timbangan bayi: belum"])


SCENES = [
    dict(id="s1", type="BL_BALIHO", kicker="MENJELANG PEMILIHAN", sub="Desa Bocor Indah", say="Berasnya *lima kilo*. Balihonya *lima meter*. Bantuan ini datang ke {rumah|w} rumah, sebulan sebelum pemilihan kepala desa. Truknya datang pagi. Balihonya dipasang duluan, berasnya *dibagi belakangan*.", data=[]),
    dict(id="s2", type="BL_POSYANDU", kicker="DULU", sub="posyandu, empat tahun", say="Empat tahun sebelumnya, kader posyandu cuma minta satu barang: *timbangan bayi*. Tahun pertama, anggaran belum ada. Tahun kedua, masih diusulkan. Tahun ketiga dan keempat: *sabar ya*. Bayi-bayi tetap ditimbang pakai timbangan gantung pinjaman, di bawah pohon mangga.", data=[]),
    dict(id="s3", type="BL_SCALEB", kicker="DITIMBANG WARGA", sub="hitungan iseng", say="Warga iseng menghitung. Beras {rumah|w} rumah, masing-masing lima kilo: sekitar *delapan koma empat juta*. Baliho {titik|w} titik: *empat belas koma empat juta*. Yang paling berat ternyata bukan bantuannya. Tapi *balihonya*.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="kader posyandu", say="Bu Ketua PKK cuma senyum. Harga satu baliho, katanya, cukup untuk beli *dua timbangan bayi*. Yang diminta empat tahun, kalah sama yang dipasang *semalam*.", data=[]),
    dict(id="s5", type="BL_POSYANDU", variant="end", kicker="BULAN BERIKUTNYA", sub="posyandu", say="Bulan berikutnya, posyandu buka seperti biasa. Bayi masih ditimbang di pohon mangga yang sama, pakai timbangan pinjaman yang sama. Bedanya, sekarang pohonnya *ada balihonya*. Di tempat lo, bantuan datangnya kapan? Tulis di komentar.", data=[]),
]
END_PAD = 2.5
