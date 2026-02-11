import {
  AUXILIO_TRANSPORTE,
  SMMLV,
  TOPE_AUXILIO,
  TASA_INTERESES_CESANTIAS,
} from "./constantes";

export type TipoTerminacion =
  | "renuncia"
  | "despido_justa_causa"
  | "despido_sin_justa_causa"
  | "fin_contrato";

export type TipoContrato = "indefinido" | "fijo";

export interface LiquidacionInput {
  salario: number;
  incluyeTransporte: boolean;
  fechaIngreso: string; // YYYY-MM-DD
  fechaSalida: string; // YYYY-MM-DD
  tipoTerminacion: TipoTerminacion;
  tipoContrato: TipoContrato;
  diasVacacionesPendientes?: number;
}

export interface LiquidacionOutput {
  salarioBase: number;
  aplicaAuxilio: boolean;
  diasTrabajados: number;
  añosTrabajados: number;
  diasAñoActual: number;
  diasSemestreActual: number;
  prima: number;
  cesantias: number;
  interesesCesantias: number;
  diasVacaciones: number;
  vacaciones: number;
  indemnizacion: number;
  totalLiquidacion: number;
}

export function calcularLiquidacion(input: LiquidacionInput): LiquidacionOutput | null {
  const { salario, incluyeTransporte, fechaIngreso, fechaSalida, tipoTerminacion, tipoContrato, diasVacacionesPendientes } = input;

  if (salario <= 0 || !fechaIngreso || !fechaSalida) return null;

  const aplicaAuxilio = incluyeTransporte && salario <= TOPE_AUXILIO;
  const salarioBase = salario + (aplicaAuxilio ? AUXILIO_TRANSPORTE : 0);
  const salarioDia = salario / 30;

  // Tiempo trabajado
  const inicio = new Date(fechaIngreso);
  const fin = new Date(fechaSalida);
  const diffTime = fin.getTime() - inicio.getTime();
  const diasTrabajados = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1, 0);
  const añosTrabajados = diasTrabajados / 360;

  // Días del año actual (para cesantías)
  const inicioAño = new Date(fin.getFullYear(), 0, 1);
  const fechaInicialAño = inicio > inicioAño ? inicio : inicioAño;
  const diffAño = fin.getTime() - fechaInicialAño.getTime();
  const diasAñoActual = Math.min(Math.max(Math.ceil(diffAño / (1000 * 60 * 60 * 24)) + 1, 0), 360);

  // Días del semestre actual (para prima)
  const mes = fin.getMonth();
  const año = fin.getFullYear();
  const inicioSemestre = mes < 6 ? new Date(año, 0, 1) : new Date(año, 6, 1);
  const fechaInicialSemestre = inicio > inicioSemestre ? inicio : inicioSemestre;
  const diffSemestre = fin.getTime() - fechaInicialSemestre.getTime();
  const diasSemestreActual = Math.min(Math.max(Math.ceil(diffSemestre / (1000 * 60 * 60 * 24)) + 1, 0), 180);

  // Prestaciones
  const prima = (salarioBase * diasSemestreActual) / 360;
  const cesantias = (salarioBase * diasAñoActual) / 360;
  const interesesCesantias = (cesantias * TASA_INTERESES_CESANTIAS * diasAñoActual) / 360;

  // Vacaciones
  const diasVacaciones = diasVacacionesPendientes != null && diasVacacionesPendientes >= 0
    ? diasVacacionesPendientes
    : (diasTrabajados * 15) / 360;
  const vacaciones = salarioDia * diasVacaciones;

  // Indemnización
  let indemnizacion = 0;
  if (tipoTerminacion === "despido_sin_justa_causa") {
    if (tipoContrato === "fijo") {
      indemnizacion = 0; // Requiere días restantes del contrato
    } else {
      // Contrato indefinido
      const añosCompletos = Math.floor(añosTrabajados);
      const salarioAlto = salario >= SMMLV * 10;

      if (añosTrabajados < 1) {
        indemnizacion = salarioDia * 30;
      } else {
        indemnizacion = salarioDia * 30; // Primer año
        const añosAdicionales = añosCompletos - 1;
        const diasPorAñoAdicional = salarioAlto ? 15 : 20;
        indemnizacion += salarioDia * diasPorAñoAdicional * añosAdicionales;
        const fraccionAño = añosTrabajados - añosCompletos;
        indemnizacion += salarioDia * diasPorAñoAdicional * fraccionAño;
      }
    }
  }

  const totalLiquidacion = prima + cesantias + interesesCesantias + vacaciones + indemnizacion;

  return {
    salarioBase,
    aplicaAuxilio,
    diasTrabajados,
    añosTrabajados,
    diasAñoActual,
    diasSemestreActual,
    prima,
    cesantias,
    interesesCesantias,
    diasVacaciones,
    vacaciones,
    indemnizacion,
    totalLiquidacion,
  };
}
