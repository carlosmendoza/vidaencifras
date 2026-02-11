import { describe, it, expect } from "vitest";
import { calcularRetencionFuente } from "../retencion-fuente";
import { UVT_2025 } from "../constantes";

describe("calcularRetencionFuente", () => {
  it("retorna null si el valor es 0", () => {
    expect(calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: true,
      valorBruto: 0,
    })).toBeNull();
  });

  it("no aplica retención bajo la base mínima", () => {
    // Servicios: base mínima = 4 UVT
    const baseMinima = 4 * UVT_2025;
    const res = calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: true,
      valorBruto: baseMinima - 1,
    })!;

    expect(res.superaBaseMinima).toBe(false);
    expect(res.retencion).toBe(0);
    expect(res.netoRecibir).toBe(baseMinima - 1);
  });

  it("aplica retención declarante para servicios (10%)", () => {
    const valor = 5000000;
    const res = calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: true,
      valorBruto: valor,
    })!;

    expect(res.superaBaseMinima).toBe(true);
    expect(res.tasaAplicada).toBe(10);
    expect(res.retencion).toBeCloseTo(valor * 0.10, 0);
    expect(res.netoRecibir).toBeCloseTo(valor * 0.90, 0);
  });

  it("aplica retención no declarante para servicios (11%)", () => {
    const valor = 5000000;
    const res = calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: false,
      valorBruto: valor,
    })!;

    expect(res.tasaAplicada).toBe(11);
    expect(res.retencion).toBeCloseTo(valor * 0.11, 0);
  });

  it("retención compras declarante (2.5%)", () => {
    const valor = 5000000;
    const res = calcularRetencionFuente({
      tipoRetencion: "compras",
      esDeclarante: true,
      valorBruto: valor,
    })!;

    expect(res.tasaAplicada).toBe(2.5);
    expect(res.retencion).toBeCloseTo(valor * 0.025, 0);
  });

  it("retención compras no declarante (3.5%)", () => {
    const valor = 5000000;
    const res = calcularRetencionFuente({
      tipoRetencion: "compras",
      esDeclarante: false,
      valorBruto: valor,
    })!;

    expect(res.tasaAplicada).toBe(3.5);
  });

  it("retención arrendamiento declarante (3.5%)", () => {
    const valor = 5000000;
    const res = calcularRetencionFuente({
      tipoRetencion: "arrendamiento",
      esDeclarante: true,
      valorBruto: valor,
    })!;

    expect(res.tasaAplicada).toBe(3.5);
    expect(res.retencion).toBeCloseTo(valor * 0.035, 0);
  });

  it("base mínima compras es 27 UVT", () => {
    const baseMinima = 27 * UVT_2025;
    const bajo = calcularRetencionFuente({
      tipoRetencion: "compras",
      esDeclarante: true,
      valorBruto: baseMinima - 1,
    })!;

    const sobre = calcularRetencionFuente({
      tipoRetencion: "compras",
      esDeclarante: true,
      valorBruto: baseMinima + 1,
    })!;

    expect(bajo.retencion).toBe(0);
    expect(sobre.retencion).toBeGreaterThan(0);
  });

  it("neto + retención = valor bruto", () => {
    const res = calcularRetencionFuente({
      tipoRetencion: "honorarios",
      esDeclarante: true,
      valorBruto: 10000000,
    })!;

    expect(res.netoRecibir + res.retencion).toBeCloseTo(10000000, 0);
  });

  it("declarante paga menos retención que no declarante", () => {
    const decl = calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: true,
      valorBruto: 5000000,
    })!;

    const noDecl = calcularRetencionFuente({
      tipoRetencion: "servicios",
      esDeclarante: false,
      valorBruto: 5000000,
    })!;

    expect(decl.retencion).toBeLessThan(noDecl.retencion);
  });
});
