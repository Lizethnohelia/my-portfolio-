"use client";

/* eslint-disable @next/next/no-img-element -- Calidad máxima: `<img>` sirve el PNG/JPG tal cual desde /public (sin /_next/image). */

import { useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { CarouselSlide } from "../../lib/collect-my-work-carousel-images";

const AUTO_SCROLL_PX_PER_SEC = 42;
/** Si el puntero se mueve menos que esto (px), el gesto cuenta como tap para abrir el preview. */
const TAP_MOVE_THRESHOLD_PX = 12;

interface FromFrameToFlowCarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

export function FromFrameToFlowCarousel({
  slides,
  className,
}: FromFrameToFlowCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState<CarouselSlide | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    pointerId: -1,
  });
  const pointerDownRef = useRef({
    clientX: 0,
    clientY: 0,
    slide: null as CarouselSlide | null,
  });
  const autoplayPausedUntilRef = useRef(0);

  const duplicateSlides = slides.length > 0 ? [...slides, ...slides] : [];

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [preview]);

  const syncLoopWidth = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || slides.length === 0) return;
    loopWidthRef.current = Math.max(1, Math.floor(el.scrollWidth / 2));
  }, [slides.length]);

  useEffect(() => {
    syncLoopWidth();
    const ro = new ResizeObserver(() => syncLoopWidth());
    const el = scrollerRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", syncLoopWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncLoopWidth);
    };
  }, [syncLoopWidth, slides]);

  const wrapScroll = useCallback(() => {
    const el = scrollerRef.current;
    const half = loopWidthRef.current;
    if (!el || half <= 0) return;
    while (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    }
    while (el.scrollLeft < 0) {
      el.scrollLeft += half;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || slides.length === 0) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const el = scrollerRef.current;
      const dt = (now - last) / 1000;
      last = now;

      if (
        el &&
        now >= autoplayPausedUntilRef.current &&
        !dragRef.current.active
      ) {
        el.scrollLeft += AUTO_SCROLL_PX_PER_SEC * dt;
        wrapScroll();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, slides.length, wrapScroll]);

  const pauseAutoplay = useCallback((ms: number) => {
    autoplayPausedUntilRef.current = performance.now() + ms;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheelNative = (e: WheelEvent) => {
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      el.scrollLeft += delta;
      wrapScroll();
      pauseAutoplay(1400);
    };

    el.addEventListener("wheel", onWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, [pauseAutoplay, wrapScroll]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;

    const li = (e.target as HTMLElement | null)?.closest<HTMLLIElement>(
      "[data-carousel-slide]"
    );
    const slideAttr = li?.dataset.carouselSlide;
    const slideIndex =
      slideAttr !== undefined ? Number.parseInt(slideAttr, 10) : NaN;
    const slide =
      Number.isFinite(slideIndex) && duplicateSlides[slideIndex]
        ? duplicateSlides[slideIndex]
        : null;

    pointerDownRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      slide,
    };

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
    pauseAutoplay(1200);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) {
      return;
    }
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.startScroll - dx;
    wrapScroll();
    pauseAutoplay(1200);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }

    const dx = e.clientX - pointerDownRef.current.clientX;
    const dy = e.clientY - pointerDownRef.current.clientY;
    const moved = Math.hypot(dx, dy);
    const tappedSlide = pointerDownRef.current.slide;
    if (moved < TAP_MOVE_THRESHOLD_PX && tappedSlide) {
      setPreview(tappedSlide);
    }

    pointerDownRef.current = { clientX: 0, clientY: 0, slide: null };

    dragRef.current = {
      active: false,
      startX: 0,
      startScroll: 0,
      pointerId: -1,
    };
  };

  const onMouseMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    setPointer({ x: e.clientX, y: e.clientY });
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative -mx-5 mt-10 sm:-mx-8 md:-mx-12 lg:-mx-16 lg:mt-14",
        className
      )}
    >
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Galería de trabajo: desplazamiento automático, arrastre o pulsación para ampliar imagen"
        onPointerEnter={(e) => {
          setHovering(true);
          setPointer({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          setHovering(false);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          onMouseMove(e);
          onPointerMove(e);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "cursor-none overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "touch-pan-x select-none"
        )}
      >
        <ul className="flex w-max items-end gap-4 px-5 sm:gap-5 sm:px-8 md:px-12 lg:gap-6 lg:px-16">
          {duplicateSlides.map((slide, index) => (
            <li
              key={`${slide.src}-${index}`}
              data-carousel-slide={index}
              className="flex shrink-0 items-end justify-center rounded-2xl bg-foreground/5 p-2 shadow-elevation-sm ring-1 ring-border"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 4 ? "high" : "low"}
                draggable={false}
                className={cn(
                  "h-auto w-auto object-contain",
                  "max-h-56 max-w-md sm:max-h-64 sm:max-w-lg md:max-h-72 md:max-w-xl lg:max-w-2xl"
                )}
              />
            </li>
          ))}
        </ul>
      </div>

      {hovering && !preview ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed z-50 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-body-sm text-background shadow-elevation-md motion-reduce:hidden"
          style={{
            left: pointer.x + 16,
            top: pointer.y + 16,
          }}
        >
          <span className="inline-flex items-center gap-2 font-medium">
            Zoom in
          </span>
        </div>
      ) : null}

      {preview && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="carousel-preview-title"
            >
              <button
                type="button"
                className="absolute inset-0 z-0 bg-cinema/85 backdrop-blur-md transition-opacity"
                aria-label="Cerrar vista previa"
                onClick={() => setPreview(null)}
              />
              <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center overflow-y-auto px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24">
                <p id="carousel-preview-title" className="sr-only">
                  {preview.alt}
                </p>
                <img
                  src={preview.src}
                  alt={preview.alt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="mx-auto block h-auto w-auto max-h-screen max-w-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className={cn(
                  "absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-elevation-md transition-transform duration-200 sm:right-6 sm:top-6",
                  "hover:scale-105 hover:bg-surface",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-label="Cerrar"
              >
                <X className="size-5" strokeWidth={1.75} aria-hidden />
              </button>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
