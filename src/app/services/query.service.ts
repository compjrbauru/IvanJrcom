import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable, merge } from 'rxjs';

@Injectable()
export class QueryService {
  data: any;
  formValue: any;
  order: any;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) {}

  categoriaAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/Evento', ref => ref.where('categoria', '==', cat))
          .valueChanges(),
      ),
    );
    return queryObservable;
  }

  eventoAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/Evento', ref => ref.where('nome', '==', cat))
          .valueChanges(),
      ),
    );
    return queryObservable;
  }

  eventoIdAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/Evento', ref => ref.where('id', '==', cat))
          .valueChanges(),
      ),
    );
    return queryObservable;
  }

  ingressoIdAsync(cat$: Subject<any>) {
    const queryObservable = cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/IngressosFisicos', ref => ref.where('idEvento', '==', cat))
          .valueChanges(),
      ),
    );
    return queryObservable;
  }

  eventoOrder(ord$: Subject<string>) {
    const queryObservable = ord$.pipe(
      switchMap(cat =>
        this.db.collection('/Evento', ref => ref.orderBy(cat)).valueChanges(),
      ),
    );
    return queryObservable;
  }

  searchEvento(formValue: any, order: string[]): Observable<any> {
    const EventosAsync: any = [];
    if (formValue.evento !== '') {
      EventosAsync.push(this.db.collection('/Evento', ref => ref.orderBy(order[0]).startAt(formValue.evento).endAt(`${formValue.evento}\uf8ff`)).valueChanges());
    }
    if (formValue.local !== '') {
      EventosAsync.push(this.db.collection('/Evento', ref => ref.orderBy(order[1]).startAt(formValue.local).endAt(`${formValue.local}\uf8ff`)).valueChanges());
    }
    if (formValue.categoria !== null) {
      EventosAsync.push(this.db.collection('/Evento', ref => ref.where('categoria', '==', formValue.categoria)).valueChanges());
    }
    return merge(...EventosAsync);
  }

  sendImage(path: any, file: any) {
    return this.storage.upload(path, file);
  }

  deleteImage(path: any): Observable<any> {
    return this.storage.ref(path).delete();
  }

  getUrlImage(path: any) {
    return this.storage.ref(path).getDownloadURL();
  }
}
