import { Metadata } from "next";
import { getCalculadora } from "./calculators";

const siteUrl = "https://vidaencifras.com";

export function generarMetadata(href: string): Metadata {
  const calc = getCalculadora(href);
  if (!calc) throw new Error(`Calculadora no encontrada: ${href}`);

  const pageUrl = `${siteUrl}${href}`;
  const { meta } = calc;

  // OG image dinámica con título y categoría
  const ogImageUrl = `${siteUrl}/og?title=${encodeURIComponent(meta.ogTitle || meta.title)}&category=${encodeURIComponent(calc.categoria)}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.ogTitle || meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

interface CalculatorLayoutProps {
  href: string;
  children: React.ReactNode;
}

export function CalculatorLayout({ href, children }: CalculatorLayoutProps) {
  const calc = getCalculadora(href);
  if (!calc) throw new Error(`Calculadora no encontrada: ${href}`);

  const pageUrl = `${siteUrl}${href}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.jsonLd.name,
    description: calc.jsonLd.description,
    url: pageUrl,
    applicationCategory: calc.jsonLd.applicationCategory,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: calc.jsonLd.priceCurrency,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calc.faqs.map((faq) => ({
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
      {calc.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
