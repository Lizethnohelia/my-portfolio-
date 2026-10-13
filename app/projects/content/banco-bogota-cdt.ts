import type { Project } from "../types";
import { COMMON_VIDEO_POSTER, buildDefaultCaseStudy } from "./shared";

export const bancoBogotaCdt: Project = {
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
};
