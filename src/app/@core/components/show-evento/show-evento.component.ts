import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'ngx-show-evento',
  templateUrl: './show-evento.component.html',
  styleUrls: ['./show-evento.component.scss'],
})
export class ShowEventoComponent implements OnInit {
  @Input() evento: any;

  constructor() { }

  ngOnInit() {
  }
}
