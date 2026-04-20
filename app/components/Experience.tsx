"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Role {
  year: string;
  company: string;
  titles: string[];
  /** Contexto breve: impacto o enfoque del rol */
  summary: string;
}

const ROLES: Role[] = [
  {
    year: "2012 - 2013",
    company: "Estudio Norte",
    titles: ["Design Intern"],
    summary:
      "Apoyo en identidad visual y piezas digitales; primer contacto con flujos de entrega en equipo creativo.",
  },
  {
    year: "2013 - 2014",
    company: "Creative Hub MX",
    titles: ["Graphic Designer"],
    summary:
      "Campañas multicanal y material para retail; consolidación de criterio tipográfico y composición.",
  },
  {
    year: "2014 - 2015",
    company: "Freelance",
    titles: ["UI Designer"],
    summary:
      "Sitios y landings para pymes; prototipos en herramientas de diseño y coordinación directa con clientes.",
  },
  {
    year: "2015 - 2017",
    company: "PixelCraft Studio",
    titles: ["UI Designer"],
    summary:
      "Interfaces para productos digitales B2B; componentes reutilizables y handoff con desarrollo front-end.",
  },
  {
    year: "2017 - 2019",
    company: "BrightPath Agency",
    titles: ["Product Designer"],
    summary:
      "Discovery, wireframes y diseño UI end-to-end; pruebas con usuarios y iteración basada en datos.",
  },
  {
    year: "2019 - 2021",
    company: "Various Clients",
    titles: ["Senior Designer / Art Director"],
    summary:
      "Dirección creativa en proyectos paralelos; sistemas visuales, pitch decks y estándares de marca.",
  },
  {
    year: "2021 - 2023",
    company: "NovaTech",
    titles: ["Senior Product Designer", "Design Systems Lead"],
    summary:
      "Escala de un design system en Figma; documentación, tokens y alineación con ingeniería en releases ágiles.",
  },
  {
    year: "2023 - 2024",
    company: "Synth.ai",
    titles: ["Staff Designer"],
    summary:
      "Exploración de flujos asistidos por IA; prototipos de alta fidelidad y criterios de confianza en la UX.",
  },
  {
    year: "2024 - 2025",
    company: "Synth.ai",
    titles: ["AI Product Design Lead"],
    summary:
      "Liderazgo de iniciativas de producto con ML; priorización con negocio y diseño de experiencias responsables.",
  },
  {
    year: "2025 - Present",
    company: "Independent",
    titles: ["Senior Product Designer — AI Tools"],
    summary:
      "Consultoría y diseño hands-on para equipos que lanzan productos con IA; desde estrategia hasta entrega.",
  },
];

const YEARS_IN_INDUSTRY = "14+";

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
          <motion.div
            variants={FADE_UP}
            className="mb-6 hidden border-b-table-row pb-6 md:grid md:grid-cols-[1fr_1fr_1.4fr] md:gap-x-12"
          >
            <span className="text-body-md font-bold uppercase tracking-widest text-muted">
              Year
            </span>
            <span className="text-body-md  font-bold uppercase tracking-widest text-muted">
              Company
            </span>
            <span className="text-body-md font-bold uppercase tracking-widest text-muted">
              Role & focus
            </span>
          </motion.div>

          {ROLES.map((role) => (
            <motion.article
              key={role.year}
              variants={FADE_UP}
              className="border-b-table-row py-6 last:border-b-0 md:py-7"
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_1.4fr] md:gap-x-12">
                <div className="min-w-0">
                  <p className="text-heading-2 uppercase tracking-wider md:hidden">
                    Year
                  </p>
                  <p className="text-pretty text-heading-6 font-bold text-foreground md:pt-0">
                    {role.year}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-heading-6 uppercase tracking-wider text-muted md:hidden">
                    Company
                  </p>
                  <p className="text-pretty text-body-md text-foreground">
                    {role.company}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-heading-6 uppercase tracking-wider md:hidden">
                    Role & focus
                  </p>
                  <div className="flex flex-col gap-2">
                    {role.titles.map((title) => (
                      <p
                        key={title}
                        className="text-pretty text-heading-6 font-bold text-foreground"
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
