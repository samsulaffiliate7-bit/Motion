"""Dompet Gue Nangis · Season 1 "Rp100 Ribu di Jakarta" · Episode 2 "Cuci Piring" (tayang 23 Nov 2026).
Storyboard: STORYBOARD.md. Narator Nana (Kore, flash). Konsep: docs/konsep/S1-EP2.md.

Data interaksi (docs/data/2026-11-22-ep1.md, ditarik 22 Nov ±21:00 WIB; komentar dibaca langsung ±21:15; statistik Repliz ter-cache 6 jam,
 jadi tarikan ulang 21:25 WIB memberi angka sama):
- Pilihan Ep 1 (kerja apa): cuci piring 1 (IG), gorengan titipan 1 (TT "pilih 2"), jasa antre 1 (IG) -> SERI 1-1-1 -> Nana memutuskan sendiri: CUCI PIRING.
  Usul penonton IG: uang makan dipotong dari gaji -> diterima Ibu warteg.
- Like Aturan Main (36 + 140 + 18 = 194) + Ep 1 (19 + 96 + 16 = 131) = 325 -> 10 like = 1 XP -> +32 XP.
- Follow sejak patokan 20 Nov 22:00: TikTok +5 (per video), IG 27 -> 62 = +35, YT 23 -> 34 = +11 -> +51 -> Rp1.000/follow = +Rp51.000.
  Patokan baru (22 Nov 21:00): IG 62, YT 34.
- 2 komentar tidak pantas di IG Aturan Main: diabaikan.

Angka cerita:
- Saldo akhir Ep 1 Rp86.000 + Rp51.000 = Rp137.000. XP 16 + 32 = 48.
- Upah cuci piring Rp50.000/hari dibayar Jumat (Ep 1); makan dipotong dari gaji (fiksi, usul penonton).
- Kos Bu Ratna Rp200.000/minggu (Ep 0); DP Rp100.000, lewat Sabtu kamar dikasih orang lain (fiksi).
- 300 piring sehari: fiksi (warteg ramai; hiperbola komedi).
"""

META = dict(format="serial Season 1", pilar="bertahan di Jakarta", tokoh="Nana, Si Dompet, Ibu warteg, Raka, Bu Ratna", lokasi="dapur belakang warteg, depan warteg, gerbang kos, bangku malam",
            hook="menara 300 piring roboh", variasi="episode 2", interaksi="komen: teras masjid lagi / numpang dapur warteg / nekat DP kos", suara="Kore", season=1, episode=2, babak=1)
SALDO_EP1, XP_EP1 = 86_000, 16
LIKE = dict(aturan=dict(tiktok=36, ig=140, youtube=18), ep1=dict(tiktok=19, ig=96, youtube=16))
FOLLOW = dict(tiktok=5, ig=62 - 27, youtube=34 - 23)
VOTE = dict(cuci=1, gorengan=1, antre=1)
DP, KOS = 100_000, 200_000
PIRING = 300


def compute():
    like = sum(sum(v.values()) for v in LIKE.values()); follow = sum(FOLLOW.values()); xp_tambah = like // 10; uangf = follow * 1_000
    saldo = SALDO_EP1 + uangf; xp = XP_EP1 + xp_tambah
    assert len(set(VOTE.values())) == 1   # seri -> Nana memutuskan sendiri
    assert like == 325 and xp_tambah == 32 and follow == 51 and saldo == 137_000 and xp == 48 and saldo > DP
    top = "EP 2 · HARI 3"
    return dict(hud=dict(top=top, saldo=SALDO_EP1, xp=XP_EP1), hud3=dict(top=top, saldo=SALDO_EP1, xp=xp), hud4=dict(top=top, saldo=saldo, xp=xp),
                like=like, xp_tambah=xp_tambah, follow=follow, uangf=uangf, saldo=saldo, dp=DP, kos=KOS, piring=PIRING)


SCENES = [
    dict(id="s1", type="D2_HOOK", kicker="", sub="", data=["hud", "piring"],
         say="Hari ketiga di Jakarta... *tiga ratus* piring."),
    dict(id="s2", type="D2_REKAP", kicker="", sub="", data=["hud"],
         say="Kemarin kalian *seri* lagi, satu-satu-satu. Jadi gue pilih *cuci piring*. Terus ada usul: uang makan gue *dipotong gaji*. Ibu warteg setuju!"),
    dict(id="s3", type="D2_KERJA", kicker="", sub="", data=["hud3", "like", "xp_tambah"],
         say="Tangan keriput, Si Dompet ikut ngelap. *{like|w}* like dari kalian, skill cuci gue naik *{xp_tambah|w}* XP."),
    dict(id="s4", type="D2_REZEKI", kicker="", sub="", data=["hud4", "follow", "uangf"],
         say="Terus HP bunyi: *{follow|w}* follower baru. *{uangf|w}* masuk!"),
    dict(id="s5", type="D2_RAKA", kicker="", sub="", data=["hud4"],
         say="Siangnya *Raka* mampir makan. Katanya, kamar di kos Bu Ratna bisa *dipesen duluan*... asal pakai DP."),
    dict(id="s6", type="D2_RATNA", kicker="", sub="", data=["hud4", "dp", "saldo"],
         say="Bu Ratna bilang: DP *seratus ribu*. Lewat hari *Sabtu*, kamarnya dikasih orang lain. Padahal gaji gue baru keluar *Jumat*."),
    dict(id="s7", type="D2_AJAK", kicker="", sub="", data=["hud4"],
         say="*Follow*, seribu masuk. *Like*, skill naik. *Komen*: malam ini gue tidur di mana? *Teras masjid* lagi, *numpang dapur warteg*, atau *nekat DP kos* sekarang?"),
]
END_PAD = 1.0
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}
