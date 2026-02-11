import { gradients, textColors, bgHoverColors, shadowColors } from "./colors";

export interface Calculadora {
  nombre: string;
  descripcion: string;
  href: string;
  icon: string;
  gradient: string;
  categoria: "finanzas" | "salud" | "productividad" | "herramientas";
}

export interface Pilar {
  nombre: string;
  descripcion: string;
  href: string;
  icon: string;
  gradient: string;
  bgHover: string;
  color: string;
  cardHover: string;
  calculadoras: string[];
}

// Clases de hover para cards
export const cardHoverClasses = {
  salud: "card-hover-red",
  finanzas: "card-hover-emerald",
  productividad: "card-hover-amber",
  herramientas: "card-hover-indigo",
} as const;

// Pilares principales para la página de inicio
export const pilares: Pilar[] = [
  {
    nombre: "Salud",
    descripcion: "Cuida tu bienestar físico con datos precisos sobre calorías, IMC y más",
    href: "/salud",
    icon: "heart",
    gradient: gradients.salud,
    bgHover: bgHoverColors.salud,
    color: textColors.salud,
    cardHover: cardHoverClasses.salud,
    calculadoras: ["Calorías (TDEE)", "IMC", "Hidratación"],
  },
  {
    nombre: "Finanzas",
    descripcion: "Toma el control de tu dinero con herramientas de inversión y préstamos",
    href: "/finanzas",
    icon: "wallet",
    gradient: gradients.finanzas,
    bgHover: bgHoverColors.finanzas,
    color: textColors.finanzas,
    cardHover: cardHoverClasses.finanzas,
    calculadoras: ["Impuesto Renta", "CDTs", "Arriendo vs Compra"],
  },
  {
    nombre: "Productividad",
    descripcion: "Optimiza tu tiempo con herramientas de hábitos, metas y gestión personal",
    href: "/productividad",
    icon: "clock",
    gradient: gradients.productividad,
    bgHover: bgHoverColors.productividad,
    color: textColors.productividad,
    cardHover: cardHoverClasses.productividad,
    calculadoras: ["Matriz Eisenhower", "Pomodoro", "Valor Hora"],
  },
];

// Utilidades destacadas para la página de inicio
export const utilidadesDestacadas: Calculadora[] = [
  {
    nombre: "Calculadora de Porcentajes",
    descripcion: "Calcula cualquier porcentaje",
    href: "/herramientas/calculadora-porcentajes",
    icon: "percent",
    gradient: gradients.porcentajes,
    categoria: "herramientas",
  },
  {
    nombre: "Calculadora de Descuentos",
    descripcion: "Precio final y cuánto ahorras",
    href: "/herramientas/calculadora-descuentos",
    icon: "tag",
    gradient: gradients.descuentos,
    categoria: "herramientas",
  },
  {
    nombre: "Conversor de Unidades",
    descripcion: "Convierte longitud, peso y más",
    href: "/herramientas/conversor-unidades",
    icon: "refresh",
    gradient: gradients.conversor,
    categoria: "herramientas",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos",
    href: "/herramientas/calculadora-dividir-cuenta",
    icon: "receipt",
    gradient: gradients.dividir,
    categoria: "herramientas",
  },
];

