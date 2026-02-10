"use client";

import { useState, useCallback } from "react";

interface ValidationRule {
  min?: number;
  max?: number;
  required?: boolean;
  integer?: boolean;
}

interface UseCalculatorInputOptions {
  initialValue?: string;
  validation?: ValidationRule;
}

interface UseCalculatorInputReturn {
  value: string;
  numericValue: number;
  setValue: (value: string) => void;
  error: string | null;
  isValid: boolean;
  reset: () => void;
}

/**
 * Hook para manejar inputs numéricos en calculadoras con validación
 */
export function useCalculatorInput(options: UseCalculatorInputOptions = {}): UseCalculatorInputReturn {
  const { initialValue = "", validation = {} } = options;
  const [value, setValue] = useState(initialValue);

  const numericValue = parseFloat(value) || 0;

  const getError = useCallback((): string | null => {
    if (validation.required && value.trim() === "") {
      return "Este campo es requerido";
    }

    if (value.trim() === "") {
      return null; // Empty is OK if not required
    }

    const num = parseFloat(value);

    if (isNaN(num)) {
      return "Ingresa un número válido";
    }

    if (validation.integer && !Number.isInteger(num)) {
      return "Debe ser un número entero";
    }

    if (validation.min !== undefined && num < validation.min) {
      return `El valor mínimo es ${validation.min}`;
    }

    if (validation.max !== undefined && num > validation.max) {
      return `El valor máximo es ${validation.max}`;
    }

    return null;
  }, [value, validation]);

  const error = getError();
  const isValid = error === null && (value.trim() !== "" || !validation.required);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    numericValue,
    setValue,
    error,
    isValid,
    reset,
  };
}

interface CalculatorInputsConfig {
  [key: string]: UseCalculatorInputOptions;
}

type CalculatorInputsReturn<T extends CalculatorInputsConfig> = {
  [K in keyof T]: UseCalculatorInputReturn;
} & {
  isAllValid: boolean;
  resetAll: () => void;
  getValues: () => { [K in keyof T]: number };
};

/**
 * Hook para manejar múltiples inputs de calculadora
 * @example
 * const inputs = useCalculatorInputs({
 *   capital: { validation: { min: 0, required: true } },
 *   tasa: { validation: { min: 0, max: 100, required: true } },
 *   tiempo: { validation: { min: 1, max: 100, integer: true, required: true } },
 * });
 */
export function useCalculatorInputs<T extends CalculatorInputsConfig>(
  config: T
): CalculatorInputsReturn<T> {
  const entries = Object.entries(config);

  const inputs = entries.reduce((acc, [key, options]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key] = useCalculatorInput(options);
    return acc;
  }, {} as { [key: string]: UseCalculatorInputReturn });

  const isAllValid = Object.values(inputs).every((input) => input.isValid);

  const resetAll = () => {
    Object.values(inputs).forEach((input) => input.reset());
  };

  const getValues = () => {
    return Object.entries(inputs).reduce((acc, [key, input]) => {
      acc[key] = input.numericValue;
      return acc;
    }, {} as { [key: string]: number });
  };

  return {
    ...inputs,
    isAllValid,
    resetAll,
    getValues,
  } as CalculatorInputsReturn<T>;
}
