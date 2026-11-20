"""Kerajaan Berdasi (akun Hewan Berdasi Kotor) · Season 1 · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Belang, rekrutan guild, bos tikus raksasa", lokasi="benua dari udara, panggung pilih karakter, papan guild, alun-alun, peta, lumbung, gerbang kota",
            hook="kalian yang pegang stik", variasi="pin", interaksi="follow/like/komen", suara="Algenib", season=1, episode=-1)
STATE = dict(gold_demo=120, like_per_xp=10)


def compute():
    s = STATE; assert s["gold_demo"] // s["like_per_xp"] >= 10   # demo: 120 like = 120 gold, 12 XP -> naik ke Lv 2
    return dict(hud=dict(nama="BELANG", lv=1, hp=[10, 10], xp=[0, 10], gold=0), demo=s["gold_demo"], kurs=s["like_per_xp"])


SCENES = [
    dict(id="r1", type="HA_TITLE", kicker="", sub="", data=["hud"], say="Selamat datang di Kerajaan Berdasi. Di game ini, *kalian* yang pegang stiknya."),
    dict(id="r2", type="HA_KARAKTER", kicker="", sub="", data=["hud"], say="Gue Belang. Kucing oren, prajurit *level satu*, satu-satunya yang *nolak pakai dasi*. Senjata gue? *Sendok*."),
    dict(id="r3", type="HA_FOLLOW", kicker="", sub="", data=["hud"], say="Tiap kalian *follow*, kalian masuk *Guild Netizen*, jadi anggota party gue."),
    dict(id="r4", type="HA_LIKE", kicker="", sub="", data=["hud", "demo", "kurs"], say="Tiap *like*, satu *gold*. Tiap *sepuluh like*, *XP* gue naik. Siapa tahu bisa beli senjata... selain sendok."),
    dict(id="r5", type="HA_KOMEN", kicker="", sub="", data=["hud"], say="Tiap *komen*, pilih kerajaan kalian: *Kucing*, *Burung*, *Reptil*, atau *Serigala*. Kalian juga yang nentuin *quest* gue."),
    dict(id="r6", type="HA_BOS", kicker="", sub="", data=["hud"], say="Tiap akhir pekan, ada *bos besar*. Kalah? Ya... *ulang dari checkpoint*."),
    dict(id="r7", type="HA_MULAI", kicker="", sub="", data=["hud"], say="Mulai dari *Episode Nol*. Tonton berurutan, dan jangan *skip cutscene*."),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"style": "rpg", "theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}
