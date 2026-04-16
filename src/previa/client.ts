import yargs from "yargs";
import net from 'net';
import chalk from "chalk";
import { getColorValor } from "./tools/ColorValor.js";
import { hideBin } from "yargs/helpers";
import { VideoJuego } from "./models/videojuego.js";
import { Plataforma, GeneroVideojuego, Desarrolladora, CambiosVideojuego } from "./types/types.js";

/**
 * Cliente de la aplicación que permite interactuar con el servidor
 * mediante comandos de línea usando yargs.
 * Envía peticiones en formato JSON y muestra la respuesta por consola.
 */
yargs(hideBin(process.argv))
  .command(
    "add",
    "Añade un videojuego",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
      name: { type: "string", demandOption: true },
      desc: { type: "string", demandOption: true },
      platform: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      developer: { type: "string", demandOption: true },
      year: { type: "number", demandOption: true },
      multiplayer: { type: "boolean", demandOption: true },
      hours: { type: "number", demandOption: true },
      value: { type: "number", demandOption: true },
    },
    (argv) => {
      const client = net.connect({ port: 60300 });
      const juego = new VideoJuego(
        argv.id,
        argv.name,
        argv.desc,
        argv.platform as Plataforma,
        argv.genre as GeneroVideojuego,
        argv.developer as Desarrolladora,
        argv.year,
        argv.multiplayer,
        argv.hours,
        argv.value
      );
      client.write(JSON.stringify({
        type: "add",
        user: argv.user,
        juego: juego
      }));
      client.once("data", (data) => {
        const res = JSON.parse(data.toString());
        if (res.success) console.log(chalk.green(res.message));
        else console.log(chalk.red(res.message));
        client.end();
      });
    }
  )
  .command(
    "remove",
    "Elimina un videojuego",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
    },
    (argv) => {
      const client = net.connect({ port: 60300 });
      client.write(JSON.stringify({
        type: "remove",
        user: argv.user,
        id: argv.id
      }));
      client.once("data", (data) => {
        const res = JSON.parse(data.toString());
        if (res.success) console.log(chalk.green(res.message));
        else console.log(chalk.red(res.message));
        client.end();
      });
    }
  )
  .command(
    "read",
    "Muestra un videojuego",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
    },
    (argv) => {
      const client = net.connect({ port: 60300 });
      client.write(JSON.stringify({
        type: "read",
        user: argv.user,
        id: argv.id
      }));
      client.once("data", (data) => {
        const res = JSON.parse(data.toString());
        if (res.success) {
          const juego = res.data;
          console.log(`ID:${juego.id}\n`);
          console.log(`Name:${juego.nombre}\n`);
          console.log(`Description:${juego.descripcion}\n`);
          console.log(`Platform:${juego.plataforma}\n`);
          console.log(`Genre:${juego.genero}\n`);
          console.log(`Developer:${juego.desarrolladora}\n`);
          console.log(`Year:${juego.lanzamiento}\n`);
          console.log(`Multiplayer:${juego.multijugador}\n`);
          console.log(`Estimatedhours:${juego.horasEstimadas}\n`);
          console.log(`Marketvalue:${getColorValor(juego.valorMercado)}\n\n`);
        }
        else console.log(chalk.red(res.message));
        client.end();
      });
    }
  )
  .command(
    "list",
    "Muestra una lista de videojuegos",
    {
      user: { type: "string", demandOption: true },
    },
    (argv) => {
      const client = net.connect({ port: 60300 });
      client.write(JSON.stringify({
        type: "list",
        user: argv.user,
      }));
      client.once("data", (data) => {
        const res = JSON.parse(data.toString());
        if (res.success) {
          const juegos = res.data;
          juegos.forEach((juego: VideoJuego) => {
            console.log(`ID:${juego.id}\n`);
            console.log(`Name:${juego.nombre}\n`);
            console.log(`Description:${juego.descripcion}\n`);
            console.log(`Platform:${juego.plataforma}\n`);
            console.log(`Genre:${juego.genero}\n`);
            console.log(`Developer:${juego.desarrolladora}\n`);
            console.log(`Year:${juego.lanzamiento}\n`);
            console.log(`Multiplayer:${juego.multijugador}\n`);
            console.log(`Estimatedhours:${juego.horasEstimadas}\n`);
            console.log(`Marketvalue:${getColorValor(juego.valorMercado)}\n\n`);
          });
        }
        else console.log(chalk.red(res.message));
        client.end();
      });
    }
  )
  .command(
    "update",
    "Actualiza un videojuego",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
      name: { type: "string" },
      desc: { type: "string" },
      platform: { type: "string" },
      genre: { type: "string" },
      developer: { type: "string" },
      year: { type: "number" },
      multiplayer: { type: "boolean" },
      hours: { type: "number" },
      value: { type: "number" },
    },
    (argv) => {
      const client = net.connect({ port: 60300 });
      const cambios: CambiosVideojuego = {};
      if (argv.name !== undefined) cambios.nombre = argv.name;
      if (argv.desc !== undefined) cambios.descripcion = argv.desc;
      if (argv.platform !== undefined) cambios.plataforma = argv.platform as Plataforma;
      if (argv.genre !== undefined) cambios.genero = argv.genre as GeneroVideojuego;
      if (argv.developer !== undefined) cambios.desarrolladora = argv.developer as Desarrolladora;
      if (argv.year !== undefined) cambios.lanzamiento = argv.year;
      if (argv.multiplayer !== undefined) cambios.multijugador = argv.multiplayer;
      if (argv.hours !== undefined) cambios.horasEstimadas = argv.hours;
      if (argv.value !== undefined) cambios.valorMercado = argv.value;
      client.write(JSON.stringify({
        type: "update",
        user: argv.user,
        id: argv.id,
        cambios: cambios
      }));
      client.once("data", (data) => {
        const res = JSON.parse(data.toString());
        if (res.success) console.log(chalk.green(res.message));
        else console.log(chalk.red(res.message));
        client.end();
      });
    }
  )
  .help()
  .argv;