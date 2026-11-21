"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 1 "Malam Pertama" (tayang 22 Nov 2026). Storyboard: STORYBOARD.md.
Data interaksi Ep 0 ditarik ulang lewat Repliz 20 Nov 2026 ±22:15 WIB (docs/data/2026-11-20-ep0.md = patokan):
- TikTok: 764 view, 46 like, 6 komen, newFollower 25. IG: 7.965 view, 343 like, 23 komen, follower 3.245 (patokan 3.242 -> +3).
  YouTube: subscriber 26 (= patokan; +7 dari Ep 0 sudah dihitung di file data). Like YouTube belum tersedia (Analytics 2-3 hari), tidak dihitung.
- FOLLOW = 25 + 3 + 7 = 35 penyintas. LIKE = 46 + 343 = 389 -> 38 (10 like = 1) = 19 karung beras + 19 ikat bambu.
- Pilihan (satu akun satu suara): ganjal gerobak 2, naik ke balai 2 (satu "sambil bakar jerami"), bakar jerami 1 -> seri; Gilang menggabungkan dua saran warga.
- Barang bawaan dari komen (nama disamarkan): engsel baru, peralatan tukang dari kota sebelah, paku + besi duri, satu truk bantuan; lelucon "20 pasukan militer", "tembok baja 25 meter".
Semua tokoh, tempat, angka = fiksi."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Bu Yati, Pak Kardi, Sinta, penyintas baru, anak pramuka, zombie",
            lokasi="gerbang sore, gerbang dalam (truk), alun-alun, gudang, gerbang->balai, pagar malam, teras balai malam",
            hook="+35 penyintas datang ke gerbang", variasi="lelucon pramuka", interaksi="komen: besi duri / cari makan ke pasar / periksa penyintas baru",
            sindiran="tembok baja 25 meter dari bambu", suara="Charon", season=1, episode=1, babak=1)
DATA = dict(tt_like=46, ig_like=343, tt_follow=25, ig_follow=3, yt_follow=7, vote=dict(gerobak=2, balai=2, jerami=1))
STATE0 = dict(penyintas=37, beras=3, bambu=0)


def compute():
    d, s = DATA, STATE0
    follow = d["tt_follow"] + d["ig_follow"] + d["yt_follow"]; like = d["tt_like"] + d["ig_like"]; unit = like // 10
    karung, ikat = unit - unit // 2, unit // 2
    assert follow == 35 and like == 389 and unit == 38 and d["vote"]["gerobak"] == d["vote"]["balai"]
    pen = s["penyintas"] + follow
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-1", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, karung=karung, ikat=ikat, pen0=s["penyintas"], pen=pen)


SCENES = [
    dict(id="b1", type="B1_DATANG", kicker="", sub="", data=["hud", "follow", "pen0", "pen"],
         say="Kemarin gerbang kami macet. Hari ini... *{follow|w} orang* datang ke gerbang."),
    dict(id="b2", type="B1_BARANG", kicker="", sub="", data=["hud"],
         say="Ada yang bawa *engsel baru*. Ada tukang dari kota sebelah. Ada yang bawa *paku sama besi duri*. Bahkan ada *satu truk bantuan*."),
    dict(id="b3", type="B1_PRAMUKA", kicker="", sub="", data=["hud"],
         say="Ada juga yang janji bawa *dua puluh pasukan militer*. Datangnya... dua puluh anak *pramuka*. Pak Kardi langsung minta *tembok baja dua puluh lima meter*... Dikasih bambu."),
    dict(id="b4", type="B1_GUDANG", kicker="", sub="", data=["hud", "like", "unit", "karung", "ikat"],
         say="Like kalian jadi *{unit|w}* karung beras dan ikat bambu. Gudang kami nggak kosong lagi."),
    dict(id="b5", type="B1_RENCANA", kicker="", sub="", data=["hud"],
         say="Soal rencana malam ini, suaranya *seri*. Jadi gue pakai dua saran warga sekaligus: gerbang *diganjal gerobak*, semua *naik ke balai*."),
    dict(id="b6", type="B1_SERANG", kicker="", sub="", data=["hud"],
         say="Tengah malam, mereka datang. Pagar dihantam berkali-kali... tapi gerobaknya *nahan*. Malam pertama, kita *selamat*."),
    dict(id="b7", type="B1_AJAK", kicker="", sub="", data=["hud"],
         say="Tapi gue lihat satu penyintas baru... *garuk-garuk lengannya*. Follow, like, komen. Besok kita: *perkuat pagar pakai besi duri*, *cari makanan ke pasar*, atau *periksa semua penyintas baru*?"),
]
END_PAD = 1.2
SPLIT_SHIFT = {}
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}
