"""Kades Magang Juara · Season 1 · Episode 3 "Pipa dari Bukit" (tayang 24 Nov 2026). Storyboard: STORYBOARD.md. Konsep: docs/konsep/S1-EP3.md.
Episode pertama yang disusun dari riset vidIQ (docs/riset/kades.md): detik 0 = teks hasil besar + angka + label EPISODE, slogan tetap,
1 sukses + 1 gagal lucu, pilihan A/B, efek suara (bukan musik), akhir nyambung ke awal (kran).
DATA ditarik lewat Repliz 23 Nov 2026 ±22:30 WIB (patokan sebelumnya: episode s1e02 / docs/data/2026-11-22-ep1.md):
- Follow: TikTok newFollower Ep 0 596 (549 sudah dipakai -> +47), Aturan 82 (79 -> +3), Ep 1 18 (14 -> +4), Ep 2 6 -> TT +60;
  IG follower 238 -> 248 = +10; YT subscriber 52 -> 53 = +1. Total +71.
- Like (sisa yang belum dipakai): TT Ep 0 763-715=48, Aturan 230-213=17, Ep 1 95-75=20, Ep 2 58 -> 143;
  IG Ep 0 307-297=10, Aturan 339-331=8, Ep 1 74-71=3, Ep 2 56 -> 77; YT Ep 1 15-6=9 (lainnya tetap) -> 9. Total 229.
- Komen Ep 2 (dibaca langsung 23 Nov, satu akun satu suara; docs/data/2026-11-23-ep2.md): PIPA MATA AIR BUKIT 9 (TT 5, IG 4), sumur bor 1, tandon 0.
- Cameo: cerita penonton IG (guru SLB pulang kampung), nama DISAMARKAN jadi "Bu Laras".
PATOKAN BARU untuk Ep 4: IG 248, YT 53 (23 Nov ±22:30 WIB); TikTok newFollower/like per video = angka di atas.
Biaya pipa = fiksi permainan (Rp3.750.000)."""

META = dict(format="serial Season 1", pilar="bangun desa", tokoh="Juara, Mbah Darmo, Bu Wati, Bejo, Bu Laras (cameo penonton)", lokasi="kran desa, balai, lereng bukit, pipa di sawah, tandon, pohon besar, depan balai",
            hook="air menyembur ke 881 warga", variasi="hasil interaksi + gagal lucu + A/B", interaksi="komen: A SEKOLAH / B PUSKESMAS", suara="Iapetus", season=1, episode=3, babak=1,
            sfx="air, sorak, cipratan, gedebuk, ding, kentongan")
PREV = dict(hari=2, pulang=810, sisa=4_190_000, rapor=4)
DATA = dict(follow=dict(tt=47 + 3 + 4 + 6, ig=248 - 238, yt=53 - 52),
            like=dict(tt=48 + 17 + 20 + 58, ig=10 + 8 + 3 + 56, yt=9), vote=dict(pipa=9, sumur=1, tandon=0))
KURS = dict(like=10_000)
BIAYA = dict(pipa=3_750_000)


def compute():
    d = DATA; follow = sum(d["follow"].values()); like = sum(d["like"].values()); pulang = PREV["pulang"] + follow
    dana = PREV["sisa"] + like * KURS["like"]; sisa = dana - BIAYA["pipa"]; v = d["vote"]
    assert follow == 71 and like == 229 and pulang == 881 and dana == 6_480_000 and sisa == 2_730_000 and v["pipa"] > max(v["sumur"], v["tandon"])
    rp = lambda x: "Rp" + f"{x:,}".replace(",", ".")
    return dict(hud=dict(items=["HARI 3 / 30", f"🚉 WARGA {pulang}", f"💰 DANA {rp(sisa)}"]), pulang=pulang, follow=follow, like=like, like_tt=d["like"]["tt"], like_ig=d["like"]["ig"], like_yt=d["like"]["yt"],
                prev_sisa=PREV["sisa"], dana=dana, sisa=sisa, dana_rp=rp(dana), sisa_rp=rp(sisa), biaya_rp=rp(BIAYA["pipa"]), tambah_rp=rp(like * KURS["like"]), vote=v, rapor=PREV["rapor"] - 1)


SCENES = [
    dict(id="s1", type="K3_KRAN", kicker="", sub="", data=["hud"],
         say="Air *mengalir*! Kalian pilih *pipa dari bukit*, dan hari ini *{pulang|w}* warga bisa mandi."),
    dict(id="s2", type="K3_REKAP", kicker="", sub="", data=["hud"],
         say="*{follow|w}* orang lagi pulang kampung. Like gabungan TikTok, IG, YouTube, *{like|w}*. Dana desa jadi *enam juta empat ratus delapan puluh ribu*."),
    dict(id="s3", type="K3_GOTONG", kicker="", sub="", data=["hud"],
         say="Polisi, guru, damkar, petani, semua narik pipa dari mata air di atas bukit. Biayanya *tiga juta tujuh ratus lima puluh ribu*."),
    dict(id="s4", type="K3_BEJO", kicker="", sub="", data=["hud"],
         say="Tinggal dikit lagi... terus Bejo *gigit pipanya*. Mbah Darmo? *Mandi gratis*."),
    dict(id="s5", type="K3_TANDON", kicker="", sub="", data=["hud"],
         say="Ditambal, disambung lagi, tandon *penuh*! Sisa dana *dua juta tujuh ratus tiga puluh ribu*."),
    dict(id="s6", type="K3_POHON", kicker="", sub="", data=["hud"],
         say="Di bawah pohon, *Bu Laras*, guru SLB yang baru pulang kampung, langsung ngajar anak-anak. Soalnya sekolah desa udah lama *tutup*."),
    dict(id="s7", type="K3_RAPOR", kicker="", sub="", data=["hud"],
         say="Terus Bu Wati datang. Rapor pertama *tiga hari lagi*. Desa tanpa sekolah dan tanpa layanan kesehatan? Nilainya *merah*."),
    dict(id="s8", type="K3_AJAK", kicker="", sub="", data=["hud"],
         say="Dana cuma cukup satu. Komen *A, sekolah*, atau *B, puskesmas*. Komen kalian, desa kita!"),
]
SFX = [("s1", 0.0, "air", .9), ("s1", 0.15, "sorak", .7), ("s4", "gigit", "cipratan", 1.0), ("s4", "gigit", "air", .6), ("s4", "Mandi", "gedebuk", .5),
       ("s5", "penuh", "ding", .8), ("s7", "merah", "kentongan", .9), ("s8", r"^A,?$", "pop", .8), ("s8", r"^B,?$", "pop", .8)]
SPLIT_SHIFT = {1: -1}
END_PAD = 1.0
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
