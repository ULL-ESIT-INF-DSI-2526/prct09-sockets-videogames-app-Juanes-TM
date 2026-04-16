import { GeneroVideojuego, Desarrolladora, Plataforma } from "../types/types.js";

/**
 * Define la estructura de datos de un videojuego.
 * 
 * Contiene la información mínima requerida para describir un videojuego
 * según las especificaciones del sistema.
 */
export interface IvideoJuego {
  id: number;
  nombre: string;
  descripcion: string;
  plataforma: Plataforma;
  genero: GeneroVideojuego;
  desarrolladora: Desarrolladora;
  lanzamiento: number;
  multijugador: boolean;
  horasEstimadas: number;
  valorMercado: number;
}