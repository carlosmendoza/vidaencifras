import {
  SMMLV,
  AUXILIO_TRANSPORTE,
  TOPE_AUXILIO,
  UVT_2026,
  PORCENTAJE_SALUD,
  PORCENTAJE_PENSION,
  TABLA_RETENCION_ART_383,
} from "./constantes";

export interface SalarioNetoInput {
  salario: number;
  incluyeTransporte: boolean;
  calcularRetencion: boolean;
  dependientes: number;
  medicinaPrepagada: number;
  interesesVivienda: number;
  aportesAfc: number;
}

export interface SalarioNetoOutput {
  salarioBruto: number;
  auxilioTransporte: number;
  descuentoSalud: number;
  descuentoPension: number;
  fondoSolidaridad: number;
  retencionFuente: number;
  totalDescuentos: number;
  salarioNeto: number;
  baseGravable: number;
  deducciones: number;
  rentaExenta: number;
}

function calcularRetencionTabla(baseGravableUVT: number): number {
  for (const rango of TABLA_RETENCION_ART_383) {
    if (baseGravableUVT <= rango.hasta) {
      return rango.base + (baseGravableUVT - rango.desde) * rango.tarifa;
    }
  }
  // Último rango
  const ultimo = TABLA_RETENCION_ART_383[TABLA_RETENCION_ART_383.length - 1];
  return ultimo.base + (baseGravableUVT - ultimo.desde) * ultimo.tarifa;
}

export function calcularSalarioNeto(input: SalarioNetoInput): SalarioNetoOutput | null {
  const { salario, incluyeTransporte, calcularRetencion, dependientes, medicinaPrepagada, interesesVivienda, aportesAfc } = input;

  if (salario <= 0) return null;

  const aplicaAuxilio = incluyeTransporte && salario <= TOPE_AUXILIO;
  const auxilioTransporte = aplicaAuxilio ? AUXILIO_TRANSPORTE : 0;

  const descuentoSalud = salario * PORCENTAJE_SALUD;
  const descuentoPension = salario * PORCENTAJE_PENSION;

  let fondoSolidaridad = 0;
  if (salario >= SMMLV * 4) {
    fondoSolidaridad = salario * 0.01;
    if (salario >= SMMLV * 16) {
      fondoSolidaridad = salario * 0.02;
    }
  }

  let retencionFuente = 0;
  let baseGravable = 0;
  let deducciones = 0;
  let rentaExenta = 0;

  if (calcularRetencion) {
    const aportesObligatorios = descuentoSalud + descuentoPension + fondoSolidaridad;
    const ingresoLaboral = salario - aportesObligatorios;

    const deduccionDependientes = Math.min(
      dependientes * ingresoLaboral * 0.10,
      dependientes * 32 * UVT_2026
    );
    const deduccionMedicina = Math.min(medicinaPrepagada, 16 * UVT_2026);
    const deduccionIntereses = Math.min(interesesVivienda, 100 * UVT_2026);
    const deduccionAfc = Math.min(aportesAfc, ingresoLaboral * 0.30);

    deducciones = deduccionDependientes + deduccionMedicina + deduccionIntereses + deduccionAfc;

    const baseParaExencion = ingresoLaboral - deducciones;
    rentaExenta = Math.min(baseParaExencion * 0.25, 240 * UVT_2026);

    const limiteDeducciones = ingresoLaboral * 0.40;
    const totalBeneficios = deducciones + rentaExenta;

    if (totalBeneficios > limiteDeducciones) {
      const factor = limiteDeducciones / totalBeneficios;
      deducciones = deducciones * factor;
      rentaExenta = rentaExenta * factor;
    }

    baseGravable = Math.max(0, ingresoLaboral - deducciones - rentaExenta);

    const baseGravableUVT = baseGravable / UVT_2026;
    const retencionUVT = calcularRetencionTabla(baseGravableUVT);
    retencionFuente = Math.round(retencionUVT * UVT_2026);
  }

  const totalDescuentos = descuentoSalud + descuentoPension + fondoSolidaridad + retencionFuente;
  const salarioNeto = salario - totalDescuentos + auxilioTransporte;

  return {
    salarioBruto: salario,
    auxilioTransporte,
    descuentoSalud,
    descuentoPension,
    fondoSolidaridad,
    retencionFuente,
    totalDescuentos,
    salarioNeto,
    baseGravable,
    deducciones,
    rentaExenta,
  };
}
