import { QueryService } from './../../../services/query.service';
import { EventoService } from './../../../services/evento.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IngressosService } from '../../../services/ingressos.service';

@Component({
  selector: 'ngx-ingressos-gerados',
  templateUrl: './ingressos-gerados.component.html',
  styleUrls: ['./ingressos-gerados.component.scss'],
})
export class IngressosGeradosComponent implements OnInit {
  
  form: any = {};
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = null;
  catID$ = new Subject<string>();

  constructor(
    private ingressosService: IngressosService,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.ingressosService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.ingressoIdAsync(this.catID$);
  }


  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

}
