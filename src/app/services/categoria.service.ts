import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CategoriaService {
  datePipe = new DatePipe('pt-BR');
  private CategoriasCollection: AngularFirestoreCollection<any> = this.db.collection('/Categorias');

  constructor(private db: AngularFirestore) { }

  searchrcategoriabynome(query: string): any {
    return this.db
      .collection('Categorias', ref =>
        ref.where('busca', '==', query.toLowerCase()),
      )
      .valueChanges();
  }

  getCategoriaID(cat$: Subject<any>) {
    return cat$.pipe(
      switchMap(cat =>
        this.db
          .collection('/Categorias', ref => ref.where('id', '==', cat))
          .valueChanges(),
      ),
    );
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

  editCategoria(categoria) {
    return this.CategoriasCollection.doc(categoria.id).set(categoria);
  }

  patchCategoria(categorias: any, evento: any) {
    const categoria = categorias.find(cat => cat.nome === evento.categoria);
    categoria.count++;
    categoria.idsevento.push(evento.id);
    this.CategoriasCollection.doc(categoria.id).set({
      ...categoria,
    });
  }

  patchEditCategoria(categorias: any, evento: any, eventoResolver: any) {
    const categoria = categorias.find(cat => cat.nome === evento.categoria);
    const categoriaAnterior = categorias.find(
      cat => cat.nome === eventoResolver.categoria,
    );
    if (categoria.nome !== categoriaAnterior.nome) {
      categoriaAnterior.count--;
      categoria.count++;
      categoria.idsevento.push(evento.id);
      categoriaAnterior.idsevento.splice(categoriaAnterior.idsevento.indexOf(eventoResolver.id), 1);
      this.CategoriasCollection.doc(categoria.id).set({ ...categoria });
      this.CategoriasCollection.doc(categoriaAnterior.id).set({ ...categoriaAnterior });
    }
  }

  patchDeleteEventCategoria(categoria: any, evento: any) {
    categoria.idsevento.splice(categoria.idsevento.indexOf(evento.id), 1);
    categoria.count--;
    return this.CategoriasCollection.doc(categoria.id).set({ ...categoria });
  }

  removeCategoria(id: any) {
    return this.db.doc(`/Categorias/${id}`);
  }
}
