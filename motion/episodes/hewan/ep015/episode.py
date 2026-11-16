"""Hewan Berdasi Kotor ep015 (3D, konsep v3): Merak live pamer liburan hasil cicilan, penagih ikut menonton dan datang ke kamarnya; format Senjata Makan Tuan.
Fabel fiksi; tanpa platform, resort, atau lembaga nyata. Angka rekaan."""
META = {"format": "Senjata Makan Tuan", "pilar": "media sosial", "tokoh": ["Merak (tamu)", "Kucing (petugas penagihan)"],
        "lokasi": ["pantai malam (live)", "kantor penagihan malam", "pantai (baca komentar)", "depan kamar 12", "kamar kos Merak"],
        "hook": "kontras", "variasi": [4, 5], "suara": "Algenib"}


def compute():
    return dict(penonton=2000, bulan=3, kamar=12, komen=[["@tikus_kecil", "wih mantap kak 🔥"], ["@beo.beo", "resort apa kak?"], ["@kucing_tagih", "kamar nomor berapa, Kak?"]])


SCENES = [
    dict(id="s1", type="H_PANTAI", kicker="SENJATA MAKAN TUAN", sub="pantai, malam", say="Merak live dari pantai, malam-malam, lampu cincin menyala. Resort mewah, makan malam di pinggir laut. Judul livenya: healing dulu, kerja nanti. Penontonnya *dua ribu*.", data=[]),
    dict(id="s2", type="H_HPLIVE", kicker="SALAH SATU PENONTON", sub="kantor penagihan", say="Salah satu penontonnya: Kucing, petugas penagihan. Nama Merak ada di daftarnya: cicilan liburan *tiga bulan* belum dibayar. Di live itu, Merak sendiri yang menyebut nama resortnya.", data=[]),
    dict(id="s3", type="H_PANTAI", variant="komen", kicker="BACA KOMENTAR", sub="masih live", say="Merak makin semangat. Ia baca komentar satu per satu, sampai ada satu komentar: kamar nomor berapa, Kak? Merak jawab sambil tertawa: kamar *dua belas*, pinggir pantai.", data=[]),
    dict(id="s4", type="H_PANTAI", variant="datang", kicker="SATU JAM KEMUDIAN", sub="kamar 12", say="Satu jam kemudian, pintu kamar dua belas diketuk. Kucing datang membawa map. Livenya masih jalan. Dua ribu penonton melihat Merak *menutup kamera* pelan-pelan.", data=[]),
    dict(id="s5", type="H_PANTAI", variant="end", kicker="BESOKNYA", sub="kamar kos", say="Besoknya, Merak live lagi. Kali ini dari kamar kos, tanpa lampu cincin. Judulnya: *jangan pamer yang belum lunas*. Pernah lihat yang begini di medsos? Cerita di komentar.", data=[]),
]
END_PAD = 3
