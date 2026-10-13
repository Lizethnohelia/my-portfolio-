"use client";

/* eslint-disable @next/next/no-img-element -- Imagen local a resolución nativa. */

import { useState } from "react";
import type { CaseStudyVisualAsset } from "../../../data";
import { cn } from "@/lib/utils";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

/**
 * Imagen a resolución nativa que carga a ancho completo del contenedor (zoom 1)
 * y permite acercar/alejar con botones; con zoom > 1 se desplaza con scroll.
 */
export function ZoomableVisual({
  visual,
  backgroundColor,
}: {
  visual: CaseStudyVisualAsset;
  backgroundColor?: string;
}) {
  const [zoom, setZoom] = useState(MIN_ZOOM);

  const buttonClass =
    "flex size-9 items-center justify-center rounded-full border border-border bg-background text-lg leading-none text-foreground shadow-sm transition-colors hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div className="relative">
      <div
        role="group"
        tabIndex={0}
        aria-label={`${visual.alt} (zoomable)`}
        style={backgroundColor ? { backgroundColor } : undefined}
        className="max-h-[75vh] overflow-auto rounded-2xl bg-background ring-1 ring-case-study-research-stroke focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <img
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading="lazy"
          decoding="async"
          style={{ width: `${zoom * 100}%` }}
          className={cn("block h-auto max-w-none")}
        />
      </div>
      <div
        className="absolute right-4 top-4 flex items-center gap-2"
        role="toolbar"
        aria-label="Zoom controls"
      >
        <button
          type="button"
          className={buttonClass}
          aria-label="Zoom out"
          disabled={zoom <= MIN_ZOOM}
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
        >
          −
        </button>
        <span
          aria-live="polite"
          className="min-w-12 rounded-full border border-border bg-background px-2 py-1 text-center text-sm tabular-nums text-foreground"
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          className={buttonClass}
          aria-label="Zoom in"
          disabled={zoom >= MAX_ZOOM}
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
        >
          +
        </button>
      </div>
    </div>
  );
}
