"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";


type MetricDisplayProps = {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
  note?: string;
  tooltip?: string;
};

export function MetricDisplay({ label, value, className, valueClassName, note, tooltip }: MetricDisplayProps) {
    const labelContent = (
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {tooltip && <Info className="h-3.5 w-3.5 text-muted-foreground" />}
      </div>
    );

  return (
    <div className={cn("flex justify-between items-center py-2.5 px-3 rounded-lg transition-colors", className)}>
      <div className="flex flex-col">
        {tooltip ? (
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground cursor-help w-fit">{labelContent}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p className="text-sm text-muted-foreground">{label}</p>
        )}
        {note && <p className="text-xs text-muted-foreground/70">{note}</p>}
      </div>
      <p className={cn("text-lg font-semibold font-mono text-primary", valueClassName)}>
        {value}
      </p>
    </div>
  );
}
