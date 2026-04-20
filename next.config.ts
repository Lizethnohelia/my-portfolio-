import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repo: evita que Turbopack use un lockfile en una carpeta padre (p. ej. Documents). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