// Todas las calculadoras por categoría
export const calculadorasFinanzas: Calculadora[] = [
  {
    nombre: "Interés Compuesto",
    descripcion: "Calcula cuánto crecerá tu dinero con el tiempo",
    href: "/finanzas/calculadora-interes-compuesto",
    icon: "trending-up",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Préstamos",
    descripcion: "Calcula cuotas y amortización de préstamos",
    href: "/finanzas/calculadora-prestamos",
    icon: "landmark",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Salario Neto",
    descripcion: "Calcula tu salario después de deducciones",
    href: "/finanzas/calculadora-salario-neto",
    icon: "banknote",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Liquidación Laboral",
    descripcion: "Calcula tu liquidación al terminar contrato",
    href: "/finanzas/calculadora-liquidacion",
    icon: "clipboard",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Prima de Servicios",
    descripcion: "Calcula tu prima semestral",
    href: "/finanzas/calculadora-prima",
    icon: "gift",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Cesantías",
    descripcion: "Calcula cesantías e intereses",
    href: "/finanzas/calculadora-cesantias",
    icon: "piggy-bank",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Horas Extras",
    descripcion: "Calcula el valor de tus horas extras",
    href: "/finanzas/calculadora-horas-extras",
    icon: "clock",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Vacaciones",
    descripcion: "Calcula tus días y valor de vacaciones",
    href: "/finanzas/calculadora-vacaciones",
    icon: "palmtree",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Impuesto de Renta",
    descripcion: "Estima tu impuesto de renta anual",
    href: "/finanzas/calculadora-impuesto-renta",
    icon: "landmark",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Comparador de CDTs",
    descripcion: "Compara tasas de CDT entre bancos",
    href: "/finanzas/comparador-cdt",
    icon: "bar-chart",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
  {
    nombre: "Arriendo vs Compra",
    descripcion: "¿Te conviene arrendar o comprar?",
    href: "/finanzas/arriendo-vs-compra",
    icon: "home",
    gradient: gradients.finanzas,
    categoria: "finanzas",
  },
];

export const calculadorasSalud: Calculadora[] = [
  {
    nombre: "Calorías (TDEE)",
    descripcion: "Calcula tu gasto calórico diario",
    href: "/salud/calculadora-calorias",
    icon: "flame",
    gradient: gradients.salud,
    categoria: "salud",
  },
  {
    nombre: "IMC",
    descripcion: "Calcula tu índice de masa corporal",
    href: "/salud/calculadora-imc",
    icon: "scale",
    gradient: gradients.salud,
    categoria: "salud",
  },
  {
    nombre: "Hidratación",
    descripcion: "Calcula cuánta agua debes tomar",
    href: "/salud/calculadora-hidratacion",
    icon: "droplets",
    gradient: gradients.salud,
    categoria: "salud",
  },
  {
    nombre: "Frecuencia Cardíaca",
    descripcion: "Calcula tus zonas de entrenamiento",
    href: "/salud/calculadora-frecuencia-cardiaca",
    icon: "heart",
    gradient: gradients.salud,
    categoria: "salud",
  },
  {
    nombre: "Sueño",
    descripcion: "Calcula tus ciclos de sueño ideales",
    href: "/salud/calculadora-sueno",
    icon: "moon",
    gradient: gradients.salud,
    categoria: "salud",
  },
];

export const calculadorasProductividad: Calculadora[] = [
  {
    nombre: "Valor Hora",
    descripcion: "Calcula cuánto vale tu hora de trabajo",
    href: "/productividad/valor-hora",
    icon: "gem",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
  {
    nombre: "Vida en Semanas",
    descripcion: "Visualiza tu vida en semanas",
    href: "/productividad/vida-en-semanas",
    icon: "calendar",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
  {
    nombre: "Auditoría de Tiempo",
    descripcion: "Analiza en qué gastas tu tiempo",
    href: "/productividad/auditoria-tiempo",
    icon: "search",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
  {
    nombre: "Hábitos",
    descripcion: "Calcula el impacto de tus hábitos",
    href: "/productividad/calculadora-habitos",
    icon: "target",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
  {
    nombre: "Matriz Eisenhower",
    descripcion: "Prioriza tareas por urgencia e importancia",
    href: "/productividad/matriz-eisenhower",
    icon: "grid",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
  {
    nombre: "Calculadora Pomodoro",
    descripcion: "Planifica tu sesión de trabajo",
    href: "/productividad/calculadora-pomodoro",
    icon: "timer",
    gradient: gradients.productividad,
    categoria: "productividad",
  },
];

// Helper para obtener el color de sombra por categoría
export function getShadowColor(categoria: keyof typeof shadowColors): string {
  return shadowColors[categoria];
}
