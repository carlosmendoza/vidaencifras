import { DIAS_VACACIONES_ANO } from "./constantes";

export interface VacacionesInput {
  salario: number;
  fechaIngreso: string; // YYYY-MM-DD
  diasTomados: number;
  fechaReferencia?: string; // Para tests: fecha "hoy" (default: hoy real)
}

export interface VacacionesOutput {
  diasHabiles: number;
  diasCalendario: number;
  valorVacaciones: number;
  valorPorDia: number;
  diasPendientes: number;
  valorPendiente: number;
}

export function calcularVacaciones(input: VacacionesInput): VacacionesOutput | null {
  const { salario, fechaIngreso, diasTomados, fechaReferencia } = input;

  if (salario <= 0 || !fechaIngreso) return null;

  const inicio = new Date(fechaIngreso);
  const hoy = fechaReferencia ? new Date(fechaReferencia) : new Date();

  const diffTime = hoy.getTime() - inicio.getTime();
  const diasTrabajados = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diasTrabajados < 0) return null;

  const diasHabilesGanados = (diasTrabajados * DIAS_VACACIONES_ANO) / 360;
  const diasHabiles = Math.max(0, diasHabilesGanados - diasTomados);

  const diasCalendario = Math.round(diasHabiles * 1.4);

  const valorPorDia = salario / 30;
  const valorVacaciones = valorPorDia * diasHabiles;

  const diasPendientes = diasHabiles;
  const valorPendiente = valorVacaciones;

  return {
    diasHabiles: Math.round(diasHabiles * 10) / 10,
    diasCalendario,
    valorVacaciones,
    valorPorDia,
    diasPendientes: Math.round(diasPendientes * 10) / 10,
    valorPendiente,
  };
}
