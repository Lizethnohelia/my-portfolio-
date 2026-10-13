import type {
  CaseStudyVisualAsset,
  Project,
  ProjectCaseStudy,
} from "../types";
import { COMMON_VIDEO_POSTER } from "./shared";

const KOBAN_DIR = "/projects/Koban";

function kobanImage(
  folder: string,
  fileName: string,
  alt: string,
  width: number,
  height: number,
  displayWidth?: number,
  fixedBottomNav?: CaseStudyVisualAsset["fixedBottomNav"]
): CaseStudyVisualAsset {
  return {
    src: `${KOBAN_DIR}/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`,
    alt,
    width,
    height,
    ...(displayWidth ? { displayWidth } : {}),
    ...(fixedBottomNav ? { fixedBottomNav } : {}),
  };
}

const KOBAN_CASE_STUDY: ProjectCaseStudy = {
  hero: {
    title: "A Unified App & Pre-Paid Card Experience for the Underbanked",
    subtitle:
      "From idea to polished design for an inclusive financial product.",
    phoneMockups: [
      {
        label: "Koban — home and card",
        visual: kobanImage(
          "header",
          "HOME - ALPHA.png",
          "Koban: home screen with balance and pre-paid card",
          1440,
          4128,
        undefined,
        { top: 3672, backgroundColor: "#f8f8f8" }
      ),
      },
    ],
    meta: [
      { label: "Role", value: "Freelance Senior Product Designer" },
      { label: "Timeline", value: "Jun 2022 – Jul 2023" },
      { label: "Platform", value: "Mobile App (iOS / Android) + Pre-paid card" },
      { label: "Tools", value: "Figma" },
    ],
  },
  overview: {
    title: "Project Overview",
    rightColumnText:
      "Koban is a mobile-first application and prepaid card designed for individuals excluded from conventional banking systems. Complex paperwork, in-person branch consultations, and interfaces that require prior banking knowledge prevent millions from obtaining essential financial products.I managed the entire design lifecycle, from conceptualising the product vision to creating high-fidelity designs, developing a tone, visual framework, and user flows tailored for novice financial users. Both the card and the app were created simultaneously, ensuring that the physical card serves as an extension of the shared experience rather than a distinct object.",
  },
  productPreview: {
    title: "Product preview",
    intro:
      "A short, human and mobile-first experience: simple onboarding, a card-first home and transaction moments that build trust over time.",
    slotWidthPreset: "iphone14",
    phoneMockupMode: true,
    slots: [
      {
        label: "Onboarding: short sign-up steps",
        visual: kobanImage(
          "product preview",
          "Onboarding.jpg",
          "Koban: onboarding flow",
          1440,
          2736
        ),
      },
      {
        label: "Home: balance and card",
        visual: kobanImage(
          "product preview",
          "HOME - ALPHA copy.png",
          "Koban: home screen with balance and pre-paid card",
          1440,
          4128,
        undefined,
        { top: 3672, backgroundColor: "#f8f8f8" }
      ),
      },
      {
        label: "Card: options",
        visual: kobanImage(
          "product preview",
          "CARD Options.jpg",
          "Koban: card options screen",
          1440,
          2560,
        undefined,
        { top: 2104, backgroundColor: "#f8f8f8" }
      ),
      },
      {
        label: "Card: active",
        visual: kobanImage(
          "product preview",
          "Card active.jpg",
          "Koban: active card screen",
          1440,
          2560
        ),
      },
      {
        label: "Transactions: successful",
        visual: kobanImage(
          "product preview",
          "transacction successfull.jpg",
          "Koban: successful transaction confirmation",
          1440,
          2704
        ),
      },
      {
        label: "Transactions: QR options",
        visual: kobanImage(
          "product preview",
          "QR Options.jpg",
          "Koban: QR options screen",
          1440,
          3388,
        undefined,
        { top: 2932, backgroundColor: "#ffffff" }
      ),
      },
    ],
  },
  challenge: {
    title: "The Challenge",
    intro:
      "Thousands of people are unable to access financial products due to paperwork, branch visits, and a user interface that assumes prior knowledge of banking. The existing apps aimed at digitally fluent customers, not first-time users, and pre-paid cards did not have a digital layer that established trust over time.\n\nAn underbanked user should be able to comprehend and trust a single product, app and card, from the very first screen.",
    research: {
      body:
        "During the research phase, I conducted workshops to map out the product needs, market fit, and even key problems users face in traditional banking, along with the most relevant gains and must-have features to develop. ",
      visualSlotBorder: "muted",
      scrollWideVisuals: true,
      visuals: [
        kobanImage(
          "project overview",
          "research_1.jpg",
          "Koban research (1 of 6)",
          2616,
          1264
        ),
        kobanImage(
          "project overview",
          "research_2.jpg",
          "Koban research (2 of 6)",
          1244,
          1200
        ),
        kobanImage(
          "project overview",
          "research_3.jpg",
          "Koban research (3 of 6)",
          2304,
          1520
        ),
        kobanImage(
          "project overview",
          "research_4.jpg",
          "Koban research (4 of 6)",
          1952,
          1840
        ),
        kobanImage(
          "project overview",
          "research_5.jpg",
          "Koban research (5 of 6): brainstorming workshop — must have, should have, nice to have",
          3744,
          1648
        ),
        kobanImage(
          "project overview",
          "research_6.jpg",
          "Koban research (6 of 6)",
          4144,
          1648
        ),
      ],
    },
    ideation: {
      items: [
        {
          label: "Onboarding for first-time users",
          description:
            "Short steps, human language and an explanation of why each piece of information is requested, so drop-off is treated as a design problem.",
        },
        {
          label: "App + card as one product",
          description:
            "A visual system designed around the card first, then extended into the app, so both feel like the same experience.",
        },
        {
          label: "Trust micro-moments",
          description:
            "Confirmations, receipts and notifications designed to build trust on every transaction.",
        },
        {
          label: "Plain language",
          description:
            "Copy rewritten for first-time financial users: no jargon and no surprises.",
        },
        {
          label: "Accessible by default",
          description:
            "Type sizes, contrast and tap targets that follow inclusive standards from the first screen.",
        },
      ],
      phoneMedia: true,
      explorations: {
        title: "Design explorations",
        body: "For this project, I explored a number of ideas in order to find the best fit with the business goals",
      },
      visualCaptions: ["Iteration 1", "Iteration 2"],
      visuals: [
        kobanImage(
          "the challenge",
          "HOME - 4.jpg",
          "Koban ideation: home exploration with floating tab bar",
          1440,
          5244,
          undefined,
          { top: 4794, backgroundColor: "#ffffff" }
        ),
        kobanImage(
          "the challenge",
          "HOME - 7.jpg",
          "Koban ideation: home exploration with main navigation bar",
          1440,
          5268,
          undefined,
          { top: 4831, backgroundColor: "#ffffff" }
        ),
      ],
    },
    testing: {
      items: [
        {
          label: "Rapid Prototyping",
          description:
            "High-fidelity, interactive mobile prototypes for each key flow, from sign-up to the first payment with the card.",
        },
        {
          label: "User Validation",
          description:
            "Usability sessions focused on whether first-time users understood each step without help.",
        },
        {
          label: "Iterative Refinement",
          description:
            "Continuous iteration on copy, hierarchy and flow length to reduce friction in onboarding.",
        },
        {
          label: "Developer Hand-off",
          description:
            "Specifications and a shared visual system handed off to engineering so the product shipped consistently across app and card.",
        },
      ],
    },
  },
  features: [
    {
      eyebrow: "Flow 1",
      title: "Onboarding",
      description:
        "Short steps, human language and clear reasons behind every question, designed for people who are new to financial products.",
      visual: kobanImage(
        "final UI & key features ",
        "ONBOARDING.jpg",
        "Koban: onboarding final UI",
        1572,
        3408
      ),
      phoneMockup: true,
      imageSide: "left",
    },
    {
      eyebrow: "Flow 2",
      title: "Card & wallet",
      description:
        "The pre-paid card and the app work as one product: activate the card, check the balance and manage it from the same place.",
      visual: kobanImage(
        "final UI & key features ",
        "CARD & WALLET.jpg",
        "Koban: card and wallet final UI",
        1440,
        3176
      ),
      phoneMockup: true,
      imageSide: "right",
    },
    {
      eyebrow: "Flow 3",
      title: "Trust moments",
      description:
        "Confirmations, receipts and notifications that reassure users on every transaction and build trust over time.",
      visual: kobanImage(
        "final UI & key features ",
        "TRSUT MOMENTS.jpg",
        "Koban: trust moments final UI",
        1456,
        2276
      ),
      phoneMockup: true,
      imageSide: "left",
    },
  ],
  designSystem: {
    title: "Transfer flow and movements",
    body:
      "Sending money and checking what happened afterwards are the most frequent actions in Koban, so both flows were designed as one continuous path: from the home, to choosing who receives the money, to a receipt and a movements history that is easy to search and filter.",
    bulletPoints: [
      "Recent movements live on the home, so the user sees what happened with their money without leaving the first screen.",
      "Sending starts from contacts: Koban users first, with the option to send to a phone number outside the app, and an optional message to give each transfer context.",
      "Every transfer ends in a clear receipt with amount, recipient and reference, which can be downloaded or shared as proof of payment.",
      "Movements default to everything and can be switched between inflows and outflows, showing the total for the last 30 days.",
      "Search by Koban ID, amount or phone number, plus a monthly summary and history, help users find any past transaction quickly.",
    ],
    scrollableVisual: true,
    scrollableVisualBackground: "#dcdcdc",
    visual: kobanImage(
      "final UI & key features ",
      "Movements.jpg",
      "Koban: transfer flow and movements screens",
      12684,
      12816
    ),
  },
  fullWidthVisual: kobanImage(
    "final UI & key features ",
    "montaje.png",
    "Koban: app home screen on a phone held in hand",
    5000,
    3333
  ),
  takeaways: {
    takeawayPoints: [
      "Financial inclusion is a tone, not a feature: every flow assumed the user was new, used plain language and explained why information was needed.",
      "App and card as one product: designing the card and the app together created a consistent identity people could recognize and trust.",
      "Trust is built in small moments: confirmations, receipts and notifications mattered as much as the main flows.",
    ],
  },
};

export const koban: Project = {
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
  cardImage: `${KOBAN_DIR}/${encodeURIComponent("final UI & key features ")}/montaje.png`,
  showInProjectsGrid: true,
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
  caseStudy: KOBAN_CASE_STUDY,
  gridLayout: { colSpan: "", rowSpan: "" },
};
