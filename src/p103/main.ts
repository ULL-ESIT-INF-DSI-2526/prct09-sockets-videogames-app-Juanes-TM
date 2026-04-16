import { authorData, authorInfo } from "./authorInfo.js";
import { works } from "./works.js";

const name = process.argv[2];
const nObras: number = +process.argv[3];

function autorObras(name: string, nObras: number) {
  authorInfo(name, (info) => {
    console.log(`Nombre: ${info.name}`);
    console.log(`Nacimiento: ${info.birthDate}`);
    console.log(`Temas principales: ${info.topSubjects}`);
    works(info.key, (obras) => {
      const res = JSON.parse(obras.toString());
      console.log(`Obras:`);
      for (let i = 0; i < nObras; i++) {
        console.log(`${res.entries[i].title} ${res.entries[i].created.value}`);
      }
    });
  });
}

autorObras(name, nObras);