import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UsuarioService {
  private UsuarioCollection: AngularFirestoreCollection<
    any
    > = this.db.collection('/Usuario');

  constructor(private db: AngularFirestore) { }

  addUsuario(usuario: any): Observable<any> {
    usuario.id = this.db.createId();
    this.UsuarioCollection.doc(usuario.id).set({
      ...usuario,
    });
    return observableOf([...usuario]);
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
}
