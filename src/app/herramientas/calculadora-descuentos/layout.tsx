import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-descuentos`;

export const metadata: Metadata = {
  title: "Calculadora de Descuentos Online - Precio Final y Ahorro",
  description:
    "Calcula el precio final con descuento y cuánto ahorras. Soporta descuentos encadenados (ej: 30% + 10% adicional). Perfecta para compras, Black Friday y ofertas.",
  keywords: [
    "calculadora descuentos",
    "calcular descuento",
    "precio con descuento",
    "cuanto ahorro",
    "descuento porcentaje",
    "black friday calculadora",
    "ofertas descuentos",
    "precio final",
    "descuentos encadenados",
    "calcular rebaja",
  ],
  openGraph: {
    title: "Calculadora de Descuentos - Precio Final y Ahorro",
    description:
      "Calcula el precio final con descuento y cuánto ahorras. Soporta descuentos encadenados.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo se calculan los descuentos encadenados?",
    answer:
      "Los descuentos no se suman directamente. Un 30% + 20% adicional NO es 50%. Primero se aplica el 30% al precio original, y luego el 20% se aplica al precio ya rebajado. Ejemplo: $100 con 30% = $70, luego 20% de $70 = $56 (44% total, no 50%).",
  },
  {
    question: "¿Cómo calcular el precio original desde el precio con descuento?",
    answer:
      "Divide el precio final entre (1 - descuento/100). Ejemplo: si el precio final es $75 y el descuento fue 25%, el original era: $75 / (1 - 0.25) = $75 / 0.75 = $100.",
  },
  {
    question: "¿Qué es mejor: 30% de descuento o $30.000 de descuento?",
    answer:
      "Depende del precio original. Si el producto cuesta $100.000, el 30% ($30.000) es igual. Si cuesta más de $100.000, el 30% es mejor. Si cuesta menos, los $30.000 fijos son mejor.",
  },
  {
    question: "¿Los descuentos incluyen IVA?",
    answer:
      "Generalmente los descuentos se aplican al precio con IVA incluido, que es el precio que ves en la etiqueta. El descuento reduce el total que pagas, incluyendo impuestos.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Descuentos",
    description:
      "Calcula el precio final con descuento y cuánto ahorras en tus compras.",
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
