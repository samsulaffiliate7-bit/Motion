"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 2 "Karantina" (tayang 23 Nov 2026). Storyboard: STORYBOARD.md; konsep: docs/konsep/S1-EP2.md.
Data ditarik ulang lewat Repliz 22 Nov 2026 ±21:30 WIB (patokan & komentar: docs/data/2026-11-22-ep1.md):
- IG: Aturan 41.431 view / 2.121 like, Ep 1 2.762 view / 159 like; follower 3.903 (patokan 20 Nov 22:00 = 3.242 -> +661).
- TikTok (data 22 Nov 21:00): Aturan 37 like / +17, Ep 1 10 like / +1. YouTube: Aturan 26 like, Ep 1 13 like, subscriber 26 -> 40 = +14.
- FOLLOW = 18 + 661 + 14 = 693 -> penyintas 72 + 693 = 765. LIKE = 2.121 + 159 + 37 + 10 + 26 + 13 = 2.366 -> 236 = 118 karung + 118 ikat.
- Pilihan Ep 1 (komentar dibaca langsung, satu akun satu suara): periksa penyintas 3 (IG, semua usul karantina), cari makan 1 + pagar duri 1, "semua" 1, parit api 1.
- Usulan warga dari komen Aturan Main: parit keliling, pagar bata/batu/baja, panah/bambu runcing, penjaga bergilir + lonceng, karantina, kebun.
Semua tokoh, tempat, angka = fiksi. Tanpa komentar pertama otomatis."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Bu Yati, Sinta, Pak Kardi, ratusan penyintas, kucing, orang yang kabur",
            lokasi="antrean jalan sawah, gerbang, pos periksa + barak karantina, gudang + papan usulan, hutan bambu",
            hook="ratusan antre, satu mungkin sudah tergigit", variasi="antrean ratusan (instanced)", interaksi="komen: parit keliling / tembok bata / menara panah",
            sindiran="usul gigit balik zombie ditolak", suara="Charon", season=1, episode=2, babak=1)
DATA = dict(like=dict(ig=2121 + 159, tt=37 + 10, yt=26 + 13), follow=dict(tt=17 + 1, ig=3903 - 3242, yt=40 - 26), vote=dict(periksa=3, makan=1, duri=1))
STATE0 = dict(penyintas=72, beras=22, bambu=19)


def compute():
    d, s = DATA, STATE0
    follow = sum(d["follow"].values()); like = sum(d["like"].values()); unit = like // 10; karung, ikat = unit - unit // 2, unit // 2
    assert follow == 693 and like == 2366 and unit == 236 and d["vote"]["periksa"] > max(d["vote"]["makan"], d["vote"]["duri"])
    pen = s["penyintas"] + follow
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-2", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, pen0=s["penyintas"], pen=pen)


SCENES = [
    dict(id="c1", type="B2_ANTRE", kicker="", sub="", data=["hud", "pen0", "pen"],
         say="Ratusan orang antre di gerbang kami. Dan satu di antara mereka... mungkin *udah tergigit*."),
    dict(id="c2", type="B2_REKAP", kicker="", sub="", data=["hud", "pen"],
         say="Kemarin kalian pilih: *periksa semua penyintas baru*. Sekarang penyintas kami ada *{pen|w}* orang."),
    dict(id="c3", type="B2_PERIKSA", kicker="", sub="", data=["hud"],
         say="Bu Yati sama Sinta bikin *pos periksa*. Cek lengan, cek leher, pakai senter. Yang ragu masuk *karantina*: satu kamar, satu orang, dijaga."),
    dict(id="c4", type="B2_GUDANG", kicker="", sub="", data=["hud", "like", "unit"],
         say="Like kalian jadi *{unit|w}* karung beras dan ikat bambu. Usulan warga kami tempel semua: parit, lonceng, jaga bergilir, sampai panah."),
    dict(id="c5", type="B2_LUCU", kicker="", sub="", data=["hud"],
         say="Ada juga usul: *gigit balik zombienya*. Ditolak Bu Yati. Pak Kardi ngaku *kapten pedang*... disuruh motong ayam, malah *pingsan*."),
    dict(id="c6", type="B2_KABUR", kicker="", sub="", data=["hud"],
         say="Penyintas yang garuk lengan kemarin? Ternyata cuma *dicakar kucing*. Tapi pas antrean dicek ulang... satu orang *nolak diperiksa*, terus *kabur ke hutan bambu*."),
    dict(id="c7", type="B2_AJAK", kicker="", sub="", data=["hud"],
         say="Follow, like, komen. Sebelum dia balik, kita bangun apa dulu: *parit keliling*, *tembok bata*, atau *menara panah*?"),
]
END_PAD = 1.2
SPLIT_SHIFT = {2: 1}   # "dijaga." ikut adegan pos periksa
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
