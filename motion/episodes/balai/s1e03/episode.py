"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 3 "Dua Kelompok" (tayang 24 Nov 2026). Storyboard: STORYBOARD.md; konsep: docs/konsep/S1-EP3.md.
Episode pertama yang memakai riset vidIQ (docs/riset/balai.md): angka + label EPISODE di detik 0, pilihan cukup A/B, efek suara, 1 sukses + 1 gagal lucu, akhir nyambung ke awal.
Data ditarik lewat Repliz 23 Nov 2026 ±21:00 WIB (hanya Ep 2, yang belum dihitung):
- TikTok Ep 2 (7711232647166577940): 504 view, 15 like, +4 follower.
- IG Ep 2 (18124240343076567): 2.383 view, 93 like; follower 3.992 (patokan Ep 2 = 3.903 -> +89).
- YouTube Ep 2 (-bnhjR1tnBE): 1.352 view, 23 like; subscriber 43 (patokan 40 -> +3).
- FOLLOW = 4 + 89 + 3 = 96 -> penyintas 765 + 96 = 861. LIKE = 15 + 93 + 23 = 131 -> 13 = 7 karung + 6 ikat (gudang 147 karung, 143 bambu).
- Pilihan Ep 2 (komentar, satu akun satu suara; docs/data/2026-11-23-ep2.md): menara panah 6, parit keliling 5, "dua-duanya, bagi 2 kelompok" 3, tembok 1 -> usul penonton dipakai.
- Penonton TikTok menuduh angka like dikarang -> di layar "LIKE GABUNGAN TIKTOK + IG + YOUTUBE" + rincian per platform.
Semua tokoh, tempat, angka = fiksi. Tanpa komentar pertama otomatis."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Sinta, Bu Yati, Pak Kardi, anak pramuka, orang yang kabur",
            lokasi="langit desa (hook), pagar luar + zombie jauh, parit keliling, menara panah sudut, gudang, gerbang malam, POV menara",
            hook="EPISODE 3 · kalian pilih dua-duanya", variasi="POV penjaga menara + loop akhir ke awal", interaksi="A buka gerbang / B tembak panah peringatan",
            sindiran="Pak Kardi jatuh ke parit buatannya sendiri", suara="Charon", season=1, episode=3, babak=1, riset="vidIQ (pertama)")
DATA = dict(like=dict(tt=15, ig=93, yt=23), follow=dict(tt=4, ig=3992 - 3903, yt=43 - 40), vote=dict(menara=6, parit=5, dua=3, tembok=1))
STATE0 = dict(penyintas=765, beras=140, bambu=137)


def compute():
    d, s = DATA, STATE0
    follow = sum(d["follow"].values()); like = sum(d["like"].values()); unit = like // 10; karung, ikat = unit - unit // 2, unit // 2
    assert follow == 96 and like == 131 and unit == 13 and (karung, ikat) == (7, 6)
    assert abs(d["vote"]["menara"] - d["vote"]["parit"]) <= 1 and d["vote"]["dua"] >= 3   # hampir seri + ada usul dua-duanya
    pen = s["penyintas"] + follow; kel = pen // 2
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-3", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, pen=pen, kelA=kel, kelB=pen - kel, lk=d["like"])


SCENES = [
    dict(id="c1", type="B3_HOOK", kicker="", sub="", data=["hud"], sfx=[(0.0, "kentongan", .9)],
         say="Kalian pilih *dua-duanya*. Jadi hari ini, desa kami *dibelah jadi dua kelompok*."),
    dict(id="c2", type="B3_KENAPA", kicker="", sub="", data=["hud", "pen", "follow"],
         say="Buat yang baru gabung: zombie di luar. Desa ini satu-satunya yang *masih berpagar*, makanya semua lari ke sini. Sekarang kami *{pen|w}* orang."),
    dict(id="c3", type="B3_BANGUN", kicker="", sub="", data=["hud", "kelA", "kelB"], sfx=[("gali", "gali", .8), ("memanah", "wus", .9)],
         say="Kelompok A gali *parit keliling*. Kelompok B bangun *menara panah* di tiap sudut. Anak pramuka belajar *memanah*."),
    dict(id="c4", type="B3_LIKE", kicker="", sub="", data=["hud", "like", "unit", "lk"],
         say="Like kalian *{like|w}*, itu gabungan TikTok, IG, sama YouTube. Jadi *{unit|w}* karung beras dan ikat bambu."),
    dict(id="c5", type="B3_LUCU", kicker="", sub="", data=["hud"], sfx=[("jatuh", "byur", 1)],
         say="Paritnya jadi. Yang pertama ngetes? *Pak Kardi*. Jatuh ke parit *buatannya sendiri*."),
    dict(id="c6", type="B3_KETUK", kicker="", sub="", data=["hud"], sfx=[("tok", "ketuk", 1)],
         say="Tengah malam. *Tok, tok, tok.* Orang yang kabur ke hutan bambu... *balik*. Lengannya *dibalut kain*."),
    dict(id="c7", type="B3_AJAK", kicker="", sub="", data=["hud"],
         say="POV: kamu penjaga menara malam ini. A, *buka gerbang*. B, *tembak panah peringatan*. Kali ini *nggak bisa dua-duanya*."),
]
END_PAD = 1.0
TEMPO = 1.05   # 57 -> ~55 dtk (target riset 45-55), tanpa TTS baru
SPLIT_SHIFT = {}
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
