import type { Project } from "../../data";
import { SectionHeader } from "./SectionHeader";

export function ImpactSection({ impact }: { impact: Project["impact"] }) {
  return (
    <section className="bg-surface px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="Impact"
        title="Outcomes that mattered to the business."
        description={impact.intro}
      />

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        {impact.metrics.map((metric) => (
          <li
            key={metric.label}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-6 sm:gap-3 sm:p-8"
          >
            <span className="text-heading-2 font-normal text-foreground">
              {metric.value}
            </span>
            <span className="text-pretty text-body-md text-muted">
              {metric.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
