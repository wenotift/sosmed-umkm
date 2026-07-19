"use client";

import type { ReactNode } from "react";
import { Icon } from "./icons";
import { deltaLabel } from "../lib/format";

export function KpiCard({
  icon,
  label,
  value,
  delta,
  compareLabel = "vs periode lalu",
  foot,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
  compareLabel?: string;
  foot?: ReactNode;
}) {
  const dir =
    delta === undefined ? "flat" : delta > 0 ? "up" : delta < 0 ? "down" : "flat";
  return (
    <div className="dash-kpi">
      <div className="dash-kpi-top">
        <span className="dash-kpi-ic">
          <Icon paths={icon} size={17} />
        </span>
        {label}
      </div>
      <div className="dash-kpi-val">{value}</div>
      <div className="dash-kpi-foot">
        {delta !== undefined && (
          <span className={"dash-delta " + dir}>{deltaLabel(delta)}</span>
        )}
        {delta !== undefined && <span className="muted">{compareLabel}</span>}
        {foot}
      </div>
    </div>
  );
}
