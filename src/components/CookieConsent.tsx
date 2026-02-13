"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";

type ConsentValue = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);

    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent("cookie-consent-change"));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
            Usamos cookies de análisis (Google Analytics) para entender cómo se usa el sitio y
            mejorarlo. Tus datos en las calculadoras <strong>nunca</strong> se envían a ningún
            servidor.{" "}
            <a
              href="/privacidad"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              Más info
            </a>
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => handleConsent("rejected")}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
