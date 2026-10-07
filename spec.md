# spec.md — Portafolio de Lizeth Nohelia

> Documento vivo. Describe **qué** es el portafolio, **cómo** está construido y **qué falta**.
> Antes de pedirle un cambio a Claude/Cursor, actualiza esta spec; después pídele: *"Lee spec.md e implementa la tarea X"*.

---

## 1. Visión general

| | |
|---|---|
| **Producto** | Web personal de portafolio |
| **Dueña** | Lizeth Nohelia — Senior Product Designer (UI/UX) con base en Colombia |
| **Idioma del sitio** | Inglés (`<html lang="en">`) |
| **Objetivo** | Conseguir **clientes freelance** y **ofertas de empleo** |
| **Propuesta de valor** | *"I specialize in translating complex business challenges into intuitive, high-converting experiences."* |

### 1.1 Objetivos medibles
1. Un reclutador entiende quién soy, qué hago y con quién he trabajado en **< 10 segundos** (hero).
2. Un visitante llega a un case study con **1 clic** desde el home.
3. Contactarme (email / LinkedIn) está a **1 clic** desde cualquier punto (nav + footer).
4. Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO.

### 1.2 Público
- **Reclutadores y hiring managers** (empresas de producto, US/LatAm): escanean rápido, buscan rol, seniority, empresas y proceso.
- **Clientes potenciales** (startups, fintech, B2B): buscan resultados, impacto y forma de trabajo.
- **Diseñadores / líderes de diseño**: evalúan profundidad del proceso (research, design system).

---

## 2. Stack técnico

| Área | Tecnología |
|---|---|
| Framework | **Next.js 16** (App Router, React Server Components) — ⚠️ versión con cambios; consultar `node_modules/next/dist/docs/` (ver `AGENTS.md`) |
| UI | React 19 + TypeScript 5 |
| Estilos | **Tailwind CSS v4** — tokens en `app/globals.css` (`@theme`) y `tailwind.config.ts` |
| Animación | Framer Motion 12 (respetando `prefers-reduced-motion`) |
| Primitivas | Radix UI (dialog, label, slot), cmdk, lucide-react, CVA + tailwind-merge |
| Fuentes | Manrope (títulos), Open Sans (cuerpo), Geist Mono (mono) vía `next/font` |
| Hosting | **Vercel** (`vercel.json`) |
| Node | ≥ 20 |

**Comandos:** `npm run dev` · `npm run build` · `npm run start` · `npm run lint`

---

## 3. Arquitectura y estructura

```
app/
  layout.tsx            → fuentes, metadata global, <html lang="en">
  page.tsx              → Home: Hero → ProjectsGrid → AboutMe → Experience → Footer
  globals.css           → design tokens (colores, tipografía, spacing, dark mode)
  components/           → secciones del home (HeroSection, ProjectsGrid, AboutMe, Experience, Footer, SiteLogo…)
  projects/
    data.ts             → ⭐ FUENTE ÚNICA de contenido de proyectos (tipos + datos)
    [slug]/page.tsx     → página de case study dinámica (/projects/prima, etc.)
    [slug]/components/  → bloques del case study (header, challenge, design system bento, video, impacto…)
components/             → UI reutilizable (HighlightedText, case-study/*)
lib/                    → utilidades (split de texto para animaciones, formato de fechas, cn())
public/projects/<slug>/ → imágenes y videos de cada proyecto
scripts/                → dev.sh, compresión de imágenes, utilidades Python
```

**Principio clave:** el contenido vive en `app/projects/data.ts`; los componentes solo lo renderizan. Para agregar o editar un proyecto **no** se toca el layout, solo los datos.

---

## 4. Páginas y secciones

### 4.1 Home (`/`)
| # | Sección | Ancla | Contenido | Estado |
|---|---|---|---|---|
| 1 | **Nav fija** | — | Logo, links Work / About / Contact, LinkedIn | ✅ |
| 2 | **Hero** | — | Propuesta de valor, líneas animadas, skills (AI Product Design, Design Systems, UX Research, Prototyping, B2B & B2C, Product Strategy…) | ✅ |
| 3 | **Projects (bento grid)** | `#projects` | Cards de proyectos con `showInProjectsGrid !== false`; hover con texto; enlace al case study | ✅ (solo Prima visible) |
| 4 | **About me** | `#about` | Bio, países de clientes (US, México, Colombia, Bolivia), avatar | ✅ |
| 5 | **Experience** | — | Timeline: Prima (Present), Koban, Zemoga, Banco de Bogotá, Banco Finandina | ✅ |
| 6 | **Footer / Contact** | `#contact` | Email `lizethnoheliagrafica@gmail.com`, LinkedIn, links | ✅ |

### 4.2 Case study (`/projects/[slug]`)
Estructura estándar (tipo `ProjectCaseStudy` en `data.ts`):
1. **Hero** — título, subtítulo, meta (Role, Timeline, Platform, Tools), imagen o video en marco MacBook/navegador.
2. **Project Overview** — contexto del problema.
3. **Product preview** — capturas del producto.
4. **The Challenge** — research, insights, ideación, testing.
5. **Features** — exactamente 3 funcionalidades clave.
6. **Design System** — bento grid de componentes.
7. **Product video** (opcional).
8. **Impact** — métricas (ej. `−40%` tiempo en reuniones de status).
9. **Takeaways / Conclusion**.
10. `not-found.tsx` para slugs inexistentes.

