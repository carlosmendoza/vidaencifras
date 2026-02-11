import { describe, it, expect } from "vitest";
import { calcularPrestamo } from "../prestamos";

describe("calcularPrestamo", () => {
  it("retorna null si el monto es 0", () => {
    expect(calcularPrestamo({ monto: 0, tasaAnual: 12, plazoMeses: 36 })).toBeNull();
  });

  it("retorna null si el plazo es 0", () => {
    expect(calcularPrestamo({ monto: 10000000, tasaAnual: 12, plazoMeses: 0 })).toBeNull();
  });

  it("calcula cuota mensual correctamente (sistema francés)", () => {
    const res = calcularPrestamo({
      monto: 10000000,
      tasaAnual: 12,
      plazoMeses: 12,
    })!;

    // Fórmula: P * r(1+r)^n / ((1+r)^n - 1)
    const r = 0.12 / 12;
    const n = 12;
    const cuotaEsperada = 10000000 * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    expect(res.cuotaMensual).toBeCloseTo(cuotaEsperada, 0);
  });

  it("total intereses = total pagar - monto", () => {
    const res = calcularPrestamo({
      monto: 50000000,
      tasaAnual: 15,
      plazoMeses: 60,
    })!;
    expect(res.totalIntereses).toBeCloseTo(res.totalPagar - 50000000, 0);
  });

  it("genera tabla de amortización completa", () => {
    const res = calcularPrestamo({
      monto: 10000000,
      tasaAnual: 12,
      plazoMeses: 36,
    })!;

    expect(res.amortizacion).toHaveLength(36);
    expect(res.amortizacion[0].mes).toBe(1);
    expect(res.amortizacion[35].mes).toBe(36);
  });

  it("saldo final es 0 (o muy cercano)", () => {
    const res = calcularPrestamo({
      monto: 10000000,
      tasaAnual: 12,
      plazoMeses: 36,
    })!;

    expect(res.amortizacion[35].saldo).toBeCloseTo(0, 0);
  });

  it("capital crece y interés decrece en cada cuota", () => {
    const res = calcularPrestamo({
      monto: 10000000,
      tasaAnual: 12,
      plazoMeses: 12,
    })!;

    // En sistema francés: capital aumenta, interés disminuye
    expect(res.amortizacion[11].capital).toBeGreaterThan(res.amortizacion[0].capital);
    expect(res.amortizacion[11].interes).toBeLessThan(res.amortizacion[0].interes);
  });

  it("con tasa 0% la cuota es monto/plazo", () => {
    const res = calcularPrestamo({
      monto: 12000000,
      tasaAnual: 0,
      plazoMeses: 12,
    })!;

    expect(res.cuotaMensual).toBeCloseTo(1000000, 0);
    expect(res.totalIntereses).toBeCloseTo(0, 0);
  });

  it("todas las cuotas son iguales", () => {
    const res = calcularPrestamo({
      monto: 20000000,
      tasaAnual: 18,
      plazoMeses: 48,
    })!;

    const cuota = res.amortizacion[0].cuota;
    for (const fila of res.amortizacion) {
      expect(fila.cuota).toBeCloseTo(cuota, 0);
    }
  });

  it("más plazo = más intereses totales", () => {
    const corto = calcularPrestamo({ monto: 10000000, tasaAnual: 12, plazoMeses: 12 })!;
    const largo = calcularPrestamo({ monto: 10000000, tasaAnual: 12, plazoMeses: 60 })!;

    expect(largo.totalIntereses).toBeGreaterThan(corto.totalIntereses);
    expect(largo.cuotaMensual).toBeLessThan(corto.cuotaMensual);
  });
});
