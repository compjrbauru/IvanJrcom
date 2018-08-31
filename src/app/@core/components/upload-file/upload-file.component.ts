import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  @Output()
  uploadEmitter = new EventEmitter<any>();
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  isHovering: boolean;
  imgenviada = false;
  path: string;
  constructor(
    private storage: AngularFireStorage,
    private queryservice: QueryService,
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.path = `Eventos/${new Date().getTime()}_${file.name}`;
    this.task = this.queryservice.sendImage(this.path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.storage
          .ref(this.path)
          .getDownloadURL()
          .subscribe(ref => {
            this.uploadEmitter.emit(ref);
            this.imgenviada = true;
          });
      }),
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  excluirimg() {
    this.storage
      .ref(this.path)
      .delete()
      .subscribe(res => {
        this.percentage = null;
        this.snapshot = null;
        this.task = null;
        this.path = '';
        this.uploadEmitter.emit(this.path);
        this.imgenviada = false;
      });
  }
}
