import { EventoService } from './../../services/evento.service';
import { QueryService } from './../../services/query.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ngx-ingressos-fisicos',
  templateUrl: './ingressos-fisicos.component.html',
  styleUrls: ['./ingressos-fisicos.component.scss'],
})
export class IngressosFisicosComponent implements OnInit {

  form: any = {};
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = [];
  catID$ = new Subject<string>();

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  submit(form: any) {

  }


}
