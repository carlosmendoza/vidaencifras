// Datos del programa Mi Casa Ya y subsidios de vivienda en Colombia
// Última actualización: Enero 2026

// SMMLV 2026 (Salario Mínimo Mensual Legal Vigente)
export const SMMLV_2026 = 1750905;

// Límites del programa Mi Casa Ya
export const LIMITES_MI_CASA_YA = {
  // Vivienda de Interés Prioritario (VIP)
  vip: {
    valorMaximo: 70 * SMMLV_2026, // Hasta 70 SMMLV
    nombre: "VIP (Vivienda de Interés Prioritario)",
    descripcion: "Viviendas de hasta 70 SMMLV",
  },
  // Vivienda de Interés Social (VIS)
  vis: {
    valorMinimo: 70 * SMMLV_2026 + 1,
    valorMaximo: 150 * SMMLV_2026, // De 70 a 150 SMMLV
    nombre: "VIS (Vivienda de Interés Social)",
    descripcion: "Viviendas entre 70 y 150 SMMLV",
  },
};

// Montos de subsidio según ingresos
export interface SubsidioConfig {
  ingresosMin: number; // en SMMLV
  ingresosMax: number; // en SMMLV
  subsidioVIP: number; // en SMMLV
  subsidioVIS: number; // en SMMLV
  coberturaTasa: boolean; // Si aplica cobertura a la tasa de interés
}

export const SUBSIDIOS_INGRESOS: SubsidioConfig[] = [
  {
    ingresosMin: 0,
    ingresosMax: 2,
    subsidioVIP: 30,
    subsidioVIS: 20,
    coberturaTasa: true,
  },
  {
    ingresosMin: 2,
    ingresosMax: 4,
    subsidioVIP: 20,
    subsidioVIS: 20,
    coberturaTasa: true,
  },
];

// Requisitos del programa
export const REQUISITOS_MI_CASA_YA = [
  "Ser colombiano mayor de edad",
  "No ser propietario de vivienda en Colombia",
  "No haber recibido subsidio de vivienda anteriormente",
  "Ingresos familiares de hasta 4 SMMLV",
  "Tener aprobación de crédito hipotecario",
  "No estar reportado en centrales de riesgo (según política del banco)",
  "La vivienda debe ser nueva (no usada)",
  "La vivienda debe ser para uso propio, no inversión",
];

// Documentos necesarios
export const DOCUMENTOS_REQUERIDOS = [
  "Cédula de ciudadanía",
  "Certificado de ingresos o desprendibles de nómina",
  "Declaración de renta (si aplica)",
  "Certificado de tradición y libertad de la vivienda",
  "Promesa de compraventa o contrato",
  "Aprobación de crédito hipotecario",
  "Certificado de no propiedad del Registro de Instrumentos Públicos",
  "Certificado de no subsidio anterior del FNA",
];

// Calcular elegibilidad y subsidio
export interface ResultadoElegibilidad {
  esElegible: boolean;
  razones: string[];
  tipoVivienda: "vip" | "vis" | "no_aplica";
  subsidioMonto: number;
  subsidioSMMLV: number;
  coberturaTasa: boolean;
  cuotaSinSubsidio: number;
  cuotaConSubsidio: number;
  ahorroMensual: number;
}

export function calcularElegibilidad(
  valorVivienda: number,
  ingresosFamiliares: number,
  esPropietario: boolean,
  tuvoSubsidio: boolean
): ResultadoElegibilidad {
  const razones: string[] = [];
  let esElegible = true;

  // Verificar si es propietario
  if (esPropietario) {
    esElegible = false;
    razones.push("Ya eres propietario de una vivienda");
  }

  // Verificar subsidio anterior
  if (tuvoSubsidio) {
    esElegible = false;
    razones.push("Ya recibiste un subsidio de vivienda anteriormente");
  }

  // Verificar ingresos
  const ingresosSMMLV = ingresosFamiliares / SMMLV_2026;
  if (ingresosSMMLV > 4) {
    esElegible = false;
    razones.push("Los ingresos familiares superan 4 SMMLV");
  }

  // Determinar tipo de vivienda
  let tipoVivienda: "vip" | "vis" | "no_aplica" = "no_aplica";
  if (valorVivienda <= LIMITES_MI_CASA_YA.vip.valorMaximo) {
    tipoVivienda = "vip";
  } else if (valorVivienda <= LIMITES_MI_CASA_YA.vis.valorMaximo) {
    tipoVivienda = "vis";
  } else {
    esElegible = false;
    razones.push("El valor de la vivienda supera el límite de 150 SMMLV");
  }

  // Calcular subsidio
  let subsidioSMMLV = 0;
  let coberturaTasa = false;

  if (esElegible) {
    const rangoSubsidio = SUBSIDIOS_INGRESOS.find(
      (s) => ingresosSMMLV >= s.ingresosMin && ingresosSMMLV <= s.ingresosMax
    );

    if (rangoSubsidio) {
      subsidioSMMLV = tipoVivienda === "vip" ? rangoSubsidio.subsidioVIP : rangoSubsidio.subsidioVIS;
      coberturaTasa = rangoSubsidio.coberturaTasa;
    }
  }

  const subsidioMonto = subsidioSMMLV * SMMLV_2026;

  // Calcular cuotas aproximadas (15 años, 12% EA)
  const montoCredito = valorVivienda - subsidioMonto;
  const tasaMensual = 0.12 / 12;
  const plazoMeses = 180;

  const cuotaSinSubsidio =
    valorVivienda * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) /
    (Math.pow(1 + tasaMensual, plazoMeses) - 1);

  const cuotaConSubsidio =
    montoCredito > 0
      ? montoCredito * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) /
        (Math.pow(1 + tasaMensual, plazoMeses) - 1)
      : 0;

  // Si aplica cobertura a la tasa, reducir la cuota adicionalmente
  const cuotaFinal = coberturaTasa ? cuotaConSubsidio * 0.85 : cuotaConSubsidio;

  if (esElegible && razones.length === 0) {
    razones.push("Cumples con todos los requisitos del programa Mi Casa Ya");
  }

  return {
    esElegible,
    razones,
    tipoVivienda,
    subsidioMonto,
    subsidioSMMLV,
    coberturaTasa,
    cuotaSinSubsidio,
    cuotaConSubsidio: cuotaFinal,
    ahorroMensual: cuotaSinSubsidio - cuotaFinal,
  };
}
