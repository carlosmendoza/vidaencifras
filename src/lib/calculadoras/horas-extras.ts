import { HORAS_MES, TIPOS_HORA, type TipoHora } from "./constantes";

export type { TipoHora };

export interface HorasExtrasInput {
  salario: number;
  tipoHora: TipoHora;
  cantidad: number;
}

export interface HorasExtrasOutput {
  valorHoraBase: number;
  recargo: number;
  valorHoraTotal: number;
  totalHoras: number;
  totalPagar: number;
}

export function calcularHorasExtras(input: HorasExtrasInput): HorasExtrasOutput | null {
  const { salario, tipoHora, cantidad } = input;

  if (salario <= 0 || cantidad <= 0) return null;

  const valorHoraBase = salario / HORAS_MES;
  const tipoSeleccionado = TIPOS_HORA.find((t) => t.id === tipoHora);

  if (!tipoSeleccionado) return null;

  const recargo = valorHoraBase * tipoSeleccionado.recargo;
  const valorHoraTotal = valorHoraBase + recargo;
  const totalPagar = valorHoraTotal * cantidad;

  return {
    valorHoraBase,
    recargo,
    valorHoraTotal,
    totalHoras: cantidad,
    totalPagar,
  };
}
