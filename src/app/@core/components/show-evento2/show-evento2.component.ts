import { Component, OnInit } from '@angular/core';
import { first, last } from 'lodash';

import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'ngx-show-evento2',
  templateUrl: './show-evento2.component.html',
  styleUrls: ['./show-evento2.component.scss'],
})
export class ShowEvento2Component implements OnInit {
  eventos: any;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getByNameWithLimit().subscribe(response => this.eventos = response);
  }

  next() {
    this.eventoService.getByNameWithLimitWithStart(
      last(this.eventos)).subscribe(response => response.lenght ? this.eventos = response : this.eventos);
  }

  prev() {
    this.eventoService.getByNameWithLimitWithEnd(
      first(this.eventos))
      .subscribe(response => response.lenght ? this.eventos = response : this.eventos);
  }

}
