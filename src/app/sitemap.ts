import { MetadataRoute } from "next";

const siteUrl = "https://vidaencifras.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculadoras = [
    { slug: "porcentajes", priority: 1.0 },
    { slug: "calorias", priority: 1.0 },
    { slug: "interes-compuesto", priority: 0.9 },
    { slug: "prestamos", priority: 0.9 },
    { slug: "conversor-unidades", priority: 0.9 },
    { slug: "diferencia-fechas", priority: 0.8 },
    { slug: "imc", priority: 0.8 },
    { slug: "promedio-notas", priority: 0.8 },
    { slug: "dias-vividos", priority: 0.7 },
    { slug: "dividir-cuenta", priority: 0.7 },
  ];

  const calculadorasUrls = calculadoras.map((calc) => ({
    url: `${siteUrl}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: calc.priority,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...calculadorasUrls,
  ];
}
