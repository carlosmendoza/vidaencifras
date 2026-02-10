"use client";

import { ReactNode } from "react";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CurrencyPrompt } from "@/components/CurrencyPrompt";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
      <CurrencyPrompt />
    </CurrencyProvider>
  );
}
