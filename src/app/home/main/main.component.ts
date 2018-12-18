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
    this.search = event;
  }
}
