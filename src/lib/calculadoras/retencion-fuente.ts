import {
  UVT_2026,
  TASAS_RETENCION,
  type TipoRetencion,
} from "./constantes";

export type { TipoRetencion };

export interface RetencionFuenteInput {
  tipoRetencion: TipoRetencion;
  esDeclarante: boolean;
  valorBruto: number;
}

export interface RetencionFuenteOutput {
  valorBruto: number;
  baseGravable: number;
  retencion: number;
  netoRecibir: number;
  tasaAplicada: number;
  superaBaseMinima: boolean;
  baseMinimaPesos: number;
}

export function calcularRetencionFuente(input: RetencionFuenteInput): RetencionFuenteOutput | null {
  const { tipoRetencion, esDeclarante, valorBruto } = input;

  if (valorBruto <= 0) return null;

  const tasaActual = TASAS_RETENCION.find((t) => t.tipo === tipoRetencion);
  if (!tasaActual) return null;

  const baseMinimaPesos = tasaActual.baseMinima * UVT_2026;
  const superaBaseMinima = valorBruto >= baseMinimaPesos;

  const tasaAplicada = esDeclarante ? tasaActual.tasaDeclarante : tasaActual.tasaNoDeclarante;
  const retencion = superaBaseMinima ? valorBruto * (tasaAplicada / 100) : 0;
  const netoRecibir = valorBruto - retencion;

  return {
    valorBruto,
    baseGravable: valorBruto,
    retencion,
    netoRecibir,
    tasaAplicada,
    superaBaseMinima,
    baseMinimaPesos,
  };
}
