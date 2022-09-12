import {Injectable} from '@angular/core';


import {GameDataModel} from "../../models/gameModel.models";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {
  }

  getGames(): Array<GameDataModel> {
    //const players = new Array<PlayerModel>();
    let games: any;
    games.push({
        uid: '135317823841',
        initialized: true,
        ended: false,
        numberOfPlayers: 2,
        winner: false,
      },
      games.push({
          uid: '764086051850',
          initialized: true,
          ended: false,
          numberOfPlayers: 2,
          winner: false,
        }
      ));

    return games;
  }


}
