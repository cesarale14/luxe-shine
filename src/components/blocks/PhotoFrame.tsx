import Image from "next/image";

/**
 * A real photo in the same framed slot a PhotoPlaceholder occupies (rounded-card,
 * fixed aspect ratio, cover-cropped). Drop-in replacement for PhotoPlaceholder once
 * real, consistently-graded photography exists.
 */
export function PhotoFrame({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  sizes = "(min-width: 1024px) 45vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-sand ${className}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
