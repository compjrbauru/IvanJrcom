import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {

  @Input() items: any;
  @Input() queryRequest: any;
  @Input() cat$: Subject<string>;

  // Opicional
  @Input() tipoDado: string;

  dadosClick: any = [];
  response: any;
  clicked: boolean;
  emitido = false;

  constructor() { }

  ngOnInit() {
    this.queryRequest.subscribe(response => {
      this.response = response;
    });
  }

  open(item: any) {

  }
}
