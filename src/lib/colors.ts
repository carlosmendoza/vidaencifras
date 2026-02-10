// Gradientes centralizados por categoría
export const gradients = {
  // Categorías principales
  finanzas: "from-emerald-400 to-teal-500",
  salud: "from-orange-400 to-red-500",
  productividad: "from-amber-400 to-orange-500",
  herramientas: "from-indigo-400 to-purple-500",

  // Gradientes adicionales para utilidades
  porcentajes: "from-cyan-400 to-blue-500",
  descuentos: "from-pink-400 to-rose-500",
  conversor: "from-indigo-400 to-purple-500",
  dividir: "from-amber-400 to-orange-500",

  // Gradientes para métricas
  azul: "from-blue-400 to-indigo-500",
  morado: "from-purple-400 to-pink-500",
  verde: "from-green-400 to-emerald-500",
} as const;

// Colores de texto por categoría
export const textColors = {
  finanzas: "text-emerald-600 dark:text-emerald-400",
  salud: "text-red-600 dark:text-red-400",
  productividad: "text-amber-600 dark:text-amber-400",
  herramientas: "text-indigo-600 dark:text-indigo-400",
} as const;

// Colores de fondo hover por categoría
export const bgHoverColors = {
  finanzas: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  salud: "group-hover:bg-red-50 dark:group-hover:bg-red-950/50",
  productividad: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  herramientas: "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50",
} as const;

// Badges por categoría (para blog)
export const categoryBadgeColors = {
  finanzas: "from-emerald-500 to-teal-500",
  salud: "from-orange-500 to-red-500",
  productividad: "from-amber-500 to-orange-500",
  herramientas: "from-indigo-500 to-purple-500",
} as const;

// Colores para sombras de botones
export const shadowColors = {
  finanzas: "shadow-emerald-500/20",
  salud: "shadow-red-500/20",
  productividad: "shadow-amber-500/20",
  herramientas: "shadow-indigo-500/20",
} as const;

export type CategoryKey = keyof typeof gradients;
