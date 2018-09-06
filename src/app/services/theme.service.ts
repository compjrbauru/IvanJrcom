import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ThemeService {

  private ThemeCollection: AngularFirestoreCollection<any> = this.db.collection('/Theme');

  constructor(private db: AngularFirestore) { }

  changeTheme(key: string, id: string) {
    return this.ThemeCollection.doc(id).set({
      tema: key,
      id: id,
    });
  }

  getTheme() {
    return this.ThemeCollection.valueChanges();
  }

}
