/**
 * Catálogo único de proyectos: usado por el bento grid del home y por las
 * páginas de detalle dinámicas en /projects/[slug]. Editar aquí un solo lugar.
 */

export type ProjectCategory = "Design" | "Digital" | "Startups";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Poster opcional para `type: "video"`. */
  poster?: string;
  caption?: string;
}

/** Celda del grid mosaico en bloques `layout: "mosaic"` */
export interface MosaicTile {
  src: string;
  alt: string;
  /** Clases Tailwind para `col-span-*` / `md:col-span-*` (grid de 12 columnas). */
  span: string;
  /** Contenedor de la imagen: ratio o altura mínima (p. ej. `aspect-video`, `min-h-64`). */
  aspect?: string;
}

export interface WorkBlock {
  /** stacked/split: un medio; mosaic: galería en grid */
  layout: "stacked" | "split" | "mosaic";
  heading?: string;
  description: string;
  /** Obligatorio para layout stacked o split */
  media?: MediaItem;
  /** Obligatorio para layout mosaic */
  tiles?: MosaicTile[];
  /** Bloque walkthrough con fondo oscuro acorde a video (tokens `cinema`). Solo stacked. */
  presentation?: "default" | "cinema";
}

export interface HighlightCard {
  title: string;
  description: string;
  image: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface ProjectGridLayout {
  /** Tailwind col-span/row-span solo para el bento del home */
  colSpan: string;
  rowSpan: string;
}

/** Contenido largo de la página de detalle (estructura tipo case study). */
export interface CaseStudyMetaItem {
  label: string;
  value: string;
}

export interface CaseStudyHero {
  title: string;
  subtitle: string;
  meta: CaseStudyMetaItem[];
  /** Si se omite, se muestra placeholder en el hero. */
  heroImage?: CaseStudyVisualAsset;
  /** Video en marco MacBook + navegador (Prima). */
  heroVideo?: { src: string; alt: string; poster?: string };
  /** Activa marco navegador + scroll interno (Prima hero / ideation). */
  macbookBrowserMedia?: boolean;
  /** Hero con 1–2 marcos de smartphone (productos móviles, p. ej. Koban). Sin `visual` muestra placeholder. */
  phoneMockups?: CaseStudyProductPreviewSlot[];
}

export interface CaseStudyOverview {
  title: string;
  /** Columna derecha: un bloque (separa párrafos con dos saltos de línea si hace falta). */
  rightColumnText: string;
}

export interface CaseStudyVisualAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /**
   * Con `scrollWideVisuals`: ancho (px CSS) al que se muestra la imagen dentro del contenedor
   * con scroll interno. Si se omite, se usa `width / 2` (asset exportado @2x).
   */
  displayWidth?: number;
  /**
   * Captura móvil con barra de navegación inferior: dentro del marco de celular la barra
   * queda fija abajo y el contenido hace scroll por detrás con un degradado suave.
   * `top`: px (de la imagen original) donde empieza la franja fija, hasta el borde inferior.
   * `backgroundColor`: color de fondo de la captura (hex de 6 dígitos) para el degradado.
   */
  fixedBottomNav?: { top: number; backgroundColor: string };
}

export interface CaseStudyProductPreviewSlot {
  label: string;
  visual?: CaseStudyVisualAsset;
}

export interface CaseStudyProductPreview {
  title: string;
  /** Texto descriptivo justo debajo del título (columna derecha, antes de los slots). */
  intro: string;
  /** Solo overrides p. ej. Prima: marco tipo MacBook Air 1280×832. Por defecto iPhone 14 en layout. */
  slotWidthPreset?: "iphone14" | "macbook-air";
  /**
   * Con `macbook-air`: viewport más bajo (~70% del marco), imagen a tamaño intrínseco con scroll
   * y marco tipo ventana de navegador (solo Prima por ahora).
   */
  macbookProductPreviewMode?: boolean;
  /** Renderiza cada slot dentro de un marco de smartphone (productos móviles, p. ej. Koban). */
  phoneMockupMode?: boolean;
  /** Una o más capturas (p. ej. Prima: varios mockups). */
  slots: CaseStudyProductPreviewSlot[];
}

