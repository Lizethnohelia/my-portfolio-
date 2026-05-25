"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { HighlightCard } from "../../data";

interface HighlightsCarouselProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: HighlightCard[];
}

/**
 * Carousel con scroll-snap: una card por viewport en móvil, dos en tablet y
 * tres en escritorio. Las flechas hacen scrollBy de un "page" cada vez y se
 * desactivan al tocar los extremos. Sin librerías externas.
 */
export function HighlightsCarousel({
  eyebrow,
  title,
  description,
  items,
}: HighlightsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setCanScrollPrev(node.scrollLeft > 4);
    setCanScrollNext(node.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const firstCard = node.querySelector<HTMLLIElement>("li");
    if (!firstCard) return;
    const styles = window.getComputedStyle(node);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = firstCard.offsetWidth + gap;
    node.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return (
    <section className="border-t-table-row bg-background px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-3xl flex-col gap-4 sm:gap-5">
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

        <div className="flex shrink-0 items-center gap-3 self-start lg:self-end">
          <CarouselButton
            direction="prev"
            disabled={!canScrollPrev}
            onClick={() => scrollByPage(-1)}
          />
          <CarouselButton
            direction="next"
            disabled={!canScrollNext}
            onClick={() => scrollByPage(1)}
          />
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-16 lg:mt-14 lg:gap-6 lg:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="snap-start shrink-0 basis-[85%] sm:basis-[55%] md:basis-[42%] lg:basis-[31%] xl:basis-[27%]"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-elevation-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 42vw, 28vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-balance text-heading-5 font-normal text-foreground">
                  {item.title}
                </h3>
                <p className="text-pretty text-body-md text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200",
        "hover:scale-105 hover:shadow-elevation-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted disabled:shadow-none disabled:hover:scale-100"
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(
          "size-5",
          direction === "prev" ? "rotate-180" : ""
        )}
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
