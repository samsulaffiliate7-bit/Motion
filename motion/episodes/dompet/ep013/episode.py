"""Dompet Gue Nangis ep013 (3D, v3): Mitos vs Fakta "nabung di lemari pasti aman". Tayang 11 Nov 2026.
Cerita fiksi. Kenaikan harga 3%/tahun = ASUMSI ilustrasi (disebut "misalnya", "asumsi").
Pembanding asumsi: sasaran inflasi Indonesia 2024-2025 = 2,5% +-1% (Bank Indonesia, halaman "Sasaran Inflasi", bi.go.id; PMK 101/PMK.010/2021). Lembaga tidak disebut di video.
Tidak menyebut produk investasi, bank, aplikasi, atau perusahaan nyata. Kalimat risiko ada (KONSEP-V3)."""
CONFIG_OVERRIDE = {"tts": {"voice": "Leda"}}
META = {"format": "Mitos vs Fakta", "pilar": "investasi dasar", "tokoh": ["Nana", "ibu"], "suara": "Leda",
        "lokasi": ["kamar ibu (lemari kayu)", "warung nasi siang", "lapangan sore dengan papan skor", "perpustakaan kota"],
        "hook": "angka spesifik", "variasi": [1, 5]}
PARAMS = dict(uang=10_000_000, naik=0.03, tahun=10, nasi=15_000)


def compute(p=PARAMS):
    f = (1 + p["naik"]) ** p["tahun"]; riil = p["uang"] / f; nasi_n = p["nasi"] * f
    assert 7.4e6 < riil < 7.5e6 and round(nasi_n / 1000) == 20
    return dict(riil_jt=f"{riil / 1e6:.1f}".replace(".", ","), riil_w="tujuh koma empat", nasi_n=round(nasi_n / 1000),
                riil_series=[round(p["uang"] / (1 + p["naik"]) ** k / 1e6, 2) for k in range(p["tahun"] + 1)],
                nasi_series=[round(p["nasi"] * (1 + p["naik"]) ** k / 1000, 1) for k in range(p["tahun"] + 1)])


SCENES = [
    dict(id="s1", type="D3_E013_LEMARI", kicker="MITOS VS FAKTA", sub="kamar ibu", say="Ibu gue nyimpen *sepuluh juta* di lemari, katanya paling aman. Uangnya memang nggak ke mana-mana. Tapi sepuluh tahun lagi, nilainya tinggal sekitar *tujuh koma empat juta*. Ini hitungan gue, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E013_WARTEG", kicker="KENAPA?", sub="harga ikut naik", say="Misalnya harga naik *tiga persen* setahun, itu asumsi. Sepiring nasi yang sekarang lima belas ribu, sepuluh tahun lagi sekitar *{nasi_n|w} ribu*. Uangnya tetap sepuluh juta, tapi yang bisa dibeli makin sedikit.", data=["nasi_series", "nasi_n"]),
    dict(id="s3", type="D3_E013_SKOR", kicker="FAKTANYA", sub="daya beli turun", say="Jadi faktanya, nabung di lemari bukan nol risiko. Risikonya pelan dan nggak kelihatan: tiap tahun daya belinya *menyusut*. Setelah sepuluh tahun, sepuluh juta rasanya kayak *tujuh koma empat juta*.", data=["riil_series", "riil_jt"]),
    dict(id="s4", type="D3_E013_PERPUS", kicker="YANG GUE LAKUIN", sub="perpustakaan kota", say="Yang gue lakuin: *dana darurat* tetap di tabungan, karena harus gampang diambil. Sisanya, gue pelajari pelan-pelan cara supaya uangnya bisa *mengejar* kenaikan harga. Inget, nilainya bisa naik turun, pelajari dulu sebelum ikut. Di rumah lo, ada yang masih nyimpen uang di lemari?", data=[]),
]
END_PAD = 1.5
