"""Denah Rumah Dunia, serial "Bumi Kita" Hari 3: Kepala Bumi membangun kawasan tinggal (pekerja tidur di lapak), pilihan angkutan A bus / B kereta.

Dibuat 9 Nov 2026 bersama Hari 4 atas perintah pemilik ("pakai komen yang ada biar episode bareng"), sebelum Hari 2 tayang. Karena itu keputusan
Hari 3 diambil Kepala Bumi sendiri dari masalah Hari 2 + komentar yang sudah ada; usulan bangunan dari komentar Hari 2 dihitung di Hari 5.
Komentar dipakai: IG @de*** "B tidurnya di luar kota" (Hari 1); usulan kereta (@ka***, YouTube Hari 1).
Voting A/B Hari 3 diumumkan di episode yang diproduksi sesudah Hari 3 tayang (aturan LUSA 9 Nov: Hari 7, 12 Nov). Penduduk tetap 10 (like Hari 2 dihitung di Hari 5).
Fakta: pesisir utara Jakarta rawan banjir (sumber di hari001/episode.py). Kawasan campuran (mixed-use) = hunian dekat tempat kerja/usaha,
mengurangi jarak perjalanan: https://en.wikipedia.org/wiki/Mixed-use_development . Koin = mata uang rekaan."""

META = dict(format="serial Hari N", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal", lokasi="papan kota Jakarta, rencana zona, perumahan, jalan kaki ke pasar, halte bus, jalur kereta",
            hook="pekerja tidur di lapak, Kepala Bumi turun tangan", variasi="komentar jadi konten", interaksi="A bus / B kereta, hasil di Hari 5")
PREV = dict(hari=2, penduduk=10, koin=600)
PARAMS = dict(biaya_rumah=300, biaya_bus=150, biaya_kereta=500)


def compute(p=PARAMS):
    koin = PREV["koin"] - p["biaya_rumah"]; assert koin == 300 and p["biaya_bus"] <= koin < p["biaya_kereta"]
    return dict(state=dict(hari=3, penduduk=PREV["penduduk"], koin=koin, negara=["Indonesia"], kota="Jakarta"), pend=PREV["penduduk"], biaya=p["biaya_rumah"], koin=koin,
                bus=p["biaya_bus"], kereta=p["biaya_kereta"], kurang=p["biaya_kereta"] - koin, komentar=[["@de***", "B tidurnya di luar kota"]])


SCENES = [
    dict(id="s1", type="D3_HOOK", kicker="HARI 3", sub="Kepala Bumi turun tangan",
         say="Hari ketiga. Semalam para pekerja tidur di *lapak* pasar. Pagi ini Kepala Bumi turun tangan: kita bangun *kawasan tinggal* dulu, sebelum ada yang masuk angin.", data=["state"]),
    dict(id="s2", type="D3_PLAN", kicker="LOKASI", sub="selatan pasar",
         say="Lokasinya di *selatan* pasar. Jauh dari pesisir utara yang rawan *banjir*, tapi cukup dekat, jadi warga bisa *jalan kaki* ke tempat kerja.", data=["state"]),
    dict(id="s3", type="D3_BUILD", kicker="DIBANGUN", sub="kawasan tinggal",
         say="Juragan Modal bayar *{biaya|w} koin*. *{pend|w} rumah* kecil berdiri, lengkap dengan taman di tengahnya. Sisa koin di koper: *{koin|w} koin*. Juragan mulai menghitung ulang.", data=["state", "biaya", "koin", "pend"]),
    dict(id="s4", type="D3_MIXED", kicker="KAWASAN CAMPURAN", sub="rumah dekat kerja",
         say="Ada yang bilang kemarin: tidurnya di *luar kota* aja. Sekarang nggak perlu. Rumah yang dekat tempat kerja itu namanya *kawasan campuran*: perjalanan lebih pendek, hemat waktu dan ongkos.", data=["state", "komentar"]),
    dict(id="s5", type="D3_BUS", kicker="PILIHAN A", sub="bus kota",
         say="Tapi kota bakal makin besar, dan butuh *angkutan*. Pilihan *A*: *bus kota*. Biayanya *{bus|w} koin*. Cepat jadi, tinggal bikin jalur dan halte.", data=["state", "bus"]),
    dict(id="s6", type="D3_TRAIN", kicker="PILIHAN B", sub="kereta ringan",
         say="Pilihan *B*: *kereta ringan*, seperti yang kalian usulkan. Muat banyak dan bebas macet. Tapi biayanya *{kereta|w} koin*, Juragan masih kurang *{kurang|w}*.", data=["state", "kereta", "kurang"]),
    dict(id="s7", type="D3_ASK", kicker="KALIAN PILIH", sub="hasil di Hari 5",
         say="Tulis *A* atau *B* di komentar, hasilnya diumumkan *dua hari lagi*. Usulan bangunan kalian dari Hari 2 juga ikut dihitung. Dan nanti malam di Hari 4, ada *tamu tak diundang* di kota kita.", data=["state"]),
]
END_PAD = 2.0
