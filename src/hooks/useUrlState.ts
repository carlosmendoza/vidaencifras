"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseUrlStateOptions<T> {
  paramNames?: Partial<Record<keyof T, string>>;
}

interface UseUrlStateReturn<T extends Record<string, string>> {
  values: T;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  hadInitialParams: boolean;
}

export function useUrlState<T extends Record<string, string>>(
  defaults: T,
  options?: UseUrlStateOptions<T>
): UseUrlStateReturn<T> {
  const [values, setValues] = useState<T>(defaults);
  const [hadInitialParams, setHadInitialParams] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const defaultsRef = useRef(defaults);
  const paramNamesRef = useRef(options?.paramNames ?? {});

  const getParamName = useCallback((key: string): string => {
    return (paramNamesRef.current as Record<string, string>)[key] ?? key;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updates: Partial<T> = {};
    let hasParams = false;

    for (const key of Object.keys(defaultsRef.current)) {
      const paramName = getParamName(key);
      const value = params.get(paramName);
      if (value !== null) {
        updates[key as keyof T] = value as T[keyof T];
        hasParams = true;
      }
    }

    if (hasParams) {
      setValues((prev) => ({ ...prev, ...updates }));
      setHadInitialParams(true);
    }
    setInitialized(true);
  }, [getParamName]);

  useEffect(() => {
    if (!initialized) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      const defs = defaultsRef.current;

      for (const [key, value] of Object.entries(values)) {
        if (value !== defs[key as keyof T] && value !== "") {
          params.set(getParamName(key), value);
        }
      }

      const search = params.toString();
      const newUrl = search
        ? `${window.location.pathname}?${search}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }, 500);

    return () => clearTimeout(timer);
  }, [values, initialized, getParamName]);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { values, setField, hadInitialParams };
}
