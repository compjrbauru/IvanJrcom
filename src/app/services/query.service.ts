import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QueryService {
  data: any;

  constructor(private db: AngularFirestore) {}

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

  eventoOrder(ord$: Subject<string>) {
    const queryObservable = ord$.pipe(
      switchMap(cat =>
        this.db.collection('/Evento', ref => ref.orderBy(cat)).valueChanges(),
      ),
    );
    return queryObservable;
  }

  searchEvento(data: any) {
    if (data.evento !== '') {
      this.db
        .collection('/Evento', ref =>
          ref
            .orderBy('nome')
            .startAt(data.evento)
            .endAt(data.evento + '\uf8ff'),
        )
        .valueChanges()
        .subscribe(res => {
          if (data.local !== '') {
            const filterlocal = res.filter(function(el: any) {
              return el.local.indexOf(data.local) > -1;
            });
            console.log(filterlocal);
          }
        });
    }
  }
}
