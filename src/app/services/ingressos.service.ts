import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, zip } from 'rxjs';
import { pluck, take } from 'rxjs/operators';


@Injectable()
export class IngressosService {
  datePipe = new DatePipe('pt-BR');

  private IngressosFisicosCollection: AngularFirestoreCollection<any> = this.db.collection('/IngressosFisicos');
  private IngressosCollection: AngularFirestoreCollection<any> = this.db.collection('/Ingressos');

  constructor(private db: AngularFirestore) { }

  transformIdIn(id: string, key: string): Observable<any> {
    return this.db.collection(`/Evento`).doc(id).valueChanges().pipe(pluck(key));
  }

  getOne(id: string) {
    return this.IngressosCollection.doc(id).valueChanges();
  }

  getAllfisicos(resolvedIngressoGerados: any) {
    const ingressosAsync: any = [];
    resolvedIngressoGerados.ingressos.forEach(ingresso => {
      ingressosAsync.push(this.db.collection('/Ingressos').doc(ingresso).valueChanges());
    });
    return zip(...ingressosAsync);
  }

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
        tipo: 'masculino',
        idEvento: ingressosFisiscos.idEvento,
        valor: ingressosFisiscos.valor.masculino,
        fisico: true,
        lido: false,
      })
      .map(ingresso => {
        return { ...ingresso, id: this.db.createId() };
      });
    const ingressosGeradosFeminino = Array(ingressosFisiscos.numero.feminino)
      .fill({
        tipo: 'feminino',
        idEvento: ingressosFisiscos.idEvento,
        valor: ingressosFisiscos.valor.feminino,
        fisico: true,
        lido: false,
      })
      .map(ingresso => {
        return { ...ingresso, id: this.db.createId() };
      });
    const ingressosGeradosUnisex = Array(ingressosFisiscos.numero.unisex)
      .fill({
        tipo: 'unisex',
        idEvento: ingressosFisiscos.idEvento,
        valor: ingressosFisiscos.valor.unisex,
        fisico: true,
        lido: false,
      })
      .map(ingresso => {
        return { ...ingresso, id: this.db.createId() };
      });
    return [ ...ingressosGeradosMasculino, ...ingressosGeradosFeminino, ...ingressosGeradosUnisex ];
  }

  addData(ingressosFisicos: any) {
    ingressosFisicos.id = this.db.createId();
    const ingressosGerados = this.geraIngressos({ numero: ingressosFisicos.numeroIngressos, valor: ingressosFisicos.valor, idEvento: ingressosFisicos.idEvento });
    ingressosFisicos.ingressos = this.postIngressosFisicos(ingressosGerados);
    this.IngressosFisicosCollection.doc(ingressosFisicos.id).set({
      ...ingressosFisicos,
    });
  }

  getAllIngressosFisiscos(): Observable<any> {
    return this.IngressosFisicosCollection.valueChanges().pipe(
      take(1),
    );
  }


}
