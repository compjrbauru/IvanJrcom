import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriaService {
    datePipe = new DatePipe('pt-BR');

    private CategoriasCollection: AngularFirestoreCollection<any> = this.db.collection('/Categorias');

    constructor(private db: AngularFirestore) { }

    searchrcategoriabynome(query: string): any {
      return this.db.collection('Categorias', ref => ref.where('busca', '==', query.toLowerCase()))
        .valueChanges();
      }


    getCategoria() {
      const collections$: Observable<any> = this.CategoriasCollection.valueChanges();
      return collections$;
    }

    addCategoria(categoria: any) {
      categoria.id = this.db.createId();
      categoria.count = 0;
      categoria.idsevento = [];
      categoria.busca = categoria.nome.toLowerCase();
      this.CategoriasCollection.doc(categoria.id).set({
      ...categoria,
      });
    }

    patchCategoria(categoria: any, evento: any) {
      categoria.count++;
      categoria.idsevento.push(evento.id);
      this.CategoriasCollection.doc(categoria.id)
        .set({
            ...categoria,
        });
    }

    patchDeleteEventCategoria(categoria: any, evento: any) {
      categoria.idsevento.splice( categoria.idsevento.indexOf(evento.id), 1 );
      categoria.count--;
      return this.CategoriasCollection.doc(categoria.id)
      .set({
          ...categoria,
      });
    }

    removeCategoria(id: any) {
      return this.db.doc(`/Categorias/${id}`);
    }

}

