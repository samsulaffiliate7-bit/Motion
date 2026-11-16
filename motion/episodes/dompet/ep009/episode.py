"""Dompet Gue Nangis ep009 (3D, konsep v3): Mesin Waktu "kopi 25 ribu sehari, dihitung 20 tahun".
Cerita fiksi. Kenaikan harga 3%/tahun = ASUMSI ilustrasi (disebut "misalnya" + "asumsi" di narasi).
Sumber pembanding asumsi: sasaran inflasi Indonesia 2024-2025 = 2,5% +-1% (Bank Indonesia, halaman "Sasaran Inflasi", bi.go.id;
ditetapkan pemerintah lewat PMK 101/PMK.010/2021). 3% masih di dalam rentang itu. Lembaga tidak disebut di video.
Tidak menyebut merek kopi, kedai, aplikasi, atau perusahaan nyata."""
META = {"format": "Mesin Waktu", "pilar": "bocor halus", "tokoh": ["Nana", "Nana umur 46"],
        "lokasi": ["kedai kopi pagi", "lorong mesin waktu", "gudang menara gelas", "meja kos (kopi bikin sendiri)", "kota tahun 2046"],
        "hook": "angka spesifik", "variasi": [1, 6]}
PARAMS = dict(harga=25_000, naik=0.03, tahun=20, hari=22, beli_baru=9, bikin=3_000)


def rp(x):
    return "Rp" + f"{int(round(x)):,}".replace(",", ".")


def compute(p=PARAMS):
    f = (1 + p["naik"]) ** p["tahun"]; ann = sum((1 + p["naik"]) ** k for k in range(p["tahun"]))
    nanti = p["harga"] * f; setahun = p["harga"] * p["hari"] * 12; total = setahun * ann
    hemat_bln = (p["hari"] - p["beli_baru"]) * (p["harga"] - p["bikin"]); hemat_tot = hemat_bln * 12 * ann
    assert round(nanti / 1000) == 45 and setahun == 6_600_000 and round(total / 1e6) == 177 and hemat_bln == 286_000 and round(hemat_tot / 1e6) == 92
    prices = [round(p["harga"] * (1 + p["naik"]) ** k / 1000) for k in range(p["tahun"] + 1)]
    return dict(nanti_rb=round(nanti / 1000), nanti_rp=rp(round(nanti / 1000) * 1000), setahun_rp=rp(setahun), total_jt=round(total / 1e6), prices=prices,
                hemat_rp=rp(hemat_bln), hemat_jt=round(hemat_tot / 1e6), beli=p["beli_baru"], bikin_rp=rp(p["bikin"]))


SCENES = [
    dict(id="s1", type="D3_KEDAI", kicker="MESIN WAKTU", sub="kedai kopi, jam 7 pagi", say="Kopi *dua puluh lima ribu* ini, dua puluh tahun lagi harganya bisa *{nanti_rb|w} ribu*. Gue hitung pakai mesin waktu. Ini hitungan gue, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_PORTAL", kicker="MAJU 20 TAHUN", sub="harga naik pelan", say="Misalnya harga naik *tiga persen* setahun. Itu asumsi, kira-kira kenaikan harga yang biasa. Setahun naiknya nggak sampai seribu, nggak kerasa. Tapi dua puluh tahun kemudian, gelas yang sama harganya *{nanti_rb|w} ribu*.", data=["prices"]),
    dict(id="s3", type="D3_CUPTOWER", kicker="TOTALNYA", sub="1 gelas tiap hari kerja", say="Kalau gue beli tiap hari kerja, sebulan dua puluh dua gelas. Setahun *enam koma enam juta*. Dua puluh tahun, dengan harga yang terus naik, totalnya sekitar *{total_jt|w} juta*. Cuma dari kopi.", data=["setahun_rp", "total_jt"]),
    dict(id="s4", type="D3_TUBRUK", kicker="YANG GUE LAKUIN", sub="bukan berhenti ngopi", say="Tapi gue nggak berhenti ngopi. Gue beli cuma *dua kali seminggu*, sisanya bikin sendiri di kos, kira-kira tiga ribu segelas. Selisihnya sekitar *dua ratus delapan puluh enam ribu* sebulan, langsung gue tabung.", data=["hemat_rp", "beli"]),
    dict(id="s5", type="D3_KOTA2046", kicker="TAHUN 2046", sub="Nana umur 46", say="Dua puluh tahun lagi, tabungan dari selisih kopi itu bisa sekitar *{hemat_jt|w} juta*, belum dihitung bunga. Kopinya tetap jalan, dompetnya nggak nangis. Lo ngopi beli berapa kali seminggu? Jujur di komentar.", data=["hemat_jt"]),
]
END_PAD = 1.2
