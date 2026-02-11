// Valores laborales Colombia 2026
export const SMMLV = 1_750_905;
export const AUXILIO_TRANSPORTE = 249_095;
export const TOPE_AUXILIO = SMMLV * 2;

// UVT (Unidad de Valor Tributario)
export const UVT_2025 = 49_799;
export const UVT_2026 = 52_374;

// Cesantías
export const TASA_INTERESES_CESANTIAS = 0.12;

// Jornada laboral 2026: 42 horas semanales
export const HORAS_MES = 182;

// Aportes obligatorios (parte del trabajador)
export const PORCENTAJE_SALUD = 0.04;
export const PORCENTAJE_PENSION = 0.04;

// Días de vacaciones por año trabajado
export const DIAS_VACACIONES_ANO = 15;

// Tabla de retención en la fuente Art. 383 ET (Procedimiento 1)
// Base gravable en UVT -> retención en UVT
export const TABLA_RETENCION_ART_383 = [
  { desde: 0, hasta: 95, base: 0, tarifa: 0 },
  { desde: 95, hasta: 150, base: 0, tarifa: 0.19 },
  { desde: 150, hasta: 360, base: 10.45, tarifa: 0.28 },
  { desde: 360, hasta: 640, base: 69.25, tarifa: 0.33 },
  { desde: 640, hasta: 945, base: 161.65, tarifa: 0.35 },
  { desde: 945, hasta: 2300, base: 268.40, tarifa: 0.37 },
  { desde: 2300, hasta: Infinity, base: 769.75, tarifa: 0.39 },
] as const;

// Tabla de tarifas marginales impuesto de renta (declaración anual)
export const TABLA_TARIFAS_RENTA = [
  { desde: 0, hasta: 1090, tarifa: 0, impuestoBase: 0 },
  { desde: 1090, hasta: 1700, tarifa: 0.19, impuestoBase: 0 },
  { desde: 1700, hasta: 4100, tarifa: 0.28, impuestoBase: 116 },
  { desde: 4100, hasta: 8670, tarifa: 0.33, impuestoBase: 788 },
  { desde: 8670, hasta: 18970, tarifa: 0.35, impuestoBase: 2296 },
  { desde: 18970, hasta: 31000, tarifa: 0.37, impuestoBase: 5901 },
  { desde: 31000, hasta: Infinity, tarifa: 0.39, impuestoBase: 10352 },
] as const;

// Límites de deducciones impuesto de renta
export const LIMITE_RENTA_EXENTA_25_UVT_MENSUAL = 240;
export const LIMITE_DEDUCCIONES_40_PORCENTAJE = 0.40;
export const LIMITE_TOTAL_DEDUCCIONES_UVT = 5040;

// Tipos de hora extra / recargo
export type TipoHora =
  | "extra_diurna"
  | "extra_nocturna"
  | "extra_dom_diurna"
  | "extra_dom_nocturna"
  | "recargo_nocturno"
  | "recargo_dominical"
  | "recargo_dom_nocturno";

export interface TipoHoraInfo {
  id: TipoHora;
  nombre: string;
  descripcion: string;
  recargo: number;
}

export const TIPOS_HORA: TipoHoraInfo[] = [
  { id: "extra_diurna", nombre: "Extra diurna", descripcion: "Lun-Sáb, 6am-9pm, después de jornada", recargo: 0.25 },
  { id: "extra_nocturna", nombre: "Extra nocturna", descripcion: "Lun-Sáb, 9pm-6am", recargo: 0.75 },
  { id: "extra_dom_diurna", nombre: "Extra dominical diurna", descripcion: "Dom/festivo, 6am-9pm", recargo: 1.00 },
  { id: "extra_dom_nocturna", nombre: "Extra dominical nocturna", descripcion: "Dom/festivo, 9pm-6am", recargo: 1.50 },
  { id: "recargo_nocturno", nombre: "Recargo nocturno", descripcion: "Trabajo normal 9pm-6am", recargo: 0.35 },
  { id: "recargo_dominical", nombre: "Recargo dominical", descripcion: "Trabajo normal dom/festivo", recargo: 0.75 },
  { id: "recargo_dom_nocturno", nombre: "Recargo dom. nocturno", descripcion: "Dom/festivo, 9pm-6am (normal)", recargo: 1.10 },
];

// Tasas de retención en la fuente por concepto
export type TipoRetencion = "servicios" | "honorarios" | "compras" | "arrendamiento";

export interface TasaRetencionInfo {
  tipo: TipoRetencion;
  nombre: string;
  descripcion: string;
  tasaDeclarante: number;
  tasaNoDeclarante: number;
  baseMinima: number; // En UVT
}

export const TASAS_RETENCION: TasaRetencionInfo[] = [
  { tipo: "servicios", nombre: "Servicios profesionales", descripcion: "Contratos de prestación de servicios", tasaDeclarante: 10, tasaNoDeclarante: 11, baseMinima: 4 },
  { tipo: "honorarios", nombre: "Honorarios", descripcion: "Servicios técnicos, de consultoría", tasaDeclarante: 10, tasaNoDeclarante: 11, baseMinima: 4 },
  { tipo: "compras", nombre: "Compras", descripcion: "Compra de bienes y productos", tasaDeclarante: 2.5, tasaNoDeclarante: 3.5, baseMinima: 27 },
  { tipo: "arrendamiento", nombre: "Arrendamiento", descripcion: "Alquiler de bienes muebles e inmuebles", tasaDeclarante: 3.5, tasaNoDeclarante: 4, baseMinima: 27 },
];
