import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class IngressosService {
  datePipe = new DatePipe('pt-BR');

  private IngressosFisicosCollection: AngularFirestoreCollection<any> = this.db.collection('/IngressosFisicos');
  private IngressosCollection: AngularFirestoreCollection<any> = this.db.collection('/Ingressos');
  constructor(private db: AngularFirestore) { }


  addIngressos(qtyIngressos: any, evento: any, fisico = false): string[] {
    const idIngressos: string[] = [];
    for (const tipoIngresso of Object.keys(qtyIngressos)) {
      for (let i = 0; i < qtyIngressos[tipoIngresso]; i++) {
        idIngressos.push(this.db.createId());
        this.IngressosCollection.doc(idIngressos[idIngressos.length - 1]).set({
          fisico: fisico,
          id: idIngressos[idIngressos.length - 1],
          idEvento: evento.id,
          lido: false,
          tipo: tipoIngresso,
          valor: evento.ingressos[tipoIngresso].valor,
        });
      }
    }
    return idIngressos;
  }


  private resolveIngressos(evento: any) {

    const ingressos = new Array<Object>();

    Object.keys(evento.numeroIngressos).map(x => {
      let i = 0;
      while (i < evento.numeroIngressos[x]) {
        ingressos.push({
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
