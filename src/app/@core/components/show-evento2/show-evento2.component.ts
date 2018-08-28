import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-show-evento2',
  templateUrl: './show-evento2.component.html',
  styleUrls: ['./show-evento2.component.scss'],
})
export class ShowEvento2Component implements OnInit {
  eventos: any;
  mouseOvered: any = [];
  cosmic: boolean;

  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    'cosmic' === this.themeService.currentTheme
      ? (this.cosmic = true)
      : (this.cosmic = false);
  }
}
