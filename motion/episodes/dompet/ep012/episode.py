"""Dompet Gue Nangis ep012 (3D, v3): Dua Timeline "Raka: motor baru kredit vs motor bekas + nabung selisih". Tayang 11 Nov 2026.
Cerita fiksi, simulasi (bukan polling). Semua angka ILUSTRASI ("misalnya"), tanpa bunga tabungan, tanpa nama dealer/leasing/merek.
Suara cowok untuk Raka: Fenrir (kolam suara Dompet, izin pemilik 8 Nov)."""
CONFIG_OVERRIDE = {"tts": {"voice": "Fenrir"}}
META = {"format": "Dua Timeline", "pilar": "target umur", "tokoh": ["Raka A", "Raka B"], "suara": "Fenrir",
        "lokasi": ["persimpangan jalan pagi", "ruang pamer motor", "garasi rumah", "jalan raya dua lajur (3 tahun)", "warung kopi pinggir jalan senja"],
        "hook": "kontras", "variasi": [1, 4, 5]}
PARAMS = dict(tabungan=12_000_000, dp=4_000_000, cicil=1_100_000, bulan=36, bekas=12_000_000, servis_th=1_500_000)


def jt(x):
    s = f"{x / 1e6:.1f}".replace(".", ","); return s[:-2] if s.endswith(",0") else s


def compute(p=PARAMS):
    a_saldo = p["tabungan"] - p["dp"]; a_bayar = p["dp"] + p["cicil"] * p["bulan"]
    b_setor = p["cicil"] * p["bulan"]; b_servis = p["servis_th"] * 3; b_saldo = p["tabungan"] - p["bekas"] + b_setor - b_servis
    beda = b_saldo - a_saldo
    assert a_saldo == 8_000_000 and a_bayar == 43_600_000 and b_saldo == 35_100_000 and round(beda / 1e6) == 27
    sa = [p["tabungan"] - p["dp"]] * (p["bulan"] + 1); sb = [p["tabungan"] - p["bekas"] + p["cicil"] * m - p["servis_th"] * (m // 12) for m in range(p["bulan"] + 1)]
    assert sb[-1] == b_saldo
    return dict(a_saldo_jt=jt(a_saldo), b_saldo_jt=jt(b_saldo), beda_jt=round(beda / 1e6), a_bayar_jt=jt(a_bayar), cicil_jt=jt(p["cicil"]),
                sa=[round(x / 1e6, 2) for x in sa], sb=[round(x / 1e6, 2) for x in sb])


SCENES = [
    dict(id="s1", type="D3_E012_SIMPANG", kicker="DUA TIMELINE", sub="Raka, umur 26", say="Gaji sama, umur sama, tabungan sama dua belas juta. Tiga tahun lagi, saldo mereka beda *{beda_jt|w} juta*. Bedanya cuma satu: *motor*. Ini hitungan gue, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E012_DEALER", kicker="RAKA A", sub="motor baru", say="Raka A ambil motor baru. Misalnya uang muka empat juta, cicilan *satu koma satu juta* sebulan selama tiga puluh enam bulan. Total yang dia bayar sekitar *empat puluh tiga koma enam juta*. Tabungannya sisa delapan juta, dan nggak nambah lagi.", data=["a_bayar_jt", "cicil_jt"]),
    dict(id="s3", type="D3_E012_GARASI", kicker="RAKA B", sub="motor bekas", say="Raka B beli motor bekas dua belas juta, tunai. Tabungannya langsung *nol*. Tapi tiap bulan dia setor satu koma satu juta, sama persis dengan cicilan Raka A. Motor bekas lebih sering servis, jadi dia sisihkan *satu setengah juta* setahun buat bengkel.", data=[]),
    dict(id="s4", type="D3_E012_LAJUR", kicker="3 TAHUN KEMUDIAN", sub="bulan demi bulan", say="Bulan demi bulan, motornya sama-sama jalan. Tiga tahun kemudian, saldo Raka A tetap *delapan juta*. Saldo Raka B, setelah dipotong biaya servis, *tiga puluh lima koma satu juta*.", data=["sa", "sb", "a_saldo_jt", "b_saldo_jt"]),
    dict(id="s5", type="D3_E012_WARKOP", kicker="PILIH MANA?", sub="warung kopi, senja", say="Motor baru memang lebih nyaman, dan itu sah. Tapi kalau lo lagi ngejar dana darurat atau DP rumah, selisih dua puluh tujuh juta itu nyata. Lo tim *motor baru*, atau tim *bekas plus nabung*? Tulis di komentar.", data=["beda_jt"]),
]
END_PAD = 1.2
