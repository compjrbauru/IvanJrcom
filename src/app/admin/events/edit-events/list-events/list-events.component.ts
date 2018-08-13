import { EventoService } from './../../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit {
  eventoAsync: Observable<any>;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
  }

}
