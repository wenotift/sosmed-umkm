"use client";

// Lightweight, dependency-free SVG charts. All shapes are computed from the
// passed data so they redraw whenever the underlying store changes.

import { useId, useState } from "react";
import { rupiah, rupiahShort } from "../lib/format";

export interface SeriesPoint {
  label: string;
  value: number;
  sub?: string; // secondary tooltip line, e.g. order count
}

// Area + line chart with hover readout.
export function AreaChart({
  data,
  height = 190,
  valueFormat = rupiah,
}: {
  data: SeriesPoint[];
  height?: number;
  valueFormat?: (n: number) => string;
}) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const W = 720;
  const H = height;
  const padX = 8;
  const padTop = 16;
  const padBottom = 26;
  const max = Math.max(1, ...data.map((d) => d.value));
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const n = data.length;
  const x = (i: number) => padX + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padTop + innerH - (v / max) * innerH;

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(n - 1)},${padTop + innerH} L${x(0)},${padTop + innerH} Z`;

  // sparse labels to avoid crowding
  const labelEvery = n > 14 ? Math.ceil(n / 8) : 1;

  return (
    <div className="dash-chart-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="dash-areachart"
        preserveAspectRatio="none"
        role="img"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={"af" + gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A050F8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A050F8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padTop + innerH * g}
            y2={padTop + innerH * g}
            className="dash-grid-line"
          />
        ))}
        <path d={area} fill={`url(#af${gid})`} />
        <path d={line} className="dash-area-stroke" fill="none" />
        {data.map((d, i) => (
          <g key={i}>
            {hover === i && (
              <line x1={x(i)} x2={x(i)} y1={padTop} y2={padTop + innerH} className="dash-hover-line" />
            )}
            <circle
              cx={x(i)}
              cy={y(d.value)}
              r={hover === i ? 4 : 0}
              className="dash-area-dot"
            />
            {/* invisible hit area */}
            <rect
              x={x(i) - innerW / n / 2}
              y={0}
              width={innerW / n}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
            {i % labelEvery === 0 && (
              <text x={x(i)} y={H - 8} className="dash-axis-label" textAnchor="middle">
                {d.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      {hover !== null && (
        <div
          className="dash-chart-tip"
          style={{ left: `${(x(hover) / W) * 100}%` }}
        >
          <b>{valueFormat(data[hover].value)}</b>
          <span>
            {data[hover].label}
            {data[hover].sub ? ` · ${data[hover].sub}` : ""}
          </span>
        </div>
      )}
    </div>
  );
}

// Horizontal ranked bars (top menu / top customers).
export function RankBars({
  rows,
}: {
  rows: { label: string; sub: string; value: number; max: number }[];
}) {
  return (
    <div className="dash-rankbars">
      {rows.map((r, i) => (
        <div className="dash-rankrow" key={i}>
          <span className="dash-rank-no">{i + 1}</span>
          <div className="dash-rank-mid">
            <div className="dash-rank-top">
              <span className="dash-rank-name">{r.label}</span>
              <span className="dash-rank-sub">{r.sub}</span>
            </div>
            <div className="dash-rank-bar">
              <i style={{ width: `${Math.max(4, (r.value / r.max) * 100)}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Vertical bar chart (hourly histogram).
export function ColumnChart({
  data,
  height = 150,
}: {
  data: SeriesPoint[];
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="dash-colchart" style={{ height }}>
      {data.map((d, i) => (
        <div
          className="dash-col"
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <div className="dash-col-track">
            <div
              className={"dash-col-fill" + (hover === i ? " on" : "")}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            {hover === i && (
              <div className="dash-col-tip">
                {d.value} · {d.label}
              </div>
            )}
          </div>
          <span className="dash-col-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// Donut for channel share.
export function Donut({
  segments,
  centerLabel,
  centerSub,
}: {
  segments: { label: string; value: number; color: string }[];
  centerLabel: string;
  centerSub: string;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  // Precompute each arc's length + cumulative offset (pure prefix sum, no mutation).
  const dashes = segments.map((s) => (s.value / total) * c);
  const arcs = segments.map((s, i) => ({
    color: s.color,
    dash: dashes[i],
    offset: dashes.slice(0, i).reduce((a, b) => a + b, 0),
  }));
  return (
    <div className="dash-donut-wrap">
      <svg viewBox="0 0 140 140" className="dash-donut">
        <circle cx="70" cy="70" r={r} className="dash-donut-track" />
        {arcs.map((a, i) => (
          <circle
            key={i}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth="16"
            strokeDasharray={`${a.dash} ${c - a.dash}`}
            strokeDashoffset={-a.offset}
            transform="rotate(-90 70 70)"
            strokeLinecap="butt"
          />
        ))}
        <text x="70" y="66" className="dash-donut-center">
          {centerLabel}
        </text>
        <text x="70" y="84" className="dash-donut-sub">
          {centerSub}
        </text>
      </svg>
      <div className="dash-donut-legend">
        {segments.map((s, i) => (
          <div className="dash-legend-row" key={i}>
            <span className="dash-legend-dot" style={{ background: s.color }} />
            <span className="dash-legend-label">{s.label}</span>
            <span className="dash-legend-val">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { rupiahShort };
