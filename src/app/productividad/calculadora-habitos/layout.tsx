import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/productividad/calculadora-habitos`;

export const metadata: Metadata = {
  title: "Calculadora de Hábitos - Mide el Impacto de tus Hábitos Diarios",
  description:
    "Calcula el impacto acumulado de tus hábitos en tiempo, dinero y salud. Proyecciones a 1, 5 y 10 años con interés compuesto para hábitos de ahorro.",
  keywords: [
    "calculadora habitos",
    "impacto habitos diarios",
    "habitos saludables",
    "ahorro habitos",
    "dejar de fumar ahorro",
    "habitos productividad",
    "tiempo acumulado",
    "interes compuesto ahorro",
  ],
  openGraph: {
    title: "Calculadora de Hábitos - Mide el Impacto de tus Hábitos",
    description:
      "Descubre cuánto tiempo, dinero o salud ganas o pierdes con tus hábitos diarios.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Por qué los pequeños hábitos importan tanto?",
    answer:
      "Los hábitos pequeños se acumulan exponencialmente. Leer 20 minutos al día son 120+ horas al año (unos 40 libros). Ahorrar $10.000 diarios son $3.6 millones al año, sin contar intereses.",
  },
  {
    question: "¿Cómo funciona el interés compuesto en hábitos de ahorro?",
    answer:
      "Si inviertes tus ahorros del hábito, los intereses generan más intereses. Ahorrar $300.000/mes al 10% anual te da $62 millones en 10 años, aunque solo aportaste $36 millones.",
  },
  {
    question: "¿Qué hábitos tienen mayor impacto financiero?",
    answer:
      "Dejar de fumar puede ahorrarte $2-5 millones al año. Reducir comidas fuera ahorra $1-3 millones. Preparar café en casa en vez de comprarlo ahorra $500.000-1.000.000 al año.",
  },
  {
    question: "¿Cómo mantengo un nuevo hábito?",
    answer:
      "Empieza pequeño (2 minutos al día), vincúlalo a un hábito existente, hazlo obvio y atractivo. Rastrea tu progreso y celebra las pequeñas victorias.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Hábitos",
    description:
      "Calcula el impacto acumulado de tus hábitos diarios en tiempo, dinero y salud.",
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
