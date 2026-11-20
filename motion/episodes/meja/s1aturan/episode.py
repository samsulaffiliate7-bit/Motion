"""Meja Seberang Bos · Season 1 · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md. Narator Bima (Puck).
Rumus season (fiksi): follow = +1 pelanggan tetap, like = +Rp5.000 modal, komen = keputusan rapat."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Bima, Bang Rudi", lokasi="teras warung, udara kampung kota, papan pelanggan, meja kasir, papan rapat, toko Rudi",
            hook="dewan direksinya kalian", variasi="pin", interaksi="follow/like/komen", suara="Puck", season=1, episode=-1)
KURS = dict(follow=1, like=5_000)


def compute():
    assert KURS["like"] == 5_000
    top = "ATURAN MAIN"
    return dict(hud=dict(top=top, pelanggan=0, kas=0), hud3=dict(top=top, pelanggan=1, kas=0), hud4=dict(top=top, pelanggan=1, kas=50_000), kurs_like=KURS["like"])


SCENES = [
    dict(id="r1", type="MA_HOOK", kicker="", sub="", data=["hud"], say="Gue Bima. Kemarin karyawan, hari ini bos warung. Tapi di warung ini, dewan direksinya... *kalian*."),
    dict(id="r2", type="MA_PREMIS", kicker="", sub="", data=["hud"], say="Targetnya: dari satu *meja lipat*, sampai *ratusan cabang*. Tiga puluh episode, satu bulan."),
    dict(id="r3", type="MA_FOLLOW", kicker="", sub="", data=["hud3"], say="Tiap kalian *follow*, nambah satu *pelanggan tetap*. Angkanya gue pasang di papan ini."),
    dict(id="r4", type="MA_LIKE", kicker="", sub="", data=["hud4", "kurs_like"], say="Tiap *like*, modal warung nambah *lima ribu rupiah*. Semua dicatat di buku kas."),
    dict(id="r5", type="MA_KOMEN", kicker="", sub="", data=["hud4"], say="Tiap *komen*, jadi suara rapat. Pilihan paling *rame*, besoknya gue jalanin."),
    dict(id="r6", type="MA_KRISIS", kicker="", sub="", data=["hud4"], say="Tiap akhir pekan ada *krisis*. Dan di ujung gang, *Bang Rudi* udah nunggu."),
    dict(id="r7", type="MA_MULAI", kicker="", sub="", data=["hud4"], say="Mulai dari *Episode Nol*. Tonton berurutan, jangan lompat. Rapat... *ditutup*."),
]
END_PAD = 2.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
