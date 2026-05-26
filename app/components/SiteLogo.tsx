import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/logo.png";
const LOGO_WIDTH = 344;
const LOGO_HEIGHT = 192;

type SiteLogoSize = "nav" | "footer";

const SIZE_CLASS: Record<SiteLogoSize, string> = {
  nav: "h-9 w-auto",
  footer: "h-10 w-auto",
};

export function SiteLogo({
  size = "nav",
  priority = false,
  className,
  ringOffset = "surface",
}: {
  size?: SiteLogoSize;
  priority?: boolean;
  className?: string;
  ringOffset?: "surface" | "footer";
}) {
  return (
    <Link
      href="/"
      aria-label="Inicio"
      className={cn(
        "inline-flex shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        ringOffset === "footer"
          ? "focus-visible:ring-offset-footer-surface"
          : "focus-visible:ring-offset-surface",
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt="Lizeth Avendaño"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className={cn("object-contain object-left", SIZE_CLASS[size])}
      />
    </Link>
  );
}
