"""Kades Magang Juara SIDE QUEST #4 (tayang 15 Nov 2026 siang): tebak benda desa (zoom ekstrem, makin lama makin susah).

Topik dari docs/KALENDER-KD.md (Kades SIDE QUEST: tebak benda desa). Pos ronda ditunda di Hari 7 -> kentongan jadi benda pertama.
Sumber (dicek 10 Nov 2026):
- Kentongan: alat bunyi tradisional dari bambu/kayu berlubang, dipukul sebagai tanda (bahaya, ronda, panggilan warga): https://id.wikipedia.org/wiki/Kentongan
- Caping: topi berbentuk kerucut dari anyaman bambu, dipakai petani sebagai pelindung panas dan hujan: https://id.wikipedia.org/wiki/Caping
- Lesung + alu: wadah kayu panjang untuk menumbuk padi dengan alu (tongkat kayu), dulu dipakai sebelum ada mesin penggilingan: https://id.wikipedia.org/wiki/Lesung
- Benda keempat (jawaban: tampah/nyiru, anyaman bambu bundar pipih untuk menampi beras): diumumkan di video berikutnya, tidak disebut di video ini.
Interaksi: tebak benda keempat; penjawab benar pertama (tiga platform) disebut di video berikutnya (nama disamarkan)."""

META = dict(format="side quest", pilar="info desa + tebakan", tokoh="Kades Juara (narator)", lokasi="studio gelap lampu sorot: kentongan, caping, lesung, siluet benda misteri",
            hook="zoom ekstrem, tebak bendanya", variasi="daftar bernomor + tebakan", interaksi="tebak benda keempat, penjawab benar pertama disebut", suara="Achird")


def compute():
    return dict(hud=dict(hari=7, penduduk=1227, anggaran=43), jawab=["kentongan", "caping", "lesung"])


SCENES = [
    dict(id="s1", type="K_SQ04_HOOK", kicker="SIDE QUEST", sub="tebak benda desa",
         say="*Side quest!* Empat benda yang pasti ada di desa, tapi kita *zoom* sampai mentok. Bisa tebak semua? Makin akhir makin *susah*.", data=["hud"]),
    dict(id="s2", type="K_SQ04_ONE", kicker="BENDA 1", sub="dari bambu",
         say="Benda pertama: dari *bambu*, ada lubang memanjang, biasanya digantung di pos ronda. Ini *kentongan*! Dulu, kalau dipukul cepat berkali-kali, artinya ada *bahaya*.", data=["hud", "jawab"]),
    dict(id="s3", type="K_SQ04_TWO", kicker="BENDA 2", sub="bentuk kerucut",
         say="Benda kedua: bentuknya *kerucut*, anyaman bambu, sering nongol di sawah. Ini *caping*. Topi petani buat nahan *panas* dan hujan sekaligus. Lebarnya pas, sampai bahu ikut *teduh*.", data=["hud", "jawab"]),
    dict(id="s4", type="K_SQ04_THREE", kicker="BENDA 3", sub="kayu panjang",
         say="Benda ketiga: kayu panjang dengan cekungan di tengah, pasangannya *tongkat* besar. Ini *lesung* dan alu, alat *menumbuk padi* sebelum ada mesin penggilingan.", data=["hud", "jawab"]),
    dict(id="s5", type="K_SQ04_MYSTERY", kicker="BENDA 4", sub="paling susah",
         say="Dan benda keempat, yang paling susah: *bundar*, pipih, dari anyaman bambu, sering dipakai di *dapur*. Petunjuk terakhir: makainya sambil *digoyang-goyang*. Kades nggak kasih jawabannya.", data=["hud"]),
    dict(id="s6", type="K_SQ04_QUEST", kicker="QUEST KALIAN", sub="tebak benda 4",
         say="Tulis tebakan lo di komentar. Yang *pertama* jawab benar, namanya kades sebut di *video berikutnya*. Skor lo berapa dari empat? Jujur ya, jangan *nyontek* dulu.", data=["hud"]),
]
END_PAD = 3.5
