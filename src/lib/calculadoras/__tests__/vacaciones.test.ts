import { describe, it, expect } from "vitest";
import { calcularVacaciones } from "../vacaciones";

describe("calcularVacaciones", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularVacaciones({
      salario: 0,
      fechaIngreso: "2023-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-01-01",
    })).toBeNull();
  });

  it("retorna null si no hay fecha de ingreso", () => {
    expect(calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "",
      diasTomados: 0,
    })).toBeNull();
  });

  it("retorna null si la fecha de ingreso es futura", () => {
    expect(calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2030-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-06-15",
    })).toBeNull();
  });

  it("calcula 15 días hábiles por año trabajado", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2023-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-01-01",
    })!;

    // 365 días trabajados, (365 * 15) / 360 ≈ 15.2 días
    expect(res.diasHabiles).toBeCloseTo(15.2, 0);
  });

  it("descuenta días ya tomados", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2023-01-01",
      diasTomados: 10,
      fechaReferencia: "2024-01-01",
    })!;

    // ≈15.2 - 10 = ≈5.2
    expect(res.diasHabiles).toBeCloseTo(5.2, 0);
  });

  it("no retorna días negativos", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2024-01-01",
      diasTomados: 100,
      fechaReferencia: "2024-06-15",
    })!;

    expect(res.diasHabiles).toBeGreaterThanOrEqual(0);
  });

  it("calcula valor de vacaciones basado en salario/30", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2023-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-01-01",
    })!;

    expect(res.valorPorDia).toBeCloseTo(100000, 0);
    // valorVacaciones usa el valor exacto antes de redondear diasHabiles
    expect(res.valorVacaciones).toBeGreaterThan(0);
    // Verificar que está en el rango razonable (15 días ≈ $1.5M)
    expect(res.valorVacaciones).toBeCloseTo(1500000, -5);
  });

  it("convierte días hábiles a calendario (factor 1.4)", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2022-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-01-01",
    })!;

    expect(res.diasCalendario).toBe(Math.round(res.diasHabiles * 1.4));
  });

  it("proporcional para 6 meses de trabajo", () => {
    const res = calcularVacaciones({
      salario: 3000000,
      fechaIngreso: "2024-01-01",
      diasTomados: 0,
      fechaReferencia: "2024-07-01",
    })!;

    // 181 días, (181 * 15) / 360 ≈ 7.5
    expect(res.diasHabiles).toBeCloseTo(7.5, 0);
  });
});
