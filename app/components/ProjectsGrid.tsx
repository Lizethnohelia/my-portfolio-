"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "../projects/data";
import { ProjectCard } from "./ProjectCard";

const SERVICES = [
  "AI Product Design",
  "Design Systems",
  "Problem Solving",
  "UX Research",
  "Prototyping",
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

const CARD_ITEM = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 22 },
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

export default function ProjectsGrid() {
  const shouldReduce = useReducedMotion();
  const noMotion = !!shouldReduce;
  const gridProjects = PROJECTS.filter((p) => p.showInProjectsGrid !== false);

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-surface px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-24"
    >
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
          className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8 xl:col-span-9"
        >
          {gridProjects.map((project) => (
            <motion.div key={project.slug} variants={CARD_ITEM}>
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
