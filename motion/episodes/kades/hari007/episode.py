"""Kades Magang Juara Hari 7 (tayang 15 Nov 2026 pagi): 1.200 warga baru sekaligus (Hari 5 viral), nama desa Banyusegara, kebun menang,
tandon menang, 94 lampu surya dari follower, pilihan rumah untuk ribuan warga.

Data dibaca lewat Repliz 14 Nov 2026 ±08:00-08:45 WIB (catatan lengkap: arsip status-2026-11-15):
- Komentar WARGA / "aku warga": Hari 5 TikTok 1.386 komentar (32.016 view, 523 like, +934 follower dari video ini). Sampel 180 komentar dibaca penuh:
  ±85% berisi WARGA. Ditambah Side Quest #3 TikTok (91 komentar, ±80% WARGA/pendaftar berprofil), Hari 6 TikTok (51), YouTube/IG Hari 5-6.
  Estimasi pendaftar unik ±1.200 (tidak bisa dibaca satu per satu; dihitung dari sampel). Keputusan pemilik 14 Nov: semua langsung jadi warga.
  Penduduk: 20 (Hari 5) + 7 (pendaftar YouTube Hari 3 + SQ#2, dihitung 10 Nov) + 1.200 = 1.227.
- Voting Hari 3 (A kebun / B pos ronda): TikTok A 3 (oyenn✨, Otter, xybimsz) B 2 (FAREL, KOPRASI...), IG A 1 (shansxart),
  YouTube A 3 (NuzulFitri, AbdurRahim, AiniFadilah) B 2 (AisyahRamadani, sigma) -> A 7, B 4 = kebun. Bonus like Hari 3: 17+4+17 = 38 < 100.
- Voting Hari 5 (A sumur kedua / B tandon): sampel 180 komentar TikTok: B ±25, A ±1 (FARM AYAM "A dan B bagus") -> B tandon.
- Quest lampu surya (Hari 4: 10 follower baru = 1 lampu): follower 10 Nov 15:40 WIB = 41 (TT 20, YT 13, IG 8); 14 Nov = 987 (TT 914, YT 39, IG 34);
  baru 946 -> 94 lampu (hadiah quest, tidak memotong anggaran).
- Nama desa (Side Quest #2, like komentar TikTok via TikWM): "rusdiana" 6 like (mirip nama orang, tidak dipakai), "Banyusegara" 4 like (@Bi***),
  keputusan pemilik 14 Nov: Banyusegara.
- Easter egg sapi: @Ra*** (YouTube SQ#2) "daftar jadi sapi".
- Pendaftar berprofil (nama disamarkan): penari (@AI***, @no***), satpam (@ba***), guru (@-𝒃***, @KE***), kurir paket (@LA***), tukang cukur (@ci***),
  ojol (@ir***), TNI (@li***), editor (@Ma***), penjaga pos ronda (@Mi***, @DI***).
Biaya (fiksi): kebun 10 juta, tandon 12 juta. Anggaran 65 - 10 - 12 = 43 juta.
Interaksi: A rumah susun / B perumahan baru di lahan timur, hasil dua hari lagi."""

META = dict(format="serial Hari N", pilar="bangun desa", tokoh="Kades Juara, 1.200 warga baru, sapi, kucing oyen", lokasi="desa diserbu antrean raksasa, papan suara, gapura Banyusegara, tandon + kebun, lampu surya, dua lahan pilihan",
            hook="1.200 warga baru dalam semalam", variasi="hook angka + komentar jadi konten", interaksi="A rumah susun / B perumahan baru, hasil dua hari lagi", suara="Achird")
VOTE_H3 = dict(TikTok=(3, 2), IG=(1, 0), YouTube=(3, 2))
LIKE_H3 = dict(TikTok=17, IG=4, YouTube=17)
FOLLOW = dict(awal=41, sekarang=914 + 39 + 34)
PREV = dict(hari=6, penduduk=20, anggaran=65_000_000)
PARAMS = dict(daftar_lama=7, daftar_baru=1200, kebun=10_000_000, tandon=12_000_000, per_lampu=10, target_like=100)


