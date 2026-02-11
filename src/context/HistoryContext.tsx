"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CalculationEntry {
  id: string;
  calculatorName: string;
  calculatorPath: string;
  calculatorEmoji: string;
  inputs: Record<string, string | number>;
  result: {
    mainLabel: string;
    mainValue: string;
  };
  timestamp: number;
}

interface HistoryContextType {
  history: CalculationEntry[];
  addToHistory: (entry: Omit<CalculationEntry, "id" | "timestamp">) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  getRecentCalculations: (limit?: number) => CalculationEntry[];
}

const HistoryContext = createContext<HistoryContextType | null>(null);

const STORAGE_KEY = "vidaencifras-historial";
const MAX_ENTRIES = 50;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  // Cargar historial de localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (err) {
      console.error("Error al cargar historial:", err);
    }
    setMounted(true);
  }, []);

  // Guardar historial en localStorage cuando cambia
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (err) {
        console.error("Error al guardar historial:", err);
      }
    }
  }, [history, mounted]);

  const addToHistory = (entry: Omit<CalculationEntry, "id" | "timestamp">) => {
    const newEntry: CalculationEntry = {
      ...entry,
      id: generateId(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev];
      // Limitar a MAX_ENTRIES
      if (updated.length > MAX_ENTRIES) {
        return updated.slice(0, MAX_ENTRIES);
      }
      return updated;
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Error al limpiar historial:", err);
    }
  };

  const getRecentCalculations = (limit: number = 5): CalculationEntry[] => {
    return history.slice(0, limit);
  };

  // Evitar flash de contenido incorrecto durante hidratación
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
        getRecentCalculations,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  // Durante SSR/prerenderizado, devolver valores por defecto
  if (!context) {
    return {
      history: [],
      addToHistory: () => {},
      removeFromHistory: () => {},
      clearHistory: () => {},
      getRecentCalculations: () => [],
    };
  }
  return context;
}
