"use client";

import { useId } from "react";

type SparkProps = {
  data: number[];
  stroke?: string;
  fill?: string;
  height?: number;
  className?: string;
};

export function SparkLine({ data, stroke = "#6366f1", fill = "#6366f1", height = 80, className }: SparkProps) {
  const id = useId();
  if (data.length === 0) return null;

  const w = 300;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return [x, y] as const;
  });

  const path = points
    .map((p, i) => {
      if (i === 0) return `M ${p[0]},${p[1]}`;
      const prev = points[i - 1];
      const cx = (prev[0] + p[0]) / 2;
      return `Q ${cx},${prev[1]} ${cx},${(prev[1] + p[1]) / 2} T ${p[0]},${p[1]}`;
    })
    .join(" ");

  const area = `${path} L ${w},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} width="100%" height={height}>
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.45} />
          <stop offset="100%" stopColor={fill} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${id})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
