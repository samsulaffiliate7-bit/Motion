"""Denah Rumah Dunia · Season 1 · Episode 1 "Rumah Kampung, Bukan Vila!" (tayang 22 Nov 2026). Storyboard: STORYBOARD.md.

DATA INTERAKSI Ep 0 (ditarik ulang lewat Repliz 20 Nov 2026 ±21:45 WIB, tepat sebelum menulis naskah; satu akun satu suara, komen akun sendiri tidak dihitung):
- Like: TikTok 3 + IG 82 + YouTube 13 = 98  -> LIKE = 1 tempat tinggal -> 98 tempat tinggal (termasuk rumah kampung pertama).
- Follow (cara patokan, docs/data/2026-11-20-ep0.md): TikTok newFollower +1, YouTube +3 (subscriber Ep 0), IG 5.346 = patokan 5.346 -> +0. Total +4 -> penduduk 2 + 4 = 6.
- Komen pilihan (JOGLO/LIMASAN/KAMPUNG): KAMPUNG 1 (IG afrilianeva "kampung kak"); JOGLO 0; LIMASAN 0.
  Di luar pilihan: VILA 3 (IG fa_19_medan_mall "Vila", onepeolpe_ "vila", vviestl "bikin villa ka biar nyaman"), rumah betang 1 (IG azzridhz), rumah adat 1 (IG ndaa_da03),
  apartemen 1 (TT GAZA), perusahaan 1 (IG alep0511), "mau ikut kerja" 1 (TT GAZA), "penonton pertama" (TT). YouTube: 1 komen (akun sendiri, tidak dihitung).
- Keputusan: KAMPUNG (satu-satunya pilihan yang dipilih). Vila = lelucon (tidak dibangun). Betang + rumah adat -> cliffhanger rumah panjang.

SUMBER FAKTA (diakses 20-21 Nov 2026):
[1] id.wikipedia.org/wiki/Rumah_Kampung: "Rumah model Kampung (Kamponghuis) adalah rumah tradisional masyarakat Jawa ... yang terdiri atas 8 tiang utama"
    (rujukan: O. J. Raap, Kota di Djawa Tempo Doeloe, KPG 2017, hlm. 142); "Penyebaran di Pulau Jawa ... banyak ditemukan di Pulau Madura dan Pulau Bali."
[2] en.wikipedia.org/wiki/Javanese_traditional_house ("Javanese hierarchy of roof form"; rujukan Gunawan Tjahjono (ed.), Indonesian Heritage vol. 6 Architecture, 1998):
    atap tipe kampung = rumah rakyat biasa Jawa ("a house of Javanese common people"); limasan = keluarga berstatus lebih tinggi; joglo lebih tinggi lagi; tajug untuk tempat suci.
[3] id.wikipedia.org/wiki/Rumah_betang: rumah adat Kalimantan (Dayak), panggung memanjang, panjang 30-150 m, biasanya dihuni 100-150 jiwa.
Visual atap pelana + dinding anyaman bambu = penggambaran umum (tidak dinarasikan sebagai fakta)."""

META = dict(format="serial Season 1", pilar="rumah dunia", tokoh="Dena, Pak Mandor", lokasi="lahan proyek (papan vila), tampak atas rumah kampung, hujan pertama, sawah penuh rumah, meja maket",
            hook="hujan tinggal dua hari, mandor mau bangun vila", variasi="komen jadi konten (vila)", interaksi="komen: Betang / Gadang / Honai", suara="Sulafat", season=1, episode=1, babak=1)
DATA = dict(like=dict(tiktok=3, ig=82, youtube=13), follow=dict(tiktok=1, youtube=3, ig=5346 - 5346), komen=dict(kampung=1, joglo=0, limasan=0, vila=3, betang=1, rumah_adat=1, apartemen=1))
STATE0 = dict(penduduk=2, hunian=0)


def compute():
    like = sum(DATA["like"].values()); follow = sum(DATA["follow"].values())
    assert like == 98 and follow == 4
    penduduk = STATE0["penduduk"] + follow; hunian = STATE0["hunian"] + like
    k = DATA["komen"]; assert k["kampung"] > max(k["joglo"], k["limasan"])
    return dict(hud=dict(items=["EPISODE 1", f"👥 {penduduk}", f"🏠 {hunian}", "🌧️ 2 HARI"]), penduduk=penduduk, hunian=hunian, like=like, follow=follow, hujan=2,
                vila=k["vila"], kampung=k["kampung"], joglo=k["joglo"], limasan=k["limasan"],
                fakta=[["8 TIANG UTAMA", "rumah kampung Jawa", "delapan"], ["RUMAH RAKYAT", "limasan & joglo: kaum terpandang", "terpandang"], ["SAMPAI MADURA & BALI", "rumah kampung menyebar", "Madura"]])


SCENES = [
    dict(id="s1", type="D1_VILA", kicker="", sub="", data=["hud"],
         say="Hujan pertama tinggal *dua hari*. Dan Pak Mandor malah mau bangun... *vila*."),
    dict(id="s2", type="D1_NETIZEN", kicker="", sub="", data=["hud"],
         say="Katanya, kata netizen, Mbak! Iya, yang komen vila ada *tiga*. Tapi dari tiga pilihan kemarin, yang dipilih cuma satu: rumah *Kampung*."),
    dict(id="s3", type="D1_PUTUS", kicker="", sub="", data=["hud"],
         say="Vila itu lama. Kita butuh atap, cepat. Jadi rumah pertama di dunia... *rumah kampung*."),
    dict(id="s4", type="D1_BEDAH", kicker="BEDAH RUMAH", sub="rumah kampung Jawa", data=["hud"],
         say="Rumah kampung itu rumahnya rakyat biasa di Jawa. Rangkanya bertumpu di *delapan tiang utama*. Dulu, bentuk atap nunjukin status: limasan dan joglo buat keluarga yang lebih *terpandang*. Rumah kampung? Buat semua orang, sampai ke *Madura* dan Bali."),
    dict(id="s5", type="D1_HUJAN", kicker="", sub="", data=["hud"],
         say="Delapan tiang berdiri, atap naik... dan pas atapnya jadi, hujan pertama *turun*. Pas banget!"),
    dict(id="s6", type="D1_LIKE", kicker="", sub="", data=["hud"],
         say="Terus like kalian masuk. *{like|w}* like, {hunian|w} tempat tinggal. Tapi penduduknya... baru *{penduduk|w}* orang."),
    dict(id="s7", type="D1_AJAK", kicker="", sub="", data=["hud"],
         say="Ada yang komen: rumah *betang*. Rumah panjang dari Kalimantan, bisa seratus lima puluh meter, buat ratusan orang. Rumah kedua kita: *Betang*, *Gadang*, atau *Honai*?"),
]
END_PAD = 1.0
CONFIG_OVERRIDE = {"style": "rumahdunia", "theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
