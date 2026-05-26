/* eslint-disable @next/next/no-img-element -- Placeholders y láminas locales a resolución nativa. */

import Link from "next/link";
import type { ReactNode } from "react";
import type {
  CaseStudyChallengeSection,
  CaseStudyDesignSystemSection,
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyProductPreview,
  CaseStudyStatementAndAcknowledgements,
  CaseStudyTakeaways,
  CaseStudyVisualAsset,
  Project,
} from "../../../data";
import { cn } from "@/lib/utils";
import {
  PRIMA_CHALLENGE_INTRO_HIGHLIGHTS,
  PRIMA_CHALLENGE_RESEARCH_HIGHLIGHTS,
  PRIMA_OVERVIEW_HIGHLIGHTS,
  PRIMA_TAKEAWAY_LABEL_HIGHLIGHTS,
} from "../../../prima-case-study-highlights";
import { CaseStudyHighlightGroup } from "@/components/case-study/CaseStudyHighlightGroup";
import { CaseStudyHighlightedParagraph } from "./CaseStudyHighlightedParagraph";
import { PrimaLineHighlightText } from "@/components/case-study/PrimaLineHighlightText";
import {
  MacbookBrowserMediaSlot,
  PRIMA_MIN_MOCKUP_VIEWPORT_HEIGHT_PX,
  PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO,
} from "./MacbookBrowserMediaSlot";
import { PrimaDesignSystemBentoGrid } from "./PrimaDesignSystemBentoGrid";
import { CaseStudyProductVideoSection } from "./CaseStudyProductVideoSection";
import { ProductPreviewMacbookScroll } from "./ProductPreviewMacbookScroll";

/** Contenedor del case study: ancho máximo 7xl + padding moderado. */
const CASE_STUDY_INNER = "mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 md:py-16 lg:py-20";

type CaseStudyVisualSurface = "page" | "footer";
type CaseStudyVisualWidth = "full" | "iphone14" | "macbook-air";
type CaseStudyVisualLayout = "card" | "strip";

function CaseStudyVisualSlot({
  visual,
  label,
  surface = "page",
  widthPreset = "full",
  layout = "card",
  macbookPresentation = "default",
  borderTone = "default",
}: {
  visual?: CaseStudyVisualAsset;
  label: string;
  surface?: CaseStudyVisualSurface;
  widthPreset?: CaseStudyVisualWidth;
  layout?: CaseStudyVisualLayout;
  /** Con marco navegador + alto acotado (solo product preview Prima). */
  macbookPresentation?: "default" | "product-preview";
  /** Borde del marco: `muted` usa el token muted del tema (p. ej. research Prima). */
  borderTone?: "default" | "muted";
}) {
  const isFooter = surface === "footer";
  const isMacbook = widthPreset === "macbook-air";
  const isMacbookProductPreview = isMacbook && macbookPresentation === "product-preview";
  const isMutedFrame = borderTone === "muted" && !isFooter;

  const sizeClass = isMacbookProductPreview
    ? "w-full min-w-0 max-w-full shrink-0"
    : isMacbook
      ? "w-full min-w-0 max-w-full"
      : cn(
          widthPreset === "iphone14"
            ? "mx-auto min-h-case-study-capture w-full max-w-case-study-phone sm:w-case-study-phone"
            : visual?.src
              ? "w-full min-w-0 max-w-full"
              : "min-h-case-study-capture w-full min-w-0 max-w-full"
        );

  const imgMinClass =
    isMacbook && !isMacbookProductPreview
      ? "min-h-0 sm:min-h-case-study-macbook"
      : widthPreset === "full" && visual?.src
        ? ""
        : "min-h-case-study-capture";

  const borderClass =
    layout === "strip"
      ? "border-0"
      : isFooter
        ? "border border-footer-text/25"
        : isMutedFrame
          ? visual?.src
            ? "border-case-study-research-stroke"
            : "border-case-study-research-stroke-dashed"
          : "border border-border";
  const innerBg = isFooter ? "bg-footer-text/5" : "bg-background";
  const roundedClass = layout === "card" ? "rounded-2xl" : "rounded-none";
  const shadowClass = layout === "card" && !isMutedFrame ? "shadow-elevation-sm" : "";
  const ringClass =
    layout === "card"
      ? isFooter
        ? "ring-1 ring-footer-text/10"
        : isMutedFrame
          ? "ring-case-study-research-stroke"
          : "ring-1 ring-border"
      : "";

  const labelMuted = isFooter ? "text-footer-text-muted" : "text-muted";

  if (visual?.src && isMacbookProductPreview) {
    return (
      <MacbookBrowserMediaSlot
        media={{
          kind: "image",
          src: visual.src,
          alt: visual.alt,
          width: visual.width,
          height: visual.height,
        }}
        loadPriority="normal"
        onFooterSurface={isFooter}
        visibleImageHeightRatio={PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO}
      />
    );
  }

  if (visual?.src) {
    return (
      <div
        className={cn(
          "overflow-hidden",
          borderClass,
          innerBg,
          roundedClass,
          shadowClass,
          ringClass,
          sizeClass
        )}
      >
        <img
          src={visual.src}
          alt={visual.alt}
          loading="lazy"
          decoding="async"
          className={cn("mx-auto h-auto w-full max-w-full object-contain", imgMinClass)}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        !isMutedFrame && "border-dashed",
        isMacbookProductPreview &&
          "h-case-study-macbook-product-preview max-h-case-study-macbook-product-preview overflow-hidden",
        borderClass,
        innerBg,
        roundedClass,
        shadowClass,
        ringClass,
        sizeClass
      )}
    >
      <span
        className={cn(
          "text-body-sm font-medium uppercase tracking-widest",
          labelMuted
        )}
      >
        {isMacbookProductPreview
          ? "Product preview — navegador"
          : isMacbook
            ? "MacBook Air 1280×832"
            : "Visual placeholder"}
      </span>
      <span className={cn("max-w-md text-body-sm break-words", labelMuted)}>
        {label}
      </span>
    </div>
  );
}

