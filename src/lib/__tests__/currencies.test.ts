import { describe, it, expect } from "vitest";
import {
  getSeparators,
  getThousandSeparator,
  getDecimalSeparator,
  formatInputValue,
  parseFormattedValue,
} from "../currencies";

describe("getSeparators", () => {
  it("retorna punto como separador de miles para es-CO", () => {
    const { thousands, decimal } = getSeparators("es-CO");
    expect(thousands).toBe(".");
    expect(decimal).toBe(",");
  });

  it("retorna coma como separador de miles para en-US", () => {
    const { thousands, decimal } = getSeparators("en-US");
    expect(thousands).toBe(",");
    expect(decimal).toBe(".");
  });
});

describe("getThousandSeparator / getDecimalSeparator", () => {
  it("retorna separadores correctos para es-CO", () => {
    expect(getThousandSeparator("es-CO")).toBe(".");
    expect(getDecimalSeparator("es-CO")).toBe(",");
  });

  it("retorna separadores correctos para en-US", () => {
    expect(getThousandSeparator("en-US")).toBe(",");
    expect(getDecimalSeparator("en-US")).toBe(".");
  });
});

describe("formatInputValue", () => {
  it("formatea número grande con separadores de miles es-CO", () => {
    expect(formatInputValue("1500000", "es-CO")).toBe("1.500.000");
  });

  it("formatea número grande con separadores de miles en-US", () => {
    expect(formatInputValue("1500000", "en-US")).toBe("1,500,000");
  });

  it("retorna string vacío para valor vacío", () => {
    expect(formatInputValue("", "es-CO")).toBe("");
  });

  it("retorna '0' para '0'", () => {
    expect(formatInputValue("0", "es-CO")).toBe("0");
  });

  it("maneja números pequeños sin separadores", () => {
    expect(formatInputValue("500", "es-CO")).toBe("500");
  });

  it("preserva decimales con separador correcto es-CO", () => {
    expect(formatInputValue("1500000.50", "es-CO")).toBe("1.500.000,50");
  });

  it("preserva decimales con separador correcto en-US", () => {
    expect(formatInputValue("1500000.50", "en-US")).toBe("1,500,000.50");
  });

  it("preserva separador decimal sin dígitos después", () => {
    expect(formatInputValue("1500.", "es-CO")).toBe("1.500,");
  });

  it("elimina ceros al inicio", () => {
    expect(formatInputValue("01500", "es-CO")).toBe("1.500");
  });

  it("formatea números de millones", () => {
    expect(formatInputValue("300000000", "es-CO")).toBe("300.000.000");
  });
});

describe("parseFormattedValue", () => {
  it("parsea valor formateado es-CO a string numérico", () => {
    expect(parseFormattedValue("1.500.000", "es-CO")).toBe("1500000");
  });

  it("parsea valor formateado en-US a string numérico", () => {
    expect(parseFormattedValue("1,500,000", "en-US")).toBe("1500000");
  });

  it("retorna string vacío para valor vacío", () => {
    expect(parseFormattedValue("", "es-CO")).toBe("");
  });

  it("parsea valor con decimales es-CO", () => {
    expect(parseFormattedValue("1.500.000,50", "es-CO")).toBe("1500000.50");
  });

  it("parsea valor con decimales en-US", () => {
    expect(parseFormattedValue("1,500,000.50", "en-US")).toBe("1500000.50");
  });

  it("parsea número sin separadores", () => {
    expect(parseFormattedValue("500", "es-CO")).toBe("500");
  });

  it("es inversa de formatInputValue para es-CO", () => {
    const raw = "2500000";
    const formatted = formatInputValue(raw, "es-CO");
    expect(parseFormattedValue(formatted, "es-CO")).toBe(raw);
  });

  it("es inversa de formatInputValue para en-US", () => {
    const raw = "2500000";
    const formatted = formatInputValue(raw, "en-US");
    expect(parseFormattedValue(formatted, "en-US")).toBe(raw);
  });

  it("es inversa con decimales", () => {
    const raw = "2500000.75";
    const formatted = formatInputValue(raw, "es-CO");
    expect(parseFormattedValue(formatted, "es-CO")).toBe(raw);
  });
});
