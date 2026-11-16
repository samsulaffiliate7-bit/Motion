"""Hewan Berdasi Kotor ep013 (3D, konsep v3): Ular jual jam "asli", stiker luntur kena hujan; Kerbau tidak teriak, cukup menunjukkan; format Fabel klasik.
Fabel fiksi; pasar dan harga rekaan, tanpa merek/tempat nyata."""
META = {"format": "Fabel klasik", "pilar": "pasar dan dagang", "tokoh": ["Ular (pedagang, tamu)", "Kerbau", "Merak, Tikus, Burung Hantu, Ayam (pembeli)"],
        "lokasi": ["pasar malam", "jalan pulang kehujanan", "dapur Kerbau (close-up stiker)", "pasar malam berikutnya", "pasar malam menjelang tutup"],
        "hook": "kontras", "variasi": [4, 5], "suara": "Algenib"}


def compute():
    return dict(harga=100)


SCENES = [
    dict(id="s1", type="H_PASARMALAM", kicker="PASAR MALAM", sub="lapak paling terang", say="Di pasar malam, lapak Ular paling terang. Jam tangan *asli*, katanya, cuma *seratus ribu*. Labelnya mengkilap, stikernya rapi. Kerbau beli satu, untuk hadiah anaknya.", data=[]),
    dict(id="s2", type="H_RAINLABEL", kicker="JALAN PULANG", sub="hujan turun", say="Di jalan pulang, hujan turun. Kerbau melindungi kotaknya di balik jaket. Sampai rumah, kotaknya dibuka. Stiker bertuliskan asli itu *luntur*, tintanya masih basah.", data=[]),
    dict(id="s3", type="H_RAINLABEL", variant="close", kicker="DI BAWAH STIKER", sub="dapur Kerbau", say="Di bawah stiker yang luntur, ada tulisan kecil lain: *barang tiruan, bukan untuk dijual*. Jarumnya juga sudah berhenti. Umurnya ternyata cuma *satu malam*.", data=[]),
    dict(id="s4", type="H_PASARMALAM", variant="balik", kicker="MALAM BERIKUTNYA", sub="depan lapak Ular", say="Malam berikutnya, Kerbau datang lagi ke pasar. Ia tidak teriak. Ia cuma berdiri di depan lapak, memegang kotak dengan stiker luntur, dan menunjukkannya ke setiap pembeli yang mampir.", data=[]),
    dict(id="s5", type="H_PASARMALAM", variant="end", kicker="SEBELUM TUTUP", sub="pasar malam", say="Satu per satu pembeli mundur. Sebelum pasar tutup, lapak Ular sudah sepi. Label bisa ditempel dalam semenit. Kepercayaan *tidak*. Pernah beli barang asli yang ternyata nggak asli? Cerita di komentar.", data=[]),
]
END_PAD = 3
