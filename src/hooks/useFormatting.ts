"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { formatMoney as formatMoneyLib, formatMoneyShort as formatMoneyShortLib } from "@/lib/currencies";

/**
 * Hook para formateo de números y moneda consistente en toda la aplicación
 */
export function useFormatting() {
  const { moneda } = useCurrency();

  /**
   * Formatea un número como moneda con el símbolo de la moneda actual
   */
  const formatMoney = (num: number, options?: { decimals?: number; withSymbol?: boolean }) => {
    const formatted = formatMoneyLib(num, moneda, { decimals: options?.decimals ?? 2 });
    if (options?.withSymbol === false) {
      return formatted;
    }
    return `${moneda.simbolo}${formatted}`;
  };

  /**
   * Formatea un número como moneda abreviada (millones, mil millones)
   */
  const formatMoneyShort = (num: number, withSymbol = true) => {
    const formatted = formatMoneyShortLib(num, moneda);
    if (!withSymbol) {
      return formatted;
    }
    return `${moneda.simbolo}${formatted}`;
  };

  /**
   * Formatea un número como porcentaje
   */
  const formatPercent = (num: number, decimals = 2) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  /**
   * Formatea un número con separadores de miles
   */
  const formatNumber = (num: number, decimals = 0) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  /**
   * Formatea una fecha en español
   */
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    });
  };

  return {
    moneda,
    formatMoney,
    formatMoneyShort,
    formatPercent,
    formatNumber,
    formatDate,
  };
}
