#!/bin/bash
# Pulihkan bahan yang tidak ikut di paket inti: three.js 0.170.0 dan font @fontsource (lewat npm pack).
# Jalankan dari folder repo hasil ekstrak paket inti: bash pulihkan.sh
set -euo pipefail
cd "$(dirname "$0")"
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
