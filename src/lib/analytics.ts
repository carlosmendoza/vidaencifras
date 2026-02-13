// Tipos para dataLayer de GTM
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Envía un evento al dataLayer de GTM.
 * Si GTM no está cargado (usuario no aceptó cookies), los eventos
 * se acumulan en el array y GTM los procesa cuando se active.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

/**
 * Deriva categoría y nombre de calculadora desde el pathname.
 * Ej: "/finanzas/calculadora-liquidacion" → { category: "finanzas", name: "calculadora-liquidacion" }
 */
export function getCalculatorInfo(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return {
    calculator_category: segments[0] || "otra",
    calculator_name: segments[1] || pathname,
  };
}
