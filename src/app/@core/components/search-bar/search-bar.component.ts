import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categorias = ['eletronica', 'metal', 'darkmetal'];
  constructor() {}

  ngOnInit() {}
}
