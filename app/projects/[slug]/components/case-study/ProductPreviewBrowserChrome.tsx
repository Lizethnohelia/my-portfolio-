import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Marco tipo ventana de navegador (barra + semáforos) alrededor del viewport del product preview. */
export function ProductPreviewBrowserChrome({
  children,
  addressLabel = "app.prima.io",
  className,
  onFooterSurface = false,
}: {
  children: ReactNode;
  /** Texto de la barra de direcciones (accesible, truncado). */
  addressLabel?: string;
  className?: string;
  /** Mismo aspecto que Product preview sobre franja oscura (hero Prima). */
  onFooterSurface?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Vista previa en marco de navegador"
      className={cn(
        "flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl",
        "border border-footer-text/25 shadow-elevation-sm ring-1 ring-footer-text/10",
        onFooterSurface ? "bg-footer-surface" : "bg-footer-text/5",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-footer-text/15 px-3 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              onFooterSurface ? "bg-footer-text-muted/50" : "bg-border"
            )}
          />
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              onFooterSurface ? "bg-footer-text-muted/50" : "bg-border"
            )}
          />
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              onFooterSurface ? "bg-footer-text-muted/50" : "bg-border"
            )}
          />
        </span>
        <div
          className={cn(
            "min-w-0 flex-1 rounded-md border px-3 py-1",
            onFooterSurface
              ? "border-footer-text/20 bg-footer-text/10"
              : "border-footer-text/20 bg-background/70"
          )}
        >
          <p
            className={cn(
              "truncate text-body-xs",
              onFooterSurface ? "text-footer-text-muted" : "text-muted"
            )}
          >
            {addressLabel}
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
