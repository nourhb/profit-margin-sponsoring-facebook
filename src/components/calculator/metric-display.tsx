"use client";

import { cn } from "@/lib/utils";

type MetricDisplayProps = {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
  note?: string;
};

export function MetricDisplay({ label, value, className, valueClassName, note }: MetricDisplayProps) {
  return (
    <div className={cn("flex justify-between items-center py-2.5 px-3 rounded-lg transition-colors", className)}>
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{label}</p>
        {note && <p className="text-xs text-muted-foreground/70">{note}</p>}
      </div>
      <p className={cn("text-lg font-semibold font-mono text-primary", valueClassName)}>
        {value}
      </p>
    </div>
  );
}
