import { describe, test, expect, beforeEach } from "vitest";
import { Gestor } from "../../src/previa/core/gestor";
import { VideoJuego } from "../../src/previa/models/videojuego";
import { rmSync } from "fs";

const gestor = new Gestor();
const user = "testuser";

const juego = new VideoJuego(
  1, "Zelda", "desc", "PC", "RPG", "Nintendo", 2000, false, 10, 20
);

beforeEach(() => {
  rmSync(`users/${user}`, { recursive: true, force: true });
});

describe("Gestor", () => {

  test("add correcto", async () => {
    await new Promise<void>((resolve) => {
      gestor.add(user, juego, (res) => {
        expect(res.success).toBe(true);
        resolve();
      });
    });
  });

  test("add duplicado", async () => {
    await new Promise<void>((resolve) => {
      gestor.add(user, juego, () => {
        gestor.add(user, juego, (res) => {
          expect(res.success).toBe(false);
          resolve();
        });
      });
    });
  });

  test("show existente", async () => {
    await new Promise<void>((resolve) => {
      gestor.add(user, juego, () => {
        gestor.show(user, 1, (res) => {
          expect(res.success).toBe(true);
          resolve();
        });
      });
    });
  });

  test("delete correcto", async () => {
    await new Promise<void>((resolve) => {
      gestor.add(user, juego, () => {
        gestor.delete(user, 1, (res) => {
          expect(res.success).toBe(true);
          resolve();
        });
      });
    });
  });

  test("update correcto", async () => {
    await new Promise<void>((resolve) => {
      gestor.add(user, juego, () => {
        gestor.update(user, 1, { nombre: "Nuevo" }, (res) => {
          expect(res.success).toBe(true);
          resolve();
        });
      });
    });
  });

  test("list vacío", async () => {
    await new Promise<void>((resolve) => {
      gestor.list(user, (res) => {
        expect(res.success).toBe(false);
        resolve();
      });
    });
  });

});