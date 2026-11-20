"""Dompet Gue Nangis · Season 1 "Rp100 Ribu di Jakarta" · Episode 1 "Tidur di Masjid" (tayang 22 Nov 2026).
Storyboard: STORYBOARD.md. Narator Nana (suara Kore, model flash).

Data interaksi Ep 0 (ditarik ulang lewat Repliz 20 Nov 2026 ±21:45 WIB, dibaca satu per satu; komen akun sendiri tidak dihitung):
- TikTok 7710133851518946581: 562 view, 38 like, newFollower 4. Komen: "masjid", "stasiun", "di kursi stasiun", "pinggir tpa".
- IG 18113375234620228: 2.735 view, 116 like. Komen: "masjid", "tidur di warnet sekalian cari job", "mana ada tiket kereta 5k", "bantu follow ya" (bukan suara).
- YouTube oappyoZrxxk: 567 view, 11 like, 0 komen. Subscriber dari Ep 0 = +2 (docs/data/2026-11-20-ep0.md).
- IG follower 27 = patokan 20 Nov 22:00 (selisih 0).
- Voting: stasiun 2 (TT), masjid 2 (TT + IG, di luar pilihan), warnet 1 (IG), pinggir TPA 1 (TT) -> SERI stasiun vs masjid -> Nana memutuskan sendiri:
  masjid dekat stasiun (gabungan dua pilihan teratas; disebut di narasi).
- Like total 38 + 116 + 11 = 165 -> 10 like = 1 XP -> 16 XP. Follow 4 (TT) + 2 (YT) + 0 (IG) = 6 -> Rp6.000.

Sumber angka:
- Tarif KRL Jabodetabek: Rp3.000 untuk 25 km pertama (Bisnis.com, "Lengkap! Tarif Transjakarta, KRL, MRT, hingga LRT Awal 2026", 6 Jan 2026),
  + Rp1.000 tiap 10 km berikutnya (skema tarif bersubsidi sejak 2016); tarif dipastikan tidak naik tahun 2026 (Bisnis.com 27 Jan 2026; detikFinance).
  Perjalanan ±45 km = 3.000 + 2 x 1.000 = Rp5.000 -> angka Ep 0 BENAR; Nana menjawab komentar "mana ada tiket kereta 5k".
- Upah harian cuci piring warung makan Jakarta: ±Rp50.000-80.000/hari (kisaran lowongan harian 2025) -> Rp50.000, dibayar mingguan (Jumat) = fiksi cerita.
- Kos Bu Ratna Rp200.000/minggu bayar Sabtu (Ep 0).
"""

META = dict(format="serial Season 1", pilar="bertahan di Jakarta", tokoh="Nana, Si Dompet, Pak Marbot, ibu jamaah, pemilik warteg", lokasi="peron, trotoar senja, teras masjid malam & subuh, pelataran masjid, warteg",
            hook="jawab komen 'mana ada tiket kereta 5k'", variasi="episode 1", interaksi="komen: cuci piring / gorengan titipan / jasa antre", suara="Kore", season=1, episode=1, babak=1)
SALDO_EP0 = 80_000
EP0 = dict(like=dict(tiktok=38, ig=116, youtube=11), follow=dict(tiktok=4, youtube=2, ig=0), vote=dict(stasiun=2, masjid=2, warnet=1, tpa=1))
KURS = dict(follow=1_000, like_per_xp=10)
KRL = dict(dasar=3_000, km_dasar=25, tambah=1_000, per_km=10, jarak=45)
CUCI = 50_000
KOS_MINGGU = 200_000


def compute():
    like = sum(EP0["like"].values()); follow = sum(EP0["follow"].values()); xp = like // KURS["like_per_xp"]; uangf = follow * KURS["follow"]
    tiket = KRL["dasar"] + -(-(KRL["jarak"] - KRL["km_dasar"]) // KRL["per_km"]) * KRL["tambah"]
    saldo = SALDO_EP0 + uangf
    v = EP0["vote"]; assert v["stasiun"] == v["masjid"] == max(v.values())   # seri -> Nana memutuskan sendiri
    assert like == 165 and xp == 16 and follow == 6 and uangf == 6_000 and saldo == 86_000 and tiket == 5_000
    top = "EP 1 · HARI 2"
    return dict(hud=dict(top=top, saldo=SALDO_EP0, xp=0), hud6=dict(top=top, saldo=saldo, xp=xp), like=like, xp=xp, follow=follow, uangf=uangf, tiket=tiket,
                vote=v, saldo=saldo, cuci=CUCI, kos=KOS_MINGGU)


SCENES = [
    dict(id="s1", type="D1_HOOK", kicker="", sub="", data=["hud", "tiket"],
         say="Mana ada tiket kereta *lima ribu*? Ada! Tiga ribu buat dua puluh lima kilo pertama, tambah seribu tiap sepuluh kilo. Kota gue jauh, jadi pas *lima ribu*."),
    dict(id="s2", type="D1_SERI", kicker="", sub="", data=["hud", "vote"],
         say="Kemarin kalian *seri*: stasiun dua, masjid dua. Jadi gue mutusin sendiri... *masjid* deket stasiun."),
    dict(id="s3", type="D1_TIDUR", kicker="", sub="", data=["hud"],
         say="Malam pertama di Jakarta, gue tidur di teras masjid. Si Dompet jadi bantal. Dia *nggak protes*."),
    dict(id="s4", type="D1_SUBUH", kicker="", sub="", data=["hud"],
         say="Jam setengah lima, *Pak Marbot* bangunin gue. Bukan diusir... tapi diajak *subuhan*."),
    dict(id="s5", type="D1_JAMAAH", kicker="", sub="", data=["hud"],
         say="Abis subuh, ibu-ibu jamaah nanya gue dari mana. Lima menit kemudian, satu masjid tahu gue *cari kerja*."),
    dict(id="s6", type="D1_REZEKI", kicker="", sub="", data=["hud6", "follow", "uangf", "like", "xp"],
         say="Terus HP gue bunyi. *{follow|w}* follower, *{uangf|w}* masuk. *{like|w}* like, skill gue naik *{xp|w}* XP."),
    dict(id="s7", type="D1_INFO", kicker="", sub="", data=["hud6", "cuci"],
         say="Kata ibu jamaah, warteg ujung jalan butuh tukang cuci piring. Bayarannya *lima puluh ribu* sehari!"),
    dict(id="s8", type="D1_JUMAT", kicker="", sub="", data=["hud6", "saldo", "kos"],
         say="Tapi dibayarnya... tiap hari *Jumat*. Padahal kos harus lunas *Sabtu*, dan gue butuh makan *hari ini*."),
    dict(id="s9", type="D1_AJAK", kicker="", sub="", data=["hud6"],
         say="*Follow*, seribu masuk ke HP gue. *Like*, skill gue naik. *Komen*: gue ambil yang mana? *Cuci piring* dibayar Jumat, *jualan gorengan titipan*, atau *jasa antre*?"),
]
END_PAD = .8
TEMPO = 1.12   # durasi asli 84 dtk -> masuk 45-75 dtk tanpa panggilan TTS baru
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}
