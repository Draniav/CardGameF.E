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
import {Player} from '../../models/user-google.models';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private firestore: Firestore, private http: HttpClient, private auth: Auth) {
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
    Observable<Player[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, {idField: 'id'}) as Observable<Player[]>;
  }




}
