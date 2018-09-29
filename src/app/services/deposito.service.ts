import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  editContaDeposito(conta: any) {
    return this.ContasDepositoCollection.doc(conta.id).set(conta);
  }

  getContaDeposito() {
    const collections$: Observable<any> = this.ContasDepositoCollection.valueChanges();
    return collections$;
  }

  getContaDepositoID(conta$: Subject<any>) {
    return conta$.pipe(
      switchMap(conta =>
        this.db
          .collection('/Categorias', ref => ref.where('id', '==', conta))
          .valueChanges(),
      ),
    );
  }
}
