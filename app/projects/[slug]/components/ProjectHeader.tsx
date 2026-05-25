import Link from "next/link";
import type { Project } from "../../data";

const META_LABEL = "text-body-xs font-semibold uppercase tracking-widest text-muted";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="px-5 pb-12 pt-8 sm:px-8 sm:pt-10 md:px-12 lg:px-16 lg:pb-16 lg:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-body-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to projects
      </Link>

      <div className="mt-8 flex max-w-5xl flex-col gap-6 sm:gap-8 lg:mt-12">
        <ul className="flex flex-wrap items-center gap-2" aria-label="Categories">
          {project.categories.map((category) => (
            <li
              key={category}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-body-sm text-foreground"
            >
              <span
                aria-hidden="true"
                className="inline-block size-2 rounded-full bg-primary"
              />
              {category}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 sm:gap-5">
          <span className="text-body-md font-semibold uppercase tracking-widest text-muted">
            {project.title}
          </span>
          <h1 className="text-balance text-heading-1 font-normal text-foreground">
            {project.headline}
          </h1>
          {project.subtitle ? (
            <p className="max-w-3xl text-pretty text-heading-5 font-normal text-muted">
              {project.subtitle}
            </p>
          ) : null}
        </div>

        <dl className="mt-2 grid grid-cols-1 gap-x-12 gap-y-4 border-t-table-row pt-6 sm:grid-cols-3 sm:gap-y-0">
          <div className="flex flex-col gap-1">
            <dt className={META_LABEL}>Role</dt>
            <dd className="text-body-md text-foreground">{project.meta.role}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className={META_LABEL}>Year</dt>
            <dd className="text-body-md text-foreground">{project.meta.year}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className={META_LABEL}>Client</dt>
            <dd className="text-body-md text-foreground">{project.meta.client}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
