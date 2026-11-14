"""Denah Rumah Dunia "Bumi Kita" Hari 8 (tayang 15 Nov 2026 malam): pajak pertama (hasil Lore #2 seri -> Kepala Bumi memilih), klinik dibangun,
kejadian malam di klinik, pelajaran layanan kesehatan dekat permukiman, target like untuk stadion.

Lore #2 (aturan pajak) dibaca 14 Nov 2026: IG A "lebar tanah" (rollaandd_), YouTube C (@Yahya...), IG "g usah dipajakin" (m.coffest) -> A 1 : C 1 seri
-> Kepala Bumi memilih A (lebar muka rumah), mengikuti rumah kanal Amsterdam dari Lore #2 (sumber di lore02/episode.py).
Pajak pertama 40 koin (rekaan). Koin 150 + 40 - klinik 180 = 10. Klinik = pemenang voting Hari 6 (dihitung di Hari 7).
Kejadian (fiksi): mandor baru (@ig***, pendaftar IG Hari 5) terkilir di proyek malam hari, ditolong di klinik.
Pelajaran umum (tanpa angka): layanan kesehatan dekat permukiman mempercepat pertolongan pertama.
Stadion diminta 3 kali (Hari 3/5). Interaksi (variasi): target like 200 (3 platform) = stadion mini dibangun; hasil dua hari lagi."""

META = dict(format="serial Hari N (kejadian)", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal, mandor (penonton)", lokasi="koper koin kosong, deretan rumah kanal + petugas pajak, klinik berdiri, malam klinik menyala, peta jarak klinik, lahan stadion",
            hook="kurang 30 koin, Kepala Bumi pakai pajak", variasi="plot kejadian + target like", interaksi="200 like = stadion mini, hasil dua hari lagi", suara="Sulafat")
PREV = dict(hari=7, penduduk=47, koin=150)
VOTE_PAJAK = dict(A=1, B=0, C=1)
PARAMS = dict(pajak=40, klinik=180, target_like=200)


def compute(p=PARAMS):
    koin1 = PREV["koin"] + p["pajak"]; koin = koin1 - p["klinik"]
    assert VOTE_PAJAK["A"] == VOTE_PAJAK["C"] and koin1 == 190 and koin == 10
    return dict(state=dict(hari=8, penduduk=PREV["penduduk"], koin=koin, negara=["Indonesia"], kota="Jakarta"), pajak=p["pajak"], koin1=koin1, klinik=p["klinik"], koin=koin,
                kurang=p["klinik"] - PREV["koin"], target=p["target_like"])


SCENES = [
    dict(id="s1", type="D_H008_HOOK", kicker="HARI 8", sub="kurang 30 koin",
         say="Hari kedelapan. Klinik menang voting, tapi koper Juragan kurang *{kurang|w} koin*. Kepala Bumi punya satu jalan keluar yang nggak disukai siapa pun: *pajak*.", data=["state", "kurang"]),
    dict(id="s2", type="D_H008_TAX", kicker="ATURAN PAJAK", sub="hasil Lore Bumi",
         say="Voting pajak di Lore Bumi *seri*: lebar rumah lawan tinggi rumah. Kepala Bumi memilih *lebar rumah*, seperti rumah kanal di Belanda. Pajak pertama terkumpul: *{pajak|w} koin*.", data=["state", "pajak"]),
    dict(id="s3", type="D_H008_CLINIC", kicker="KLINIK BERDIRI", sub="sisa 10 koin",
         say="Koin di koper jadi *{koin1|w}*. Klinik langsung dibangun, harganya *{klinik|w} koin*. Sisa koin tinggal *{koin|w}*. Juragan memeluk kopernya yang hampir kosong.", data=["state", "koin1", "klinik", "koin"]),
    dict(id="s4", type="D_H008_NIGHT", kicker="TENGAH MALAM", sub="pasien pertama",
         say="Tengah malam, *mandor* baru kita terpeleset di proyek, kakinya *terkilir*. Untung klinik baru buka. Lampunya masih menyala, dan dia langsung *ditangani* malam itu juga.", data=["state"]),
    dict(id="s5", type="D_H008_LESSON", kicker="PELAJARAN", sub="dekat itu penting",
         say="Pelajarannya: klinik sebaiknya dibangun *dekat permukiman*. Makin dekat, makin *cepat* orang ditolong, apalagi kalau kejadiannya tengah malam.", data=["state"]),
    dict(id="s6", type="D_H008_ASK", kicker="TARGET LIKE", sub="stadion mini",
         say="Tiga orang minta *stadion*. Deal: kalau video ini tembus *{target|w} like* di semua platform, *stadion mini* langsung dibangun. Hasilnya *dua hari lagi*.", data=["state", "target"]),
]
END_PAD = 3.0
