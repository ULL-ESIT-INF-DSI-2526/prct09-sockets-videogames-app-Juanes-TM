import { VideoJuego } from '../models/videojuego.js';
import { CambiosVideojuego } from "../types/types.js";
/**
 * Representa la respuesta enviada tras una operación del gestor.
 * Puede incluir un mensaje informativo o datos de uno o varios videojuegos.
 */
export type ResponseType = {
    success: boolean;
    message?: string;
    data?: VideoJuego | VideoJuego[];
};
/**
 * Clase encargada de gestionar la persistencia de videojuegos
 * en el sistema de ficheros mediante operaciones asíncronas.
 */
export declare class Gestor {
    /**
     * Valida la existencia de usuario y videojuego según la operación.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param isAdd Indica si la operación es de añadido.
     * @param callback Función que recibe el resultado de la validación.
     */
    private validate;
    /**
     * Añade un nuevo videojuego al sistema.
     * @param user Nombre del usuario.
     * @param juego Videojuego a añadir.
     * @param callback Función que recibe el resultado de la operación.
     */
    add(user: string, juego: VideoJuego, callback: (res: ResponseType) => void): void;
    /**
     * Elimina un videojuego existente.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param callback Función que recibe el resultado de la operación.
     */
    delete(user: string, id: number, callback: (res: ResponseType) => void): void;
    /**
     * Modifica un videojuego existente aplicando cambios parciales.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param cambios Cambios a aplicar.
     * @param callback Función que recibe el resultado de la operación.
     */
    update(user: string, id: number, cambios: CambiosVideojuego, callback: (res: ResponseType) => void): void;
    /**
     * Muestra la información de un videojuego concreto.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param callback Función que recibe el resultado con los datos del juego.
     */
    show(user: string, id: number, callback: (res: ResponseType) => void): void;
    /**
     * Lista todos los videojuegos de un usuario.
     * @param user Nombre del usuario.
     * @param callback Función que recibe el resultado con los juegos.
     */
    list(user: string, callback: (res: ResponseType) => void): void;
    private getUserDir;
    private getGamePath;
    private userExists;
    private gameExists;
    private createUserDir;
}
