"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 5 "Gerbang Ditutup" (tayang 26 Nov 2026). Storyboard: STORYBOARD.md.
PERUBAHAN HOOK (pemilik 26 Nov: Ep 3-4 gagal viral, pengaruh VO detik awal): buka dengan premis ZOMBIE untuk penonton baru seperti Ep 0
("Kalau lo tinggal di desa terakhir... zombie...", "Tau nggak sih..."), angka voting baru di adegan 2. Data pendukung (Repliz 26 Nov ±09:30 WIB):
- Ep 0 TikTok 4.225 view, 75% dari SEARCH (kata "zombie"), tahan detik 10 = 38%; IG 99.211 view. Ep 4 TikTok 244 view (detik 10 = 30%), IG 5.000, YT 1.593; 96% penonton bukan follower.
Data Ep 4 (tayang 25 Nov):
- TikTok 7712075587891760404: 10 like, +0 follower. IG 18119458823126044: 234 like; follower 4.081 -> 4.132 = +51. YouTube tBC1C6OtSKo: 24 like; subscriber 54 -> 74 = +20.
- FOLLOW = 0 + 51 + 20 = 71 -> penyintas 973 + 71 = 1.044. LIKE = 10 + 234 + 24 = 268 -> 26 = 13 karung + 13 ikat (gudang 190 karung, 186 bambu).
- Voting (komentar dibaca langsung, satu akun satu suara): B. tutup semua, perkuat gerbang = IG 28 + TikTok 4 ("B"/"kedua") + YouTube 4 = 36; A. kirim pengintai = 3 (IG); "dua-duanya" 3.
- Usul penonton dipakai: parit lebar + pagar didobel (@ib***), ranjau bambu (@mi***), perbanyak busur panah (@mi***). Peran: pengintai (@fa***), tentara (@rz***), army (@ro***), anak PMR (TikTok RealKitty -> @Re***).
Semua tokoh, tempat, angka = fiksi. Tanpa komentar pertama otomatis."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Pak Kardi, warga, warga dari komen",
            lokasi="bukit utara senja (zombie), gerbang ditutup + palang, pagar dobel + ranjau bambu, bengkel busur, gudang, bukit malam berobor",
            hook="Kalau lo tinggal di desa terakhir... ratusan zombie turun dari bukit", variasi="hook premis + twist ada manusia di antara zombie",
            interaksi="A nyalain semua obor / B matiin semua lampu", sindiran="Pak Kardi ngetes ranjau, celananya nyangkut", suara="Charon", season=1, episode=5, babak=1)
DATA = dict(like=dict(tt=10, ig=234, yt=24), follow=dict(tt=0, ig=4132 - 4081, yt=74 - 54), vote=dict(B=28 + 4 + 4, A=3))
STATE0 = dict(penyintas=973, beras=177, bambu=173)
WARGA = [("PAGAR DOBEL", "@ib***"), ("RANJAU BAMBU", "@mi***"), ("BUSUR PANAH", "@mi***")]


def compute():
    d, s = DATA, STATE0
    follow = sum(d["follow"].values()); like = sum(d["like"].values()); unit = like // 10; karung, ikat = unit - unit // 2, unit // 2
    assert follow == 71 and like == 268 and unit == 26 and (karung, ikat) == (13, 13) and d["vote"]["B"] == 36 > d["vote"]["A"]
    pen = s["penyintas"] + follow
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-5", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, pen=pen, vB=d["vote"]["B"], vA=d["vote"]["A"], lk=d["like"], warga=WARGA)


SCENES = [
    dict(id="c1", type="B5_HOOK", kicker="", sub="", data=["hud"], sfx=[(0.0, "kentongan", .8)],
         say="Kalau lo tinggal di *desa terakhir* yang belum dimakan *zombie*... terus besok malam *ratusan zombie* turun dari bukit. Lo bakal ngapain?"),
    dict(id="c2", type="B5_TUTUP", kicker="", sub="", data=["hud", "vB", "vA"], sfx=[("Nggak", "ketuk", .7)],
         say="Tau nggak sih, warga gue udah milih: *tutup semua gerbang*. Tiga puluh enam lawan tiga. Nggak ada yang keluar, nggak ada yang masuk."),
    dict(id="c3", type="B5_BENTENG", kicker="", sub="", data=["hud", "warga"], sfx=[("ranjau", "tancap", .8)],
         say="Usul kalian kami kerjain semua: *pagar didobel*, *ranjau bambu* di luar parit, sama *busur panah* dibikin banyak."),
    dict(id="c4", type="B5_ANGKA", kicker="", sub="", data=["hud", "follow", "like", "unit", "lk", "pen"],
         say="Follow kalian nambah *{follow|w}* penyintas. Like gabungan TikTok, IG, sama YouTube jadi *{unit|w}* karung dan ikat bambu."),
    dict(id="c5", type="B5_LUCU", kicker="", sub="", data=["hud"], sfx=[("nyangkut", "tancap", 1)],
         say="Pak Kardi ngetes ranjaunya sendiri. Katanya *aman*... sampai celananya *nyangkut*."),
    dict(id="c6", type="B5_OBOR", kicker="", sub="", data=["hud"], sfx=[("manusia", "kentongan", .6)],
         say="Malamnya, di bukit utara ada *cahaya obor*. Padahal zombie nggak bawa obor. Berarti... *ada manusia* di antara mereka."),
    dict(id="c7", type="B5_AJAK", kicker="", sub="", data=["hud"],
         say="Besok malam mereka datang. A, *nyalain semua obor*. B, *matiin semua lampu*, sembunyi. Kalau lo warga sini, *pilih yang mana*?"),
]
END_PAD = 1.0
TEMPO = 1.04   # 57,2 -> ~55 dtk, tanpa TTS baru
SPLIT_SHIFT = {}
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
