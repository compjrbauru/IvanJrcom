import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  logado = false;

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
    this.authService.onStateChange().subscribe(isLogged => { // Escuta mudanças de login do usuario
      if (isLogged) {
        this.authService.getResolvedUser().subscribe(user => {
          this.user = user;
          this.logado = true;
        });
      } else
        this.sair();
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
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  loadadmin() {
    this.route.navigate(['/pages']);
  }

  sair() {
    this.authService.signout();
    this.route.navigate(['/home']);
    window.location.reload();
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