export interface CaseStudyResearchSubsection {
  body: string;
  /** Capturas de research (p. ej. Prima); si existen, sustituyen los placeholders por defecto. */
  visuals?: CaseStudyVisualAsset[];
  /** Marco de las capturas (Prima: borde con color `muted` del tema). */
  visualSlotBorder?: "default" | "muted";
  /** Muestra las capturas a resolución nativa dentro de un contenedor con scroll interno. */
  scrollWideVisuals?: boolean;
}

export interface CaseStudyChallengeItem {
  label: string;
  description: string;
}

export interface CaseStudyIdeationSubsection {
  titles?: string[];
  /** P. ej. Prima: flujos financieros con título + descripción. */
  items?: CaseStudyChallengeItem[];
  /** Capturas en marco MacBook + navegador (Prima). */
  visuals?: CaseStudyVisualAsset[];
  macbookBrowserMedia?: boolean;
  /** Capturas móviles en marcos de smartphone, en grid (p. ej. Koban). */
  phoneMedia?: boolean;
  /** Subtítulo + párrafo que se muestran justo encima de las capturas. */
  explorations?: { title: string; body: string };
  /** Texto bajo cada captura (mismo orden que `visuals`). */
  visualCaptions?: string[];
}

export interface CaseStudyTestingSubsection {
  findings?: string[];
  /** P. ej. Prima: fases de validación con título + descripción. */
  items?: CaseStudyChallengeItem[];
}

export interface CaseStudyChallengeSection {
  title: string;
  intro?: string;
  research: CaseStudyResearchSubsection;
  ideation: CaseStudyIdeationSubsection;
  testing: CaseStudyTestingSubsection;
}

/** Tres aprendizajes con copy largo (sin imágenes en la sección). */
export interface CaseStudyTakeaways {
  takeawayPoints: [string, string, string];
  /** Omitir en Prima u otros case studies sin bloque Next steps. */
  nextStepPoints?: [string, string, string];
}

export interface CaseStudyStatementAndAcknowledgements {
  body: string;
  visual?: { src: string; alt: string };
  visualPlaceholder?: boolean;
}

/** Video de cierre del case study (sin título visible; p. ej. Prima). */
export interface CaseStudyProductVideo {
  src: string;
  alt: string;
  poster?: string;
}

export type CaseStudyBentoCellVariant =
  | "headline"
  | "media"
  | "category"
  | "typography"
  | "device-mockup";

export type CaseStudyBentoSurface = "lime" | "yellow" | "black" | "muted" | "white";

/** Celda editable del bento (12 cols: fila 1 = 3×4, fila 2 = 4×3). */
export interface CaseStudyBentoCell {
  variant: CaseStudyBentoCellVariant;
  surface?: CaseStudyBentoSurface;
  headlineLines?: string[];
  visual?: CaseStudyVisualAsset;
  categoryLabel?: string;
  categoryVisual?: CaseStudyVisualAsset;
  fontLabel?: string;
  typeSample?: string;
  deviceVisual?: CaseStudyVisualAsset;
}

export interface CaseStudyBentoGrid {
  row1: [CaseStudyBentoCell, CaseStudyBentoCell, CaseStudyBentoCell];
  row2: [
    CaseStudyBentoCell,
    CaseStudyBentoCell,
    CaseStudyBentoCell,
    CaseStudyBentoCell,
  ];
  /** Prima: fila extra para assets adicionales del design system. */
  row3?: CaseStudyBentoCell[];
}

