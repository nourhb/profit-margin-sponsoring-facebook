"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactElement;
  id: string;
  tooltip?: string;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, label, icon, id, tooltip, ...props }, ref) => {
    const labelContent = (
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {tooltip && <Info className="h-3.5 w-3.5 text-muted-foreground" />}
      </div>
    );

    const labelElement = (
      <Label htmlFor={id} className="font-medium text-card-foreground/80">
        {labelContent}
      </Label>
    );

    return (
      <div className="grid w-full items-center gap-1.5">
        {tooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help w-fit">{labelElement}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          labelElement
        )}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {React.cloneElement(icon, { className: "h-5 w-5" })}
          </div>
          <Input
            id={id}
            ref={ref}
            className={cn("pl-10", className)}
            {...props}
          />
        </div>
      </div>
    );
  }
);
IconInput.displayName = "IconInput";

export { IconInput };
