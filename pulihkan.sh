#!/bin/bash
# Pulihkan bahan besar dari npm (three.js + font) setelah membuka paket inti dari Drive.
# Pakai: bash pulihkan.sh            -> unduh three.js + font ke motion/
#        bash pulihkan.sh --paket    -> buat ulang inti-<tanggal>.txt (untuk diunggah ke artifact Arsip Kode Dompet Meja)
set -e; cd "$(dirname "$0")"
if [ "$1" = "--paket" ]; then
  tar cJf /tmp/inti.txz --exclude='motion/out' --exclude='inti-*.txt' --exclude='ep-*.txt' --exclude='*.wav' --exclude='motion/engine/vendor' --exclude='motion/assets/fonts' --exclude='*_lama.js' --exclude='.git' --exclude='__pycache__' .
  base64 -w0 /tmp/inti.txz > inti-$(date +%Y%m%d).txt; ls -l /tmp/inti.txz inti-*.txt; exit 0
fi
T=$(mktemp -d); cd $T
npm pack three@0.170.0 @fontsource/baloo-2@5.3.0 @fontsource/poppins@5.3.0 --silent >/dev/null
cd - >/dev/null; mkdir -p motion/engine/vendor motion/assets/fonts
tar xzf $T/three-0.170.0.tgz -C $T && cp $T/package/build/three.module.min.js motion/engine/vendor/three-0.170.0.module.min.js && cp $T/package/LICENSE motion/engine/vendor/three-LICENSE.txt
for f in baloo-2 poppins; do mkdir -p $T/$f && tar xzf $T/fontsource-$f-5.3.0.tgz -C $T/$f; done
cp $T/baloo-2/package/files/baloo-2-latin-{700,800}-normal.woff2 motion/assets/fonts/
cp $T/poppins/package/files/poppins-latin-{600,700,800}-normal.woff2 motion/assets/fonts/
# player memuat juga Fredoka/Nunito; tidak dipakai Dompet/Meja, cukup salinan Baloo sebagai pengganti supaya tidak 404
cp motion/assets/fonts/baloo-2-latin-700-normal.woff2 motion/assets/fonts/fredoka-latin-600-normal.woff2
cp motion/assets/fonts/baloo-2-latin-700-normal.woff2 motion/assets/fonts/fredoka-latin-700-normal.woff2
cp motion/assets/fonts/baloo-2-latin-800-normal.woff2 motion/assets/fonts/nunito-latin-800-normal.woff2
rm -rf $T; echo "PULIH: three.js + font siap"
