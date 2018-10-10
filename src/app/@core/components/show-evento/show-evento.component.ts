import { Component, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-show-evento',
  templateUrl: './show-evento.component.html',
  styleUrls: ['./show-evento.component.scss'],
})
export class ShowEventoComponent implements OnInit {
  @Input() evento: any;
  cosmic: boolean;

  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    'cosmic' === this.themeService.currentTheme
      ? (this.cosmic = true)
      : (this.cosmic = false);
  }
}
