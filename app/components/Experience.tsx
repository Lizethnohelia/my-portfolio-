"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatExperienceYear } from "@/lib/format-experience-year";
import { cn } from "@/lib/utils";

interface Role {
  year: string;
  company: string;
  titles: string[];
  /** Contexto breve: impacto o enfoque del rol */
  summary: string;
}

const ROLES: Role[] = [
  {
    year: "Present",
    company: "Prima",
    titles: ["Freelance Senior Product Designer & UX/UI"],
    summary:
      "Led the end-to-end UX/UI design of a comprehensive B2B project management platform tailored for the manufacturing industry.",
  },
  {
    year: "Jun 2022 – Jul 2023",
    company: "Koban",
    titles: ["Freelance Senior Product Designer"],
    summary:
      "Lead the design process from idea to polished design for the KOBAN app.",
  },
  {
    year: "Nov 2021 – May 2022",
    company: "Zemoga",
    titles: ["Product Designer"],
    summary:
      "Enterprise B2C E-commerce: architected 8 high-level user flows and interactive prototypes for core Walmart app initiatives.",
  },
  {
    year: "May 2019 – Nov 2021",
    company: "Banco de Bogotá",
    titles: ["Senior Product Designer & Brand Designer"],
    summary:
      "Made usable and desirable web responsive sites such as B2C free investment loan requests, CDT requests, and B2B housing loan process, finance a purchase with a loan, and office bank services platform.",
  },
  {
    year: "Aug 2017 – May 2019",
    company: "Banco Finandina",
    titles: ["Senior Product Designer"],
    summary:
      "Designed digital app and web solutions for loans, accounts, and credit cards.",
  },
];

const YEARS_IN_INDUSTRY = "8+";

const EXPERIENCE_INTRO =
  "Based in Colombia, I'm a Senior Product Designer collaborating with clients across the US, Mexico, Colombia and Bolivia. Whether I'm tackling complex B2B systems or crafting intuitive B2C apps, my goal is to help teams ship high-performing, impactful products.";

/** Labels de columna en móvil — mismo estilo que Selected Projects. */
const EXPERIENCE_COLUMN_LABEL = "text-section-label";
const EXPERIENCE_MOBILE_COLUMN_LABEL = cn(EXPERIENCE_COLUMN_LABEL, "md:hidden");

/** Year y títulos de rol — misma escala y Manrope bold que el marquee del hero. */
const EXPERIENCE_YEAR_ROLE_VALUE = "text-pretty text-emphasis-sm";

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

export default function Experience() {
  const shouldReduce = useReducedMotion();
  const noMotion = !!shouldReduce;

  return (
    <section className="relative bg-surface">
      <div className="sticky top-0 z-20 border-b-table-row bg-surface px-5 py-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="inline-flex w-fit items-center justify-center rounded-full bg-foreground px-3 py-1 text-body-sm font-semibold text-background">
            {YEARS_IN_INDUSTRY}
          </span>
          <span className="text-balance text-heading-3 font-normal text-foreground">
            Years in the industry
          </span>
        </div>
      </div>

      <motion.div
        variants={STAGGER}
        initial={noMotion ? false : "hidden"}
        animate={noMotion ? "show" : undefined}
        whileInView={noMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.08, margin: "0px 0px 80px 0px" }}
        className="px-5 pb-20 pt-10 sm:px-8 md:px-12 lg:px-16 lg:pb-24 lg:pt-16"
      >
        <div className="max-w-5xl">
          <motion.p
            variants={FADE_UP}
            className="mb-10 max-w-3xl text-pretty text-body-md font-normal text-foreground md:mb-12"
          >
            {EXPERIENCE_INTRO}
          </motion.p>

          <motion.div
            variants={FADE_UP}
            className="mb-6 hidden border-b-table-row pb-6 md:grid md:grid-cols-[1fr_1fr_1.4fr] md:gap-x-12"
          >
            <span className={EXPERIENCE_COLUMN_LABEL}>Year</span>
            <span className={EXPERIENCE_COLUMN_LABEL}>Company</span>
            <span className={EXPERIENCE_COLUMN_LABEL}>Role & focus</span>
          </motion.div>

          {ROLES.map((role) => (
            <motion.article
              key={role.year}
              variants={FADE_UP}
              className="border-b-table-row py-6 last:border-b-0 md:py-7"
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_1.4fr] md:gap-x-12">
                <div className="min-w-0">
                  <p className={EXPERIENCE_MOBILE_COLUMN_LABEL}>Year</p>
                  <p className={cn(EXPERIENCE_YEAR_ROLE_VALUE, "md:pt-0")}>
                    {formatExperienceYear(role.year)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className={EXPERIENCE_MOBILE_COLUMN_LABEL}>Company</p>
                  <p className="text-pretty text-body-md text-foreground">
                    {role.company}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className={EXPERIENCE_MOBILE_COLUMN_LABEL}>Role & focus</p>
                  <div className="flex flex-col gap-2">
                    {role.titles.map((title) => (
                      <p
                        key={title}
                        className={EXPERIENCE_YEAR_ROLE_VALUE}
                      >
                        {title}
                      </p>
                    ))}
                    <p className="text-pretty text-body-sm">
                      {role.summary}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
