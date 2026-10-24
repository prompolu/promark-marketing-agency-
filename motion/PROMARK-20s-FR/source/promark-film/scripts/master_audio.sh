#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python scripts/compose_audio.py
ffmpeg -y -i assets/mix-unmastered.wav -af loudnorm=I=-16:TP=-1:LRA=9:measured_I=-19.05:measured_TP=-6.30:measured_LRA=2.70:measured_thresh=-29.05:offset=-0.50:linear=true -ar 48000 -ac 2 assets/soundtrack.wav
