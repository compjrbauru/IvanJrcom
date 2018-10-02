import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'ngx-categoria-eventos',
  templateUrl: './categoria-eventos.component.html',
  styleUrls: ['./categoria-eventos.component.scss'],
})
export class CategoriaEventosComponent implements OnInit {
  eventosAsync: Observable<any>;

  constructor(private route: ActivatedRoute, private eventoservice: EventoService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.eventosAsync = this.eventoservice.getCategoria(res.categoria);
    });
  }



}
