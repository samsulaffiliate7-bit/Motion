"""Denah Rumah Dunia, serial "Bumi Kita" Hari 4 (kejadian): banjir rob di pesisir utara, kawasan tinggal di selatan aman, ajakan komentar kejadian.

Dibuat 9 Nov 2026 bersama Hari 3 atas perintah pemilik. Voting Hari 3 (A bus / B kereta) diumumkan di Hari 5.
Komentar dipakai: YouTube @Om*** "Ngapain bawak coin orang disana aja gak ada" (Juragan panik soal koin, sambungan cerita).
Mekanik baru (variasi): "komentar terbaik jadi kejadian": penonton menulis kejadian untuk Bumi Kita, yang paling seru jadi cerita episode berikutnya.
Sumber banjir rob / pesisir utara Jakarta (dicek 6 Nov 2026, sama dengan hari001): https://www.thejakartapost.com/news/2015/02/21/jakarta-s-floods-and-changing-climate ,
https://whatsnewindonesia.com/jakarta/feature/news/jakarta-and-floods-undeniable-blend . Banjir rob = genangan air laut pasang di daratan pesisir:
https://id.wikipedia.org/wiki/Banjir_rob . Koin = mata uang rekaan."""

META = dict(format="serial Hari N (kejadian)", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal", lokasi="pesisir utara malam, air pasang, perumahan selatan, peta pelajaran, koper koin",
            hook="tamu tak diundang: banjir rob", variasi="plot kejadian + komentar jadi kejadian", interaksi="tulis kejadian, terseru jadi cerita")
PREV = dict(hari=3, penduduk=10, koin=300)


def compute():
    return dict(state=dict(hari=4, penduduk=PREV["penduduk"], koin=PREV["koin"], negara=["Indonesia"], kota="Jakarta"), koin=PREV["koin"])


SCENES = [
    dict(id="s1", type="D4_HOOK", kicker="HARI 4", sub="tamu tak diundang",
         say="Hari keempat. Malam ini langit Jakarta mendung, dan laut di utara pelan-pelan *naik*. Tamu tak diundang datang: *banjir rob*.", data=["state"]),
    dict(id="s2", type="D4_ROB", kicker="BANJIR ROB", sub="air laut pasang",
         say="Banjir rob itu air *laut pasang* yang naik dan menggenangi daratan pesisir. Di pesisir utara Jakarta, ini sering terjadi, apalagi kalau berbarengan dengan *hujan* deras.", data=["state"]),
    dict(id="s3", type="D4_SAFE", kicker="UNTUNGNYA", sub="rumah di selatan",
         say="Untung, kawasan tinggal kita dibangun di *selatan*, jauh dari pantai. Rumah warga *aman*, pasar cuma basah sedikit. Keputusan tata ruang kemarin terbukti *penting*.", data=["state"]),
    dict(id="s4", type="D4_LESSON", kicker="PELAJARAN", sub="tata ruang",
         say="Pelajarannya: jangan bangun rumah di tanah paling *rendah* dekat laut. Sisakan *ruang hijau* dan *saluran air*, biar air punya jalan untuk lewat.", data=["state"]),
    dict(id="s5", type="D4_JURAGAN", kicker="JURAGAN PANIK", sub="koin tinggal sedikit",
         say="Juragan Modal sempat panik. Koin tinggal *{koin|w}*, dan semua orang minta kereta. Dulu ada yang bilang koinnya nggak guna, sekarang malah *kurang*. Kepala Bumi cuma senyum: tenang, kita cari jalan.", data=["state", "koin"]),
    dict(id="s6", type="D4_ASK", kicker="GILIRAN KALIAN", sub="tulis kejadian",
         say="Sekarang giliran kalian: tulis *kejadian* yang harus terjadi di Bumi Kita. Komentar paling seru bakal jadi *cerita* di episode berikutnya. Jangan lupa voting *bus atau kereta* di Hari 3!", data=["state"]),
]
END_PAD = 2.5
