import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import  memo  from 'memo-decorator';

@Pipe({
  name: 'docToKey',
  pure: true,
})
export class DocToKeyPipe implements PipeTransform {

  constructor(private db: AngularFirestore) { }

  @memo((...args: any[]): string => JSON.stringify(args))
  transform(id: string, nomeColection: string, nomeKey: string): any {
    const keyAsync: Observable<any> = this.searchFire(id, nomeColection, nomeKey);
    return keyAsync;
  }

  searchFire(id: string, nomeColection: string, nomeKey: string) {
    const Collection: AngularFirestoreCollection<any> = this.db.collection(`/${nomeColection}`);
    return Collection.doc(id).valueChanges().pipe(
      pluck(nomeKey),
    );
  }
}


