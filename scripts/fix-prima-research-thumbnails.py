#!/usr/bin/env python3
"""Elimina la miniatura de Figma en las láminas 06 y 07 de research Prima."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

RESEARCH = Path(__file__).resolve().parents[1] / "public/projects/prima/research"


def fix_06(path: Path) -> None:
    img = Image.open(path).convert("RGB")
    px = img.load()
    white = img.getpixel((800, 400))[:3]
    orange = img.getpixel((2750, 1100))[:3]
    draw = ImageDraw.Draw(img)
    draw.rectangle([2515, 1635, 2938, 1852], fill=white)
    for y in range(1710, 1860):
        for x in range(2905, 3440):
            px[x, y] = white if x < 3005 else orange
    draw.rectangle([3165, 1768, 3439, 1888], fill=orange)
    img.save(path, optimize=True)


def fix_07(path: Path) -> None:
    img = Image.open(path).convert("RGB")
    px = img.load()
    orange = img.getpixel((2750, 1100))[:3]
    for y in range(1655, 1889):
        for x in range(3028, 3440):
            px[x, y] = orange
    img.save(path, optimize=True)


def main() -> None:
    fix_06(RESEARCH / "prima-challenge-research-06.png")
    fix_07(RESEARCH / "prima-challenge-research-07.png")
    print("fixed research slides 06 and 07")


if __name__ == "__main__":
    main()
