"""Denah Rumah Dunia, serial "Bumi Kita" Hari 2: hasil Hari 1 = B (kawasan usaha), +8 penduduk dari like, masalah pekerja tanpa rumah.

Interaksi Hari 1 (dibaca lewat Repliz 9 Nov 2026 ±09:20 WIB, ±25 jam setelah tayang; satu akun satu suara, tiga platform):
- A/B: B = 4 (YouTube @Ki***; IG demasonuli "B tidurnya di luar kota", gk_ada_nama_3344 "B, nanti bisa tidur di tempat kerja";
  TikTok "Sharing aja" "B. tempat usaha sudah biasa juga ditinggalin..."), A = 1 (YouTube @na***). Lainnya: "Dua duanya", "Jalan", usulan bangunan.
- Like video Hari 1: TikTok 11, IG 41, YouTube 32 = 84 -> +8 penduduk (aturan 10 like = +1).
- Komentar dipakai: YouTube @Om*** "Ngapain bawak coin orang disana aja gak ada"; IG @gk*** "nanti bisa tidur di tempat kerja";
  usulan: bandara, pelabuhan, PLTN (@fu***), mall, kereta, rumah sakit (@ka***), sawit (@Fu***), "tambahin orang minimal 20" (@ke***, video info).
- Negara tujuan: belum ada nama negara di komentar ("jawa" = pulau, bukan negara). Follower belum +50, paspor belum terbuka.
Koin = mata uang rekaan. Tidak ada fakta nyata baru yang perlu sumber."""

META = dict(format="serial Hari N", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal", lokasi="papan kota Jakarta, pasar, halte bus, pasar malam, dinding komentar",
            hook="kalian pilih B, tapi pekerjanya tidur di mana?", variasi="komentar jadi konten", interaksi="usulan bangunan bebas (bukan A/B) + like = penduduk")
PREV = dict(hari=1, penduduk=2, koin=1000)
VOTE = dict(A=1, B=4)
LIKES = dict(TikTok=11, IG=41, YouTube=32)
PARAMS = dict(biaya_usaha=400, like_per=10)


def compute(p=PARAMS):
    like = sum(LIKES.values()); baru = min(100, max(1, like // p["like_per"])); assert like == 84 and baru == 8
    pend = PREV["penduduk"] + baru; koin = PREV["koin"] - p["biaya_usaha"]; assert pend == 10 and koin == 600 and VOTE["B"] > VOTE["A"]
    return dict(state=dict(hari=2, penduduk=pend, koin=koin, negara=["Indonesia"], kota="Jakarta"), a=VOTE["A"], b=VOTE["B"], like=like, baru=baru, pend=pend,
                biaya=p["biaya_usaha"], koin=koin,
                komentar=[["@Om***", "ngapain bawa koin, orangnya aja gak ada 😂"], ["@gk***", "B, nanti bisa tidur di tempat kerja"]],
                usulan=["bandara", "pelabuhan", "kereta", "rumah sakit", "mall", "kebun sawit", "stadion", "pembangkit listrik"])


SCENES = [
    dict(id="s1", type="B2_HOOK", kicker="HARI 2", sub="kalian pilih B",
         say="Hari kedua. Kalian pilih *B*: kawasan *usaha*! Pasarnya langsung jadi dan ramai. Tapi ada satu masalah yang kelupaan: para pekerjanya *tidur di mana*?", data=["state"]),
    dict(id="s2", type="B2_TALLY", kicker="HASIL HARI 1", sub="suara kalian",
         say="Hasilnya: *B* dapat *{b|w} suara*, A cuma *{a|w}*. Ada juga yang protes: ngapain bawa koin, orangnya aja *nggak ada*! Tenang, mulai hari ini koinnya kepakai.", data=["state", "a", "b", "komentar"]),
    dict(id="s3", type="B2_MARKET", kicker="DIBANGUN", sub="kawasan usaha",
         say="Juragan Modal bayar *{biaya|w} koin*. Berdiri *pasar*, toko *swalayan*, dan beberapa *kantor kecil*. Koin di koper tinggal *{koin|w}*. Juragan mulai keringetan.", data=["state", "biaya", "koin"]),
    dict(id="s4", type="B2_BUS", kicker="PENDUDUK BARU", sub="dari like kalian",
         say="Like Hari 1 totalnya *{like|w}*. Tiap sepuluh like, satu penduduk baru. Jadi hari ini, *{baru|w} orang* turun dari bus! Penduduk Bumi Kita sekarang *{pend|w} orang*.", data=["state", "like", "baru", "pend"]),
    dict(id="s5", type="B2_NIGHT", kicker="MALAM HARI", sub="masalah baru",
         say="Tapi malamnya, mereka bingung. Ada yang usul *tidur di tempat kerja*. Bisa sih, sehari dua hari. Tapi kota yang sehat butuh *kawasan tinggal*, plus jalan dan *angkutan* ke tempat kerja.", data=["state", "komentar"]),
    dict(id="s6", type="B2_IDEAS", kicker="USULAN KALIAN", sub="dicatat semua",
         say="Usulan kalian juga banyak banget: *bandara*, *pelabuhan*, kereta, rumah sakit, sampai kebun *sawit*. Semuanya dicatat. Tapi kota ini baru *{pend|w} orang*, jadi kita mulai dari yang paling dibutuhkan.", data=["state", "usulan", "pend"]),
    dict(id="s7", type="B2_ASK", kicker="CARA MAIN BARU", sub="Hari 3",
         say="Buat Hari 3, kita ganti cara main. Nggak ada A atau B. Tulis *satu bangunan* yang paling dibutuhkan kota ini. Usulan yang paling sering muncul, *langsung dibangun*. Dan tiap sepuluh like, tetap jadi satu penduduk baru.", data=["state"]),
]
END_PAD = 2.0
