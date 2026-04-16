export type authorData = {
    name: string;
    key: string;
    topSubjects: string[];
    birthDate: number;
};
/**
 *
 * @param name Nombre del autor/a
 * @param callback informacion de la autora
 */
export declare function authorInfo(name: string, callback: (data: authorData) => void): void;
