import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
@Component({
  selector: 'ngx-carousel',
  templateUrl: './carousel-local.component.html',
  styleUrls: ['./carousel-local.component.scss'],
})
export class CarouselLocalComponent implements OnInit {
  @Input() eventos: Observable<any>;
  eventosShow: any;

  constructor() { }

  ngOnInit() {
    this.eventos.subscribe(response => {
      this.eventosShow = response;
    });
  }

}
