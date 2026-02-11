import { describe, it, expect } from "vitest";
import { calcularHorasExtras } from "../horas-extras";
import { HORAS_MES, SMMLV } from "../constantes";

describe("calcularHorasExtras", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularHorasExtras({ salario: 0, tipoHora: "extra_diurna", cantidad: 10 })).toBeNull();
  });

  it("retorna null si la cantidad es 0", () => {
    expect(calcularHorasExtras({ salario: 2000000, tipoHora: "extra_diurna", cantidad: 0 })).toBeNull();
  });

  it("calcula valor hora base correctamente", () => {
    const res = calcularHorasExtras({
      salario: SMMLV,
      tipoHora: "extra_diurna",
      cantidad: 1,
    })!;

    expect(res.valorHoraBase).toBeCloseTo(SMMLV / HORAS_MES, 0);
  });

  it("aplica recargo de 25% para extra diurna", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "extra_diurna",
      cantidad: 1,
    })!;

    const horaBase = 2000000 / HORAS_MES;
    expect(res.recargo).toBeCloseTo(horaBase * 0.25, 0);
    expect(res.valorHoraTotal).toBeCloseTo(horaBase * 1.25, 0);
  });

  it("aplica recargo de 75% para extra nocturna", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "extra_nocturna",
      cantidad: 1,
    })!;

    const horaBase = 2000000 / HORAS_MES;
    expect(res.valorHoraTotal).toBeCloseTo(horaBase * 1.75, 0);
  });

  it("aplica recargo de 100% para extra dominical diurna", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "extra_dom_diurna",
      cantidad: 1,
    })!;

    const horaBase = 2000000 / HORAS_MES;
    expect(res.valorHoraTotal).toBeCloseTo(horaBase * 2.0, 0);
  });

  it("aplica recargo de 150% para extra dominical nocturna", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "extra_dom_nocturna",
      cantidad: 1,
    })!;

    const horaBase = 2000000 / HORAS_MES;
    expect(res.valorHoraTotal).toBeCloseTo(horaBase * 2.5, 0);
  });

  it("aplica recargo de 35% para recargo nocturno", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "recargo_nocturno",
      cantidad: 1,
    })!;

    const horaBase = 2000000 / HORAS_MES;
    expect(res.valorHoraTotal).toBeCloseTo(horaBase * 1.35, 0);
  });

  it("multiplica por cantidad de horas", () => {
    const res = calcularHorasExtras({
      salario: 2000000,
      tipoHora: "extra_diurna",
      cantidad: 10,
    })!;

    expect(res.totalHoras).toBe(10);
    expect(res.totalPagar).toBeCloseTo(res.valorHoraTotal * 10, 0);
  });

  it("totalPagar = valorHoraTotal × cantidad", () => {
    const res = calcularHorasExtras({
      salario: SMMLV,
      tipoHora: "recargo_dom_nocturno",
      cantidad: 8,
    })!;

    expect(res.totalPagar).toBeCloseTo(res.valorHoraTotal * res.totalHoras, 0);
  });
});
