"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";

/**
 * Contenedor de scroll horizontal por frame MacBook (solo Prima / preset macbook-air).
 * Scroll inicial a la izquierda; arrastrar desplaza el contenido; tooltip nativo `title="drag"`.
 */
export function ProductPreviewMacbookScroll({ children }: { children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = 0;
  }, []);

  const drag = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startScroll: number;
  }>({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
  });

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || e.pointerId !== drag.current.pointerId) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScroll - dx;
  }, []);

  const endDrag = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || e.pointerId !== drag.current.pointerId) return;
    const el = scrollerRef.current;
    drag.current.active = false;
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* ya liberado */
    }
  }, []);

  const onLostPointerCapture = useCallback(() => {
    drag.current.active = false;
  }, []);

  return (
    <div className="w-full min-w-0 max-w-full">
      <div
        ref={scrollerRef}
        title="drag"
        role="region"
        aria-label="Vista previa: arrastra horizontalmente para desplazar"
        tabIndex={0}
        className="w-full max-w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:thin] cursor-grab select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={onLostPointerCapture}
      >
        <div className="inline-block w-max">{children}</div>
      </div>
    </div>
  );
}
