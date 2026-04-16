import net from 'net';
import { Gestor } from "./core/gestor.js";
const gestor = new Gestor();
/**
 * Servidor TCP que procesa peticiones de clientes para gestionar
 * videojuegos. Utiliza la clase Gestor para realizar las operaciones
 * y responde en formato JSON.
 */
net.createServer((connection) => {
    console.log('A client has connected.');
    connection.on("data", (data) => {
        let request;
        try {
            request = JSON.parse(data.toString());
        }
        catch {
            connection.write(JSON.stringify({ success: false, message: "JSON inválido" }));
            connection.end();
            return;
        }
        switch (request.type) {
            case "add":
                gestor.add(request.user, request.juego, (res) => {
                    connection.write(JSON.stringify(res));
                    connection.end();
                });
                break;
            case "remove":
                gestor.delete(request.user, request.id, (res) => {
                    connection.write(JSON.stringify(res));
                    connection.end();
                });
                break;
            case "read":
                gestor.show(request.user, request.id, (res) => {
                    connection.write(JSON.stringify(res));
                    connection.end();
                });
                break;
            case "list":
                gestor.list(request.user, (res) => {
                    connection.write(JSON.stringify(res));
                    connection.end();
                });
                break;
            case "update":
                gestor.update(request.user, request.id, request.cambios, (res) => {
                    connection.write(JSON.stringify(res));
                    connection.end();
                });
                break;
            default:
                connection.write(JSON.stringify({ success: false, message: "Operación no válida" }));
                connection.end();
        }
        connection.on('close', () => {
            console.log('A client has disconnected.');
        });
    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});
//# sourceMappingURL=server.js.map