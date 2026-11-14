"""Meja Seberang Bos ep008 (3D, konsep v3): Full POV Staf "hari pertama kerja, disuruh 'pelajari sendiri ya'".
Cerita fiksi, tanpa nama perusahaan. Bos tetap manusiawi (ternyata juga kewalahan). Tidak menyebut aturan hukum kerja (tidak perlu sumber).
Plot twist + momen "gue banget": bulan kedua staf menyambut anak baru."""
META = {"format": "Full POV Staf", "pilar": "hubungan tim", "tokoh": ["Si Staf (anak baru)", "Si Bos", "senior", "admin lantai", "anak baru bulan kedua"],
        "lokasi": ["meja kosong pagi", "layar laptop (folder 200 file)", "bangku taman kantor siang", "lorong rak arsip", "ruang bos sore", "lobi bulan kedua"],
        "hook": "kejadian", "variasi": [4, 5, 6]}


def compute():
    tips = [["📝", "Catat dulu", "tanya sekaligus"], ["🧭", "Cari yang paling lama", "admin lantai"], ["📄", "Ringkasan sendiri", "1 halaman"]]
    return dict(files=200, tips=tips, tip_cues=["catat dulu", "paling lama", "ringkasan sendiri"])


SCENES = [
    dict(id="s1", type="M_DAY1", kicker="POV STAF", sub="hari pertama, 08.00", say="Hari pertama kerja. Bos lewat, cuma bilang, *pelajari sendiri ya*, terus masuk meeting. Gue berdiri di depan meja kosong, nggak tahu harus mulai dari mana.", data=[]),
    dict(id="s2", type="M_FOLDER", kicker="POV STAF", sub="09.12, buka laptop", say="Di laptop ada satu folder isinya *dua ratus file*. Panduan tahun lalu, laporan, sampai file yang namanya cuma final revisi tiga. Makin dibuka, makin bingung.", data=["files"]),
    dict(id="s3", type="M_BANGKU", kicker="POV STAF", sub="12.05, makan siang", say="Makan siang, gue sendirian di bangku taman kantor. Senior yang duduk di sebelah pakai headset, kelihatan sibuk banget. Mau nanya, *takut ganggu*.", data=[]),
    dict(id="s4", type="M_ARSIP", kicker="POV STAF", sub="13.30, ganti cara", say="Akhirnya gue pakai tiga cara. Satu, semua pertanyaan gue *catat dulu*, lalu tanya sekaligus. Dua, cari orang yang *paling lama* di situ, ternyata admin lantai. Tiga, gue bikin *ringkasan sendiri*.", data=["tips", "tip_cues"]),
    dict(id="s5", type="M_BOSROOM", kicker="POV STAF", sub="16.00, ruang bos", say="Jam empat, bos nanya, udah paham? Gue kasih ringkasan satu halaman, plus lima pertanyaan. Bos diem, terus bilang, *ini yang saya butuh*. Ternyata dia juga lagi kewalahan.", data=[]),
    dict(id="s6", type="M_NEWBIE", kicker="BULAN KEDUA", sub="lobi, 08.00", say="Bulan kedua, ada anak baru datang bawa kardus. Bos lewat, bilang pelajari sendiri ya. Gue langsung nyamperin, *sini, gue temenin*. Hari pertama lo dulu gimana? Ceritain di komentar.", data=[]),
]
END_PAD = 1.2
