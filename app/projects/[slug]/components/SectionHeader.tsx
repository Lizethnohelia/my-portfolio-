import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Cabecera de sección reutilizable para las páginas de detalle:
 * eyebrow (chip pequeño) + título h2 + descripción opcional.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-4 sm:gap-5", className)}>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-body-sm text-foreground">
        <span
          aria-hidden="true"
          className="inline-block size-2 rounded-full bg-primary"
        />
        {eyebrow}
      </span>
      <h2 className="text-balance text-heading-2 font-normal text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-body-md text-muted">{description}</p>
      ) : null}
    </div>
  );
}
