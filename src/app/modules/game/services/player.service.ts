import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

//Models
import { PlayerModel } from '../models/playerModel';
import { UserGoogle } from '../models/user-google.models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  //private collection: AngularFirestoreCollection<PlayerModel>;

  constructor(private firestore: Firestore) {
    // this.collection = storage.collection<PlayerModel>('players');
    //}
  }
  addUser(user: UserGoogle) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

  getAllPlayers(): Observable<UserGoogle[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<
      UserGoogle[]
    >;
  }

  getPlayers(): Array<PlayerModel> {
    //const players = new Array<PlayerModel>();
    const players = [];
    players.push({
      name: 'Camilo',
      uid: '123',
    });
    players.push({
      name: 'Luisa',
      uid: '321',
    });
    players.push({
      name: 'Sebastian',
      uid: '456',
    });
    players.push({
      name: 'Jorge',
      uid: '789',
    });
    players.push({
      name: 'Alexander',
      uid: '888',
    });

    return players;
  }
}
