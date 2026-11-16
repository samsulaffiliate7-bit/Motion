"""Balai Desa Bocor (konsep v3, Siaran Pers Balai): lomba desa bersih dadakan; warga ngecat pagar semalaman, balai mengklaim "swadaya balai".
Cerita fiksi: desa, tokoh, lomba, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Siaran Pers Balai", "pilar": "seremonial dan pencitraan", "tokoh": ["warga", "Pak Kades", "juri (rekaan)", "Dimas (pemuda)"],
        "lokasi": ["gang malam (ngecat pagar)", "gang pagi (juri datang)", "balai (konferensi pers)", "gang (wawancara)"],
        "hook": "kontras", "variasi": [4, 5], "suara": "Achird"}


def compute():
    return dict(jam_cat="21.00 → 02.00", foto=20, press_tail="🖌️ 0 foto warga",
                siaran=["Berkat KERJA KERAS pemerintah desa,", "Desa Bocor Indah meraih juara 2 lomba desa bersih."], siaran_cues=["Bunyinya", "juara dua"],
                iv=dict(who="pemuda", name="Dimas", role="Karang Taruna, ngecat sampai jam 2", q1="“Hadiahnya masuk kas balai.”", q2="“Warga dapat sertifikat.”", q2cue="sertifikat",
                        qend="Di tempat lo, yang kerja siapa,<br><span style=\"color:#B5452B\">yang difoto siapa?</span>", qend_cue="Di tempat lo"),
                board=["LOMBA DESA BERSIH", "Juara 2", "Hadiah: kas balai", "Warga: sertifikat"])


SCENES = [
    dict(id="s1", type="BL_MALAMCAT", kicker="SIARAN PERS BALAI", sub="lomba desa bersih", say="Surat edaran datang jam delapan malam: besok pagi, juri lomba desa bersih datang. Jam sembilan, warga sudah memegang kuas. Catnya *beli sendiri*, senternya bawa sendiri. Pagar satu gang selesai jam dua pagi.", data=[]),
    dict(id="s2", type="BL_JURI", kicker="PAGINYA", sub="juri datang", say="Jam delapan pagi, mobil juri datang. Pak Kades menyambut di depan pagar yang masih bau cat. Di depan juri, ia bilang: semua ini hasil *swadaya balai*. Warga di belakangnya baru tidur *tiga jam*.", data=[]),
    dict(id="s3", type="BL_PRESS", kicker="SIARAN PERS", sub="balai desa", say="Sorenya, balai menerbitkan siaran pers. Bunyinya: berkat kerja keras pemerintah desa, Desa Bocor Indah meraih *juara dua* lomba desa bersih. Fotonya dua puluh. Foto warga yang mengecat? *Nol*.", data=[]),
    dict(id="s4", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Dimas, karang taruna", say="Dimas, yang mengecat sampai jam dua pagi, cuma tertawa. Hadiahnya sepuluh juta, katanya, masuk kas balai. Warga dapat *sertifikat*, satu lembar untuk satu gang. Di tempat lo, yang kerja siapa, yang difoto siapa? Tulis di komentar.", data=[]),
]
END_PAD = 7
