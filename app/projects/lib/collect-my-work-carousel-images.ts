import type { Project, WorkBlock } from "../data";

export interface CarouselSlide {
  src: string;
  alt: string;
}

function pushBlockImages(block: WorkBlock, out: CarouselSlide[]) {
  if (block.layout === "mosaic" && block.tiles?.length) {
    for (const tile of block.tiles) {
      out.push({ src: tile.src, alt: tile.alt });
    }
    return;
  }

  if (!block.media) return;

  if (block.media.type === "image") {
    out.push({ src: block.media.src, alt: block.media.alt });
    return;
  }

  if (block.media.type === "video" && block.media.poster?.trim()) {
    out.push({ src: block.media.poster, alt: block.media.alt });
  }
}

/** Imágenes de todos los bloques de My Work para el carrusel horizontal. */
export function collectMyWorkCarouselImages(
  myWork: Project["myWork"]
): CarouselSlide[] {
  const slides: CarouselSlide[] = [];
  for (const block of myWork.blocks) {
    pushBlockImages(block, slides);
  }
  return slides;
}
