"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, getCalculatorInfo } from "@/lib/analytics";

/**
 * Hook para trackear el uso de calculadoras que NO usan ResultWithMascot.
 *
 * - Sin argumento o `hasResult = true`: dispara inmediatamente (para calculadoras reactivas
 *   y herramientas interactivas donde visitar = usar).
 * - Con `hasResult` booleano: espera a que sea `true` para disparar (para calculadoras
 *   con botón "Calcular" que muestran resultados condicionalmente).
 */
export function useCalculatorTracking(hasResult: boolean = true) {
  const pathname = usePathname();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || !hasResult) return;
    tracked.current = true;

    const { calculator_category, calculator_name } =
      getCalculatorInfo(pathname);
    trackEvent("calculator_used", { calculator_category, calculator_name });
  }, [hasResult, pathname]);
}
