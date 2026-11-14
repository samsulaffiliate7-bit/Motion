"""Kades Magang Juara Hari 3 (3D): hasil voting Hari 2 = B (rumah berjarak), penduduk baru dari quest WARGA, pilihan kebun vs pos ronda.

Voting Hari 2 (dibaca lewat Repliz 9 Nov 2026 ±09:20 WIB, ±24 jam setelah tayang; satu akun satu suara, tiga platform):
- TikTok: B 7 (moon, pbalap2823, Edi Suriyanto, Raffa, "yang b, untuk menjaga privasi", jack_+_Black1305, IronClaw).
- IG: B 5 (hafiiz_adam354, antonibuaton360, b_aja_ah2, pirass.rass, lumzyyy023), A 1 (ahmddchyriii).
- YouTube: B 7 (NisrinnelieseCara, Hapsi651, albarra8590, norizanmat7726, naqnoy8548, bilad67, AdrielAriandie), A 1 (dzyadog_yt).
- Total B 19, A 2.
Usulan di komentar (dipakai sebagai pilihan Hari 3): perkebunan (moon, pbalap2823, dahlah), keamanan: pos ronda / pos satpam /
pagar desa / kantor polisi (acara topeng 4A, 😛📱🫵, moon, Anak PT ber6), apartemen, kantor desa, pemancingan, mobil.
Easter egg: oyenn✨ berkali-kali "mau jadi kucing oyen" -> desa dapat kucing oranye (nama pengguna disamarkan di video).
Quest WARGA (Side Quest #1, tayang 9 Nov 10:37 WIB): dihitung di Hari 5 (episode ini dibuat 9 Nov pagi sebelum Side Quest tayang, atas perintah pemilik
"pakai komen yang ada"). Penduduk baru Hari 3 = yang sudah "daftar" lewat komentar: 😛📱🫵 "gua mau jadi pos satpam desa" dan @Ch*** "Saya" (Hari 1) = +2.
Voting A/B Hari 3 diumumkan di episode yang diproduksi sesudah Hari 3 tayang (aturan LUSA 9 Nov: Hari 7, 12 Nov), Hari 4 = kejadian malam.
Bonus like: kalau like video Hari 3 (3 platform) >= 100, desa dapat dana tambahan dan dua-duanya dibangun di Hari 4.
Biaya = anggaran permainan (fiksi)."""

META = dict(format="serial Hari N", pilar="bangun desa", tokoh="Kades Juara, warga, kucing oyen", lokasi="kavling rumah, proyek bangunan, gapura, papan usulan, kebun, pos ronda malam",
            hook="19 lawan 2, tapi anggaran tinggal 15 juta", variasi="komentar jadi konten + target like", interaksi="A/B + bonus 100 like = dua-duanya")
PREV = dict(hari=2, penduduk=5, anggaran=75_000_000)
VOTE = dict(A=2, B=19)
WARGA_COUNT = 2          # pendaftar lewat komentar (bukan quest WARGA; quest dihitung di Hari 5)
PARAMS = dict(biaya_jarak=60_000_000, biaya_kebun=10_000_000, biaya_ronda=8_000_000, target_like=100)


def compute(p=PARAMS):
    j = lambda x: x // 1_000_000
    sisa = PREV["anggaran"] - p["biaya_jarak"]; assert sisa == 15_000_000
    assert p["biaya_kebun"] <= sisa and p["biaya_ronda"] <= sisa and p["biaya_kebun"] + p["biaya_ronda"] > sisa
    pend = PREV["penduduk"] + WARGA_COUNT
    return dict(hud=dict(hari=3, penduduk=pend, anggaran=j(sisa)), a=VOTE["A"], b=VOTE["B"], warga=WARGA_COUNT, pend=pend,
                juta_jarak=j(p["biaya_jarak"]), juta_sisa=j(sisa), juta_kebun=j(p["biaya_kebun"]), juta_ronda=j(p["biaya_ronda"]), target=p["target_like"],
                komentar=[["@mo***", "buat perkebunan bg, hasilnya bisa dimakan atau dijual"], ["@😛***", "tambahin pos satpam bang"], ["@AE***", "yang B, untuk menjaga privasi"]],
                usulan=["perkebunan", "pos ronda", "pagar desa", "kantor polisi", "apartemen", "kantor desa", "pemancingan"])


SCENES = [
    dict(id="s1", type="K3H3_HOOK", kicker="HARI 3", sub="suara kalian kompak",
         say="Hari ketiga. Suara kalian kompak banget: *{b|w}* orang pilih *B*, cuma *{a|w}* yang pilih A. Lima rumah berjarak langsung dibangun. Tapi anggarannya tinggal *{juta_sisa|w} juta*, dan warga minta macam-macam.", data=["hud", "a", "b"]),
    dict(id="s2", type="K3H3_BUILD", kicker="DIBANGUN", sub="rumah berjarak",
         say="Biayanya *{juta_jarak|w} juta*. Tiap rumah punya halaman, terang, dan kalau ada kebakaran, api nggak gampang *merambat*. Ada juga yang bilang: biar *privasi* warga tetap terjaga.", data=["hud", "juta_jarak", "komentar"]),
    dict(id="s3", type="K3H3_WARGA", kicker="PENDAFTAR", sub="penduduk baru",
         say="Ada juga yang daftar duluan lewat komentar: satu mau jadi *satpam* desa, satu lagi cuma bilang *saya*. Jadi penduduk sekarang *{pend|w}*. Bahkan ada yang daftar jadi *kucing oyen*. Oke, desa ini resmi punya kucing.", data=["hud", "warga", "pend"]),
    dict(id="s4", type="K3H3_WISH", kicker="USULAN KALIAN", sub="dicatat kades",
         say="Usulan kalian juga makin banyak: perkebunan, pos ronda, pagar desa, kantor polisi, sampai apartemen. Yang paling sering muncul ada dua: *kebun*, dan *keamanan*.", data=["hud", "usulan", "komentar"]),
    dict(id="s5", type="K3H3_KEBUN", kicker="PILIHAN A", sub="kebun desa",
         say="Pilihan *A*: buka *kebun* sayur dan buah. Biayanya *{juta_kebun|w} juta*. Hasil panennya bisa dimakan dan dijual, jadi desa punya *pemasukan*. Tapi panennya baru terasa beberapa minggu lagi.", data=["hud", "juta_kebun", "komentar"]),
    dict(id="s6", type="K3H3_RONDA", kicker="PILIHAN B", sub="pos ronda",
         say="Pilihan *B*: bangun *pos ronda* dan lampu jalan. Biayanya *{juta_ronda|w} juta*. Malam jadi lebih *aman*, warga gantian jaga. Tapi pos ronda nggak menghasilkan uang.", data=["hud", "juta_ronda", "komentar"]),
    dict(id="s7", type="K3H3_VOTE", kicker="KALIAN PILIH", sub="plus bonus like",
         say="Tulis *A* atau *B* di komentar, hasilnya diumumkan *dua hari lagi*. Bonus: kalau video ini tembus *{target|w} like*, *dua-duanya* dibangun! Nanti malam di Hari 4, ada kejadian aneh di desa.", data=["hud", "target"]),
]
END_PAD = 2.0
