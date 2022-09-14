import { Card } from "./card.model";


export interface Deck {
  cantidad: number;
  cartas: Card[];
  juegoId: string;
  jugadorId: string;
}