### 4.3 Proyectos
| Slug | Cliente | Industria | Visible en home | Estado del contenido |
|---|---|---|---|---|
| `prima` | Prima | Manufacturing B2B | ✅ | Completo (imágenes, video, design system) |
| `koban` | Koban | Fintech | ❌ | Por completar (placeholders) |
| `banco-finandina` | Banco Finandina | Banking | ❌ | Por completar |
| `banco-bogota-pos-loan` | Banco de Bogotá | POS Loans | ❌ | Por completar |
| `banco-bogota-cdt` | Banco de Bogotá | CDT Onboarding | ❌ | Por completar |

**Para publicar un proyecto:** completar textos reales, reemplazar todos los `visualPlaceholder: true`, subir assets a `public/projects/<slug>/`, quitar `showInProjectsGrid: false`.

---

## 5. Sistema de diseño

- **Colores (tokens):** `background`, `foreground`, `primary`, `surface`, `border`, `muted`, `gray`, `cinema` (secciones oscuras de video), `bento-lime`, `bento-yellow`. Soporte dark mode con `prefers-color-scheme`.
- **Tipografía:** escala fluida con `clamp()` — `text-heading-1` … `text-heading-6`, `text-body-*`. Manrope para display, Open Sans para cuerpo.
- **Spacing:** tokens `hero-inline`, `hero-bottom`, `hero-nav-y` (+ variantes mobile).
- **Animación:** micro-interacciones con Framer Motion; texto que aparece por líneas/frases; siempre con fallback sin movimiento.

### Reglas de código (de `.cursorrules`)
1. **Solo Tailwind.** Nada de CSS crudo ni `style={{}}` salvo cálculos dinámicos.
2. **Nada de valores arbitrarios** (`text-[#1A1A19]`, `w-[317px]`). Si falta un token, se agrega primero al tema.
3. Componentes de 21st.dev se adaptan a los tokens del proyecto.
4. **Server Components por defecto**; `"use client"` solo si hay hooks o animación.
5. Componentes pequeños, semánticos y con nombres descriptivos.

---

## 6. Requisitos no funcionales

- **Responsive:** mobile (≥ 360 px), tablet, desktop, pantallas grandes/retina.
- **Accesibilidad:** contraste AA, `alt` descriptivo en todas las imágenes, navegación por teclado, foco visible, `aria-label` en links de iconos, `prefers-reduced-motion`.
- **Performance:** `next/image` con tamaños definidos, imágenes comprimidas (`scripts/compress-prima-images.sh`), video con `poster`, sin layout shift (CLS < 0.1).
- **SEO:** `title` y `description` reales por página, Open Graph/Twitter image, `sitemap.xml`, `robots.txt`.

---

## 7. Pendientes detectados (backlog)

**Prioridad alta**
- [x] Cambiar metadata global en `app/layout.tsx` (hoy dice *"Create Next App"*) → p. ej. `"Lizeth Nohelia — Senior Product Designer"` + descripción.
- [x] `generateMetadata` por case study en `app/projects/[slug]/page.tsx` (título + descripción + imagen OG).
- [x] Eliminar el link "Archive" (`href="#"`) del Footer.
- [x] Imagen Open Graph propia (`public/og-image.png`, 1200×630, versión light).
- [x] Favicon propio con el logo UX (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`).

**Prioridad media**
- [ ] Completar y publicar al menos 2 case studies más (sugerido: Koban y Banco de Bogotá) para que el bento grid no tenga un solo proyecto.
- [ ] Botón/enlace para **descargar CV** (PDF).
- [ ] `sitemap.ts` y `robots.ts`.
- [ ] Reescribir `README.md` (hoy es el de plantilla).

**Prioridad baja**
- [ ] Analítica (Vercel Analytics) para medir visitas y clics en contacto.
- [ ] Navegación "Next project" al final de cada case study.
- [ ] Limpiar assets duplicados (`public/projects/prima/final UI /` vs `final-ui/`) y archivos de plantilla (`next.svg`, `vercel.svg`, etc.).

---

## 8. Criterios de aceptación (Definition of Done)

El portafolio está "listo para enviar" cuando:
- [ ] `npm run build` y `npm run lint` pasan sin errores.
- [ ] No hay placeholders ni textos de plantilla visibles en ninguna página publicada.
- [ ] Todos los links (nav, footer, LinkedIn, email, CV) funcionan.
- [ ] Se ve bien en iPhone, iPad y desktop, en modo claro y oscuro.
- [ ] Lighthouse ≥ 90 en las 4 categorías en Home y en cada case study.
- [ ] Al compartir el link en LinkedIn/WhatsApp aparece título, descripción e imagen correctos.
- [ ] Hay al menos 3 case studies visibles.

---

## 9. Cómo trabajar con esta spec

1. **Antes de una tarea:** agrega o ajusta el ítem en la sección 7 (qué, por qué, criterio de "hecho").
2. **Pídele a Claude:** *"Lee `spec.md` y `.cursorrules`, implementa: [tarea]. Respeta los tokens y no uses valores arbitrarios."*
3. **Al terminar:** marca el checkbox y actualiza la tabla de estado (4.1 / 4.3) si cambió algo.
4. **Nuevo proyecto:** copia la estructura de `prima` en `data.ts` → assets en `public/projects/<slug>/` → actualiza la tabla 4.3.

_Última actualización: 2026-10-07_
