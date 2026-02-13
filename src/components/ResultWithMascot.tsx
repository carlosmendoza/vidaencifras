"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ResultMascot } from "./ResultMascot";
import { trackEvent, getCalculatorInfo } from "@/lib/analytics";
import type { MascotVariant } from "@/lib/mascots";

interface ResultWithMascotProps {
  children: React.ReactNode;
  variant?: MascotVariant;
}

export function ResultWithMascot({
  children,
  variant = "default",
}: ResultWithMascotProps) {
  const pathname = usePathname();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const { calculator_category, calculator_name } =
      getCalculatorInfo(pathname);
    trackEvent("calculator_used", { calculator_category, calculator_name });
  }, [pathname]);

  return (
    <div className="relative">
      <ResultMascot variant={variant} />
      {children}
    </div>
  );
}
