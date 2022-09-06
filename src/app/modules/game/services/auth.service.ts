import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authentication: Auth) {}

  loginWithGoogle() {
    return signInWithPopup(this.authentication, new GoogleAuthProvider());
  }
  logOut() {
    return signOut(this.authentication);
  }
}
