"""Dompet Gue Nangis · Season 1 "Rp100 Ribu di Jakarta" · Episode 3 "Teras Masjid Lagi" (tayang 24 Nov 2026).
Storyboard: STORYBOARD.md. Narator Nana (Kore, flash). Konsep: docs/konsep/S1-EP3.md (aturan Ep 3: detik 0 teks besar, efek suara, A/B, loop).

Data interaksi Ep 2 (ditarik ulang 23-24 Nov ±06:30 WIB lewat Repliz; komentar dibaca langsung):
- Pilihan Ep 2 (tidur di mana): TERAS MASJID LAGI 2 (IG "teras masjid lagi", YT "Teras masjid aja"); TikTok hanya emoji -> teras masjid menang.
- Like Ep 2: TikTok 32 + IG 68 + YouTube 16 = 116 (GABUNGAN, ditulis di layar) -> 10 like = 1 XP -> +11 XP.
- Follow sejak patokan 22 Nov 21:00: TikTok +0 (per video), IG 62 -> 69 = +7, YT 34 -> 35 = +1 -> +8 -> Rp1.000/follow = +Rp8.000.
  Patokan baru (24 Nov ±06:30): IG 69, YT 35.

Angka cerita:
- Saldo Ep 2 Rp137.000 + Rp8.000 = Rp145.000. XP 48 + 11 = 59.
- DP kos Rp100.000 (Ep 2). Kalau dibayar sisa Rp45.000 untuk 4 hari (fiksi, hitungan jujur).
- Tarif KRL Rp3.000 untuk 25 km pertama (Bisnis.com, 6 Jan 2026: tidak ada kenaikan tarif KRL 2026; sumber sama dengan Ep 1).
- Kucing masjid, telat 30 menit, makan tidak dipotong hari ini: fiksi.
"""

META = dict(format="serial Season 1", pilar="bertahan di Jakarta", tokoh="Nana, Si Dompet, kucing masjid, Ibu warteg, Raka", lokasi="teras masjid malam, teras subuh, dapur warteg, bangku warteg, teras malam",
            hook="HP besar saldo vs DP vs sisa hari", variasi="episode 3 (gagal lucu + sukses + loop)", interaksi="komen A pinjam Raka / B lembur cuci piring", suara="Kore", season=1, episode=3, babak=1)
SALDO_EP2, XP_EP2 = 137_000, 48
LIKE = dict(tiktok=32, ig=68, youtube=16)
FOLLOW = dict(tiktok=0, ig=69 - 62, youtube=35 - 34)
VOTE = dict(teras=2, dapur=0, dp=0)
DP, HARI, KRL = 100_000, 4, 3_000


def compute():
    like = sum(LIKE.values()); follow = sum(FOLLOW.values()); xp_tambah = like // 10; uangf = follow * 1_000
    saldo = SALDO_EP2 + uangf; xp = XP_EP2 + xp_tambah; sisa = saldo - DP; per = sisa / HARI
    assert max(VOTE, key=VOTE.get) == "teras"
    assert like == 116 and xp_tambah == 11 and follow == 8 and saldo == 145_000 and xp == 59 and sisa == 45_000 and per == 11_250
    top = "EP 3 · HARI 4"
    return dict(hud=dict(top=top, saldo=SALDO_EP2, xp=XP_EP2), hud2=dict(top=top, saldo=saldo, xp=xp), like=like, xp_tambah=xp_tambah, follow=follow, uangf=uangf,
                saldo0=SALDO_EP2, saldo=saldo, dp=DP, sisa=sisa, hari=HARI, per=int(per), krl=KRL, lk=LIKE)


SCENES = [
    dict(id="s1", type="D3_HOOK", kicker="", sub="", data=["hud"],
         say="Kalian pilih *teras masjid*... lagi! Saldo *seratus tiga puluh tujuh ribu*, DP kos *seratus ribu*, sisa *empat hari*."),
    dict(id="s2", type="D3_REZEKI", kicker="", sub="", data=["hud2"],
         say="*{like|w}* like, skill naik *{xp_tambah|w}* XP. *{follow|w}* follower baru, *{uangf|w}* masuk."),
    dict(id="s3", type="D3_KUCING", kicker="", sub="", data=["hud2"],
         say="Subuh... *kucing masjid* tidur di atas Si Dompet. Nggak tega bangunin. Gue *telat* setengah jam!"),
    dict(id="s4", type="D3_KERJA", kicker="", sub="", data=["hud2"],
         say="Tapi tiga ratus piring beres *sebelum jam dua*. Ibu warteg seneng: makan hari ini *nggak dipotong*."),
    dict(id="s5", type="D3_HITUNG", kicker="", sub="", data=["hud2"],
         say="Kalau DP dibayar, sisa *{sisa|w}* buat empat hari. Padahal sekali naik KRL aja *tiga ribu*."),
    dict(id="s6", type="D3_RAKA", kicker="", sub="", data=["hud2"],
         say="Malamnya Raka dateng. Kamar itu *diincar orang*, DP harus masuk *besok pagi*. Dia nawarin minjemin *seratus ribu*."),
    dict(id="s7", type="D3_AJAK", kicker="", sub="", data=["hud2"],
         say="Komen *A, pinjam Raka*, atau *B, lembur cuci piring* malam ini. Follow, seribu masuk. Dan malam ini... gue tidur di *teras masjid* lagi."),
]
SFX = [("s1", 0.0, "ding", .9), ("s2", "masuk", "ding", .8), ("s3", "kucing", "pop", .9), ("s3", "telat", "whoosh", .9), ("s4", "dipotong", "sorak", .6),
       ("s5", "KRL", "pop", .6), ("s6", "besok", "gedebuk", .8), ("s7", r"^A,?$", "pop", .8), ("s7", r"^B,?$", "pop", .8)]
END_PAD = 1.0
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}