/** Sección Design system del case study: cuerpo, lista y hasta 3 visuales/placeholders. */
export interface CaseStudyDesignSystemSection {
  title: string;
  body: string;
  bulletPoints: [string, string, string, string, string];
  visual?: CaseStudyVisualAsset;
  /**
   * Muestra `visual` a resolución nativa dentro de un contenedor con scroll interno
   * y usa una sola columna (ancho completo) para el bloque.
   */
  scrollableVisual?: boolean;
  /** Color de fondo del contenedor con scroll (hex), para igualar el fondo de la imagen. */
  scrollableVisualBackground?: string;
  /** Prima: grid bento 3+4 (Estrela PayJustNow) — contenido editable por celda. */
  bentoGrid?: CaseStudyBentoGrid;
  visualPlaceholder?: boolean;
  /** Leyenda del primer placeholder si no hay `visual`. */
  primaryPlaceholderLabel?: string;
  /** Placeholders adicionales (omitir si hay `bentoGrid`). */
  extraPlaceholderLabels?: [string, string];
}

export interface CaseStudyFeature {
  eyebrow: string;
  title: string;
  description: string;
  visual?: CaseStudyVisualAsset;
  visualPlaceholder?: boolean;
  imageSide: "left" | "right";
  /** Prima: marco navegador + scroll interno y viewport al 60% (como Product preview). */
  macbookProductPreview?: boolean;
  /** Koban: captura móvil en marco de smartphone, texto y teléfono lado a lado en desktop. */
  phoneMockup?: boolean;
  /** Prima: al cargar, scroll del mockup al final (p. ej. Collections). */
  scrollFocusEnd?: boolean;
}

export interface ProjectCaseStudy {
  hero: CaseStudyHero;
  overview: CaseStudyOverview;
  productPreview: CaseStudyProductPreview;
  challenge: CaseStudyChallengeSection;
  features: [CaseStudyFeature, CaseStudyFeature, CaseStudyFeature];
  designSystem: CaseStudyDesignSystemSection;
  takeaways: CaseStudyTakeaways;
  statementAndAcknowledgements?: CaseStudyStatementAndAcknowledgements;
  productVideo?: CaseStudyProductVideo;
  /** Imagen a ancho completo (borde a borde) como último bloque del case study, justo arriba del footer. */
  fullWidthVisual?: CaseStudyVisualAsset;
}

export interface Project {
  slug: string;
  /** Nombre corto del cliente / producto. Se usa en cards y eyebrow del header. */
  title: string;
  /** Frase descriptiva larga que actúa como h1 en la detail page. */
  headline: string;
  /** Etiqueta corta visible en la card del bento */
  cardCategory: string;
  /** Categorías oficiales (chips en el header de la detail page) */
  categories: ProjectCategory[];
  /** Frase corta debajo del headline en la detail page (opcional) */
  subtitle?: string;
  /** Descripción corta para la card del home y meta de la detail page */
  description: string;
  cardImage: string;
  /** Activa zoom por recorte en la card del home (p. ej. Prima, 120%). */
  cardImageZoom?: boolean;
  /** `sizes` de Next/Image para la card (p. ej. retina en bento 2×2). */
  cardImageSizes?: string;
  /** Dimensiones nativas del asset de la card (evita reescalado incorrecto). */
  cardImageWidth?: number;
  cardImageHeight?: number;
  /** Si es `false`, la card no se muestra en el bento del home (el proyecto sigue en datos). */
  showInProjectsGrid?: boolean;
  /** Copy en hover de la card (si se omite, usa `description`). */
  cardHoverText?: string;
  /** Título de card más grande y semibold (Prima). */
  cardTitleProminent?: boolean;
  meta: {
    role: string;
    year: string;
    client: string;
  };
  problem: {
    intro: string;
    points: string[];
  };
  myWork: {
    intro: string;
    blocks: WorkBlock[];
  };
  highlights: HighlightCard[];
  impact: {
    intro: string;
    metrics: ImpactMetric[];
  };
  conclusion: string;
  gridLayout: ProjectGridLayout;
  caseStudy: ProjectCaseStudy;
}
