/** Divide `text` en líneas visuales según el ancho de `container` (misma tipografía). */
export function splitTextIntoLines(
  text: string,
  container: HTMLElement
): string[] {
  const width = container.clientWidth;
  if (width <= 0 || !text.trim()) {
    return [text];
  }

  const style = getComputedStyle(container);
  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  Object.assign(probe.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    left: "-9999px",
    top: "0",
    width: `${width}px`,
    font: style.font,
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    wordSpacing: style.wordSpacing,
    whiteSpace: "normal",
    wordWrap: "break-word",
  });

  document.body.appendChild(probe);

  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let lineWords: string[] = [];

  const lineWidth = (line: string) => {
    probe.textContent = line;
    return probe.scrollWidth;
  };

  for (const word of words) {
    const trial = lineWords.length ? `${lineWords.join(" ")} ${word}` : word;
    if (lineWords.length > 0 && lineWidth(trial) > width) {
      lines.push(lineWords.join(" "));
      lineWords = [word];
    } else {
      lineWords.push(word);
    }
  }

  if (lineWords.length > 0) {
    lines.push(lineWords.join(" "));
  }

  document.body.removeChild(probe);

  return lines.length > 0 ? lines : [text];
}
