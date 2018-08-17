import { EventoService } from './../../services/evento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  eventos: any;
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getAll().subscribe(response => {
      this.eventos = response;
    });
  }

}
