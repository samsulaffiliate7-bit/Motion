"""Kades Magang Juara · Season 1 · Episode 2 "Matahari" (tayang 23 Nov 2026). Storyboard: STORYBOARD.md. Konsep: docs/konsep/S1-EP2.md.
DATA ditarik ulang lewat Repliz 22 Nov 2026 ±21:40 WIB (patokan & komen: docs/data/2026-11-22-ep1.md):
- Follow: TikTok newFollower Ep 0 = 549 (48 sudah dipakai di Ep 1 -> susulan 501), Aturan 79, Ep 1 14 -> TT 594; IG follower 81 -> 238 = +157; YT subscriber 41 -> 52 = +11. Total +762.
- Like: Ep 0 TT 715 + IG 297 + YT 17 = 1.029 (218 sudah dipakai di Ep 1 -> susulan 811); Aturan TT 213 + IG 331 + YT 29 = 573; Ep 1 TT 75 + IG 71 + YT 6 = 152. Total baru 1.536.
- Komen Ep 1 (dibaca langsung, satu akun satu suara): MATAHARI 9 (TT 6, IG 3), ANGIN 5, SUNGAI 3 -> MATAHARI.
- Profesi dari komen Aturan Main: polisi ±5, guru ±6, satpam 3, tentara 3, marbot/ustadz 3, dokter 2, damkar 2, RT 2, petani 2 (+ presiden, pengangguran -> lelucon).
PATOKAN BARU untuk Ep 3: IG 238, YT 52 (22 Nov ±21:40 WIB); TikTok per video.
Biaya panel surya = fiksi permainan (Rp12.500.000)."""

META = dict(format="serial Season 1", pilar="bangun desa", tokoh="Juara, Mbah Darmo, Bu Wati, Bejo, perantau", lokasi="stasiun, balai, halaman tugas, kandang Bejo, atap panel, desa malam, sumur, depan balai",
            hook="kereta penuh, 48 jadi 810", variasi="hasil interaksi", interaksi="komen: SUMUR BOR / TANDON AIR HUJAN / PIPA MATA AIR BUKIT", suara="Iapetus", season=1, episode=2, babak=1)
PREV = dict(hari=1, pulang=48, sisa=1_330_000)
DATA = dict(follow=dict(tt=501 + 79 + 14, ig=238 - 81, yt=52 - 41), like=dict(ep0=715 + 297 + 17 - 218, aturan=213 + 331 + 29, ep1=75 + 71 + 6), vote=dict(matahari=9, angin=5, sungai=3))
KURS = dict(like=10_000)
BIAYA = dict(panel=12_500_000)


def compute():
    d = DATA; follow = sum(d["follow"].values()); like = sum(d["like"].values()); pulang = PREV["pulang"] + follow
    dana = PREV["sisa"] + like * KURS["like"]; sisa = dana - BIAYA["panel"]; v = d["vote"]
    assert follow == 762 and like == 1536 and pulang == 810 and dana == 16_690_000 and sisa == 4_190_000 and v["matahari"] > max(v["angin"], v["sungai"])
    rp = lambda x: "Rp" + f"{x:,}".replace(",", ".")
    return dict(hud=dict(items=["HARI 2 / 30", f"🚉 PULANG {pulang}", f"💰 DANA {rp(sisa)}"]), pulang=pulang, prev=PREV["pulang"], dana=dana, sisa=sisa, dana_rp=rp(dana), sisa_rp=rp(sisa), biaya_rp=rp(BIAYA["panel"]),
                vote=v, profesi=["👮 POLISI", "👩‍🏫 GURU", "💂 SATPAM", "🪖 TENTARA", "🕌 MARBOT", "🩺 DOKTER", "🚒 DAMKAR", "📋 PAK RT", "🌾 PETANI"], rapor=4)


SCENES = [
    dict(id="s1", type="K2_KERETA", kicker="", sub="", data=["hud"],
         say="Kemarin, *empat puluh delapan*. Hari ini... *{pulang|w}* perantau pulang kampung!"),
    dict(id="s2", type="K2_REKAP", kicker="HASIL KOMEN", sub="matahari menang", data=["hud"],
         say="Router mati karena nggak ada listrik, dan kalian pilih *matahari*. Dari like kalian, dana desa jadi *enam belas juta enam ratus sembilan puluh ribu*."),
    dict(id="s3", type="K2_TUGAS", kicker="", sub="", data=["hud"],
         say="Mereka pulang bawa *profesi*. Polisi, guru, dokter, damkar, marbot, petani. Ada yang daftar jadi presiden... maaf, adanya *ketua RT*."),
    dict(id="s4", type="K2_BEJO", kicker="", sub="", data=["hud"],
         say="Yang daftar jadi *beban*? Diterima. Tugasnya... *nemenin Bejo*."),
    dict(id="s5", type="K2_PANEL", kicker="", sub="", data=["hud"],
         say="Panel surya dipasang di atap balai dan rumah warga. Habis *dua belas setengah juta*. Sisa dana, *empat juta seratus sembilan puluh ribu*."),
    dict(id="s6", type="K2_MALAM", kicker="", sub="", data=["hud"],
         say="Malamnya, buat pertama kali... desa ini *menyala*. Mbah Darmo? *Nangis lagi*."),
    dict(id="s7", type="K2_SUMUR", kicker="", sub="", data=["hud"],
         say="Tapi paginya, *delapan ratus* orang antre di *satu sumur*. Airnya nggak cukup. Terus Bu Wati datang. Rapor pertama... *empat hari lagi*."),
    dict(id="s8", type="K2_AJAK", kicker="", sub="", data=["hud"],
         say="Air dari mana? *Sumur bor*, *tandon air hujan*, atau *pipa dari mata air bukit*? Komen, yang paling rame gue kerjain besok!"),
]
END_PAD = 1.2
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
