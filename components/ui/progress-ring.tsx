"use client";

export function ProgressRing({
  value,
  size = 64,
  thickness = 6,
  color = "#6366f1",
  trackColor = "#eef0f3",
  label,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.min(Math.max(value, 0), 100) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={thickness} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color }}>
        {label ?? `${Math.round(value)}%`}
      </span>
    </div>
  );
}
