import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore, setDoc,
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Auth, getAuth} from '@angular/fire/auth';

//Models

import {HttpClient} from '@angular/common/http';
import {PlayerModel} from '../../models/playerModel';
import {UserGoogle} from '../../models/user-google.models';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerRef: CollectionReference = collection(this.firestore, 'users');

  constructor(private firestore: Firestore, private http: HttpClient, private auth: Auth) {
  }


  addUser(user: UserGoogle) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

  newUser() {
    const DataBaseRef = collection(this.firestore, 'users')
    const user = getAuth().currentUser;
    const userRef = doc(DataBaseRef, user?.uid)
    console.log(user);
    return setDoc(userRef, {
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL
    })

  }

  getAllPlayers():
    Observable<UserGoogle[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, {idField: 'id'}) as Observable<UserGoogle[]>;
  }

  listar(): Observable<UserGoogle[]> {
    const dataBaseRef = collection(this.firestore, 'users')
    return collectionData(dataBaseRef, {idField: 'id'}) as Observable<UserGoogle[]>;

  }

  createGame(body: any) {
    return this.http.post('http://localhost:8080/juego/crear/', {...body});
  }


}
