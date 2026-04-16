import { IvideoJuego } from "../interfaces/interfaces.js";
import { GeneroVideojuego, Desarrolladora, Plataforma } from "../types/types.js";
/**
 * Clase que representa un videojuego.
 *
 * Implementa la interfaz IvideoJuego y valida los datos al momento de crear una instancia.
 */
export declare class VideoJuego implements IvideoJuego {
    readonly id: number;
    nombre: string;
    descripcion: string;
    plataforma: Plataforma;
    genero: GeneroVideojuego;
    desarrolladora: Desarrolladora;
    lanzamiento: number;
    multijugador: boolean;
    horasEstimadas: number;
    valorMercado: number;
    constructor(id: number, nombre: string, descripcion: string, plataforma: Plataforma, genero: GeneroVideojuego, desarrolladora: Desarrolladora, lanzamiento: number, // año
    multijugador: boolean, horasEstimadas: number, valorMercado: number);
}
