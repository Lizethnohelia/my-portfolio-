"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS, type Project } from "../projects/data";
import { cn } from "@/lib/utils";

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
    <motion.div
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
      className={`group relative overflow-hidden rounded-lg shadow-elevation-sm transition-shadow duration-300 hover:shadow-elevation-md ${project.gridLayout.colSpan} ${project.gridLayout.rowSpan}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Ver el caso de estudio: ${project.title}`}
        className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      />

      <Image
        src={project.cardImage}
        alt={project.title}
        fill
        sizes={
          project.cardImageSizes ??
          "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        quality={project.cardImageZoom ? 100 : 75}
        priority={project.cardImageZoom}
        className={
          project.cardImageZoom
            ? "inset-prima-card-image-zoom object-cover"
            : "object-cover transition-transform duration-500 group-hover:scale-105"
        }
      />

      <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/40" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/50 via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 lg:p-5">
        <span className="w-fit rounded-full bg-background/80 px-3 py-1 text-body-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
          {project.cardCategory}
        </span>

        <div className="translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3
            className={cn(
              project.cardTitleProminent
                ? "text-prima-card-title font-bold text-primary-foreground"
                : "text-heading-6 font-normal text-background"
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-pretty leading-snug",
              project.cardTitleProminent
                ? "text-prima-card-hover-body text-primary-foreground"
                : "text-body-sm text-background/90"
            )}
          >
            {project.cardHoverText ?? project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsGrid() {
  const shouldReduce = useReducedMotion();
  const noMotion = !!shouldReduce;

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
          className="grid min-w-0 auto-rows-[200px] grid-cols-1 gap-3 md:auto-rows-[220px] md:grid-cols-3 lg:col-span-8 lg:auto-rows-[260px] xl:col-span-9"
        >
          {PROJECTS.filter((p) => p.showInProjectsGrid !== false).map((p) => (
            <BentoCard key={p.slug} project={p} disableMotion={noMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
