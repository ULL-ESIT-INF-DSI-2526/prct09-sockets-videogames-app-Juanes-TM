import { IvideoJuego } from "../interfaces/interfaces.js";
import { GeneroVideojuego, Desarrolladora, Plataforma } from "../types/types.js";

/**
 * Clase que representa un videojuego.
 * 
 * Implementa la interfaz IvideoJuego y valida los datos al momento de crear una instancia.
 */
export class VideoJuego implements IvideoJuego {
  constructor (
    public readonly id: number,
    public nombre: string, 
    public descripcion: string, 
    public plataforma: Plataforma, 
    public genero: GeneroVideojuego, 
    public desarrolladora: Desarrolladora, 
    public lanzamiento: number, // año
    public multijugador: boolean, 
    public horasEstimadas: number, 
    public valorMercado: number
  ) {
    if(id <= 0) throw new Error ("El id no puede ser menor o igual que 0");
    if(nombre.trim().length === 0) throw new Error ("El nombre no puede estar vacío");
    if(descripcion.trim().length === 0) throw new Error ("La descripcion no puede estar vacía");
    if(lanzamiento < 1950) throw new Error ("El año de lanzamiento no puede ser menor que 1950");
    if(horasEstimadas <= 0) throw new Error ("Las horas estimadas no pueden ser menores o iguales a 0");
    if(valorMercado <= 0) throw new Error ("El valor de mercado no puede ser menor o igual que 0");
  }
}