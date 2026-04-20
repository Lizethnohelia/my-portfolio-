"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
  "AI Product Design",
  "Design Systems",
  "Problem Solving",
  "UX Research",
  "Prototyping",
];

interface Project {
  title: string;
  category: string;
  description: string;
  href: string;
  image: string;
  colSpan: string;
  rowSpan: string;
  mobileOrder: number;
}

const PROJECTS: Project[] = [
  {
    title: "NeuralFlow",
    category: "AI Design",
    description: "AI-powered design workflow, reducing iteration time by 40%.",
    href: "#",
    image: "/projects/neuralflow.jpg",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    mobileOrder: 1,
  },
  {
    title: "DataViz AI",
    category: "Data Viz",
    description: "Smart dashboards that cut decision-making time 3x.",
    href: "#",
    image: "/projects/dataviz.jpg",
    colSpan: "",
    rowSpan: "",
    mobileOrder: 2,
  },
  {
    title: "BrandForge",
    category: "Generative AI",
    description: "Generative brand identity system for tech startups.",
    href: "#",
    image: "/projects/autodesign.jpg",
    colSpan: "",
    rowSpan: "",
    mobileOrder: 3,
  },
  {
    title: "MedInsight",
    category: "UX Research",
    description: "AI-driven clinical data for 200+ physicians.",
    href: "#",
    image: "/projects/medinsight.jpg",
    colSpan: "",
    rowSpan: "md:row-span-2",
    mobileOrder: 4,
  },
  {
    title: "CraftPlugin",
    category: "Dev Tools",
    description: "Eliminated 80% of design-dev handoff errors.",
    href: "#",
    image: "/projects/craftplugin.jpg",
    colSpan: "md:col-span-2",
    rowSpan: "",
    mobileOrder: 5,
  },
  {
    title: "InsightLens",
    category: "Analytics",
    description: "Real-time UX analytics powered by ML.",
    href: "#",
    image: "/projects/insightlens.jpg",
    colSpan: "",
    rowSpan: "",
    mobileOrder: 6,
  },
  {
    title: "SynthUI",
    category: "UI Generation",
    description: "AI-generated UI components, 60% dev time saved.",
    href: "#",
    image: "/projects/synthui.jpg",
    colSpan: "",
    rowSpan: "",
    mobileOrder: 7,
  },
  {
    title: "AutoDesign QA",
    category: "QA Automation",
    description: "Automated design QA across 50+ screens.",
    href: "#",
    image: "/projects/autodesign.jpg",
    colSpan: "",
    rowSpan: "",
    mobileOrder: 8,
  },
];

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const BENTO_ITEM = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 180, damping: 22 },
  },
};

function IntroCell({ noMotion }: { noMotion: boolean }) {
  return (
    <motion.div
      variants={STAGGER}
      initial={noMotion ? false : "hidden"}
      animate={noMotion ? "show" : undefined}
      whileInView={noMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px 60px 0px" }}
      className="flex flex-col gap-5 lg:max-w-none"
    >
      <motion.h2
        variants={FADE_UP}
        className="max-w-xl text-balance text-heading-3 font-normal text-foreground"
      >
        I do
      </motion.h2>

      <motion.div variants={FADE_UP} className="flex flex-wrap gap-2">
        {SERVICES.map((s) => (
          <span
            key={s}
            className="w-fit rounded-full border border-border px-3 py-1.5 text-body-sm text-foreground sm:px-4"
          >
            {s}
          </span>
        ))}
      </motion.div>

      <motion.p
        variants={FADE_UP}
        className="max-w-xl text-balance text-heading-3 font-normal text-foreground"
      >
        and everything in between
      </motion.p>

      <motion.p
        variants={FADE_UP}
        className="max-w-xl text-pretty text-body-md font-normal"
      >
        From concept to production — I partner with teams building AI-first
        products, turning complex workflows into intuitive experiences that users
        love and businesses rely on.
      </motion.p>
    </motion.div>
  );
}

function BentoCard({
  project,
  disableMotion,
}: {
  project: Project;
  disableMotion: boolean;
}) {
  return (
    <motion.a
      href={project.href}
      variants={BENTO_ITEM}
      whileHover={
        disableMotion
          ? undefined
          : {
              y: -6,
              transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 20,
              },
            }
      }
      className={`group relative block cursor-pointer overflow-hidden rounded-lg shadow-elevation-sm transition-shadow duration-300 hover:shadow-elevation-md ${project.colSpan} ${project.rowSpan}`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/40" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/50 via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 lg:p-5">
        <span className="w-fit rounded-full bg-background/80 px-3 py-1 text-body-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
          {project.category}
        </span>

        <div className="translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="text-heading-6 font-normal text-background">
            {project.title}
          </h3>
          <p className="mt-1 text-body-sm text-background/80">
            {project.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsGrid() {
  const shouldReduce = useReducedMotion();
  const noMotion = !!shouldReduce;

  return (
    <section className="bg-surface px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-12">
        <div className="lg:col-span-4 xl:col-span-3">
          <IntroCell noMotion={noMotion} />
        </div>

        <motion.div
          variants={STAGGER}
          initial={noMotion ? false : "hidden"}
          animate={noMotion ? "show" : undefined}
          whileInView={noMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.05, margin: "0px 0px 100px 0px" }}
          className="grid min-w-0 auto-rows-[200px] grid-cols-1 gap-3 md:auto-rows-[220px] md:grid-cols-3 lg:col-span-8 lg:auto-rows-[260px] xl:col-span-9"
        >
          {PROJECTS.map((p) => (
            <BentoCard key={p.title} project={p} disableMotion={noMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
