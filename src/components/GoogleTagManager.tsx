"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-TF8GVTZ4";
const CONSENT_KEY = "cookie-consent";

function loadGTM() {
  // Evitar cargar dos veces
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function GoogleTagManager() {
  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "accepted") {
      loadGTM();
    }

    const handleConsentChange = () => loadGTM();
    window.addEventListener("cookie-consent-change", handleConsentChange);
    return () => window.removeEventListener("cookie-consent-change", handleConsentChange);
  }, []);

  return null;
}

export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
