import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  token: string;
  isLogged$ = new Subject<any>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    public localStorage: LocalStorage,
  ) { }

  signInWithEmail(email, password) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(
        res => {
          if (this.isVerified()) {
            this.getToken();
            return 'sucesso';
          } else {
            this.firebaseAuth.auth.signOut();
            this.isLogged$.next('false');
            return 'Email nao verificado!';
          }
        },
        err => {
          return err.code; // Retorna o erro do firebase para ser tratado no componente
        },
      );
  }

  signout() {
    this.isLogged$.next('false');
    this.firebaseAuth.auth.signOut();
    this.token = null;
    this.localStorage.clearSubscribe();
  }

  getToken() {
    this.firebaseAuth.auth.currentUser
      .getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  getUser() {
    return this.firebaseAuth.auth.currentUser;
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
    return this.firebaseAuth.auth
      .sendPasswordResetEmail(email)
      .then(res => {
        return 'success';
      })
      .catch(err => {
        return err.code;
      });
  }

  signupUser(email: string, password: string) {
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        return 'success'; // pro componente saber se deu certo
      })
      .catch(err => {
        return err.code; // Retorna o erro para ser tratado no componente registrar
      });
  }

  authFacebook() {
    return this.firebaseAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(
        (res: any) => {
          const user = res.user;
          const info = res.additionalUserInfo;
          const profile: any = info.profile;
          this.token = res.credential.accessToken;

          if (info.isNewUser) {
            const userdata = {
              // Dados recebidos do Facebook
              nome: profile.first_name,
              sobrenome: profile.last_name,
              email: profile.email,
              id: user.uid,
              registroCompleto: false,
            };
            return userdata;
          } else {
            return 'sucesso';
          }
        },
        error => {
          return error.code;
        },
      );
  }

  onStateChange() {
    return this.isLogged$;
  }

  setLocal(user: any) {
    return this.localStorage.setItem('user', user).subscribe(ok => this.isLogged$.next('true'));
  }

  getResolvedUser() {
    return this.localStorage.getItem('user');
  }
}
