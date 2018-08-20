import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QueryService {
  data: any;
  constructor(private db: AngularFirestore) {

  }

  categoriaAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(switchMap(cat =>
      this.db.collection('/Evento', ref => ref.where('categoria', '==', cat)).valueChanges()));
    return queryObservable;
  }

  eventoAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(switchMap(cat =>
      this.db.collection('/Evento', ref => ref.where('nome', '==', cat)).valueChanges()));
    return queryObservable;
  }

  eventoIdAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(switchMap(cat =>
      this.db.collection('/Evento', ref => ref.where('id', '==', cat)).valueChanges()));
    return queryObservable;
  }

  eventoOrder(ord$: Subject<string>) {
    const queryObservable = ord$.pipe(switchMap(cat =>
      this.db.collection('/Evento', ref => ref.orderBy(cat)).valueChanges()));
    return queryObservable;
  }

}


