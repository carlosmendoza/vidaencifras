export { calcularLiquidacion } from "./liquidacion";
export type { LiquidacionInput, LiquidacionOutput, TipoTerminacion, TipoContrato } from "./liquidacion";

export { calcularCesantias } from "./cesantias";
export type { CesantiasInput, CesantiasOutput } from "./cesantias";

export { calcularPrima } from "./prima";
export type { PrimaInput, PrimaOutput, PeriodoPrima } from "./prima";

export { calcularSalarioNeto } from "./salario-neto";
export type { SalarioNetoInput, SalarioNetoOutput } from "./salario-neto";

export { calcularInteresCompuesto } from "./interes-compuesto";
export type { InteresCompuestoInput, InteresCompuestoOutput, TipoTasa, FrecuenciaAporte } from "./interes-compuesto";

export { calcularPrestamo } from "./prestamos";
export type { PrestamoInput, PrestamoOutput, AmortizacionFila } from "./prestamos";

export { calcularHorasExtras } from "./horas-extras";
export type { HorasExtrasInput, HorasExtrasOutput } from "./horas-extras";

export { calcularVacaciones } from "./vacaciones";
export type { VacacionesInput, VacacionesOutput } from "./vacaciones";

export { calcularImpuestoRenta } from "./impuesto-renta";
export type { ImpuestoRentaInput, ImpuestoRentaOutput, TipoTrabajador } from "./impuesto-renta";

export { calcularRetencionFuente } from "./retencion-fuente";
export type { RetencionFuenteInput, RetencionFuenteOutput } from "./retencion-fuente";
