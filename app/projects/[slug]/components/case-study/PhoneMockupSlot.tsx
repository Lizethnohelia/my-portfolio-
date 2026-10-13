/* eslint-disable @next/next/no-img-element -- Capturas locales a resolución nativa dentro del marco. */

import type { CSSProperties } from "react";
import type { CaseStudyVisualAsset } from "../../../data";
import { cn } from "@/lib/utils";

type PhoneMockupSlotProps = {
  visual?: CaseStudyVisualAsset;
  /** Texto del placeholder cuando aún no hay captura. */
  label: string;
  priority?: "high" | "normal" | "lazy";
  /** En desktop (lg) ocupa todo el alto del contenedor `relative` en vez de un ancho fijo. */
  fitHeight?: boolean;
  className?: string;
};

type FixedNav = {
  src: string;
  width: number;
  height: number;
  top: number;
  backgroundColor: string;
};

function getFixedNav(visual?: CaseStudyVisualAsset): FixedNav | null {
  if (!visual?.src || !visual.width || !visual.height || !visual.fixedBottomNav) {
    return null;
  }
  return {
    src: visual.src,
    width: visual.width,
    height: visual.height,
    ...visual.fixedBottomNav,
  };
}

/** Alto del degradado que funde el contenido con la barra fija. */
const NAV_FADE_CLASS = "h-10";

/**
 * Marco de smartphone (equivalente móvil de `MacbookBrowserMediaSlot`).
 * Pantalla de alto fijo (390×844); si la captura es más alta, hace scroll interno.
 * Con `visual.fixedBottomNav` la barra inferior queda fija y el contenido pasa por detrás.
 */
export function PhoneMockupSlot({
  visual,
  label,
  priority = "lazy",
  fitHeight = false,
  className,
}: PhoneMockupSlotProps) {
  const nav = getFixedNav(visual);
  const imgLoading = {
    loading: priority === "lazy" ? ("lazy" as const) : ("eager" as const),
    ...(priority === "high" ? { fetchPriority: "high" as const } : {}),
  };

  const screenStyle: CSSProperties | undefined = nav
    ? { backgroundColor: nav.backgroundColor }
    : undefined;

  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[17.5rem] rounded-[2.75rem] bg-cinema p-2.5 shadow-elevation-md ring-1 ring-border",
        fitHeight &&
          "lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-auto lg:max-w-none lg:aspect-[400/864]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-cinema"
      />
      <div
        style={screenStyle}
        className={cn(
          "relative aspect-[390/844] w-full overflow-hidden rounded-[2.25rem] bg-background",
          fitHeight && "lg:aspect-auto lg:h-full"
        )}
      >
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav ? (
            <div style={{ paddingBottom: `${((nav.height - nav.top) / nav.width) * 100}%` }}>
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: `${nav.width} / ${nav.top}` }}
              >
                <img
                  src={nav.src}
                  alt={visual?.alt ?? label}
                  width={nav.width}
                  height={nav.height}
                  decoding="async"
                  {...imgLoading}
                  className="absolute inset-x-0 top-0 block h-auto w-full"
                />
              </div>
            </div>
          ) : visual?.src ? (
            <img
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              decoding="async"
              {...imgLoading}
              className="block h-auto w-full"
            />
          ) : (
            <div
              role="img"
              aria-label={label}
              className="flex h-full min-h-full w-full flex-col items-center justify-center gap-2 px-5 text-center"
            >
              <span className="text-body-xs font-medium uppercase tracking-widest text-muted">
                Mobile screen
              </span>
              <span className="text-body-xs text-muted">{label}</span>
            </div>
          )}
        </div>

        {nav ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col"
          >
            <div
              className={NAV_FADE_CLASS}
              style={{
                backgroundImage: `linear-gradient(to top, ${nav.backgroundColor}, ${nav.backgroundColor}00)`,
              }}
            />
            <div
              className="w-full bg-no-repeat"
              style={{
                aspectRatio: `${nav.width} / ${nav.height - nav.top}`,
                backgroundColor: nav.backgroundColor,
                backgroundImage: `url("${nav.src}")`,
                backgroundSize: "100% auto",
                backgroundPosition: "bottom",
              }}
            />
          </div>
        ) : null}
      </div>
    </figure>
  );
}
