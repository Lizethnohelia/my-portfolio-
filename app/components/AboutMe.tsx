"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function AboutMe() {
  const shouldReduce = useReducedMotion();
  const noMotion = !!shouldReduce;

  return (
    <section className="relative bg-surface">
      <div className="sticky top-0 z-20 border-b border-border bg-surface px-5 py-5 sm:px-8 md:px-12 lg:px-16">
        <h2 className="text-balance text-heading-3 font-normal text-foreground">
          About me
        </h2>
      </div>

      <motion.div
        variants={STAGGER}
        initial={noMotion ? false : "hidden"}
        animate={noMotion ? "show" : undefined}
        whileInView={noMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.12, margin: "0px 0px 80px 0px" }}
        className="px-5 pb-20 pt-10 sm:px-8 md:px-12 lg:px-16 lg:pb-24 lg:pt-16"
      >
        <motion.div variants={FADE_UP} className="max-w-3xl">
          <div className="mb-4 flex gap-2 text-heading-6">
            <span aria-label="Mexico">🇲🇽</span>
            <span aria-label="United States">🇺🇸</span>
          </div>

          <p className="text-pretty text-body-md font-normal text-foreground">
          Based in Colombia, I’m a Senior Product Designer collaborating with clients across the US, Mexico, and Bolivia.
           Whether I'm tackling complex B2B systems or crafting intuitive B2C apps, my goal is to help teams ship high-performing, 
           impactful products.
          </p>
        </motion.div>

        <motion.div
          variants={FADE_UP}
          className="mt-12 flex max-w-3xl flex-col gap-8 lg:flex-row lg:items-end lg:gap-16"
        >
         

      
        </motion.div>
      </motion.div>
    </section>
  );
}
