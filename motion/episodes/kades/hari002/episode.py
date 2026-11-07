"""Kades Magang Juara Hari 2 (3D): hasil voting Hari 1 = B (sumur), lalu lima keluarga butuh rumah.

Voting Hari 1 (dibaca lewat Repliz 6 Nov 2026 ±19:50 WIB, sebelum 24 jam): komentar masuk hanya di TikTok, 2 komentar dari 1 akun:
"bang bikin rumah" (bukan A/B) dan "bikin banyak air dulu bang" (= B sumur). IG dan YouTube belum ada komentar.
Keputusan pemilik: pemenang = komentar pertama yang memilih (B). Nama pengguna disamarkan di video.
Biaya adalah anggaran permainan (fiksi), bukan harga nyata."""

PREV = dict(hari=1, penduduk=5, keluarga=5, anggaran=100_000_000, biaya_sumur=25_000_000)
VOTE = dict(A=0, B=1, sumber="TikTok", aturan="komentar pertama (keputusan pemilik)")
PARAMS = dict(biaya_deret=40_000_000, biaya_jarak=60_000_000)


def compute(p=PARAMS):
    sisa = PREV["anggaran"] - PREV["biaya_sumur"]; assert sisa == 75_000_000
    sisa_a = sisa - p["biaya_deret"]; sisa_b = sisa - p["biaya_jarak"]; assert sisa_a == 35_000_000 and sisa_b == 15_000_000
    j = lambda x: x // 1_000_000
    return dict(hud=dict(hari=2, penduduk=PREV["penduduk"], anggaran=j(sisa)), vote=VOTE,
                juta_sumur=j(PREV["biaya_sumur"]), juta_sisa=j(sisa), juta_a=j(p["biaya_deret"]), juta_b=j(p["biaya_jarak"]), juta_sisa_a=j(sisa_a), juta_sisa_b=j(sisa_b),
                komentar=[["@😶***", "bang bikin rumah"], ["@😶***", "bikin banyak air dulu bang"]])


SCENES = [
    dict(id="s1", type="K3_HOOK2", kicker="HARI 2", sub="hasil voting", say="Hari kedua. Komentar pertama sudah masuk, dan kalian pilih *B*: bangun *sumur* dulu. Kades Juara langsung kerja. Tapi ternyata, ada masalah baru yang lebih besar.", data=["hud", "vote"]),
    dict(id="s2", type="K3_COMMENTS", kicker="KATA KALIAN", sub="komentar penonton", say="Komentar pertama bilang: bikin banyak *air* dulu, bang. Dan satu lagi: bang, bikin *rumah*. Dua-duanya Kades catat di buku desa.", data=["hud", "komentar"]),
    dict(id="s3", type="K3_SUMUR", kicker="SUMUR BOR", sub="dibangun hari ini", say="Sumur bor dibangun di tengah desa. Biayanya *{juta_sumur|w} juta*, sisa anggaran tinggal *{juta_sisa|w} juta*. Warga pertama langsung *antre* ambil air bersih.", data=["hud", "juta_sumur", "juta_sisa"]),
    dict(id="s4", type="K3_FAMILIES", kicker="MASALAH BARU", sub="belum ada rumah", say="Masalahnya, lima keluarga sudah datang, dan mereka masih tidur di *tenda*. Komentar tadi benar: desa ini butuh *rumah*.", data=["hud"]),
    dict(id="s5", type="K3_CHOICE", variant="A", kicker="PILIHAN A", sub="rumah deret", say="Pilihan *A*: rumah *deret* yang rapat. Biayanya *{juta_a|w} juta* untuk lima rumah, lahannya hemat. Tapi rumahnya sempit, dan kalau ada kebakaran, api gampang *merambat*.", data=["hud", "juta_a", "juta_sisa_a"]),
    dict(id="s6", type="K3_CHOICE", variant="B", kicker="PILIHAN B", sub="rumah berjarak", say="Pilihan *B*: rumah *berjarak* dengan halaman. Biayanya *{juta_b|w} juta*, sisa anggaran tinggal *{juta_sisa_b|w} juta*. Tapi rumahnya lega, terang, dan lebih aman.", data=["hud", "juta_b", "juta_sisa_b"]),
    dict(id="s7", type="K3_VOTE", kicker="KALIAN PILIH", sub="voting Hari 3", say="Tulis *A* atau *B* di komentar. Komentar yang menarik bisa muncul di video berikutnya. Sampai jumpa di *Hari 3*!", data=["hud"]),
]
END_PAD = 2.0
