"""Meja Seberang Bos · Season 1 "Dari Warung Lipat" · Episode 3 "Utang Nol" (tayang 24 Nov 2026).
Storyboard: STORYBOARD.md. Narator Bima (Puck, flash). Konsep: docs/konsep/S1-EP3.md (aturan Ep 3: detik 0 teks besar, efek suara, A/B, loop).

Data interaksi Ep 2 (ditarik ulang 24 Nov ±06:30 WIB lewat Repliz; komentar dibaca langsung):
- Pilihan Ep 2 (stok): BELI SEDIKIT TUNAI 1 (IG "beli sedikit tunai, biar gaada utang"); TikTok/YouTube tanpa komentar -> menang 1:0.
- Like Ep 2: TikTok 4 + IG 51 + YouTube 24 = 79 (GABUNGAN, ditulis di layar) -> Rp5.000/like = +Rp395.000 modal.
- Follow sejak patokan 22 Nov 21:00: TikTok 0 (per video), IG 5 -> 8 = +3, YT 35 -> 36 = +1 -> +4 -> pelanggan tetap 17 -> 21.
  Patokan baru (24 Nov ±06:30): IG 8, YT 36.

Sumber angka (kisaran harga 2025-2026, tanpa merek; sama dengan Ep 2):
- Belanja tunai satu putaran: susu kental manis 6 x Rp13.000 + gula aren Rp30.000 + kopi bubuk Rp50.000 + cup Rp45.000 = Rp203.000.
- Kopi susu Rp5.000/gelas, 70 gelas (habis jam 10: fiksi). Utang Bima ke pemasok Rp0.
- Bang Rudi ambil stok Tono Rp3.000.000 bayar belakangan (fiksi, Ep 2); spanduk "KOPI Rp2.000" (fiksi, cliffhanger perang harga).
- Piutang Mak Ijah Rp25.000 (Ep 2) tetap, tidak disebut di episode ini.
"""

META = dict(format="serial Season 1", pilar="bangun usaha dari nol", tokoh="Bima, Bang Rudi, Tono, kucing, ojol, anak sekolah", lokasi="gang dari atas, teras rapat, warung, toko Rudi sore",
            hook="penghitung besar UTANG Rp0 vs Rudi utang 3 juta", variasi="episode 3 (kontras dua toko + gagal lucu + loop)", interaksi="komen A ikut turun harga / B menu baru", suara="Puck", season=1, episode=3, babak=1)
KAS_EP2, PEL_EP2 = 1_030_000, 17
LIKE = dict(tiktok=4, ig=51, youtube=24)
FOLLOW = dict(tiktok=0, ig=8 - 5, youtube=36 - 35)
VOTE = dict(tunai=1, stok_tono=0, patungan=0)
BELANJA = dict(susu=6 * 13_000, aren=30_000, kopi=50_000, cup=45_000)
JUAL = dict(harga=5_000, gelas=70)
STOK_RUDI, HARGA_RUDI = 3_000_000, 2_000


def compute():
    like = sum(LIKE.values()); follow = sum(FOLLOW.values()); modal = like * 5_000
    kas1 = KAS_EP2 + modal; belanja = sum(BELANJA.values()); kas2 = kas1 - belanja; omzet = JUAL["harga"] * JUAL["gelas"]; kas3 = kas2 + omzet; pel = PEL_EP2 + follow
    assert max(VOTE, key=VOTE.get) == "tunai"
    assert like == 79 and modal == 395_000 and follow == 4 and pel == 21 and kas1 == 1_425_000 and belanja == 203_000 and kas2 == 1_222_000 and omzet == 350_000 and kas3 == 1_572_000
    assert HARGA_RUDI < JUAL["harga"]
    top = "EP 3 · HARI 4"; H = lambda p, k: dict(top=top, pelanggan=p, kas=k)
    return dict(hud=H(PEL_EP2, KAS_EP2), hud3=H(pel, kas1), hud4=H(pel, kas2), hud5=H(pel, kas3), like=like, lk=LIKE, modal=modal, follow=follow, pel0=PEL_EP2, pel=pel,
                kas0=KAS_EP2, kas1=kas1, belanja=belanja, kas=kas3, harga=JUAL["harga"], gelas=JUAL["gelas"], stok=STOK_RUDI, harga_rudi=HARGA_RUDI, kurs_like=5_000)


SCENES = [
    dict(id="s1", type="M3_HOOK", kicker="", sub="", data=["hud"],
         say="Hari keempat. Utang gue... *nol*. Bang Rudi? Utang *tiga juta*."),
    dict(id="s2", type="M3_RAPAT", kicker="", sub="", data=["hud"],
         say="Rapat sendirian, voting *satu kosong*: *beli sedikit, tunai*. Biar nggak ada utang. *Sah!*"),
    dict(id="s3", type="M3_MODAL", kicker="", sub="", data=["hud3"],
         say="*{like|w}* like, modal nambah *{modal|w}*. *{follow|w}* follow, pelanggan tetap jadi *{pel|w}*."),
    dict(id="s4", type="M3_SPLIT", kicker="", sub="", data=["hud4"],
         say="Gue belanja *dua ratus tiga ribu*, lunas. Rudi borong stok Tono *tiga juta*... bayarnya *nanti*."),
    dict(id="s5", type="M3_HABIS", kicker="", sub="", data=["hud4"],
         say="Jam sepuluh pagi, stok *habis*. Pelanggan dateng... gue tawarin *kopi ampas*."),
    dict(id="s6", type="M3_LAKU", kicker="", sub="", data=["hud5"],
         say="Tapi *tujuh puluh* gelas laku. Kas jadi *{kas|w}*, dan pelanggan tetap... *tetap dateng*."),
    dict(id="s7", type="M3_SPANDUK", kicker="", sub="", data=["hud5"],
         say="Sorenya, Bang Rudi pasang spanduk baru: *kopi dua ribu*!"),
    dict(id="s8", type="M3_AJAK", kicker="", sub="", data=["hud5"],
         say="Komen *A, ikut turun harga*, atau *B, menu baru* yang Rudi nggak punya. Follow, jadi pelanggan tetap. Besok... utang gue masih *nol*?"),
]
SFX = [("s1", 0.0, "ding", .9), ("s2", "Sah", "gedebuk", .9), ("s3", "follow", "ding", .7), ("s4", "nanti", "whoosh", .8), ("s5", "habis", "gedebuk", .7), ("s5", "ampas", "pop", .9),
       ("s6", "dateng", "sorak", .6), ("s7", "ribu", "kentongan", .9), ("s8", r"^A,?$", "pop", .8), ("s8", r"^B,?$", "pop", .8)]
SPLIT_SHIFT = {4: 2, 5: 2, 6: 1}   # transkrip per potongan: batas s5->s6, s6->s7, s7->s8 kecepetan satu jeda
END_PAD = 1.0
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
