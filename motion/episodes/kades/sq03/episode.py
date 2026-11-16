"""Kades Magang Juara SIDE QUEST #3 (tayang 11 Nov 2026 siang, tanggal kembar 11.11): paket nyasar karena alamat desa tidak jelas.

Tema musiman (docs/KALENDER-KD.md): promo tanggal kembar 11.11, kurir masuk desa. Tanpa nama platform belanja/kurir nyata.
Info umum alamat (pengetahuan umum layanan antar): nama jalan, nomor rumah, RT/RW, kode pos, patokan unik, nomor HP aktif.
Kode pos = sistem penomoran wilayah untuk pengiriman pos di Indonesia: https://id.wikipedia.org/wiki/Kode_pos_Indonesia
Interaksi: usul nama jalan utama desa; like komentar terbanyak dipasang di papan jalan (dihitung di episode yang diproduksi sesudah ini tayang)."""

META = dict(format="side quest", pilar="info desa + musiman", tokoh="Kades Juara, kurir, warga", lokasi="gapura kurir bingung, kartu alamat, desa tanpa papan jalan, tips patokan, papan jalan kosong",
            hook="paket 11.11 nyasar", variasi="daftar bernomor", interaksi="usul nama jalan utama, like terbanyak menang", suara="Achird")


def compute():
    return dict(hud=dict(hari=5, penduduk=20, anggaran=65), unsur=["nama jalan", "nomor rumah", "RT / RW", "kode pos", "patokan"])


SCENES = [
    dict(id="s1", type="K_SQ03_HOOK", kicker="SIDE QUEST", sub="paket 11.11 nyasar",
         say="*Side quest!* Tanggal kembar sebelas-sebelas, warga desa rame belanja online. Tapi kurirnya muter-muter dari tadi: *alamatnya nggak jelas*.", data=["hud"]),
    dict(id="s2", type="K_SQ03_ADDR", kicker="ALAMAT LENGKAP", sub="5 unsur",
         say="Biar paket nggak nyasar, alamat butuh lima hal: *nama jalan*, *nomor rumah*, RT dan RW, *kode pos*, plus *patokan* yang gampang dilihat.", data=["hud", "unsur"]),
    dict(id="s3", type="K_SQ03_NOSIGN", kicker="MASALAHNYA", sub="desa tanpa nama jalan",
         say="Masalahnya, jalan di desa kita belum punya nama. Rumahnya juga belum bernomor. Kurir cuma dikasih patokan: rumah *dekat sumur*. Padahal semua rumah dekat sumur.", data=["hud"]),
    dict(id="s4", type="K_SQ03_TIPS", kicker="TIPS", sub="patokan yang benar",
         say="Tips buat lo: tulis patokan yang *unik*, jangan cuma dekat masjid kalau masjidnya ada tiga. Cantumkan nomor HP yang *aktif*, dan kalau bisa, kirim titik *lokasi*.", data=["hud"]),
    dict(id="s5", type="K_SQ03_NUMBER", kicker="LANGSUNG JALAN", sub="nomor rumah",
         say="Kades langsung bergerak: tiap rumah dikasih *nomor*, satu sampai lima. Tenda warga baru? Sementara pakai huruf A sampai J.", data=["hud"]),
    dict(id="s6", type="K_SQ03_QUEST", kicker="QUEST KALIAN", sub="nama jalan utama",
         say="Quest buat lo: kasih *nama jalan utama* desa di komentar. Nama dengan *like* paling banyak, resmi dipasang di papan jalan. Kurir nggak bakal nyasar lagi.", data=["hud"]),
]
END_PAD = 2.5
SPLIT_SHIFT = {0: -1}
