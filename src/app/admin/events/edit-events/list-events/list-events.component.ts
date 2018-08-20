import { QueryService } from './../../../../services/query.service';
import { EventoService } from './../../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit {
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  catID$ = new Subject<string>();

  constructor(private eventoService: EventoService, private queryService: QueryService) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
  }

  resolver(event) {

  }

}
