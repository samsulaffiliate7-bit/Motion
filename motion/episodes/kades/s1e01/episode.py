"""Kades Magang Juara · Season 1 · Episode 1 "Sinyal" (tayang 22 Nov 2026). Storyboard: STORYBOARD.md.
Data Ep 0 dibaca satu per satu lewat Repliz 20 Nov ±21:35 dan dicek ulang ±22:30 WIB (docs/data/2026-11-20-ep0.md):
- Follow: TikTok newFollower Ep 0 = 48; YouTube +0 (41 -> 41); IG belum terukur untuk Ep 0 (patokan IG 81 dicatat untuk Ep 2).
- Like: TikTok 82 + IG 136 + YT (belum keluar) = 218 -> dana desa 218 x Rp10.000.
- Komen pilihan (satu akun satu suara): AIR 3, LISTRIK 3, SINYAL 3 + 1 ("turnamen ml, gw jadi adminnya") -> SINYAL menang tipis.
  Usul lain dicatat: listrik dari sungai/angin/matahari (@PL***, TikTok), sekolah, nama "Desa Makmur".
Biaya menara bambu + antena bekas = fiksi permainan (Rp850.000)."""

META = dict(format="serial Season 1", pilar="bangun desa", tokoh="Juara, Mbah Darmo, perantau, anak-anak", lokasi="stasiun, balai, bukit kelapa, desa, bale, desa malam",
            hook="kereta berhenti, 48 pulang", variasi="hasil interaksi", interaksi="komen: SUNGAI / ANGIN / MATAHARI", suara="Iapetus", season=1, episode=1, babak=1)
PREV = dict(hari=0, pulang=0, dana=0)
DATA = dict(follow_tt=48, follow_yt=0, like_tt=82, like_ig=136, like_yt=0, sinyal=4, air=3, listrik=3)
KURS = dict(like=10_000)
BIAYA = dict(menara=850_000)


def compute():
    d = DATA; pulang = PREV["pulang"] + d["follow_tt"] + d["follow_yt"]; like = d["like_tt"] + d["like_ig"] + d["like_yt"]
    dana = PREV["dana"] + like * KURS["like"]; sisa = dana - BIAYA["menara"]
    assert pulang == 48 and like == 218 and dana == 2_180_000 and sisa == 1_330_000 and d["sinyal"] > max(d["air"], d["listrik"])
    rp = lambda x: "Rp" + f"{x:,}".replace(",", ".")
    return dict(hud=dict(items=["HARI 1 / 30", f"🚉 PULANG {pulang}", f"💰 DANA {rp(sisa)}"]), pulang=pulang, dana=dana, sisa=sisa, biaya=BIAYA["menara"],
                dana_rp=rp(dana), sisa_rp=rp(sisa), biaya_rp=rp(BIAYA["menara"]), suara=dict(sinyal=d["sinyal"], air=d["air"], listrik=d["listrik"]),
                komen=[["@4l***", "sinyal bang, turnamen ML kalo gadak sinyal mana bisa 😂"], ["@ma***", "turnamen ML bg, gw jadi adminnya"]])


SCENES = [
    dict(id="s1", type="K1_STASIUN", kicker="", sub="", data=["hud", "pulang"],
         say="Kemarin, kereta cuma lewat. Hari ini... kereta itu *berhenti*. *{pulang|w} perantau* pulang kampung!"),
    dict(id="s2", type="K1_HASIL", kicker="HASIL KOMEN", sub="sinyal menang tipis", data=["hud", "dana", "dana_rp", "komen", "suara"],
         say="Dari like kalian, dana desa jadi *dua juta seratus delapan puluh ribu*. Komen paling rame? *Sinyal*. Alasannya... mau bikin *turnamen ML*."),
    dict(id="s3", type="K1_BUKIT", kicker="", sub="", data=["hud"],
         say="Masalahnya, sinyal di desa ini cuma ada di satu tempat. Kata Mbah Darmo... di *pucuk pohon kelapa*."),
    dict(id="s4", type="K1_MENARA", kicker="", sub="", data=["hud", "biaya_rp"],
         say="Jadi gue bikin *menara bambu*, pasang antena bekas. Habis *delapan ratus lima puluh ribu*. Perantau yang baru pulang, ikut *bantu*."),
    dict(id="s5", type="K1_NYALA", kicker="", sub="", data=["hud"],
         say="Satu bar... dua bar... *empat bar*! HP satu desa bunyi *barengan*."),
    dict(id="s6", type="K1_HARU", kicker="", sub="", data=["hud"],
         say="Dan buat pertama kali dalam tiga tahun, Mbah Darmo *video call* sama anaknya di kota."),
    dict(id="s7", type="K1_GELAP", kicker="", sub="", data=["hud"],
         say="Tapi jam sembilan malam... router-nya *mati*. Desa ini belum punya *listrik*."),
    dict(id="s8", type="K1_AJAK", kicker="", sub="", data=["hud"],
         say="Listriknya dari mana? *Sungai*, *angin*, atau *matahari*? Ini usul warga di komen kemarin. Pilih di komen, yang paling rame gue kerjain besok!"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
