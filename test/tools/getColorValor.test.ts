import { describe, test, expect } from "vitest";
import { getColorValor } from "../../src/previa/tools/ColorValor";

describe("getColorValor", () => {
  test("valor <= 20 (rojo)", () => {
    expect(getColorValor(10)).toContain("10");
  });

  test("valor <= 40 (amarillo)", () => {
    expect(getColorValor(30)).toContain("30");
  });

  test("valor <= 60 (azul)", () => {
    expect(getColorValor(50)).toContain("50");
  });

  test("valor > 60 (verde)", () => {
    expect(getColorValor(80)).toContain("80");
  });
});