import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  private UsuarioCollection: AngularFirestoreCollection<any> = this.db.collection('/Usuario');

  constructor(private db: AngularFirestore) { }

  addUsuario(usuario: any) {
    usuario.id = this.db.createId();
    this.UsuarioCollection.doc(usuario.id).set({
      ...usuario,
    });
  }

}
