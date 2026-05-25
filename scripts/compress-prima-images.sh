#!/usr/bin/env bash
# Comprime assets de Prima para web (máx. 2400px en el lado largo).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PRIMA="$ROOT/public/projects/prima"
MAX_EDGE=2400
JPG_QUALITY=82

compress_file() {
  local file="$1"
  local ext="${file##*.}"
  ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

  case "$ext" in
    jpg|jpeg)
      sips -Z "$MAX_EDGE" "$file" --out "$file" >/dev/null
      sips -s format jpeg -s formatOptions "$JPG_QUALITY" "$file" --out "$file" >/dev/null
      ;;
    png)
      sips -Z "$MAX_EDGE" "$file" --out "$file" >/dev/null
      ;;
    *)
      return 0
      ;;
  esac
}

while IFS= read -r -d '' file; do
  case "$file" in
    *-original/*|*/product\ video/*|*/card/*)
      continue
      ;;
  esac
  compress_file "$file"
  echo "compressed: ${file#$ROOT/}"
done < <(find "$PRIMA" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) ! -path '*-original/*' -print0)

echo "Done."
