"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Misma curva que el componente Framer «Animating Lines». */
const LINE_EASE = [0.44, 0, 0.56, 1] as const;

const HORIZONTAL_DURATION_S = 3;
const VERTICAL_DURATION_S = 5;

type AnimatedHorizontalLineProps = {
  direction: "ltr" | "rtl";
  className?: string;
  delay?: number;
};

function AnimatedHorizontalLine({
  direction,
  className,
  delay = 0,
}: AnimatedHorizontalLineProps) {
  const shouldReduce = useReducedMotion();
  const isRtl = direction === "rtl";

  return (
    <div
      className={cn("hero-line-track hero-line-track-horizontal w-full", className)}
    >
      <motion.div
        className={cn(
          "flex h-full overflow-hidden",
          isRtl ? "ml-auto justify-end" : "justify-start"
        )}
        initial={{ width: shouldReduce ? "100%" : "0%" }}
        animate={
          shouldReduce
            ? { width: "100%" }
            : { width: ["0%", "150%", "0%"] }
        }
        transition={{
          duration: shouldReduce ? 0.01 : HORIZONTAL_DURATION_S,
          ease: LINE_EASE,
          times: [0, 0.78, 1],
          repeat: shouldReduce ? 0 : Infinity,
          repeatDelay: delay,
        }}
      >
        <span className="hero-line-accent block h-full min-w-12 w-1/5 shrink-0" />
      </motion.div>
    </div>
  );
}

type AnimatedVerticalLineProps = {
  direction: "down" | "up";
  className?: string;
  delay?: number;
};

function AnimatedVerticalLine({
  direction,
  className,
  delay = 0,
}: AnimatedVerticalLineProps) {
  const shouldReduce = useReducedMotion();
  const growsDown = direction === "down";

  return (
    <div
      className={cn("hero-line-track hero-line-track-vertical h-full", className)}
    >
      <motion.div
        className={cn(
          "flex w-full flex-col overflow-hidden",
          growsDown ? "justify-end" : "justify-start"
        )}
        initial={{ height: shouldReduce ? "100%" : "0%" }}
        animate={
          shouldReduce
            ? { height: "100%" }
            : { height: ["0%", "130%", "0%"] }
        }
        transition={{
          duration: shouldReduce ? 0.01 : VERTICAL_DURATION_S,
          ease: LINE_EASE,
          times: [0, 0.78, 1],
          repeat: shouldReduce ? 0 : Infinity,
          repeatDelay: delay,
        }}
      >
        <span className="hero-line-accent block min-h-12 h-1/5 w-full shrink-0" />
      </motion.div>
    </div>
  );
}

/**
 * Marco de líneas animadas (referencia: Framer «Animating Lines Component»).
 * Cuatro bordes con segmento en primary que recorre cada arista en bucle.
 */
export function HeroAnimatingLines({ className }: { className?: string }) {
  return (
    <div
      className={cn("hero-animating-lines", className)}
      aria-hidden
    >
      <div className="hero-animating-lines-edge hero-animating-lines-edge-top">
        <AnimatedHorizontalLine
          direction="ltr"
          className="hero-animating-lines-bar-top"
          delay={0.2}
        />
      </div>

      <div className="hero-animating-lines-edge hero-animating-lines-edge-bottom">
        <AnimatedHorizontalLine
          direction="rtl"
          className="hero-animating-lines-bar-bottom"
          delay={0.6}
        />
      </div>

      <div className="hero-animating-lines-edge hero-animating-lines-edge-left">
        <AnimatedVerticalLine
          direction="down"
          className="hero-animating-lines-bar-left"
          delay={0.4}
        />
      </div>

      <div className="hero-animating-lines-edge hero-animating-lines-edge-right">
        <AnimatedVerticalLine
          direction="up"
          className="hero-animating-lines-bar-right"
          delay={0.8}
        />
      </div>
    </div>
  );
}
