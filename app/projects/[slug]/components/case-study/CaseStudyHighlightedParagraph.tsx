"use client";

import { HighlightedText } from "@/components/ui/HighlightedText";
import { splitTextByPhrases } from "@/lib/split-text-by-phrases";
import { cn } from "@/lib/utils";

const HIGHLIGHT_STAGGER_S = 0.2;

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
  let highlightIndex = 0;

  return (
    <p className={cn("break-words text-pretty", className)}>
      {segments.map((segment, index) =>
        segment.highlight ? (
          <HighlightedText
            key={`${index}-${segment.text.slice(0, 24)}`}
            delay={highlightIndex++ * HIGHLIGHT_STAGGER_S}
          >
            {segment.text}
          </HighlightedText>
        ) : (
          <span key={`${index}-${segment.text.slice(0, 24)}`}>{segment.text}</span>
        )
      )}
    </p>
  );
}
