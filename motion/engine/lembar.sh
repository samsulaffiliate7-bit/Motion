#!/usr/bin/env bash
# Stills + lembar kontak satu episode: bash motion/engine/lembar.sh <akun> <ep>  -> motion/out/<akun>-<ep>/lembar.jpg
set -e; A=$1; E=$2; D=motion/out/$A-$E
TS=$(python3 -c "import json;t=json.load(open('$D/timeline.json'));print(','.join(['0.3']+[str(round(s['start']+s['dur']*f,1)) for s in t['scenes'] for f in (0.35,0.85)]))")
rm -rf "$D/stills"; node motion/engine/render.js $A $E --stills $TS >/dev/null 2>&1
python3 - "$D" <<'PY'
import sys,glob,re
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/stills/*.jpg'),key=lambda f:float(re.search(r'still_([\d_]+)',f).group(1).replace('_','.')))
W,H=270,480; c=6; r=(len(fs)+c-1)//c; im=Image.new('RGB',(W*c,H*r))
for i,f in enumerate(fs): im.paste(Image.open(f).resize((W,H)),((i%c)*W,(i//c)*H))
im.save(d+'/lembar.jpg',quality=82)
PY
echo "$D/lembar.jpg"
