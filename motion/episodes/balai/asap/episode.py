"""Balai Desa Bocor (konsep v3, Liputan Darurat): asap lahan terbakar 2 minggu, balai menjadwalkan rapat minggu depan; warga memadamkan api sendiri.
Cerita fiksi: desa, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, kejadian, atau daerah nyata."""
META = {"format": "Liputan Darurat", "pilar": "lingkungan dan bencana", "tokoh": ["warga", "anak sekolah", "Pak Darto (warga)"],
        "lokasi": ["gang berasap", "papan pengumuman balai", "jalan ke sekolah", "gang (wawancara)", "pinggir lahan terbakar"],
        "hook": "kontras", "variasi": [1, 5], "suara": "Charon"}
PARAMS = dict(hari=14, kali=3)


def compute(p=PARAMS):
    assert p["hari"] == 14
    return dict(hari=p["hari"], kali=p["kali"],
                iv=dict(who="bapak", name="Pak Darto", role="Warga dekat lahan terbakar", q1="“Kami padamkan pakai ember.”", q2="“Yang datang cuma asapnya.”", q2cue="kecuali asapnya"),
                board=["INFO ASAP", "Hari ke-14", "Rapat: Senin depan", "Masker: beli sendiri"])


SCENES = [
    dict(id="s1", type="BL_ASAP", kicker="LIPUTAN DARURAT", sub="asap hari ke-14", say="Asap sudah *dua minggu* menyelimuti Desa Bocor Indah. Matahari jadi oranye, jemuran bau gosong, warga pakai masker di dalam rumah. Lalu balai mengumumkan langkah tegas: *rapat*. Minggu depan.", data=[]),
    dict(id="s2", type="BL_PENGUMUMAN", kicker="PENGUMUMAN", sub="papan balai", say="Pengumumannya ditempel rapi di papan balai: rapat penanganan asap, *Senin depan*. Di sebelahnya, surat edaran minggu lalu: warga harap pakai masker. Asapnya sudah empat belas hari. Maskernya? *Beli sendiri*.", data=[]),
    dict(id="s3", type="BL_ASAP", variant="sekolah", kicker="SEMENTARA ITU", sub="jalan ke sekolah", say="Sementara itu, anak-anak tetap berangkat sekolah. Masker dibeli sendiri, sekolah tetap masuk. Warga yang batuk pilek naik *tiga kali lipat* dalam dua minggu.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="dekat lahan terbakar", say="Pak Darto, yang kebunnya dekat lahan terbakar, sudah tiga kali memadamkan api kecil bersama tetangga. Pakai ember, pakai cangkul. *Belum ada yang datang*, katanya, kecuali asapnya.", data=[]),
    dict(id="s5", type="BL_ASAP", variant="end", kicker="SEMINGGU KEMUDIAN", sub="pinggir lahan", say="Seminggu kemudian, rapat akhirnya digelar. Hasilnya: dibentuk *tim*. Di luar aula, warga masih mengangkat ember. Di tempat lo, bencana ditangani sekarang, atau rapat dulu? Tulis di komentar.", data=[]),
]
END_PAD = 3
