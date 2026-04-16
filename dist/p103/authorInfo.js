import { getUrl } from "./getUrl.js";
import request from "request";
/**
 *
 * @param name Nombre del autor/a
 * @param callback informacion de la autora
 */
export function authorInfo(name, callback) {
    const url = getUrl(name);
    request(url, (error, response) => {
        if (error) {
            console.error("Error al realizar la petición:", error);
            return;
        }
        const data = JSON.parse(response.body);
        const author = data.docs[0];
        const author_ = data.docs[1];
        const authorData = {
            name: author.name,
            key: author.key,
            topSubjects: author.top_subjects,
            birthDate: author_.birth_date
        };
        callback(authorData);
    });
}
//# sourceMappingURL=authorInfo.js.map