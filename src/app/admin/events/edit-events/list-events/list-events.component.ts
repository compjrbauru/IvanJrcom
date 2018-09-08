import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

import { CategoriaService } from '../../../../services/categoria.service';
import { EventoService } from './../../../../services/evento.service';
import { QueryService } from './../../../../services/query.service';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit, OnDestroy {
  form: any = {};
  categorias: any;
  categoria: any;
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = [];
  catID$ = new Subject<string>();
  private unsubscribeCategoria: Subject<void> = new Subject();
  categoriaSelected: any = {};

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
    this.categoriaService.getCategoria().pipe(takeUntil(this.unsubscribeCategoria)).subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.patchData(form, this.eventoResolver.id);
    this.categoriaService.patchCategoria(this.categorias, form);

    alert('Evento editado com sucesso!');
    this.eventoResolver = [];
    this.form['formEvent'].reset();
   }

   deleteForm(form: any) {
    this.categoriaService.searchrcategoriabynome(form.categoria).subscribe(categoria => {
      [this.categoria] = categoria;
      this.categoriaService.patchDeleteEventCategoria(this.categoria, form);
      this.eventoService.removeData(form.id);
      this.queryService.deleteImage(form.pathurl);
    });
   }

   ngOnDestroy() {
    this.unsubscribeCategoria.next();
    this.unsubscribeCategoria.complete();
   }

}
