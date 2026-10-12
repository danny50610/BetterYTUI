#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")" && pwd)"
cd "$root"

srcdir="${root}/src"
if [[ ! -f "${srcdir}/manifest.json" ]]; then
  echo "找不到 src/manifest.json" >&2
  exit 1
fi

version="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "${srcdir}/manifest.json")"
if [[ -z "$version" ]]; then
  echo "src/manifest.json 沒有 version" >&2
  exit 1
fi

outdir="${root}/dist"
outfile="${outdir}/better-yt-ui-${version}.zip"

mkdir -p "$outdir"
rm -f "$outfile"

# zip 根目錄就是擴充套件根目錄，只收執行時需要的檔案。
(
  cd "$srcdir"
  zip -r "$outfile" \
    manifest.json \
    main.css \
    shared.js \
    content.js \
    options.html \
    options.js \
    icon.png \
    -x "*/.DS_Store" "*.DS_Store"
)

echo "已打包 ${outfile}"
unzip -l "$outfile"
