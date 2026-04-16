import { describe, test, expect } from "vitest";
import { VideoJuego } from "../../src/previa/models/videojuego";

describe("VideoJuego", () => {
  test("creación válida", () => {
    const juego = new VideoJuego(
      1, "Zelda", "desc", "PC", "RPG", "Nintendo", 2000, false, 10, 20
    );
    expect(juego.id).toBe(1);
  });

  test("id inválido", () => {
    expect(() => new VideoJuego(
      0, "Zelda", "desc", "PC", "RPG", "Nintendo", 2000, false, 10, 20
    )).toThrow();
  });

  test("nombre vacío", () => {
    expect(() => new VideoJuego(
      1, "", "desc", "PC", "RPG", "Nintendo", 2000, false, 10, 20
    )).toThrow();
  });

  test("descripcion vacía", () => {
    expect(() => new VideoJuego(
      1, "Zelda", "", "PC", "RPG", "Nintendo", 2000, false, 10, 20
    )).toThrow();
  });

  test("año inválido", () => {
    expect(() => new VideoJuego(
      1, "Zelda", "desc", "PC", "RPG", "Nintendo", 1900, false, 10, 20
    )).toThrow();
  });

  test("horas inválidas", () => {
    expect(() => new VideoJuego(
      1, "Zelda", "desc", "PC", "RPG", "Nintendo", 2000, false, 0, 20
    )).toThrow();
  });

  test("valor inválido", () => {
    expect(() => new VideoJuego(
      1, "Zelda", "desc", "PC", "RPG", "Nintendo", 2000, false, 10, 0
    )).toThrow();
  });
});