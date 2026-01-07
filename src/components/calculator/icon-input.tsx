"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactElement;
  id: string;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, label, icon, id, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id} className="font-medium text-card-foreground/80">
          {label}
        </Label>
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
