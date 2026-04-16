import request from "request";

/**
 * 
 * @param key identificativo del autor/a
 * @param callback obras del autor/a
 */
export function works(key: string, callback: (works: string[]) => void): void {
  const url = `https://openlibrary.org/authors/${key}/works.json`;
  request(url, (error, response) => {
    if (error) {
      console.error("Error al realizar la petición:", error);
      return;
    }
    const data = JSON.parse(response.body);
    const works = data.entries;
    callback(works);
  });
} 