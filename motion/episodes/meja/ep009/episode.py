"""Meja Seberang Bos ep009 (3D, konsep v3): Full POV Bos "grup tim rame ngomongin gue, mereka lupa gue di situ".
Cerita fiksi, tanpa nama perusahaan atau aplikasi. Bos manusiawi: tersinggung dulu, lalu bercermin dan memperbaiki cara kerja.
Tidak menyebut aturan hukum kerja (tidak perlu sumber)."""
META = {"format": "Full POV Bos", "pilar": "komunikasi kerja", "tokoh": ["Si Bos", "tim (lewat chat)", "istri bos"],
        "lokasi": ["mobil macet malam (HP)", "ruang makan rumah bos", "balkon apartemen malam", "ruang rapat pagi", "pantry sore"],
        "hook": "kejadian", "variasi": [4, 5]}


def compute():
    chat = [["Rani", "Revisi lagi?? udah yg ke-5 😭", "21.04"], ["Dodi", "jam 9 malem chat 'urgent' tiap hari", "21.05"], ["Rani", "briefingnya 2 kalimat, revisinya 20", "21.05"], ["Sari", "eh... bos ada di grup ini kan?", "21.07"]]
    fixes = [["🗒️", "Brief tertulis", "di awal, bukan revisi di akhir"], ["🌙", "Nggak chat lewat jam 8", "kecuali beneran darurat"], ["🙋", "Tanya ke tim", "apa yang bikin capek"]]
    return dict(chat=chat, fixes=fixes, fix_cues=["brief tertulis", "jam delapan", "nanya"])


SCENES = [
    dict(id="s1", type="M_CARCHAT", kicker="POV BOS", sub="21.04, macet", say="Jam sembilan malam, di mobil, HP gue bunyi terus. Grup tim lagi rame. Ternyata mereka lagi *ngomongin gue*. Dan mereka lupa, gue juga ada di grup itu.", data=["chat"]),
    dict(id="s2", type="M_DINNER", kicker="POV BOS", sub="21.40, makan malam", say="Pertama, jujur, gue *tersinggung*. Gue kerja sampai malam juga, rasanya kayak dikhianati. Gue udah ngetik balasan panjang. Istri gue lihat layar, terus nanya pelan, mereka salah nggak?", data=[]),
    dict(id="s3", type="M_BALCONY", kicker="POV BOS", sub="23.15, nggak bisa tidur", say="Gue hapus balasannya. Gue baca ulang chat mereka. Revisi lima kali, karena briefing gue cuma *dua kalimat*. Chat urgent jam sembilan malam, karena gue sendiri telat dikasih tahu atasan.", data=[]),
    dict(id="s4", type="M_MEETING2", kicker="POV BOS", sub="09.00, rapat tim", say="Besok paginya gue ubah tiga hal. Satu, *brief tertulis* di awal, bukan revisi di akhir. Dua, nggak chat lewat *jam delapan* malam, kecuali beneran darurat. Tiga, gue *nanya* ke tim, apa yang paling bikin capek.", data=["fixes", "fix_cues"]),
    dict(id="s5", type="M_PANTRY2", kicker="POV BOS", sub="sebulan kemudian", say="Sebulan kemudian, revisinya tinggal sekali. Grup tim masih rame, tapi sekarang soal *makan siang*. Timnya nggak berubah. Yang berubah, cara gue minta tolong. Lo pernah ngomongin bos di grup yang ada bosnya? Ngaku aja di komentar.", data=[]),
]
END_PAD = 1.5
SPLIT_SHIFT = {2: -1}
