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

    private postIngressosFisicos(ingressosGerados: any[]) {
      ingressosGerados.forEach(ingresso => {
        this.IngressosCollection.doc(ingresso.id).set(ingresso);
      });
      return ingressosGerados.map(ingresso => ingresso.id);
    }

    geraIngressos(ingressosFisiscos: any) {
      const ingressosGeradosMasculino = Array(ingressosFisiscos.numero.masculino)
        .fill({
          id: this.db.createId(),
          tipo: 'masculino',
          valor: ingressosFisiscos.valor.masculino,
          fisico: true,
          lido: false,
        });
      const ingressosGeradosFeminino = Array(ingressosFisiscos.numero.feminino)
      .fill({
        id: this.db.createId(),
        tipo: 'feminino',
        valor: ingressosFisiscos.valor.feminino,
        fisico: true,
        lido: false,
      });
      const ingressosGeradosUnisex = Array(ingressosFisiscos.numero.unisex)
      .fill({
        id: this.db.createId(),
        tipo: 'unisex',
        valor: ingressosFisiscos.valor.unisex,
        fisico: true,
        lido: false,
      });
      return [ ...ingressosGeradosMasculino, ...ingressosGeradosFeminino, ...ingressosGeradosUnisex ];
    }

    addData(ingressosFisicos: any) {
      ingressosFisicos.id = this.db.createId();
      const ingressosGerados = this.geraIngressos({ numero: ingressosFisicos.numeroIngressos, valor: ingressosFisicos.valor });
      ingressosFisicos.ingressos = this.postIngressosFisicos(ingressosGerados);
      this.IngressosFisicosCollection.doc(ingressosFisicos.id).set({
        ...ingressosFisicos,
      });
    }


}
