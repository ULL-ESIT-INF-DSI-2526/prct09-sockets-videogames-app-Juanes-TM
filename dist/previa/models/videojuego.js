/**
 * Clase que representa un videojuego.
 *
 * Implementa la interfaz IvideoJuego y valida los datos al momento de crear una instancia.
 */
export class VideoJuego {
    id;
    nombre;
    descripcion;
    plataforma;
    genero;
    desarrolladora;
    lanzamiento;
    multijugador;
    horasEstimadas;
    valorMercado;
    constructor(id, nombre, descripcion, plataforma, genero, desarrolladora, lanzamiento, // año
    multijugador, horasEstimadas, valorMercado) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.plataforma = plataforma;
        this.genero = genero;
        this.desarrolladora = desarrolladora;
        this.lanzamiento = lanzamiento;
        this.multijugador = multijugador;
        this.horasEstimadas = horasEstimadas;
        this.valorMercado = valorMercado;
        if (id <= 0)
            throw new Error("El id no puede ser menor o igual que 0");
        if (nombre.trim().length === 0)
            throw new Error("El nombre no puede estar vacío");
        if (descripcion.trim().length === 0)
            throw new Error("La descripcion no puede estar vacía");
        if (lanzamiento < 1950)
            throw new Error("El año de lanzamiento no puede ser menor que 1950");
        if (horasEstimadas <= 0)
            throw new Error("Las horas estimadas no pueden ser menores o iguales a 0");
        if (valorMercado <= 0)
            throw new Error("El valor de mercado no puede ser menor o igual que 0");
    }
}
//# sourceMappingURL=videojuego.js.map