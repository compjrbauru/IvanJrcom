import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfirmationModalComponent } from '../../../@core/components/confirmation-modal/confirmation-modal.component';
import { UploadFileComponent } from '../../../@core/components/upload-file/upload-file.component';
import { CategoriaService } from '../../../services/categoria.service';
import { NotificacaoService } from '../../../services/notificacao.service';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'ngx-edit-categorias',
  templateUrl: './edit-categorias.component.html',
  styleUrls: ['./edit-categorias.component.scss'],
})
export class EditCategoriasComponent implements OnInit {
  form: any = {};
  categorias: Observable<any>;
  catID$ = new Subject<string>();
  categoriasID: Observable<any>;
  eventoResolver: any = [];
  @ViewChild(UploadFileComponent) private upload: UploadFileComponent;

  constructor(
    private categoriaService: CategoriaService,
    private notific: NotificacaoService,
    private queryService: QueryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.categorias = this.categoriaService.getCategoria();
    this.catID$ = new Subject<string>();
    this.categoriasID = this.categoriaService.getCategoriaID(this.catID$);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formCategoria'].value.pathurl !== '' &&
      this.form['formCategoria'].value.pathurl !== this.eventoResolver.pathurl
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
            this.queryService.deleteImage(this.form['formCategoria'].value.pathurl);
          }
        }),
      );
    } else {
      return true;
    }
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  imagemupdate(event: any) {
    this.form['formCategoria'].controls['url'].setValue(event.url);
    this.form['formCategoria'].controls['pathurl'].setValue(event.pathurl);
  }

  Submit(form: any) {
    if (form.value.pathurl !== this.eventoResolver.pathurl) {
      this.queryService.deleteImage(this.eventoResolver.pathurl).subscribe();
    }
    this.categoriaService.editCategoria(form.value);
    this.eventoResolver = [];
    this.form['formCategoria'].reset();
    this.upload.resetUpload();
    this.notific.ngxtoaster('Categoria editada com sucesso!', '', true);
  }



}
