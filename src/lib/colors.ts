// Colores sólidos centralizados por categoría
export const gradients = {
  finanzas: "bg-teal-500",
  salud: "bg-red-500",
  productividad: "bg-orange-500",
  herramientas: "bg-purple-500",
} as const;

// Colores de texto por categoría
export const textColors = {
  finanzas: "text-teal-600 dark:text-teal-400",
  salud: "text-red-600 dark:text-red-400",
  productividad: "text-orange-600 dark:text-orange-400",
  herramientas: "text-purple-600 dark:text-purple-400",
} as const;

// Badges por categoría (para blog)
export const categoryBadgeColors = {
  finanzas: "bg-teal-500",
  salud: "bg-red-500",
  productividad: "bg-orange-500",
  herramientas: "bg-purple-500",
} as const;

// Colores para sombras de botones
export const shadowColors = {
  finanzas: "shadow-teal-500/20",
  salud: "shadow-red-500/20",
  productividad: "shadow-orange-500/20",
  herramientas: "shadow-purple-500/20",
} as const;

export type CategoryKey = keyof typeof gradients;
