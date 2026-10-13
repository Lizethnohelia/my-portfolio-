/**
 * Catálogo único de proyectos: usado por el home y por las páginas de detalle
 * dinámicas en /projects/[slug].
 *
 * - Tipos: `./types.ts`
 * - Contenido de cada proyecto: `./content/<slug>.ts` (un archivo por proyecto)
 * - Para añadir un proyecto: crea su archivo en `content/` y súmalo a `PROJECTS`.
 */

import type { Project } from "./types";
import { prima } from "./content/prima";
import { koban } from "./content/koban";
import { bancoFinandina } from "./content/banco-finandina";
import { bancoBogotaPosLoan } from "./content/banco-bogota-pos-loan";
import { bancoBogotaCdt } from "./content/banco-bogota-cdt";

export type * from "./types";

export const PROJECTS: Project[] = [
  prima,
  koban,
  bancoFinandina,
  bancoBogotaPosLoan,
  bancoBogotaCdt,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
