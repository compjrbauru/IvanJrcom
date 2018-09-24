import { switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class IngressosService {
    datePipe = new DatePipe('pt-BR');

    private IngressosFisicosCollection: AngularFirestoreCollection<any> = this.db.collection('/IngressosFisicos');

    constructor(private db: AngularFirestore) { }

    getAll(): Observable<any> {
        return this.IngressosFisicosCollection.valueChanges();
      }
    

}