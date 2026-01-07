"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CalculatorCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function CalculatorCard({ title, icon, children, className }: CalculatorCardProps) {
  return (
    <Card className={cn("shadow-md w-full h-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-primary">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
