import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
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
    console.log(this.form['formEvent']);
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '70%',
      data: { event },
      disableClose: true,
    });
    return dialogRef.afterClosed().pipe(
      tap(res => {
        console.log(res);
      }),
    );
  }
}
