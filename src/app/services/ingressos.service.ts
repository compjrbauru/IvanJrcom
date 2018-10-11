import { Observable } from 'rxjs';
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

    private resolveIngressos(evento: any) {

      let ingressos = new Array<Object>();

      for(let key in evento.numeroIngressos){
        for(let i=0; i<evento.numeroIngressos[key]; i++) {
          ingressos.push( {
            id: this.db.createId(),
            tipo: key,
            valor: evento.valor[key],
          });
        }
      }
      return ingressos;
    }

    addData(evento: any) {
        evento.id = this.db.createId();
        evento.ingressos = this.resolveIngressos(evento);
        this.IngressosFisicosCollection.doc(evento.id).set({
          ...evento,
        });
      }
}
