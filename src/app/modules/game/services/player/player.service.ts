import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

//Models

import { HttpClient } from '@angular/common/http';
import { PlayerModel } from '../../models/playerModel';
import { UserGoogle } from '../../models/user-google.models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerRef: CollectionReference = collection(this.firestore, 'users');

  constructor(private firestore: Firestore, private http: HttpClient) {}

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

  public createGame(body: any) {
    return this.http.post('http://localhost:8081/juego/crear/', { ...body });
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
