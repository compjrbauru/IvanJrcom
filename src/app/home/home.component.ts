import { Component } from '@angular/core';

import { MENU_ITEMS } from './home-menu';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  menu = MENU_ITEMS;

  constructor() { }

}
