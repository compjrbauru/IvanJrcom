import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class CompraService {
    private ContasDepositoCollection: AngularFirestoreCollection<any> = this.db.collection('/Compras');

    constructor(private db: AngularFirestore) { }

    addCompra(compra: any) {
        compra.id = this.db.createId();
        this.ContasDepositoCollection.doc(compra.id).set({
            ...compra,
        });
    }

}