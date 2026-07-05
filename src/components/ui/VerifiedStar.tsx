/**
 * The "verified" motif — the four-point star from the logo roofline, redrawn as a
 * 1.5px line glyph (design §0.4, §8). This is the site's only inherited brand mark.
 * Used beside photo-report and guarantee moments. Palm stroke signals verified/guaranteed.
 */
export function VerifiedStar({
  className = "",
  size = 20,
  tone = "palm",
}: {
  className?: string;
  size?: number;
  tone?: "palm" | "navy";
}) {
  const stroke = tone === "palm" ? "var(--palm)" : "var(--navy-700)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.5c.6 4.7 4.2 8.3 8.9 8.9v1.2c-4.7.6-8.3 4.2-8.9 8.9h-1.2c-.6-4.7-4.2-8.3-8.9-8.9v-1.2c4.7-.6 8.3-4.2 8.9-8.9Z" />
    </svg>
  );
}
