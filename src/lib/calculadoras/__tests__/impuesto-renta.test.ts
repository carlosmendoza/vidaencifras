import { describe, it, expect } from "vitest";
import { calcularImpuestoRenta } from "../impuesto-renta";
import { UVT_2025 } from "../constantes";

describe("calcularImpuestoRenta", () => {
  it("retorna null si los ingresos son 0", () => {
    expect(calcularImpuestoRenta({
      ingresos: 0,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })).toBeNull();
  });

  it("no cobra impuesto si la renta líquida es menor a 1090 UVT", () => {
    // Ingresos bajos que queden por debajo de 1090 UVT después de deducciones
    const res = calcularImpuestoRenta({
      ingresos: 30000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    // Con deducciones automáticas (salud, pensión, 25%), debería quedar bajo 1090 UVT
    expect(res.impuestoRenta).toBe(0);
  });

  it("aplica tabla progresiva para ingresos altos", () => {
    const res = calcularImpuestoRenta({
      ingresos: 200000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    expect(res.impuestoRenta).toBeGreaterThan(0);
    expect(res.tarifaMarginal).toBeGreaterThan(0);
    expect(res.tarifaEfectiva).toBeGreaterThan(0);
    expect(res.tarifaEfectiva).toBeLessThan(res.tarifaMarginal);
  });

  it("deducciones reducen el impuesto", () => {
    const sinDed = calcularImpuestoRenta({
      ingresos: 150000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    const conDed = calcularImpuestoRenta({
      ingresos: 150000000,
      tipoTrabajador: "empleado",
      dependientes: 2,
      interesesVivienda: 20000000,
      medicinaPrepagada: 5000000,
      aportesVoluntarios: 10000000,
    })!;

    expect(conDed.impuestoRenta).toBeLessThan(sinDed.impuestoRenta);
  });

  it("independientes usan 40% como base de aportes", () => {
    const empleado = calcularImpuestoRenta({
      ingresos: 100000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    const independiente = calcularImpuestoRenta({
      ingresos: 100000000,
      tipoTrabajador: "independiente",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    // Independiente tiene menores aportes obligatorios -> mayor impuesto
    expect(independiente.desglose.aporteSalud).toBeLessThan(empleado.desglose.aporteSalud);
  });

  it("fondo de solidaridad aplica desde 4 SMMLV mensuales (48 UVT anuales)", () => {
    const bajo = calcularImpuestoRenta({
      ingresos: 50000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    const alto = calcularImpuestoRenta({
      ingresos: 200000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    expect(alto.desglose.fondoSolidaridad).toBeGreaterThan(0);
  });

  it("total deducciones no supera el límite del 40% ni 5040 UVT", () => {
    const res = calcularImpuestoRenta({
      ingresos: 200000000,
      tipoTrabajador: "empleado",
      dependientes: 4,
      interesesVivienda: 50000000,
      medicinaPrepagada: 20000000,
      aportesVoluntarios: 50000000,
    })!;

    const limite40 = 200000000 * 0.40;
    const limite5040 = 5040 * UVT_2025;
    expect(res.totalDeducciones).toBeLessThanOrEqual(Math.min(limite40, limite5040) + 1);
  });

  it("renta líquida en UVT es consistente", () => {
    const res = calcularImpuestoRenta({
      ingresos: 100000000,
      tipoTrabajador: "empleado",
      dependientes: 0,
      interesesVivienda: 0,
      medicinaPrepagada: 0,
      aportesVoluntarios: 0,
    })!;

    expect(res.rentaLiquidaUVT).toBeCloseTo(res.rentaLiquidaGravable / UVT_2025, 0);
  });
});
