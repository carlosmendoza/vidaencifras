import {
  UVT_2026,
  TABLA_TARIFAS_RENTA,
  LIMITE_RENTA_EXENTA_25_UVT_MENSUAL,
  LIMITE_DEDUCCIONES_40_PORCENTAJE,
  LIMITE_TOTAL_DEDUCCIONES_UVT,
} from "./constantes";

export type TipoTrabajador = "empleado" | "independiente";

export interface ImpuestoRentaInput {
  ingresos: number; // Anuales brutos
  tipoTrabajador: TipoTrabajador;
  dependientes: number;
  interesesVivienda: number;
  medicinaPrepagada: number;
  aportesVoluntarios: number;
}

export interface ImpuestoRentaDesglose {
  aporteSalud: number;
  aportePension: number;
  fondoSolidaridad: number;
  dependientes: number;
  interesesVivienda: number;
  medicinaPrepagada: number;
}

export interface ImpuestoRentaOutput {
  ingresosBrutos: number;
  totalDeducciones: number;
  rentaExenta25: number;
  rentaLiquidaGravable: number;
  rentaLiquidaUVT: number;
  impuestoRenta: number;
  tarifaEfectiva: number;
  tarifaMarginal: number;
  rangoAplicable: string;
  desglose: ImpuestoRentaDesglose;
}

export function calcularImpuestoRenta(input: ImpuestoRentaInput): ImpuestoRentaOutput | null {
  const { ingresos, tipoTrabajador, dependientes, interesesVivienda, medicinaPrepagada, aportesVoluntarios } = input;

  if (ingresos <= 0) return null;

  // Aportes obligatorios
  const baseAportes = tipoTrabajador === "empleado" ? ingresos : ingresos * 0.4;
  const aporteSalud = baseAportes * 0.04;
  const aportePension = baseAportes * 0.04;
  const fondoSolidaridad = ingresos > UVT_2026 * 4 * 12 ? baseAportes * 0.01 : 0;

  // Dependientes: 10% de ingresos, máx 32 UVT mensuales
  const limiteDependientes = 32 * UVT_2026 * 12;
  const deduccionDependientes = Math.min(ingresos * 0.10 * dependientes, limiteDependientes);

  // Intereses de vivienda: máx 100 UVT mensuales
  const limiteIntereses = 100 * UVT_2026 * 12;
  const deduccionIntereses = Math.min(interesesVivienda, limiteIntereses);

  // Medicina prepagada: máx 16 UVT mensuales
  const limiteMedicina = 16 * UVT_2026 * 12;
  const deduccionMedicina = Math.min(medicinaPrepagada, limiteMedicina);

  // Aportes voluntarios AFC/FPV
  const limiteAportes = ingresos * 0.30;
  const deduccionAportes = Math.min(aportesVoluntarios, limiteAportes);

  // Total deducciones (sin 25% renta exenta)
  const totalDeduccionesSinExenta = aporteSalud + aportePension + fondoSolidaridad +
    deduccionDependientes + deduccionIntereses + deduccionMedicina + deduccionAportes;

  // Renta líquida antes del 25%
  const rentaAntesExenta = Math.max(0, ingresos - totalDeduccionesSinExenta);

  // 25% renta exenta (máx 240 UVT mensuales = 2880 anuales)
  const limiteExenta25 = LIMITE_RENTA_EXENTA_25_UVT_MENSUAL * 12 * UVT_2026;
  const rentaExenta25 = Math.min(rentaAntesExenta * 0.25, limiteExenta25);

  // Verificar límite del 40%
  const limiteDeducciones40 = ingresos * LIMITE_DEDUCCIONES_40_PORCENTAJE;
  const totalConExenta = totalDeduccionesSinExenta + rentaExenta25;

  // Aplicar límite de 5040 UVT o 40%
  const limiteFinal = Math.min(limiteDeducciones40, LIMITE_TOTAL_DEDUCCIONES_UVT * UVT_2026);
  const totalDeduccionesAplicadas = Math.min(totalConExenta, limiteFinal);

  // Renta líquida gravable
  const rentaLiquidaGravable = Math.max(0, ingresos - totalDeduccionesAplicadas);
  const rentaLiquidaUVT = rentaLiquidaGravable / UVT_2026;

  // Calcular impuesto según tabla
  let impuesto = 0;
  let tarifaMarginal = 0;
  let rangoAplicable = "";

  for (const rango of TABLA_TARIFAS_RENTA) {
    if (rentaLiquidaUVT > rango.desde && rentaLiquidaUVT <= rango.hasta) {
      impuesto = (rango.impuestoBase + (rentaLiquidaUVT - rango.desde) * rango.tarifa) * UVT_2026;
      tarifaMarginal = rango.tarifa;
      rangoAplicable = `${rango.desde.toLocaleString()} - ${rango.hasta === Infinity ? "∞" : rango.hasta.toLocaleString()} UVT`;
      break;
    }
  }

  // Si excede el último rango
  if (rentaLiquidaUVT > 31000) {
    const ultimoRango = TABLA_TARIFAS_RENTA[TABLA_TARIFAS_RENTA.length - 1];
    impuesto = (ultimoRango.impuestoBase + (rentaLiquidaUVT - ultimoRango.desde) * ultimoRango.tarifa) * UVT_2026;
    tarifaMarginal = ultimoRango.tarifa;
    rangoAplicable = "Más de 31.000 UVT";
  }

  const tarifaEfectiva = (impuesto / ingresos) * 100;

  return {
    ingresosBrutos: ingresos,
    totalDeducciones: totalDeduccionesAplicadas,
    rentaExenta25,
    rentaLiquidaGravable,
    rentaLiquidaUVT,
    impuestoRenta: impuesto,
    tarifaEfectiva,
    tarifaMarginal: tarifaMarginal * 100,
    rangoAplicable,
    desglose: {
      aporteSalud,
      aportePension,
      fondoSolidaridad,
      dependientes: deduccionDependientes,
      interesesVivienda: deduccionIntereses,
      medicinaPrepagada: deduccionMedicina,
    },
  };
}
