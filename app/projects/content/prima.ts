import type { Project, ProjectCaseStudy, CaseStudyVisualAsset } from "../types";
import { COMMON_VIDEO_POSTER } from "./shared";

const PRIMA_DESIGN_SYSTEM_DIR = "/projects/prima/design-system";
const PRIMA_HEADER_IMAGE_SRC = `/projects/prima/header/${encodeURIComponent("RFQ - details.jpg")}`;
const PRIMA_CARD_IMAGE_SRC = "/projects/Prima.jpg";
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
      src: PRIMA_HEADER_IMAGE_SRC,
      alt: "Prima: RFQ project details — B2B manufacturing platform header view",
      width: 1296,
      height: 1964,
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

export const prima: Project = {
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
  cardImageZoom: false,
  cardImageSizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  cardImageWidth: 1296,
  cardImageHeight: 1964,
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
};
