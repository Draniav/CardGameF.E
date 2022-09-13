import { PlayerModel } from "./playerModel";

export interface GameDataModel {

  uid: string;
  initialized: boolean;
  ended: boolean;
  numberOfPlayers: number;
  winner: null;

  players: {[key: string] : PlayerModel   };
}
