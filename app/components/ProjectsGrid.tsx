"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "../projects/data";
import { ProjectListItem } from "./ProjectListItem";

const INTRO_COPY =
  "When facing new projects and complex challenges, I rely on a structured, data-driven methodology to deliver high-impact results. My approach begins with deeply understanding the core problem and user needs, followed by rapid iteration through wireframing, prototyping, and user validation.";

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

function IntroCell({ noMotion }: { noMotion: boolean }) {
  return (
    <motion.div
      variants={FADE_UP}
      initial={noMotion ? false : "hidden"}
      animate={noMotion ? "show" : undefined}
      whileInView={noMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px 60px 0px" }}
      className="flex max-w-xl gap-2 lg:max-w-none"
    >
      <span
        className="flex h-lh shrink-0 items-center"
        aria-hidden
      >
        <span className="hero-pill-dot text-primary" />
      </span>
      <p className="text-pretty text-body-md font-bold text-foreground">
        {INTRO_COPY}
      </p>
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