def compute(p=PARAMS):
    j = lambda x: x // 1_000_000
    a = sum(v[0] for v in VOTE_H3.values()); b = sum(v[1] for v in VOTE_H3.values()); like = sum(LIKE_H3.values())
    baru_f = FOLLOW["sekarang"] - FOLLOW["awal"]; lampu = baru_f // p["per_lampu"]
    pend = PREV["penduduk"] + p["daftar_lama"] + p["daftar_baru"]; ang = PREV["anggaran"] - p["kebun"] - p["tandon"]
    assert (a, b) == (7, 4) and like == 38 and baru_f == 946 and lampu == 94 and pend == 1227 and ang == 43_000_000
    return dict(hud=dict(hari=7, penduduk=pend, anggaran=j(ang)), a=a, b=b, like=like, target=p["target_like"], baru=p["daftar_baru"], pend=pend,
                follow=baru_f, lampu=lampu, juta_kebun=j(p["kebun"]), juta_tandon=j(p["tandon"]), juta_ang=j(ang), nama_desa="BANYUSEGARA",
                profil=[["@AI***", "penari"], ["@ba***", "satpam"], ["@KE***", "guru"], ["@LA***", "kurir paket"], ["@ci***", "tukang cukur"], ["@ir***", "ojol"], ["@li***", "TNI"], ["@Ma***", "editor"]])


SCENES = [
    dict(id="s1", type="K_H007_HOOK", kicker="HARI 7", sub="desa diserbu",
         say="Hari ketujuh. Kades bangun pagi, dan di depan gapura ada antrean *seribu dua ratus orang*. Semuanya komen WARGA. Mulai hari ini, mereka semua *resmi* jadi warga!", data=["hud", "baru"]),
    dict(id="s2", type="K_H007_WARGA", kicker="WARGA BARU", sub="ada penari sampai TNI",
         say="Ada yang datang lengkap dengan profesinya: *penari*, satpam, guru, kurir paket, tukang cukur, ojol, sampai *TNI*. Ada juga yang daftar jadi *sapi*. Oke, desa kita punya sapi. Penduduk sekarang *{pend|w} orang*!", data=["hud", "pend", "profil"]),
    dict(id="s3", type="K_H007_GAPURA", kicker="NAMA DESA", sub="like terbanyak",
         say="Desa sebesar ini wajib punya nama. Dari usulan kalian, gapura kita resmi bertuliskan *Desa Banyusegara*. Banyu artinya *air*, cocok buat desa yang dimulai dari sumur.", data=["hud", "nama_desa"]),
    dict(id="s4", type="K_H007_TALLY", kicker="HASIL VOTING", sub="kebun dan tandon",
         say="Voting kebun atau pos ronda: *kebun* menang, *{a|w} lawan {b|w}*. Bonus seratus like belum tembus, jadi pos ronda ditunda. Voting sumur atau tandon: *tandon* menang telak. Anggaran tinggal *{juta_ang|w} juta*.", data=["hud", "a", "b", "like", "juta_ang"]),
    dict(id="s5", type="K_H007_LAMP", kicker="LAMPU SURYA", sub="hadiah follower",
         say="Dan quest follower kalian *gila*: *{follow|w} follower baru*! Tiap sepuluh follower satu lampu, jadi desa dapat *{lampu|w} lampu jalan* tenaga surya. Malam ini desa kita bakal *terang benderang*.", data=["hud", "follow", "lampu"]),
    dict(id="s6", type="K_H007_ASK", kicker="KALIAN PILIH", sub="rumah buat ribuan warga",
         say="Tapi rumahnya cuma *lima*. Pilihan *A*: bangun *rumah susun*, hemat lahan. Pilihan *B*: buka *perumahan baru* di lahan timur, lebih lega tapi kebun kegeser. Tulis A atau B, hasilnya *dua hari lagi*.", data=["hud"]),
]
END_PAD = 2.5
