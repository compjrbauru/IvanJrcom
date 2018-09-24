import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfirmationModalComponent } from '../../../@core/components/confirmation-modal/confirmation-modal.component';
import { UploadFileComponent } from '../../../@core/components/upload-file/upload-file.component';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { CategoriaService } from '../../../services/categoria.service';
import { QueryService } from '../../../services/query.service';
import { NotificacaoService } from './../../../services/notificacao.service';

@Component({
  selector: 'ngx-create-categorias',
  templateUrl: './create-categorias.component.html',
  styleUrls: ['./create-categorias.component.scss'],
})
export class CreateCategoriasComponent implements OnInit, CanComponentDeactivate {
  form: any = {};
  @ViewChild(UploadFileComponent) private upload: UploadFileComponent;

  constructor(
    private queryservice: QueryService,
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
    private notific: NotificacaoService,
  ) { }

  ngOnInit() {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formCategoria'].value.pathurl !== '' &&
      this.form['formCategoria'].value.pathurl !== null
    ) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '40%',
        data: {
          header: 'Aviso!',
          text: 'Você enviou uma imagem, tem certeza que deseja sair?',
        },
        disableClose: true,
      });
      return dialogRef.afterClosed().pipe(
        tap(res => {
          if (res === true) {
            this.queryservice.deleteImage(this.form['formCategoria'].value.pathurl);
          }
        }),
      );
    } else {
      return true;
    }
  }

  Submit(form: any) {
    this.categoriaService.addCategoria(form.value);
    this.form['formCategoria'].reset();
    this.upload.resetUpload();
    this.notific.ngxtoaster('Categoria criada com sucesso!', '', true);
  }

  imagemupdate(event: any) {
    this.form['formCategoria'].controls['url'].setValue(event.url);
    this.form['formCategoria'].controls['pathurl'].setValue(event.pathurl);
  }

}
