import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class IngressosService {
    datePipe = new DatePipe('pt-BR');

    private IngressosFisicosCollection: AngularFirestoreCollection<any> = this.db.collection('/IngressosFisicos');

    constructor(private db: AngularFirestore) { }

    private resolveIngressos(evento: any) {

      const ingressos = new Array<Object>();

      Object.keys(evento.numeroIngressos).map(x => {
        let i = 0;
        while ( i < evento.numeroIngressos[x] ) {
          ingressos.push( {
            id: this.db.createId(),
            tipo: x,
            valor: evento.valor[x],
          });
          i++;
        }
      });

      return ingressos;
    }

    addData(ingressosFisicos: any) {
      ingressosFisicos.id = this.db.createId();
      ingressosFisicos.ingressos = this.resolveIngressos(ingressosFisicos);
      this.IngressosFisicosCollection.doc(ingressosFisicos.id).set({
        ...ingressosFisicos,
      });
    }
}
