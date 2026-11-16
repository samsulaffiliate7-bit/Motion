"""Denah Rumah Dunia "Bumi Kita" Hari 5 (tayang 11 Nov 2026 pagi): pendatang dari komentar, ketua tukang, kos-kosan, aturan baru like = koin.

Komentar dipakai (dibaca lewat Repliz 9 Nov 2026 ±18:55 WIB): TikTok Hari 2 stecu "aku min pingin jadi ketua tukang", TikTok info RTH hahhh "aku plis masukin",
TikTok Hari 2 AnomaliYangMungkin "bikin aja noh kosan" (usulan bangunan pertama dari Hari 2), YouTube Hari 1 @AidanRadinka "Sumedang dong kak udah subs".
Pendatang = 2 akun yang minta masuk (stecu, hahhh) -> penduduk 10 + 2 = 12. Like Hari 2 (TikTok 3, baru ±8 jam) dihitung nanti.
Voting Hari 3 (A bus / B kereta) belum bisa dihitung (Hari 3 tayang 10 Nov), diumumkan sesudahnya.
Mekanik baru (variasi): tiap 10 like video ini = +10 koin untuk Juragan (dihitung di episode yang diproduksi sesudah tayang).
Kos-kosan dekat tempat kerja: pengetahuan umum, tanpa angka. Koin = mata uang rekaan."""

META = dict(format="serial Hari N", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal, ketua tukang (penonton)", lokasi="gerbang kota pagi, papan pendatang, proyek kos, kos jadi, koper koin + hati like",
            hook="penonton daftar jadi ketua tukang", variasi="komentar jadi konten", interaksi="10 like = 10 koin (dana kereta)", suara="Sulafat")
PREV = dict(hari=4, penduduk=10, koin=300)
PARAMS = dict(biaya_kos=100, kamar=8)


def compute(p=PARAMS):
    pend = PREV["penduduk"] + 2; koin = PREV["koin"] - p["biaya_kos"]; assert pend == 12 and koin == 200
    return dict(state=dict(hari=5, penduduk=pend, koin=koin, negara=["Indonesia"], kota="Jakarta"), pend=pend, koin=koin, biaya=p["biaya_kos"], kamar=p["kamar"],
                komentar=[["@st***", "aku min pingin jadi ketua tukang"], ["@ha***", "aku plis masukin"], ["@An***", "bikin aja noh kosan"], ["@Ai***", "Sumedang dong kak"]])


SCENES = [
    dict(id="s1", type="D_H005_HOOK", kicker="HARI 5", sub="ada yang daftar kerja",
         say="Hari kelima. Ada penonton yang daftar jadi *ketua tukang* Bumi Kita! Oke, lamaran diterima. Mulai hari ini, kota kita punya *mandor*.", data=["state", "komentar"]),
    dict(id="s2", type="D_H005_ARRIVE", kicker="PENDATANG", sub="dari komentar",
         say="Ada juga yang minta: *masukin aku* dong. Siap. Dua pendatang baru dari komentar, penduduk jadi *{pend|w} orang*. Ada yang minta *Sumedang* juga, dicatat buat nanti.", data=["state", "pend", "komentar"]),
    dict(id="s3", type="D_H005_IDEA", kicker="USULAN PERTAMA", sub="kos-kosan",
         say="Usulan bangunan yang masuk: *kos-kosan*. Pas banget. Banyak pekerja di kota masih *sendiri*, belum butuh rumah utuh, cukup satu kamar dekat tempat kerja.", data=["state", "komentar"]),
    dict(id="s4", type="D_H005_BUILD", kicker="DIBANGUN", sub="kos dua lantai",
         say="Ketua tukang langsung kerja. Kos dua lantai, *{kamar|w} kamar*, persis di samping pasar. Juragan bayar *{biaya|w} koin*, sisa di koper tinggal *{koin|w}*.", data=["state", "kamar", "biaya", "koin"]),
    dict(id="s5", type="D_H005_WALK", kicker="ENAKNYA", sub="kerja jalan kaki",
         say="Penghuni kos tinggal jalan kaki ke pasar. Nggak perlu ongkos, nggak kena *macet*. Kota yang rapat begini bikin uang warga lebih *awet*.", data=["state"]),
    dict(id="s6", type="D_H005_RULE", kicker="ATURAN BARU", sub="like = koin",
         say="Tapi koin tinggal *{koin|w}*, padahal kereta mahal. Jadi ada aturan baru: tiap *sepuluh like* video ini, Juragan dapat *sepuluh koin*. Hasil voting bus atau kereta, *dua hari lagi*.", data=["state", "koin"]),
]
END_PAD = 2.0
