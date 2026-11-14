"""Kades Magang Juara Hari 5 (tayang 11 Nov 2026 pagi): hasil quest WARGA (Side Quest #1), dana tahap dua cair, sumur antre, pilihan A sumur kedua / B tandon + pipa.

Komentar "WARGA" di Side Quest #1 (dibaca lewat Repliz 9 Nov 2026 ±18:55 WIB; satu akun satu suara):
- YouTube 7: @AlesaZahra-b9x, @TacticalElit3, @Avatar-g2t, @Hapsi651, @zaajaadeh, @TsaqibHafizh, @haidirali9517
- TikTok 5: 😛📱🫵, IRUL★™®, pbalap2823, SANZZ JR, 𝘼.𝙓.𝙎 (juga bertanya "pak saya mau gabung gimana caranya")
- IG 1: banmor24
Total 13 -> penduduk 7 (Hari 3) + 13 = 20. Nama di video disamarkan.
Voting Hari 3 (A kebun / B pos ronda) belum bisa dihitung (Hari 3 tayang 10 Nov), diumumkan di episode berikutnya yang diproduksi sesudahnya.
Dana desa tahap dua (+50 juta) = keputusan cerita (fiksi, anggaran permainan). Usulan lain yang masuk: pos kamling (Kyoshi Glenn), perkebunan (pbalap2823)."""

META = dict(format="serial Hari N", pilar="bangun desa", tokoh="Kades Juara, 13 warga baru, kucing oyen", lokasi="gapura pagi, papan nama warga, perkemahan tenda, antrean sumur, dua lokasi pilihan, balai voting",
            hook="13 warga baru sekaligus", variasi="hook angka + komentar jadi konten", interaksi="A sumur kedua / B tandon + pipa, hasil dua hari lagi", suara="Achird")
WARGA = dict(YouTube=7, TikTok=5, IG=1)
PREV = dict(hari=4, penduduk=7, anggaran=15_000_000, rumah=5)
PARAMS = dict(dana2=50_000_000, sumur2=10_000_000, tandon=12_000_000)


def compute(p=PARAMS):
    j = lambda x: x // 1_000_000
    baru = sum(WARGA.values()); pend = PREV["penduduk"] + baru; ang = PREV["anggaran"] + p["dana2"]
    assert baru == 13 and pend == 20 and ang == 65_000_000
    return dict(hud=dict(hari=5, penduduk=pend, anggaran=j(ang)), baru=baru, pend=pend, yt=WARGA["YouTube"], tt=WARGA["TikTok"], ig=WARGA["IG"], rumah=PREV["rumah"],
                juta_ang=j(ang), juta_sumur=j(p["sumur2"]), juta_tandon=j(p["tandon"]),
                nama=["@Al***", "@Ta***", "@Av***", "@Ha***", "@za***", "@Ts***", "@ha***", "@😛***", "@IR***", "@pb***", "@SA***", "@A.***", "@ba***"])


SCENES = [
    dict(id="s1", type="K_H005_HOOK", kicker="HARI 5", sub="quest WARGA meledak",
         say="Hari kelima. Quest WARGA kemarin meledak: *{baru|w} orang* komen WARGA. Desa kita kedatangan tiga belas penduduk baru *sekaligus*!", data=["hud", "baru"]),
    dict(id="s2", type="K_H005_LIST", kicker="DATANG DARI", sub="tiga platform",
         say="*{yt|w}* dari YouTube, *{tt|w}* dari TikTok, *{ig|w}* dari Instagram. Ada juga yang nanya: pak, gimana caranya gabung? Jawabannya ya itu tadi: komen *WARGA*.", data=["hud", "yt", "tt", "ig", "nama"]),
    dict(id="s3", type="K_H005_TENTS", kicker="PENDUDUK 20", sub="rumahnya cuma 5",
         say="Penduduk sekarang *{pend|w}*. Tapi rumahnya cuma *{rumah|w}*. Kabar baiknya, dana desa tahap dua cair: anggaran jadi *{juta_ang|w} juta*. Sementara itu, warga baru tidur di *tenda* dulu.", data=["hud", "pend", "rumah", "juta_ang"]),
    dict(id="s4", type="K_H005_QUEUE", kicker="MASALAH BARU", sub="antre air",
         say="Masalah lain muncul pagi ini: sumur cuma *satu*. Antreannya panjang banget, ember sampai ke jalan, dan ada yang mulai *rebutan*.", data=["hud"]),
    dict(id="s5", type="K_H005_CHOICE", kicker="PILIHAN", sub="A atau B",
         say="Pilihan *A*: bikin *sumur kedua* di ujung desa, *{juta_sumur|w} juta*. Pilihan *B*: *tandon air* dan pipa ke tiap rumah, *{juta_tandon|w} juta*. Lebih nyaman, tapi lebih mahal dan butuh pompa.", data=["hud", "juta_sumur", "juta_tandon"]),
    dict(id="s6", type="K_H005_VOTE", kicker="KALIAN PILIH", sub="hasil dua hari lagi",
         say="Tulis *A* atau *B* di komentar, hasilnya *dua hari lagi*. Voting kebun atau pos ronda juga masih dihitung. Nanti malam: *hujan pertama* turun di desa.", data=["hud"]),
]
END_PAD = 2.0

