import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

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

    getComprasIdUser(id: string): Observable<any> {
        return this.db.collection(`Compras`, ref => ref.where('userid', '==', id)).valueChanges().pipe(take(1));
    }

    getOne(id: string): Observable<any> {
        return this.ContasDepositoCollection.doc(id).valueChanges().pipe(take(1));
    }
}
