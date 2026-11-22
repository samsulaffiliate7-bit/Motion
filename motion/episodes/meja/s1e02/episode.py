"""Meja Seberang Bos · Season 1 "Dari Warung Lipat" · Episode 2 "Kopi Susu" (tayang 23 Nov 2026).
Storyboard: STORYBOARD.md. Narator Bima (Puck, flash). Konsep: docs/konsep/S1-EP2.md.

Data interaksi (docs/data/2026-11-22-ep1.md, ditarik 22 Nov ±21:00 WIB; komentar dibaca langsung ±21:15; statistik Repliz ter-cache 6 jam):
- Pilihan Ep 1 (lawan kopi gratis pakai apa): kopi susu kekinian 1 (YT); lain "tutup aja" 1 -> jadi lelucon "usul ditolak rapat".
- Like Aturan Main (3 + 48 + 30 = 81) + Ep 1 (3 + 1 + 31 = 35) = 116 -> Rp5.000/like = +Rp580.000 modal.
- Follow sejak patokan 20 Nov 22:00: TikTok 0, IG 3 -> 5 = +2, YT 23 -> 35 = +12 -> +14 -> pelanggan tetap 3 -> 17. Patokan baru (22 Nov 21:00): IG 5, YT 35.

Sumber angka (kisaran harga 2025-2026, tanpa merek):
- Susu kental manis kaleng ±370 g: ±Rp12.000-14.000 -> 6 x Rp13.000 = Rp78.000.
- Gula aren 1 kg: ±Rp25.000-35.000 -> Rp30.000. Kopi bubuk 500 g: ±Rp45.000-60.000 -> Rp50.000.
- Gelas plastik cup + tutup 100 pcs: ±Rp40.000-50.000 -> Rp45.000.
- Kopi susu gula aren kaki lima: ±Rp5.000-10.000/gelas -> Rp5.000 (harga murah). 60 gelas.
- Utang Mak Ijah Ep 1 Rp15.000 + 2 kopi susu.
- Tawaran Tono: stok sebulan Rp3.000.000, bayar belakangan (fiksi; menuju babak 2 "utang menumpuk").
"""

META = dict(format="serial Season 1", pilar="bangun usaha dari nol", tokoh="Bima, Mak Ijah, Bang Rudi, Tono, ojol, anak sekolah", lokasi="gang dua lapak, teras rapat, meja resep, warung ramai, pikap grosir",
            hook="kopi gratis kalah sama kopi lima ribu", variasi="episode 2", interaksi="komen: ambil stok Tono / beli sedikit tunai / patungan sama Mak Ijah", suara="Puck", season=1, episode=2, babak=1)
KAS_EP1, PEL_EP1, UTANG_EP1 = 353_000, 3, 15_000
LIKE = dict(aturan=dict(tiktok=3, ig=48, youtube=30), ep1=dict(tiktok=3, ig=1, youtube=31))
FOLLOW = dict(tiktok=0, ig=5 - 3, youtube=35 - 23)
VOTE = dict(kopi_susu=1, gorengan=0, datengin=0)
BELANJA = dict(susu=6 * 13_000, aren=30_000, kopi=50_000, cup=45_000)
JUAL = dict(harga=5_000, gelas=60)
STOK_TONO = 3_000_000


def compute():
    like = sum(sum(v.values()) for v in LIKE.values()); follow = sum(FOLLOW.values()); modal = like * 5_000
    kas1 = KAS_EP1 + modal; belanja = sum(BELANJA.values()); kas2 = kas1 - belanja; omzet = JUAL["harga"] * JUAL["gelas"]; kas3 = kas2 + omzet
    pel = PEL_EP1 + follow; utang = UTANG_EP1 + 2 * JUAL["harga"]
    assert max(VOTE, key=VOTE.get) == "kopi_susu"
    assert like == 116 and modal == 580_000 and follow == 14 and pel == 17 and kas1 == 933_000 and belanja == 203_000 and kas2 == 730_000 and kas3 == 1_030_000 and utang == 25_000
    assert STOK_TONO > kas3   # stok Tono melebihi kas -> godaan utang
    top = "EP 2 · HARI 3"; H = lambda p, k: dict(top=top, pelanggan=p, kas=k)
    return dict(hud=H(PEL_EP1, KAS_EP1), hud3=H(pel, kas1), hud4=H(pel, kas2), hud5=H(pel, kas3), like=like, modal=modal, follow=follow, pel0=PEL_EP1, pel=pel, kas1=kas1,
                belanja=belanja, harga=JUAL["harga"], gelas=JUAL["gelas"], utang0=UTANG_EP1, utang=utang, stok=STOK_TONO, kurs_like=5_000)


SCENES = [
    dict(id="s1", type="M2_HOOK", kicker="", sub="", data=["hud"],
         say="Kopi *gratis*... kalah sama kopi *lima ribu*? Kok bisa?"),
    dict(id="s2", type="M2_RAPAT", kicker="", sub="", data=["hud"],
         say="Rapat kemarin: *kopi susu kekinian* menang satu kosong. Ada juga usul *tutup aja*... ditolak rapat."),
    dict(id="s3", type="M2_MODAL", kicker="", sub="", data=["hud3", "like", "modal", "follow", "pel"],
         say="*{like|w}* like, modal nambah *{modal|w}*. *{follow|w}* follow, pelanggan tetap jadi *{pel|w}*."),
    dict(id="s4", type="M2_RESEP", kicker="", sub="", data=["hud4", "belanja"],
         say="Belanja susu, gula aren, sama gelas cup. Percobaan satu: *kemanisan*. Dua: *kepaitan*. Tiga... *pas*."),
    dict(id="s5", type="M2_LAKU", kicker="", sub="", data=["hud5", "gelas", "harga"],
         say="Harganya cuma lima ribu. Ojol antre, anak sekolah antre. *Enam puluh* gelas, habis sebelum jam sepuluh."),
    dict(id="s6", type="M2_IJAH", kicker="", sub="", data=["hud5", "utang0", "utang"],
         say="Mak Ijah juga antre. Utangnya sekarang... *dua puluh lima ribu*."),
    dict(id="s7", type="M2_TONO", kicker="", sub="", data=["hud5", "stok"],
         say="Sorenya, *Tono*, sales grosir, dateng bawa pikap. Stok sebulan, bayarnya *belakangan*. Dan Bang Rudi... *ngintip*."),
    dict(id="s8", type="M2_AJAK", kicker="", sub="", data=["hud5", "kurs_like"],
         say="*Follow*, jadi pelanggan tetap. *Like*, modal nambah lima ribu. *Komen*: gue ambil yang mana? *Stok Tono*, *beli sedikit tunai*, atau *patungan sama Mak Ijah*?"),
]
END_PAD = 1.2
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