type CaseStudySplitVariant = "footer" | "surface" | "default";

type CaseStudySectionLayout = "split" | "single";

/** `split`: título 4 / contenido 8. `single`: una columna (p. ej. Final UI Prima). */
function CaseStudySplitSection({
  variant,
  title,
  aside,
  children,
  layout = "split",
}: {
  variant: CaseStudySplitVariant;
  title: string;
  /** Contenido opcional bajo el título en la columna izquierda (p. ej. copy de apoyo). */
  aside?: ReactNode;
  children: ReactNode;
  layout?: CaseStudySectionLayout;
}) {
  const isSingleColumn = layout === "single";
  const sectionClass =
    variant === "footer"
      ? "border-t border-footer-text/15 bg-footer-surface"
      : variant === "surface"
        ? "border-t border-border bg-surface"
        : "border-t border-border bg-background";

  const titleClass =
    variant === "footer" ? "text-footer-text" : "text-foreground";

  if (isSingleColumn) {
    return (
      <section className={cn("w-full", sectionClass)}>
        <div className={CASE_STUDY_INNER}>
          <div className="flex w-full min-w-0 flex-col gap-10 lg:gap-12">
            <div className="min-w-0">
              <h2
                className={cn(
                  "text-left type-case-study-title font-normal",
                  titleClass
                )}
              >
                {title}
              </h2>
              {aside ? (
                <div
                  className={cn(
                    "mt-4 max-w-prose text-pretty text-body-sm leading-relaxed",
                    variant === "footer"
                      ? "text-footer-text-muted"
                      : "text-muted"
                  )}
                >
                  {aside}
                </div>
              ) : null}
            </div>
            <div className="w-full min-w-0 max-w-none">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("w-full", sectionClass)}>
      <div className={CASE_STUDY_INNER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:pr-4">
            <h2
              className={cn(
                "text-left type-case-study-title font-normal lg:sticky lg:top-28",
                titleClass
              )}
            >
              {title}
            </h2>
            {aside ? (
              <div
                className={cn(
                  "mt-4 max-w-xs text-pretty text-body-sm leading-relaxed",
                  variant === "footer" ? "text-footer-text-muted" : "text-muted"
                )}
              >
                {aside}
              </div>
            ) : null}
          </div>
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyHeroSection({
  projectTitle,
  categories,
  hero,
}: {
  projectTitle: string;
  categories: Project["categories"];
  hero: CaseStudyHero;
}) {
  const primaHeroMockup = Boolean(hero.macbookBrowserMedia && hero.heroImage?.src);

  return (
    <header className="border-b border-border bg-background px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 md:px-12 lg:px-16 lg:pb-20 lg:pt-14">
      <Link href="/#projects" className="link-view-case-study inline-flex w-fit items-center gap-2">
        <span aria-hidden="true">←</span>
        Back to projects
      </Link>

      <div
        className={cn(
          "mt-8 grid min-h-0 gap-6 lg:mt-10 lg:items-stretch lg:gap-8",
          primaHeroMockup
            ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            : "lg:grid-cols-12"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-8",
            !primaHeroMockup && "lg:col-span-6"
          )}
        >
          <ul className="flex flex-wrap items-center gap-2" aria-label="Categories">
            {categories.map((category) => (
              <li
                key={category}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-body-sm text-foreground"
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
              {projectTitle}
            </span>
            <h1 className="text-balance text-heading-1 font-normal text-foreground">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-pretty text-body-md leading-relaxed text-muted">
              {hero.subtitle}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-2">
            {hero.meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-body-xs font-semibold uppercase tracking-widest text-muted">
                  {item.label}
                </dt>
                <dd className="text-body-md text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={cn(
            "flex min-h-0 flex-col",
            !primaHeroMockup && "lg:col-span-6",
            primaHeroMockup && "flex h-full min-h-0 flex-col justify-center"
          )}
        >
          {primaHeroMockup && hero.heroImage ? (
            <MacbookBrowserMediaSlot
              media={{
                kind: "image",
                src: hero.heroImage.src,
                alt: hero.heroImage.alt,
                width: hero.heroImage.width,
                height: hero.heroImage.height,
              }}
              browserChrome
              loadPriority="high"
              viewportHeight="hero-layout"
              visibleImageHeightRatio={PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO}
              onFooterSurface
              className="w-full min-h-0 max-w-full"
            />
          ) : hero.heroImage?.src ? (
            <div className="min-h-case-study-capture overflow-hidden rounded-2xl border border-border bg-surface shadow-elevation-md ring-1 ring-border">
              <img
                src={hero.heroImage.src}
                alt={hero.heroImage.alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-auto min-h-case-study-capture w-full object-contain"
              />
            </div>
          ) : (
            <CaseStudyVisualSlot
              surface="page"
              visual={hero.heroImage}
              label="Hero: mockup de la plataforma Prima en monitor o entorno de planta (reemplazar cuando haya asset final)."
            />
          )}
        </div>
      </div>
    </header>
  );
}

function DesignSystemBlock({ block }: { block: CaseStudyDesignSystemSection }) {
  const primaryLabel =
    block.primaryPlaceholderLabel ??
    "Paleta, tipografía y componentes del sistema (placeholder).";
  const isFullWidth = Boolean(block.bentoGrid);

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        isFullWidth && "w-full min-w-0 max-w-none"
      )}
    >
      <p className="break-words text-pretty text-body-md leading-relaxed text-muted">
        {block.body}
      </p>
      <ul className="flex list-disc flex-col gap-3 pl-5 text-body-md text-muted marker:text-foreground">
        {block.bulletPoints.map((point) => (
          <li key={point} className="break-words text-pretty leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {block.bentoGrid ? (
          <PrimaDesignSystemBentoGrid grid={block.bentoGrid} />
        ) : null}
        {!block.bentoGrid && block.visual?.src ? (
          <CaseStudyVisualSlot
            surface="page"
            widthPreset="full"
            visual={block.visual}
            label={primaryLabel}
          />
        ) : null}
        {block.visualPlaceholder && !block.visual?.src ? (
          <CaseStudyVisualSlot surface="page" widthPreset="full" label={primaryLabel} />
        ) : null}
        {block.extraPlaceholderLabels?.map((label) => (
          <CaseStudyVisualSlot key={label} surface="page" widthPreset="full" label={label} />
        ))}
      </div>
    </div>
  );
}

function FeatureVisual({
  feature,
  featureIndex,
}: {
  feature: CaseStudyFeature;
  featureIndex: number;
}) {
  const label = `${feature.title} — mockup o captura de pantalla.`;

  if (feature.macbookProductPreview) {
    if (feature.visual?.src) {
      return (
        <MacbookBrowserMediaSlot
          media={{
            kind: "image",
            src: feature.visual.src,
            alt: feature.visual.alt,
            width: feature.visual.width,
            height: feature.visual.height,
          }}
          loadPriority={featureIndex === 0 ? "normal" : "lazy"}
          onFooterSurface
          visibleImageHeightRatio={PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO}
          minViewportHeightPx={PRIMA_MIN_MOCKUP_VIEWPORT_HEIGHT_PX}
          initialScrollEnd={Boolean(feature.scrollFocusEnd)}
          className="w-full min-w-0 max-w-full shrink-0"
        />
      );
    }

    if (feature.visualPlaceholder) {
      return (
        <CaseStudyVisualSlot
          surface="footer"
          widthPreset="macbook-air"
          macbookPresentation="product-preview"
          label={label}
        />
      );
    }
  }

  if (feature.visual?.src) {
    return (
      <CaseStudyVisualSlot
        surface="page"
        widthPreset="iphone14"
        visual={feature.visual}
        label={label}
      />
    );
  }

  return (
    <CaseStudyVisualSlot
      surface="page"
      widthPreset="iphone14"
      label={label}
    />
  );
}

function FeatureCopy({ feature }: { feature: CaseStudyFeature }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 break-words">
      <span className="text-body-xs font-semibold uppercase tracking-widest text-muted">
        {feature.eyebrow}
      </span>
      <h3 className="text-left type-case-study-title font-normal text-foreground">
        {feature.title}
      </h3>
      <p className="text-pretty text-body-md leading-relaxed text-muted">
        {feature.description}
      </p>
    </div>
  );
}

function FeatureRow({
  feature,
  featureIndex,
}: {
  feature: CaseStudyFeature;
  featureIndex: number;
}) {
  const isPrimaMockup = Boolean(feature.macbookProductPreview);

  if (isPrimaMockup) {
    return (
      <article className="flex w-full min-w-0 flex-col gap-6 py-12 md:gap-8">
        <FeatureCopy feature={feature} />
        <div className="w-full min-w-0 max-w-full shrink-0">
          <FeatureVisual feature={feature} featureIndex={featureIndex} />
        </div>
      </article>
    );
  }

  return (
    <article className="flex w-full min-w-0 flex-col gap-6 py-12 md:gap-8">
      <FeatureVisual feature={feature} featureIndex={featureIndex} />
      <FeatureCopy feature={feature} />
    </article>
  );
}

function FiveImagePlaceholders({
  sectionLabel,
  kind,
  borderTone = "default",
}: {
  sectionLabel: string;
  kind: "research" | "ideation" | "testing";
  borderTone?: "default" | "muted";
}) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }, (_, i) => (
        <CaseStudyVisualSlot
          key={`${kind}-${i}`}
          surface="page"
          widthPreset="full"
          label={`${sectionLabel} — ${kind} ${i + 1} de 5 (placeholder).`}
          borderTone={borderTone}
        />
      ))}
    </div>
  );
}

