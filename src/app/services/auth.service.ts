import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(private firebaseAuth: AngularFireAuth) { }

  signInWithEmail(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this.firebaseAuth.auth.currentUser.getIdToken().then((tok: string) => {
        this.token = tok;
      });
      return 'sucesso';
    }, err => {
      return err.code; // Retorna o erro do firebase para ser tratado no componente
    });
  }

  signout() {
    this.firebaseAuth.auth.signOut();
    this.token = null;
  }

  getToken() {
    this.firebaseAuth.auth.currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  getUser() {
    return this.firebaseAuth.auth.currentUser;
  }

  isAuthenticated() {
    return this.token != null;
  }

  isVerified() {
    return this.firebaseAuth.auth.currentUser.emailVerified;
  }

  ReturnUsername(): string {
    return this.firebaseAuth.auth.currentUser.displayName;
  }

  ReturnEmail(): string {
    return this.firebaseAuth.auth.currentUser.email;
  }

  resetPassword(email: string) {
    this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  signupUser(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      return 'success'; // pro componente saber se deu certo
    }).catch(err => {
      return err.code; // Retorna o erro para ser tratado no componente registrar
    });
  }

  authFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(res => {
        const user = res.user;
        const credential = res.credential;
    });
  }
}
