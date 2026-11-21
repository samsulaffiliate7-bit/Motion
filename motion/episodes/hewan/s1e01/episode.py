"""Kerajaan Berdasi (akun Hewan Berdasi Kotor) · Season 1 · Episode 1 "Masuk Lubang" (tayang 22 Nov 2026). Storyboard: STORYBOARD.md.
Data interaksi Ep 0 ditarik ulang lewat Repliz 20 Nov 2026 ±22:20 WIB (patokan: docs/data/2026-11-20-ep0.md):
- TikTok: 533 view, 12 like, 3 komen ("A", "A", "one"), newFollower 3. IG: follower 2 (= patokan, +0), like 1 (data 20 Nov). YouTube: +1 subscriber (file data), 1 komen "B lapor raja".
- FOLLOW = 3 + 0 + 1 = 4 anggota Guild Netizen. LIKE = 12 + 1 = 13 gold; 13 // 10 = +1 XP.
- Pilihan (satu akun satu suara): A masuk lubang 2, B lapor raja 1 -> masuk lubang. Kerajaan: belum ada yang memilih.
- Retensi TikTok Ep 0: 85% di detik 1, 72% di detik 2, 56% di detik 4 -> hook dibuat aksi langsung.
Semua tokoh, kerajaan, angka = fiksi."""

META = dict(format="serial Season 1", pilar="petualangan MMORPG", tokoh="Belang, 4 anggota Guild Netizen, tikus pengawal",
            lokasi="terowongan lumbung, lorong duri ikan, ruang bos, dapur istana", hook="2 lawan 1, kalian nyuruh gue masuk lubang",
            variasi="mini-bos", interaksi="komen: ambil bukti / lapor Prof. Burhan / sembunyi & ngintip + pilih kerajaan",
            sindiran="ikan rakyat dicap dasi raja", suara="Algenib", season=1, episode=1, babak=1)
DATA = dict(tt_like=12, ig_like=1, tt_follow=3, ig_follow=0, yt_follow=1, vote=dict(lubang=2, lapor=1))
STATE0 = dict(lv=1, hp=10, xp=0, gold=0)
DURI, HIT, XP_BOS = 2, 5, 5


def compute():
    d, s = DATA, STATE0
    guild = d["tt_follow"] + d["ig_follow"] + d["yt_follow"]; gold = s["gold"] + d["tt_like"] + d["ig_like"]; xp = s["xp"] + (d["tt_like"] + d["ig_like"]) // 10
    assert guild == 4 and gold == 13 and xp == 1 and d["vote"]["lubang"] > d["vote"]["lapor"]
    hp1 = s["hp"] - DURI; hp2 = hp1 - HIT; xp2 = xp + XP_BOS; assert hp2 == 3 and xp2 < 10
    H = lambda hp, x: dict(nama="BELANG", lv=s["lv"], hp=[hp, s["hp"]], xp=[x, 10], gold=gold)
    return dict(hud=H(s["hp"], xp), hud_duri=H(hp1, xp), hud_bos=H(hp2, xp), hud_menang=H(hp2, xp2), guild=guild, gold=gold, hp2=hp2, xp_bos=XP_BOS)


SCENES = [
    dict(id="h1", type="H1_JATUH", kicker="", sub="", data=["hud"],
         say="Dua lawan satu, kalian nyuruh gue *masuk lubang*. Dan lubangnya... *dalam banget*!"),
    dict(id="h2", type="H1_GUILD", kicker="", sub="", data=["hud", "guild", "gold"],
         say="Untung gue nggak sendirian. *{guild|w}* anggota Guild Netizen ikut turun. Dan like kalian jadi *{gold|w} gold*."),
    dict(id="h3", type="H1_DURI", kicker="", sub="", data=["hud_duri"],
         say="Terowongannya penuh *duri ikan*. Ikan rakyat sekerajaan... tinggal *tulangnya*."),
    dict(id="h4", type="H1_BOS", kicker="", sub="", data=["hud_bos"],
         say="Terus muncul *tikus pengawal*. Level tiga. Gue level satu. Senjata gue... *sendok*."),
    dict(id="h5", type="H1_MENANG", kicker="", sub="", data=["hud_bos", "hud_menang", "hp2", "xp_bos"],
         say="HP gue tinggal *{hp2|w}*. Tapi anggota guild teriak bareng... dan sendok gue kena *titik lemahnya*. *Menang tipis*!"),
    dict(id="h6", type="H1_DAPUR", kicker="", sub="", data=["hud_menang"],
         say="Lubangnya tembus ke *dapur istana*. Dan di sini, ikan rakyat *numpuk*. Semuanya dicap... *dasi raja*."),
    dict(id="h7", type="H1_AJAK", kicker="", sub="", data=["hud_menang"],
         say="Follow buat masuk guild, like buat gold, dan komen kerajaan kalian, belum ada yang milih! Sekarang gue harus: *ambil bukti*, *lapor Prof. Burhan*, atau *sembunyi dan ngintip*?"),
]
END_PAD = 1.2
CONFIG_OVERRIDE = {"style": "rpg", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
