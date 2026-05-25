import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repo: evita que Turbopack use un lockfile en una carpeta padre (p. ej. Documents). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  /** Variantes más anchas para láminas / carrusel (evita pixelado en retina y zoom). */
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200, 3840, 4480, 5120],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 100],
  },
};

export default nextConfig;
