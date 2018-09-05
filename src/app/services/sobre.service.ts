import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { pluck } from 'rxjs/operators';

@Injectable()
export class SobreService {

constructor(private db: AngularFirestore) {}

  getSobre() {
    return this.db.collection('/Sobre').valueChanges().pipe(pluck('0'));
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
