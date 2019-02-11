import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of as observableOf, Subject, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class UsuarioService {
  private UsuarioCollection: AngularFirestoreCollection<any> = this.db.collection('/Usuario');

  constructor(
    private db: AngularFirestore,
    private localStorage: LocalStorage,
  ) { }

  getAll(): Observable<any> {
    return this.UsuarioCollection.valueChanges();
  }

  addUsuario(usuario: any): Observable<any> {
    usuario.id = this.db.createId();
    this.UsuarioCollection.doc(usuario.id).set({
      ...usuario,
    });
    return observableOf(usuario);
  }

  patchUsuario(usuario: any, id): Observable<any> {
    return from(this.UsuarioCollection.doc(id).set({
      ...usuario,
      id: id,
    }));
  }


  getUsuarioEmailAsync(cat$: Subject<any>) {
    return cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/Usuario', ref => ref.where('email', '==', cat))
          .valueChanges(),
      ),
    );
  }

  getUsuarioEmail(email: string) {
    return this.db
      .collection('/Usuario', ref => ref.where('email', '==', email))
      .valueChanges();
  }

  setItemCompra(compra: any): Observable<any> {
    return this.localStorage.setItem('compra', compra);
  }

  getItemCompra(): Observable<any> {
    return this.localStorage.getItem('compra');
  }
}
