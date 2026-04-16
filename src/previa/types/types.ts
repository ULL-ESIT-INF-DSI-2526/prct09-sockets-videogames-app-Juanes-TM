/**
 * Representa los diferentes géneros de videojuegos disponibles.
 */
export type GeneroVideojuego = "Accion" | "Aventura" | "Accion-Aventura" | "RPG" | "JRPG" | "ARPG" | "MMORPG" | 
                                "Shooter" | "FPS" | "TPS" | "Battle Royale" | "Plataformas" | "Puzles" | "Estrategia" | 
                                "RTS" | "TBS" | "MOBA" | "Simulacion" | "Simulador de vida" | "Simulador de construccion" | 
                                "Deportes" | "Carreras" | "Musica/Ritmo" | "Terror" | "Supervivencia" | "Survival Horror" | 
                                "Roguelike" | "Roguelite" | "Sandbox" | "Mundo abierto" | "Metroidvania" | "Idle/Clicker" | 
                                "Party" | "Visual Novel" | "Novela interactiva" | "Educativo" | "Arcade" | "Hack and Slash" | 
                                "Stealth" | "Bullet Hell" | "Deckbuilding" | "Auto Battler";

/**
 * Representa las principales desarrolladoras de videojuegos.
 */
export type Desarrolladora = "Nintendo" | "Sony" | "Microsoft" | "Ubisoft" | "Electronic Arts" | "Activision Blizzard" |
                              "Rockstar Games" | "CD Projekt" | "FromSoftware" | "Square Enix" | "Capcom" | "SEGA" | 
                              "Bandai Namco" | "Bethesda" | "Epic Games" | "Valve" | "Riot Games" | "Supercell" | 
                              "Paradox Interactive" | "Larian Studios" | "Naughty Dog" | "Insomniac Games" | 
                              "Guerrilla Games" | "Santa Monica Studio" | "343 Industries" | "Obsidian Entertainment";

/**
 * Representa las plataformas disponibles donde puede ejecutarse un videojuego.
 * 
 * Incluye consolas actuales, retro, dispositivos portátiles y plataformas modernas.
 */
export type Plataforma = "PC" | "PlayStation 1" | "PlayStation 2" | "PlayStation 3" | "PlayStation 4" | "PlayStation 5" | 
                          "PS Vita" | "PSP" | "Xbox" | "Xbox 360" | "Xbox One" | "Xbox Series X" | "Xbox Series S" | 
                          "Nintendo NES" | "Super Nintendo" | "Nintendo 64" | "GameCube" | "Wii" | "Wii U" | 
                          "Nintendo Switch" | "Nintendo Switch 2" | "Game Boy" | "Game Boy Advance" | "Game Boy Color" | 
                          "Nintendo DS" | "Nintendo 3DS" | "Steam Deck" | "Mobile";

export type CambiosVideojuego = {
  nombre?: string;
  descripcion?: string;
  plataforma?: Plataforma;
  genero?: GeneroVideojuego;
  desarrolladora?: Desarrolladora;
  lanzamiento?: number;
  multijugador?: boolean;
  horasEstimadas?: number;
  valorMercado?: number;
};