import {
  AUXILIO_TRANSPORTE,
  TOPE_AUXILIO,
  TASA_INTERESES_CESANTIAS,
} from "./constantes";

export interface CesantiasInput {
  salario: number;
  incluyeTransporte: boolean;
  fechaIngreso?: string; // YYYY-MM-DD, vacío = año completo
  fechaCorte?: string; // YYYY-MM-DD, vacío = 31 dic del año actual basado en fechaReferencia
  fechaReferencia?: string; // Para tests: fecha "hoy" (default: hoy real)
}

export interface CesantiasOutput {
  salarioBase: number;
  aplicaAuxilio: boolean;
  diasTrabajados: number;
  cesantias: number;
  interesesCesantias: number;
  total: number;
}

export function calcularCesantias(input: CesantiasInput): CesantiasOutput | null {
  const { salario, incluyeTransporte, fechaIngreso, fechaCorte, fechaReferencia } = input;

  if (salario <= 0) return null;

  const aplicaAuxilio = incluyeTransporte && salario <= TOPE_AUXILIO;
  const salarioBase = salario + (aplicaAuxilio ? AUXILIO_TRANSPORTE : 0);

  // Calcular días trabajados
  let diasTrabajados: number;

  if (!fechaIngreso) {
    diasTrabajados = 360;
  } else {
    const inicio = new Date(fechaIngreso);
    const ref = fechaReferencia ? new Date(fechaReferencia) : new Date();
    const fin = fechaCorte ? new Date(fechaCorte) : new Date(ref.getFullYear(), 11, 31);

    const añoCorte = fin.getFullYear();
    const inicioAño = new Date(añoCorte, 0, 1);
    const fechaInicial = inicio > inicioAño ? inicio : inicioAño;

    const diffTime = fin.getTime() - fechaInicial.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    diasTrabajados = Math.min(Math.max(diffDays, 0), 360);
  }

  const cesantias = (salarioBase * diasTrabajados) / 360;
  const interesesCesantias = (cesantias * TASA_INTERESES_CESANTIAS * diasTrabajados) / 360;

  return {
    salarioBase,
    aplicaAuxilio,
    diasTrabajados,
    cesantias,
    interesesCesantias,
    total: cesantias + interesesCesantias,
  };
}
