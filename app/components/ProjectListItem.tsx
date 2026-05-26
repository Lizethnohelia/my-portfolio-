"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "../projects/data";
import { cn } from "@/lib/utils";

export function ProjectListItem({
  project,
  index = 0,
  totalCount = 1,
  className,
}: {
  project: Project;
  index?: number;
  totalCount?: number;
  className?: string;
}) {
  const href = `/projects/${project.slug}`;
  const imagePriority = index === 0;

  return (
    <article
      className={cn(
        "group relative",
        totalCount <= 1 ? "pb-10 sm:pb-12" : "pb-10 sm:pb-11",
        className
      )}
    >
      <Link
        href={href}
        aria-label={`View case study: ${project.headline}`}
        className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      />

      <div className="relative z-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-3 lg:col-span-5 lg:py-2">
          <h3 className="text-pretty text-heading-4 font-normal text-foreground transition-colors duration-500 ease-out group-hover:text-primary motion-reduce:transition-none">
            {project.headline}
          </h3>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-muted">
            <span className="font-medium text-foreground">{project.title}</span>
            <span aria-hidden className="text-muted">
              ·
            </span>
            <span>{project.cardCategory}</span>
          </p>

          <span className="link-view-case-study w-fit group-hover:text-primary group-hover:underline motion-reduce:transition-none">
            View case study
          </span>
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-background",
            "aspect-[5/3] w-full lg:col-span-7"
          )}
        >
          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            quality={project.cardImageZoom ? 100 : 75}
            priority={imagePriority || project.cardImageZoom}
            className={cn(
              "origin-center object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              project.cardImageZoom && "inset-prima-card-image-zoom"
            )}
          />
        </div>
      </div>
    </article>
  );
}
