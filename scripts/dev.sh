#!/usr/bin/env bash
# Libera puertos de Next y .next/dev para evitar "Another next dev server is already running".
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

for port in 3000 3001 3002; do
  if pids=$(lsof -ti:"$port" -sTCP:LISTEN 2>/dev/null); then
    echo "Liberando puerto $port (PIDs: $pids)"
    kill -9 $pids 2>/dev/null || true
  fi
done

rm -rf .next/dev

NEXT_BIN="$ROOT/node_modules/.bin/next"
if [[ ! -x "$NEXT_BIN" ]]; then
  echo "Ejecuta primero: npm install"
  exit 1
fi

if [[ "${1:-}" == "--turbo" ]]; then
  shift
  exec "$NEXT_BIN" dev -H localhost "$@"
else
  exec "$NEXT_BIN" dev -H localhost --webpack "$@"
fi
