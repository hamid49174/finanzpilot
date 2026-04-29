"use client";

type Slice = { label: string; value: number; color: string };

export function DonutChart({
  data,
  size = 220,
  thickness = 28,
  className,
  centerLabel,
  centerValue,
}: {
  data: Slice[];
  size?: number;
  thickness?: number;
  className?: string;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const segments = data.reduce<
    Array<Slice & { dash: number; offset: number; cumulative: number }>
  >((acc, item) => {
    const previous = acc.at(-1);
    const accumulated = previous?.cumulative ?? 0;
    const fraction = item.value / total;

    return [
      ...acc,
      {
        ...item,
        dash: fraction * circumference,
        offset: -accumulated * circumference,
        cumulative: accumulated + fraction,
      },
    ];
  }, []);

  return (
    <div className={className} style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f1f4"
          strokeWidth={thickness}
        />
        {segments.map((d, i) => {
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${d.dash} ${circumference}`}
              strokeDashoffset={d.offset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerValue && <div className="text-2xl font-bold text-zinc-900">{centerValue}</div>}
          {centerLabel && <div className="text-xs text-zinc-500 mt-0.5">{centerLabel}</div>}
        </div>
      )}
    </div>
  );
}
