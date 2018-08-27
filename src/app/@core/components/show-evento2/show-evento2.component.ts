import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-show-evento2',
  templateUrl: './show-evento2.component.html',
  styleUrls: ['./show-evento2.component.scss'],
})
export class ShowEvento2Component implements OnInit {
  eventos: any;
  mouseOvered: any = [];

  constructor() {}

  ngOnInit() { }

}
