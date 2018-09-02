import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-todos-eventos',
  templateUrl: './todos-eventos.component.html',
  styleUrls: ['./todos-eventos.component.scss'],
})
export class TodosEventosComponent implements OnInit {
  eventos: any;
  constructor() { }

  ngOnInit() {
  }

}
