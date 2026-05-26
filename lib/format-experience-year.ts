const MONTH_YEAR = /^([A-Za-z]{3}) (\d{4})$/;

/** "Jun 2022 – Jul 2023" → "Jun/22 – Jul/23"; "Present" sin cambio. */
export function formatExperienceYear(value: string): string {
  if (value.trim().toLowerCase() === "present") {
    return "Present";
  }

  const segments = value.split(" – ");
  if (segments.length === 1) {
    return formatMonthYearSegment(segments[0]);
  }

  return segments.map(formatMonthYearSegment).join(" – ");
}

function formatMonthYearSegment(segment: string): string {
  const trimmed = segment.trim();
  const match = trimmed.match(MONTH_YEAR);
  if (!match) {
    return trimmed;
  }

  const [, month, year] = match;
  return `${month}/${year.slice(-2)}`;
}
