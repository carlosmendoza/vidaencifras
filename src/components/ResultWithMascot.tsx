"use client";

import { ResultMascot } from "./ResultMascot";
import type { MascotVariant } from "@/lib/mascots";

interface ResultWithMascotProps {
  children: React.ReactNode;
  variant?: MascotVariant;
}

export function ResultWithMascot({
  children,
  variant = "default",
}: ResultWithMascotProps) {
  return (
    <div className="relative">
      <ResultMascot variant={variant} />
      {children}
    </div>
  );
}
