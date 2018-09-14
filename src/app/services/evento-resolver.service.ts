import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class EventoResolver {

  constructor(private db: AngularFirestore, private localData: LocalStorage) { }

}
