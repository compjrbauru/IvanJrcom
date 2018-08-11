import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeAnimations } from '../@core/animations/animations';
import { MENU_ITEMS } from './home-menu';

@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor(private router: Router) {}
  xx;
  ngOnInit() {}

  changeAdmin() {
    this.router.navigate(["/admin"]);
  }
}
