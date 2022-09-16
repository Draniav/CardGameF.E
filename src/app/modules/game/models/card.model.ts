export interface Carta {
  cartaId: string,
  estaOculta: boolean,
  poder: number,
  estaHabilitada: boolean,
  url: string,
  ronda?: number,
  jugador?: string
}

export interface Card {
  cartaId: string;
  nombre: string;
  estaOculta: boolean;
  estaHabilitada: boolean;
  poder: number;
  url: string;
}
