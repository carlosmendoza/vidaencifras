"use client";

import { ReactNode } from "react";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { HistoryProvider } from "@/context/HistoryContext";
import { CurrencyPrompt } from "@/components/CurrencyPrompt";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <HistoryProvider>
        {children}
        <CurrencyPrompt />
      </HistoryProvider>
    </CurrencyProvider>
  );
}
