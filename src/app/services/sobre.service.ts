import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class SobreService {

constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db.collection('/Sobre').valueChanges();
  }

  getSobre(id) {
    return this.db.collection('/Sobre').doc(id).valueChanges();
  }

  patchSobre(id, texto) {
    return this.db.collection('/Sobre').doc(id).set({
      sobre: texto,
      id: id,
    });
  }

  deleteSobre(id) {
    return this.db.collection('/Sobre').doc(id).delete();
  }

  postSobre(texto) {
    const id = this.db.createId();
    return this.db.collection('/Sobre').doc(id).set({
      id: id,
      sobre: texto,
    });
  }

}
