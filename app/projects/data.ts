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
  /** Una o más capturas (p. ej. Prima: varios mockups). */
  slots: CaseStudyProductPreviewSlot[];
}

export interface CaseStudyResearchSubsection {
  body: string;
  /** Capturas de research (p. ej. Prima); si existen, sustituyen los placeholders por defecto. */
  visuals?: CaseStudyVisualAsset[];
  /** Marco de las capturas (Prima: borde con color `muted` del tema). */
  visualSlotBorder?: "default" | "muted";
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

const COMMON_VIDEO_POSTER = "/projects/neuralflow.jpg";

const PRIMA_DESIGN_SYSTEM_DIR = "/projects/prima/design-system";
const PRIMA_CARD_IMAGE_SRC = `/projects/prima/card/${encodeURIComponent("RFQ - Kanban view.jpg")}`;
const PRIMA_PRODUCT_VIDEO_SRC = `/projects/prima/${encodeURIComponent("product video")}/prima-walkthrough.mp4`;

function primaDesignSystemImage(
  fileName: string,
  alt: string,
  width: number,
  height: number
): CaseStudyVisualAsset {
  return {
    src: `${PRIMA_DESIGN_SYSTEM_DIR}/${encodeURIComponent(fileName)}`,
    alt,
    width,
    height,
  };
}

const PRIMA_CASE_STUDY: ProjectCaseStudy = {
  hero: {
    title:
      "A B2B Project Management Platform for the Manufacturing Industry",
    subtitle:
      "Making manufacturing industry more efficient and eliminating financial and operational bottlenecks",
    macbookBrowserMedia: true,
    heroImage: {
      src: "/projects/prima/header/rfq-details.jpg",
      alt: "Prima: RFQ project details — B2B manufacturing platform header view",
      width: 1583,
      height: 2400,
    },
    meta: [
      { label: "Role", value: "Senior Product Designer & UX/UI" },
      { label: "Timeline", value: "2026" },
      { label: "Platform", value: "Web App (Desktop / Tablet)" },
      { label: "Tools", value: "Figma, Mantine, Cursor, Figma AI" },
    ],
  },
  overview: {
    title: "Project Overview",
    rightColumnText:
      "Prima is a comprehensive B2B platform designed to bridge the gap between complex manufacturing floors and high-level project tracking. The manufacturing industry often suffers from fragmented communication and siloed data. This platform empowers manufacturers to streamline their operational workflows, manage large-scale production projects, and collaborate seamlessly in real-time. As the Lead Product Designer, I spearheaded the end-to-end product design lifecycle, from initial UX research and complex workflow mapping to the architecture of a highly scalable frontend design system.",
  },
  productPreview: {
    title: "Product preview",
    intro:
      "Built for efficiency and clarity. The platform transforms overwhelming production data into actionable insights through intuitive dashboards, dynamic tracking tools, and a centralized hub for cross-functional teams.",
    slotWidthPreset: "macbook-air",
    macbookProductPreviewMode: true,
    slots: [
      {
        label: "Cotización — proyecto, crédito y envío de quote",
        visual: {
          src: "/projects/prima/product-preview/quotation.jpg",
          alt: "Prima: vista de proyecto con pestaña Quotation, límites de crédito y detalle de cotización al cliente",
          width: 1583,
          height: 2400,
        },
      },
      {
        label: "Orden de compra — entregas y seguimiento financiero",
        visual: {
          src: "/projects/prima/product-preview/purchase-orders.jpg",
          alt: "Prima: vista de orden de compra con progreso de entrega, facturación y términos de pago",
          width: 1475,
          height: 2400,
        },
      },
      {
        label: "Requerimientos — tablero Kanban por etapa",
        visual: {
          src: "/projects/prima/product-preview/rfq-kanban-view.jpg",
          alt: "Prima: módulo Requirements en vista Kanban con tarjetas por etapa del pipeline RFQ",
          width: 2294,
          height: 2400,
        },
      },
      {
        label: "Requerimientos — Kanban en modo oscuro",
        visual: {
          src: "/projects/prima/product-preview/kanban-view-dark.jpg",
          alt: "Prima: vista Kanban de requerimientos (RFQ) en interfaz de tema oscuro",
          width: 2294,
          height: 2400,
        },
      },
    ],
  },
  challenge: {
    title: "The Challenge",
    intro:
      "Traditionally, the manufacturing sector in Mexico has relied on heavily manual and fragmented processes. Founded in 2022, Prima is a first-mover spearheading the digitization of this market. The company oversee the entire manufacturing lifecycle—from pricing and raw-material sourcing to production, quality control, and final delivery—by orchestrating a network of over 200 verified partner factories owned by small businesses.\n\nAs the company scaled rapidly, the core challenge was digitizing the end-to-end project lifecycle while ensuring long-term profitability. This required architecting a robust financial ecosystem that establishes clear, transparent accounting practices. The goal was to align all stakeholders by centralizing financial documentation, streamlining complex workflows, and ensuring that every party clearly understands and seamlessly advances through the financial operations.",
    research: {
      body:
        "Adopting a Design Thinking framework, I approached the research phase as a problem-solver aiming to balance deep user empathy with core business objectives. To make informed, data-driven decisions, we established clear success metrics across efficiency, usage, satisfaction, and consistency. Through stakeholder interviews, collaborative workshops, and user surveys, we developed detailed user personas to map the true workflow of our financial operations.\n\nThis primary research revealed a pressing need for a single source of truth to handle complex financial tasks. Users struggled with a fragmented quoting engine and slow time-to-quote. The major pain points identified were: requesting payments, standardizing and attaching required company documentation, defining payment terms, managing the amortization of advances, creating and requesting invoices, executing collection management, and effectively training and supporting users through these transitions.",
      visualSlotBorder: "muted",
      visuals: [
        {
          src: "/projects/prima/research/customer-satisfaction-june-2025-page-09.jpg",
          alt: "Prima research: informe de satisfacción del cliente (Voice of Customer, junio 2025) — lámina 9.",
        },
        {
          src: "/projects/prima/research/customer-satisfaction-sept-2025-page-06.jpg",
          alt: "Prima research: informe de satisfacción del cliente (Voice of Customer, septiembre 2025) — lámina 6.",
        },
        {
          src: "/projects/prima/research/prima-challenge-research-01.png",
          alt: "Prima research: artefacto de documentación de campo o entrevista (lámina 1).",
        },
        {
          src: "/projects/prima/research/prima-challenge-research-02.png",
          alt: "Prima research: artefacto de documentación de campo o entrevista (lámina 2).",
        },
        {
          src: "/projects/prima/research/prima-challenge-research-03.png",
          alt: "Prima research: artefacto de documentación de campo o entrevista (lámina 3).",
        },
        {
          src: "/projects/prima/research/prima-challenge-research-04.jpg",
          alt: "Prima research: informe de satisfacción del cliente (Voice of Customer, junio 2025).",
        },
        {
          src: "/projects/prima/research/prima-challenge-research-05.png",
          alt: "Prima research: síntesis o tablero de hallazgos (lámina 5).",
        },
        {
          src: `/projects/prima/research/${encodeURIComponent("User-persona-creation-and-pains-analysis-28.jpg")}`,
          alt: "Prima research: pain relievers — search and select MPs, time to quote.",
          width: 2400,
          height: 1350,
        },
        {
          src: `/projects/prima/research/${encodeURIComponent("User-persona-creation-and-pains-analysis-30.jpg")}`,
          alt: "Prima research: pain relievers — RFQ status and progress.",
          width: 2400,
          height: 1350,
        },
      ],
    },
    ideation: {
      items: [
        {
          label: "Company creation & Documentation",
          description:
            "A streamlined flow for creating company profiles and securely attaching all required legal and financial documentation to establish a centralized source of truth.",
        },
        {
          label: "Payment Terms Configuration",
          description:
            "An intuitive interface allowing users to seamlessly create, assign, and manage customized payment terms for specific projects and clients.",
        },
        {
          label: "Advance Payment Amortization",
          description:
            "A dedicated workflow to track, calculate, and manage the amortization of upfront payments securely throughout the production lifecycle.",
        },
        {
          label: "Billing Cycles & Subsidiaries",
          description:
            "A structured financial architecture designed to handle complex billing cycles, including routing and managing transactions across various business subsidiaries.",
        },
        {
          label: "Invoicing & Collection Management",
          description:
            "An automated, end-to-end flow for creating, requesting, and tracking invoices, paired with a robust collection management dashboard to ensure profitability and clear finances.",
        },
      ],
      macbookBrowserMedia: true,
      visuals: [
        {
          src: "/projects/prima/ideation/companies.jpg",
          alt: "Prima ideation: Companies — company profiles and required documentation flow.",
          width: 2400,
          height: 1505,
        },
        {
          src: "/projects/prima/ideation/collections.jpg",
          alt: "Prima ideation: Collections — PO payment progress, collection cards, and status states.",
          width: 2400,
          height: 2158,
        },
        {
          src: "/projects/prima/ideation/ideation-frame-01.jpg",
          alt: "Prima ideation: payment terms configuration flow.",
          width: 2400,
          height: 1709,
        },
        {
          src: "/projects/prima/ideation/ideation-frame-02.jpg",
          alt: "Prima ideation: advance payment amortization workflow.",
          width: 2400,
          height: 904,
        },
        {
          src: "/projects/prima/ideation/ideation-frame-03.jpg",
          alt: "Prima ideation: billing cycles and subsidiaries.",
          width: 2400,
          height: 1965,
        },
        {
          src: "/projects/prima/ideation/ideation-frame-04.jpg",
          alt: "Prima ideation: invoicing and collection management operations.",
          width: 2006,
          height: 2400,
        },
      ],
    },
    testing: {
      items: [
        {
          label: "Rapid Prototyping",
          description:
            "For each defined financial flow, we developed initial high-fidelity designs and interactive prototypes to visualize the end-to-end experience.",
        },
        {
          label: "User Validation",
          description:
            "I conducted usability testing sessions with actual end-users and internal stakeholders to evaluate the efficiency and clarity of the new financial tools.",
        },
        {
          label: "Iterative Refinement",
          description:
            "Based on direct user feedback, we continuously iterated on the designs to reduce friction, simplify complex accounting concepts, and improve overall usability.",
        },
        {
          label: "AI Implementation",
          description:
            "I accelerate product cycles by utilizing AI for early-stage prototyping and user validation.",
        },
        {
          label: "Developer Hand-off",
          description:
            "Once the workflows met our established success metrics, I prepared comprehensive design specifications and conducted a seamless hand-off to the engineering team to ensure accurate implementation.",
        },
      ],
    },
  },
  features: [
    {
      eyebrow: "Flow 1",
      title: "Companies",
      description:
        "A streamlined flow for creating company profiles and securely attaching all required legal and financial documentation.",
      macbookProductPreview: true,
      visual: {
        src: "/projects/prima/final-ui/companies-details.jpg",
        alt: "Prima: Companies — company profile details and legal documentation",
        width: 2400,
        height: 1749,
      },
      imageSide: "left",
    },
    {
      eyebrow: "Flow 2",
      title: "Payments",
      description:
        "A dedicated workflow to track, calculate, and manage the amortization of upfront payment.",
      macbookProductPreview: true,
      visual: {
        src: "/projects/prima/final-ui/projects-payments.jpg",
        alt: "Prima: Payments — upfront payment amortization workflow",
        width: 1230,
        height: 2400,
      },
      imageSide: "right",
    },
    {
      eyebrow: "Flow 3",
      title: "Collections",
      description:
        "An automated, end-to-end flow for creating, requesting, and tracking invoices, paired with a robust collection management.",
      macbookProductPreview: true,
      visual: {
        src: "/projects/prima/final-ui/projects-collections.jpg",
        alt: "Prima: Collections — invoicing and collection management dashboard",
        width: 2092,
        height: 2400,
      },
      scrollFocusEnd: true,
      imageSide: "left",
    },
  ],
  designSystem: {
    title: "Scalable Design System",
    body:
      "To ensure absolute consistency and seamless developer handoff, I built a robust Design Language System (DLS) from the ground up. Integrating closely with the frontend team, this system was optimized for a React/Next.js environment using Mantine.",
    bulletPoints: [
      "Semantic tokens and variables mirrored between Figma libraries and the codebase for zero-drift handoff.",
      "Mantine-based primitives extended with manufacturing-specific patterns (dense tables, status chips, tablet targets).",
      "Documented light and dark themes with contrast-checked palettes for control-room and floor contexts.",
      "Versioned component specs, interaction notes and empty states bundled for design QA and engineering reviews.",
      "Governance model for proposing, reviewing and shipping new components without fragmenting the UI language.",
    ],
    bentoGrid: {
      row1: [
        {
          variant: "headline",
          surface: "lime",
          headlineLines: ["DESIGN", "LANGUAGE", "SYSTEM"],
        },
        {
          variant: "media",
          surface: "white",
          visual: primaDesignSystemImage(
            "RFQ Cards.png",
            "Prima design system: RFQ card components",
            1032,
            1476
          ),
        },
        {
          variant: "media",
          surface: "yellow",
          visual: primaDesignSystemImage(
            "Progress component.png",
            "Prima design system: progress component",
            2066,
            846
          ),
        },
      ],
      row2: [
        {
          variant: "category",
          surface: "muted",
          categoryLabel: "Color tokens",
          categoryVisual: primaDesignSystemImage(
            "Property 1=Color, Size=S, Orientation=Vertical.png",
            "Prima design system: color token, size S, vertical orientation",
            241,
            304
          ),
        },
        {
          variant: "typography",
          surface: "black",
          fontLabel: "Inter",
          typeSample: "Aa",
        },
        {
          variant: "media",
          surface: "white",
          visual: primaDesignSystemImage(
            "Frame 5766.jpg",
            "Prima design system: component frame layout",
            1232,
            440
          ),
        },
        {
          variant: "device-mockup",
          surface: "lime",
          deviceVisual: primaDesignSystemImage(
            "Status=Default.jpg",
            "Prima design system: default status component",
            684,
            160
          ),
        },
      ],
    },
    visualPlaceholder: false,
  },
  takeaways: {
    takeawayPoints: [
      "Simplifying Financial Complexity: The biggest takeaway was learning how to take rigid, complex concepts—like advance amortization and multi-subsidiary billing—and translate them into a frictionless, intuitive user interface without sacrificing data integrity.",
      "The Power of a Single Source of Truth: Centralizing financial documentation and standardizing terms across 200+ partner companies proved critical. It became clear that creating a single, reliable ecosystem is the strongest driver of operational efficiency and stakeholder trust.",
      "Empathy in Enterprise Design: When dealing with profitability and invoicing, user anxiety is naturally high. Prioritizing clear feedback loops, transparent system statuses, and error prevention in the UI was essential to building confidence among users transitioning from manual processes to a fully digitized workflow.",
    ],
  },
  productVideo: {
    src: PRIMA_PRODUCT_VIDEO_SRC,
    alt: "Prima platform walkthrough — B2B manufacturing project management demo",
    poster: COMMON_VIDEO_POSTER,
  },
};

export function buildDefaultCaseStudy(input: {
  productName: string;
  headline: string;
  subtitle: string;
  role: string;
  year: string;
  client: string;
}): ProjectCaseStudy {
  const { productName, headline, subtitle, role, year, client } = input;
  return {
    hero: {
      title: headline,
      subtitle,
      meta: [
        { label: "Role", value: role },
        { label: "Timeline", value: year },
        { label: "Platform", value: "Web App (Desktop / Tablet)" },
        { label: "Tools", value: "Figma, Cursor" },
      ],
    },
    overview: {
      title: "Project Overview",
      rightColumnText: `This case study documents ${productName} for ${client}. The narrative, screens and metrics below are provisional and will be replaced with final research, UI and outcomes.

I led product design end to end: discovery, IA, interaction patterns, visual language and handoff with engineering.`,
    },
    productPreview: {
      title: "Product preview",
      intro: `Provisional narrative for ${productName}: dashboards, tracking and a shared operational hub. Replace with final product copy aligned to marketing and research.`,
      slots: [
        { label: "Primary product view — placeholder" },
        { label: "Key flow — desktop — placeholder" },
        { label: "In-context / tablet — placeholder" },
      ],
    },
    challenge: {
      title: "The Challenge",
      intro: `${productName} had to balance legacy constraints, risk and speed. The goal was to simplify complex workflows without hiding the data operators and leadership still need to trust.`,
      research: {
        body:
          "Provisional research summary: interviews, surveys and artifact review to map pain points, trust gaps and decision triggers across teams.",
      },
      ideation: {
        titles: [
          "Dashboard archetypes by persona",
          "Lifecycle maps and exception paths",
          "Alerting and prioritisation patterns",
          "Design–dev token handoff",
          "High-density vs. executive views",
        ],
      },
      testing: {
        findings: [
          "Participants asked for blockers to surface before secondary metrics.",
          "Tablet flows need large targets and immediate feedback.",
          "Comparisons between stages must be explicit and jargon-light.",
          "Predictive alerts need visible data source and time window.",
          "Plant vocabulary outperforms IT-centric labels in comprehension tests.",
        ],
      },
    },
    features: [
      {
        eyebrow: "Feature 1",
        title: "Core experience",
        description:
          "Primary flows tuned for clarity, accessibility and responsive layouts across desktop and tablet breakpoints.",
        visualPlaceholder: true,
        imageSide: "left",
      },
      {
        eyebrow: "Feature 2",
        title: "Operational clarity",
        description:
          "Status surfaces and dashboards optimized for scanning, with progressive disclosure for advanced actions.",
        visualPlaceholder: true,
        imageSide: "right",
      },
      {
        eyebrow: "Feature 3",
        title: "Trust & consistency",
        description:
          "Reusable patterns and documentation so the interface scales with the roadmap and stays aligned in QA.",
        visualPlaceholder: true,
        imageSide: "left",
      },
    ],
    designSystem: {
      title: "Scalable Design System",
      body: `To ensure absolute consistency and seamless developer handoff, a Design Language System (DLS) for ${productName} was defined from the ground up. Integrating closely with the frontend team, this system was optimized for a React/Next.js environment using Mantine.`,
      bulletPoints: [
        "Shared naming for tokens across design tools and code repositories.",
        "Component inventory covering states, variants and responsive breakpoints.",
        "Theming strategy for light and dark surfaces used in operations-heavy UIs.",
        "Contribution workflow so squads extend the system without one-off styles.",
        "Checklists for accessibility, motion and content before components ship.",
      ],
      visualPlaceholder: true,
      primaryPlaceholderLabel: "Design system overview — placeholder",
      extraPlaceholderLabels: [
        "Component library and states — placeholder 2",
        "Token matrix and developer docs — placeholder 3",
      ],
    },
    takeaways: {
      takeawayPoints: [
        `For ${productName}, aligning stakeholders early on information hierarchy and role-based views reduced thrash in UI reviews. Long-form discovery notes were translated into reusable patterns so teams could ship without re-litigating the same layout questions.`,
        `A token-backed design system shortened handoff cycles: components, states and spacing stayed consistent across modules, which made QA more predictable and accessibility fixes easier to propagate.`,
        `Qualitative research with operators and leadership surfaced trust gaps that raw analytics missed. Baking those insights into acceptance criteria kept the backlog focused on outcomes rather than screen count.`,
      ],
      nextStepPoints: [
        "Validate impact metrics with live production data and publish a short readout for leadership.",
        "Extend usability coverage to adjacent roles and edge workflows identified in the research backlog.",
        "Tighten documentation for alerts, errors and empty states as new features land.",
      ],
    },
    statementAndAcknowledgements: {
      body: `This statement reflects the narrative and design intent documented for ${productName} while case study assets and acknowledgements are finalized. Thanks to collaborators who contributed research access, engineering partnership and feedback sessions that shaped the direction shown here.`,
      visualPlaceholder: true,
    },
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "prima",
    title: "Prima",
    headline:
      "A B2B Project Management Platform for the Manufacturing Industry",
    cardCategory: "Manufacturing",
    categories: ["Design", "Digital"],
    subtitle:
      "End-to-end UX/UI for factories, project leads and back-office teams.",
    description:
      "End-to-end design of a project management platform for manufacturing operations.",
    cardImage: PRIMA_CARD_IMAGE_SRC,
    cardImageZoom: true,
    cardImageSizes: "(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1920px",
    cardImageWidth: 6548,
    cardImageHeight: 4772,
    cardHoverText:
      "A B2B Project Management Platform for the Manufacturing Industry",
    cardTitleProminent: true,
    showInProjectsGrid: true,
    meta: {
      role: "Senior Product Designer & UX/UI",
      year: "2024 – Present",
      client: "Prima",
    },
    problem: {
      intro:
        "In the fast-paced manufacturing industry, effective project management is a critical necessity for monitoring real-time status and ensuring that complex initiatives progress exactly as planned. However, executive leaders frequently face the daunting challenge of managing a diverse, high-volume portfolio of projects simultaneously. Without highly optimized processes, it becomes incredibly difficult to maintain the oversight required to deliver high-quality work efficiently.",

      points: [
        "A lack of centralized control is causing costly project delays, budget overruns, and severe miscommunication between on-site factory workers and remote administrative teams.",
        "While tailored digital solutions exist, they fail to support the full scope of manufacturing operations, leaving workflows fragmented.",
        "Improve and scale the current platform so it seamlessly covers every single phase of the project lifecycle.",
      
      ],
    },
    myWork: {
      intro:
        "I led the UX/UI development of the platform by deeply immersing myself in the manufacturing industry's operational needs. To ensure rapid iteration and seamless collaboration, I integrated AI-powered productivity tools into my daily workflow. This allowed me to automate developer handoffs, quickly generate high-fidelity prototypes, and efficiently synthesize user testing data, bringing features to market faster.",
      blocks: [
        {
          layout: "mosaic",
          heading: "One plan, many roles",
          description:
            "The platform centers on a shared timeline that adapts per role — the same project shows different priorities for a plant supervisor and for a project director. Research covered interviews, Voice of Customer surveys and personas across PL, Demand, Ops and more.",
          tiles: [
            {
              src: "/projects/prima/roles/01-dashboard-collage.png",
              alt: "Prima — collage de dashboards y vistas por rol en la plataforma.",
              span: "col-span-12 lg:col-span-8",
              aspect: "aspect-video min-h-48 sm:min-h-56 lg:min-h-64",
            },
            {
              src: "/projects/prima/roles/02-entrevistas-insights.png",
              alt: "Prima — entrevistas con clientes e insights de investigación.",
              span: "col-span-12 lg:col-span-4",
              aspect: "aspect-video min-h-48",
            },
            {
              src: "/projects/prima/roles/03-voc-june-quotes.png",
              alt: "Prima — Voice of Customer junio 2025, citas y hallazgos.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/04-persona-demand.png",
              alt: "Prima — persona Demand: objetivos, pains y necesidades.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/05-insight-pm-demanda.png",
              alt: "Prima — insights de PM Demanda sobre flujos y prioridades.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/06-voc-sept-2025.png",
              alt: "Prima — Voice of Customer septiembre 2025.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/07-persona-pl.png",
              alt: "Prima — persona Project Lead.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/08-voc-june-pains.png",
              alt: "Prima — VoC junio 2025, pain points priorizados.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/09-personas-workshop.png",
              alt: "Prima — workshop de personas: roles y pains en tablero.",
              span: "col-span-12",
              aspect: "aspect-video min-h-48 sm:min-h-56",
            },
            {
              src: "/projects/prima/roles/10-personas-pains.png",
              alt: "Prima — mapa de pains por persona y tema.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
            {
              src: "/projects/prima/roles/11-design-process.png",
              alt: "Prima — proceso de diseño e identidad en documentación de investigación.",
              span: "col-span-12 md:col-span-6",
              aspect: "aspect-video",
            },
          ],
        },
        {
          layout: "split",
          heading: "Tasks anchored to operations",
          description:
            "Tasks are grouped by stage of production, with clear owners, dependencies and risk indicators that operations teams can scan in seconds.",
          media: {
            type: "image",
            src: "/projects/synthui.jpg",
            alt: "Tablero de tareas por etapa con responsables y riesgos.",
          },
        },
        {
          layout: "stacked",
          heading: "Walkthrough",
          description:
            "Recorrido corto que muestra el flujo desde la planeación hasta el reporte ejecutivo dentro de Prima.",
          presentation: "cinema",
          media: {
            type: "video",
            src: "/projects/prima/footer/prima-walkthrough.mp4",
            alt:
              "Demo de Prima: del plan a la operación a la decisión — prototipo Ichigo 2.0.",
          },
        },
      ],
    },
    highlights: [
      {
        title: "Role-aware dashboards",
        description:
          "Plant, project and exec views share data but never look the same — each role sees only what it needs to act.",
        image: "/projects/dataviz.jpg",
      },
      {
        title: "Stage-based planning",
        description:
          "Tasks are organized by production stage, so dependencies and risks become visible early.",
        image: "/projects/synthui.jpg",
      },
      {
        title: "Live status",
        description:
          "Operations updates flow into the timeline so leadership stops asking ‘where are we?’",
        image: "/projects/insightlens.jpg",
      },
      {
        title: "Reports in one click",
        description:
          "Executive reports are generated from the same data the floor uses, ending the weekly export ritual.",
        image: "/projects/medinsight.jpg",
      },
    ],
    impact: {
      intro:
        "Prima moved manufacturing operations from reactive coordination to predictable delivery within the first releases.",
      metrics: [
        { value: "1×", label: "Single source of truth across plant and office" },
        { value: "−40%", label: "Time spent in status meetings" },
        { value: "+25%", label: "On-time delivery on tracked projects" },
      ],
    },
    conclusion:
      "Manufacturing doesn’t fail because of bad people — it fails because the plan and the floor live in different places. Prima made them the same place, and decisions started catching problems before deadlines did.",
    caseStudy: PRIMA_CASE_STUDY,
    gridLayout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  },
  {
    slug: "koban",
    title: "Koban",
    headline:
      "A Unified App & Pre-Paid Card Experience for the Underbanked",
    cardCategory: "Fintech",
    categories: ["Design", "Startups", "Digital"],
    subtitle:
      "From idea to polished design for an inclusive financial product.",
    description:
      "Mobile-first app + pre-paid card built for users excluded from traditional banking.",
    cardImage: "/projects/brandforge.jpg",
    showInProjectsGrid: false,
    meta: {
      role: "Freelance Senior Product Designer",
      year: "Jun 2022 – Jul 2023",
      client: "Koban",
    },
    problem: {
      intro:
        "Millions of people are blocked from financial products by paperwork, branch visits and a UX that assumes prior banking knowledge.",
      points: [
        "Onboarding required documents most underbanked users don’t have on hand.",
        "Existing apps were designed for digitally fluent customers, not first-time users.",
        "Pre-paid cards lacked a digital layer that built trust over time.",
      ],
    },
    myWork: {
      intro:
        "I led the design end-to-end — from product vision to high fidelity — building a tone, a system and flows that feel approachable for first-time financial users.",
      blocks: [
        {
          layout: "stacked",
          heading: "Onboarding for first-time users",
          description:
            "Steps are short, language is human and every screen explains why we ask for what we ask. Drop-off in onboarding is treated as a design problem, not a marketing one.",
          media: {
            type: "image",
            src: "/projects/brandforge.jpg",
            alt: "Pantallas de onboarding de la app Koban.",
          },
        },
        {
          layout: "split",
          heading: "App + card as one product",
          description:
            "The pre-paid card and the app are designed together — the card is a physical extension of the same experience, not a separate object.",
          media: {
            type: "image",
            src: "/projects/synthui.jpg",
            alt: "Composición de la app y tarjeta Koban.",
          },
        },
        {
          layout: "stacked",
          heading: "Walkthrough",
          description:
            "Recorrido corto del flujo de Koban: desde el alta hasta el primer pago con la tarjeta.",
          media: {
            type: "video",
            src: "",
            alt: "Demo de Koban: inclusión financiera de extremo a extremo.",
            poster: COMMON_VIDEO_POSTER,
          },
        },
      ],
    },
    highlights: [
      {
        title: "Plain language",
        description:
          "Copy was rewritten with first-time financial users in mind — no jargon, no surprises.",
        image: "/projects/brandforge.jpg",
      },
      {
        title: "Card-first identity",
        description:
          "The visual system was designed around the card, then extended into the app — not the other way around.",
        image: "/projects/synthui.jpg",
      },
      {
        title: "Trust micro-moments",
        description:
          "Confirmations, receipts and notifications are designed to build trust on every transaction.",
        image: "/projects/dataviz.jpg",
      },
      {
        title: "Accessible by default",
        description:
          "Type sizes, contrast and tap targets follow inclusive standards from screen one.",
        image: "/projects/insightlens.jpg",
      },
    ],
    impact: {
      intro:
        "Koban shipped as a digital-first product with a physical card people felt proud to carry.",
      metrics: [
        { value: "0 → 1", label: "From concept to polished launch product" },
        { value: "+30%", label: "Onboarding completion vs. baseline mocks" },
        { value: "100%", label: "Visual system aligned across app and card" },
      ],
    },
    conclusion:
      "Financial inclusion isn’t a feature — it’s a tone. Koban worked because every flow assumed the user was new, treated their time with respect, and turned a card into a digital relationship.",
    caseStudy: buildDefaultCaseStudy({
      productName: "Koban",
      headline:
        "A Unified App & Pre-Paid Card Experience for the Underbanked",
      subtitle:
        "From idea to polished design for an inclusive financial product.",
      role: "Freelance Senior Product Designer",
      year: "Jun 2022 – Jul 2023",
      client: "Koban",
    }),
    gridLayout: { colSpan: "", rowSpan: "" },
  },
  {
    slug: "banco-finandina",
    title: "Banco Finandina",
    headline: "A Frictionless Digital Application Experience",
    cardCategory: "Banking",
    categories: ["Design", "Digital"],
    subtitle:
      "Digital app and web flows for loans, accounts and credit cards.",
    description:
      "Digital flows for loans, accounts and credit cards — built around real customer friction.",
    cardImage: "/projects/insightlens.jpg",
    showInProjectsGrid: false,
    meta: {
      role: "Senior Product Designer",
      year: "Aug 2017 – May 2019",
      client: "Banco Finandina",
    },
    problem: {
      intro:
        "Customers were asked to fill long forms, upload documents and wait — even for simple products that could be approved in minutes.",
      points: [
        "Application flows were structured around bank departments, not customer goals.",
        "Forms repeated information the bank already had on file.",
        "Branch and digital experiences contradicted each other mid-application.",
      ],
    },
    myWork: {
      intro:
        "I redesigned the digital application experience for loans, accounts and credit cards, treating each flow as a single conversation with the customer instead of a multi-department form.",
      blocks: [
        {
          layout: "stacked",
          heading: "One application, many products",
          description:
            "We unified the entry experience so customers describe their need once, and the bank routes them — not the other way around.",
          media: {
            type: "image",
            src: "/projects/insightlens.jpg",
            alt: "Pantalla de inicio del flujo de aplicación digital.",
          },
        },
        {
          layout: "split",
          heading: "Smart, short forms",
          description:
            "Fields adapt based on what the bank already knows, so returning customers see fewer questions and faster decisions.",
          media: {
            type: "image",
            src: "/projects/dataviz.jpg",
            alt: "Formulario corto con campos pre-llenados.",
          },
        },
        {
          layout: "stacked",
          heading: "Walkthrough",
          description:
            "Recorrido corto del flujo digital — del descubrimiento del producto a la aprobación.",
          media: {
            type: "video",
            src: "",
            alt: "Demo de Banco Finandina: aplicación digital sin fricción.",
            poster: COMMON_VIDEO_POSTER,
          },
        },
      ],
    },
    highlights: [
      {
        title: "Customer-led entry",
        description:
          "The first screen asks what the customer wants to do, not which product to choose.",
        image: "/projects/insightlens.jpg",
      },
      {
        title: "Pre-filled forms",
        description:
          "Known data is pre-loaded; new fields are kept to a minimum.",
        image: "/projects/dataviz.jpg",
      },
      {
        title: "Cross-channel consistency",
        description:
          "Branch and digital teams work from the same flow, so customers stop repeating themselves.",
        image: "/projects/synthui.jpg",
      },
      {
        title: "Approval-first design",
        description:
          "Each flow is designed around the moment of approval, not the form itself.",
        image: "/projects/brandforge.jpg",
      },
    ],
    impact: {
      intro:
        "The redesigned flows became the digital backbone for the bank’s consumer products.",
      metrics: [
        { value: "−45%", label: "Average time to complete an application" },
        { value: "+30%", label: "Digital application completion rate" },
        { value: "3", label: "Product lines unified under one experience" },
      ],
    },
    conclusion:
      "Banking isn’t a form — it’s a conversation. By removing what the bank already knew and surfacing what mattered to the customer, the digital application stopped feeling like paperwork and started feeling like a service.",
    caseStudy: buildDefaultCaseStudy({
      productName: "Banco Finandina digital applications",
      headline: "A Frictionless Digital Application Experience",
      subtitle:
        "Digital app and web flows for loans, accounts and credit cards.",
      role: "Senior Product Designer",
      year: "Aug 2017 – May 2019",
      client: "Banco Finandina",
    }),
    gridLayout: { colSpan: "", rowSpan: "md:row-span-2" },
  },
  {
    slug: "banco-bogota-pos-loan",
    title: "Banco de Bogotá",
    headline: "An Embedded Point-of-Sale Digital Loan Experience",
    cardCategory: "POS Loans",
    categories: ["Design", "Digital"],
    subtitle:
      "Financing decisions made at the point of purchase — not after it.",
    description:
      "Embedded financing at the point of sale: from consideration to approved loan in minutes.",
    cardImage: "/projects/craftplugin.jpg",
    showInProjectsGrid: false,
    meta: {
      role: "Senior Product Designer & Brand Designer",
      year: "May 2019 – Nov 2021",
      client: "Banco de Bogotá",
    },
    problem: {
      intro:
        "Customers had to leave the store, the website or the conversation to apply for financing — and most never came back to finish the purchase.",
      points: [
        "Loans were a separate product, not part of the buying flow.",
        "Approval happened days later, after the purchase intent had cooled down.",
        "Merchants had no clean way to offer financing as part of checkout.",
      ],
    },
    myWork: {
      intro:
        "I designed an embedded loan experience that lives inside the merchant’s checkout — bringing approval, signing and disbursement into a single, brand-aligned flow.",
      blocks: [
        {
          layout: "stacked",
          heading: "Financing inside checkout",
          description:
            "Customers see a financing option as part of the price, not as a separate journey, and complete the application without leaving the merchant context.",
          media: {
            type: "image",
            src: "/projects/craftplugin.jpg",
            alt: "Flujo de financiación embebido en el checkout del comercio.",
          },
        },
        {
          layout: "split",
          heading: "Decision in minutes",
          description:
            "Approvals happen during the same session, so the customer leaves the store with both the product and the loan resolved.",
          media: {
            type: "image",
            src: "/projects/synthui.jpg",
            alt: "Pantalla de aprobación inmediata del crédito en el punto de venta.",
          },
        },
        {
          layout: "stacked",
          heading: "Walkthrough",
          description:
            "Recorrido corto que muestra cómo el crédito se vuelve parte natural del checkout, no un trámite paralelo.",
          media: {
            type: "video",
            src: "",
            alt: "Demo del POS Loan: financiación embebida en la compra.",
            poster: COMMON_VIDEO_POSTER,
          },
        },
      ],
    },
    highlights: [
      {
        title: "Embedded by design",
        description:
          "The loan is treated as a payment option, not as a separate product the customer has to chase.",
        image: "/projects/craftplugin.jpg",
      },
      {
        title: "Same-session approval",
        description:
          "Decisions resolve while the buying intent is still alive.",
        image: "/projects/synthui.jpg",
      },
      {
        title: "Merchant ready",
        description:
          "The flow plugs into merchant checkouts without breaking their brand or layout.",
        image: "/projects/dataviz.jpg",
      },
      {
        title: "Trust signals built-in",
        description:
          "Rates, totals and obligations are surfaced upfront, not buried in fine print.",
        image: "/projects/medinsight.jpg",
      },
    ],
    impact: {
      intro:
        "Embedding the loan in the moment of purchase turned a once-fragmented journey into a single, completed transaction.",
      metrics: [
        { value: "+38%", label: "Loan completion at the point of sale" },
        { value: "−60%", label: "Drop-off vs. the standalone loan flow" },
        { value: "Min.", label: "Time from intent to approved loan" },
      ],
    },
    conclusion:
      "Credit converts when it shows up at the moment of decision, not after. Bringing the loan into checkout made financing feel like an option — not an obstacle — and turned a separate product into part of the purchase itself.",
    caseStudy: buildDefaultCaseStudy({
      productName: "POS loan embedded checkout",
      headline: "An Embedded Point-of-Sale Digital Loan Experience",
      subtitle:
        "Financing decisions made at the point of purchase — not after it.",
      role: "Senior Product Designer & Brand Designer",
      year: "May 2019 – Nov 2021",
      client: "Banco de Bogotá",
    }),
    gridLayout: { colSpan: "md:col-span-2", rowSpan: "" },
  },
  {
    slug: "banco-bogota-cdt",
    title: "Banco de Bogotá",
    headline: "An Interactive & Transparent CDT Onboarding Flow",
    cardCategory: "CDT Onboarding",
    categories: ["Design", "Digital"],
    subtitle:
      "Term deposits as a transparent, exploratory experience — not a black box.",
    description:
      "Interactive CDT onboarding that turns rates and terms into clear, explorable choices.",
    cardImage: "/projects/medinsight.jpg",
    showInProjectsGrid: false,
    meta: {
      role: "Senior Product Designer & Brand Designer",
      year: "May 2019 – Nov 2021",
      client: "Banco de Bogotá",
    },
    problem: {
      intro:
        "Term deposits (CDT) are a classic banking product, but the digital experience felt like a tax form — full of numbers, no clear payoff and no room to explore.",
      points: [
        "Customers couldn’t simulate scenarios before committing.",
        "Rates, terms and penalties were buried in legal language.",
        "Once started, the flow couldn’t be paused and resumed without losing data.",
      ],
    },
    myWork: {
      intro:
        "I redesigned the CDT onboarding as an interactive simulator: customers play with amounts, terms and goals before they commit, and every screen explains the trade-off in human language.",
      blocks: [
        {
          layout: "stacked",
          heading: "Simulator-first onboarding",
          description:
            "The first step is exploration, not commitment — customers see how rate, term and amount move together before signing anything.",
          media: {
            type: "image",
            src: "/projects/medinsight.jpg",
            alt: "Simulador interactivo de CDT con sliders de monto y plazo.",
          },
        },
        {
          layout: "split",
          heading: "Transparent terms",
          description:
            "Conditions, taxes and penalties are surfaced as plain-language cards next to the simulator, so the offer never feels hidden.",
          media: {
            type: "image",
            src: "/projects/insightlens.jpg",
            alt: "Tarjetas de términos y condiciones explicadas con lenguaje claro.",
          },
        },
        {
          layout: "stacked",
          heading: "Walkthrough",
          description:
            "Recorrido corto del flujo CDT — del simulador a la apertura del producto.",
          media: {
            type: "video",
            src: "",
            alt: "Demo del onboarding CDT: claro, interactivo y reanudable.",
            poster: COMMON_VIDEO_POSTER,
          },
        },
      ],
    },
    highlights: [
      {
        title: "Play before you commit",
        description:
          "Customers test scenarios with real bank rates before sharing personal data.",
        image: "/projects/medinsight.jpg",
      },
      {
        title: "Plain-language terms",
        description:
          "Legal conditions are translated into short, scannable cards next to the simulator.",
        image: "/projects/insightlens.jpg",
      },
      {
        title: "Resumable flow",
        description:
          "The application can be paused and continued without losing progress.",
        image: "/projects/synthui.jpg",
      },
      {
        title: "Confidence in numbers",
        description:
          "Final summaries match the simulator one-to-one, so customers see no surprises at signing.",
        image: "/projects/dataviz.jpg",
      },
    ],
    impact: {
      intro:
        "Reframing CDT onboarding as a simulator helped customers feel confident — and the bank saw it in conversion and retention.",
      metrics: [
        { value: "+50%", label: "Digital CDT applications completed" },
        { value: "−35%", label: "Support calls about rates and terms" },
        { value: "1×", label: "Single experience for new and returning customers" },
      ],
    },
    conclusion:
      "Banking products don’t sell themselves — they explain themselves, or they lose. Turning CDT into a transparent, explorable simulator made the same product feel modern, fair and ready for a digital-first customer.",
    caseStudy: buildDefaultCaseStudy({
      productName: "CDT onboarding simulator",
      headline: "An Interactive & Transparent CDT Onboarding Flow",
      subtitle:
        "Term deposits as a transparent, exploratory experience — not a black box.",
      role: "Senior Product Designer & Brand Designer",
      year: "May 2019 – Nov 2021",
      client: "Banco de Bogotá",
    }),
    gridLayout: { colSpan: "", rowSpan: "" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
