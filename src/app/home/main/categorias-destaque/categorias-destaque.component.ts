import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'ngx-categorias-destaque',
  templateUrl: './categorias-destaque.component.html',
  styleUrls: ['./categorias-destaque.component.scss'],
})
export class CategoriasDestaqueComponent implements OnInit {
  categoriasAsync: Observable<any>;

  constructor(private categoriaservice: CategoriaService) { }

  ngOnInit() {
    this.categoriasAsync = this.categoriaservice.getCategoriaDestaque();
  }

}
