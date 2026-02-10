import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/salud/calculadora-hidratacion`;

export const metadata: Metadata = {
  title: "Calculadora de Hidratación - ¿Cuánta Agua Debo Tomar al Día?",
  description:
    "Calcula cuántos litros de agua necesitas beber al día según tu peso, actividad física y clima. Incluye tips de hidratación y distribución por vasos.",
  keywords: [
    "calculadora hidratación",
    "cuánta agua tomar",
    "litros de agua al día",
    "hidratación diaria",
    "vasos de agua",
    "agua según peso",
    "hidratación deportiva",
    "deshidratación",
  ],
  openGraph: {
    title: "Calculadora de Hidratación - ¿Cuánta Agua Debo Tomar?",
    description:
      "Descubre cuántos litros de agua necesitas beber según tu peso, actividad y clima.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuánta agua debo tomar al día?",
    answer:
      "La cantidad recomendada varía según tu peso, actividad física y clima. Una regla general es 35ml por kilogramo de peso corporal, ajustada según tu nivel de actividad y el clima donde vives.",
  },
  {
    question: "¿Cuenta el café y té como hidratación?",
    answer:
      "Sí, pero con moderación. Aunque contienen cafeína (diurético leve), la cantidad de agua que aportan supera la pérdida. Sin embargo, el agua pura sigue siendo la mejor opción para hidratarse.",
  },
  {
    question: "¿Cuáles son los signos de deshidratación?",
    answer:
      "Los principales signos son: sed intensa, orina oscura, fatiga, dolor de cabeza, mareos, piel seca y confusión. Si tu orina es amarillo claro, estás bien hidratado.",
  },
  {
    question: "¿Es malo tomar demasiada agua?",
    answer:
      "Sí, beber agua en exceso puede causar hiponatremia (niveles bajos de sodio en sangre). Esto es raro pero puede ocurrir si bebes varios litros en poco tiempo. Escucha a tu cuerpo y bebe gradualmente.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Hidratación",
    description:
      "Calcula cuántos litros de agua necesitas beber al día según tu peso, actividad física y clima.",
    url: pageUrl,
    applicationCategory: "HealthApplication",
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
