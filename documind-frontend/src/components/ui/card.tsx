import * as React from "react";
import { cn } from "@/lib/utils"; // if you have a cn() helper, otherwise remove

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition",
        className
      )}
      {...props}
    />
  );
}
