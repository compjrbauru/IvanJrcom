import { Component, Input } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

import { ThemeService } from './../../../../services/theme.service';

@Component({
  selector: 'ngx-theme-switcher-list',
  template: `
    <ul class="themes-switcher-list">
      <li class="themes-switcher-item"
          *ngFor="let theme of themes"
          (click)="onToggleTheme(theme.key)">
        <i class="nb-drop" [ngClass]="'drop-icon-' + theme.key"></i>
        <span>{{ theme.title }}</span>
      </li>
    </ul>
  `,
  styleUrls: ['./theme-switcher-list.component.scss'],
})
export class ThemeSwitcherListComponent {

  @Input() popover: NbPopoverDirective;

  theme: NbJSThemeOptions;

  themes = [
    {
      title: 'Light',
      key: 'default',
    },
    {
      title: 'Cosmic',
      key: 'cosmic',
    },
    {
      title: 'Corporate',
      key: 'corporate',
    },
  ];

  constructor(
    private themeCService: ThemeService,
  ) {}

  onToggleTheme(themeKey: string) {
    this.themeCService.changeTheme(themeKey, 'RZq8bps3NmeOFgAeMZX5');
    this.popover.hide();
  }
}
