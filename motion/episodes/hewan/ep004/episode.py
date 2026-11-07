"""Hewan Berdasi Kotor ep004 (3D): ide Tikus diakui Kucing di depan Direktur. Fabel fiksi."""
PARAMS = {}


def compute(p=PARAMS):
    return dict(ide="Matikan AC ruang kosong jam 6 sore", moral_html="Ide yang tidak tercatat,<br>gampang <span style='color:#F28C28'>berpindah tangan</span>.",
                q_html="Pernah ide lo diakui orang lain?")


SCENES = [
    dict(id="s1", type="H_NIGHTDESK", kicker="JAM 23.00", sub="kantor sepi", say="Jam sebelas malam, Tikus Kecil menemukan *ide* untuk menghemat biaya kantor. Besok paginya, tepuk tangannya justru buat *Kucing Berdasi*. Begini ceritanya.", data=["ide"]),
    dict(id="s2", type="H_CORRIDOR", kicker="KEESOKAN PAGI", sub="lorong kantor", say="Tikus menulis idenya rapi di *satu lembar*, lalu menyerahkannya ke atasannya, Kucing Berdasi, minta pendapat.", data=["ide"]),
    dict(id="s3", type="H_CATROOM", kicker="RUANG KUCING", sub="lampu meja", say="Kucing membaca sebentar, lalu *tersenyum*. Katanya: nanti saya pelajari dulu ya. Kertasnya masuk ke *saku jas*.", data=["ide"]),
    dict(id="s4", type="H_MEETING", kicker="RAPAT BESAR", sub="di depan direktur", say="Siangnya di rapat besar, Kucing berdiri dan mempresentasikan ide itu. Kata per kata, *sama persis*. Direktur Burung Hantu langsung *tepuk tangan*.", data=["ide"]),
    dict(id="s5", type="H_DOORWAY", kicker="DI POJOK", sub="Tikus diam", say="Tikus cuma bisa diam di pojok ruangan. Kerbau menepuk bahunya dan berbisik: lain kali, kirim idenya lewat *email*, dan tembuskan ke direktur.", data=["ide"]),
    dict(id="s6", type="H_MORAL", kicker="MORAL", sub="simpan jejaknya", say="Ide yang tidak tercatat, gampang *berpindah tangan*. Simpan jejaknya: tanggal, nama, dan siapa saja yang menerimanya. Pernah ide lo diakui orang lain? Tulis di komentar.", data=["ide", "moral_html", "q_html"]),
]
END_PAD = 3.6
