"""Denah Rumah Dunia "Bumi Kita" Hari 7 (tayang 15 Nov 2026 pagi): bus menang, like Hari 5 jadi koin, like Hari 2 jadi penduduk,
25 pendaftar berprofesi, klinik menang tapi koin kurang, pilihan rute bus.

Dibaca lewat Repliz 14 Nov 2026 ±08:45 WIB (satu akun satu suara; catatan di arsip status-2026-11-15):
- Voting Hari 3 (A bus / B kereta): TikTok A 1 (!¡RutupBangakCuy¡! "A, lebih murah... juragan tidak kehabisan koin"), YouTube A 1 (@AhmadAufarAlhafidz),
  IG rel 1 (pt_payung_merah "untuk investasi, monorail aja") -> A 2 : B 1 = BUS. (Hari 3 juga terunggah 9 kali di TikTok tgl 10 Nov, galat Repliz/TikTok.)
- Voting Hari 6 (A sekolah / B klinik): TikTok B 1 (Dibhw), IG "KLINIK dulu" 1 (pt_payung_merah), YouTube sekolah 1 (@agus...) -> KLINIK 2 : 1.
- Like Hari 5 (aturan: tiap 10 like = 10 koin): TikTok 2 + IG 69 + YouTube 38 = 109 -> +100 koin.
- Like Hari 2 (aturan Hari 1: tiap 10 like = 1 penduduk): TikTok 26 + IG 49 + YouTube 34 = 109 -> +10 penduduk.
- Pendaftar (komentar "masukin aku"), Hari 5 YouTube 10: @ro*** (Subang), @Da***, @ga*** bos pasar, @aw*** (usul pajak), @al*** bek no 4 + stadion, @se***, @De***,
  @Nu*** anak rantau di kos, @Al***, @Ta*** tukang kuli; IG 14: @ig*** mandor, @xb*** CEO, @10*** bos minimarket, @w1*** pengusaha, @sc***, @na***, @16*** cafe di ruko,
  @la***, @d4*** ketua RT, @mh*** bapak kos, @mh*** "buatin stadion", @fa***, @4r***, @br*** wakil Kepala Bumi; TikTok Hari 3 @Sy*** pemain bola -> 25.
  Tidak dipakai: permintaan jadi mafia/koruptor/anggota dewan, dan yang menyebut program nyata.
- Stadion diminta 3 kali (@al***, @mh***, @Sy***).
Penduduk 12 + 10 + 25 = 47. Koin 200 + 100 - bus 150 = 150; klinik 180 (Hari 6) -> kurang 30. Koin rekaan."""

META = dict(format="serial Hari N", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal, 25 pendatang (penonton)", lokasi="timbangan miring ke bus, meja koin like, hujan hati jadi penduduk, papan profesi + lahan stadion, bus pertama, peta dua rute",
            hook="bus menang tipis 2 lawan 1", variasi="hook angka + komentar jadi konten", interaksi="A rute pesisir / B rute tengah kota, hasil dua hari lagi", suara="Sulafat")
VOTE_H3 = dict(A=2, B=1)
VOTE_H6 = dict(sekolah=1, klinik=2)
LIKE_H5 = dict(TikTok=2, IG=69, YouTube=38)
LIKE_H2 = dict(TikTok=26, IG=49, YouTube=34)
PREV = dict(hari=6, penduduk=12, koin=200)
PARAMS = dict(bus=150, klinik=180, daftar=25)


def compute(p=PARAMS):
    l5 = sum(LIKE_H5.values()); l2 = sum(LIKE_H2.values()); koin_like = l5 // 10 * 10; dari_like = l2 // 10
    pend = PREV["penduduk"] + dari_like + p["daftar"]; koin = PREV["koin"] + koin_like - p["bus"]
    assert VOTE_H3 == dict(A=2, B=1) and l5 == 109 and koin_like == 100 and l2 == 109 and dari_like == 10 and pend == 47 and koin == 150 and p["klinik"] - koin == 30
    return dict(state=dict(hari=7, penduduk=pend, koin=koin, negara=["Indonesia"], kota="Jakarta"), like5=l5, koin_like=koin_like, koin1=PREV["koin"] + koin_like,
                like=l2, dari_like=dari_like, daftar=p["daftar"], pend=pend, koin=koin, bus=p["bus"], klinik=p["klinik"], kurang=p["klinik"] - koin,
                profesi=["mandor", "bos minimarket", "bapak kos", "ketua RT", "anak rantau", "pemain bola"],
                komentar=[["@!¡***", "A. lebih murah, yang penting juragan tidak kehabisan koin"], ["@al***", "bikin stadion dong, aku mau jadi bek nomor 4"]])


SCENES = [
    dict(id="s1", type="D_H007_HOOK", kicker="HARI 7", sub="voting angkutan",
         say="Hari ketujuh. Voting bus atau kereta sudah dihitung, dan pemenangnya... *bus*! Tipis banget, *dua lawan satu*. Katanya, yang penting Juragan *nggak kehabisan koin*.", data=["state", "komentar"]),
    dict(id="s2", type="D_H007_DECIDE", kicker="LIKE JADI KOIN", sub="dari Hari 5",
         say="Dan koinnya memang nambah. Video Hari 5 dapat *{like5|w} like*, jadi Juragan dapat *{koin_like|w} koin*. Koper sekarang *{koin1|w} koin*. Bus dibeli, *{bus|w} koin*. Usulan monorel dicatat buat nanti.", data=["state", "like5", "koin_like", "koin1", "bus"]),
    dict(id="s3", type="D_H007_LIKE", kicker="LIKE JADI WARGA", sub="dari Hari 2",
         say="Like video Hari 2 juga sudah dihitung: *{like|w} like*. Tiap sepuluh like, satu penduduk baru. Jadi *{dari_like|w} orang* pindah ke kota kita.", data=["state", "like", "dari_like"]),
    dict(id="s4", type="D_H007_IDEAS", kicker="PENDATANG BARU", sub="dari komentar",
         say="Terus *{daftar|w} orang* daftar lewat komentar, lengkap dengan cita-citanya: *mandor*, bos minimarket, bapak kos, ketua RT, sampai *pemain bola*. Tiga orang minta *stadion*! Penduduk sekarang *{pend|w} orang*.", data=["state", "daftar", "pend", "profesi", "komentar"]),
    dict(id="s5", type="D_H007_BUS", kicker="BUS PERTAMA", sub="tapi koin kurang",
         say="Bus hijau pertama mulai jalan. Voting sekolah atau klinik juga keluar: *klinik* menang. Masalahnya, klinik butuh *{klinik|w} koin*, sisa di koper cuma *{koin|w}*. Kurang *{kurang|w} koin*. Juragan keringetan.", data=["state", "klinik", "koin", "kurang"]),
    dict(id="s6", type="D_H007_ASK", kicker="KALIAN PILIH", sub="rute bus",
         say="Sambil Juragan cari koin, kita tentukan rute bus. *A*: lewat *pesisir utara*, pemandangan laut tapi rawan rob. *B*: lewat *tengah kota*, lebih aman tapi macet. Tulis A atau B, hasilnya *dua hari lagi*.", data=["state"]),
]
END_PAD = 2.5
