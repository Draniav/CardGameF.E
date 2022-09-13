

export interface GameModel {

  uid: string;
  initialized: boolean;
  ended: boolean;
  numberOfPlayers: number;
  winner: null;

  players:{ [key: string]: {} };
}
