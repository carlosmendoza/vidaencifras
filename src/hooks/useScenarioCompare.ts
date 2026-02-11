"use client";

import { useState, useCallback } from "react";

export interface Scenario<T = Record<string, unknown>> {
  id: string;
  name: string;
  inputs: T;
  result: {
    mainLabel: string;
    mainValue: string;
    items?: { label: string; value: string; color?: string }[];
  } | null;
}

interface UseScenarioCompareOptions<T> {
  maxScenarios?: number;
  defaultInputs: T;
}

export function useScenarioCompare<T extends Record<string, unknown>>({
  maxScenarios = 4,
  defaultInputs,
}: UseScenarioCompareOptions<T>) {
  const [scenarios, setScenarios] = useState<Scenario<T>[]>([
    {
      id: "1",
      name: "Escenario 1",
      inputs: { ...defaultInputs },
      result: null,
    },
  ]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("1");

  const addScenario = useCallback(() => {
    if (scenarios.length >= maxScenarios) return;

    const newId = String(Date.now());
    const newScenario: Scenario<T> = {
      id: newId,
      name: `Escenario ${scenarios.length + 1}`,
      inputs: { ...defaultInputs },
      result: null,
    };

    setScenarios((prev) => [...prev, newScenario]);
    setActiveScenarioId(newId);
  }, [scenarios.length, maxScenarios, defaultInputs]);

  const removeScenario = useCallback((id: string) => {
    setScenarios((prev) => {
      if (prev.length <= 1) return prev;
      const filtered = prev.filter((s) => s.id !== id);

      // Si el escenario activo fue eliminado, seleccionar el primero
      if (id === activeScenarioId && filtered.length > 0) {
        setActiveScenarioId(filtered[0].id);
      }

      return filtered;
    });
  }, [activeScenarioId]);

  const updateScenarioInputs = useCallback((id: string, inputs: Partial<T>) => {
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, inputs: { ...s.inputs, ...inputs }, result: null }
          : s
      )
    );
  }, []);

  const updateScenarioResult = useCallback(
    (id: string, result: Scenario<T>["result"]) => {
      setScenarios((prev) =>
        prev.map((s) => (s.id === id ? { ...s, result } : s))
      );
    },
    []
  );

  const updateScenarioName = useCallback((id: string, name: string) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  }, []);

  const duplicateScenario = useCallback((id: string) => {
    if (scenarios.length >= maxScenarios) return;

    const scenarioToCopy = scenarios.find((s) => s.id === id);
    if (!scenarioToCopy) return;

    const newId = String(Date.now());
    const newScenario: Scenario<T> = {
      id: newId,
      name: `${scenarioToCopy.name} (copia)`,
      inputs: { ...scenarioToCopy.inputs },
      result: null,
    };

    setScenarios((prev) => [...prev, newScenario]);
    setActiveScenarioId(newId);
  }, [scenarios, maxScenarios]);

  const resetScenarios = useCallback(() => {
    setScenarios([
      {
        id: "1",
        name: "Escenario 1",
        inputs: { ...defaultInputs },
        result: null,
      },
    ]);
    setActiveScenarioId("1");
  }, [defaultInputs]);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const canAddScenario = scenarios.length < maxScenarios;
  const canRemoveScenario = scenarios.length > 1;

  return {
    scenarios,
    activeScenario,
    activeScenarioId,
    setActiveScenarioId,
    addScenario,
    removeScenario,
    updateScenarioInputs,
    updateScenarioResult,
    updateScenarioName,
    duplicateScenario,
    resetScenarios,
    canAddScenario,
    canRemoveScenario,
  };
}
