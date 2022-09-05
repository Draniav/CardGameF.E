import { Injectable } from '@angular/core';
import { PlayerModel } from '../models/playerModel';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  //private collection: AngularFirestoreCollection<PlayerModel>;

  //constructor(private storage: AngularFirestore) {
   // this.collection = storage.collection<PlayerModel>('players');
  //}

  getPlayers(): Array<PlayerModel> {
    //const players = new Array<PlayerModel>();
    const players = [];
    players.push({
      name: 'Camilo',
      id: '123',
    });
    players.push({
      name: 'Luisa',
      id: '321',
    });
    players.push({
      name: 'Sebastian',
      id: '456',
    });
    players.push({
      name: 'Jorge',
      id: '789',
    });
    players.push({
      name: 'Alexander',
      id: '888',
    });

    return players;
  }
}
