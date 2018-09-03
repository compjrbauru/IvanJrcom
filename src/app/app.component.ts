import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnalyticsService } from './@core/utils/analytics.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private analytics: AnalyticsService,
    private themeService: NbThemeService,
    private themeCService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.themeCService.getTheme()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(theme => {
      const [atual] = theme;
      this.themeService.changeTheme(atual.tema);
      this.analytics.trackEvent('switchTheme');
      this.unsubscribe.next();
      this.unsubscribe.complete();
    });
  }
}
