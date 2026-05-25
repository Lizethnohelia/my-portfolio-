"use client";

/* eslint-disable @next/next/no-img-element -- Capturas y video locales a resolución nativa. */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";
import { ProductPreviewBrowserChrome } from "./ProductPreviewBrowserChrome";

export type MacbookBrowserMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      width?: number;
      height?: number;
    }
  | { kind: "video"; src: string; alt: string; poster?: string };

type MacbookViewportHeight = "product-preview" | "hero-preview" | "hero-layout";

type ImageLoadPriority = "high" | "normal" | "lazy";

type MacbookMediaFit = "preview-width" | "full-width";

/** Prima: viewport de scroll = ratio × alto renderizado de la imagen (p. ej. 0.6 = 60%). */
const PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO = 0.6;

/** Prima: alto mínimo del viewport (= --min-height-case-study-ideation-viewport, 500px). */
const PRIMA_IDEATION_MIN_VIEWPORT_HEIGHT_PX = 500;

const PRIMA_MIN_MOCKUP_VIEWPORT_HEIGHT_PX = PRIMA_IDEATION_MIN_VIEWPORT_HEIGHT_PX;

/** Máximo tiempo del overlay de carga (sincronizado con --duration-case-study-media-loading-max). */
const CASE_STUDY_MEDIA_LOADING_MAX_MS = 5000;

function getRenderedImageHeight(img: HTMLImageElement): number {
  if (img.offsetHeight > 0) return img.offsetHeight;
  if (img.naturalWidth > 0 && img.naturalHeight > 0) {
    const width = img.offsetWidth > 0 ? img.offsetWidth : img.clientWidth;
    if (width > 0) {
      return Math.round((img.naturalHeight * width) / img.naturalWidth);
    }
  }
  return 0;
}

function isImageReady(img: HTMLImageElement): boolean {
  return img.complete && img.naturalHeight > 0;
}

function imageLoadingAttrs(priority: ImageLoadPriority) {
  if (priority === "high") {
    return { loading: "eager" as const, fetchPriority: "high" as const };
  }
  if (priority === "normal") {
    return { loading: "eager" as const };
  }
  return { loading: "lazy" as const };
}

function MediaLoadingOverlay({
  onFooterSurface,
}: {
  onFooterSurface?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
        onFooterSurface ? "bg-footer-surface/85" : "bg-background/85"
      )}
      aria-hidden={false}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span
        className={cn(
          "text-body-sm font-medium tracking-wide",
          onFooterSurface ? "text-footer-text" : "text-muted"
        )}
      >
        Loading
      </span>
    </div>
  );
}

