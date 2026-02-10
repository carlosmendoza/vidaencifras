"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Moneda, monedas, monedaDefault, detectarMoneda } from "@/lib/currencies";

interface CurrencyContextType {
  moneda: Moneda;
  setMoneda: (moneda: Moneda) => void;
  monedas: Moneda[];
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "vidaencifras-moneda";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [moneda, setMonedaState] = useState<Moneda>(monedaDefault);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentar cargar moneda guardada
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = monedas.find(m => m.codigo === saved);
      if (found) {
        setMonedaState(found);
        setMounted(true);
        return;
      }
    }
    // Si no hay guardada, detectar automáticamente
    setMonedaState(detectarMoneda());
    setMounted(true);
  }, []);

  const setMoneda = (m: Moneda) => {
    setMonedaState(m);
    localStorage.setItem(STORAGE_KEY, m.codigo);
  };

  // Evitar flash de moneda incorrecta durante hidratación
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CurrencyContext.Provider value={{ moneda, setMoneda, monedas }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  // Durante SSR/prerenderizado, devolver valores por defecto
  if (!context) {
    return {
      moneda: monedaDefault,
      setMoneda: () => {},
      monedas,
    };
  }
  return context;
}
