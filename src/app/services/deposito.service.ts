import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class DepositoService {
  private ContasDepositoCollection: AngularFirestoreCollection<any> = this.db.collection('/ContasDeposito');

  constructor(private db: AngularFirestore) { }

  addContaDeposito(deposito: any) {
    deposito.id = this.db.createId();
    this.ContasDepositoCollection.doc(deposito.id).set({
      ...deposito,
    });
  }
}
