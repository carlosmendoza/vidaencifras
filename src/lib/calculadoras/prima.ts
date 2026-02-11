import {
  AUXILIO_TRANSPORTE,
  TOPE_AUXILIO,
} from "./constantes";

export type PeriodoPrima = "junio" | "diciembre";

export interface PrimaInput {
  salario: number;
  incluyeTransporte: boolean;
  fechaIngreso?: string; // YYYY-MM-DD, vacío = semestre completo
  periodo: PeriodoPrima;
  fechaReferencia?: string; // Para tests: año de referencia
}

export interface PrimaOutput {
  salarioBase: number;
  aplicaAuxilio: boolean;
  diasTrabajados: number;
  prima: number;
}

export function calcularPrima(input: PrimaInput): PrimaOutput | null {
  const { salario, incluyeTransporte, fechaIngreso, periodo, fechaReferencia } = input;

  if (salario <= 0) return null;

  const aplicaAuxilio = incluyeTransporte && salario <= TOPE_AUXILIO;
  const salarioBase = salario + (aplicaAuxilio ? AUXILIO_TRANSPORTE : 0);

  // Calcular días trabajados en el semestre
  let diasTrabajados: number;

  if (!fechaIngreso) {
    diasTrabajados = 180;
  } else {
    const inicio = new Date(fechaIngreso);
    const ref = fechaReferencia ? new Date(fechaReferencia) : new Date();
    const año = ref.getFullYear();

    let inicioSemestre: Date;
    let finSemestre: Date;

    if (periodo === "junio") {
      inicioSemestre = new Date(año, 0, 1);
      finSemestre = new Date(año, 5, 30);
    } else {
      inicioSemestre = new Date(año, 6, 1);
      finSemestre = new Date(año, 11, 31);
    }

    if (inicio <= inicioSemestre) {
      diasTrabajados = 180;
    } else if (inicio > finSemestre) {
      diasTrabajados = 0;
    } else {
      const diffTime = finSemestre.getTime() - inicio.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      diasTrabajados = Math.min(diffDays, 180);
    }
  }

  const prima = (salarioBase * diasTrabajados) / 360;

  return {
    salarioBase,
    aplicaAuxilio,
    diasTrabajados,
    prima,
  };
}
