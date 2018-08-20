import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MENU_ITEMS } from './home-menu';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor(private router: Router) {}

  ngOnInit() {}

  changeAdmin() {
    this.router.navigate(['/admin']);
  }
}
