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
  // Finanzas
  "calculadora-4x1000": "Calculadora 4x1000",
  "calculadora-cesantias": "Calculadora de Cesantías",
  "calculadora-impuesto-renta": "Impuesto de Renta",
  "calculadora-inflacion": "Calculadora de Inflación",
  "calculadora-interes-compuesto": "Interés Compuesto",
  "calculadora-jubilacion": "Calculadora de Jubilación",
  "calculadora-liquidacion": "Calculadora de Liquidación",
  "calculadora-meta-ahorro": "Meta de Ahorro",
  "calculadora-prestacion-servicios": "Prestación de Servicios",
  "calculadora-prestamos": "Préstamos",
  "calculadora-presupuesto": "Presupuesto 50/30/20",
  "calculadora-prima": "Calculadora de Prima",
  "calculadora-retencion-fuente": "Retención en la Fuente",
  "calculadora-horas-extras": "Horas Extras",
  "calculadora-vacaciones": "Vacaciones",
  "calculadora-salario-neto": "Salario Neto",
  "calculadora-impuesto-vehicular": "Impuesto Vehicular",
  "calculadora-subsidio-vivienda": "Subsidio Mi Casa Ya",
  "arriendo-vs-compra": "Arrendar o Comprar",
  "comparador-cdt": "Comparador de CDTs",
  "comparador-prestamos": "Comparador de Préstamos",
  "simulador-cuenta-ahorro": "Comparador Cuentas de Ahorro",
  "simulador-tarjeta-credito": "Simulador Tarjeta de Crédito",
  // Productividad
  "auditoria-tiempo": "Auditoría de Tiempo",
  "calculadora-pomodoro": "Calculadora Pomodoro",
  "matriz-eisenhower": "Matriz de Eisenhower",
  "valor-hora": "Valor de tu Hora",
  "vida-en-semanas": "Tu Vida en Semanas",
  "calculadora-habitos": "Calculadora de Hábitos",
  // Salud
  "calculadora-calorias": "Calorías (TDEE)",
  "calculadora-imc": "IMC",
  "calculadora-sueno": "Calculadora de Sueño",
  "calculadora-frecuencia-cardiaca": "Frecuencia Cardíaca",
  "calculadora-hidratacion": "Hidratación",
  // Herramientas
  "calculadora-porcentajes": "Porcentajes",
  "calculadora-descuentos": "Descuentos",
  "calculadora-iva": "Calculadora de IVA",
  "conversor-unidades": "Conversor de Unidades",
  "calculadora-diferencia-fechas": "Diferencia entre Fechas",
  "calculadora-dias-vividos": "Días Vividos",
  "calculadora-dividir-cuenta": "Dividir Cuenta",
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
