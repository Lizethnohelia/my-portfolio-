"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { HeroAnimatingLines } from "./HeroAnimatingLines";
import { SiteLogo } from "./SiteLogo";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const HERO_MARQUEE_SKILLS = [
  "AI Product Design",
  "Design Systems",
  "Problem Solving",
  "UX Research",
  "Prototyping",
  "Cross-functional",
  "Problem Solving",
  "B2B & B2C",
  "AI-assisted Workflows",
  "Product Strategy",
] as const;

const HERO_DESC =
  "I specialize in translating complex business challenges into intuitive, high-converting experiences.";

const LINE_REVEAL = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 1.05, ease: EASE_OUT },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const HERO_INTRO = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

function HeroNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="hero-nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-hero"
      style={{
        paddingTop: "var(--spacing-hero-nav-y)",
        paddingBottom: "var(--spacing-hero-nav-y)",
      }}
      aria-label="Principal"
    >
      <Link href="#projects" className="shrink-0" aria-label="Inicio">
        <SiteLogo size="nav" priority />
      </Link>

      <div className="flex items-center gap-6 sm:gap-10">
        <ul className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body-sm font-medium text-foreground transition-colors hover:text-muted"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="https://www.linkedin.com/in/lizethnohelia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-sm font-semibold text-foreground transition-colors hover:text-muted"
          aria-label="LinkedIn"
        >
          in
        </Link>
      </div>
    </motion.nav>
  );
}

function HeroTitleLine({ children, delay = 0 }: { children: string; delay?: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <span className="hero-title-line">
      <motion.span
        className="block"
        variants={LINE_REVEAL}
        initial={shouldReduce ? "show" : "hidden"}
        animate="show"
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function HeroMarquee() {
  const items = [...HERO_MARQUEE_SKILLS, ...HERO_MARQUEE_SKILLS];

  return (
    <div className="hero-marquee-wrap bg-surface" aria-hidden>
      <div className="hero-marquee-track">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="hero-marquee-item text-marquee-label"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      <HeroNav />

      <section
        id="hero"
        className="hero-screen relative overflow-hidden bg-surface px-hero pb-hero"
        aria-labelledby="hero-title"
      >
        <HeroAnimatingLines />

        <Link
          href="#projects"
          className="hero-scroll-hint z-10 motion-reduce:opacity-100"
          aria-label="Scroll to projects"
        >
          <span className="hero-scroll-line" aria-hidden />
          <span className="hero-scroll-label">Scroll</span>
        </Link>

        <motion.div
          variants={HERO_INTRO}
          initial={shouldReduce ? "show" : "hidden"}
          animate="show"
          className="relative z-10 w-full"
        >
          <motion.div
            variants={LINE_REVEAL}
            initial={shouldReduce ? "show" : "hidden"}
            animate="show"
            transition={{ delay: 0.5, duration: 0.75, ease: EASE_OUT }}
            className="hero-eyebrow w-fit"
          >
            <span className="hero-pill text-section-label">
              Senior Product Designer
            </span>
          </motion.div>

          <h1 id="hero-title" className="hero-title">
            <HeroTitleLine delay={0.05}>Lizeth</HeroTitleLine>
            <HeroTitleLine delay={0.15}>Avenda&ntilde;o</HeroTitleLine>
          </h1>

          <div className="hero-bottom">
            <motion.p
              variants={FADE_UP}
              className="hero-desc max-w-xl text-pretty text-body-md font-normal text-foreground"
            >
              {HERO_DESC}
            </motion.p>

            <motion.div
              variants={FADE_UP}
              transition={{ delay: 0.25 }}
              className="hero-pills"
            >
              <div className="hero-pill hero-pill-available text-section-label text-primary">
                <span className="hero-pill-dot" aria-hidden />
                Available for work
              </div>
              <div className="hero-pill text-section-label">Colombia · Remote</div>
              <div className="hero-pill text-section-label">
                9+ years in product design
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <HeroMarquee />
    </>
  );
}
