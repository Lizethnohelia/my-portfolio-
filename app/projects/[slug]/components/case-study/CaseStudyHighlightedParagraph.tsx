"use client";

import { PrimaLineHighlightText } from "@/components/case-study/PrimaLineHighlightText";
import { splitTextByPhrases } from "@/lib/split-text-by-phrases";
import { cn } from "@/lib/utils";

/** Retraso entre frases resaltadas distintas en el mismo párrafo. */
const PHRASE_STAGGER_S = 1.15;

export function CaseStudyHighlightedParagraph({
  text,
  highlights,
  className,
}: {
  text: string;
  highlights: readonly string[];
  className?: string;
}) {
  const segments = splitTextByPhrases(text, highlights);
  let highlightPhraseIndex = 0;

  return (
    <p className={cn("break-words text-pretty", className)}>
      {segments.map((segment, index) =>
        segment.highlight ? (
          <PrimaLineHighlightText
            key={`${index}-${segment.text.slice(0, 24)}`}
            text={segment.text}
            phraseDelay={highlightPhraseIndex++ * PHRASE_STAGGER_S}
          />
        ) : (
          <span key={`${index}-${segment.text.slice(0, 24)}`}>{segment.text}</span>
        )
      )}
    </p>
  );
}
