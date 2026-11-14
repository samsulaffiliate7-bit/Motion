#!/bin/bash
# Pulihkan bahan yang tidak ikut di paket inti: three.js 0.170.0 dan font @fontsource (lewat npm pack).
# Pakai: bash pulihkan-kd.sh           -> unduh three.js + font ke motion/
#        bash pulihkan-kd.sh --paket   -> buat inti-<tanggal>.txt (Kades + Denah saja) untuk diunggah ke arsip Artifact
set -euo pipefail
cd "$(dirname "$0")"
if [ "${1:-}" = "--paket" ]; then
  S=$(mktemp -d)
  for f in CLAUDE.md pulihkan-kd.sh .gitignore motion/README.md motion/engine/build.py motion/engine/render.js motion/engine/player3d.html motion/engine/bedah_video.py motion/engine/cek_potongan.py motion/engine/jadwal_blok.py \
           motion/engine/w3d/kit.js motion/engine/w3d/desa3d.js motion/engine/w3d/bumi.js motion/accounts/kades/config.json motion/accounts/denah/config.json \
           motion/assets/logos/small/02-kades-magang-juara.jpg motion/assets/logos/small/05-denah-rumah-dunia.jpg motion/assets/geo/world360.json \
           docs/PROFIL-AKUN.md docs/KONSEP-V2.md docs/BANK-TOPIK.md docs/KALENDER-KD.md docs/JAM-TAYANG-KD.md docs/ANALITIK.md motion/media/repliz-files.json; do
    [ -f "$f" ] && mkdir -p "$S/$(dirname "$f")" && cp "$f" "$S/$f"
  done
  mkdir -p "$S/docs/jadwal"; cp docs/jadwal/*.md "$S/docs/jadwal/" 2>/dev/null || true
  [ -d motion/analytics ] && cp -r motion/analytics "$S/motion/" || true
  python3 - "$S" <<'PY'
import sys, re, json, glob, os
S = sys.argv[1]; OTHER = re.compile(r'Dompet|Hewan|Balai|Meja|dompet|hewan|balai|meja|Nana|Raka')
def sections(path, keep):
    if not os.path.exists(path): return
    out, cur = [], True
    for ln in open(path).read().split('\n'):
        if ln.startswith('## '): cur = keep(ln)
        if cur and not (ln.startswith('|') and OTHER.search(ln)): out.append(ln)
    open(path, 'w').write('\n'.join(out))
sections(S + '/docs/PROFIL-AKUN.md', lambda h: not re.search(r'## [1346]\. ', h))
sections(S + '/docs/KONSEP-V2.md', lambda h: 'Balai' not in h)
sections(S + '/docs/BANK-TOPIK.md', lambda h: not re.search(r'## [1346]\. ', h))
for f in glob.glob(S + '/docs/jadwal/*.md'):
    L = [l for l in open(f).read().split('\n') if not (l.startswith('| ') and not l.startswith('| Video') and not re.match(r'\| (kades|denah)-', l))]
    open(f, 'w').write('\n'.join(L))
p = S + '/motion/media/repliz-files.json'
if os.path.exists(p):
    d = json.load(open(p)); json.dump({k: v for k, v in d.items() if k.startswith(('_', 'kades', 'denah'))}, open(p, 'w'), ensure_ascii=False, indent=1)
PY
  OUT="$PWD/inti-$(TZ=Asia/Jakarta date +%Y%m%d%H%M).txt"
  ( cd "$S" && tar cf - --sort=name --owner=0 --group=0 . | xz -9e | base64 -w0 > "$OUT" ); rm -rf "$S"; ls -l "$OUT"; exit 0
fi
T=$(mktemp -d)
( cd "$T" && npm pack --silent three@0.170.0 @fontsource/baloo-2@5.3.0 @fontsource/nunito@5.3.0 @fontsource/fredoka@5.3.0 @fontsource/poppins@5.3.0 >/dev/null )
mkdir -p motion/engine/vendor motion/assets/fonts
tar xzf "$T/three-0.170.0.tgz" -C "$T" package/build/three.module.min.js package/LICENSE
cp "$T/package/build/three.module.min.js" motion/engine/vendor/three-0.170.0.module.min.js
cp "$T/package/LICENSE" motion/engine/vendor/three-LICENSE.txt
for pair in baloo-2:baloo-2-latin-700-normal baloo-2:baloo-2-latin-800-normal nunito:nunito-latin-800-normal fredoka:fredoka-latin-600-normal fredoka:fredoka-latin-700-normal poppins:poppins-latin-600-normal poppins:poppins-latin-700-normal poppins:poppins-latin-800-normal; do
  pkg=${pair%%:*}; f=${pair#*:}
  tar xzf "$T/fontsource-$pkg-5.3.0.tgz" -O "package/files/$f.woff2" > "motion/assets/fonts/$f.woff2"
done
rm -rf "$T"
echo "954c1c226c332f2aecea3d9d6fbc25d5  motion/engine/vendor/three-0.170.0.module.min.js" | md5sum -c -
if [ ! -d .git ]; then git init -q && git add -A && git -c user.name=motion -c user.email=motion@localhost commit -qm "Pulih dari arsip Artifact" && echo "git lokal dibuat"; fi
echo "Pulih selesai. Cek: python3 motion/engine/build.py <akun> <ep> --draft && node motion/engine/render.js <akun> <ep> --stills 1"
