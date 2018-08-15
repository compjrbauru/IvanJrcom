import { EventoService } from './../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  eventos: Observable<any>;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventos = this.eventoService.getAll();
  }

}
