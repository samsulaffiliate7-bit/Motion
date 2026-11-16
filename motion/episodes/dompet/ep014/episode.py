"""Dompet Gue Nangis ep014 (3D, v3): Mesin Waktu "mi instan 3.500, di masa depan jadi berapa?" (balasan komentar TikTok 10 Nov). Tayang 12 Nov 2026.
Komentar penonton: "kalo Indomie skrng harganya 3.500Rp di masa depan jadi berapa bg (bales pake vt)". Merek TIDAK disebut di video (cukup "mi instan").
Kenaikan harga 3%/tahun = ASUMSI ilustrasi. Pembanding: sasaran inflasi Indonesia 2024-2025 = 2,5% +-1% (Bank Indonesia, "Sasaran Inflasi", bi.go.id; PMK 101/PMK.010/2021). Lembaga tidak disebut."""
CONFIG_OVERRIDE = {"tts": {"voice": "Zephyr"}}
META = {"format": "Mesin Waktu", "pilar": "investasi dasar", "tokoh": ["Nana"], "suara": "Zephyr", "dari_komentar": True,
        "lokasi": ["warung kelontong malam", "lorong rak minimarket lintas waktu", "dapur kos (tumpukan bungkus)", "jembatan penyeberangan malam"],
        "hook": "pertanyaan", "variasi": [1, 5]}
PARAMS = dict(harga=3_500, naik=0.03, uang=100_000)


def compute(p=PARAMS):
    h = {n: p["harga"] * (1 + p["naik"]) ** n for n in (10, 20, 30)}
    assert round(h[10] / 100) == 47 and round(h[20] / 100) == 63 and round(h[30] / 100) == 85
    now_n, f20_n = int(p["uang"] // p["harga"]), int(p["uang"] // h[20])
    assert now_n == 28 and f20_n == 15
    rb = lambda x: f"{round(x / 100) / 10:.1f}".replace(".", ",")
    return dict(h10=rb(h[10]), h20=rb(h[20]), h30=rb(h[30]), now_n=now_n, f20_n=f20_n)


SCENES = [
    dict(id="s1", type="D3_E014_KOMEN", kicker="BALAS KOMENTAR", sub="mesin waktu", say="Ada yang nanya di komentar: mi instan sekarang *tiga ribu lima ratus*, di masa depan jadi berapa? Oke, gue jawab pakai mesin waktu. Ini hitungan gue, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E014_RAK", kicker="MAJU KE DEPAN", sub="harga naik 3% setahun", say="Misalnya harga naik tiga persen setahun, itu asumsi. Sepuluh tahun lagi, sebungkus sekitar *empat ribu tujuh ratus*. Dua puluh tahun lagi, sekitar *enam ribu tiga ratus*. Tiga puluh tahun lagi, hampir *delapan ribu lima ratus*.", data=["h10", "h20", "h30"]),
    dict(id="s3", type="D3_E014_DAPUR", kicker="BEDANYA KERASA DI SINI", sub="uang 100 ribu", say="Biar kerasa: sekarang seratus ribu dapat *dua puluh delapan* bungkus. Dua puluh tahun lagi, uang yang sama cuma dapat *lima belas* bungkus. Mi-nya sama, kenyangnya sama, yang berubah nilai uangnya. Buat anak kos yang tanggal tua andelin mi, ini kerasa banget.", data=["now_n", "f20_n"]),
    dict(id="s4", type="D3_E014_JEMBATAN", kicker="JADI GIMANA?", sub="jembatan, malam", say="Jadi yang harus dikejar bukan harga mi, tapi penghasilan dan tabungan lo yang tumbuh *lebih cepat* dari tiga persen setahun. Kalau tabungan diam di tempat, dia pelan-pelan *menyusut*. Lo makan mi instan seminggu berapa kali? Jujur di komentar.", data=[]),
]
END_PAD = 5.5
