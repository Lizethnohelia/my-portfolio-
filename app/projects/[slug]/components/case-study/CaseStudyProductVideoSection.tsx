"use client";

import { useEffect, useRef } from "react";
import type { CaseStudyProductVideo } from "../../../data";

/** Prima: video de cierre sin título; autoplay al entrar en viewport (muted + playsInline). */
export function CaseStudyProductVideoSection({
  video,
}: {
  video: CaseStudyProductVideo;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const el = videoRef.current;
    if (!section || !el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-t border-border bg-cinema py-case-study-product-video"
      aria-label={video.alt}
    >
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          controls
          muted
          playsInline
          preload="metadata"
          {...(video.poster ? { poster: video.poster } : {})}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
