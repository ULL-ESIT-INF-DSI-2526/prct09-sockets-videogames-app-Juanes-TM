import chalk from "chalk";
/**
 * Devuelve el valor de mercado coloreado según su rango.
 * @param valor Valor numérico del videojuego.
 * @returns Cadena con color aplicado.
 */
export function getColorValor(valor) {
    if (valor <= 20)
        return chalk.red(valor.toString());
    if (valor <= 40)
        return chalk.yellow(valor.toString());
    if (valor <= 60)
        return chalk.blue(valor.toString());
    return chalk.green(valor.toString());
}
//# sourceMappingURL=ColorValor.js.map