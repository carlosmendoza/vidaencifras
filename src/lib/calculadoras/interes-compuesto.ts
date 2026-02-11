export type TipoTasa = "anual" | "mensual" | "nominal" | "efectiva_trimestral" | "efectiva_semestral";
export type FrecuenciaAporte = "mensual" | "trimestral" | "semestral" | "anual" | "ninguno";

export interface InteresCompuestoInput {
  capital: number;
  tasa: number; // Porcentaje (ej: 12 para 12%)
  tipoTasa: TipoTasa;
  tiempo: number; // Años
  frecuenciaCapitalizacion: number; // Periodos por año
  aportePeriodico: number;
  frecuenciaAporte: FrecuenciaAporte;
  aporteAlInicio: boolean;
}

export interface InteresCompuestoEvolucion {
  periodo: number;
  capital: number;
  aporteAcumulado: number;
  interesAcumulado: number;
}

export interface InteresCompuestoOutput {
  montoFinal: number;
  interesGanado: number;
  totalAportes: number;
  tasaEfectivaAnual: number;
  tasaEfectivaMensual: number;
  rendimientoTotal: number;
  evolucion: InteresCompuestoEvolucion[];
}

const FRECUENCIA_PERIODOS: Record<FrecuenciaAporte, number> = {
  ninguno: 0,
  mensual: 12,
  trimestral: 4,
  semestral: 2,
  anual: 1,
};

const TIPO_TASA_PERIODOS: Record<TipoTasa, number> = {
  anual: 1,
  mensual: 12,
  efectiva_trimestral: 4,
  efectiva_semestral: 2,
  nominal: 1,
};

export function calcularInteresCompuesto(input: InteresCompuestoInput): InteresCompuestoOutput | null {
  const { capital, tasa, tipoTasa, tiempo, frecuenciaCapitalizacion, aportePeriodico, frecuenciaAporte, aporteAlInicio } = input;
  const n = frecuenciaCapitalizacion;
  const aportesAnuales = FRECUENCIA_PERIODOS[frecuenciaAporte];
  const aporte = aportePeriodico || 0;

  if (isNaN(tasa) || isNaN(tiempo) || tiempo <= 0) return null;

  let tasaNominal: number;
  let tasaEfectivaAnual: number;

  if (tipoTasa === "nominal") {
    tasaNominal = tasa / 100;
    tasaEfectivaAnual = Math.pow(1 + tasaNominal / n, n) - 1;
  } else {
    const periodosDelTipo = TIPO_TASA_PERIODOS[tipoTasa];
    const tasaEfectivaPeriodo = tasa / 100;
    tasaEfectivaAnual = Math.pow(1 + tasaEfectivaPeriodo, periodosDelTipo) - 1;
    tasaNominal = n * (Math.pow(1 + tasaEfectivaAnual, 1 / n) - 1);
  }

  const tasaPeriodo = tasaNominal / n;
  const totalPeriodos = n * tiempo;

  // Calcular evolución año por año
  const evolucion: InteresCompuestoEvolucion[] = [];
  let capitalActual = capital;
  let totalAportesAcumulado = 0;
  let interesAcumulado = 0;

  const periodosCapitalizacionPorAporte = aportesAnuales > 0 ? n / aportesAnuales : 0;

  for (let anio = 1; anio <= tiempo; anio++) {
    const periodosEnAnio = n;
    let aporteEnAnio = 0;

    for (let periodo = 1; periodo <= periodosEnAnio; periodo++) {
      if (aportesAnuales > 0 && periodosCapitalizacionPorAporte > 0) {
        const esPeridodoAporte = periodo % periodosCapitalizacionPorAporte === 0 ||
          (periodosCapitalizacionPorAporte < 1 && true);

        if (esPeridodoAporte || (aportesAnuales >= n)) {
          const aportePorPeriodo = aporte;
          if (aporteAlInicio) {
            capitalActual += aportePorPeriodo / (aportesAnuales >= n ? n / aportesAnuales : 1);
            aporteEnAnio += aportePorPeriodo / (aportesAnuales >= n ? n / aportesAnuales : 1);
          }
        }
      }

      const interesDelPeriodo = capitalActual * tasaPeriodo;
      capitalActual += interesDelPeriodo;
      interesAcumulado += interesDelPeriodo;

      if (aportesAnuales > 0 && !aporteAlInicio) {
        if (periodosCapitalizacionPorAporte >= 1 && periodo % periodosCapitalizacionPorAporte === 0) {
          capitalActual += aporte;
          aporteEnAnio += aporte;
        } else if (periodosCapitalizacionPorAporte < 1) {
          const aportesPorPeriodo = Math.round(1 / periodosCapitalizacionPorAporte);
          capitalActual += aporte * aportesPorPeriodo;
          aporteEnAnio += aporte * aportesPorPeriodo;
        }
      }
    }

    totalAportesAcumulado += aporteEnAnio;

    evolucion.push({
      periodo: anio,
      capital: capitalActual,
      aporteAcumulado: totalAportesAcumulado,
      interesAcumulado,
    });
  }

  let montoFinal: number;
  let totalAportes: number;

  if (aportesAnuales === 0 || aporte === 0) {
    montoFinal = capital * Math.pow(1 + tasaPeriodo, totalPeriodos);
    totalAportes = 0;
  } else {
    montoFinal = capitalActual;
    totalAportes = totalAportesAcumulado;
  }

  const interesGanado = montoFinal - capital - totalAportes;
  const inversionTotal = capital + totalAportes;
  const rendimientoTotal = inversionTotal > 0 ? ((montoFinal - inversionTotal) / inversionTotal) * 100 : 0;

  const evolucionFinal: InteresCompuestoEvolucion[] = [];
  if (aportesAnuales === 0 || aporte === 0) {
    for (let anio = 1; anio <= tiempo; anio++) {
      const capitalEnAnio = capital * Math.pow(1 + tasaPeriodo, n * anio);
      evolucionFinal.push({
        periodo: anio,
        capital: capitalEnAnio,
        aporteAcumulado: 0,
        interesAcumulado: capitalEnAnio - capital,
      });
    }
  } else {
    evolucionFinal.push(...evolucion);
  }

  const tasaEfectivaMensual = (Math.pow(1 + tasaEfectivaAnual, 1 / 12) - 1) * 100;

  return {
    montoFinal,
    interesGanado,
    totalAportes,
    tasaEfectivaAnual: tasaEfectivaAnual * 100,
    tasaEfectivaMensual,
    rendimientoTotal,
    evolucion: evolucionFinal,
  };
}
