import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-iva`;

export const metadata: Metadata = {
  title: "Calculadora de IVA Colombia - Agregar, Quitar y Calcular IVA",
  description:
    "Calcula el IVA en Colombia fácilmente. Agrega IVA del 19%, quítalo del precio final o calcula solo el impuesto. Tasas 19%, 5% y 0% (exento). Gratis y sin registro.",
  keywords: [
    "calculadora IVA Colombia",
    "calcular IVA 19%",
    "agregar IVA",
    "quitar IVA",
    "IVA incluido",
    "precio sin IVA",
    "impuesto al valor agregado",
    "IVA Colombia 2025",
    "calculadora impuestos",
    "base gravable IVA",
  ],
  openGraph: {
    title: "Calculadora de IVA Colombia - Agregar, Quitar y Calcular IVA",
    description:
      "Calcula el IVA en Colombia: agrega 19%, quítalo del precio o calcula solo el impuesto. Rápida y sin registro.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuál es el IVA en Colombia?",
    answer:
      "En Colombia, la tarifa general del IVA es del 19%. Sin embargo, existen tasas reducidas del 5% para ciertos productos como algunos alimentos procesados y servicios, y del 0% para productos exentos como canasta familiar básica, medicamentos y exportaciones.",
  },
  {
    question: "¿Cómo se calcula el IVA de un producto?",
    answer:
      "Para agregar IVA: multiplica el precio base por 1.19 (para 19%). Para quitar IVA de un precio con impuesto incluido: divide el precio total entre 1.19. Para calcular solo el IVA: divide el precio base entre 100 y multiplica por 19.",
  },
  {
    question: "¿Qué productos tienen IVA del 5%?",
    answer:
      "Tienen IVA del 5% productos como: algunos alimentos procesados, embutidos, bicicletas con valor hasta 50 UVT, servicios de vigilancia con armas, almacenamiento de productos agrícolas, entre otros definidos en el Estatuto Tributario.",
  },
  {
    question: "¿Qué productos están exentos de IVA (0%)?",
    answer:
      "Están exentos de IVA: productos de la canasta familiar básica (arroz, pan, leche, huevos, frutas, verduras), medicamentos, libros, cuadernos, servicios de salud, educación, transporte público y las exportaciones de bienes.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de IVA Colombia",
    description:
      "Calcula el IVA en Colombia: agrega, quita o calcula el impuesto con tasas del 19%, 5% y 0%.",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
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
