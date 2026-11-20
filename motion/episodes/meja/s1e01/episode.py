"""Meja Seberang Bos · Season 1 "Dari Warung Lipat" · Episode 1 "Kopi Sachet" (tayang 22 Nov 2026).
Storyboard: STORYBOARD.md. Narator Bima (suara Puck, model flash).

Data interaksi Ep 0 (ditarik ulang lewat Repliz 20 Nov 2026 ±21:45 WIB, dibaca satu per satu):
- TikTok 7710217316516072711: 37 view, 1 like, 0 komen, newFollower 0.
- IG 18128876512879364: 1.371 view, 37 like, 0 komen. IG follower 3 = patokan 20 Nov 22:00 (selisih 0).
- YouTube HqAMoaRWYlY: 1.163 view, 20 like, 1 komen "Kopi sashet kak" -> KOPI SACHET 1, telur 0, es batu 0. Subscriber dari Ep 0 = +3 (docs/data/2026-11-20-ep0.md).
- Like total 1 + 37 + 20 = 58 -> Rp5.000/like = Rp290.000 modal. Follow 0 (TT) + 3 (YT) + 0 (IG) = 3 pelanggan tetap.

Sumber angka (kisaran harga 2025-2026, tanpa merek):
- Kopi sachet instan renceng isi 10 di grosir: ±Rp12.000-15.000 -> Rp13.000/renceng (pantauan harga grosir daring 2025).
- Kopi seduh sachet di warung: ±Rp3.000-5.000/gelas -> Rp4.000.
- Termos air panas bekas (pasar loak/daring): ±Rp30.000-50.000 -> Rp35.000. Gelas plastik + pengaduk 1 pak: ±Rp10.000-15.000 -> Rp13.000.
- Utang Mak Ijah Ep 0 Rp7.000 + 2 gelas kopi.
"""

META = dict(format="serial Season 1", pilar="bangun usaha dari nol", tokoh="Bima, Mak Ijah, Bang Rudi, kucing, ojol, tukang", lokasi="ujung gang toko Rudi, teras rapat, lapak grosir, warung ramai ojol",
            hook="hari kedua, saingan main kotor (flash-forward)", variasi="episode 1", interaksi="komen: kopi susu kekinian / bonus gorengan / datengin Bang Rudi", suara="Puck", season=1, episode=1, babak=1)
KAS_EP0 = 35_000
UTANG_EP0 = 7_000
EP0 = dict(like=dict(tiktok=1, ig=37, youtube=20), follow=dict(tiktok=0, youtube=3, ig=0), vote=dict(kopi=1, telur=0, es=0))
KURS_LIKE = 5_000
BELANJA = dict(renceng=4 * 13_000, gelas=13_000, termos=35_000)
JUAL = dict(harga=4_000, gelas=32)


def compute():
    like = sum(EP0["like"].values()); follow = sum(EP0["follow"].values()); modal = like * KURS_LIKE
    kas1 = KAS_EP0 + modal; belanja = sum(BELANJA.values()); kas2 = kas1 - belanja; omzet = JUAL["harga"] * JUAL["gelas"]; kas3 = kas2 + omzet
    utang = UTANG_EP0 + 2 * JUAL["harga"]
    assert max(EP0["vote"], key=EP0["vote"].get) == "kopi"
    assert like == 58 and modal == 290_000 and follow == 3 and kas1 == 325_000 and belanja == 100_000 and kas2 == 225_000 and omzet == 128_000 and kas3 == 353_000 and utang == 15_000
    assert JUAL["gelas"] <= 4 * 10   # 4 renceng x 10 sachet
    top = "EP 1 · HARI 2"; H = lambda p, k: dict(top=top, pelanggan=p, kas=k)
    return dict(hud=H(0, KAS_EP0), hud3=H(follow, kas1), hud4=H(follow, kas2), hud5=H(follow, kas3), like=like, modal=modal, follow=follow, kas1=kas1,
                belanja=belanja, rincian=BELANJA, gelas=JUAL["gelas"], harga=JUAL["harga"], omzet=omzet, utang0=UTANG_EP0, utang=utang, kurs_like=KURS_LIKE)


SCENES = [
    dict(id="s1", type="M1_HOOK", kicker="", sub="", data=["hud"],
         say="Hari kedua jadi bos, saingan gue langsung *main kotor*. Tapi mundur dulu... ke tadi *pagi*."),
    dict(id="s2", type="M1_RAPAT", kicker="", sub="", data=["hud"],
         say="Rapat direksi. Komen yang masuk cuma satu, pilihannya *kopi sachet*. Hasil voting: satu banding nol. *Sah*."),
    dict(id="s3", type="M1_MODAL", kicker="", sub="", data=["hud3", "like", "modal", "follow", "kas1"],
         say="*{like|w}* like masuk, modal nambah *{modal|w}*. *{follow|w}* follow, jadi *{follow|w}* pelanggan tetap. Kas gue sekarang *{kas1|w}*."),
    dict(id="s4", type="M1_BELANJA", kicker="", sub="", data=["hud4", "rincian", "belanja"],
         say="Belanja: empat renceng kopi, gelas plastik, sama termos bekas yang tutupnya agak *seret*. Total *seratus ribu*."),
    dict(id="s5", type="M1_LAKU", kicker="", sub="", data=["hud5", "gelas"],
         say="Jam enam, ojol pada mampir. Jam sembilan, tukang bangunan sebelah *borong*. Tiga puluh dua gelas... *ludes*."),
    dict(id="s6", type="M1_IJAH", kicker="", sub="", data=["hud5", "utang0", "utang"],
         say="Pelanggan tetap nomor satu, tetap *Mak Ijah*. Ngopi dua gelas... *masuk utang* lagi."),
    dict(id="s7", type="M1_RUDI", kicker="", sub="", data=["hud5"],
         say="Sorenya, Bang Rudi pasang spanduk baru. *Kopi gratis*. Pakai *es*."),
    dict(id="s8", type="M1_AJAK", kicker="", sub="", data=["hud5", "kurs_like"],
         say="*Follow*, jadi pelanggan tetap. *Like*, modal nambah lima ribu. *Komen*: gue lawan pakai apa? *Kopi susu kekinian*, *bonus gorengan*, atau *datengin Bang Rudi*?"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
