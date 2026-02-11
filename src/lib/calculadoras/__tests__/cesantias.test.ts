import { describe, it, expect } from "vitest";
import { calcularCesantias } from "../cesantias";
import { AUXILIO_TRANSPORTE, SMMLV, TOPE_AUXILIO } from "../constantes";

describe("calcularCesantias", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularCesantias({ salario: 0, incluyeTransporte: true })).toBeNull();
  });

  it("calcula cesantías de año completo sin fecha", () => {
    const res = calcularCesantias({
      salario: 3000000,
      incluyeTransporte: false,
    })!;
    // 360 días, cesantías = (3000000 * 360) / 360 = 3000000
    expect(res.diasTrabajados).toBe(360);
    expect(res.cesantias).toBeCloseTo(3000000, 0);
  });

  it("aplica auxilio de transporte hasta 2 SMMLV", () => {
    const res = calcularCesantias({
      salario: SMMLV,
      incluyeTransporte: true,
    })!;
    expect(res.aplicaAuxilio).toBe(true);
    expect(res.salarioBase).toBe(SMMLV + AUXILIO_TRANSPORTE);
    expect(res.cesantias).toBeCloseTo(SMMLV + AUXILIO_TRANSPORTE, 0);
  });

  it("no aplica auxilio para salarios por encima de 2 SMMLV", () => {
    const res = calcularCesantias({
      salario: TOPE_AUXILIO + 1,
      incluyeTransporte: true,
    })!;
    expect(res.aplicaAuxilio).toBe(false);
  });

  it("calcula días proporcionales al ingreso en el año", () => {
    const res = calcularCesantias({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-07-01",
      fechaCorte: "2024-12-31",
    })!;
    // Desde 1 julio hasta 31 dic = 184 días
    expect(res.diasTrabajados).toBe(184);
  });

  it("cuenta desde enero si ingresó antes del año de corte", () => {
    const res = calcularCesantias({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2020-01-01",
      fechaCorte: "2024-12-31",
    })!;
    // Desde 1 enero 2024 hasta 31 dic 2024 = 360 (tope)
    expect(res.diasTrabajados).toBe(360);
  });

  it("calcula intereses al 12% anual proporcional", () => {
    const res = calcularCesantias({
      salario: 3000000,
      incluyeTransporte: false,
    })!;
    // Intereses = cesantías * 0.12 * 360 / 360 = cesantías * 0.12
    expect(res.interesesCesantias).toBeCloseTo(res.cesantias * 0.12, 0);
  });

  it("intereses son proporcionales a los días trabajados", () => {
    const res = calcularCesantias({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-07-01",
      fechaCorte: "2024-12-31",
    })!;
    // Intereses = cesantías * 0.12 * días / 360
    const esperado = res.cesantias * 0.12 * res.diasTrabajados / 360;
    expect(res.interesesCesantias).toBeCloseTo(esperado, 0);
  });

  it("total es la suma de cesantías + intereses", () => {
    const res = calcularCesantias({
      salario: 2500000,
      incluyeTransporte: true,
      fechaIngreso: "2024-03-15",
      fechaCorte: "2024-12-31",
    })!;
    expect(res.total).toBeCloseTo(res.cesantias + res.interesesCesantias, 0);
  });
});
