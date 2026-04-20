"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export type FooterLinkIcon = ComponentType<{ className?: string }>;

interface FooterMotionLinkProps {
  href: string;
  label: string;
  icon?: FooterLinkIcon;
  external?: boolean;
  className?: string;
}

export function FooterMotionLink({
  href,
  label,
  icon: Icon,
  external,
  className,
}: FooterMotionLinkProps) {
  const sharedClassName = cn(
    "group relative inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full px-5 py-3 sm:h-14 sm:w-fit sm:justify-start sm:py-0",
    "border-0 border-transparent bg-background shadow-none outline-none ring-0",
    "text-foreground transition-colors duration-300 ease-out",
    "hover:border-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-none hover:ring-0 hover:outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  );

  const content = (
    <>
      {Icon ? (
        <span className="flex shrink-0 items-center justify-center">
          <Icon
            className="size-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
            aria-hidden="true"
          />
        </span>
      ) : null}
      <span className="text-center text-body-md font-medium text-pretty text-inherit transition-colors duration-300 sm:text-left">
        {label}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={sharedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={sharedClassName}>
      {content}
    </a>
  );
}
