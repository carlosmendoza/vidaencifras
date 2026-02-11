"use client";

import Link from "next/link";
import { gradients } from "@/lib/colors";
import { ReactNode } from "react";
import { Icon } from "@/lib/icons";

type GradientKey = keyof typeof gradients;

interface CalculatorHeaderProps {
  title: string;
  description: string;
  emoji?: string; // Mantener por compatibilidad temporal
  icon?: string; // Cambiamos a string para usar el Icon manager o ReactNode
  iconElement?: ReactNode;
  gradient?: GradientKey | string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Componente reutilizable para el header de calculadoras
 * Incluye botón de volver, icono con gradiente, título y descripción
 */
export function CalculatorHeader({
  title,
  description,
  emoji,
  icon,
  iconElement,
  gradient = "finanzas",
  backHref = "/",
  backLabel = "Volver al inicio",
}: CalculatorHeaderProps) {
  // Obtener el gradiente desde el sistema de colores o usar uno personalizado
  const gradientClass = gradient in gradients
    ? gradients[gradient as GradientKey]
    : gradient;

  return (
    <>
      <Link
        href={backHref}
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors mb-8 block"
      >
        <span>←</span> {backLabel}
      </Link>

      <div className="text-center mb-10">
        <div
          className={`w-20 h-20 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white`}
        >
          {iconElement || <Icon name={icon || emoji || "calculator"} className="w-10 h-10" />}
        </div>
        <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {description}
        </p>
      </div>
    </>
  );
}
