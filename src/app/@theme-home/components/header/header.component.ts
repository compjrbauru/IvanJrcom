import { MENU_ITEMS } from './../../../home/home-menu';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from './../../../services/auth.service';
import { filter, tap, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  logado = false;
  menu = MENU_ITEMS;
  conta = {
    title: 'Conta',
    icon: 'nb-email',
    link: '/home/conta',
  };

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Perfil' }, { title: 'Sair' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private route: Router,
              private authService: AuthService,
            ) {
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe(title => {
      if (title.item.title === 'Sair') {
        this.sair();
      } else if (title.item.title === 'Perfil') {
        this.route.navigate(['/home/conta']);
      }
    });
    this.authService.onStateChange().pipe(
      tap( isLogged => {
        if (!isLogged && this.logado)
          this.sair();
      }),
      filter(isLogged => {
        return isLogged === true;
      }),
      mergeMap(() => this.authService.getResolvedUser()),
    ).subscribe( (user) => {
      if (!this.logado)
        this.menu.push(this.conta);
      this.user = user;
      this.logado = true;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  toggleLogado() {
    return (this.authService.token) ? true : false;
  }

  goToHome() {
    this.route.navigate(['/home']);
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  loadadmin() {
    this.route.navigate(['/pages']);
  }

  sair() {
    this.menu.pop();
    this.logado = false;
    this.authService.signout();
    this.route.navigate(['/home']);
  }

  login() {
  /*   this.logado = !this.logado; */
    this.route.navigate(['/home/login']);
  }

  register() {
    this.route.navigate(['/home/register']);
  }

  admin() {
    this.route.navigate(['/admin/main']);
  }
}