function ChallengeBodyText({
  text,
  highlights,
}: {
  text: string;
  highlights?: readonly string[];
}) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const paragraphClass =
    "break-words text-pretty text-body-md leading-relaxed text-muted";

  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph) => {
        const paragraphHighlights = highlights?.filter((phrase) =>
          paragraph.includes(phrase)
        );
        if (paragraphHighlights?.length) {
          return (
            <CaseStudyHighlightedParagraph
              key={paragraph.slice(0, 48)}
              text={paragraph}
              highlights={paragraphHighlights}
              className={paragraphClass}
            />
          );
        }
        return (
          <p key={paragraph.slice(0, 48)} className={paragraphClass}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

function ChallengeLabeledItems({
  items,
}: {
  items: { label: string; description: string }[];
}) {
  return (
    <ul className="flex list-disc flex-col gap-4 pl-5 text-body-md text-muted marker:text-foreground">
      {items.map((item) => (
        <li key={item.label} className="break-words text-pretty leading-relaxed">
          <span className="font-semibold text-foreground">{item.label}:</span>{" "}
          {item.description}
        </li>
      ))}
    </ul>
  );
}

function ChallengeBlock({
  challenge,
  useHighlightedText = false,
}: {
  challenge: CaseStudyChallengeSection;
  useHighlightedText?: boolean;
}) {
  const researchVisuals = challenge.research.visuals;

  const introBody = challenge.intro ? (
    <ChallengeBodyText
      text={challenge.intro}
      highlights={
        useHighlightedText ? PRIMA_CHALLENGE_INTRO_HIGHLIGHTS : undefined
      }
    />
  ) : null;

  const researchBody = (
    <ChallengeBodyText
      text={challenge.research.body}
      highlights={
        useHighlightedText ? PRIMA_CHALLENGE_RESEARCH_HIGHLIGHTS : undefined
      }
    />
  );

  return (
    <div className="flex flex-col gap-12">
      {introBody
        ? useHighlightedText
          ? (
              <CaseStudyHighlightGroup tone="on-light">
                {introBody}
              </CaseStudyHighlightGroup>
            )
          : introBody
        : null}

      <div className="flex flex-col gap-4">
        <h3 className="text-left type-case-study-title font-normal text-foreground">Research</h3>
        {useHighlightedText ? (
          <CaseStudyHighlightGroup tone="on-light">{researchBody}</CaseStudyHighlightGroup>
        ) : (
          researchBody
        )}
        {researchVisuals?.length ? (
          <div className="flex min-w-0 flex-col gap-4">
            {researchVisuals.map((item, index) => (
              <CaseStudyVisualSlot
                key={item.src}
                surface="page"
                widthPreset="full"
                visual={item}
                label={`${challenge.title} — research ${index + 1} de ${researchVisuals.length}`}
                borderTone={challenge.research.visualSlotBorder === "muted" ? "muted" : "default"}
              />
            ))}
          </div>
        ) : (
          <FiveImagePlaceholders
            sectionLabel={challenge.title}
            kind="research"
            borderTone={challenge.research.visualSlotBorder === "muted" ? "muted" : "default"}
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-left type-case-study-title font-normal text-foreground">Ideation</h3>
        {challenge.ideation.items?.length ? (
          <ChallengeLabeledItems items={challenge.ideation.items} />
        ) : (
          <ul className="flex list-disc flex-col gap-2 pl-5 text-body-md text-muted marker:text-foreground">
            {challenge.ideation.titles?.map((t) => (
              <li key={t} className="break-words text-pretty leading-relaxed">
                {t}
              </li>
            ))}
          </ul>
        )}
        {challenge.ideation.visuals?.length ? (
          <div className="flex min-w-0 flex-col gap-8">
            {challenge.ideation.macbookBrowserMedia
              ? challenge.ideation.visuals.map((item, index) => (
                  <MacbookBrowserMediaSlot
                    key={item.src}
                    media={{
                      kind: "image",
                      src: item.src,
                      alt: item.alt,
                      width: item.width,
                      height: item.height,
                    }}
                    browserChrome={false}
                    loadPriority={index < 2 ? "normal" : "lazy"}
                    visibleImageHeightRatio={PRIMA_VISIBLE_IMAGE_HEIGHT_RATIO}
                    minViewportHeightPx={PRIMA_MIN_MOCKUP_VIEWPORT_HEIGHT_PX}
                    className="w-full max-w-full"
                  />
                ))
              : challenge.ideation.visuals.map((item, index) => (
                  <CaseStudyVisualSlot
                    key={item.src}
                    surface="page"
                    widthPreset="full"
                    visual={item}
                    label={`${challenge.title} — ideation ${index + 1}`}
                  />
                ))}
          </div>
        ) : (
          <FiveImagePlaceholders sectionLabel={challenge.title} kind="ideation" />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-left type-case-study-title font-normal text-foreground">Testing</h3>
        {challenge.testing.items?.length ? (
          <ChallengeLabeledItems items={challenge.testing.items} />
        ) : challenge.testing.findings?.length ? (
          <ul className="flex list-disc flex-col gap-3 pl-5 text-body-md text-muted marker:text-foreground">
            {challenge.testing.findings.map((f) => (
              <li key={f} className="break-words text-pretty leading-relaxed">
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        {!challenge.testing.items?.length &&
        !challenge.testing.findings?.length ? (
          <FiveImagePlaceholders sectionLabel={challenge.title} kind="testing" />
        ) : null}
      </div>
    </div>
  );
}

function ProductPreviewBlock({ preview }: { preview: CaseStudyProductPreview }) {
  const slotWidth: CaseStudyVisualWidth = preview.slotWidthPreset ?? "iphone14";
  const isMacbook = slotWidth === "macbook-air";
  const macbookProductPreview = Boolean(isMacbook && preview.macbookProductPreviewMode);

  return (
    <div
      className={cn(
        "grid w-full min-w-0 max-w-full gap-8",
        isMacbook
          ? "grid-cols-1 justify-items-stretch"
          : "grid-cols-1 justify-items-stretch overflow-x-auto pb-2 [scrollbar-width:thin] xl:grid-cols-2 xl:gap-8"
      )}
    >
      {preview.slots.map((slot, index) => {
        if (isMacbook) {
          const slotEl = (
            <CaseStudyVisualSlot
              surface="footer"
              widthPreset={slotWidth}
              visual={slot.visual}
              label={slot.label}
              macbookPresentation={macbookProductPreview ? "product-preview" : "default"}
            />
          );
          if (macbookProductPreview) {
            return <div key={`${slot.label}-${index}`}>{slotEl}</div>;
          }
          return (
            <ProductPreviewMacbookScroll key={`${slot.label}-${index}`}>
              {slotEl}
            </ProductPreviewMacbookScroll>
          );
        }

        return (
          <CaseStudyVisualSlot
            key={slot.label}
            surface="footer"
            widthPreset={slotWidth}
            visual={slot.visual}
            label={slot.label}
          />
        );
      })}
    </div>
  );
}

function TakeawaysBlock({
  takeaways,
  hideSubheading = false,
  useHighlightedLabels = false,
}: {
  takeaways: CaseStudyTakeaways;
  /** Prima: el título de sección ya dice TAKEAWAYS — sin h3 duplicado. */
  hideSubheading?: boolean;
  useHighlightedLabels?: boolean;
}) {
  const hasNextSteps = Boolean(takeaways.nextStepPoints?.length);
  const listItemClass =
    "break-words pl-1 text-pretty text-body-md leading-relaxed text-muted";

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        {hideSubheading ? null : (
          <h3 className="text-left type-case-study-title font-normal text-foreground">
            TAKEAWAYS
          </h3>
        )}
        <ul className="flex list-disc flex-col gap-6 pl-5 marker:text-foreground">
          {takeaways.takeawayPoints.map((text, index) => {
            const label = useHighlightedLabels
              ? PRIMA_TAKEAWAY_LABEL_HIGHLIGHTS.find((phrase) =>
                  text.startsWith(phrase)
                )
              : undefined;

            if (label) {
              const rest = text.slice(label.length);
              return (
                <li key={index} className={listItemClass}>
                  <PrimaLineHighlightText
                    text={label}
                    phraseDelay={index * 1.15}
                  />
                  {rest}
                </li>
              );
            }

            return (
              <li key={index} className={listItemClass}>
                {text}
              </li>
            );
          })}
        </ul>
      </div>
      {hasNextSteps ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-left type-case-study-title font-normal text-foreground">
            Next steps
          </h3>
          <ul className="flex list-disc flex-col gap-4 pl-5 marker:text-foreground">
            {takeaways.nextStepPoints!.map((text, index) => (
              <li
                key={index}
                className="break-words pl-1 text-pretty text-body-sm leading-relaxed text-muted"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function StatementSection({
  title,
  block,
}: {
  title: string;
  block: CaseStudyStatementAndAcknowledgements;
}) {
  return (
    <section className="w-full border-t border-border bg-surface">
      <div className={CASE_STUDY_INNER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:pr-4">
            <h2 className="text-left type-case-study-title font-normal text-foreground lg:sticky lg:top-28">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="break-words text-pretty text-body-md leading-relaxed text-muted">
              {block.body}
            </p>
          </div>
        </div>
      </div>
      {(block.visual?.src || block.visualPlaceholder) && (
        <div className="w-full border-t border-border bg-background">
          <CaseStudyVisualSlot
            surface="page"
            widthPreset="full"
            layout="strip"
            visual={block.visual}
            label="Statement — captura a ancho completo (placeholder)."
          />
        </div>
      )}
    </section>
  );
}

export function ProjectCaseStudyLayout({ project }: { project: Project }) {
  const c = project.caseStudy;
  const isPrima = project.slug === "prima";
  const overviewParagraphs = c.overview.rightColumnText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const overviewParagraphClass =
    "break-words text-pretty text-body-md leading-relaxed text-footer-text-muted";

  return (
    <>
      <CaseStudyHeroSection
        projectTitle={project.title}
        categories={project.categories}
        hero={c.hero}
      />

      <CaseStudySplitSection variant="footer" title={c.overview.title}>
        <CaseStudyHighlightGroup
          tone="on-dark"
          className="flex flex-col gap-6"
        >
          {overviewParagraphs.map((paragraph, index) => {
            const hasOverviewHighlight =
              isPrima &&
              PRIMA_OVERVIEW_HIGHLIGHTS.some((phrase) =>
                paragraph.includes(phrase)
              );
            if (hasOverviewHighlight) {
              return (
                <CaseStudyHighlightedParagraph
                  key={index}
                  text={paragraph}
                  highlights={PRIMA_OVERVIEW_HIGHLIGHTS}
                  className={overviewParagraphClass}
                />
              );
            }
            return (
              <p key={index} className={overviewParagraphClass}>
                {paragraph}
              </p>
            );
          })}
        </CaseStudyHighlightGroup>
      </CaseStudySplitSection>

      <CaseStudySplitSection variant="footer" title={c.productPreview.title}>
        <div className="flex flex-col gap-6">
          <p className="break-words text-pretty text-body-md leading-relaxed text-footer-text-muted">
            {c.productPreview.intro}
          </p>
          <ProductPreviewBlock preview={c.productPreview} />
        </div>
      </CaseStudySplitSection>

      <CaseStudySplitSection variant="surface" title={c.challenge.title}>
        <ChallengeBlock
          challenge={c.challenge}
          useHighlightedText={isPrima}
        />
      </CaseStudySplitSection>

      <CaseStudySplitSection
        variant="default"
        title="Final UI &amp; key features"
        aside={
          <p>
            Key screens with supporting narrative, similar to a long-form product
            case study.
          </p>
        }
      >
        <div className="flex w-full min-w-0 flex-col divide-y divide-border">
          {c.features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              featureIndex={index}
            />
          ))}
        </div>
      </CaseStudySplitSection>

      <CaseStudySplitSection
        variant="surface"
        title={c.designSystem.title}
        layout={c.designSystem.bentoGrid ? "single" : "split"}
      >
        <DesignSystemBlock block={c.designSystem} />
      </CaseStudySplitSection>

      <CaseStudySplitSection
        variant="default"
        title={
          c.takeaways.nextStepPoints?.length
            ? "TAKEAWAYS AND NEXT STEPS"
            : "TAKEAWAYS"
        }
      >
        {isPrima ? (
          <CaseStudyHighlightGroup tone="on-light">
            <TakeawaysBlock
              takeaways={c.takeaways}
              hideSubheading
              useHighlightedLabels
            />
          </CaseStudyHighlightGroup>
        ) : (
          <TakeawaysBlock takeaways={c.takeaways} />
        )}
      </CaseStudySplitSection>

      {c.productVideo ? (
        <CaseStudyProductVideoSection video={c.productVideo} />
      ) : null}
      {c.statementAndAcknowledgements ? (
        <StatementSection
          title="STATEMENT AND ACKNOWLEDGEMENTS"
          block={c.statementAndAcknowledgements}
        />
      ) : null}
    </>
  );
}
