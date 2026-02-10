import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/productividad/vida-en-semanas`;

export const metadata: Metadata = {
  title: "Tu Vida en Semanas - Visualiza tu Vida Completa",
  description:
    "Visualiza tu vida entera en una cuadrícula de semanas. Descubre cuántos veranos, navidades y fines de semana te quedan. Una perspectiva poderosa sobre el tiempo.",
  keywords: [
    "vida en semanas",
    "life in weeks",
    "visualizar vida",
    "expectativa de vida",
    "semanas vividas",
    "tiempo de vida",
    "perspectiva temporal",
    "mortalidad",
  ],
  openGraph: {
    title: "Tu Vida en Semanas - Cada Cuadrito es una Semana",
    description:
      "Una visualización que cambiará tu perspectiva sobre el tiempo. Cada cuadrito es una semana de tu vida.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Por qué visualizar la vida en semanas?",
    answer:
      "Ver tu vida como una cuadrícula finita de semanas hace tangible lo abstracto. Es un recordatorio poderoso de que el tiempo es limitado y cada semana cuenta. Inspira a vivir con más intención.",
  },
  {
    question: "¿Cuál es la expectativa de vida promedio?",
    answer:
      "En Colombia es ~77 años, en México ~75, en Argentina ~76, en España ~83. Factores como estilo de vida, ejercicio, alimentación y genética pueden aumentarla significativamente.",
  },
  {
    question: "¿Cuántas semanas tiene una vida de 80 años?",
    answer:
      "Una vida de 80 años tiene 4,160 semanas. Parece mucho, pero si tienes 30 años ya usaste 1,560 semanas (37.5%). Te quedan aproximadamente 2,600 semanas.",
  },
  {
    question: "¿Cómo puedo aprovechar mejor mis semanas restantes?",
    answer:
      "Define qué es importante para ti. Programa primero lo que importa (familia, salud, metas). Di no a lo que no te acerca a tu visión. Cada semana que pasa no vuelve.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tu Vida en Semanas",
    description:
      "Visualiza tu vida entera en una cuadrícula de semanas y gana perspectiva sobre el tiempo.",
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
