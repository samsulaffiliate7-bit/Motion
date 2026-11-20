"""Dompet Gue Nangis · Season 1 "Rp100 Ribu di Jakarta" · Episode 0 "Rp100 Ribu Terakhir" (konsep baru 19 Nov 2026).
Storyboard: STORYBOARD.md. Narator Nana (suara Kore, model flash).

Sumber angka (harga Jakarta, kisaran 2025-2026, tanpa merek):
- Tiket KRL: tarif Rp3.000 untuk 25 km pertama + Rp1.000 tiap 10 km berikutnya (tarif bersubsidi yang berlaku sejak 2016, belum naik
  per 2025); perjalanan ±45 km dari kota satelit = Rp5.000.
- Makan warteg nasi + sayur + telur: ±Rp12.000-17.000 per porsi di Jakarta 2025 (kisaran KONSEP-S1: Rp15-25 rb) -> Rp15.000.
- Kos kamar sempit Jakarta: ±Rp800 rb-1,5 jt per bulan (KONSEP-S1); Bu Ratna minta mingguan Rp200.000 (= ±Rp860 rb/bulan, masih di kisaran).
Interaksi (fiksi, rumus season): follow = +Rp1.000, 10 like = +1 XP, komen = keputusan Nana.
"""

META = dict(format="serial Season 1", pilar="bertahan di Jakarta", tokoh="Nana, Si Dompet, Raka, Bu Ratna", lokasi="peron KRL, JPO, trotoar, warteg, gang kos, bangku lampu jalan",
            hook="Rp100 ribu terakhir", variasi="episode 0", interaksi="komen: teras kos / warnet / stasiun", suara="Kore", season=1, episode=0, babak=1)
SALDO0 = 100_000
BIAYA = dict(krl=5_000, warteg=15_000)
KOS_MINGGU = 200_000
KURS = dict(follow=1_000, like_per_xp=10)


def compute():
    s1 = SALDO0
    s2 = s1 - BIAYA["krl"]
    s3 = s2 - BIAYA["warteg"]
    assert s3 == 80_000 and KOS_MINGGU - s3 == 120_000
    top = "EP 0 · HARI 1"
    H = lambda v: dict(top=top, saldo=v, xp=0)
    return dict(hud=H(s1), hud4=H(s2), hud5=H(s3), saldo0=s1, sisa=s3, kos=KOS_MINGGU, kurang=KOS_MINGGU - s3, krl=BIAYA["krl"], warteg=BIAYA["warteg"])


SCENES = [
    dict(id="s1", type="D0_TIBA", kicker="", sub="", data=["hud"],
         say="Ini *seratus ribu* terakhir gue. Dan mulai hari ini... gue tinggal di *Jakarta*."),
    dict(id="s2", type="D0_KOTA", kicker="", sub="", data=["hud"],
         say="Gue Nana, dua puluh dua tahun, dari kota kecil. Di kota segede ini, gue nggak kenal *siapa-siapa*."),
    dict(id="s3", type="D0_DOMPET", kicker="", sub="", data=["hud"],
         say="Temen gue cuma satu: *Si Dompet*. Mukanya ikut isi saldo. Sekarang dia masih *senyum*."),
    dict(id="s4", type="D0_JALAN", kicker="", sub="", data=["hud4", "krl"],
         say="Ongkos kereta tadi, *lima ribu*. Senyumnya... mulai *kecut*."),
    dict(id="s5", type="D0_WARTEG", kicker="", sub="", data=["hud5", "warteg"],
         say="Makan pertama di warteg: nasi, sayur, telor. *Lima belas ribu*. Enak banget... tapi Si Dompet mulai *nangis*."),
    dict(id="s6", type="D0_RAKA", kicker="", sub="", data=["hud5"],
         say="Di sebelah gue, *Raka*, ojol yang ngaku paling hemat se-Jakarta. Abis ngomong gitu, dia pesen *tiga es teh*."),
    dict(id="s7", type="D0_KOS", kicker="", sub="", data=["hud5", "kos"],
         say="Raka nunjukin kos di gang belakang. Pemiliknya, *Bu Ratna*. Kamar baru kosong hari *Sabtu*, bayar di muka, *dua ratus ribu* seminggu."),
    dict(id="s8", type="D0_MALAM", kicker="", sub="", data=["hud5", "sisa", "kos"],
         say="Saldo gue tinggal *delapan puluh ribu*. Dan malam ini... gue belum punya *tempat tidur*."),
    dict(id="s9", type="D0_AJAK", kicker="", sub="", data=["hud5"],
         say="*Follow*, seribu rupiah masuk ke HP gue. *Like*, skill gue naik. *Komen*: malam ini gue tidur di mana? *Teras kos*, *warnet*, atau *stasiun*?"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}
