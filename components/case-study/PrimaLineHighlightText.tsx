"use client";

import { splitTextIntoLines } from "@/lib/split-text-into-lines";
import { useLayoutEffect, useRef, useState } from "react";

/** Debe coincidir con --duration-highlight-wipe en globals.css */
const HIGHLIGHT_WIPE_DURATION_S = 1.15;

interface PrimaLineHighlightTextProps {
  text: string;
  /** Retraso base antes de animar la primera línea (p. ej. frases previas). */
  phraseDelay?: number;
}

export function PrimaLineHighlightText({
  text,
  phraseDelay = 0,
}: PrimaLineHighlightTextProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([text]);

  useLayoutEffect(() => {
    const paragraph = anchorRef.current?.closest("p");
    if (!paragraph) {
      setLines([text]);
      return;
    }

    const remeasure = () => {
      setLines(splitTextIntoLines(text, paragraph));
    };

    remeasure();
    const observer = new ResizeObserver(remeasure);
    observer.observe(paragraph);
    window.addEventListener("resize", remeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [text]);

  return (
    <span ref={anchorRef} className="highlight-lines inline">
      {lines.map((line, lineIndex) => {
        const lineStartDelay =
          phraseDelay + lineIndex * HIGHLIGHT_WIPE_DURATION_S;

        return (
          <span
            key={`${lineIndex}-${line.slice(0, 20)}`}
            className="highlight-line block"
          >
            <span
              className="highlight-wipe"
              style={{
                ["--highlight-wipe-delay" as string]: `${lineStartDelay}s`,
              }}
            >
              {line}
            </span>
          </span>
        );
      })}
    </span>
  );
}
