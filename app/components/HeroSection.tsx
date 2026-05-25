"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE_IN = [0.42, 0, 1, 1] as const;

const SLIDE_DOWN = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_IN },
  },
};

const HERO_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const WORD_REVEAL = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_IN },
  },
};

const AVATAR_POP = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: {
      type: "spring" as const,
      duration: 0.4,
      bounce: 0.5,
      delay: 1.2,
    },
  },
};

const HEADING_TEXT =
  "Senior Product Designer with 9 years of experience building scalable digital ecosystems";
  ;

function MinimalNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_IN }}
      className="relative z-10 flex items-center justify-between py-6"
    >
      <Link
        href="/"
        aria-label="Home"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-heading-6 font-bold text-background"
      >
        n
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-body-sm font-semibold text-foreground transition-colors hover:text-muted"
        aria-label="LinkedIn"
      >
        in
      </Link>
    </motion.nav>
  );
}

function Greeting() {
  return (
    <motion.div
      variants={SLIDE_DOWN}
      className="mb-10 flex items-center gap-4 lg:mb-14"
    >
      <motion.div
        variants={AVATAR_POP}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl lg:h-20 lg:w-20"
      >
        <Image
          src="/avatar.png"
          alt="Lizeth Avendaño"
          fill
          sizes="80px"
          className="object-cover"
          priority
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-body-md text-foreground">Greeting,</span>
        <span className="text-heading-6 font-normal text-foreground">
          I&apos;m Lizeth Avenda&ntilde;o
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const words = HEADING_TEXT.split(" ");

  return (
    <section className="flex min-h-screen flex-col bg-surface px-5 sm:px-8 md:px-12 lg:px-16">
      <MinimalNav />

      <motion.div
        initial="hidden"
        animate="show"
        variants={HERO_STAGGER}
        className="relative z-10 flex flex-1 flex-col justify-center pb-16 lg:pb-24"
      >
        <Greeting />

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
          }}
          className="relative"
        >
          <motion.h1 className="max-w-6xl text-balance text-heading-1 font-normal text-foreground">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={WORD_REVEAL}
                className="inline-block"
              >
                {word}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </motion.h1>

          
        </motion.div>

        <motion.p
          variants={SLIDE_DOWN}
          className="mt-8 max-w-6xl text-pretty text-body-md font-normal"
        >
          I specialize in translating complex business challenges into intuitive, 
          high-converting experiences for both B2B manufacturing and B2C Fintech sectors. 
          By integrating AI-powered productivity tools into my design workflow, 
          I accelerate rapid prototyping, streamline developer handoffs, 
          and deliver user-centric solutions that drive measurable business value faster and smarter.

        </motion.p>
      </motion.div>
    </section>
  );
}
