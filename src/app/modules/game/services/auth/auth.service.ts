import {Injectable} from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut, User,
} from '@angular/fire/auth';
import {Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authentication: Auth, private store: Firestore) {
  }

  loginWithGoogle() {
    return signInWithPopup(this.authentication, new GoogleAuthProvider());
  }

  logOut() {
    return signOut(this.authentication);
  }

  getMyUser(): User | null {
    return this.authentication.currentUser;

  }
}
