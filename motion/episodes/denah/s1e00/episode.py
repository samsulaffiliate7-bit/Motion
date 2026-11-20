"""Denah Rumah Dunia · Season 1 "Bumi Dimulai dari Jawa" · Episode 0 "Rumah Nol" (konsep ulang pemilik 20 Nov 2026, docs/KONSEP-S1.md bagian 2).
Storyboard: STORYBOARD.md. Angka cerita fiksi (like = 1 tempat tinggal/unit hunian, follow = 1 penduduk). Episode 0 belum membedah rumah asli.
Pilihan Joglo / Limasan / Kampung = jenis rumah tradisional Jawa (sumber umum: entri "Rumah adat Jawa" / "Joglo" di Wikipedia bahasa Indonesia;
fakta detail tiap rumah wajib bersumber mulai Ep 1)."""

META = dict(format="serial Season 1", pilar="rumah dunia", tokoh="Dena, Pak Mandor", lokasi="bola Bumi, lahan Jawa (sawah, gunung), bedeng terpal, patok benang, sawah, meja maket",
            hook="Bumi di-reset, rumah pertama di dunia dibangun di Jawa", variasi="episode 0", interaksi="komen: Joglo / Limasan / Kampung", suara="Sulafat", season=1, episode=0, babak=1)
STATE = dict(episode=0, penduduk=2, hunian=0, hujan_hari=3, denah_mm=5000, langkah=3)
KURS = dict(follow="1 penduduk baru", like="1 tempat tinggal (rumah/unit apartemen; bentuk ditentukan cerita)")


def compute():
    s = STATE; assert s["penduduk"] == 2 and s["hunian"] == 0 and s["hujan_hari"] == 3
    return dict(hud=dict(items=[f"EPISODE {s['episode']}", f"👥 {s['penduduk']}", f"🏠 {s['hunian']}", f"🌧️ {s['hujan_hari']} HARI"]),
                hujan=s["hujan_hari"], mm=s["denah_mm"], langkah=s["langkah"])


SCENES = [
    dict(id="s1", type="D0_BUMI", kicker="", sub="", data=["hud"],
         say="Bayangin Bumi di-*reset*. Nggak ada satu rumah pun. Dan rumah pertama di dunia... harus gue bangun di *Pulau Jawa*."),
    dict(id="s2", type="D0_LAHAN", kicker="TANAH JAWA", sub="hari nol", data=["hud"],
         say="Gue Dena, arsitek yang baru lulus. Ini lahannya. Ada gunung, ada sawah, ada sungai. Rumahnya? *Nol*."),
    dict(id="s3", type="D0_MANDOR", kicker="", sub="", data=["hud"],
         say="Tim gue cuma satu orang. *Pak Mandor*. Tukang paling senior di dunia... soalnya cuma dia."),
    dict(id="s4", type="D0_UKUR", kicker="", sub="", data=["hud", "mm", "langkah"],
         say="Gue bawa denah rapi, ukurannya pas sampai *milimeter*. Pak Mandor ngukur pakai *langkah kaki*. Katanya, teori arsitek beda sama lapangan, Mbak."),
    dict(id="s5", type="D0_HUJAN", kicker="", sub="", data=["hud", "hujan"],
         say="Masalahnya, ini Jawa. Musim hujan udah dekat. *Tiga hari lagi*, hujan pertama turun. Kalau belum ada atap... kita *kehujanan* beneran."),
    dict(id="s6", type="D0_SAWAH", kicker="", sub="", data=["hud"],
         say="Penduduk Bumi: *dua*. Rumah: *nol*. Dan Pak Mandor udah mulai gali fondasi... di *tengah sawah*."),
    dict(id="s7", type="D0_AJAK", kicker="", sub="", data=["hud"],
         say="Kalian yang nentuin. *Follow*, satu penduduk baru. *Like*, satu tempat tinggal, rumah atau *apartemen*. *Komen*, rumah berikutnya. Rumah pertama di dunia: *Joglo*, *Limasan*, atau rumah *Kampung*?"),
]
END_PAD = 0.4
CONFIG_OVERRIDE = {"style": "rumahdunia", "theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}
