import {Card} from "./card.model";

export interface Board {
  id:String;
  jugadoresIniciales: string[];
  cantidadJugadores: number;
  estaIniciada: boolean;
  cartas:Card
}

export interface Round {
  tiempo: number;
  jugadores: string[];
  numero: string;
  estaIniciada: boolean;
 }

export interface AllBoard {
  tablero: Board;
  ronda: Round;
  tiempo: number;

}
