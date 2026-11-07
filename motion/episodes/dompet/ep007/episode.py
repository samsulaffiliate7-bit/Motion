"""Dompet Gue Nangis ep007 (3D, konsep v3): Mitos vs Fakta "investasi harus nunggu kaya dulu".
Cerita fiksi. Imbal hasil 6%/tahun HANYA asumsi ilustrasi (ditulis "misalnya" + "bukan janji"), dihitung bunga majemuk bulanan.
Tidak menyebut produk, aplikasi, perusahaan, atau lembaga nyata. Disclaimer gaya cerita + kalimat risiko (keputusan pemilik, KONSEP-V3)."""
META = {"format": "Mitos vs Fakta", "pilar": "investasi dasar", "tokoh": ["Nana"],
        "lokasi": ["depan minimarket malam", "balkon pagi", "lintasan lari pagi", "dapur malam (kulkas)"], "hook": "kontras", "variasi": [1, 3]}
PARAMS = dict(per_bulan=100_000, bunga_th=0.06)


def jt(x):
    return f"Rp{x / 1e6:.1f} jt".replace(".", ",")


def compute(p=PARAMS):
    r = p["bunga_th"] / 12
    fv = lambda n: p["per_bulan"] * ((1 + r) ** n - 1) / r
    s10, h10 = p["per_bulan"] * 120, fv(120); hA, hB = fv(28 * 12), fv(18 * 12)
    assert s10 == 12_000_000 and 16.3e6 < h10 < 16.5e6 and 86e6 < hA < 88e6 and 38e6 < hB < 39.5e6
    return dict(setor10=jt(s10), hasil10=jt(h10), hasil10_jt=round(h10 / 1e6), hasilA=jt(hA), hasilB=jt(hB), hA_jt=round(hA / 1e6), hB_jt=round(hB / 1e6),
                steps=[["Mulai kecil", "seratus ribu juga boleh"], ["Otomatis", "langsung pas gajian"], ["Cek dulu", "diawasi lembaga resmi?"]], step_cues=["mulai kecil", "otomatis", "cek dulu"])


SCENES = [
    dict(id="s1", type="D3_MYTH", kicker="MITOS VS FAKTA", sub="soal investasi", say="Katanya, investasi itu buat yang udah kaya. Gue juga dulu mikir gitu. Salah. Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_GROW", kicker="SERATUS RIBU", sub="tiap bulan, 10 tahun", say="Misalnya cuma *seratus ribu* sebulan. Disimpan biasa sepuluh tahun, jadi dua belas juta. Kalau diinvestasikan, dengan contoh hasil *enam persen* setahun, bisa jadi sekitar *{hasil10_jt|w} juta*. Itu asumsi contoh, bukan janji.", data=[]),
    dict(id="s3", type="D3_RACE", kicker="YANG PENTING", sub="kapan mulainya", say="Yang paling ngaruh bukan besar uangnya, tapi *kapan mulainya*. Nana yang mulai umur dua puluh dua, dan Nana yang baru mulai umur tiga puluh dua. Sama-sama seratus ribu sebulan sampai umur lima puluh. Hasilnya, sekitar *{hA_jt|w} juta* lawan *{hB_jt|w} juta*.", data=[]),
    dict(id="s4", type="D3_FRIDGE", kicker="CARA GUE", sub="3 langkah", say="Jadi gue pegang tiga langkah. Satu, *mulai kecil*. Dua, bikin *otomatis* tiap gajian. Tiga, *cek dulu*, diawasi lembaga resmi atau nggak. Inget, nilainya bisa naik turun, pelajari dulu sebelum ikut. Lo udah mulai, atau masih nunggu kaya?", data=["steps", "step_cues"]),
]
END_PAD = 1.5
