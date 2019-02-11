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
  toggle = false;
  logado = false;
  menu = MENU_ITEMS;
  conta = {
    title: 'Conta',
    icon: 'nb-email',
    link: '/home/conta',
  };

  @Input() position = 'normal';

  user: any;

  CLIENT_ACTIONS = [{ title: 'Perfil' }, { title: 'Sair' }];
  ADMIN_ACTIONS = [{ title: 'ADMIN' }, ...this.CLIENT_ACTIONS];
  userMenu = this.CLIENT_ACTIONS;

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
        this.perfil();
      } else if (title.item.title === 'ADMIN') {
        this.admin();
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
      if (user.role !== 'cliente')
        this.userMenu = this.ADMIN_ACTIONS;
      this.user = user;
      this.logado = true;
    });
  }

  perfil() {
    this.route.navigate(['/home/conta']);
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
