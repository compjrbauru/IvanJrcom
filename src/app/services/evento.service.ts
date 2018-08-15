import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventoService {
  datePipe = new DatePipe('pt-BR');

  private EventoCollection: AngularFirestoreCollection<any> = this.db.collection('/Evento');

  data: any;

  constructor(private db: AngularFirestore) { }

  getAll(): Observable<any> {
    return this.EventoCollection.valueChanges();
  }

  addData(evento: any) {
    evento.id = this.db.createId();
    this.EventoCollection.doc(evento.id).set({
      ...evento,
    });
  }

  removeData(id: any) {
    return this.db.doc(`/Evento/${id}`).delete();
  }

}


