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
  buttonclass: any = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.eventoService.getByNameWithLimit().subscribe(response => {
      response.forEach(element => {
        this.buttonclass.push('btn btn-hero-secondary btn-demo');
      });
      this.eventos = response;
    });
  }

  next() {
    this.eventoService
      .getByNameWithLimitWithStart(last(this.eventos))
      .subscribe(
        response =>
          response.lenght ? (this.eventos = response) : this.eventos,
      );
  }

  prev() {
    this.eventoService
      .getByNameWithLimitWithEnd(first(this.eventos))
      .subscribe(
        response =>
          response.lenght ? (this.eventos = response) : this.eventos,
      );
  }

  changeStyle(event: any, i: any) {
    this.buttonclass[i] =
      event.type === 'mouseover'
        ? 'btn btn-hero-success btn-demo'
        : 'btn btn-hero-secondary btn-demo';
  }
}
