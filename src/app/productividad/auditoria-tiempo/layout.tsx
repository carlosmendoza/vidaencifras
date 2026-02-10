import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/productividad/auditoria-tiempo`;

export const metadata: Metadata = {
  title: "Auditoría de Tiempo - Analiza tus 168 Horas Semanales",
  description:
    "Analiza cómo distribuyes las 168 horas de tu semana. Identifica desequilibrios y recibe sugerencias personalizadas para mejorar tu balance de vida.",
  keywords: [
    "auditoria tiempo",
    "168 horas semana",
    "gestion tiempo",
    "balance vida trabajo",
    "distribucion tiempo",
    "productividad semanal",
    "como uso mi tiempo",
    "analisis tiempo",
  ],
  openGraph: {
    title: "Auditoría de Tiempo - ¿En qué se van tus 168 horas?",
    description:
      "Todos tenemos 168 horas a la semana. Descubre cómo las usas y dónde puedes mejorar.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Por qué 168 horas?",
    answer:
      "Todos tenemos exactamente 168 horas a la semana (24 horas × 7 días). Es el gran ecualizador: millonarios y personas comunes tienen el mismo tiempo. La diferencia está en cómo lo usan.",
  },
  {
    question: "¿Cuántas horas debería dormir?",
    answer:
      "Los adultos necesitan 7-9 horas por noche (49-63 horas semanales). Dormir menos de 6 horas afecta la memoria, el sistema inmune y aumenta el riesgo de enfermedades crónicas.",
  },
  {
    question: "¿Cuánto tiempo de ocio es saludable?",
    answer:
      "Se recomienda entre 2-5 horas de tiempo libre de calidad al día. Muy poco causa agotamiento; demasiado sin propósito puede causar insatisfacción. El balance es clave.",
  },
  {
    question: "¿Cómo puedo encontrar más tiempo?",
    answer:
      "Audita primero: registra tu tiempo real por una semana. Identifica 'fugas' como redes sociales o reuniones innecesarias. Pequeños ajustes (20-30 min/día) suman 2+ horas semanales.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Auditoría de Tiempo Semanal",
    description:
      "Analiza cómo distribuyes tus 168 horas semanales y mejora tu balance de vida.",
    url: pageUrl,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "COP",
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
