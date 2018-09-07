import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { QueryService } from '../../../services/query.service';
// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit, CanComponentDeactivate {
  form: any = {};
  categorias: Observable<any>;
  categoria: any;
  formReset = false;
  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private queryservice: QueryService,
  ) {}

  ngOnInit() {
    this.categorias = this.categoriaService.getCategoria();
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.addData(form);
    this.categoria = this.categoriaService
      .searchrcategoriabynome(form.categoria)
      .subscribe((res: any) => {
        this.categoriaService.patchCategoria(res[0], form);
        this.categoria.unsubscribe();
      });

    alert('Evento criado com sucesso!');

    this.form['formEvent'].reset();
    this.formReset = !this.formReset;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formEvent'] &&
      this.form['formEvent'].value.pathurl !== '' &&
      this.form['formEvent'].value.pathurl !== null
    ) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '40%',
        data: {
          header: 'Aviso!',
          text: 'Você enviou uma imagem, tem certeza que deseja sair ?',
        },
        disableClose: true,
      });
      return dialogRef.afterClosed().pipe(
        tap(res => {
          if (res === true) {
            this.queryservice.deleteImage(this.form['formEvent'].value.pathurl);
          }
        }),
      );
    } else {
      return true;
    }
  }
}
