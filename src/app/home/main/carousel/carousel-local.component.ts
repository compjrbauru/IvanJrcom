import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './carousel-local.component.html',
  styleUrls: ['./carousel-local.component.scss'],
})
export class CarouselLocalComponent implements OnInit {
  @Input() eventos: any;

  constructor() { }

  ngOnInit() {
    console.log(this.eventos);
  }

}
