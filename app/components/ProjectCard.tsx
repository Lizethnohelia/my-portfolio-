"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "../projects/data";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  className?: string;
  linkText?: string;
}

export function ProjectCard({
  project,
  className,
  linkText = "View project",
}: ProjectCardProps) {
  const description = project.cardHoverText ?? project.description;
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-elevation-md transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-elevation-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <Link
        href={href}
        aria-label={`Ver el caso de estudio: ${project.title}`}
        className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      />

      <div className="relative aspect-video overflow-hidden bg-surface">
        <Image
          src={project.cardImage}
          alt={project.title}
          fill
          sizes={
            project.cardImageSizes ??
            "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          quality={project.cardImageZoom ? 100 : 75}
          priority={project.cardImageZoom}
          className={cn(
            "origin-top object-cover object-top transition-transform duration-700 ease-in-out motion-reduce:transition-none",
            project.cardImageZoom
              ? "inset-prima-card-image-zoom group-hover:scale-105"
              : "group-hover:scale-110"
          )}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit text-body-xs font-medium uppercase tracking-wider text-muted">
          {project.cardCategory}
        </span>
        <h3 className="mt-2 text-heading-5 font-semibold transition-colors duration-300 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-body-sm text-muted">
          {description}
        </p>

        <span
          aria-hidden
          className="group/button mt-4 inline-flex w-fit items-center gap-2 text-body-sm font-medium text-primary transition-all duration-300 group-hover:underline"
        >
          {linkText}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0" />
        </span>
      </div>
    </article>
  );
}
