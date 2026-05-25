/* eslint-disable @next/next/no-img-element -- Píxeles originales desde /public (sin /_next/image). */
import type { Project, WorkBlock } from "../../data";
import { collectMyWorkCarouselImages } from "../../lib/collect-my-work-carousel-images";
import { FromFrameToFlowCarousel } from "./FromFrameToFlowCarousel";
import { SectionHeader } from "./SectionHeader";

function VideoMedia({
  block,
  cinema = false,
}: {
  block: WorkBlock & { media: NonNullable<WorkBlock["media"]> };
  cinema?: boolean;
}) {
  const hasSrc = Boolean(block.media.src?.trim());

  const figureClass = cinema
    ? "relative overflow-hidden rounded-xl bg-cinema shadow-elevation-md"
    : "relative overflow-hidden rounded-2xl bg-foreground/5 shadow-elevation-md";

  const captionClass = cinema
    ? "px-5 py-4 text-body-sm text-cinema-muted sm:px-6 sm:py-5"
    : "px-5 py-4 text-body-sm text-muted sm:px-6 sm:py-5";

  if (hasSrc) {
    return (
      <figure className={figureClass}>
        <div className="relative aspect-video w-full bg-cinema">
          <video
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            {...(block.media.poster ? { poster: block.media.poster } : {})}
            aria-label={block.media.alt}
          >
            <source src={block.media.src} type="video/mp4" />
          </video>
        </div>
        {block.media.caption ? (
          <figcaption className={captionClass}>{block.media.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={figureClass}>
      <div className="relative aspect-video w-full bg-cinema">
        {block.media.poster ? (
          <img
            src={block.media.poster}
            alt={block.media.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-foreground/10" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-background/95 text-foreground shadow-elevation-md sm:size-20">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-7 sm:size-8"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
            <span className="sr-only">Reproducir video</span>
          </span>
        </div>
      </div>
      {block.media.caption ? (
        <figcaption className={captionClass}>{block.media.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ImageMedia({
  block,
}: {
  block: WorkBlock & { media: NonNullable<WorkBlock["media"]> };
}) {
  return (
    <figure className="relative overflow-hidden rounded-2xl bg-foreground/5 shadow-elevation-sm">
      <div className="relative aspect-[16/10] w-full">
        <img
          src={block.media.src}
          alt={block.media.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {block.media.caption ? (
        <figcaption className="px-5 py-4 text-body-sm text-muted sm:px-6 sm:py-5">
          {block.media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MosaicBlock({
  block,
  suppressTiles,
}: {
  block: WorkBlock;
  suppressTiles: boolean;
}) {
  if (block.layout !== "mosaic" || !block.tiles?.length) {
    return null;
  }

  return (
    <article className="flex flex-col gap-6 sm:gap-8">
      <div className="flex max-w-3xl flex-col gap-3">
        {block.heading ? (
          <h3 className="text-balance text-heading-4 font-normal text-foreground">
            {block.heading}
          </h3>
        ) : null}
        <p className="text-pretty text-body-md text-muted">{block.description}</p>
      </div>

      {suppressTiles ? null : (
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {block.tiles.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              className={`overflow-hidden rounded-2xl bg-background shadow-elevation-sm ring-1 ring-border ${tile.span}`}
            >
              <div
                className={`flex w-full min-w-0 items-center justify-center ${tile.aspect ?? "aspect-video"}`}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  className="h-auto max-h-full w-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function StackedBlock({
  block,
  suppressImageMedia,
}: {
  block: WorkBlock;
  suppressImageMedia: boolean;
}) {
  const cinema = block.presentation === "cinema";
  if (!block.media) {
    return null;
  }

  const withMedia = block as WorkBlock & {
    media: NonNullable<WorkBlock["media"]>;
  };

  const hideInlineImage =
    suppressImageMedia &&
    withMedia.media.type === "image";

  const copy = (
    <div className="flex max-w-3xl flex-col gap-3">
      {block.heading ? (
        <h3
          className={
            cinema
              ? "text-balance text-heading-4 font-normal text-cinema-foreground"
              : "text-balance text-heading-4 font-normal text-foreground"
          }
        >
          {block.heading}
        </h3>
      ) : null}
      <p
        className={
          cinema
            ? "text-pretty text-body-md text-cinema-muted"
            : "text-pretty text-body-md text-muted"
        }
      >
        {block.description}
      </p>
    </div>
  );

  const media =
    withMedia.media.type === "video" ? (
      <VideoMedia block={withMedia} cinema={cinema} />
    ) : hideInlineImage ? null : (
      <ImageMedia block={withMedia} />
    );

  if (cinema) {
    return (
      <article className="flex flex-col gap-6 rounded-2xl bg-cinema px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
        {copy}
        {media}
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-6 sm:gap-8">
      {copy}
      {media}
    </article>
  );
}

function SplitBlock({
  block,
  suppressImageMedia,
}: {
  block: WorkBlock;
  suppressImageMedia: boolean;
}) {
  if (!block.media) {
    return null;
  }

  const withMedia = block as WorkBlock & {
    media: NonNullable<WorkBlock["media"]>;
  };

  const hideInlineImage =
    suppressImageMedia && withMedia.media.type === "image";

  return (
    <article
      className={
        hideInlineImage
          ? "flex flex-col gap-3 sm:gap-4"
          : "grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-14"
      }
    >
      <div
        className={
          hideInlineImage
            ? "flex max-w-3xl flex-col gap-3"
            : "flex flex-col gap-3 md:order-2"
        }
      >
        {block.heading ? (
          <h3 className="text-balance text-heading-4 font-normal text-foreground">
            {block.heading}
          </h3>
        ) : null}
        <p className="text-pretty text-body-md text-muted">{block.description}</p>
      </div>
      {hideInlineImage ? null : (
        <div className="md:order-1">
          {withMedia.media.type === "video" ? (
            <VideoMedia block={withMedia} />
          ) : (
            <ImageMedia block={withMedia} />
          )}
        </div>
      )}
    </article>
  );
}

export function MyWork({ myWork }: { myWork: Project["myWork"] }) {
  const carouselSlides = collectMyWorkCarouselImages(myWork);
  const useCarouselStrip = carouselSlides.length > 0;

  return (
    <section className="bg-surface px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="My Work"
        title="From research to design"
        description={myWork.intro}
      />

      {useCarouselStrip ? (
        <FromFrameToFlowCarousel slides={carouselSlides} />
      ) : null}

      <div
        className={
          useCarouselStrip
            ? "mt-12 flex flex-col gap-12 sm:mt-14 sm:gap-14 lg:mt-16 lg:gap-20"
            : "mt-10 flex flex-col gap-12 sm:gap-14 lg:mt-14 lg:gap-20"
        }
      >
        {myWork.blocks.map((block, index) =>
          block.layout === "mosaic" ? (
            <MosaicBlock
              key={`${block.heading ?? "block"}-${index}`}
              block={block}
              suppressTiles={useCarouselStrip}
            />
          ) : block.layout === "split" ? (
            <SplitBlock
              key={`${block.heading ?? "block"}-${index}`}
              block={block}
              suppressImageMedia={useCarouselStrip}
            />
          ) : (
            <StackedBlock
              key={`${block.heading ?? "block"}-${index}`}
              block={block}
              suppressImageMedia={useCarouselStrip}
            />
          )
        )}
      </div>
    </section>
  );
}
