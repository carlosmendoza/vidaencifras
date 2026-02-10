import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const siteUrl = "https://vidaencifras.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Páginas principales
  const mainPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/blog`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/finanzas`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/salud`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/herramientas`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/productividad`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // Calculadoras de finanzas
  const finanzas = [
    { slug: "calculadora-interes-compuesto", priority: 0.9 },
    { slug: "calculadora-prestamos", priority: 0.9 },
    { slug: "calculadora-prestacion-servicios", priority: 0.9 },
  ];

  // Calculadoras de salud
  const salud = [
    { slug: "calculadora-calorias", priority: 0.9 },
    { slug: "calculadora-imc", priority: 0.9 },
  ];

  // Herramientas
  const herramientas = [
    { slug: "calculadora-porcentajes", priority: 1.0 },
    { slug: "conversor-unidades", priority: 0.9 },
    { slug: "calculadora-diferencia-fechas", priority: 0.8 },
    { slug: "calculadora-dias-vividos", priority: 0.8 },
    { slug: "calculadora-dividir-cuenta", priority: 0.8 },
  ];

  const calculadorasUrls = [
    ...finanzas.map((calc) => ({
      url: `${siteUrl}/finanzas/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: calc.priority,
    })),
    ...salud.map((calc) => ({
      url: `${siteUrl}/salud/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: calc.priority,
    })),
    ...herramientas.map((calc) => ({
      url: `${siteUrl}/herramientas/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: calc.priority,
    })),
  ];

  // Artículos del blog (sin fecha específica para contenido evergreen)
  const blogUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Páginas legales
  const legalPages = [
    { url: `${siteUrl}/privacidad`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/terminos`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return [
    ...mainPages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
    ...calculadorasUrls,
    ...blogUrls,
    ...legalPages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
  ];
}
