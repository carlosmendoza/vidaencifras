export interface DatoDelDia {
  numero: string;
  unidad?: string;
  dato: string;
  calculadora: string;
  nombreCalculadora: string;
  gradient: string;
}

export const datosDelDia: DatoDelDia[] = [
  {
    numero: "72",
    dato: "Divide 72 entre la tasa de interés y sabrás en cuántos años se duplica tu dinero. Al 8% anual, tu plata se duplica en 9 años.",
    calculadora: "/finanzas/calculadora-interes-compuesto",
    nombreCalculadora: "Calculadora de interés compuesto",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    numero: "30%",
    dato: "Es el máximo de tus ingresos que deberías destinar a vivienda (arriendo o cuota de crédito). Pasarte de ahí compromete tu estabilidad financiera.",
    calculadora: "/finanzas/arriendo-vs-compra",
    nombreCalculadora: "Arriendo vs. compra",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    numero: "25",
    unidad: "min",
    dato: "La técnica Pomodoro divide tu trabajo en bloques de 25 minutos con descansos cortos. Es una de las formas más simples de vencer la procrastinación.",
    calculadora: "/productividad/calculadora-pomodoro",
    nombreCalculadora: "Calculadora Pomodoro",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    numero: "~28%",
    dato: "Es lo que se descuenta de tu salario bruto en Colombia entre salud, pensión y fondo de solidaridad. Tu neto real es bastante menor al que pactaste.",
    calculadora: "/finanzas/calculadora-salario-neto",
    nombreCalculadora: "Calculadora de salario neto",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    numero: "1.300",
    unidad: "UVT",
    dato: "Si tus ingresos brutos anuales superan 1.300 UVT (~$69 millones en 2025), estás obligado a declarar renta en Colombia.",
    calculadora: "/finanzas/calculadora-impuesto-renta",
    nombreCalculadora: "Calculadora de impuesto de renta",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    numero: "2,5",
    unidad: "litros",
    dato: "Es la cantidad de agua recomendada al día para un adulto promedio. La mayoría de colombianos no llegan ni a la mitad.",
    calculadora: "/salud/calculadora-hidratacion",
    nombreCalculadora: "Calculadora de hidratación",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    numero: "80/20",
    dato: "El principio de Pareto: el 20% de tus tareas genera el 80% de tus resultados. La matriz de Eisenhower te ayuda a identificarlas.",
    calculadora: "/productividad/matriz-eisenhower",
    nombreCalculadora: "Matriz de Eisenhower",
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    numero: "4.300",
    unidad: "semanas",
    dato: "Es lo que vive en promedio un colombiano. Visualizar tu vida en semanas cambia la forma en que priorizas tu tiempo.",
    calculadora: "/productividad/vida-en-semanas",
    nombreCalculadora: "Vida en semanas",
    gradient: "from-slate-600 to-zinc-700",
  },
  {
    numero: "~50%",
    dato: "En los primeros años de un crédito hipotecario, casi la mitad de tu cuota son intereses. Abonos extra al inicio tienen un impacto enorme.",
    calculadora: "/finanzas/calculadora-prestamos",
    nombreCalculadora: "Calculadora de préstamos",
    gradient: "from-orange-500 to-red-500",
  },
  {
    numero: "2.080",
    unidad: "horas",
    dato: "Es lo que trabajas al año con jornada completa (40h × 52 semanas). Conocer el valor real de cada hora cambia cómo negocias tu salario.",
    calculadora: "/productividad/valor-hora",
    nombreCalculadora: "Valor de tu hora",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    numero: "49.799",
    unidad: "COP",
    dato: "Es el valor de la UVT en 2025, la unidad con la que se calculan impuestos, retenciones y beneficios tributarios en Colombia.",
    calculadora: "/finanzas/calculadora-retencion-fuente",
    nombreCalculadora: "Calculadora de retención en la fuente",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    numero: "10%",
    dato: "Ahorrar el 10% de tu ingreso desde los 25 años, invertido con disciplina, puede darte libertad financiera antes de los 55.",
    calculadora: "/finanzas/calculadora-interes-compuesto",
    nombreCalculadora: "Calculadora de interés compuesto",
    gradient: "from-lime-500 to-green-600",
  },
];
