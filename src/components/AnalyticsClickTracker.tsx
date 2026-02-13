"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Componente global que escucha clicks en elementos con data-track.
 * Extrae el nombre del evento de data-track y parámetros adicionales
 * de otros atributos data-track-*.
 *
 * Ejemplo de uso en cualquier componente (incluso Server Components):
 *   <a data-track="cta_click" data-track-blog="mejores-cdt" data-track-destino="/finanzas/comparador-cdt">
 */
export function AnalyticsClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-track]");
      if (!el) return;

      const eventName = el.getAttribute("data-track");
      if (!eventName) return;

      const params: Record<string, string> = {};
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-track-") && attr.value) {
          const key = attr.name.replace("data-track-", "");
          params[key] = attr.value;
        }
      }

      trackEvent(eventName, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
