"""Kades Magang Juara Hari 4 (3D): kejadian malam (desa gelap, kucing oyen hilang), info lampu jalan tenaga surya, quest follower.

Dibuat 9 Nov 2026 bersama Hari 3 atas perintah pemilik ("pakai komen yang ada biar episode bareng"). Voting Hari 3 (A kebun / B pos ronda)
diumumkan di Hari 5. Usulan yang dikutip (komentar 8 Nov): tambah mobil (kaivan), pemancingan (pbalap2823), kantor desa (acara topeng 4A),
pagar desa (moon). Nama pengguna disamarkan.
Mekanik baru (variasi): tiap 10 follower baru akun Kades (gabungan 3 platform, dihitung di Hari 5 dibanding 10 Nov pagi) = 1 lampu jalan tenaga surya.
Sumber lampu tenaga surya (dicek 9 Nov 2026): panel mengisi baterai siang hari, sensor cahaya menyalakan lampu otomatis saat gelap, tidak perlu
jaringan kabel listrik, cocok untuk desa: https://en.wikipedia.org/wiki/Solar_street_light , https://home.howstuffworks.com/solar-light.htm"""

META = dict(format="serial Hari N (kejadian)", pilar="bangun desa", tokoh="Kades Juara, warga, kucing oyen", lokasi="desa malam, gang senter, atap sumur, lampu surya siang/malam, papan usulan",
            hook="malam pertama, desa gelap, kucing oyen hilang", variasi="plot kecil + follower jadi fasilitas", interaksi="10 follower = 1 lampu surya")
PREV = dict(hari=3, penduduk=7, anggaran=15)
PARAMS = dict(senter=3, follower_per_lampu=10)


def compute(p=PARAMS):
    assert PREV["penduduk"] == 7
    return dict(hud=dict(hari=4, penduduk=PREV["penduduk"], anggaran=PREV["anggaran"]), senter=p["senter"], per=p["follower_per_lampu"],
                usulan=[["@ka***", "bg tambah mobil"], ["@pb***", "bang bikin pemancing"], ["@ac***", "bikin kantor desa"]])


SCENES = [
    dict(id="s1", type="K4_DARK_HOOK", kicker="HARI 4", sub="malam pertama",
         say="Hari keempat. Malam pertama di rumah baru, dan desa *gelap gulita*. Tiba-tiba ada yang teriak: *kucing oyen hilang*!", data=["hud"]),
    dict(id="s2", type="K4_SEARCH", kicker="CARI OYEN", sub="pakai senter",
         say="Warga keluar bawa senter. Masalahnya, desa ini belum punya *listrik*, apalagi lampu jalan. Senternya cuma *{senter|w}*, dan semuanya hampir habis baterai.", data=["hud", "senter"]),
    dict(id="s3", type="K4_FOUND", kicker="KETEMU!", sub="di atap sumur",
         say="Ketemu! Oyen lagi nangkring di *atap sumur*, santai banget. Semua lega. Tapi kades jadi sadar: desa yang gelap itu *rawan*, buat anak-anak dan buat warga yang pulang malam.", data=["hud"]),
    dict(id="s4", type="K4_SOLAR", kicker="INFO DESA", sub="lampu tenaga surya",
         say="Banyak desa memakai lampu jalan *tenaga surya*. Siang hari, panelnya mengisi *baterai*. Begitu gelap, sensor menyalakan lampunya sendiri. Nggak perlu tarik kabel listrik yang panjang.", data=["hud"]),
    dict(id="s5", type="K4_IDEAS", kicker="USULAN MASUK", sub="dicatat kades",
         say="Sambil nunggu hasil voting kebun atau pos ronda, usulan lain terus masuk: tambah *mobil*, kolam *pemancingan*, sampai *kantor desa*. Semuanya dicatat di buku desa.", data=["hud", "usulan"]),
    dict(id="s6", type="K4_FOLLOW", kicker="QUEST MALAM", sub="follower = lampu",
         say="Quest malam ini beda: tiap *{per|w} follower baru* di akun ini, desa dapat *satu lampu jalan* tenaga surya. Follow, ajak teman, terus lihat desanya makin terang *beberapa hari lagi*!", data=["hud", "per"]),
]
END_PAD = 2.5
