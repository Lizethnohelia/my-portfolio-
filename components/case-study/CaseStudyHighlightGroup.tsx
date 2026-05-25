"use client";

import { useInView, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

/** `on-dark`: footer / Product Overview. `on-light`: fondo blanco o gris claro. */
export type CaseStudyHighlightTone = "on-dark" | "on-light";

type HighlightGroupContextValue = {
  active: boolean;
  tone: CaseStudyHighlightTone;
};

const CaseStudyHighlightGroupContext =
  createContext<HighlightGroupContextValue | null>(null);

export function useCaseStudyHighlightGroup(): HighlightGroupContextValue | null {
  return useContext(CaseStudyHighlightGroupContext);
}

/** Dispara el wipe de highlight cuando el bloque entra en foco (viewport). */
export function CaseStudyHighlightGroup({
  tone,
  children,
  className,
}: {
  tone: CaseStudyHighlightTone;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.22,
    margin: "0px 0px -10% 0px",
  });
  const active = shouldReduceMotion ? true : isInView;
  const value = useMemo(() => ({ active, tone }), [active, tone]);

  return (
    <CaseStudyHighlightGroupContext.Provider value={value}>
      <div
        ref={ref}
        data-highlight-tone={tone}
        data-highlight-active={active ? "true" : "false"}
        className={className}
      >
        {children}
      </div>
    </CaseStudyHighlightGroupContext.Provider>
  );
}
