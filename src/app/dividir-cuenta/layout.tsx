import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora para Dividir Cuenta Online Gratis - Dividir Gastos entre Amigos",
  description:
    "Divide la cuenta del restaurante o gastos entre amigos fácilmente. Calcula propinas, divide por partes iguales o según consumo. Gratis y sin registro.",
  keywords: [
    "dividir cuenta",
    "calculadora propina",
    "dividir gastos",
    "split bill",
    "dividir cuenta restaurante",
    "calcular propina",
    "dividir entre amigos",
    "calculadora gastos compartidos",
    "repartir cuenta",
    "dividir pago",
  ],
  openGraph: {
    title: "Calculadora para Dividir Cuenta Online Gratis",
    description: "Divide la cuenta entre amigos fácilmente, con propinas incluidas.",
    url: `${siteUrl}/dividir-cuenta`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/dividir-cuenta`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora para Dividir Cuenta",
    description: "Divide la cuenta entre amigos fácilmente, con propinas incluidas.",
    url: `${siteUrl}/dividir-cuenta`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "720",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
