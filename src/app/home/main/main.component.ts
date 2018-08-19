import { EventoService } from './../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { QueryService } from '../../services/query.service';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  eventos: any;
  constructor(private queryService: QueryService) {}

  ngOnInit() {
    const order$ = new Subject<any>();
    this.queryService.eventoOrder(order$).subscribe(response => {
      this.eventos = response;
    });
    order$.next('nome');
  }
}
