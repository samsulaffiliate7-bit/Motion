"""Meja Seberang Bos ep011 (3D, v3): Seri Jenis Bos "bos yang cuma ingat kesalahan". Tayang 11 Nov 2026.
Ide dari komentar penonton YouTube (9 Nov): "Kalo bos gw mah yg jelek doang yg selalu diungkit". Musiman: evaluasi akhir tahun.
Cerita fiksi, tanpa nama perusahaan. Bos manusiawi (ditekan target, kesalahan lebih gampang nyangkut di ingatan). Tidak menyebut aturan hukum kerja."""
META = {"format": "Seri Jenis Bos", "pilar": "performa dan promosi", "tokoh": ["Si Staf", "Si Bos"], "suara": "Puck",
        "lokasi": ["ruang evaluasi akhir tahun", "koridor kantor (kalender 12 bulan)", "parkiran basement malam", "taman atap kantor siang", "ruang evaluasi tahun berikutnya"],
        "hook": "angka spesifik", "variasi": [1, 5], "musiman": "evaluasi akhir tahun", "dari_komentar": True}


def compute():
    tips = [["📝", "Catatan menang", "tiap Jumat, 3 baris"], ["📊", "Pakai angka", "berapa, kapan, dampaknya"], ["📤", "Kirim duluan", "seminggu sebelum evaluasi"]]
    return dict(bulan=["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], salah=7, tips=tips, tip_cues=["catatan menang", "angka", "kirim"])


SCENES = [
    dict(id="s1", type="M_E011_EVAL", kicker="JENIS BOS", sub="evaluasi akhir tahun", say="Sebelas bulan kerja bagus. Pas evaluasi akhir tahun, yang dibahas cuma *satu kesalahan* di bulan Juli. Kata salah satu penonton kita, bos dia juga gitu: yang jelek doang yang diungkit.", data=[]),
    dict(id="s2", type="M_E011_KORIDOR", kicker="JENIS BOS", sub="sebelas hijau, satu merah", say="Kalau digambar, kerjaan lo setahun itu sebelas kotak *hijau* dan satu kotak *merah*. Tapi yang nempel di kepala bos, kotak merahnya. Rasanya nggak adil, dan lama-lama bikin males berusaha.", data=["bulan", "salah"]),
    dict(id="s3", type="M_E011_PARKIR", kicker="SISI BOS", sub="parkiran, jam 9 malam", say="Dari sisi bos, ceritanya lain. Dia ditanya atasan soal target, tiap minggu. Kesalahan yang bikin dia ditegur, itu yang *nyangkut*. Kerjaan lancar nggak bikin dia ditelepon malam-malam, jadi *nggak keinget*.", data=[]),
    dict(id="s4", type="M_E011_ATAP", kicker="YANG BISA LO LAKUIN", sub="taman atap, istirahat", say="Jadi jangan nunggu bos inget sendiri. Satu, bikin *catatan menang* tiap Jumat, cukup tiga baris. Dua, pakai *angka*: berapa, kapan, dampaknya apa. Tiga, *kirim* ringkasannya seminggu sebelum evaluasi.", data=["tips", "tip_cues"]),
    dict(id="s5", type="M_E011_EVAL2", kicker="EVALUASI BERIKUTNYA", sub="setahun kemudian", say="Evaluasi berikutnya, bos datang bawa ringkasan lo, bukan cuma ingatannya. Kesalahan tetap dibahas, tapi sebelas bulan bagusnya juga. Bos lo pernah cuma ngungkit yang jelek? Cerita di komentar.", data=[]),
]
END_PAD = 2.4
SPLIT_SHIFT = {0: 1}
