/**
 *
 * @param name Nombre del autor/a a conseguir el nombre
 * @returns la url de la api
 */
export function getUrl(name) {
    let path = "https://openlibrary.org/search/authors.json?q=";
    const palabras = name.split(' ');
    for (let i = 0; i < palabras.length - 1; i++) {
        path += palabras[i] + "%20";
    }
    path += palabras[palabras.length - 1];
    return path;
}
//# sourceMappingURL=getUrl.js.map