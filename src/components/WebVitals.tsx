"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Enviar a Google Analytics vía dataLayer si GTM está cargado
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "web_vitals",
        web_vital_name: metric.name,
        web_vital_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        web_vital_id: metric.id,
        web_vital_rating: metric.rating,
      });
    }
  });

  return null;
}
