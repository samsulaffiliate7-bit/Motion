"""Kades Magang Juara · Season 1 · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Juara", lokasi="udara desa, jalan, stasiun, balai, kotak aduan, gapura",
            hook="desa ini kalian yang gerakin", variasi="pin", interaksi="follow/like/komen", suara="Iapetus", season=1, episode=-1)


def compute():
    return dict(hud=dict(items=["ATURAN MAIN", "SEASON 1"]), kurs_like=10_000)


SCENES = [
    dict(id="r1", type="KA_HOOK", kicker="", sub="", data=["hud"], say="Desa ini bukan desa biasa. Yang gerakin desa ini... *kalian*."),
    dict(id="r2", type="KA_PREMIS", kicker="", sub="", data=["hud"], say="Gue Juara, kades magang. Gue punya *tiga puluh hari* buat bikin desa yang ditinggal warganya, hidup lagi. Gagal, gue *dipecat*."),
    dict(id="r3", type="KA_FOLLOW", kicker="", sub="", data=["hud"], say="Tiap kalian *follow*, satu perantau *pulang kampung*, turun di stasiun ini."),
    dict(id="r4", type="KA_LIKE", kicker="", sub="", data=["hud", "kurs_like"], say="Tiap *like*, dana desa nambah *sepuluh ribu rupiah*, buat bangun apa pun yang desa butuhin."),
    dict(id="r5", type="KA_KOMEN", kicker="", sub="", data=["hud"], say="Tiap *komen*, jadi *aduan warga*. Aduan paling rame, besoknya gue kerjain."),
    dict(id="r6", type="KA_MINGGU", kicker="", sub="", data=["hud"], say="Tiap akhir pekan ada *kejadian besar*. Dan tiap pilihan kalian, ada *akibatnya*."),
    dict(id="r7", type="KA_MULAI", kicker="", sub="", data=["hud"], say="Mulai dari *Hari Nol*. Tonton berurutan, dan *jangan lompat episode*."),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
