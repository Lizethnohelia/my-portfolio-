import Link from "next/link";
import { SectionHeader } from "./SectionHeader";

interface ConclusionProps {
  text: string;
  /** Slug del siguiente proyecto y su nombre, para encadenar lectura. */
  next?: { slug: string; title: string };
}

export function Conclusion({ text, next }: ConclusionProps) {
  return (
    <section className="border-t-table-row bg-background px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="Conclusion"
        title="What I’d take into the next project."
      />

      <p className="mt-8 max-w-4xl text-pretty text-heading-4 font-normal text-foreground sm:mt-10">
        {text}
      </p>

      <div className="mt-10 flex flex-col gap-4 border-t-table-row pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-body-md font-medium text-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          Back to all projects
        </Link>

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-3 self-start rounded-full bg-foreground px-5 py-3 text-body-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:self-auto"
          >
            Next project: {next.title}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
