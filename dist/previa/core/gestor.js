import { access, mkdir, writeFile, readFile, unlink, readdir } from "fs";
/**
 * Clase encargada de gestionar la persistencia de videojuegos
 * en el sistema de ficheros mediante operaciones asíncronas.
 */
export class Gestor {
    /**
     * Valida la existencia de usuario y videojuego según la operación.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param isAdd Indica si la operación es de añadido.
     * @param callback Función que recibe el resultado de la validación.
     */
    validate(user, id, isAdd, callback) {
        if (isAdd) {
            this.userExists(user, (userExists) => {
                if (userExists) {
                    this.gameExists(user, id, (gameExists) => {
                        if (gameExists)
                            callback(false, "El videojuego ya existe");
                        else
                            callback(true);
                    });
                }
                else if (!userExists) {
                    this.createUserDir(user, () => { callback(true); });
                }
            });
        }
        else {
            this.userExists(user, (userExists) => {
                if (!userExists)
                    callback(false, "El usuario no existe");
                else {
                    this.gameExists(user, id, (gameExists) => {
                        if (!gameExists)
                            callback(false, "El videojuego no existe");
                        else
                            callback(true);
                    });
                }
            });
        }
    }
    /**
     * Añade un nuevo videojuego al sistema.
     * @param user Nombre del usuario.
     * @param juego Videojuego a añadir.
     * @param callback Función que recibe el resultado de la operación.
     */
    add(user, juego, callback) {
        this.validate(user, juego.id, true, (ok, message) => {
            if (!ok)
                callback({ success: false, message });
            else {
                const path = this.getGamePath(user, juego.id);
                writeFile(path, JSON.stringify(juego, null, 2), (err) => {
                    if (err)
                        callback({ success: false, message: "Error al guardar el videojuego" });
                    else
                        callback({ success: true, message: "Videojuego añadido correctamente" });
                });
            }
        });
    }
    /**
     * Elimina un videojuego existente.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param callback Función que recibe el resultado de la operación.
     */
    delete(user, id, callback) {
        this.validate(user, id, false, (ok, message) => {
            if (!ok)
                callback({ success: false, message });
            else {
                const path = this.getGamePath(user, id);
                unlink(path, (err) => {
                    if (err)
                        callback({ success: false, message: "Error al eliminar el videojuego" });
                    else
                        callback({ success: true, message: "Videojuego eliminado correctamente" });
                });
            }
        });
    }
    /**
     * Modifica un videojuego existente aplicando cambios parciales.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param cambios Cambios a aplicar.
     * @param callback Función que recibe el resultado de la operación.
     */
    update(user, id, cambios, callback) {
        this.validate(user, id, false, (ok, message) => {
            if (!ok)
                callback({ success: false, message });
            else {
                const path = this.getGamePath(user, id);
                readFile(path, (err, data) => {
                    if (err)
                        callback({ success: false, message: "Error al leer el videojuego" });
                    else {
                        const juego = JSON.parse(data.toString());
                        const actualizado = {
                            ...juego,
                            ...cambios
                        };
                        writeFile(path, JSON.stringify(actualizado, null, 2), (err) => {
                            if (err)
                                callback({ success: false, message: "Error al actualizar" });
                            else
                                callback({ success: true, message: "Videojuego actualizado correctamente" });
                        });
                    }
                });
            }
        });
    }
    /**
     * Muestra la información de un videojuego concreto.
     * @param user Nombre del usuario.
     * @param id Identificador del videojuego.
     * @param callback Función que recibe el resultado con los datos del juego.
     */
    show(user, id, callback) {
        this.validate(user, id, false, (ok, message) => {
            if (!ok)
                callback({ success: false, message });
            else {
                const path = this.getGamePath(user, id);
                readFile(path, (err, data) => {
                    if (err)
                        callback({ success: false, message: `No se encontró la ID del juego` });
                    else {
                        const juego = JSON.parse(data.toString());
                        callback({ success: true, data: juego });
                    }
                });
            }
        });
    }
    /**
     * Lista todos los videojuegos de un usuario.
     * @param user Nombre del usuario.
     * @param callback Función que recibe el resultado con los juegos.
     */
    list(user, callback) {
        const dir = this.getUserDir(user);
        readdir(dir, (err, files) => {
            if (err)
                callback({ success: false, message: "No se pudo leer el directorio del jugador" });
            else {
                if (files.length === 0)
                    callback({ success: false, message: "El usuario no tiene videojuegos" });
                else {
                    const juegos = [];
                    let pendientes = files.length;
                    files.forEach((file) => {
                        const ID = +file.slice(0, -5);
                        const path = this.getGamePath(user, ID);
                        readFile(path, (err, data) => {
                            if (!err)
                                juegos.push(JSON.parse(data.toString()));
                            pendientes--;
                            if (pendientes === 0)
                                callback({ success: true, data: juegos });
                        });
                    });
                }
            }
        });
    }
    getUserDir(user) {
        return `users/${user}`;
    }
    getGamePath(user, id) {
        return `${this.getUserDir(user)}/${id}.json`;
    }
    userExists(user, callback) {
        access(this.getUserDir(user), (err) => {
            callback(!err);
        });
    }
    gameExists(user, id, callback) {
        access(this.getGamePath(user, id), (err) => {
            callback(!err);
        });
    }
    createUserDir(user, callback) {
        mkdir(this.getUserDir(user), { recursive: true }, () => {
            callback();
        });
    }
}
//# sourceMappingURL=gestor.js.map