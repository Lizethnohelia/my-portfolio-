import type { ProjectCaseStudy } from "../types";

export const COMMON_VIDEO_POSTER = "/projects/neuralflow.jpg";

/** Esqueleto genérico para proyectos aún sin case study propio. */
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
