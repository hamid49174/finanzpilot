"use client";

type BarChartProps = {
  labels: string[];
  series: { name: string; color: string; data: number[] }[];
  height?: number;
  showGrid?: boolean;
  className?: string;
};

export function BarChart({ labels, series, height = 240, showGrid = true, className }: BarChartProps) {
  const w = 600;
  const h = height;
  const padding = { top: 10, right: 12, bottom: 28, left: 36 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  const allValues = series.flatMap((s) => s.data);
  const max = Math.max(...allValues, 1);
  const groupCount = labels.length;
  const groupWidth = chartW / groupCount;
  const barCount = series.length;
  const innerPad = 8;
  const barWidth = (groupWidth - innerPad * 2) / barCount;
  const radius = Math.min(barWidth / 2, 6);

  const yTicks = 4;
  const yLines = Array.from({ length: yTicks + 1 }, (_, i) => i);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} width="100%" height={height}>
      {showGrid &&
        yLines.map((i) => {
          const y = padding.top + (i / yTicks) * chartH;
          return (
            <line
              key={i}
              x1={padding.left}
              x2={w - padding.right}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
          );
        })}
      {yLines.map((i) => {
        const v = max - (i / yTicks) * max;
        const y = padding.top + (i / yTicks) * chartH;
        return (
          <text key={`yt-${i}`} x={padding.left - 8} y={y + 4} fontSize={10} textAnchor="end" fill="#9ca3af">
            {Math.round(v)}
          </text>
        );
      })}

      {labels.map((label, gi) => {
        const gx = padding.left + gi * groupWidth + innerPad;
        return (
          <g key={`g-${gi}`}>
            {series.map((s, si) => {
              const v = s.data[gi];
              const barH = (v / max) * chartH;
              const x = gx + si * barWidth;
              const y = padding.top + chartH - barH;
              return (
                <rect
                  key={`b-${gi}-${si}`}
                  x={x}
                  y={y}
                  width={barWidth - 4}
                  height={Math.max(barH, 1)}
                  rx={radius}
                  ry={radius}
                  fill={s.color}
                />
              );
            })}
            <text
              x={padding.left + gi * groupWidth + groupWidth / 2}
              y={h - 8}
              fontSize={11}
              textAnchor="middle"
              fill="#6b7280"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
