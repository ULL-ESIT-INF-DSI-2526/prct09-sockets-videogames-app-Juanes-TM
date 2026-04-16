import { getUrl } from "./getUrl.js";
import request from "request";

export type authorData = {
  name: string;
  key: string;
  topSubjects: string[];
  birthDate: number;
}

/**
 * 
 * @param name Nombre del autor/a
 * @param callback informacion de la autora
 */
export function authorInfo(name: string, callback: (data: authorData) => void): void {
  const url = getUrl(name);
  request(url, (error, response) => {
    if (error) {
      console.error("Error al realizar la petición:", error);
      return;
    }
    const data = JSON.parse(response.body);
    const author = data.docs[0];
    const author_ = data.docs[1];
    const authorData: authorData = {
      name: author.name,
      key: author.key,
      topSubjects: author.top_subjects,
      birthDate: author_.birth_date      
    };
    callback(authorData);
  });
}



