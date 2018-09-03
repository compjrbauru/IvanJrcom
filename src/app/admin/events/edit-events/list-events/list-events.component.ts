import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { CategoriaService } from '../../../../services/categoria.service';
import { EventoService } from './../../../../services/evento.service';
import { QueryService } from './../../../../services/query.service';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit {
  form: any = {};
  categorias: Observable<any>;
  categoria: any;
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = [];
  catID$ = new Subject<string>();

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
    this.categorias = this.categoriaService.getCategoria();
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.patchData(form, this.eventoResolver.id);
    this.categoria = this.categoriaService.searchrcategoriabynome(form.categoria).subscribe(
      (res: any) => {
        this.categoriaService.patchCategoria(res[0], form);
        this.categoria.unsubscribe();
      },
    );

    alert('Evento editado com sucesso!');
    this.eventoResolver = [];
    this.form['formEvent'].reset();
   }

   deleteForm(form: any) {
    this.categoriaService.searchrcategoriabynome(form.categoria).subscribe(categoria => {
      [this.categoria] = categoria;
      forkJoin(
        this.categoriaService.patchDeleteEventCategoria(this.categoria, form),
        this.eventoService.removeData(form.id),
        this.queryService.deleteImage(form.pathurl),
      ).subscribe();
    });
   }

}
