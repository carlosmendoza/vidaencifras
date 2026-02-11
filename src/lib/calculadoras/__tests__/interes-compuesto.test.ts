import { describe, it, expect } from "vitest";
import { calcularInteresCompuesto } from "../interes-compuesto";

describe("calcularInteresCompuesto", () => {
  it("retorna null si el tiempo es 0", () => {
    expect(calcularInteresCompuesto({
      capital: 10000,
      tasa: 10,
      tipoTasa: "anual",
      tiempo: 0,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })).toBeNull();
  });

  it("calcula interés compuesto simple (sin aportes)", () => {
    const res = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 10,
      tipoTasa: "anual",
      tiempo: 1,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    // TEA 10%: monto final = 1000000 * (1.10) = 1100000
    // La función convierte TEA a nominal equivalente para capitalización mensual
    expect(res.montoFinal).toBeCloseTo(1100000, -1);
    expect(res.interesGanado).toBeCloseTo(100000, -1);
    expect(res.totalAportes).toBe(0);
  });

  it("calcula correctamente a 5 años", () => {
    const res = calcularInteresCompuesto({
      capital: 10000000,
      tasa: 12,
      tipoTasa: "anual",
      tiempo: 5,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    // TEA 12% a 5 años: 10000000 * (1.12)^5
    const esperado = 10000000 * Math.pow(1.12, 5);
    expect(res.montoFinal).toBeCloseTo(esperado, -1);
    expect(res.evolucion).toHaveLength(5);
    expect(res.rendimientoTotal).toBeGreaterThan(0);
  });

  it("convierte tasa mensual a anual correctamente", () => {
    const res = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 1,
      tipoTasa: "mensual",
      tiempo: 1,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    // 1% mensual -> TEA = (1.01)^12 - 1 ≈ 12.68%
    expect(res.tasaEfectivaAnual).toBeCloseTo(12.68, 0);
  });

  it("con tasa 0% el capital no crece", () => {
    const res = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 0,
      tipoTasa: "anual",
      tiempo: 5,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    expect(res.montoFinal).toBeCloseTo(1000000, 0);
    expect(res.interesGanado).toBeCloseTo(0, 0);
  });

  it("genera evolución año a año", () => {
    const res = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 10,
      tipoTasa: "anual",
      tiempo: 3,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    expect(res.evolucion).toHaveLength(3);
    expect(res.evolucion[0].periodo).toBe(1);
    expect(res.evolucion[2].periodo).toBe(3);
    // Capital crece cada año
    expect(res.evolucion[1].capital).toBeGreaterThan(res.evolucion[0].capital);
    expect(res.evolucion[2].capital).toBeGreaterThan(res.evolucion[1].capital);
  });

  it("aportes mensuales incrementan el monto final", () => {
    const sinAportes = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 10,
      tipoTasa: "anual",
      tiempo: 5,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 0,
      frecuenciaAporte: "ninguno",
      aporteAlInicio: false,
    })!;

    const conAportes = calcularInteresCompuesto({
      capital: 1000000,
      tasa: 10,
      tipoTasa: "anual",
      tiempo: 5,
      frecuenciaCapitalizacion: 12,
      aportePeriodico: 100000,
      frecuenciaAporte: "mensual",
      aporteAlInicio: false,
    })!;

    expect(conAportes.montoFinal).toBeGreaterThan(sinAportes.montoFinal);
    expect(conAportes.totalAportes).toBeGreaterThan(0);
  });
});
