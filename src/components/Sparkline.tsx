/** Tiny inline-SVG sparkline. Values are plotted against a shared domain so
 *  multiple sparklines in a list stay comparable. */
export function Sparkline({
  values,
  max,
  width = 160,
  height = 32,
  className = "",
}: {
  values: number[];
  max: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (values.length < 2) return null;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const stepX = w / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + h - (max > 0 ? (v / max) * h : 0);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const last = values[values.length - 1];
  const lastPt = pts[pts.length - 1].split(",");
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="2" fill="currentColor" />
      <title>{`${last}`}</title>
    </svg>
  );
}
