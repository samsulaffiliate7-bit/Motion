"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 0 "Hari ke-0" (konsep baru 19 Nov 2026, docs/KONSEP-S1.md bag. 5).
Storyboard: STORYBOARD.md. Semua tokoh, tempat, angka = fiksi. Rumus interaksi: follow = 1 penyintas, 10 like = 1 karung beras / 1 ikat bambu."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Bu Yati, Pak Kardi, Sinta, Pak Kades (kabur)",
            lokasi="menara kentongan, udara desa, jalan gerbang, balai (spanduk), posko, sawah berkabut, gerbang bambu",
            hook="desa tempat bertahan terakhir, malam ini mereka datang", variasi="episode 0", interaksi="komen: gerobak / jerami / balai",
            sindiran="kades kabur pakai motor dinas; bantuan kota cuma spanduk", suara="Charon", season=1, episode=0, babak=1)
STATE = dict(hari=0, penyintas=37, beras=3, bambu=0, zombie_terlihat=20)
KURS = dict(follow="1 penyintas", like_per_karung=10)


def compute():
    s = STATE; assert s["penyintas"] == 37 and s["hari"] == 0
    return dict(hud=dict(judul="DESA TERAKHIR", hari=f"HARI KE-{s['hari']}", items=[f"🧍 {s['penyintas']} PENYINTAS", f"🌾 {s['beras']} KARUNG", "🎋 0 BAMBU"]),
                penyintas=s["penyintas"], zombie=s["zombie_terlihat"], kurs=KURS["like_per_karung"])


SCENES = [
    dict(id="e1", type="B0_KENTONGAN", kicker="", sub="", data=["hud"],
         say="Wabah zombie ada di mana-mana. Desa gue jadi *tempat bertahan terakhir*. Dan malam ini... *mereka datang*."),
    dict(id="e2", type="B0_UDARA", kicker="", sub="", data=["hud", "penyintas"],
         say="Gue Gilang, ketua karang taruna. Di sini ada ratusan rumah, tapi warganya tinggal *{penyintas|w}* orang. Satu pagar bambu. Dan *nol* rencana."),
    dict(id="e3", type="B0_KABUR", kicker="", sub="", data=["hud"],
         say="Harusnya yang mimpin itu Pak Kades. Tapi beliau udah *kabur duluan*... pakai *motor dinas*. Yang ditinggal cuma spanduk: *bantuan kota segera datang*."),
    dict(id="e4", type="B0_TIM", kicker="", sub="", data=["hud"],
         say="Jadi tinggal kami. *Bu Yati*, bidan desa, paling tenang. *Pak Kardi*, mantan hansip, ngakunya berani. Dan *Sinta*, adik gue, dua belas tahun, paling pinter di antara kami."),
    dict(id="e5", type="B0_SAWAH", kicker="", sub="", data=["hud", "zombie"],
         say="Sore ini, Sinta lihat sesuatu di ujung sawah. Jalannya pelan, miring-miring... dan jumlahnya *makin banyak*."),
    dict(id="e6", type="B0_GERBANG", kicker="", sub="", data=["hud"],
         say="Gue lari buat nutup gerbang. Tapi engselnya... *karatan*. Gerbangnya *nggak bisa ditutup*."),
    dict(id="e7", type="B0_AJAK", kicker="", sub="", data=["hud", "kurs"],
         say="Kalian bisa bantu. *Follow*, satu penyintas datang. *Like*, gudang keisi. *Komen*, rencana kita malam ini. Gerbangnya macet. *Ganjal pakai gerobak*, *bakar jerami*, atau *semua naik ke balai*?"),
]
END_PAD = 1.0
TEMPO = 1.07   # naskah 78 dtk -> masuk batas 75 dtk (KONSEP-S1)
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
