"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "../projects/data";
import { ProjectListItem } from "./ProjectListItem";

const SERVICES = [
  "AI Product Design",
  "Design Systems",
  "Problem Solving",
  "UX Research",
  "Prototyping",
];

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

/** Ritmo de entrada según cuántos proyectos hay en la lista. */
function getProjectsListMotion(count: number) {
  if (count <= 1) {
    return {
      staggerChildren: 0,
      delayChildren: 0.05,
      itemY: 20,
      stiffness: 125,
      damping: 26,
    };
  }
  if (count === 2) {
    return {
      staggerChildren: 0.14,
      delayChildren: 0.1,
      itemY: 32,
      stiffness: 108,
      damping: 24,
    };
  }
  return {
    staggerChildren: 0.09,
    delayChildren: 0.12,
    itemY: 36,
    stiffness: 95,
    damping: 22,
  };
}

const INTRO_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function IntroCell({ noMotion }: { noMotion: boolean }) {
  return (
    <motion.div
      variants={INTRO_STAGGER}
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
  const listMotion = getProjectsListMotion(gridProjects.length);

  const listStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: noMotion ? 0 : listMotion.staggerChildren,
        delayChildren: noMotion ? 0 : listMotion.delayChildren,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: noMotion ? 0 : listMotion.itemY },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: listMotion.stiffness,
        damping: listMotion.damping,
      },
    },
  };

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
          variants={listStagger}
          initial={noMotion ? false : "hidden"}
          animate={noMotion ? "show" : undefined}
          whileInView={noMotion ? undefined : "show"}
          viewport={{
            once: true,
            amount: gridProjects.length <= 1 ? 0.15 : 0.05,
            margin: "0px 0px 100px 0px",
          }}
          className="min-w-0 lg:col-span-8 xl:col-span-9"
        >
          <motion.p
            variants={FADE_UP}
            className="mb-2 text-section-label"
          >
            Selected Projects
          </motion.p>

          <div className="divide-y divide-border border-t border-border">
            {gridProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={listItem}
                className="pt-projects-grid-image"
              >
                <ProjectListItem
                  project={project}
                  index={index}
                  totalCount={gridProjects.length}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
