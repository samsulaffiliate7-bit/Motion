"""Dompet Gue Nangis ep015 (3D, v3): Ini yang Gue Lakuin "Raka: freelance dapat 2 juta, bersihnya segini". Tayang 12 Nov 2026.
Cerita fiksi, semua angka ilustrasi (aritmetika). Tanpa nama platform/aplikasi. Pajak tidak dihitung (tidak memberi angka pajak; disebut sisihkan cadangan).
Suara cowok Raka: Zubenelgenubi (kolam suara Dompet)."""
CONFIG_OVERRIDE = {"tts": {"voice": "Zubenelgenubi"}}
META = {"format": "Ini yang Gue Lakuin", "pilar": "nambah penghasilan", "tokoh": ["Raka"], "suara": "Zubenelgenubi",
        "lokasi": ["kamar kos Raka malam", "kafe kerja siang", "halte bus pagi", "meja Raka (tiga amplop)"], "hook": "angka spesifik", "variasi": [1, 3]}
PARAMS = dict(bayar=2_000_000, potong=0.10, kuota=100_000, kafe=150_000, software=150_000, jam=20, gaji=5_500_000, jam_kantor=176, cadangan=0.20)


def rp(x):
    return "Rp" + f"{int(round(x)):,}".replace(",", ".")


def compute(p=PARAMS):
    pot = p["bayar"] * p["potong"]; bersih = p["bayar"] - pot - p["kuota"] - p["kafe"] - p["software"]
    per_jam = bersih / p["jam"]; kantor = p["gaji"] / p["jam_kantor"]; cad = bersih * p["cadangan"]
    assert pot == 200_000 and bersih == 1_400_000 and per_jam == 70_000 and round(kantor) == 31_250 and cad == 280_000
    return dict(bersih_rp=rp(bersih), pot_rp=rp(pot), per_jam=rp(per_jam), kantor=rp(kantor), cad_rp=rp(cad),
                cuts=[["perantara 10%", rp(pot)], ["kuota internet", rp(p["kuota"])], ["kopi + kafe", rp(p["kafe"])], ["langganan software", rp(p["software"])]])


SCENES = [
    dict(id="s1", type="D3_E015_TRANSFER", kicker="KERJA SAMPINGAN", sub="Raka, jam 11 malam", say="Freelance pertama gue cair: *dua juta*. Rasanya kaya mendadak, langsung kepikiran beli sepatu baru. Tapi pas gue hitung, bersihnya jauh di bawah itu. Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E015_KAFE", kicker="DIPOTONG SATU-SATU", sub="kafe, tempat gue kerja", say="Potongan perantara sepuluh persen, dua ratus ribu. Kuota internet seratus ribu. Kopi dan kafe tempat gue kerja, seratus lima puluh ribu. Langganan software, seratus lima puluh ribu. Sisanya *satu koma empat juta*.", data=["cuts", "bersih_rp"]),
    dict(id="s3", type="D3_E015_HALTE", kicker="HITUNG PER JAM", sub="halte, pagi", say="Kerjaannya makan *dua puluh jam*, termasuk dua kali revisi. Jadi per jamnya *tujuh puluh ribu*. Masih lebih gede dari gaji kantor gue, yang kalau dihitung per jam cuma tiga puluh satu ribu. Oke, layak dilanjut, asal biayanya nggak bocor.", data=["per_jam", "kantor"]),
    dict(id="s4", type="D3_E015_AMPLOP", kicker="YANG GUE LAKUIN", sub="meja kamar", say="Sekarang tiap bayaran masuk, gue catat semua biayanya dulu. Terus *dua puluh persen* gue sisihkan jadi cadangan, karena kerjaan sampingan nggak datang tiap bulan. Sisanya baru boleh dipakai, dan sepatunya tetap kebeli, tapi bulan depan. Lo punya kerjaan sampingan? Bersihnya berapa?", data=["cad_rp"]),
]
END_PAD = 1.5
