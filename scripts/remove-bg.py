"""Hace transparente el fondo negro exterior de un PNG.

Usa flood-fill desde las cuatro esquinas y solo convierte a transparente
los píxeles negros conectados al borde, preservando elementos internos
oscuros (p. ej. la barra lateral del mockup).
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image


def remove_outer_black(in_path: Path, out_path: Path, threshold: int = 24) -> None:
    img = Image.open(in_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    if pixels is None:
        raise RuntimeError("No se pudo leer pixeles de la imagen")

    visited = [[False] * height for _ in range(width)]
    queue: deque[tuple[int, int]] = deque()

    def is_black(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        if a == 0:
            return False
        return r <= threshold and g <= threshold and b <= threshold

    seeds: list[tuple[int, int]] = []
    seeds.extend((x, 0) for x in range(width))
    seeds.extend((x, height - 1) for x in range(width))
    seeds.extend((0, y) for y in range(height))
    seeds.extend((width - 1, y) for y in range(height))

    for sx, sy in seeds:
        if not visited[sx][sy] and is_black(sx, sy):
            queue.append((sx, sy))
            visited[sx][sy] = True

    while queue:
        x, y = queue.popleft()
        pixels[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                if is_black(nx, ny):
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    img.save(out_path, format="PNG", optimize=True)
    print(f"OK -> {out_path} ({width}x{height})")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("uso: remove-bg.py <imagen> [salida]")
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src
    remove_outer_black(src, dst)
