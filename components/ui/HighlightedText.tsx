"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HighlightedText({
  children,
  className,
  delay = 0,
}: HighlightedTextProps) {
  return (
    <span
      className={cn("highlight-wipe", className)}
      style={{
        ["--highlight-wipe-delay" as string]: `${delay}s`,
      }}
    >
      {children}
    </span>
  );
}

export default HighlightedText;
