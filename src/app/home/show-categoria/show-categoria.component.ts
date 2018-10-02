import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'ngx-show-categoria',
  templateUrl: './show-categoria.component.html',
  styleUrls: ['./show-categoria.component.scss'],
})
export class ShowCategoriaComponent implements OnInit {
  categoriasAsync: Observable<any>;

  constructor(private categoriaservice: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriasAsync = this.categoriaservice.getCategoria();
  }

}