function MacbookScrollViewport({
  children,
  viewportHeight = "product-preview",
  visibleImageHeightRatio,
  measuredViewportHeightPx,
  minViewportHeightPx,
  showLoadingOverlay,
  hasError,
  onFooterSurface,
  scrollContainerRef,
  mediaFit = "preview-width",
}: {
  children: ReactNode;
  viewportHeight?: MacbookViewportHeight;
  visibleImageHeightRatio?: number;
  measuredViewportHeightPx: number | null;
  minViewportHeightPx?: number;
  showLoadingOverlay: boolean;
  hasError: boolean;
  onFooterSurface?: boolean;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
  mediaFit?: MacbookMediaFit;
}) {
  const isFullWidthMedia = mediaFit === "full-width";
  const usesImageRatio = visibleImageHeightRatio != null;
  const isHeroLayout = viewportHeight === "hero-layout";
  const isHeroPreview = viewportHeight === "hero-preview";

  const ratioViewportStyle =
    usesImageRatio && measuredViewportHeightPx != null
      ? {
          height: `${measuredViewportHeightPx}px`,
          maxHeight: `${measuredViewportHeightPx}px`,
          minHeight: minViewportHeightPx
            ? `${minViewportHeightPx}px`
            : undefined,
        }
      : undefined;

  return (
    <div
      className={cn(
        "relative flex min-h-0 w-full min-w-0 max-w-full flex-col overflow-hidden bg-background",
        usesImageRatio &&
          measuredViewportHeightPx == null &&
          (minViewportHeightPx
            ? "min-h-case-study-ideation-viewport"
            : "min-h-48"),
        usesImageRatio
          ? "shrink-0"
          : isHeroLayout
            ? "min-h-0 flex-1"
            : isHeroPreview
              ? "h-case-study-hero-mockup max-h-case-study-hero-mockup shrink-0"
              : "h-case-study-macbook-product-preview max-h-case-study-macbook-product-preview shrink-0"
      )}
      style={ratioViewportStyle}
    >
      {showLoadingOverlay ? (
        <MediaLoadingOverlay onFooterSurface={onFooterSurface} />
      ) : null}
      {hasError ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <p className="text-body-sm text-muted">No se pudo cargar la captura.</p>
          <p className="text-body-xs text-muted">Revisa la conexión o vuelve a intentar.</p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto overscroll-contain [scrollbar-width:thin]"
        >
          <div
            className={cn(
              "w-full max-w-full",
              isFullWidthMedia
                ? "min-w-0"
                : "inline-block min-w-case-study-macbook-fluid"
            )}
          >
            <div
              className={cn(
                "flex w-full min-w-0",
                isFullWidthMedia ? "justify-stretch" : "justify-center"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Marco MacBook: scroll interno; opcional barra de navegador (Product preview / hero Prima). */
export function MacbookBrowserMediaSlot({
  media,
  addressLabel = "app.prima.io",
  browserChrome = true,
  loadPriority = "lazy",
  viewportHeight = "product-preview",
  visibleImageHeightRatio,
  minViewportHeightPx,
  initialScrollEnd = false,
  onFooterSurface = false,
  mediaFit = "preview-width",
  className,
}: {
  media: MacbookBrowserMedia;
  addressLabel?: string;
  browserChrome?: boolean;
  loadPriority?: ImageLoadPriority;
  viewportHeight?: MacbookViewportHeight;
  visibleImageHeightRatio?: number;
  /** P. ej. ideation Prima: mínimo 500px de alto visible del viewport. */
  minViewportHeightPx?: number;
  /** Al cargar, posiciona el scroll al final del contenido. */
  initialScrollEnd?: boolean;
  onFooterSurface?: boolean;
  /** `full-width`: captura al 100% del ancho del contenedor (Final UI Prima). */
  mediaFit?: MacbookMediaFit;
  className?: string;
}) {
  const ratio = visibleImageHeightRatio;
  const imageSrc = media.kind === "image" ? media.src : "";
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [viewportHeightPx, setViewportHeightPx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(media.kind === "image");
  const [hasError, setHasError] = useState(false);

  const measureViewport = useCallback(() => {
    if (ratio == null) return;
    const img = imgRef.current;
    if (!img) return;
    const rendered = getRenderedImageHeight(img);
    if (rendered > 0) {
      const scaled = Math.round(rendered * ratio);
      setViewportHeightPx(
        Math.max(minViewportHeightPx ?? 0, scaled)
      );
    }
  }, [minViewportHeightPx, ratio]);

  const applyScrollToEnd = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
  }, []);

  const markLoaded = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    measureViewport();
    if (initialScrollEnd) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          applyScrollToEnd();
        });
      });
    }
  }, [applyScrollToEnd, initialScrollEnd, measureViewport]);

  const syncLoadState = useCallback(() => {
    const img = imgRef.current;
    if (!img) {
      setIsLoading(true);
      return;
    }
    if (isImageReady(img)) {
      markLoaded();
    } else {
      setIsLoading(true);
      setHasError(false);
    }
  }, [markLoaded]);

  useLayoutEffect(() => {
    if (media.kind !== "image") return;

    syncLoadState();

    if (ratio == null) return;

    const img = imgRef.current;
    if (!img) return;

    measureViewport();
    const ro = new ResizeObserver(() => {
      measureViewport();
      if (isImageReady(img)) {
        setIsLoading(false);
      }
      if (initialScrollEnd) {
        applyScrollToEnd();
      }
    });
    ro.observe(img);
    window.addEventListener("resize", measureViewport);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureViewport);
    };
  }, [
    applyScrollToEnd,
    imageSrc,
    initialScrollEnd,
    measureViewport,
    media.kind,
    ratio,
    syncLoadState,
  ]);

  useEffect(() => {
    if (media.kind !== "image") return;

    setHasError(false);
    setViewportHeightPx(null);
    syncLoadState();
  }, [imageSrc, media.kind, syncLoadState]);

  useEffect(() => {
    if (media.kind !== "image" || !isLoading || hasError) return;

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
      measureViewport();
    }, CASE_STUDY_MEDIA_LOADING_MAX_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasError, imageSrc, isLoading, measureViewport, media.kind]);

  const lazyAttrs = imageLoadingAttrs(loadPriority);

  const intrinsic =
    media.kind === "image" && media.width && media.height
      ? { width: media.width, height: media.height }
      : undefined;

  const showLoadingOverlay = isLoading && !hasError;
  const isFullWidthMedia = mediaFit === "full-width";
  const mediaSizeClass = isFullWidthMedia
    ? "w-full max-w-full"
    : "w-case-study-prima-preview-img max-w-full";

  const mediaNode =
    media.kind === "image" ? (
      <img
        ref={imgRef}
        src={media.src}
        alt={media.alt}
        decoding="async"
        {...intrinsic}
        {...lazyAttrs}
        onLoad={markLoaded}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn("block h-auto shrink-0", mediaSizeClass)}
      />
    ) : (
      <video
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt}
        className={cn("block h-auto shrink-0", mediaSizeClass)}
      />
    );

  const viewport = (
    <MacbookScrollViewport
      viewportHeight={viewportHeight}
      visibleImageHeightRatio={ratio}
      measuredViewportHeightPx={viewportHeightPx}
      minViewportHeightPx={minViewportHeightPx}
      showLoadingOverlay={showLoadingOverlay}
      hasError={hasError}
      onFooterSurface={onFooterSurface}
      scrollContainerRef={scrollContainerRef}
      mediaFit={mediaFit}
    >
      {mediaNode}
    </MacbookScrollViewport>
  );

  if (!browserChrome) {
    return (
      <div
        className={cn(
          "min-w-0 overflow-hidden rounded-2xl",
          isFullWidthMedia ? "w-full max-w-none" : "max-w-full",
          "border border-footer-text/25 bg-footer-text/5",
          "shadow-elevation-sm ring-1 ring-footer-text/10",
          className
        )}
      >
        {viewport}
      </div>
    );
  }

  const isHeroLayout = viewportHeight === "hero-layout";
  const usesImageRatio = ratio != null;

  return (
    <div
      className={cn(
        "min-w-0",
        isFullWidthMedia ? "w-full max-w-none" : "max-w-full",
        isHeroLayout &&
          !usesImageRatio &&
          "flex h-case-study-hero-mockup-viewport max-h-case-study-hero-mockup-viewport flex-col",
        usesImageRatio && "flex w-full flex-col",
        className
      )}
    >
      <ProductPreviewBrowserChrome
        addressLabel={addressLabel}
        onFooterSurface={onFooterSurface}
        className={cn(
          usesImageRatio && "flex w-full min-h-0 flex-col",
          isHeroLayout && !usesImageRatio && "flex h-full min-h-0 flex-1 flex-col"
        )}
      >
        {viewport}
      </ProductPreviewBrowserChrome>
    </div>
  );
}

export {
  PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO,
  PRIMA_IDEATION_MIN_VIEWPORT_HEIGHT_PX,
  PRIMA_MIN_MOCKUP_VIEWPORT_HEIGHT_PX,
};
