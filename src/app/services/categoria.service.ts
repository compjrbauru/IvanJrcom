import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subject, forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

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

  getCategoriaDestaque() {
    return this.db.collection('/Categorias', ref => ref.where('mostrarHome', '==', true)).valueChanges();
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
    categoria.busca = categoria.nome.toLowerCase();
    return this.CategoriasCollection.doc(categoria.id).set(categoria);
  }

  findByName(nomeCategoria: any) {
    return this.db.collection('/Categorias', ref => ref.where('nome', '==', nomeCategoria)).valueChanges();
  }

  patchCategoria(evento: any) {
    this.findByName(evento.categoria).pipe(map((categoria: any) => {
      const newCategoria = categoria;
      newCategoria.count++;
      newCategoria.idsevento.push(evento.id);
      this.CategoriasCollection.doc(newCategoria.id).set({
        ...newCategoria,
      });
    })).subscribe();
  }

  patchEditCategoria(evento: any, eventoResolver: any) {
    if (evento.categoria !== eventoResolver.categoria) {
      // tslint:disable-next-line:max-line-length
      forkJoin([
        this.findByName(evento.categoria),
        this.findByName(eventoResolver.categoria)])
      .subscribe(
        ([categoriaAtual, categoriaAnterior]): any => {
        const [newAtual] = <any>categoriaAtual;
        const [newAnterior] = <any>categoriaAnterior;
        newAnterior.count--;
        newAtual.count++;
        newAtual.idsevento.push(evento.id);
        newAnterior.idsevento.splice(newAnterior.idsevento.indexOf(eventoResolver.id), 1);
        this.CategoriasCollection.doc(newAtual.id).set({ ...newAtual });
        this.CategoriasCollection.doc(newAnterior.id).set({ ...newAnterior });
      });
    }
  }

  patchDeleteEventCategoria(categoria: any, evento: any) {
    categoria.idsevento.splice(categoria.idsevento.indexOf(evento.id), 1);
    categoria.count--;
    return this.CategoriasCollection.doc(categoria.id).set({ ...categoria });
  }

  removeCategoria(id: any) {
    return this.db.doc(`/Categorias/${id}`).delete();
  }
}
