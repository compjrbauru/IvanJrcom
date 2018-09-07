import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit, OnDestroy {
  form: any = {};
  categorias: any;
  categoria: any;
  formReset = false;
  categoriaSelected: any = {};
  private unsubscribeCategoria: Subject<void> = new Subject();

  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
  ) {}

  ngOnInit() {
    this.categoriaService.getCategoria().pipe(takeUntil(this.unsubscribeCategoria)).subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.addData(form);
    this.categoriaService.patchCategoria(this.categorias, form);

    alert('Evento criado com sucesso!');

    this.form['formEvent'].reset();
    this.formReset = !this.formReset;
  }

  ngOnDestroy() {
    this.unsubscribeCategoria.next();
    this.unsubscribeCategoria.complete();
   }
}
