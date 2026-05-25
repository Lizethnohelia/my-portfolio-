/* eslint-disable @next/next/no-img-element -- Celdas del bento con imágenes locales editables en data.ts. */

import type { CaseStudyBentoCell, CaseStudyBentoGrid, CaseStudyVisualAsset } from "../../../data";
import { cn } from "@/lib/utils";

function BentoIntrinsicImage({ visual }: { visual: CaseStudyVisualAsset }) {
  return (
    <img
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      loading="lazy"
      decoding="async"
      className="h-auto w-auto max-w-full"
    />
  );
}

function BentoImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-border px-4 py-6 text-center"
      aria-label={label}
    >
      <span className="text-body-xs text-muted">{label}</span>
    </div>
  );
}

function BentoCell({ cell }: { cell: CaseStudyBentoCell }) {
  if (cell.variant === "headline") {
    return (
      <div
        className={cn(
          "flex min-h-bento-row-tall flex-col justify-end overflow-hidden rounded-2xl p-6 sm:p-8",
          cell.surface === "lime"
            ? "bg-bento-lime text-foreground"
            : "bg-background text-foreground"
        )}
      >
        <div className="flex flex-col gap-0 leading-none">
          {cell.headlineLines?.map((line) => (
            <span
              key={line}
              className="font-sans text-heading-3 font-normal uppercase tracking-tight"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (cell.variant === "media") {
    if (!cell.visual?.src) {
      return <BentoImagePlaceholder label="Imagen — reemplazar en data.ts" />;
    }
    return (
      <figure className="m-0 flex min-w-0 items-start justify-start">
        <BentoIntrinsicImage visual={cell.visual} />
      </figure>
    );
  }

  if (cell.variant === "category") {
    return (
      <figure className="m-0 flex min-w-0 flex-col items-start gap-3">
        {cell.categoryVisual?.src ? (
          <BentoIntrinsicImage visual={cell.categoryVisual} />
        ) : (
          <BentoImagePlaceholder label="Icono" />
        )}
        {cell.categoryLabel ? (
          <figcaption className="text-body-md font-medium text-foreground">
            {cell.categoryLabel}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (cell.variant === "typography") {
    return (
      <div
        className={cn(
          "flex min-h-bento-row-short flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl px-6 py-8",
          cell.surface === "black"
            ? "bg-cinema text-cinema-foreground"
            : "bg-background text-foreground"
        )}
      >
        {cell.fontLabel ? (
          <span className="text-body-sm text-cinema-foreground/80">
            {cell.fontLabel}
          </span>
        ) : null}
        {cell.typeSample ? (
          <span className="font-sans text-heading-1 leading-none">
            {cell.typeSample}
          </span>
        ) : null}
      </div>
    );
  }

  if (cell.variant === "device-mockup") {
    if (!cell.deviceVisual?.src) {
      return <BentoImagePlaceholder label="Asset — reemplazar en data.ts" />;
    }
    return (
      <figure className="m-0 flex min-w-0 items-start justify-start">
        <BentoIntrinsicImage visual={cell.deviceVisual} />
      </figure>
    );
  }

  return null;
}

/**
 * Bento Prima: texto con superficie solo en headline/typography; imágenes a tamaño intrínseco sin fondos.
 */
export function PrimaDesignSystemBentoGrid({ grid }: { grid: CaseStudyBentoGrid }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-8">
      <div className="grid grid-cols-12 items-start gap-6 sm:gap-8">
        {grid.row1.map((cell, index) => (
          <div key={`row1-${index}`} className="col-span-12 min-w-0 sm:col-span-4">
            <BentoCell cell={cell} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 items-start gap-6 sm:gap-8">
        {grid.row2.map((cell, index) => (
          <div key={`row2-${index}`} className="col-span-12 min-w-0 sm:col-span-3">
            <BentoCell cell={cell} />
          </div>
        ))}
      </div>
      {grid.row3?.length ? (
        <div className="grid grid-cols-12 items-start gap-6 sm:gap-8">
          {grid.row3.map((cell, index) => (
            <div
              key={`row3-${index}`}
              className="col-span-12 min-w-0"
            >
              <BentoCell cell={cell} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
