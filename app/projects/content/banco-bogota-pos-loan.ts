import type { Project } from "../types";
import { COMMON_VIDEO_POSTER, buildDefaultCaseStudy } from "./shared";

export const bancoBogotaPosLoan: Project = {
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
};
