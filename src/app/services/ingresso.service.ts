import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class IngressoService {
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


}
