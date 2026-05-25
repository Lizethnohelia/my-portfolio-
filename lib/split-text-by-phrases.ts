function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export type TextSegment = { text: string; highlight: boolean };

/** Divide `text` preservando frases exactas de `phrases` (más largas primero). */
export function splitTextByPhrases(
  text: string,
  phrases: readonly string[]
): TextSegment[] {
  const active = phrases.filter((p) => p.length > 0 && text.includes(p));
  if (active.length === 0) {
    return [{ text, highlight: false }];
  }

  const sorted = [...active].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${sorted.map(escapeRegExp).join("|")})`,
    "g"
  );
  const parts = text.split(pattern).filter((part) => part.length > 0);
  const highlightSet = new Set(sorted);

  return parts.map((part) => ({
    text: part,
    highlight: highlightSet.has(part),
  }));
}
