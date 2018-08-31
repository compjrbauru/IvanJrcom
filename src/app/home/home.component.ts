import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

import { AuthService } from './../services/auth.service';
import { MENU_ITEMS } from './home-menu';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnChanges {
  menu = MENU_ITEMS;
  conta: NbMenuItem[] = [{
    title: 'Conta',
    icon: 'nb-email',
    link: '/home/conta',
    home: true,
  }];
  constructor(
    private router: Router,
    private authService: AuthService,
    private nbMenuService: NbMenuService,
  ) {}

  ngOnChanges() {
    this.authService.token ?
      this.nbMenuService.addItems(this.conta) :
      null;
   }

  changeAdmin() {
    this.router.navigate(['/admin']);
  }
}
