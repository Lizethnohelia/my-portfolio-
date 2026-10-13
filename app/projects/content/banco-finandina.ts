import type { Project } from "../types";
import { COMMON_VIDEO_POSTER, buildDefaultCaseStudy } from "./shared";

export const bancoFinandina: Project = {
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
};
