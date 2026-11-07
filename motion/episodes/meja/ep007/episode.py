"""Meja Seberang Bos ep007 (3D, konsep v3): Kamus HRD, empat kalimat lowongan/interview dan arti yang MUNGKIN, plus pertanyaan aman.
Cerita fiksi, tanpa nama perusahaan. Nada adil: "bisa berarti", bukan menuduh semua HRD. Tidak menyebut aturan hukum kerja (tidak perlu sumber)."""
META = {"format": "Kamus HRD", "pilar": "cari kerja dan interview", "tokoh": ["Si Staf (pelamar)", "HRD", "teman"],
        "lokasi": ["kamar malam (HP lowongan)", "gerbong KRL pagi", "ruang interview", "kafe", "kamar menunggu kabar"], "hook": "pertanyaan", "variasi": [2, 3, 5]}


def compute():
    return dict(phr=[["Suasana kekeluargaan", "batas jam kerja bisa kabur", "jam kerja & lembur diatur gimana?"],
                     ["Mampu bekerja di bawah tekanan", "target ketat, tim kecil", "satu orang pegang berapa kerjaan?"],
                     ["Gaji kompetitif", "angkanya belum mau dibuka", "kisaran gajinya berapa?"],
                     ["Kami akan menghubungi Anda", "kabarnya bisa lama, atau tidak ada", "kapan tahap berikutnya?"]])


SCENES = [
    dict(id="s1", type="M_JOBAD", kicker="KAMUS HRD", sub="4 kalimat", say="Lowongan ini kelihatan sempurna. Tapi ada *empat kalimat* yang artinya bisa beda dari yang lo kira. Bukan berarti semua HRD begitu. Tapi biar nggak kaget, ini kamus HRD, plus pertanyaan yang aman buat ditanyain pas interview.", data=["phr"]),
    dict(id="s2", type="M_DICT", variant="0", kicker="KALIMAT #1", sub="di lowongan", say="Satu: *suasana kekeluargaan*. Nggak selalu jelek, tapi bisa berarti *batas jam kerja kabur*. Waktu interview, tanya aja: jam kerja dan lembur diatur gimana?", data=["phr"]),
    dict(id="s3", type="M_DICT", variant="1", kicker="KALIMAT #2", sub="di lowongan", say="Dua: *mampu bekerja di bawah tekanan*. Bisa berarti *target ketat* dan timnya kecil. Tanya: satu orang biasanya pegang berapa kerjaan?", data=["phr"]),
    dict(id="s4", type="M_DICT", variant="2", kicker="KALIMAT #3", sub="di lowongan", say="Tiga: *gaji kompetitif*. Bisa berarti angkanya belum mau dibuka. Nggak apa-apa tanya duluan: *kisaran gajinya* berapa? Biar sama-sama nggak buang waktu.", data=["phr"]),
    dict(id="s5", type="M_DICT", variant="3", kicker="KALIMAT #4", sub="habis interview", say="Empat: *kami akan menghubungi Anda*. Bisa berarti kabarnya lama, atau nggak ada. Sebelum pulang, tanya: *kapan tahap berikutnya*? Kalimat HRD apa yang paling bikin lo curiga? Tulis di komentar.", data=["phr"]),
]
END_PAD = 5.5
SPLIT_SHIFT = {3: -1}
