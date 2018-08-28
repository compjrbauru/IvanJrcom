import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EventoService } from './../../services/evento.service';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  eventosAsync: Observable<any>;
  search = false;
  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.eventosAsync = this.eventoService.getCarousel();
  }

  verificaPesquisa(event: boolean) {
    event === true ? (this.search = true) : (this.search = false);
    this.eventosAsync = this.eventoService.getByDate();
  }
}
