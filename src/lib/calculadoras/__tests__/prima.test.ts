import { describe, it, expect } from "vitest";
import { calcularPrima } from "../prima";
import { AUXILIO_TRANSPORTE, SMMLV } from "../constantes";

describe("calcularPrima", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularPrima({ salario: 0, incluyeTransporte: true, periodo: "junio" })).toBeNull();
  });

  it("calcula prima de semestre completo", () => {
    const res = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      periodo: "junio",
    })!;
    // 180 días, prima = (3000000 * 180) / 360 = 1500000
    expect(res.diasTrabajados).toBe(180);
    expect(res.prima).toBeCloseTo(1500000, 0);
  });

  it("aplica auxilio de transporte hasta 2 SMMLV", () => {
    const res = calcularPrima({
      salario: SMMLV,
      incluyeTransporte: true,
      periodo: "junio",
    })!;
    expect(res.aplicaAuxilio).toBe(true);
    expect(res.salarioBase).toBe(SMMLV + AUXILIO_TRANSPORTE);
    // Prima con auxilio = (SMMLV + auxilio) * 180 / 360
    expect(res.prima).toBeCloseTo((SMMLV + AUXILIO_TRANSPORTE) / 2, 0);
  });

  it("calcula días proporcionales si ingresó durante el semestre", () => {
    const res = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2026-03-01",
      periodo: "junio",
      fechaReferencia: "2026-06-30",
    })!;
    // Desde 1 marzo hasta 30 junio ≈ 122-123 días (varía por zona horaria)
    expect(res.diasTrabajados).toBeGreaterThanOrEqual(121);
    expect(res.diasTrabajados).toBeLessThanOrEqual(123);
    expect(res.prima).toBeCloseTo((3000000 * res.diasTrabajados) / 360, 0);
  });

  it("retorna 180 días si ingresó antes del semestre", () => {
    const res = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2020-01-01",
      periodo: "junio",
      fechaReferencia: "2026-06-30",
    })!;
    expect(res.diasTrabajados).toBe(180);
  });

  it("retorna 0 días si ingresó después del semestre", () => {
    const res = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2026-08-01",
      periodo: "junio",
      fechaReferencia: "2026-06-30",
    })!;
    expect(res.diasTrabajados).toBe(0);
    expect(res.prima).toBe(0);
  });

  it("diferencia entre primer y segundo semestre", () => {
    const junio = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2026-03-01",
      periodo: "junio",
      fechaReferencia: "2026-06-30",
    })!;

    const diciembre = calcularPrima({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2026-03-01",
      periodo: "diciembre",
      fechaReferencia: "2026-12-31",
    })!;

    // Diciembre debería tener 180 días (ingresó antes de julio)
    expect(diciembre.diasTrabajados).toBe(180);
    expect(diciembre.prima).toBeGreaterThan(junio.prima);
  });
});
