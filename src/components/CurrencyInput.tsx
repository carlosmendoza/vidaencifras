"use client";

import { useRef, useCallback, type InputHTMLAttributes } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { formatInputValue, parseFormattedValue, getSeparators } from "@/lib/currencies";

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  value: string;
  onChange: (rawValue: string) => void;
  locale?: string;
}

export function CurrencyInput({ value, onChange, locale, placeholder, ...rest }: CurrencyInputProps) {
  const { moneda } = useCurrency();
  const effectiveLocale = locale ?? moneda.locale;
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = formatInputValue(value, effectiveLocale);
  const formattedPlaceholder = placeholder
    ? formatInputValue(placeholder.replace(/\D/g, ""), effectiveLocale)
    : undefined;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const raw = input.value;
      const { thousands, decimal } = getSeparators(effectiveLocale);

      // Filtrar solo dígitos y separador decimal (máx 1)
      // Importante: ignorar separador de miles para no confundirlo con decimal
      let cleaned = "";
      let hasDecimal = false;
      for (const ch of raw) {
        if (ch >= "0" && ch <= "9") {
          cleaned += ch;
        } else if (ch === thousands) {
          // Ignorar separador de miles
        } else if (ch === decimal && !hasDecimal) {
          cleaned += ".";
          hasDecimal = true;
        }
      }

      // Calcular posición del cursor: contar dígitos antes del cursor
      const cursorPos = input.selectionStart ?? raw.length;
      let digitsBeforeCursor = 0;
      let decimalBeforeCursor = false;
      for (let i = 0; i < cursorPos; i++) {
        const ch = raw[i];
        if (ch >= "0" && ch <= "9") {
          digitsBeforeCursor++;
        } else if (ch === decimal) {
          decimalBeforeCursor = true;
        }
      }

      onChange(cleaned);

      // Restaurar posición del cursor después del re-render
      requestAnimationFrame(() => {
        if (!inputRef.current) return;
        const formatted = formatInputValue(cleaned, effectiveLocale);
        let newPos = 0;
        let counted = 0;
        let foundDecimal = false;

        for (let i = 0; i < formatted.length; i++) {
          if (counted === digitsBeforeCursor && (!decimalBeforeCursor || foundDecimal)) {
            break;
          }
          const ch = formatted[i];
          if (ch >= "0" && ch <= "9") {
            counted++;
          } else if (ch === getSeparators(effectiveLocale).decimal) {
            foundDecimal = true;
          }
          newPos = i + 1;
        }

        inputRef.current.setSelectionRange(newPos, newPos);
      });
    },
    [effectiveLocale, onChange],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      const parsed = parseFormattedValue(pasted, effectiveLocale);

      // Limpiar a solo dígitos y un punto decimal
      let cleaned = "";
      let hasDecimal = false;
      for (const ch of parsed) {
        if (ch >= "0" && ch <= "9") {
          cleaned += ch;
        } else if (ch === "." && !hasDecimal) {
          cleaned += ".";
          hasDecimal = true;
        }
      }

      if (cleaned) onChange(cleaned);
    },
    [effectiveLocale, onChange],
  );

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder={formattedPlaceholder}
      {...rest}
    />
  );
}
