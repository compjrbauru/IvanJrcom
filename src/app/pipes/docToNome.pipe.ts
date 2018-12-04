import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'ngx-doc-to-nome',
})
export class DocToNomePipe implements PipeTransform {
  private CategoriasCollection: AngularFirestoreCollection<any> = this.db.collection('/Categorias');
  constructor(private db: AngularFirestore) { }
  transform(id: any): any {
    return this.CategoriasCollection.doc(id).valueChanges().pipe(
      map(categoria => categoria[0]),
    );
  }
}
