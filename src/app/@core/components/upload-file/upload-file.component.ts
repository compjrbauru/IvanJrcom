import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { QueryService } from '../../../services/query.service';
import { NotificacaoService } from './../../../services/notificacao.service';

@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  @Output()
  uploadEmitter = new EventEmitter<any>();
  @Input()
  localName: string;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  isHovering: boolean;
  imgenviada = false;
  path: string;
  constructor(
    private queryservice: QueryService,
    private notific: NotificacaoService,
  ) {}

  resetUpload() {
    this.percentage = null;
    this.snapshot = null;
    this.task = null;
    this.path = '';
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      this.notific.ngxtoaster('OPS!', 'Este arquivo não é uma imagem.', false);
      return;
    }
    this.uploadEmitter.emit({
      url: null,
      pathurl: null,
    });
    this.path = this.localName + `/${new Date().getTime()}_${file.name}`;
    this.task = this.queryservice.sendImage(this.path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.queryservice.getUrlImage(this.path).subscribe(ref => {
          this.uploadEmitter.emit({
            url: ref,
            pathurl: this.path,
          });
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
    this.queryservice.deleteImage(this.path).subscribe(res => {
      this.resetUpload();
      this.uploadEmitter.emit({
        url: '',
        pathurl: '',
      });
      this.imgenviada = false;
    });
  }
}
