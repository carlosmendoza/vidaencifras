"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const categoryNames: Record<string, string> = {
  finanzas: "Finanzas",
  salud: "Salud",
  herramientas: "Herramientas",
  productividad: "Productividad",
  blog: "Blog",
};

const calculatorNames: Record<string, string> = {
  "calculadora-interes-compuesto": "Interés Compuesto",
  "calculadora-prestamos": "Préstamos",
  "calculadora-dividir-cuenta": "Dividir Cuenta",
  "calculadora-calorias": "Calorías (TDEE)",
  "calculadora-imc": "IMC",
  "calculadora-porcentajes": "Porcentajes",
  "conversor-unidades": "Conversor de Unidades",
  "calculadora-diferencia-fechas": "Diferencia entre Fechas",
  "calculadora-dias-vividos": "Días Vividos",
  "valor-hora": "Valor de tu Hora",
  "calculadora-habitos": "Calculadora de Hábitos",
  "auditoria-tiempo": "Auditoría de Tiempo",
  "vida-en-semanas": "Tu Vida en Semanas",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Inicio", href: "/" }];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    let label = segment;
    if (categoryNames[segment]) {
      label = categoryNames[segment];
    } else if (calculatorNames[segment]) {
      label = calculatorNames[segment];
    } else {
      // Capitalize first letter for blog posts
      label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    }

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://vidaencifras.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                )}
                {isLast ? (
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
