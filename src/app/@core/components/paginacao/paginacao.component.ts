import { EventoService } from './../../../services/evento.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first, last } from 'lodash';

@Component({
  selector: 'ngx-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss'],
})
export class PaginacaoComponent implements OnInit {
  @Input() limit: number = 3;
  @Output() eventosEmit = new EventEmitter();
  last: any;
  first: any;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getByNameWithLimit(this.limit).subscribe(response => {
      this.initializeEvento(response);
    });
  }

  next() {
    this.eventoService
      .getByNameWithLimitWithStart(this.last.nome, this.limit)
      .subscribe(response => this.initializeEvento(response));
  }

  prev() {
    this.eventoService
      .getByNameWithLimitWithEnd(this.first.nome, this.limit)
      .subscribe(response => this.initializeEvento(response));
  }

  initializeEvento(response: any) {
    if (response && response.length) {
      this.eventosEmit.emit(response);
      this.last = last(response);
      this.first = first(response);
    }
  }

}
