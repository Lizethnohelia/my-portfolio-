import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-background px-5 py-20 text-center sm:px-8 md:px-12 lg:px-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-body-sm text-foreground">
        <span aria-hidden="true" className="inline-block size-2 rounded-full bg-primary" />
        404
      </span>
      <h1 className="max-w-2xl text-balance text-heading-2 font-normal text-foreground">
        That project doesn’t exist… yet.
      </h1>
      <p className="max-w-xl text-pretty text-body-md text-muted">
        The case study you’re looking for might have been moved or renamed. Take
        a look at all my projects from the home page.
      </p>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-body-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to projects
      </Link>
    </main>
  );
}
