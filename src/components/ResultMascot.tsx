"use client";

import { usePathname } from "next/navigation";
import { PilarMascot } from "./PilarMascot";
import { getPilarFromPathname, type MascotVariant } from "@/lib/mascots";

interface ResultMascotProps {
  variant?: MascotVariant;
  className?: string;
}

export function ResultMascot({
  variant = "default",
  className = "",
}: ResultMascotProps) {
  const pathname = usePathname();
  const pilar = getPilarFromPathname(pathname);

  if (!pilar) return null;

  return (
    <div
      className={`absolute -top-6 -right-5 md:-top-8 md:-right-6 animate-fade-in-up pointer-events-none z-10 ${className}`}
    >
      <PilarMascot
        pilar={pilar}
        variant={variant}
        size="sm"
        className={`opacity-60 drop-shadow-md ${variant !== "default" ? "scale-130" : ""}`}
      />
    </div>
  );
}
