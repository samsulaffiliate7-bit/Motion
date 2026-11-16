"""Hewan Berdasi Kotor ep010 (3D, konsep v3): Kucing pinjam bor "sebentar", setahun tak kembali, lalu bornya dijual di bazar; format Pepatah Baru.
Fabel fiksi; kompleks, harga, dan kejadian rekaan."""
META = {"format": "Pepatah Baru", "pilar": "kos dan perumahan", "tokoh": ["Kerbau", "Kucing Berdasi", "Bunglon (disebut)", "warga kompleks"],
        "lokasi": ["jalan kompleks malam (pinjam bor)", "jalan kompleks (setahun dari atas)", "garasi Kucing", "bazar kompleks malam", "teras Kerbau (pepatah)"],
        "hook": "kontras", "variasi": [4, 5], "suara": "Algenib"}


def compute():
    return dict(harga=150_000, pinjam=[["🪜 tangga", 7], ["🛒 gerobak", 30], ["🟢 selang air", 90]], pinjam_cues=["tangga", "gerobak", "selang air"])


SCENES = [
    dict(id="s1", type="H_LANE", kicker="KOMPLEKS RIMBA", sub="malam", say="Kucing mengetuk pintu Kerbau. Pinjam bor *sebentar* ya, cuma buat pasang paku. Kerbau mengangguk. Itu terakhir kalinya bor itu terlihat di rumah Kerbau. *Setahun* yang lalu.", data=[]),
    dict(id="s2", type="H_LANE", variant="time", kicker="SETELAH ITU", sub="berbulan-bulan", say="Seminggu kemudian, Kucing datang lagi, pinjam *tangga*. Sebulan kemudian: *gerobak*. Tiga bulan kemudian: *selang air*. Semuanya dipinjam sebentar. Tidak ada yang pulang.", data=[]),
    dict(id="s3", type="H_GARAGE", kicker="GARASI KUCING", sub="suatu malam", say="Waktu Kerbau butuh bornya sendiri, ia datang baik-baik. Kucing garuk kepala: bor? Kayaknya udah dipinjam lagi sama Bunglon. Barang Kerbau ternyata sudah dipinjamkan ke *tiga tetangga* lain, atas nama Kucing.", data=[]),
    dict(id="s4", type="H_YARDSALE", kicker="BAZAR KOMPLEKS", sub="Sabtu malam", say="Sabtu malam, ada bazar kompleks. Di lapak Kucing, Kerbau melihat bor yang sangat ia kenal. Labelnya: dijual, *seratus lima puluh ribu*. Kerbau membaliknya. Di gagangnya masih tergores namanya sendiri: *Kerbau*.", data=[]),
    dict(id="s5", type="H_LANE", variant="end", kicker="PEPATAH BARU", sub="teras Kerbau", say="Seisi bazar menoleh ke Kucing. Bornya pulang malam itu juga, tanpa bayar. Pepatah barunya: *barang pinjaman yang tidak ditagih, lama-lama dianggap hadiah*. Lo pernah minjemin barang yang nggak balik? Cerita di komentar.", data=[]),
]
END_PAD = 2.5
