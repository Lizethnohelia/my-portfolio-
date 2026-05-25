import type { Project } from "../../data";
import { SectionHeader } from "./SectionHeader";

export function ProblemStatement({
  problem,
}: {
  problem: Project["problem"];
}) {
  return (
    <section className="border-t-table-row px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="The Core Problem"
        title="Where the experience was breaking down."
        description={problem.intro}
      />

      <ul className="mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-4 sm:gap-y-5 md:grid-cols-2">
        {problem.points.map((point, index) => (
          <li
            key={point}
            className="flex gap-4 border-t-table-row pt-4 sm:gap-5 sm:pt-5"
          >
            <span
              aria-hidden="true"
              className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-body-xs font-semibold text-background sm:size-8"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-pretty text-body-md text-foreground">{point}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
