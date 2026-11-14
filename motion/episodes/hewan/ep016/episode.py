"""Hewan Berdasi Kotor ep016 (3D, konsep v3): 3 tipe teman saat nongkrong patungan (Rakun usulan penonton, Bunglon, Kerbau); format Hewan di Sekitarmu.
Fabel fiksi; Rakun diambil dari komentar penonton ("si rakun maling stiker", 10 Nov). Angka rekaan."""
META = {"format": "Hewan di Sekitarmu", "pilar": "pertemanan", "tokoh": ["Rakun (tamu, usulan penonton)", "Bunglon", "Kerbau", "Tikus, Beo, Kucing"],
        "lokasi": ["warung tenda malam", "sorot Rakun", "sorot Bunglon", "sorot Kerbau", "warung tenda (tagihan)"],
        "hook": "pertanyaan", "variasi": [3, 5], "suara": "Achird", "komentar": "usulan Rakun dari komentar TikTok 10 Nov"}


def compute():
    ekor, total = 6, 240; per = total // ekor; assert per == 40
    return dict(ekor=ekor, total=total, per=per)


SCENES = [
    dict(id="s1", type="H_WARKOP", kicker="HEWAN DI SEKITARMU", sub="warung tenda", say="Nongkrong di warung tenda, enam ekor, bayarnya patungan. Di setiap tongkrongan, pasti ada *tiga hewan* ini. Yang nomor satu, *usulan penonton* kita.", data=[]),
    dict(id="s2", type="H_WARKOP", variant="rakun", kicker="NOMOR SATU", sub="Si Rakun", say="Nomor satu: *Si Rakun*. Pesan paling banyak, makan paling lahap. Pas tagihan datang, tiba-tiba sibuk cari dompet di semua saku. Kalimat andalannya: nanti gue transfer ya. Transfernya *belum sampai* sampai sekarang.", data=[]),
    dict(id="s3", type="H_WARKOP", variant="bunglon", kicker="NOMOR DUA", sub="Si Bunglon", say="Nomor dua: *Si Bunglon*. Cuma pesan es teh, tapi diam saja waktu tagihan dibagi rata. Besoknya, baru protes di grup: kok gue bayar *empat puluh ribu* buat es teh?", data=[]),
    dict(id="s4", type="H_WARKOP", variant="kerbau", kicker="NOMOR TIGA", sub="Si Kerbau", say="Nomor tiga: *Si Kerbau*. Selalu yang nalangin dulu, *dua ratus empat puluh ribu*, pakai uangnya sendiri. Lalu menagih satu per satu selama seminggu. Yang paling capek justru yang paling jujur.", data=[]),
    dict(id="s5", type="H_WARKOP", variant="end", kicker="TAGIHAN MEJA 3", sub="warung tenda", say="Kalau di tongkrongan lo nggak ada Rakun, Bunglon, atau Kerbau, coba cek siapa yang selalu nalangin. Tag teman yang paling *Rakun*. Usul hewan berikutnya di komentar.", data=[]),
]
END_PAD = 6.5
